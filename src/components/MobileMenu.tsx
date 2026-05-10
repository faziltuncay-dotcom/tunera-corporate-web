"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type Link = { href: string; label: string };

type Props = {
  links: ReadonlyArray<Link>;
  triggerLabel: string;
  closeLabel: string;
  languageSwitchHref: string;
  languageSwitchLabel: string;
  languageSwitchAria: string;
  primaryAria: string;
};

/**
 * Compact mobile-only menu.
 *
 * Renders a single hamburger trigger that sits inside the desktop
 * Header's top row (Header.tsx hides this whole component at md+).
 * Pressing the trigger opens a right-side drawer over a dark backdrop.
 *
 * Behaviour:
 *   - body scroll-locked while open (so the drawer doesn't ride on
 *     top of a scrolling page),
 *   - ESC closes,
 *   - clicking the backdrop closes,
 *   - clicking any nav link or the language switch closes,
 *   - first focusable element receives focus on open and focus
 *     returns to the trigger on close.
 *
 * Accessibility surface mirrors a disclosure pattern:
 *   - the trigger is a real `<button>` with aria-expanded /
 *     aria-controls,
 *   - the drawer is a `<dialog>`-style `aria-modal` region,
 *   - the backdrop is an inert `aria-hidden` div so screen readers
 *     never address it.
 *
 * Reduced-motion users skip the slide transform; the panel just
 * appears/disappears.
 */
export function MobileMenu({
  links,
  triggerLabel,
  closeLabel,
  languageSwitchHref,
  languageSwitchLabel,
  languageSwitchAria,
  primaryAria,
}: Props) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const drawerId = useId();

  // Close on ESC; focus trap-lite (focus first link on open, return
  // to trigger on close).
  useEffect(() => {
    if (!open) return;
    const triggerNode = triggerRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    // Lock body scroll while drawer is open.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Move focus to the first focusable in the drawer.
    requestAnimationFrame(() => {
      const first = panelRef.current?.querySelector<HTMLElement>(
        "a, button, [tabindex]:not([tabindex='-1'])",
      );
      first?.focus();
    });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      triggerNode?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={triggerLabel}
        aria-expanded={open}
        aria-controls={drawerId}
        onClick={() => setOpen((v) => !v)}
        className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-sm text-tunera-ink transition-colors hover:text-tunera-orange md:hidden"
      >
        <span aria-hidden className="relative block h-3.5 w-5">
          <span
            className={`absolute left-0 right-0 h-px bg-current transition-all duration-200 ${
              open ? "top-1.5 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 right-0 top-1.5 h-px bg-current transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 right-0 h-px bg-current transition-all duration-200 ${
              open ? "top-1.5 -rotate-45" : "top-3"
            }`}
          />
        </span>
      </button>

      {/* Backdrop — covers the page behind the drawer. Click closes. */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-tunera-graphite/40 backdrop-blur-[2px] transition-opacity duration-200 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer panel — slides in from the right. */}
      <div
        ref={panelRef}
        id={drawerId}
        role="dialog"
        aria-modal="true"
        aria-label={primaryAria}
        className={`tunera-mobile-drawer fixed right-0 top-0 z-50 flex h-[100dvh] w-[82%] max-w-sm flex-col bg-tunera-ivory text-tunera-ink shadow-[0_24px_60px_-30px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Soft Tunera wave motif, masked so it fades from top-right
            into the centre — tiny, premium, never noisy. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-tunera-pattern bg-cover bg-center opacity-[0.05]"
          style={{
            maskImage: "linear-gradient(to bottom left, rgba(0,0,0,0.85), transparent 70%)",
            WebkitMaskImage: "linear-gradient(to bottom left, rgba(0,0,0,0.85), transparent 70%)",
          }}
        />

        <div className="relative flex items-center justify-between border-b border-tunera-stone/40 px-6 py-5">
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
            {primaryAria}
          </span>
          <button
            type="button"
            aria-label={closeLabel}
            onClick={() => setOpen(false)}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-sm text-tunera-ink transition-colors hover:text-tunera-orange"
          >
            <span aria-hidden className="relative block h-4 w-4">
              <span className="absolute inset-x-0 top-1/2 h-px rotate-45 bg-current" />
              <span className="absolute inset-x-0 top-1/2 h-px -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        <nav aria-label={primaryAria} className="relative flex-1 overflow-y-auto px-6 py-6">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] items-center rounded-sm px-1 text-base font-medium text-tunera-ink/85 transition-colors hover:text-tunera-orange"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative border-t border-tunera-stone/40 px-6 py-5">
          <Link
            href={languageSwitchHref}
            aria-label={languageSwitchAria}
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 rounded-sm border border-tunera-ink/15 px-4 py-2 text-xs tracking-widest text-tunera-ink/80 transition-colors hover:border-tunera-orange hover:text-tunera-orange"
          >
            {languageSwitchLabel}
          </Link>
        </div>
      </div>
    </>
  );
}
