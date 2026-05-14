"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackTuneraEvent } from "@/lib/analytics/client";

const LANDING_FLAG_KEY = "tunera-analytics-landing-marked";

/**
 * Fires a single `page_view` event each time the current route
 * changes. Mounted once at the root layout so every page benefits
 * without consumer pages having to opt-in individually.
 *
 * The tracker honours analytics consent via `trackTuneraEvent`:
 * page views always fire (anonymous counter) but the visitor /
 * session ids are only attached after the user grants consent. The
 * effect deduplicates within the same path so a re-render on the
 * same page does not double-count.
 *
 * Landing-page marker (added in SEO 1.1):
 *   - The first `page_view` of a fresh browser tab carries
 *     `metadata.isLandingPage = true` and `metadata.landingPath = <path>`.
 *   - The marker lives in `sessionStorage` so it resets per tab and
 *     does not survive a closed tab.
 *   - This is purely additive metadata — it adds no PII, no IP, no
 *     identifier; it just lets future analytics queries distinguish
 *     "session entry" page_views from "in-session navigation"
 *     page_views without changing existing behaviour.
 */
export function AnalyticsPageView() {
  const pathname = usePathname();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;

    let isLanding = false;
    try {
      if (typeof window !== "undefined") {
        const flag = window.sessionStorage.getItem(LANDING_FLAG_KEY);
        if (flag !== "1") {
          window.sessionStorage.setItem(LANDING_FLAG_KEY, "1");
          isLanding = true;
        }
      }
    } catch {
      /* swallow — private mode, storage full, etc. */
    }

    void trackTuneraEvent("page_view", {
      metadata: isLanding ? { isLandingPage: true, landingPath: pathname } : {},
    });
  }, [pathname]);

  return null;
}
