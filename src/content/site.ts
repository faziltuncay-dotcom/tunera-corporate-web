import { company, contact as contactConfig, granfort, ranieri } from "@/config/launch";

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
  companyShort: company.short,
  isFinalized: contactConfig.isFinalized,
  email: contactConfig.email,
  phone: contactConfig.phone,
  address: contactConfig.address,
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
      "Editoryal illüstrasyon: sakin sularda yan yana ilerleyen iki motoryat ve geniş dalga kompozisyonu.",
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
      image: "/assets/brand/web/about-coastal.png",
      imageAlt:
        "Editoryal illüstrasyon: kıyıdaki bir iskelenin yanında demirli bir motoryat ve dingin bir kompozisyonda iki figür.",
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
    description: "Tunera Denizcilik tarafından yürütülen marka çalışmaları.",
    granfortNote:
      "Granfort marka sayfası ayrı bir uygulamadır. Bağlantı şu anda geliştirme ortamına yönlendirir.",
    ranieriNote: "Planlanan ayrı marka sayfası. Yakında.",
    statusActive: "Aktif",
    statusComingSoon: "Yakında",
    visit: "Marka sayfası",
    placeholderTag: "Geliştirme bağlantısı",
    inPreparation: "Hazırlık aşamasında",
    pageVisual: {
      image: "/assets/brand/web/brands-passing.png",
      imageAlt:
        "Editoryal illüstrasyon: sakin sularda yan yana ilerleyen iki motoryat ve geniş dalga kompozisyonu.",
      kicker: "Marka çalışmaları",
      caption: "Granfort ve planlanan Ranieri sayfasına yönlendiren sade bir başlangıç noktası.",
    },
    scrollStory: {
      eyebrow: "Akış",
      ariaLabel: "Tunera marka çalışmaları akışı",
      stages: [
        {
          id: "brand-hub",
          kicker: "01 — Marka Sayfaları",
          title: "Marka sayfalarına yönlendirme",
          body: "Ziyaretçi, doğru marka sayfasına bu bölümden ulaşır.",
        },
        {
          id: "granfort",
          kicker: "02 — Granfort",
          title: "Aktif marka çalışması",
          body: "Granfort marka sayfası ayrı bir uygulama olarak yürütülür; bağlantı şu anda geliştirme ortamına yönlendirir.",
        },
        {
          id: "ranieri",
          kicker: "03 — Ranieri",
          title: "Planlanan ayrı marka sayfası",
          body: "Ranieri için ayrı bir marka deneyimi hazırlık aşamasındadır.",
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
        illustration: "/assets/brand/web/service-representation.png",
        illustrationAlt:
          "Editoryal illüstrasyon: deniz fenerli bir marinaya doğru ilerleyen bir motoryat ve yelkenli silüetleri.",
        paragraphs: [
          "Yurt dışında bilinirlik kazanmış tekne ve motoryat markalarının Türkiye’deki satış ve satış sonrası süreçleri Tunera tarafından yürütülür.",
          "Müşterinin doğru marka, doğru model ve doğru kullanım biçimine ulaşması için ürün tanıtımı, satış yönlendirmesi ve süreç koordinasyonu sağlanır.",
          "Çalışma yalnızca satış anını değil, markanın Türkiye’de düzenli temsilini ve satış sonrası süreçlerin takibini de kapsar.",
        ],
        note: null,
      },
      {
        title: "İkinci El Tekne Alım-Satımı ve Danışmanlık",
        illustration: "/assets/brand/web/service-advisory.png",
        illustrationAlt:
          "Editoryal illüstrasyon: kıyıdaki bir iskelede yan yana duran iki figür ve demirli bir motoryat.",
        paragraphs: [
          "İkinci el tekne ve deniz araçlarının alım-satım süreçlerinde müşterilere danışmanlık verilir.",
          "Teknenin kullanım amacı, teknik durumu, piyasa konumu ve operasyonel ihtiyaçları birlikte değerlendirilir.",
          "Amaç, alıcı ve satıcı için açık ve takip edilebilir bir süreç oluşturmaktır.",
        ],
        note: null,
      },
      {
        title: "Servis ve Bakım Koordinasyonu",
        illustration: "/assets/brand/web/service-maintenance.png",
        illustrationAlt:
          "Editoryal illüstrasyon: tesis yapısı içinde lift üzerinde bir motoryat ve servis ortamı.",
        paragraphs: [
          "Tekne, motor ve marin ekipman için servis ve bakım süreçlerinin planlanmasında, ilgili teknik ekiplerle eşgüdümünde ve takibinde Tunera müşterinin yanında durur.",
          "Yaklaşım yalnızca arıza çözümüne değil, kullanım sürekliliğine ve düzenli süreç takibine odaklanır.",
        ],
        note: "Servis kapsamı ve süreleri ilgili marka ve servis ekibi tarafından netleştirilir.",
      },
      {
        title: "Marin Römork Satış ve Satış Sonrası Hizmetleri",
        illustration: "/assets/brand/web/service-trailer.png",
        illustrationAlt:
          "Editoryal illüstrasyon: marin römorkla taşınan bir motoryat ve sahil yolunda hareket halindeki çekici araç.",
        paragraphs: [
          "Marin tip römork ürünlerinin satış, servis ve bakım süreçlerinde müşterilere çözüm sağlanır.",
          "Teknenin taşınması, güvenli konumlandırılması ve doğru ekipmanla desteklenmesi denizcilik operasyonunun bir parçasıdır.",
          "Römork süreçleri, tekne kullanımının lojistik tarafını tamamlayan bir hizmet alanı olarak ele alınır.",
        ],
        note: null,
      },
      {
        title: "Güvenli Depolama Hizmetleri",
        illustration: "/assets/brand/web/service-storage.png",
        illustrationAlt:
          "Editoryal illüstrasyon: açık bayları içinde tekneler bulunan modern bir depolama tesisi ve ön planda dalga kompozisyonu.",
        paragraphs: [
          "Üçüncü kişilere ait tekne, deniz aracı ve marin römorklar için güvenlik önlemleri alınmış tesis içinde depolama hizmeti sunulur.",
          "Hizmet; güvenlik, düzen, erişilebilirlik ve operasyonel kontrol başlıkları üzerine kurulur.",
        ],
        note: "Sigorta kapsamı ve koşulları ilgili süreçte ayrıca netleştirilir.",
      },
      {
        title: "Çekek Sahası ve Operasyon Yönetimi",
        illustration: "/assets/brand/web/service-yard.png",
        illustrationAlt:
          "Editoryal illüstrasyon: çekek sahasında travel-lift askılarıyla taşınan bir motoryat ve operasyona eşlik eden çalışanlar.",
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
    body: "İletişim bilgileri lansman öncesinde paylaşılacaktır. Detaylar ilgili marka sayfaları üzerinden de duyurulur.",
    detailsTitle: "İletişim bilgileri",
    detailsNote: "İletişim bilgileri lansman öncesi netleştirilecektir.",
    fieldEmail: "E-posta",
    fieldPhone: "Telefon",
    fieldAddress: "Adres",
    toBeAnnounced: "Lansman öncesi paylaşılacak",
    pageVisual: {
      image: "/assets/brand/web/contact-horizon.png",
      imageAlt:
        "Editoryal illüstrasyon: turuncu bir günbatımına doğru ilerleyen tek bir motoryat ve dingin bir ufuk kompozisyonu.",
      kicker: "Lansman öncesi",
      caption: "İletişim bilgileri lansman öncesinde paylaşılacaktır.",
    },
    scrollStory: {
      eyebrow: "Akış",
      ariaLabel: "Tunera iletişim akışı",
      stages: [
        {
          id: "status",
          kicker: "01 — Lansman Öncesi",
          title: "İletişim bilgileri henüz yayında değil",
          body: "İletişim bilgileri lansmandan önce yayına alınır. O zamana kadar bu bölüm sade bir bilgilendirme olarak durur.",
        },
        {
          id: "channels",
          kicker: "02 — Kanallar",
          title: "Telefon, e-posta, adres",
          body: "Telefon, e-posta ve adres bilgileri lansmandan önce paylaşılır ve ilgili marka sayfaları üzerinden de duyurulur.",
        },
        {
          id: "explore",
          kicker: "03 — Devamı",
          title: "Markalar ve hizmetler",
          body: "Bu sürede çalışma alanları hakkında bilgi almak için ilgili bölümler.",
        },
      ],
    },
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
    lead: "A marine company working on brand representation, boat sales and service coordination.",
    heroIllustrationAlt:
      "Editorial illustration — two motoryachts moving across calm water with a wide wave composition.",
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
      image: "/assets/brand/web/about-coastal.png",
      imageAlt:
        "Editorial illustration — a calm coastal scene with a moored motoryacht beside a quay and two figures.",
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
    description: "Brand activities operated by Tunera Denizcilik.",
    granfortNote:
      "The Granfort brand page is a separate application. The link currently routes to the development environment.",
    ranieriNote: "Planned separate brand page. Coming soon.",
    statusActive: "Active",
    statusComingSoon: "Coming soon",
    visit: "Brand page",
    placeholderTag: "Development link",
    inPreparation: "In preparation",
    pageVisual: {
      image: "/assets/brand/web/brands-passing.png",
      imageAlt:
        "Editorial illustration — two motoryachts moving across calm water with a wide wave composition.",
      kicker: "Brand work",
      caption:
        "A simple starting point that points visitors to Granfort and the planned Ranieri page.",
    },
    scrollStory: {
      eyebrow: "Flow",
      ariaLabel: "Tunera brand work flow",
      stages: [
        {
          id: "brand-hub",
          kicker: "01 — Brand pages",
          title: "Pointing to the brand pages",
          body: "Visitors reach the right brand page from this section.",
        },
        {
          id: "granfort",
          kicker: "02 — Granfort",
          title: "The active brand work",
          body: "The Granfort brand page is operated as a separate application; the link currently routes to the development environment.",
        },
        {
          id: "ranieri",
          kicker: "03 — Ranieri",
          title: "A planned separate brand page",
          body: "A dedicated Ranieri brand page is in preparation.",
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
        illustration: "/assets/brand/web/service-representation.png",
        illustrationAlt:
          "Editorial illustration of a motoryacht heading toward a marina with a lighthouse and moored sailboats.",
        paragraphs: [
          "Sales and after-sales processes for boat and motor-yacht brands with established recognition abroad are handled by Tunera in the Turkish market.",
          "Customers are supported in reaching the right brand, the right model and the right way of using the boat through product introduction, sales guidance and process coordination.",
          "The work covers more than the sale itself; it also includes orderly representation of the brand in Turkey and follow-up of after-sales steps.",
        ],
        note: null,
      },
      {
        title: "Pre-Owned Boat Sales & Advisory",
        illustration: "/assets/brand/web/service-advisory.png",
        illustrationAlt:
          "Editorial illustration of two figures standing on a coastal quay beside a moored motoryacht.",
        paragraphs: [
          "Tunera advises customers through the buying and selling of pre-owned boats and marine vessels.",
          "The boat’s intended use, technical condition, market position and operational needs are reviewed together.",
          "The aim is to set up a clear and trackable process for both buyer and seller.",
        ],
        note: null,
      },
      {
        title: "Service & Maintenance Coordination",
        illustration: "/assets/brand/web/service-maintenance.png",
        illustrationAlt:
          "Editorial illustration of a motoryacht raised on a service lift inside a maintenance facility.",
        paragraphs: [
          "Tunera supports customers through planning service and maintenance work for boats, engines and marine equipment, coordinating with the relevant technical teams and following up on each step.",
          "The approach focuses not only on resolving faults but on continuity of use and orderly process follow-up.",
        ],
        note: "Service scope and timelines are clarified by the relevant brand and service team.",
      },
      {
        title: "Marine Trailer Sales & After-Sales Support",
        illustration: "/assets/brand/web/service-trailer.png",
        illustrationAlt:
          "Editorial illustration of a motoryacht being towed on a marine trailer along a coastal road.",
        paragraphs: [
          "Sales, service and maintenance for marine-type trailer products are supported by Tunera.",
          "Transporting a boat, positioning it safely and pairing it with the right equipment is part of marine operations.",
          "Trailer work is treated as the area that completes the logistics side of using the boat.",
        ],
        note: null,
      },
      {
        title: "Secure Storage Services",
        illustration: "/assets/brand/web/service-storage.png",
        illustrationAlt:
          "Editorial illustration of a modern boat-storage facility with open bays revealing the vessels inside.",
        paragraphs: [
          "Storage is offered for third-party boats, marine vessels and marine trailers within a facility that has security measures in place.",
          "The service is built on security, order, accessibility and operational control.",
        ],
        note: "Insurance scope and conditions are clarified separately within the relevant process.",
      },
      {
        title: "Yard & Haul-Out Operations Management",
        illustration: "/assets/brand/web/service-yard.png",
        illustrationAlt:
          "Editorial illustration of a motoryacht held in travel-lift slings at a haul-out yard with workers attending.",
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
    body: "Contact details will be shared before launch. They will also be announced via the related brand pages.",
    detailsTitle: "Contact details",
    detailsNote: "Contact details will be finalized before launch.",
    fieldEmail: "Email",
    fieldPhone: "Phone",
    fieldAddress: "Address",
    toBeAnnounced: "To be shared before launch",
    pageVisual: {
      image: "/assets/brand/web/contact-horizon.png",
      imageAlt:
        "Editorial illustration — a single motoryacht moving toward an orange sunset across a calm horizon.",
      kicker: "Pre-launch",
      caption: "Contact details will be shared before launch.",
    },
    scrollStory: {
      eyebrow: "Flow",
      ariaLabel: "Tunera contact flow",
      stages: [
        {
          id: "status",
          kicker: "01 — Pre-launch",
          title: "Contact details are not live yet",
          body: "Contact details will be published before launch. Until then this section stays as a simple status note.",
        },
        {
          id: "channels",
          kicker: "02 — Channels",
          title: "Phone, email, address",
          body: "Phone, email and address details will be shared before launch and will also be announced via the related brand pages.",
        },
        {
          id: "explore",
          kicker: "03 — More",
          title: "Brands and services",
          body: "In the meantime, the related sections cover the working areas.",
        },
      ],
    },
  },
  footer: {
    rights: "All rights reserved.",
    note: "This site is in a pre-launch state.",
  },
};

export function copy(locale: Locale) {
  return locale === "en" ? en : tr;
}
