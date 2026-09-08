// Global, framework-agnostic site data. Import from anywhere with `import`.

// Production domain. Keep in sync with `site` in astro.config.mjs.
export const SITE = "https://www.prisvalis.com";

// Company identity, shown across the site and in structured data.
export const COMPANY = {
	nameZh: "算力有限公司",
	nameEn: "Prisvalis LTD.",
	shortEn: "Prisvalis",
	// Public contact address shown on the Coming Soon page. Update if needed.
	email: "admin@mail.prisvalis.com",
	// 統一編號（台灣的營利事業統一編號），頁尾與結構化資料共用同一個來源。
	taxId: "62010947",
} as const;

// Official social profiles. Also emitted as `sameAs` in structured data.
export const SOCIAL = {
	instagram: "https://www.instagram.com/prisvalis.ltd",
	threads: "https://www.threads.com/@prisvalis.ltd",
} as const;

export const DEFAULT_LOCALE = "zh-Hant";
export const LOCALES = ["zh-Hant", "en"] as const;
export type Locale = (typeof LOCALES)[number];

// Absolute URL for each locale's home page (used for hreflang + language switch).
export const LOCALE_HOME: Record<Locale, string> = {
	"zh-Hant": `${SITE}/`,
	en: `${SITE}/en/`,
};
