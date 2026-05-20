# Tunera Entry Gate — Cinematic Video Production Brief

> Owner: brand / creative direction.
> Engineering: integrates the accepted master per "Integration Instructions" below.
> Last updated: 2026-05-20.

---

## 1. Purpose

The entry gate at `/`, `/tr` and `/en` currently plays a background
loop generated with ffmpeg's `zoompan` filter (camera-only Ken Burns
push-in over the still hero illustration). That loop ships as
`public/assets/video/tunera-entry-hero.{mp4,webm,jpg}` (commit
`2ca47a0`). It is **technically functional but creatively
insufficient** — it is camera motion, not scene motion.

This brief defines what a _real_ cinematic entry video for Tunera
should look like, and how to feed it into an image-to-video /
generative motion pipeline. The current ffmpeg loop must remain in
place as the engineered fallback until the accepted cinematic master
exists. **ffmpeg cannot, on its own, animate a sailing boat, generate
believable wake, or model water reacting to a hull. Do not pretend
otherwise.** Any "cinematic" version of this video has to be produced
in a real motion tool (image-to-video model, frame-by-frame paint,
3D + comp, or hand-animated 2.5D parallax), reviewed against the
checklist in §8, then integrated by engineering per §9.

## 2. Visual Reference

Use only the assets already in this repository as visual reference.
Do not scrape external sites and do not introduce new artwork
identities.

| Role                    | Path                                                                                            |
| ----------------------- | ----------------------------------------------------------------------------------------------- |
| Primary still           | `public/assets/brand/web/optimized/hero-marine-pair-3840w.jpg`                                  |
| 4K master variants      | `public/assets/brand/web/optimized/hero-marine-pair-{640,1280,1920,2560,3840}w.{avif,webp,jpg}` |
| Current fallback MP4    | `public/assets/video/tunera-entry-hero.mp4`                                                     |
| Current fallback WebM   | `public/assets/video/tunera-entry-hero.webm`                                                    |
| Current fallback poster | `public/assets/video/tunera-entry-hero-poster.jpg`                                              |
| Brand colour tokens     | `tailwind.config.ts` → `theme.extend.colors.tunera`                                             |
| Brand system            | `docs/tunera-brand-system.md`                                                                   |

The `hero-marine-pair` illustration is the canonical first-frame
reference: a single Granfort-style motoryacht in the lower-left
third, sun glow on the right edge mid-vertical, calm sea, distant
mountain silhouette in the far background. Composition must stay
recognisably the same; we are animating _within_ it, not redrawing it.

## 3. Creative Direction

The entry gate is the user's first impression of Tunera. The video
must read as:

- **Marine-specific** — this is a boat company, not a tech startup,
  not a fashion house, not a stock-photo travel brand.
- **Premium but restrained** — petrol blue, deep navy, warm ivory,
  refined sunset orange used as accent only. No glitter, no chromed
  highlights, no glossy product-shot lighting.
- **Editorial, not advertorial** — the boat is a subject, not a
  product on sale. It does not pose for the camera, it sails.
- **Calm** — the user is about to enter a long-form corporate site,
  not a discount campaign. Mood is sunset arrival, not regatta start.
- **Tunera new era** — the brand line "Denizcilikte yeni dönem" /
  "A new era in marine" must feel earned by the atmosphere, not
  asserted by a baked-in tagline.

