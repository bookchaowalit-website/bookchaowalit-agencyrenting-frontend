import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const LOCALES = ["en", "th"] as const;
const PAGES = ["", "/listings", "/articles", "/about", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((page) => ({
      url: `${SITE_URL}/en${page}`,
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.7,
      alternates: { languages: Object.fromEntries(LOCALES.map((locale) => [locale, `${SITE_URL}/${locale}${page}`])) },
    })),
    { url: `${SITE_URL}/more-projects`, changeFrequency: "monthly" as const, priority: 0.3 },
  ];
}
