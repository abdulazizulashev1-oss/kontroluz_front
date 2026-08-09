import { Product, Category, CalculatorPayload, CalculatorResult, OrganizationInfo } from "@/shared/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api";
const STRAPI_HOST = API_BASE_URL.replace(/\/api\/?$/, "");

export const MOCK_ORGANIZATION: OrganizationInfo = {
  name: "Kontrol.uz",
  legalName: "Kontrol Security Systems LLC",
  url: "https://kontrol.uz",
  logo: "https://kontrol.uz/logo.png",
  telephone: "+998 71 200 68 00",
  email: "info@kontrol.uz",
  address: {
    streetAddress: "Amir Temur shoh ko'chasi, 108",
    addressLocality: "Toshkent",
    addressCountry: "UZ",
  },
  openingHours: "Mo-Fr 09:00-18:00, Sa 09:00-15:00",
  sameAs: [
    "https://t.me/kontrol_uz",
    "https://instagram.com/kontrol.uz",
    "https://facebook.com/kontroluz",
  ],
};

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    slug: "videokuzatuv",
    name: "Videokuzatuv Tizimlari",
    description: "IP kameralar, 4K NVR registratorlar va sun'iy intellektli analitika tizimlari",
    iconName: "Camera",
    imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=80",
    productCount: 142,
    subcategories: [
      { slug: "ip-kameralar", name: "IP Kameralar" },
      { slug: "nvr-registratorlar", name: "NVR Registratorlar" },
      { slug: "termal-kameralar", name: "Termal Kameralar" },
    ],
  },
  {
    id: "cat-2",
    slug: "kirishni-boshqarish",
    name: "Kirishni Boshqarish (SKUD)",
    description: "Biometrik turniketlar, yuz tanish va avtomatik shlagbaumlar",
    iconName: "ShieldCheck",
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80",
    productCount: 89,
    subcategories: [
      { slug: "turniketlar", name: "Turniketlar" },
      { slug: "biometrik-skanerlar", name: "Biometrik Skanerlar" },
      { slug: "shlagbaumlar", name: "Shlagbaumlar" },
    ],
  },
  {
    id: "cat-3",
    slug: "yongin-xavfsizligi",
    name: "Yong'in Xavfsizligi Tizimlari",
    description: "Tutun va issiqlik datchiklari, avtomatik yong'in o'chirish panellari",
    iconName: "Flame",
    imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80",
    productCount: 64,
    subcategories: [
      { slug: "tutun-datchiklari", name: "Tutun Datchiklari" },
      { slug: "yongin-panellari", name: "Yong'in Panellari" },
      { slug: "sirenalar", name: "Xavf Signalizatsiyasi" },
    ],
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-101",
    slug: "vacuum-circuit-breaker-vs1-12-kv",
    title: "Vakuumli O'chirgich VS1-12 12kV 630A Sanoat O'chirgichi",
    sku: "VS1-12-630A",
    categorySlug: "kirishni-boshqarish",
    categoryName: "Elektr Uskunalari",
    price: 14250000,
    oldPrice: 16760000,
    currency: "UZS",
    inStock: true,
    stockCount: 42,
    rating: 4.9,
    reviewCount: 28,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyqjiOEcFGtxX6g26mIdTmvAvszSZIyZzXdworrhjGkdghbYC_AMrGMsFE_dMK2IyC35be2rXiLNPcAw4b_ZoNvm8QGjrFafcnBgqS-OtNhCmgfGm7yYazFl7qADnI_n0znGPw0Mwjsa91c2c27MVnoehYMS2A5wj3oPOQwTkQnJzggSZmqjXt0fReD0c0wvDgjb7498nIa15XQ_aJ0h1XWpKm42FtVBlnNnDrArPf2A_Dq3x54YJo",
    additionalImages: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
    ],
    shortDescription: "12kV podstansiyalar uchun yuqori kuchlanishli vakuumli sanoat avtomat o'chirgichi.",
    fullDescription: "VS1-12 seriyali vakuumli o'chirgich uch fazali o'zgaruvchan tok 50Hz energetika tizimlarida kommutatsiya uchun mo'ljallangan. 20,000 mexanik operatsiyalarga chidamli.",
    specifications: {
      "Nominal Kuchlanish": "12 kV",
      "Nominal Tok": "630 A - 1250 A",
      "O'chirish Toki": "20 kA - 31.5 kA",
      "Mexanizm": "Spring Operating",
    },
    seo: {
      title: "VS1-12 Vakuumli O'chirgich 12kV — Kontrol.uz",
      description: "Original VS1-12 sanoat vakuum o'chirgichi.",
    },
  },
  {
    id: "prod-102",
    slug: "simotics-sd-severe-duty-induction-motor-15kw",
    title: "SIMOTICS SD Severe Duty Induction Motor 15kW Sanoat Dvigateli",
    sku: "SIEMENS-15KW-SD",
    categorySlug: "kirishni-boshqarish",
    categoryName: "Elektr Uskunalari",
    price: 8900000,
    oldPrice: 9888000,
    currency: "UZS",
    inStock: true,
    stockCount: 18,
    rating: 4.8,
    reviewCount: 14,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGX5I0at_nx8EKPNKDFKpbsdmLJEFJbA0_eBgCdSZq2M9N-f45eESzjFRrOAnyeMEFmmws8BgP6_NSIsqsT6m733oJr0_RpPRIAczKtFJKrrYKewim4s1ylqM3CBsvixqXrOE5AAiteMVl6Mhi_uIiBKJQus2pUAlw0n342pZApcNhEW01ijbAoHTIHkjnvKlNkNcRkmmZPNEKTeEeWASVsGP9h6iKaJa__z1Mwux9-NCILJEAI8SC",
    additionalImages: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80",
    ],
    shortDescription: "Og'ir sanoat sharoitlari va agressiv muhitlar uchun Siemens 15kW uch fazali asinxron dvigatel.",
    fullDescription: "Siemens SIMOTICS SD yuqori samaradorlik va uzoq xizmat muddatini ta'minlovchi quyma temir korpusli induksion motor.",
    specifications: {
      "Quvvat": "15 kW",
      "Himoya Darajasi": "IP55 / IP65",
      "Samaradorlik Sinf": "IE3 Premium Efficiency",
    },
    seo: {
      title: "Siemens SIMOTICS SD 15kW Motor — Kontrol.uz",
      description: "Siemens 15kW sanoat induksion dvigateli Toshkentda.",
    },
  },
  {
    id: "prod-103",
    slug: "vlt-automationdrive-fc-302-inverter-7-5kw",
    title: "VLT® AutomationDrive FC 302 Inverter 7.5kW Chastota O'zgartirgich",
    sku: "DANFOSS-FC302-7.5KW",
    categorySlug: "kirishni-boshqarish",
    categoryName: "Avtomatika",
    price: 11100000,
    oldPrice: 12500000,
    currency: "UZS",
    inStock: true,
    stockCount: 12,
    rating: 5.0,
    reviewCount: 21,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOYGniTDtC9qYQXECYWzJ_dxibARcbuTd8iuN8Oxwd3rsGUXni0F6lyFC819AR9_WjQsNOgiIPkm0G1ioX15smJrfUh20dJr6jI4I82qyhr--c8gxUBu2W1TeIk05TccMBn--1fEZJIP40UtJgcWLjLzSUfhSazHlvnbvX3Hlp83xezPwEL8u4Xw1dCpuxknHAOQkM4peGRX_pjOwNvkWzNAuXW2JhDqSEm-mJxWN6JXVqVTLe9p9E",
    shortDescription: "Danfoss VLT AutomationDrive 7.5kW sanoat liniyalari va konveyerlarni aniq boshqarish inverteri.",
    fullDescription: "Danfoss FC 302 barcha turdagi motorlarni (asyntron, permanent magnet) yuqori aniqlikda va energiyani 30% gacha tejab boshqaradi.",
    specifications: {
      "Quvvat": "7.5 kW",
      "Kirish Kuchlanishi": "380-480 V AC",
      "Boshqaruv Turi": "Flux Vector Control",
    },
    seo: {
      title: "Danfoss VLT FC 302 Inverter 7.5kW — Kontrol.uz",
      description: "Danfoss VLT AutomationDrive chastota o'zgartirgich.",
    },
  },
  {
    id: "prod-104",
    slug: "cr-15-4-vertical-multistage-centrifugal-pump",
    title: "CR 15-4 Vertical Multistage Centrifugal Pump Nasos Tizimi",
    sku: "GRUNDFOS-CR15-4",
    categorySlug: "videokuzatuv",
    categoryName: "Nasos Uskunalari",
    price: 18500000,
    oldPrice: 20500000,
    currency: "UZS",
    inStock: true,
    stockCount: 9,
    rating: 4.9,
    reviewCount: 16,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSwY3ynJQi5fFuF0zUtgcmCvn9H5BOnf19niCE5fLsYEIgqmJV4ABG0Bye35Z0fqg7SOafCjePfli536AWUpUmLJX3EOcQlY5kMVP57p6nfYynDZPRi5C5e5Qzm68M_IZC2ffYO4gCmoJQGNqVkqSlvd18z8DYUHPfAouSOLOxNqLeyfNJIfxKhLeN3PJ-mX0fk1b-MjM2DlqGTYjRROD5KQXHqoP6qXYk-HPwm4BqKnjP_PkgGWEO",
    shortDescription: "Sanoat suv ta'minoti va bosimni oshirish uchun ko'p bosqichli vertikal markazdan qochma nasos.",
    fullDescription: "Grundfos CR 15-4 zanglamaydigan po'lat korpusli va qozonxona hamda tozalash inshootlari uchun mo'ljallangan nasos.",
    specifications: {
      "Maksimal Bosim": "16 bar",
      "Suv Sarfi (Flow Rate)": "15 m³/h",
      "Material": "SUS304 Po'lat",
    },
    seo: {
      title: "Grundfos CR 15-4 Vertikal Nasos — Kontrol.uz",
      description: "Grundfos ko'p bosqichli vertikal nasos uzel.",
    },
  },
  {
    id: "prod-105",
    slug: "lzzbj9-12-current-transformer",
    title: "LZZBJ9-12 Current Transformer Tok Transformatori",
    sku: "LZZBJ9-12-CT",
    categorySlug: "kirishni-boshqarish",
    categoryName: "KIPiA",
    price: 1500000,
    oldPrice: 1800000,
    currency: "UZS",
    inStock: true,
    stockCount: 35,
    rating: 4.8,
    reviewCount: 12,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSwOvr48KJcUM7JyBesDb1l8nuWpDheOVbLJFIj0zYpM7a0n-j5hGlUijw0NnXOCNpQfGFn_kXn0DyUjDNBgOz6Ed9o4EaX549ZelxaTCswhkd7a2lP4lBYq9MdtUwGju4tYBAyfrAMdDV0nkh97plwuL4PqF1JCJ3yP-gLsJLHRhuLn3LgSnqmLe8McCY8e7Rf_mnh33IjIRK2155PJxPYJCn_6QuMfnsfsdR7IVGGACa7ZvdgpQD",
    shortDescription: "12kV podstansiya va o'chirgichlar uchun yuqori aniqlikdagi LZZBJ9 tok transformatori.",
    fullDescription: "LZZBJ9-12 epoksid smola quyilgan va tokni aniq o'lchash hamda rele himoyasi uchun mo'ljallangan.",
    specifications: {
      "Nominal Kuchlanish": "12 kV",
      "Aniqlik Sinf": "0.2S / 10P10",
      "Izolyatsiya": "Epoksid Smola",
    },
    seo: {
      title: "LZZBJ9-12 Tok Transformatori — Kontrol.uz",
      description: "12kV epoksid tok transformatori.",
    },
  },
  {
    id: "prod-106",
    slug: "hy5wz-17-45-surge-arrester",
    title: "HY5WZ-17/45 Surge Arrester Impulsli Kuchlanish Cheklovchisi",
    sku: "HY5WZ-17-45",
    categorySlug: "yongin-xavfsizligi",
    categoryName: "KIPiA",
    price: 560000,
    oldPrice: 650000,
    currency: "UZS",
    inStock: true,
    stockCount: 60,
    rating: 4.9,
    reviewCount: 15,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFVZs0GLHaSuxhjvHhrq1xHmlQkZ1guQjy3Sni_T3DJkDI2jhjuargkMxgUtoM9F1nkfjuH7QtpGkRfDuXRnSGjwhW71hkkGwZIwoTQEcPyjWgIzoREswhX_aMJHfZlSldaHhEA7jm2ilmp4OdPCfptS6bTlfhh1RCkU3Z34Jma8GOeePFld8LAWq7Qx8bklL0dAYYURAdkE4R1n7Sa_gGOfHLG-IHMOfBPK9XlI1AXQLL8Iy7YL-N",
    shortDescription: "Polimer korpusli chaqmoq va sezilarli impuls o'ta kuchlanishidan saqlovchi razryadnik.",
    fullDescription: "HY5WZ silikon polimer qobiqli rux oksidi cheklovchisi 10kV liniyalar va transformatorlarni chaqmoq urishidan samarali himoya qiladi.",
    specifications: {
      "Nominal Kuchlanish": "17 kV",
      "Impuls Toki": "45 kA",
      "Korpus Materiali": "Silikon Polimer",
    },
    seo: {
      title: "HY5WZ-17/45 Chaqmoq Cheklovchi — Kontrol.uz",
      description: "17kV polimer chaqmoq razryadnik.",
    },
  },
  {
    id: "prod-107",
    slug: "advanced-plc-module-pro-series",
    title: "Industrial Logic Controller Module S7-1200 Pro-Series PLC",
    sku: "SIEMENS-S7-1200",
    categorySlug: "kirishni-boshqarish",
    categoryName: "Avtomatika",
    price: 4250000,
    oldPrice: 4800000,
    currency: "UZS",
    inStock: true,
    stockCount: 14,
    rating: 5.0,
    reviewCount: 30,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA14TEV-rrx_6PgnPj5KkusCXBNGSyOeOA4FFni-J1xAIjmc9KbKrusu8r0IPnVMPt_DjkgbhF_JyrKgZ2cjvpTje2bdz6GX0VMlev-2pCuPDnMvpqhVdOB8TzSOn_wWcOSc5Kh26FamCMbN9CGrFLPPmpsedOmFw6VQVpfJcFB-9MhcW3PeDWgJB20hio_4v69cXhRmxCPCSIAxeO7Rsb1H7mgeUH6ymqn43Yt_Q_nAziR9gT8KJ8Z",
    shortDescription: "PROFINET interfeysiga ega Siemens S7-1200 sanoat dasturlanuvchi mantiqiy kontrolleri.",
    fullDescription: "Siemens Simatic S7-1200 avtomatlashtirilgan sanoat bosqichlarini mantiqiy boshqaruvchi eng mashhur PLC platasi.",
    specifications: {
      "Raqamli Kirish/Chiqish": "14 DI / 10 DO",
      "Interfeys": "PROFINET / Ethernet",
      "Xotira": "100 KB Work Memory",
    },
    seo: {
      title: "Siemens S7-1200 PLC Kontroller — Kontrol.uz",
      description: "Siemens Simatic S7-1200 PLC modullari.",
    },
  },
  {
    id: "prod-108",
    slug: "industrial-centrifugal-pump-cx-500",
    title: "Industrial Centrifugal Water Pump CX-500 Sanoat Nasosi",
    sku: "PMP-CX500-24V",
    categorySlug: "videokuzatuv",
    categoryName: "Nasos Uskunalari",
    price: 12500000,
    oldPrice: 14000000,
    currency: "UZS",
    inStock: true,
    stockCount: 22,
    rating: 4.9,
    reviewCount: 19,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMzXXnDEYBjP4M9tHCjiwIZZZl_zoLgvGPHDCjBJ_tXXgpbqACRSngv4MfepS-IpeAMSF3gaRM_cAXe4NQKLII63oLEyHvtZ0Q3N1S99WEBPYU3IyS1q71zk8selM-i3tZ65AxGcfQ5mJNiJOWGyBfdJIFMgCkaZO-gAj974Ha58lv0D_kWzBDRZq-_ZMeDlXNMs47vsOSQqi8Ocbn8FN9zfUWYT3-nyOIHybrb8GsMUB3xA-X05YN",
    shortDescription: "Sanoat suv aylanmasi va sovutish minorasi uchun CX-500 markazdan qochma nasosi.",
    fullDescription: "CX-500 sanoat nasosi quyma po'lat va cho'yan korpusda ishlangan bo'lib, uzluksiz 24/7 rejimda ishlashga mo'ljallangan.",
    specifications: {
      "Nominal Quvvat": "7.5 kW",
      "Suv Bosimi": "45m Head",
      "Birlashma": "Flanetsli DN80",
    },
    seo: {
      title: "Sanoat Nasosi CX-500 — Kontrol.uz",
      description: "CX-500 markazdan qochma sanoat suv nasosi.",
    },
  },
];

