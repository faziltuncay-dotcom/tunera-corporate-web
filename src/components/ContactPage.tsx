import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { SectionTransition } from "@/components/SectionTransition";
import { PageHero } from "@/components/PageHero";
import { contact, copy, type Locale } from "@/content/site";

type Props = {
  locale: Locale;
};

export function ContactPage({ locale }: Props) {
  const t = copy(locale);
  const fallback = t.contactSection.toBeAnnounced;
  const renderValue = (v: string | null) => v ?? fallback;
  const isPlaceholder = (v: string | null) => !v;

  const fields: Array<{ label: string; value: string | null; full?: boolean }> = [
    { label: t.contactSection.fieldEmail, value: contact.email },
    { label: t.contactSection.fieldPhone, value: contact.phone },
    { label: t.contactSection.fieldAddress, value: contact.address, full: true },
  ];

  return (
    <div lang={locale}>
      <Header locale={locale} current="contact" />
      <main id="main">
        <PageHero
          eyebrow={t.contactSection.title}
          title={t.contactSection.title}
          lead={t.contactSection.body}
        />

        {/* Hero → contact card brand seam */}
        <SectionTransition />

        <Section tight>
          <div className="relative overflow-hidden rounded-md border border-tunera-stone/60 bg-white p-7 sm:p-9">
            <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-tunera-orange" />
            <h2 className="text-base font-semibold tracking-tightish text-tunera-ink sm:text-lg">
              {t.contactSection.detailsTitle}
            </h2>
            <dl className="mt-7 grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
              {fields.map((f) => (
                <div key={f.label} className={f.full ? "md:col-span-2" : undefined}>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
                    {f.label}
                  </dt>
                  <dd
                    className={
                      "mt-2 text-base " +
                      (isPlaceholder(f.value) ? "text-tunera-muted-ink" : "text-tunera-ink")
                    }
                  >
                    {renderValue(f.value)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        {/* Sand seam to ease into the graphite footer */}
        <SectionTransition surface="sand" />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
