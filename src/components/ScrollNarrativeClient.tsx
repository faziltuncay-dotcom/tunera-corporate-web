"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export type Stage = {
  id: string;
  kicker?: string;
  title: string;
  body?: string;
};

export type NarrativeVariant = "home" | "about" | "services" | "brands" | "contact";

export type NarrativePayload = {
  ariaLabel: string;
  eyebrow?: string;
  variant: NarrativeVariant;
  stages: Stage[];
  /**
   * Per-stage React children rendered below each stage's body. Indexed
   * by stage id so the server payload stays serializable as JSX. The
   * micro-content fades in slightly after the title/body for a layered
   * settling feel.
   */
  microContent: Record<string, ReactNode>;
};

const variantStyles: Record<
  NarrativeVariant,
  { titleSize: string; patternOpacity: string; railTone: string }
> = {
  home: {
    titleSize: "text-5xl sm:text-6xl md:text-7xl",
    patternOpacity: "0.045",
    railTone: "text-tunera-orange",
  },
  about: {
    titleSize: "text-4xl sm:text-5xl md:text-6xl",
    patternOpacity: "0.035",
    railTone: "text-tunera-orange",
  },
  services: {
    titleSize: "text-3xl sm:text-4xl md:text-5xl",
    patternOpacity: "0.028",
    railTone: "text-tunera-orange",
  },
  brands: {
    titleSize: "text-4xl sm:text-5xl md:text-6xl",
    patternOpacity: "0.03",
    railTone: "text-tunera-orange",
  },
  contact: {
    titleSize: "text-3xl sm:text-4xl md:text-5xl",
    patternOpacity: "0.022",
    railTone: "text-tunera-orange",
  },
};

/**
 * Apple-inspired scroll storytelling — site-wide reusable system.
 *
 * Behavior, by surface:
 *
 *   Desktop / tablet (lg+, no reduced-motion):
 *     - Outer `.tunera-narrative` container is `stages * 100vh` tall.
 *     - Inside, a `sticky top-0 h-screen` stage holds all stages
 *       absolutely positioned. The active stage glides into place
 *       (translateY 0, scale 1, opacity 1) while previous stages
 *       drift up (-18px) and pending stages wait below (+22px), each
 *       with a slight scale 0.985.
 *     - Title/body transition over 380 ms with body delayed 60 ms;
 *       micro-content transitions over 480 ms with 120 ms delay so
 *       the lower area feels like it settles after the headline.
 *     - The entire motion uses `cubic-bezier(0.22, 1, 0.36, 1)` —
 *       a sharp Apple-like ease-out.
 *     - A faint Tunera wave-pattern layer drifts ±3% horizontally
 *       with scroll progress, providing parallax depth.
 *     - A small vertical side index (01/02/.../N) marks the active
 *       stage with an orange numeral.
 *
 *   Mobile (< lg) and prefers-reduced-motion (any width):
 *     - Renders a stacked column where each stage is a normal section.
 *     - No sticky and no consumed scroll-listener output.
 *     - The reduced-motion override is applied via CSS in `globals.css`
 *       (`.tunera-narrative-sticky` is hidden, container reverts to
 *       auto height, stacked branch is force-shown).
 *
 * Variant differentiation (subtle):
 *   - `home`     — strongest pattern presence, largest type
 *   - `about`    — editorial, slightly smaller type
 *   - `services` — most structured, even smaller type, calmer pattern
 *   - `brands`   — compact, calm pattern
 *   - `contact`  — calmest, most muted pattern
 *
 * Performance:
 *   - rAF throttling so the listener fires at most once per frame.
 *   - Passive scroll listener.
 *   - React state changes only on stage-index threshold cross
 *     (N transitions per full scroll-through, not per pixel).
 *   - CSS variable mutated directly via ref — no React re-render.
 *   - `will-change: transform` reserved to the drifting pattern layer.
 *   - Listener detaches on unmount; pending rAF is cancelled.
 *
 * Accessibility:
 *   - Decorative pattern layers are `aria-hidden` and `pointer-events-none`.
 *   - Inactive stages get `aria-hidden`, but their content is also
 *     present in the always-rendered stacked branch which is shown
 *     to mobile and reduced-motion users.
 *   - Native scroll only — no preventDefault, no wheel/touch trapping.
 */
