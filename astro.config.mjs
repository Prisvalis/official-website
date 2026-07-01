// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	// Production domain — used for canonical URLs, sitemap and Open Graph tags.
	// Change this in one place if the company domain differs.
	site: "https://www.prisvalis.com",
	i18n: {
		locales: ["zh-Hant", "en"],
		defaultLocale: "zh-Hant",
		routing: {
			// Traditional Chinese lives at "/" (no prefix); English at "/en/".
			prefixDefaultLocale: false,
		},
	},
	integrations: [mdx(), sitemap()],
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
});
