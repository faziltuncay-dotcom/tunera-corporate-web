import Image from "next/image";
import Link from "next/link";
import { anchors, copy, type Locale } from "@/content/site";
import { HeaderProgress } from "@/components/HeaderProgress";
import { MobileMenu } from "@/components/MobileMenu";

/**
 * NavSegment is kept for callers that still pass a `current` prop, but
 * the one-page experience does not surface a per-segment active state
 * (no scroll-spy yet). The prop is accepted and ignored visually.
 */
export type NavSegment = "home" | "about" | "brands" | "services" | "contact";

type Props = {
  locale: Locale;
  current?: NavSegment;
};

export function Header({ locale }: Props) {
  const t = copy(locale);
  const base = `/${locale}`;
  const ids = anchors(locale);
  // Brands and Contact have dedicated standalone routes (/{locale}/markalar
  // | /en/brands and /{locale}/iletisim | /en/contact). About and Services
  // remain anchored sections on the homepage flow.
  const brandsHref = locale === "en" ? "/en/brands" : "/tr/markalar";
  const contactHref = locale === "en" ? "/en/contact" : "/tr/iletisim";
  const links: Array<{ href: string; label: string; segment: NavSegment }> = [
    { href: `${base}#${ids.home}`, label: t.nav.home, segment: "home" },
    { href: `${base}#${ids.about}`, label: t.nav.about, segment: "about" },
    { href: `${base}#${ids.services}`, label: t.nav.services, segment: "services" },
    { href: brandsHref, label: t.nav.brands, segment: "brands" },
    { href: contactHref, label: t.nav.contact, segment: "contact" },
  ];

  const linkClass =
    "relative inline-block rounded-sm pb-1 text-sm text-tunera-ink/70 transition-colors hover:text-tunera-orange";

  return (
    <header
      data-tunera-header
      className="tunera-header sticky top-0 z-40 border-b border-tunera-stone/50 bg-tunera-ivory/85 backdrop-blur-sm"
    >
      <HeaderProgress />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-tunera-orange focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        {t.nav.skipToContent}
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3 md:py-5">
        <Link
          href={`${base}#${ids.home}`}
          aria-label={`Tunera Denizcilik — ${t.nav.home}`}
          className="block"
        >
          <Image
            src="/assets/brand/tunera/tunera-logo-black.png"
            alt="Tunera Denizcilik"
            width={1482}
            height={343}
            priority
            sizes="(min-width: 640px) 132px, 110px"
            className="h-6 w-auto sm:h-7"
          />
        </Link>
        <nav aria-label={t.nav.primaryAria} className="hidden items-center gap-4 md:flex md:gap-6">
          <ul className="hidden items-center gap-5 md:flex md:gap-7">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={t.nav.languageSwitchHref}
            aria-label={t.nav.languageSwitchAria}
            className="rounded-sm border border-tunera-ink/15 px-3 py-1 text-xs tracking-widest text-tunera-ink/80 transition-colors hover:border-tunera-orange hover:text-tunera-orange"
          >
            {t.nav.languageSwitch}
          </Link>
        </nav>
        <MobileMenu
          links={links.map((l) => ({ href: l.href, label: l.label }))}
          triggerLabel={t.nav.menuOpen}
          closeLabel={t.nav.menuClose}
          languageSwitchHref={t.nav.languageSwitchHref}
          languageSwitchLabel={t.nav.languageSwitch}
          languageSwitchAria={t.nav.languageSwitchAria}
          primaryAria={t.nav.primaryAria}
        />
      </div>
      {/*
        Route-progress rail. Sits flush against the header's bottom
        edge as a thin orange line that scales horizontally with the
        page's scroll position. The actual scaleX value comes from
        `--route-progress` written by HeaderProgress.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] overflow-hidden"
      >
        <div className="tunera-header-progress h-full w-full bg-tunera-orange" />
      </div>
    </header>
  );
}
