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

| File                    | Source                      | Variant                     | Use                                                        |
| ----------------------- | --------------------------- | --------------------------- | ---------------------------------------------------------- |
| `tunera-logo-black.png` | `tunera-logo.pdf`           | Black wordmark, transparent | Header on light surface                                    |
| `tunera-logo-white.png` | derived from black wordmark | White wordmark, transparent | Brand panel inside hero, footer                            |
| `tunera-logo-color.png` | `tunera-renkli-logo.pdf`    | Full color stamp            | Reserve as full brand signature (not currently used)       |
| `tunera-pattern.png`    | `tunera-desen.pdf`          | Black-on-transparent        | Hero brand panel overlay (~18% opacity, multiply blend)    |
| `tunera-emblem.png`     | `tunera-amblem.pdf`         | Black-on-transparent        | Reserved (currently unused; previously a corner watermark) |

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
contact CTA → clean graphite band (no decorative motif)
footer     → graphite, with mask-faded animated wave-pattern that
              breathes upward into the contact CTA boundary
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

## Section rhythm & transitions

The site uses a recurring grammar to keep section boundaries
intentional rather than relying on whitespace alone.

### Background tone rhythm

| Tone              | Token             | Where it is used                                          |
| ----------------- | ----------------- | --------------------------------------------------------- |
| Ivory (default)   | `tunera-ivory`    | Body, hero, story, services, team-on-About                |
| Sand              | `tunera-sand/60`  | Brands (home + Brands page), home Team, About Values      |
| Graphite (anchor) | `tunera-graphite` | Single dark band per page (contact CTA / About final CTA) |
| Graphite (footer) | `tunera-graphite` | Footer, with mask-faded animated wave-pattern             |

Each page shows ivory dominantly, with **at most one** sand band and
**one** graphite anchor at the page tail. The footer is the only dark
band that carries the animated pattern atmosphere.

### Section-flow veil (`SectionTransition` component)

Same-tone section boundaries (ivory → ivory) would visually blur into
one block. Earlier phases used a visible "pattern band + centered orange
line" separator at those pivots, which read too much like a divider
component. The current treatment is a **soft brand-flow dissolve**:

- 80 / 112 / 128 px tall band on mobile / sm / md (`h-20 sm:h-28 md:h-32`)
- The wrapper either matches the surrounding tone or smoothly morphs
  surface colour, so its top and bottom edges never read as a hard band
- A single decorative pattern layer carries `.tunera-section-veil`:
  - `mask-image: linear-gradient(to bottom, transparent 0%, black 38%, black 62%, transparent 100%)`
    — pattern fades **in** at the top edge, peaks at the centre, fades
    **out** at the bottom edge, so the wave dissolves into the page
  - opacity `0.028` (slightly lower than the previous 0.035, since the
    masked window plus the slow drift make the pattern more felt)
  - `tunera-section-veil-drift` keyframes — 36 s linear infinite,
    `translate3d(±1.2%, 0, 0) scale(1.04)` back-and-forth, transform-only
  - Disabled under `@media (prefers-reduced-motion: reduce)`
- **No centered orange hairline.** The orange micro-rule grammar
  continues to live in eyebrows, the About story rail, card markers,
  and the contact card top — never as a centered separator line.

Two surface variants:

| Variant           | Used when                                     | Treatment                                                                            |
| ----------------- | --------------------------------------------- | ------------------------------------------------------------------------------------ |
| `ivory` (default) | Both adjacent sections are ivory              | Solid `bg-tunera-ivory`; the seam disappears against its neighbours                  |
| `to-sand`         | Section above is ivory, section below is sand | `bg-gradient-to-b from-tunera-ivory to-tunera-sand/60` — surface morphs continuously |

### Where each transition lives

