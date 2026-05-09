import { copy, type Locale } from "@/content/site";

type Props = {
  locale: Locale;
};

export function ServiceList({ locale }: Props) {
  const t = copy(locale);
  return (
    <ul role="list" className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
      {t.services.items.map((item, i) => (
        <li
          key={item.title}
          className="rounded-md border border-tunera-stone/60 bg-white p-6 transition-colors hover:border-tunera-ink/20"
        >
          <div className="mb-4 flex items-center gap-2">
            <span aria-hidden className="h-1 w-5 bg-tunera-orange" />
            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="text-base font-semibold tracking-tightish text-tunera-ink sm:text-lg">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-tunera-muted-ink">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}
