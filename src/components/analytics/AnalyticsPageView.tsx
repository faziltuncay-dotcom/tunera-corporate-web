"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackTuneraEvent } from "@/lib/analytics/client";

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
 */
export function AnalyticsPageView() {
  const pathname = usePathname();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;
    void trackTuneraEvent("page_view");
  }, [pathname]);

  return null;
}
