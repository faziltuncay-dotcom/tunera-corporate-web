import { company, contact as contactConfig, granfort, ranieri } from "@/config/launch";

export type Locale = "tr" | "en";

/**
 * Convenience export: keep prior `contact` shape used across components,
 * but source values from the central launch config. UI components should
 * branch on `contact.isFinalized` rather than parse placeholder strings.
 */
export const contact = {
  companyLegal: company.legal,
  companyShort: company.short,
  isFinalized: contactConfig.isFinalized,
  email: contactConfig.email,
  phone: contactConfig.phone,
  address: contactConfig.address,
};

// Granfort URL is read from the central launch config.
export const granfortUrl = granfort.url;
export const granfortIsProduction = granfort.isProduction;

export const brands = [
  {
    id: "granfort",
    name: "Granfort",
    status: "active" as const,
    href: granfort.url,
    external: true,
    isProduction: granfort.isProduction,
  },
  {
    id: "ranieri",
    name: "Ranieri",
    status: "coming-soon" as const,
    href: ranieri.url,
    external: false,
    isProduction: false,
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
    about: "Hakkımızda",
    brands: "Markalar",
    services: "Hizmetler",
    contact: "İletişim",
    languageSwitch: "EN",
    languageSwitchHref: "/en",
    languageSwitchAria: "İngilizce sayfaya geç",
    skipToContent: "İçeriğe geç",
    primaryAria: "Ana gezinti",
  },
  home: {
    eyebrow: "Denizcilik",
    title: "Tunera Denizcilik",
    lead: "Marka temsili, tekne satışı ve servis koordinasyonu üzerine çalışan bir denizcilik şirketi.",
    intro:
      "Tunera Denizcilik, temsil ettiği markaların sayfaları üzerinden müşterilere ürün, servis ve süreç bilgilerini iletmek üzere yapılandırılmıştır. Bu kurumsal sayfa, ziyaretçileri ilgili marka sayfalarına yönlendirmek için bir başlangıç noktasıdır.",
    ctaPrimary: "Markalara Göz At",
    ctaPrimaryHref: "/tr/markalar",
    ctaSecondary: "İletişim",
    ctaSecondaryHref: "/tr/iletisim",
  },
  about: {
    title: "Kurumsal",
    body: "Tunera Denizcilik, denizcilik alanında marka temsili, tekne satışı ve servis ile bakım koordinasyonu yapar. Müşteri yönlendirmesi marka sayfaları üzerinden sağlanır. Bu sayfa, lansman öncesi geçici bir kurumsal merkez sayfasıdır.",
  },
  aboutPage: {
    hero: {
      eyebrow: "Hakkımızda",
      title: "Hakkımızda",
      lead: "Tunera Denizcilik; marka temsili, tekne satışı, servis ve bakım yönlendirmesi ile müşteri süreç koordinasyonu üzerine çalışan bir denizcilik şirketidir.",
    },
    profile: {
      eyebrow: "Kurumsal Profil",
      title: "Kurumsal Profil",
      body: "Tunera Denizcilik Ticaret A.Ş., denizcilik alanında marka temsili, tekne satışı ve servis süreçlerinin koordinasyonu üzerine çalışan bir yapıdır. Çalışma yaklaşımı, temsil edilen markaların sayfaları üzerinden müşteriye doğru bilgi ve süreç akışını sağlamak üzerine kuruludur.",
    },
    principles: {
      eyebrow: "Çalışma İlkeleri",
      title: "Çalışma İlkeleri",
      items: [
        {
          title: "Net Yönlendirme",
          body: "Müşteriler, ihtiyaçlarına göre ilgili marka sayfasına ve doğru muhataba açıkça yönlendirilir.",
        },
        {
          title: "Marka Odaklı İletişim",
          body: "Ürün ve süreç iletişimi, temsil edilen markaların kendi kanalları üzerinden yürütülür.",
        },
        {
          title: "Süreç Takibi",
          body: "Satış, servis ve bakım talepleri ilgili ekiplere iletilir ve süreç başından sonuna kadar izlenir.",
        },
        {
          title: "Sade ve Güvenilir Bilgi Akışı",
          body: "Bilgilendirme, abartısız ve doğrulanabilir biçimde sunulur.",
        },
      ],
    },
    team: {
      eyebrow: "Kadro",
      title: "Kadro ve Çalışma Yapısı",
      description:
        "Tunera Denizcilik, dört temel işlevsel rol etrafında çalışır. Bu yapı, ekip büyüklüğünden bağımsız olarak, müşteriye tutarlı bir süreç sunmayı amaçlar.",
      items: [
        {
          title: "Yönetim ve Marka İlişkileri",
          body: "Marka iş birlikleri, temsil koşulları ve genel kurumsal yönetim bu rol altında yürütülür.",
        },
        {
          title: "Satış ve Müşteri Yönlendirme",
          body: "Müşteri taleplerinin ilgili marka ve modele göre değerlendirilmesi ve doğru kanala yönlendirilmesi.",
        },
        {
          title: "Servis ve Bakım Koordinasyonu",
          body: "Servis ve bakım taleplerinin ilgili teknik ekiplerle koordineli biçimde takibi.",
        },
        {
          title: "Operasyon ve Süreç Takibi",
          body: "Genel operasyon, evrak akışı ve süreç bilgilendirmesinin düzenli yürütülmesi.",
        },
      ],
    },
    cta: {
      title: "Devamı için",
      body: "Markalar ve iletişim sayfaları, çalışma alanlarımıza dair daha fazla ayrıntı sunar.",
      primaryLabel: "Markalar",
      primaryHref: "/tr/markalar",
      secondaryLabel: "İletişim",
      secondaryHref: "/tr/iletisim",
    },
  },
  brandsSection: {
    title: "Markalar",
    description: "Tunera Denizcilik tarafından yürütülen marka çalışmaları.",
    granfortNote:
      "Granfort marka sayfası ayrı bir uygulamadır. Bağlantı şu anda geliştirme ortamına yönlendirir.",
    ranieriNote: "Planlanan ayrı marka sayfası. Yakında.",
    statusActive: "Aktif",
    statusComingSoon: "Yakında",
    visit: "Marka sayfası",
    placeholderTag: "Geliştirme bağlantısı",
    inPreparation: "Hazırlık aşamasında",
  },
  services: {
    title: "Hizmetler",
    items: [
      {
        title: "Tekne Satışı",
        body: "Temsil edilen markaların ürünlerinde satış süreci.",
      },
      {
        title: "Marka Temsilciliği",
        body: "Marka temsili ve dağıtım süreçlerinin koordinasyonu.",
      },
      {
        title: "Servis ve Bakım Yönlendirmesi",
        body: "Servis ve bakım taleplerinin ilgili ekiplere yönlendirilmesi.",
      },
      {
        title: "Müşteri Yönlendirme ve Süreç Koordinasyonu",
        body: "Süreç bilgilendirmesi ve marka sayfalarına yönlendirme.",
      },
    ],
  },
  servicesPage: {
    hero: {
      eyebrow: "Hizmetler",
      title: "Hizmetler",
      lead: "Tunera Denizcilik'in çalışma alanları; satış, marka temsilciliği, servis yönlendirmesi ve müşteri süreç koordinasyonu.",
    },
    items: [
      {
        title: "Tekne Satışı",
        body: "Tunera Denizcilik, temsil ettiği markaların ürünleri hakkında müşterilere yönlendirme sağlar ve satış sürecinin ilgili marka kanallarıyla ilerlemesine destek olur.",
        note: "Fiyat, stok ve teslimat bilgileri ilgili marka sayfaları üzerinden iletilir.",
      },
      {
        title: "Marka Temsilciliği",
        body: "Temsil edilen markalar adına müşteri iletişimi, sürecin başlangıç noktası ve doğru kanala yönlendirme bu rol altında yürütülür.",
        note: null,
      },
      {
        title: "Servis ve Bakım Yönlendirmesi",
        body: "Servis ve bakım talepleri, ilgili teknik ekiplere iletilir ve süreç müşteri ile koordineli biçimde takip edilir.",
        note: "Servis kapsamı ve süreleri ilgili marka ve servis ekibi tarafından belirlenir.",
      },
      {
        title: "Müşteri Yönlendirme ve Süreç Koordinasyonu",
        body: "Müşteri talepleri, doğru marka ve doğru muhatap ile eşleştirilir; süreç akışı baştan sona izlenir.",
        note: null,
      },
    ],
    cta: {
      title: "İlgili sayfalar",
      body: "Markalar ve iletişim sayfaları üzerinden süreçleri başlatabilirsiniz.",
      primaryLabel: "Markalar",
      primaryHref: "/tr/markalar",
      secondaryLabel: "İletişim",
      secondaryHref: "/tr/iletisim",
    },
  },
  homeTeamPreview: {
    eyebrow: "Kadro",
    title: "Kadro ve Çalışma Yapısı",
    description:
      "Tunera Denizcilik dört temel işlevsel rol etrafında çalışır. Detaylı yapı için Hakkımızda sayfasına göz atabilirsiniz.",
    cta: "Hakkımızda",
    ctaHref: "/tr/hakkimizda",
  },
  contactSection: {
    title: "İletişim",
    body: "Detaylar lansman öncesi netleştirilecektir. İletişim bilgileri ilgili marka sayfaları üzerinden duyurulacaktır.",
    cta: "İletişim Sayfası",
    ctaHref: "/tr/iletisim",
    detailsTitle: "İletişim bilgileri",
    detailsNote: "İletişim bilgileri lansman öncesi netleştirilecektir.",
    fieldEmail: "E-posta",
    fieldPhone: "Telefon",
    fieldAddress: "Adres",
    toBeAnnounced: "Lansman öncesi paylaşılacak",
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
    about: "About",
    brands: "Brands",
    services: "Services",
    contact: "Contact",
    languageSwitch: "TR",
    languageSwitchHref: "/tr",
    languageSwitchAria: "Switch to Turkish site",
    skipToContent: "Skip to content",
    primaryAria: "Primary navigation",
  },
  home: {
    eyebrow: "Marine",
    title: "Tunera Denizcilik",
    lead: "A marine company focused on brand representation, boat sales and service coordination.",
    intro:
      "Tunera Denizcilik directs visitors to the brand pages it represents, where product, service and process information is communicated. This corporate page is a starting point that routes visitors to the relevant brand pages.",
    ctaPrimary: "View brands",
    ctaPrimaryHref: "/en/brands",
    ctaSecondary: "Contact",
    ctaSecondaryHref: "/en/contact",
  },
  about: {
    title: "Corporate",
    body: "Tunera Denizcilik works on brand representation, boat sales and service and maintenance coordination in the marine sector. Customer guidance is provided through brand pages. This is a temporary pre-launch corporate hub page.",
  },
  aboutPage: {
    hero: {
      eyebrow: "About",
      title: "About Tunera",
      lead: "Tunera Denizcilik is a marine company focused on brand representation, boat sales, service and maintenance routing, and customer process coordination.",
    },
    profile: {
      eyebrow: "Corporate profile",
      title: "Corporate profile",
      body: "Tunera Denizcilik Ticaret A.Ş. is a marine-sector company focused on brand representation, boat sales, and service-process coordination. The working approach is built around delivering accurate information and process flow to customers via the channels of the represented brands.",
    },
    principles: {
      eyebrow: "Working principles",
      title: "Working principles",
      items: [
        {
          title: "Clear guidance",
          body: "Customers are routed clearly to the relevant brand page and the correct point of contact for their needs.",
        },
        {
          title: "Brand-focused communication",
          body: "Product and process communication runs through the channels of the represented brands.",
        },
        {
          title: "Process follow-up",
          body: "Sales, service, and maintenance requests are passed to the relevant teams and tracked end-to-end.",
        },
        {
          title: "Simple and reliable information flow",
          body: "Information is shared in a measured, verifiable way without overstatement.",
        },
      ],
    },
    team: {
      eyebrow: "Team",
      title: "Team & Working Structure",
      description:
        "Tunera Denizcilik operates around four functional roles. The structure is independent of headcount and is designed to give customers a consistent process.",
      items: [
        {
          title: "Management & Brand Relations",
          body: "Brand partnerships, representation terms, and overall corporate management are handled under this role.",
        },
        {
          title: "Sales & Customer Guidance",
          body: "Customer requests are evaluated by brand and model and routed to the correct channel.",
        },
        {
          title: "Service & Maintenance Coordination",
          body: "Service and maintenance requests are followed up in coordination with the relevant technical teams.",
        },
        {
          title: "Operations & Process Follow-up",
          body: "General operations, document flow, and process communication run through this role.",
        },
      ],
    },
    cta: {
      title: "More to explore",
      body: "The brands and contact pages provide further detail on our working areas.",
      primaryLabel: "Brands",
      primaryHref: "/en/brands",
      secondaryLabel: "Contact",
      secondaryHref: "/en/contact",
    },
  },
  brandsSection: {
    title: "Brands",
    description: "Brand activities operated by Tunera Denizcilik.",
    granfortNote:
      "The Granfort brand page is a separate application. The link currently routes to the development environment.",
    ranieriNote: "Planned separate brand page. Coming soon.",
    statusActive: "Active",
    statusComingSoon: "Coming soon",
    visit: "Brand page",
    placeholderTag: "Development link",
    inPreparation: "In preparation",
  },
  services: {
    title: "Services",
    items: [
      {
        title: "Boat Sales",
        body: "Sales coordination for the products of represented brands.",
      },
      {
        title: "Brand Representation",
        body: "Brand representation and distribution-process coordination.",
      },
      {
        title: "Service & Maintenance Coordination",
        body: "Routing of service and maintenance requests to the relevant teams.",
      },
      {
        title: "Customer Guidance & Process Coordination",
        body: "Process information and routing to brand pages.",
      },
    ],
  },
  servicesPage: {
    hero: {
      eyebrow: "Services",
      title: "Services",
      lead: "Tunera Denizcilik's working areas: sales, brand representation, service routing, and customer process coordination.",
    },
    items: [
      {
        title: "Boat Sales",
        body: "Tunera Denizcilik helps customers navigate represented brands and supports the sales process through the relevant brand channels.",
        note: "Pricing, stock, and delivery information are communicated via the related brand pages.",
      },
      {
        title: "Brand Representation",
        body: "Customer communication on behalf of represented brands, the entry point of the process, and routing to the correct channel are handled here.",
        note: null,
      },
      {
        title: "Service & Maintenance Coordination",
        body: "Service and maintenance requests are passed to the relevant technical teams and followed up in coordination with the customer.",
        note: "Service scope and timelines are determined by the relevant brand and service team.",
      },
      {
        title: "Customer Guidance & Process Coordination",
        body: "Customer requests are matched with the right brand and the right point of contact; the process is tracked end-to-end.",
        note: null,
      },
    ],
    cta: {
      title: "Related pages",
      body: "You can start a process via the brands or contact pages.",
      primaryLabel: "Brands",
      primaryHref: "/en/brands",
      secondaryLabel: "Contact",
      secondaryHref: "/en/contact",
    },
  },
  homeTeamPreview: {
    eyebrow: "Team",
    title: "Team & Working Structure",
    description:
      "Tunera Denizcilik operates around four functional roles. See the About page for the full structure.",
    cta: "About",
    ctaHref: "/en/about",
  },
  contactSection: {
    title: "Contact",
    body: "Contact details will be finalized before launch. Contact information will be announced via the related brand pages.",
    cta: "Contact page",
    ctaHref: "/en/contact",
    detailsTitle: "Contact details",
    detailsNote: "Contact details will be finalized before launch.",
    fieldEmail: "Email",
    fieldPhone: "Phone",
    fieldAddress: "Address",
    toBeAnnounced: "To be shared before launch",
  },
  footer: {
    rights: "All rights reserved.",
    note: "This site is in a pre-launch state.",
  },
};

export function copy(locale: Locale) {
  return locale === "en" ? en : tr;
}
