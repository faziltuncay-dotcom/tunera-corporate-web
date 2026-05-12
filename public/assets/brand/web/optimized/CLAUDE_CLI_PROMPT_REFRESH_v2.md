# Claude Code prompt — refresh 4 replaced marine assets (round 2)

Four image masters were just replaced in place (same filenames, new artwork).
Cumulatively, the following 6 slugs are now on their new (current) versions;
the 4 NEW ones in this round are marked with **NEW**:

| slug                     | scene                                                                                | round      |
| ------------------------ | ------------------------------------------------------------------------------------ | ---------- |
| `hero-marine-pair`       | Granfort 3000TX, twin Mercury, sunset cruise                                         | prev round |
| `about-coastal`          | Single blue Mercury runabout cruising past Mediterranean coast                       | **NEW**    |
| `brands-passing`         | Three Tunera-represented boats (Granfort, blue boat, Uttern) cruising past coastline | **NEW**    |
| `service-representation` | Three boats moored beside a villa at sunset, Mercury outboards                       | **NEW**    |
| `service-trailer`        | Orange VW Amarok pickup towing a Tunera boat at sunset                               | **NEW**    |
| `service-yard`           | Boatyard with travel lift, dock crew, Suzuki Marine outboards                        | prev round |

Unchanged slugs (do NOT touch): `contact-horizon`, `service-advisory`,
`service-maintenance`, `service-storage`.

Paste the block below into Claude Code (`claude` in the project root).

---

```
You are working in the Tunera corporate website repo.

Four images under `public/assets/brand/web/` were re-rendered in place with
the SAME filenames but NEW artwork. Their responsive variants under
`public/assets/brand/web/optimized/{slug}-{640|1280|1920|2560|3840}w.{avif|webp|jpg}`
were also regenerated. Affected slugs (this round):

  - about-coastal         (homepage "About Us" section image; blue Mercury
                           runabout cruising past Mediterranean coast)
  - brands-passing        (brands page hero; three Tunera-represented boats
                           cruising past a coastline at sunset)
  - service-representation (homepage "brand representation & new boat sales"
                           section; three boats moored at a villa, Mercury
                           outboards)
  - service-trailer       (services > marine trailer page; orange VW Amarok
                           towing a Tunera boat at sunset)

Tasks, in order:

1. Locate every reference to these four slugs in the repo (HTML, JSX/TSX,
   MDX, CSS, JSON content files, sitemap, OG/Twitter meta). Show the list
   before editing.

2. CACHE BUSTING. Because filenames are unchanged, the CDN/browser will keep
   serving stale images. Apply the SAME strategy used in the previous round
   (a `?v=YYYY-MM-DD` query string) but bump the token forward. For the four
   slugs in this round use:
       ?v=2026-05-12
   If the previous round used another scheme (content hash from the build
   pipeline), use whatever the project's convention is — just make sure the
   token differs from the previous round.

3. Re-check `<picture>` blocks for the four slugs:
   - AVIF source first, WebP second, JPG `<img>` last.
   - All five widths in srcset: 640w, 1280w, 1920w, 2560w, 3840w.
   - `width="3840" height="2160"` on the `<img>` to keep the 16:9 aspect.
   - `sizes`:
       - `about-coastal` on homepage About section: depends on layout. If
         the section is full-bleed, use "100vw". If it's a half-column with
         text alongside on desktop, use
         `"(min-width: 1024px) 50vw, 100vw"`.
       - `brands-passing` as a brands-page hero or full-bleed strip:
         `"100vw"`.
       - `service-representation` on homepage section: if it's a full-bleed
         feature use `"100vw"`; if it sits in a 2-column with text
         `"(min-width: 1024px) 50vw, 100vw"`.
       - `service-trailer` on the services/trailer page: hero = `"100vw"`,
         card in a 3-column services grid =
         `"(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"`.

4. Update `alt` text in Turkish, concise, no engine-brand stuffing:
   - about-coastal: "Mavi Granfort tekne — Akdeniz kıyısında seyir"
     (replace previous round's alt if it exists)
   - brands-passing: "Tunera marka portföyü — kıyıda seyir halinde tekneler"
   - service-representation: "Marka temsilciliği ve yeni tekne satışı —
     gün batımında demirli filo"
   - service-trailer: "Tunera marin römork hizmeti — Amarok ile çekiş"

5. Loading hints:
   - If `about-coastal` is the FIRST image visible on the homepage About
     section above the fold, give it loading="eager" fetchpriority="high".
     Otherwise loading="lazy".
   - `brands-passing` on the brands page: if it's the page hero, eager;
     else lazy.
   - `service-representation` on homepage: most likely below the fold ->
     loading="lazy" decoding="async".
   - `service-trailer` on its services subpage hero: eager; in nav/card
     grids: lazy.

6. OG / Twitter meta:
   - If the brands page has `og:image` pointing at `brands-passing`, bump it
     to the cache-busted 1920w JPG.
   - If the services/trailer page has its own `og:image`, do the same.

7. Do NOT touch: contact-horizon, service-advisory, service-maintenance,
   service-storage, hero-marine-pair, service-yard. (The last two were
   already refreshed in the previous round and remain on their current
   artwork.)

8. Do NOT regenerate the optimized files — they are already on disk under
   `public/assets/brand/web/optimized/`.

9. After edits, run the project's typecheck/lint/build command and fix any
   broken references. Print:
   - diff summary,
   - the list of cache-busted URLs added/updated,
   - any place where a master PNG path
     `public/assets/brand/web/{slug}.png` is still imported from production
     code (it should only appear in build scripts or this folder's docs).

Reference `public/assets/brand/web/optimized/README.md` for the full
<picture> markup pattern.
```

---

## Quick post-flight check

```bash
# 1. No production code imports the 4K master PNG for these four slugs.
git grep -nE "brand/web/(about-coastal|brands-passing|service-representation|service-trailer)\.png\b" \
  -- ':!public/assets/brand/web/**' ':!**/optimized/**' ':!**/*.md'

# 2. Cache-bust token consistent for the four refreshed slugs.
git grep -nE "(about-coastal|brands-passing|service-representation|service-trailer)-[0-9]+w\.(avif|webp|jpg)" \
  | grep -v "?v=2026-05-12" | head

# 3. Eyeball each consuming page in a private window — make sure new
#    artwork shows (no stale cache).
```
