import { siteConfig, type Locale } from "./config";

/**
 * Canonical SEO route map.
 *
 * Only "real" content pages live here — pages that render a unique
 * HTML body and deserve their own canonical URL, hreflang pair,
 * and sitemap entry. Redirect-only routes (e.g. `/markalar`,
 * `/tr/hakkimizda`, `/en/services`) are intentionally absent
 * because they 307 into either the locale home or one of the
 * canonical pages below; they must not show up in the sitemap and
 * must not be assigned canonical metadata.
 *
 * The home, brands, and contact entries are the entire indexable
 * surface of the site as of Phase SEO 1.0. About / services are
 * anchors on the locale home rather than separate pages.
 */
export type SeoRouteKey = "home" | "brands" | "contact";

export const SEO_ROUTE_KEYS: ReadonlyArray<SeoRouteKey> = ["home", "brands", "contact"];

export const SEO_ROUTES: Record<Locale, Record<SeoRouteKey, string>> = {
  tr: {
    home: "/tr",
    brands: "/tr/markalar",
    contact: "/tr/iletisim",
  },
  en: {
    home: "/en",
    brands: "/en/brands",
    contact: "/en/contact",
  },
};

/** Absolute canonical URL for a `(locale, key)` pair. */
export function canonicalUrl(locale: Locale, key: SeoRouteKey): string {
  return `${siteConfig.baseUrl}${SEO_ROUTES[locale][key]}`;
}

/**
 * hreflang map for a route. Always emits both supported locales
 * plus an `x-default` pointing at the default locale (TR), which
 * matches how the site routes the bare `/` URL today.
 */
export function hreflangMap(key: SeoRouteKey): Record<string, string> {
  return {
    "tr-TR": canonicalUrl("tr", key),
    en: canonicalUrl("en", key),
    "x-default": canonicalUrl(siteConfig.defaultLocale, key),
  };
}

/** Flat list of every canonical absolute URL (for sitemap composition). */
export function allCanonicalUrls(): ReadonlyArray<{
  locale: Locale;
  key: SeoRouteKey;
  url: string;
}> {
  return siteConfig.locales.flatMap((locale) =>
    SEO_ROUTE_KEYS.map((key) => ({ locale, key, url: canonicalUrl(locale, key) })),
  );
}
