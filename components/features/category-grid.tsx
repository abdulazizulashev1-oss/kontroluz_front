"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Minus,
  Wrench,
  ShieldCheck,
  Cpu,
  Activity,
  Sliders,
  Flame,
  ChevronRight,
  Camera,
  Gauge,
  Droplet,
  HardDrive,
  Radio,
  Zap,
  Layers,
  Settings,
} from "lucide-react";
import { Category } from "@/shared/types";
import { useTranslation } from "@/lib/i18n/context";
import { fetchCategories } from "@/lib/api";

export interface CategoryGridProps {
  categories?: Category[];
  title?: string;
  showViewAll?: boolean;
  gridCols?: 2 | 3;
}

const TILE_COLORS = [
  "bg-[#ff8a8a]", // 1. Coral Red
  "bg-[#7a8aff]", // 2. Indigo Blue
  "bg-[#7accee]", // 3. Sky Blue
  "bg-[#52d66b]", // 4. Mint Green
  "bg-[#c56dbb]", // 5. Purple Pink
  "bg-[#a773ed]", // 6. Violet
];

function getCategoryIcon(iconName?: string) {
  switch (iconName?.toLowerCase()) {
    case "camera":
      return <Camera className="w-6 h-6" />;
    case "activity":
      return <Activity className="w-6 h-6" />;
    case "cpu":
      return <Cpu className="w-6 h-6" />;
    case "shieldcheck":
    case "shield":
      return <ShieldCheck className="w-6 h-6" />;
    case "flame":
    case "fire":
      return <Flame className="w-6 h-6" />;
    case "sliders":
      return <Sliders className="w-6 h-6" />;
    case "wrench":
      return <Wrench className="w-6 h-6" />;
    case "gauge":
      return <Gauge className="w-6 h-6" />;
    case "droplet":
      return <Droplet className="w-6 h-6" />;
    case "harddrive":
      return <HardDrive className="w-6 h-6" />;
    case "radio":
      return <Radio className="w-6 h-6" />;
    case "zap":
      return <Zap className="w-6 h-6" />;
    default:
      return <Layers className="w-6 h-6" />;
  }
}

