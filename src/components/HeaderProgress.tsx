"use client";

import { useEffect } from "react";

/**
 * Sitewide header motion + route-progress driver.
 *
 * Mounted once inside `<Header>`, this client owns the only global
 * scroll listener for the page chrome:
 *
 *   - Writes `--route-progress` (0..1) onto the `<header data-tunera-header>`
 *     element. The header's progress rail consumes it via `scaleX`.
 *   - Toggles `data-scrolled="true"` on the same element once the user
 *     scrolls past a small threshold, so the header can pick up its
 *     elevated state (sand wash + soft hairline) defined in CSS.
 *
 * One rAF-throttled passive listener; no React re-renders per frame —
 * everything is mutated directly via the DOM. Cleanup is unconditional
 * so route changes never leave a dangling listener.
 *
 * Reduced-motion users still see the rail update (it carries
 * information about page position), but the elevated-state transition
 * is removed in CSS so the surface change is instant rather than
 * animated.
 */
export function HeaderProgress() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-tunera-header]");
    if (!header) return;

    let rafId: number | null = null;

    const update = () => {
      rafId = null;
      const docEl = document.documentElement;
      const scrollTop = window.scrollY || docEl.scrollTop || 0;
      const max = (docEl.scrollHeight || 0) - (window.innerHeight || 0);
      const progress = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;
      header.style.setProperty("--route-progress", progress.toFixed(4));
      const scrolled = scrollTop > 8;
      if (header.dataset.scrolled !== String(scrolled)) {
        header.dataset.scrolled = String(scrolled);
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
  }, []);

  return null;
}
