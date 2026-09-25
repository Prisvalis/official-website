// 聯絡表單的收件端點。
//
// 這是整個網站唯一一條接收外部輸入的路徑，所以驗證寫得比其他地方囉唆 ——
// 公開的 POST 端點沒有防護，兩週內信箱就會被機器人塞滿。
import type { APIRoute } from "astro";
import {
	CONTACT,
	CONTACT_CATEGORIES,
	LOCALES,
	type ContactCategory,
	type Locale,
} from "../../consts";
import { t } from "../../i18n/ui";

export const prerender = false;

const LIMITS = { name: 100, email: 254, phone: 40, company: 120, message: 5000 } as const;
const MIN_MESSAGE = 10;
// 正常的表單遠小於這個值。先擋體積，才不必把超大的 body 讀進記憶體。
const MAX_BODY_BYTES = 64 * 1024;

const TURNSTILE_VERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
// siteverify 回這幾個代碼代表是伺服器端的設定壞了，不是訪客沒通過驗證。
// 分開處理，否則 secret 打錯字會讓訪客看到「請重試」，而重試永遠不會成功。
const TURNSTILE_CONFIG_ERRORS = ["missing-input-secret", "invalid-input-secret", "bad-request"];

/** 會進信件標頭的欄位要先清乾淨：換行字元可以用來塞進額外的標頭。 */
function sanitize(value: string): string {
	return value.replace(/[\u0000-\u001F\u007F]/g, " ").trim();
}

function isEmail(value: string): boolean {
	return value.length <= LIMITS.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** 類別只認白名單裡的值 —— 它會進信件主旨，不能讓訪客自己決定內容。 */
function isCategory(value: string): value is ContactCategory {
	return (CONTACT_CATEGORIES as readonly string[]).includes(value);
}

function pageUrl(locale: Locale, query: string): string {
	return `${locale === "en" ? "/en/contact/" : "/contact/"}?${query}`;
}

export const POST: APIRoute = async ({ request, locals }) => {
	const fallbackLocale: Locale = "zh-Hant";
	const redirectTo = (locale: Locale, query: string) =>
		Response.redirect(new URL(pageUrl(locale, query), request.url), 303);

	const length = Number(request.headers.get("content-length") ?? 0);
	if (length > MAX_BODY_BYTES) return redirectTo(fallbackLocale, "error=invalid");

	let form: FormData;
	try {
		form = await request.formData();
	} catch {
		return redirectTo(fallbackLocale, "error=invalid");
	}

	const field = (key: string) => sanitize(String(form.get(key) ?? ""));

	// 語系只從固定清單裡認 —— 不拿使用者給的字串去組轉址網址。
	const rawLocale = field("locale");
	const locale: Locale = (LOCALES as readonly string[]).includes(rawLocale)
		? (rawLocale as Locale)
		: fallbackLocale;
	const back = (query: string) => redirectTo(locale, query);

	// 蜜罐：真人看不到這個欄位，填了就是機器人。假裝成功，不讓對方知道被擋下。
	// 名稱刻意不叫 company —— 那是表單裡真正的「公司名稱」欄位。
	if (field("website")) return back("sent=1");

	const name = field("name");
	const email = field("email");
	const phone = field("phone");
	const company = field("company");
	const category = field("category");
	// 內文不進標頭，保留換行，只砍首尾空白。
	const message = String(form.get("message") ?? "").trim();

	// 類別單獨先擋 —— 放在下面那串布林運算裡的話，型別不會跟著收窄。
	if (!isCategory(category)) return back("error=invalid");

	const valid =
		name.length > 0 &&
		name.length <= LIMITS.name &&
		isEmail(email) &&
		// 電話與公司是選填，有填才需要符合長度上限。
		phone.length <= LIMITS.phone &&
		company.length <= LIMITS.company &&
		message.length >= MIN_MESSAGE &&
		message.length <= LIMITS.message;
	if (!valid) return back("error=invalid");

	const categoryLabel = t("zh-Hant", `contact.category.${category}`);

	const env = locals.runtime.env;

	// 沒設 secret 就直接失敗。「驗證不了就放行」會讓表單在完全沒有防護的
	// 狀態下安靜地運作，那比壞掉更糟。
	if (!env.TURNSTILE_SECRET) {
		console.error("contact: TURNSTILE_SECRET is not set");
		return back("error=failed");
	}

	const ip = request.headers.get("CF-Connecting-IP") ?? "";
	const verifyBody = new FormData();
	verifyBody.append("secret", env.TURNSTILE_SECRET);
	verifyBody.append("response", String(form.get("cf-turnstile-response") ?? ""));
	if (ip) verifyBody.append("remoteip", ip);

	try {
		const verifyRes = await fetch(TURNSTILE_VERIFY, { method: "POST", body: verifyBody });
		const verdict = (await verifyRes.json()) as {
			success?: boolean;
			"error-codes"?: string[];
		};
		if (!verdict.success) {
			const codes = verdict["error-codes"] ?? [];
			console.error("contact: turnstile rejected", codes.join(",") || "(no error codes)");
			const misconfigured = codes.some((code) => TURNSTILE_CONFIG_ERRORS.includes(code));
			return back(misconfigured ? "error=failed" : "error=captcha");
		}
	} catch (error) {
		console.error("contact: turnstile verify failed", error);
		return back("error=failed");
	}

	const country = request.headers.get("CF-IPCountry") ?? "?";
	const body = [
		`姓名 / Name: ${name}`,
		`信箱 / Email: ${email}`,
		phone ? `電話 / Phone: ${phone}` : null,
		company ? `公司 / Company: ${company}` : null,
		`類別 / Category: ${categoryLabel}`,
		`語系 / Locale: ${locale}`,
		`時間 / Time: ${new Date().toISOString()}`,
		`來源 / Source: ${ip || "?"} (${country})`,
		"",
		"----",
		"",
		message,
	]
		.filter((line): line is string => line !== null)
		.join("\n");

	try {
		await env.EMAIL.send({
			from: { name: CONTACT.fromName, email: CONTACT.from },
			to: CONTACT.to,
			// 回信直接按「回覆」就會寄給訪客，不必手動複製位址。
			replyTo: { name, email },
			subject: `[網站聯絡] ${categoryLabel}`,
			text: body,
		});
	} catch (error) {
		console.error("contact: send failed", error);
		return back("error=failed");
	}

	return back("sent=1");
};
