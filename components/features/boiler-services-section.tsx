"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Send, Check, ShoppingCart, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart/cart-context";
import { Product } from "@/shared/types";

interface ServiceItem {
  id: string;
  sku: string;
  slug: string;
  categorySlug: string;
  image: string;
  titleUz: string;
  titleRu: string;
  titleEn: string;
  featuresUz: string[];
  featuresRu: string[];
  featuresEn: string[];
  price: number;
  currency: string;
  phone1: string;
  phone1Raw: string;
  phone2: string;
  phone2Raw: string;
  telegramUrl: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "prod-2148",
    sku: "KL662",
    slug: "kl662-150",
    categorySlug: "gas-valves",
    image: "/images/services/gas-valve-kzgem.jpg",
    titleUz: "Masofadan boshqariladigan gaz to'xtatish-uzish klapani (150 mm)",
    titleRu: "Дистанционный запорно-отсечной газовый клапан (150 мм)",
    titleEn: "Remote shut-off emergency gas valve (150 mm)",
    featuresUz: [
      "Turi: Favqulodda zapor-uzish gaz klapani",
      "Vazifasi: Quvurdagi gaz uzatishni avtomatik to'xtatish",
      "Qo'llanilishi: Qozonxona, GRP va gaz ta'minoti tizimlari",
    ],
    featuresRu: [
      "Тип: Запорно-отсечной газовый клапан",
      "Назначение: Аварийное перекрытие подачи газа",
      "Применение: Котельные, ГРП и системы газоснабжения",
    ],
    featuresEn: [
      "Type: Emergency shut-off gas valve",
      "Purpose: Automated emergency gas cutoff",
      "Application: Boiler rooms, GRP & gas piping systems",
    ],
    price: 777777,
    currency: "UZS",
    phone1: "+998 95 015 55 48",
    phone1Raw: "+998950155548",
    phone2: "+998 95 588 20 68",
    phone2Raw: "+998955882068",
    telegramUrl: "https://t.me/Kontrollshopbot",
  },
  {
    id: "prod-12685",
    sku: "KL4219",
    slug: "kl4219-rdh10",
    categorySlug: "thermostats",
    image: "/images/services/siemens-thermostat-rdh10.webp",
    titleUz: "Siemens RDH10 isitish qozonlari xona termostati",
    titleRu: "Комнатный термостат Siemens RDH10 для котлов отопления",
    titleEn: "Siemens RDH10 room thermostat for heating boilers",
    featuresUz: [
      "Turi: Katta LCD displeyli raqamli termostat",
      "Boshqaruv: Isitish va gaz qozoni haroratini nazorat qilish",
      "Samaradorlik: Qulay iqlimni saqlash va gaz sarfini tejash",
    ],
    featuresRu: [
      "Тип: Цифровой термостат с большим ЖК-дисплеем",
      "Управление: Контроль температуры котла и отопления",
      "Эффективность: Точный климат-контроль и экономия газа",
    ],
    featuresEn: [
      "Type: Digital room thermostat with large LCD display",
      "Control: Heating boiler temperature regulation",
      "Efficiency: Precise climate control and energy saving",
    ],
    price: 777777,
    currency: "UZS",
    phone1: "+998 95 015 55 48",
    phone1Raw: "+998950155548",
    phone2: "+998 95 588 20 68",
    phone2Raw: "+998955882068",
    telegramUrl: "https://t.me/Kontrollshopbot",
  },
  {
    id: "prod-2553",
    sku: "KL845",
    slug: "ij02a111113-pl101005250n-24vdc-t-p-501-22-bsp-1-25-05-8-1080",
    categorySlug: "solenoid-valves",
    image: "/images/services/solenoid-valve-tork.png",
    titleUz: "Tork PL1010 solenoid elektromagnit klapan 24VDC 1\"",
    titleRu: "Электромагнитный соленоидный клапан Tork PL1010 24VDC 1\"",
    titleEn: "Tork PL1010 electromagnetic solenoid valve 24VDC 1\"",
    featuresUz: [
      "Turi: Elektromagnit (solenoid) normal yopiq klapan",
      "Parametrlari: 24V DC, 1\" dyuym, 25 mm o'tkazuvchanlik",
      "Ishchi bosim: 0.5 - 8 bar, harorat: -10...+80°C",
    ],
    featuresRu: [
      "Тип: Электромагнитный соленоидный клапан НЗ",
      "Параметры: 24V DC, резьба 1\", проход 25 мм",
      "Рабочее давление: 0.5 - 8 бар, t: -10...+80°C",
    ],
    featuresEn: [
      "Type: Industrial solenoid normally closed valve",
      "Parameters: 24V DC, 1\" BSP thread, 25 mm orifice",
      "Pressure range: 0.5 - 8 bar, temp: -10...+80°C",
    ],
    price: 880000,
    currency: "UZS",
    phone1: "+998 95 015 55 48",
    phone1Raw: "+998950155548",
    phone2: "+998 95 588 20 68",
    phone2Raw: "+998955882068",
    telegramUrl: "https://t.me/Kontrollshopbot",
  },
];

