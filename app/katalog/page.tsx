import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  Download,
  Tag,
  TrendingUp,
} from "lucide-react";
import { fetchCategories, fetchProducts } from "@/lib/api";
import { getServerLocale } from "@/lib/i18n/server";
import { translations } from "@/lib/i18n/translations";
import { ProductCard } from "@/components/features/product-card";
import { BreadcrumbJsonLd } from "@/components/features/json-ld";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CategoryGrid } from "@/components/features/category-grid";
import { CatalogCategorySidebar } from "@/components/features/catalog-category-sidebar";
import { CatalogFilterToolbar } from "@/components/features/catalog-filter-toolbar";
import { PriceFilterForm } from "@/components/features/price-filter-form";

export async function generateMetadata({
  searchParams,
}: CatalogPageProps): Promise<Metadata> {
  const locale = getServerLocale();
  const dict = translations[locale] || translations.ru || translations.uz;
  const selectedCategorySlug = searchParams?.category;
  const searchQuery = searchParams?.search;

  if (selectedCategorySlug) {
    const categories = await fetchCategories(locale);
    const matchedCategory = categories.find(
      (c) =>
        c.slug.toLowerCase() === selectedCategorySlug.toLowerCase() ||
        c.name.toLowerCase() === selectedCategorySlug.toLowerCase()
    );

    if (matchedCategory) {
      const catTitle = `${matchedCategory.name} — Sanoat Uskunalari va Katalog | Kontrol.uz`;
      const catDesc = matchedCategory.description
        ? `${matchedCategory.description}. Kontrol.uz — O'zbekiston bo'yicha rasmiy kafolat, yetkazib berish va o'rnatish xizmati.`
        : `${matchedCategory.name} bo'yicha eng sara sanoat uskunalari, narxlar va yetkazib berish Kontrol.uz da.`;

      return {
        title: catTitle,
        description: catDesc,
        keywords: [
          matchedCategory.name,
          "Sanoat uskunalari",
          "Katalog",
          "Kontrol.uz",
          "Toshkent",
          "O'zbekiston",
        ],
        openGraph: {
          title: catTitle,
          description: catDesc,
          type: "website",
          url: `https://kontrol.uz/katalog?category=${matchedCategory.slug}`,
          siteName: "Kontrol.uz",
        },
        alternates: {
          canonical: `https://kontrol.uz/katalog?category=${matchedCategory.slug}`,
        },
      };
    }
  }

  if (searchQuery) {
    const searchTitle = `"${searchQuery}" bo'yicha qidiruv natijalari — Kontrol.uz`;
    const searchDesc = `Kontrol.uz katalogida "${searchQuery}" bo'yicha topilgan barcha sanoat uskunalari, texnik xususiyatlar va narxlar.`;
    return {
      title: searchTitle,
      description: searchDesc,
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  return {
    title: `${dict.catalogPage.title} — Sanoat Uskunalari va Xavfsizlik Tizimlari | Kontrol.uz`,
    description:
      "Kontrol.uz — Elektr hisoblagichlar, pnevmatika, videokuzatuv, SKUD va sanoat avtomatikasining O'zbekistondagi rasmiy distribyutori va integratori.",
    openGraph: {
      title: `${dict.catalogPage.title} | Kontrol.uz`,
      description: dict.catalogPage.subtitle,
      url: "https://kontrol.uz/katalog",
      siteName: "Kontrol.uz",
    },
    alternates: {
      canonical: "https://kontrol.uz/katalog",
    },
  };
}

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
  const dict = translations[locale] || translations.ru || translations.uz;
  const categories = await fetchCategories(locale);
  const allProducts = await fetchProducts({
    locale,
    categorySlug: selectedCategorySlug,
    search: searchQuery,
  });

  // Build set of valid category identifiers (including parent and subcategories by slug and name)
  const validCategorySlugs: string[] = [];
  if (selectedCategorySlug) {
    const targetSlug = String(selectedCategorySlug).toLowerCase();
    validCategorySlugs.push(targetSlug);

    categories.forEach((root) => {
      const rootSlug = String(root.slug || "").toLowerCase();
      const rootName = String(root.name || "").toLowerCase();
      const rootMatch = rootSlug === targetSlug || rootName === targetSlug;
      if (rootMatch) {
        if (rootSlug) validCategorySlugs.push(rootSlug);
        if (rootName) validCategorySlugs.push(rootName);
        root.subcategories?.forEach((s) => {
          if (s.slug) validCategorySlugs.push(String(s.slug).toLowerCase());
          if (s.name) validCategorySlugs.push(String(s.name).toLowerCase());
        });
      }

      root.subcategories?.forEach((sub) => {
        const subSlug = String(sub.slug || "").toLowerCase();
        const subName = String(sub.name || "").toLowerCase();
        const subMatch = subSlug === targetSlug || subName === targetSlug;
        if (subMatch) {
          if (subSlug) validCategorySlugs.push(subSlug);
          if (subName) validCategorySlugs.push(subName);
          if (rootSlug) validCategorySlugs.push(rootSlug);
          if (rootName) validCategorySlugs.push(rootName);
        }
      });
    });
  }

  // 1. Filtering products
  let products = allProducts.filter((p) => {
    // Category filter
    if (selectedCategorySlug) {
      const matchCat =
        validCategorySlugs.includes(String(p.categorySlug || "").toLowerCase()) ||
        (p.categoryRelationSlug && validCategorySlugs.includes(String(p.categoryRelationSlug).toLowerCase())) ||
        (p.parentCategorySlug && validCategorySlugs.includes(String(p.parentCategorySlug).toLowerCase())) ||
        p.allCategorySlugs?.some((s) => typeof s === "string" && validCategorySlugs.includes(s.toLowerCase()));

      if (!matchCat) return false;
    }

    // Search query filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const qNormalized = q.replace(/[^a-z0-9а-яe-yu]/gi, "");

      const titleStr = String(p.title || "").toLowerCase();
      const skuStr = String(p.sku || "").toLowerCase();
      const slugStr = String(p.slug || "").toLowerCase();
      const catStr = String(p.categoryName || "").toLowerCase();
      const shortDesc = String(p.shortDescription || "").toLowerCase();
      const fullDesc = String(p.fullDescription || "").toLowerCase();

      const titleMatch = titleStr.includes(q) || (qNormalized !== "" && titleStr.replace(/[^a-z0-9а-яe-yu]/gi, "").includes(qNormalized));
      const skuMatch = skuStr.includes(q) || (qNormalized !== "" && skuStr.replace(/[^a-z0-9а-яe-yu]/gi, "").includes(qNormalized));
      const slugMatch = slugStr.includes(q) || (qNormalized !== "" && slugStr.replace(/[^a-z0-9а-яe-yu]/gi, "").includes(qNormalized));
      const categoryMatch = catStr.includes(q);
      const descMatch = shortDesc.includes(q) || fullDesc.includes(q);
      const specMatch = Object.entries(p.specifications || {}).some(
        ([k, v]) =>
          String(k || "").toLowerCase().includes(q) ||
          String(v || "").toLowerCase().includes(q)
      );

      if (!titleMatch && !skuMatch && !slugMatch && !categoryMatch && !descMatch && !specMatch) {
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
    { name: dict.nav.home, url: "https://kontrol.uz" },
    { name: dict.nav.catalog, url: "https://kontrol.uz/katalog" },
    ...(activeCategory
      ? [{ name: activeCategory.name, url: `https://kontrol.uz/katalog?category=${activeCategory.slug}` }]
      : []),
  ];

  return (
    <div className="bg-industrial-surface min-h-screen py-6">
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-industrial-text-muted flex items-center gap-2">
          <Link href="/" className="hover:underline">
            {dict.nav.home}
          </Link>
          <span>/</span>
          <Link href="/katalog" className="hover:underline font-bold text-industrial-blue">
            {dict.nav.catalog}
          </Link>
          {activeCategory && (
            <>
              <span>/</span>
              <span className="text-industrial-orange font-bold">{activeCategory.name}</span>
            </>
          )}
        </nav>

        {/* 1. Ommabop Ruknlar Section (Shown only when no category filter or search query is active) */}
        {!selectedCategorySlug && !searchQuery && (
          <CategoryGrid
            categories={categories}
            title={dict.categories.popularTitle}
            showViewAll={false}
            gridCols={2}
          />
        )}

        {/* 2. Main Catalog Section with Deep Filters Sidebar & Product Grid */}
        <div className="pt-4 border-t border-industrial-border grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar (Categories with Subcategories Dropdown & Deep Filters - Sticky on scroll) */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto pr-1">
            {/* Category Navigation with Subcategories Dropdown */}
            <CatalogCategorySidebar
              categories={categories}
              selectedCategorySlug={selectedCategorySlug}
              showPdfButton={false}
            />

            {/* Deep Technical & Price Filters */}
            <Card className="p-5 bg-white border border-industrial-border space-y-5 text-xs">
              <div className="font-extrabold text-sm text-industrial-blue uppercase border-b border-industrial-border pb-2">
                {dict.catalogPage.filterTitle}
              </div>

              {/* Price Filter Component */}
              <PriceFilterForm />

              {/* PDF Download Catalog Button */}
              <Button
                variant="outline"
                className="w-full gap-2 text-xs font-bold border-industrial-blue text-industrial-blue hover:bg-industrial-blue hover:text-white cursor-pointer"
              >
                <Download className="w-4 h-4" />
                {dict.catalogPage.downloadPdf}
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
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded border border-industrial-border space-y-3">
                <p className="text-industrial-text font-bold text-base">
                  {dict.catalogPage.noProducts}
                </p>
                <p className="text-industrial-text-muted text-xs">
                  {dict.catalogPage.noProductsDesc}
                </p>
                <Link
                  href="/katalog"
                  className="inline-block pt-2 text-xs font-extrabold text-industrial-orange hover:underline uppercase"
                >
                  {dict.catalogPage.clearFilters}
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
                {dict.products.discountedProducts}
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
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
                {dict.products.bestsellers}
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
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
