"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";

function PriceFilterFormContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams?.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams?.get("maxPrice") || "");

  const handlePriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    router.push(`/katalog?${params.toString()}`);
  };

  return (
    <form onSubmit={handlePriceSubmit} className="space-y-3">
      <div className="font-bold text-industrial-text">{t("catalogPage.priceFilter")}:</div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder={t("catalogPage.minPrice")}
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full p-2 border border-industrial-border rounded bg-industrial-surface-low text-xs font-semibold focus:outline-none focus:border-industrial-blue"
        />
        <span className="text-gray-400 font-bold">-</span>
        <input
          type="number"
          placeholder={t("catalogPage.maxPrice")}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full p-2 border border-industrial-border rounded bg-industrial-surface-low text-xs font-semibold focus:outline-none focus:border-industrial-blue"
        />
      </div>
      <Button
        type="submit"
        variant="outline"
        size="sm"
        className="w-full text-xs font-bold border-industrial-blue text-industrial-blue hover:bg-industrial-blue hover:text-white"
      >
        {t("catalogPage.filterTitle")}
      </Button>
    </form>
  );
}

export function PriceFilterForm() {
  return (
    <Suspense fallback={<div className="h-20 bg-industrial-surface-low animate-pulse rounded" />}>
      <PriceFilterFormContent />
    </Suspense>
  );
}
