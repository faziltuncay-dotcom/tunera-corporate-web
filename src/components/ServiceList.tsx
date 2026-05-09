import { copy, type Locale } from "@/content/site";

type Props = {
  locale: Locale;
};

export function ServiceList({ locale }: Props) {
  const t = copy(locale);
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {t.services.items.map((item) => (
        <article
          key={item.title}
          className="rounded-2xl border border-white/5 bg-navy-900/40 p-7 transition-colors hover:border-white/10"
        >
          <h3 className="text-base font-medium text-ink-50">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-200">{item.body}</p>
        </article>
      ))}
    </div>
  );
}
