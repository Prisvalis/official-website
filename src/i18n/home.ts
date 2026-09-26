// 首頁文案。
//
// 比照 coo.ts 獨立成一個檔案：首頁的內容量遠超過 ui.ts 裡那些單行字串，
// 混在一起會讓共用字串表變得難找。兩個語系的物件形狀必須完全一樣，
// 由下面的 HomeContent 介面約束，少一個 key 是型別錯誤。
//
// 語氣依「華國美學」Skill 的 rules/copywriting.md：正式、公告式、過度說明、
// 自稱「本公司」、經常強調「e化」、句尾常用驚嘆號。
// 但語氣再熱情，事實不得誇大：
// - 目前站上唯一有可開啟的測試站的是 Company of One。它的原始碼 repo 為私有，
//   不得寫成公開。AI、GPU 與雲端主機沒有可公開的案例，只能寫「可洽詢」。
// - 產品的限制照實寫，不得比產品站自己標註的更成熟（見 coo.ts 的 status）。
// - 本公司為一人公司，不得寫出暗示有團隊或多名人員的說法。

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
		links: { product: string; demo: string; status: string };
	};
	process: { title: string; steps: { title: string; body: string }[] };
	scope: { title: string; body: string[] };
	contact: { title: string; body: string; cta: string; email: string };
}

