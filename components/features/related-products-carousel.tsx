"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/shared/types";
import { ProductCard } from "@/components/features/product-card";

interface RelatedProductsCarouselProps {
  products: Product[];
  title?: string;
}

export function RelatedProductsCarousel({
  products,
  title = "Tez-Tez Birga Xarid Qilinadigan Uskunalar",
}: RelatedProductsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const current = scrollRef.current;
    if (current) {
      current.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (current) current.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [products]);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="space-y-4 pt-4 border-t border-industrial-border">
      {/* Header Bar with Action Buttons */}
      <div className="flex items-center justify-between border-b border-industrial-border pb-3">
        <h2 className="text-xl font-extrabold text-industrial-text tracking-tight">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleScrollLeft}
            disabled={!canScrollLeft}
            className={`w-9 h-9 rounded-lg border border-industrial-border flex items-center justify-center transition-all ${
              canScrollLeft
                ? "bg-white text-industrial-blue hover:bg-industrial-surface-low hover:border-industrial-blue shadow-xs cursor-pointer"
                : "bg-gray-100 text-gray-400 opacity-50 cursor-not-allowed"
            }`}
            title="Oldingisi"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleScrollRight}
            disabled={!canScrollRight}
            className={`w-9 h-9 rounded-lg border border-industrial-border flex items-center justify-center transition-all ${
              canScrollRight
                ? "bg-white text-industrial-blue hover:bg-industrial-surface-low hover:border-industrial-blue shadow-xs cursor-pointer"
                : "bg-gray-100 text-gray-400 opacity-50 cursor-not-allowed"
            }`}
            title="Keyingisi"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scrollable Products Flex Track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 scrollbar-thin scrollbar-thumb-gray-300 pb-4"
        style={{ scrollbarWidth: "thin" }}
      >
        {products.map((product) => (
          <div
            key={`rel-${product.id}`}
            className="w-44 sm:w-72 md:w-80 shrink-0 snap-start h-full"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
