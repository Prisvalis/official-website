// Company of One（/CoO）產品頁的文案與連結工具。
//
// 三個頁面各有中英兩份，兩邊的物件形狀必須完全一樣 —— 元件是用 coo[locale]
// 取值後直接渲染的，少一個 key 只會在該語系的頁面上安靜地少一段內容。

import type { Locale } from "../consts";

/** 產品本身的入口，與這個介紹網站是不同的主機。 */
export const APP_URL = "https://coo.jw-albert.dev";
export const REPO_URL = "https://github.com/Prisvalis/Company-of-One";
export const COO_NAME = "Company of One";

export type CooPage = "home" | "features" | "pricing";

const PAGE_PATH: Record<CooPage, string> = {
	home: "/",
	features: "/features",
	pricing: "/pricing",
};

/**
 * 把路徑接上 /CoO（英文版再多一層 /en）。
 *
 * 產品頁不在網站根目錄，手寫 "/features" 這種絕對路徑在本機會動、上線後會 404，
 * 而且不會有任何建置錯誤提醒你 —— 所有內部連結一律經過這個函式。
 */
export function cooUrl(locale: Locale, path = "/"): string {
	const base = locale === "en" ? "/en/CoO" : "/CoO";
	const [rawPath, hash] = path.split("#");
	const clean = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
	// 有副檔名的是檔案（favicon.svg 之類），補上尾斜線會直接 404。
	const isFile = /\.[a-z0-9]+$/i.test(clean);
	const withSlash = isFile || clean.endsWith("/") ? clean : `${clean}/`;
	return `${base}${withSlash}${hash ? `#${hash}` : ""}`;
}

export function cooPageUrl(locale: Locale, page: CooPage): string {
	return cooUrl(locale, PAGE_PATH[page]);
}

/** 定價頁的方案文案：中文直接用 plans.json（與後端同步的那份），英文放這裡。 */
export const PLAN_TEXT_EN: Record<string, { name: string; tagline: string; bestFor: string }> = {
	free: {
		name: "Free",
		tagline: "Get your first quote out the door",
		bestFor: "Just starting to take on work, no invoicing needs yet",
	},
	standard: {
		name: "Standard",
		tagline: "Issuing invoices and filing VAT",
		bestFor: "Trading properly, and needs inventory, invoicing and filing",
	},
	pro: {
		name: "Pro",
		tagline: "Volume is up, and you want mail on your own domain",
		bestFor: "High volume, several collaborators, mail on your own domain",
	},
};

export const FEATURE_LABELS_EN: Record<string, string> = {
	parties: "Contacts (clients and suppliers)",
	products: "Products and services",
	quotes: "Quotes",
	orders: "Orders",
	inventory: "Inventory",
	purchases: "Purchase vouchers",
	payments: "Online payments (ECPay)",
	einvoice: "E-invoices",
	tax_report: "VAT filing (Form 401)",
	mail: "Mail service (own domain)",
};

export const QUOTA_LABELS_EN: Record<string, string> = {
	max_parties: "Contacts",
	max_products: "Products and services",
	max_users: "Members",
	monthly_quotes: "Quotes per month",
	monthly_einvoices: "E-invoices per month",
	max_mail_domains: "Mail domains",
};

