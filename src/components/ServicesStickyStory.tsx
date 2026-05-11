"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ResponsiveBrandImage, type BrandImageSlug } from "@/components/ResponsiveBrandImage";
import { panelPlacementClasses, type PanelPlacement } from "@/lib/visualComposition";

export type ServiceStoryItem = {
  /** Short kicker label (e.g. "Temsil", "Service"). */
  kicker: string;
  /** Service title. */
  title: string;
  /** Short description rendered under the title. */
  description: string;
  /** Optional fine-print line. */
  note: string | null;
  /** Brand image slug — picked up from `optimized/{slug}-{w}w.{avif|webp|jpg}`. */
  slug: BrandImageSlug;
  /** Image alt for the active stage. */
  imageAlt: string;
  /** Desktop / tablet `object-position` hint. */
  imagePosition?: string;
  /** Mobile `object-position` hint. */
  imagePositionMobile?: string;
  /** Image-aware panel placement at lg+. */
  panelPlacement?: PanelPlacement;
};

type Props = {
  /** Aria-label on the outer section element. */
  ariaLabel: string;
  items: ReadonlyArray<ServiceStoryItem>;
};

/**
 * Sticky, smooth, wave-driven scroll story for the services section.
 *
 * Two distinct branches by breakpoint:
 *
 *   - **lg+** — sticky cross-fade scene. The outer container is sized
 *     `(stages + 1) * 100vh` so the sticky child has exactly N viewports
 *     of scroll inside it; each stage therefore gets a full 100 vh
 *     dwell window instead of the previous compressed ≈ 83 vh that
 *     could feel like the panels were rushing past on a fast trackpad
 *     scroll. The container's progress 0..1 is mapped to the active
 *     stage via `Math.floor(progress * stageCount)`, clamped at the
 *     last stage.
 *
 *   - **sub-lg** — fully stacked sequential layout. Each service
 *     renders as a self-contained image strip + caption panel, in
 *     document order. No sticky, no cross-fade, no scroll listener.
 *     This guarantees every service is reliably visible and never
 *     disappears between transitions on touch devices, where the
 *     previous sticky math could compress dwell windows below a single
 *     swipe height. The desktop sticky markup is `lg:hidden`'d, so
 *     small screens never even mount it.
 *
 * Native scroll only — no preventDefault, no wheel/touch hijacking,
 * no scroll-snap. Reduced-motion users get the cross-fade collapsed
 * (CSS forces opacity 1 on the active stage, transition timing 0).
 */
