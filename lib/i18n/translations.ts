export type Language = 'uz' | 'ru' | 'en';

export interface TranslationDictionary {
  nav: {
    home: string;
    catalog: string;
    calculator: string;
    about: string;
    contacts: string;
    cart: string;
    searchPlaceholder: string;
    phone: string;
    workingHours: string;
    serviceCenter: string;
    city: string;
    telegramBot: string;
  };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    ctaCatalog: string;
    ctaCalculator: string;
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
  };
  promo: {
    badge: string;
    title: string;
    description: string;
    button: string;
    validity: string;
  };
  categories: {
    title: string;
    subtitle: string;
    popularTitle: string;
    viewAll: string;
    expand: string;
    collapse: string;
    subcategories: string;
    itemsCount: string;
    allEquipment: string;
    downloadPdf: string;
    allCategories: string;
    allSuffix: string;
    componentsSuffix: string;
    videokuzatuv: {
      name: string;
      desc: string;
    };
    skud: {
      name: string;
      desc: string;
    };
    yongin: {
      name: string;
      desc: string;
    };
  };
  products: {
    title: string;
    subtitle: string;
    popular: string;
    bestsellers: string;
    newArrivals: string;
    discountedProducts: string;
    relatedProducts: string;
    viewAll: string;
    inStock: string;
    outOfStock: string;
    inStockCount: string;
    newBadge: string;
    sku: string;
    addToCart: string;
    addedToCart: string;
    buyNow: string;
    rating: string;
    reviews: string;
    specs: string;
    perPiece: string;
    vatIncluded: string;
    wishlist: string;
    compare: string;
  };
  calculator: {
    badge: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    objectType: string;
    objectTypes: {
      industrial: string;
      office: string;
      warehouse: string;
    };
    area: string;
    entryPoints: string;
    cameraRes: string;
    additionalModules: string;
    needsAccessControl: string;
    needsFireAlarm: string;
    calculateBtn: string;
    calculating: string;
    resultTitle: string;
    estimatedCost: string;
    includedProducts: string;
    submitLeadBtn: string;
    submitSuccess: string;
    modalTitle: string;
    modalDesc: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    closeBtn: string;
  };
  engineering: {
    badge: string;
    title: string;
    subtitle: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    feature4Title: string;
    feature4Desc: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    line247: string;
    heroTitle: string;
    heroSubtitle: string;
    branch1Title: string;
    branch1Address: string;
    mainOfficeTitle: string;
    mainOfficeAddress: string;
    phoneLines: string;
    workingHoursTitle: string;
    workingHoursVal: string;
    workingHoursSat: string;
    addressTitle: string;
    address: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendBtn: string;
    sendingBtn: string;
    successMessage: string;
    errorMessage: string;
    contactInfoTitle: string;
    republicNetwork: string;
    republicNetworkDesc: string;
    salesOffices: string;
    serviceCenters: string;
    directionsGoogleMaps: string;
    openMap: string;
    floatingTgTooltip: string;
    floatingPhoneTooltip: string;
  };
  cartPage: {
    title: string;
    emptyTitle: string;
    emptyDesc: string;
    backToCatalog: string;
    itemCol: string;
    priceCol: string;
    qtyCol: string;
    totalCol: string;
    summaryTitle: string;
    itemsTotal: string;
    delivery: string;
    freeDelivery: string;
    vat: string;
    grandTotal: string;
    checkoutBtn: string;
    clearCart: string;
    checkoutSuccess: string;
    modalTitle: string;
    modalSubtitle: string;
    orderNumPrefix: string;
    successDesc: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    addressLabel: string;
    addressPlaceholder: string;
    confirmBtn: string;
    submittingBtn: string;
    understoodBtn: string;
    trustSSL: string;
    trustSupport: string;
  };
  catalogPage: {
    title: string;
    subtitle: string;
    allCategories: string;
    filterTitle: string;
    priceFilter: string;
    minPrice: string;
    maxPrice: string;
    sortBy: string;
    sortNewest: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    sortPopular: string;
    noProducts: string;
    noProductsDesc: string;
    clearFilters: string;
    showingResults: string;
    downloadPdf: string;
  };
  productDetail: {
    backToCatalog: string;
    inStockCount: string;
    inStockAvailable: string;
    skuLabel: string;
    categoryLabel: string;
    perUnit: string;
    specsSummary: {
      voltage: string;
      current: string;
      protection: string;
      warranty: string;
      officialMonths: string;
    };
    tabs: {
      specs: string;
      description: string;
      documents: string;
      reviews: string;
    };
    specsTable: {
      certification: string;
      isoCert: string;
      fullDescTitle: string;
    };
    guide: {
      fullInfoTitle: string;
      installationRules: string;
      rule1: string;
      rule2: string;
      rule3: string;
      rule4: string;
      operatingConditions: string;
      cond1: string;
      cond2: string;
      cond3: string;
      cond4: string;
    };
    documents: {
      docsIntro: string;
      downloadPdf: string;
      downloadingAlert: string;
      codePrefix: string;
    };
    reviews: {
      verifiedReviews: string;
      customerRatingBadge: string;
      leaveReviewTitle: string;
      authorLabel: string;
      authorPlaceholder: string;
      companyLabel: string;
      companyPlaceholder: string;
      ratingLabel: string;
      commentLabel: string;
      commentPlaceholder: string;
      submitBtn: string;
      successMsg: string;
    };
    consultation: {
      title: string;
      subtitle: string;
      phone: string;
    };
    orderConsultation: string;
    fastOrderTitle: string;
  };
  statistics: {
    branchesTitle: string;
    distributorsTitle: string;
    serviceTitle: string;
    branchesDesc: string;
    distributorsDesc: string;
    serviceDesc: string;
    viewAddresses: string;
    listByRegions: string;
    servicesAndContacts: string;
    modalBranchesTitle: string;
    modalDistributorsTitle: string;
    modalServiceTitle: string;
    allRegions: string;
    searchPlaceholder: string;
    closeBtn: string;
  };
  branches: {
    qorasaroy: {
      name: string;
      badge: string;
      address: string;
      landmark: string;
      hours: string;
    };
    mainOffice: {
      name: string;
      badge: string;
      address: string;
      hours: string;
    };
    openStatus: string;
    googleMapsBtn: string;
    routeBtn: string;
    mapSectionTitle: string;
    mapSectionSubtitle: string;
  };
  footer: {
    description: string;
    navigation: string;
    categories: string;
    contacts: string;
    address: string;
    allRightsReserved: string;
    privacyPolicy: string;
    termsOfService: string;
    catCctv: string;
    catNvr: string;
    catTurnstiles: string;
    catFire: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  uz: {
    nav: {
      home: "Bosh sahifa",
      catalog: "Katalog",
      calculator: "Smeta Hisoblash",
      about: "Biz haqimizda",
      contacts: "Kontaktlar",
      cart: "Savat",
      searchPlaceholder: "Uskuna, brend yoki SKU bo'yicha qidiruv...",
      phone: "+998 78 113 70 27",
      workingHours: "Du-Ju: 09:00 - 18:00 | Sha-Ya: 10:00 - 16:00",
      serviceCenter: "Servis va Sklad markazi",
      city: "Toshkent",
      telegramBot: "Telegram Bot",
    },
    hero: {
      badge: "SANOAT XAVFSIZLIGI VA AVTOMATIKASI",
      title: "Sanoat obyektlari va biznes uchun",
      titleAccent: "Professional Xavfsizlik Tizimlari",
      subtitle: "IP videokuzatuv, biometrik SKUD, yong'in muhofazasi va avtomatika uskunalarini Toshkent bo'yicha yetkazib berish hamda kafolatli o'rnatish.",
      ctaCatalog: "Katalogni ko'rish",
      ctaCalculator: "Smetani hisoblash",
      stat1Number: "500+",
      stat1Label: "Bajarilgan loyihalar",
      stat2Number: "24/7",
      stat2Label: "Texnik qo'llab-quvvatlash",
      stat3Number: "3 Yil",
      stat3Label: "Rasmiy kafolat",
    },
    promo: {
      badge: "MAXSUS TAKLIF",
      title: "Kompleks Xavfsizlik Tizimiga 15% Chegirma",
      description: "Videokuzatuv va SKUD tizimini birgalikda buyurtma qiling hamda bepul muhandislik loyihalash xizmatiga ega bo'ling.",
      button: "Arizani qoldirish",
      validity: "Aksiya 31-avgustgacha amal qiladi",
    },
    categories: {
      title: "Mahsulotlar Katalogi",
      subtitle: "Sanoat va tijorat obyektlari uchun sertifikatlangan uskunalar",
      popularTitle: "Ommabop Ruknlar",
      viewAll: "Barchasini ko'rish",
      expand: "Sub-kategoriyalarni ko'rish",
      collapse: "Yopish",
      subcategories: "Sub-kategoriyalar",
      itemsCount: "ta uskuna",
      allEquipment: "Barcha Uskunalar",
      downloadPdf: "Sanoat Katalogi (PDF)",
      allCategories: "Barcha Kategoriyalar",
      allSuffix: "Barchasi",
      componentsSuffix: "Komponentlari",
      videokuzatuv: {
        name: "Videokuzatuv Tizimlari",
        desc: "IP kameralar, 4K NVR registratorlar va sun'iy intellektli analitika tizimlari",
      },
      skud: {
        name: "Kirishni Boshqarish (SKUD)",
        desc: "Biometrik turniketlar, yuz tanish va avtomatik shlagbaumlar",
      },
      yongin: {
        name: "Yong'in Xavfsizligi Tizimlari",
        desc: "Tutun va issiqlik datchiklari, avtomatik yong'in o'chirish panellari",
      },
    },
    products: {
      title: "Ommabop Uskunalar",
      subtitle: "Eng me'yoriy va sinalgan xavfsizlik hamda avtomatika uskunalarimiz",
      popular: "Ommabop Uskunalar",
      bestsellers: "Bestsellerlar (TOP Xitlar)",
      newArrivals: "Yangi Kelgan Uskunalar",
      discountedProducts: "Chegirmali Mahsulotlar",
      relatedProducts: "Tez-tez birga xarid qilinadigan uskunalar",
      viewAll: "Barcha mahsulotlar",
      inStock: "Omborda bor",
      outOfStock: "Buyurtma beriladi",
      inStockCount: "Omborda mavjud",
      newBadge: "YANGI",
      sku: "SKU / Artikul",
      addToCart: "Savatga qo'shish",
      addedToCart: "Savatda",
      buyNow: "Tezkor Xarid",
      rating: "Reyting",
      reviews: "sharh",
      specs: "Xarakteristikalar",
      perPiece: "dona",
      vatIncluded: "QQS",
      wishlist: "Sevimlilarga qo'shish",
      compare: "Solishtirish",
    },
    calculator: {
      badge: "ONLAYN SMETA KALKULYATORI",
      title: "Obyektingiz uchun xavfsizlik tizimi smetasini hisoblang",
      subtitle: "Bir necha soniya ichida loyihaning taxminiy qiymati va zarur uskunalar ro'yxatini oling",
      step1Title: "Obyekt Turi va Maydoni",
      step2Title: "Videokuzatuv Parametrlari",
      step3Title: "Qo'shimcha Tizimlar",
      objectType: "Obyekt turi",
      objectTypes: {
        industrial: "Sanoat Zonasi / Zavod",
        office: "Ofis va Biznes Markaz",
        warehouse: "Ombor / Logistika",
      },
      area: "Obyekt maydoni",
      entryPoints: "SKUD / Eshiklar Nuqtalari",
      cameraRes: "Kamera aniqligi",
      additionalModules: "Qo'shimcha Modullar",
      needsAccessControl: "Kirishni boshqarish tizimi (SKUD) kerak",
      needsFireAlarm: "Yong'in signalizatsiya tizimi kerak",
      calculateBtn: "Smetani Hisoblash",
      calculating: "Hisoblanmoqda...",
      resultTitle: "Hisoblangan Smeta Natijasi",
      estimatedCost: "Taxminiy loyiha qiymati",
      includedProducts: "Tavsiya etiladigan asosiy uskunalar",
      submitLeadBtn: "Ushbu smeta bo'yicha konsultatsiya olish",
      submitSuccess: "Sizning smeta arizangiz qabul qilindi! Mutaxassisimiz bog'lanadi.",
      modalTitle: "Mutaxassis bilan bog'lanish",
      modalDesc: "Hisoblangan smetani rasmiy PDF formatida olish uchun ma'lumotlaringizni qoldiring.",
      nameLabel: "Ismingiz",
      namePlaceholder: "Masalan: Jamshidbek",
      phoneLabel: "Telefon raqamingiz",
      phonePlaceholder: "+998 90 123 45 67",
      companyLabel: "Tashkilot / Kompaniya nomi",
      companyPlaceholder: "MChJ yoki Zavod nomi",
      submitBtn: "Smetani Yuborish",
      submittingBtn: "Yuborilmoqda...",
      closeBtn: "Yopish",
    },
    engineering: {
      badge: "SANOAT STANDARTLARI",
      title: "Nima uchun Kontrol.uz ni tanlashadi?",
      subtitle: "Muhandislik aniqligi va yuqori sifat kafolati",
      feature1Title: "Rasmiy Sertifikatsiyalangan Uskunalar",
      feature1Desc: "Barcha mahsulotlar ISO va davlat muvofiqlik sertifikatlariga ega.",
      feature2Title: "Malakali Muhandislar Jamoasi",
      feature2Desc: "10 yildan ortiq tajribaga ega sertifikatlangan mutaxassislar.",
      feature3Title: "3 Yillik To'liq Kafolat",
      feature3Desc: "O'rnatilgan tizimlar va uskunalarga 36 oy rasmiy kafolat beramiz.",
      feature4Title: "Tezkor Texnik Servis",
      feature4Desc: "Toshkent va viloyatlar bo'yicha 24 soat ichida mobil servis xizmati.",
    },
    contact: {
      badge: "BOG'LANISH",
      title: "Savollaringiz bormi? Biz bilan bog'laning",
      subtitle: "Mutaxassislarimiz sizga mos yechimni tanlashda yordam berishadi",
      line247: "24/7 B2B ALOQA LINIYASI",
      heroTitle: "Biz Bilan Bog'laning va Filiallarimizga Tashrif Buyuring",
      heroSubtitle: "Sanoat uskunalarini yetkazib berish, smeta tuzish va loyihalash bo'yicha filiallarimiz va servis markazlarimiz bilan bog'laning.",
      branch1Title: "1-Filial: Qorasaroy",
      branch1Address: "Toshkent shahri, Olmazor tumani, Qorasaroy ko'chasi.",
      mainOfficeTitle: "Bosh Ofis & Sklad",
      mainOfficeAddress: "Toshkent shahri, Chilonzor tumani, Kontrol Bosh Ofisi.",
      phoneLines: "Telefon Liniyalari",
      workingHoursTitle: "Ish Vaqti",
      workingHoursVal: "Dushanba - Juma: 09:00 - 18:00",
      workingHoursSat: "Shanba - Yakshanba: 10:00 - 16:00",
      addressTitle: "Bosh Ofis Manzili",
      address: "Toshkent shahri, Amir Temur shoh ko'chasi, 108-uy",
      nameLabel: "Ismingiz",
      namePlaceholder: "Masalan: Jamshidbek",
      phoneLabel: "Telefon raqamingiz",
      phonePlaceholder: "+998 90 123 45 67",
      companyLabel: "Kompaniya nomi (Ixtiyoriy)",
      companyPlaceholder: "Masalan: Orient Group LLC",
      messageLabel: "Xabaringiz yoki loyiha haqida ma'lumot",
      messagePlaceholder: "Qaysi xizmat yoki uskunalar qiziqtirayotganini yozing...",
      sendBtn: "Arizani Yuborish",
      sendingBtn: "Yuborilmoqda...",
      successMessage: "Rahmat! Xabaringiz muvaffaqiyatli yuborildi. Mutaxassisimiz tez orada bog'lanadi.",
      errorMessage: "Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.",
      contactInfoTitle: "Aloqa Ma'lumotlari",
      republicNetwork: "Respublika Bo'ylab Servis Tarmog'i",
      republicNetworkDesc: "Kontrol.uz O'zbekistonning barcha viloyatlarida rasmiy distribyutorlik va servis markazlariga ega.",
      salesOffices: "B2B Savdo Ofislari",
      serviceCenters: "Servis Markazlari",
      directionsGoogleMaps: "Google Xaritada Ochish",
      openMap: "Marshrut tuzish (Google Maps)",
      floatingTgTooltip: "Telegram Bot orqali yozish",
      floatingPhoneTooltip: "+998 71 200 68 00 (Qo'ng'iroq qilish)",
    },
    cartPage: {
      title: "Xarid Savati",
      emptyTitle: "Sizning savatingiz bo'sh",
      emptyDesc: "Katalog bo'limidan kerakli xavfsizlik va avtomatika uskunalarini tanlang",
      backToCatalog: "Katalogga qaytish",
      itemCol: "Mahsulot",
      priceCol: "Narx",
      qtyCol: "Miqdor",
      totalCol: "Jami",
      summaryTitle: "Buyurtma Xulosasi",
      itemsTotal: "Mahsulotlar summasi",
      delivery: "Yetkazib berish",
      freeDelivery: "Toshkent bo'yicha Bepul",
      vat: "QQS (12%)",
      grandTotal: "Jami to'lov",
      checkoutBtn: "Buyurtmani Rasmiylashtirish",
      clearCart: "Savatni tozalash",
      checkoutSuccess: "Buyurtmangiz qabul qilindi! Operatorimiz tez orada bog'lanadi.",
      modalTitle: "Buyurtmani Rasmiylashtirish",
      modalSubtitle: "B2B & Korporativ Xarid",
      orderNumPrefix: "Buyurtma Raqami",
      successDesc: "buyurtma tafsilotlari va rasmiy invoys hisob-faktura tayyorlanmoqda. Menejerimiz tez orada bog'lanadi.",
      nameLabel: "Mas'ul shaxs (Ism-familiya)",
      namePlaceholder: "Masalan: Sardor Rustamov",
      phoneLabel: "Telefon raqam",
      phonePlaceholder: "+998 90 123 45 67",
      companyLabel: "Tashkilot / Korxona",
      companyPlaceholder: "MChJ yoki Zavod",
      addressLabel: "Yetkazish manzili",
      addressPlaceholder: "Toshkent sh., Chilonzor...",
      confirmBtn: "Buyurtmani Tasdiqlash",
      submittingBtn: "Rasmiylashtirilmoqda...",
      understoodBtn: "Tushundim",
      trustSSL: "256-bit SSL Shifrlash & Kafolat",
      trustSupport: "24/7 Muhandislik & Servis Ko'magi",
    },
    catalogPage: {
      title: "Mahsulotlar Katalogi",
      subtitle: "Barcha xavfsizlik tizimlari, videokuzatuv va sanoat avtomatikasi",
      allCategories: "Barcha Kategoriyalar",
      filterTitle: "Filtrlar",
      priceFilter: "Narx oralig'i (UZS)",
      minPrice: "Dan",
      maxPrice: "Gacha",
      sortBy: "Saralash",
      sortNewest: "Yangilari birinchi",
      sortPriceAsc: "Arzonroqdan",
      sortPriceDesc: "Qimmatroqdan",
      sortPopular: "Ommabopligi bo'yicha",
      noProducts: "Ushbu mezon bo'yicha mahsulotlar topilmadi",
      noProductsDesc: "Qidiruv so'zini o'zgartiring yoki filtrni tozalab ko'ring.",
      clearFilters: "Filtrni tozalash va Katalogga qaytish →",
      showingResults: "Mahsulotlar soni:",
      downloadPdf: "Sanoat Katalogini Yuklash (PDF)",
    },
    productDetail: {
      backToCatalog: "Katalogga qaytish",
      inStockCount: "Omborda bor",
      inStockAvailable: "Omborda mavjud",
      skuLabel: "SKU / Artikul",
      categoryLabel: "Kategoriya",
      perUnit: "dona",
      specsSummary: {
        voltage: "Kuchlanish",
        current: "Tok kuchi",
        protection: "Himoya",
        warranty: "Kafolat",
        officialMonths: "36 Oy Rasmiy",
      },
      tabs: {
        specs: "Texnik Xususiyatlar",
        description: "Tavsif va Qo'llanma",
        documents: "Hujjatlar (PDF)",
        reviews: "Sharhlar",
      },
      specsTable: {
        certification: "Sertifikatlash",
        isoCert: "ISO 9001 / GOST Sertifikatlangan",
        fullDescTitle: "Batafsil Mahsulot Tavsifi",
      },
      guide: {
        fullInfoTitle: "Mahsulot haqida to'liq ma'lumot",
        installationRules: "O'rnatish va Montaj Qoidalari",
        rule1: "Montaj ishlarini boshlashdan oldin asosiy elektr tarmoq ta'minotini uzing.",
        rule2: "Uskunani faqat sertifikatlangan muhandis-texnik mutaxassislar o'rnatsin.",
        rule3: "Barcha ulanish simlarini texnik pasportdagi elektr sxemaga muvofiq bajaring.",
        rule4: "Yerga ulash (zazemleniye) konturini qat'iy standartlarga asosan tekshiring.",
        operatingConditions: "Ekspluatatsiya va Ishchi Sharoitlar",
        cond1: "Ishchi harorat diapazoni: -30°C dan +60°C gacha.",
        cond2: "Nisbiy namlik: 95% gacha (kondensat hosil bo'lmaydigan muhitda).",
        cond3: "Chang va suvdan himoya: Yuqori sanoat himoya toifasi (IP65 / IP67).",
        cond4: "Rejali texnik ko'rik davriyligi: Har 12 oyda 1 marotaba.",
      },
      documents: {
        docsIntro: "Ushbu uskunaga tegishli barcha rasmiy texnik hujjatlar va sertifikatlar:",
        downloadPdf: "Yuklab olish (PDF)",
        downloadingAlert: "fayli yuklab olinmoqda...",
        codePrefix: "Kod",
      },
      reviews: {
        verifiedReviews: "tasdiqlangan sanoat sharhlari",
        customerRatingBadge: "100% Haqiqiy xaridorlar bahosi",
        leaveReviewTitle: "Fikr va Sharh Qoldirish",
        authorLabel: "Ism-familiyangiz",
        authorPlaceholder: "Masalan: Sardor Rustamov",
        companyLabel: "Kompaniya / Korxona nomi",
        companyPlaceholder: "Masalan: Techno Invest MChJ",
        ratingLabel: "Bahoingiz (Yulduzlar)",
        commentLabel: "Sharh va Tajribangiz",
        commentPlaceholder: "Uskunaning ishlashi, yetkazilishi va sifati haqidagi xolis fikringiz...",
        submitBtn: "Sharhni Chop Etish",
        successMsg: "Sharhingiz muvaffaqiyatli qabul qilindi va ro'yxatga qo'shildi!",
      },
      consultation: {
        title: "O'rnatish va Loyihalash bo'yicha Savollaringiz bormi?",
        subtitle: "Mutaxassisimiz bilan bevosita bog'laning va muhandislik konsultatsiyasini oling.",
        phone: "+998 (78) 113-70-27",
      },
      orderConsultation: "Konsultatsiya va Narx Bilish",
      fastOrderTitle: "Tezkor buyurtma shakli",
    },
    statistics: {
      branchesTitle: "Rasmiy Filiallar",
      distributorsTitle: "Rasmiy Distribyutorlar",
      serviceTitle: "Servis Xizmatlari",
      branchesDesc: "Toshkent shahridagi rasmiy savdo va ko'rgazma zallari",
      distributorsDesc: "Respublikaning barcha hududlaridagi rasmiy diler va hamkorlar",
      serviceDesc: "Diagnostika, kafolatli ta'mirlash va texnik xizmat ko'rsatish",
      viewAddresses: "Manzillarni ko'rish",
      listByRegions: "Hududlar bo'yicha ro'yxat",
      servicesAndContacts: "Xizmatlar va aloqa",
      modalBranchesTitle: "2 ta Rasmiy Filial — Kontrol.uz",
      modalDistributorsTitle: "86 ta Rasmiy Distribyutorlar Ro'yxati",
      modalServiceTitle: "2 ta Rasmiy Servis va Texnik Markaz",
      allRegions: "Barcha Hududlar",
      searchPlaceholder: "Distribyutor nomi, shahar yoki mahsulot bo'yicha qidirish...",
      closeBtn: "Yopish",
    },
    branches: {
      qorasaroy: {
        name: "Kontrol Qorasaroy Filiali",
        badge: "1-Filial & Do'kon",
        address: "Toshkent shahri, Olmazor tumani, Qorasaroy ko'chasi",
        landmark: "Mo'ljal: Qorasaroy chorrahasi",
        hours: "Dush-Juma: 09:00 - 18:00 | Shanba: 09:00 - 15:00",
      },
      mainOffice: {
        name: "Kontrol Bosh Ofis & Sklad",
        badge: "Bosh Ofis & Sklad",
        address: "Toshkent shahri, Chilonzor tumani, Kontrol Markaziy Savdo va Ombor Majmuasi",
        hours: "Dush-Juma: 09:00 - 18:00 | Shanba: 09:00 - 15:00",
      },
      openStatus: "Ochiq",
      googleMapsBtn: "Google Maps da ochish",
      routeBtn: "Marshrut tuzish (Google Maps)",
      mapSectionTitle: "Toshkentdagi Rasmiy Filiallarimiz",
      mapSectionSubtitle: "Bizning Filiallarimiz va Xarita",
    },
    footer: {
      description: "Sanoat obyektlari, tijorat bino va uylar uchun professional videokuzatuv, SKUD va avtomatika tizimlari.",
      navigation: "Navigatsiya",
      categories: "Kategoriyalar",
      contacts: "Kontaktlar",
      address: "Toshkent sh., Amir Temur 108",
      allRightsReserved: "Barcha huquqlar himoyalangan.",
      privacyPolicy: "Maxfiylik Siyosati",
      termsOfService: "Foydalanish Shartlari",
      catCctv: "Videokuzatuv Tizimlari",
      catNvr: "4K NVR Registratorlar",
      catTurnstiles: "Biometrik SKUD & Turniketlar",
      catFire: "Yong'in Xavfsizligi Tizimlari",
    },
  },
  ru: {
    nav: {
      home: "Главная",
      catalog: "Каталог",
      calculator: "Расчет Сметы",
      about: "О нас",
      contacts: "Контакты",
      cart: "Корзина",
      searchPlaceholder: "Поиск по оборудованию, бренду или артикулу...",
      phone: "+998 78 113 70 27",
      workingHours: "Пн-Сб: 09:00 - 18:00",
      serviceCenter: "Сервисный и складской центр",
      city: "Ташкент",
      telegramBot: "Telegram Бот",
    },
    hero: {
      badge: "ПРОМЫШЛЕННАЯ БЕЗОПАСНОСТЬ И АВТОМАТИКА",
      title: "Для промышленных объектов и бизнеса",
      titleAccent: "Профессиональные Системы Безопасности",
      subtitle: "Поставка и гарантированный монтаж IP видеонаблюдения, биометрического СКУД, пожарной защиты и систем автоматики по Ташкенту.",
      ctaCatalog: "Смотреть каталог",
      ctaCalculator: "Рассчитать смету",
      stat1Number: "500+",
      stat1Label: "Выполненных проектов",
      stat2Number: "24/7",
      stat2Label: "Техническая поддержка",
      stat3Number: "3 Года",
      stat3Label: "Официальная гарантия",
    },
    promo: {
      badge: "СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ",
      title: "Скидка 15% на Комплексную Систему Безопасности",
      description: "Закажите систему видеонаблюдения и СКУД вместе и получите бесплатный проект инженерного проектирования.",
      button: "Оставить заявку",
      validity: "Акция действует до 31 августа",
    },
    categories: {
      title: "Каталог Продукции",
      subtitle: "Сертифицированное оборудование для промышленных и коммерческих объектов",
      popularTitle: "Популярные Рубрики",
      viewAll: "Смотреть все",
      expand: "Показать подкатегории",
      collapse: "Свернуть",
      subcategories: "Подкатегории",
      itemsCount: "товаров",
      allEquipment: "Все Оборудование",
      downloadPdf: "Промышленный Каталог (PDF)",
      allCategories: "Все Категории",
      allSuffix: "Все",
      componentsSuffix: "Компоненты",
      videokuzatuv: {
        name: "Системы Видеонаблюдения",
        desc: "IP камеры, 4K NVR регистраторы и системы видеоаналитики с ИИ",
      },
      skud: {
        name: "Контроль Доступа (СКУД)",
        desc: "Биометрические турникеты, распознавание лиц и автоматические шлагбаумы",
      },
      yongin: {
        name: "Пожарная Безопасность",
        desc: "Датчики дыма и тепла, панели автоматического пожаротушения",
      },
    },
    products: {
      title: "Популярное Оборудование",
      subtitle: "Самое надежное и проверенное оборудование безопасности и автоматики",
      popular: "Популярное Оборудование",
      bestsellers: "Бестселлеры (ТОП Хиты)",
      newArrivals: "Новое Оборудование",
      discountedProducts: "Товары со Скидкой",
      relatedProducts: "С этим товаром часто покупают",
      viewAll: "Все товары",
      inStock: "В наличии",
      outOfStock: "Под заказ",
      inStockCount: "В наличии",
      newBadge: "НОВИНКА",
      sku: "SKU / Артикул",
      addToCart: "В корзину",
      addedToCart: "В корзине",
      buyNow: "Быстрая покупка",
      rating: "Рейтинг",
      reviews: "отзывов",
      specs: "Характеристики",
      perPiece: "шт",
      vatIncluded: "с НДС",
      wishlist: "В избранное",
      compare: "Сравнить",
    },
    calculator: {
      badge: "ОНЛАЙН КАЛЬКУЛЯТОР СМЕТЫ",
      title: "Рассчитайте смету системы безопасности для вашего объекта",
      subtitle: "Получите ориентировочную стоимость проекта и список необходимого оборудования за пару секунд",
      step1Title: "Тип и Площадь Объекта",
      step2Title: "Параметры Видеонаблюдения",
      step3Title: "Дополнительные Системы",
      objectType: "Тип объекта",
      objectTypes: {
        industrial: "Промышленная зона / Завод",
        office: "Офис и Бизнес-центр",
        warehouse: "Склад / Логистика",
      },
      area: "Площадь объекта",
      entryPoints: "Точки доступа / СКУД",
      cameraRes: "Разрешение камер",
      additionalModules: "Дополнительные Модули",
      needsAccessControl: "Требуется система контроля доступа (СКУД)",
      needsFireAlarm: "Требуется система пожарной сигнализации",
      calculateBtn: "Рассчитать Смету",
      calculating: "Идет расчет...",
      resultTitle: "Результат Расчета Сметы",
      estimatedCost: "Ориентировочная стоимость проекта",
      includedProducts: "Рекомендуемое базовое оборудование",
      submitLeadBtn: "Получить консультацию по этой смете",
      submitSuccess: "Заявка по смете принята! Наш специалист свяжется с вами.",
      modalTitle: "Связаться со специалистом",
      modalDesc: "Оставьте свои контактные данные для получения официальной сметы в формате PDF.",
      nameLabel: "Ваше имя",
      namePlaceholder: "Например: Джамшидбек",
      phoneLabel: "Номер телефона",
      phonePlaceholder: "+998 90 123 45 67",
      companyLabel: "Название организации / Компании",
      companyPlaceholder: "ООО или Завод",
      submitBtn: "Отправить Смету",
      submittingBtn: "Отправка...",
      closeBtn: "Закрыть",
    },
    engineering: {
      badge: "ПРОМЫШЛЕННЫЕ СТАНДАРТЫ",
      title: "Почему выбирают Kontrol.uz?",
      subtitle: "Инженерная точность и гарантия высокого качества",
      feature1Title: "Официально Сертифицированное Оборудование",
      feature1Desc: "Вся продукция имеет сертификаты ISO и государственные сертификаты соответствия.",
      feature2Title: "Команда Квалифицированных Инженеров",
      feature2Desc: "Сертифицированные специалисты с опытом более 10 лет.",
      feature3Title: "Полная Гарантия 3 Года",
      feature3Desc: "Предоставляем официальную гарантию 36 месяцев на установленные системы и оборудование.",
      feature4Title: "Оперативный Технический Сервис",
      feature4Desc: "Выездная сервисная служба по Ташкенту и областям в течение 24 часов.",
    },
    contact: {
      badge: "КОНТАКТЫ",
      title: "Есть вопросы? Свяжитесь с нами",
      subtitle: "Наши специалисты помогут подобрать оптимальное решение",
      line247: "24/7 B2B ЛИНИЯ СВЯЗИ",
      heroTitle: "Свяжитесь с нами и посетите наши филиалы",
      heroSubtitle: "По вопросам поставки промышленного оборудования, расчета смет и проектирования свяжитесь с нашими филиалами и сервисными центрами.",
      branch1Title: "1-Филиал: Карасарай",
      branch1Address: "г. Ташкент, Алмазарский район, ул. Карасарай.",
      mainOfficeTitle: "Головной Офис и Склад",
      mainOfficeAddress: "г. Ташкент, Чиланзарский район, Головной Офис Kontrol.",
      phoneLines: "Телефонные Линии",
      workingHoursTitle: "Режим Работы",
      workingHoursVal: "Понедельник - Пятница: 09:00 - 18:00",
      workingHoursSat: "Суббота: 09:00 - 15:00",
      addressTitle: "Адрес Головного Офиса",
      address: "город Ташкент, проспект Амира Темура, 108",
      nameLabel: "Ваше имя",
      namePlaceholder: "Например: Джамшидбек",
      phoneLabel: "Номер телефона",
      phonePlaceholder: "+998 90 123 45 67",
      companyLabel: "Название компании (Необязательно)",
      companyPlaceholder: "Например: ООО Orient Group",
      messageLabel: "Сообщение или информация о проекте",
      messagePlaceholder: "Укажите, какая услуга или оборудование вас интересует...",
      sendBtn: "Отправить Заявку",
      sendingBtn: "Отправка...",
      successMessage: "Спасибо! Ваша заявка успешно принята. Скоро свяжемся с вами.",
      errorMessage: "Произошла ошибка. Пожалуйста, попробуйте еще раз.",
      contactInfoTitle: "Контактная Информация",
      republicNetwork: "Сервисная Сеть по Республике",
      republicNetworkDesc: "Kontrol.uz имеет официальные дистрибьюторские и сервисные центры во всех областях Узбекистана.",
      salesOffices: "B2B Офисы Продаж",
      serviceCenters: "Сервисные Центры",
      directionsGoogleMaps: "Открыть в Google Maps",
      openMap: "Построить маршрут (Google Maps)",
      floatingTgTooltip: "Написать в Telegram Bot",
      floatingPhoneTooltip: "+998 71 200 68 00 (Позвонить)",
    },
    cartPage: {
      title: "Корзина Покупок",
      emptyTitle: "Ваша корзина пуста",
      emptyDesc: "Выберите необходимое оборудование безопасности и автоматики в каталоге",
      backToCatalog: "Вернуться в каталог",
      itemCol: "Товар",
      priceCol: "Цена",
      qtyCol: "Количество",
      totalCol: "Итого",
      summaryTitle: "Итого Заказа",
      itemsTotal: "Стоимость товаров",
      delivery: "Доставка",
      freeDelivery: "Бесплатно по Ташкенту",
      vat: "НДС (12%)",
      grandTotal: "Общая сумма",
      checkoutBtn: "Оформить Заказ",
      clearCart: "Очистить корзину",
      checkoutSuccess: "Заказ принят! Наш оператор свяжется с вами в ближайшее время.",
      modalTitle: "Оформление Заказа",
      modalSubtitle: "B2B и Корпоративная Закупка",
      orderNumPrefix: "Номер Заказа",
      successDesc: "детали заказа и официальный счет-фактура формируются. Наш менеджер скоро свяжется с вами.",
      nameLabel: "Ответственное лицо (Ф.И.О.)",
      namePlaceholder: "Например: Сардор Рустамов",
      phoneLabel: "Номер телефона",
      phonePlaceholder: "+998 90 123 45 67",
      companyLabel: "Организация / Компания",
      companyPlaceholder: "ООО или Завод",
      addressLabel: "Адрес доставки",
      addressPlaceholder: "г. Ташкент, Чиланзар...",
      confirmBtn: "Подтвердить Заказ",
      submittingBtn: "Оформление...",
      understoodBtn: "Понятно",
      trustSSL: "256-битное SSL Шифрование и Гарантия",
      trustSupport: "24/7 Инженерная и Сервисная Поддержка",
    },
    catalogPage: {
      title: "Каталог Продукции",
      subtitle: "Все системы безопасности, видеонаблюдение и промышленная автоматика",
      allCategories: "Все Категории",
      filterTitle: "Фильтры",
      priceFilter: "Диапазон цен (UZS)",
      minPrice: "От",
      maxPrice: "До",
      sortBy: "Сортировка",
      sortNewest: "Сначала новые",
      sortPriceAsc: "Сначала дешевые",
      sortPriceDesc: "Сначала дорогие",
      sortPopular: "По популярности",
      noProducts: "По данному критерию товары не найдены",
      noProductsDesc: "Измените параметры поиска или очистите фильтры.",
      clearFilters: "Очистить фильтры и вернуться в каталог →",
      showingResults: "Количество товаров:",
      downloadPdf: "Скачать Промышленный Каталог (PDF)",
    },
    productDetail: {
      backToCatalog: "Вернуться в каталог",
      inStockCount: "В наличии",
      inStockAvailable: "В наличии на складе",
      skuLabel: "SKU / Артикул",
      categoryLabel: "Категория",
      perUnit: "шт",
      specsSummary: {
        voltage: "Напряжение",
        current: "Сила тока",
        protection: "Защита",
        warranty: "Гарантия",
        officialMonths: "36 Месяцев Официально",
      },
      tabs: {
        specs: "Технические Характеристики",
        description: "Описание и Руководство",
        documents: "Документы (PDF)",
        reviews: "Отзывы",
      },
      specsTable: {
        certification: "Сертификация",
        isoCert: "Сертифицировано ISO 9001 / ГОСТ",
        fullDescTitle: "Подробное Описание Товара",
      },
      guide: {
        fullInfoTitle: "Полная информация о товаре",
        installationRules: "Правила Установки и Монтажа",
        rule1: "Перед началом монтажных работ отключите основное электропитание.",
        rule2: "Монтаж оборудования должен производиться только сертифицированными специалистами.",
        rule3: "Выполняйте все соединения строго по электрической схеме из техпаспорта.",
        rule4: "Проверьте контур заземления в соответствии с установленными стандартами.",
        operatingConditions: "Эксплуатация и Рабочие Условия",
        cond1: "Диапазон рабочих температур: от -30°C до +60°C.",
        cond2: "Относительная влажность: до 95% (без образования конденсата).",
        cond3: "Защита от пыли и влаги: Высокий промышленный класс защиты (IP65 / IP67).",
        cond4: "Периодичность планового ТО: 1 раз каждые 12 месяцев.",
      },
      documents: {
        docsIntro: "Все официальные технические документы и сертификаты для данного оборудования:",
        downloadPdf: "Скачать (PDF)",
        downloadingAlert: "скачивается...",
        codePrefix: "Код",
      },
      reviews: {
        verifiedReviews: "проверенных отзывов специалистов",
        customerRatingBadge: "100% Оценка реальных покупателей",
        leaveReviewTitle: "Оставить Отзыв",
        authorLabel: "Ваше имя и фамилия",
        authorPlaceholder: "Например: Сардор Рустамов",
        companyLabel: "Название компании / Предприятия",
        companyPlaceholder: "Например: ООО Techno Invest",
        ratingLabel: "Ваша оценка (Звезды)",
        commentLabel: "Ваш отзыв и опыт использования",
        commentPlaceholder: "Ваше объективное мнение о работе оборудования, доставке и качестве...",
        submitBtn: "Опубликовать Отзыв",
        successMsg: "Ваш отзыв успешно принят и добавлен в список!",
      },
      consultation: {
        title: "Есть вопросы по монтажу и проектированию?",
        subtitle: "Свяжитесь напрямую с нашим специалистом и получите инженерную консультацию.",
        phone: "+998 (78) 113-70-27",
      },
      orderConsultation: "Консультация и Узнать Цену",
      fastOrderTitle: "Форма быстрого заказа",
    },
    statistics: {
      branchesTitle: "Официальных Филиала",
      distributorsTitle: "Официальных Дистрибьютора",
      serviceTitle: "Сервисных Центра",
      branchesDesc: "Официальные торговые и выставочные залы в Ташкенте",
      distributorsDesc: "Официальные дилеры и партнеры во всех регионах Республики",
      serviceDesc: "Диагностика, гарантийный ремонт и техническое обслуживание",
      viewAddresses: "Посмотреть адреса",
      listByRegions: "Список по регионам",
      servicesAndContacts: "Услуги и контакты",
      modalBranchesTitle: "2 Официальных Филиала — Kontrol.uz",
      modalDistributorsTitle: "Список 86 Официальных Дистрибьюторов",
      modalServiceTitle: "2 Официальных Сервисных Центра",
      allRegions: "Все Регионы",
      searchPlaceholder: "Поиск по названию, городу или продукции...",
      closeBtn: "Закрыть",
    },
    branches: {
      qorasaroy: {
        name: "Филиал Kontrol Карасарай",
        badge: "1-Филиал & Магазин",
        address: "г. Ташкент, Алмазарский район, ул. Карасарай",
        landmark: "Ориентир: перекресток Карасарай",
        hours: "Пн-Пт: 09:00 - 18:00 | Сб: 09:00 - 15:00",
      },
      mainOffice: {
        name: "Головной Офис и Склад Kontrol",
        badge: "Головной Офис & Склад",
        address: "г. Ташкент, Чиланзарский район, Торгово-складской комплекс Kontrol",
        hours: "Пн-Пт: 09:00 - 18:00 | Сб: 09:00 - 15:00",
      },
      openStatus: "Открыто",
      googleMapsBtn: "Открыть в Google Maps",
      routeBtn: "Маршрут (Google Maps)",
      mapSectionTitle: "Наши Официальные Филиалы в Ташкенте",
      mapSectionSubtitle: "Наши Филиалы и Карта",
    },
    footer: {
      description: "Профессиональное видеонаблюдение, СКУД и автоматика для промышленных объектов, коммерческих зданий и домов.",
      navigation: "Навигация",
      categories: "Категории",
      contacts: "Контакты",
      address: "г. Ташкент, пр. Амира Темура 108",
      allRightsReserved: "Все права защищены.",
      privacyPolicy: "Политика Конфиденциальности",
      termsOfService: "Условия Использования",
      catCctv: "Системы Видеонаблюдения",
      catNvr: "4K NVR Регистраторы",
      catTurnstiles: "Биометрический СКУД и Турникеты",
      catFire: "Пожарная Безопасность",
    },
  },
  en: {
    nav: {
      home: "Home",
      catalog: "Catalog",
      calculator: "Cost Calculator",
      about: "About Us",
      contacts: "Contacts",
      cart: "Cart",
      searchPlaceholder: "Search by equipment, brand or SKU...",
      phone: "+998 78 113 70 27",
      workingHours: "Mon-Fri: 09:00 - 18:00 | Sat-Sun: 10:00 - 16:00",
      serviceCenter: "Service & Warehouse Center",
      city: "Tashkent",
      telegramBot: "Telegram Bot",
    },
    hero: {
      badge: "INDUSTRIAL SECURITY & AUTOMATION",
      title: "For Industrial Facilities & Enterprises",
      titleAccent: "Professional Security Systems",
      subtitle: "Supply and guaranteed installation of IP CCTV, biometric access control, fire protection and automation systems across Tashkent.",
      ctaCatalog: "Explore Catalog",
      ctaCalculator: "Calculate Estimate",
      stat1Number: "500+",
      stat1Label: "Completed Projects",
      stat2Number: "24/7",
      stat2Label: "Technical Support",
      stat3Number: "3 Years",
      stat3Label: "Official Warranty",
    },
    promo: {
      badge: "SPECIAL OFFER",
      title: "15% Discount on Integrated Security System",
      description: "Order CCTV and access control systems together to receive free engineering design services.",
      button: "Request Quote",
      validity: "Offer valid until August 31",
    },
    categories: {
      title: "Product Catalog",
      subtitle: "Certified equipment for industrial and commercial facilities",
      popularTitle: "Popular Categories",
      viewAll: "View All",
      expand: "Show Subcategories",
      collapse: "Collapse",
      subcategories: "Subcategories",
      itemsCount: "items",
      allEquipment: "All Equipment",
      downloadPdf: "Industrial Catalog (PDF)",
      allCategories: "All Categories",
      allSuffix: "All",
      componentsSuffix: "Components",
      videokuzatuv: {
        name: "CCTV Surveillance Systems",
        desc: "IP cameras, 4K NVR recorders and AI video analytics systems",
      },
      skud: {
        name: "Access Control Systems (ACS)",
        desc: "Biometric turnstiles, facial recognition and automatic barriers",
      },
      yongin: {
        name: "Fire Safety Systems",
        desc: "Smoke and heat detectors, automatic fire suppression panels",
      },
    },
    products: {
      title: "Popular Equipment",
      subtitle: "Our most trusted and proven security & industrial automation hardware",
      popular: "Popular Equipment",
      bestsellers: "Bestsellers (Top Hits)",
      newArrivals: "New Arrivals",
      discountedProducts: "Discounted Products",
      relatedProducts: "Frequently Bought Together",
      viewAll: "All Products",
      inStock: "In Stock",
      outOfStock: "On Order",
      inStockCount: "In Stock",
      newBadge: "NEW",
      sku: "SKU / Article",
      addToCart: "Add to Cart",
      addedToCart: "In Cart",
      buyNow: "Quick Buy",
      rating: "Rating",
      reviews: "reviews",
      specs: "Specifications",
      perPiece: "pcs",
      vatIncluded: "inc. VAT",
      wishlist: "Add to Wishlist",
      compare: "Compare",
    },
    calculator: {
      badge: "ONLINE COST CALCULATOR",
      title: "Calculate the security system estimate for your facility",
      subtitle: "Get an estimated project cost and list of required hardware in seconds",
      step1Title: "Facility Type & Area",
      step2Title: "CCTV Parameters",
      step3Title: "Additional Systems",
      objectType: "Facility type",
      objectTypes: {
        industrial: "Industrial Zone / Plant",
        office: "Office & Business Center",
        warehouse: "Warehouse / Logistics",
      },
      area: "Facility area",
      entryPoints: "Access Points / ACS",
      cameraRes: "Camera resolution",
      additionalModules: "Additional Modules",
      needsAccessControl: "Access Control System (ACS) required",
      needsFireAlarm: "Fire Alarm System required",
      calculateBtn: "Calculate Estimate",
      calculating: "Calculating...",
      resultTitle: "Estimated Cost Result",
      estimatedCost: "Estimated Project Cost",
      includedProducts: "Recommended Hardware",
      submitLeadBtn: "Get Consultation for This Estimate",
      submitSuccess: "Your estimate request has been received! Our specialist will contact you.",
      modalTitle: "Contact Specialist",
      modalDesc: "Leave your contact details to receive the official estimate in PDF format.",
      nameLabel: "Your Name",
      namePlaceholder: "E.g.: Jamshidbek",
      phoneLabel: "Phone Number",
      phonePlaceholder: "+998 90 123 45 67",
      companyLabel: "Company Name (Optional)",
      companyPlaceholder: "Company or Factory Name",
      submitBtn: "Submit Estimate Request",
      submittingBtn: "Submitting...",
      closeBtn: "Close",
    },
    engineering: {
      badge: "INDUSTRIAL STANDARDS",
      title: "Why Choose Kontrol.uz?",
      subtitle: "Engineering precision and high quality assurance",
      feature1Title: "Officially Certified Hardware",
      feature1Desc: "All products hold ISO and official state compliance certificates.",
      feature2Title: "Certified Engineering Team",
      feature2Desc: "Certified specialists with over 10 years of industry experience.",
      feature3Title: "Full 3-Year Warranty",
      feature3Desc: "We provide an official 36-month warranty on installed hardware and systems.",
      feature4Title: "Rapid Technical Service",
      feature4Desc: "Mobile technical response service in Tashkent and regions within 24 hours.",
    },
    contact: {
      badge: "CONTACT US",
      title: "Have Questions? Get in Touch",
      subtitle: "Our engineering experts will help you select the ideal solution",
      line247: "24/7 B2B CONTACT LINE",
      heroTitle: "Get in Touch & Visit Our Official Branches",
      heroSubtitle: "Contact our branches and service centers for industrial hardware supply, estimation and engineering design.",
      branch1Title: "Branch 1: Qorasaroy",
      branch1Address: "Tashkent, Olmazor district, Qorasaroy street.",
      mainOfficeTitle: "Head Office & Warehouse",
      mainOfficeAddress: "Tashkent, Chilonzor district, Kontrol Head Office.",
      phoneLines: "Phone Lines",
      workingHoursTitle: "Working Hours",
      workingHoursVal: "Monday - Friday: 09:00 - 18:00",
      workingHoursSat: "Saturday - Sunday: 10:00 - 16:00",
      addressTitle: "Head Office Address",
      address: "108 Amir Temur Avenue, Tashkent, Uzbekistan",
      nameLabel: "Your Name",
      namePlaceholder: "E.g.: Jamshidbek",
      phoneLabel: "Phone Number",
      phonePlaceholder: "+998 90 123 45 67",
      companyLabel: "Company Name (Optional)",
      companyPlaceholder: "E.g.: Orient Group LLC",
      messageLabel: "Message or Project Details",
      messagePlaceholder: "Tell us which service or equipment you are interested in...",
      sendBtn: "Submit Request",
      sendingBtn: "Sending...",
      successMessage: "Thank you! Your request was sent successfully. We will contact you soon.",
      errorMessage: "An error occurred. Please try again.",
      contactInfoTitle: "Contact Details",
      republicNetwork: "Nationwide Service Network",
      republicNetworkDesc: "Kontrol.uz operates official distribution and service centers across all regions of Uzbekistan.",
      salesOffices: "B2B Sales Offices",
      serviceCenters: "Service Centers",
      directionsGoogleMaps: "Open in Google Maps",
      openMap: "Get Directions (Google Maps)",
      floatingTgTooltip: "Message Telegram Bot",
      floatingPhoneTooltip: "+998 71 200 68 00 (Call Us)",
    },
    cartPage: {
      title: "Shopping Cart",
      emptyTitle: "Your cart is empty",
      emptyDesc: "Select security & industrial automation hardware from our catalog",
      backToCatalog: "Return to Catalog",
      itemCol: "Product",
      priceCol: "Price",
      qtyCol: "Quantity",
      totalCol: "Total",
      summaryTitle: "Order Summary",
      itemsTotal: "Subtotal",
      delivery: "Delivery",
      freeDelivery: "Free in Tashkent",
      vat: "VAT (12%)",
      grandTotal: "Grand Total",
      checkoutBtn: "Proceed to Checkout",
      clearCart: "Clear Cart",
      checkoutSuccess: "Order placed successfully! Our operator will contact you shortly.",
      modalTitle: "Checkout Order",
      modalSubtitle: "B2B & Corporate Procurement",
      orderNumPrefix: "Order Number",
      successDesc: "order details and official invoice are being prepared. Our manager will contact you soon.",
      nameLabel: "Contact Person (Full Name)",
      namePlaceholder: "E.g.: Sardor Rustamov",
      phoneLabel: "Phone Number",
      phonePlaceholder: "+998 90 123 45 67",
      companyLabel: "Company / Organization",
      companyPlaceholder: "Company or Plant",
      addressLabel: "Shipping Address",
      addressPlaceholder: "Tashkent, Chilonzor district...",
      confirmBtn: "Confirm Order",
      submittingBtn: "Processing...",
      understoodBtn: "Understood",
      trustSSL: "256-bit SSL Encryption & Warranty",
      trustSupport: "24/7 Engineering & Technical Support",
    },
    catalogPage: {
      title: "Product Catalog",
      subtitle: "All security systems, CCTV surveillance and industrial automation",
      allCategories: "All Categories",
      filterTitle: "Filters",
      priceFilter: "Price Range (UZS)",
      minPrice: "From",
      maxPrice: "To",
      sortBy: "Sort By",
      sortNewest: "Newest First",
      sortPriceAsc: "Price: Low to High",
      sortPriceDesc: "Price: High to Low",
      sortPopular: "Popularity",
      noProducts: "No products found matching your criteria",
      noProductsDesc: "Change your search query or reset the filters.",
      clearFilters: "Reset filters and return to catalog →",
      showingResults: "Products count:",
      downloadPdf: "Download Industrial Catalog (PDF)",
    },
    productDetail: {
      backToCatalog: "Return to Catalog",
      inStockCount: "In stock",
      inStockAvailable: "In stock in warehouse",
      skuLabel: "SKU / Article",
      categoryLabel: "Category",
      perUnit: "pcs",
      specsSummary: {
        voltage: "Voltage",
        current: "Current",
        protection: "Protection",
        warranty: "Warranty",
        officialMonths: "36 Months Official",
      },
      tabs: {
        specs: "Technical Specifications",
        description: "Description & Manual",
        documents: "Documents (PDF)",
        reviews: "Reviews",
      },
      specsTable: {
        certification: "Certification",
        isoCert: "ISO 9001 / GOST Certified",
        fullDescTitle: "Detailed Product Description",
      },
      guide: {
        fullInfoTitle: "Full product information",
        installationRules: "Installation & Mounting Rules",
        rule1: "Disconnect the main power supply before beginning installation.",
        rule2: "Hardware must only be installed by certified engineering specialists.",
        rule3: "Connect all wiring strictly according to the schematic in the datasheet.",
        rule4: "Verify grounding circuits according to strict industrial standards.",
        operatingConditions: "Operating Conditions & Environment",
        cond1: "Operating temperature range: -30°C to +60°C.",
        cond2: "Relative humidity: up to 95% (non-condensing).",
        cond3: "Ingress Protection: High industrial grade (IP65 / IP67).",
        cond4: "Scheduled technical maintenance interval: once every 12 months.",
      },
      documents: {
        docsIntro: "All official technical datasheets and certificates for this hardware:",
        downloadPdf: "Download (PDF)",
        downloadingAlert: "file is downloading...",
        codePrefix: "Code",
      },
      reviews: {
        verifiedReviews: "verified industry reviews",
        customerRatingBadge: "100% Real Buyer Rating",
        leaveReviewTitle: "Leave Feedback & Review",
        authorLabel: "Your full name",
        authorPlaceholder: "E.g.: Sardor Rustamov",
        companyLabel: "Company / Enterprise name",
        companyPlaceholder: "E.g.: Techno Invest LLC",
        ratingLabel: "Your Rating (Stars)",
        commentLabel: "Your Review & Experience",
        commentPlaceholder: "Your objective feedback on performance, delivery and build quality...",
        submitBtn: "Publish Review",
        successMsg: "Your review was submitted successfully and added to the list!",
      },
      consultation: {
        title: "Have questions about installation and design?",
        subtitle: "Contact our technical engineer directly for a consultation.",
        phone: "+998 (78) 113-70-27",
      },
      orderConsultation: "Request Quote & Consultation",
      fastOrderTitle: "Quick order form",
    },
    statistics: {
      branchesTitle: "Official Branches",
      distributorsTitle: "Official Distributors",
      serviceTitle: "Service Centers",
      branchesDesc: "Official showrooms and sales offices in Tashkent",
      distributorsDesc: "Official dealers and partners across all regions of Uzbekistan",
      serviceDesc: "Diagnostics, warranty repair and technical maintenance",
      viewAddresses: "View addresses",
      listByRegions: "List by regions",
      servicesAndContacts: "Services & Contacts",
      modalBranchesTitle: "2 Official Branches — Kontrol.uz",
      modalDistributorsTitle: "List of 86 Official Distributors",
      modalServiceTitle: "2 Official Service & Tech Centers",
      allRegions: "All Regions",
      searchPlaceholder: "Search by distributor name, city or product...",
      closeBtn: "Close",
    },
    branches: {
      qorasaroy: {
        name: "Kontrol Qorasaroy Branch",
        badge: "Branch 1 & Store",
        address: "Tashkent, Olmazor district, Qorasaroy street",
        landmark: "Landmark: Qorasaroy intersection",
        hours: "Mon-Fri: 09:00 - 18:00 | Sat-Sun: 10:00 - 16:00",
      },
      mainOffice: {
        name: "Kontrol Head Office & Warehouse",
        badge: "Head Office & Warehouse",
        address: "Tashkent, Chilonzor district, Kontrol Central Sales & Warehouse Complex",
        hours: "Mon-Fri: 09:00 - 18:00 | Sat-Sun: 10:00 - 16:00",
      },
      openStatus: "Open",
      googleMapsBtn: "Open in Google Maps",
      routeBtn: "Get Directions (Google Maps)",
      mapSectionTitle: "Our Official Branches in Tashkent",
      mapSectionSubtitle: "Our Branches & Map",
    },
    footer: {
      description: "Professional CCTV surveillance, access control and automation for industrial plants, commercial buildings and homes.",
      navigation: "Navigation",
      categories: "Categories",
      contacts: "Contacts",
      address: "108 Amir Temur Ave, Tashkent",
      allRightsReserved: "All rights reserved.",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      catCctv: "CCTV Video Surveillance",
      catNvr: "4K NVR Recorders",
      catTurnstiles: "Biometric ACS & Turnstiles",
      catFire: "Fire Safety Systems",
    },
  },
};
