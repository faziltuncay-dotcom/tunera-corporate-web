import Image from "next/image";
import { ImageReveal } from "@/components/ImageReveal";

export type PageVisualSide = "left" | "right";

type Props = {
  image: string;
  imageAlt: string;
  /** Side the floating caption panel anchors to at lg+. */
  panelSide?: PageVisualSide;
  /** CSS object-position to keep the subject visible. */
  imagePosition?: string;
  /** Small uppercase label above the caption. */
  kicker?: string;
  /** Single short caption line that floats over the image. */
  caption?: string;
  /**
   * Section height. About / Brands / Contact use `tall` (≈70svh) so
   * the visual feels cinematic without dominating these calmer pages;
   * Services keeps its own 100svh treatment via ServiceStorySection.
   */
  height?: "tall" | "full";
};

/**
 * Calm full-bleed editorial visual block.
 *
 * Used between `<PageHero>` and the page narrative on About, Brands,
 * and Contact so each route gets a strong full-page visual moment
 * without duplicating the title/lead already in the hero. The panel
 * stays intentionally compact — small kicker + one caption line — so
 * the visual carries the section emotionally and the text never
 * fights the imagery.
 *
 * Motion is shared with `<ServiceStorySection>` via the same
 * `data-revealed` hook on the wrapping `<ImageReveal>` element:
 * background eases from `scale(1.04) → 1`, panel lifts from 18 px and
 * fades in slightly delayed. Reduced-motion settles immediately.
 */
export function PageVisualBleed({
  image,
  imageAlt,
  panelSide = "left",
  imagePosition,
  kicker,
  caption,
  height = "tall",
}: Props) {
  const heightClass = height === "full" ? "min-h-[100svh]" : "min-h-[70svh] sm:min-h-[80svh]";

  const panelJustify = panelSide === "right" ? "lg:justify-end" : "lg:justify-start";

  const sideGradient =
    panelSide === "right"
      ? "bg-gradient-to-l from-tunera-graphite/85 via-tunera-graphite/30 to-tunera-graphite/0"
      : "bg-gradient-to-r from-tunera-graphite/85 via-tunera-graphite/30 to-tunera-graphite/0";

  const showPanel = Boolean(kicker || caption);

  return (
    <ImageReveal className="tunera-service-story relative isolate block overflow-hidden bg-tunera-graphite text-tunera-ivory">
      <section
        aria-hidden={!showPanel}
        className={`relative isolate ${heightClass} w-full overflow-hidden`}
      >
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="100vw"
            className="tunera-service-image object-cover"
            style={{ objectPosition: imagePosition ?? "center" }}
          />
          {showPanel ? (
            <>
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 hidden lg:block ${sideGradient}`}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tunera-graphite/80 via-tunera-graphite/10 to-transparent lg:hidden"
              />
            </>
          ) : (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tunera-graphite/55 via-tunera-graphite/0 to-transparent"
            />
          )}
        </div>

        {showPanel ? (
          <div
            className={`relative z-10 mx-auto flex ${heightClass} max-w-6xl items-end px-6 py-16 sm:px-8 sm:py-20 lg:items-center ${panelJustify}`}
          >
            <div className="tunera-service-panel w-full max-w-md rounded-md border border-tunera-orange/30 bg-tunera-graphite/82 p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.55)] backdrop-blur-md sm:p-8">
              {kicker ? (
                <div className="flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-tunera-orange" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
                    {kicker}
                  </span>
                </div>
              ) : null}
              {caption ? (
                <p
                  className={`${kicker ? "mt-4" : ""} text-base leading-relaxed text-tunera-ivory/90 sm:text-lg sm:leading-[1.55]`}
                >
                  {caption}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}
      </section>
    </ImageReveal>
  );
}
