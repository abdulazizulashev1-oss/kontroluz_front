"use client";

import React, { useState } from "react";
import { Phone } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

export function FloatingContactButtons() {
  const { t } = useTranslation();
  const [hoveredBtn, setHoveredBtn] = useState<"phone" | "telegram" | "whatsapp" | null>(null);

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-3.5 sm:right-6 z-50 flex flex-col items-center gap-2.5 sm:gap-3.5 print:hidden">
      {/* 1. Telegram Circular Floating Button */}
      <div className="relative flex items-center justify-end">
        {/* Tooltip on Hover */}
        {hoveredBtn === "telegram" && (
          <div className="hidden sm:flex absolute right-16 bg-[#1A1C1E] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-2xl whitespace-nowrap animate-in fade-in slide-in-from-right-2 duration-200 border border-white/10 items-center gap-2">
            <span>{t("contact.floatingTgTooltip")}</span>
            <span className="w-2 h-2 rounded-full bg-[#229ED9] animate-ping" />
          </div>
        )}

        <a
          href="https://t.me/kontrol_uz_bot"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredBtn("telegram")}
          onMouseLeave={() => setHoveredBtn(null)}
          className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#0088cc] via-[#229ED9] to-[#40B3E8] text-white flex items-center justify-center shadow-lg hover:shadow-cyan-400/50 hover:scale-110 transition-all cursor-pointer relative animate-tg-glow-ring group"
          aria-label="Telegram Bot"
        >
          {/* Subtle Outer Ping Wave */}
          <span className="absolute inset-0 rounded-full bg-[#229ED9] opacity-40 animate-ping pointer-events-none" />

          {/* Telegram Paper Plane SVG */}
          <svg
            className="w-5 h-5 sm:w-7 sm:h-7 text-white fill-current animate-tg-fly group-hover:scale-110 transition-transform relative z-10"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
          </svg>
        </a>
      </div>

      {/* 2. WhatsApp Circular Floating Button */}
      <div className="relative flex items-center justify-end">
        {hoveredBtn === "whatsapp" && (
          <div className="hidden sm:flex absolute right-16 bg-[#1A1C1E] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-2xl whitespace-nowrap animate-in fade-in slide-in-from-right-2 duration-200 border border-white/10 items-center gap-2">
            <span>WhatsApp (+998 90 329 12 84)</span>
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
          </div>
        )}

        <a
          href="https://wa.me/998903291284"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredBtn("whatsapp")}
          onMouseLeave={() => setHoveredBtn(null)}
          className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#1EBE5D] via-[#25D366] to-[#34E075] text-white flex items-center justify-center shadow-lg hover:shadow-emerald-400/50 hover:scale-110 transition-all cursor-pointer relative group"
          aria-label="WhatsApp"
        >
          <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white fill-current group-hover:scale-110 transition-transform relative z-10" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </a>
      </div>

      {/* 3. Phone Circular Floating Button */}
      <div className="relative flex items-center justify-end">
        {/* Tooltip on Hover */}
        {hoveredBtn === "phone" && (
          <div className="hidden sm:flex absolute right-16 bg-[#1A1C1E] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-2xl whitespace-nowrap animate-in fade-in slide-in-from-right-2 duration-200 border border-white/10 items-center gap-2">
            <span>{t("contact.floatingPhoneTooltip")}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
        )}

        <a
          href="tel:+998781137027"
          onMouseEnter={() => setHoveredBtn("phone")}
          onMouseLeave={() => setHoveredBtn(null)}
          className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#008f6c] via-[#00a67e] to-[#26d09e] text-white flex items-center justify-center shadow-lg hover:shadow-emerald-400/50 hover:scale-110 transition-all cursor-pointer relative animate-glow-ring group"
          aria-label="Telefon orqali bog'lanish"
        >
          {/* Subtle Outer Ping Wave */}
          <span className="absolute inset-0 rounded-full bg-[#00a67e] opacity-40 animate-ping pointer-events-none" />

          {/* Ringing Phone Icon */}
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-phone-ring group-hover:scale-110 transition-transform relative z-10" />
        </a>
      </div>
    </div>
  );
}
