import type { ReactNode } from "react";

type Tone = "light" | "dark";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  tone?: Tone;
  /**
   * Reduces vertical padding so the section feels connected to a
   * preceding hero or SectionTransition without losing premium rhythm.
   */
  tight?: boolean;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  tone = "light",
  tight = false,
}: Props) {
  const titleColor = tone === "dark" ? "text-tunera-ivory" : "text-tunera-ink";
  const descColor = tone === "dark" ? "text-tunera-stone" : "text-tunera-muted-ink";
  const padding = tight ? "py-14 sm:py-16 md:py-20 lg:py-24" : "py-20 sm:py-24 md:py-28 lg:py-32";
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-6 ${padding} ${className ?? ""}`}>
      {(eyebrow || title || description) && (
        <header className="mb-12 max-w-2xl">
          {eyebrow ? (
            <div className="mb-4 flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-tunera-orange" />
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-tunera-orange">
                {eyebrow}
              </span>
            </div>
          ) : null}
          {title ? (
            <h2
              className={`text-3xl font-semibold leading-[1.05] tracking-tighter2 sm:text-4xl md:text-5xl ${titleColor}`}
            >
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className={`mt-5 max-w-xl text-base leading-relaxed sm:text-lg ${descColor}`}>
              {description}
            </p>
          ) : null}
        </header>
      )}
      {children}
    </section>
  );
}
