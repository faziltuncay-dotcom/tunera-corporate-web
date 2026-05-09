import Image from "next/image";
import Link from "next/link";
import { copy, type Locale } from "@/content/site";

export type NavSegment = "home" | "about" | "brands" | "services" | "contact";

type Props = {
  locale: Locale;
  current?: NavSegment;
};

export function Header({ locale, current }: Props) {
  const t = copy(locale);
  const base = `/${locale}`;
  const links: Array<{ href: string; label: string; segment: NavSegment }> = [
    { href: base, label: t.nav.home, segment: "home" },
    {
      href: locale === "tr" ? `${base}/hakkimizda` : `${base}/about`,
      label: t.nav.about,
      segment: "about",
    },
    {
      href: locale === "tr" ? `${base}/markalar` : `${base}/brands`,
      label: t.nav.brands,
      segment: "brands",
    },
    {
      href: locale === "tr" ? `${base}/hizmetler` : `${base}/services`,
      label: t.nav.services,
      segment: "services",
    },
    {
      href: locale === "tr" ? `${base}/iletisim` : `${base}/contact`,
      label: t.nav.contact,
      segment: "contact",
    },
  ];

  const linkClass = (segment: NavSegment) => {
    const isActive = segment === current;
    return [
      "relative inline-block rounded-sm pb-1 text-sm transition-colors",
      isActive ? "text-tunera-ink" : "text-tunera-ink/70 hover:text-tunera-orange",
      isActive
        ? "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:bg-tunera-orange"
        : "",
    ]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <header className="relative border-b border-tunera-stone/50 bg-tunera-ivory">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-tunera-orange focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        {t.nav.skipToContent}
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
        <Link href={base} aria-label={`Tunera Denizcilik — ${t.nav.home}`} className="block">
          <Image
            src="/assets/brand/tunera/tunera-logo-black.png"
            alt="Tunera Denizcilik"
            width={1482}
            height={343}
            priority
            className="h-6 w-auto sm:h-7"
          />
        </Link>
        <nav aria-label={t.nav.primaryAria} className="flex items-center gap-4 sm:gap-6">
          <ul className="hidden items-center gap-5 md:flex md:gap-7">
            {links.map((link) => {
              const isActive = link.segment === current;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={linkClass(link.segment)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={t.nav.languageSwitchHref}
            aria-label={t.nav.languageSwitchAria}
            className="rounded-sm border border-tunera-ink/15 px-3 py-1 text-xs tracking-widest text-tunera-ink/80 transition-colors hover:border-tunera-orange hover:text-tunera-orange"
          >
            {t.nav.languageSwitch}
          </Link>
        </nav>
      </div>
      <nav
        aria-label={t.nav.primaryAria}
        className="border-t border-tunera-stone/40 bg-tunera-ivory md:hidden"
      >
        <ul className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-6 py-3 text-sm">
          {links.map((link) => {
            const isActive = link.segment === current;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={linkClass(link.segment)}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
