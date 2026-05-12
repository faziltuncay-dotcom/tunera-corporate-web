// Pure-JS mirror of `src/lib/analytics/labels.ts`. Mirrors are kept
// in sync by hand because Node's built-in `node --test` cannot load
// `.ts` files directly. Update both when the production maps move.

const PATH_LABELS = {
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

const SECTION_LABELS = {
  home_hero: "Ana sayfa hero",
  home_about: "Tunera tanıtım",
  home_services: "Hizmetler özeti",
  brands_intro: "Markalar giriş",
  brands_cards: "Marka kartları",
  contact_intro: "İletişim giriş",
  contact_details: "İletişim bilgileri",
  contact_maps: "Harita / lokasyon",
};

const EVENT_LABELS = {
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

export function pathLabel(rawPath) {
  if (typeof rawPath !== "string" || rawPath.length === 0) return "—";
  return PATH_LABELS[rawPath] ?? rawPath;
}

export function sectionLabel(rawSection) {
  if (typeof rawSection !== "string" || rawSection.length === 0) return "—";
  return SECTION_LABELS[rawSection] ?? rawSection;
}

export function eventLabel(rawEvent) {
  if (typeof rawEvent !== "string" || rawEvent.length === 0) return "—";
  return EVENT_LABELS[rawEvent] ?? rawEvent;
}

export function scrollDepthLabel(rawDepth) {
  if (rawDepth === null || rawDepth === undefined) return "—";
  const text = String(rawDepth).replace(/%$/, "");
  if (!/^\d+$/.test(text)) return String(rawDepth);
  return `${text}% reached`;
}

export const LOW_DATA_THRESHOLD = 5;

export function isLowData(total) {
  if (typeof total !== "number" || !Number.isFinite(total)) return true;
  return total < LOW_DATA_THRESHOLD;
}
