import { contact, copy, type Locale } from "@/content/site";

type Props = {
  locale: Locale;
};

export function Footer({ locale }: Props) {
  const t = copy(locale);
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 bg-navy-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-ink-400 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-ink-200">{contact.companyLegal}</div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-ink-400">
            {t.footer.note}
          </div>
        </div>
        <div className="text-xs text-ink-400">
          © {year} {contact.companyShort}. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
