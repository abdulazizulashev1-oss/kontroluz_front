"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ZoomIn, X, ChevronLeft, ChevronRight, PlayCircle, Maximize2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/shared/types";
import { useTranslation } from "@/lib/i18n/context";

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const { t } = useTranslation();

  // Combine main image and additional gallery images
  const allImages = [
    product.image,
    ...(product.additionalImages && product.additionalImages.length > 0
      ? product.additionalImages
      : [
          product.image,
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
        ]),
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe) {
      setActiveIndex((prev) => (prev + 1) % allImages.length);
    }
    if (isRightSwipe) {
      setActiveIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % allImages.length);
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, allImages.length]);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="space-y-4 select-none">
      {/* Main Image Viewport with Mobile Touch Swipe */}
      <div
        onClick={() => setIsLightboxOpen(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-80 sm:h-96 bg-industrial-surface-low rounded-2xl border border-industrial-border-subtle p-6 flex items-center justify-center overflow-hidden group cursor-zoom-in shadow-xs"
      >
        <Image
          src={allImages[activeIndex]}
          alt={`${product.title} - Rasm ${activeIndex + 1}`}
          width={650}
          height={650}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 pointer-events-none"
          unoptimized
          priority
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant={product.inStock ? "success" : "secondary"}>
            {product.inStock ? t("products.inStock") : t("products.outOfStock")}
          </Badge>
        </div>

        {/* Zoom & Fullscreen Hint */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            className="text-gray-700 hover:text-industrial-blue bg-white/95 backdrop-blur-xs p-2 rounded-full shadow-md border border-gray-200 transition-transform hover:scale-110 cursor-pointer"
            title="Kattalashtirish (Lightbox)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Swipe Arrows (Visual indicators on hover) */}
        <button
          type="button"
          onClick={handlePrev}
          className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow border border-gray-200 items-center justify-center text-gray-700 hover:text-industrial-blue opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow border border-gray-200 items-center justify-center text-gray-700 hover:text-industrial-blue opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Mobile Indicators & Image Counter */}
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-mono px-2.5 py-1 rounded-full font-bold shadow-xs">
          {activeIndex + 1} / {allImages.length}
        </div>

        {/* Mobile Carousel Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:hidden">
          {allImages.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                activeIndex === idx ? "w-5 bg-industrial-blue" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
        {allImages.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl p-1.5 bg-industrial-surface-low shrink-0 overflow-hidden border-2 transition-all cursor-pointer ${
              activeIndex === idx
                ? "border-industrial-blue shadow-md scale-105 ring-2 ring-industrial-blue/20"
                : "border-industrial-border-subtle hover:border-industrial-blue/50 opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              width={80}
              height={80}
              className="w-full h-full object-contain"
              unoptimized
            />
          </button>
        ))}

        {/* Video Preview 3D Demonstration */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-industrial-border-subtle p-1.5 bg-industrial-surface-low flex flex-col items-center justify-center text-gray-500 hover:border-industrial-blue hover:text-industrial-blue transition-all shrink-0 cursor-pointer"
        >
          <PlayCircle className="w-6 h-6 text-industrial-blue mb-0.5" />
          <span className="text-[9px] font-extrabold uppercase tracking-tight">Video 3D</span>
        </button>
      </div>

      {/* Fullscreen Interactive Lightbox Modal */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full backdrop-blur-xs transition-all z-50 cursor-pointer"
            title="Yopish (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-xs transition-all z-50 cursor-pointer"
            title="Oldingi rasm (←)"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Lightbox Content Viewport */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center select-none"
          >
            <div className="relative w-full h-[60vh] sm:h-[75vh] flex items-center justify-center">
              <Image
                src={allImages[activeIndex]}
                alt={product.title}
                width={1200}
                height={900}
                className="max-h-full max-w-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
                unoptimized
              />
            </div>

            {/* Lightbox Caption & Thumbnails Bar */}
            <div className="mt-4 text-center space-y-2 text-white">
              <h3 className="font-extrabold text-sm sm:text-base tracking-tight">{product.title}</h3>
              <div className="text-xs text-white/70 font-mono">
                {activeIndex + 1} / {allImages.length}
              </div>
            </div>
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 sm:right-8 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-xs transition-all z-50 cursor-pointer"
            title="Keyingi rasm (→)"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        </div>
      )}
    </div>
  );
}
