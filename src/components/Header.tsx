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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href={base} className="text-sm font-medium tracking-[0.2em] text-ink-50 uppercase">
          Tunera Denizcilik
        </Link>
        <nav className="flex items-center gap-7 text-sm text-ink-200">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-sunset-400"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={t.nav.languageSwitchHref}
            aria-label="Language"
            className="rounded-full border border-white/10 px-3 py-1 text-xs tracking-widest text-ink-200 transition-colors hover:border-sunset-400 hover:text-sunset-400"
          >
            {t.nav.languageSwitch}
          </Link>
        </nav>
      </div>
    </header>
  );
}
