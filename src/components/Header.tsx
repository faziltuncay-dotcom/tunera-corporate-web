import Link from "next/link";
import { copy, type Locale } from "@/content/site";

type Props = {
  locale: Locale;
};

export function Header({ locale }: Props) {
  const t = copy(locale);
  const base = `/${locale}`;
  const links = [
    { href: base, label: t.nav.home },
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
    <header className="border-b border-white/5 bg-navy-950/60 backdrop-blur supports-[backdrop-filter]:bg-navy-950/40">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-sunset-500 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-navy-950"
      >
        {t.nav.skipToContent}
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
        <Link
          href={base}
          aria-label={`Tunera Denizcilik — ${t.nav.home}`}
          className="rounded-sm text-sm font-medium uppercase tracking-[0.2em] text-ink-50 transition-colors hover:text-sunset-400"
        >
          Tunera Denizcilik
        </Link>
        <nav aria-label={t.nav.primaryAria} className="flex items-center gap-5 sm:gap-7">
          <ul className="hidden items-center gap-5 text-sm text-ink-200 sm:flex sm:gap-7">
            {links.map((link) => (
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
          <Link
            href={t.nav.languageSwitchHref}
            aria-label={t.nav.languageSwitchAria}
            className="rounded-full border border-white/10 px-3 py-1 text-xs tracking-widest text-ink-200 transition-colors hover:border-sunset-400 hover:text-sunset-400"
          >
            {t.nav.languageSwitch}
          </Link>
        </nav>
      </div>
      <nav
        aria-label={t.nav.primaryAria}
        className="border-t border-white/5 bg-navy-950/40 sm:hidden"
      >
        <ul className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3 text-sm text-ink-200">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="rounded-sm transition-colors hover:text-sunset-400">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
