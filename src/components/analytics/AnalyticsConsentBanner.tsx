"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getConsentState, setConsentState, type ConsentState } from "@/lib/analytics/client";

type Locale = "tr" | "en";

const COPY: Record<Locale, { body: string; accept: string; reject: string; details: string }> = {
  tr: {
    body: "Site deneyimini iyileştirmek için anonim ziyaret istatistikleri toplamak istiyoruz. Reddetseniz de site tam olarak çalışmaya devam eder.",
    accept: "Kabul ediyorum",
    reject: "İstemiyorum",
    details: "Yalnızca anonim sayfa ve etkinlik sayımı; kişisel veri saklanmaz.",
  },
  en: {
    body: "We collect anonymous visit statistics to understand how this site is used. You can decline and the site keeps working in full.",
    accept: "Accept",
    reject: "Decline",
    details: "Only anonymous page and event counts; no personal data is stored.",
  },
};

type Props = {
  /**
   * Force a specific locale. When omitted, the banner derives the
   * locale from the current pathname so it can be mounted once in
   * the root layout without each route having to wire it up.
   */
  locale?: Locale;
};

/**
 * Minimal opt-in analytics consent banner.
 *
 * Mounted once near the root of the visible page. Shows only when the
 * consent state is "unset"; clicking accept / decline persists the
 * choice via `setConsentState` (which also broadcasts a
 * `tunera-analytics-consent-change` event so the page-view tracker
 * can immediately start attaching the visitor / session id).
 *
 * The banner is not a tracking wall — anonymous page counts still
 * record while the banner is visible, the banner only affects
 * whether the visitor / session ids are derived. Visual treatment
 * matches the rest of the site (calm orange accent, no blur, no
 * heavy shadow). Dismissable via Esc and the explicit buttons; never
 * blocks navigation.
 */
const inferLocaleFromPath = (pathname: string | null): Locale => {
  if (pathname && pathname.startsWith("/en")) return "en";
  return "tr";
};

export function AnalyticsConsentBanner({ locale: localeProp }: Props) {
  const pathname = usePathname();
  const locale: Locale = localeProp ?? inferLocaleFromPath(pathname);
  const [state, setState] = useState<ConsentState>("unset");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setState(getConsentState());
  }, []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (getConsentState() !== "unset") return;
      setConsentState("denied");
      setState("denied");
    };
    if (typeof window !== "undefined") window.addEventListener("keydown", onEsc);
    return () => {
      if (typeof window !== "undefined") window.removeEventListener("keydown", onEsc);
    };
  }, []);

  if (!mounted || state !== "unset") return null;

  const copy = COPY[locale];

  const choose = (next: "granted" | "denied") => {
    setConsentState(next);
    setState(next);
  };

  return (
    <div
      role="region"
      aria-label={copy.accept + " / " + copy.reject}
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-md border border-tunera-stone/60 bg-white/95 px-5 py-4 shadow-[0_8px_28px_-12px_rgba(35,31,32,0.18)] backdrop-blur-sm sm:px-6 sm:py-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 text-sm leading-relaxed text-tunera-ink/85">
          <p>{copy.body}</p>
          <p className="text-[11px] uppercase tracking-[0.18em] text-tunera-muted-ink">
            {copy.details}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-sm border border-tunera-ink/15 px-4 py-2 text-sm text-tunera-ink transition-colors hover:border-tunera-orange hover:text-tunera-orange"
          >
            {copy.reject}
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-sm bg-tunera-orange px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#E64500]"
          >
            {copy.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
