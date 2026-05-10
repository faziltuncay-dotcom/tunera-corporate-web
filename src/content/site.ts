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
    heroIllustrationAlt:
      "Tunera marka renklerinde editoryal bir illüstrasyon: sakin sularda yan yana ilerleyen iki motoryat ve geniş dalga kompozisyonu.",
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
    scrollStory: {
      eyebrow: "Akış",
      ariaLabel: "Tunera akış anlatısı",
      stages: [
        {
          id: "new-era",
          kicker: "01 — Yeni Dönem",
          title: "Denizcilikte yeni bir dönem",
          body: "Tunera, aile ve firma tecrübesinden doğan yeni vizyonunu günümüz denizcilik ihtiyaçlarıyla birleştirir.",
        },
        {
          id: "brands",
          kicker: "02 — Marka Çalışmaları",
          title: "Markaları doğru zemine taşımak",
          body: "Granfort aktif marka çalışması; Ranieri planlanan ayrı marka sayfası olarak konumlanır.",
        },
        {
          id: "services",
          kicker: "03 — Hizmet Modeli",
          title: "Temsil, satış, servis, römork, depolama ve operasyon.",
          body: "Hizmet modelimiz altı temel alan etrafında kurgulanır.",
        },
        {
          id: "team",
          kicker: "04 — Kadro ve Süreç",
          title: "Dört temel işlevsel rol",
          body: "Yönetim, satış, servis koordinasyonu ve operasyon süreç takibi etrafında çalışırız.",
        },
        {
          id: "first-contact",
          kicker: "05 — İlk Temas",
          title: "Yeni dönem için ilk temas",
          body: "İletişim sayfası lansman öncesi sade bir köprü olarak konumlanır.",
        },
      ],
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
    pageVisual: {
      image: "/assets/brand/web/about-coastal.png",
      imageAlt:
        "Editoryal illüstrasyon: kıyıdaki bir iskelenin yanında demirli bir motoryat ve dingin bir kompozisyonda iki figür.",
      kicker: "Yeni dönem",
      caption:
        "Tunera Denizcilik, uzun yıllara dayanan tecrübeyi yeni dönemin denizcilik ihtiyaçlarıyla buluşturur.",
    },
    scrollStory: {
      eyebrow: "Akış",
      ariaLabel: "Tunera kurumsal hikaye akışı",
      stages: [
        {
          id: "experience-vision",
          kicker: "01 — Tecrübe ve Vizyon",
          title: "Yıllara dayanan tecrübenin yeni vizyonu",
          body: "Aile ve firma tecrübesi, günümüz denizciliğinin değişen ihtiyaçlarıyla yeniden yorumlanır.",
        },
        {
          id: "new-era-name",
          kicker: "02 — Adın Anlamı",
          title: "Adında taşıdığı new era",
          body: "Daha şeffaf iletişim, daha düzenli süreç yönetimi, daha güçlü marka ilişkileri.",
        },
        {
          id: "values",
          kicker: "03 — Değerler",
          title: "Dürüstlük, yenilik, profesyonellik, girişimcilik.",
          body: "Çalışma anlayışımızı şekillendiren dört temel değer.",
        },
        {
          id: "working-structure",
          kicker: "04 — Çalışma Yapısı",
          title: "Dört işlevsel rol etrafında",
          body: "Yönetim, satış, servis koordinasyonu ve operasyon süreç takibi.",
        },
        {
          id: "explore",
          kicker: "05 — Devamı",
          title: "Markalara ve iletişime geçiş",
          body: "Çalışma alanlarımıza dair daha fazla ayrıntı için ilgili sayfalar.",
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
    pageVisual: {
      image: "/assets/brand/web/brands-passing.png",
      imageAlt:
        "Editoryal illüstrasyon: sakin sularda yan yana ilerleyen iki motoryat ve geniş dalga kompozisyonu.",
      kicker: "Marka merkezi",
      caption: "Markaları doğru zemine taşıyan sade bir denizcilik merkezi olarak konumlanır.",
    },
    endCta: {
      title: "Devamı için",
      body: "Hizmetler ve iletişim sayfaları, çalışma alanlarımıza dair daha fazla ayrıntı sunar.",
      primaryLabel: "Hizmetler",
      primaryHref: "/tr/hizmetler",
      secondaryLabel: "İletişim",
      secondaryHref: "/tr/iletisim",
    },
    scrollStory: {
      eyebrow: "Akış",
      ariaLabel: "Tunera marka çalışmaları akışı",
      stages: [
        {
          id: "brand-hub",
          kicker: "01 — Marka Merkezi",
          title: "Markaları doğru zemine taşımak",
          body: "Bu sayfa, ziyaretçileri ilgili marka sayfalarına yönlendiren sade bir merkez olarak konumlanır.",
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
        illustration: "/assets/brand/web/service-representation.png",
        illustrationAlt:
          "Editoryal illüstrasyon: deniz fenerli bir marinaya doğru ilerleyen bir motoryat ve yelkenli silüetleri.",
        paragraphs: [
          "Tunera Denizcilik, yurt dışında bilinirlik kazanmış ve kendi segmentinde değer üretmiş tekne ve motoryat markalarının Türkiye pazarındaki satış ve satış sonrası süreçlerini yürütmeyi hedefler.",
          "Müşterilerin doğru marka, doğru model ve doğru kullanım senaryosu ile buluşması için ürün tanıtımı, satış yönlendirmesi ve süreç koordinasyonu sağlanır.",
          "Bu hizmet, yalnızca satış anına odaklanmaz; markanın Türkiye’de doğru temsil edilmesini, müşteri beklentilerinin net yönetilmesini ve satış sonrası süreçlerin daha düzenli ilerlemesini de kapsar.",
        ],
        note: null,
      },
      {
        title: "İkinci El Tekne Alım-Satımı ve Danışmanlık",
        illustration: "/assets/brand/web/service-advisory.png",
        illustrationAlt:
          "Editoryal illüstrasyon: kıyıdaki bir iskelede yan yana duran iki figür ve demirli bir motoryat.",
        paragraphs: [
          "Tunera, ikinci el tekne ve deniz araçlarının alım-satım süreçlerinde müşterilerine danışmanlık sağlar.",
          "Bu kapsamda teknenin kullanım amacı, teknik durumu, piyasa konumu, satış potansiyeli ve operasyonel ihtiyaçları birlikte değerlendirilir.",
          "Amaç, alıcı ve satıcı taraf için daha şeffaf, daha güvenilir ve daha kontrollü bir süreç oluşturmaktır.",
        ],
        note: null,
      },
      {
        title: "Servis ve Bakım Hizmetleri",
        illustration: "/assets/brand/web/service-maintenance.png",
        illustrationAlt:
          "Editoryal illüstrasyon: tesis yapısı içinde lift üzerinde bir motoryat ve servis ortamı.",
        paragraphs: [
          "Tekne, motor ve çeşitli marin ekipmanların servis ve bakım süreçleri, denizcilikte güvenli ve sürdürülebilir kullanımın temel parçalarından biridir.",
          "Tunera Denizcilik, bu süreçlerin planlanması, yönlendirilmesi ve takibinde müşterilerine destek verir.",
          "Servis ve bakım yaklaşımı; yalnızca arıza çözümüne değil, kullanım sürekliliğine, doğru müdahaleye ve düzenli süreç yönetimine odaklanır.",
        ],
        note: "Servis kapsamı ve süreleri ilgili marka ve servis ekibi tarafından netleştirilir.",
      },
      {
        title: "Marin Römork Satış ve Satış Sonrası Hizmetleri",
        illustration: "/assets/brand/web/service-trailer.png",
        illustrationAlt:
          "Editoryal illüstrasyon: marin römorkla taşınan bir motoryat ve sahil yolunda hareket halindeki çekici araç.",
        paragraphs: [
          "Tunera, marin tip römork ürünlerinin satış, servis ve bakım süreçlerinde müşterilerine çözüm sunmayı hedefler.",
          "Teknenin taşınması, güvenli şekilde konumlandırılması ve doğru ekipmanla desteklenmesi; denizcilik operasyonlarının önemli bir parçasıdır.",
          "Bu nedenle römork süreçleri, yalnızca bir ekipman satışı olarak değil, teknenin kullanım ve lojistik bütünlüğünü tamamlayan bir hizmet alanı olarak ele alınır.",
        ],
        note: null,
      },
      {
        title: "Güvenli Depolama Hizmetleri",
        illustration: "/assets/brand/web/service-storage.png",
        illustrationAlt:
          "Editoryal illüstrasyon: açık bayları içinde tekneler bulunan modern bir depolama tesisi ve ön planda dalga kompozisyonu.",
        paragraphs: [
          "Tunera, üçüncü kişilere ait tekne, deniz aracı ve marin römorkların güvenlik önlemleri alınmış tesis yapısı içinde depolanmasına yönelik hizmetler sunmayı hedefler.",
          "Depolama hizmeti; güvenlik, düzen, erişilebilirlik ve operasyonel kontrol ilkeleri üzerine kurulur.",
          "Amaç, müşterilerin deniz araçlarını yalnızca bir alana bırakması değil; güvenilir, kontrollü ve profesyonel bir yapı içinde koruma altına almasıdır.",
        ],
        note: "Sigorta kapsamı ve koşulları ilgili süreçte ayrıca netleştirilir.",
      },
      {
        title: "Çekek Sahası ve Operasyon Yönetimi",
        illustration: "/assets/brand/web/service-yard.png",
        illustrationAlt:
          "Editoryal illüstrasyon: çekek sahasında travel-lift askılarıyla taşınan bir motoryat ve operasyona eşlik eden çalışanlar.",
        paragraphs: [
          "Tekne çekek sahası işlemleri; planlama, alan yönetimi, güvenlik, ekipman koordinasyonu ve operasyon takibi gerektiren ciddi bir süreçtir.",
          "Tunera Denizcilik, çekek sahası operasyonlarının yürütülmesi ve yönetilmesinde düzenli, kontrollü ve profesyonel bir yaklaşım benimser.",
          "Bu hizmet alanı, teknelerin karaya alınması, sahada konumlandırılması, bakım süreçlerine hazırlanması ve operasyonel akışın güvenli biçimde yönetilmesini kapsar.",
        ],
        note: null,
      },
    ],
    scrollStory: {
      eyebrow: "Akış",
      ariaLabel: "Tunera hizmet modeli akışı",
      stages: [
        {
          id: "operating-model",
          kicker: "01 — Hizmet Modeli",
          title: "Altı temel alan etrafında bütüncül hizmet",
          body: "Temsil, danışmanlık, servis, römork, depolama ve operasyon — tek çatı altında.",
        },
        {
          id: "sales-and-brand",
          kicker: "02 — Satış ve Temsil",
          title: "Doğru marka, doğru model, doğru süreç",
          body: "Yeni tekne satışı ve ikinci el danışmanlığı; markaların Türkiye’deki düzenli yansıması.",
        },
        {
          id: "service-and-maintenance",
          kicker: "03 — Servis ve Bakım",
          title: "Süreklilik odaklı servis koordinasyonu",
          body: "Tekne, motor ve marin ekipmanların planlı, düzenli takibi.",
        },
        {
          id: "trailer-storage-yard",
          kicker: "04 — Römork, Depolama, Çekek",
          title: "Lojistik bütünlüğü tamamlayan alanlar",
          body: "Marin römork süreçleri, güvenli depolama ve çekek sahası operasyonu.",
        },
        {
          id: "explore",
          kicker: "05 — Devamı",
          title: "Süreçleri başlatmak için",
          body: "Markalar ve iletişim sayfaları üzerinden ilk adım.",
        },
      ],
    },
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
    pageVisual: {
      image: "/assets/brand/web/contact-horizon.png",
      imageAlt:
        "Editoryal illüstrasyon: turuncu bir günbatımına doğru ilerleyen tek bir motoryat ve dingin bir ufuk kompozisyonu.",
      kicker: "Lansman öncesi",
      caption: "İletişim, lansman öncesi sade bir köprü olarak konumlanır.",
    },
    endCta: {
      title: "İlgili sayfalar",
      body: "Markalar ve hizmetler sayfaları üzerinden çalışma alanlarımıza dair bilgi alabilirsiniz.",
      primaryLabel: "Markalar",
      primaryHref: "/tr/markalar",
      secondaryLabel: "Hizmetler",
      secondaryHref: "/tr/hizmetler",
    },
    scrollStory: {
      eyebrow: "Akış",
      ariaLabel: "Tunera iletişim akışı",
      stages: [
        {
          id: "status",
          kicker: "01 — Lansman Öncesi",
          title: "Sade bir köprü olarak iletişim",
          body: "İletişim sayfası, lansman öncesi dönemde kurumsal duruşu temsil eden sade bir köprüdür.",
        },
        {
          id: "channels",
          kicker: "02 — Kanallar",
          title: "Bilgiler lansman öncesi netleşir",
          body: "Telefon, e-posta ve adres bilgileri lansmandan önce paylaşılacak; ilgili marka sayfaları üzerinden duyurulacaktır.",
        },
        {
          id: "explore",
          kicker: "03 — Devamı",
          title: "Markalar ve hizmetler sayfasına dönüş",
          body: "Bu sürede çalışma alanlarımız hakkında bilgi almak için ilgili sayfalar.",
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
    lead: "A marine company focused on brand representation, boat sales and service coordination.",
    heroIllustrationAlt:
      "Editorial illustration in Tunera brand colors — two motoryachts moving across calm water with a wide wave composition.",
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
    scrollStory: {
      eyebrow: "Flow",
      ariaLabel: "Tunera flow narrative",
      stages: [
        {
          id: "new-era",
          kicker: "01 — New Era",
          title: "A new era in marine",
          body: "Tunera combines long-standing family and company experience with the needs of today’s marine sector.",
        },
        {
          id: "brands",
          kicker: "02 — Brand Work",
          title: "Placing brands on the right ground",
          body: "Granfort is the active brand work; Ranieri remains a planned separate brand page.",
        },
        {
          id: "services",
          kicker: "03 — Service Model",
          title: "Representation, sales, service, trailers, storage, and operations.",
          body: "Our service model is structured around six core areas.",
        },
        {
          id: "team",
          kicker: "04 — Working Structure",
          title: "Four functional working roles",
          body: "We work around management, sales, service coordination and operations follow-up.",
        },
        {
          id: "first-contact",
          kicker: "05 — First Contact",
          title: "First contact for the new era",
          body: "The contact page is a simple bridge during the pre-launch phase.",
        },
      ],
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
    pageVisual: {
      image: "/assets/brand/web/about-coastal.png",
      imageAlt:
        "Editorial illustration — a calm coastal scene with a moored motoryacht beside a quay and two figures.",
      kicker: "New era",
      caption:
        "Tunera brings long-standing marine experience together with the needs of a new era.",
    },
    scrollStory: {
      eyebrow: "Flow",
      ariaLabel: "Tunera corporate story flow",
      stages: [
        {
          id: "experience-vision",
          kicker: "01 — Experience & Vision",
          title: "A new vision shaped by long-standing experience",
          body: "Family and company experience reinterpreted through the changing needs of today’s marine industry.",
        },
        {
          id: "new-era-name",
          kicker: "02 — A Name with Meaning",
          title: "The new era carried in the name",
          body: "Clearer communication, more orderly process management, stronger brand relationships.",
        },
        {
          id: "values",
          kicker: "03 — Values",
          title: "Integrity, innovation, professionalism, entrepreneurship.",
          body: "Four core values that shape how we work.",
        },
        {
          id: "working-structure",
          kicker: "04 — Working Structure",
          title: "Around four functional roles",
          body: "Management, sales, service coordination and operations follow-up.",
        },
        {
          id: "explore",
          kicker: "05 — More to explore",
          title: "Onward to brands and contact",
          body: "The brands and contact pages give further detail on our working areas.",
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
    pageVisual: {
      image: "/assets/brand/web/brands-passing.png",
      imageAlt:
        "Editorial illustration — two motoryachts moving across calm water with a wide wave composition.",
      kicker: "Brand hub",
      caption: "A measured marine hub that places brands on the right ground.",
    },
    endCta: {
      title: "More to explore",
      body: "The services and contact pages give further detail on our working areas.",
      primaryLabel: "Services",
      primaryHref: "/en/services",
      secondaryLabel: "Contact",
      secondaryHref: "/en/contact",
    },
    scrollStory: {
      eyebrow: "Flow",
      ariaLabel: "Tunera brand work flow",
      stages: [
        {
          id: "brand-hub",
          kicker: "01 — Brand Hub",
          title: "Placing brands on the right ground",
          body: "This page is a simple hub that directs visitors to the related brand pages.",
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
          body: "A dedicated Ranieri brand experience is in preparation.",
        },
      ],
    },
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
        illustration: "/assets/brand/web/service-representation.png",
        illustrationAlt:
          "Editorial illustration of a motoryacht heading toward a marina with a lighthouse and moored sailboats.",
        paragraphs: [
          "Tunera Denizcilik aims to manage the Turkish-market sales and after-sales processes for boat and motor-yacht brands that have established recognition abroad and built value within their segment.",
          "Customers are supported in finding the right brand, the right model and the right use-case fit through product introduction, sales guidance and process coordination.",
          "This service goes beyond the moment of sale; it covers proper brand representation in Turkey, clear management of customer expectations and more orderly progression of post-sale processes.",
        ],
        note: null,
      },
      {
        title: "Pre-Owned Boat Sales & Advisory",
        illustration: "/assets/brand/web/service-advisory.png",
        illustrationAlt:
          "Editorial illustration of two figures standing on a coastal quay beside a moored motoryacht.",
        paragraphs: [
          "Tunera provides advisory support to customers throughout the buying and selling of pre-owned boats and marine vessels.",
          "Within this scope, the boat’s intended use, technical condition, market position, sales potential and operational needs are assessed together.",
          "The aim is to create a more transparent, more reliable and more controlled process for both the buyer and the seller.",
        ],
        note: null,
      },
      {
        title: "Service & Maintenance Coordination",
        illustration: "/assets/brand/web/service-maintenance.png",
        illustrationAlt:
          "Editorial illustration of a motoryacht raised on a service lift inside a maintenance facility.",
        paragraphs: [
          "Service and maintenance processes for boats, engines and marine equipment are fundamental to safe and sustainable use at sea.",
          "Tunera Denizcilik supports customers in the planning, routing and follow-up of these processes.",
          "The service approach focuses not only on resolving faults, but also on continuity of use, the right intervention and orderly process management.",
        ],
        note: "Service scope and timelines are clarified by the relevant brand and service team.",
      },
      {
        title: "Marine Trailer Sales & After-Sales Support",
        illustration: "/assets/brand/web/service-trailer.png",
        illustrationAlt:
          "Editorial illustration of a motoryacht being towed on a marine trailer along a coastal road.",
        paragraphs: [
          "Tunera aims to deliver solutions across the sales, service and maintenance processes of marine-type trailer products.",
          "Transporting a boat, positioning it safely and pairing it with the right equipment is an important part of marine operations.",
          "For this reason, trailer processes are treated not just as an equipment sale but as a service area that completes the boat’s usage and logistics integrity.",
        ],
        note: null,
      },
      {
        title: "Secure Storage Services",
        illustration: "/assets/brand/web/service-storage.png",
        illustrationAlt:
          "Editorial illustration of a modern boat-storage facility with open bays revealing the vessels inside.",
        paragraphs: [
          "Tunera aims to offer storage services for third-party boats, marine vessels and marine trailers within a facility structure that has security measures in place.",
          "The storage service is built on principles of security, order, accessibility and operational control.",
          "The aim is for customers to leave their vessels not simply in an area, but under the care of a reliable, controlled and professional structure.",
        ],
        note: "Insurance scope and conditions are clarified separately within the relevant process.",
      },
      {
        title: "Yard & Haul-Out Operations Management",
        illustration: "/assets/brand/web/service-yard.png",
        illustrationAlt:
          "Editorial illustration of a motoryacht held in travel-lift slings at a haul-out yard with workers attending.",
        paragraphs: [
          "Boat-yard operations are a serious process requiring planning, area management, security, equipment coordination and operations follow-up.",
          "Tunera Denizcilik adopts an orderly, controlled and professional approach to running and managing yard operations.",
          "This service area covers hauling boats out of the water, positioning them on site, preparing them for maintenance processes and managing the operational flow safely.",
        ],
        note: null,
      },
    ],
    scrollStory: {
      eyebrow: "Flow",
      ariaLabel: "Tunera service model flow",
      stages: [
        {
          id: "operating-model",
          kicker: "01 — Service Model",
          title: "A holistic model across six core areas",
          body: "Representation, advisory, service, trailer, storage and operations — under one roof.",
        },
        {
          id: "sales-and-brand",
          kicker: "02 — Sales & Representation",
          title: "The right brand, the right model, the right process",
          body: "New boat sales and pre-owned advisory; orderly representation of international brands in Turkey.",
        },
        {
          id: "service-and-maintenance",
          kicker: "03 — Service & Maintenance",
          title: "Continuity-focused service coordination",
          body: "Planned, orderly follow-up for boats, engines and marine equipment.",
        },
        {
          id: "trailer-storage-yard",
          kicker: "04 — Trailer, Storage, Yard",
          title: "The areas that complete logistics integrity",
          body: "Marine trailer processes, secure storage and yard operations.",
        },
        {
          id: "explore",
          kicker: "05 — More to explore",
          title: "Starting a process",
          body: "Begin via the brands or contact pages.",
        },
      ],
    },
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
    pageVisual: {
      image: "/assets/brand/web/contact-horizon.png",
      imageAlt:
        "Editorial illustration — a single motoryacht moving toward an orange sunset across a calm horizon.",
      kicker: "Pre-launch",
      caption: "Contact stays a simple corporate bridge during the pre-launch phase.",
    },
    endCta: {
      title: "Related pages",
      body: "Visit the brands and services pages for more on our working areas.",
      primaryLabel: "Brands",
      primaryHref: "/en/brands",
      secondaryLabel: "Services",
      secondaryHref: "/en/services",
    },
    scrollStory: {
      eyebrow: "Flow",
      ariaLabel: "Tunera contact flow",
      stages: [
        {
          id: "status",
          kicker: "01 — Pre-launch",
          title: "A simple bridge into contact",
          body: "The contact page acts as a simple corporate bridge during the pre-launch phase.",
        },
        {
          id: "channels",
          kicker: "02 — Channels",
          title: "Details finalized before launch",
          body: "Phone, email and address details will be shared before launch and announced via the related brand pages.",
        },
        {
          id: "explore",
          kicker: "03 — More to explore",
          title: "Back to brands and services",
          body: "Visit our brands and services pages for more on our working areas.",
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
