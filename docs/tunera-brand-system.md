# Tunera brand system

This document captures the design system actually in use on the
corporate hub. The visual direction is **brand-led, not template-led**:
every token below comes from official Tunera materials shipped with
this repo, not from inferred or invented styling.

Source PDFs: `brand/source/tunera/`
Web-safe assets: `public/assets/brand/tunera/`
Conversion script: `scripts/convert-brand-assets.py`

## Color tokens

Authoritative tokens from the brand:

| Token           | Hex       | Use                                                         |
| --------------- | --------- | ----------------------------------------------------------- |
| `tunera-orange` | `#FF4D00` | Primary accent. CTA fill, eyebrow labels, status indicators |
| `tunera-ink`    | `#231F20` | Primary text on light surfaces. Wordmark color              |
| `tunera-black`  | `#000000` | Reserved (not currently used at full intensity)             |
| `tunera-white`  | `#FFFFFF` | Card surfaces inside ivory bands                            |

Derived UI support tones for premium web composition:

| Token              | Hex       | Use                                              |
| ------------------ | --------- | ------------------------------------------------ |
| `tunera-ivory`     | `#FFF7F0` | Default body background                          |
| `tunera-sand`      | `#F2E7DE` | Mid-band tint (e.g. brands section background)   |
| `tunera-stone`     | `#D8CDC4` | Borders, low-emphasis ink on dark sections       |
| `tunera-graphite`  | `#151212` | Selected premium dark band (contact CTA, footer) |
| `tunera-muted-ink` | `#5F5652` | Secondary body copy                              |

The previous navy/sunset palette has been removed entirely from the
Tailwind config. Phase 1E is the cutover: orange / ink / ivory dominate.

## Brand assets

| File                    | Source                      | Variant                     | Use                                                     |
| ----------------------- | --------------------------- | --------------------------- | ------------------------------------------------------- |
| `tunera-logo-black.png` | `tunera-logo.pdf`           | Black wordmark, transparent | Header on light surface                                 |
| `tunera-logo-white.png` | derived from black wordmark | White wordmark, transparent | Brand panel inside hero, footer                         |
| `tunera-logo-color.png` | `tunera-renkli-logo.pdf`    | Full color stamp            | Reserve as full brand signature (not currently used)    |
| `tunera-pattern.png`    | `tunera-desen.pdf`          | Black-on-transparent        | Hero brand panel overlay (~18% opacity, multiply blend) |
| `tunera-emblem.png`     | `tunera-amblem.pdf`         | Black-on-transparent        | Watermark in contact CTA (~8%) and footer (~6%)         |

Logo proportions are preserved exactly from the source PDFs. Crops are
to artwork bounds (no PDF-page whitespace). The logo is **never**
distorted, recolored, or traced. `convert-brand-assets.py` is the only
tool that ever touches these files; re-run it if the source PDFs change.

## Typography

Stack remains the system stack defined in `tailwind.config.ts`. No
decorative web font has been added — the wordmark itself supplies the
brand's italic motion, so UI typography stays disciplined.

| Role                    | Treatment                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------- |
| Hero h1                 | `font-semibold`, `text-5xl → text-7xl`, `leading-[0.95]`, `tracking-tighter2`                        |
| Section h2              | `font-semibold`, `text-3xl → text-5xl`, `leading-[1.05]`, `tracking-tighter2`                        |
| Card / service title h3 | `font-semibold`, `text-base → text-lg`, `tracking-tightish`                                          |
| Eyebrow label           | `text-[11px]`, `uppercase`, `tracking-[0.28em]`, `text-tunera-orange`, paired with a 8px orange rule |
| Body copy               | `text-tunera-muted-ink` for secondary, `text-tunera-ink` for primary                                 |
| Small caps tag          | `text-[10–11px]`, `uppercase`, `tracking-[0.18–0.22em]`                                              |

## Composition

### Background rhythm (home page)

```
hero       → ivory (default body)
about      → ivory
brands     → sand band  (premium mid-tone divider)
services   → ivory
contact CTA → graphite band  (single dark anchor with emblem watermark)
footer     → graphite (with subtle inverted emblem watermark)
```

This keeps the site overwhelmingly light (per the brand spec — ivory /
white dominate), with one strong dark band at the page tail rather than
multiple navy/dark sections.

### Hero composition

Asymmetric `lg:grid-cols-12` with `7 / 5` split. Left column carries
editorial typography (eyebrow + 5xl–7xl headline + legal label + lead +
restrained CTA pair). Right column is a `4/5 → 5/6` aspect orange
brand panel:

- `bg-tunera-orange` field
- `tunera-pattern.png` overlay at `opacity-[0.18]` with `mix-blend-multiply`
- Centered `tunera-logo-white.png` wordmark at ~75% panel width

The energetic feel comes from the orange/pattern stamp itself, not
from animation.

### Buttons

Primary CTA: `bg-tunera-orange` + white text, `rounded-sm`, hover
darkens to `#E64500`. No glow, no gradient.

Secondary CTA: transparent, `border-tunera-ink/20`, ink text, hover
deepens border + adds `bg-tunera-sand/50` wash.

Focus ring: `2px solid #FF4D00` with 3px offset, applied globally via
`:focus-visible` in `globals.css`.

### Cards

| Card type    | Surface    | Border            | Accent                                              |
| ------------ | ---------- | ----------------- | --------------------------------------------------- |
| Brand card   | `bg-white` | `tunera-stone/60` | `3px` orange top rule on active; orange dot in pill |
| Service card | `bg-white` | `tunera-stone/60` | Small orange rule + `01–04` index in eyebrow        |
| Contact card | `bg-white` | `tunera-stone/60` | `3px` orange top rule; orange field labels          |

Brand cards are visually stronger than service cards (top rule, larger
title, larger surface padding) — per spec, the brand hub takes
precedence over the supporting service grid.

## Pattern and emblem usage

Pattern usage is restrained:

- Hero brand panel: `tunera-pattern.png` at 18% on orange (visible but
  refined, multiply-blended into the orange field)
- Contact CTA + footer: `tunera-emblem.png` at 6–8% as a corner
  watermark, inverted to white because both sit on graphite

The pattern is **not** placed behind paragraph text and is **not**
repeated as a generic background everywhere.

## What is intentionally not used

- The full color logo (`tunera-logo-color.png`) ships in `public/`
  but is currently held in reserve. It is the highest-impact brand
  signature and would compete with the hero brand panel if used in
  parallel. Use it later for press surfaces, share images, or a single
  hero-replacement variant — never as a repeat across sections.
- No yacht / marina / lifestyle imagery — Phase 1E ships strictly with
  wordmark, pattern, and emblem.
