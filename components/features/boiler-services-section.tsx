"use client";

import React from "react";
import Image from "next/image";
import { Phone, Send, Check } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

interface ServiceItem {
  id: string;
  image: string;
  titleUz: string;
  titleRu: string;
  titleEn: string;
  featuresUz: string[];
  featuresRu: string[];
  featuresEn: string[];
  phone1: string;
  phone1Raw: string;
  phone2: string;
  phone2Raw: string;
  telegramUrl: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "service-gas-boiler",
    image: "/images/services/gas-boiler-repair.jpg",
    titleUz: "Gaz qozonlarini ta'mirlash",
    titleRu: "Ремонт газовых котлов",
    titleEn: "Gas Boiler Repair",
    featuresUz: [
      "Mutaxassis murojaat kuni yetib boradi",
      "Xatolik kodi emas, o'lchovlar bo'yicha diagnostika",
      "Asosiy ehtiyot qismlar usta bilan birga",
    ],
    featuresRu: [
      "Выезд мастера в день обращения",
      "Диагностика по замерам, а не по коду",
      "Ходовые запчасти в машине",
    ],
    featuresEn: [
      "Technician visits on the day of request",
      "Diagnostics by physical measurements, not error codes",
      "Popular replacement parts on board",
    ],
    phone1: "+998 95 015 55 48",
    phone1Raw: "+998950155548",
    phone2: "+998 95 588 20 68",
    phone2Raw: "+998955882068",
    telegramUrl: "https://t.me/Kontrollshopbot",
  },
  {
    id: "service-dual-circuit",
    image: "/images/services/dual-circuit-boiler.jpg",
    titleUz: "Ikki konturli va pol qozonlari ta'miri",
    titleRu: "Ремонт двухконтурных и напольных котлов",
    titleEn: "Dual-Circuit & Floor Boilers Repair",
    featuresUz: [
      "Mutaxassis murojaat kuni yetib boradi",
      "Zavod ish parametrlarini to'liq tiklaymiz",
      "Barcha ishlarga 12 oygacha rasmiy kafolat",
    ],
    featuresRu: [
      "Выезд мастера в день обращения",
      "Вернём и отладим заводские параметры",
      "Гарантия на все виды работ до 12 месяцев",
    ],
    featuresEn: [
      "Technician visits on the day of request",
      "Restoration and calibration to factory settings",
      "Official warranty on all services up to 12 months",
    ],
    phone1: "+998 95 015 55 48",
    phone1Raw: "+998950155548",
    phone2: "+998 95 588 20 68",
    phone2Raw: "+998955882068",
    telegramUrl: "https://t.me/Kontrollshopbot",
  },
  {
    id: "service-maintenance",
    image: "/images/services/boiler-maintenance.jpg",
    titleUz: "Qozonlarni yuvish va profilaktika",
    titleRu: "Промывка и техобслуживание котлов",
    titleEn: "Boiler Flushing & Maintenance",
    featuresUz: [
      "Issiqlik almashtirgichni qasmoqdan tozalash",
      "Bosim va xavfsizlik avtomatikasini tekshirish",
      "Gaz sarfini 25% gacha tejamkor qilish",
    ],
    featuresRu: [
      "Очистка теплообменника от накипи",
      "Проверка давления и автоматики безопасности",
      "Снижение расхода газа до 25%",
    ],
    featuresEn: [
      "Chemical descaling of heat exchangers",
      "Hydraulic pressure and safety automation check",
      "Gas consumption reduction by up to 25%",
    ],
    phone1: "+998 95 015 55 48",
    phone1Raw: "+998950155548",
    phone2: "+998 95 588 20 68",
    phone2Raw: "+998955882068",
    telegramUrl: "https://t.me/Kontrollshopbot",
  },
];

export function BoilerServicesSection() {
  const { locale } = useTranslation();

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

  return (
    <section className="space-y-6 sm:space-y-8 py-2">
      {/* Header matching the reference screenshot */}
      <div className="space-y-3">
        {/* Pill Badge with dot */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100/90 text-slate-700 text-xs sm:text-sm font-bold tracking-wide border border-slate-200/80 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse"></span>
          <span>
            {locale === "ru"
              ? "НАШИ УСЛУГИ"
              : locale === "en"
              ? "OUR SERVICES"
              : "BIZNING XIZMATLAR"}
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
              <span>uchun barcha xizmatlar</span>
            </>
          )}
        </h2>
      </div>

      {/* Cards Grid matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {SERVICES.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col justify-between bg-white sm:bg-[#F9FAFB] hover:bg-white rounded-[28px] border border-slate-200/80 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
          >
            {/* Top: Equipment Image Container */}
            <div>
              <div className="relative w-full h-48 sm:h-56 md:h-60 rounded-2xl bg-white p-3 flex items-center justify-center border border-slate-100 overflow-hidden shadow-2xs">
                <Image
                  src={item.image}
                  alt={getTitle(item)}
                  width={500}
                  height={500}
                  className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Title */}
              <h3 className="mt-5 text-lg sm:text-xl font-bold text-slate-900 group-hover:text-industrial-blue transition-colors leading-snug">
                {getTitle(item)}
              </h3>

              {/* Feature Bullet Points with Orange Checks */}
              <ul className="mt-4 space-y-2.5">
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

            {/* Bottom: Action Buttons Stack */}
            <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
              {/* Button 1: Primary Orange Phone Button */}
              <a
                href={`tel:${item.phone1Raw}`}
                className="w-full py-3 px-4 rounded-full bg-[#FF6B00] hover:bg-[#E55E00] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <Phone className="w-4 h-4 fill-white" />
                <span>{item.phone1}</span>
              </a>

              {/* Button 2: Black Phone Button */}
              <a
                href={`tel:${item.phone2Raw}`}
                className="w-full py-3 px-4 rounded-full bg-[#18181B] hover:bg-black text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <Phone className="w-4 h-4 fill-white" />
                <span>{item.phone2}</span>
              </a>

              {/* Button 3: Telegram Button */}
              <a
                href={item.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-200 shadow-2xs transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <Send className="w-3.5 h-3.5 text-[#229ED9]" />
                <span>Telegram</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