export function ServicesStickyStory({ ariaLabel, items }: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const stageCount = items.length;

  // (stages + 1) × 100 vh so each stage gets exactly one viewport of
  // scroll inside the sticky window (totalScroll = container - viewport
  // = stages × 100 vh). Previous `stages × 100 vh` shape gave only
  // (stages − 1) viewports of scroll, compressing each stage's dwell.
  const containerStyle: CSSProperties = {
    height: `${(stageCount + 1) * 100}vh`,
  };

  useEffect(() => {
    let rafId: number | null = null;
    let lastIndex = 0;

    const update = () => {
      rafId = null;
      const container = containerRef.current;
      const sticky = stickyRef.current;
      if (!container || !sticky) return;

      const rect = container.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;
      const totalScroll = rect.height - viewportH;

      let progress = 0;
      if (totalScroll > 0) {
        const raw = -rect.top / totalScroll;
        progress = raw < 0 ? 0 : raw > 1 ? 1 : raw;
      }
      sticky.style.setProperty("--story-progress", progress.toFixed(4));

      const idx = Math.min(stageCount - 1, Math.floor(progress * stageCount));
      if (idx !== lastIndex) {
        lastIndex = idx;
        setActiveStage(idx);
      }
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [stageCount]);

  const totalLabel = String(stageCount);

  return (
    <>
      {/* MOBILE / TABLET (< lg) — stacked sequential layout. Every
          service is a self-contained image + caption block. No sticky,
          no cross-fade, no scroll listener: every service is reliably
          visible and the transition between them is just normal page
          scroll. */}
      <section
        aria-label={ariaLabel}
        className="relative block bg-tunera-graphite text-tunera-ivory lg:hidden"
      >
        <ol role="list" className="divide-y divide-tunera-ivory/10">
          {items.map((item, i) => (
            <li key={`stack-${item.title}`} className="relative">
              <div className="relative h-[52svh] min-h-[360px] w-full overflow-hidden">
                <div className="tunera-image-wave-breathe absolute inset-0">
                  <ResponsiveBrandImage
                    slug={item.slug}
                    alt={item.imageAlt}
                    sizes="100vw"
                    fill
                    priority={i === 0}
                    objectPosition={item.imagePosition}
                    objectPositionMobile={item.imagePositionMobile}
                  />
                </div>
              </div>
              <article className="relative px-5 pb-12 pt-9 sm:px-8 sm:pb-14 sm:pt-10">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-tunera-orange" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
                    {item.kicker}
                  </span>
                </div>
                <div className="mt-3 text-[11px] font-medium tabular-nums tracking-[0.22em] text-tunera-orange/80">
                  {String(i + 1)}
                  <span className="text-tunera-ivory/40"> / {totalLabel}</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold leading-[1.1] tracking-tighter2 text-tunera-ivory sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-tunera-ivory/85 sm:text-base">
                  {item.description}
                </p>
                {item.note ? (
                  <p className="mt-4 border-t border-tunera-ivory/15 pt-4 text-xs leading-relaxed text-tunera-ivory/65">
                    {item.note}
                  </p>
                ) : null}
              </article>
            </li>
          ))}
        </ol>
      </section>

      {/* DESKTOP (lg+) — sticky cross-fade scene. Outer container is
          (stages + 1) × 100 vh so each stage gets exactly one viewport
          of scroll dwell — slower and more readable than the previous
          (stages) × 100 vh shape that compressed each stage to ≈ 83 vh.
          Mounted only at lg+ via Tailwind so mobile never instantiates
          the scroll listener or the stacked image/panel duplicates. */}
      <section
        ref={containerRef}
        aria-label={ariaLabel}
        className="relative hidden bg-tunera-graphite text-tunera-ivory lg:block"
        style={containerStyle}
        data-stages={stageCount}
        data-active-stage={activeStage}
      >
        <div
          ref={stickyRef}
          className="sticky top-0 h-[100svh] w-full overflow-hidden"
          style={{ ["--story-progress" as string]: "0" }}
        >
          {/* Image stack — full-bleed, cross-fades on activeStage. */}
          <div className="absolute inset-0">
            {items.map((item, i) => {
              const isActive = i === activeStage;
              return (
                <div
                  key={item.title}
                  aria-hidden={!isActive}
                  data-active={isActive}
                  className="tunera-services-sticky-image absolute inset-0"
                >
                  <div className="tunera-image-wave-breathe absolute inset-0">
                    <ResponsiveBrandImage
                      slug={item.slug}
                      alt={isActive ? item.imageAlt : ""}
                      sizes="100vw"
                      fill
                      priority={i === 0}
                      objectPosition={item.imagePosition}
                      objectPositionMobile={item.imagePositionMobile}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Per-stage side gradient at lg+ keeps the panel side legible
              without darkening the whole image. */}
          {items.map((item, i) => {
            const isActive = i === activeStage;
            const placement = item.panelPlacement ?? "left";
            const { gradientClass } = panelPlacementClasses(placement);
            return (
              <div
                key={`grad-${item.title}`}
                aria-hidden
                data-active={isActive}
                className={`tunera-services-sticky-image pointer-events-none absolute inset-0 ${gradientClass}`}
              />
            );
          })}

          {/* Panel stack — every panel is absolute-positioned on top of
              the same container; only the active one is opacity-1 and
              pointer-events-auto. */}
          {items.map((item, stageIdx) => {
            const placement = item.panelPlacement ?? "left";
            const { flexClass } = panelPlacementClasses(placement);
            const isActive = stageIdx === activeStage;
            return (
              <div
                key={`flex-${item.title}`}
                data-active={isActive}
                aria-hidden={!isActive}
                className={`tunera-services-sticky-image pointer-events-none absolute inset-0 z-10 mx-auto flex h-[100svh] max-w-6xl items-end px-8 py-24 ${flexClass}`}
              >
                <article
                  data-active={isActive}
                  className="tunera-services-sticky-panel tunera-floating-copy pointer-events-auto w-full max-w-xl"
                >
                  <div className="tunera-stagger tunera-stagger--kicker flex items-center gap-3">
                    <span aria-hidden className="tunera-floating-rail" />
                    <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
                      {item.kicker}
                    </span>
                  </div>
                  <div className="tunera-stagger tunera-stagger--number mt-4 text-[11px] font-medium tabular-nums tracking-[0.22em] text-tunera-orange/80">
                    {String(stageIdx + 1)}
                    <span className="text-tunera-ivory/45"> / {totalLabel}</span>
                  </div>
                  <h2 className="tunera-stagger tunera-stagger--title mt-3 text-3xl font-semibold leading-[1.05] tracking-tighter2 text-tunera-ivory md:text-4xl xl:text-5xl">
                    {item.title}
                  </h2>
                  <p className="tunera-stagger tunera-stagger--body mt-5 text-base leading-relaxed text-tunera-ivory md:text-lg md:leading-[1.6]">
                    {item.description}
                  </p>
                  {item.note ? (
                    <p className="tunera-stagger tunera-stagger--note mt-5 border-t border-tunera-ivory/20 pt-4 text-xs leading-relaxed text-tunera-ivory/75">
                      {item.note}
                    </p>
                  ) : null}
                </article>
              </div>
            );
          })}

          {/* Vertical side index — stage progress on the right edge. */}
          <ol
            aria-hidden
            className="pointer-events-none absolute right-6 top-1/2 flex -translate-y-1/2 flex-col gap-3 text-[10px] font-medium tabular-nums tracking-[0.22em] lg:right-10"
          >
            {items.map((item, i) => {
              const active = i === activeStage;
              return (
                <li
                  key={item.title}
                  className={`flex items-center gap-2 transition-all duration-500 ease-out ${
                    active ? "text-tunera-orange opacity-100" : "text-tunera-ivory/40 opacity-80"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`h-px transition-all duration-500 ${
                      active ? "w-6 bg-tunera-orange" : "w-3 bg-tunera-ivory/40"
                    }`}
                  />
                  <span>{String(i + 1)}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}
