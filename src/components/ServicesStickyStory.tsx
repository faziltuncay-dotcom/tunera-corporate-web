"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

export type ServiceStoryItem = {
  /** Short kicker label (e.g. "Temsil", "Service"). */
  kicker: string;
  /** Service title. */
  title: string;
  /** Short description rendered under the title. */
  description: string;
  /** Optional fine-print line. */
  note: string | null;
  /** Image src under /assets/brand/web. */
  image: string;
  /** Image alt for the active stage. */
  imageAlt: string;
  /** Optional `object-position` hint to keep the subject visible. */
  imagePosition?: string;
};

type Props = {
  /** Aria-label on the outer section element. */
  ariaLabel: string;
  /** Eyebrow shown above the panel stack. */
  eyebrow: string;
  items: ReadonlyArray<ServiceStoryItem>;
};

/**
 * Sticky, smooth, wave-driven scroll story for /hizmetler.
 *
 * Replaces the previous six stacked 100svh sections (which hard-cut
 * between unrelated illustrations) with a single sticky scene where
 * the image and panel cross-fade between stages as the user scrolls.
 *
 * Architecture mirrors `ScrollNarrativeClient`:
 *
 *   - Outer `<section>` is `stages * 100vh` tall, providing scroll
 *     distance to traverse all stages.
 *   - Inside, a `sticky top-0 h-[100svh]` scene paints all stage
 *     images stacked absolutely; only the active one is opacity-1
 *     (handled in CSS via `data-active`). Same for panels.
 *   - A single rAF-throttled passive scroll listener computes the
 *     container's progress (0..1) and only triggers a React re-render
 *     when the active stage threshold is crossed — N transitions per
 *     full traverse, not per pixel.
 *   - Each image wrapper carries `tunera-image-wave-breathe` so the
 *     painted waves drift gently while the stage settles.
 *
 * Mobile / reduced-motion is handled via the desktop branch alone:
 * the sticky scene works at all viewports because the image is the
 * dominant element and the panel stacks naturally on small surfaces.
 * Reduced-motion users skip the cross-fade transitions but still see
 * the active stage's content (CSS forces opacity 1 on data-active).
 *
 * Native scroll only — no preventDefault, no wheel/touch hijacking,
 * no scroll-snap.
 */
export function ServicesStickyStory({ ariaLabel, eyebrow, items }: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const stageCount = items.length;

  const containerStyle: CSSProperties = {
    height: `${stageCount * 100}vh`,
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

  const totalLabel = String(stageCount).padStart(2, "0");

  return (
    <section
      ref={containerRef}
      aria-label={ariaLabel}
      className="relative bg-tunera-graphite text-tunera-ivory"
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
                  <Image
                    src={item.image}
                    alt={isActive ? item.imageAlt : ""}
                    fill
                    sizes="100vw"
                    priority={i === 0}
                    className="object-cover"
                    style={{ objectPosition: item.imagePosition ?? "center" }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Side gradient at lg+ keeps the panel side legible without
            darkening the whole image. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-tunera-graphite/85 via-tunera-graphite/35 to-tunera-graphite/0 lg:block"
        />
        {/* Bottom-up gradient on mobile / tablet where the panel
            stacks at the bottom of the section. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tunera-graphite/85 via-tunera-graphite/15 to-transparent lg:hidden"
        />

        {/* Eyebrow — small label above the panel stack, anchored to
            the top-left of the page area at lg+. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 mx-auto hidden max-w-6xl px-6 pt-10 sm:px-8 sm:pt-14 lg:block">
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-tunera-orange" />
            <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
              {eyebrow}
            </span>
          </div>
        </div>

        {/* Panel stack — every panel is absolute-positioned on top of
            the same container; only the active one is opacity-1 and
            pointer-events-auto. The container gives the stack
            explicit min-height so the longest panel always fits
            without truncation, no matter which stage is active. */}
        <div className="relative z-10 mx-auto flex h-[100svh] max-w-6xl items-end px-6 py-16 sm:px-8 sm:py-20 lg:items-center lg:justify-start lg:py-24">
          <div className="relative w-full max-w-xl min-h-[420px] sm:min-h-[480px]">
            {items.map((item, i) => {
              const isActive = i === activeStage;
              const indexLabel = String(i + 1).padStart(2, "0");
              return (
                <article
                  key={item.title}
                  data-active={isActive}
                  aria-hidden={!isActive}
                  className="tunera-services-sticky-panel absolute inset-x-0 top-0 rounded-md border border-tunera-orange/30 bg-tunera-graphite/88 p-7 shadow-[0_28px_70px_-30px_rgba(0,0,0,0.6)] backdrop-blur-md sm:p-9"
                >
                  <div className="flex items-center gap-3">
                    <span aria-hidden className="h-px w-8 bg-tunera-orange" />
                    <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
                      {item.kicker}
                    </span>
                  </div>
                  <div className="mt-4 text-[11px] font-medium tabular-nums tracking-[0.22em] text-tunera-orange/80">
                    {indexLabel}
                    <span className="text-tunera-ivory/40"> / {totalLabel}</span>
                  </div>
                  <h2 className="mt-3 text-3xl font-semibold leading-[1.05] tracking-tighter2 text-tunera-ivory sm:text-4xl md:text-5xl">
                    {item.title}
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-tunera-ivory/90 sm:text-lg sm:leading-[1.6]">
                    {item.description}
                  </p>
                  {item.note ? (
                    <p className="mt-5 border-t border-tunera-ivory/15 pt-4 text-xs leading-relaxed text-tunera-ivory/65">
                      {item.note}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>

        {/* Vertical side index — stage progress on the right edge.
            Hidden on small screens to keep the surface uncluttered. */}
        <ol
          aria-hidden
          className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-3 text-[10px] font-medium tabular-nums tracking-[0.22em] sm:right-8 md:flex lg:right-10"
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
                <span>{String(i + 1).padStart(2, "0")}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
