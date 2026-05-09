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
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-navy-900/60 p-6 transition-colors hover:border-sunset-400/40 sm:p-8"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <h3
            id={`brand-${id}-title`}
            className="text-2xl font-light tracking-tightish text-ink-50"
          >
            {name}
          </h3>
          <span
            className={
              "inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] " +
              (isActive ? "border-sunset-400/40 text-sunset-400" : "border-white/10 text-ink-400")
            }
          >
            {statusLabel}
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink-200">{note}</p>
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        {isActive && href ? (
          <Link
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer noopener" : undefined}
            className="inline-flex items-center gap-2 rounded-sm text-sm text-sunset-400 transition-colors hover:text-sunset-300"
          >
            <span>{t.brandsSection.visit}</span>
            <span aria-hidden>→</span>
          </Link>
        ) : (
          <span className="inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-ink-400">
            {t.brandsSection.inPreparation}
          </span>
        )}
        {isLocalDevLink ? (
          <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-ink-400">
            {t.brandsSection.placeholderTag}
          </span>
        ) : null}
      </div>
    </article>
  );
}
