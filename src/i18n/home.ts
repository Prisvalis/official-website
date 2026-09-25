// 首頁文案。
//
// 比照 coo.ts 獨立成一個檔案：首頁的內容量遠超過 ui.ts 裡那些單行字串，
// 混在一起會讓共用字串表變得難找。兩個語系的物件形狀必須完全一樣，
// 由下面的 HomeContent 介面約束，少一個 key 是型別錯誤。
//
// 寫這份文案時的取捨（規則出處在 CLAUDE.md「文案」一節）：
// - 每個能力宣稱都要有可指向的佐證。目前站上唯一有公開 repo 與測試站的
//   是 Company of One，所以它是頁面主體；AI、GPU 與雲端主機沒有可公開的
//   案例，只在「承接範圍」以一句話交代，不寫經驗宣稱。
// - 產品的限制照實寫，不得比產品站自己標註的更成熟（見 coo.ts 的 status）。
// - 人稱一律單數。

import type { Locale } from "../consts";

interface WorkRow {
	area: string;
	approach: string;
	reason: string;
}

interface HomeContent {
	hero: {
		h1: string;
		lead: string;
		ctaPrimary: string;
		ctaSecondary: string;
	};
	work: {
		title: string;
		lead: string;
		caption: string;
		columns: WorkRow;
		rows: WorkRow[];
		limits: string;
		links: { product: string; repo: string; demo: string; status: string };
	};
	process: { title: string; steps: { title: string; body: string }[] };
	scope: { title: string; body: string[] };
	contact: { title: string; body: string; cta: string; email: string };
}

