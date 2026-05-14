# Ranieri — Source Brand Assets

## Files

| File              | Description                                                                                                                                                                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ranieri-blu.jpg` | The only artwork supplied by the brand owner: 2560×776 RGB JPEG, blue script wordmark "RANIERI / by Antonio Ranieri" with green-and-red Italian flag bar accents and an `®` mark, on a solid white background. Source: Ranieri / Cantiere Ranieri International (Italy). |

## Public derivatives

`public/assets/brand/ranieri/` ships:

- `ranieri-logo-color.jpg` — original JPEG, preserved unchanged.
  Use when the rendering surface is white / off-white and you do
  not need transparency.
- `ranieri-logo-color.png` — 2560×776 RGBA, transparent background
  derived from the JPEG by luminance-based alpha removal with
  foreground-color unmultiply (whiteness ≤ 0.85 → fully opaque,
  ≥ 0.99 → fully transparent, soft ramp between). Edges are clean
  on the Tunera ivory `#F1EFEA` background; some edge halo may
  appear against high-contrast surfaces because the source is a
  raster JPEG, not a vector master.
- `ranieri-logo-color-1280w.png` — same artwork at 1280×388 for
  bandwidth-sensitive uses (mobile cards, blog).

## Outstanding — needs brand action

These variants **cannot be produced from the supplied JPEG without
a vector master** and must be requested from the Ranieri brand
team:

1. **Vector master** (`.ai`, `.eps`, `.pdf`, or `.svg`).
   Without it, every resize beyond ≈ 2× of the source pixel size
   degrades fidelity.
2. **Mono white reverse variant** for use on Ink Deep / dark
   surfaces. The single-color blue logo loses contrast against
   the Tunera dark hero treatment (verified in QA preview); a
   white reverse is required for any dark-mode / dark-section
   placement.
3. **Mono black variant** for low-fidelity print and B&W
   contexts.
4. **Emblem-only mark** (the encircled "R" or equivalent), if one
   exists in the brand system. The current artwork has no separable
   emblem — the round line beneath the wordmark is decorative,
   not a standalone mark.
5. **Brand color tokens** (exact PMS / hex / RGB for the blue,
   green, red used). Pulled approximate values from the JPEG, but
   these should be confirmed by the brand owner before being
   committed to `tailwind.config.ts`.
6. **Trademark and usage guidelines** — the `®` mark is present;
   confirmation of usage, clear-space, minimum size, and approved
   color combinations is needed.

Until items 1–6 are supplied, the Ranieri brand presentation in
the Tunera corporate site is **interim** and should not appear in
final marketing material without brand-owner sign-off.
