// 新聞與公告的資料存取。文章 id 是「<語系>/<slug>」，兩個語系用同一個 slug。
import { getCollection, type CollectionEntry } from "astro:content";
import type { Locale } from "../consts";

export type NewsEntry = CollectionEntry<"news">;

export const slugOf = (entry: NewsEntry) => entry.id.split("/").slice(1).join("/");

/** 某語系的所有文章，由新到舊。 */
export async function getNews(locale: Locale): Promise<NewsEntry[]> {
	// glob loader 會把 id 轉成小寫（zh-Hant → zh-hant）。
	const all = await getCollection("news", (e) => e.id.startsWith(`${locale.toLowerCase()}/`));
	return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** 內文頁的 getStaticPaths。少了另一個語系的版本就讓建置失敗：hreflang 不能指向不存在的頁面。 */
export async function newsPaths(locale: Locale) {
	const other: Locale = locale === "zh-Hant" ? "en" : "zh-Hant";
	const otherSlugs = new Set((await getNews(other)).map(slugOf));
	return (await getNews(locale)).map((entry) => {
		const slug = slugOf(entry);
		if (!otherSlugs.has(slug)) throw new Error(`news/${locale}/${slug}.md 缺少 ${other} 版本`);
		return { params: { slug }, props: { entry } };
	});
}

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
