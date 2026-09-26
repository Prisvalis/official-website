// 公司沿革頁（/about 與 /en/about）的文案。
//
// 語氣依「華國美學」Skill 的 rules/copywriting.md。
// 事實只寫有出處的：
// - 登記資料取自經濟部商工登記公示資料與財政部稅籍登記資料公示查詢（2026-09 站方提供之截圖）。
//   資料有異動時，這裡要跟著改，並以主管機關公示為準。
// - 創立緣起與願景只寫站方交代的兩件事：受大學好友影響而成立、致力推動資訊科技並期盼站上世界舞台。
//   不自行補寫人名、事件或日期。
// 兩個語系的物件形狀必須一致，由 AboutContent 介面約束。

import type { Locale } from "../consts";

interface Row {
	label: string;
	value: string;
}

interface CodeRow {
	code: string;
	name: string;
}

interface AboutContent {
	metaTitle: string;
	metaDescription: string;
	navLabel: string;
	h1: string;
	lead: string;
	origin: { title: string; body: string[] };
	vision: { title: string; lead: string; points: string[] };
	timeline: { title: string; caption: string; colDate: string; colEvent: string; rows: Row[] };
	profile: { title: string; caption: string; colItem: string; colValue: string; rows: Row[] };
	business: {
		title: string;
		captionCompany: string;
		captionTax: string;
		colCode: string;
		colName: string;
		note: string;
		company: CodeRow[];
		tax: CodeRow[];
	};
	source: { text: string; findbiz: string; etax: string };
}

// 商工登記的所營事業代碼，兩個語系共用。
const COMPANY_CODES = [
	"I103060", "I199990", "I301010", "I301020", "I301030", "I301050", "I501010",
	"I599990", "IG02010", "IZ13010", "IZ99990", "J399010", "J399990", "ZZ99999",
] as const;
// 稅籍登記的營業項目代碼。
const TAX_CODES = ["620199", "631100", "631299", "639099"] as const;

const withCodes = <T extends readonly string[]>(codes: T, names: string[]): CodeRow[] => {
	if (codes.length !== names.length) throw new Error("營業項目代碼與名稱數量不一致");
	return codes.map((code, i) => ({ code, name: names[i] }));
};

/** 公司沿革頁的站內路徑。站內連結一律用相對路徑，不要接上 SITE。 */
export const ABOUT_PATH: Record<Locale, string> = { "zh-Hant": "/about/", en: "/en/about/" };

export const FINDBIZ_URL = "https://findbiz.nat.gov.tw/fts/query/QueryBar/queryInit.do";
export const ETAX_URL = "https://www.etax.nat.gov.tw/etwmain/etw113w1/ban/query";

