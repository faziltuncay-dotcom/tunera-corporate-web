import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { BrandCard } from "@/components/BrandCard";
import { brands, copy, type Locale } from "@/content/site";

type Props = {
  locale: Locale;
};

export function BrandsPage({ locale }: Props) {
  const t = copy(locale);
  return (
    <div lang={locale}>
      <Header locale={locale} current="brands" />
      <main id="main">
        <Section
          eyebrow={t.brandsSection.title}
          title={t.brandsSection.title}
          description={t.brandsSection.description}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {brands.map((b) => (
              <BrandCard
                key={b.id}
                locale={locale}
                id={b.id}
                name={b.name}
                status={b.status}
                href={b.href}
                external={b.external}
              />
            ))}
          </div>
        </Section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
