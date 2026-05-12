"use client";

import Link, { type LinkProps } from "next/link";
import {
  type AnchorHTMLAttributes,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";
import { trackTuneraEvent } from "@/lib/analytics/client";
import type { AnalyticsEventName } from "@/lib/analytics/types";

/**
 * Tiny analytics-aware wrappers for outbound clicks.
 *
 * Server components can keep using these without becoming client
 * components themselves — only the wrapped `<Link>` / `<a>` is
 * interactive, the surrounding tree stays SSR. Each wrapper:
 *
 *   - forwards every native prop transparently,
 *   - fires `trackTuneraEvent` on click before the browser navigates,
 *   - never blocks or alters navigation: if tracking fails for any
 *     reason the click still goes through.
 *
 * Two wrappers exist instead of one because `next/link` and a raw
 * `<a>` have different prop shapes: `Link` requires an `href` that
 * Next routes internally, while `<a>` is used for `mailto:`, `tel:`,
 * and outbound HTTPS that should leave the SPA entirely.
 */

type CommonExtras = {
  trackEvent: AnalyticsEventName;
  trackMetadata?: Record<string, string | number | boolean>;
  children: ReactNode;
};

type LinkBag = Omit<ComponentProps<typeof Link>, "children"> & LinkProps & CommonExtras;

export function TrackedLink({ trackEvent, trackMetadata, onClick, children, ...rest }: LinkBag) {
  return (
    <Link
      {...rest}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        void trackTuneraEvent(trackEvent, { metadata: trackMetadata });
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}

type AnchorBag = AnchorHTMLAttributes<HTMLAnchorElement> & CommonExtras;

export function TrackedAnchor({
  trackEvent,
  trackMetadata,
  onClick,
  children,
  ...rest
}: AnchorBag) {
  return (
    <a
      {...rest}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        void trackTuneraEvent(trackEvent, { metadata: trackMetadata });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
