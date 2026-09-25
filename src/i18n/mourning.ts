import type { Locale } from "../consts";

// 追悼日。每年這幾天（一律以台灣時間 UTC+8 判定）整站轉為黑白，並在頁面最上方
// 顯示一行說明。判定與套用的邏輯在 components/ThemeInit.astro，說明文字的顯示
// 規則在 components/MourningNotice.astro，兩邊都從這份清單產生，不會與它脫節。
//
// 選取標準：發生在台灣本地、造成建物倒塌或大量傷亡的天災與交通事故。
// 日後遇到國際重大事件或規模較小的事故，以這條標準判斷，不必每次重新討論，
// 也避免「加了某一個卻沒加另一個」被讀成表態。要加入不符合標準的日期，
// 需要站方明確決定。
//
// 六個事件落在五個日期上：2016 年美濃地震與 2018 年花蓮地震同為 2 月 6 日，
// 當天一句話同時提到兩者。年份寫死在文字裡，不動態計算「幾週年」。
//
// 英文刻意不提到網站本身，只陳述日期，所以這一行必須放在頁面最上方、進站即見，
// 「畫面為什麼是灰的」才是靠並置關係傳達。

/** key 為台灣時間（UTC+8）的 MM-DD。 */
export const MOURNING_DAYS = ["02-06", "04-03", "09-21", "09-23", "10-21"] as const;
export type MourningDay = (typeof MOURNING_DAYS)[number];

// Record<Locale, Record<MourningDay, string>> 讓「某個語系少一天」成為型別錯誤，
// 而不是該語系當天安靜地沒有說明文字。
export const mourning: Record<Locale, Record<MourningDay, string>> = {
	"zh-Hant": {
		"02-06": "本站今日悼念 2016 年美濃地震與 2018 年花蓮地震。",
		"04-03": "本站今日悼念 2024 年花蓮地震。",
		"09-21": "本站今日悼念 1999 年 921 大地震。",
		"09-23": "本站今日悼念 2025 年馬太鞍溪堰塞湖溢流事件。",
		"10-21": "本站今日悼念 2018 年普悠瑪列車出軌事故。",
	},
	en: {
		"02-06": "Today in Taiwan is the anniversary of the 2016 Meinong earthquake and the 2018 Hualien earthquake.",
		"04-03": "Today in Taiwan is the anniversary of the 2024 Hualien earthquake.",
		"09-21": "Today in Taiwan is the anniversary of the 1999 Chi-Chi (921) earthquake.",
		"09-23": "Today in Taiwan is the anniversary of the 2025 Matai'an Creek barrier-lake overflow in Hualien.",
		"10-21": "Today in Taiwan is the anniversary of the 2018 Puyuma train derailment.",
	},
};
