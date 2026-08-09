"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

interface CatalogFilterToolbarProps {
  totalProductsCount: number;
  activeCategoryName?: string;
  searchQuery?: string;
}

function CatalogFilterToolbarContent({
  totalProductsCount,
  activeCategoryName,
  searchQuery,
}: CatalogFilterToolbarProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams?.get("sort") || "popular";

  const updateQueryParams = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/katalog?${params.toString()}`);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateQueryParams("sort", e.target.value);
  };

  const handleClearSearch = () => {
    updateQueryParams("search", undefined);
  };

  return (
    <div className="bg-white p-5 rounded-lg border border-industrial-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-industrial-text">
          {activeCategoryName || t("catalogPage.allCategories")}
        </h1>
        <div className="flex items-center gap-3 mt-1 flex-wrap text-xs text-industrial-text-muted">
          <span>
            {t("catalogPage.showingResults")}{" "}
            <span className="font-bold text-industrial-blue">{totalProductsCount} {t("categories.itemsCount")}</span>
          </span>

          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 bg-industrial-blue/10 text-industrial-blue px-2.5 py-1 rounded font-bold border border-industrial-blue/20">
              <Search className="w-3.5 h-3.5" />
              <span>"{searchQuery}"</span>
              <button
                onClick={handleClearSearch}
                className="hover:text-rose-600 ml-1 font-black"
                title="Qidiruvni tozalash"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-industrial-surface-low px-3 py-1.5 rounded border border-industrial-border text-xs">
          <span className="text-industrial-text-muted font-semibold">{t("catalogPage.sortBy")}:</span>
          <select
            value={currentSort}
            onChange={handleSortChange}
            className="bg-transparent font-bold text-industrial-blue focus:outline-none cursor-pointer"
          >
            <option value="popular">{t("catalogPage.sortPopular")}</option>
            <option value="price-asc">{t("catalogPage.sortPriceAsc")}</option>
            <option value="price-desc">{t("catalogPage.sortPriceDesc")}</option>
            <option value="newest">{t("catalogPage.sortNewest")}</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export function CatalogFilterToolbar(props: CatalogFilterToolbarProps) {
  return (
    <Suspense fallback={
      <div className="bg-white p-5 rounded-lg border border-industrial-border shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-black text-industrial-text">
          {props.activeCategoryName || "Katalog"}
        </h1>
      </div>
    }>
      <CatalogFilterToolbarContent {...props} />
    </Suspense>
  );
}
