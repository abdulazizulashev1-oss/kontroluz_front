"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Flame, ArrowRight } from "lucide-react";
import { Product } from "@/shared/types";
import { ProductCard } from "@/components/features/product-card";
import { useTranslation } from "@/lib/i18n/context";
import { fetchProducts } from "@/lib/api";

interface HomeProductsSectionProps {
  initialProducts: Product[];
  type: "new" | "bestseller";
}

export function HomeProductsSection({ initialProducts, type }: HomeProductsSectionProps) {
  const { t, locale } = useTranslation();
  const [products, setProducts] = useState<Product[]>(initialProducts || []);

  useEffect(() => {
    let active = true;
    fetchProducts({ locale }).then((data) => {
      if (active && Array.isArray(data) && data.length > 0) {
        setProducts(data);
      }
    });
    return () => {
      active = false;
    };
  }, [locale]);

  const displayList = type === "bestseller" ? products.slice(0, 4) : products.slice(0, 8);

  if (type === "bestseller") {
    return (
      <section className="space-y-4 sm:space-y-6">
        <div className="flex justify-between items-end pb-2.5 sm:pb-3 border-b-2 border-industrial-orange">
          <div>
            <span className="text-[10px] sm:text-xs font-extrabold uppercase text-industrial-blue tracking-widest flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-industrial-orange" />
              {t("hero.badge")}
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-industrial-text mt-0.5 sm:mt-1">
              {locale === "ru"
                ? "Хиты Продаж"
                : locale === "en"
                ? "Bestsellers & Popular"
                : "Savdo Xitlari (Bestsellers)"}
            </h2>
          </div>
          <Link
            href="/katalog"
            className="text-[11px] sm:text-xs font-extrabold text-industrial-blue hover:text-industrial-orange flex items-center gap-1 uppercase shrink-0"
          >
            <span>{t("categories.viewAll")}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
          {displayList.map((product) => (
            <ProductCard key={`hit-${product.id}`} product={product} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4 sm:space-y-6">
      <div className="flex justify-between items-end pb-2.5 sm:pb-3 border-b-2 border-industrial-blue">
        <div>
          <span className="text-[10px] sm:text-xs font-extrabold uppercase text-industrial-orange tracking-widest flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            {locale === "ru"
              ? "Новинки каталога"
              : locale === "en"
              ? "New Arrivals"
              : "Tizim yangiliklari"}
          </span>
          <h2 className="text-lg sm:text-2xl font-black text-industrial-text mt-0.5 sm:mt-1">
            {locale === "ru"
              ? "Новое Оборудование"
              : locale === "en"
              ? "New Industrial Equipment"
              : "Yangi Kelgan Uskunalar"}
          </h2>
        </div>
        <Link
          href="/katalog"
          className="text-[11px] sm:text-xs font-extrabold text-industrial-blue hover:text-industrial-orange flex items-center gap-1 uppercase shrink-0"
        >
          <span>{t("categories.viewAll")}</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
        {displayList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
