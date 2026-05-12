/**
 * Re-export the public event vocabulary so consumers can import from
 * a single, stable path:
 *
 *   import { ALLOWED_EVENT_NAMES, type AnalyticsEventName } from "@/lib/analytics/events";
 *
 * Keeping this thin file separate from `types.ts` matches the structure
 * the brief asked for and keeps client bundles small — only the
 * vocabulary travels with the client tracker.
 */

export { ALLOWED_EVENT_NAMES, ALLOWED_EVENT_SET, type AnalyticsEventName } from "./types";
