/** @type {import('next').NextConfig} */

/**
 * Baseline security headers applied to every Next.js route.
 *
 * These are the low-risk hardening headers — they tighten the
 * site's signal to browsers and link-safety reputation systems
 * (Google Safe Browsing, Meta's facebookexternalhit, Instagram
 * preview, Twitter card validator) without changing any
 * application behaviour, and they do not break Next.js static
 * assets, Next/Image, or the analytics POST endpoint.
 *
 * What is intentionally NOT set here:
 *
 *   - `Strict-Transport-Security`. Vercel already attaches HSTS
 *     to every response on the working www subdomain
 *     (`max-age=63072000`). Re-emitting it from Next.js would
 *     duplicate the header without adding value, and the
 *     `preload` directive cannot be added safely until the apex
 *     `tunera.com.tr` is repointed at Vercel — preload requires
 *     both apex and www to serve a valid certificate, and the
 *     apex currently fails TLS. See `docs/seo.md` "Apex domain
 *     DNS fix" for the registrar-side work that unblocks
 *     preload eligibility.
 *
 *   - `Content-Security-Policy`. Adding a strict CSP without a
 *     full report-only pass risks breaking Next.js inline
 *     bootstrap scripts, the analytics consent banner inline
 *     style, and Vercel's deployment instrumentation. Tracked
 *     as a deferred follow-up in `docs/seo.md`.
 *
 *   - `Cross-Origin-Opener-Policy` / `Cross-Origin-Embedder-Policy`.
 *     These can interfere with Open Graph scrapers and embedded
 *     map tiles; they are not required for the safety-signal
 *     improvement this phase is aiming at.
 */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
