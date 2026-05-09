import Image from "next/image";
import { copy, type Locale } from "@/content/site";
import { HomeScrollStoryClient, type StoryPayload } from "@/components/HomeScrollStoryClient";

type Props = {
  locale: Locale;
};

/**
 * Server-side wrapper for the home scroll story.
 *
 * Builds the micro-content for each stage (NewEra wordmark, brand
 * pills, service-model index, role names) from existing site.ts copy,
 * then hands the payload to the client component. The micro-content
 * for each stage is React, so it stays composable but rendered on the
 * server — the only client work is the scroll listener itself.
 */
export function HomeScrollStory({ locale }: Props) {
  const t = copy(locale);

  const stages = t.home.scrollStory.stages.map((s) => ({
    id: s.id,
    kicker: s.kicker,
    title: s.title,
    body: s.body,
  }));

  const microContent: StoryPayload["microContent"] = {
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
  };

  const payload: StoryPayload = {
    ariaLabel: t.home.scrollStory.ariaLabel,
    eyebrow: t.home.scrollStory.eyebrow,
    stages,
    microContent,
  };

  return <HomeScrollStoryClient payload={payload} />;
}
