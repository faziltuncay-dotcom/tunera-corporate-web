# Visual QA notes

A code-level visual audit performed during Phase 1D. Browser-based
visual inspection was **not available** in the CLI environment used for
this pass; HTML output was inspected via `curl`, but no rendered
viewport screenshots were captured. Browser QA at the viewports listed
below remains a pre-launch task — see
`docs/pre-launch-checklist.md`.

## Audit method

- Read every component and page file
- Inspected rendered HTML by curling the dev server on port 3010
- Verified `/robots.txt` returns `Disallow: /`
- Ran `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm build`
- Ran a forbidden-phrase grep + unsupported-claims grep across `src/`

## Viewports targeted (deferred — no browser available)

- Mobile ≈ 375px
- Tablet ≈ 768px
- Desktop ≈ 1440px

The Tailwind breakpoints used in code (`sm` 640, `md` 768, `lg` 1024)
cover these widths. The padding ladder on `Section` and the hero
(`py-16 sm:py-20 md:py-24 lg:py-28` / hero `py-20 sm:py-24 md:py-32 lg:py-36`)
should keep rhythm comfortable across the three target viewports, but
this needs visual confirmation in a browser.

## Findings (pre-fix)

1. **Header had no active-route indication.** A user on `/tr/markalar`
   could not see which nav link was current.
2. **HomePage About section duplicated its label.** Both `eyebrow` and
   `title` were set to "Kurumsal" / "Corporate", producing a small
   uppercase label directly above an identical large heading.
3. **BrandCard hover felt flat.** The status badge was inert; the visit
   arrow had no hover affordance.
4. **Footer felt empty on md+.** Only legal name + copyright across the
   row, with a wide gap in the middle.
5. **Service #4 was vague.** "Marine solutions / Denizcilik Çözümleri"
   did not describe a real Tunera function and overlapped with the
   other three services.
6. **ContactPage repeated the same disclaimer twice** — once as the
   section description, once as a footnote inside the details card.
7. **No smooth scroll** for in-page anchors (`#about`, `#brands`,
   `#services`, `#contact`).

## Fixes applied (this pass)

| Component          | Change                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `Header`           | Added `current` prop + active state with subtle underline + `aria-current="page"`           |
| `HomePage`         | Pass `current="home"`; drop redundant `title` from About; widen md gap between two columns  |
| `BrandsPage`       | Pass `current="brands"`                                                                     |
| `ContactPage`      | Pass `current="contact"`; remove duplicate disclaimer footnote                              |
| `BrandCard`        | Active status badge: live dot prefix; visit arrow translates 2px on `group-hover`           |
| `Footer`           | 3-region grid (legal · quick links · copyright) for visual balance on md+                   |
| `ServiceList` data | Service #4 retitled to "Müşteri İletişimi / Customer communication" with a more honest body |
| `globals.css`      | `html { scroll-behavior: smooth }` with `prefers-reduced-motion` opt-out                    |

All fixes were small and justified. No new sections, pages, or visual
metaphors were introduced. No imagery or icons were added; the design
remains type-and-spacing led.

## Items intentionally not changed

- The radial gradient at the top of the hero is subtle (10%); kept.
- The card composition pattern (`rounded-2xl`, `bg-navy-900/40` for
  service cards, `bg-navy-900/60` for brand cards) is preserved.
- The eyebrow / title / lead / CTA hero rhythm is preserved.
- Mobile bottom-row navigation in the header is preserved (added in
  Phase 1B); active state now applies there too.

## Items deferred to browser-based QA

Listed here so the next reviewer with a real browser can confirm:

- Hero readability and CTA prominence at 375px width
- Header behavior across breakpoints, especially the `sm` boundary where
  the nav row layout switches
- Tap-target sizes on mobile (44px guideline) for all clickable links
- Color contrast on `text-ink-200` against `bg-navy-900/30` overlays
  (especially in the About and Contact sections)
- Focus-ring visibility under all link/button surfaces
- Scroll snap / anchor landing positions for `#about`, `#brands`,
  `#services`, `#contact` (smooth-scroll added; verify the landing
  position lines up sensibly under the non-sticky header)
- Brand card density on tablet (768px) — single-column or two-column
  feels right
- Footer wrap behavior at 320px–400px

## Out-of-scope (not changed in Phase 1D)

- No new public pages
- No backend, CMS, database, CRM, Odoo, email automation, contact form,
  fake submission, fake success, quote engine, pricing, stock, portal,
  newsletter, analytics, payment, sitemap, go-live SEO
- No external imagery, scraped assets, or downloaded logos
- No new dependencies
- No UI library or animation library
- No logo redesign (no logo file exists yet — see pre-launch checklist)
