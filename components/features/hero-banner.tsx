"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";

export function HeroBanner() {
  const { t } = useTranslation();
  const stitchHeroImage =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBfdx-WQOQKkhilqiO-RxRwvGrhieRrQK-_WI1dRPuMqaTTDtEqNm61JLu-z4tnMqEbegvqyk_-_MUDt4Z3ynskkQMK_U538nE7plqQ4kA2TNK8dCgbvE6StoWLG6YY85-STHKwY25BWVlbPelpVbVZmmgYpUfqJK1sM6COhPavfr0OmHN5zqw1d-gPsW5ULq2KHAXm7F3T3UfWZKeYwhzzI6wktZhNBmR8B-dBD21LC-nckAKnRjcw";

  return (
    <section className="mb-8 relative rounded-xl overflow-hidden shadow-md h-[400px] md:h-[500px]">
      {/* Background Image from Stitch */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${stitchHeroImage}')`,
        }}
      ></div>

      {/* Dark Primary Gradient Overlay from Stitch */}
      <div className="absolute inset-0 bg-gradient-to-r from-industrial-blue-dark/95 via-industrial-blue/80 to-transparent flex items-center">
        <div className="px-8 md:px-16 max-w-2xl text-white space-y-6">
          <div className="inline-flex items-center gap-2 bg-industrial-orange px-3 py-1 rounded text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>{t("hero.badge")}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
            {t("hero.title")} <span className="text-industrial-orange font-extrabold">{t("hero.titleAccent")}</span>
          </h1>

          <p className="text-base md:text-lg text-white/90 leading-relaxed font-normal">
            {t("hero.subtitle")}
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link href="/katalog">
              <Button
                variant="cta"
                size="lg"
                className="bg-industrial-orange hover:bg-industrial-orange-dark text-white font-extrabold px-8 py-3 rounded text-base gap-2 shadow-lg"
              >
                <span>{t("hero.ctaCatalog")}</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/#calculator">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-industrial-blue font-bold px-6 py-3 rounded"
              >
                {t("hero.ctaCalculator")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
