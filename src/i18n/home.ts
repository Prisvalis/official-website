// 首頁文案。
//
// 比照 coo.ts 獨立成一個檔案 —— 首頁的內容量遠超過 ui.ts 裡那些單行字串，
// 混在一起會讓共用字串表變得難找。兩個語系的物件形狀必須完全一樣：
// 元件是用 home[locale] 取值後直接渲染，少一個 key 只會在該語系的頁面上
// 安靜地少一段內容，不會有建置錯誤。

import type { Locale } from "../consts";

interface Item {
	title: string;
	body: string;
	/** 服務項目用的技術標籤，點名到具體產品讓客戶一眼看懂在賣什麼。 */
	tag?: string;
}

interface HomeContent {
	hero: {
		eyebrow: string;
		h1: string;
		lead: string;
		ctaPrimary: string;
		ctaSecondary: string;
	};
	approach: { eyebrow: string; title: string; items: Item[] };
	services: { eyebrow: string; title: string; lead: string; items: Item[] };
	audience: { eyebrow: string; title: string; items: Item[] };
	compute: { eyebrow: string; title: string; body: string[] };
	product: {
		eyebrow: string;
		title: string;
		lead: string;
		points: string[];
		note: string;
		cta: string;
	};
	closing: { title: string; body: string; cta: string };
}

