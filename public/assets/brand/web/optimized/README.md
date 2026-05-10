# Tunera marine web assets

Responsive image set for the corporate website. All variants are derived from
the 4K (3840×2160) PNG masters in the parent folder.

## Naming convention

```
{slug}-{width}w.{avif|webp|jpg}
```

Example: `hero-marine-pair-1920w.avif`

## Widths

| width | use case                           |
| ----- | ---------------------------------- |
| 640w  | small mobile (< 480 CSS px @ 1.5×) |
| 1280w | tablet, small laptop (1× retina)   |
| 1920w | desktop full-HD baseline (1×)      |
| 2560w | QHD desktops, 2× tablet            |
| 3840w | 4K monitors, 2× large desktop      |

Aspect ratio is fixed at 16:9 (1.778:1) for every width.

## Formats (in order of preference)

1. **AVIF** — smallest, best quality. Supported by all evergreen browsers
   (Chrome 85+, Edge 90+, Firefox 93+, Safari 16.4+).
2. **WebP** — universal modern fallback (Safari 14+, every other evergreen).
3. **JPG** — last-resort fallback for very old browsers and email/share previews.

Encoding settings used:

- AVIF q=55 speed=6
- WebP q=82 method=6
- JPG q=85 progressive, 4:2:0 chroma

## Slugs

- `hero-marine-pair` — homepage hero
- `about-coastal` — about page
- `brands-passing` — brands section
- `contact-horizon` — contact page
- `service-advisory` — service: advisory
- `service-maintenance` — service: maintenance
- `service-representation` — service: representation
- `service-storage` — service: storage
- `service-trailer` — service: trailer
- `service-yard` — service: yard

## HTML usage (recommended)

```html
<picture>
  <source
    type="image/avif"
    srcset="
      /assets/brand/web/optimized/hero-marine-pair-640w.avif   640w,
      /assets/brand/web/optimized/hero-marine-pair-1280w.avif 1280w,
      /assets/brand/web/optimized/hero-marine-pair-1920w.avif 1920w,
      /assets/brand/web/optimized/hero-marine-pair-2560w.avif 2560w,
      /assets/brand/web/optimized/hero-marine-pair-3840w.avif 3840w
    "
    sizes="100vw"
  />
  <source
    type="image/webp"
    srcset="
      /assets/brand/web/optimized/hero-marine-pair-640w.webp   640w,
      /assets/brand/web/optimized/hero-marine-pair-1280w.webp 1280w,
      /assets/brand/web/optimized/hero-marine-pair-1920w.webp 1920w,
      /assets/brand/web/optimized/hero-marine-pair-2560w.webp 2560w,
      /assets/brand/web/optimized/hero-marine-pair-3840w.webp 3840w
    "
    sizes="100vw"
  />
  <img
    src="/assets/brand/web/optimized/hero-marine-pair-1920w.jpg"
    srcset="
      /assets/brand/web/optimized/hero-marine-pair-640w.jpg   640w,
      /assets/brand/web/optimized/hero-marine-pair-1280w.jpg 1280w,
      /assets/brand/web/optimized/hero-marine-pair-1920w.jpg 1920w,
      /assets/brand/web/optimized/hero-marine-pair-2560w.jpg 2560w,
      /assets/brand/web/optimized/hero-marine-pair-3840w.jpg 3840w
    "
    sizes="100vw"
    width="3840"
    height="2160"
    loading="lazy"
    decoding="async"
    alt="Tunera marine — sunset coastal cruising"
  />
</picture>
```

Notes:

- For above-the-fold hero use `loading="eager"` and `fetchpriority="high"`.
- Always set explicit `width`/`height` to avoid CLS.
- Tune `sizes` per layout (e.g. `sizes="(min-width: 1280px) 50vw, 100vw"` for a
  half-width card).
- The 4K PNG masters next to this folder are kept as a single source of truth
  for re-encoding; do not link them directly from production HTML.
