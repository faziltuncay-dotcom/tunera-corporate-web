type Props = {
  eyebrow: string;
  title: string;
  lead: string;
};

/**
 * Editorial hero used on About and Services pages. Calmer than the home
 * hero — single column, no brand panel.
 */
export function PageHero({ eyebrow, title, lead }: Props) {
  return (
    <section className="border-b border-tunera-stone/40 bg-tunera-ivory">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="mb-6 flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-tunera-orange" />
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
            {eyebrow}
          </span>
        </div>
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tighter2 text-tunera-ink sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-relaxed text-tunera-muted-ink sm:text-lg">
          {lead}
        </p>
      </div>
    </section>
  );
}
