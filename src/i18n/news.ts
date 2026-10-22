// 新聞與公告（/news 與 /en/news）的介面文字。文章本身在 src/content/news/。
// 兩個語系的物件形狀必須一致，由 NewsContent 介面約束。

import type { Locale } from "../consts";

interface NewsContent {
	metaTitle: string;
	metaDescription: string;
	navLabel: string;
	h1: string;
	lead: string;
	caption: string;
	colDate: string;
	colCategory: string;
	colTitle: string;
	empty: string;
	published: string;
	category: string;
	sources: string;
	backToList: string;
	categories: Record<"security", string>;
}

export const NEWS_PATH: Record<Locale, string> = { "zh-Hant": "/news/", en: "/en/news/" };

export const news: Record<Locale, NewsContent> = {
	"zh-Hant": {
		metaTitle: "新聞與公告｜算力有限公司 Prisvalis",
		metaDescription: "算力有限公司（Prisvalis LTD.）的新聞、資安公告與服務異動說明。",
		navLabel: "新聞與公告",
		h1: "新聞與公告",
		lead: "本公司的新聞、資安公告與服務異動說明，依發布日期由新到舊排列。",
		caption: "所有公告，依發布日期排列",
		colDate: "發布日期",
		colCategory: "類別",
		colTitle: "標題",
		empty: "目前沒有公告。",
		published: "發布日期",
		category: "類別",
		sources: "參考資料",
		backToList: "所有公告",
		categories: { security: "資安公告" },
	},
	en: {
		metaTitle: "News and Notices｜Prisvalis LTD.",
		metaDescription: "News, security notices and service updates from Prisvalis LTD. (算力有限公司).",
		navLabel: "News",
		h1: "News and Notices",
		lead: "News, security notices and service updates from this Company, newest first.",
		caption: "All notices, by publication date",
		colDate: "Published",
		colCategory: "Category",
		colTitle: "Title",
		empty: "There are no notices yet.",
		published: "Published",
		category: "Category",
		sources: "Sources",
		backToList: "All notices",
		categories: { security: "Security notice" },
	},
};
