import { company, contact as contactConfig, granfort, ranieri } from "@/config/launch";

export type Locale = "tr" | "en";

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
    ctaPrimary: "Markalara Göz At",
    ctaPrimaryHref: "/tr/markalar",
    ctaSecondary: "İletişim",
    ctaSecondaryHref: "/tr/iletisim",
    storyPreview: {
      eyebrow: "Hikaye",
      paragraphs: [
        "Tunera Denizcilik Ticaret A.Ş., uzun yıllara dayanan aile ve firma tecrübesini günümüz denizcilik sektörünün yenilikçi ihtiyaçlarıyla birleştiren vizyoner bir denizcilik şirketidir.",
        "Tekne ve motoryat satışından marka temsiline, satış sonrası hizmet koordinasyonundan depolama ve operasyonel süreç yönetimine kadar denizcilik ekosisteminin farklı alanlarında güvenilir, profesyonel ve çağdaş bir hizmet anlayışı sunmayı hedefler.",
        "Tunera, adında taşıdığı “new era” fikriyle; denizcilikte daha şeffaf, daha düzenli ve daha yüksek standartlara sahip yeni bir dönemi temsil eder.",
      ],
      closingLine: "Tunera ile denizcilikte yeni bir dönem başlıyor.",
      cta: "Hakkımızda",
      ctaHref: "/tr/hakkimizda",
    },
  },
  aboutPage: {
    hero: {
      eyebrow: "Hakkımızda",
      title: "Hakkımızda",
      lead: "Tunera Denizcilik; marka temsili, tekne satışı, servis ve bakım koordinasyonu ile müşteri süreç yönetimi üzerine çalışan vizyoner bir denizcilik şirketidir.",
    },
    story: {
      eyebrow: "Kurumsal Hikaye",
      paragraphs: [
        "Tunera Denizcilik Ticaret A.Ş., Türkiye’de ve dünyada hızla gelişen özel denizcilik, tekne ve motoryat sektörüne; uzun yıllara dayanan aile ve firma tecrübesinden doğan yeni bir vizyonla yaklaşır.",
        "Denizcilik alanında edinilmiş saha bilgisi, ticari deneyim ve müşteri beklentilerini okuma becerisi; Tunera çatısı altında günümüz teknolojileri, değişen kullanım alışkanlıkları ve uluslararası ölçekte rekabet edebilecek bir hizmet standardı hedefiyle yeniden yorumlanır.",
        "Tunera, yalnızca tekne satışı yapan bir yapı olmanın ötesinde; marka temsili, satış danışmanlığı, satış sonrası süreç yönetimi, servis koordinasyonu, depolama ve operasyonel denizcilik çözümlerini bütüncül bir bakışla ele alan kurumsal bir merkez olmayı hedefler.",
        "Geçmişten gelen tecrübeyi geleceğin iş yapış biçimleriyle birleştiren Tunera, ticaret ağını uluslararası zemine taşımayı, temsil ettiği markalara değer katmayı ve müşterilerine güven veren bir denizcilik deneyimi sunmayı amaçlar.",
      ],
    },
    newEra: {
      eyebrow: "Yeni Dönem",
      body: "Adında taşıdığı “new era” fikriyle Tunera, denizcilikte yeni bir dönemin temsilidir. Bu yeni dönem; daha şeffaf iletişim, daha profesyonel süreç yönetimi, daha güçlü marka ilişkileri ve daha yüksek hizmet standardı anlamına gelir.",
      closingLine: "Tunera ile denizcilikte yeni bir dönem başlıyor.",
    },
    values: {
      eyebrow: "Değerler",
      title: "Değerlerimiz",
      description:
        "Tunera’nın çalışma anlayışı, dört temel değer üzerine kuruludur. Bu değerler hem markalarla kurulan ilişkilerde hem de müşteri deneyiminde belirleyicidir.",
      items: [
        {
          title: "Dürüstlük",
          body: "Tunera için güven, denizcilik sektöründeki her ilişkinin temelidir. Müşterilerle, markalarla ve iş ortaklarıyla kurulan iletişimde açık, anlaşılır ve dürüst bir yaklaşım benimsenir; doğru bilgi vermek, beklentileri gerçekçi yönetmek ve süreci şeffaf tutmak Tunera’nın öncelikli değerlerindendir.",
        },
        {
          title: "Yenilik",
          body: "Denizcilik sektörü hızla değişiyor; teknoloji, müşteri beklentileri, marka deneyimi ve satış sonrası hizmet anlayışı her geçen gün yeniden şekilleniyor. Tunera, bu değişimi izleyen değil; ona uyum sağlayan, yorumlayan ve kendi hizmet anlayışına taşıyan bir yapı olmayı hedefler.",
        },
        {
          title: "Profesyonellik",
          body: "Tunera’nın hizmet yaklaşımı, süreçlerin düzenli, ölçülü ve sorumluluk bilinciyle yönetilmesine dayanır. Satıştan satış sonrasına, servis koordinasyonundan depolama süreçlerine kadar her alanda daha planlı, daha net ve daha güvenilir bir hizmet deneyimi sunmak hedeflenir.",
        },
        {
          title: "Girişimcilik",
          body: "Tunera, yalnızca mevcut sektör düzeninin içinde yer almayı değil; yeni fırsatları görebilen, uluslararası iş birliklerine açık, büyüme vizyonu taşıyan ve denizcilik alanında yeni değerler üretmeyi amaçlayan bir girişimci bakış açısını temsil eder.",
        },
      ],
    },
    team: {
      eyebrow: "Kadro",
      title: "Kadro ve Çalışma Yapısı",
      description:
        "Tunera Denizcilik, dört temel işlevsel rol etrafında çalışır. Bu yapı, ekip büyüklüğünden bağımsız olarak müşteriye tutarlı bir süreç sunmayı amaçlar.",
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
    contextNote:
      "Marka çalışmaları, ziyaretçileri ilgili marka sayfalarına yönlendiren sade bir merkez olarak konumlanır.",
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
        title: "Marka Temsili ve Yeni Tekne Satışı",
        body: "Yurt dışında bilinirliği olan tekne ve motoryat markalarının Türkiye’deki satış ve süreç yönetimi.",
      },
      {
        title: "İkinci El Tekne Alım-Satımı ve Danışmanlık",
        body: "İkinci el tekne süreçlerinde alıcı ve satıcı için şeffaf, kontrollü danışmanlık.",
      },
      {
        title: "Servis ve Bakım Hizmetleri",
        body: "Tekne, motor ve marin ekipman süreçlerinin planlanması, yönlendirilmesi ve takibi.",
      },
      {
        title: "Marin Römork Satış ve Satış Sonrası Hizmetleri",
        body: "Marin tip römork ürünlerinin satış, servis ve bakım süreçleri.",
      },
      {
        title: "Güvenli Depolama Hizmetleri",
        body: "Güvenlik önlemleri alınmış tesis yapısı içinde tekne ve marin römork depolama.",
      },
      {
        title: "Çekek Sahası ve Operasyon Yönetimi",
        body: "Çekek sahası operasyonlarının düzenli, kontrollü ve profesyonel yönetimi.",
      },
    ],
  },
  servicesPage: {
    hero: {
      eyebrow: "Hizmetler",
      title: "Hizmetler",
      lead: "Tunera Denizcilik; marka temsili, satış, servis koordinasyonu, römork süreçleri, depolama ve çekek sahası operasyonlarında bütüncül bir hizmet anlayışı sunmayı hedefler.",
    },
    modelStripLabel: "Hizmet Modeli",
    modelStrip: ["Temsil", "Danışmanlık", "Servis", "Römork", "Depolama", "Operasyon"],
    items: [
      {
        title: "Marka Temsili ve Yeni Tekne Satışı",
        paragraphs: [
          "Tunera Denizcilik, yurt dışında bilinirlik kazanmış ve kendi segmentinde değer üretmiş tekne ve motoryat markalarının Türkiye pazarındaki satış ve satış sonrası süreçlerini yürütmeyi hedefler.",
          "Müşterilerin doğru marka, doğru model ve doğru kullanım senaryosu ile buluşması için ürün tanıtımı, satış yönlendirmesi ve süreç koordinasyonu sağlanır.",
          "Bu hizmet, yalnızca satış anına odaklanmaz; markanın Türkiye’de doğru temsil edilmesini, müşteri beklentilerinin net yönetilmesini ve satış sonrası süreçlerin daha düzenli ilerlemesini de kapsar.",
        ],
        note: null,
      },
      {
        title: "İkinci El Tekne Alım-Satımı ve Danışmanlık",
        paragraphs: [
          "Tunera, ikinci el tekne ve deniz araçlarının alım-satım süreçlerinde müşterilerine danışmanlık sağlar.",
          "Bu kapsamda teknenin kullanım amacı, teknik durumu, piyasa konumu, satış potansiyeli ve operasyonel ihtiyaçları birlikte değerlendirilir.",
          "Amaç, alıcı ve satıcı taraf için daha şeffaf, daha güvenilir ve daha kontrollü bir süreç oluşturmaktır.",
        ],
        note: null,
      },
      {
        title: "Servis ve Bakım Hizmetleri",
        paragraphs: [
          "Tekne, motor ve çeşitli marin ekipmanların servis ve bakım süreçleri, denizcilikte güvenli ve sürdürülebilir kullanımın temel parçalarından biridir.",
          "Tunera Denizcilik, bu süreçlerin planlanması, yönlendirilmesi ve takibinde müşterilerine destek verir.",
          "Servis ve bakım yaklaşımı; yalnızca arıza çözümüne değil, kullanım sürekliliğine, doğru müdahaleye ve düzenli süreç yönetimine odaklanır.",
        ],
        note: "Servis kapsamı ve süreleri ilgili marka ve servis ekibi tarafından netleştirilir.",
      },
      {
        title: "Marin Römork Satış ve Satış Sonrası Hizmetleri",
        paragraphs: [
          "Tunera, marin tip römork ürünlerinin satış, servis ve bakım süreçlerinde müşterilerine çözüm sunmayı hedefler.",
          "Teknenin taşınması, güvenli şekilde konumlandırılması ve doğru ekipmanla desteklenmesi; denizcilik operasyonlarının önemli bir parçasıdır.",
          "Bu nedenle römork süreçleri, yalnızca bir ekipman satışı olarak değil, teknenin kullanım ve lojistik bütünlüğünü tamamlayan bir hizmet alanı olarak ele alınır.",
        ],
        note: null,
      },
      {
        title: "Güvenli Depolama Hizmetleri",
        paragraphs: [
          "Tunera, üçüncü kişilere ait tekne, deniz aracı ve marin römorkların güvenlik önlemleri alınmış tesis yapısı içinde depolanmasına yönelik hizmetler sunmayı hedefler.",
          "Depolama hizmeti; güvenlik, düzen, erişilebilirlik ve operasyonel kontrol ilkeleri üzerine kurulur.",
          "Amaç, müşterilerin deniz araçlarını yalnızca bir alana bırakması değil; güvenilir, kontrollü ve profesyonel bir yapı içinde koruma altına almasıdır.",
        ],
        note: "Sigorta kapsamı ve koşulları ilgili süreçte ayrıca netleştirilir.",
      },
      {
        title: "Çekek Sahası ve Operasyon Yönetimi",
        paragraphs: [
          "Tekne çekek sahası işlemleri; planlama, alan yönetimi, güvenlik, ekipman koordinasyonu ve operasyon takibi gerektiren ciddi bir süreçtir.",
          "Tunera Denizcilik, çekek sahası operasyonlarının yürütülmesi ve yönetilmesinde düzenli, kontrollü ve profesyonel bir yaklaşım benimser.",
          "Bu hizmet alanı, teknelerin karaya alınması, sahada konumlandırılması, bakım süreçlerine hazırlanması ve operasyonel akışın güvenli biçimde yönetilmesini kapsar.",
        ],
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
    ctaPrimary: "View brands",
    ctaPrimaryHref: "/en/brands",
    ctaSecondary: "Contact",
    ctaSecondaryHref: "/en/contact",
    storyPreview: {
      eyebrow: "Story",
      paragraphs: [
        "Tunera Denizcilik Ticaret A.Ş. is a marine company that brings long-standing family and corporate experience together with the innovative needs of today’s marine industry.",
        "From boat and motor-yacht sales to brand representation, from after-sales coordination to storage and operational process management, Tunera works to deliver a reliable, professional and contemporary service approach across the marine ecosystem.",
        "Tunera carries the idea of a “new era” in its name — a more transparent, more orderly and higher-standard chapter in marine services.",
      ],
      closingLine: "With Tunera, a new era in marine begins.",
      cta: "About",
      ctaHref: "/en/about",
    },
  },
  aboutPage: {
    hero: {
      eyebrow: "About",
      title: "About Tunera",
      lead: "Tunera Denizcilik is a forward-looking marine company focused on brand representation, boat sales, service and maintenance coordination, and customer process management.",
    },
    story: {
      eyebrow: "Corporate story",
      paragraphs: [
        "Tunera Denizcilik Ticaret A.Ş. approaches the fast-developing private marine, boat and motor-yacht sector with a new vision shaped by long-standing family and company experience.",
        "Field knowledge, commercial experience and an understanding of customer expectations are reinterpreted under Tunera through today’s technologies, changing usage habits and the goal of building a service standard that can compete internationally.",
        "Tunera aims to be more than a boat-sales company. It is being shaped as a corporate marine hub that brings together brand representation, sales advisory, after-sales process management, service coordination, storage and operational marine solutions with a holistic perspective.",
        "By combining experience from the past with the working methods of the future, Tunera aims to expand its commercial network internationally, add value to the brands it represents, and offer customers a marine experience built on trust.",
      ],
    },
    newEra: {
      eyebrow: "New era",
      body: "Tunera carries the idea of a “new era” in its name. This new era means clearer communication, more professional process management, stronger brand relationships and a higher service standard.",
      closingLine: "With Tunera, a new era in marine begins.",
    },
    values: {
      eyebrow: "Values",
      title: "Our values",
      description:
        "Tunera’s working approach is built on four core values that guide both brand relationships and customer experience.",
      items: [
        {
          title: "Integrity",
          body: "For Tunera, trust is the foundation of every relationship in the marine industry. An open, clear and honest approach is taken with customers, brands and partners; sharing accurate information, managing expectations realistically and keeping processes transparent are among Tunera’s primary values.",
        },
        {
          title: "Innovation",
          body: "The marine industry is changing quickly — technology, customer expectations, brand experience and after-sales services are reshaped every day. Tunera aims to be a structure that does not merely follow this change, but adapts to it, interprets it and brings it into its own service approach.",
        },
        {
          title: "Professionalism",
          body: "Tunera’s service approach is built on managing processes in an orderly, measured and responsible way. From sales to after-sales, from service coordination to storage, the goal is to deliver a more planned, more precise and more reliable service experience across every area.",
        },
        {
          title: "Entrepreneurship",
          body: "Tunera represents not only a place within the existing industry order but a structure that sees new opportunities, is open to international collaboration, carries a vision for growth and aims to create new value in the marine field.",
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
          body: "Brand partnerships, representation terms and overall corporate management are handled under this role.",
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
          body: "General operations, document flow and process communication run through this role.",
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
    contextNote:
      "Brand work is presented as a simple hub that directs visitors to the related brand pages.",
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
        title: "Brand Representation & New Boat Sales",
        body: "Sales and process management in Turkey for internationally recognised boat and motor-yacht brands.",
      },
      {
        title: "Pre-Owned Boat Sales & Advisory",
        body: "Transparent, controlled advisory for buyers and sellers of pre-owned boats.",
      },
      {
        title: "Service & Maintenance Coordination",
        body: "Planning, routing and follow-up of service and maintenance processes for boats and marine equipment.",
      },
      {
        title: "Marine Trailer Sales & After-Sales Support",
        body: "Sales, service and maintenance processes for marine-type trailer products.",
      },
      {
        title: "Secure Storage Services",
        body: "Storage of boats and marine trailers within a facility structure with security measures in place.",
      },
      {
        title: "Yard & Haul-Out Operations Management",
        body: "Orderly, controlled and professional management of boat-yard operations.",
      },
    ],
  },
  servicesPage: {
    hero: {
      eyebrow: "Services",
      title: "Services",
      lead: "Tunera Denizcilik aims to deliver a holistic service approach across brand representation, sales, service coordination, trailer processes, storage and yard operations.",
    },
    modelStripLabel: "Service model",
    modelStrip: ["Representation", "Advisory", "Service", "Trailer", "Storage", "Operations"],
    items: [
      {
        title: "Brand Representation & New Boat Sales",
        paragraphs: [
          "Tunera Denizcilik aims to manage the Turkish-market sales and after-sales processes for boat and motor-yacht brands that have established recognition abroad and built value within their segment.",
          "Customers are supported in finding the right brand, the right model and the right use-case fit through product introduction, sales guidance and process coordination.",
          "This service goes beyond the moment of sale; it covers proper brand representation in Turkey, clear management of customer expectations and more orderly progression of post-sale processes.",
        ],
        note: null,
      },
      {
        title: "Pre-Owned Boat Sales & Advisory",
        paragraphs: [
          "Tunera provides advisory support to customers throughout the buying and selling of pre-owned boats and marine vessels.",
          "Within this scope, the boat’s intended use, technical condition, market position, sales potential and operational needs are assessed together.",
          "The aim is to create a more transparent, more reliable and more controlled process for both the buyer and the seller.",
        ],
        note: null,
      },
      {
        title: "Service & Maintenance Coordination",
        paragraphs: [
          "Service and maintenance processes for boats, engines and marine equipment are fundamental to safe and sustainable use at sea.",
          "Tunera Denizcilik supports customers in the planning, routing and follow-up of these processes.",
          "The service approach focuses not only on resolving faults, but also on continuity of use, the right intervention and orderly process management.",
        ],
        note: "Service scope and timelines are clarified by the relevant brand and service team.",
      },
      {
        title: "Marine Trailer Sales & After-Sales Support",
        paragraphs: [
          "Tunera aims to deliver solutions across the sales, service and maintenance processes of marine-type trailer products.",
          "Transporting a boat, positioning it safely and pairing it with the right equipment is an important part of marine operations.",
          "For this reason, trailer processes are treated not just as an equipment sale but as a service area that completes the boat’s usage and logistics integrity.",
        ],
        note: null,
      },
      {
        title: "Secure Storage Services",
        paragraphs: [
          "Tunera aims to offer storage services for third-party boats, marine vessels and marine trailers within a facility structure that has security measures in place.",
          "The storage service is built on principles of security, order, accessibility and operational control.",
          "The aim is for customers to leave their vessels not simply in an area, but under the care of a reliable, controlled and professional structure.",
        ],
        note: "Insurance scope and conditions are clarified separately within the relevant process.",
      },
      {
        title: "Yard & Haul-Out Operations Management",
        paragraphs: [
          "Boat-yard operations are a serious process requiring planning, area management, security, equipment coordination and operations follow-up.",
          "Tunera Denizcilik adopts an orderly, controlled and professional approach to running and managing yard operations.",
          "This service area covers hauling boats out of the water, positioning them on site, preparing them for maintenance processes and managing the operational flow safely.",
        ],
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
