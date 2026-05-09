import Link from "next/link";
import { copy, type Locale } from "@/content/site";

type Props = {
  locale: Locale;
  id: string;
  name: string;
  status: "active" | "coming-soon";
  href: string | null;
  external: boolean;
};

export function BrandCard({ locale, id, name, status, href, external }: Props) {
  const t = copy(locale);
  const isActive = status === "active";
  const note = id === "granfort" ? t.brandsSection.granfortNote : t.brandsSection.ranieriNote;
  const statusLabel = isActive ? t.brandsSection.statusActive : t.brandsSection.statusComingSoon;
  const isLocalDevLink = !!href && href.startsWith("http://localhost");

  return (
    <article
      aria-labelledby={`brand-${id}-title`}
      className="group relative flex h-full flex-col overflow-hidden rounded-md border border-tunera-stone/60 bg-white p-7 transition-all hover:border-tunera-ink/30 hover:shadow-[0_8px_28px_-12px_rgba(35,31,32,0.18)] sm:p-9"
    >
      {isActive ? (
        <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-tunera-orange" />
      ) : null}
      <div className="flex items-start justify-between gap-4">
        <h3
          id={`brand-${id}-title`}
          className="text-2xl font-semibold tracking-tighter2 text-tunera-ink sm:text-3xl"
        >
          {name}
        </h3>
        <span
          className={
            "inline-flex shrink-0 items-center gap-2 rounded-sm border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] " +
            (isActive
              ? "border-tunera-orange/30 bg-tunera-orange/5 text-tunera-orange"
              : "border-tunera-ink/15 text-tunera-muted-ink")
          }
        >
          {isActive ? (
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-tunera-orange" />
          ) : null}
          {statusLabel}
        </span>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-tunera-muted-ink sm:text-[15px]">{note}</p>
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
        {isActive && href ? (
          <Link
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer noopener" : undefined}
            className="inline-flex items-center gap-2 rounded-sm text-sm font-medium text-tunera-ink transition-colors hover:text-tunera-orange"
          >
            <span>{t.brandsSection.visit}</span>
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        ) : (
          <span className="inline-flex items-center rounded-sm border border-tunera-ink/15 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-tunera-muted-ink">
            {t.brandsSection.inPreparation}
          </span>
        )}
        {isLocalDevLink ? (
          <span className="rounded-sm border border-tunera-ink/15 bg-tunera-sand/50 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-tunera-muted-ink">
            {t.brandsSection.placeholderTag}
          </span>
        ) : null}
      </div>
    </article>
  );
}
