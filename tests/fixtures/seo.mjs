// Pure-JS mirror of `src/lib/seo/config.ts` + `src/lib/seo/routes.ts`.
// Mirrors are kept in sync by hand because Node's built-in
// `node --test` cannot load `.ts` files directly. Update both when
// the production maps move.

export const siteConfig = {
  baseUrl: "https://www.tunera.com.tr",
  siteName: "Tunera Denizcilik",
  legalName: "Tunera Denizcilik Ticaret A.Ş.",
  defaultLocale: "tr",
  locales: ["tr", "en"],
};

export const SEO_ROUTE_KEYS = ["home", "brands", "contact"];

export const SEO_ROUTES = {
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

export function canonicalUrl(locale, key) {
  return `${siteConfig.baseUrl}${SEO_ROUTES[locale][key]}`;
}

export function hreflangMap(key) {
  return {
    "tr-TR": canonicalUrl("tr", key),
    en: canonicalUrl("en", key),
    "x-default": canonicalUrl(siteConfig.defaultLocale, key),
  };
}

export function allCanonicalUrls() {
  return siteConfig.locales.flatMap((locale) =>
    SEO_ROUTE_KEYS.map((key) => ({ locale, key, url: canonicalUrl(locale, key) })),
  );
}
