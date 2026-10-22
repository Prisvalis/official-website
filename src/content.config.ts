// 新聞與公告。每篇一個 Markdown 檔，放在 src/content/news/<語系>/<slug>.md；
// 兩個語系用同一個檔名，路由與 hreflang 靠檔名配對（見 lib/news.ts）。
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const news = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
	schema: z.object({
		title: z.string(),
		// 列表頁與 meta description 共用，也是內文頁開頭的導言。
		description: z.string(),
		date: z.coerce.date(),
		// 新增類別時，i18n/news.ts 的 categories 要補上兩個語系的名稱。
		category: z.enum(["security"]),
		// 每個事實宣稱都要有公開佐證（brand-spec §13）。
		sources: z.array(z.object({ title: z.string(), url: z.string().url() })).default([]),
	}),
});

export const collections = { news };
