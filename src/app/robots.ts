import type { MetadataRoute } from "next";
import { launch } from "@/config/launch";
import { siteConfig } from "@/lib/seo/config";

/**
 * /robots.txt for the corporate site.
 *
 * Pre-launch (`launch.allowIndexing = false`):
 *   - Disallow `/` for every user-agent so no crawler indexes the
 *     site while it is still being prepared. The per-page `<meta
 *     name="robots" content="noindex,nofollow">` posture set by
 *     `robotsForCurrentLaunch()` does the same job at the HTML
 *     level; both layers stay aligned.
 *   - The `sitemap` field still points at `/sitemap.xml` so the
 *     reference is in place the moment indexing is turned on.
 *
 * Post-launch (`launch.allowIndexing = true`):
 *   - Allow `/` and explicitly `Disallow` `/admin/`, `/api/`, and
 *     `/_next/`. These exclusions are defence-in-depth — the admin
 *     surface is HTTP-Basic-gated by middleware, and the analytics
 *     event endpoint is API-only — but a robots.txt entry keeps
 *     well-behaved crawlers out of those URLs in the first place.
 *
 * robots.txt is not a security boundary. The admin and API routes
 * stay protected by middleware regardless of what is written here.
 */
export default function robots(): MetadataRoute.Robots {
  const sitemap = `${siteConfig.baseUrl}/sitemap.xml`;
  if (!launch.allowIndexing) {
    return {
      rules: { userAgent: "*", disallow: "/" },
      sitemap,
    };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/_next/"],
    },
    sitemap,
    host: siteConfig.baseUrl,
  };
}
