"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";

export function PromoBanner() {
  const { t } = useTranslation();
  const stitchPromoImage =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAMGH4nPXFvLzx_q400cEVPexbS-0YdlKrnNMMupuh_KMyaI0UpLc3zYCjLkPYiLk9T8rN2PN3iZtHsTMfg0oW9O6RqWb05jV7SB4g7joUFMXUv6PqNCrwDVKbi8UKsOY1kQY4lscLuUtL8e5OasjqNn2lSAg4wc-UjlFiElYUkfHQMAULZQn0PeJ_sh6seOIQIyqV45mNpGJK3vI03Kyd728mw2geF6xciz9MXL4ds1vTSUAMM0MdN";

  return (
    <section className="mb-12 rounded-xl overflow-hidden bg-industrial-blue text-white flex flex-col md:flex-row items-stretch shadow-lg border border-industrial-blue-dark">
      {/* Left Content */}
      <div className="p-8 md:p-12 flex-1 flex flex-col justify-center space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-industrial-orange bg-industrial-orange/10 px-3 py-1 rounded w-max border border-industrial-orange/30">
          <Zap className="w-3.5 h-3.5" />
          <span>{t("promo.badge")}</span>
        </div>

        <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">
          {t("promo.title")}
        </h2>

        <p className="text-sm md:text-base text-white/90 max-w-lg leading-relaxed">
          {t("promo.description")}
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <Link href="/#calculator">
            <Button variant="cta" size="lg" className="gap-2 font-extrabold px-6">
              <span>{t("promo.button")}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/katalog">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-industrial-blue font-bold px-6">
              {t("promo.validity")}
            </Button>
          </Link>
        </div>
      </div>

      {/* Right Image from Stitch */}
      <div className="w-full md:w-5/12 bg-industrial-surface-low min-h-[260px] relative overflow-hidden">
        <Image
          src={stitchPromoImage}
          alt="Modern Industrial Automation Control Panel"
          width={800}
          height={600}
          className="w-full h-full object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-industrial-blue via-transparent to-transparent opacity-90 md:opacity-75"></div>
      </div>
    </section>
  );
}
