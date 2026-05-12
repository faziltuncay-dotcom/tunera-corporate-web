"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { getConsentState, trackTuneraEvent } from "@/lib/analytics/client";
import { isInternalPath } from "@/lib/analytics/sanitize";

const MILESTONES = [25, 50, 75, 100] as const;

/**
 * Single mount point for `scroll_depth` tracking.
 *
 * Watches the page's scroll position with a passive listener +
 * `requestAnimationFrame` throttle and fires a `scroll_depth`
 * event each time the visitor crosses one of the documented
 * milestones (25 / 50 / 75 / 100). Each milestone fires at most
 * once per page-view; the milestone set resets on path change.
 *
 * Same defensive posture as `SectionViewTracker`:
 *
 *   - **Consent-gated.** No fires until
 *     `getConsentState() === "granted"`. A
 *     `tunera-analytics-consent-change` listener wires up the
 *     scroll handler if the visitor accepts mid-session, so the
 *     timing of the first milestone after acceptance is
 *     well-defined.
 *   - **Internal-route safe.** No listener attaches on `/admin`,
 *     `/api`, `/_next`, `/favicon.ico`, `/robots.txt`,
 *     `/sitemap.xml`. The admin dashboard already filters those
 *     paths server-side; this is the matching client-side guard.
 *   - **Throttled.** A single rAF schedule per scroll event, no
 *     state updates outside of milestone crossings — the listener
 *     does no React work, so it can't cause re-renders.
 *   - **Fail silent.** Any DOM-API absence (no `document`,
 *     no `requestAnimationFrame`) bypasses the tracker without
 *     touching the rest of the page.
 */
export function ScrollDepthTracker() {
  const pathname = usePathname();
  const reachedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    reachedRef.current = new Set();
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof document === "undefined") return;
    if (pathname && isInternalPath(pathname)) return;

    let rafId: number | null = null;
    let attached = false;

    const computeDepthPercent = (): number => {
      const docEl = document.documentElement;
      const body = document.body;
      const scrollTop = window.scrollY || docEl.scrollTop || 0;
      const viewportH = window.innerHeight || docEl.clientHeight || 0;
      const scrollHeight = Math.max(
        docEl.scrollHeight,
        docEl.offsetHeight,
        body?.scrollHeight ?? 0,
        body?.offsetHeight ?? 0,
      );
      const scrollable = scrollHeight - viewportH;
      if (scrollable <= 0) return 100; // short page = fully visible
      const ratio = (scrollTop + viewportH) / scrollHeight;
      return Math.max(0, Math.min(100, Math.round(ratio * 100)));
    };

    const update = () => {
      rafId = null;
      const depth = computeDepthPercent();
      for (const milestone of MILESTONES) {
        if (depth >= milestone && !reachedRef.current.has(milestone)) {
          reachedRef.current.add(milestone);
          void trackTuneraEvent("scroll_depth", {
            metadata: { depth: milestone },
          });
        }
      }
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(update);
    };

    const attach = () => {
      if (attached) return;
      if (getConsentState() !== "granted") return;
      attached = true;
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      // Fire once on mount for short pages where the visitor never scrolls.
      onScroll();
    };

    const detach = () => {
      if (!attached) return;
      attached = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    attach();
    const onConsent = () => {
      if (getConsentState() === "granted") attach();
    };
    window.addEventListener("tunera-analytics-consent-change", onConsent);

    return () => {
      window.removeEventListener("tunera-analytics-consent-change", onConsent);
      detach();
    };
  }, [pathname]);

  return null;
}