export const home: Record<Locale, HomeContent> = {
	"zh-Hant": {
		hero: {
			eyebrow: "算力有限公司 Prisvalis",
			h1: "你的需求，不該去遷就別人的方案。",
			lead: "我們不是把現成平台租給你。每一個案子都重新理解需求、重新設計架構、重新估價 —— 從系統開發、AI 導入到雲端部署，由同一組人負責到能上線為止。",
			ctaPrimary: "聊聊你的需求",
			ctaSecondary: "看我們的產品",
		},

		approach: {
			eyebrow: "運作模式",
			title: "為什麼我們給得出合理的價格。",
			items: [
				{
					title: "先談清楚，再報價",
					body: "我們不賣方案包。先弄懂你實際要解決的問題，再決定要做多少、用什麼做。該砍的功能會建議你砍掉，而不是包進報價裡湊金額。",
				},
				{
					title: "直接對接，沒有中間層",
					body: "跟你討論需求的人，就是實際寫程式的人。需求不會在轉述過程中走樣，價格裡也不含平台抽成與業務層層加價。",
				},
				{
					title: "交付的是能上線的東西",
					body: "不是把程式寫完就結束。部署、監控、上線後怎麼維護都在討論範圍內，不會做到一半把伺服器丟給你自己想辦法。",
				},
			],
		},

		services: {
			eyebrow: "服務範圍",
			title: "我們實際在做的事。",
			lead: "下面是目前主要承接的類型。這份清單不是封閉的 —— 量身訂做的意思，本來就包含「先問問看」。",
			items: [
				{
					title: "系統與後端開發",
					tag: "資料庫 / API / 金流 / 電子發票",
					body: "從資料模型設計到串接綠界金流與電子發票。從零到上線的完整應用是我們自己做過的，不是只寫過其中一段。",
				},
				{
					title: "AI 導入與資料分析",
					tag: "模型部署 / 資料清理 / 流程整合",
					body: "先把資料整理成可用的形狀，再決定 AI 應該放在流程的哪一段。不會為了用 AI 而用 AI —— 有些問題寫幾行規則就解決了。",
				},
				{
					title: "GPU 運算環境建置",
					tag: "NVIDIA L40S / DGX Spark",
					body: "實機部署與調校經驗，知道哪些工作負載值得上 GPU、哪些用 CPU 就夠。不必要的硬體我們不會叫你買。",
				},
				{
					title: "雲端主機與部署維運",
					tag: "VPS / 實體機 / CI-CD / 監控",
					body: "依實際負載選型、建置與長期維運。上線只是開始，半夜會不會出事、出事了誰知道，才是真正的成本。",
				},
				{
					title: "網站與網頁託管",
					tag: "形象網站 / Landing Page / 上線託管",
					body: "從版面到部署一併處理，交付的是能直接對外的網址，不是一包丟給你自己想辦法架的原始碼。",
				},
				{
					title: "其他 / 一般諮詢",
					tag: "不在清單上的需求",
					body: "你覺得我們可能做得到的，歡迎直接問。談過才知道可不可行，問一句不用錢。",
				},
			],
		},

		audience: {
			eyebrow: "服務對象",
			title: "我們特別熟悉的兩種處境。",
			items: [
				{
					title: "中小型企業",
					body: "流程還在 Excel、紙本與 LINE 訊息之間來回，知道該數位化但不知道從哪裡開始。我們會先看你現在實際怎麼做事，再決定要不要寫程式 —— 有時候答案是不必寫，調整流程就夠了。",
				},
				{
					title: "個人與 vibe coder",
					body: "你已經用 AI 做出能動的雛形，卻卡在「能動」到「能上線」之間：資料庫沒有設計過、沒有備份機制、不確定怎麼部署、擔心有安全漏洞。這段路我們很熟，可以接手，也可以只補你缺的那一塊。",
				},
			],
		},

		compute: {
			eyebrow: "為什麼是我們",
			title: "公司名字叫算力，這塊我們自己動手做過。",
			body: [
				"不是看規格表選硬體。NVIDIA L40S 與 DGX Spark 我們實際部署、調校、踩過坑，所以知道哪些工作負載真的需要 GPU、哪些用 CPU 就夠 —— 這會直接反映在報價上。",
				"雲端主機也一樣。我們與伺服器供應商配合，依你的實際負載選型，而不是一律推薦最貴的那一台。用不到的效能，付出去的錢一樣拿不回來。",
			],
		},

		product: {
			eyebrow: "我們自己的產品",
			title: "Company of One",
			lead: "一人公司的完整後台。報價、訂單、進銷存、電子發票、營業稅申報，一個人就能完成。",
			points: [
				"報價寄出去之後，客戶自己線上按接受或婉拒，決定會留下時間與來源紀錄",
				"未收款、逾期金額與申報倒數直接顯示在總覽，不必自己彙總",
				"每一筆異動都進入環環相扣的稽核鏈，事後被改過會驗得出來",
			],
			note: "目前為測試站，功能與定價仍可能調整。",
			cta: "看 Company of One",
		},

		closing: {
			title: "不確定從哪裡開始，也可以先聊。",
			body: "把現在的狀況說清楚就好，不需要先寫好規格。我們會直接告訴你可不可行、大概的規模與費用 —— 包含「這個你自己做比較快」這種答案。",
			cta: "聯絡我們",
		},
	},

	en: {
		hero: {
			eyebrow: "Prisvalis LTD. 算力有限公司",
			h1: "Your requirements should not have to fit someone else's plan.",
			lead: "We are not renting you a ready-made platform. Every project starts from your actual problem: the architecture is designed for it, and the quote is worked out for it. From backend systems to AI and cloud deployment, the same people see it through to production.",
			ctaPrimary: "Tell us what you need",
			ctaSecondary: "See our product",
		},

		approach: {
			eyebrow: "How we work",
			title: "Why our pricing holds up to scrutiny.",
			items: [
				{
					title: "Scope first, price second",
					body: "We do not sell packages. We work out what you are actually trying to solve, then decide how much needs building and with what. Features that should be cut get cut, rather than padded into the quote.",
				},
				{
					title: "You talk to the person writing the code",
					body: "No account manager relaying your requirements second-hand, so nothing is lost in translation. No platform commission or sales markup buried in the price either.",
				},
				{
					title: "Delivered means running in production",
					body: "Finishing the code is not the finish line. Deployment, monitoring and ongoing maintenance are part of the conversation — we will not hand you a half-configured server and wish you luck.",
				},
			],
		},

		services: {
			eyebrow: "What we do",
			title: "The work we actually take on.",
			lead: "These are the kinds of project we handle most. The list is not closed — building to fit means asking first is always an option.",
			items: [
				{
					title: "Backend and systems",
					tag: "Databases / APIs / payments / e-invoicing",
					body: "From the data model up to payment and e-invoicing integrations. We have taken a full application from nothing to production ourselves, not just written one layer of someone else's.",
				},
				{
					title: "AI and data analysis",
					tag: "Model deployment / data cleaning / integration",
					body: "Get the data into a usable shape first, then decide where AI belongs in the workflow. We will not reach for a model when a few lines of plain logic would do the job better.",
				},
				{
					title: "GPU compute environments",
					tag: "NVIDIA L40S / DGX Spark",
					body: "Deployed and tuned in practice, so we know which workloads earn a GPU and which are fine on CPU. We will not tell you to buy hardware you do not need.",
				},
				{
					title: "Cloud hosting and operations",
					tag: "VPS / bare metal / CI-CD / monitoring",
					body: "Sized to your real workload, set up, and kept running. Going live is the easy part; whether it holds up at three in the morning, and who finds out when it does not, is the real cost.",
				},
				{
					title: "Websites and web hosting",
					tag: "Company sites / landing pages / hosting",
					body: "Layout through to deployment in one piece. What you get is a working address, not a folder of source code and best wishes.",
				},
				{
					title: "Anything else",
					tag: "Not on the list",
					body: "If you think we might be able to help, just ask. Working out whether it is feasible costs you a conversation.",
				},
			],
		},

		audience: {
			eyebrow: "Who we work with",
			title: "Two situations we know well.",
			items: [
				{
					title: "Small and medium businesses",
					body: "Your process lives somewhere between spreadsheets, paper and chat messages. You know it should be digitised but not where to start. We look at how you actually work before deciding whether to write any code — sometimes the answer is that fixing the process is enough.",
				},
				{
					title: "Individuals and vibe coders",
					body: "You have built a working prototype with AI, and you are stuck between working and shippable: the database was never designed, there are no backups, deployment is unclear and security is a worry. We know this stretch of road. We can take it over, or fill in only the part you are missing.",
				},
			],
		},

		compute: {
			eyebrow: "Why us",
			title: "Our name means computing power, and we have run it ourselves.",
			body: [
				"Hardware chosen from experience, not from a spec sheet. We have deployed, tuned and debugged NVIDIA L40S and DGX Spark in practice, so we know which workloads genuinely need a GPU and which are fine on CPU — and that shows up directly in the quote.",
				"Cloud machines work the same way. We work with server providers and size the instance to your real workload instead of defaulting to the most expensive tier. Capacity you never use is money you do not get back.",
			],
		},

		product: {
			eyebrow: "Our own product",
			title: "Company of One",
			lead: "The complete back office for a one-person company. Quotes, orders, stock, e-invoicing and VAT filing, all doable by one person.",
			points: [
				"Send a quote and the client accepts or declines it online, with the decision timestamped and attributed",
				"Outstanding payments, overdue amounts and the filing countdown sit on the dashboard — no manual tallying",
				"Every change enters a linked audit chain, so later tampering is detectable rather than invisible",
			],
			note: "Currently a test deployment; features and pricing may still change.",
			cta: "See Company of One",
		},

		closing: {
			title: "Not sure where to start? Start by talking.",
			body: "Just describe where things stand — no written spec needed. We will tell you straight whether it is feasible, roughly how big it is and what it would cost, up to and including “you would be faster doing this yourself”.",
			cta: "Contact us",
		},
	},
};
