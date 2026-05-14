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

`public/assets/brand/granfort/` ships exactly one file today:

- `granfort-logo-master.png` — `2000 × 557 RGBA`, transparent
  background, rendered directly from `granfort-master.pdf` via
  `qlmanage -t -s 2000 -o … granfort-master.pdf`. This is the
  authoritative stacked emblem-over-wordmark lockup in pure black
  on transparent (matching what the master PDF contains). The
  Tunera corporate site uses it on the brand card and in the
  footer brand row.

A previous round of "public derivatives" (`granfort-logo-{color,
white,black,light,horizontal-*,wordmark,emblem,emblem-on-ink}`)
was removed because every one of those files carried an explicit
`PLACEHOLDER — see apps/web/public/brand/LOGO_ASSETS_TODO.md`
header in the SVG XML and was not produced from this master PDF.
They were token shapes, not brand artwork — using them as final
art would have shipped a wrong logo.

## Outstanding — needs brand action

These variants are **deferred** until either (a) the brand team
supplies vector masters with proper colour swaps, or (b) someone
runs an Adobe Illustrator colour-swap pass on the master and
re-exports:

- White-on-dark variant for use on the Ink Deep / dark footer.
  The current footer renders the master inside a small
  `bg-white/95` chip so the black-on-transparent master reads
  cleanly without a wrong colour invert. Once a real white
  variant exists, the chip wrapper can be dropped.
- Horizontal lockup (emblem-left + wordmark) for full-width
  banners. Not used by the corporate site today.
- Per-model wordmarks. The `granfort-models-master.pdf`
  (26 pages) is the source; the Granfort web app consumes those
  separately and the corporate site does not need them.

Brand colour tokens (Ink Deep `#001F49`, Off-White `#F7F5F0`,
Coral `#EF7051`) live in
`granfort-web-app/packages/brand-tokens/tokens.json` for whoever
runs the colour swap.
