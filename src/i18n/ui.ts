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
	},
} as const;

export type UIKey = keyof (typeof ui)["zh-Hant"];

export function t(locale: Locale, key: UIKey): string {
	return ui[locale][key];
}
