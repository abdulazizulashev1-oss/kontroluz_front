"use client";

import React, { useState } from "react";
import { ProductCard } from "@/components/features/product-card";
import { Product } from "@/shared/types";
import { Button } from "@/components/ui/button";
import { PlusCircle, Layers, ArrowDown } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

interface PaginatedProductGridProps {
  products: Product[];
  batchSize?: number;
}

export function PaginatedProductGrid({
  products,
  batchSize = 20,
}: PaginatedProductGridProps) {
  const { t } = useTranslation();
  const [visibleCount, setVisibleCount] = useState(batchSize);

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;
  const remainingCount = products.length - visibleCount;
  const nextBatchCount = Math.min(batchSize, remainingCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + batchSize);
  };

  const handleShowAll = () => {
    setVisibleCount(products.length);
  };

  if (products.length === 0) return null;

  return (
    <div className="space-y-8">
      {/* Product Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {visibleProducts.map((product, idx) => (
          <div
            key={product.id || `${product.slug}-${idx}`}
            className="animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both"
            style={{ animationDelay: `${Math.min(idx * 20, 300)}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Pagination / Batch Load More Control Panel */}
      {hasMore && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-industrial-border shadow-xs text-center space-y-4 max-w-2xl mx-auto">
          {/* Progress & Counter Text */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-extrabold text-industrial-blue uppercase tracking-wider">
              {t("products.showingProducts")
                .replace("{visible}", String(visibleProducts.length))
                .replace("{total}", String(products.length))}
            </span>

            {/* Visual Progress Bar */}
            <div className="w-full max-w-md h-2 bg-industrial-surface-low rounded-full overflow-hidden border border-industrial-border">
              <div
                className="h-full bg-gradient-to-r from-industrial-blue to-industrial-orange rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${Math.min(
                    100,
                    Math.round((visibleProducts.length / products.length) * 100)
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {/* Load 20 More Button */}
            <Button
              type="button"
              onClick={handleLoadMore}
              className="w-full sm:w-auto px-8 py-3 bg-industrial-blue hover:bg-industrial-blue-dark text-white font-black text-xs uppercase tracking-wider gap-2 shadow-md hover:shadow-lg transition-all rounded-xl cursor-pointer group"
            >
              <PlusCircle className="w-4 h-4 text-industrial-orange group-hover:rotate-90 transition-transform duration-300" />
              <span>
                {t("products.loadMore").replace("20", String(nextBatchCount))}
              </span>
              <ArrowDown className="w-3.5 h-3.5 opacity-70 group-hover:translate-y-0.5 transition-transform" />
            </Button>

            {/* Show All Products Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleShowAll}
              className="w-full sm:w-auto px-6 py-3 border-industrial-border text-industrial-text hover:text-industrial-blue hover:bg-industrial-surface-low font-bold text-xs uppercase tracking-wider gap-2 rounded-xl cursor-pointer"
            >
              <Layers className="w-4 h-4 text-industrial-orange" />
              <span>{t("products.showAll")}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 font-bold">
                ({products.length})
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
