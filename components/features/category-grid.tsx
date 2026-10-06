"use client";

import React, { useState } from "react";
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
  ChevronDown,
  Camera,
  Gauge,
  Droplet,
  HardDrive,
  Radio,
  Zap,
  Wind,
  Layers,
  Settings,
  Thermometer,
  Filter,
  Cable,
  Disc,
  ToggleLeft,
} from "lucide-react";
import { Category } from "@/shared/types";
import { useTranslation } from "@/lib/i18n/context";

export interface CategoryGridProps {
  categories?: Category[];
  title?: string;
  showViewAll?: boolean;
  gridCols?: 2 | 3;
}

const TILE_COLORS = [
  "bg-[#ff8a8a]", // 1. Coral Red (Counters / Счетчики)
  "bg-[#7a8aff]", // 2. Indigo Blue (I&C / КИПиА)
  "bg-[#7accee]", // 3. Sky Blue (Pneumatics / Пневматика)
  "bg-[#52d66b]", // 4. Mint Green (Electrical / Электрооборудование)
  "bg-[#c56dbb]", // 5. Purple Pink (Misc & Tools / Прочее и инструмент)
  "bg-[#a773ed]", // 6. Violet
];

function getCategoryIcon(iconNameOrSlug?: string, categoryName?: string) {
  const key = `${iconNameOrSlug || ""} ${categoryName || ""}`.toLowerCase();
  if (key.includes("wind") || key.includes("pneumat") || key.includes("pnevmat") || key.includes("пневмат")) {
    return <Wind className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
  }
  if (key.includes("gauge") || key.includes("counter") || key.includes("hisoblagich") || key.includes("счетчик") || key.includes("meter")) {
    return <Gauge className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
  }
  if (key.includes("zap") || key.includes("electric") || key.includes("elektr") || key.includes("электро")) {
    return <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
  }
  if (key.includes("cpu") || key.includes("automat") || key.includes("instrument") || key.includes("kipia") || key.includes("кипиа") || key.includes("plc")) {
    return <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
  }
  if (key.includes("wrench") || key.includes("tool") || key.includes("asbob") || key.includes("прочее") || key.includes("misc")) {
    return <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
  }
  if (key.includes("activity") || key.includes("pump") || key.includes("nasos") || key.includes("насос")) {
    return <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
  }
  return <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
}

function getSubcategoryIcon(slug: string, name?: string) {
  const key = `${slug || ""} ${name || ""}`.toLowerCase();

  // 1. Elektr & Quvvat & Transformator & Stabilizator
  if (
    key.includes("электроэнерг") ||
    key.includes("electricity") ||
    key.includes("transform") ||
    key.includes("transformat") ||
    key.includes("вольтметр") ||
    key.includes("амперметр") ||
    key.includes("stabiliz") ||
    key.includes("стабилизатор") ||
    key.includes("электродвиг")
  ) {
    return <Zap className="w-3.5 h-3.5 text-industrial-orange shrink-0" />;
  }

  // 2. Gaz & Olov
  if (
    key.includes("газ") ||
    key.includes("gas") ||
    key.includes("горелк") ||
    key.includes("газорегулятор")
  ) {
    return <Flame className="w-3.5 h-3.5 text-industrial-orange shrink-0" />;
  }

  // 3. Suv & Gidravlika & Suyuqlik
  if (
    key.includes("вод") ||
    key.includes("water") ||
    key.includes("гидро") ||
    key.includes("hydraulic") ||
    key.includes("масл") ||
    key.includes("oil")
  ) {
    return <Droplet className="w-3.5 h-3.5 text-industrial-orange shrink-0" />;
  }

  // 4. Bosim, Manometr & Sarf o'lchash
  if (
    key.includes("расход") ||
    key.includes("flow") ||
    key.includes("давлен") ||
    key.includes("pressure") ||
    key.includes("манометр") ||
    key.includes("gauge")
  ) {
    return <Gauge className="w-3.5 h-3.5 text-industrial-orange shrink-0" />;
  }

  // 5. Harorat & Termometr
  if (
    key.includes("термо") ||
    key.includes("температур") ||
    key.includes("thermo") ||
    key.includes("temperature")
  ) {
    return <Thermometer className="w-3.5 h-3.5 text-industrial-orange shrink-0" />;
  }

  // 6. Filtrlar
  if (key.includes("фильтр") || key.includes("filter")) {
    return <Filter className="w-3.5 h-3.5 text-industrial-orange shrink-0" />;
  }

  // 7. Shlanglar & Kabellar
  if (key.includes("шланг") || key.includes("hose") || key.includes("кабел") || key.includes("cable")) {
    return <Cable className="w-3.5 h-3.5 text-industrial-orange shrink-0" />;
  }

  // 8. Klapanlar & Zadvijkalar & Ventillar
  if (
    key.includes("клапан") ||
    key.includes("valve") ||
    key.includes("задвиж") ||
    key.includes("вентил")
  ) {
    return <Disc className="w-3.5 h-3.5 text-industrial-orange shrink-0" />;
  }

  // 9. Taqsimlagichlar & Silindrlar
  if (
    key.includes("распределител") ||
    key.includes("distributor") ||
    key.includes("цилиндр") ||
    key.includes("cylinder")
  ) {
    return <Sliders className="w-3.5 h-3.5 text-industrial-orange shrink-0" />;
  }

  // 10. Tugmalar & Oxirgi o'chirgichlar
  if (key.includes("кнопк") || key.includes("button") || key.includes("switch")) {
    return <ToggleLeft className="w-3.5 h-3.5 text-industrial-orange shrink-0" />;
  }

  // 11. Avtomatika, Kontroller & KIPiA
  if (
    key.includes("контроллер") ||
    key.includes("controller") ||
    key.includes("plc") ||
    key.includes("автомат") ||
    key.includes("электромагнит")
  ) {
    return <Cpu className="w-3.5 h-3.5 text-industrial-orange shrink-0" />;
  }

  // 12. Nasoslar & Dvigatellar
  if (key.includes("насос") || key.includes("pump") || key.includes("двигател") || key.includes("motor")) {
    return <Activity className="w-3.5 h-3.5 text-industrial-orange shrink-0" />;
  }

  // 13. Asboblar, Fitinglar & Qismlar
  if (
    key.includes("инструмент") ||
    key.includes("tool") ||
    key.includes("фитинг") ||
    key.includes("fitting") ||
    key.includes("asbob")
  ) {
    return <Wrench className="w-3.5 h-3.5 text-industrial-orange shrink-0" />;
  }

  // Default
  return <Layers className="w-3.5 h-3.5 text-industrial-orange shrink-0" />;
}

