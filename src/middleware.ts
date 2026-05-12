import { NextResponse, type NextRequest } from "next/server";

/**
 * Admin gate.
 *
 * The middleware exists for a single purpose right now: to put HTTP
 * Basic authentication in front of every route under `/admin/*` so
 * the analytics dashboard cannot be browsed by the public. The
 * gating uses two environment variables — `ADMIN_ANALYTICS_USERNAME`
 * and `ADMIN_ANALYTICS_PASSWORD` — and refuses to serve the route at
 * all if either is missing, so a misconfigured deployment fails
 * closed instead of accidentally exposing analytics.
 *
 * The check is deliberately stateless and synchronous: no DB call,
 * no JWT, no session store. That matches the early-phase scope —
 * "simple environment-based protection for now" — and keeps the
 * surface small so a future swap for a real auth system is
 * straightforward.
 *
 * Comparisons use a constant-time helper so a 4xx-response timing
 * channel can't be used to recover the secret one byte at a time.
 */

const REALM = 'Basic realm="Tunera Admin", charset="UTF-8"';

const constantTimeEqual = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
};

const decodeBasic = (header: string | null): { user: string; pass: string } | null => {
  if (!header) return null;
  const [scheme, payload] = header.split(" ", 2);
  if (scheme !== "Basic" || !payload) return null;
  let decoded: string;
  try {
    decoded = atob(payload);
  } catch {
    return null;
  }
  const idx = decoded.indexOf(":");
  if (idx === -1) return null;
  return { user: decoded.slice(0, idx), pass: decoded.slice(idx + 1) };
};

export function middleware(req: NextRequest): NextResponse {
  const expectedUser = process.env.ADMIN_ANALYTICS_USERNAME;
  const expectedPass = process.env.ADMIN_ANALYTICS_PASSWORD;

  if (!expectedUser || !expectedPass) {
    return new NextResponse(
      "Admin analytics is not configured. Set ADMIN_ANALYTICS_USERNAME and ADMIN_ANALYTICS_PASSWORD.",
      {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }

  const supplied = decodeBasic(req.headers.get("authorization"));
  if (
    !supplied ||
    !constantTimeEqual(supplied.user, expectedUser) ||
    !constantTimeEqual(supplied.pass, expectedPass)
  ) {
    return new NextResponse("authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": REALM,
        "Cache-Control": "no-store",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