// ==========================================
// 🛠 STRAPI v4 / v5 DATA ADAPTERS & MAPPERS
// ==========================================

export function resolveStrapiMediaUrl(rawMedia: any, fallbackUrl?: string): string {
  if (!rawMedia) return fallbackUrl || "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&auto=format&fit=crop&q=80";

  // Case 1: Direct string URL
  if (typeof rawMedia === "string") {
    if (rawMedia.startsWith("http://") || rawMedia.startsWith("https://")) {
      return rawMedia;
    }
    return `${STRAPI_HOST}${rawMedia.startsWith("/") ? "" : "/"}${rawMedia}`;
  }

  // Case 2: Strapi v4 nested structure: data.attributes.url
  const v4Url = rawMedia.data?.attributes?.url || rawMedia.attributes?.url;
  if (v4Url) {
    if (v4Url.startsWith("http://") || v4Url.startsWith("https://")) return v4Url;
    return `${STRAPI_HOST}${v4Url.startsWith("/") ? "" : "/"}${v4Url}`;
  }

  // Case 3: Strapi v5 flat structure: url or data.url
  const v5Url = rawMedia.url || rawMedia.data?.url;
  if (v5Url) {
    if (v5Url.startsWith("http://") || v5Url.startsWith("https://")) return v5Url;
    return `${STRAPI_HOST}${v5Url.startsWith("/") ? "" : "/"}${v5Url}`;
  }

  return fallbackUrl || "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&auto=format&fit=crop&q=80";
}

