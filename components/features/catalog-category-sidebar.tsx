"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SlidersHorizontal, ChevronRight, Plus, Minus, Download } from "lucide-react";
import { Category } from "@/shared/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";
import { fetchCategories } from "@/lib/api";

interface CatalogCategorySidebarProps {
  categories: Category[];
  selectedCategorySlug?: string;
  showPdfButton?: boolean;
}

export function CatalogCategorySidebar({
  categories,
  selectedCategorySlug,
  showPdfButton = true,
}: CatalogCategorySidebarProps) {
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

  // Initialize open state: only open if selectedCategorySlug matches it or its subcategories
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    (categories || []).forEach((cat) => {
      const isSelected =
        selectedCategorySlug === cat.slug ||
        cat.subcategories?.some((s) => s.slug === selectedCategorySlug);
      if (isSelected) {
        map[cat.slug] = true;
      }
    });
    return map;
  });

  const toggleCategory = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMap((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  return (
    <Card className="p-5 bg-white border border-industrial-border shadow-xs rounded-xl">
      <div className="flex items-center gap-2 text-sm font-extrabold text-industrial-blue uppercase border-b border-industrial-border pb-3 mb-4">
        <SlidersHorizontal className="w-4 h-4 text-industrial-orange" />
        <span>{t("footer.categories")}</span>
      </div>

      <ul className="space-y-1.5 text-xs font-medium">
        {/* Barcha Uskunalar */}
        <li>
          <Link
            href="/katalog"
            className={`block p-2.5 rounded-lg transition-all ${
              !selectedCategorySlug
                ? "bg-industrial-blue text-white font-black shadow-xs"
                : "hover:bg-industrial-surface-low text-industrial-text font-bold"
            }`}
          >
            {t("categories.allEquipment")}
          </Link>
        </li>

        {/* Categories List with Accordion / Dropdown Subcategories */}
        {currentCategories.map((cat) => {
          const hasSubcategories = Array.isArray(cat.subcategories) && cat.subcategories.length > 0;
          const isOpen = !!openMap[cat.slug];
          const isCatSelected = selectedCategorySlug === cat.slug;
          const isSubSelected = cat.subcategories?.some((s) => s.slug === selectedCategorySlug);
          const isActive = isCatSelected || isSubSelected;

          return (
            <li key={cat.id || cat.slug} className="rounded-lg overflow-hidden transition-all">
              {/* Category Item Row */}
              <div
                className={`flex items-center justify-between p-2.5 rounded-lg transition-colors group ${
                  isActive
                    ? "bg-blue-50/80 text-industrial-blue font-black border border-industrial-blue/30"
                    : "hover:bg-industrial-surface-low text-industrial-text font-bold"
                }`}
              >
                <Link
                  href={`/katalog?category=${cat.slug}`}
                  className="flex-1 flex items-center justify-between gap-2 pr-2"
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-black/5 font-mono font-bold shrink-0">
                    {cat.productCount || 10}
                  </span>
                </Link>

                {/* Dropdown Expand Toggle Button */}
                {hasSubcategories && (
                  <button
                    type="button"
                    onClick={(e) => toggleCategory(cat.slug, e)}
                    className="p-1 rounded hover:bg-black/10 transition-colors text-industrial-blue shrink-0 cursor-pointer"
                    aria-label={t("categories.expand")}
                  >
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 text-industrial-orange" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-industrial-blue" />
                    )}
                  </button>
                )}
              </div>

              {/* Subcategories Dropdown Panel */}
              {hasSubcategories && isOpen && (
                <ul className="pl-4 pr-1 py-1.5 space-y-1 bg-industrial-surface-low/60 rounded-b-lg border-l-2 border-industrial-orange ml-3 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                  {cat.subcategories!.map((sub, sIdx) => {
                    const isCurrentSub = selectedCategorySlug === sub.slug;
                    return (
                      <li key={`${sub.slug}-${sIdx}`}>
                        <Link
                          href={`/katalog?category=${sub.slug}`}
                          className={`flex items-center gap-1.5 py-1.5 px-2 rounded text-[11px] transition-colors ${
                            isCurrentSub
                              ? "bg-industrial-blue text-white font-extrabold shadow-2xs"
                              : "text-industrial-text-muted hover:text-industrial-blue hover:bg-white font-semibold"
                          }`}
                        >
                          <ChevronRight
                            className={`w-3 h-3 shrink-0 ${
                              isCurrentSub ? "text-white" : "text-industrial-orange"
                            }`}
                          />
                          <span className="truncate">{sub.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      {showPdfButton && (
        <Button
          variant="outline"
          className="w-full gap-2 text-xs font-bold border-industrial-blue text-industrial-blue hover:bg-industrial-blue hover:text-white mt-6 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>{t("categories.downloadPdf")}</span>
        </Button>
      )}
    </Card>
  );
}
