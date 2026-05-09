import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
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
        <Section
          eyebrow={t.contactSection.title}
          title={t.contactSection.title}
          description={t.contactSection.body}
        >
          <div className="rounded-2xl border border-white/5 bg-navy-900/40 p-6 sm:p-8">
            <h2 className="text-base font-medium text-ink-50">{t.contactSection.detailsTitle}</h2>
            <dl className="mt-6 grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
              {fields.map((f) => (
                <div key={f.label} className={f.full ? "md:col-span-2" : undefined}>
                  <dt className="text-xs uppercase tracking-[0.2em] text-ink-400">{f.label}</dt>
                  <dd
                    className={
                      "mt-1 text-sm " + (isPlaceholder(f.value) ? "text-ink-400" : "text-ink-200")
                    }
                  >
                    {renderValue(f.value)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