export const about: Record<Locale, AboutContent> = {
	"zh-Hant": {
		metaTitle: "公司沿革與基本資料｜算力有限公司 Prisvalis",
		metaDescription:
			"算力有限公司（Prisvalis LTD.）公司沿革專區：創立緣起、發展願景、大事紀要，以及商工與稅籍登記基本資料。本公司於中華民國一一五年九月三日經臺中市政府核准設立。",
		navLabel: "公司沿革",
		h1: "算力有限公司，公司沿革與發展願景",
		lead: "歡迎蒞臨本公司「公司沿革」專區！本專區彙整本公司之創立緣起、發展願景、大事紀要及登記基本資料，以供各界參考。資料如有異動，一律以主管機關公示資料為準，敬請見諒。",

		origin: {
			title: "創立緣起說明",
			body: [
				"本公司之成立，係深受大學時期好友之影響。在好友的影響之下，創辦人決定投身資訊科技領域，並於中華民國一一五年九月三日經臺中市政府核准設立「算力有限公司」。",
				"公司名稱「算力」，取其「運算能力」之意；章程所訂外文名稱為「Prisvalis LTD.」。",
				"本公司目前為一人公司，由同一人負責需求洽談、系統開發與部署上線，請大家多多指教！",
			],
		},

		vision: {
			title: "發展願景與使命",
			lead: "本公司致力推動資訊科技之發展，並期盼未來能夠站上世界的舞台！",
			points: [
				"致力推動資訊科技之發展，落實服務e化",
				"以踏實可用之系統，陪伴客戶一步一步邁向數位化",
				"期盼未來能夠站上世界的舞台，一起加油！",
			],
		},

		timeline: {
			title: "公司沿革大事紀要",
			caption: "本公司大事紀要一覽表（依日期排序）",
			colDate: "日期",
			colEvent: "事項說明",
			rows: [
				{
					label: "中華民國 115 年 09 月 03 日（2026-09-03）",
					value: "經臺中市政府核准設立，公司名稱為「算力有限公司」，章程所訂外文名稱為「Prisvalis LTD.」。",
				},
				{
					label: "中華民國 115 年 09 月 03 日（2026-09-03）",
					value: "完成稅籍登記設立，組織種類為有限公司，營業狀況為「營業中」。",
				},
				{
					label: "迄今",
					value: "持續營運中，承接系統開發與部署服務，並持續開發一人公司營運管理e化平台 Company of One。",
				},
			],
		},

		profile: {
			title: "公司基本資料一覽表",
			caption: "依商工登記與稅籍登記公示資料整理",
			colItem: "項目",
			colValue: "內容",
			rows: [
				{ label: "統一編號", value: "62010947" },
				{ label: "公司名稱", value: "算力有限公司" },
				{ label: "章程所訂外文公司名稱", value: "Prisvalis LTD." },
				{ label: "組織種類", value: "有限公司" },
				{ label: "登記現況", value: "核准設立（稅籍營業狀況：營業中）" },
				{ label: "資本總額", value: "新臺幣 20,000 元" },
				{ label: "代表人姓名", value: "王建葦" },
				{ label: "公司所在地", value: "臺中市西屯區文心路三段 76 號 2 樓" },
				{ label: "登記機關", value: "臺中市政府" },
				{ label: "核准設立日期", value: "中華民國 115 年 09 月 03 日" },
				{ label: "統一發票", value: "有使用統一發票" },
			],
		},

		business: {
			title: "所營事業與營業項目資料",
			captionCompany: "商工登記所營事業項目（共 14 項）",
			captionTax: "稅籍登記營業項目（共 4 項）",
			colCode: "代碼",
			colName: "項目名稱",
			note: "稅籍登記之營業項目受稅務法令與登錄欄位限制，與商工登記所營事業項目不盡相同，此為正常情形，請大家不要擔心喔！",
			company: withCodes(COMPANY_CODES, [
				"管理顧問業",
				"其他顧問服務業",
				"資訊軟體服務業",
				"資料處理服務業",
				"電子資訊供應服務業",
				"實境體感應用服務業",
				"產品設計業",
				"其他設計業",
				"研究發展服務業",
				"網路認證服務業",
				"其他工商服務業",
				"軟體出版業",
				"其他出版業",
				"除許可業務外，得經營法令非禁止或限制之業務",
			]),
			tax: withCodes(TAX_CODES, [
				"其他電腦程式設計",
				"入口網站經營",
				"其他資料處理、主機及網站代管服務",
				"未分類其他資訊服務",
			]),
		},

		source: {
			text: "【資料來源說明】本頁登記資料係依據下列主管機關公示查詢系統整理，如有異動或疑義，一律以主管機關公示資料為準，歡迎民眾自行查詢：",
			findbiz: "經濟部商工登記公示資料查詢服務",
			etax: "財政部稅籍登記資料公示查詢",
		},
	},

	en: {
		metaTitle: "Company History and Profile｜Prisvalis LTD.",
		metaDescription:
			"The Company History Section of Prisvalis LTD. (算力有限公司): founding background, vision, chronicle of events, and the company and tax registration profile. This Company was approved for incorporation by the Taichung City Government on 3 September 2026.",
		navLabel: "Company History",
		h1: "Prisvalis LTD., Company History and Development Vision",
		lead: "Welcome to the Company History Section of this Company! This section brings together the founding background, development vision, chronicle of events and registration profile of this Company for the reference of all. Should any information change, the official public records of the competent authorities shall prevail. Your kind understanding is respectfully requested.",

		origin: {
			title: "Founding Background",
			body: [
				"This Company was founded under the deep influence of close friends from university. Under that influence, the founder decided to take up the field of information technology, and Prisvalis LTD. (算力有限公司) was approved for incorporation by the Taichung City Government on 3 September 2026.",
				"The Chinese name 算力 means “computing power”; the foreign-language name stated in the Articles of Incorporation is “Prisvalis LTD.”.",
				"This Company is at present a one-person company: one and the same person handles requirement discussions, system development and deployment. Your kind guidance is warmly welcomed!",
			],
		},

		vision: {
			title: "Development Vision and Mission",
			lead: "This Company is committed to advancing the development of information technology, and hopes one day to stand on the world stage!",
			points: [
				"Committed to advancing information technology and realising e-services",
				"Accompanying clients step by step towards digitalisation with practical, working systems",
				"Hoping one day to stand on the world stage. Let us all work hard together!",
			],
		},

		timeline: {
			title: "Chronicle of Company History",
			caption: "Table of principal events of this Company (in date order)",
			colDate: "Date",
			colEvent: "Description of Event",
			rows: [
				{
					label: "3 September 2026 (ROC year 115)",
					value: "Approved for incorporation by the Taichung City Government under the name 算力有限公司, with the foreign-language name “Prisvalis LTD.” stated in the Articles of Incorporation.",
				},
				{
					label: "3 September 2026 (ROC year 115)",
					value: "Tax registration established as a limited company, with business status “in operation”.",
				},
				{
					label: "To date",
					value: "In continuous operation, undertaking system development and deployment services, and continuing to develop Company of One, the e-platform for one-person company operations management.",
				},
			],
		},

		profile: {
			title: "Company Profile Table",
			caption: "Compiled from the public company and tax registration records",
			colItem: "Item",
			colValue: "Particulars",
			rows: [
				{ label: "Unified Business No.", value: "62010947" },
				{ label: "Company name", value: "算力有限公司" },
				{ label: "Foreign-language name in the Articles", value: "Prisvalis LTD." },
				{ label: "Type of organisation", value: "Limited company" },
				{ label: "Registration status", value: "Approved and incorporated (tax status: in operation)" },
				{ label: "Total capital", value: "NT$20,000" },
				{ label: "Representative", value: "王建葦" },
				{ label: "Registered address", value: "2F, No. 76, Sec. 3, Wenxin Rd., Xitun Dist., Taichung City" },
				{ label: "Registration authority", value: "Taichung City Government" },
				{ label: "Date of approved incorporation", value: "3 September 2026" },
				{ label: "Uniform invoices", value: "Issues uniform invoices" },
			],
		},

		business: {
			title: "Registered Lines of Business",
			captionCompany: "Lines of business in the company registration (14 items)",
			captionTax: "Business items in the tax registration (4 items)",
			colCode: "Code",
			colName: "Item",
			note: "The English item names are translations provided for reference only; the Chinese registration is authoritative. Tax registration items are limited by tax regulations and registry fields and therefore differ from the company registration. This is normal, so please do not worry!",
			company: withCodes(COMPANY_CODES, [
				"Management consulting",
				"Other consulting services",
				"Information software services",
				"Data processing services",
				"Electronic information supply services",
				"Immersive reality application services",
				"Product design",
				"Other design",
				"Research and development services",
				"Internet certification services",
				"Other industrial and commercial services",
				"Software publishing",
				"Other publishing",
				"Any business not prohibited or restricted by law, except those requiring special permission",
			]),
			tax: withCodes(TAX_CODES, [
				"Other computer programming",
				"Web portals",
				"Other data processing, hosting and related services",
				"Other information services not elsewhere classified",
			]),
		},

		source: {
			text: "SOURCE OF INFORMATION: The registration details on this page are compiled from the public inquiry systems of the competent authorities listed below. In case of any change or doubt, the official public records shall prevail. You are welcome to check them yourself:",
			findbiz: "Ministry of Economic Affairs, Company and Business Registration Inquiry",
			etax: "Ministry of Finance, Tax Registration Public Inquiry",
		},
	},
};
