/**
 * Site-level SEO constants.
 *
 * The central source of truth for everything SEO-related: site name,
 * legal name, base URL, supported locales, and the default Open
 * Graph / Twitter card image. Page-level metadata and the sitemap
 * compose against these constants — there are no other hardcoded
 * site identifiers anywhere in the SEO surface.
 *
 * The OG image is intentionally a reuse of the existing site hero
 * (`hero-marine-pair-*.jpg`) so the social preview matches what a
 * visitor lands on. A dedicated 1200x630 OG composition is a
 * deferred follow-up — see `docs/seo.md`.
 */
export const siteConfig = {
  baseUrl: "https://tunera.com.tr",
  siteName: "Tunera Denizcilik",
  legalName: "Tunera Denizcilik Ticaret A.Ş.",
  defaultLocale: "tr",
  locales: ["tr", "en"] as const,
  defaultOgImage: {
    path: "/assets/brand/web/optimized/hero-marine-pair-1920w.jpg",
    width: 1920,
    height: 1080,
    alt: "Tunera Denizcilik — denizcilikte yeni dönem",
  },
} as const;

export type Locale = (typeof siteConfig.locales)[number];
