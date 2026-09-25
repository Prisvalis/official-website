// 華國美學版的「入口網站外框」文案：頁首標語、主選單、最新公告跑馬燈、
// 導覽路徑、側欄與頁尾。頁面本身的內容仍在 home.ts、coo.ts、ui.ts，這裡不重寫它們。
//
// 語氣照 roc-aesthetic 的 copywriting 規則：正式、名詞堆疊、全形符號、強調 e化。
// 但每一句陳述都必須能在現有內容裡找到出處，不因為換了語氣就多出新的宣稱：
// - 「測試站運作中，功能與定價仍可能調整」出自 coo.ts 的 footer.note。
// - 「計費機制尚未上線，目前所有方案皆免費」出自 coo.ts 的 pricing.noteHead。
// - 「三個工作天內回覆」出自 ui.ts 的 contact.info.replyValue。
// - 「先確認範圍才報價、沒有平台抽成」出自 home.ts 的 process。
// - 「記錄來源 IP 與國家以防濫用」出自 ui.ts 的 contact.privacy。
//
// 兩個語系的物件形狀由 PortalContent 約束，少一個 key 是型別錯誤。

import type { Locale } from "../consts";

export type PortalPage = "home" | "coo" | "features" | "pricing" | "contact";

interface PortalContent {
	skip: string;
	siteTitle: string;
	siteSub: string;
	slogans: string[];
	topbarAria: string;
	navAria: string;
	nav: Record<PortalPage, string>;
	tickerLabel: string;
	tickerAria: string;
	tickerPause: string;
	ticker: string[];
	crumbsLead: string;
	crumbsAria: string;
	crumbs: Record<PortalPage, string>;
	side: {
		servicesTitle: string;
		services: {
			product: string;
			features: string;
			pricing: string;
			repo: string;
			demo: string;
			form: string;
			mail: string;
		};
		windowTitle: string;
		noticeTitle: string;
		notices: string[];
		socialTitle: string;
	};
	footer: {
		maintained: string;
		browsers: string;
		phone: string;
		email: string;
		reply: string;
	};
}

