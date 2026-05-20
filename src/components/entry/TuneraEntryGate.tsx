"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Locale } from "@/content/site";
import { EntryHeroBackground } from "@/components/entry/EntryHeroBackground";
import { ENTRY_GATE_DOM_ATTR, ENTRY_GATE_STORAGE_KEY } from "@/components/entry/entryGateState";

/**
 * Tunera entry gate.
 *
 * A premium, session-level entry experience shown on `/`, `/tr` and
 * `/en` before the corporate homepage. Designed as an overlay rather
 * than a separate route so the existing one-page composition, sitemap
 * and locale routing stay untouched: the homepage is still rendered
 * server-side underneath and becomes visible the moment the user
 * activates "Siteye Gir / Enter Site".
 *
 * Behaviour:
 *   1. SSR renders the gate with `data-state="initial"` and `visibility:
 *      hidden`. A tiny pre-paint inline script in `app/layout.tsx`
 *      sets `html[data-tunera-gate]` based on `sessionStorage` so the
 *      gate is either revealed instantly (first session visit) or
 *      hidden instantly (return navigation in the same tab) — no
 *      one-frame flash either way.
 *   2. On hydration, `useEffect` confirms the dismissal flag and either
 *      mounts the visible gate (locking body scroll) or unmounts it.
 *   3. Activating the primary CTA writes the flag back to
 *      `sessionStorage`, releases the scroll lock and removes the
 *      overlay. Dismissal is session-scoped on purpose — opening a new
 *      browser session returns the premium entry experience instead of
 *      a permanent localStorage opt-out.
 *
 * Accessibility:
 *   - The overlay is a `role="dialog" aria-modal="true"` so assistive
 *     tech treats it as a foreground gate over the homepage.
 *   - Initial focus moves to the primary CTA on mount so keyboard
 *     users can activate "Enter Site" without first tab-cycling
 *     through the (still-rendered) homepage behind.
 *   - `Escape` dismisses the gate as a secondary path.
 *   - The Ken-Burns background motion is disabled by CSS for
 *     `prefers-reduced-motion: reduce` users; the gate itself remains
 *     static and readable.
 *
 * Future store note:
 *   The Tunera Store teaser is intentionally not a working link. It
 *   carries a `Yakında` / `Coming Soon` badge and is rendered as a
 *   disabled button-like element so visitors cannot reach a page that
 *   does not yet exist. When `store.tunera.com.tr` ships the teaser
 *   can be swapped for a real `<a>` without touching the gate layout.
 */

type Props = {
  locale: Locale;
};

const COPY = {
  tr: {
    dialogLabel: "Tunera Denizcilik giriş ekranı",
    eyebrow: "Tunera Denizcilik",
    tagline: "Denizcilikte yeni dönem.",
    primary: "Siteye Gir",
    primaryAria: "Kurumsal siteye devam et",
    storeLabel: "Tunera Store",
    storeStatus: "Yakında",
    storeDescription: "Sıfır ve ikinci el tekneler için planlanan satış alanı.",
    storeAria: "Tunera Store — yakında açılacak satış alanı",
  },
  en: {
    dialogLabel: "Tunera Denizcilik entry screen",
    eyebrow: "Tunera Denizcilik",
    tagline: "A new era in marine.",
    primary: "Enter Site",
    primaryAria: "Continue to corporate website",
    storeLabel: "Tunera Store",
    storeStatus: "Coming Soon",
    storeDescription: "A planned sales area for new and pre-owned boats.",
    storeAria: "Tunera Store — sales area coming soon",
  },
} as const;

type GateState = "initial" | "visible" | "hidden";

const readDismissed = (): boolean => {
  try {
    return window.sessionStorage.getItem(ENTRY_GATE_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

const writeDismissed = (): void => {
  try {
    window.sessionStorage.setItem(ENTRY_GATE_STORAGE_KEY, "1");
  } catch {
    /* private mode / disabled storage — the in-memory state still
       hides the overlay for the rest of this page session. */
  }
};

export function TuneraEntryGate({ locale }: Props) {
  const [state, setState] = useState<GateState>("initial");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const t = COPY[locale];

  useEffect(() => {
    setState(readDismissed() ? "hidden" : "visible");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (state === "visible") {
      root.setAttribute(ENTRY_GATE_DOM_ATTR, "visible");
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
    if (state === "hidden") {
      root.setAttribute(ENTRY_GATE_DOM_ATTR, "dismissed");
    }
    return undefined;
  }, [state]);

  useEffect(() => {
    if (state === "visible") {
      buttonRef.current?.focus();
    }
  }, [state]);

  const dismiss = useCallback(() => {
    writeDismissed();
    setState("hidden");
  }, []);

  useEffect(() => {
    if (state !== "visible") return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, dismiss]);

  if (state === "hidden") return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.dialogLabel}
      data-state={state}
      className="tunera-entry-gate fixed inset-0 z-[60] flex h-[100svh] w-screen flex-col bg-tunera-graphite text-tunera-ivory"
    >
      <EntryHeroBackground />

      <div className="relative z-10 flex h-full w-full flex-col px-6 py-7 sm:px-10 sm:py-9 md:px-14 md:py-10">
        <div className="flex items-start">
          <Image
            src="/assets/brand/tunera/tunera-logo-white.png"
            alt="Tunera Denizcilik"
            width={1482}
            height={343}
            priority
            sizes="(min-width: 640px) 150px, 120px"
            className="h-7 w-auto sm:h-8"
          />
        </div>

        <div className="mt-auto flex flex-col gap-7">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-tunera-orange" />
              <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
                {t.eyebrow}
              </span>
            </div>
            <p className="mt-4 max-w-[20ch] text-4xl font-semibold leading-[1.04] tracking-tighter2 sm:text-5xl md:text-6xl">
              {t.tagline}
            </p>
            <div className="mt-7">
              <button
                ref={buttonRef}
                type="button"
                aria-label={t.primaryAria}
                onClick={dismiss}
                className="tunera-entry-cta inline-flex items-center gap-3 rounded-sm bg-tunera-orange px-7 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#E64500] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tunera-orange focus-visible:ring-offset-2 focus-visible:ring-offset-tunera-graphite"
              >
                <span>{t.primary}</span>
                <span aria-hidden className="text-base leading-none">
                  →
                </span>
              </button>
            </div>
          </div>

          <div
            aria-label={t.storeAria}
            className="flex flex-col gap-2 border-t border-tunera-ivory/15 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pt-6"
          >
            <div className="flex items-baseline gap-3">
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-tunera-ivory/55">
                {t.storeLabel}
              </span>
              <span
                aria-hidden={false}
                className="rounded-sm border border-tunera-ivory/25 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-tunera-ivory/80"
              >
                {t.storeStatus}
              </span>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-tunera-ivory/60 sm:text-right">
              {t.storeDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
