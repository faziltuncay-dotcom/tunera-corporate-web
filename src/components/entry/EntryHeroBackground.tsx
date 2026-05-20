/**
 * Cinematic background for the Tunera entry gate.
 *
 * Renders the same `hero-marine-pair` editorial illustration that the
 * corporate homepage uses for its main hero — sourced from the same
 * prebuilt AVIF / WebP / JPG variants under
 * `/assets/brand/web/optimized/` — so the entry experience and the
 * homepage hero share a single artwork identity. Motion is a slow CSS
 * Ken-Burns push-in (`.tunera-entry-kenburns`, ~24 s) defined in
 * `globals.css`; it is removed entirely under `prefers-reduced-motion`
 * so reduced-motion users see a static cinematic poster instead.
 *
 * No video file is shipped: ffmpeg is not present in the build
 * environment, and the brief explicitly accepts a CSS image-motion
 * fallback over a fabricated video. The picture element keeps the
 * variant + format negotiation identical to `ResponsiveBrandImage`
 * (same width set, same cache-bust token) so the browser pulls the
 * lightest variant that satisfies the viewport.
 */
const OPTIMIZED_BASE = "/assets/brand/web/optimized";
const SLUG = "hero-marine-pair";
const CACHE_BUST = "?v=2026-05-10";
const WIDTHS = [640, 1280, 1920, 2560, 3840] as const;

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
      {/* Petrol-graphite overlay tuned for readability of the entry copy
          without dulling the sunset highlights of the underlying art. */}
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
