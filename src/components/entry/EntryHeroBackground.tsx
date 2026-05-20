/**
 * Cinematic background for the Tunera entry gate.
 *
 * Renders a layered scene whose primary motion is a real 10-second
 * 1920×1080 H.264 / VP9 video baked from the same hero-marine-pair
 * editorial illustration the corporate homepage already uses (no new
 * artwork is introduced). The video is muted, autoplay, loop and
 * playsInline so iOS Safari treats it as a decorative ambient
 * background rather than blocking media.
 *
 * Three layers, in z-order from back to front:
 *   1. `<picture>` — the same AVIF / WebP / JPG variants the homepage
 *      hero uses, served via the prebuilt files under
 *      `/assets/brand/web/optimized/`. Carries `.tunera-entry-kenburns`
 *      so this layer remains a self-contained animated fallback. It
 *      paints first (no decode cost the homepage hero hasn't already
 *      paid) and shows through if the browser cannot play either
 *      video codec, if the network drops the video, or while the
 *      video's first frame is still being decoded.
 *   2. `<video>` — primary motion. `preload="metadata"` so the asset
 *      starts streaming as soon as the gate's main bundle is on the
 *      wire without blocking first paint. The same JPG poster is
 *      handed in so the video paints the right colour while data
 *      arrives. Sources are ordered WebM-first (smaller, ~657 KB) so
 *      Chromium/Firefox skip the MP4 entirely; Safari falls through
 *      to the MP4 (~1.7 MB).
 *   3. Two graphite overlays — the same petrol-warm scrim the
 *      previous-phase gate already used, so the gate copy and CTA
 *      remain legible at the same contrast regardless of which
 *      motion layer is showing.
 *
 * Reduced motion handling lives in `globals.css`: a single
 * `prefers-reduced-motion: reduce` rule sets `display: none` on the
 * video and freezes the Ken-Burns keyframes, leaving a static
 * cinematic poster — no JS branching required.
 */
const OPTIMIZED_BASE = "/assets/brand/web/optimized";
const SLUG = "hero-marine-pair";
const CACHE_BUST = "?v=2026-05-10";
const WIDTHS = [640, 1280, 1920, 2560, 3840] as const;

const VIDEO_BASE = "/assets/video";
const VIDEO_WEBM = `${VIDEO_BASE}/tunera-entry-hero.webm`;
const VIDEO_MP4 = `${VIDEO_BASE}/tunera-entry-hero.mp4`;
const VIDEO_POSTER = `${VIDEO_BASE}/tunera-entry-hero-poster.jpg`;

const srcset = (ext: "avif" | "webp" | "jpg") =>
  WIDTHS.map((w) => `${OPTIMIZED_BASE}/${SLUG}-${w}w.${ext}${CACHE_BUST} ${w}w`).join(", ");

export function EntryHeroBackground() {
  return (
    <div aria-hidden className="tunera-entry-bg absolute inset-0 overflow-hidden">
      <div className="tunera-entry-kenburns absolute inset-0">
        <picture className="block h-full w-full">
          <source type="image/avif" srcSet={srcset("avif")} sizes="100vw" />
          <source type="image/webp" srcSet={srcset("webp")} sizes="100vw" />
          <img
            src={`${OPTIMIZED_BASE}/${SLUG}-1920w.jpg${CACHE_BUST}`}
            srcSet={srcset("jpg")}
            sizes="100vw"
            width={3840}
            height={2160}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            alt=""
            className="tunera-entry-image h-full w-full object-cover [object-position:32%_42%] sm:[object-position:center_50%]"
          />
        </picture>
      </div>

      <video
        className="tunera-entry-video absolute inset-0 h-full w-full object-cover [object-position:32%_42%] sm:[object-position:center_50%]"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={VIDEO_POSTER}
        aria-hidden
        tabIndex={-1}
      >
        <source src={VIDEO_WEBM} type="video/webm" />
        <source src={VIDEO_MP4} type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-tunera-graphite/55 via-tunera-graphite/35 to-tunera-graphite/80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-tunera-graphite/55 via-tunera-graphite/0 to-tunera-graphite/0"
      />
    </div>
  );
}
