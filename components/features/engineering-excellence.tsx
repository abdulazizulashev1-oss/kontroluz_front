"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Shield, Award } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

export function EngineeringExcellence() {
  const { t } = useTranslation();
  const stitchEngineerImage =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAotv2o4sZscNLHT9fnq6QWb9VwEE8j1DhUQiUjhfZWx4ePxVa3-8m2OYuB26flOIhVzok2VpQQzSKbbQvT5p5VVr-kRiNT6tpF1Hgh0sJnKcCzH497ymmMrLdfD93Qa4-J2IaIUY-yuOAbbb4NfGTsQdlUF7gVT1niEVi5uUSRSYignsFjcQK1HhsBnWuaqNZ0E9aDnvpulsWzX1gvQdtQVrQEnBhhUsvLUdSonqf1QFU2U4FQDuRt";

  return (
    <section className="mb-8 sm:mb-12 bg-industrial-surface-low border border-industrial-border rounded-2xl overflow-hidden shadow-xs flex flex-col md:flex-row items-center">
      {/* Content */}
      <div className="w-full md:w-1/2 p-5 sm:p-8 md:p-12 order-2 md:order-1 space-y-4 sm:space-y-6">
        <div>
          <span className="text-[10px] sm:text-xs font-extrabold uppercase text-industrial-orange tracking-widest">
            {t("engineering.badge")}
          </span>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-industrial-blue mt-0.5 sm:mt-1">
            {t("engineering.title")}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-industrial-text-muted leading-relaxed">
          {t("engineering.subtitle")}
        </p>

        <ul className="space-y-2.5 sm:space-y-3">
          <li className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-bold text-industrial-text">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-industrial-orange flex-shrink-0" />
            <span>{t("engineering.feature1Title")}</span>
          </li>
          <li className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-bold text-industrial-text">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-industrial-orange flex-shrink-0" />
            <span>{t("engineering.feature2Title")}</span>
          </li>
          <li className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-bold text-industrial-text">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-industrial-orange flex-shrink-0" />
            <span>{t("engineering.feature3Title")}</span>
          </li>
          <li className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-bold text-industrial-text">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-industrial-orange flex-shrink-0" />
            <span>{t("engineering.feature4Title")}</span>
          </li>
        </ul>

        {/* ISO Certificates */}
        <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-industrial-border shadow-2xs flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-black text-industrial-blue">
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-industrial-orange" />
            <span>ISO 9001:2026</span>
          </div>
          <div className="bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-industrial-border shadow-2xs flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-black text-industrial-blue">
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-industrial-blue" />
            <span>ISO 14001</span>
          </div>
        </div>
      </div>

      {/* Image from Stitch */}
      <div className="w-full md:w-1/2 h-56 sm:h-72 md:h-auto self-stretch order-1 md:order-2 relative overflow-hidden">
        <Image
          src={stitchEngineerImage}
          alt="Kontrol.uz Professional Engineer"
          width={800}
          height={600}
          className="w-full h-full object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-industrial-blue-dark/10"></div>
      </div>
    </section>
  );
}