export function CategoryGrid({
  categories,
  title,
  showViewAll = true,
  gridCols = 2,
}: CategoryGridProps) {
  const { t, locale } = useTranslation();
  const [currentCategories, setCurrentCategories] = useState<Category[]>(categories || []);

  useEffect(() => {
    let active = true;
    fetchCategories(locale).then((data) => {
      if (active && Array.isArray(data) && data.length > 0) {
        setCurrentCategories(data);
      }
    });
    return () => {
      active = false;
    };
  }, [locale]);

  const [openStates, setOpenStates] = useState<Record<number, boolean>>({});

  const toggleCategory = (index: number) => {
    setOpenStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Static fallback if backend is offline and no categories are passed
  const fallbackCategoriesByLang: Record<
    string,
    Array<{
      name: string;
      slug: string;
      iconName: string;
      subcategories: Array<{ name: string; slug: string }>;
    }>
  > = {
    uz: [
      {
        slug: "videokuzatuv",
        name: "Quvur Armaturasi va Kameralar",
        iconName: "Wrench",
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
        slug: "sanoat-avtomatikasi",
        name: "Nasos Uskunalari va Registratorlar",
        iconName: "Activity",
        subcategories: [
          { name: "Vertikal ko'p bosqichli nasoslar", slug: "vertikal-nasoslar" },
          { name: "Gorizontal sanoat nasoslari", slug: "sanoat-avtomatikasi" },
          { name: "Cho'kma nasoslar Granpamp", slug: "sanoat-avtomatikasi" },
          { name: "Tsirkulyatsion nasoslar («ho'l» rotorli)", slug: "sanoat-avtomatikasi" },
          { name: "Suv ta'minoti qurilmalari Granflou", slug: "sanoat-avtomatikasi" },
          { name: "Yong'in o'chirish qurilmalari Granflou", slug: "sanoat-avtomatikasi" },
        ],
      },
      {
        slug: "kirishni-boshqarish",
        name: "Elektr Uskunalari va Turniketlar",
        iconName: "Cpu",
        subcategories: [
          { name: "Tripod va biometrik turniketlar ZKTeco", slug: "turniketlar" },
          { name: "Vakuumli avtomat o'chirgichlar 12kV", slug: "kirishni-boshqarish" },
          { name: "Chastota o'zgartirgichlar (Delta / Danfoss)", slug: "kirishni-boshqarish" },
          { name: "Sanoat transformatorlari va KTP", slug: "kirishni-boshqarish" },
          { name: "Shlagbaumlar va avtomatik darvozalar", slug: "shlagbaumlar" },
        ],
      },
      {
        slug: "kirishni-boshqarish",
        name: "KIPiA va SKUD Biometriya",
        iconName: "ShieldCheck",
        subcategories: [
          { name: "Bosim datchiklari (Manometrlar)", slug: "kipia-manometrlar" },
          { name: "Manometrlar va termometrlar", slug: "kipia-manometrlar" },
          { name: "Biometrik yuz tanish terminallari", slug: "biometrik-skanerlar" },
          { name: "Sarf o'lchagichlar (Flowmeters)", slug: "kipia-manometrlar" },
          { name: "Magnit va elektron SKUD qulflari", slug: "kirishni-boshqarish" },
        ],
      },
      {
        slug: "yongin-xavfsizligi",
        name: "Elektromagnit va Pnevmatik Klapanlar",
        iconName: "Flame",
        subcategories: [
          { name: "Pnevmatika silindrlari Festo DNC", slug: "festo-pnevmatika" },
          { name: "Elektromagnit (Solenoid) klapanlar", slug: "festo-pnevmatika" },
          { name: "Pnevmo-taqsimlagichlar va bloklar", slug: "festo-pnevmatika" },
          { name: "Klapanlarni puflash va tozalash uzellari", slug: "yongin-xavfsizligi" },
          { name: "Tutun va issiqlik datchiklari", slug: "tutun-datchiklari" },
        ],
      },
      {
        slug: "sanoat-avtomatikasi",
        name: "Qozonxonalar Avtomatikasi",
        iconName: "Sliders",
        subcategories: [
          { name: "Qozonxona avtomatika bloklari", slug: "qozonxona-avtomatikasi" },
          { name: "Puflash va tozalash klapanlari", slug: "qozonxona-avtomatikasi" },
          { name: "Suv sathi va bosim ko'rsatkichlari", slug: "qozonxona-avtomatikasi" },
          { name: "PLC kontrollerlar (Siemens S7-1200)", slug: "sanoat-avtomatikasi" },
          { name: "Termostatlar va harorat rostlagichlar", slug: "qozonxona-avtomatikasi" },
        ],
      },
    ],
    ru: [
      {
        slug: "videokuzatuv",
        name: "Трубопроводная Арматура и Камеры",
        iconName: "Wrench",
        subcategories: [
          { name: "Вертикальные многоступенчатые камеры", slug: "videokuzatuv" },
          { name: "Горизонтальные IP камеры 4K", slug: "videokuzatuv" },
          { name: "Погружная арматура и задвижки", slug: "videokuzatuv" },
          { name: "Тепловизионные камеры", slug: "videokuzatuv" },
        ],
      },
      {
        slug: "sanoat-avtomatikasi",
        name: "Насосное Оборудование и Регистраторы",
        iconName: "Activity",
        subcategories: [
          { name: "Вертикальные многоступенчатые насосы", slug: "vertikal-nasoslar" },
          { name: "Погружные насосы Гранпамп", slug: "sanoat-avtomatikasi" },
          { name: "Установки водоснабжения Гранфлоу", slug: "sanoat-avtomatikasi" },
        ],
      },
      {
        slug: "kirishni-boshqarish",
        name: "Электрооборудование и Турникеты",
        iconName: "Cpu",
        subcategories: [
          { name: "Триподные и биометрические турникеты ZKTeco", slug: "turniketlar" },
          { name: "Вакуумные выключатели 12кВ", slug: "kirishni-boshqarish" },
          { name: "Шлагбаумы и автоматические ворота", slug: "shlagbaumlar" },
        ],
      },
      {
        slug: "kirishni-boshqarish",
        name: "КИПиА и СКУД Биометрия",
        iconName: "ShieldCheck",
        subcategories: [
          { name: "Датчики давления (Манометры)", slug: "kipia-manometrlar" },
          { name: "Биометрические терминалы лиц", slug: "biometrik-skanerlar" },
          { name: "Магнитные и электронные замки СКУД", slug: "kirishni-boshqarish" },
        ],
      },
      {
        slug: "yongin-xavfsizligi",
        name: "Электромагнитные и Пневмоклапаны",
        iconName: "Flame",
        subcategories: [
          { name: "Пневматические цилиндры Festo DNC", slug: "festo-pnevmatika" },
          { name: "Электромагнитные (Соленоидные) клапаны", slug: "festo-pnevmatika" },
          { name: "Датчики дыма и тепла", slug: "tutun-datchiklari" },
        ],
      },
      {
        slug: "sanoat-avtomatikasi",
        name: "Автоматика Котельных",
        iconName: "Sliders",
        subcategories: [
          { name: "Автоматика котельных и модули", slug: "qozonxona-avtomatikasi" },
          { name: "PLC контроллеры Siemens", slug: "sanoat-avtomatikasi" },
        ],
      },
    ],
    en: [
      {
        slug: "videokuzatuv",
        name: "Pipeline Valves & Cameras",
        iconName: "Wrench",
        subcategories: [
          { name: "Vertical multistage cameras", slug: "videokuzatuv" },
          { name: "Horizontal 4K IP cameras", slug: "videokuzatuv" },
          { name: "Thermal imaging cameras", slug: "videokuzatuv" },
        ],
      },
      {
        slug: "sanoat-avtomatikasi",
        name: "Pump Hardware & Recorders",
        iconName: "Activity",
        subcategories: [
          { name: "Vertical multistage pumps", slug: "vertikal-nasoslar" },
          { name: "Granflow water supply units", slug: "sanoat-avtomatikasi" },
        ],
      },
      {
        slug: "kirishni-boshqarish",
        name: "Electrical Equipment & Turnstiles",
        iconName: "Cpu",
        subcategories: [
          { name: "ZKTeco tripod & biometric turnstiles", slug: "turniketlar" },
          { name: "Vacuum circuit breakers 12kV", slug: "kirishni-boshqarish" },
        ],
      },
      {
        slug: "kirishni-boshqarish",
        name: "KIPiA & ACS Biometrics",
        iconName: "ShieldCheck",
        subcategories: [
          { name: "Pressure sensors (Manometers)", slug: "kipia-manometrlar" },
          { name: "Biometric face recognition terminals", slug: "biometrik-skanerlar" },
        ],
      },
      {
        slug: "yongin-xavfsizligi",
        name: "Solenoid & Pneumatic Valves",
        iconName: "Flame",
        subcategories: [
          { name: "Festo DNC Pneumatic cylinders", slug: "festo-pnevmatika" },
          { name: "Smoke and fire detectors", slug: "tutun-datchiklari" },
        ],
      },
      {
        slug: "sanoat-avtomatikasi",
        name: "Boiler Automation",
        iconName: "Sliders",
        subcategories: [
          { name: "Boiler room automation units", slug: "qozonxona-avtomatikasi" },
          { name: "PLC controllers Siemens", slug: "sanoat-avtomatikasi" },
        ],
      },
    ],
  };

  // Determine dynamic list: If backend categories are provided, map them directly!
  const displayCategories =
    Array.isArray(currentCategories) && currentCategories.length > 0
      ? currentCategories.map((cat, idx) => ({
          name: cat.name,
          slug: cat.slug,
          iconName: cat.iconName || (idx === 0 ? "Wrench" : idx === 1 ? "Activity" : idx === 2 ? "Cpu" : idx === 3 ? "ShieldCheck" : idx === 4 ? "Flame" : "Sliders"),
          subcategories:
            Array.isArray(cat.subcategories) && cat.subcategories.length > 0
              ? cat.subcategories
              : [
                  { name: `${cat.name} — ${t("categories.allSuffix")}`, slug: cat.slug },
                  { name: `${cat.name} ${t("categories.componentsSuffix")}`, slug: cat.slug },
                ],
        }))
      : fallbackCategoriesByLang[locale] || fallbackCategoriesByLang.ru || fallbackCategoriesByLang.uz;

  return (
    <section className="mb-8 sm:mb-10">
      <div className="flex items-center justify-between mb-4 sm:mb-6 pb-2 border-b-2 border-industrial-blue">
        <h2 className="text-lg sm:text-2xl font-black text-industrial-blue">
          {title || t("categories.title")}
        </h2>
        {showViewAll && (
          <Link
            href="/katalog"
            className="text-[11px] sm:text-xs font-extrabold text-industrial-orange hover:underline uppercase shrink-0"
          >
            {t("categories.viewAll")} →
          </Link>
        )}
      </div>

      <div
        className={`grid grid-cols-1 ${
          gridCols === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"
        } gap-4 sm:gap-6 items-start`}
      >
        {displayCategories.map((cat, idx) => {
          const isOpen = !!openStates[idx];
          const bgColor = TILE_COLORS[idx % TILE_COLORS.length];
          const icon = getCategoryIcon(cat.iconName);

          return (
            <div
              key={`${cat.slug}-${idx}`}
              className="rounded-xl overflow-hidden border border-industrial-border-subtle shadow-xs transition-all"
            >
              {/* Header Bar with Toggle Button */}
              <button
                type="button"
                onClick={() => toggleCategory(idx)}
                className={`w-full ${bgColor} text-white p-3.5 sm:p-5 flex items-center justify-between hover:brightness-105 transition-all text-left group cursor-pointer`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-white/20 flex items-center justify-center font-black text-lg sm:text-xl shrink-0 group-hover:scale-110 transition-transform">
                    {isOpen ? <Minus className="w-4 h-4 sm:w-5 sm:h-5" /> : <Plus className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </div>
                  <span className="text-sm sm:text-lg font-black tracking-tight leading-snug truncate">
                    {cat.name}
                  </span>
                </div>
                <div className="opacity-90 shrink-0 ml-2">{icon}</div>
              </button>

              {/* Subcategories List Panel (Shown when Open) */}
              {isOpen && (
                <div className="bg-[#f9f9fc] p-3.5 sm:p-5 border-t border-industrial-border-subtle animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 sm:gap-y-2 text-xs">
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
