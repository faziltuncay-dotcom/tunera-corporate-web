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
      href: locale === "tr" ? `${base}/hakkimizda` : `${base}/about`,
      label: t.nav.about,
    },
    {
      href: locale === "tr" ? `${base}/markalar` : `${base}/brands`,
      label: t.nav.brands,
    },
    {
      href: locale === "tr" ? `${base}/hizmetler` : `${base}/services`,
      label: t.nav.services,
    },
    {
      href: locale === "tr" ? `${base}/iletisim` : `${base}/contact`,
      label: t.nav.contact,
    },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-tunera-graphite text-tunera-ivory">
      {/* Layer A — broad pattern atmosphere, masked to fade in from the top */}
      <div
        aria-hidden
        className="tunera-footer-pattern-a pointer-events-none absolute inset-0 bg-tunera-pattern bg-cover bg-center opacity-[0.06]"
        style={{ filter: "invert(1)" }}
      />
      {/* Layer B — second layer offset for depth, fades in slightly later */}
      <div
        aria-hidden
        className="tunera-footer-pattern-b pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "url('/assets/brand/tunera/tunera-pattern.png')",
          backgroundSize: "150%",
          backgroundPosition: "70% 30%",
          backgroundRepeat: "no-repeat",
          filter: "invert(1)",
        }}
      />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-6 pb-14 pt-24 md:grid-cols-3 md:items-end md:gap-8 md:pt-28">
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
