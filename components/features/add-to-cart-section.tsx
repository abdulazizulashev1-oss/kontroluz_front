"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, CheckCircle2, Heart, ArrowLeftRight, PhoneCall } from "lucide-react";
import { Product } from "@/shared/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart/cart-context";
import { useTranslation } from "@/lib/i18n/context";
import { PurchaseContactModal } from "@/components/features/purchase-contact-modal";

interface AddToCartSectionProps {
  product: Product;
  autoOpenModal?: boolean;
}

export function AddToCartSection({ product, autoOpenModal = true }: AddToCartSectionProps) {
  const { t } = useTranslation();
  const { addToCart, isInCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  // Auto-open modal when entering the product page (per user request)
  useEffect(() => {
    if (autoOpenModal) {
      const timer = setTimeout(() => {
        setIsPurchaseModalOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [autoOpenModal]);

  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="space-y-3">
      {/* Primary Action Buttons */}
      <div className="space-y-2.5">
        {/* Sotib olish uchun bog'lanish / Aloqa - Primary CTA */}
        <Button
          type="button"
          onClick={() => setIsPurchaseModalOpen(true)}
          className="w-full bg-industrial-orange hover:bg-industrial-orange/90 text-white font-black text-sm py-3 rounded-lg shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <PhoneCall className="w-4 h-4 animate-bounce" />
          <span>{t("productDetail.purchaseModal.contactToBuyBtn")}</span>
        </Button>

        {/* Quantity Controls & Add to Cart */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="flex items-center border border-industrial-border rounded bg-white">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-2 text-gray-500 hover:bg-industrial-surface-low font-bold text-sm cursor-pointer"
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
              className="px-3 py-2 text-gray-500 hover:bg-industrial-surface-low font-bold text-sm cursor-pointer"
            >
              +
            </button>
          </div>

          <Button
            type="button"
            onClick={handleAddToCart}
            variant={inCart || justAdded ? "secondary" : "primary"}
            size="lg"
            className={`flex-1 gap-2 font-extrabold transition-all cursor-pointer ${
              inCart || justAdded
                ? "bg-[#00a67e] hover:bg-[#008f6c] text-white"
                : "bg-industrial-blue hover:bg-industrial-blue-dark text-white"
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
      </div>

      <div className="flex items-center justify-between border-t border-industrial-border-subtle pt-3 text-xs">
        <button type="button" className="text-industrial-blue hover:underline flex items-center gap-1 font-bold cursor-pointer">
          <Heart className="w-3.5 h-3.5" /> {t("products.wishlist")}
        </button>
        <button type="button" className="text-industrial-text-muted hover:text-industrial-blue flex items-center gap-1 font-medium cursor-pointer">
          <ArrowLeftRight className="w-3.5 h-3.5" /> {t("products.compare")}
        </button>
      </div>

      {/* Purchase & Contact Modal */}
      <PurchaseContactModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        product={product}
      />
    </div>
  );
}

