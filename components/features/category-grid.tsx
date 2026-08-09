"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus, Wrench, ShieldCheck, Cpu, Activity, Sliders, Flame, ChevronRight } from "lucide-react";
import { Category } from "@/shared/types";
import { useTranslation } from "@/lib/i18n/context";

export interface CategoryGridProps {
  categories?: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  const { t, locale } = useTranslation();

  const [openStates, setOpenStates] = useState<Record<number, boolean>>({
    1: true,
    3: true,
    5: true,
  });

  const toggleCategory = (index: number) => {
    setOpenStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const categoriesByLang: Record<string, Array<{ name: string; slug: string; bgColor: string; icon: React.ReactNode; subcategories: Array<{ name: string; slug: string }> }>> = {
    uz: [
      {
        slug: "videokuzatuv",
        name: "Quvur Armaturasi va Kameralar",
        bgColor: "bg-[#ff8a8a]",
        icon: <Wrench className="w-6 h-6" />,
        subcategories: [
          { name: "Vertikal ko'p bosqichli kameralar", slug: "videokuzatuv" },
          { name: "Gorizontal IP kameralar 4K", slug: "videokuzatuv" },
          { name: "Cho'kma armatura va zadvijkalar", slug: "videokuzatuv" },
          { name: "Tsirkulyatsion quvur biriktirgichlari", slug: "videokuzatuv" },
          { name: "Yong'inga chidamli sanoat kranlari", slug: "videokuzatuv" },
          { name: "Termal issiqlik o'lchov kameralari", slug: "videokuzatuv" },
        ],
      },
      {
        slug: "videokuzatuv",
        name: "Nasos Uskunalari va Registratorlar",
        bgColor: "bg-[#7a8aff]",
        icon: <Activity className="w-6 h-6" />,
        subcategories: [
          { name: "Vertikal ko'p bosqichli nasoslar", slug: "videokuzatuv" },
          { name: "Gorizontal sanoat nasoslari", slug: "videokuzatuv" },
          { name: "Cho'kma nasoslar Granpamp", slug: "videokuzatuv" },
          { name: "Tsirkulyatsion nasoslar («ho'l» rotorli)", slug: "videokuzatuv" },
          { name: "Tsirkulyatsion nasoslar («quruq» rotorli)", slug: "videokuzatuv" },
          { name: "Suv ta'minoti qurilmalari Granflou", slug: "videokuzatuv" },
          { name: "Yong'in o'chirish qurilmalari Granflou", slug: "videokuzatuv" },
          { name: "Birlashtirilgan sanoat stansiyalari", slug: "videokuzatuv" },
        ],
      },
      {
        slug: "kirishni-boshqarish",
        name: "Elektr Uskunalari va Turniketlar",
        bgColor: "bg-[#7accee]",
        icon: <Cpu className="w-6 h-6" />,
        subcategories: [
          { name: "Tripod va biometrik turniketlar ZKTeco", slug: "kirishni-boshqarish" },
          { name: "Vakuumli avtomat o'chirgichlar 12kV", slug: "kirishni-boshqarish" },
          { name: "Chastota o'zgartirgichlar (Delta / Danfoss)", slug: "kirishni-boshqarish" },
          { name: "Sanoat transformatorlari va KTP", slug: "kirishni-boshqarish" },
          { name: "Shlagbaumlar va avtomatik darvozalar", slug: "kirishni-boshqarish" },
          { name: "Smart hisoblagichlar TE73 380V", slug: "kirishni-boshqarish" },
        ],
      },
      {
        slug: "kirishni-boshqarish",
        name: "KIPiA va SKUD Biometriya",
        bgColor: "bg-[#52d66b]",
        icon: <ShieldCheck className="w-6 h-6" />,
        subcategories: [
          { name: "Bosim datchiklari (Manometrlar)", slug: "kirishni-boshqarish" },
          { name: "Manometrlar va termometrlar", slug: "kirishni-boshqarish" },
          { name: "Biometrik yuz tanish terminallari", slug: "kirishni-boshqarish" },
          { name: "Sarf o'lchagichlar (Flowmeters)", slug: "kirishni-boshqarish" },
          { name: "Magnit va elektron SKUD qulflari", slug: "kirishni-boshqarish" },
          { name: "Gaz va issiqlik datchiklari", slug: "kirishni-boshqarish" },
        ],
      },
      {
        slug: "yongin-xavfsizligi",
        name: "Elektromagnit va Pnevmatik Klapanlar",
        bgColor: "bg-[#c56dbb]",
        icon: <Flame className="w-6 h-6" />,
        subcategories: [
          { name: "Pnevmatika silindrlari Festo DNC", slug: "yongin-xavfsizligi" },
          { name: "Elektromagnit (Solenoid) klapanlar", slug: "yongin-xavfsizligi" },
          { name: "Pnevmo-taqsimlagichlar va bloklar", slug: "yongin-xavfsizligi" },
          { name: "Klapanlarni puflash va tozalash uzellari", slug: "yongin-xavfsizligi" },
          { name: "Proba olish sovutgichlari", slug: "yongin-xavfsizligi" },
          { name: "Sanoat pnevmo-shlanglari va fitinglar", slug: "yongin-xavfsizligi" },
        ],
      },
      {
        slug: "kirishni-boshqarish",
        name: "Qozonxonalar Avtomatikasi",
        bgColor: "bg-[#a773ed]",
        icon: <Sliders className="w-6 h-6" />,
        subcategories: [
          { name: "Puflash va tozalash klapanlari", slug: "kirishni-boshqarish" },
          { name: "Proba olish sovutgichlari", slug: "kirishni-boshqarish" },
          { name: "Suv sathi va bosim ko'rsatkichlari", slug: "kirishni-boshqarish" },
          { name: "PLC kontrollerlar (Siemens S7-1200)", slug: "kirishni-boshqarish" },
          { name: "Qozonxona xavfsizlik bloklari", slug: "kirishni-boshqarish" },
          { name: "Termostatlar va harorat rostlagichlar", slug: "kirishni-boshqarish" },
        ],
      },
    ],
    ru: [
      {
        slug: "videokuzatuv",
        name: "Трубопроводная Арматура и Камеры",
        bgColor: "bg-[#ff8a8a]",
        icon: <Wrench className="w-6 h-6" />,
        subcategories: [
          { name: "Вертикальные многоступенчатые камеры", slug: "videokuzatuv" },
          { name: "Горизонтальные IP камеры 4K", slug: "videokuzatuv" },
          { name: "Погружная арматура и задвижки", slug: "videokuzatuv" },
          { name: "Циркуляционные соединители", slug: "videokuzatuv" },
          { name: "Огнестойкие промышленные краны", slug: "videokuzatuv" },
          { name: "Тепловизионные камеры", slug: "videokuzatuv" },
        ],
      },
      {
        slug: "videokuzatuv",
        name: "Насосное Оборудование и Регистраторы",
        bgColor: "bg-[#7a8aff]",
        icon: <Activity className="w-6 h-6" />,
        subcategories: [
          { name: "Вертикальные многоступенчатые насосы", slug: "videokuzatuv" },
          { name: "Горизонтальные промышленные насосы", slug: "videokuzatuv" },
          { name: "Погружные насосы Гранпамп", slug: "videokuzatuv" },
          { name: "Циркуляционные насосы («мокрый» ротор)", slug: "videokuzatuv" },
          { name: "Циркуляционные насосы («сухой» ротор)", slug: "videokuzatuv" },
          { name: "Установки водоснабжения Гранфлоу", slug: "videokuzatuv" },
          { name: "Установки пожаротушения Гранфлоу", slug: "videokuzatuv" },
          { name: "Промышленные насосные станции", slug: "videokuzatuv" },
        ],
      },
      {
        slug: "kirishni-boshqarish",
        name: "Электрооборудование и Турникеты",
        bgColor: "bg-[#7accee]",
        icon: <Cpu className="w-6 h-6" />,
        subcategories: [
          { name: "Триподные и биометрические турникеты ZKTeco", slug: "kirishni-boshqarish" },
          { name: "Вакуумные выключатели 12кВ", slug: "kirishni-boshqarish" },
          { name: "Частотные преобразователи (Delta / Danfoss)", slug: "kirishni-boshqarish" },
          { name: "Промышленные трансформаторы и КТП", slug: "kirishni-boshqarish" },
          { name: "Шлагбаумы и автоматические ворота", slug: "kirishni-boshqarish" },
          { name: "Умные счетчики TE73 380В", slug: "kirishni-boshqarish" },
        ],
      },
      {
        slug: "kirishni-boshqarish",
        name: "КИПиА и СКУД Биометрия",
        bgColor: "bg-[#52d66b]",
        icon: <ShieldCheck className="w-6 h-6" />,
        subcategories: [
          { name: "Датчики давления (Манометры)", slug: "kirishni-boshqarish" },
          { name: "Манометры и термометры", slug: "kirishni-boshqarish" },
          { name: "Биометрические терминалы лиц", slug: "kirishni-boshqarish" },
          { name: "Расходомеры (Flowmeters)", slug: "kirishni-boshqarish" },
          { name: "Магнитные и электронные замки СКУД", slug: "kirishni-boshqarish" },
          { name: "Датчики газа и тепла", slug: "kirishni-boshqarish" },
        ],
      },
      {
        slug: "yongin-xavfsizligi",
        name: "Электромагнитные и Пневмоклапаны",
        bgColor: "bg-[#c56dbb]",
        icon: <Flame className="w-6 h-6" />,
        subcategories: [
          { name: "Пневматические цилиндры Festo DNC", slug: "yongin-xavfsizligi" },
          { name: "Электромагнитные (Соленоидные) клапаны", slug: "yongin-xavfsizligi" },
          { name: "Пневмораспределители и блоки", slug: "yongin-xavfsizligi" },
          { name: "Узлы продувки и очистки клапанов", slug: "yongin-xavfsizligi" },
          { name: "Охладители отбора проб", slug: "yongin-xavfsizligi" },
          { name: "Пневмошланги и фитинги", slug: "yongin-xavfsizligi" },
        ],
      },
      {
        slug: "kirishni-boshqarish",
        name: "Автоматика Котельных",
        bgColor: "bg-[#a773ed]",
        icon: <Sliders className="w-6 h-6" />,
        subcategories: [
          { name: "Клапаны продувки и очистки", slug: "kirishni-boshqarish" },
          { name: "Охладители отбора проб", slug: "kirishni-boshqarish" },
          { name: "Указатели уровня и давления", slug: "kirishni-boshqarish" },
          { name: "PLC контроллеры (Siemens S7-1200)", slug: "kirishni-boshqarish" },
          { name: "Блоки безопасности котельной", slug: "kirishni-boshqarish" },
          { name: "Термостаты и регуляторы температуры", slug: "kirishni-boshqarish" },
        ],
      },
    ],
    en: [
      {
        slug: "videokuzatuv",
        name: "Pipeline Valves & Cameras",
        bgColor: "bg-[#ff8a8a]",
        icon: <Wrench className="w-6 h-6" />,
        subcategories: [
          { name: "Vertical multistage cameras", slug: "videokuzatuv" },
          { name: "Horizontal 4K IP cameras", slug: "videokuzatuv" },
          { name: "Submersible valves & gate valves", slug: "videokuzatuv" },
          { name: "Circulation pipe connectors", slug: "videokuzatuv" },
          { name: "Fire-rated industrial valves", slug: "videokuzatuv" },
          { name: "Thermal imaging cameras", slug: "videokuzatuv" },
        ],
      },
      {
        slug: "videokuzatuv",
        name: "Pump Hardware & Recorders",
        bgColor: "bg-[#7a8aff]",
        icon: <Activity className="w-6 h-6" />,
        subcategories: [
          { name: "Vertical multistage pumps", slug: "videokuzatuv" },
          { name: "Horizontal industrial pumps", slug: "videokuzatuv" },
          { name: "Granpump submersible pumps", slug: "videokuzatuv" },
          { name: "Circulation pumps (wet rotor)", slug: "videokuzatuv" },
          { name: "Circulation pumps (dry rotor)", slug: "videokuzatuv" },
          { name: "Granflow water supply units", slug: "videokuzatuv" },
          { name: "Granflow fire suppression units", slug: "videokuzatuv" },
          { name: "Combined industrial stations", slug: "videokuzatuv" },
        ],
      },
      {
        slug: "kirishni-boshqarish",
        name: "Electrical Equipment & Turnstiles",
        bgColor: "bg-[#7accee]",
        icon: <Cpu className="w-6 h-6" />,
        subcategories: [
          { name: "ZKTeco tripod & biometric turnstiles", slug: "kirishni-boshqarish" },
          { name: "Vacuum circuit breakers 12kV", slug: "kirishni-boshqarish" },
          { name: "Frequency inverters (Delta / Danfoss)", slug: "kirishni-boshqarish" },
          { name: "Industrial transformers & KTP", slug: "kirishni-boshqarish" },
          { name: "Barriers & automatic gates", slug: "kirishni-boshqarish" },
          { name: "TE73 380V Smart meters", slug: "kirishni-boshqarish" },
        ],
      },
      {
        slug: "kirishni-boshqarish",
        name: "KIPiA & ACS Biometrics",
        bgColor: "bg-[#52d66b]",
        icon: <ShieldCheck className="w-6 h-6" />,
        subcategories: [
          { name: "Pressure sensors (Manometers)", slug: "kirishni-boshqarish" },
          { name: "Pressure gauges & thermometers", slug: "kirishni-boshqarish" },
          { name: "Biometric face recognition terminals", slug: "kirishni-boshqarish" },
          { name: "Flowmeters", slug: "kirishni-boshqarish" },
          { name: "Magnetic & electronic ACS locks", slug: "kirishni-boshqarish" },
          { name: "Gas & heat detectors", slug: "kirishni-boshqarish" },
        ],
      },
      {
        slug: "yongin-xavfsizligi",
        name: "Solenoid & Pneumatic Valves",
        bgColor: "bg-[#c56dbb]",
        icon: <Flame className="w-6 h-6" />,
        subcategories: [
          { name: "Festo DNC Pneumatic cylinders", slug: "yongin-xavfsizligi" },
          { name: "Electromagnetic (Solenoid) valves", slug: "yongin-xavfsizligi" },
          { name: "Pneumatic distributors & blocks", slug: "yongin-xavfsizligi" },
          { name: "Valve blowdown & cleaning units", slug: "yongin-xavfsizligi" },
          { name: "Sample coolers", slug: "yongin-xavfsizligi" },
          { name: "Industrial pneumatic hoses & fittings", slug: "yongin-xavfsizligi" },
        ],
      },
      {
        slug: "kirishni-boshqarish",
        name: "Boiler Automation",
        bgColor: "bg-[#a773ed]",
        icon: <Sliders className="w-6 h-6" />,
        subcategories: [
          { name: "Blowdown & cleaning valves", slug: "kirishni-boshqarish" },
          { name: "Sample coolers", slug: "kirishni-boshqarish" },
          { name: "Water level & pressure indicators", slug: "kirishni-boshqarish" },
          { name: "PLC controllers (Siemens S7-1200)", slug: "kirishni-boshqarish" },
          { name: "Boiler safety blocks", slug: "kirishni-boshqarish" },
          { name: "Thermostats & temperature controllers", slug: "kirishni-boshqarish" },
        ],
      },
    ],
  };

  const activeCategories = categoriesByLang[locale] || categoriesByLang.uz;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-industrial-blue">
        <h2 className="text-xl sm:text-2xl font-black text-industrial-blue">
          {t("categories.title")}
        </h2>
        <Link
          href="/katalog"
          className="text-xs font-extrabold text-industrial-orange hover:underline uppercase"
        >
          {t("categories.viewAll")} →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {activeCategories.map((cat, idx) => {
          const isOpen = !!openStates[idx];

          return (
            <div
              key={idx}
              className="rounded-lg overflow-hidden border border-industrial-border-subtle shadow-sm transition-all"
            >
              {/* Header Bar with Toggle Button */}
              <button
                type="button"
                onClick={() => toggleCategory(idx)}
                className={`w-full ${cat.bgColor} text-white p-4 sm:p-5 flex items-center justify-between hover:brightness-105 transition-all text-left group`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center font-black text-xl shrink-0 group-hover:scale-110 transition-transform">
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                  <span className="text-base sm:text-lg font-black tracking-tight leading-snug">
                    {cat.name}
                  </span>
                </div>
                <div className="opacity-90 shrink-0">{cat.icon}</div>
              </button>

              {/* Subcategories List Panel (Shown when Open) */}
              {isOpen && (
                <div className="bg-[#f9f9fc] p-5 border-t border-industrial-border-subtle animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    {cat.subcategories.map((sub, subIdx) => (
                      <Link
                        key={subIdx}
                        href={`/katalog?category=${sub.slug}`}
                        className="text-industrial-text hover:text-industrial-blue hover:underline py-1 flex items-center gap-1.5 font-semibold group/sub"
                      >
                        <ChevronRight className="w-3 h-3 text-industrial-orange group-hover/sub:translate-x-0.5 transition-transform shrink-0" />
                        <span className="line-clamp-1">{sub.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
