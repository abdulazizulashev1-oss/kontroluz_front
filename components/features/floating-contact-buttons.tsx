"use client";

import React, { useState } from "react";
import { Phone } from "lucide-react";

export function FloatingContactButtons() {
  const [hoveredBtn, setHoveredBtn] = useState<"phone" | "telegram" | null>(null);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3.5 print:hidden">
      {/* 1. Telegram Circular Floating Button with Glowing Aura */}
      <div className="relative flex items-center justify-end">
        {/* Tooltip on Hover */}
        {hoveredBtn === "telegram" && (
          <div className="absolute right-16 bg-[#1A1C1E] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-2xl whitespace-nowrap animate-in fade-in slide-in-from-right-2 duration-200 border border-white/10 flex items-center gap-2">
            <span>Telegram Bot orqali yozish</span>
            <span className="w-2 h-2 rounded-full bg-[#229ED9] animate-ping" />
          </div>
        )}

        <a
          href="https://t.me/kontrol_uz_bot"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredBtn("telegram")}
          onMouseLeave={() => setHoveredBtn(null)}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#0088cc] via-[#229ED9] to-[#40B3E8] text-white flex items-center justify-center shadow-lg hover:shadow-cyan-400/50 hover:scale-110 transition-all cursor-pointer relative animate-tg-glow-ring group"
          aria-label="Telegram Bot"
        >
          {/* Subtle Outer Ping Wave */}
          <span className="absolute inset-0 rounded-full bg-[#229ED9] opacity-40 animate-ping pointer-events-none" />

          {/* Telegram Paper Plane SVG */}
          <svg
            className="w-7 h-7 text-white fill-current animate-tg-fly group-hover:scale-110 transition-transform relative z-10"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
          </svg>
        </a>
      </div>

      {/* 2. Phone Circular Floating Button with Ringing Shake & Glowing Aura */}
      <div className="relative flex items-center justify-end">
        {/* Tooltip on Hover */}
        {hoveredBtn === "phone" && (
          <div className="absolute right-16 bg-[#1A1C1E] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-2xl whitespace-nowrap animate-in fade-in slide-in-from-right-2 duration-200 border border-white/10 flex items-center gap-2">
            <span>+998 71 200 68 00 (Qo'ng'iroq qilish)</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
        )}

        <a
          href="tel:+998712006800"
          onMouseEnter={() => setHoveredBtn("phone")}
          onMouseLeave={() => setHoveredBtn(null)}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#008f6c] via-[#00a67e] to-[#26d09e] text-white flex items-center justify-center shadow-lg hover:shadow-emerald-400/50 hover:scale-110 transition-all cursor-pointer relative animate-glow-ring group"
          aria-label="Telefon orqali bog'lanish"
        >
          {/* Subtle Outer Ping Wave */}
          <span className="absolute inset-0 rounded-full bg-[#00a67e] opacity-40 animate-ping pointer-events-none" />

          {/* Ringing Phone Icon */}
          <Phone className="w-6 h-6 text-white animate-phone-ring group-hover:scale-110 transition-transform relative z-10" />
        </a>
      </div>
    </div>
  );
}
