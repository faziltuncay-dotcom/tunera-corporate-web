"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Footer-entry motion shell.
 *
 * Wraps the inner footer content so the surrounding `<footer>` element
 * stays a server component. An IntersectionObserver toggles
 * `data-revealed="true"` on both the wrapper and the parent `<footer>`
 * when the wrapper crosses ~25% into the viewport — the wrapper's
 * inner content lifts/fades, and footer pattern opacity bumps up
 * gently (CSS picks up the parent attribute via
 * `footer[data-revealed="true"] .tunera-footer-pattern-…`).
 *
 * The observer disconnects after the first reveal so the dark
 * surface doesn't keep mutating during ongoing scroll. Reduced-motion
 * users skip the transform branch entirely (CSS forces opacity 1,
 * transform none); we still set the attribute so the pattern can
 * settle at its full opacity.
 */
export function FooterReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const parentFooter = node.closest("footer");

    if (typeof IntersectionObserver === "undefined") {
      node.setAttribute("data-revealed", "true");
      parentFooter?.setAttribute("data-revealed", "true");
      return;
    }

    const reveal = () => {
      node.setAttribute("data-revealed", "true");
      parentFooter?.setAttribute("data-revealed", "true");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="tunera-footer-reveal relative z-10">
      {children}
    </div>
  );
}
