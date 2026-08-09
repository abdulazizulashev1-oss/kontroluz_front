import React from "react";
import Link from "next/link";
import { ArrowRight, Building2, Truck, Wrench, Flame, Sparkles } from "lucide-react";
import { HeroBanner } from "@/components/features/hero-banner";
import { CategoryGrid } from "@/components/features/category-grid";
import { ProductCard } from "@/components/features/product-card";
import { PromoBanner } from "@/components/features/promo-banner";
import { EngineeringExcellence } from "@/components/features/engineering-excellence";
import { SolutionCalculator } from "@/components/features/solution-calculator";
import { fetchCategories, fetchFeaturedProducts } from "@/lib/api";

export default async function HomePage() {
  const categories = await fetchCategories();
  const featuredProducts = await fetchFeaturedProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">
      {/* 1. Stitch Hero Section */}
      <HeroBanner />

      {/* 2. Stitch 6-Tile Popular Categories */}
      <CategoryGrid categories={categories} />

      {/* 3. Stitch Statistics Block */}
      <section className="bg-industrial-surface-low rounded-xl p-8 md:p-12 border border-industrial-border shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-industrial-blue text-white rounded-full flex items-center justify-center mb-4 shadow">
              <Building2 className="w-8 h-8 text-industrial-orange" />
            </div>
            <span className="text-4xl sm:text-5xl font-black text-industrial-blue mb-2">
              28
            </span>
            <span className="text-sm font-bold text-industrial-text-muted uppercase tracking-wider">
              Savdo va B2B Ofislari
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-industrial-blue-dark text-white rounded-full flex items-center justify-center mb-4 shadow">
              <Truck className="w-8 h-8 text-industrial-orange" />
            </div>
            <span className="text-4xl sm:text-5xl font-black text-industrial-blue mb-2">
              86
            </span>
            <span className="text-sm font-bold text-industrial-text-muted uppercase tracking-wider">
              Rasmiy Distribyutorlar
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-industrial-orange text-white rounded-full flex items-center justify-center mb-4 shadow">
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <span className="text-4xl sm:text-5xl font-black text-industrial-orange mb-2">
              35
            </span>
            <span className="text-sm font-bold text-industrial-text-muted uppercase tracking-wider">
              Servis va Texnik Markazlar
            </span>
          </div>
        </div>
      </section>

      {/* 4. New Arrivals (Yangi Kelgan Uskunalar) */}
      <section className="space-y-6">
        <div className="flex justify-between items-end pb-3 border-b-2 border-industrial-blue">
          <div>
            <span className="text-xs font-extrabold uppercase text-industrial-orange tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Tizim yangiliklari
            </span>
            <h2 className="text-2xl font-black text-industrial-text mt-1">
              Yangi Kelgan Uskunalar
            </h2>
          </div>
          <Link
            href="/katalog"
            className="text-xs font-extrabold text-industrial-blue hover:text-industrial-orange flex items-center gap-1 uppercase"
          >
            <span>Barchasini ko'rish</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Promotional Banner (Aksiya / Maxsus Taklif) */}
      <PromoBanner />

      {/* 6. Bestsellers / Hit Products (Xiti Prodaj) */}
      <section className="space-y-6">
        <div className="flex justify-between items-end pb-3 border-b-2 border-industrial-orange">
          <div>
            <span className="text-xs font-extrabold uppercase text-industrial-blue tracking-widest flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-industrial-orange" />
              Eng Kop Sotilgan
            </span>
            <h2 className="text-2xl font-black text-industrial-text mt-1">
              Savdo Xitlari (Bestsellers)
            </h2>
          </div>
          <Link
            href="/katalog"
            className="text-xs font-extrabold text-industrial-blue hover:text-industrial-orange flex items-center gap-1 uppercase"
          >
            <span>Katalogga o'tish</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={`hit-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Engineering Excellence (Injenyerlik Mukammalligi) */}
      <EngineeringExcellence />

      {/* 8. B2B Security Solution Calculator */}
      <SolutionCalculator />
    </div>
  );
}
