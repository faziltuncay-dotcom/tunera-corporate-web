# Claude Code prompt — refresh 3 replaced marine assets

Three image masters were replaced in place (same filenames, new artwork with
visible Mercury Marine / Suzuki Marine outboard branding):

| slug               | new artwork                                               | engine brand   |
| ------------------ | --------------------------------------------------------- | -------------- |
| `hero-marine-pair` | Granfort 3000TX cruising at sunset, twin outboards        | Mercury Marine |
| `about-coastal`    | Blue runabout cruising past Aegean coast, single outboard | Mercury Marine |
| `service-yard`     | Boatyard with travel lift, dock crew, twin outboards      | Suzuki Marine  |

All other slugs (`brands-passing`, `contact-horizon`, `service-advisory`,
`service-maintenance`, `service-representation`, `service-storage`,
`service-trailer`) are unchanged.

Paste the block below into Claude Code (`claude` in the project root).

---

```
You are working in the Tunera corporate website repo.

Three images under `public/assets/brand/web/` were re-rendered in place with
the SAME filenames but NEW artwork. Their responsive variants under
`public/assets/brand/web/optimized/{slug}-{640|1280|1920|2560|3840}w.{avif|webp|jpg}`
were also regenerated. Affected slugs:

  - hero-marine-pair   (homepage hero;     now shows twin Mercury Marine outboards)
  - about-coastal      (about page hero;   now shows a Mercury Marine outboard)
  - service-yard       (service/yard page; now shows Suzuki Marine outboards
                        being travel-lifted at the Tunera service yard)

Tasks, in order:

1. Locate every reference (HTML, JSX/TSX, MDX, CSS, JSON content files,
   sitemap, OG/Twitter meta) to these three slugs across the repo. Show the
   list before editing.

2. CACHE BUSTING. Because filenames are unchanged, end users will see stale
   images from CDN/browser cache. Apply ONE of the following strategies
   consistently across the three slugs (pick whichever the project already
   uses; if none is used, default to A):
   A. Append a content-hash query string to the URL. Example:
        /assets/brand/web/optimized/hero-marine-pair-1920w.avif?v=2026-05-10
      Use the same `?v=2026-05-10` token for all references to these three
      slugs in this pass.
   B. If the build pipeline already content-hashes filenames (Vite/Next/
      Astro asset import), make sure the imports are re-evaluated by
      touching/re-importing them; otherwise fall back to A.

3. Re-check `<picture>` blocks for the three slugs:
   - AVIF source first, WebP second, JPG `<img>` last.
   - All five widths in srcset: 640w, 1280w, 1920w, 2560w, 3840w.
   - `width="3840" height="2160"` on the `<img>` to keep aspect locked at 16:9.
   - `sizes` attribute reflects layout. Hero = "100vw". About hero = "100vw"
     unless the layout caps it (then use a media-query expression).
     Service-yard card in a 3-column grid = "(min-width: 1024px) 33vw,
     (min-width: 640px) 50vw, 100vw"; full-bleed page hero = "100vw".

4. Update `alt` text to reflect the NEW scenes (Turkish, concise, no brand
   stuffing — Mercury/Suzuki are visual detail, not the subject):
   - hero-marine-pair: "Gün batımında kıyıda seyir halinde Granfort 3000TX"
     (or keep the existing alt if it still describes the scene; do NOT add
     "Mercury" to the alt unless it already mentions an engine).
   - about-coastal: "Tunera mavi tekne — Ege kıyısında seyir"
   - service-yard: "Tunera servis tersanesi — travel-lift ile çekiliş"

5. Loading hints:
   - hero-marine-pair `<img>`: loading="eager" fetchpriority="high"
     decoding="async". If a `<link rel="preload" as="image">` exists for the
     hero, regenerate it pointing at the 1920w AVIF (with the cache-busted
     URL) and add an `imagesrcset` covering all five widths.
   - about-coastal and service-yard: loading="lazy" decoding="async" unless
     they happen to be above the fold on their respective routes.

6. OG / Twitter / favicon meta:
   - If the homepage `og:image` or `twitter:image` points at hero-marine-pair,
     bump it to the cache-busted JPG 1920w URL (social crawlers prefer JPG).
   - Same for the about page if it references about-coastal.

7. Do NOT touch the other seven slugs. Do NOT regenerate the optimized files
   — they are already on disk under `public/assets/brand/web/optimized/`.

8. After edits run the project's typecheck/lint/build command and fix any
   broken references. Print:
   - the diff summary,
   - the list of cache-busted URLs,
   - any place where the old PNG path
     `public/assets/brand/web/{slug}.png` is still referenced from production
     code (it should only appear in build scripts or this folder's docs).

Reference `public/assets/brand/web/optimized/README.md` for the full
<picture> markup pattern.
```

---

## Quick post-flight check

```bash
# 1. Make sure no production code imports the 4K master PNG directly.
git grep -nE "brand/web/(hero-marine-pair|about-coastal|service-yard)\.png\b" \
  -- ':!public/assets/brand/web/**' ':!**/optimized/**' ':!**/*.md'

# 2. Confirm cache-bust token is consistent for the three refreshed slugs.
git grep -nE "(hero-marine-pair|about-coastal|service-yard)-[0-9]+w\.(avif|webp|jpg)" \
  | grep -v "?v=2026-05-10" | head

# 3. Eyeball: load each page in a private window and verify the new artwork
#    actually shows (no stale cache).
```
