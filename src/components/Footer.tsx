import Image from "next/image";
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
    <footer className="relative overflow-hidden bg-tunera-graphite text-tunera-ivory">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-32 h-[420px] w-[420px] bg-tunera-emblem bg-contain bg-center bg-no-repeat opacity-[0.06]"
        style={{ filter: "invert(1)" }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3 md:items-end md:gap-8">
        <div>
          <Image
            src="/assets/brand/tunera/tunera-logo-white.png"
            alt="Tunera Denizcilik"
            width={1482}
            height={343}
            className="h-7 w-auto"
          />
          <div className="mt-5 text-xs uppercase tracking-[0.2em] text-tunera-stone/90">
            {contact.companyLegal}
          </div>
          <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-tunera-stone/60">
            {t.footer.note}
          </div>
        </div>
        <nav aria-label={t.nav.primaryAria} className="md:justify-self-center">
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2 text-sm text-tunera-stone">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-sm transition-colors hover:text-tunera-orange"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-xs text-tunera-stone/60 md:justify-self-end md:text-right">
          © {year} {contact.companyShort}. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
