"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Check, CheckCircle2 } from "lucide-react";
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
    <Card hoverEffect className="flex flex-col h-full bg-white group border border-industrial-border">
      {/* Product Image Container */}
      <div className="relative w-full h-52 bg-industrial-surface-low p-4 flex items-center justify-center border-b border-industrial-border-subtle overflow-hidden">
        {discount && (
          <div className="absolute top-2 left-2 z-10">
            <Badge variant="orange">-{discount}%</Badge>
          </div>
        )}
        <div className="absolute top-2 right-2 z-10">
          <Badge variant={product.inStock ? "success" : "secondary"}>
            {product.inStock ? t("products.inStock") : t("products.outOfStock")}
          </Badge>
        </div>

        <Link
          href={`/katalog/${product.categorySlug}/${product.slug}`}
          className="relative w-full h-full block flex items-center justify-center"
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
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-industrial-text-muted mb-1">
            <span className="font-mono font-bold">SKU: {product.sku}</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-gray-400">({product.reviewCount})</span>
            </div>
          </div>

          <Link
            href={`/katalog/${product.categorySlug}/${product.slug}`}
            className="font-bold text-sm text-industrial-text hover:text-industrial-blue transition-colors line-clamp-2 leading-snug"
          >
            {product.title}
          </Link>

          {/* Technical Spec Snippet */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-1.5 bg-industrial-surface-low p-2 rounded border border-industrial-border-subtle text-[11px]">
              {Object.entries(product.specifications)
                .slice(0, 2)
                .map(([key, val]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-industrial-text-muted text-[10px] uppercase font-semibold">
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
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-base font-extrabold text-industrial-blue">
                {formatPrice(product.price, product.currency)}
              </div>
              {product.oldPrice && (
                <div className="text-xs text-gray-400 line-through">
                  {formatPrice(product.oldPrice, product.currency)}
                </div>
              )}
            </div>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
              <Check className="w-3 h-3" /> QQS
            </span>
          </div>

          <Button
            type="button"
            onClick={handleAddToCart}
            variant={inCart || justAdded ? "secondary" : "cta"}
            size="sm"
            className={`w-full gap-2 font-extrabold transition-all ${
              inCart || justAdded
                ? "bg-[#00a67e] hover:bg-[#008f6c] text-white"
                : ""
            }`}
          >
            {inCart || justAdded ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>{t("products.addedToCart")}</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>{t("products.addToCart")}</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
