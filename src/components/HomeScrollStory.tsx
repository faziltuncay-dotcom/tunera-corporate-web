import Image from "next/image";
import Link from "next/link";
import { copy, type Locale } from "@/content/site";
import { ScrollNarrativeClient, type NarrativePayload } from "@/components/ScrollNarrativeClient";

type Props = {
  locale: Locale;
};

/**
 * Server-side wrapper for the home variant of the scroll narrative.
 *
 * Builds the per-stage micro-content (NewEra wordmark, brand pills,
 * service-model index, role names, contact CTA) from existing site.ts
 * copy and hands the payload to the shared client. Micro-content is
 * React, so it stays composable but is rendered on the server.
 */
export function HomeScrollStory({ locale }: Props) {
  const t = copy(locale);

  const stages = t.home.scrollStory.stages.map((s) => ({
    id: s.id,
    kicker: s.kicker,
    title: s.title,
    body: s.body,
  }));

  const microContent: NarrativePayload["microContent"] = {
    "new-era": (
      <div className="flex items-center gap-4">
        <Image
          src="/assets/brand/tunera/tunera-logo-black.png"
          alt=""
          width={1482}
          height={343}
          className="h-7 w-auto opacity-80 sm:h-8"
        />
        <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-tunera-orange">
          new era
        </span>
      </div>
    ),
    brands: (
      <ul role="list" className="flex flex-wrap gap-3 text-sm">
        <li className="inline-flex items-center gap-2 rounded-full border border-tunera-orange/30 bg-tunera-orange/5 px-3 py-1.5 text-tunera-ink">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-tunera-orange" />
          <span className="font-semibold tracking-tightish">Granfort</span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-tunera-orange">
            {t.brandsSection.statusActive}
          </span>
        </li>
        <li className="inline-flex items-center gap-2 rounded-full border border-tunera-ink/15 px-3 py-1.5 text-tunera-muted-ink">
          <span className="font-semibold tracking-tightish">Ranieri</span>
          <span className="text-[10px] uppercase tracking-[0.18em]">
            {t.brandsSection.statusComingSoon}
          </span>
        </li>
      </ul>
    ),
    services: (
      <ol role="list" className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
        {t.servicesPage.modelStrip.map((label, i) => (
          <li key={label} className="flex items-baseline gap-2">
            <span className="text-[11px] font-medium tabular-nums tracking-[0.18em] text-tunera-orange/70">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-semibold tracking-tightish text-tunera-ink">{label}</span>
          </li>
        ))}
      </ol>
    ),
    team: (
      <ol role="list" className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
        {t.aboutPage.team.items.map((item, i) => (
          <li key={item.title} className="flex items-baseline gap-2">
            <span className="text-[11px] font-medium tabular-nums tracking-[0.18em] text-tunera-orange/70">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-semibold tracking-tightish text-tunera-ink">
              {item.title}
            </span>
          </li>
        ))}
      </ol>
    ),
    "first-contact": (
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={t.home.ctaSecondaryHref}
          className="inline-flex items-center gap-2 rounded-sm bg-tunera-orange px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#E64500]"
        >
          {t.home.ctaSecondary}
        </Link>
        <Link
          href={t.home.ctaPrimaryHref}
          className="inline-flex items-center gap-2 rounded-sm border border-tunera-ink/20 px-5 py-2.5 text-sm text-tunera-ink transition-colors hover:border-tunera-ink/50 hover:bg-tunera-sand/50"
        >
          {t.home.ctaPrimary}
        </Link>
      </div>
    ),
  };

  const payload: NarrativePayload = {
    ariaLabel: t.home.scrollStory.ariaLabel,
    eyebrow: t.home.scrollStory.eyebrow,
    variant: "home",
    stages,
    microContent,
  };

  return <ScrollNarrativeClient payload={payload} />;
}
