/**
 * Tunera brand tokens used by the promo composition.
 *
 * Mirrors the values defined in the main project's
 * `tailwind.config.ts` so the video reads as the same identity as the
 * website. Only the few tones the composition actually needs are
 * pulled in; the full palette stays in the website's Tailwind config.
 */
export const colors = {
  orange: "#FF4D00",
  ink: "#231F20",
  ivory: "#FFF7F0",
  sand: "#F2E7DE",
  stone: "#D8CDC4",
  graphite: "#151212",
  mutedInk: "#5F5652",
  white: "#FFFFFF",
} as const;

/**
 * The Apple-leaning ease-out used everywhere in the Tunera site for
 * scroll storytelling. Re-used here so the video transitions feel
 * like the same motion grammar.
 */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const SAFE_TOP = 220;
export const SAFE_BOTTOM = 260;

/**
 * System UI stack. We deliberately do *not* introduce a custom web
 * font: the website itself uses ui-sans-serif → system-ui →
 * -apple-system → Segoe UI → Roboto, and the render machine is the
 * same Mac. Skipping the font fetch keeps the render hermetic.
 */
export const FONT_STACK =
  '"ui-sans-serif", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
