import { NextRequest, NextResponse } from "next/server";
import {
  parseClientPayload,
  sanitizeLocale,
  sanitizeMetadata,
  sanitizeOpaqueId,
  sanitizePath,
  sanitizeReferrer,
  sanitizeUtm,
} from "@/lib/analytics/sanitize";
import { deriveGeoFromHeaders, parseUserAgent } from "@/lib/analytics/geo";
import { hashIdentifier, isAnalyticsConfigured, recordEvent } from "@/lib/analytics/server";
import type { StoredAnalyticsEvent } from "@/lib/analytics/types";

/**
 * Analytics event ingestion endpoint.
 *
 *   POST /api/analytics/event
 *   Content-Type: application/json
 *   { event: "page_view", path: "/tr", locale: "tr", metadata: {...}, ... }
 *
 * Validation pipeline:
 *
 *   1. Accept only JSON ≤ 8 KB. Anything larger is rejected before we
 *      touch the body.
 *   2. Parse the body; reject unknown event names.
 *   3. Sanitise every text field; flatten metadata to a one-level map
 *      of primitive values (≤ 2 KB serialised).
 *   4. Derive country / region / city from edge geo headers — we
 *      never read the client IP and never store one.
 *   5. Parse the user-agent into device / browser / OS buckets.
 *   6. Hash visitor / session ids with HMAC-SHA256(ANALYTICS_SALT) so
 *      no raw identifier ever lands in the database.
 *   7. If `DATABASE_URL` is unset we still return 204 — the site keeps
 *      working without analytics storage, the dashboard simply shows
 *      an empty state.
 *
 * The route is intentionally `force-dynamic` and `nodejs` (not edge):
 * the postgres driver needs Node, and request-scoped state must not
 * be cached.
 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_BODY_BYTES = 8 * 1024;

const noStoreHeaders = { "Cache-Control": "no-store" };

export async function POST(req: NextRequest): Promise<NextResponse> {
  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return new NextResponse("payload too large", { status: 413, headers: noStoreHeaders });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return new NextResponse("invalid json", { status: 400, headers: noStoreHeaders });
  }

  const payload = parseClientPayload(raw);
  if (!payload) {
    return new NextResponse("invalid event", { status: 400, headers: noStoreHeaders });
  }

  const geo = deriveGeoFromHeaders(req.headers);
  const ua = parseUserAgent(req.headers.get("user-agent"));

  const consentAnalytics = payload.consentAnalytics === true;
  const visitorIdHash = consentAnalytics
    ? hashIdentifier(sanitizeOpaqueId(payload.visitorId))
    : null;
  const sessionIdHash = consentAnalytics
    ? hashIdentifier(sanitizeOpaqueId(payload.sessionId))
    : null;

  const stored: StoredAnalyticsEvent = {
    eventName: payload.event,
    path: sanitizePath(payload.path),
    locale: sanitizeLocale(payload.locale),
    referrer: sanitizeReferrer(payload.referrer),
    utmSource: sanitizeUtm(payload.utmSource),
    utmMedium: sanitizeUtm(payload.utmMedium),
    utmCampaign: sanitizeUtm(payload.utmCampaign),
    country: geo.country,
    region: geo.region,
    city: geo.city,
    deviceType: ua.deviceType,
    browser: ua.browser,
    os: ua.os,
    sessionIdHash,
    visitorIdHash,
    consentAnalytics,
    metadata: sanitizeMetadata(payload.metadata),
  };

  if (!isAnalyticsConfigured()) {
    return new NextResponse(null, { status: 204, headers: noStoreHeaders });
  }

  await recordEvent(stored);
  return new NextResponse(null, { status: 204, headers: noStoreHeaders });
}

export function GET(): NextResponse {
  return new NextResponse("method not allowed", { status: 405, headers: noStoreHeaders });
}
