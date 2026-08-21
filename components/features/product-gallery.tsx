"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { ZoomIn, X, ChevronLeft, ChevronRight, Play, Film } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/shared/types";
import { useTranslation } from "@/lib/i18n/context";

interface ProductGalleryProps {
  product: Product;
}

type MediaItem =
  | { type: "image"; url: string }
  | { type: "video"; url: string };

function getEmbedVideoUrl(url: string): { isEmbed: boolean; embedUrl: string } {
  if (!url) return { isEmbed: false, embedUrl: "" };

  // YouTube matchers
  const ytMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    return {
      isEmbed: true,
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
    };
  }

  // Vimeo matcher
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      isEmbed: true,
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
    };
  }

  return { isEmbed: false, embedUrl: url };
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const { t } = useTranslation();

  // Combine only real, unique and valid images from Strapi + video if present
  const mediaList: MediaItem[] = useMemo(() => {
    const list: MediaItem[] = [];

    // Add main image
    if (product.image && typeof product.image === "string" && product.image.trim()) {
      list.push({ type: "image", url: product.image.trim() });
    }

    // Add additional images from Strapi
    if (Array.isArray(product.additionalImages)) {
      product.additionalImages.forEach((img) => {
        if (
          img &&
          typeof img === "string" &&
          img.trim() &&
          !list.some((item) => item.type === "image" && item.url === img.trim())
        ) {
          list.push({ type: "image", url: img.trim() });
        }
      });
    }

    // Add video if present in Strapi
    if (product.videoUrl && typeof product.videoUrl === "string" && product.videoUrl.trim()) {
      list.push({ type: "video", url: product.videoUrl.trim() });
    }

    return list.length > 0
      ? list
      : product.image
      ? [{ type: "image", url: product.image }]
      : [];
  }, [product.image, product.additionalImages, product.videoUrl]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Reset active index when product changes
  useEffect(() => {
    setActiveIndex(0);
  }, [product.id, product.slug]);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (mediaList.length <= 1) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (mediaList.length <= 1) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (mediaList.length <= 1 || !touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe) {
      setActiveIndex((prev) => (prev + 1) % mediaList.length);
    }
    if (isRightSwipe) {
      setActiveIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (mediaList.length > 1) {
        if (e.key === "ArrowRight") {
          setActiveIndex((prev) => (prev + 1) % mediaList.length);
        }
        if (e.key === "ArrowLeft") {
          setActiveIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, mediaList.length]);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (mediaList.length > 1) {
      setActiveIndex((prev) => (prev + 1) % mediaList.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (mediaList.length > 1) {
      setActiveIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);
    }
  };

  const currentMedia = mediaList[activeIndex] || mediaList[0];

  return (
    <div className="space-y-4 select-none">
      {/* Main Media Viewport */}
      <div
        onClick={() => {
          if (currentMedia?.type === "image") {
            setIsLightboxOpen(true);
          }
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative w-full h-80 sm:h-96 bg-industrial-surface-low rounded-2xl border border-industrial-border-subtle p-4 sm:p-6 flex items-center justify-center overflow-hidden group shadow-xs ${
          currentMedia?.type === "image" ? "cursor-zoom-in" : ""
        }`}
      >
        {/* Render Image or Video */}
        {currentMedia?.type === "image" && (
          <Image
            src={currentMedia.url}
            alt={`${product.title} - ${activeIndex + 1}`}
            width={650}
            height={650}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 pointer-events-none"
            unoptimized
            priority
          />
        )}

        {currentMedia?.type === "video" && (
          <div className="w-full h-full flex items-center justify-center rounded-xl overflow-hidden bg-black">
            {(() => {
              const { isEmbed, embedUrl } = getEmbedVideoUrl(currentMedia.url);
              if (isEmbed) {
                return (
                  <iframe
                    src={embedUrl}
                    title={`${product.title} Video`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                );
              }
              return (
                <video
                  src={currentMedia.url}
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                />
              );
            })()}
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 left-3 pointer-events-none">
          <Badge variant={product.inStock ? "success" : "secondary"}>
            {product.inStock ? t("products.inStock") : t("products.outOfStock")}
          </Badge>
        </div>

        {/* Zoom & Fullscreen Hint (Only for image) */}
        {currentMedia?.type === "image" && (
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
        )}

        {/* Navigation Arrows (Only when multiple media items exist) */}
        {mediaList.length > 1 && (
          <>
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

            {/* Media Counter */}
            <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-mono px-2.5 py-1 rounded-full font-bold shadow-xs">
              {activeIndex + 1} / {mediaList.length}
            </div>

            {/* Mobile Carousel Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:hidden">
              {mediaList.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    activeIndex === idx ? "w-5 bg-industrial-blue" : "w-1.5 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails Row (Only when multiple media items exist) */}
      {mediaList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
          {mediaList.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl p-1 bg-industrial-surface-low shrink-0 overflow-hidden border-2 transition-all cursor-pointer flex items-center justify-center ${
                activeIndex === idx
                  ? "border-industrial-blue shadow-md scale-105 ring-2 ring-industrial-blue/20"
                  : "border-industrial-border-subtle hover:border-industrial-blue/50 opacity-70 hover:opacity-100"
              }`}
            >
              {item.type === "image" ? (
                <Image
                  src={item.url}
                  alt={`${product.title} - ${idx + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-slate-900 text-white rounded-lg flex flex-col items-center justify-center">
                  <Play className="w-5 h-5 text-industrial-orange fill-industrial-orange" />
                  <span className="text-[9px] font-mono font-bold mt-0.5">Video</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Interactive Lightbox Modal */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
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

          {/* Previous Arrow (Only if multiple items) */}
          {mediaList.length > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-xs transition-all z-50 cursor-pointer"
              title="Oldingi (←)"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}

          {/* Lightbox Content Viewport */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center select-none"
          >
            <div className="relative w-full h-[60vh] sm:h-[75vh] flex items-center justify-center">
              {currentMedia?.type === "image" && (
                <Image
                  src={currentMedia.url}
                  alt={product.title}
                  width={1200}
                  height={900}
                  className="max-h-full max-w-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
                  unoptimized
                />
              )}

              {currentMedia?.type === "video" && (
                <div className="w-full h-full max-w-4xl max-h-[70vh] flex items-center justify-center rounded-xl overflow-hidden bg-black shadow-2xl">
                  {(() => {
                    const { isEmbed, embedUrl } = getEmbedVideoUrl(currentMedia.url);
                    if (isEmbed) {
                      return (
                        <iframe
                          src={embedUrl}
                          title={`${product.title} Video Fullscreen`}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      );
                    }
                    return (
                      <video
                        src={currentMedia.url}
                        controls
                        autoPlay
                        playsInline
                        className="w-full h-full object-contain"
                      />
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Lightbox Caption */}
            <div className="mt-4 text-center space-y-2 text-white">
              <h3 className="font-extrabold text-sm sm:text-base tracking-tight">{product.title}</h3>
              {mediaList.length > 1 && (
                <div className="text-xs text-white/70 font-mono">
                  {activeIndex + 1} / {mediaList.length}
                </div>
              )}
            </div>
          </div>

          {/* Next Arrow (Only if multiple items) */}
          {mediaList.length > 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 sm:right-8 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-xs transition-all z-50 cursor-pointer"
              title="Keyingi (→)"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
