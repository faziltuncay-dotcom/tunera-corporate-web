#!/usr/bin/env node
/**
 * Playwright-driven website screenshot capture for the Tunera promo
 * video. Spins up Chromium against the running Tunera Next.js dev
 * server, smoke-tests the routes we plan to use, then captures the
 * specific screenshots the Remotion composition consumes.
 *
 * Outputs are written to `tools/promo-video/captures/`. They are
 * checked in only if reasonably small; otherwise the directory is
 * regenerated on demand by re-running `pnpm capture`.
 *
 * Required: a running dev server on PROMO_BASE_URL (defaults to
 * http://localhost:3100). The script will fail clearly if the server
 * is unreachable.
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const PROJECT_ROOT = resolve(ROOT, "..", "..");
// Captures land in the Tunera project's public/ tree so the Remotion
// composition can resolve them via staticFile() with publicDir set to
// `../../public`. The folder is gitignored — re-run `pnpm capture` to
// rebuild it from the live dev server.
const OUT = resolve(PROJECT_ROOT, "public", "generated", "promo-captures");
const BASE = process.env.PROMO_BASE_URL ?? "http://localhost:3100";

const MOBILE_VIEWPORT = { width: 390, height: 844 };
const DESKTOP_VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE = 2;

const targets = [
  {
    name: "home-mobile",
    url: "/tr",
    viewport: MOBILE_VIEWPORT,
    fullPage: false,
    scroll: 0,
  },
  {
    name: "home-mobile-mid",
    url: "/tr",
    viewport: MOBILE_VIEWPORT,
    fullPage: false,
    scroll: 800,
  },
  {
    name: "home-desktop",
    url: "/tr",
    viewport: DESKTOP_VIEWPORT,
    fullPage: false,
    scroll: 0,
  },
  {
    name: "brands-mobile",
    url: "/tr/markalar",
    viewport: MOBILE_VIEWPORT,
    fullPage: false,
    scroll: 0,
  },
  {
    name: "brands-mobile-cards",
    url: "/tr/markalar",
    viewport: MOBILE_VIEWPORT,
    fullPage: false,
    scroll: 900,
  },
  {
    name: "brands-desktop",
    url: "/tr/markalar",
    viewport: DESKTOP_VIEWPORT,
    fullPage: false,
    scroll: 0,
  },
  {
    name: "contact-mobile",
    url: "/tr/iletisim",
    viewport: MOBILE_VIEWPORT,
    fullPage: false,
    scroll: 0,
  },
];

const smokeRoutes = ["/", "/tr", "/tr/markalar", "/tr/iletisim"];

const log = (msg) => console.log(`[capture] ${msg}`);

async function smokeTest() {
  log(`smoke-testing ${smokeRoutes.length} routes against ${BASE}`);
  const results = [];
  for (const path of smokeRoutes) {
    try {
      const res = await fetch(`${BASE}${path}`, { redirect: "follow" });
      results.push({ path, status: res.status });
      if (!res.ok) {
        throw new Error(`smoke failed: ${path} returned ${res.status}`);
      }
    } catch (err) {
      throw new Error(
        `dev server not reachable at ${BASE}. Start it with \`pnpm dev\` (port 3100). Underlying: ${
          err instanceof Error ? err.message : String(err)
        }`,
      );
    }
  }
  log(`smoke OK — ${results.map((r) => `${r.path}=${r.status}`).join(", ")}`);
  return results;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const smokeResults = await smokeTest();

  const browser = await chromium.launch();
  try {
    for (const t of targets) {
      log(`capturing ${t.name} from ${BASE}${t.url}`);
      const context = await browser.newContext({
        viewport: t.viewport,
        deviceScaleFactor: DEVICE_SCALE,
        // Stop motion / animation that would otherwise produce mid-
        // transition screenshots. The CTA reveal animations rely on
        // IntersectionObserver, so this still triggers them — we just
        // disable the slower wave drifts.
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      await page.goto(`${BASE}${t.url}`, { waitUntil: "networkidle", timeout: 45_000 });
      if (t.scroll > 0) {
        await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), t.scroll);
        // small settle for any lazy images
        await page.waitForTimeout(450);
      }
      const file = resolve(OUT, `${t.name}.png`);
      await page.screenshot({ path: file, type: "png", fullPage: t.fullPage });
      log(`  → ${file}`);
      await context.close();
    }
  } finally {
    await browser.close();
  }

  const manifestPath = resolve(OUT, "manifest.json");
  await writeFile(
    manifestPath,
    JSON.stringify(
      {
        capturedAt: new Date().toISOString(),
        baseUrl: BASE,
        smoke: smokeResults,
        screenshots: targets.map((t) => ({ name: t.name, url: t.url, viewport: t.viewport })),
      },
      null,
      2,
    ),
    "utf8",
  );
  log(`wrote manifest ${manifestPath}`);
  log("done");
}

main().catch((err) => {
  console.error(`[capture] FAILED: ${err instanceof Error ? err.message : err}`);
  process.exit(1);
});
