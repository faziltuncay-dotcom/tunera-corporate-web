# Phase T1.2 — Launch readiness checklist

This document captures the public-surface state of the Tunera Corporate
Web site at the end of phase T1.2 and lists what must still be verified
or filled in before owner sign-off and go-live. It is a status snapshot,
not marketing copy.

For the procedural go-live recipe (which flags to flip in
`src/config/launch.ts`, in what order) see
[`docs/pre-launch-checklist.md`](./pre-launch-checklist.md). This file
is the audit-time companion to that checklist.

## Current accepted route surface

After the T1 / T1.1 / T1.2 commits, the public surface is one one-page
corporate experience per locale plus thin redirect routes for the
legacy paths. All routes were verified against `pnpm exec next start`
on port 3010 in T1.1 and re-verified in T1.2.

| Route            | Status | Behavior                                  |
| ---------------- | ------ | ----------------------------------------- |
| `/`              | 200    | Renders the Turkish one-page experience   |
| `/tr`            | 200    | Renders the Turkish one-page experience   |
| `/en`            | 200    | Renders the English one-page experience   |
| `/markalar`      | 307    | Redirect → `/tr#markalar`                 |
| `/tr/markalar`   | 307    | Redirect → `/tr#markalar`                 |
| `/en/brands`     | 307    | Redirect → `/en#brands`                   |
| `/iletisim`      | 307    | Redirect → `/tr#iletisim`                 |
| `/tr/iletisim`   | 307    | Redirect → `/tr#iletisim`                 |
| `/en/contact`    | 307    | Redirect → `/en#contact`                  |
| `/hakkimizda`    | 307    | Redirect → `/tr#hakkimizda`               |
| `/tr/hakkimizda` | 307    | Redirect → `/tr#hakkimizda`               |
| `/en/about`      | 307    | Redirect → `/en#about`                    |
| `/hizmetler`     | 307    | Redirect → `/tr#hizmetler`                |
| `/tr/hizmetler`  | 307    | Redirect → `/tr#hizmetler`                |
| `/en/services`   | 307    | Redirect → `/en#services`                 |
| `/robots.txt`    | 200    | `User-agent: *  Disallow: /` (pre-launch) |
| `/_not-found`    | 404    | Default Next.js handler                   |

The 12 redirects are kept so external links (search results captured
during prior dev, manual bookmarks, brand-deck mentions) do not break
when the site moves to one-page anchors.

> `docs/route-inventory.md` describes the original Phase 1C multi-page
> contract and is intentionally **not** rewritten here so the historical
> shape stays traceable. The tables above supersede it for go-live.

## Pre-launch / noindex status

Source of truth: `src/config/launch.ts`.

| Flag                    | Current value | Meaning                                                                                                                                         |
| ----------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `launch.isPreLaunch`    | `true`        | UI shows pre-launch placeholders where needed.                                                                                                  |
| `launch.allowIndexing`  | `false`       | `robots.txt` Disallows all and the `<meta name="robots">` tag is `noindex,nofollow,noarchive,nositelinkssearchbox`. Both layers still in place. |
| `contact.isFinalized`   | `false`       | Contact card renders "to be shared before launch" placeholders for email / phone / address.                                                     |
| `granfort.isProduction` | `false`       | Granfort brand card link points at the dev URL `http://localhost:3000` and renders the "Geliştirme bağlantısı / Development link" badge.        |
| `ranieri.isPlanned`     | `true`        | Ranieri brand card renders "Yakında / Coming soon" + "Hazırlık aşamasında / In preparation"; no link is published.                              |

**Do not flip any of these without explicit owner approval.**

## Contact fields still missing

`src/config/launch.ts` → `contact`:

- [ ] `contact.email` — currently `null`
- [ ] `contact.phone` — currently `null`
- [ ] `contact.address` — currently `null`
- [ ] `contact.isFinalized` — currently `false`; flip to `true` only
      after all three values are populated

UI behavior verified in T1.2 link audit: with the fields null, no
`mailto:` or `tel:` link is generated anywhere on `/tr` or `/en`. The
contact section surfaces a localized "to be shared before launch"
placeholder only.

## Granfort production link status

- [ ] Final production Granfort URL (replaces `http://localhost:3000`)
- [ ] Set `granfort.isProduction = true`

While `isProduction === false`, every Granfort link on the corporate
site renders with the "Development link" badge so visitors are not
misled. The link itself uses `target="_blank"` with
`rel="noreferrer noopener"`.

## Ranieri status

- [ ] Confirm whether Ranieri stays "Coming soon" through go-live, or
      gets a published URL pre-launch.
- [ ] If a URL is provided, set `ranieri.url` (currently `null`) and
      flip `ranieri.isPlanned` if applicable; the brand card already
      handles both states.

## Assets that are still placeholder or not final

- [ ] **Favicon** — neither `src/app/icon.png|svg|tsx` nor
      `public/favicon.ico` exists. Browsers requesting `/favicon.ico`
      currently 404. The five `public/assets/brand/tunera/*.png` files
      are all wide horizontal logos (1482×343 to 3094×771); none is a
      square emblem suitable as a favicon. Producing a square brand
      mark is owner work.
