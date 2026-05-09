import type { MetadataRoute } from "next";
import { launch } from "@/config/launch";

/**
 * Pre-launch robots policy.
 *
 * While `launch.allowIndexing` is false, every user-agent is disallowed
 * from every path. Once go-live is approved, flip the flag in
 * `src/config/launch.ts` to switch this to an open policy. The robots
 * meta tag in the root layout is gated by the same flag.
 */
export default function robots(): MetadataRoute.Robots {
  if (!launch.allowIndexing) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}
