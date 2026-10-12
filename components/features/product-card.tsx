"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, CheckCircle2, Phone, Send, Check } from "lucide-react";
import { Product } from "@/shared/types";
import { formatPrice, calculateDiscountPercentage } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart/cart-context";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t, locale } = useTranslation();
  const { addToCart, isInCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const discount = calculateDiscountPercentage(product.price, product.oldPrice);
  const inCart = isInCart(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  // Extract up to 2 key specs, then fallback to high-converting service highlights
  const specEntries = product.specifications ? Object.entries(product.specifications) : [];
  const highlights: string[] = [];

  if (specEntries.length > 0) {
    highlights.push(`${specEntries[0][0]}: ${specEntries[0][1]}`);
  }
  if (specEntries.length > 1) {
    highlights.push(`${specEntries[1][0]}: ${specEntries[1][1]}`);
  }

  if (highlights.length < 3) {
    if (locale === "ru") {
      highlights.push("Официальная гарантия и сервис");
    } else if (locale === "en") {
      highlights.push("Official warranty & technical support");
    } else {
      highlights.push("Rasmiy kafolat va servis markazi");
    }
  }

  if (highlights.length < 3) {
    if (locale === "ru") {
      highlights.push("В наличии на складе в Ташкенте");
    } else if (locale === "en") {
      highlights.push("In stock in Tashkent warehouse");
    } else {
      highlights.push("Toshkent omborida mavjud");
    }
  }

  return (
    <div className="group flex flex-col justify-between bg-white sm:bg-[#F9FAFB] hover:bg-white rounded-[28px] border border-slate-200/80 p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
      {/* Top Part: Image, Badges, Title, Specs */}
      <div>
        {/* Product Image Container */}
        <div className="relative w-full h-40 sm:h-48 md:h-52 bg-white rounded-2xl p-3 flex items-center justify-center border border-slate-100 overflow-hidden shadow-2xs">
          {discount && (
            <div className="absolute top-2 left-2 z-10">
              <span className="text-[10px] sm:text-xs px-2 py-0.5 font-black bg-[#FF6B00] text-white rounded-full shadow-2xs">
                -{discount}%
              </span>
            </div>
          )}
          <div className="absolute top-2 right-2 z-10">
            <span
              className={`text-[9px] sm:text-xs px-2 py-0.5 font-bold rounded-full border shadow-2xs ${
                product.inStock
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-slate-100 text-slate-500 border-slate-200"
              }`}
            >
              {product.inStock ? t("products.inStock") : t("products.outOfStock")}
            </span>
          </div>

          <Link
            href={`/katalog/${product.categorySlug}/${product.slug}`}
            className="relative w-full h-full flex items-center justify-center"
          >
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={300}
              sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 300px"
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Header meta: SKU & Rating */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-400 mt-3 mb-1 px-0.5">
          <span className="font-mono font-bold truncate max-w-[120px]">SKU: {product.sku}</span>
          {product.reviewCount > 0 && (
            <div className="flex items-center gap-0.5 text-amber-500 font-bold shrink-0">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewCount})</span>
            </div>
          )}
        </div>

        {/* Title */}
        <Link
          href={`/katalog/${product.categorySlug}/${product.slug}`}
          className="font-bold text-xs sm:text-sm md:text-base text-slate-900 group-hover:text-industrial-blue transition-colors line-clamp-2 leading-tight sm:leading-snug min-h-[32px] sm:min-h-[40px]"
        >
          {product.title}
        </Link>

        {/* Bullet points with Orange Check Badges (matching screenshot) */}
        <ul className="mt-3 space-y-1.5 sm:space-y-2">
          {highlights.slice(0, 3).map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-700 leading-snug">
              <span className="w-4 h-4 rounded-full bg-[#FFE8D6] text-[#FF6B00] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[9px]">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <span className="font-medium truncate">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Part: Pricing & Action Buttons */}
      <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
        {/* Price */}
        <div className="flex items-baseline justify-between gap-1 px-0.5">
          <div className="min-w-0">
            <div className="text-sm sm:text-base md:text-lg font-black text-industrial-blue truncate">
              {formatPrice(product.price, product.currency)}
            </div>
            {product.oldPrice && (
              <div className="text-[10px] sm:text-xs text-slate-400 line-through truncate">
                {formatPrice(product.oldPrice, product.currency)}
              </div>
            )}
          </div>
        </div>

        {/* Button Stack matching the reference style */}
        <div className="space-y-2">
          {/* Button 1: Primary Orange Phone Button */}
          <a
            href="tel:+998950155548"
            onClick={(e) => e.stopPropagation()}
            className="w-full py-2 sm:py-2.5 px-3 rounded-full bg-[#FF6B00] hover:bg-[#E55E00] text-white font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <Phone className="w-3.5 h-3.5 fill-white shrink-0" />
            <span className="truncate">+998 95 015 55 48</span>
          </a>

          {/* Button 2: Black Button - Cart / Secondary Order */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full py-2 sm:py-2.5 px-3 rounded-full font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] ${
              inCart || justAdded
                ? "bg-[#00A67E] hover:bg-[#008F6C] text-white"
                : "bg-[#18181B] hover:bg-black text-white"
            }`}
          >
            {inCart || justAdded ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{t("products.addedToCart")}</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{t("products.addToCart")}</span>
              </>
            )}
          </button>

          {/* Button 3: Telegram Button */}
          <a
            href="https://t.me/Kontrollshopbot"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full py-1.5 sm:py-2 px-3 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 border border-slate-200 shadow-2xs transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <Send className="w-3 h-3 text-[#229ED9] shrink-0" />
            <span>Telegram</span>
          </a>
        </div>
      </div>
    </div>
  );
}
