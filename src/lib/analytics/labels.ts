import type { AnalyticsEventName } from "./types";

/**
 * Display-only label maps for the admin analytics dashboard.
 *
 * These helpers translate stored values (raw paths like `/tr/markalar`,
 * stable section keys like `home_hero`, event names like
 * `brand_redirect_click`) into operator-readable labels. They are
 * **purely cosmetic** — the underlying data, event names, and section
 * keys are unchanged. Renaming an event in the database would be a
 * Phase-1-level breaking change; renaming the *label* a Tunera
 * operator reads on the dashboard is just polish.
 *
 * Each helper falls through to the original input when nothing
 * matches so an unrecognised value still renders truthfully (e.g. a
 * locale-stripped legacy path) instead of showing a misleading
 * "—" or invented category.
 *
 * Low-data threshold: helpers like `isLowData` exist so panels can
 * surface a small disclaimer when the underlying counts are too
 * sparse to read meaningfully. The threshold is deliberately low
 * (5 events / sequences) — it's a "directional only" hint, not a
 * statistical claim.
 */

const PATH_LABELS: Readonly<Record<string, string>> = {
  "/": "Ana Sayfa",
  "/tr": "Ana Sayfa",
  "/en": "Home",
  "/tr/markalar": "Markalar",
  "/markalar": "Markalar",
  "/en/brands": "Brands",
  "/tr/iletisim": "İletişim",
  "/iletisim": "İletişim",
  "/en/contact": "Contact",
  "/tr/hakkimizda": "Hakkımızda",
  "/hakkimizda": "Hakkımızda",
  "/en/about": "About",
  "/tr/hizmetler": "Hizmetler",
  "/hizmetler": "Hizmetler",
  "/en/services": "Services",
};

const SECTION_LABELS: Readonly<Record<string, string>> = {
  home_hero: "Ana sayfa hero",
  home_about: "Tunera tanıtım",
  home_services: "Hizmetler özeti",
  brands_intro: "Markalar giriş",
  brands_cards: "Marka kartları",
  contact_intro: "İletişim giriş",
  contact_details: "İletişim bilgileri",
  contact_maps: "Harita / lokasyon",
};

const EVENT_LABELS: Readonly<Record<AnalyticsEventName, string>> = {
  page_view: "Page view",
  section_view: "Section view",
  scroll_depth: "Scroll depth",
  brand_card_click: "Brand card click",
  brand_redirect_click: "Brand redirect",
  contact_email_click: "Email click",
  contact_phone_click: "Phone click",
  contact_whatsapp_click: "WhatsApp click",
  contact_map_click: "Map click",
  language_switch: "Language switch",
  service_card_click: "Service card click",
  external_link_click: "External link",
  form_submit_attempt: "Form submit attempt",
  form_submit_success: "Form submit success",
  form_submit_error: "Form submit error",
};

/**
 * Returns a friendly label for a stored path. Falls through to the
 * raw path when no mapping is registered so the operator still sees
 * something truthful (e.g. an old redirect or a typo) rather than a
 * misleading "Unknown".
 */
export function pathLabel(rawPath: string | null | undefined): string {
  if (typeof rawPath !== "string" || rawPath.length === 0) return "—";
  return PATH_LABELS[rawPath] ?? rawPath;
}

/**
 * Returns a friendly label for a stable `section_view` key.
 * Falls through to the raw key — same reasoning as `pathLabel`.
 */
export function sectionLabel(rawSection: string | null | undefined): string {
  if (typeof rawSection !== "string" || rawSection.length === 0) return "—";
  return SECTION_LABELS[rawSection] ?? rawSection;
}

/**
 * Returns a friendly label for an analytics event name. Falls
 * through to the raw event name when no mapping is registered.
 */
export function eventLabel(rawEvent: string | null | undefined): string {
  if (typeof rawEvent !== "string" || rawEvent.length === 0) return "—";
  return EVENT_LABELS[rawEvent as AnalyticsEventName] ?? rawEvent;
}

/**
 * Scroll-depth display: turn the stored numeric milestone into the
 * operator-facing "X% reached" phrasing. The underlying milestones
 * are 25/50/75/100 only — anything else is surfaced verbatim.
 */
export function scrollDepthLabel(rawDepth: string | number | null | undefined): string {
  if (rawDepth === null || rawDepth === undefined) return "—";
  const text = String(rawDepth).replace(/%$/, "");
  if (!/^\d+$/.test(text)) return String(rawDepth);
  return `${text}% reached`;
}

/**
 * Low-data heuristic. Returns true when the supplied count is so low
 * that a derived rate / ranking / claim would mislead more than it
 * helps. The threshold (5) is intentionally permissive — this is a
 * "show a small disclaimer" hint, not a statistical decision.
 */
export const LOW_DATA_THRESHOLD = 5;

export function isLowData(total: number | null | undefined): boolean {
  if (typeof total !== "number" || !Number.isFinite(total)) return true;
  return total < LOW_DATA_THRESHOLD;
}