export const home: Record<Locale, HomeContent> = {
	"zh-Hant": {
		hero: {
			h1: "量身訂做系統開發e化服務，從需求洽談到正式上線全程專人負責！",
			lead: "歡迎蒞臨算力有限公司官方網站！本公司為一人公司，與您洽談需求之人員，即為實際撰寫程式之人員，中間沒有任何轉手。本公司並非出租現成平台，而是依照您的實際問題，重新設計系統架構、重新評估報價。系統開發與部署上線作業，均在本公司服務範圍之內，誠摯歡迎多加利用。",
			ctaPrimary: "e化線上需求諮詢申請",
			ctaSecondary: "Company of One 產品介紹專區",
		},

		work: {
			title: "作品成果展示專區",
			lead: "Company of One 為本公司自行開發之一人公司營運管理e化平台，涵蓋報價、訂單、進銷存、電子發票及營業稅申報等各項作業，並設有測試站，歡迎實際註冊體驗！",
			caption: "Company of One 主要技術決策一覽表",
			columns: { area: "項目類別", approach: "實施做法", reason: "採用原因" },
			rows: [
				{
					area: "稽核紀錄管理",
					approach: "採用雜湊鏈機制，每筆紀錄皆包含前一筆紀錄之雜湊值",
					reason: "事後如有任何一筆遭到修改，其後每一筆均將無法對應",
				},
				{
					area: "報價確認作業",
					approach: "提供免登入連結，於有效期限內僅能回覆一次",
					reason: "客戶之決定將連同時間與來源 IP 一併留存備查",
				},
				{
					area: "營業稅 401 申報",
					approach: "不另行建立報表資料表，由發票與憑證即時彙總產生",
					reason: "報表與單據不會發生不一致之情形",
				},
				{
					area: "庫存數量管理",
					approach: "由異動流水帳即時加總計算，不另行儲存快取數量",
					reason: "不會發生兩個數字互相矛盾之情況",
				},
			],
			limits: "【重要提醒】本系統目前仍為測試站，敬請特別留意！綠界金流與電子發票係依公開文件實作，尚未於沙盒環境以真實交易進行驗證；稽核鏈之外部見證端點尚未接上；目前亦尚無監控與告警機制。造成不便之處，敬請見諒。",
			links: {
				product: "產品介紹資訊專區",
				demo: "e化測試站",
				status: "系統完整現況說明",
			},
		},

		process: {
			title: "合作流程說明",
			steps: [
				{
					title: "第一步：先行確認需求範圍",
					body: "請您先說明目前的現況，本公司將協助您釐清真正需要解決的問題，再決定開發的規模。不必要的功能，本公司會主動建議刪減，不會包進報價裡湊金額，請大家放心！",
				},
				{
					title: "第二步：範圍確認後始行報價",
					body: "報價一律依實際工作量計算。本公司沒有平台抽成，也沒有業務層層加價，敬請安心洽詢。",
				},
				{
					title: "第三步：同一人員全程負責",
					body: "與您討論需求之人員，即為撰寫程式之人員，需求不會在轉述過程中走樣，請放心交給本公司辦理。",
				},
				{
					title: "第四步：交付內容包含部署",
					body: "上線方式將於報價前與您共同確認；監控與後續維護是否納入，亦會明確載明於報價之中，以維護您的相關權益。",
				},
			],
		},

		scope: {
			title: "服務承接範圍說明",
			body: [
				"本公司主要承接項目為系統與後端開發，以及網站建置與部署上線作業，範圍涵蓋資料模型設計、後端 API 開發，一直到正式部署上線為止。",
				"AI 導入、資料分析、GPU 運算環境及雲端主機等項目，亦在可洽詢討論之範圍內。惟上述項目目前尚無可公開提供參考之案例，請先來信說明您的需求，本公司將再回覆是否適合承接，敬請見諒。",
				"已經使用 AI 做出可執行雛形、但卡在上線之前的個人朋友，可以只委託本公司補足缺少的部分，例如資料庫設計、部署作業或安全檢查。中小企業如流程仍在 Excel、紙本與 LINE 之間往返，本公司將先了解您目前實際的作業方式；有時只需調整流程即可，不一定需要撰寫程式，請不要擔心！",
			],
		},

		contact: {
			title: "聯絡資訊與服務窗口",
			body: "請將目前的狀況說明清楚即可，不需要事先撰寫規格文件。本公司將直接回覆是否可行、大約的規模與費用，也包括「這項工作您自行處理會比較快」這類的答案。如有任何疑問，歡迎隨時洽詢本公司服務窗口！",
			cta: "e化線上表單填寫申請",
			email: "或以電子郵件直接洽詢：",
		},
	},

	en: {
		hero: {
			h1: "Bespoke System Development e-Services, with One Dedicated Person from Enquiry to Launch!",
			lead: "Welcome to the Official Website of Prisvalis LTD.! This Company is a one-person company: the person who discusses your requirements is the very same person who writes the code, with no intermediaries of any kind. This Company does not rent out a ready-made platform. Instead, the system architecture is designed and the quotation is prepared afresh according to your actual problem. Both systems development and deployment fall within the service scope of this Company. You are warmly welcome to make use of them.",
			ctaPrimary: "Online e-Enquiry Application",
			ctaSecondary: "Company of One Product Information Section",
		},

		work: {
			title: "Work Results Exhibition Section",
			lead: "Company of One is an e-platform for one-person company operations management, developed in-house by this Company. It covers quotations, orders, inventory, e-invoicing and VAT filing, and a test site is provided. You are warmly welcome to register and try it!",
			caption: "Table of Principal Technical Decisions in Company of One",
			columns: { area: "Item Category", approach: "Method of Implementation", reason: "Reason for Adoption" },
			rows: [
				{
					area: "Audit Record Management",
					approach: "A hash chain mechanism is adopted: each record contains the hash of the preceding record",
					reason: "Should any record be altered afterwards, every record after it will fail to match",
				},
				{
					area: "Quotation Confirmation",
					approach: "A login-free link is provided, which may be answered only once within its validity period",
					reason: "The client's decision is retained, together with its time and source IP, for future reference",
				},
				{
					area: "VAT Form 401 Filing",
					approach: "No separate report tables are created; figures are totalled live from invoices and vouchers",
					reason: "The report and the documents will not disagree",
				},
				{
					area: "Inventory Quantity Management",
					approach: "Totalled live from the movement ledger; no cached quantity is stored",
					reason: "Two contradictory figures will not arise",
				},
			],
			limits: "IMPORTANT NOTICE: This system is currently a test site. Please take particular note! The ECPay payment and e-invoice integrations are implemented according to the public documentation and have not yet been verified with real transactions in the sandbox; the audit chain's external witness endpoint is not yet connected; and there is at present no monitoring or alerting mechanism. This Company sincerely apologises for any inconvenience caused.",
			links: {
				product: "Product Information Section",
				demo: "e-Test Site",
				status: "Complete System Status Statement",
			},
		},

		process: {
			title: "Cooperation Procedure Explanation",
			steps: [
				{
					title: "Step 1: Confirmation of Requirement Scope",
					body: "Please first describe your present situation. This Company will assist you in clarifying the problem that truly needs solving before deciding the scale of development. Unnecessary features will be proactively recommended for removal and will not be padded into the quotation. Please rest assured!",
				},
				{
					title: "Step 2: Quotation after Scope Confirmation",
					body: "All quotations are calculated according to the actual amount of work. This Company charges no platform commission and adds no layers of sales markup. Please enquire with confidence.",
				},
				{
					title: "Step 3: One Person Responsible Throughout",
					body: "The person who discusses your requirements is the person who writes the code, so requirements will not be distorted in relaying. Please feel free to entrust the matter to this Company.",
				},
				{
					title: "Step 4: Delivery Includes Deployment",
					body: "The method of going live will be confirmed jointly with you before quotation. Whether monitoring and subsequent maintenance are included will also be clearly stated in the quotation, in order to safeguard your rights and interests.",
				},
			],
		},

		scope: {
			title: "Service Scope Explanation",
			body: [
				"The principal services of this Company are systems and backend development, together with website construction and deployment, covering data model design and backend API development all the way to formal launch.",
				"AI integration, data analysis, GPU compute environments and cloud hosting are also within the scope of enquiry and discussion. However, there are at present no public cases available for reference in these areas. Please first write to describe your requirements, and this Company will reply as to whether they can be undertaken. Your kind understanding is respectfully requested.",
				"Individuals who have already built a working prototype with AI but are stuck before launch may entrust this Company with only the missing part, such as database design, deployment work or a security check. Where a small or medium business's workflow still moves between spreadsheets, paper and LINE messages, this Company will first understand how you actually work at present; sometimes adjusting the workflow is sufficient and no programming is required. Please do not worry!",
			],
		},

		contact: {
			title: "Contact Information and Service Window",
			body: "Simply describe your present situation clearly; no written specification is required in advance. This Company will reply directly as to feasibility, approximate scale and cost, including answers such as “this work would be quicker for you to handle yourself”. Should you have any questions, you are welcome to contact the Service Window of this Company at any time!",
			cta: "Online e-Form Application",
			email: "Or enquire directly by email:",
		},
	},
};
