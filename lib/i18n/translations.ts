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
    viewAll: string;
    expand: string;
    collapse: string;
    subcategories: string;
    itemsCount: string;
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
    viewAll: string;
    inStock: string;
    outOfStock: string;
    newBadge: string;
    sku: string;
    addToCart: string;
    addedToCart: string;
    buyNow: string;
    rating: string;
    reviews: string;
    specs: string;
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
    cameraRes: string;
    needsAccessControl: string;
    needsFireAlarm: string;
    calculateBtn: string;
    resultTitle: string;
    estimatedCost: string;
    includedProducts: string;
    submitLeadBtn: string;
    submitSuccess: string;
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
    addressTitle: string;
    address: string;
    workingHoursTitle: string;
    workingHours: string;
    contactInfoTitle: string;
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
    grandTotal: string;
    checkoutBtn: string;
    clearCart: string;
    checkoutSuccess: string;
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
    showingResults: string;
  };
  productDetail: {
    backToCatalog: string;
    inStockCount: string;
    skuLabel: string;
    categoryLabel: string;
    tabDescription: string;
    tabSpecs: string;
    tabReviews: string;
    orderConsultation: string;
    fastOrderTitle: string;
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
      searchPlaceholder: "Uskuna, brend yoki sku bo'yicha qidiruv...",
      phone: "+998 71 200 68 00",
      workingHours: "Du-Shanba: 09:00 - 18:00",
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
      subtitle: "Sanoat va tijorat obyektlari uchun certifikatlangan uskunalar",
      viewAll: "Barchasini ko'rish",
      expand: "Sub-kategoriyalarni ko'rish",
      collapse: "Yopish",
      subcategories: "Sub-kategoriyalar",
      itemsCount: "ta uskuna",
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
      subtitle: "Eng ko me'yoriy va sinalgan xavfsizlik hamda avtomatika uskunalarimiz",
      viewAll: "Barcha mahsulotlar",
      inStock: "Omborda bor",
      outOfStock: "Buyurtma beriladi",
      newBadge: "YANGI",
      sku: "Артикул",
      addToCart: "Savatga qo'shish",
      addedToCart: "Savatda",
      buyNow: "Tezkor Xarid",
      rating: "Reyting",
      reviews: "sharh",
      specs: "Xarakteristikalar",
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
        industrial: "Sanoat Zodi / Zavod",
        office: "Ofis va Biznes Markaz",
        warehouse: "Ombor / Logistika",
      },
      area: "Obyekt maydoni (kv.m)",
      cameraRes: "Kamera aniqligi",
      needsAccessControl: "Kirishni boshqarish tizimi (SKUD) kerak",
      needsFireAlarm: "Yong'in signalizatsiya tizimi kerak",
      calculateBtn: "Smetani Hisoblash",
      resultTitle: "Hisoblangan Smeta Natijasi",
      estimatedCost: "Taxminiy loyiha qiymati",
      includedProducts: "Tavsiya etiladigan asosiy uskunalar",
      submitLeadBtn: "Ushbu smeta bo'yicha konsultatsiya olish",
      submitSuccess: "Sizning smeta arizangiz qabul qilindi! Mutaxassisimiz bog'lanadi.",
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
      subtitle: "Mutaxassislarimiz sizga mos echimni tanlashda yordam berishadi",
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
      successMessage: "Rahmat! Arizangiz muvaffaqiyatli yuborildi. Tezsida bog'lanamiz.",
      errorMessage: "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
      addressTitle: "Bosh Ofis Manzili",
      address: "Toshkent shahri, Amir Temur shoh ko'chasi, 108-uy",
      workingHoursTitle: "Ish Vaqti",
      workingHours: "Dushanba - Shanba: 09:00 - 18:00",
      contactInfoTitle: "Aloqa Ma'lumotlari",
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
      grandTotal: "Jami to'lov",
      checkoutBtn: "Buyurtmani Rasmiylashtirish",
      clearCart: "Savatni tozalash",
      checkoutSuccess: "Buyurtmangiz qabul qilindi! Operatorimiz tez orada bog'lanadi.",
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
      showingResults: "Mahsulotlar soni:",
    },
    productDetail: {
      backToCatalog: "Katalogga qaytish",
      inStockCount: "Omborda bor (dona)",
      skuLabel: "SKU / Artikuls",
      categoryLabel: "Kategoriya",
      tabDescription: "Tavsif va Qo'llanilishi",
      tabSpecs: "Texnik Xarakteristikalar",
      tabReviews: "Sharhlar",
      orderConsultation: "Konsultatsiya va Narx Bilish",
      fastOrderTitle: "Tezkor buyurtma shakli",
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
      phone: "+998 71 200 68 00",
      workingHours: "Пн-Сб: 09:00 - 18:00",
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
      viewAll: "Смотреть все",
      expand: "Показать подкатегории",
      collapse: "Свернуть",
      subcategories: "Подкатегории",
      itemsCount: "товаров",
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
      viewAll: "Все товары",
      inStock: "В наличии",
      outOfStock: "Под заказ",
      newBadge: "НОВИНКА",
      sku: "Артикул",
      addToCart: "В корзину",
      addedToCart: "В корзине",
      buyNow: "Быстрая покупка",
      rating: "Рейтинг",
      reviews: "отзывов",
      specs: "Характеристики",
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
      area: "Площадь объекта (кв.м)",
      cameraRes: "Разрешение камер",
      needsAccessControl: "Требуется система контроля доступа (СКУД)",
      needsFireAlarm: "Требуется система пожарной сигнализации",
      calculateBtn: "Рассчитать Смету",
      resultTitle: "Результат Расчета Сметы",
      estimatedCost: "Ориентировочная стоимость проекта",
      includedProducts: "Рекомендуемое базовое оборудование",
      submitLeadBtn: "Получить консультацию по этой смете",
      submitSuccess: "Заявка по смете принята! Наш специалист свяжется с вами.",
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
      successMessage: "Спасибо! Ваша заявка успешно отправлена. Скоро свяжемся.",
      errorMessage: "Произошла ошибка. Пожалуйста, попробуйте еще раз.",
      addressTitle: "Адрес Головного Офиса",
      address: "город Ташкент, проспект Амира Темура, 108",
      workingHoursTitle: "Режим Работы",
      workingHours: "Понедельник - Суббота: 09:00 - 18:00",
      contactInfoTitle: "Контактная Информация",
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
      grandTotal: "Общая сумма",
      checkoutBtn: "Оформить Заказ",
      clearCart: "Очистить корзину",
      checkoutSuccess: "Заказ принят! Наш оператор свяжется с вами в ближайшее время.",
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
      showingResults: "Количество товаров:",
    },
    productDetail: {
      backToCatalog: "Вернуться в каталог",
      inStockCount: "В наличии (шт)",
      skuLabel: "SKU / Артикул",
      categoryLabel: "Категория",
      tabDescription: "Описание и Применение",
      tabSpecs: "Технические Характеристики",
      tabReviews: "Отзывы",
      orderConsultation: "Консультация и Узнать Цену",
      fastOrderTitle: "Форма быстрого заказа",
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
      phone: "+998 71 200 68 00",
      workingHours: "Mon-Sat: 09:00 - 18:00",
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
      viewAll: "View All",
      expand: "Show Subcategories",
      collapse: "Collapse",
      subcategories: "Subcategories",
      itemsCount: "items",
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
      viewAll: "All Products",
      inStock: "In Stock",
      outOfStock: "On Order",
      newBadge: "NEW",
      sku: "SKU",
      addToCart: "Add to Cart",
      addedToCart: "In Cart",
      buyNow: "Quick Buy",
      rating: "Rating",
      reviews: "reviews",
      specs: "Specifications",
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
      area: "Facility area (sq.m)",
      cameraRes: "Camera resolution",
      needsAccessControl: "Access Control System (ACS) required",
      needsFireAlarm: "Fire Alarm System required",
      calculateBtn: "Calculate Estimate",
      resultTitle: "Estimated Cost Result",
      estimatedCost: "Estimated Project Cost",
      includedProducts: "Recommended Hardware",
      submitLeadBtn: "Get Consultation for This Estimate",
      submitSuccess: "Your estimate request has been received! Our specialist will contact you.",
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
      addressTitle: "Head Office Address",
      address: "108 Amir Temur Avenue, Tashkent, Uzbekistan",
      workingHoursTitle: "Working Hours",
      workingHours: "Monday - Saturday: 09:00 - 18:00",
      contactInfoTitle: "Contact Details",
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
      grandTotal: "Grand Total",
      checkoutBtn: "Proceed to Checkout",
      clearCart: "Clear Cart",
      checkoutSuccess: "Order placed successfully! Our operator will contact you shortly.",
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
      showingResults: "Products count:",
    },
    productDetail: {
      backToCatalog: "Return to Catalog",
      inStockCount: "In stock (pcs)",
      skuLabel: "SKU / Article",
      categoryLabel: "Category",
      tabDescription: "Description & Applications",
      tabSpecs: "Technical Specifications",
      tabReviews: "Reviews",
      orderConsultation: "Request Quote & Consultation",
      fastOrderTitle: "Quick order form",
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
    },
  },
};
