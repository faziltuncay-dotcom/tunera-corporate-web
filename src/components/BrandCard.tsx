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

  return (
    <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-navy-900/60 p-8 transition-colors hover:border-sunset-400/40">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-light tracking-tightish text-ink-50">{name}</h3>
          <span
            className={
              "inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] " +
              (isActive ? "border-sunset-400/40 text-sunset-400" : "border-white/10 text-ink-400")
            }
          >
            {statusLabel}
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink-200">{note}</p>
      </div>
      <div className="mt-8 flex items-center gap-3">
        {isActive && href ? (
          <Link
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer noopener" : undefined}
            className="inline-flex items-center gap-2 text-sm text-sunset-400 transition-colors hover:text-sunset-300"
          >
            <span>{t.brandsSection.visit}</span>
            <span aria-hidden>→</span>
          </Link>
        ) : (
          <span className="text-sm text-ink-400">—</span>
        )}
        {isActive && href && href.startsWith("http://localhost") ? (
          <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-ink-400">
            {t.brandsSection.placeholderTag}
          </span>
        ) : null}
      </div>
    </article>
  );
}
