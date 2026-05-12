import { type BrandImageSlug } from "@/components/ResponsiveBrandImage";
import { company, contact as contactConfig, granfort, offices, ranieri } from "@/config/launch";

export type Locale = "tr" | "en";

/**
 * Per-locale section anchor IDs for the one-page corporate experience.
 * Headers and in-page CTAs link to `/{locale}#{anchors(locale).key}`;
 * the corresponding section element on /{locale} carries that id.
 *
 *   tr  → anasayfa, hakkimizda, markalar, hizmetler, iletisim
 *   en  → home,     about,      brands,   services, contact
 */
export const anchors = (locale: Locale) =>
  locale === "tr"
    ? {
        home: "anasayfa",
        about: "hakkimizda",
        brands: "markalar",
        services: "hizmetler",
        contact: "iletisim",
      }
    : {
        home: "home",
        about: "about",
        brands: "brands",
        services: "services",
        contact: "contact",
      };

export const contact = {
  companyLegal: company.legal,
  companyLegalFull: company.legalFull,
  companyShort: company.short,
  taxOffice: company.taxOffice,
  taxNumber: company.taxNumber,
  mersisNo: company.mersisNo,
  ticaretSicilNo: company.ticaretSicilNo,
  isFinalized: contactConfig.isFinalized,
  email: contactConfig.email,
  offices,
};

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
    menuOpen: "Menüyü aç",
    menuClose: "Menüyü kapat",
  },
  home: {
    eyebrow: "Denizcilik",
    title: "Tunera Denizcilik",
    lead: "Marka temsili, tekne satışı, servis koordinasyonu ve satış sonrası süreçlerde profesyonel denizcilik desteği.",
    heroIllustrationAlt:
      "Editoryal illüstrasyon: gün batımında kıyıda seyir halinde Granfort 3000TX motoryat ve uzakta dağ silüetleri.",
    ctaPrimary: "Markalar",
    ctaPrimaryHref: "/tr/markalar",
    ctaSecondary: "İletişim",
    ctaSecondaryHref: "/tr/iletisim",
    transitionCta: {
      eyebrow: "Sonraki adım",
      title: "Markalar ve iletişim",
      body: "Temsil edilen markaları inceleyebilir veya satış, servis ve yönlendirme süreçleri için doğrudan iletişime geçebilirsiniz.",
      primaryLabel: "Markalar",
      primaryHref: "/tr/markalar",
      secondaryLabel: "İletişim",
      secondaryHref: "/tr/iletisim",
    },
  },
  aboutPage: {
    hero: {
      eyebrow: "Hakkımızda",
      title: "Hakkımızda",
      lead: "Tunera Denizcilik, tekne sahipliği sürecini yalnızca satış anı olarak değil; seçim, teslim, servis, bakım ve satış sonrası takipten oluşan bütünlüklü bir süreç olarak ele alır.",
    },
    story: {
      eyebrow: "Kurumsal",
      paragraphs: [
        "Tunera Denizcilik Ticaret A.Ş., özel denizcilik alanında sahadan gelen tecrübeyi profesyonel bir çalışma yapısıyla buluşturmak üzere kurulmuştur.",
        "Aile ve firma tecrübesinden gelen saha bilgisi, müşteri ihtiyacını anlamaya ve süreci sade tutmaya yönelik bir çalışma biçimine dönüşür.",
        "Yaklaşım; açık iletişim, doğru yönlendirme ve sahadan gelen tecrübeye dayanır. Amaç, müşterinin karar alma sürecini sadeleştirmek ve her adımı daha takip edilebilir hâle getirmektir.",
      ],
    },
    newEra: {
      eyebrow: "Tunera New Era",
      body: "Tunera isminin marka hikâyesindeki karşılığı “yeni dönem” fikridir. Bu yeni dönem; denizcilik süreçlerinde daha açık iletişim, daha doğru yönlendirme ve satış sonrası sorumluluğu merkeze alan bir çalışma anlayışını ifade eder.",
      closingLine:
        "Tunera için satış, teknenin teslim edildiği noktada biten bir işlem değildir. Doğru ürün seçimi, servis koordinasyonu, bakım takibi ve müşterinin süreç boyunca bilgilendirilmesi aynı bütünün parçalarıdır.",
    },
    values: {
      eyebrow: "Değerler",
      title: "Çalışma yaklaşımı",
      description: "Tunera’nın çalışma biçimini şekillendiren dört temel değer.",
      items: [
        {
          title: "Dürüstlük",
          body: "Müşteriye, markaya ve iş ortaklarına aynı bilgiyi açık biçimde aktarmak. Beklentileri gerçekçi tutmak ve sürecin hangi aşamada olduğunu net paylaşmak.",
        },
        {
          title: "Yenilik",
          body: "Sektördeki değişikliklere kendi süreçlerini uyarlamak. Yeni araçları, yeni kullanım biçimlerini ve değişen müşteri beklentilerini çalışma akışına dahil etmek.",
        },
        {
          title: "Profesyonellik",
          body: "Satıştan servise, depolamadan operasyona kadar her adımı planlı ve takip edilebilir tutmak. Sorumluluğu net belirlemek ve süreci müşteriye anlaşılır biçimde anlatmak.",
        },
        {
          title: "Girişimcilik",
          body: "Yeni iş birliklerine açık olmak. Türkiye dışından gelen marka, ürün ve süreç fırsatlarını değerlendirmek; uygunluğunu somut adımlarla test etmek.",
        },
      ],
    },
    team: {
      eyebrow: "Çalışma yapısı",
      title: "Dört işlevsel rol",
      description:
        "Tunera Denizcilik dört temel işlevsel rol etrafında çalışır. Yapı, ekip büyüklüğünden bağımsız olarak müşteriye tutarlı bir süreç sunmaya yöneliktir.",
      items: [
        {
          title: "Yönetim ve Marka İlişkileri",
          body: "Marka iş birlikleri, temsil koşulları ve genel kurumsal yönetim bu rol altında yürütülür.",
        },
        {
          title: "Satış ve Müşteri Yönlendirme",
          body: "Müşteri talebinin ilgili marka ve modele göre değerlendirilmesi ve doğru kanala yönlendirilmesi.",
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
    pageVisual: {
      slug: "about-coastal" as BrandImageSlug,
      imageAlt: "Tunera mavi tekne — Ege kıyısında seyir halinde.",
      kicker: "Çalışma alanı",
      caption:
        "Sahadan gelen tecrübeyi düzenli, takip edilebilir bir çalışma akışına çeviren denizcilik yaklaşımı.",
    },
    scrollStory: {
      eyebrow: "",
      ariaLabel: "Tunera kurumsal hikaye akışı",
      stages: [
        {
          id: "experience-vision",
          kicker: "1 — Tecrübe",
          title: "Sahadan gelen birikim",
          body: "Yıllar içinde edinilen saha bilgisi, müşteriye eşlik eden bir çalışma anlayışına dönüşür.",
        },
        {
          id: "new-era-name",
          kicker: "2 — Adın Anlamı",
          title: "Tunera",
          body: "Tunera isminin marka hikâyesindeki karşılığı “yeni dönem” fikridir; daha açık iletişim, daha doğru yönlendirme ve satış sonrası sorumluluğu merkeze alan bir çalışma anlayışını ifade eder.",
        },
        {
          id: "values",
          kicker: "3 — Değerler",
          title: "Dürüstlük, yenilik, profesyonellik, girişimcilik.",
          body: "Müşteri, marka ve süreç tarafında günlük kararları aynı çizgide tutan dört çıpa.",
        },
        {
          id: "working-structure",
          kicker: "4 — Çalışma Yapısı",
          title: "Dört işlevsel rol",
          body: "Yönetim, satış, servis koordinasyonu ve operasyon süreç takibi.",
        },
        {
          id: "explore",
          kicker: "5 — Devamı",
          title: "Markalar ve İletişim",
          body: "Diğer bölümler için aşağıdaki bağlantılar.",
        },
      ],
    },
    cta: {
      primaryLabel: "Markalar",
      primaryHref: "/tr/markalar",
      secondaryLabel: "İletişim",
      secondaryHref: "/tr/iletisim",
    },
  },
  brandsSection: {
    title: "Markalar",
    description:
      "Tunera Denizcilik, Granfort ve Ranieri markalarının Türkiye distribütörü ve temsilcisidir. Modeller, donanım seçenekleri ve süreç detayları markalara özel web sitelerinden paylaşılır.",
    granfortNote:
      "Granfort motoryat markasının Türkiye temsili Tunera Denizcilik tarafından yürütülür. Markaya özel web sitesi geliştirme aşamasındadır; yayına alındığında bağlantı bu bölümden paylaşılır.",
    ranieriNote:
      "Ranieri markasının Türkiye temsili Tunera Denizcilik tarafından yürütülür. Markaya özel web sitesi planlama aşamasındadır; site hazır olduğunda bağlantı bu bölümden paylaşılır.",
    statusActive: "Aktif",
    statusComingSoon: "Yakında",
    visit: "Marka sayfası",
    placeholderTag: "Geliştirme bağlantısı",
    inPreparation: "Hazırlık aşamasında",
    siteInProgress: "Marka web sitesi geliştirme aşamasında",
    sitePlanned: "Marka web sitesi planlama aşamasında",
    siteComingSoon: "Marka web sitesi yakında",
    transitionCta: {
      eyebrow: "İletişim",
      title: "Marka süreçleri için iletişime geçin",
      body: "Satış, temsilcilik ve marka yönlendirmesi süreçlerinde Tunera Denizcilik ile doğrudan iletişime geçebilirsiniz.",
      primaryLabel: "İletişim",
      primaryHref: "/tr/iletisim",
    },
    pageVisual: {
      slug: "brands-passing" as BrandImageSlug,
      imageAlt:
        "Editoryal illüstrasyon: sakin sularda yan yana geçen iki beyaz motoryat ve uzakta yumuşak günbatımı.",
      kicker: "Türkiye temsilciliği",
      caption: "Granfort ve Ranieri markalarının Türkiye’deki temsil ve distribütörlük noktası.",
    },
    scrollStory: {
      eyebrow: "",
      ariaLabel: "Tunera marka çalışmaları akışı",
      stages: [
        {
          id: "brand-hub",
          kicker: "1 — Türkiye Temsilciliği",
          title: "Granfort ve Ranieri için Türkiye distribütörü",
          body: "Markaya özel içerik, ilgili marka sitelerinde yayına alınır.",
        },
        {
          id: "granfort",
          kicker: "2 — Granfort",
          title: "Granfort — Türkiye temsilciliği",
          body: "Markaya özel web sitesi geliştirme aşamasındadır.",
        },
        {
          id: "ranieri",
          kicker: "3 — Ranieri",
          title: "Ranieri — Türkiye temsilciliği",
          body: "Markaya özel web sitesi planlama aşamasındadır.",
        },
      ],
    },
  },
  servicesPage: {
    hero: {
      eyebrow: "Hizmetler",
      title: "Hizmetler",
      lead: "Tunera Denizcilik; satış, danışmanlık, servis koordinasyonu, römork süreçleri, depolama ve çekek sahası operasyonlarını birbirinden kopuk hizmetler olarak değil, aynı müşteri yolculuğunun parçaları olarak yönetir.",
    },
    modelStripLabel: "Hizmet alanları",
    modelStrip: ["Temsil", "Danışmanlık", "Servis", "Römork", "Depolama", "Operasyon"],
    items: [
      {
        title: "Marka Temsili ve Yeni Tekne Satışı",
        slug: "service-representation" as BrandImageSlug,
        illustrationAlt:
          "Editoryal illüstrasyon: modern bir villa iskelesine yanaşmış yeni bir beyaz motoryat ve sağ ufukta altın bir günbatımı.",
        paragraphs: [
          "Temsil edilen markaların model, kullanım amacı ve satış süreçleri hakkında doğru bilgi aktarımı sağlanır.",
          "Müşterinin ihtiyacı; modelin teknik özellikleri, kullanım biçimi ve teslim koşullarıyla birlikte değerlendirilir.",
          "Çalışma, markanın Türkiye’deki temsilini düzenli bir akışa oturtmayı ve satış sonrası süreçlerin takibini sağlamayı kapsar.",
        ],
        note: null,
      },
      {
        title: "İkinci El Tekne Alım-Satımı ve Danışmanlık",
        slug: "service-advisory" as BrandImageSlug,
        illustrationAlt:
          "Editoryal illüstrasyon: çekek sahası önünde hareket halindeki birkaç motoryat ve arka planda hangar ile travel-lift.",
        paragraphs: [
          "Tekne alım-satım kararlarında kullanım beklentisi, teknik durum ve süreç şeffaflığı birlikte değerlendirilir.",
          "Alıcı ve satıcı tarafı için süreç, açık bilgi paylaşımı üzerine kurulur ve adımları takip edilebilir tutulur.",
        ],
        note: null,
      },
      {
        title: "Servis ve Bakım Koordinasyonu",
        slug: "service-maintenance" as BrandImageSlug,
        illustrationAlt:
          "Editoryal illüstrasyon: modern bir hangarda servis sehpasındaki beyaz bir motoryata eşlik eden iki teknisyen ve arka planda deniz manzarası.",
        paragraphs: [
          "Servis ve bakım süreçlerinde doğru yönlendirme, iş takibi ve müşteriye anlaşılır bilgilendirme esastır.",
          "Yaklaşım, kullanım sürekliliğini gözeterek bakım takvimini ve teknik koordinasyonu düzenli tutar.",
        ],
        note: "Servis kapsamı ve süreleri ilgili marka ve servis ekibi tarafından netleştirilir.",
      },
      {
        title: "Marin Römork Satış ve Satış Sonrası Hizmetleri",
        slug: "service-trailer" as BrandImageSlug,
        illustrationAlt:
          "Editoryal illüstrasyon: marin römork üzerinde beyaz bir motoryat çeken turuncu bir pikap ve sahil yolunda altın bir günbatımı.",
        paragraphs: [
          "Tekne taşıma ve römork süreçlerinde güvenli kullanım, doğru eşleşme ve operasyonel uygunluk dikkate alınır.",
          "Marin tip römork ürünlerinin satışı, kurulumu ve satış sonrası ihtiyaçları aynı süreç içinde takip edilir.",
        ],
        note: null,
      },
      {
        title: "Güvenli Depolama Hizmetleri",
        slug: "service-storage" as BrandImageSlug,
        illustrationAlt:
          "Editoryal illüstrasyon: solda çok katlı tekne depolama rafları, sağda aydınlatılmış modern bir hangar ve önünde forklift ile bekleyen tekneler.",
        paragraphs: [
          "Depolama süreçlerinde teknenin güvenli, düzenli ve erişilebilir şekilde konumlandırılması hedeflenir.",
          "Tesis içi düzen, güvenlik önlemleri ve operasyonel kontrol başlıkları birlikte yürütülür.",
        ],
        note: "Sigorta kapsamı ve koşulları ilgili süreçte ayrıca netleştirilir.",
      },
      {
        title: "Çekek Sahası ve Operasyon Yönetimi",
        slug: "service-yard" as BrandImageSlug,
        illustrationAlt: "Tunera servis tersanesi — travel-lift ile çekiliş ve iskele ekibi.",
        paragraphs: [
          "Çekek, saha ve hazırlık süreçleri; planlama, koordinasyon ve takip disipliniyle yürütülür.",
          "Teknenin karaya alınması, sahada konumlandırılması ve operasyonel akışın güvenli yürütülmesi bu çerçevede ele alınır.",
        ],
        note: null,
      },
    ],
    scrollStory: {
      ariaLabel: "Tunera hizmet alanları",
    },
  },
  contactSection: {
    title: "İletişim",
    body: "Satış, servis, marka yönlendirmesi ve operasyon süreçleriyle ilgili başvurular için Tunera Denizcilik ile doğrudan iletişime geçebilirsiniz.",
    detailsTitle: "İletişim bilgileri",
    mapsTitle: "Konumlar",
    mapsDescription: "Yönetim ofisi ve operasyon tesisinin Google Haritalar konumları.",
    mapsOpenInGoogle: "Google Haritalar'da Aç",
    fieldEmail: "E-posta",
    fieldOfficeManagement: "Yönetim Ofisi",
    fieldOfficeOperations: "Operasyon Tesisi",
    companyInfoTitle: "Firma bilgileri",
    fieldCompanyLegalName: "Ünvan",
    fieldCompanyAddress: "Adres",
    fieldTaxOffice: "Vergi Dairesi",
    fieldTaxNumber: "Vergi No",
    fieldMersisNo: "MERSİS No",
    fieldTicaretSicilNo: "Ticaret Sicil No",
    pageVisual: {
      slug: "contact-horizon" as BrandImageSlug,
      imageAlt:
        "Editoryal illüstrasyon: özel bir iskeleye yanaşmış tek bir beyaz motoryat, kıyıdaki villa ışıkları ve uzakta dingin bir günbatımı.",
      kicker: "İletişim",
      caption: "Satış, servis ve marka süreçleri için tek noktadan ulaşılabilen iletişim noktası.",
    },
    scrollStory: {
      eyebrow: "",
      ariaLabel: "Tunera iletişim akışı",
      stages: [
        {
          id: "status",
          kicker: "1 — Doğrudan İletişim",
          title: "Doğrudan iletişim noktası",
          body: "Başvurular Tunera Denizcilik tarafından doğrudan değerlendirilir; aracı süreç bulunmaz.",
        },
        {
          id: "channels",
          kicker: "2 — Kanallar",
          title: "E-posta ve ofisler",
          body: "info@tunera.com.tr adresine yazabilir, Yönetim Ofisi (Kartal) veya Operasyon Tesisi (Tuzla) bilgilerine bu bölümden ulaşabilirsiniz.",
        },
        {
          id: "explore",
          kicker: "3 — Devamı",
          title: "Markalar ve Hizmetler",
          body: "Diğer bölümler için aşağıdaki bağlantılar.",
        },
      ],
    },
  },
  footer: {
    rights: "Tüm hakları saklıdır.",
    sectionsLabel: "Bölümler",
    contactLabel: "İletişim",
    companyLabel: "Firma",
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
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
  home: {
    eyebrow: "Marine",
    title: "Tunera Denizcilik",
    lead: "A marine company supporting customers through brand representation, boat sales, service coordination and after-sales follow-up.",
    heroIllustrationAlt:
      "Editorial illustration — Granfort 3000TX motoryacht cruising along the coast at sunset with distant mountain silhouettes.",
    ctaPrimary: "Brands",
    ctaPrimaryHref: "/en/brands",
    ctaSecondary: "Contact",
    ctaSecondaryHref: "/en/contact",
    transitionCta: {
      eyebrow: "Next step",
      title: "Brands and contact",
      body: "Explore the represented brands or contact Tunera directly for sales, service and guidance processes.",
      primaryLabel: "Brands",
      primaryHref: "/en/brands",
      secondaryLabel: "Contact",
      secondaryHref: "/en/contact",
    },
  },
  aboutPage: {
    hero: {
      eyebrow: "About",
      title: "About",
      lead: "Tunera Denizcilik approaches boat ownership as a complete process: selection, sales, delivery, service coordination and after-sales follow-up — not as a single point of purchase.",
    },
    story: {
      eyebrow: "Corporate",
      paragraphs: [
        "Tunera Denizcilik Ticaret A.Ş. was set up to bring field-earned marine experience together with a professional working structure.",
        "The field knowledge that comes from family and company experience is shaped into a way of working that focuses on understanding the customer’s need and keeping the process simple.",
        "The approach rests on open communication, accurate guidance and field experience. The aim is to simplify the customer’s decision-making and keep every step easier to follow.",
      ],
    },
    newEra: {
      eyebrow: "Tunera New Era",
      body: "The “new era” idea in the Tunera name describes a different way of working in marine: clearer communication, sharper guidance and after-sales responsibility kept at the centre of the process.",
      closingLine:
        "For Tunera, a sale does not end at the moment of delivery. Choosing the right product, coordinating service, following up on maintenance and keeping the customer informed are all parts of the same whole.",
    },
    values: {
      eyebrow: "Values",
      title: "How Tunera works",
      description: "Four working values that shape how Tunera approaches its work.",
      items: [
        {
          title: "Honesty",
          body: "Sharing the same information openly with customers, brands and partners. Keeping expectations realistic and saying clearly which stage the process is in.",
        },
        {
          title: "Adaptation",
          body: "Adapting internal processes to changes in the sector. Bringing new tools, new usage patterns and shifting customer expectations into the working flow.",
        },
        {
          title: "Professionalism",
          body: "Keeping every step planned and trackable, from sales through service, storage and operations. Assigning responsibility clearly and explaining the process to the customer in plain terms.",
        },
        {
          title: "Initiative",
          body: "Staying open to new partnerships. Reviewing brand, product and process opportunities from outside Türkiye, and testing fit through concrete steps.",
        },
      ],
    },
    team: {
      eyebrow: "Working structure",
      title: "Four functional roles",
      description:
        "Tunera Denizcilik works around four functional roles. The structure is independent of headcount and is meant to give customers a consistent process.",
      items: [
        {
          title: "Management & Brand Relations",
          body: "Brand partnerships, representation terms and overall corporate management sit under this role.",
        },
        {
          title: "Sales & Customer Guidance",
          body: "Customer requests are reviewed by brand and model and routed to the correct channel.",
        },
        {
          title: "Service & Maintenance Coordination",
          body: "Service and maintenance requests are followed up with the relevant technical teams.",
        },
        {
          title: "Operations & Process Follow-up",
          body: "General operations, document flow and process updates run through this role.",
        },
      ],
    },
    pageVisual: {
      slug: "about-coastal" as BrandImageSlug,
      imageAlt: "Tunera blue runabout cruising along the Aegean coast.",
      kicker: "Working area",
      caption: "Field experience translated into an orderly, trackable working flow in marine.",
    },
    scrollStory: {
      eyebrow: "",
      ariaLabel: "Tunera corporate story flow",
      stages: [
        {
          id: "experience-vision",
          kicker: "1 — Experience",
          title: "Working knowledge from the field",
          body: "Years of marine experience translate into a way of working that stays close to the customer.",
        },
        {
          id: "new-era-name",
          kicker: "2 — Meaning of the name",
          title: "Tunera",
          body: "The Tunera name carries a “new era” idea — clearer communication, sharper guidance and after-sales responsibility kept at the centre of the process.",
        },
        {
          id: "values",
          kicker: "3 — Values",
          title: "Honesty, adaptation, professionalism, initiative.",
          body: "Four anchors that keep customer, brand and process decisions on the same line day to day.",
        },
        {
          id: "working-structure",
          kicker: "4 — Working Structure",
          title: "Four functional roles",
          body: "Management, sales, service coordination and operations follow-up.",
        },
        {
          id: "explore",
          kicker: "5 — More",
          title: "Brands & Contact",
          body: "Use the links below to jump to the related sections.",
        },
      ],
    },
    cta: {
      primaryLabel: "Brands",
      primaryHref: "/en/brands",
      secondaryLabel: "Contact",
      secondaryHref: "/en/contact",
    },
  },
  brandsSection: {
    title: "Brands",
    description:
      "Tunera Denizcilik is the Türkiye distributor and representative for Granfort and Ranieri. Models, equipment options and process detail are shared on each brand’s dedicated site.",
    granfortNote:
      "Türkiye representation for the Granfort motoryacht brand is handled by Tunera Denizcilik. The brand’s dedicated website is in development; the link will be shared here once it goes live.",
    ranieriNote:
      "Türkiye representation for Ranieri is handled by Tunera Denizcilik. The brand’s dedicated website is in planning; the link will be shared here once it is ready.",
    statusActive: "Active",
    statusComingSoon: "Coming soon",
    visit: "Brand page",
    placeholderTag: "Development link",
    inPreparation: "In preparation",
    siteInProgress: "Brand website in development",
    sitePlanned: "Brand website in planning",
    siteComingSoon: "Brand website coming soon",
    transitionCta: {
      eyebrow: "Contact",
      title: "Contact us for brand-related processes",
      body: "For sales, representation and brand-guidance topics, reach Tunera Denizcilik directly.",
      primaryLabel: "Contact",
      primaryHref: "/en/contact",
    },
    pageVisual: {
      slug: "brands-passing" as BrandImageSlug,
      imageAlt:
        "Editorial illustration — two white motoryachts passing each other on calm water with a soft sunset behind.",
      kicker: "Türkiye representation",
      caption: "Türkiye representation and distribution point for Granfort and Ranieri.",
    },
    scrollStory: {
      eyebrow: "",
      ariaLabel: "Tunera brand work flow",
      stages: [
        {
          id: "brand-hub",
          kicker: "1 — Türkiye representation",
          title: "Türkiye distributor for Granfort and Ranieri",
          body: "Brand-specific content lives on each brand’s dedicated site.",
        },
        {
          id: "granfort",
          kicker: "2 — Granfort",
          title: "Granfort — Türkiye representation",
          body: "The dedicated brand website is in development.",
        },
        {
          id: "ranieri",
          kicker: "3 — Ranieri",
          title: "Ranieri — Türkiye representation",
          body: "The dedicated brand website is in planning.",
        },
      ],
    },
  },
  servicesPage: {
    hero: {
      eyebrow: "Services",
      title: "Services",
      lead: "Tunera Denizcilik runs sales, advisory, service coordination, trailer work, storage and yard operations as parts of the same customer journey, not as disconnected services.",
    },
    modelStripLabel: "Working areas",
    modelStrip: ["Representation", "Advisory", "Service", "Trailer", "Storage", "Operations"],
    items: [
      {
        title: "Brand Representation & New Boat Sales",
        slug: "service-representation" as BrandImageSlug,
        illustrationAlt:
          "Editorial illustration of a new white motoryacht moored at a modern villa private dock with a golden sunset on the right horizon.",
        paragraphs: [
          "Models, intended use and the sales process for represented brands are explained with accurate, first-hand information.",
          "The customer’s need is reviewed alongside the model’s technical specs, usage pattern and delivery conditions.",
          "The work covers steady representation of the brand in Türkiye and follow-up of after-sales steps.",
        ],
        note: null,
      },
      {
        title: "Pre-Owned Boat Sales & Advisory",
        slug: "service-advisory" as BrandImageSlug,
        illustrationAlt:
          "Editorial illustration of several motoryachts moving in front of a marine yard, with hangars and a travel-lift gantry in the background.",
        paragraphs: [
          "Buying and selling decisions are weighed against intended use, technical condition and process transparency.",
          "Both buyer and seller see a process built on open information sharing, with each step kept easy to follow.",
        ],
        note: null,
      },
      {
        title: "Service & Maintenance Coordination",
        slug: "service-maintenance" as BrandImageSlug,
        illustrationAlt:
          "Editorial illustration of a white motoryacht on a service stand inside a modern hangar, with two technicians attending the boat and a sea view through the opening.",
        paragraphs: [
          "In service and maintenance work, accurate guidance, task follow-up and clear customer updates are the basics.",
          "The approach watches continuity of use and keeps the maintenance schedule and technical coordination orderly.",
        ],
        note: "Service scope and timelines are clarified by the relevant brand and service team.",
      },
      {
        title: "Marine Trailer Sales & After-Sales Support",
        slug: "service-trailer" as BrandImageSlug,
        illustrationAlt:
          "Editorial illustration of an orange pickup truck towing a white motoryacht on a marine trailer along a coastal road at golden hour.",
        paragraphs: [
          "Boat transport and trailer work are handled with safe use, correct pairing and operational fit in mind.",
          "Sales, fitting and after-sales needs for marine-type trailer products are followed through the same process.",
        ],
        note: null,
      },
      {
        title: "Secure Storage Services",
        slug: "service-storage" as BrandImageSlug,
        illustrationAlt:
          "Editorial illustration of a marine storage yard — multi-level boat racks on the left, a lit modern hangar on the right with a forklift and stored vessels in front.",
        paragraphs: [
          "Storage is set up so the boat is positioned safely, in order, and easy to access.",
          "Facility layout, security measures and operational control are run together.",
        ],
        note: "Insurance scope and conditions are clarified separately within the relevant process.",
      },
      {
        title: "Yard & Haul-Out Operations Management",
        slug: "service-yard" as BrandImageSlug,
        illustrationAlt:
          "Tunera service yard — boat hauled by travel lift with the dock crew at work.",
        paragraphs: [
          "Yard, site and preparation work is run with planning, coordination and follow-up discipline.",
          "Hauling the boat out, positioning it on site and running the operational flow safely sit within this scope.",
        ],
        note: null,
      },
    ],
    scrollStory: {
      ariaLabel: "Tunera service areas",
    },
  },
  contactSection: {
    title: "Contact",
    body: "Reach Tunera Denizcilik directly for sales, service, brand representation and operational enquiries.",
    detailsTitle: "Contact details",
    mapsTitle: "Locations",
    mapsDescription: "Google Maps locations for the management office and the operations facility.",
    mapsOpenInGoogle: "Open in Google Maps",
    fieldEmail: "Email",
    fieldOfficeManagement: "Management Office",
    fieldOfficeOperations: "Operations Facility",
    companyInfoTitle: "Company information",
    fieldCompanyLegalName: "Legal name",
    fieldCompanyAddress: "Address",
    fieldTaxOffice: "Tax office",
    fieldTaxNumber: "Tax number",
    fieldMersisNo: "MERSIS no.",
    fieldTicaretSicilNo: "Trade registry no.",
    pageVisual: {
      slug: "contact-horizon" as BrandImageSlug,
      imageAlt:
        "Editorial illustration — a single white motoryacht moored at a private dock beside a cliffside villa with dock lights and a calm distant sunset.",
      kicker: "Contact",
      caption: "A single point of contact across sales, service and brand topics.",
    },
    scrollStory: {
      eyebrow: "",
      ariaLabel: "Tunera contact flow",
      stages: [
        {
          id: "status",
          kicker: "1 — Direct contact",
          title: "Direct point of contact",
          body: "Enquiries are reviewed by Tunera Denizcilik directly, with no intermediary step.",
        },
        {
          id: "channels",
          kicker: "2 — Channels",
          title: "Email and offices",
          body: "Write to info@tunera.com.tr, or reach the Management Office (Kartal) and Operations Facility (Tuzla) listed in this section.",
        },
        {
          id: "explore",
          kicker: "3 — More",
          title: "Brands & Services",
          body: "Use the links below to jump to the related sections.",
        },
      ],
    },
  },
  footer: {
    rights: "All rights reserved.",
    sectionsLabel: "Sections",
    contactLabel: "Contact",
    companyLabel: "Company",
  },
};

export function copy(locale: Locale) {
  return locale === "en" ? en : tr;
}
