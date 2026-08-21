"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, CheckCircle2 } from "lucide-react";
import { Product } from "@/shared/types";
import { formatPrice, calculateDiscountPercentage } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart/cart-context";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation();
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

  return (
    <Card hoverEffect className="flex flex-col h-full bg-white group border border-industrial-border rounded-xl overflow-hidden shadow-2xs">
      {/* Product Image Container */}
      <div className="relative w-full h-36 sm:h-48 md:h-52 bg-industrial-surface-low p-2 sm:p-4 flex items-center justify-center border-b border-industrial-border-subtle overflow-hidden">
        {discount && (
          <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 z-10">
            <Badge variant="orange" className="text-[9px] sm:text-xs px-1.5 py-0.5 font-bold">-{discount}%</Badge>
          </div>
        )}
        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10">
          <Badge variant={product.inStock ? "success" : "secondary"} className="text-[9px] sm:text-xs px-1.5 py-0.5 font-bold">
            {product.inStock ? t("products.inStock") : t("products.outOfStock")}
          </Badge>
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
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        </Link>
      </div>

      {/* Content details */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
        <div>
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-industrial-text-muted mb-1">
            <span className="font-mono font-bold truncate max-w-[90px] sm:max-w-none">SKU: {product.sku}</span>
            <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500 font-bold shrink-0">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-gray-400 text-[9px] sm:text-xs">({product.reviewCount})</span>
            </div>
          </div>

          <Link
            href={`/katalog/${product.categorySlug}/${product.slug}`}
            className="font-bold text-xs sm:text-sm text-industrial-text hover:text-industrial-blue transition-colors line-clamp-2 leading-tight sm:leading-snug min-h-[32px] sm:min-h-[40px]"
          >
            {product.title}
          </Link>

          {/* Technical Spec Snippet (Shown on tablets and desktops) */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="hidden sm:grid mt-2.5 grid-cols-2 gap-1.5 bg-industrial-surface-low p-2 rounded border border-industrial-border-subtle text-[11px]">
              {Object.entries(product.specifications)
                .slice(0, 2)
                .map(([key, val]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-industrial-text-muted text-[10px] uppercase font-semibold truncate">
                      {key}
                    </span>
                    <span className="font-bold text-industrial-text truncate">{val}</span>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className="pt-2 border-t border-industrial-border-subtle space-y-2">
          <div className="flex items-baseline justify-between gap-1">
            <div className="min-w-0">
              <div className="text-xs sm:text-base font-black text-industrial-blue truncate">
                {formatPrice(product.price, product.currency)}
              </div>
              {product.oldPrice && (
                <div className="text-[10px] sm:text-xs text-gray-400 line-through truncate">
                  {formatPrice(product.oldPrice, product.currency)}
                </div>
              )}
            </div>
          </div>

          <Button
            type="button"
            onClick={handleAddToCart}
            variant={inCart || justAdded ? "secondary" : "cta"}
            size="sm"
            className={`w-full gap-1.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-extrabold transition-all h-8 sm:h-9 ${
              inCart || justAdded
                ? "bg-[#00a67e] hover:bg-[#008f6c] text-white"
                : ""
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
          </Button>
        </div>
      </div>
    </Card>
  );
}
