import { siteConfig } from "./config";

/**
 * Schema.org JSON-LD for the Tunera corporate site.
 *
 * Only verifiable facts go into structured data. Specifically NOT
 * included:
 *   - aggregateRating, review (no public review system exists)
 *   - awards / certifications (none confirmed)
 *   - dealer count, distribution claims
 *   - openingHours (not confirmed in copy)
 *   - offers, prices, inventory
 *   - 24/7 support claims
 *   - phone numbers (none published on the site today)
 *
 * The address fields mirror exactly what the public Contact section
 * already shows to visitors (Kartal management office, Tuzla
 * operations facility). The email field uses `info@tunera.com.tr`,
 * which is also published in the Contact section.
 */

const MANAGEMENT_ADDRESS = {
  "@type": "PostalAddress" as const,
  name: "Yönetim Ofisi",
  streetAddress: "Esentepe Mahallesi Tahsin Kaya Sanayi Sitesi A Blok No:40",
  addressLocality: "Kartal",
  addressRegion: "İstanbul",
  addressCountry: "TR",
};

const OPERATIONS_ADDRESS = {
  "@type": "PostalAddress" as const,
  name: "Operasyon Tesisi",
  streetAddress: "Mescit Mahallesi Demokrasi Cad. No:19",
  addressLocality: "Tuzla",
  addressRegion: "İstanbul",
  addressCountry: "TR",
};

export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

export function organizationJsonLd(): Record<string, JsonLdValue> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.siteName,
    url: siteConfig.baseUrl,
    logo: `${siteConfig.baseUrl}/assets/brand/tunera/tunera-logo-color.png`,
    email: "info@tunera.com.tr",
    description:
      "Tunera Denizcilik; tekne satışları, marka temsilciliği, denizcilik hizmetleri ve müşteri yönlendirme süreçlerinde profesyonel destek sunan bir denizcilik şirketidir.",
    address: [MANAGEMENT_ADDRESS, OPERATIONS_ADDRESS],
    areaServed: "TR",
  };
}

export function websiteJsonLd(): Record<string, JsonLdValue> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.siteName,
    alternateName: siteConfig.legalName,
    url: siteConfig.baseUrl,
    inLanguage: ["tr-TR", "en"],
  };
}
