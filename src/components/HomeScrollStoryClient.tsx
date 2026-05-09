"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export type Stage = {
  id: string;
  kicker: string;
  title: string;
  body: string;
};

export type StoryPayload = {
  ariaLabel: string;
  eyebrow: string;
  stages: Stage[];
  /**
   * Optional micro-content rendered below each stage's body.
   * Indexed by stage id so the server payload stays serializable.
   */
  microContent: Record<string, ReactNode>;
};

/**
 * Apple-inspired scroll storytelling for the home page.
 *
 * Desktop / tablet (lg+, no reduced-motion):
 *   - Outer `.tunera-home-story` container is `(stages + 1) * 100vh`
 *     tall (set via the `--story-height` CSS variable, scoped to lg+
 *     in `globals.css`).
 *   - Inside, a `sticky top-0 h-screen` stage holds all stages
 *     absolutely positioned; only the active stage is visible.
 *   - A single rAF-throttled scroll listener computes scroll progress
 *     against the container's bounding rect. It writes a CSS variable
 *     `--story-progress` (0–1) on the sticky element so a faint
 *     pattern layer can drift continuously, and updates React state
 *     only when the active stage index actually changes.
 *
 * Mobile (< lg) and prefers-reduced-motion (any width):
 *   - Renders a stacked column where each stage is a normal section.
 *   - No sticky and no consumed scroll-listener output.
 *   - The reduced-motion override is applied via CSS in `globals.css`
 *     (`.tunera-home-story-sticky` is hidden and the container goes
 *     back to auto height).
 *
 * Performance:
 *   - rAF throttling so the listener fires at most once per frame.
 *   - Passive scroll listener.
 *   - React state changes only on stage index change (4 transitions
 *     per full scroll-through, not per pixel).
 *   - CSS variable mutated directly via ref — no React re-render.
 *   - `will-change: transform` reserved to the drifting pattern layer.
 *   - Listener detaches on unmount.
 *
 * Accessibility:
 *   - Decorative pattern layers are `aria-hidden` and `pointer-events-none`.
 *   - Inactive stages get `aria-hidden`, but their content is also
 *     present in the stacked branch which is shown to mobile and
 *     reduced-motion users.
 *   - Native scroll only — no preventDefault, no wheel/touch trapping.
 */
export function HomeScrollStoryClient({ payload }: { payload: StoryPayload }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const stageCount = payload.stages.length;
  const containerStyle: CSSProperties = {
    ["--story-height" as string]: `${(stageCount + 1) * 100}vh`,
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

  return (
    <section
      ref={containerRef}
      aria-label={payload.ariaLabel}
      className="tunera-home-story relative bg-tunera-ivory"
      style={containerStyle}
    >
      {/* DESKTOP / TABLET — sticky scene. CSS hides this on sub-lg and
          on prefers-reduced-motion (see .tunera-home-story-sticky). */}
      <div
        ref={stickyRef}
        className="tunera-home-story-sticky sticky top-0 hidden h-screen items-center overflow-hidden lg:flex"
        style={{ ["--story-progress" as string]: "0" }}
      >
        {/* Faint pattern layer that drifts horizontally with scroll progress */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-tunera-pattern bg-cover bg-center opacity-[0.035]"
          style={{
            transform: "translate3d(calc((var(--story-progress, 0) - 0.5) * 6%), 0, 0) scale(1.08)",
            willChange: "transform",
          }}
        />

        {/* Stage stack */}
        <div className="relative mx-auto w-full max-w-3xl px-6">
          <div className="mb-8 flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-tunera-orange" />
            <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
              {payload.eyebrow}
            </span>
          </div>

          <div className="relative min-h-[460px]">
            {payload.stages.map((stage, i) => {
              const active = i === activeStage;
              return (
                <article
                  key={stage.id}
                  data-story-stage={stage.id}
                  aria-hidden={!active}
                  className={
                    "absolute inset-x-0 top-0 transition-all duration-700 ease-out " +
                    (active
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-2 opacity-0")
                  }
                >
                  <div className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange/80">
                    {stage.kicker}
                  </div>
                  <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tighter2 text-tunera-ink sm:text-5xl md:text-6xl">
                    {stage.title}
                  </h2>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-tunera-muted-ink sm:text-lg">
                    {stage.body}
                  </p>
                  {payload.microContent[stage.id] ? (
                    <div className="mt-8">{payload.microContent[stage.id]}</div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>

        {/* Stage progress dots */}
        <ol
          aria-hidden
          className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-3"
        >
          {payload.stages.map((stage, i) => {
            const active = i === activeStage;
            return (
              <li
                key={stage.id}
                className={
                  "h-px transition-all duration-500 ease-out " +
                  (active ? "w-10 bg-tunera-orange" : "w-5 bg-tunera-ink/20")
                }
              />
            );
          })}
        </ol>
      </div>

      {/* MOBILE / REDUCED-MOTION — stacked stages. CSS shows this on
          sub-lg and on prefers-reduced-motion. Always rendered so
          screen-readers and search-engine snapshots see the full
          narrative regardless of breakpoint. */}
      <div className="tunera-home-story-stack block lg:hidden">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <div className="mb-10 flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-tunera-orange" />
            <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
              {payload.eyebrow}
            </span>
          </div>
          <ol role="list" className="space-y-14 sm:space-y-20">
            {payload.stages.map((stage) => (
              <li
                key={stage.id}
                className="border-t border-tunera-stone/50 pt-10 first:border-t-0 first:pt-0"
              >
                <div className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange/80">
                  {stage.kicker}
                </div>
                <h2 className="mt-4 text-3xl font-semibold leading-[1.1] tracking-tighter2 text-tunera-ink sm:text-4xl">
                  {stage.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-tunera-muted-ink sm:text-lg">
                  {stage.body}
                </p>
                {payload.microContent[stage.id] ? (
                  <div className="mt-7">{payload.microContent[stage.id]}</div>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