export const home: Record<Locale, HomeContent> = {
	"zh-Hant": {
		hero: {
			h1: "量身訂做的系統，從需求談到上線由我一人負責。",
			lead: "算力有限公司是一人公司，跟你討論需求的人就是寫程式的人。我不是把現成平台租給你，而是從你的問題出發，重新設計架構、重新估價。系統開發與部署都在這個範圍內。",
			ctaPrimary: "聊聊需求",
			ctaSecondary: "看 Company of One",
		},

		work: {
			title: "作品",
			lead: "Company of One 是我自己寫的一人公司後台，涵蓋報價、訂單、進銷存、電子發票與營業稅申報。原始碼公開，也有可以實際註冊的測試站。",
			caption: "Company of One 的幾個技術決策",
			columns: { area: "項目", approach: "做法", reason: "原因" },
			rows: [
				{
					area: "稽核紀錄",
					approach: "雜湊鏈，每筆紀錄都含前一筆的雜湊",
					reason: "事後改動任何一筆，之後的每一筆都會對不上",
				},
				{
					area: "報價確認",
					approach: "免登入連結，期限內只能回覆一次",
					reason: "客戶的決定連同時間與來源 IP 一起留存",
				},
				{
					area: "營業稅 401",
					approach: "不另建報表資料表，由發票與憑證即時彙總",
					reason: "報表不可能與單據對不起來",
				},
				{
					area: "庫存",
					approach: "由異動流水帳即時加總，不存快取數量",
					reason: "不會出現兩個數字互相打架的情況",
				},
			],
			limits: "目前是測試站。綠界金流與電子發票依公開文件實作，尚未在沙盒以真實交易驗證；稽核鏈的外部見證端點尚未接上；沒有監控與告警。",
			links: {
				product: "產品介紹",
				repo: "原始碼",
				demo: "測試站",
				status: "完整現況",
			},
		},

		process: {
			title: "合作方式",
			steps: [
				{
					title: "先談範圍",
					body: "你說明現況，我問清楚要解決的是什麼問題，再決定做多少。該砍的功能我會建議砍掉，不會包進報價裡湊金額。",
				},
				{
					title: "確認後才報價",
					body: "報價依實際工作量計算。沒有平台抽成，也沒有業務層層加價。",
				},
				{
					title: "同一個人做到底",
					body: "跟你討論的人就是寫程式的人，需求不會在轉述中走樣。",
				},
				{
					title: "交付含部署",
					body: "上線的方式在報價前一起談定，監控與後續維護是否納入，也會寫進報價。",
				},
			],
		},

		scope: {
			title: "承接範圍",
			body: [
				"主要承接系統與後端開發，以及網站與部署：從資料模型設計、後端 API 到部署上線。",
				"AI 導入、資料分析、GPU 運算環境與雲端主機也在可以討論的範圍內。這幾項目前沒有可以公開指向的案例，請先來信說明需求，我再回覆是否適合。",
				"已經用 AI 做出可執行的雛形、卡在上線之前的個人，可以只找我補缺的部分，例如資料庫設計、部署與安全檢查。中小型企業的流程若還在 Excel、紙本與 LINE 之間往返，我會先看你現在怎麼做事；有時候調整流程就夠，不需要寫程式。",
			],
		},

		contact: {
			title: "聯絡",
			body: "把現況說清楚就好，不需要先寫規格。我會直接回覆可不可行、大概的規模與費用，包含「這個你自己做比較快」這種答案。",
			cta: "填寫表單",
			email: "或直接寫信",
		},
	},

	en: {
		hero: {
			h1: "Bespoke systems, taken from first conversation to production by one person.",
			lead: "Prisvalis is a one-person company, so the person discussing your requirements is the one writing the code. I don't rent you a ready-made platform; I start from your problem, design the architecture around it and price it from scratch. Systems development and deployment both fall inside that.",
			ctaPrimary: "Tell me what you need",
			ctaSecondary: "See Company of One",
		},

		work: {
			title: "Work",
			lead: "Company of One is a back office for one-person companies that I wrote myself: quotes, orders, inventory, e-invoicing and VAT filing. The source is public, and there is a test deployment you can register on.",
			caption: "A few of the technical decisions in Company of One",
			columns: { area: "Area", approach: "Approach", reason: "Reason" },
			rows: [
				{
					area: "Audit trail",
					approach: "A hash chain: every record includes the previous record's hash",
					reason: "Changing any record afterwards breaks every record after it",
				},
				{
					area: "Quote acceptance",
					approach: "A login-free link, answerable once within its validity period",
					reason: "The client's decision is kept with its timestamp and source IP",
				},
				{
					area: "VAT Form 401",
					approach: "No separate report tables; totalled live from invoices and vouchers",
					reason: "The report cannot disagree with the documents",
				},
				{
					area: "Inventory",
					approach: "Totalled live from the movement ledger, with no cached quantity",
					reason: "There are never two numbers disagreeing",
				},
			],
			limits: "It is a test deployment. The ECPay payment and e-invoice integrations follow the public documentation and have not been run against the sandbox with real transactions, the audit chain's external witness endpoint is not connected, and there is no monitoring or alerting.",
			links: {
				product: "Product overview",
				repo: "Source code",
				demo: "Test site",
				status: "Full status",
			},
		},

		process: {
			title: "How I work",
			steps: [
				{
					title: "Scope first",
					body: "You describe where things stand and I work out which problem actually needs solving, then decide how much to build. Features that do not earn their place get cut, and they stay out of the quote.",
				},
				{
					title: "Price once scope is agreed",
					body: "The quote follows the actual amount of work. There is no platform commission and no layers of sales markup.",
				},
				{
					title: "One person throughout",
					body: "The person you talk to is the person writing the code, so requirements are never relayed second-hand.",
				},
				{
					title: "Deployment included",
					body: "How it goes live is settled before the quote, and whether monitoring and later maintenance are included is written into it.",
				},
			],
		},

		scope: {
			title: "Scope",
			body: [
				"Mostly backend and systems development, plus websites and deployment: from data model and API design through to going live.",
				"AI integration, data analysis, GPU compute environments and cloud hosting are also open for discussion. There are no public projects I can point to for these yet, so please write first and I will tell you whether it is a fit.",
				"If you have built a working prototype with AI and are stuck before production, you can hire me for just the missing part, such as database design, deployment or a security check. If a small business's process still moves between spreadsheets, paper and chat messages, I start by looking at how you work today; sometimes adjusting the process is enough and no code is needed.",
			],
		},

		contact: {
			title: "Contact",
			body: "Just describe where things stand; no written spec needed. I will tell you straight whether it is feasible, roughly how big it is and what it would cost, including the answer “you would be faster doing this yourself”.",
			cta: "Open the form",
			email: "Or write directly",
		},
	},
};
