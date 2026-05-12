import { createHmac } from "node:crypto";
import postgres, { type Sql } from "postgres";
import type { StoredAnalyticsEvent } from "./types";

/**
 * Server-side analytics storage helpers.
 *
 * The module is deliberately lazy. A single connection pool is created
 * on first use and reused for every subsequent insert / read; when no
 * `DATABASE_URL` is configured the helpers turn into no-ops so the
 * site keeps building and running locally without a database. This
 * means `pnpm build` works out of the box and `/api/analytics/event`
 * returns 204 (recorded-nothing) instead of 500.
 *
 * Identifier hashing uses HMAC-SHA-256 with `ANALYTICS_SALT`. The
 * client never sees the salt, and the raw client-side opaque id is
 * not stored — only its hash. Without the salt the API still works
 * but skips persisting visitor / session ids.
 */

let pool: Sql | null = null;
let migrationsApplied = false;
let migrationsPromise: Promise<void> | null = null;
let warnedNotConfigured = false;
let warnedConnectError = false;

export function getDatabaseUrl(): string | null {
  const value = process.env.DATABASE_URL;
  if (typeof value !== "string" || value.trim().length === 0) return null;
  return value;
}

export function getAnalyticsSalt(): string | null {
  const value = process.env.ANALYTICS_SALT;
  if (typeof value !== "string" || value.trim().length < 16) return null;
  return value;
}

export function isAnalyticsConfigured(): boolean {
  return getDatabaseUrl() !== null;
}

function getPool(): Sql | null {
  const url = getDatabaseUrl();
  if (!url) {
    if (!warnedNotConfigured && process.env.NODE_ENV !== "production") {
      console.warn("[analytics] DATABASE_URL is not set — analytics events will not be persisted.");
      warnedNotConfigured = true;
    }
    return null;
  }
  if (pool) return pool;
  try {
    pool = postgres(url, {
      max: 4,
      idle_timeout: 20,
      connect_timeout: 5,
      ssl: process.env.PGSSL === "disable" ? false : "prefer",
      onnotice: () => {
        /* swallow */
      },
    });
    return pool;
  } catch (err) {
    if (!warnedConnectError) {
      console.error("[analytics] failed to create postgres pool", err);
      warnedConnectError = true;
    }
    return null;
  }
}

async function applyMigrations(sql: Sql): Promise<void> {
  if (migrationsApplied) return;
  if (migrationsPromise) return migrationsPromise;
  migrationsPromise = (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS analytics_events (
        id BIGSERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        event_name TEXT NOT NULL,
        path TEXT NOT NULL,
        locale TEXT,
        referrer TEXT,
        utm_source TEXT,
        utm_medium TEXT,
        utm_campaign TEXT,
        country TEXT,
        region TEXT,
        city TEXT,
        device_type TEXT,
        browser TEXT,
        os TEXT,
        session_id_hash TEXT,
        visitor_id_hash TEXT,
        consent_analytics BOOLEAN NOT NULL DEFAULT FALSE,
        metadata JSONB NOT NULL DEFAULT '{}'::jsonb
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS analytics_events_created_at_idx ON analytics_events (created_at DESC)`;
    await sql`CREATE INDEX IF NOT EXISTS analytics_events_event_name_idx ON analytics_events (event_name)`;
    await sql`CREATE INDEX IF NOT EXISTS analytics_events_path_idx ON analytics_events (path)`;
    migrationsApplied = true;
  })();
  try {
    await migrationsPromise;
  } finally {
    migrationsPromise = null;
  }
}

export function hashIdentifier(input: string | null): string | null {
  if (!input) return null;
  const salt = getAnalyticsSalt();
  if (!salt) return null;
  return createHmac("sha256", salt).update(input).digest("hex");
}

/**
 * Returns the live pool (creating it on first call) after ensuring the
 * schema exists, or `null` if no DATABASE_URL is configured.
 */
export async function getAnalyticsDb(): Promise<Sql | null> {
  const sql = getPool();
  if (!sql) return null;
  try {
    await applyMigrations(sql);
  } catch (err) {
    if (!warnedConnectError) {
      console.error("[analytics] migration failed", err);
      warnedConnectError = true;
    }
    return null;
  }
  return sql;
}

export async function recordEvent(event: StoredAnalyticsEvent): Promise<boolean> {
  const sql = await getAnalyticsDb();
  if (!sql) return false;
  try {
    await sql`
      INSERT INTO analytics_events
        (event_name, path, locale, referrer,
         utm_source, utm_medium, utm_campaign,
         country, region, city,
         device_type, browser, os,
         session_id_hash, visitor_id_hash,
         consent_analytics, metadata)
      VALUES
        (${event.eventName}, ${event.path}, ${event.locale}, ${event.referrer},
         ${event.utmSource}, ${event.utmMedium}, ${event.utmCampaign},
         ${event.country}, ${event.region}, ${event.city},
         ${event.deviceType}, ${event.browser}, ${event.os},
         ${event.sessionIdHash}, ${event.visitorIdHash},
         ${event.consentAnalytics}, ${sql.json(event.metadata)})
    `;
    return true;
  } catch (err) {
    console.error("[analytics] recordEvent failed", err);
    return false;
  }
}
