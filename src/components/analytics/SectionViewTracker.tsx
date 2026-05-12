"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { getConsentState, trackTuneraEvent } from "@/lib/analytics/client";
import { isInternalPath } from "@/lib/analytics/sanitize";

/**
 * Single mount point for `section_view` tracking.
 *
 * Scans the DOM for elements that opt in via `data-track-section`
 * and fires one `section_view` event the first time each becomes
 * meaningfully visible. The implementation is deliberately
 * defensive about blast radius:
 *
 *   - **Consent-gated.** Section-level visibility is journey
 *     telemetry, not a basic visit count, so the tracker stays
 *     dormant until `getConsentState() === "granted"`. A
 *     `tunera-analytics-consent-change` listener wakes it up if the
 *     visitor accepts mid-session.
 *   - **Internal-route safe.** No observer is attached on
 *     `/admin`, `/api`, `/_next`, `/favicon.ico`, `/robots.txt`,
 *     `/sitemap.xml` — same predicate the API and aggregate
 *     queries use.
 *   - **Once per section per page-view.** A `Set` keyed on the
 *     stable section key dedupes fires across re-observations.
 *     The set is cleared on path change so navigating back to the
 *     same page can re-measure.
 *   - **Threshold tuned for editorial layouts.** The site uses
 *     full-bleed marine illustrations and tall narrative blocks;
 *     a 40% intersection ratio combined with a 500 ms dwell
 *     ensures we count "actually looked at" rather than "scrolled
 *     past at speed".
 *   - **Fail silent.** If `IntersectionObserver` is unavailable
 *     (older browsers, disabled JS), the component renders
 *     nothing and the rest of the site is untouched.
 *
 * Each opt-in element supplies metadata via attributes:
 *
 *   <section data-track-section="hero" data-track-section-label="Hero">
 *
 * Both are forwarded to `trackTuneraEvent` so the dashboard can
 * group counts by stable key and label them readably.
 */
export function SectionViewTracker() {
  const pathname = usePathname();
  const seenRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    seenRef.current = new Set();
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof IntersectionObserver === "undefined") return;
    if (pathname && isInternalPath(pathname)) return;

    let observer: IntersectionObserver | null = null;
    const dwellTimers = new Map<Element, number>();

    const setup = () => {
      if (observer) return;
      if (getConsentState() !== "granted") return;

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const el = entry.target as HTMLElement;
            const key = el.dataset.trackSection;
            if (!key) continue;
            if (seenRef.current.has(key)) {
              if (dwellTimers.has(el)) {
                window.clearTimeout(dwellTimers.get(el));
                dwellTimers.delete(el);
              }
              continue;
            }
            if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
              const timer = window.setTimeout(() => {
                if (seenRef.current.has(key)) return;
                seenRef.current.add(key);
                const label = el.dataset.trackSectionLabel ?? key;
                void trackTuneraEvent("section_view", {
                  metadata: { section: key, label },
                });
              }, 500);
              dwellTimers.set(el, timer);
            } else {
              if (dwellTimers.has(el)) {
                window.clearTimeout(dwellTimers.get(el));
                dwellTimers.delete(el);
              }
            }
          }
        },
        { threshold: [0, 0.4, 0.75, 1] },
      );

      const targets = document.querySelectorAll<HTMLElement>("[data-track-section]");
      targets.forEach((el) => observer?.observe(el));
    };

    const teardown = () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      dwellTimers.forEach((id) => window.clearTimeout(id));
      dwellTimers.clear();
    };

    setup();
    const onConsent = () => {
      if (getConsentState() === "granted") setup();
    };
    window.addEventListener("tunera-analytics-consent-change", onConsent);

    return () => {
      window.removeEventListener("tunera-analytics-consent-change", onConsent);
      teardown();
    };
  }, [pathname]);

  return null;
}
