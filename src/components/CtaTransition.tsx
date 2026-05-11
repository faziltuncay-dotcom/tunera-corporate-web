import Link from "next/link";

type CtaLink = {
  label: string;
  href: string;
};

type Props = {
  eyebrow?: string;
  title: string;
  body?: string;
  primary: CtaLink;
  /** Optional second outlined CTA; when omitted the band shows a single solid button. */
  secondary?: CtaLink;
  /**
   * Aria label for the wrapping section. Defaults to the title; pass
   * something explicit when the title is generic enough that screen
   * readers benefit from extra context.
   */
  ariaLabel?: string;
};

/**
 * Compact pre-footer routing bridge.
 *
 * Used on the homepage (after Hizmetler) and on the Brand page (before
 * the footer) to nudge the reader toward the next dedicated page
 * without re-stating the full Brand or Contact content. Deliberately
 * smaller and lighter than a `PageHero` — eyebrow rail + short
 * headline + one-line body + one or two buttons — so the surface
 * reads as a *transition*, not as another section.
 *
 * Visual language:
 *
 *   - warm ivory-to-sand vertical gradient surface, no card, no
 *     border, no blur (matches the "floating text" pass).
 *   - the same `.tunera-wave-motif--seam` token that the
 *     `SectionTransition` band uses, so the motif reads as one
 *     continuous thread across adjacent sections rather than a fresh
 *     pattern fragment.
 *   - thin orange accent rail prefixes the eyebrow.
 *   - solid-orange primary button + outlined-ink secondary button
 *     when both exist; single solid orange button when only one CTA
 *     is supplied.
 *
 * Routing semantics:
 *
 *   - both buttons render real `<Link href>` anchors. Callers pass
 *     absolute routes (e.g. `/tr/markalar`, `/en/contact`) — no hash
 *     anchors, no dead links to removed homepage sections.
 *   - SmoothAnchorNav stays out of the way because there's no `#` in
 *     these hrefs; Next router handles the navigation normally.
 *
 * Layout:
 *
 *   - max-w-3xl text column centred on the page so the headline never
 *     stretches editorial-uncomfortably on wide viewports.
 *   - buttons flex-wrap; on the narrowest mobiles they stack one
 *     under the other with the same tap-target sizing as the hero
 *     CTAs.
 */
export function CtaTransition({ eyebrow, title, body, primary, secondary, ariaLabel }: Props) {
  return (
    <section
      aria-label={ariaLabel ?? title}
      className="relative isolate overflow-hidden bg-gradient-to-b from-tunera-ivory to-tunera-sand/55"
    >
      {/* Top edge — when the previous section is dark (the graphite
          ServicesStickyStory), this band fades the dark surface down
          into the ivory bridge so the transition reads as one flow
          instead of a hard horizontal cut. On Brand page (where the
          previous section is already ivory) the gradient sits on
          ivory and becomes effectively invisible. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-tunera-graphite/35 via-tunera-graphite/10 to-tunera-ivory/0"
      />
      {/* Same motif token used by SectionTransition seams; reads as
          continuous brand thread between the previous section, this
          bridge, and the footer. */}
      <div aria-hidden className="tunera-wave-motif--seam" />
      {/* Bottom edge — fades the sand surface down into graphite so
          the Footer below picks up the gradient cleanly without a
          horizontal cut where the section colors flip. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-tunera-sand/0 via-tunera-graphite/15 to-tunera-graphite/55"
      />

      <div className="relative mx-auto max-w-3xl px-6 py-14 text-center sm:py-16 md:py-20">
        {eyebrow ? (
          <div className="mb-5 flex items-center justify-center gap-3">
            <span aria-hidden className="tunera-floating-rail" />
            <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
              {eyebrow}
            </span>
            <span aria-hidden className="tunera-floating-rail" />
          </div>
        ) : null}
        <h2 className="text-2xl font-semibold leading-[1.15] tracking-tighter2 text-tunera-ink sm:text-3xl md:text-4xl">
          {title}
        </h2>
        {body ? (
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-tunera-muted-ink sm:text-[17px] sm:leading-[1.55]">
            {body}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={primary.href}
            className="inline-flex items-center gap-2 rounded-sm bg-tunera-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#E64500]"
          >
            {primary.label}
          </Link>
          {secondary ? (
            <Link
              href={secondary.href}
              className="inline-flex items-center gap-2 rounded-sm border border-tunera-ink/20 px-6 py-3 text-sm font-medium text-tunera-ink transition-colors hover:border-tunera-orange hover:text-tunera-orange"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
