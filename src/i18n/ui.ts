import type { Locale } from "../consts";

// UI string table. Add new keys here; each locale must provide every key.
export const ui = {
	"zh-Hant": {
		"meta.title": "算力有限公司 Prisvalis｜官方網站即將上線",
		"meta.description":
			"算力有限公司（Prisvalis LTD.）官方網站建置中，敬請期待。我們專注於算力與智慧運算解決方案。",
		"html.lang": "zh-Hant",
		"og.locale": "zh_TW",
		badge: "官方網站建置中",
		heading: "即將上線",
		subheading: "我們正在打造更好的體驗，敬請期待。",
		contact: "聯絡我們",
		"switch.to": "English",
		"switch.aria": "Switch to English",
		"theme.aria": "切換深色／淺色模式",
		rights: "版權所有",
		taxId: "統一編號",
		"contact.meta.title": "聯絡我們｜算力有限公司 Prisvalis",
		"contact.meta.description":
			"與算力有限公司（Prisvalis LTD.）聯絡。填寫表單告訴我們你的需求，我們會盡快回覆。",
		"contact.heading": "聯絡我們",
		"contact.lead": "有合作提案、技術問題或任何想談的事，填下面的表單，我們會回信到你留的信箱。",
		"contact.name": "你的稱呼",
		"contact.namePlaceholder": "王小明",
		"contact.email": "電子郵件",
		"contact.emailHint": "我們會回信到這個位址，請確認沒有打錯。",
		"contact.subject": "主旨",
		"contact.subjectPlaceholder": "想討論的事情",
		"contact.message": "訊息內容",
		"contact.messagePlaceholder": "越具體越好，方便我們直接給你有用的回覆。",
		"contact.submit": "送出訊息",
		"contact.sending": "傳送中…",
		"contact.privacy":
			"送出後，表單內容會寄到我們的信箱，並記錄你的來源 IP 與國家以防濫用。我們不會把這些資料用於其他用途，也不會轉給第三方。",
		"contact.sent.title": "訊息已送出",
		"contact.sent.body": "謝謝你的來信，我們收到了，會盡快回覆到你留的信箱。",
		"contact.error.invalid": "有欄位沒填好，請檢查後再送出一次。",
		"contact.error.captcha": "人機驗證沒通過，請重新驗證後再送出。",
		"contact.error.failed": "系統暫時無法寄出訊息，請稍後再試，或直接寫信給我們。",
		"contact.error.mailto": "直接寄信",
		"contact.back": "回首頁",
	},
	en: {
		"meta.title": "Prisvalis LTD.｜Official Website Coming Soon",
		"meta.description":
			"The official website of Prisvalis LTD. (算力有限公司) is under construction. We build computing power and intelligent compute solutions.",
		"html.lang": "en",
		"og.locale": "en_US",
		badge: "Website under construction",
		heading: "Coming Soon",
		subheading: "We are crafting a better experience. Stay tuned.",
		contact: "Get in touch",
		"switch.to": "中文",
		"switch.aria": "切換為中文",
		"theme.aria": "Toggle dark / light mode",
		rights: "All rights reserved",
		taxId: "Unified Business No.",
		"contact.meta.title": "Contact us｜Prisvalis LTD.",
		"contact.meta.description":
			"Get in touch with Prisvalis LTD. (算力有限公司). Tell us what you need and we will get back to you.",
		"contact.heading": "Contact us",
		"contact.lead":
			"A partnership, a technical question, or anything else worth discussing — fill in the form below and we will reply to the address you leave.",
		"contact.name": "Your name",
		"contact.namePlaceholder": "Jane Doe",
		"contact.email": "Email",
		"contact.emailHint": "We reply to this address, so please check it is right.",
		"contact.subject": "Subject",
		"contact.subjectPlaceholder": "What this is about",
		"contact.message": "Message",
		"contact.messagePlaceholder": "The more specific, the more useful our reply can be.",
		"contact.submit": "Send message",
		"contact.sending": "Sending…",
		"contact.privacy":
			"On submit, the form content is emailed to us, and your source IP and country are recorded to prevent abuse. We do not use this for anything else and do not pass it to third parties.",
		"contact.sent.title": "Message sent",
		"contact.sent.body":
			"Thanks for writing — we have it, and we will reply to the address you left as soon as we can.",
		"contact.error.invalid": "Something in the form is not filled in correctly. Please check and send again.",
		"contact.error.captcha": "The human check did not pass. Please verify again and resend.",
		"contact.error.failed":
			"We could not send the message right now. Please try again later, or email us directly.",
		"contact.error.mailto": "Email us directly",
		"contact.back": "Back to home",
	},
} as const;

export type UIKey = keyof (typeof ui)["zh-Hant"];

export function t(locale: Locale, key: UIKey): string {
	return ui[locale][key];
}
