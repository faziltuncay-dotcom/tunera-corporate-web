/**
 * Site-level SEO constants.
 *
 * The central source of truth for everything SEO-related: site name,
 * legal name, base URL, supported locales, and the default Open
 * Graph / Twitter card image. Page-level metadata and the sitemap
 * compose against these constants — there are no other hardcoded
 * site identifiers anywhere in the SEO surface.
 *
 * `baseUrl` points at `https://www.tunera.com.tr` because the apex
 * `tunera.com.tr` is currently misconfigured at the registrar (its
 * DNS resolves to Google service IPs and the TLS handshake fails).
 * Pointing canonical / sitemap / Open Graph URLs at the working www
 * subdomain unblocks Meta's `facebookexternalhit`, Instagram and
 * Twitter preview crawlers — they were hitting `og:url` on the
 * broken apex and rejecting the link. See `docs/seo.md` "Apex
 * domain DNS fix" for the long-term registrar-side work that will
 * eventually let canonical move back to the apex if desired; until
 * then www is the only URL that resolves to the deployed app.
 *
 * The OG image is intentionally a reuse of the existing site hero
 * (`hero-marine-pair-*.jpg`) so the social preview matches what a
 * visitor lands on. A dedicated 1200x630 OG composition is a
 * deferred follow-up — see `docs/seo.md`.
 */
export const siteConfig = {
  baseUrl: "https://www.tunera.com.tr",
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
