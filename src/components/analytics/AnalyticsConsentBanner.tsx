"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getConsentState, setConsentState, type ConsentState } from "@/lib/analytics/client";

type Locale = "tr" | "en";

type Copy = {
  title: string;
  body: string;
  acceptAll: string;
  necessaryOnly: string;
  manage: string;
  save: string;
  back: string;
  necessaryTitle: string;
  necessaryBody: string;
  necessaryPill: string;
  analyticsTitle: string;
  analyticsBody: string;
  analyticsToggleAria: string;
};

const COPY: Record<Locale, Copy> = {
  tr: {
    title: "Çerez ve Kişisel Veri Tercihleri",
    body: "Zorunlu çerezler siteyi güvenli ve düzgün çalıştırır. Onay verirseniz ziyaret ve tıklama verilerini anonimleştirilmiş veya toplulaştırılmış şekilde ölçeriz.",
    acceptAll: "Tümünü kabul et",
    necessaryOnly: "Sadece zorunlu olanlar",
    manage: "Tercihleri yönet",
    save: "Tercihleri kaydet",
    back: "Geri",
    necessaryTitle: "Zorunlu Çerezler",
    necessaryBody:
      "Sitenin çalışması, güvenliği ve tercihlerin hatırlanması için gereklidir. Her zaman aktiftir.",
    necessaryPill: "Her zaman aktif",
    analyticsTitle: "Analitik ve Performans",
    analyticsBody:
      "Ziyaretleri, sayfa görüntülemelerini ve önemli tıklamaları ölçerek siteyi geliştirmemize yardımcı olur.",
    analyticsToggleAria: "Analitik ve Performans tercihini değiştir",
  },
  en: {
    title: "Cookie and Personal Data Preferences",
    body: "Necessary cookies keep the site secure and working properly. With your permission, we measure visits and clicks using anonymized or aggregated data.",
    acceptAll: "Accept all",
    necessaryOnly: "Necessary only",
    manage: "Manage preferences",
    save: "Save preferences",
    back: "Back",
    necessaryTitle: "Necessary Cookies",
    necessaryBody:
      "Required for site operation, security, and remembering preferences. Always active.",
    necessaryPill: "Always active",
    analyticsTitle: "Analytics and Performance",
    analyticsBody:
      "Helps us improve the site by measuring visits, page views, and important clicks.",
    analyticsToggleAria: "Toggle Analytics and Performance",
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

const inferLocaleFromPath = (pathname: string | null): Locale => {
  if (pathname && pathname.startsWith("/en")) return "en";
  return "tr";
};

type Mode = "compact" | "manage";

/**
 * Cookie and personal-data preferences surface.
 *
 * The underlying analytics consent state remains a binary
 * "granted" | "denied" | "unset" decision (see `getConsentState`
 * / `setConsentState`). This component is purely the user-facing
 * UI on top of that. It exposes three actions:
 *
 *   1. "Tümünü kabul et" / "Accept all"
 *      → records analytics consent as granted.
 *   2. "Sadece zorunlu olanlar" / "Necessary only"
 *      → records analytics consent as denied; necessary cookies
 *        (navigation, preference recall, security) remain active
 *        because they are not analytics.
 *   3. "Tercihleri yönet" / "Manage preferences"
 *      → expands the panel into a categorised view. Necessary is
 *        listed as always-active (not a checkbox). Analytics &
 *        Performance is a real toggle whose stored state becomes
 *        the user's analytics consent when "Save preferences" is
 *        clicked.
 *
 * The wording deliberately does NOT claim "fully anonymous":
 * Phase Analytics 1.0 stores HMAC-hashed visitor / session ids
 * when consent is granted, so the language we surface here is
 * "anonimleştirilmiş veya toplulaştırılmış ölçüm verileri" /
 * "anonymized or aggregated measurement data". Marketing,
 * advertising, CRM, email automation, lead tracking — none of
 * those are claimed because none of them exist in this codebase.
 *
 * The banner remains opt-in only: it is not a tracking wall and
 * the site stays fully usable regardless of the choice. Hitting
 * Escape with the panel open is treated as "Necessary only" so
 * the panel can be dismissed without forcing a decision through
 * a button.
 */
export function AnalyticsConsentBanner({ locale: localeProp }: Props) {
  const pathname = usePathname();
  const locale: Locale = localeProp ?? inferLocaleFromPath(pathname);
  const [state, setState] = useState<ConsentState>("unset");
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<Mode>("compact");
  const [analyticsChecked, setAnalyticsChecked] = useState(false);

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

  const saveManaged = () => choose(analyticsChecked ? "granted" : "denied");

  return (
    <div
      role="region"
      aria-label={copy.title}
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-md border border-tunera-stone/60 bg-white/95 shadow-[0_8px_28px_-12px_rgba(35,31,32,0.18)] backdrop-blur-sm"
    >
      <div className="px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-tunera-orange" />
          <h2 className="text-[11px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
            {copy.title}
          </h2>
        </div>

        {mode === "compact" ? (
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-tunera-ink/85">{copy.body}</p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setMode("manage")}
                className="rounded-sm border border-tunera-ink/15 px-4 py-2 text-sm text-tunera-ink transition-colors hover:border-tunera-orange hover:text-tunera-orange"
              >
                {copy.manage}
              </button>
              <button
                type="button"
                onClick={() => choose("denied")}
                className="rounded-sm border border-tunera-ink/15 px-4 py-2 text-sm text-tunera-ink transition-colors hover:border-tunera-orange hover:text-tunera-orange"
              >
                {copy.necessaryOnly}
              </button>
              <button
                type="button"
                onClick={() => choose("granted")}
                className="rounded-sm bg-tunera-orange px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#E64500]"
              >
                {copy.acceptAll}
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <p className="text-sm leading-relaxed text-tunera-ink/85">{copy.body}</p>

            <ul className="divide-y divide-tunera-stone/60 rounded-sm border border-tunera-stone/60">
              <li className="flex items-start justify-between gap-4 px-4 py-4">
                <div className="space-y-1.5">
                  <div className="text-sm font-semibold tracking-tightish text-tunera-ink">
                    {copy.necessaryTitle}
                  </div>
                  <p className="text-[13px] leading-relaxed text-tunera-muted-ink">
                    {copy.necessaryBody}
                  </p>
                </div>
                <span className="shrink-0 rounded-sm border border-tunera-ink/15 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-tunera-muted-ink">
                  {copy.necessaryPill}
                </span>
              </li>
              <li className="flex items-start justify-between gap-4 px-4 py-4">
                <div className="space-y-1.5">
                  <div className="text-sm font-semibold tracking-tightish text-tunera-ink">
                    {copy.analyticsTitle}
                  </div>
                  <p className="text-[13px] leading-relaxed text-tunera-muted-ink">
                    {copy.analyticsBody}
                  </p>
                </div>
                <label className="flex shrink-0 cursor-pointer items-center gap-2 select-none">
                  <input
                    type="checkbox"
                    checked={analyticsChecked}
                    onChange={(e) => setAnalyticsChecked(e.target.checked)}
                    aria-label={copy.analyticsToggleAria}
                    className="h-4 w-4 cursor-pointer accent-tunera-orange"
                  />
                </label>
              </li>
            </ul>

            <div className="flex flex-wrap items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setMode("compact")}
                className="rounded-sm border border-tunera-ink/15 px-4 py-2 text-sm text-tunera-ink transition-colors hover:border-tunera-orange hover:text-tunera-orange"
              >
                {copy.back}
              </button>
              <button
                type="button"
                onClick={saveManaged}
                className="rounded-sm bg-tunera-orange px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#E64500]"
              >
                {copy.save}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
