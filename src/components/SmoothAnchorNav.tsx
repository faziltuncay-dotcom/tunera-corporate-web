"use client";

import { useEffect } from "react";

/**
 * Smooth same-page anchor navigation.
 *
 * Mounted once in the page tree (next to `<HeaderProgress>`), this
 * client intercepts clicks on `<a href="/{locale}#{section}">` links
 * **only when the user is already on `/{locale}`**. In that case it:
 *
 *   1. Calls `preventDefault()` so Next's router doesn't treat the
 *      click as a route navigation (which can otherwise feel like a
 *      reset / re-render of the whole page tree).
 *   2. Smooth-scrolls the target section into view, honoring the
 *      `scroll-margin-top` already on `main section[id]` so the
 *      sticky header never covers the heading.
 *   3. Updates `window.location.hash` via `history.pushState` so the
 *      URL bar reflects the new anchor and back/forward navigation
 *      stays consistent.
 *
 * Cases the handler explicitly does **not** intercept:
 *
 *   - clicks with a modifier key (Cmd / Ctrl / Shift / Alt) or middle
 *     button — the user wants to open in a new tab / window
 *   - links whose `target` is anything other than empty or `_self`
 *   - links to a different locale (e.g. `/tr#…` while on `/en`) —
 *     those still go through Next routing
 *   - links without a hash, or links to a non-existent target id
 *
 * Reduced motion: when `prefers-reduced-motion: reduce` is set, the
 * scroll uses `behavior: "auto"` (instant jump) instead of "smooth"
 * — same end result, no animation. Native scroll only; no scroll
 * hijacking and no scroll-snap.
 *
 * Capture-phase listener on `document` so it picks up clicks from
 * the header, footer, hero CTAs, and any other in-page anchor link
 * without each one needing its own `onClick`.
 */
export function SmoothAnchorNav() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // ignore non-primary buttons (middle-click should open new tab)
      if (event.button !== 0) return;
      // ignore modified clicks (open in new tab / window / download)
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!link) return;
      // only same-tab navigations
      const linkTarget = link.getAttribute("target");
      if (linkTarget && linkTarget !== "_self") return;
      // ignore download links
      if (link.hasAttribute("download")) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // we only handle in-app anchor URLs of the form `/{locale}#{id}`
      // or pure `#{id}` matching the current page
      const hashIdx = href.indexOf("#");
      if (hashIdx === -1) return;
      const id = href.slice(hashIdx + 1);
      if (!id) return;

      // path portion of the link
      const pathPart = hashIdx > 0 ? href.slice(0, hashIdx) : "";
      // current path (no hash, no query)
      const currentPath = window.location.pathname;
      // we only intercept when the link's path is empty (pure `#x`)
      // or matches the current pathname exactly. Cross-locale anchor
      // links (e.g. /tr#x while on /en) still go through routing.
      if (pathPart && pathPart !== currentPath) return;

      const targetEl = document.getElementById(id);
      if (!targetEl) return;

      event.preventDefault();

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      targetEl.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
        inline: "nearest",
      });

      // Update the URL hash without triggering scroll (Next/router
      // would otherwise rerun loading state). Using pushState keeps
      // history navigation consistent with the visual scroll.
      const newUrl = `${currentPath}#${id}`;
      if (window.location.hash !== `#${id}`) {
        window.history.pushState(null, "", newUrl);
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, []);

  return null;
}
