import { Product, Category, CalculatorPayload, CalculatorResult, OrganizationInfo } from "@/shared/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.kontrol.uz/api";
const STRAPI_HOST = API_BASE_URL.replace(/\/api\/?$/, "");

export const MOCK_ORGANIZATION: OrganizationInfo = {
  name: "Kontrol.uz",
  legalName: "Kontrol Security Systems LLC",
  url: "https://kontrol.uz",
  logo: "https://kontrol.uz/logo.png",
  telephone: "+998 78 113 70 27",
  email: "info@kontrol.uz",
  address: {
    streetAddress: "Amir Temur shoh ko'chasi, 108",
    addressLocality: "Toshkent",
    addressCountry: "UZ",
  },
  openingHours: "Mo-Fr 09:00-18:00, Sa 09:00-15:00",
  sameAs: [
    "https://t.me/kontrol_uz",
    "https://www.instagram.com/kontroluz/?hl=en",
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
  if (!rawMedia) return fallbackUrl || "";

  // Case 1: Direct string URL
  if (typeof rawMedia === "string") {
    if (rawMedia.startsWith("http://") || rawMedia.startsWith("https://") || rawMedia.startsWith("data:")) {
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

  return fallbackUrl || "";
}

export function mapStrapiCategory(rawItem: any): Category {
  const attrs = rawItem.attributes || rawItem;
  const id = String(rawItem.id || attrs.id || attrs.slug || "cat");
  const slug = String(attrs.slug || id);
  const order =
    attrs.order !== undefined && attrs.order !== null
      ? Number(attrs.order)
      : undefined;

  // Extract nested subcategories from Strapi v4/v5
  let subcategories: {
    id?: string | number;
    slug: string;
    name: string;
    iconName?: string;
    order?: number;
  }[] = [];

  if (Array.isArray(attrs.subcategories?.data)) {
    subcategories = attrs.subcategories.data.map((sub: any) => {
      const subAttrs = sub.attributes || sub;
      return {
        id: sub.id,
        slug: subAttrs.slug || String(sub.id),
        name: subAttrs.name || "Kategoriya",
        iconName: subAttrs.iconName,
        order:
          subAttrs.order !== undefined && subAttrs.order !== null
            ? Number(subAttrs.order)
            : undefined,
      };
    });
  } else if (Array.isArray(attrs.subcategories)) {
    subcategories = attrs.subcategories.map((sub: any) => {
      const subAttrs = sub.attributes || sub;
      return {
        id: sub.id,
        slug: subAttrs.slug || sub.slug || String(sub.id || ""),
        name: subAttrs.name || sub.name || "Kategoriya",
        iconName: subAttrs.iconName || sub.iconName,
        order:
          subAttrs.order !== undefined && subAttrs.order !== null
            ? Number(subAttrs.order)
            : undefined,
      };
    });
  }

  // Sort subcategories by custom order asc, then id asc
  subcategories.sort(
    (a, b) =>
      (a.order ?? 999) - (b.order ?? 999) ||
      Number(a.id || 0) - Number(b.id || 0)
  );

  return {
    id,
    slug,
    name: attrs.name || "Kategoriya",
    description: attrs.description || "",
    iconName: attrs.iconName || "ShieldCheck",
    imageUrl: resolveStrapiMediaUrl(attrs.imageUrl || attrs.image, ""),
    productCount: Number(
      attrs.productCount || (subcategories.length > 0 ? subcategories.length * 10 : 10)
    ),
    order,
    subcategories,
  };
}

export function mapStrapiProduct(rawItem: any): Product {
  const attrs = rawItem.attributes || rawItem;
  const id = String(rawItem.id || attrs.id || attrs.slug || "prod");
  const slug = String(attrs.slug || id);

  const rawCat = attrs.category?.data?.attributes || attrs.category?.attributes || attrs.category || {};
  const categoryRelationSlug = rawCat.slug ? String(rawCat.slug) : undefined;
  const categorySlug = categoryRelationSlug || attrs.categorySlug || "uskunalar";
  const categoryName = rawCat.name || attrs.categoryName || "Sanoat Uskunalari";

  // Extract video if present in Strapi
  let videoUrl: string | undefined = undefined;
  const rawVideo =
    attrs.videoUrl ||
    attrs.video_url ||
    attrs.video ||
    attrs.videoFile ||
    attrs.youtubeUrl ||
    attrs.youtube_url;

  if (typeof rawVideo === "string" && rawVideo.trim()) {
    videoUrl = rawVideo.trim();
  } else if (rawVideo && typeof rawVideo === "object") {
    const resolvedV = resolveStrapiMediaUrl(rawVideo, "");
    if (resolvedV) videoUrl = resolvedV;
  }

  // Robust image extraction: check coverImage, images array, image, imageUrl, media
  const rawCover = attrs.coverImage || attrs.image || attrs.imageUrl;
  const rawImagesList =
    attrs.images?.data ||
    attrs.images ||
    attrs.additionalImages?.data ||
    attrs.additionalImages ||
    attrs.gallery?.data ||
    attrs.gallery ||
    attrs.media?.data ||
    attrs.media;

  let mainImage = "";
  if (rawCover) {
    mainImage = resolveStrapiMediaUrl(rawCover, "");
  }

  const additionalImages: string[] = [];

  if (Array.isArray(rawImagesList)) {
    rawImagesList.forEach((img: any) => {
      // Check if this media item is a video
      const mime = img?.attributes?.mime || img?.mime || "";
      if (typeof mime === "string" && mime.startsWith("video/")) {
        const vUrl = resolveStrapiMediaUrl(img, "");
        if (vUrl && !videoUrl) videoUrl = vUrl;
        return;
      }

      const resolved = resolveStrapiMediaUrl(img, "");
      if (resolved) {
        if (!mainImage) {
          mainImage = resolved;
        } else if (resolved !== mainImage && !additionalImages.includes(resolved)) {
          additionalImages.push(resolved);
        }
      }
    });
  }

  // Fallback default image placeholder if no image exists in Strapi
  if (!mainImage) {
    mainImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f1f4f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' font-weight='bold' fill='%23004094'%3EKONTROL.UZ%3C/text%3E%3C/svg%3E";
  }

  return {
    id,
    slug,
    title: attrs.title || "Sanoat Uskunasi",
    sku: attrs.sku || `SKU-${id}`,
    categorySlug,
    categoryName,
    categoryRelationSlug,
    price: Number(attrs.price || 0),
    oldPrice: attrs.oldPrice ? Number(attrs.oldPrice) : undefined,
    currency: attrs.currency || "UZS",
    inStock: attrs.inStock !== undefined ? Boolean(attrs.inStock) : true,
    stockCount: Number(attrs.stockCount || 10),
    rating: Number(attrs.rating || 5.0),
    reviewCount: Number(attrs.reviewCount || 0),
    image: mainImage,
    additionalImages: additionalImages.length > 0 ? additionalImages : undefined,
    videoUrl,
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

export async function fetchCategories(
  localeOrOptions?:
    | string
    | {
        locale?: string;
        order?: number;
        id?: number | string;
        slug?: string;
        rootOnly?: boolean;
      }
): Promise<Category[]> {
  try {
    const opts =
      typeof localeOrOptions === "string"
        ? { locale: localeOrOptions }
        : localeOrOptions || {};

    const targetLocale = opts.locale || "ru";

    const fetchByLocale = async (loc: string) => {
      const params = new URLSearchParams();
      params.set("populate", "*");
      params.set("locale", loc);
      params.set("pagination[pageSize]", "100");

      // Root category filtering per Backend 2026-08-25 spec (rootOnly=true / parent null)
      if (opts.rootOnly || (opts.rootOnly === undefined && !opts.slug && opts.id === undefined)) {
        params.set("rootOnly", "true");
        params.set("filters[parent][$null]", "true");
      }

      if (opts.order !== undefined) {
        params.set("filters[order][$eq]", String(opts.order));
      }
      if (opts.id !== undefined) {
        params.set("filters[id][$eq]", String(opts.id));
      }
      if (opts.slug) {
        params.set("filters[slug][$eq]", opts.slug);
      }

      const url = `${API_BASE_URL}/categories?${params.toString()}`;
      const isClient = typeof window !== "undefined";
      const fetchOpts: RequestInit = isClient
        ? { cache: "no-store" }
        : { next: { revalidate: 30 } };

      const res = await fetch(url, fetchOpts);
      if (!res.ok) return [];
      const json = await res.json();
      return Array.isArray(json.data) ? json.data : [];
    };

    // 1. First attempt with requested language (e.g. uz, ru, en)
    let rawList = await fetchByLocale(targetLocale);

    // 2. If empty and not already 'all', fallback to 'all' so no blank screen
    if (rawList.length === 0 && targetLocale !== "all") {
      rawList = await fetchByLocale("all");
    }

    if (rawList.length > 0) {
      // Prioritize root categories (where parent is null)
      const rootEntries = rawList.filter((item: any) => {
        const attrs = item.attributes || item;
        const parentData = attrs.parent?.data;
        return !parentData;
      });
      const targetEntries = rootEntries.length > 0 ? rootEntries : rawList;
      const mapped = targetEntries.map(mapStrapiCategory);

      // Explicitly sort by order asc, then id asc
      mapped.sort(
        (a: Category, b: Category) =>
          (a.order ?? 999) - (b.order ?? 999) ||
          Number(a.id || 0) - Number(b.id || 0)
      );

      return mapped;
    }
    return MOCK_CATEGORIES;
  } catch (err) {
    return MOCK_CATEGORIES;
  }
}

export async function fetchProducts(
  categorySlugOrOptions?:
    | string
    | {
        categorySlug?: string;
        locale?: string;
        search?: string;
        minPrice?: number;
        maxPrice?: number;
        sort?: string;
      }
): Promise<Product[]> {
  try {
    const opts =
      typeof categorySlugOrOptions === "string"
        ? { categorySlug: categorySlugOrOptions }
        : categorySlugOrOptions || {};

    const targetLocale = opts.locale || "ru";

    const fetchByLocale = async (loc: string) => {
      const params = new URLSearchParams();
      params.set("populate", "*");
      params.set("locale", loc);
      params.set("pagination[pageSize]", "100");

      if (opts.search) params.set("search", opts.search);
      if (opts.minPrice !== undefined) params.set("minPrice", String(opts.minPrice));
      if (opts.maxPrice !== undefined) params.set("maxPrice", String(opts.maxPrice));
      if (opts.sort) params.set("sort", opts.sort);

      const url = `${API_BASE_URL}/products?${params.toString()}`;
      const isClient = typeof window !== "undefined";
      const fetchOpts: RequestInit = isClient
        ? { cache: "no-store" }
        : { next: { revalidate: 30 } };

      const res = await fetch(url, fetchOpts);
      if (!res.ok) return [];
      const json = await res.json();
      return Array.isArray(json.data) ? json.data : [];
    };

    // 1. Fetch with requested language
    let rawList = await fetchByLocale(targetLocale);

    // 2. Fallback to all if empty
    if (rawList.length === 0 && targetLocale !== "all") {
      rawList = await fetchByLocale("all");
    }

    if (rawList.length > 0) {
      let mapped = rawList.map(mapStrapiProduct);
      if (opts.categorySlug) {
        mapped = mapped.filter(
          (p: Product) =>
            p.categorySlug === opts.categorySlug ||
            p.categoryRelationSlug === opts.categorySlug ||
            p.categorySlug.toLowerCase() === opts.categorySlug?.toLowerCase()
        );
      }
      return mapped;
    }
    if (opts.categorySlug) {
      return MOCK_PRODUCTS.filter((p) => p.categorySlug === opts.categorySlug);
    }
    return MOCK_PRODUCTS;
  } catch (err) {
    const cat =
      typeof categorySlugOrOptions === "string"
        ? categorySlugOrOptions
        : categorySlugOrOptions?.categorySlug;
    if (cat) {
      return MOCK_PRODUCTS.filter((p) => p.categorySlug === cat);
    }
    return MOCK_PRODUCTS;
  }
}

export async function fetchProductBySlug(slug: string, locale?: string): Promise<Product | null> {
  try {
    const targetLocale = locale || "ru";

    const fetchByLocale = async (loc: string) => {
      const res = await fetch(
        `${API_BASE_URL}/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*&locale=${encodeURIComponent(loc)}`,
        { next: { revalidate: 30 } }
      );
      if (!res.ok) return null;
      const json = await res.json();
      return Array.isArray(json.data) && json.data.length > 0 ? json.data[0] : null;
    };

    let item = await fetchByLocale(targetLocale);
    if (!item && targetLocale !== "all") {
      item = await fetchByLocale("all");
    }

    if (item) {
      return mapStrapiProduct(item);
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
    const isClient = typeof window !== "undefined";
    const endpoint = isClient ? "/api/leads" : `${API_BASE_URL}/leads`;

    const res = await fetch(endpoint, {
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
    const isClient = typeof window !== "undefined";
    const endpoint = isClient ? "/api/orders" : `${API_BASE_URL}/orders`;

    const res = await fetch(endpoint, {
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