export function ScrollNarrativeClient({ payload }: { payload: NarrativePayload }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const stageCount = payload.stages.length;
  const variant = variantStyles[payload.variant];
  const containerStyle: CSSProperties = {
    ["--story-height" as string]: `${stageCount * 100}vh`,
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
      className="tunera-narrative relative bg-tunera-ivory"
      style={containerStyle}
      data-variant={payload.variant}
      data-stages={stageCount}
      data-active-stage={activeStage}
    >
      {/* DESKTOP / TABLET — sticky scene. CSS hides this on sub-lg and
          on prefers-reduced-motion (see .tunera-narrative-sticky). */}
      <div
        ref={stickyRef}
        className="tunera-narrative-sticky sticky top-0 hidden h-screen items-center overflow-hidden lg:flex"
        style={{ ["--story-progress" as string]: "0" }}
      >
        {/* Pattern backdrop removed — the user asked for plain
            ivory intermediate surfaces; the wave pattern that used
            to drift behind this sticky scene rendered far stronger
            than its claimed low opacity and dominated the page. The
            stage cross-fade carries the narrative on its own; the
            wave motif now lives only in the pre-footer
            `CtaTransition` where it stays meaningful. */}

        {/* Stage stack */}
        <div className="relative mx-auto w-full max-w-3xl px-6">
          {payload.eyebrow ? (
            <div className="mb-8 flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-tunera-orange" />
              <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
                {payload.eyebrow}
              </span>
            </div>
          ) : null}

          <div className="relative min-h-[460px]">
            {payload.stages.map((stage, i) => {
              const dir = i - activeStage;
              const stateClass = dir === 0 ? "is-active" : dir < 0 ? "is-prev" : "is-next";
              return (
                <article
                  key={stage.id}
                  data-story-stage={stage.id}
                  aria-hidden={dir !== 0}
                  className={`narrative-stage ${stateClass} absolute inset-x-0 top-0`}
                >
                  {stage.kicker ? (
                    <div className="narrative-stage-kicker text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange/80">
                      {stage.kicker}
                    </div>
                  ) : null}
                  <h2
                    className={`narrative-stage-title ${stage.kicker ? "mt-5" : ""} max-w-2xl font-semibold leading-[1.05] tracking-tighter2 text-tunera-ink ${variant.titleSize}`}
                  >
                    {stage.title}
                  </h2>
                  {stage.body ? (
                    <p className="narrative-stage-body mt-6 max-w-xl text-base leading-relaxed text-tunera-muted-ink sm:text-lg">
                      {stage.body}
                    </p>
                  ) : null}
                  {payload.microContent[stage.id] ? (
                    <div className="narrative-stage-micro mt-9">
                      {payload.microContent[stage.id]}
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>

        {/* Vertical side index — replaces the previous horizontal progress bar */}
        <ol
          aria-hidden
          className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-3 text-[10px] font-medium tabular-nums tracking-[0.22em] sm:right-8 md:flex lg:right-10"
        >
          {payload.stages.map((stage, i) => {
            const active = i === activeStage;
            return (
              <li
                key={stage.id}
                className={`flex items-center gap-2 transition-all duration-500 ease-out ${
                  active ? `${variant.railTone} opacity-100` : "text-tunera-ink/30 opacity-70"
                }`}
              >
                <span
                  aria-hidden
                  className={`h-px transition-all duration-500 ${active ? "w-6 bg-tunera-orange" : "w-3 bg-tunera-ink/30"}`}
                />
                <span>{String(i + 1)}</span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* MOBILE / REDUCED-MOTION — stacked stages. CSS shows this on
          sub-lg and on prefers-reduced-motion. Always rendered so
          screen-readers and search-engine snapshots see the full
          narrative regardless of breakpoint. */}
      <div className="tunera-narrative-stack relative block lg:hidden">
        <div className="relative mx-auto max-w-3xl px-6 py-16 sm:py-20">
          {payload.eyebrow ? (
            <div className="mb-10 flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-tunera-orange" />
              <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
                {payload.eyebrow}
              </span>
            </div>
          ) : null}
          <ol role="list" className="space-y-14 sm:space-y-20">
            {payload.stages.map((stage) => (
              <li
                key={stage.id}
                className="border-t border-tunera-stone/50 pt-10 first:border-t-0 first:pt-0"
              >
                {stage.kicker ? (
                  <div className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange/80">
                    {stage.kicker}
                  </div>
                ) : null}
                <h2
                  className={`${stage.kicker ? "mt-4" : ""} text-3xl font-semibold leading-[1.1] tracking-tighter2 text-tunera-ink sm:text-4xl`}
                >
                  {stage.title}
                </h2>
                {stage.body ? (
                  <p className="mt-5 text-base leading-relaxed text-tunera-muted-ink sm:text-lg">
                    {stage.body}
                  </p>
                ) : null}
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
