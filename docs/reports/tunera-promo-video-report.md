# Tunera promo video — render pipeline report

## Summary

A deterministic, locally reproducible render pipeline for Tunera
Denizcilik's website-launch Instagram Reels promo. The pipeline
captures screenshots from the running Tunera Next.js site with
Playwright, then composes a 30 s vertical 9:16 1080×1920 H.264 MP4
(plus an 11 s Story cut and a single-frame cover PNG) with Remotion.
No third-party stock footage, no random image downloads, no licensed
music. All scenes are built from existing committed brand
illustrations, the live Tunera site, and the existing Tunera
logomarks.

The pipeline lives entirely under `tools/promo-video/`. Its
dependencies (Remotion 4, Playwright 1.48 + Chromium 130) install
into that subfolder only — the main Tunera package is untouched
except for three convenience scripts (`promo:capture`,
`promo:render`, `promo:video`) and one `.gitignore` line.

## Video concept

"Tunera Denizcilik için yeni dönem başladı." The website is the
proof. The 30 s main reel takes the viewer through six calm
editorial beats — hero → kurumsal yaklaşım → markalar → hizmetler →
website reveal → closing card — using the same illustration set and
narrative grammar (slow ken-burns, fade-and-slide captions,
Apple-leaning ease-out) the website itself uses. The 11 s Story cut
keeps the same opening, the same website reveal, and the same
closing card so the brand reads identically on either format.

## Output files

All three deliverables are committed under
`public/generated/promo/` (≈ 8.9 MB total — well below Instagram's
100 MB upload cap and small enough that git diffing them stays
practical):

| File                              | Spec                              | Notes  |
| --------------------------------- | --------------------------------- | ------ |
| `tunera-website-launch-reels.mp4` | 1080×1920, 30 FPS, 30.00 s, H.264 | 5.8 MB |
| `tunera-website-launch-story.mp4` | 1080×1920, 30 FPS, 11.00 s, H.264 | 1.8 MB |
| `tunera-website-launch-cover.png` | 1080×1920 PNG                     | 1.3 MB |

Each MP4 was rendered with Remotion's bundled ffmpeg at CRF 21, JPEG
intermediate quality 95.

## Source files changed

```
.gitignore                                     M   (add captures/ ignore)
package.json                                   M   (three promo:* scripts)
docs/reports/tunera-promo-video-report.md      A   (this file)
tools/promo-video/.gitignore                   A
tools/promo-video/package.json                 A
tools/promo-video/tsconfig.json                A
tools/promo-video/remotion.config.ts           A
tools/promo-video/scripts/capture.mjs          A
tools/promo-video/src/index.ts                 A
tools/promo-video/src/Root.tsx                 A
tools/promo-video/src/MainReels.tsx            A
tools/promo-video/src/StoryReels.tsx           A
tools/promo-video/src/Cover.tsx                A
tools/promo-video/src/theme.ts                 A
tools/promo-video/src/components/Caption.tsx   A
tools/promo-video/src/components/SceneFrame.tsx A
tools/promo-video/src/scenes/WebsiteRevealScene.tsx A
tools/promo-video/src/scenes/ClosingScene.tsx  A
public/generated/promo/tunera-website-launch-reels.mp4    A
public/generated/promo/tunera-website-launch-story.mp4    A
public/generated/promo/tunera-website-launch-cover.png    A
```

No production website source files were modified.

## Routes captured

Captured from the running dev server on `http://localhost:3100`:

| Route          | Viewport     | Used in scene                                    |
| -------------- | ------------ | ------------------------------------------------ |
| `/tr`          | 390×844 @2x  | Scene 5 — phone mock content                     |
| `/tr`          | 390×844 @2x  | Scene 5 — mid-page reference (manifest only)     |
| `/tr`          | 1440×900 @2x | Scene 5 — desktop slab reference (manifest only) |
| `/tr/markalar` | 390×844 @2x  | Scene 5 — alt reference (manifest only)          |
| `/tr/markalar` | 390×844 @2x  | Scene 5 — alt reference (manifest only)          |
| `/tr/markalar` | 1440×900 @2x | Scene 5 — desktop slab in mockup                 |
| `/tr/iletisim` | 390×844 @2x  | reserved (manifest only)                         |