Do **not** introduce e-commerce signals (price chips, "shop the
look", arrows pointing at parts of the boat), fake-luxury wording
overlays, lifestyle figures suddenly appearing on deck, drone-orbit
camera moves, or any "world-class / best-in-class / award-winning"
framing.

## 4. Motion Requirements

### Boat

- The hull drifts very slowly along its current heading (frame
  reference: left-to-right, paralleling the horizon line). Total
  horizontal travel across the clip is small — roughly 3–6 % of
  frame width.
- A subtle bow rise/fall, ~1.5–2.5 % of hull height, period
  ~5–7 seconds. No yaw, no roll past 1°.
- Hull silhouette, paint scheme, branding (if any in the
  illustration) and engine count must remain identical from first
  frame to last frame.

### Sea

- Reads as a calm-to-light-breeze condition (Beaufort ≤ 2). Surface
  ripples, no breaking waves, no whitecaps.
- The water surface displaces gently and continuously. Specular
  highlights drift but never sparkle aggressively.

### Wake & foam

- A short, soft wake trails from the stern at the boat's actual
  travel speed (matches §4 _Boat_ drift). Foam dissipates within
  ~3–4 boat-lengths.
- Bow-wave is small, parted-water look, not a racing splash. No
  spray particles flying above the gunwale.

### Light & reflection

- Warm directional sun from the upper-right quadrant. Sun position
  is fixed (no time-of-day drift across the loop).
- Specular trail on the water reacts to wake displacement but never
  flips orientation.

### Camera

- The camera is essentially locked. A whisper of parallax is
  acceptable (≤ 1 % translation, no Z move, no rotation, no zoom).
  All meaningful motion belongs to the scene, not the lens.

### Loop

- Target: a true seamless loop (last frame ≈ first frame within
  perceptual tolerance). If the model cannot guarantee perfect loop,
  produce a clean 10 s clip and we will create a 0.3–0.5 s
  cross-dissolve loop at encode time.

### Overlay-safe negative space

The gate overlay places copy in the _lower-left_ on desktop and
_bottom block_ on mobile. The right edge and upper-right (sun side)
also carry CTA chrome on some breakpoints. Keep these zones
graphically calm — no high-frequency motion, no busy ripples, no
foam crossing through them:

```
+------------------------------------------+
|                                          |
|                   [ desktop: clear sky / |
|                     mountain silhouette ]|
|                                          |
|   [ HEADLINE + CTA ]    [ sun side calm ]|
|                                          |
|   [ TUNERA STORE row — bottom band ]     |
+------------------------------------------+
```

## 5. Negative Prompt / Avoid List

The reviewer (§8) rejects any take that contains any of the following:

- heavy camera shake or hand-held wobble
- melting / drifting boat hull, warped waterline
- changing boat design, hull livery, branding or engine count
  between frames
- extra random logos, callouts or chyrons appearing on hull or sea
- random text — including AI hallucinated brand marks
- new people, crew, swimmers, paddle-boarders or wildlife appearing
- distorted reflections (sun on wrong side, hull reflected at wrong
  angle, mirror-flip artifacts)
- impossible water physics (water flowing upward, wake leading the
  boat, foam that never dissipates)
- cartoonish wave shapes, painted-loop tiling, plasticky ocean
- overdramatic storm, dark clouds rolling in, rain
- racing / speedboat planing, hull lifting clear of the water
- generic stock-footage colour grade (teal-and-orange "blockbuster")
- low-resolution artefacts, mosquito noise, banding in the sky
- flickering typography or any baked text/captions/timecodes
- AI morphing — frames that show the hull, mast, or windshield
  geometry mutating
- inconsistent engine count, propeller wash that contradicts hull
  travel
- any change to brand identity colours away from the Tunera palette

## 6. Generator Prompts

The prompts below are written to be pasted into an image-to-video
tool (e.g. Runway Gen-3 / Kling / Sora-style I2V, Pika, Luma Dream
Machine — the exact tool is the producer's call). Each prompt is
self-contained and uses the supplied image as the first frame /
visual reference.

### Locked-in producer prompt — _use this version_

This is the authoritative prompt for the accepted production run.
Paste it verbatim into the chosen I2V tool together with
`public/assets/brand/web/optimized/hero-marine-pair-3840w.jpg` as
the first-frame / reference image. Variants A / B / C below remain
on file as alternates if the locked-in version needs to be tuned
toward a calmer or more dynamic feel.

```
Use the supplied Tunera hero image as the first frame and strict
visual reference. Create a premium cinematic 10-second 16:9 marine
entry video.

The main boat should gently sail forward through calm petrol-blue
water. Animate believable sea movement: subtle bow displacement,
natural wake trailing behind the hull, soft foam, small ripples
expanding outward, and moving golden-hour reflections on the water.

Preserve the original artwork style, composition, color palette,
boat proportions, lighting, and premium understated marine
atmosphere. Keep the motion elegant, slow, and confident, not fast
racing.

Maintain clean negative space for website overlay text and CTA. Do
not add text. Do not add logos. Do not add people. Do not add extra
random boats. Do not change the boat design. Do not distort the
hull or engines.

Smooth loop if possible. Output 10 seconds, 16:9, no audio, high
quality.
```

### A) Premium Cinematic Sailing — _safest version_

```
Animate the supplied still as a 10-second cinematic loop.

Use the supplied image as the first frame and as the canonical
reference for composition, colour, art style, hull design, brand
identity and lighting. Do not redraw the scene.

Animate only:
- the boat in the lower-left third drifting slowly left-to-right
  along the horizon line, ~3% of frame width total travel
- a subtle bow rise and fall, no more than 2% of hull height, no
  roll or yaw
- a soft wake trailing from the stern, foam dissipating within
  three to four boat-lengths
- a gentle ripple pattern across the sea surface
- specular highlights drifting on the water
- the warm sunset light keeps its fixed direction

Camera is locked. No zoom, no pan, no shake. Maintain the existing
overlay-safe negative space on the right side and the lower band.

Style: editorial marine illustration, premium and understated.
Petrol blue, deep navy, warm ivory, refined orange sunset accent.

10 seconds, 16:9, 24 or 30 fps, seamless loop if possible, no audio,
no text, no logos beyond what is already in the source image.
```

### B) More Dynamic Wake — _stronger sea movement, still elegant_

```
Animate the supplied still as a 10-second cinematic loop with a more
present sea while keeping a calm, premium feel.

Use the supplied image as first frame and as the canonical reference
for composition, colour, art style, hull, branding and lighting. Do
not redraw the scene.

Animate only:
- the boat drifting slowly left-to-right, ~4-5% of frame width
- a bow rise/fall up to 3% of hull height, no yaw, no roll past 1
  degree
- a more defined wake from the stern with a longer foam trail; foam
  still dissipates naturally and never reaches the right edge of
  frame
- a light-breeze sea surface with low ripples; no breaking waves,
  no whitecaps
- specular sun glints that move with the wake but never flip
  orientation

Camera is locked. No zoom, no pan, no handheld feel. Keep the right
side and bottom band graphically calm for overlay copy.

Style: cinematic editorial marine illustration, premium, restrained.
Petrol blue, deep navy, warm ivory, refined orange sunset accent.

10 seconds, 16:9, 24 or 30 fps, seamless loop, no audio, no text,
no logos beyond the source image.
```

### C) Ultra-Subtle Luxury Entry — _calmer, most refined_

```
Animate the supplied still as a 10-second cinematic loop with the
minimum motion necessary to feel alive.

Use the supplied image as first frame and canonical reference for
composition, colour, hull design, branding and lighting. Do not
redraw the scene.

Animate only:
- an almost imperceptible drift of the boat left-to-right, ~1-2% of
  frame width total
- a barely-there bow rise, well under 1.5% of hull height
- a very short, soft wake from the stern; foam fades within two
  boat-lengths
- a slow, low-amplitude ripple across the water
- gentle specular drift in the sun trail

Camera is locked. No zoom, no pan, no rotation. Keep the right side
and bottom band almost entirely still so overlay copy is readable.

Style: ultra-restrained premium marine illustration, sunset
atmosphere, petrol blue / deep navy / warm ivory / refined orange.
Read as quiet luxury, never glossy.

10 seconds, 16:9, 24 or 30 fps, seamless loop, no audio, no text,
no extra logos.
```

## 7. Output Requirements

Master video delivered by the producer should meet:

- **Resolution:** 3840 × 2160 master if the model supports it,
  otherwise 1920 × 1080 minimum.
- **Duration:** 10 seconds (acceptable range 8–12 s).
- **Frame rate:** 24 or 30 fps (constant — no VFR).
- **Audio:** none. If the file has an audio track it will be
  stripped at encode time but should be silent.
- **Container:** MP4 (H.264) or MOV (ProRes). `.mov` masters are
  gitignored — see §9.
- **No baked text, no overlay UI, no timecodes, no watermarks.**
- **First and last frame** must be clean (no model-induced artefacts,
  no half-formed wake).
- **Minimal compression artefacts.** If the model output looks
  blocky, re-render rather than upscale.

## 8. Review Checklist

A take is **accepted** only if every line below can be ticked.

- [ ] Boat hull shape is stable end-to-end.
- [ ] No hull warping, no mast/windshield mutation.
- [ ] No AI artefacts in the boat or near the waterline.
- [ ] Wake reads as believable (length, dissipation, direction
      matches travel).
- [ ] Water responds to the boat, not the other way around.
- [ ] Loop joins cleanly OR can be closed with a ≤ 0.5 s
      cross-dissolve at encode time without a visible jump.
- [ ] Overlay-safe zones (right edge, lower band) remain readable.
- [ ] Mobile portrait crop (centre column) is still composed.
- [ ] File compresses to ≤ ~12 MB at 1080p H.264 CRF 22–26 (per §9).
- [ ] No invented brand marks, no invented text, no extra logos.
- [ ] Palette still in Tunera bounds — petrol/navy/ivory/sunset.
- [ ] Mood reads premium-restrained, not loud-luxury.

If any line fails, the take is rejected — re-prompt or pick a
different model. Do **not** "fix" a failing take by simply
re-encoding it.

## 9. Integration Instructions

### Source-of-truth (do not commit)

Accepted master video should be placed at:

```
_private/video-source/tunera-entry-cinematic-master.mp4
```

`_private/` and `*.mov` are gitignored in this repo, so neither the
H.264 master nor a ProRes `.mov` will end up in the git history.
Keep the master in cloud backup; do not commit it.

### Engineering: optimise + wire (only when master exists)

When the master is in place, engineering runs an ffmpeg pass
producing:

```
public/assets/video/tunera-entry-cinematic.mp4         # H.264, 1080p, faststart, CRF 22–26, no audio
public/assets/video/tunera-entry-cinematic.webm        # VP9,   1080p, no audio
public/assets/video/tunera-entry-cinematic-poster.jpg  # high-quality JPEG of a clean early frame
```

Reference encode commands (the engineer can tune CRF per file size /
quality outcome):

```sh
# H.264 1080p, faststart, no audio
ffmpeg -y -i _private/video-source/tunera-entry-cinematic-master.mp4 \
  -vf "scale=1920:1080:flags=lanczos" \
  -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p \
  -crf 22 -preset slow -movflags +faststart -an \
  public/assets/video/tunera-entry-cinematic.mp4

# VP9 1080p, no audio
ffmpeg -y -i _private/video-source/tunera-entry-cinematic-master.mp4 \
  -vf "scale=1920:1080:flags=lanczos" \
  -c:v libvpx-vp9 -pix_fmt yuv420p -b:v 0 -crf 32 \
  -row-mt 1 -tile-columns 2 -tile-rows 1 -threads 4 \
  -auto-alt-ref 1 -lag-in-frames 25 -an \
  public/assets/video/tunera-entry-cinematic.webm

# Poster — pick a clean early frame, not frame 0
ffmpeg -y -ss 00:00:00.4 -i _private/video-source/tunera-entry-cinematic-master.mp4 \
  -frames:v 1 -q:v 3 \
  public/assets/video/tunera-entry-cinematic-poster.jpg
```

Then update `src/components/entry/EntryHeroBackground.tsx` so the
cinematic file is the primary source and the existing
`tunera-entry-hero.*` files remain as a graceful fallback.
Engineering does **not** modify the brief itself in that step — the
brief is the spec, the component is the implementation.

### Component priority order

When the cinematic asset exists, the `<video>` element must enumerate
sources in the order below so the browser picks the lightest playable
master first:

1. `tunera-entry-cinematic.webm` (VP9, cinematic master)
2. `tunera-entry-cinematic.mp4` (H.264, cinematic master)
3. `tunera-entry-hero.webm` (VP9, current zoompan fallback)
4. `tunera-entry-hero.mp4` (H.264, current zoompan fallback)
5. Picture / poster (existing AVIF/WebP/JPG layer)

`prefers-reduced-motion: reduce` continues to remove the `<video>`
entirely and leave only the static poster + picture layer.

### Fallback strategy

The current `tunera-entry-hero.{mp4,webm,jpg}` files **must remain in
the repo until the cinematic master is accepted and integrated.**
They are the engineering safety net: if the cinematic file fails to
load (404, codec mismatch, slow network, blocked CDN), the existing
zoompan loop still plays. Delete them only after the cinematic
version has been live in production for at least one release cycle.

## 10. Fallback Strategy (current state)

Until the cinematic master is in place, the site continues to play
the existing ffmpeg zoompan loop:

```
public/assets/video/tunera-entry-hero.mp4         (1.7 MB, H.264)
public/assets/video/tunera-entry-hero.webm        (657 KB, VP9)
public/assets/video/tunera-entry-hero-poster.jpg  (141 KB)
```

These are wired into `EntryHeroBackground.tsx` and remain authoritative
for the entry gate. No code changes are needed to keep them working;
only the integration step in §9 (which runs after the master exists)
will demote them to fallback position.

---

**Status:** awaiting generated cinematic master video at
`_private/video-source/tunera-entry-cinematic-master.mp4`. The site
continues to ship the engineered zoompan fallback in the meantime.
