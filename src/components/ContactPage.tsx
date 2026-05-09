import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { contact, copy, type Locale } from "@/content/site";

type Props = {
  locale: Locale;
};

export function ContactPage({ locale }: Props) {
  const t = copy(locale);
  return (
    <>
      <Header locale={locale} />
      <main>
        <Section
          eyebrow={t.contactSection.title}
          title={t.contactSection.title}
          description={t.contactSection.body}
        >
          <div className="rounded-2xl border border-white/5 bg-navy-900/40 p-8">
            <h3 className="text-base font-medium text-ink-50">{t.contactSection.detailsTitle}</h3>
            <dl className="mt-6 grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-ink-400">Email</dt>
                <dd className="mt-1 text-sm text-ink-200">{contact.emailPlaceholder}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-ink-400">Phone</dt>
                <dd className="mt-1 text-sm text-ink-200">{contact.phonePlaceholder}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-xs uppercase tracking-[0.2em] text-ink-400">Address</dt>
                <dd className="mt-1 text-sm text-ink-200">{contact.addressPlaceholder}</dd>
              </div>
            </dl>
            <p className="mt-8 text-xs text-ink-400">{t.contactSection.detailsNote}</p>
          </div>
        </Section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
