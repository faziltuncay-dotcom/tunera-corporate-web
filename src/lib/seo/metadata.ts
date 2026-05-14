import type { Metadata } from "next";
import { launch } from "@/config/launch";
import { siteConfig, type Locale } from "./config";
import { canonicalUrl, hreflangMap, type SeoRouteKey } from "./routes";

/**
 * Per-route copy for `<title>` and `<meta name="description">`.
 *
 * Titles are intentionally page-specific, written in human
 * language, and free of keyword stuffing. Descriptions are kept
 * around 140–170 characters where practical; they describe what
 * the page is, not what we wish to rank for. No invented dealer
 * counts, awards, certifications, SLAs, prices, or stock claims.
 */
type Copy = { title: string; description: string };

export const PAGE_COPY: Record<Locale, Record<SeoRouteKey, Copy>> = {
  tr: {
    home: {
      title: "Tunera Denizcilik | Denizcilikte Yeni Dönem",
      description:
        "Tunera Denizcilik; tekne satışları, marka temsilciliği, denizcilik hizmetleri ve müşteri yönlendirme süreçlerinde profesyonel destek sunan bir denizcilik şirketidir.",
    },
    brands: {
      title: "Markalar | Tunera Denizcilik",
      description:
        "Tunera Denizcilik’in temsil ettiği markaları keşfedin; Granfort ve Ranieri için güncel marka yönlendirmeleri ve iletişim bilgilerine ulaşın.",
    },
    contact: {
      title: "İletişim | Tunera Denizcilik",
      description:
        "Tunera Denizcilik yönetim ofisi, operasyon tesisi ve iletişim kanalları üzerinden bizimle iletişime geçin.",
    },
  },
  en: {
    home: {
      title: "Tunera Maritime | A New Era in Marine Services",
      description:
        "Tunera Maritime is a marine-sector company focused on boat sales, brand representation, marine services, and professional customer guidance.",
    },
    brands: {
      title: "Brands | Tunera Maritime",
      description:
        "Explore the brands represented by Tunera Maritime, including current brand routes and contact information for Granfort and Ranieri.",
    },
    contact: {
      title: "Contact | Tunera Maritime",
      description:
        "Contact Tunera Maritime through its office, operations location, and official communication channels.",
    },
  },
};

/**
 * Robots posture is gated by `launch.allowIndexing`. Pre-launch the
 * site is fully `noindex/nofollow` (with `nocache` and an explicit
 * googleBot block). Once `launch.allowIndexing` flips to `true`, the
 * same helper turns into `index/follow` without further code edits.
 */
export const robotsForCurrentLaunch = (): NonNullable<Metadata["robots"]> =>
  launch.allowIndexing
    ? { index: true, follow: true }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false },
      };

const ogLocaleTag = (locale: Locale): string => (locale === "tr" ? "tr_TR" : "en_US");

/**
 * Layout-level defaults. Mounted from `src/app/layout.tsx`. These
 * provide the metadataBase, robots policy, and OG/Twitter shells so
 * page-level metadata only needs to override page-specific fields.
 *
 * `metadataBase` is required for Next to resolve relative OG image
 * paths and canonical URLs that pages emit downstream.
 */
export function siteRootMetadata(): Metadata {
  const og = siteConfig.defaultOgImage;
  return {
    metadataBase: new URL(siteConfig.baseUrl),
    title: PAGE_COPY[siteConfig.defaultLocale].home.title,
    description: PAGE_COPY[siteConfig.defaultLocale].home.description,
    applicationName: siteConfig.siteName,
    robots: robotsForCurrentLaunch(),
    openGraph: {
      siteName: siteConfig.siteName,
      type: "website",
      images: [{ url: og.path, width: og.width, height: og.height, alt: og.alt }],
    },
    twitter: {
      card: "summary_large_image",
      images: [og.path],
    },
  };
}

/**
 * Build a full `Metadata` object for a real content page.
 *
 * Sets:
 *   - title and description (page-specific copy)
 *   - canonical to the absolute URL of `(locale, key)`
 *   - hreflang languages for the TR/EN pair plus `x-default`
 *   - Open Graph (title, description, url, siteName, locale, image)
 *   - Twitter card (summary_large_image)
 *   - robots posture from `robotsForCurrentLaunch()`
 *
 * It does NOT override `metadataBase` from the layout — Next merges
 * deep, so the layout's `metadataBase` continues to apply.
 */
export function buildPageMetadata(locale: Locale, key: SeoRouteKey): Metadata {
  const copy = PAGE_COPY[locale][key];
  const url = canonicalUrl(locale, key);
  const og = siteConfig.defaultOgImage;
  const otherLocale: Locale = locale === "tr" ? "en" : "tr";
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: url,
      languages: hreflangMap(key),
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url,
      siteName: siteConfig.siteName,
      type: "website",
      locale: ogLocaleTag(locale),
      alternateLocale: [ogLocaleTag(otherLocale)],
      images: [{ url: og.path, width: og.width, height: og.height, alt: og.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [og.path],
    },
    robots: robotsForCurrentLaunch(),
  };
}

/**
 * Same as `buildPageMetadata` but for the bare `/` route, which
 * renders the TR home identically to `/tr`. The canonical URL is
 * forced to `/tr` so search engines consolidate signal into the
 * locale-prefixed URL instead of treating `/` as a duplicate.
 */
export function buildRootIndexMetadata(): Metadata {
  return buildPageMetadata(siteConfig.defaultLocale, "home");
}