- [ ] **Open Graph / Twitter card image** — no canonical share image
      exists. Not added in audit since `metadataBase` is also missing
      (no production domain) and inventing either is out of scope.
- [ ] **Production domain** (`metadataBase`) — not configured.
      `src/app/layout.tsx` and `src/content/metadata.ts` set titles and
      descriptions but no `metadataBase`, `openGraph`, or
      `alternates.languages`. Add once the production domain is known.
- [ ] **Brand source files** under `brand/source/` are present as PDFs
      only; the conversion pipeline at `scripts/convert-brand-assets.py`
      can re-derive web-safe assets if final brand artwork is updated.

## Color / contrast review (owner decision)

The T1.2 axe-core run (WCAG 2 / 2.1 A + AA) flagged `color-contrast` as
the only rule violation, in two intentional patterns:

1. **White text on Tunera-orange (`#FF4D00`) CTA buttons** — measured
   contrast ≈ 3.32:1 against WCAG AA's 4.5:1 threshold for normal text.
   Affects every primary CTA on the site. This is the brand's defined
   accent contrast.
2. **Tunera-orange text on ivory (`#FFF7F0`) eyebrow / field labels** —
   measured contrast ≈ 3.13:1. Affects every section eyebrow and the
   contact card field labels.

Both are visible to sighted users at the sizes used; both fail the
arithmetic AA threshold. **Brand and owner sign-off required before
adjusting either**, since changing them shifts the visual identity.
Options if a change is approved:

- Darken `tunera-orange` slightly (would change the established brand)
- Use white text only on darker brand surfaces (would pull CTAs onto
  graphite, again a visual shift)
- Bump CTA text to bold-and-large (qualifies for the 3:1 large-text
  threshold) — smallest cosmetic change, but only fixes the CTA case

The decorative numerals inside list items ("01 02 03 …") were marked
`aria-hidden` in T1.2 so screen readers no longer announce them as
content. Their visible low contrast remains as an intentional
inactive-state cue.

## Real-device QA still recommended

T1.1 ran headless Chromium QA at 320 / 390 / 768 / 1280 / 1920 px and
T1.2 ran a 390 + 1280 spot-check. Headless Chromium with mobile
emulation is **not** a substitute for:

- [ ] iOS Safari on a real iPhone (notch, dynamic toolbar, `svh` units)
- [ ] Android Chrome on a real handset
- [ ] Safari on macOS at the same viewport widths
- [ ] Tablet portrait + landscape at iPad widths (768 / 1024 px)
- [ ] Keyboard navigation on a real keyboard (Tab order, focus ring,
      skip-to-content link, language switch)
- [ ] Screen reader pass — VoiceOver on macOS / iOS, NVDA on Windows.
      Verify the `<div lang="en">` wrapper on `/en` correctly switches
      pronunciation even though `<html lang="tr">` is hardcoded (this
      is on the existing pre-launch checklist as a deferred structural
      improvement).

## Go-live requirements

The **minimum** that must be true before flipping `allowIndexing`:

1. Owner has signed off on every section's copy in both locales.
2. `contact.email`, `contact.phone`, `contact.address` are populated
   and `contact.isFinalized = true`.
3. Either `granfort.isProduction = true` with the real URL, or owner
   has explicitly accepted the "Development link" badge on the live
   site.
4. Ranieri policy decided (URL or staying "Coming soon").
5. Real-device QA pass on iOS Safari + Android Chrome.
6. Color-contrast position decided (accept brand intent or implement
   one of the options above).
7. Favicon decided (real square mark or owner-accepted no-favicon).
8. Production domain configured for `metadataBase`. Open Graph metadata
   added (title / description already exist in `src/content/metadata.ts`;
   only siteName and image URL remain).

Then, in order, in `src/config/launch.ts`:

```ts
export const launch = {
  isPreLaunch: false,
  allowIndexing: true,
} as const;
```

Verify after the flip:

- `/robots.txt` switches from `Disallow: /` to `Allow: /`
- The page-level `<meta name="robots">` switches from `noindex,nofollow`
  to `index,follow`

A sitemap is still **out of scope**. Adding one requires its own
explicit approval per `docs/pre-launch-checklist.md`.

## What must NOT be launched without owner approval

These items are explicitly owner-gated:

- Flipping `launch.allowIndexing` to `true`.
- Publishing the site to a public domain at all.
- Replacing the Granfort dev link with a production URL.
- Publishing a Ranieri brand link.
- Adding a favicon (requires square brand artwork).
- Adding `metadataBase`, `openGraph`, or `twitter` blocks (requires the
  production domain and a canonical share image).
- Adding analytics, tag manager, or any third-party script.
- Adding a contact form, `mailto:` chip, or any "send" affordance.
- Submitting a sitemap or pinging search consoles.
- Adjusting `tunera-orange` or any other brand token to chase contrast
  without brand sign-off.

Anything above the line in `src/config/launch.ts` should be the only
edit needed for go-live; if a change requires touching components or
copy directly, route it through owner review first.