export const coo = {
	"zh-Hant": {
		tagline: "一人公司的完整後台",
		colon: "：",

		nav: { home: "首頁", features: "功能", pricing: "定價" },
		navAria: "主選單",
		skip: "跳至主要內容",
		start: "開始使用",

		footer: {
			blurb: "一人公司的完整後台。從報價到報稅。",
			product: "產品",
			resources: "資源",
			begin: "開始",
			featuresAll: "功能總覽",
			pricingAll: "方案與定價",
			security: "資安與稽核",
			repo: "原始碼（GitHub）",
			schema: "資料模型文件",
			issues: "問題回報",
			signin: "登入 / 註冊",
			note: "測試站運作中，功能與定價仍可能調整。",
		},

		meta: {
			home: {
				title: "",
				description:
					"一人公司管理平台：報價、訂單、進銷存、電子發票與營業稅申報，一個人就能完成。客戶線上確認報價，決定寫進環環相扣的稽核鏈，任何事後修改都會留下痕跡。",
			},
			features: {
				title: "功能",
				description:
					"Company of One 的完整功能說明：報價與訂單、現金流與應收帳款、進銷存、電子發票、401 申報、會計師協作，以及會留下竄改痕跡的稽核紀錄。",
			},
			pricing: {
				title: "定價",
				description:
					"Company of One 的方案與額度：免費、標準、專業三種方案，額度與功能範圍一目了然。計費機制尚未上線。",
			},
		},

		home: {
			eyebrow: "一人公司管理平台",
			h1: "一個人，也要有一間公司該有的後台。",
			lead: "報價、訂單、進銷存、電子發票、營業稅申報，全部在同一個地方完成。不需要三套系統與一堆 Excel，也不需要為了記一筆帳而先學會會計。",
			ctaFree: "免費開始",
			ctaFeatures: "看完整功能",

			whyEyebrow: "為什麼做這個",
			whyTitle: "一人公司最常見的死因，不是沒生意。",
			whyBody:
				"是收不到錢，以及被行政瑣事吃掉本來該用來接案的時間。報價寄出去沒人追、貨出了不知道客戶還欠多少、申報期限到了才開始翻單據 —— 這些都不是「認真一點」就能解決的，它們需要系統替你記得。",

			pillars: [
				{
					title: "錢在哪裡，一眼看得到",
					body: "登入後的「營運總覽」就是未收款總額、逾期金額、待跟進報價與申報倒數。不必自己彙總。",
					icon: "M3 3v18h18 M19 9l-5 5-4-4-3 3",
				},
				{
					title: "客戶自己按下接受",
					body: "報價單寄出一條免登入連結，客戶線上回覆。決定連同時間與來源 IP 一起留存，事後的任何修改都會留下痕跡。",
					icon: "M20 6 9 17l-5-5",
				},
				{
					title: "紀錄不能被偷偷改掉",
					body: "每筆操作紀錄與前一筆環環相扣，改一筆就會對不上，而且驗證結果你自己看得到。",
					icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
				},
			],

			quote: {
				eyebrow: "報價 → 成交",
				title: "把「客戶到底答應了沒有」變成一件有證據的事。",
				p1: "多數系統裡的「已接受」是你自己在後台按的 —— 客戶事後說沒同意這個價格，你拿不出任何東西。",
				p2a: "這裡的報價單可以產生一條免登入連結寄給客戶。客戶開啟、看到完整內容、自己按下接受或婉拒，還能附上一句話。那個決定帶著時間與來源 IP 寫進稽核紀錄，而稽核紀錄是環環相扣的雜湊鏈 —— ",
				p2strong: "任何事後的修改都會留下痕跡",
				p2b: "。",
				ticks: [
					{ a: "連結有期限，而且", b: "只能回覆一次", c: " —— 回覆後仍可查看，但不能再改變決定" },
					{ a: "接受後可一鍵轉成訂單，金額與明細整組複製，報價再怎麼改都不影響訂單", b: "", c: "" },
					{ a: "快到期會提醒，過期由每日的背景工作自動標記，不必自己維護狀態", b: "", c: "" },
				],
				mockAria:
					"示意圖：客戶端的報價確認畫面，報價單 Q2026-0002 含品牌識別設計與名片設計兩個品項，合計 142,800 元，下方有接受與婉拒兩個按鈕",
				mockTitle: "報價單 Q2026-0002",
				mockTag: "等待您的回覆",
				rows: [
					{ label: "品牌識別設計 × 1", value: "120,000.00" },
					{ label: "名片設計 × 2", value: "16,000.00" },
					{ label: "營業稅", value: "6,800.00" },
				],
				totalLabel: "合計",
				totalValue: "142,800.00",
				accept: "接受這份報價",
				decline: "婉拒",
				mockNote: "您的回覆會連同時間與來源 IP 一併記錄，作為雙方的憑據。",
			},

			cash: {
				eyebrow: "現金流",
				title: "誰還沒付錢、欠了多久，一張表說完。",
				body: "未收餘額 = 訂單金額 − 已收款，每次都由單據即時算出，不存快取欄位。「帳上顯示已收款、實際沒收到」這種事不會發生。",
				ticks: [
					"按客戶彙總，30/60/90 天帳齡分桶，一眼看出該先催誰",
					"可展開看每一張單的已收與未收",
					"外幣訂單以開單當時的匯率換算台幣後才加總",
					"月結對帳單可直接列印寄給客戶，含期初與期末餘額",
				],
				mockAria:
					"示意圖：應收帳款帳齡表，宏遠設計的未收款分布在 1 到 30 天與 31 到 60 天，晴天工作室有 126,000 元落在 90 天以上，合計未收 195,750 元",
				mockTitle: "應收帳款",
				mockDate: "結算日 2026-08-30",
				rows: [
					{ label: "宏遠設計 · 1–30 天", value: "54,000.00", warn: false },
					{ label: "宏遠設計 · 31–60 天", value: "15,750.00", warn: false },
					{ label: "晴天工作室 · 90+ 天", value: "126,000.00", warn: true },
				],
				totalLabel: "合計未收",
				totalValue: "195,750.00",
			},

			tax: {
				eyebrow: "稅務",
				title: "申報期不必再翻一整箱單據。",
				bodyA: "401 的銷項與進項由發票與憑證即時彙總 —— ",
				bodyStrong: "不另建報表資料表",
				bodyB: "，所以不會有「報表與單據對不起來」的問題。",
				ticks: [
					"應稅、零稅率、免稅依明細的稅別快照分開計算",
					"銷貨折讓在開立當期扣減銷項，不必回頭改上一期",
					"可匯出 401 申報用的 CSV，數字直接對得上",
					"營運總覽顯示下一次申報的截止日與剩餘天數",
				],
				mockAria:
					"示意圖：營業稅 401 彙總，應稅銷售額 10,000 元、零稅率 5,000 元、銷項稅額 500 元、進項稅額 200 元、本期應納稅額 300 元",
				mockTitle: "營業稅申報（401）",
				mockPeriod: "2026 第 4 期",
				rows: [
					{ label: "應稅銷售額", value: "10,000.00" },
					{ label: "零稅率銷售額", value: "5,000.00" },
					{ label: "銷項稅額", value: "500.00" },
					{ label: "進項稅額", value: "200.00" },
				],
				totalLabel: "本期應納稅額",
				totalValue: "300.00",
			},

			trust: {
				eyebrow: "信任",
				title: "紀錄能不能被改，決定了它有沒有用。",
				body: "稽核紀錄的價值建立在「不能被事後修改」。多數系統的 append-only 只是一句承諾 —— 拿得到資料庫寫入權的人（包含平台自己）可以安靜地改掉一列，事後沒有人察覺得到。",
				cards: [
					{
						title: "雜湊鏈",
						a: "每一筆紀錄都把前一筆的雜湊算進自己的雜湊。改一筆，它之後的每一筆都會對不上；刪一筆，序號會出現缺口。",
						strong: "",
						b: "",
					},
					{
						title: "外部見證（設計中已完成，尚未啟用）",
						a: "光有鏈擋不住有寫入權的人整條重算，所以鏈頭要定期送到平台控制不到的第三方留存。這個機制已經實作完成，但",
						strong: "測試站目前尚未接上外部見證端點",
						b: "，現階段只有本機檢查點。",
					},
					{
						title: "你自己驗得到",
						a: "操作紀錄頁直接顯示驗證結果，以及最近一次錨定的時間與它是否真的送到了外部。這件事的重點就是你不必相信我們的說法。",
						strong: "",
						b: "",
					},
				],
				adminTitle: "而且「誰看過你的資料」也會留下紀錄",
				adminA:
					"平台管理員只能管帳號與公司基本資料，不得存取任何業務表。真的需要調閱內容時（例如法院調閱），必須填寫事由，這次取用本身會寫成一筆稽核紀錄，",
				adminStrong: "而且你會收到通知",
				adminB: "。",
				adminP2: "保護來自「你會知道」與「有人要負責」，不是靠把事情藏起來。",
				adminLink: "看資安與稽核的完整說明 →",
				noticeAria: "示意圖：你收到的站內通知，內容為平台管理員查看了貴公司的一筆稽核內容，並附上填寫的事由",
				noticeTitle: "通知",
				noticeTag: "未讀",
				noticeHead: "平台管理員查看了貴公司的一筆稽核內容",
				noticeLine1: "管理員（admin@…）查看了一筆「建立報價單」的完整內容。",
				noticeLine2: "填寫的事由：客戶對帳爭議，需確認建立時的金額",
			},

			overviewEyebrow: "功能總覽",
			overviewTitle: "一間公司會用到的，都在這裡。",
			overviewLink: "看每一項的詳細說明 →",
			overview: [
				{ title: "交易對象與商品", body: "客戶與供應商合一管理，輸入統編可自動帶入公司抬頭與地址。" },
				{ title: "報價單與訂單", body: "狀態機控管流程，非法轉移一律擋下。可複製舊單，月費客戶不必從頭建。" },
				{ title: "進銷存", body: "庫存由流水帳即時加總，不存快取數量。允許負庫存但會標紅提醒。" },
				{ title: "金流與電子發票", body: "串接綠界收款與電子發票，收款回拋會二次核對金額才更新狀態。" },
				{ title: "營業稅申報", body: "401 銷項進項即時彙總，含銷貨折讓，可匯出 CSV。" },
				{ title: "會計師協作", body: "用邀請把會計師加進來，不必把密碼給對方。權限分擁有者、會計師、唯讀。" },
				{ title: "多幣別", body: "外幣單據存匯率快照，日後匯率變動不影響已開立的單據。發票仍以台幣開立。" },
				{ title: "郵件服務", body: "引導設定自有網域的收發信與轉寄規則（接第三方，不自建郵件伺服器）。" },
				{ title: "操作紀錄", body: "自己帳號發生過的每一件事都查得到，含完整性驗證結果。" },
			],

			status: {
				eyebrow: "現況",
				title: "目前的狀態，照實說。",
				head: "這是一個仍在開發中的產品。",
				bodyA:
					"目前運作於測試站，功能皆已實作，並有數百項自動化測試在 SQLite 與 PostgreSQL 上各跑一次。但有幾項尚未以真實帳號實測：綠界金流與電子發票的串接依公開文件實作但未經沙盒驗證、寄信服務未經真實服務商驗證、折讓尚未對外傳送給財政部、稽核鏈的外部見證端點尚未接上。計費機制也還沒啟用，而且目前",
				bodyStrong: "沒有監控與告警機制",
				bodyB: " —— 測試站曾發生過數天的停機。",
				bodyC: "把這些寫在這裡，是因為你有權在投入之前知道。",
			},

			finalTitle: "先用免費方案把第一張報價單開出來。",
			finalBody: "不需要信用卡，計費機制也尚未上線。方案的差別只在額度與功能範圍。",
			finalCompare: "比較方案",
		},

		features: {
			eyebrow: "功能",
			h1: "一間公司會用到的，這裡都有。",
			lead: "下面是每一塊的實際內容。寫的是系統真的做得到的事，連「刻意不做什麼」與「還沒完成什麼」也一起寫出來。",
			note: "幾項尚未以真實帳號實測，文中會個別標明：綠界金流與電子發票依公開文件實作但未經沙盒驗證、寄信服務未經真實服務商驗證、折讓尚未對外傳送、稽核鏈的外部見證端點尚未接上。",
			tocAria: "功能分類",
			sections: [
				{
					id: "quotes",
					eyebrow: "報價與訂單",
					title: "從開單到成交，狀態不會亂",
					intro:
						"報價單與訂單各自有一套狀態機。哪些狀態能轉到哪些狀態是寫死的規則，非法的轉移會被後端擋下 —— 例如已出貨的訂單不能作廢，因為庫存已經動了，那要用沖銷而不是讓單據消失。",
					items: [
						{ title: "客戶線上確認", body: "產生免登入連結寄給客戶，客戶自己按接受或婉拒，還能附上一句話。決定帶著時間與來源 IP 進入稽核鏈。" },
						{ title: "連結是有限的授權", body: "有期限、只對應那一張報價單，而且只能回覆一次。就算連結外流，能做的也只有看那一張單。" },
						{ title: "到期自動處理", body: "過了有效期限的報價自動標記為過期；快到期的會發通知提醒你跟進，每張只提醒一次。" },
						{ title: "一鍵轉訂單", body: "接受後轉成訂單，金額與明細整組複製過去。之後報價單再怎麼改都不影響已成立的訂單。" },
						{ title: "複製舊單", body: "每月開一樣的單不必從頭建。複製的是當時的快照 —— 商品後來漲價或改名，複製出來的仍是原本的價格與名稱。" },
						{ title: "列印與寄送", body: "報價單可直接列印或存成 PDF，版面為單據格式而非網頁截圖。" },
					],
				},
				{
					id: "money",
					eyebrow: "現金流",
					title: "誰欠你錢、欠多久，不用自己算",
					intro:
						"未收餘額一律由「訂單金額 − 已收款」即時算出，不存快取欄位。快取會與來源不一致，而「帳上顯示已收款、實際沒收到」比慢一點嚴重得多。",
					items: [
						{ title: "營運總覽", body: "登入後看到的第一個畫面：本月開立發票金額、未收款總額、逾期未收、待跟進報價、負庫存商品、下次申報倒數。" },
						{ title: "應收帳款帳齡", body: "按客戶彙總並分成 1–30、31–60、61–90、90+ 天四桶，一眼看出該先催誰。可展開看每張單。" },
						{ title: "客戶對帳單", body: "指定期間產生對帳單，含期初餘額、期間內的單據與收款、期末餘額。可直接列印寄給客戶。" },
						{ title: "收付款登記", body: "現金與匯款可人工登記，綠界的線上收款會在確認金額無誤後自動寫入。" },
					],
				},
				{
					id: "inventory",
					eyebrow: "進銷存",
					title: "庫存數字永遠等於流水帳加總",
					intro:
						"庫存量不存在任何欄位裡，而是由異動流水帳即時加總得出。這樣不可能出現「快取值與流水帳對不上、沒人知道哪個對」的情況。",
					items: [
						{ title: "流水帳為準", body: "進貨、出貨、調整都是一筆異動紀錄，append-only，寫錯用反向沖銷而不是修改。" },
						{ title: "不擋出貨", body: "庫存不足時允許負庫存並在畫面標紅 —— 現實中貨可能已經出去了，擋住只會讓帳與實際脫節。" },
						{ title: "進項憑證", body: "登打進貨發票，可順帶入庫，並自動計入 401 的進項稅額。" },
					],
				},
				{
					id: "invoice",
					eyebrow: "金流與電子發票",
					title: "收款與開票接在同一條流程上",
					intro:
						"串接綠界（ECPay）的線上收款與電子發票。收款回拋不只驗簽章，還會二次核對金額與本地訂單一致才更新狀態 —— 只驗簽章等於信任對方傳來的數字。（串接依綠界公開文件實作，尚未在沙盒環境以真實交易驗證。）",
					items: [
						{ title: "線上收款", body: "產生付款連結，客戶刷卡或轉帳後自動更新訂單與收款紀錄。" },
						{ title: "電子發票", body: "從訂單開立發票，支援載具與愛心碼。發票一律以台幣開立（法規要求），外幣訂單用開單當時的匯率換算。" },
						{ title: "作廢與折讓", body: "開錯就作廢重開；部分退款或售後折價則開銷貨折讓，折讓會在開立當期扣減銷項，不必回頭改上一期。（折讓目前只做本地紀錄與稅務計算，尚未對外傳送給財政部。）" },
					],
				},
				{
					id: "tax",
					eyebrow: "稅務",
					title: "401 申報資料由憑證即時彙總",
					intro:
						"不另建報表資料表。銷項來自已開立且未作廢的發票，進項來自進項憑證，每次查詢都重新算 —— 所以報表不可能與單據對不起來。",
					items: [
						{ title: "稅別分開計算", body: "應稅、零稅率、免稅依單據明細的稅別快照分別彙總，不是全部混在一起。" },
						{ title: "折讓自動扣減", body: "折讓依原發票的稅別比例分攤扣減，捨不盡的那一分錢有明確歸屬，各稅別加總永遠等於總額。" },
						{ title: "CSV 匯出", body: "匯出 401 申報用的 CSV。匯出內容會中和試算表的公式注入，不會把危險字串直接送進 Excel。" },
						{ title: "申報倒數", body: "營運總覽顯示下一期的截止日與剩餘天數，剩一週內會標紅。" },
					],
				},
				{
					id: "collab",
					eyebrow: "協作",
					title: "請會計師幫忙，不必把密碼給他",
					intro:
						"報稅季最常見的做法是把帳號密碼交給會計師 —— 那等於把所有權限連同稽核紀錄的可信度一起交出去，之後每一筆操作都分不清是誰做的。",
					items: [
						{ title: "邀請制", body: "寄出邀請連結，對方用自己的帳號加入。連結綁定 email、有期限、單次使用、可撤銷。" },
						{ title: "三種角色", body: "擁有者可管理成員；會計師可讀寫單據與報表但不能動成員；唯讀只能看。" },
						{ title: "立刻生效的移除", body: "移除成員後對方立即失去存取權，不必等 token 過期。" },
						{ title: "每個人做了什麼都分得清", body: "因為每個人用自己的帳號，操作紀錄才能真的回答「誰做的」。" },
					],
				},
				{
					id: "security",
					eyebrow: "資安與稽核",
					title: "紀錄不能被偷偷改掉，而且你驗得到",
					intro:
						"append-only 如果只是一句承諾，那它就只是一句承諾。拿得到資料庫寫入權的人可以安靜地改掉一列，事後沒有任何人察覺得到 —— 除非紀錄本身有辦法自證。",
					items: [
						{ title: "雜湊鏈", body: "每筆稽核紀錄都把前一筆的雜湊算進自己的雜湊。改任何一筆，其後每一筆都會對不上；刪任何一筆，序號會出現缺口。" },
						{ title: "外部見證（尚未啟用）", body: "光有鏈擋不住有寫入權的人整條重算，所以鏈頭要定期送到平台控制不到的第三方留存。機制已實作完成，但測試站目前還沒接上外部端點，現階段只有本機檢查點。" },
						{ title: "你自己驗得到", body: "操作紀錄頁顯示驗證結果與最近一次外部見證的時間，並明說它驗得到什麼、驗不到什麼。" },
						{ title: "管理員看了你的資料，你會知道", body: "平台管理員不得存取業務資料；真要調閱必須填寫事由，取用本身會寫成一筆紀錄，而且會通知你。" },
						{ title: "公司之間完全隔離", body: "業務資料的查詢由資料存取層強制加上公司識別；少數跨表彙總（報表與稅務）依規定自行加上條件，並有專門的跨公司隔離測試覆蓋。" },
						{ title: "帳號安全", body: "密碼用 argon2id 雜湊；登入失敗會鎖定；平台管理員支援 TOTP 兩階段驗證，密鑰加密存放、備援碼只存雜湊。" },
					],
				},
				{
					id: "more",
					eyebrow: "其他",
					title: "一些讓日常省事的細節",
					intro: "",
					items: [
						{ title: "統編自動帶入", body: "建立客戶時輸入統一編號，自動帶入公司抬頭與地址，減少發票開錯抬頭的機會。查不到也不會擋住你建檔。" },
						{ title: "多幣別", body: "外幣單據存下開單當時的匯率快照，日後匯率變動不影響已開立的單據。報表與申報一律換算台幣後彙總。" },
						{ title: "郵件服務", body: "引導你把自有網域接上第三方郵件服務（Cloudflare、Resend、Postmark）並記錄轉寄規則。刻意不自建郵件伺服器 —— 那需要處理 IP 信譽與退信申訴，對一人公司完全不成比例。實際的收發仍由該服務商執行。" },
						{ title: "站內通知", body: "報價快到期、管理員取用資料等需要你知道的事，都會留在系統裡，有時戳也有已讀狀態。" },
					],
				},
			],
			ctaTitle: "看方案包含哪些功能",
			ctaBody: "三個方案的差別只在額度與功能範圍，計費機制目前尚未上線。",
			ctaCompare: "比較方案",
			ctaStart: "直接開始",
		},

		pricing: {
			eyebrow: "方案與定價",
			h1: "照公司的階段選，不必一開始就買到滿。",
			leadA: "三個方案的差別只在",
			leadQuota: "額度",
			leadAnd: "與",
			leadScope: "功能範圍",
			leadB: "，不影響資料的所有權。額度限制只作用在「新增」，既有資料一律看得到。",

			noteHead: "計費機制尚未上線，目前所有方案都免費。",
			noteA: "新註冊的公司會直接拿到功能最完整的",
			noteStrong: "專業方案",
			noteB: "。下面列出的是方案的實際結構與額度（與系統中的設定完全一致），價格會在開始收費前公告。",

			featuredTag: "功能與額度的平衡點",
			perMonth: " / 月",
			noPrice: "尚未定價",
			freeForNow: " · 目前免費",
			bestFor: "適合：",
			unlimited: "不限",
			notIncluded: "未包含",
			included: "包含",
			excluded: "不包含",

			compareTitle: "功能對照",
			compareBody: "下表直接對應系統中的方案設定，不是行銷用的簡化版本。",
			captionFeatures: "各方案包含的功能",
			captionQuotas: "各方案的用量上限（「不限」代表沒有數量限制）",
			thFeature: "功能",
			thItem: "項目",

			faqTitle: "常見問題",
			faqs: [
				{
					q: "現在註冊要付錢嗎？",
					a: "不用。計費機制尚未上線，目前所有新註冊的公司都會拿到功能最完整的專業方案。開始收費之前會先公告，不會直接從你的帳戶扣款。",
				},
				{
					q: "超過額度會怎麼樣？",
					a: "會擋下該次操作並提示升級，不會多收費，也不會刪掉你既有的資料。額度限制只作用在「新增」，既有的資料一律看得到。",
				},
				{
					q: "可以把資料帶走嗎？",
					a: "營業稅 401 的申報資料可以匯出 CSV（需要方案包含營業稅申報功能）。其餘資料目前沒有一鍵整包匯出的功能，這是我們知道的缺口，會補上。操作紀錄可以在畫面上查閱與篩選。",
				},
				{
					q: "會計師要另外算一個人嗎？",
					a: "會，成員人數包含你自己與所有受邀的協作者。但請務必用邀請功能，不要把密碼給會計師 —— 密碼一旦給出去，之後每一筆操作都分不清是誰做的，稽核紀錄也就失去意義。",
				},
				{
					q: "免費方案為什麼不能開發票？",
					a: "電子發票牽涉綠界的商店設定與財政部的字軌配號，不是單純的功能開關。等你真的要開發票時，代表生意已經開始了，那時再升級也不遲。",
				},
				{
					q: "外幣報價與外幣訂單算在哪個方案？",
					a: "多幣別本身不是獨立收費項目，只要方案包含報價單或訂單就能使用。外幣單據會存下開單當時的匯率，日後匯率變動不影響已開立的單據。",
				},
			],

			ctaTitle: "不確定要哪個方案？先從免費開始。",
			ctaBody: "計費上線前不必做任何決定。日後調整方案不會影響既有資料。",
			ctaFeatures: "先看功能",
		},
	},

	en: {
		tagline: "The complete back office for a one-person company",
		colon: ": ",

		nav: { home: "Home", features: "Features", pricing: "Pricing" },
		navAria: "Main navigation",
		skip: "Skip to main content",
		start: "Get started",

		footer: {
			blurb: "The complete back office for a one-person company. From quote to tax filing.",
			product: "Product",
			resources: "Resources",
			begin: "Start",
			featuresAll: "Feature overview",
			pricingAll: "Plans and pricing",
			security: "Security and audit",
			repo: "Source code (GitHub)",
			schema: "Data model docs",
			issues: "Report an issue",
			signin: "Sign in / Sign up",
			note: "Running on a staging deployment; features and pricing may still change.",
		},

		meta: {
			home: {
				title: "",
				description:
					"A management platform for one-person companies: quotes, orders, inventory, e-invoices and VAT filing, all doable on your own. Clients accept quotes online, and the decision goes into a chained audit trail where any later change leaves a trace.",
			},
			features: {
				title: "Features",
				description:
					"Everything Company of One does: quotes and orders, cash flow and receivables, inventory, e-invoices, VAT filing, working with your accountant, and an audit trail that shows when it has been tampered with.",
			},
			pricing: {
				title: "Pricing",
				description:
					"Company of One plans and quotas: Free, Standard and Pro, with quotas and feature scope laid out plainly. Billing is not live yet.",
			},
		},

		home: {
			eyebrow: "Management platform for one-person companies",
			h1: "One person still needs everything a company's back office has.",
			lead: "Quotes, orders, inventory, e-invoices and VAT filing, all finished in the same place. No three separate systems and a pile of spreadsheets, and no learning accounting just to record one transaction.",
			ctaFree: "Start for free",
			ctaFeatures: "See all features",

			whyEyebrow: "Why this exists",
			whyTitle: "What usually kills a one-person company isn't a lack of work.",
			whyBody:
				"It's not getting paid, and losing the hours meant for billable work to admin. Quotes that go out and are never chased, goods shipped without knowing how much is still owed, a filing deadline that arrives before you start digging through receipts — none of that is fixed by trying harder. It needs a system that remembers for you.",

			pillars: [
				{
					title: "See where the money is at a glance",
					body: "The dashboard you land on is total outstanding, overdue amounts, quotes to follow up and the countdown to your next filing. Nothing to total up yourself.",
					icon: "M3 3v18h18 M19 9l-5 5-4-4-3 3",
				},
				{
					title: "Your client presses accept themselves",
					body: "A quote goes out as a login-free link the client answers online. The decision is kept with its timestamp and source IP, and any later change leaves a trace.",
					icon: "M20 6 9 17l-5-5",
				},
				{
					title: "Records can't be quietly rewritten",
					body: "Every activity record is chained to the one before it. Change one and it stops adding up — and you can see the verification result yourself.",
					icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
				},
			],

			quote: {
				eyebrow: "Quote → deal",
				title: "Turn “did the client actually agree?” into something you have evidence for.",
				p1: "In most systems, “accepted” is a status you set yourself in your own back office. When a client later says they never agreed to that price, you have nothing to show.",
				p2a: "Here a quote can produce a login-free link you email to the client. They open it, see the full document, and accept or decline themselves, with a note if they want. That decision enters the audit trail with its timestamp and source IP, and the audit trail is a chain of hashes — ",
				p2strong: "any later modification leaves a trace",
				p2b: ".",
				ticks: [
					{ a: "The link expires, and ", b: "can only be answered once", c: " — it stays viewable afterwards, but the decision can't be changed" },
					{ a: "One click turns an accepted quote into an order, copying amounts and line items across; later edits to the quote never touch the order", b: "", c: "" },
					{ a: "You're reminded before it expires, and a daily background job marks expired quotes — no status to maintain by hand", b: "", c: "" },
				],
				mockAria:
					"Illustration: the client-side quote confirmation screen. Quote Q2026-0002 has two line items, brand identity design and business card design, totalling 142,800, with accept and decline buttons below.",
				mockTitle: "Quote Q2026-0002",
				mockTag: "Awaiting your reply",
				rows: [
					{ label: "Brand identity design × 1", value: "120,000.00" },
					{ label: "Business card design × 2", value: "16,000.00" },
					{ label: "VAT", value: "6,800.00" },
				],
				totalLabel: "Total",
				totalValue: "142,800.00",
				accept: "Accept this quote",
				decline: "Decline",
				mockNote: "Your reply is recorded together with its timestamp and source IP, as evidence for both sides.",
			},

			cash: {
				eyebrow: "Cash flow",
				title: "Who hasn't paid, and for how long — one table says it all.",
				body: "Outstanding balance = order total − payments received, recalculated from the documents every time and never cached. “The books say paid while the money never arrived” cannot happen.",
				ticks: [
					"Grouped by client into 30/60/90-day ageing buckets, so you can see who to chase first",
					"Expand any client to see paid and outstanding per document",
					"Foreign-currency orders are converted to TWD at the rate on the order before totalling",
					"Monthly statements print ready to send, with opening and closing balances",
				],
				mockAria:
					"Illustration: an accounts receivable ageing table. Hongyuan Design has outstanding amounts in the 1–30 and 31–60 day buckets, Sunny Studio has 126,000 at over 90 days, and the total outstanding is 195,750.",
				mockTitle: "Accounts receivable",
				mockDate: "As of 2026-08-30",
				rows: [
					{ label: "Hongyuan Design · 1–30 days", value: "54,000.00", warn: false },
					{ label: "Hongyuan Design · 31–60 days", value: "15,750.00", warn: false },
					{ label: "Sunny Studio · 90+ days", value: "126,000.00", warn: true },
				],
				totalLabel: "Total outstanding",
				totalValue: "195,750.00",
			},

			tax: {
				eyebrow: "Tax",
				title: "No more digging through a box of receipts at filing time.",
				bodyA: "Output and input tax for Form 401 are totalled live from invoices and vouchers — ",
				bodyStrong: "with no separate reporting tables",
				bodyB: " — so the report can never disagree with the documents.",
				ticks: [
					"Taxable, zero-rated and exempt are computed separately from the tax-category snapshot on each line",
					"Sales allowances reduce output tax in the period they are issued; no reopening the previous one",
					"Export the CSV used for the 401 filing, with figures that reconcile directly",
					"The dashboard shows the next filing deadline and the days remaining",
				],
				mockAria:
					"Illustration: a VAT Form 401 summary showing taxable sales 10,000, zero-rated sales 5,000, output tax 500, input tax 200 and tax payable this period 300.",
				mockTitle: "VAT return (Form 401)",
				mockPeriod: "2026, period 4",
				rows: [
					{ label: "Taxable sales", value: "10,000.00" },
					{ label: "Zero-rated sales", value: "5,000.00" },
					{ label: "Output tax", value: "500.00" },
					{ label: "Input tax", value: "200.00" },
				],
				totalLabel: "Tax payable this period",
				totalValue: "300.00",
			},

			trust: {
				eyebrow: "Trust",
				title: "Whether a record can be changed decides whether it is worth anything.",
				body: "The value of an audit trail rests on it not being editable after the fact. In most systems append-only is just a promise — anyone with write access to the database (the platform included) can quietly alter one row, and nobody would ever notice.",
				cards: [
					{
						title: "Hash chain",
						a: "Every record folds the previous record's hash into its own. Change one and every record after it stops matching; delete one and the sequence has a gap.",
						strong: "",
						b: "",
					},
					{
						title: "External witness (built, not yet enabled)",
						a: "A chain alone doesn't stop someone with write access from recomputing the lot, so the chain head has to be deposited periodically with a third party the platform doesn't control. The mechanism is fully implemented, but ",
						strong: "the staging deployment is not yet connected to an external witness endpoint",
						b: " — for now there are only local checkpoints.",
					},
					{
						title: "You can verify it yourself",
						a: "The activity log shows the verification result directly, along with when the last anchor was made and whether it actually reached the outside. The whole point is that you don't have to take our word for it.",
						strong: "",
						b: "",
					},
				],
				adminTitle: "And “who looked at your data” is recorded too",
				adminA:
					"Platform administrators can only manage accounts and company profiles; they may not access any business table. When content genuinely has to be retrieved (a court order, say), a reason must be entered, the access itself becomes an audit record, ",
				adminStrong: "and you are notified",
				adminB: ".",
				adminP2: "The protection comes from you knowing and someone being accountable, not from hiding things.",
				adminLink: "Read the full security and audit notes →",
				noticeAria:
					"Illustration: an in-app notification telling you that a platform administrator viewed one of your audit records, with the reason they entered.",
				noticeTitle: "Notification",
				noticeTag: "Unread",
				noticeHead: "A platform administrator viewed one of your audit records",
				noticeLine1: "The administrator (admin@…) viewed the full content of one “create quote” record.",
				noticeLine2: "Reason given: client reconciliation dispute, needs the amount at creation confirmed",
			},

			overviewEyebrow: "Feature overview",
			overviewTitle: "Everything a company actually uses is here.",
			overviewLink: "See the detail on each →",
			overview: [
				{ title: "Contacts and products", body: "Clients and suppliers managed together; enter a tax ID and the company name and address fill themselves in." },
				{ title: "Quotes and orders", body: "A state machine governs the flow and rejects illegal transitions. Copy an old document so recurring clients don't start from scratch." },
				{ title: "Inventory", body: "Stock is totalled live from the ledger, never cached. Negative stock is allowed but flagged in red." },
				{ title: "Payments and e-invoices", body: "ECPay payments and e-invoicing; payment callbacks re-check the amount before the status changes." },
				{ title: "VAT filing", body: "Form 401 output and input tax totalled live, allowances included, exportable as CSV." },
				{ title: "Working with your accountant", body: "Invite your accountant instead of handing over your password. Roles: owner, accountant, read-only." },
				{ title: "Multi-currency", body: "Foreign-currency documents store a rate snapshot, so later rate moves never change an issued document. Invoices are still issued in TWD." },
				{ title: "Mail service", body: "Guided setup for mail on your own domain, plus forwarding rules (a third-party provider; we don't run mail servers)." },
				{ title: "Activity log", body: "Everything that has happened on your account is there to look up, with the integrity check result." },
			],

			status: {
				eyebrow: "Where things stand",
				title: "The honest status.",
				head: "This is a product still under development.",
				bodyA:
					"It runs on a staging deployment. Every feature is implemented and covered by several hundred automated tests, run against both SQLite and PostgreSQL. But a few things have not been tried with real accounts: the ECPay payment and e-invoice integrations follow the public documentation but are unverified in the sandbox, the mail service is unverified against a real provider, allowances are not yet transmitted to the tax authority, and the audit chain's external witness endpoint is not connected. Billing is not live either, and there is currently ",
				bodyStrong: "no monitoring or alerting",
				bodyB: " — the staging deployment has been down for days at a time before.",
				bodyC: "This is written here because you have a right to know before you invest in it.",
			},

			finalTitle: "Start on the free plan and get your first quote out.",
			finalBody: "No credit card, and billing isn't live yet. The plans differ only in quotas and feature scope.",
			finalCompare: "Compare plans",
		},

		features: {
			eyebrow: "Features",
			h1: "Everything a company uses, it's all here.",
			lead: "Below is what each part actually does. It describes what the system genuinely can do, and it also spells out what is deliberately not built and what isn't finished yet.",
			note: "A few things have not been tried with real accounts and are flagged individually below: the ECPay payment and e-invoice integrations follow the public documentation but are unverified in the sandbox, the mail service is unverified against a real provider, allowances are not yet transmitted externally, and the audit chain's external witness endpoint is not connected.",
			tocAria: "Feature categories",
			sections: [
				{
					id: "quotes",
					eyebrow: "Quotes and orders",
					title: "From draft to deal, the status never gets muddled",
					intro:
						"Quotes and orders each have their own state machine. Which status may move to which is fixed in code, and illegal transitions are rejected by the backend — a shipped order can't be voided, for instance, because stock has already moved; that calls for a reversal rather than making a document disappear.",
					items: [
						{ title: "Clients confirm online", body: "Generate a login-free link to email the client; they accept or decline themselves and can add a note. The decision enters the audit chain with its timestamp and source IP." },
						{ title: "The link is a limited grant", body: "It expires, it maps to that one quote, and it can only be answered once. Even if the link leaks, all it can do is show that one document." },
						{ title: "Expiry handled for you", body: "Quotes past their validity are marked expired automatically; ones about to expire send you a reminder to follow up, once per quote." },
						{ title: "One click to an order", body: "Accept, then convert to an order with amounts and line items copied across. Later edits to the quote never affect an order already placed." },
						{ title: "Copy a previous document", body: "Issuing the same document every month doesn't mean building it again. What's copied is the snapshot at the time — if the product's price or name changed later, the copy keeps the original." },
						{ title: "Print and send", body: "Quotes print or save as PDF, laid out as a document rather than a screenshot of a web page." },
					],
				},
				{
					id: "money",
					eyebrow: "Cash flow",
					title: "Who owes you what, and for how long, without doing the maths",
					intro:
						"The outstanding balance is always computed live as “order total − payments received”, never stored in a cached column. A cache drifts from its source, and “the books say paid while the money never arrived” is far worse than being slightly slower.",
					items: [
						{ title: "Dashboard", body: "The first screen after signing in: invoiced this month, total outstanding, overdue, quotes to follow up, products with negative stock, and the countdown to the next filing." },
						{ title: "Receivables ageing", body: "Grouped by client into 1–30, 31–60, 61–90 and 90+ day buckets, so you can see who to chase first. Expand for individual documents." },
						{ title: "Client statements", body: "Produce a statement for a chosen period with opening balance, the documents and payments in it, and closing balance. Prints ready to send." },
						{ title: "Recording payments", body: "Cash and bank transfers are entered by hand; ECPay online payments are written in automatically once the amount checks out." },
					],
				},
				{
					id: "inventory",
					eyebrow: "Inventory",
					title: "Stock always equals the sum of the ledger",
					intro:
						"Quantity on hand is not stored in any column; it is totalled live from the movement ledger. That makes “the cached number and the ledger disagree and nobody knows which is right” impossible.",
					items: [
						{ title: "The ledger is the truth", body: "Receipts, issues and adjustments are each a movement record, append-only. A mistake is corrected with a reversing entry, not an edit." },
						{ title: "Shipping is never blocked", body: "When stock is short, negative quantities are allowed and flagged in red — in reality the goods may already be gone, and blocking only makes the books diverge from the warehouse." },
						{ title: "Purchase vouchers", body: "Enter a purchase invoice, optionally receive the stock at the same time, and it counts towards input tax on Form 401 automatically." },
					],
				},
				{
					id: "invoice",
					eyebrow: "Payments and e-invoices",
					title: "Getting paid and issuing the invoice are one flow",
					intro:
						"Integrated with ECPay for online payments and e-invoicing. Payment callbacks don't only verify the signature — they re-check the amount against the local order before the status changes; verifying the signature alone means trusting the numbers the other side sent. (The integration follows ECPay's public documentation and has not been verified with real transactions in the sandbox.)",
					items: [
						{ title: "Online payments", body: "Generate a payment link; once the client pays by card or transfer, the order and payment records update automatically." },
						{ title: "E-invoices", body: "Issue an invoice from an order, with carriers and donation codes supported. Invoices are always issued in TWD (as the law requires); foreign-currency orders use the rate stored on the order." },
						{ title: "Voids and allowances", body: "Issued wrong? Void and reissue. Partial refunds or after-sale discounts get a sales allowance, which reduces output tax in the period it is issued, with no need to reopen the previous one. (Allowances are currently recorded and taxed locally only, not yet transmitted to the tax authority.)" },
					],
				},
				{
					id: "tax",
					eyebrow: "Tax",
					title: "Form 401 figures are totalled live from the documents",
					intro:
						"No separate reporting tables. Output tax comes from issued, non-voided invoices and input tax from purchase vouchers, recomputed on every query — so the report cannot disagree with the documents.",
					items: [
						{ title: "Tax categories kept apart", body: "Taxable, zero-rated and exempt are totalled separately from the tax-category snapshot on each line, not lumped together." },
						{ title: "Allowances deducted automatically", body: "An allowance is apportioned across the original invoice's tax categories; the last rounding cent has a defined home, so the categories always add back up to the total." },
						{ title: "CSV export", body: "Export the CSV for the 401 filing. The export neutralises spreadsheet formula injection, so no dangerous string goes straight into Excel." },
						{ title: "Filing countdown", body: "The dashboard shows the next deadline and the days remaining, in red inside the last week." },
					],
				},
				{
					id: "collab",
					eyebrow: "Collaboration",
					title: "Bring your accountant in without handing over your password",
					intro:
						"The usual approach at filing time is to give the accountant your login — which hands over every permission along with the credibility of your audit trail, after which no entry can say who did what.",
					items: [
						{ title: "By invitation", body: "Send an invitation link; the other person joins with their own account. The link is bound to an email address, expires, is single-use and can be revoked." },
						{ title: "Three roles", body: "Owners manage members; accountants read and write documents and reports but can't touch membership; read-only can only look." },
						{ title: "Removal takes effect at once", body: "A removed member loses access immediately, with no waiting for a token to expire." },
						{ title: "Everyone's actions stay distinguishable", body: "Because each person uses their own account, the activity log can actually answer “who did this”." },
					],
				},
				{
					id: "security",
					eyebrow: "Security and audit",
					title: "Records can't be quietly rewritten, and you can verify that",
					intro:
						"If append-only is only a promise, then it is only a promise. Anyone with write access to the database can quietly alter one row and nobody would ever notice — unless the records can prove themselves.",
					items: [
						{ title: "Hash chain", body: "Every audit record folds the previous record's hash into its own. Change any one and every record after it stops matching; delete any one and the sequence has a gap." },
						{ title: "External witness (not yet enabled)", body: "A chain alone doesn't stop someone with write access from recomputing the lot, so the chain head has to be deposited periodically with a third party the platform doesn't control. The mechanism is implemented, but the staging deployment isn't connected to an external endpoint yet — for now there are only local checkpoints." },
						{ title: "You can verify it yourself", body: "The activity log shows the verification result and the time of the last external witness, and states plainly what it can and cannot prove." },
						{ title: "If an administrator reads your data, you'll know", body: "Platform administrators may not access business data; retrieving any requires a written reason, the access itself becomes a record, and you are notified." },
						{ title: "Companies are fully isolated", body: "Queries on business data get the company identifier enforced at the data-access layer; the few cross-table aggregations (reports and tax) add the condition themselves by rule, covered by dedicated cross-company isolation tests." },
						{ title: "Account security", body: "Passwords are hashed with argon2id; failed logins lock the account; platform administrators support TOTP two-factor, with the secret stored encrypted and backup codes stored only as hashes." },
					],
				},
				{
					id: "more",
					eyebrow: "Other",
					title: "Small things that save time day to day",
					intro: "",
					items: [
						{ title: "Tax ID lookup", body: "Enter a business number when creating a client and the company name and address fill in, so fewer invoices carry the wrong name. Not finding one never blocks you." },
						{ title: "Multi-currency", body: "Foreign-currency documents store the rate at the time of issue, so later rate moves don't change an issued document. Reports and filings always total in TWD." },
						{ title: "Mail service", body: "Guided setup to connect your own domain to a third-party mail provider (Cloudflare, Resend, Postmark) and record forwarding rules. Deliberately not a mail server of our own — that means IP reputation and bounce complaints, wildly out of proportion for a one-person company. Sending and receiving stay with the provider." },
						{ title: "In-app notifications", body: "Anything you need to know — a quote about to expire, an administrator accessing your data — stays in the system, with a timestamp and a read state." },
					],
				},
			],
			ctaTitle: "See what each plan includes",
			ctaBody: "The three plans differ only in quotas and feature scope, and billing is not live yet.",
			ctaCompare: "Compare plans",
			ctaStart: "Just get started",
		},

		pricing: {
			eyebrow: "Plans and pricing",
			h1: "Pick by the stage you're at, not by buying everything up front.",
			leadA: "The three plans differ only in ",
			leadQuota: "quotas",
			leadAnd: " and ",
			leadScope: "feature scope",
			leadB: "; none of it affects who owns your data. Quotas apply only to creating new records — everything already there stays visible.",

			noteHead: "Billing is not live yet, so every plan is currently free.",
			noteA: "Newly registered companies go straight onto the fully featured ",
			noteStrong: "Pro plan",
			noteB: ". What's listed below is the real structure and quotas (identical to the settings in the system); prices will be announced before charging begins.",

			featuredTag: "The balance of features and quota",
			perMonth: " / month",
			noPrice: "Not yet priced",
			freeForNow: " · free for now",
			bestFor: "Best for: ",
			unlimited: "Unlimited",
			notIncluded: "not included",
			included: "included",
			excluded: "not included",

			compareTitle: "Feature comparison",
			compareBody: "The table below maps directly to the plan settings in the system; it is not a simplified marketing version.",
			captionFeatures: "Features included in each plan",
			captionQuotas: "Usage limits per plan (“Unlimited” means no cap)",
			thFeature: "Feature",
			thItem: "Item",

			faqTitle: "Common questions",
			faqs: [
				{
					q: "Does signing up cost anything right now?",
					a: "No. Billing is not live, and every newly registered company currently gets the fully featured Pro plan. We will announce it before charging starts; nothing will be taken from your account without warning.",
				},
				{
					q: "What happens when I hit a quota?",
					a: "The action is blocked with a prompt to upgrade. You are never charged extra, and nothing you already have is deleted. Quotas apply only to creating new records; existing data stays visible.",
				},
				{
					q: "Can I take my data with me?",
					a: "The VAT 401 filing data exports as CSV (on plans that include VAT filing). The rest has no one-click bulk export yet — a gap we know about and will close. The activity log can be browsed and filtered on screen.",
				},
				{
					q: "Does my accountant count as another member?",
					a: "Yes; the member count includes you and every collaborator you invite. Please do use the invitation feature rather than giving your accountant your password — once the password is out, no entry can say who did what, and the audit trail loses its meaning.",
				},
				{
					q: "Why can't the free plan issue invoices?",
					a: "E-invoicing involves an ECPay merchant setup and number ranges allocated by the tax authority; it is not a simple feature toggle. By the time you genuinely need to issue invoices, business has started — upgrading then is soon enough.",
				},
				{
					q: "Which plan covers foreign-currency quotes and orders?",
					a: "Multi-currency is not charged separately; it works on any plan that includes quotes or orders. Foreign-currency documents store the rate at the time of issue, so later rate moves don't change an issued document.",
				},
			],

			ctaTitle: "Not sure which plan? Start with free.",
			ctaBody: "You don't have to decide anything before billing goes live. Changing plans later doesn't affect existing data.",
			ctaFeatures: "Look at the features first",
		},
	},
};
// 刻意不加 as const：加了之後兩個語系的陣列會各自變成內容不同的 tuple 型別，
// coo[locale] 就成了兩個 tuple 的聯集，元件裡的 .map() 會過不了型別檢查。

export function cooText(locale: Locale) {
	return coo[locale];
}
