import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  Star,
  ShieldCheck,
  Truck,
  ShoppingCart,
  Check,
  Phone,
  FileText,
  Download,
  Bolt,
  Gauge,
  Shield,
  Settings,
  Plus,
  ArrowRight,
  Heart,
  ArrowLeftRight,
  TrendingUp,
  Tag,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  PlayCircle,
} from "lucide-react";
import { fetchProductBySlug, fetchProducts, fetchCategories } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/features/json-ld";
import { ProductCard } from "@/components/features/product-card";
import { AddToCartSection } from "@/components/features/add-to-cart-section";
import { ProductGallery } from "@/components/features/product-gallery";
import { RelatedProductsCarousel } from "@/components/features/related-products-carousel";
import { ProductDetailTabs } from "@/components/features/product-detail-tabs";

interface ProductPageProps {
  params: {
    category: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await fetchProductBySlug(params.slug);
  if (!product) {
    return {
      title: "Mahsulot Topilmadi",
    };
  }

  return {
    title: `${product.title} — Kontrol.uz`,
    description: product.seo.description || product.shortDescription,
    keywords: [product.title, product.sku, product.categoryName, "Kontrol.uz"],
    alternates: {
      canonical: `https://kontrol.uz/katalog/${params.category}/${params.slug}`,
    },
    openGraph: {
      title: product.title,
      description: product.shortDescription,
      url: `https://kontrol.uz/katalog/${params.category}/${params.slug}`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) notFound();

  const categories = await fetchCategories();
  const allProducts = await fetchProducts();
  
  const onSaleProducts = allProducts.filter((p) => p.oldPrice && p.oldPrice > p.price);
  const bestsellerProducts = allProducts.filter((p) => p.rating >= 4.9);
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const breadcrumbs = [
    { name: "Bosh sahifa", url: "https://kontrol.uz" },
    { name: "Katalog", url: "https://kontrol.uz/katalog" },
    { name: product.categoryName, url: `https://kontrol.uz/katalog?category=${product.categorySlug}` },
    { name: product.title, url: `https://kontrol.uz/katalog/${params.category}/${params.slug}` },
  ];

  const popularCategories = [
    { name: "Quvur Armaturasi", color: "bg-[#fc8b91]", slug: "videokuzatuv" },
    { name: "Nasos Uskunalari", color: "bg-[#7b81f1]", slug: "videokuzatuv" },
    { name: "Elektr Uskunalari", color: "bg-[#7accee]", slug: "kirishni-boshqarish" },
    { name: "KIPiA va SKUD", color: "bg-[#5cdc69]", slug: "kirishni-boshqarish" },
    { name: "Elektromagnit Klapanlar", color: "bg-[#c56dbb]", slug: "yongin-xavfsizligi" },
    { name: "Avtomatika Tizimlari", color: "bg-[#a773ed]", slug: "kirishni-boshqarish" },
  ];

  return (
    <div className="bg-industrial-surface py-6 min-h-screen">
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Breadcrumb Links */}
        <nav className="text-xs text-industrial-text-muted flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:underline">
            Bosh sahifa
          </Link>
          <span>/</span>
          <Link href="/katalog" className="hover:underline">
            Katalog
          </Link>
          <span>/</span>
          <Link href={`/katalog?category=${product.categorySlug}`} className="hover:underline font-medium">
            {product.categoryName}
          </Link>
          <span>/</span>
          <span className="font-bold text-industrial-blue line-clamp-1">{product.title}</span>
        </nav>

        {/* Layout Grid: Left Categories Sidebar & Product Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Categories Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <Card className="p-5 bg-white border border-industrial-border">
              <div className="text-sm font-extrabold text-industrial-blue uppercase border-b border-industrial-border pb-3 mb-4">
                Kategoriyalar
              </div>
              <ul className="space-y-1.5 text-xs font-medium">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/katalog?category=${cat.slug}`}
                      className={`flex justify-between items-center p-2.5 rounded transition-colors ${
                        product.categorySlug === cat.slug
                          ? "bg-industrial-blue text-white font-bold"
                          : "hover:bg-industrial-surface-low text-industrial-text"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-black/10 font-mono font-bold">
                        {cat.productCount}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                className="w-full gap-2 text-xs font-bold border-industrial-blue text-industrial-blue mt-6"
              >
                <Download className="w-4 h-4" />
                Sanoat Katalogi (PDF)
              </Button>
            </Card>
          </aside>

          {/* Product Detail Main Canvas */}
          <main className="lg:col-span-9 space-y-8">
            {/* Top Product Hero Card: Gallery & Actions */}
            <Card className="p-6 bg-white border border-industrial-border shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Image Gallery with Lightbox */}
              <div className="md:col-span-6">
                <ProductGallery product={product} />
              </div>

              {/* Product Info & Action Box */}
              <div className="md:col-span-6 space-y-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-industrial-text-muted mb-2">
                    <span className="bg-industrial-surface-low px-2 py-1 rounded font-mono font-bold">
                      SKU / Artikul: {product.sku}
                    </span>
                    <div className="flex items-center gap-1 text-emerald-600 font-bold">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Omborda mavjud ({product.stockCount} ta)</span>
                    </div>
                  </div>

                  <h1 className="text-2xl font-black text-industrial-text leading-tight">
                    {product.title}
                  </h1>

                  <p className="text-xs text-industrial-text-muted mt-2 leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Pricing & Quantity Box */}
                <div className="bg-industrial-surface-low p-4 rounded border border-industrial-border space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-industrial-blue">
                      {formatPrice(product.price, product.currency)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(product.oldPrice, product.currency)}
                      </span>
                    )}
                    <span className="text-xs text-industrial-text-muted">/ 1 dona</span>
                  </div>

