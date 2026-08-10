import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  SlidersHorizontal,
  Download,
  Plus,
  ArrowRight,
  Tag,
  TrendingUp,
} from "lucide-react";
import { fetchCategories, fetchProducts } from "@/lib/api";
import { getServerLocale } from "@/lib/i18n/server";
import { ProductCard } from "@/components/features/product-card";
import { BreadcrumbJsonLd } from "@/components/features/json-ld";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CategoryGrid } from "@/components/features/category-grid";
import { CatalogCategorySidebar } from "@/components/features/catalog-category-sidebar";
import { CatalogFilterToolbar } from "@/components/features/catalog-filter-toolbar";
import { PriceFilterForm } from "@/components/features/price-filter-form";

export const metadata: Metadata = {
  title: "Mahsulotlar Katalogi — Kontrol.uz",
  description:
    "Kontrol.uz sanoat uskunalar va xavfsizlik tizimlari katalogi: IP kameralar, NVR registratorlar, turniketlar, pnevmatika va avtomatika.",
};

interface CatalogPageProps {
  searchParams: {
    category?: string;
    search?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const selectedCategorySlug = searchParams.category;
  const searchQuery = searchParams.search?.trim().toLowerCase();
  const sortOption = searchParams.sort || "popular";
  const minPriceNum = searchParams.minPrice ? Number(searchParams.minPrice) : null;
  const maxPriceNum = searchParams.maxPrice ? Number(searchParams.maxPrice) : null;

  const locale = getServerLocale();
  const categories = await fetchCategories(locale);
  const allProducts = await fetchProducts({ locale });

  // 1. Filtering products
  let products = allProducts.filter((p) => {
    // Category filter
    if (selectedCategorySlug) {
      const matchCat =
        p.categorySlug === selectedCategorySlug ||
        p.categoryRelationSlug === selectedCategorySlug ||
        p.categorySlug?.toLowerCase() === selectedCategorySlug.toLowerCase();
      if (!matchCat) return false;
    }

    // Search query filter
    if (searchQuery) {
      const titleMatch = p.title.toLowerCase().includes(searchQuery);
      const skuMatch = p.sku.toLowerCase().includes(searchQuery);
      const categoryMatch = p.categoryName.toLowerCase().includes(searchQuery);
      const descMatch = p.shortDescription.toLowerCase().includes(searchQuery);
      const specMatch = Object.entries(p.specifications || {}).some(
        ([k, v]) => k.toLowerCase().includes(searchQuery) || v.toLowerCase().includes(searchQuery)
      );

      if (!titleMatch && !skuMatch && !categoryMatch && !descMatch && !specMatch) {
        return false;
      }
    }

    // Min price filter
    if (minPriceNum !== null && !isNaN(minPriceNum) && p.price < minPriceNum) {
      return false;
    }

    // Max price filter
    if (maxPriceNum !== null && !isNaN(maxPriceNum) && p.price > maxPriceNum) {
      return false;
    }

    return true;
  });

  // 2. Sorting products
  products = [...products].sort((a, b) => {
    if (sortOption === "price-asc") {
      return a.price - b.price;
    }
    if (sortOption === "price-desc") {
      return b.price - a.price;
    }
    if (sortOption === "popular") {
      return b.rating - a.rating || b.reviewCount - a.reviewCount;
    }
    return 0;
  });

  const onSaleProducts = allProducts.filter((p) => p.oldPrice && p.oldPrice > p.price);
  const bestsellerProducts = allProducts.filter((p) => p.rating >= 4.9);
  const activeCategory = categories.find((c) => c.slug === selectedCategorySlug);

  const breadcrumbs = [
    { name: "Bosh sahifa", url: "https://kontrol.uz" },
    { name: "Katalog", url: "https://kontrol.uz/katalog" },
    ...(activeCategory
      ? [{ name: activeCategory.name, url: `https://kontrol.uz/katalog?category=${activeCategory.slug}` }]
      : []),
  ];

  const TILE_COLORS = [
    "bg-[#fc8b91]",
    "bg-[#7b81f1]",
    "bg-[#7accee]",
    "bg-[#5cdc69]",
    "bg-[#c56dbb]",
    "bg-[#a773ed]",
  ];

  const popularCategories = categories.map((cat, idx) => ({
    name: cat.name,
    slug: cat.slug,
    color: TILE_COLORS[idx % TILE_COLORS.length],
  }));

  return (
    <div className="bg-industrial-surface min-h-screen py-6">
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-industrial-text-muted flex items-center gap-2">
          <Link href="/" className="hover:underline">
            Bosh sahifa
          </Link>
          <span>/</span>
          <Link href="/katalog" className="hover:underline font-bold text-industrial-blue">
            Katalog
          </Link>
          {activeCategory && (
            <>
              <span>/</span>
              <span className="text-industrial-orange font-bold">{activeCategory.name}</span>
            </>
          )}
        </nav>

        {/* 1. Ommabop Ruknlar Section with Subcategories Dropdown / Accordion */}
        <CategoryGrid
          categories={categories}
          title="Ommabop Ruknlar"
          showViewAll={false}
          gridCols={2}
        />

        {/* 2. Main Catalog Section with Deep Filters Sidebar & Product Grid */}
        <div className="pt-4 border-t border-industrial-border grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar (Categories with Subcategories Dropdown & Deep Filters) */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Category Navigation with Subcategories Dropdown */}
            <CatalogCategorySidebar
              categories={categories}
              selectedCategorySlug={selectedCategorySlug}
            />

            {/* Deep Technical & Price Filters */}
            <Card className="p-5 bg-white border border-industrial-border space-y-5 text-xs">
              <div className="font-extrabold text-sm text-industrial-blue uppercase border-b border-industrial-border pb-2">
                Filtrlar
              </div>

              {/* Price Filter Component */}
              <PriceFilterForm />

              {/* PDF Download Catalog Button */}
              <Button variant="outline" className="w-full gap-2 text-xs font-bold border-industrial-blue text-industrial-blue">
                <Download className="w-4 h-4" />
                Sanoat Katalogini Yuklash (PDF)
              </Button>
            </Card>
          </aside>

          {/* Right Product Grid Area */}
          <main className="lg:col-span-9 space-y-6">
            {/* Header & Sorting Toolbar */}
            <CatalogFilterToolbar
              totalProductsCount={products.length}
              activeCategoryName={activeCategory?.name}
              searchQuery={searchParams.search}
            />

            {/* Product Cards Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded border border-industrial-border space-y-3">
                <p className="text-industrial-text font-bold text-base">
                  Ushbu mezon bo'yicha hech qanday uskunalar topilmadi.
                </p>
                <p className="text-industrial-text-muted text-xs">
                  Qidiruv so'zini o'zgartiring yoki filtrni tozalanib ko'ring.
                </p>
                <Link
                  href="/katalog"
                  className="inline-block pt-2 text-xs font-extrabold text-industrial-orange hover:underline uppercase"
                >
                  Filtrni tozalash va Katalogga qaytish →
                </Link>
              </div>
            )}
          </main>
        </div>

        {/* 3. Chegirmali Mahsulotlar Section */}
        {onSaleProducts.length > 0 && (
          <section className="pt-4 border-t border-industrial-border">
            <div className="flex justify-between items-end mb-6 pb-2 border-b border-industrial-border">
              <h2 className="text-xl font-black text-rose-600 flex items-center gap-2">
                <Tag className="w-5 h-5 text-rose-600" />
                Chegirmali Mahsulotlar
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {onSaleProducts.map((product) => (
                <ProductCard key={`sale-${product.id}`} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* 4. Bestsellerlar Section */}
        {bestsellerProducts.length > 0 && (
          <section className="pt-4 border-t border-industrial-border">
            <div className="flex justify-between items-end mb-6 pb-2 border-b border-industrial-border">
              <h2 className="text-xl font-black text-industrial-blue flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-500" />
                Bestsellerlar (TOP Savdo Xitlari)
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestsellerProducts.slice(0, 4).map((product) => (
                <ProductCard key={`top-${product.id}`} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