export function CategoryGrid({
  categories,
  title,
  showViewAll = true,
  gridCols = 2,
}: CategoryGridProps) {
  const { t, locale } = useTranslation();
  // Categories come from the server; the language switcher calls router.refresh()
  const currentCategories = categories || [];

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
          iconName: cat.iconName || cat.slug,
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
          const icon = getCategoryIcon(cat.iconName || cat.slug, cat.name);

          return (
            <div
              key={`${cat.slug}-${idx}`}
              className="rounded-xl overflow-hidden border border-industrial-border-subtle shadow-xs transition-all"
            >
              {/* Header Bar with Toggle Button */}
              <button
                type="button"
                onClick={() => toggleCategory(idx)}
                className={`w-full ${bgColor} text-white p-3.5 sm:p-5 flex items-center justify-between hover:brightness-105 transition-all text-left group cursor-pointer shadow-xs`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                  {/* Plus / Minus Accordion Trigger */}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20 flex items-center justify-center font-black text-lg sm:text-xl shrink-0 group-hover:scale-110 transition-transform">
                    {isOpen ? <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-white" /> : <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                  </div>

                  {/* Category Specialized Icon in Front of the Title */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/25 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
                    {icon}
                  </div>

                  {/* Category Name */}
                  <span className="text-sm sm:text-lg font-black tracking-tight leading-snug truncate">
                    {cat.name}
                  </span>
                </div>

                {/* Right-side Accordion Chevron Indicator */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0 ml-2 group-hover:bg-white/25 transition-colors">
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Subcategories List Panel (Shown when Open) */}
              {isOpen && (
                <div className="bg-[#f9f9fc] p-3.5 sm:p-5 border-t border-industrial-border-subtle animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 sm:gap-y-2 text-xs">
                    {cat.subcategories.map((sub, subIdx) => {
                      const subIcon = getSubcategoryIcon(sub.slug, sub.name);

                      return (
                        <Link
                          key={subIdx}
                          href={`/katalog?category=${sub.slug}`}
                          className="text-industrial-text hover:text-industrial-blue py-1.5 px-2 rounded-lg hover:bg-white hover:shadow-2xs transition-all flex items-center gap-2 font-semibold group/sub border border-transparent hover:border-industrial-border-subtle"
                        >
                          <div className="w-6 h-6 rounded-md bg-white border border-gray-200/80 shadow-3xs flex items-center justify-center shrink-0 group-hover/sub:border-industrial-orange group-hover/sub:scale-105 transition-all">
                            {subIcon}
                          </div>
                          <span className="line-clamp-1 text-xs group-hover/sub:text-industrial-blue group-hover/sub:font-bold transition-colors">
                            {sub.name}
                          </span>
                        </Link>
                      );
                    })}
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
