// Global, framework-agnostic site data. Import from anywhere with `import`.

// Production domain. Keep in sync with `site` in astro.config.mjs.
export const SITE = "https://www.prisvalis.com";

// Company identity, shown across the site and in structured data.
export const COMPANY = {
	nameZh: "算力有限公司",
	nameEn: "Prisvalis LTD.",
	shortEn: "Prisvalis",
	// Public contact address shown on the Coming Soon page. Update if needed.
	email: "support@mail.prisvalis.com",
	// 聯絡頁會自動把它變成可直接撥號的 tel: 連結。
	phone: "+886-4-2369-7788",
	// LINE 官方帳號。
	lineId: "@prisvalis",
	// 統一編號（台灣的營利事業統一編號），頁尾與結構化資料共用同一個來源。
	taxId: "62010947",
	// 核准設立日期（臺中市政府，中華民國 115 年 9 月 3 日）。結構化資料的 foundingDate 用這個。
	founded: "2026-09-03",
} as const;

// 網站聯絡表單。這裡只放公開值 —— Turnstile 的 secret key 走 Worker secret
// （wrangler secret put TURNSTILE_SECRET），不進版本控制。
export const CONTACT = {
	// 寄件位址。網域必須已接上 Cloudflare Email Routing，否則 send() 會被拒絕。
	// 用 mail.prisvalis.com 子網域 —— 裸網域 prisvalis.com 沒有啟用寄送。
	from: "contact@mail.prisvalis.com",
	fromName: "Prisvalis 網站聯絡表單",
	// 收件位址。必須是 Cloudflare 帳號裡「已驗證」的 destination address，
	// 且要與 wrangler.json 的 destination_address 一致。
	to: "support@mail.prisvalis.com",
	// Turnstile widget 的 site key。site key 是公開值（會出現在 HTML 原始碼裡），
	// 放這裡沒有安全問題；配對的 secret 走 Worker secret（TURNSTILE_SECRET）。
	turnstileSiteKey: "0x4AAAAAAE7PVRW8a1YRCJkI",
} as const;

// 聯絡表單的需求類別。這個陣列同時是畫面的選項來源與後端的白名單 ——
// 共用一份，才不會出現表單送得出去、後端卻不認得的組合。
// 每個值都要在 i18n 有一組對應的 `contact.category.<value>` 字串。
export const CONTACT_CATEGORIES = ["general"] as const;
export type ContactCategory = (typeof CONTACT_CATEGORIES)[number];

// Official social profiles. Also emitted as `sameAs` in structured data.
export const SOCIAL = {
	instagram: "https://www.instagram.com/prisvalis.ltd",
	threads: "https://www.threads.com/@prisvalis.ltd",
} as const;

export const DEFAULT_LOCALE = "zh-Hant";
export const LOCALES = ["zh-Hant", "en"] as const;
export type Locale = (typeof LOCALES)[number];

// 各語系首頁的「站內路徑」。頁面上的連結一律用這組 ——
// 相對路徑會沿用訪客當下的網域，所以綁在同一個 Worker 上的
// prisvalis.tw / prisvalis.app 不會因為切換語言就被彈回 .com。
export const LOCALE_HOME_PATH: Record<Locale, string> = {
	"zh-Hant": "/",
	en: "/en/",
};

// 各語系首頁的「絕對網址」。只給 hreflang、canonical、OG 這類要被爬蟲讀的
// 標籤用 —— 那些必須指向單一正式網域，否則三個網域會互相重複內容，
// 搜尋排名的訊號會被拆散。不要拿這組去做站內連結。
export const LOCALE_HOME: Record<Locale, string> = {
	"zh-Hant": `${SITE}${LOCALE_HOME_PATH["zh-Hant"]}`,
	en: `${SITE}${LOCALE_HOME_PATH.en}`,
};
