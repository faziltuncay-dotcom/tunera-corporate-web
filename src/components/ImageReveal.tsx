"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Soft image reveal wrapper.
 *
 * Wraps a `next/image` (or any visual) so it fades and lifts gently
 * into place the first time it crosses ~20% of the viewport. After
 * the reveal, the observer disconnects — there's no continuous
 * scroll-driven motion on the image, in keeping with the brief's
 * "premium, clean, understated, not over-animated" direction.
 *
 * Reduced-motion users see the image at full opacity from the start
 * (CSS forces opacity 1 / no transform). The class also applies a
 * `will-change: transform` hint while the reveal hasn't fired so we
 * don't keep that hint after it settles.
 */
export function ImageReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.setAttribute("data-revealed", "true");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.setAttribute("data-revealed", "true");
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`tunera-image-reveal ${className}`.trim()}>
      {children}
    </div>
  );
}
