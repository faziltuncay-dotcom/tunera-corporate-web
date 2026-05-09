import Link from "next/link";
import { contact, copy, type Locale } from "@/content/site";

type Props = {
  locale: Locale;
};

export function Footer({ locale }: Props) {
  const t = copy(locale);
  const year = new Date().getFullYear();
  const base = `/${locale}`;
  const quickLinks = [
    {
      href: locale === "tr" ? `${base}/markalar` : `${base}/brands`,
      label: t.nav.brands,
    },
    {
      href: locale === "tr" ? `${base}/iletisim` : `${base}/contact`,
      label: t.nav.contact,
    },
  ];

  return (
    <footer className="border-t border-white/5 bg-navy-950">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 text-sm text-ink-400 md:grid-cols-3 md:items-center md:gap-4">
        <div>
          <div className="text-ink-200">{contact.companyLegal}</div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-ink-400">
            {t.footer.note}
          </div>
        </div>
        <nav aria-label={t.nav.primaryAria} className="md:justify-self-center">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-200">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-sm transition-colors hover:text-sunset-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-xs text-ink-400 md:justify-self-end md:text-right">
          © {year} {contact.companyShort}. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
