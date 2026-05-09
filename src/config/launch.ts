/**
 * Launch-sensitive configuration.
 *
 * Single source of truth for items that must be reviewed and updated
 * before the site goes live. Each block has a clear flag indicating
 * whether it is finalized; UI components branch on those flags so that
 * placeholder states stay polished and honest in the public UI.
 *
 * See docs/pre-launch-checklist.md for the full go-live procedure.
 */

export const company = {
  legal: "Tunera Denizcilik Ticaret A.Ş.",
  short: "Tunera Denizcilik",
} as const;

// Contact channels are not finalized for the pre-launch site.
// TODO(launch): populate values and set isFinalized = true.
export const contact = {
  isFinalized: false,
  email: null as string | null,
  phone: null as string | null,
  address: null as string | null,
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

// Pre-launch state controls SEO behavior and UI placeholders.
// TODO(launch): set isPreLaunch = false and allowIndexing = true after sign-off.
export const launch = {
  isPreLaunch: true,
  allowIndexing: false,
} as const;

// Local dev port for the corporate web app. Matches package.json `dev` script.
export const devPort = 3010 as const;