export const portal: Record<Locale, PortalContent> = {
	"zh-Hant": {
		skip: "跳至主要內容",
		siteTitle: "算力有限公司",
		siteSub: "官方網站",
		slogans: ["推動系統開發服務e化", "先確認範圍・再誠實報價", "誠摯為您服務"],
		topbarAria: "快速連結",
		navAria: "主選單",
		nav: {
			home: "首頁",
			coo: "Company of One 產品介紹",
			features: "功能資訊說明",
			pricing: "方案與額度",
			contact: "聯絡資訊與服務窗口",
		},
		tickerLabel: "【最新公告】",
		tickerAria: "最新公告資訊",
		tickerPause: "暫停捲動",
		ticker: [
			"Company of One 測試站運作中，功能與定價仍可能調整，造成不便之處，敬請見諒！",
			"Company of One 計費機制尚未上線，目前所有方案皆免費，歡迎多加利用。",
			"線上詢問表單e化服務受理中，本公司將於三個工作天內回覆，請耐心等候。",
			"每個案子一律先確認範圍後才報價，沒有平台抽成，請安心洽詢。",
		],
		crumbsLead: "目前位置：",
		crumbsAria: "導覽路徑",
		crumbs: {
			home: "首頁",
			coo: "Company of One",
			features: "功能",
			pricing: "定價",
			contact: "聯絡",
		},
		side: {
			servicesTitle: "e化服務專區",
			services: {
				product: "Company of One 產品介紹",
				features: "功能完整資訊說明",
				pricing: "方案與額度查詢",
				repo: "原始碼公開查閱（GitHub）",
				demo: "測試站e化體驗",
				form: "線上詢問表單",
				mail: "電子郵件服務信箱",
			},
			windowTitle: "服務窗口資訊",
			noticeTitle: "※ 本站注意事項",
			notices: [
				"本公司為一人公司，與您討論需求的人就是撰寫程式的人，需求不會在轉述中走樣。",
				"報價依實際工作量計算，請先說明現況，**不需要先寫規格**。",
				"線上詢問表單送出時，將記錄來源 IP 與國家以防濫用，*不作其他用途*。",
			],
			socialTitle: "官方社群專區",
		},
		footer: {
			maintained: "本網站由算力有限公司自行開發與維護",
			browsers: "建議使用 Chrome、Edge、Firefox、Safari 最新版本瀏覽本網站",
			phone: "服務電話",
			email: "服務信箱",
			reply: "回覆時間",
		},
	},

	en: {
		skip: "Skip to main content",
		siteTitle: "Prisvalis LTD.",
		siteSub: "Official Website",
		slogans: ["Promoting e-Service in Systems Development", "Scope First, Then an Honest Quote", "Sincerely at Your Service"],
		topbarAria: "Quick links",
		navAria: "Main menu",
		nav: {
			home: "Home",
			coo: "Company of One Product Information",
			features: "Feature Details",
			pricing: "Plans and Quotas",
			contact: "Contact Information and Service Desk",
		},
		tickerLabel: "[Latest Announcements]",
		tickerAria: "Latest announcements",
		tickerPause: "Pause scrolling",
		ticker: [
			"The Company of One test deployment is in operation. Features and pricing may still change. We apologise for any inconvenience!",
			"Company of One billing is not live yet, so every plan is currently free of charge. You are welcome to make full use of it.",
			"The online enquiry form e-Service is open. Replies are sent within three business days. Thank you for your patience.",
			"Every project is scoped before it is priced, with no platform commission. Please feel free to enquire.",
		],
		crumbsLead: "You are here: ",
		crumbsAria: "Breadcrumb",
		crumbs: {
			home: "Home",
			coo: "Company of One",
			features: "Features",
			pricing: "Pricing",
			contact: "Contact",
		},
		side: {
			servicesTitle: "e-Service Zone",
			services: {
				product: "Company of One product information",
				features: "Complete feature details",
				pricing: "Plan and quota enquiry",
				repo: "Public source code (GitHub)",
				demo: "Test site e-Experience",
				form: "Online enquiry form",
				mail: "Email service mailbox",
			},
			windowTitle: "Service Desk Information",
			noticeTitle: "※ Important Notes for Visitors",
			notices: [
				"This is a one-person company. The person discussing your requirements is the one writing the code, so nothing is lost in relay.",
				"Quotes follow the actual amount of work. Please describe where things stand; **no written spec is needed**.",
				"When the online enquiry form is sent, the source IP and country are recorded to prevent abuse, *and used for nothing else*.",
			],
			socialTitle: "Official Social Media Zone",
		},
		footer: {
			maintained: "This website is developed and maintained by Prisvalis LTD.",
			browsers: "For best results, please view this website with the latest Chrome, Edge, Firefox or Safari",
			phone: "Service phone",
			email: "Service mailbox",
			reply: "Response time",
		},
	},
};

/**
 * 側欄注意事項允許 **粗體** 與 *斜體*（copywriting 規則第 11 條）。
 * 字串是本檔寫死的常數，不是使用者輸入，拆成片段後由元件以文字節點輸出，不經 set:html。
 */
export function emphasis(text: string): { kind: "text" | "strong" | "em"; value: string }[] {
	const parts: { kind: "text" | "strong" | "em"; value: string }[] = [];
	const re = /\*\*(.+?)\*\*|\*(.+?)\*/g;
	let last = 0;
	for (let m = re.exec(text); m; m = re.exec(text)) {
		if (m.index > last) parts.push({ kind: "text", value: text.slice(last, m.index) });
		if (m[1] !== undefined) parts.push({ kind: "strong", value: m[1] });
		else parts.push({ kind: "em", value: m[2] });
		last = re.lastIndex;
	}
	if (last < text.length) parts.push({ kind: "text", value: text.slice(last) });
	return parts;
}
