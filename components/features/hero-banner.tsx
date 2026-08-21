"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";

export function HeroBanner() {
  const { t } = useTranslation();
  const stitchHeroImage =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBfdx-WQOQKkhilqiO-RxRwvGrhieRrQK-_WI1dRPuMqaTTDtEqNm61JLu-z4tnMqEbegvqyk_-_MUDt4Z3ynskkQMK_U538nE7plqQ4kA2TNK8dCgbvE6StoWLG6YY85-STHKwY25BWVlbPelpVbVZmmgYpUfqJK1sM6COhPavfr0OmHN5zqw1d-gPsW5ULq2KHAXm7F3T3UfWZKeYwhzzI6wktZhNBmR8B-dBD21LC-nckAKnRjcw";

  return (
    <section className="mb-8 relative rounded-2xl overflow-hidden shadow-md min-h-[460px] sm:min-h-[480px] md:h-[500px] flex items-center">
      {/* Background Image from Stitch */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${stitchHeroImage}')`,
        }}
      ></div>

      {/* Dark Primary Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-industrial-blue-dark/95 via-industrial-blue/85 to-industrial-blue/50 sm:to-transparent flex items-center">
        <div className="px-5 sm:px-8 md:px-16 py-6 sm:py-8 max-w-2xl text-white space-y-4 sm:space-y-6 w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-industrial-orange px-2.5 py-1 rounded text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>{t("hero.badge")}</span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
            {t("hero.title")}{" "}
            <span className="text-industrial-orange font-extrabold block sm:inline">
              {t("hero.titleAccent")}
            </span>
          </h1>

          {/* Subtitle description */}
          <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed font-normal">
            {t("hero.subtitle")}
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Link href="/katalog" className="w-full sm:w-auto">
              <Button
                variant="cta"
                size="lg"
                className="w-full sm:w-auto bg-industrial-orange hover:bg-industrial-orange-dark text-white font-extrabold px-6 sm:px-8 py-3 rounded-lg text-sm sm:text-base gap-2 shadow-lg justify-center h-11 sm:h-12"
              >
                <span>{t("hero.ctaCatalog")}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("open-smeta-modal"));
                }
              }}
              className="w-full sm:w-auto border-2 border-white/90 bg-white/10 hover:bg-white text-white hover:text-industrial-blue font-bold px-6 py-3 rounded-lg text-sm sm:text-base backdrop-blur-2xs justify-center h-11 sm:h-12 flex items-center gap-2 cursor-pointer transition-all"
            >
              <Calculator className="w-4 h-4" />
              <span>{t("hero.ctaCalculator")}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
