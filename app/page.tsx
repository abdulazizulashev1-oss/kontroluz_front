import React from "react";
import Link from "next/link";
import { ArrowRight, Building2, Truck, Wrench, Flame, Sparkles } from "lucide-react";
import { HeroBanner } from "@/components/features/hero-banner";
import { CategoryGrid } from "@/components/features/category-grid";
import { ProductCard } from "@/components/features/product-card";
import { HomeProductsSection } from "@/components/features/home-products-section";
import { PromoBanner } from "@/components/features/promo-banner";
import { EngineeringExcellence } from "@/components/features/engineering-excellence";
import { SolutionCalculator } from "@/components/features/solution-calculator";
import { StatisticsInteractiveSection } from "@/components/features/statistics-interactive-section";
import { fetchCategories, fetchProducts } from "@/lib/api";
import { getServerLocale } from "@/lib/i18n/server";

export default async function HomePage() {
  const locale = getServerLocale();
  const categories = await fetchCategories(locale);
  const featuredProducts = await fetchProducts({ locale });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">
      {/* 1. Stitch Hero Section */}
      <HeroBanner />

      {/* 2. Stitch 6-Tile Popular Categories */}
      <CategoryGrid categories={categories} />

      {/* 3. Interactive Statistics & Directory Block */}
      <StatisticsInteractiveSection />

      {/* 4. New Arrivals (Yangi Kelgan Uskunalar) */}
      <HomeProductsSection initialProducts={featuredProducts} type="new" />

      {/* 5. Promotional Banner (Aksiya / Maxsus Taklif) */}
      <PromoBanner />

      {/* 6. Bestsellers / Hit Products (Xiti Prodaj) */}
      <HomeProductsSection initialProducts={featuredProducts} type="bestseller" />

      {/* 7. Engineering Excellence (Injenyerlik Mukammalligi) */}
      <EngineeringExcellence />

      {/* 8. B2B Security Solution Calculator */}
      <SolutionCalculator />
    </div>
  );
}