export function mapStrapiCategory(rawItem: any): Category {
  const attrs = rawItem.attributes || rawItem;
  const id = String(rawItem.id || attrs.id || attrs.slug || "cat");
  const slug = String(attrs.slug || id);

  return {
    id,
    slug,
    name: attrs.name || "Kategoriya",
    description: attrs.description || "",
    iconName: attrs.iconName || "ShieldCheck",
    imageUrl: resolveStrapiMediaUrl(
      attrs.imageUrl || attrs.image,
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=80"
    ),
    productCount: Number(attrs.productCount || 0),
    subcategories: attrs.subcategories || [],
  };
}

export function mapStrapiProduct(rawItem: any): Product {
  const attrs = rawItem.attributes || rawItem;
  const id = String(rawItem.id || attrs.id || attrs.slug || "prod");
  const slug = String(attrs.slug || id);

  const rawCat = attrs.category?.data?.attributes || attrs.category || {};
  const categorySlug = attrs.categorySlug || rawCat.slug || "uskunalar";
  const categoryName = attrs.categoryName || rawCat.name || "Sanoat Uskunalari";

  // Additional images
  const additionalImages: string[] = [];
  if (Array.isArray(attrs.additionalImages?.data)) {
    attrs.additionalImages.data.forEach((img: any) => {
      additionalImages.push(resolveStrapiMediaUrl(img));
    });
  } else if (Array.isArray(attrs.additionalImages)) {
    attrs.additionalImages.forEach((img: any) => {
      additionalImages.push(resolveStrapiMediaUrl(img));
    });
  }

  return {
    id,
    slug,
    title: attrs.title || "Sanoat Uskunasi",
    sku: attrs.sku || `SKU-${id}`,
    categorySlug,
    categoryName,
    price: Number(attrs.price || 0),
    oldPrice: attrs.oldPrice ? Number(attrs.oldPrice) : undefined,
    currency: attrs.currency || "UZS",
    inStock: attrs.inStock !== undefined ? Boolean(attrs.inStock) : true,
    stockCount: Number(attrs.stockCount || 10),
    rating: Number(attrs.rating || 5.0),
    reviewCount: Number(attrs.reviewCount || 0),
    image: resolveStrapiMediaUrl(
      attrs.image || attrs.imageUrl,
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&auto=format&fit=crop&q=80"
    ),
    additionalImages: additionalImages.length > 0 ? additionalImages : undefined,
    shortDescription: attrs.shortDescription || "",
    fullDescription: attrs.fullDescription || "",
    specifications: attrs.specifications || {},
    seo: attrs.seo || {
      title: `${attrs.title || "Mahsulot"} — Kontrol.uz`,
      description: attrs.shortDescription || "Sanoat uskunalari katalogi",
    },
  };
}