export function BoilerServicesSection() {
  const { t, locale } = useTranslation();
  const { addToCart, isInCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const getTitle = (item: ServiceItem) => {
    if (locale === "ru") return item.titleRu;
    if (locale === "en") return item.titleEn;
    return item.titleUz;
  };

  const getFeatures = (item: ServiceItem) => {
    if (locale === "ru") return item.featuresRu;
    if (locale === "en") return item.featuresEn;
    return item.featuresUz;
  };

  const handleAddToCart = (item: ServiceItem) => {
    const serviceProduct: Product = {
      id: item.id,
      slug: item.slug,
      title: getTitle(item),
      sku: item.sku,
      categorySlug: item.categorySlug,
      categoryName:
        locale === "ru"
          ? "Оборудование для котлов"
          : locale === "en"
          ? "Boiler Equipment"
          : "Qozonxona uskunalari",
      price: item.price,
      currency: item.currency,
      inStock: true,
      stockCount: 99,
      rating: 5,
      reviewCount: 3,
      image: item.image,
      shortDescription: getFeatures(item).join(", "),
      fullDescription: getFeatures(item).join(". "),
      specifications: {},
      seo: { title: getTitle(item), description: "" },
    };
    addToCart(serviceProduct, 1);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <section className="space-y-6 sm:space-y-8 py-2">
      {/* Header matching the reference screenshot */}
      <div className="space-y-3">
        {/* Pill Badge with dot */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100/90 text-slate-700 text-xs sm:text-sm font-bold tracking-wide border border-slate-200/80 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse"></span>
          <span>
            {locale === "ru"
              ? "НАШИ ОБОРУДОВАНИЯ"
              : locale === "en"
              ? "BOILER EQUIPMENT"
              : "QOZONXONA USKUNALARI"}
          </span>
        </div>

        {/* Main Headline with highlighted amber pill */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight flex flex-wrap items-center gap-2">
          {locale === "ru" ? (
            <>
              <span>Всё для вашего</span>
              <span className="bg-[#FFB703] text-slate-950 px-3.5 py-1 rounded-2xl shadow-xs font-black inline-block">
                котла
              </span>
              <span>в Ташкенте</span>
            </>
          ) : locale === "en" ? (
            <>
              <span>Everything for your</span>
              <span className="bg-[#FFB703] text-slate-950 px-3.5 py-1 rounded-2xl shadow-xs font-black inline-block">
                boiler
              </span>
              <span>in Tashkent</span>
            </>
          ) : (
            <>
              <span>Sizning</span>
              <span className="bg-[#FFB703] text-slate-950 px-3.5 py-1 rounded-2xl shadow-xs font-black inline-block">
                qozoningiz
              </span>
              <span>uchun zarur uskunalar</span>
            </>
          )}
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {SERVICES.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col justify-between bg-white sm:bg-[#F9FAFB] hover:bg-white rounded-[28px] border border-slate-200/80 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
          >
            {/* Top: Equipment Image & Info */}
            <div>
              {/* Image Container with In Stock Badge */}
              <div className="relative w-full h-48 sm:h-56 md:h-60 rounded-2xl bg-white p-3 flex items-center justify-center border border-slate-100 overflow-hidden shadow-2xs">
                <div className="absolute top-2.5 right-2.5 z-10">
                  <span className="text-[10px] sm:text-xs px-2.5 py-0.5 font-bold rounded-full border shadow-2xs bg-emerald-50 text-emerald-700 border-emerald-200">
                    {locale === "ru" ? "В наличии" : locale === "en" ? "In stock" : "Mavjud"}
                  </span>
                </div>

                <Link
                  href={`/katalog/${item.categorySlug}/${item.slug}`}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <Image
                    src={item.image}
                    alt={getTitle(item)}
                    width={500}
                    height={500}
                    className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </div>

              {/* SKU */}
              <div className="text-[10px] sm:text-xs text-slate-400 font-mono font-bold mt-3 mb-1">
                SKU: {item.sku}
              </div>

              {/* Title */}
              <Link
                href={`/katalog/${item.categorySlug}/${item.slug}`}
                className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-industrial-blue transition-colors leading-snug line-clamp-2 min-h-[44px] block"
              >
                {getTitle(item)}
              </Link>

              {/* Real Feature Bullet Points with Orange Checks */}
              <ul className="mt-3 space-y-2">
                {getFeatures(item).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-snug">
                    <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FFE8D6] text-[#FF6B00] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px] sm:text-xs">
                      <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                    </span>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom: Pricing & Action Buttons Stack */}
            <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
              {/* Real Product Price */}
              <div className="text-base sm:text-lg md:text-xl font-black text-industrial-blue tracking-tight">
                {item.price.toLocaleString()} {item.currency}
              </div>

              {/* Button 1: First Orange Phone Button */}
              <a
                href={`tel:${item.phone1Raw}`}
                className="w-full py-2.5 px-3 rounded-full bg-[#FF6B00] hover:bg-[#E55E00] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <Phone className="w-4 h-4 fill-white shrink-0" />
                <span className="truncate">{item.phone1}</span>
              </a>

              {/* Button 2: Second Orange Phone Button */}
              <a
                href={`tel:${item.phone2Raw}`}
                className="w-full py-2.5 px-3 rounded-full bg-[#FF6B00] hover:bg-[#E55E00] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <Phone className="w-4 h-4 fill-white shrink-0" />
                <span className="truncate">{item.phone2}</span>
              </a>

              {/* Button 3: Black Cart Button */}
              <button
                type="button"
                onClick={() => handleAddToCart(item)}
                className={`w-full py-2.5 px-3 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] ${
                  isInCart(item.id) || addedId === item.id
                    ? "bg-[#00A67E] hover:bg-[#008F6C] text-white"
                    : "bg-[#18181B] hover:bg-black text-white"
                }`}
              >
                {isInCart(item.id) || addedId === item.id ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span className="truncate">{t("products.addedToCart")}</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 shrink-0" />
                    <span className="truncate">{t("products.addToCart")}</span>
                  </>
                )}
              </button>

              {/* Button 4: Telegram Button */}
              <a
                href={item.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-200 shadow-2xs transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <Send className="w-3.5 h-3.5 text-[#229ED9] shrink-0" />
                <span>Telegram</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