| Page     | Transitions                                                               |
| -------- | ------------------------------------------------------------------------- |
| Home     | hero → story (ivory)                                                      |
| About    | hero → story (ivory) · story → newEra (ivory) · newEra → values (to-sand) |
| Services | hero → service-model strip (ivory)                                        |
| Brands   | none (cards close cleanly into the footer's own pattern atmosphere)       |
| Contact  | hero → contact card (ivory)                                               |

Color-changing boundaries that do not have a flow-veil (ivory → sand,
sand → ivory, ivory/sand → graphite) rely on the tone change alone as
the divider. The footer's own mask-faded pattern atmosphere absorbs
ivory/sand → graphite entries on its own — placing a flow-veil before
the footer would only add visual noise.

### Site-wide scroll narrative

Every primary page carries an **Apple-inspired sticky scroll narrative**
keyed off the same shared client. The shared engine lives in
`src/components/ScrollNarrativeClient.tsx`; per-page server wrappers
build the payload and supply per-stage micro-content as React:

| Variant    | Wrapper               | Stages | Content focus                                            |
| ---------- | --------------------- | ------ | -------------------------------------------------------- |
| `home`     | `HomeScrollStory`     | 5      | New Era → Brands → Services → Team → First Contact       |
| `about`    | `AboutScrollStory`    | 5      | Experience → Name → Values → Working Structure → Explore |
| `services` | `ServicesScrollStory` | 5      | Model → Sales/Brand → Service → Trailer/Storage/Yard → … |
| `brands`   | `BrandsScrollStory`   | 3      | Brand hub → Granfort → Ranieri (embeds `BrandCard`)      |
| `contact`  | `ContactScrollStory`  | 3      | Pre-launch posture → Channels → Explore                  |

- Outer container `.tunera-narrative` is `stages * 100vh` tall on
  `lg+`. Below `lg` the container is auto-height and a stacked
  fallback flows in document order.
- Inside, a `sticky top-0 h-screen` stage absolutely positions all
  stages and applies one of three state classes — `is-active` (settled
  in place), `is-prev` (drifted up `-18px` at scale `0.985`),
  `is-next` (waiting `+22px` below at scale `0.985`). Title/body
  transition over `380 ms` with body delayed `60 ms`; per-stage
  micro-content uses a calmer `480 ms` curve with `120 ms` delay so
  the lower area settles after the headline. All curves are
  `cubic-bezier(0.22, 1, 0.36, 1)` — a sharp Apple-like ease-out.
- A single rAF-throttled passive scroll listener computes container
  progress (0–1), writes `--story-progress` to the sticky element for
  a faint pattern parallax (`±3%` translate, scale `1.08`), and only
  re-renders when the active stage index changes.
- Variant differentiation is light: type scale and pattern opacity
  shift slightly per archetype, but the orange micro-rule grammar
  and the vertical side index `01/02/.../N` are shared. Each variant
  declares its own `aria-label` (TR + EN) so screen-reader output
  reads the correct flow name per page.
- Stage micro-content (NewEra wordmark, brand pills, service-model
  index, role names, contact CTA, active brand cards) is rendered on
  the server from existing `site.ts` copy and passed as React
  children. The sticky branch and the stacked fallback render the
  same micro-content so both reading paths show identical detail.
- Native scroll only — no scroll hijacking, no wheel/touch trapping,
  no scroll-snap, no animation library, no new dependencies.
- `@media (prefers-reduced-motion: reduce)` forces the stacked
  fallback (sticky branch hidden, container auto-height). The stacked
  branch is also the layout used at sub-`lg` widths.
- Long-form pages (`/hakkimizda`, `/hizmetler`) keep their full
  detail below the narrative; the narrative acts as the emotional
  spine, not as a content replacement.

### Hero-to-content tightening

When the next section follows a hero or a transition seam, that section
uses `<Section tight>` which reduces vertical padding to
`py-14 sm:py-16 md:py-20 lg:py-24` (about 60% of the default rhythm).
This keeps narrative flow tight without losing premium breathing room.

### Recurring micro-grammar

The same visual elements repeat across the site:

- 8 px orange micro-rule + uppercase spaced eyebrow → section headers
- (no centered orange hairline; section veils carry only a masked, drifting pattern)
- 20 px orange marker rule + `01–06` index → cards and service detail
- 1.5 px orange dot in pill → live brand status
- 3 px orange top rule → contact card and active brand card
- Vertical orange rail (`border-l border-tunera-orange/40`) → About story narrative

## Pattern and emblem usage

Pattern usage is restrained:

- Hero brand panel: `tunera-pattern.png` at 18% on orange (visible but
  refined, multiply-blended into the orange field).
- Contact CTA: clean graphite — no decorative motif. Pattern energy is
  reserved for the footer below, and fades upward across the boundary.
- Footer: full-width Tunera pattern atmosphere — see "Footer ambient
  pattern" below. The pattern layers are mask-faded from the top so the
  contact CTA / footer seam reads as a tonal deepening of one continuous
  dark surface, not as two distinct sections.

The pattern is **not** placed behind paragraph text and is **not**
repeated as a generic background everywhere.

### Footer ambient pattern

The footer uses two stacked, transform-only animated layers of the
Tunera wave pattern over `tunera-graphite`. Both are inverted to white.

| Layer | Background                                  | Opacity | Animation                                                  |
| ----- | ------------------------------------------- | ------- | ---------------------------------------------------------- |
| A     | `bg-cover` centered                         | `0.06`  | `tunera-footer-drift-a` 32s linear infinite, `scale(1.06)` |
| B     | `150%` size, offset to `70% 30%`, no repeat | `0.04`  | `tunera-footer-drift-b` 26s linear infinite, `scale(1.12)` |

Both keyframes are gentle back-and-forth translates (≤ ~1.8% on each
axis). The slight scale > 1 keeps the layer covering the container so
the translate never exposes the graphite ground. Each layer also
carries a `mask-image: linear-gradient(to bottom, transparent → black)`
so the pattern is invisible at the footer's top edge and gradually
emerges toward the bottom — Layer A reaches full opacity at ~72% down,
Layer B at ~84% down for parallax depth. The contact CTA section above
is plain graphite, so the seam reads as a tonal deepening rather than
a hard cutoff. Footer content uses `relative z-10`.

Motion is disabled under `@media (prefers-reduced-motion: reduce)` —
the keyframe selectors override `animation: none; transform: none`.

## What is intentionally not used

- The full color logo (`tunera-logo-color.png`) ships in `public/`
  but is currently held in reserve. It is the highest-impact brand
  signature and would compete with the hero brand panel if used in
  parallel. Use it later for press surfaces, share images, or a single
  hero-replacement variant — never as a repeat across sections.
- No yacht / marina / lifestyle imagery — Phase 1E ships strictly with
  wordmark, pattern, and emblem.