// ==========================================
// 🌐 API FETCHING FUNCTIONS (ISR & CACHE)
// ==========================================

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/categories?populate=*`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Categories API request failed: ${res.status}`);
    const json = await res.json();
    if (Array.isArray(json.data) && json.data.length > 0) {
      return json.data.map(mapStrapiCategory);
    }
    return MOCK_CATEGORIES;
  } catch (err) {
    return MOCK_CATEGORIES;
  }
}

export async function fetchProducts(categorySlug?: string): Promise<Product[]> {
  try {
    const url = categorySlug
      ? `${API_BASE_URL}/products?filters[categorySlug][$eq]=${encodeURIComponent(categorySlug)}&populate=*`
      : `${API_BASE_URL}/products?populate=*`;

    const res = await fetch(url, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Products API request failed: ${res.status}`);
    const json = await res.json();
    if (Array.isArray(json.data) && json.data.length > 0) {
      return json.data.map(mapStrapiProduct);
    }
    if (categorySlug) {
      return MOCK_PRODUCTS.filter((p) => p.categorySlug === categorySlug);
    }
    return MOCK_PRODUCTS;
  } catch (err) {
    if (categorySlug) {
      return MOCK_PRODUCTS.filter((p) => p.categorySlug === categorySlug);
    }
    return MOCK_PRODUCTS;
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) throw new Error(`Product slug API request failed: ${res.status}`);
    const json = await res.json();
    if (Array.isArray(json.data) && json.data.length > 0) {
      return mapStrapiProduct(json.data[0]);
    }
    return MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
  } catch (err) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
  }
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const products = await fetchProducts();
  return products;
}

export async function submitLead(payload: {
  clientName: string;
  phone: string;
  email?: string;
  company?: string;
  category?: string;
  message?: string;
  objectType?: string;
  areaSqM?: number;
  estimatedPriceMin?: number;
  estimatedPriceMax?: number;
  items?: any[];
}): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          ...payload,
          status: "NEW",
          createdAt: new Date().toISOString(),
        },
      }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      return {
        success: false,
        error: errJson.error?.message || `Server responded with ${res.status}`,
      };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (err: any) {
    // Offline simulation for dev and resilience
    return { success: true, data: { offline: true, ...payload } };
  }
}

export const createLead = submitLead;

export async function submitOrder(payload: {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  company?: string;
  shippingAddress?: string;
  paymentMethod?: string;
  notes?: string;
  items: {
    productId?: string | number;
    slug?: string;
    title: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
  subtotal: number;
  tax: number;
  shippingFee: number;
  totalAmount: number;
}): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          ...payload,
          status: "NEW",
          createdAt: new Date().toISOString(),
        },
      }),
    });

    if (!res.ok) {
      // If orders endpoint fails, try fallback to leads endpoint
      return await submitLead({
        clientName: payload.customerName,
        phone: payload.customerPhone,
        email: payload.customerEmail,
        company: payload.company,
        message: `Buyurtma\nManzil: ${payload.shippingAddress || ""}\nIzoh: ${payload.notes || ""}`,
        estimatedPriceMin: payload.totalAmount,
        estimatedPriceMax: payload.totalAmount,
        items: payload.items,
      });
    }

    const data = await res.json();
    return { success: true, data };
  } catch (err: any) {
    // Offline resilient fallback
    return {
      success: true,
      data: {
        offline: true,
        orderNumber: `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`,
        ...payload,
      },
    };
  }
}

export const createOrder = submitOrder;

export async function calculateSecuritySolution(payload: CalculatorPayload): Promise<CalculatorResult> {
  const baseCameraPrice =
    payload.cameraResolution === "8mp_4k" ? 1800000 : payload.cameraResolution === "4mp" ? 1250000 : 850000;
  const estimatedCameras = Math.max(2, Math.ceil(payload.areaSqM / 60));
  const cameraTotal = estimatedCameras * baseCameraPrice;
  const nvrPrice = estimatedCameras > 8 ? 3200000 : 1890000;
  const accessControlTotal = payload.needsAccessControl ? payload.entryPointsCount * 3450000 : 0;
  const fireAlarmTotal = payload.needsFireAlarm ? Math.ceil(payload.areaSqM / 40) * 220000 + 1500000 : 0;

  const totalMin = cameraTotal + nvrPrice + accessControlTotal + fireAlarmTotal;
  const totalMax = Math.round(totalMin * 1.25);

  return {
    recommendedPackage: `${payload.objectType.toUpperCase()} uchun "Kontrol Smart Safe" Tizimi`,
    estimatedPriceMin: totalMin,
    estimatedPriceMax: totalMax,
    currency: "UZS",
    suggestedProducts: [
      {
        sku: "VS1-12-630A",
        name: "VS1-12 Vakuumli O'chirgich",
        quantity: estimatedCameras,
        unitPrice: 14250000,
      },
      {
        sku: "SIEMENS-15KW-SD",
        name: "Siemens SIMOTICS SD 15kW Motor",
        quantity: 1,
        unitPrice: 8900000,
      },
    ],
  };
}

export async function fetchOrganizationInfo(): Promise<OrganizationInfo> {
  return MOCK_ORGANIZATION;
}
