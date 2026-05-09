import type { ReactNode } from "react";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, description, children, className }: Props) {
  return (
    <section
      id={id}
      className={"mx-auto w-full max-w-6xl px-6 py-20 md:py-28 " + (className ?? "")}
    >
      {(eyebrow || title || description) && (
        <header className="mb-10 max-w-2xl">
          {eyebrow ? (
            <div className="mb-3 text-xs uppercase tracking-[0.28em] text-sunset-400">
              {eyebrow}
            </div>
          ) : null}
          {title ? (
            <h2 className="text-3xl font-light tracking-tightish text-ink-50 md:text-4xl">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-4 text-base leading-relaxed text-ink-200">{description}</p>
          ) : null}
        </header>
      )}
      {children}
    </section>
  );
}
