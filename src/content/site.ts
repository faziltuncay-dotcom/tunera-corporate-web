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
  },
  home: {
    eyebrow: "Denizcilik",
    title: "Tunera Denizcilik",
    lead: "Marka temsili, tekne satışı ve servis koordinasyonu üzerine çalışan bir denizcilik şirketi.",
    heroIllustrationAlt:
      "Editoryal illüstrasyon: altın bir günbatımına doğru ilerleyen tek bir beyaz motoryat, sakin deniz ve uzakta dağ silüetleri.",
    ctaPrimary: "Markaları Gör",
    ctaPrimaryHref: "/tr#markalar",
    ctaSecondary: "İletişim",
    ctaSecondaryHref: "/tr#iletisim",
  },
  aboutPage: {
    hero: {
      eyebrow: "Hakkımızda",
      title: "Hakkımızda",
      lead: "Tunera Denizcilik; marka temsili, tekne satışı, servis ve bakım koordinasyonu ile satış sonrası süreçlerin takibi üzerine çalışan bir denizcilik şirketidir.",
    },
    story: {
      eyebrow: "Kurumsal",
      paragraphs: [
        "Tunera Denizcilik Ticaret A.Ş., özel denizcilik, tekne ve motoryat alanında müşteriye eşlik etmek üzere kurulmuş bir şirkettir.",
        "Aile ve firma tecrübesinden gelen saha bilgisi, Tunera çatısı altında müşteri ihtiyacını anlamaya ve süreci sade tutmaya yönelik bir çalışma biçimine dönüşür.",
        "Şirket; marka temsili, satış danışmanlığı, satış sonrası süreç takibi, servis koordinasyonu, depolama ve operasyonel denizcilik konularını tek noktada toplayan bir kurumsal yönlendirme merkezi olarak çalışır.",
        "Hedef, müşterinin doğru marka ve doğru süreçle buluşmasına yardımcı olmak ve süreç boyunca bilgiyi açık tutmaktır.",
      ],
    },
    newEra: {
      eyebrow: "Adın Anlamı",
      body: "Adında taşıdığı “new era” fikri Tunera için süreçleri daha açık, ilişkileri daha düzenli ve müşteri tarafına bilgi akışını daha net tutmak anlamına gelir.",
      closingLine: "Hedef, denizcilik süreçlerini sade ve takip edilebilir biçimde yürütmektir.",
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
      imageAlt:
        "Editoryal illüstrasyon: dingin bir koy üzerinde ilerleyen tek bir beyaz motoryat ve uzakta yumuşak ışıklı dağlar.",
      kicker: "Çalışma alanı",
      caption: "Tekne sahibinin satış, servis ve marka tarafıyla temasını tek noktadan yürütür.",
    },
    scrollStory: {
      eyebrow: "Akış",
      ariaLabel: "Tunera kurumsal hikaye akışı",
      stages: [
        {
          id: "experience-vision",
          kicker: "01 — Tecrübe",
          title: "Sahadan gelen birikim",
          body: "Aile ve firma tecrübesi, müşteri ihtiyacını anlamaya ve süreci sade tutmaya yönelik bir çalışma biçimine dönüşür.",
        },
        {
          id: "new-era-name",
          kicker: "02 — Adın Anlamı",
          title: "Açık iletişim, düzenli süreç",
          body: "İletişimi açık, süreci düzenli ve marka ilişkisini takip edilebilir tutmaya yönelik bir çalışma anlayışı.",
        },
        {
          id: "values",
          kicker: "03 — Değerler",
          title: "Dürüstlük, yenilik, profesyonellik, girişimcilik.",
          body: "Çalışma biçimini şekillendiren dört temel değer.",
        },
        {
          id: "working-structure",
          kicker: "04 — Çalışma Yapısı",
          title: "Dört işlevsel rol",
          body: "Yönetim, satış, servis koordinasyonu ve operasyon süreç takibi.",
        },
        {
          id: "explore",
          kicker: "05 — Devamı",
          title: "Markalara ve iletişime geçiş",
          body: "Çalışma alanlarımıza dair daha fazla ayrıntı için ilgili bölümler.",
        },
      ],
    },
    cta: {
      primaryLabel: "Markalar",
      primaryHref: "/tr#markalar",
      secondaryLabel: "İletişim",
      secondaryHref: "/tr#iletisim",
    },
  },
  brandsSection: {
    title: "Markalar",
    description:
      "Tunera Denizcilik, Granfort ve Ranieri markalarının Türkiye distribütörü ve temsilcisidir. Markalara dair detaylı içerik ilgili marka sayfalarında yer alacaktır.",
    granfortNote:
      "Granfort, Tunera Denizcilik’in Türkiye’de temsil ettiği motoryat markasıdır. Markaya özel web sitesi geliştirme aşamasındadır; modeller, donanım ve süreç detayları yayına alındığında bu bölümden ulaşılabilir olacaktır.",
    ranieriNote:
      "Ranieri, Tunera Denizcilik’in Türkiye’de temsil ettiği bir diğer markadır. Markaya özel web sitesi planlama aşamasındadır; site yayına alındığında bağlantı bu bölümden paylaşılır.",
    statusActive: "Aktif",
    statusComingSoon: "Yakında",
    visit: "Marka sayfası",
    placeholderTag: "Geliştirme bağlantısı",
    inPreparation: "Hazırlık aşamasında",
    siteInProgress: "Marka web sitesi geliştirme aşamasında",
    sitePlanned: "Marka web sitesi planlama aşamasında",
    pageVisual: {
      slug: "brands-passing" as BrandImageSlug,
      imageAlt:
        "Editoryal illüstrasyon: sakin sularda yan yana geçen iki beyaz motoryat ve uzakta yumuşak günbatımı.",
      kicker: "Türkiye temsilciliği",
      caption: "Granfort ve Ranieri markalarının Türkiye’deki temsil ve distribütörlük noktası.",
    },
    scrollStory: {
      eyebrow: "Akış",
      ariaLabel: "Tunera marka çalışmaları akışı",
      stages: [
        {
          id: "brand-hub",
          kicker: "01 — Türkiye Temsilciliği",
          title: "Granfort ve Ranieri için Türkiye distribütörü",
          body: "Tunera Denizcilik, Granfort ve Ranieri markalarının Türkiye distribütörü ve temsilcisidir. Detaylı bilgi ilgili marka sayfalarında yayına alınacaktır.",
        },
        {
          id: "granfort",
          kicker: "02 — Granfort",
          title: "Granfort — Türkiye temsilciliği",
          body: "Modeller, donanım seçenekleri ve satın alma süreci için markaya özel web sitesi hazırlanmaktadır. Yayına alındığında bağlantı bu bölümden paylaşılır.",
        },
        {
          id: "ranieri",
          kicker: "03 — Ranieri",
          title: "Ranieri — Türkiye temsilciliği",
          body: "Ranieri için ayrı marka web sitesi planlama aşamasındadır. Bilgiler hazır olduğunda bu bölümden duyurulur.",
        },
      ],
    },
  },
  servicesPage: {
    hero: {
      eyebrow: "Hizmetler",
      title: "Hizmetler",
      lead: "Marka temsili, satış, servis koordinasyonu, römork süreçleri, depolama ve çekek sahası operasyonları altı çalışma alanı olarak yürütülür.",
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
          "Yurt dışında bilinirlik kazanmış tekne ve motoryat markalarının Türkiye’deki satış ve satış sonrası süreçleri Tunera tarafından yürütülür.",
          "Müşterinin doğru marka, doğru model ve doğru kullanım biçimine ulaşması için ürün tanıtımı, satış yönlendirmesi ve süreç koordinasyonu sağlanır.",
          "Çalışma yalnızca satış anını değil, markanın Türkiye’de düzenli temsilini ve satış sonrası süreçlerin takibini de kapsar.",
        ],
        note: null,
      },
      {
        title: "İkinci El Tekne Alım-Satımı ve Danışmanlık",
        slug: "service-advisory" as BrandImageSlug,
        illustrationAlt:
          "Editoryal illüstrasyon: çekek sahası önünde hareket halindeki birkaç motoryat ve arka planda hangar ile travel-lift.",
        paragraphs: [
          "İkinci el tekne ve deniz araçlarının alım-satım süreçlerinde müşterilere danışmanlık verilir.",
          "Teknenin kullanım amacı, teknik durumu, piyasa konumu ve operasyonel ihtiyaçları birlikte değerlendirilir.",
          "Amaç, alıcı ve satıcı için açık ve takip edilebilir bir süreç oluşturmaktır.",
        ],
        note: null,
      },
      {
        title: "Servis ve Bakım Koordinasyonu",
        slug: "service-maintenance" as BrandImageSlug,
        illustrationAlt:
          "Editoryal illüstrasyon: modern bir hangarda servis sehpasındaki beyaz bir motoryata eşlik eden iki teknisyen ve arka planda deniz manzarası.",
        paragraphs: [
          "Tekne, motor ve marin ekipman için servis ve bakım süreçlerinin planlanmasında, ilgili teknik ekiplerle eşgüdümünde ve takibinde Tunera müşterinin yanında durur.",
          "Yaklaşım yalnızca arıza çözümüne değil, kullanım sürekliliğine ve düzenli süreç takibine odaklanır.",
        ],
        note: "Servis kapsamı ve süreleri ilgili marka ve servis ekibi tarafından netleştirilir.",
      },
      {
        title: "Marin Römork Satış ve Satış Sonrası Hizmetleri",
        slug: "service-trailer" as BrandImageSlug,
        illustrationAlt:
          "Editoryal illüstrasyon: marin römork üzerinde beyaz bir motoryat çeken turuncu bir pikap ve sahil yolunda altın bir günbatımı.",
        paragraphs: [
          "Marin tip römork ürünlerinin satış, servis ve bakım süreçlerinde müşterilere çözüm sağlanır.",
          "Teknenin taşınması, güvenli konumlandırılması ve doğru ekipmanla desteklenmesi denizcilik operasyonunun bir parçasıdır.",
          "Römork süreçleri, tekne kullanımının lojistik tarafını tamamlayan bir hizmet alanı olarak ele alınır.",
        ],
        note: null,
      },
      {
        title: "Güvenli Depolama Hizmetleri",
        slug: "service-storage" as BrandImageSlug,
        illustrationAlt:
          "Editoryal illüstrasyon: solda çok katlı tekne depolama rafları, sağda aydınlatılmış modern bir hangar ve önünde forklift ile bekleyen tekneler.",
        paragraphs: [
          "Üçüncü kişilere ait tekne, deniz aracı ve marin römorklar için güvenlik önlemleri alınmış tesis içinde depolama hizmeti sunulur.",
          "Hizmet; güvenlik, düzen, erişilebilirlik ve operasyonel kontrol başlıkları üzerine kurulur.",
        ],
        note: "Sigorta kapsamı ve koşulları ilgili süreçte ayrıca netleştirilir.",
      },
      {
        title: "Çekek Sahası ve Operasyon Yönetimi",
        slug: "service-yard" as BrandImageSlug,
        illustrationAlt:
          "Editoryal illüstrasyon: çekek sahasında travel-lift askılarıyla taşınan bir motoryat, sol uzakta deniz feneri ve sağda hangar binası.",
        paragraphs: [
          "Çekek sahası işlemleri planlama, alan yönetimi, güvenlik, ekipman koordinasyonu ve operasyon takibi gerektirir.",
          "Tunera; teknenin karaya alınmasını, sahada konumlandırılmasını, bakım sürecine hazırlanmasını ve operasyonel akışın güvenli yürütülmesini bu çerçevede ele alır.",
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
    body: "Marka temsili, satış ve servis süreçlerine ilişkin başvurular için doğrudan iletişime geçebilirsiniz.",
    detailsTitle: "İletişim bilgileri",
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
      caption: "Marka, satış ve servis süreçleri için doğrudan iletişim noktası.",
    },
    scrollStory: {
      eyebrow: "Akış",
      ariaLabel: "Tunera iletişim akışı",
      stages: [
        {
          id: "status",
          kicker: "01 — Doğrudan İletişim",
          title: "Doğrudan iletişim noktası",
          body: "Marka temsili, satış ve servis süreçlerine ilişkin başvurular doğrudan Tunera Denizcilik üzerinden değerlendirilir.",
        },
        {
          id: "channels",
          kicker: "02 — Kanallar",
          title: "E-posta ve ofisler",
          body: "info@tunera.com.tr adresine yazabilir, Yönetim Ofisi (Kartal) veya Operasyon Tesisi (Tuzla) bilgilerine bu bölümden ulaşabilirsiniz.",
        },
        {
          id: "explore",
          kicker: "03 — Devamı",
          title: "Markalar ve hizmetler",
          body: "Çalışma alanları hakkında daha fazla bilgi için Markalar ve Hizmetler bölümleri.",
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
  },
  home: {
    eyebrow: "Marine",
    title: "Tunera Denizcilik",
    lead: "A marine company working on brand representation, boat sales and service coordination.",
    heroIllustrationAlt:
      "Editorial illustration — a single white motoryacht heading toward a golden sunset across calm water with distant mountain silhouettes.",
    ctaPrimary: "View brands",
    ctaPrimaryHref: "/en#brands",
    ctaSecondary: "Contact",
    ctaSecondaryHref: "/en#contact",
  },
  aboutPage: {
    hero: {
      eyebrow: "About",
      title: "About",
      lead: "Tunera Denizcilik is a marine company working on brand representation, boat sales, service and maintenance coordination, and after-sales process follow-up.",
    },
    story: {
      eyebrow: "Corporate",
      paragraphs: [
        "Tunera Denizcilik Ticaret A.Ş. is a company set up to support customers in the private marine, boat and motor-yacht space.",
        "The field knowledge that comes from family and company experience is shaped at Tunera into a way of working that focuses on understanding the customer’s need and keeping the process simple.",
        "The company gathers brand representation, sales advisory, after-sales process follow-up, service coordination, storage and operational marine work into a single corporate point of contact.",
        "The aim is to help customers reach the right brand and the right process, and to keep information clear at every step.",
      ],
    },
    newEra: {
      eyebrow: "Meaning of the name",
      body: "The “new era” idea in the name means keeping processes clearer, relationships more orderly and information to the customer side more direct.",
      closingLine: "The aim is to run marine processes in a simple and trackable way.",
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
          body: "Staying open to new partnerships. Reviewing brand, product and process opportunities from outside Turkey, and testing fit through concrete steps.",
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
      imageAlt:
        "Editorial illustration — a single white motoryacht cruising across a calm bay with soft, warm-lit mountains on the horizon.",
      kicker: "Working area",
      caption:
        "Coordinating the boat owner’s contact with the sales, service and brand sides from one point.",
    },
    scrollStory: {
      eyebrow: "Flow",
      ariaLabel: "Tunera corporate story flow",
      stages: [
        {
          id: "experience-vision",
          kicker: "01 — Experience",
          title: "Working knowledge from the field",
          body: "Family and company experience shape into a way of working that focuses on understanding the customer’s need and keeping the process simple.",
        },
        {
          id: "new-era-name",
          kicker: "02 — Meaning of the name",
          title: "Clearer communication, orderly process",
          body: "An approach that keeps communication open, the process orderly, and the brand relationship trackable.",
        },
        {
          id: "values",
          kicker: "03 — Values",
          title: "Honesty, adaptation, professionalism, initiative.",
          body: "Four working values that shape how Tunera approaches its work.",
        },
        {
          id: "working-structure",
          kicker: "04 — Working Structure",
          title: "Four functional roles",
          body: "Management, sales, service coordination and operations follow-up.",
        },
        {
          id: "explore",
          kicker: "05 — More",
          title: "On to brands and contact",
          body: "More detail on each working area in the related sections.",
        },
      ],
    },
    cta: {
      primaryLabel: "Brands",
      primaryHref: "/en#brands",
      secondaryLabel: "Contact",
      secondaryHref: "/en#contact",
    },
  },
  brandsSection: {
    title: "Brands",
    description:
      "Tunera Denizcilik is the Turkey distributor and representative for Granfort and Ranieri. Detailed brand content will live on each brand’s dedicated site.",
    granfortNote:
      "Granfort is a motoryacht brand represented by Tunera Denizcilik in Turkey. The brand’s dedicated website is in development; once it goes live, model, equipment and process detail will be reachable from this section.",
    ranieriNote:
      "Ranieri is another marine brand represented by Tunera Denizcilik in Turkey. The brand’s dedicated website is in planning; the link will be shared from this section once a launch date is confirmed.",
    statusActive: "Active",
    statusComingSoon: "Coming soon",
    visit: "Brand page",
    placeholderTag: "Development link",
    inPreparation: "In preparation",
    siteInProgress: "Brand website in development",
    sitePlanned: "Brand website in planning",
    pageVisual: {
      slug: "brands-passing" as BrandImageSlug,
      imageAlt:
        "Editorial illustration — two white motoryachts passing each other on calm water with a soft sunset behind.",
      kicker: "Turkey representation",
      caption: "Turkey representation and distribution point for Granfort and Ranieri.",
    },
    scrollStory: {
      eyebrow: "Flow",
      ariaLabel: "Tunera brand work flow",
      stages: [
        {
          id: "brand-hub",
          kicker: "01 — Turkey representation",
          title: "Turkey distributor for Granfort and Ranieri",
          body: "Tunera Denizcilik is the Turkey distributor and representative for Granfort and Ranieri. Detailed information will live on each brand’s dedicated site.",
        },
        {
          id: "granfort",
          kicker: "02 — Granfort",
          title: "Granfort — Turkey representation",
          body: "A dedicated brand site covering models, equipment and the buying process is in development. The link will be shared from this section once it goes live.",
        },
        {
          id: "ranieri",
          kicker: "03 — Ranieri",
          title: "Ranieri — Turkey representation",
          body: "A dedicated Ranieri brand site is in planning. Information will be shared from this section once it is ready.",
        },
      ],
    },
  },
  servicesPage: {
    hero: {
      eyebrow: "Services",
      title: "Services",
      lead: "Brand representation, sales, service coordination, trailer processes, storage and yard operations are run as six working areas.",
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
          "Sales and after-sales processes for boat and motor-yacht brands with established recognition abroad are handled by Tunera in the Turkish market.",
          "Customers are supported in reaching the right brand, the right model and the right way of using the boat through product introduction, sales guidance and process coordination.",
          "The work covers more than the sale itself; it also includes orderly representation of the brand in Turkey and follow-up of after-sales steps.",
        ],
        note: null,
      },
      {
        title: "Pre-Owned Boat Sales & Advisory",
        slug: "service-advisory" as BrandImageSlug,
        illustrationAlt:
          "Editorial illustration of several motoryachts moving in front of a marine yard, with hangars and a travel-lift gantry in the background.",
        paragraphs: [
          "Tunera advises customers through the buying and selling of pre-owned boats and marine vessels.",
          "The boat’s intended use, technical condition, market position and operational needs are reviewed together.",
          "The aim is to set up a clear and trackable process for both buyer and seller.",
        ],
        note: null,
      },
      {
        title: "Service & Maintenance Coordination",
        slug: "service-maintenance" as BrandImageSlug,
        illustrationAlt:
          "Editorial illustration of a white motoryacht on a service stand inside a modern hangar, with two technicians attending the boat and a sea view through the opening.",
        paragraphs: [
          "Tunera supports customers through planning service and maintenance work for boats, engines and marine equipment, coordinating with the relevant technical teams and following up on each step.",
          "The approach focuses not only on resolving faults but on continuity of use and orderly process follow-up.",
        ],
        note: "Service scope and timelines are clarified by the relevant brand and service team.",
      },
      {
        title: "Marine Trailer Sales & After-Sales Support",
        slug: "service-trailer" as BrandImageSlug,
        illustrationAlt:
          "Editorial illustration of an orange pickup truck towing a white motoryacht on a marine trailer along a coastal road at golden hour.",
        paragraphs: [
          "Sales, service and maintenance for marine-type trailer products are supported by Tunera.",
          "Transporting a boat, positioning it safely and pairing it with the right equipment is part of marine operations.",
          "Trailer work is treated as the area that completes the logistics side of using the boat.",
        ],
        note: null,
      },
      {
        title: "Secure Storage Services",
        slug: "service-storage" as BrandImageSlug,
        illustrationAlt:
          "Editorial illustration of a marine storage yard — multi-level boat racks on the left, a lit modern hangar on the right with a forklift and stored vessels in front.",
        paragraphs: [
          "Storage is offered for third-party boats, marine vessels and marine trailers within a facility that has security measures in place.",
          "The service is built on security, order, accessibility and operational control.",
        ],
        note: "Insurance scope and conditions are clarified separately within the relevant process.",
      },
      {
        title: "Yard & Haul-Out Operations Management",
        slug: "service-yard" as BrandImageSlug,
        illustrationAlt:
          "Editorial illustration of a motoryacht held in travel-lift slings at a haul-out yard, with a lighthouse far on the left and a hangar building on the right.",
        paragraphs: [
          "Yard operations require planning, area management, security, equipment coordination and follow-up.",
          "Tunera handles hauling boats out of the water, positioning them on site, preparing them for maintenance and running the operational flow safely within this scope.",
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
    body: "For brand representation, sales and service enquiries you can reach Tunera Denizcilik directly.",
    detailsTitle: "Contact details",
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
      caption: "Direct point of contact for brand, sales and service enquiries.",
    },
    scrollStory: {
      eyebrow: "Flow",
      ariaLabel: "Tunera contact flow",
      stages: [
        {
          id: "status",
          kicker: "01 — Direct contact",
          title: "Direct point of contact",
          body: "Brand representation, sales and service enquiries are handled directly by Tunera Denizcilik.",
        },
        {
          id: "channels",
          kicker: "02 — Channels",
          title: "Email and offices",
          body: "Write to info@tunera.com.tr, or reach the Management Office (Kartal) and Operations Facility (Tuzla) listed in this section.",
        },
        {
          id: "explore",
          kicker: "03 — More",
          title: "Brands and services",
          body: "Visit the Brands and Services sections for more on the working areas.",
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
