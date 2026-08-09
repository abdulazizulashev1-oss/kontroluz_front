"use client";

import React, { useState } from "react";
import { ShoppingCart, CheckCircle2, Heart, ArrowLeftRight } from "lucide-react";
import { Product } from "@/shared/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart/cart-context";
import { useTranslation } from "@/lib/i18n/context";

interface AddToCartSectionProps {
  product: Product;
}

export function AddToCartSection({ product }: AddToCartSectionProps) {
  const { t } = useTranslation();
  const { addToCart, isInCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Quantity Controls */}
        <div className="flex items-center border border-industrial-border rounded bg-white">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-gray-500 hover:bg-industrial-surface-low font-bold text-sm"
          >
            -
          </button>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
            className="w-12 text-center text-xs font-bold focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-2 text-gray-500 hover:bg-industrial-surface-low font-bold text-sm"
          >
            +
          </button>
        </div>

        {/* Add To Cart Button */}
        <Button
          type="button"
          onClick={handleAddToCart}
          variant={inCart || justAdded ? "secondary" : "cta"}
          size="lg"
          className={`flex-1 gap-2 font-extrabold transition-all ${
            inCart || justAdded ? "bg-[#00a67e] hover:bg-[#008f6c] text-white" : ""
          }`}
        >
          {inCart || justAdded ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span>{t("products.addedToCart")}</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>{t("products.addToCart")}</span>
            </>
          )}
        </Button>
      </div>

      <div className="flex items-center justify-between border-t border-industrial-border-subtle pt-3 text-xs">
        <button type="button" className="text-industrial-blue hover:underline flex items-center gap-1 font-bold">
          <Heart className="w-3.5 h-3.5" /> Sevimlilarga Qo'shish
        </button>
        <button type="button" className="text-industrial-text-muted hover:text-industrial-blue flex items-center gap-1 font-medium">
          <ArrowLeftRight className="w-3.5 h-3.5" /> Solishtirish
        </button>
      </div>
    </div>
  );
}
