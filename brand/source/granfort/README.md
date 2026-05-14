# Granfort — Source Brand Assets

Master logo artwork delivered by the Granfort brand team
(2025-06-03, file metadata in PDF). Held here as the
authoritative source. Public-shipped derivatives in
`public/assets/brand/granfort/` are produced from these.

## Files

| File                         | Description                                                                                                                                                                                                                                                                                                                 |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `granfort-master.pdf`        | Single-page Adobe Illustrator vector master. Stacked emblem-over-wordmark lockup, black on transparent. Source for all SVG/PNG variants.                                                                                                                                                                                    |
| `granfort-models-master.pdf` | 26-page vector PDF containing per-model wordmark export (188, 212, 242 GTC/GTO/GTX, 255 GTX, 272 GTC/GTO, 300 GTS/GTX, 333, 333 GTC, 355 GTS, 366 GTS, 370 GTX, in horizontal and vertical orientations). Currently unused by the Tunera corporate site — the Granfort web app consumes the per-model wordmarks separately. |

## Public derivatives

`public/assets/brand/granfort/` ships:

- `granfort-logo-color.{svg,png}` — stacked Ink Deep `#001F49`,
  matches Tunera card-grid proportion (≈ 3.6 : 1).
- `granfort-logo-white.{svg,png}` — stacked pure white reverse,
  for use on Ink Deep / dark surfaces.
- `granfort-logo-black.{svg,png}` — stacked Ink Deep, alias of
  color (kept for naming-convention parity with `tunera-*`).
- `granfort-logo-light.svg` — stacked Off-White `#F7F5F0` for
  warm dark surfaces.
- `granfort-emblem.{svg,png}` — emblem only, for compact /
  watermark / favicon use.
- `granfort-emblem-on-ink.svg` — Off-White emblem on Ink Deep
  tile (PWA / app-icon look).
- `granfort-wordmark.svg` — wordmark only.
- `granfort-logo-horizontal-{color,white,black,light}.{svg,png}` —
  alternative ≈ 12 : 1 horizontal lockup (emblem-left + wordmark).
  Useful for full-width banners; too wide for the brand card grid.

## Notes

- The horizontal lockup files were derived from the stacked master
  by repositioning the original emblem and wordmark vector paths
  side-by-side. **No glyph was redrawn** — only an `M`/`L`/`C`
  translation transform was applied. If brand standards require a
  specific horizontal proportion (emblem-to-wordmark size ratio,
  baseline alignment, gap), supply a horizontal-master PDF and the
  derivatives can be regenerated as a pure asset swap.
- Color palette tokens: Ink Deep `#001F49`, Off-White `#F7F5F0`,
  Coral `#EF7051` — all sourced from
  `granfort-web-app/packages/brand-tokens/tokens.json`.