The composition consumes two captures by name today
(`home-mobile.png` and `brands-desktop.png`); the rest are retained
in the manifest so future iterations can swap visuals without
rerunning the capture script.

## Route smoke table

Capture script's built-in smoke test (runs against the dev server
before any screenshots are taken):

| Route          | Status |
| -------------- | -----: |
| `/`            |    200 |
| `/tr`          |    200 |
| `/tr/markalar` |    200 |
| `/tr/iletisim` |    200 |

Plus an additional end-to-end verification against the live dev
server during this task (curl, follow redirects):

| Route          | Status |
| -------------- | -----: |
| `/`            |    200 |
| `/tr`          |    200 |
| `/en`          |    200 |
| `/markalar`    |    200 |
| `/tr/markalar` |    200 |
| `/en/brands`   |    200 |
| `/iletisim`    |    200 |
| `/tr/iletisim` |    200 |
| `/en/contact`  |    200 |

## Verification commands and PASS/FAIL

| Command              | Result | Notes                                     |
| -------------------- | -----: | ----------------------------------------- |
| `pnpm format:check`  |   PASS | All matched files use Prettier code style |
| `pnpm lint`          |   PASS | ✔ No ESLint warnings or errors           |
| `pnpm typecheck`     |   PASS | `tsc --noEmit` clean                      |
| `pnpm build`         |   PASS | 22 routes, 20 static + 2 dynamic          |
| `pnpm test`          |   PASS | 18 / 18                                   |
| `pnpm promo:capture` |   PASS | 7 screenshots written + manifest          |
| `pnpm promo:render`  |   PASS | cover PNG + story MP4 + main MP4 produced |
| Public route smoke   |   PASS | 9 / 9 routes 200                          |

## Audio

**Deferred.** No licensed audio is shipped in the repo, and the
project discipline forbids downloading copyrighted music or random
asset packs. The video renders cleanly as silent (Remotion's
default), and the brand team can layer a licensed cinematic ambient
or electronic track in Instagram's native editor or via the
publishing tool. Suggested drop-in path if a licensed file is added
later: `public/assets/audio/promo-track.mp3` (and add it to the
composition via `<Audio src={staticFile("/assets/audio/promo-track.mp3")} />`).

## Known limitations

- **No audio track.** See above.
- **Phone mockup is CSS-painted, not a 3D bezel.** A device-bezel
  PNG would have meant downloading external imagery, which the
  project discipline forbids. The CSS frame (rounded corners,
  subtle shadow, notch hint) reads as understated rather than
  cartoon-mockup and matches the rest of the brand language.
- **Screenshots reflect the dev-time consent banner** on the
  homepage. The banner is real Tunera UI and not problematic in
  context, but if the brand team prefers a cleaner phone surface a
  follow-up capture pass can dismiss the banner before screenshot.
- **English routes are not used in the video.** The promo is
  Turkish-first by design. English-locale screen captures are
  smoke-tested but not composed into the current cut.

## Deferred work

- Music track integration (waiting on a licensed source).
- A 60 s "full" version that includes the services scroll story
  in more detail.
- A reverse-tilted laptop chrome rather than the simplified slab
  used in Scene 5.

## Commit hash

`(pending — see next section)`

## Final git status

`(reported by the verify step below)`

---

## How to reproduce

```bash
# 0. From repo root
cd "/Users/faziltuncay/Documents/Claude/Projects/TUNERA CORPORATE WEB"
nvm use 20.10.0

# 1. Install (only once — Remotion + Playwright + Chromium 130 ≈ 200 MB)
pnpm --dir tools/promo-video --ignore-workspace install
pnpm --dir tools/promo-video --ignore-workspace exec playwright install chromium

# 2. Start the Tunera dev server in another terminal
PORT=3100 pnpm dev

# 3. Capture the live site, then render all three outputs
pnpm promo:capture
pnpm promo:render

# Output files
ls -lh public/generated/promo/
```

Set `PROMO_BASE_URL` if the dev server runs on a different host or
port.
