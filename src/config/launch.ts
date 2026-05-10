/**
 * Launch-sensitive configuration.
 *
 * Single source of truth for company-level facts and the small set of
 * flags that gate go-live behaviour. Most fields here are now finalised
 * from the owner's official information; the only thing still gated for
 * pre-launch is `launch.allowIndexing`, which keeps `/robots.txt`
 * Disallowed and the `<meta name="robots">` tag set to noindex/nofollow
 * until owner sign-off on go-live SEO.
 *
 * See docs/pre-launch-checklist.md for the go-live procedure.
 */

export const company = {
  legal: "Tunera Denizcilik Ticaret A.Ş.",
  legalFull: "TUNERA DENİZCİLİK TİCARET ANONİM ŞİRKETİ",
  short: "Tunera Denizcilik",
  taxOffice: "Kartal Vergi Dairesi",
  taxNumber: "8671139244",
  mersisNo: "0867113924400001",
  ticaretSicilNo: "1083823",
} as const;

/**
 * Two operating addresses. `management` is the corporate / management
 * office in Kartal; `operations` is the operational facility in Tuzla.
 * Both are surfaced in the Contact section and the Footer.
 */
export const offices = {
  management: {
    line1: "Esentepe Mahallesi Tahsin Kaya Sanayi Sitesi A Blok No:40",
    line2: "Kartal İstanbul",
  },
  operations: {
    line1: "Mescit Mahallesi Demokrasi Cad. No:19",
    line2: "Tuzla İstanbul",
  },
} as const;

export const contact = {
  isFinalized: true,
  email: "info@tunera.com.tr",
} as const;

// Granfort brand web app is hosted in a separate repository and deployment.
// During development the app runs locally on http://localhost:3000.
// TODO(launch): set the production URL and flip isProduction = true.
export const granfort = {
  isProduction: false,
  url: "http://localhost:3000",
} as const;

// Ranieri brand site is planned but not in development yet.
export const ranieri = {
  isPlanned: true,
  url: null as string | null,
} as const;

/**
 * Pre-launch state controls SEO behaviour only — the visible UI does
 * not show pre-launch placeholder language any more.
 *
 * TODO(launch): set allowIndexing = true after owner sign-off.
 */
export const launch = {
  allowIndexing: false,
} as const;

// Local dev port for the corporate web app. Matches package.json `dev` script.
export const devPort = 3010 as const;
