# 🏭 Kontrol.uz — Sanoat Uskunalari va Xavfsizlik Tizimlari B2B Platformasi

> **Kontrol.uz** — O'zbekistondagi yirik sanoat korxonalari, zavodlar va podstansiyalar uchun yuqori kuchlanishli elektr uskunalari, avtomatika, KIPiA, nasoslar, videokuzatuv va SKUD tizimlarini sotish hamda muhandislik xizmatlarini taqdim etuvchi zamonaviy B2B veb-platformasi.

[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()

---

## ✨ Asosiy Xususiyatlar (Key Features)

1. **🎨 Industrial Precision Dizayn Tizimi:**
   - Sanoat korporativ ranglar palitrasi (`#004094` Sanoat Ko'ki, `#FF6B00` Energiya Apelsini, `#00A67E` Xavfsizlik Yashili).
   - Google `Inter` tipografiyasi va zamonaviy responsive UX/UI komponentlar.
   - 6 xil rangli interaktiv kategoriya akordeon plitkalari (*Vertikal nasoslar, Granpamp, Granflou, KIPIiA manometrlar, Festo pnevmatika, Qozonxona avtomatikasi*).

2. **🌐 3 Tilli Ko'p Tillilik (i18n):**
   - O'zbekcha (`uz`), Ruscha (`ru`) va Inglizcha (`en`) tillari to'liq qo'llab-quvvatlanadi.
   - Barcha sahifalar, navigatsiya, filtrlar, formalar va tugmalar ko'p tilli dictionary (`lib/i18n/translations.ts`) orqali ishlaydi.
   - Sleek **LanguageDropdown** qalqib chiquvchi menyu bilan integratsiya qilingan.

3. **🛒 Real-time Savat (Cart Management):**
   - Global `CartProvider` va `useCart()` hook'i.
   - Savatga qo'shish, miqdorni o'zgartirish (`+` / `-`), tozalash, QQS (12%) va yetkazib berish hisob-kitobi.
   - Brauzerning `localStorage` xotirasida SSR/CSR hydration xatoligisiz xavfsiz saqlash.

4. **🔍 Ko'p Mezonli Qidiruv va Filtrlar (URL Query Sync):**
   - Real-time qidiruv (`search`), kategoriya (`category`), saralash (`sort=popular|price-asc|price-desc|newest`) va narx oralig'i (`minPrice`, `maxPrice`).
   - Qidiruv natijalari beydji va bir bosishda tozalash imkoniyati.

5. **🖼️ Mobil Galereya & Lightbox Modal:**
   - Smartfonlarda barmog'i bilan surish (**Touch Swipe Gesture**) orqali rasmlarni almashtirish.
   - To'liq ekranli **Lightbox Modal Dialog** oynasi, klaviatura (`Esc`, `←`, `→`) boshqaruvi va zoom imkoniyati.
   - O'xshash mahsulotlar uchun silliq scroll bo'luvchi **RelatedProductsCarousel**.

6. **🔌 Strapi v4/v5 Backend REST API Integratsiyasi:**
   - `lib/api.ts` ichida `resolveStrapiMediaUrl`, `mapStrapiCategory`, `mapStrapiProduct` va `submitOrder` / `createLead` adapterlari.
   - Backend o'chiq bo'lgan holatda UI to'xtab qolmasligi uchun **Resilient Mock Fallback** mexanizmi.

7. **⚡ On-Demand ISR Kesh Webhook:**
   - Strapi lifecycles orqali kontent o'zgarganda `/api/revalidate?secret=...` webhooki orqali sahifalar bir zumda yangilanadi.

8. **📊 SEO & Core Web Vitals Optimizatsiyasi:**
   - Avtomatik `sitemap.xml`, `robots.txt`.
   - `ProductJsonLd`, `BreadcrumbJsonLd`, `Organization` schema belgilari.
   - CLS (Cumulative Layout Shift) = 0.

---

## 📁 Papkalar Strukturasi (Folder Structure)

```
kontrol_front/
├── .agents/                      # AI Agentlar boshqaruvi va qoidalari (AGENTS.md)
├── app/                          # Next.js 14 App Router sahifalari
│   ├── layout.tsx                # Asosiy Layout (LanguageProvider, CartProvider, Header, Footer)
│   ├── page.tsx                  # Bosh sahifa (Hero, CategoryGrid, Calculator, Bestsellers)
│   ├── loading.tsx               # Skeleton loading
│   ├── error.tsx                 # Error boundary
│   ├── not-found.tsx             # 404 sahifasi
│   ├── robots.ts                 # Dynamic robots.txt
│   ├── sitemap.ts                # Dynamic sitemap.xml
│   ├── api/
│   │   └── revalidate/
│   │       └── route.ts          # On-demand ISR Webhook listener
│   ├── katalog/
│   │   ├── page.tsx              # Katalog va filtrlar sahifasi
│   │   └── [category]/
│   │       └── [slug]/
│   │           └── page.tsx      # Mahsulot batafsil sahifasi (Gallery, Tabs, Carousel)
│   ├── savat/
│   │   └── page.tsx              # Savat va B2B Checkout sahifasi
│   └── kontaktlar/
│       └── page.tsx              # Aloqa va rekvizitlar sahifasi
├── components/                   # React komponentlari
│   ├── ui/                       # Atomik UI elementlar (Button, Card, Badge, Input)
│   ├── layout/                   # Header, Footer, LanguageDropdown
│   └── features/                 # ProductCard, CategoryGrid, SolutionCalculator, ProductGallery, ProductDetailTabs
├── lib/                          # Yordamchi xizmatlar
│   ├── api.ts                    # Strapi REST API adapteri va Mock zaxira
│   ├── utils.ts                  # Deterministic formatPrice va cn yordamchilari
│   ├── cart/
│   │   └── cart-context.tsx      # Savat holati provayderi
│   └── i18n/
│       ├── translations.ts       # 3 tilli lug'at (uz, ru, en)
│       └── context.tsx           # Til konteksti va useTranslation hook'i
├── shared/                       # Umumiy DTO va ma'lumotlar tiplari
│   └── types.ts                  # Product, Category, SEO, Lead tiplari
├── public/                       # Statik fayllar (logo, rasmlar, ikonlar)
├── .env.example                  # Environment o'zgaruvchilari namunasi
├── .gitignore                    # Git kuzatuvidan chiqarilgan maxfiy fayllar
├── DESIGN.md                     # Dizayn tizimi va ranglar hujjati
├── ARCHITECTURE.md               # Arxitektura standartlari
└── DEPLOYMENT.md                 # Production deploy yo'riqnomasi
```

---

## 🚀 O'rnatish va Ishga Tushirish (Quick Start)

### 1. Repozitoriyani klonlash:
```bash
git clone https://github.com/your-username/kontrol_front.git
cd kontrol_front
```

### 2. Bog'liqliklarni o'rnatish:
```bash
npm install
```

### 3. Environment Variables sozlash:
`.env.example` faylidan nusxa olib, `.env.local` faylini yarating:
```bash
cp .env.example .env.local
```

`.env.local` ichidagi o'zgaruvchilar:
```env
NEXT_PUBLIC_API_URL=http://localhost:1337/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REVALIDATION_SECRET=kontrol_secret_key_2026
```

### 4. Dasturni dev rejimida ishga tushirish:
```bash
npm run dev
```
Brauzeringizda oching: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Sinov va Production Build (Verification)

```bash
# 1. TypeScript tekshiruvi (0 errors)
npx tsc --noEmit

# 2. Production buildni yig'ish (11/11 static/dynamic sahifalar)
npm run build

# 3. Production serverni ishga tushirish
npm run start
```

---

## 🌐 Production Deployment

Platforma **Vercel**, **Docker** yoki **Linux VPS (Nginx + PM2)** orqali oson joylashtiriladi. Batafsil yo'riqnoma: [DEPLOYMENT.md](DEPLOYMENT.md).

---

## 📄 Litsenziya

Barcha huquqlar himoyalangan © 2026 **Kontrol.uz**.
