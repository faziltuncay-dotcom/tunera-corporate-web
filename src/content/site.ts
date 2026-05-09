export type Locale = "tr" | "en";

// TODO: replace placeholder contact details with finalized info before launch.
export const contact = {
  companyLegal: "Tunera Denizcilik Ticaret A.Ş.",
  companyShort: "Tunera Denizcilik",
  emailPlaceholder: "TODO: contact email to be finalized before launch",
  phonePlaceholder: "TODO: contact phone to be finalized before launch",
  addressPlaceholder: "TODO: address to be finalized before launch",
};

// Granfort Web App is hosted separately. During development the Granfort app
// runs locally on a different port. Replace with the production URL when known.
// TODO: replace with finalized Granfort production URL before launch.
export const granfortDevUrl = "http://localhost:3000";

export const brands = [
  {
    id: "granfort",
    name: "Granfort",
    status: "active" as const,
    href: granfortDevUrl,
    external: true,
  },
  {
    id: "ranieri",
    name: "Ranieri",
    status: "coming-soon" as const,
    href: null,
    external: false,
  },
];

export const tr = {
  meta: {
    title: "Tunera Denizcilik | Kurumsal",
    description:
      "Tunera Denizcilik kurumsal sayfası: marka temsili, tekne satışı, servis koordinasyonu ve müşteri yönlendirme.",
  },
  nav: {
    home: "Ana Sayfa",
    brands: "Markalar",
    contact: "İletişim",
    languageSwitch: "EN",
    languageSwitchHref: "/en",
  },
  home: {
    eyebrow: "Denizcilik",
    title: "Tunera Denizcilik",
    lead: "Marka temsili, tekne satışı ve servis koordinasyonu üzerine çalışan bir denizcilik şirketi.",
    intro:
      "Tunera Denizcilik, temsil ettiği markalara özel resmi sayfaları üzerinden müşterilere ürün, servis ve süreç bilgilerini iletmek üzere yapılandırılmıştır. Bu kurumsal sayfa, ziyaretçileri ilgili marka sayfalarına yönlendirmek için bir başlangıç noktasıdır.",
    ctaPrimary: "Markalara Göz At",
    ctaPrimaryHref: "/tr/markalar",
    ctaSecondary: "İletişim",
    ctaSecondaryHref: "/tr/iletisim",
  },
  about: {
    title: "Kurumsal",
    body: "Tunera Denizcilik, denizcilik alanında marka temsili, tekne satışı ve servis ile bakım koordinasyonu yapar. Müşteri yönlendirmesi resmi marka sayfaları üzerinden sağlanır. Bu sayfa, lansman öncesi geçici bir kurumsal merkez sayfasıdır.",
  },
  brandsSection: {
    title: "Markalar",
    description: "Tunera Denizcilik tarafından yürütülen marka çalışmaları.",
    granfortNote: "Resmi Granfort marka sayfasına yönlendirme.",
    ranieriNote: "Planlanan ayrı marka sayfası. Yakında.",
    statusActive: "Aktif",
    statusComingSoon: "Yakında",
    visit: "Marka sayfası",
    placeholderTag: "Geliştirme bağlantısı",
  },
  services: {
    title: "Hizmetler",
    items: [
      {
        title: "Tekne Satışı",
        body: "Temsil edilen markaların ürünlerinde satış süreci.",
      },
      {
        title: "Marka Temsili",
        body: "Resmi marka temsili ve dağıtım koordinasyonu.",
      },
      {
        title: "Servis ve Bakım Koordinasyonu",
        body: "Servis ve bakım taleplerinin ilgili ekiplere yönlendirilmesi.",
      },
      {
        title: "Denizcilik Çözümleri",
        body: "Müşteri yönlendirme ve süreç bilgilendirmesi.",
      },
    ],
  },
  contactSection: {
    title: "İletişim",
    body: "Detaylar lansman öncesi netleştirilecektir. Resmi iletişim bilgileri ilgili marka sayfaları üzerinden duyurulacaktır.",
    cta: "İletişim Sayfası",
    ctaHref: "/tr/iletisim",
    detailsTitle: "İletişim bilgileri",
    detailsNote: "İletişim bilgileri lansman öncesi netleştirilecektir.",
  },
  footer: {
    rights: "Tüm hakları saklıdır.",
    note: "Bu site lansman öncesi durumdadır.",
  },
};

export const en: typeof tr = {
  meta: {
    title: "Tunera Denizcilik | Corporate",
    description:
      "Tunera Denizcilik corporate page: brand representation, boat sales, service coordination and customer guidance.",
  },
  nav: {
    home: "Home",
    brands: "Brands",
    contact: "Contact",
    languageSwitch: "TR",
    languageSwitchHref: "/tr",
  },
  home: {
    eyebrow: "Marine",
    title: "Tunera Denizcilik",
    lead: "A marine company focused on brand representation, boat sales and service coordination.",
    intro:
      "Tunera Denizcilik directs visitors to the official brand pages it represents, where product, service and process information is communicated. This corporate page is a starting point that routes visitors to the relevant brand pages.",
    ctaPrimary: "View brands",
    ctaPrimaryHref: "/en/brands",
    ctaSecondary: "Contact",
    ctaSecondaryHref: "/en/contact",
  },
  about: {
    title: "Corporate",
    body: "Tunera Denizcilik works on brand representation, boat sales and service and maintenance coordination in the marine sector. Customer guidance is provided through official brand pages. This is a temporary pre-launch corporate hub page.",
  },
  brandsSection: {
    title: "Brands",
    description: "Brand activities operated by Tunera Denizcilik.",
    granfortNote: "Routes to the official Granfort brand page.",
    ranieriNote: "Planned separate brand page. Coming soon.",
    statusActive: "Active",
    statusComingSoon: "Coming soon",
    visit: "Brand page",
    placeholderTag: "Development link",
  },
  services: {
    title: "Services",
    items: [
      {
        title: "Boat sales",
        body: "Sales coordination for the products of represented brands.",
      },
      {
        title: "Brand representation",
        body: "Official brand representation and distribution coordination.",
      },
      {
        title: "Service and maintenance coordination",
        body: "Routing of service and maintenance requests to the relevant teams.",
      },
      {
        title: "Marine solutions",
        body: "Customer guidance and process information.",
      },
    ],
  },
  contactSection: {
    title: "Contact",
    body: "Contact details can be finalized before launch. Official contact information will be announced via the related brand pages.",
    cta: "Contact page",
    ctaHref: "/en/contact",
    detailsTitle: "Contact details",
    detailsNote: "Contact details can be finalized before launch.",
  },
  footer: {
    rights: "All rights reserved.",
    note: "This site is in a pre-launch state.",
  },
};

export function copy(locale: Locale) {
  return locale === "en" ? en : tr;
}
