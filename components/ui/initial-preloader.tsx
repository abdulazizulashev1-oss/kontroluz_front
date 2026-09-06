"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck, Cpu, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

export function InitialPreloader() {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [statusStep, setStatusStep] = useState(1);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Check if preloader has already completed in current session to avoid annoying returning users
    const hasLoadedInSession = sessionStorage.getItem("kontrol_preloader_done");
    if (hasLoadedInSession === "true") {
      setIsMounted(false);
      return;
    }

    const startTime = Date.now();
    const duration = 4000; // Exact 3 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(calculatedProgress);

      if (calculatedProgress >= 33 && calculatedProgress < 75) {
        setStatusStep(2);
      } else if (calculatedProgress >= 75) {
        setStatusStep(3);
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setProgress(100);
        setStatusStep(3);
        sessionStorage.setItem("kontrol_preloader_done", "true");

        // Start 600ms fade-out animation
        setTimeout(() => {
          setIsFadingOut(true);
        }, 100);

        // Remove from DOM after fade-out transition completes
        setTimeout(() => {
          setIsMounted(false);
        }, 750);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-gradient-to-br from-[#001433] via-[#004094] to-[#001D4A] text-white select-none transition-all duration-700 ease-in-out ${
        isFadingOut ? "opacity-0 scale-98 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Background Decorative Tech Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Main Preloader Content Card */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        {/* Pulsing Animated Brand Badge */}
        <div className="relative mb-6">
          <div className="absolute -inset-4 rounded-3xl bg-industrial-orange/30 blur-xl animate-pulse" />
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl group">
            <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-industrial-orange animate-bounce" />
            <Cpu className="w-5 h-5 text-teal-400 absolute bottom-2 right-2 animate-spin duration-3000" />
          </div>
        </div>

        {/* Brand Title & Tagline */}
        <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-white uppercase mb-1">
          KONTROL<span className="text-industrial-orange">.UZ</span>
        </h1>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-black tracking-widest text-industrial-orange uppercase mb-8 shadow-xs">
          <span>{t("preloader.tagline")}</span>
        </div>

        {/* Progress Box & Stats */}
        <div className="w-full bg-white/10 backdrop-blur-xl border border-white/15 p-5 rounded-2xl shadow-2xl space-y-4">
          {/* Header Row: Status text & Percentage */}
          <div className="flex items-center justify-between text-xs font-bold text-blue-100">
            <div className="flex items-center gap-2 truncate pr-2 text-left">
              {statusStep === 3 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-industrial-orange animate-ping shrink-0" />
              )}
              <span className="truncate">
                {statusStep === 1
                  ? t("preloader.status1")
                  : statusStep === 2
                  ? t("preloader.status2")
                  : t("preloader.status3")}
              </span>
            </div>
            <span className="font-mono font-black text-industrial-orange text-base shrink-0">
              {progress}%
            </span>
          </div>

          {/* Progress Bar Container */}
          <div className="relative h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/10 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-industrial-blue via-industrial-orange to-teal-400 transition-all duration-100 ease-out shadow-[0_0_12px_#FF6B00]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Bottom Small Hint */}
        <p className="mt-6 text-[11px] text-blue-200/70 font-medium tracking-wide">
          Sanoat & Tijorat Obyektlari uchun Intellektual Xavfsizlik Tizimlari
        </p>
      </div>
    </div>
  );
}
