import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/config";
import { SEO_ROUTES, SEO_ROUTE_KEYS, hreflangMap, type SeoRouteKey } from "@/lib/seo/routes";

/**
 * sitemap.xml for the canonical public surface of the site.
 *
 * Only URLs from the SEO route map ship here. Specifically excluded:
 *   - bare `/` (renders TR home but canonicalises to `/tr`)
 *   - redirect routes (/markalar, /iletisim, /tr/hakkimizda, etc.)
 *   - internal routes (/admin/**, /api/**, /_next/**)
 *   - the analytics CSV export
 *
 * Each entry carries an `alternates.languages` block so search
 * engines can pair the TR/EN editions of the same logical page.
 *
 * The sitemap is emitted regardless of `launch.allowIndexing`. The
 * site-level `noindex` posture (in metadata) and the pre-launch
 * `Disallow: /` rule (in robots.ts) are what gate crawling — the
 * sitemap simply describes the canonical structure so go-live is a
 * single flag flip.
 */

const PRIORITY: Record<SeoRouteKey, number> = {
  home: 1.0,
  brands: 0.8,
  contact: 0.6,
};

const CHANGE_FREQUENCY: Record<SeoRouteKey, "monthly" | "yearly"> = {
  home: "monthly",
  brands: "monthly",
  contact: "yearly",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return SEO_ROUTE_KEYS.flatMap((key) =>
    siteConfig.locales.map((locale) => ({
      url: `${siteConfig.baseUrl}${SEO_ROUTES[locale][key]}`,
      lastModified,
      changeFrequency: CHANGE_FREQUENCY[key],
      priority: PRIORITY[key],
      alternates: { languages: hreflangMap(key) },
    })),
  );
}
