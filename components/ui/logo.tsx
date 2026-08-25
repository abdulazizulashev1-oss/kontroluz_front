"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

interface LogoProps {
  variant?: "header" | "footer" | "admin" | "login";
  showText?: boolean;
  className?: string;
  href?: string;
}

export function Logo({
  variant = "header",
  showText = true,
  className = "",
  href = "/",
}: LogoProps) {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);

  const iconSizes = {
    header: "w-8 h-8 sm:w-10 sm:h-10",
    footer: "w-10 h-10 sm:w-11 sm:h-11",
    admin: "w-9 h-9 sm:w-10 sm:h-10",
    login: "w-12 h-12 sm:w-14 sm:h-14",
  };

  const textSizes = {
    header: "text-base sm:text-xl",
    footer: "text-xl sm:text-2xl",
    admin: "text-lg sm:text-xl",
    login: "text-2xl sm:text-3xl",
  };

  const isDark = variant === "footer";

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2.5 sm:gap-3 group shrink-0 ${className}`}
    >
      {/* Logo Icon Badge */}
      <div className={`relative ${iconSizes[variant]} rounded-xl overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 shrink-0`}>
        {!imageError ? (
          <Image
            src="/images/logo-icon.png"
            alt="Kontrol.uz"
            width={56}
            height={56}
            className="w-full h-full object-contain rounded-xl"
            priority={variant === "header" || variant === "login"}
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-industrial-blue text-white flex items-center justify-center rounded-xl shadow-xs border border-industrial-blue-dark">
            <ShieldCheck className="w-2/3 h-2/3 text-industrial-orange" />
          </div>
        )}
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`${textSizes[variant]} font-black tracking-tight leading-none ${
              isDark ? "text-white" : "text-industrial-blue"
            }`}
          >
            KONTROL<span className="text-industrial-orange">.UZ</span>
          </span>
          <span
            className={`text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider mt-1 ${
              isDark ? "text-slate-300" : "text-industrial-text-muted"
            }`}
          >
            {variant === "admin" || variant === "login"
              ? "Super Admin Dashboard"
              : t("nav.logoSlogan")}
          </span>
        </div>
      )}
    </Link>
  );
}