                  <AddToCartSection product={product} />
                </div>

                {/* Key Specifications Bento Summary */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-industrial-surface-low p-3 rounded border border-industrial-border-subtle">
                  <div className="flex items-center gap-2">
                    <Bolt className="w-4 h-4 text-industrial-blue" />
                    <div>
                      <div className="text-[10px] text-industrial-text-muted uppercase">Kuchlanish</div>
                      <div className="font-bold text-industrial-text">12 kV / 380V</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-industrial-blue" />
                    <div>
                      <div className="text-[10px] text-industrial-text-muted uppercase">Tok kuchi</div>
                      <div className="font-bold text-industrial-text">630 A - 100A</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-industrial-blue" />
                    <div>
                      <div className="text-[10px] text-industrial-text-muted uppercase">Himoya</div>
                      <div className="font-bold text-industrial-text">IP67 / IK10</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-industrial-blue" />
                    <div>
                      <div className="text-[10px] text-industrial-text-muted uppercase">Kafolat</div>
                      <div className="font-bold text-industrial-text">36 Oy Rasmiy</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Technical Specifications & Interactive Detail Tabs */}
            <ProductDetailTabs product={product} />

            {/* Ommabop Ruknlar Section from Stitch */}
            <section>
              <h2 className="text-xl font-black text-industrial-blue mb-4 border-b border-industrial-border pb-2">
                Ommabop Ruknlar
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularCategories.map((cat, idx) => (
                  <Link
                    key={idx}
                    href={`/katalog?category=${cat.slug}`}
                    className={`${cat.color} text-white p-5 rounded-lg flex items-center justify-between hover:opacity-95 transition-all shadow-sm group`}
                  >
                    <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <h3 className="font-extrabold text-base text-center flex-1">{cat.name}</h3>
                    <ArrowRight className="w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </section>

            {/* Chegirmali Mahsulotlar Section */}
            {onSaleProducts.length > 0 && (
              <section className="space-y-4">
                <div className="flex justify-between items-end border-b border-industrial-border pb-2">
                  <h2 className="text-xl font-black text-rose-600 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-rose-600" />
                    Chegirmali Mahsulotlar
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {onSaleProducts.slice(0, 3).map((prod) => (
                    <ProductCard key={`sale-${prod.id}`} product={prod} />
                  ))}
                </div>
              </section>
            )}

            {/* Bestsellerlar Section */}
            {bestsellerProducts.length > 0 && (
              <section className="space-y-4">
                <div className="flex justify-between items-end border-b border-industrial-border pb-2">
                  <h2 className="text-xl font-black text-industrial-blue flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-amber-500" />
                    Bestsellerlar (TOP Xitlar)
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bestsellerProducts.slice(0, 3).map((prod) => (
                    <ProductCard key={`top-${prod.id}`} product={prod} />
                  ))}
                </div>
              </section>
            )}

            {/* Frequently Bought Together Slider Carousel */}
            {relatedProducts.length > 0 && (
              <RelatedProductsCarousel products={relatedProducts} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
