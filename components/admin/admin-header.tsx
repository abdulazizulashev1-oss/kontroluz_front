"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Timeframe } from "@/lib/admin/analytics-data";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import {
  ShieldCheck,
  Calendar,
  LogOut,
  ExternalLink,
  Clock,
  User,
} from "lucide-react";

interface AdminHeaderProps {
  timeframe: Timeframe;
  onTimeframeChange: (tf: Timeframe) => void;
  userEmail?: string;
}

export function AdminHeader({
  timeframe,
  onTimeframeChange,
  userEmail = "admin@kontrol.uz",
}: AdminHeaderProps) {
  const router = useRouter();
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("uz-UZ", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      router.push("/admin/login");
    }
  };

  const timeframes: { id: Timeframe; label: string }[] = [
    { id: "daily", label: "Kunlik" },
    { id: "weekly", label: "Haftalik" },
    { id: "monthly", label: "Oylik" },
    { id: "yearly", label: "Yillik" },
  ];

  return (
    <header className="bg-industrial-blue text-white sticky top-0 z-40 shadow-md border-b border-industrial-blue-dark">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Badge */}
        <div className="flex items-center gap-4">
          <Logo variant="admin" href="/admin" />

          {/* Live Clock Indicator */}
          {timeStr && (
            <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono bg-black/20 px-3 py-1 rounded-full border border-white/10 text-white/80">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{timeStr}</span>
            </div>
          )}
        </div>

        {/* Timeframe Filter Buttons */}
        <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl border border-white/20 text-xs font-bold shadow-inner">
          <Calendar className="w-3.5 h-3.5 text-white/60 ml-2 mr-1" />
          {timeframes.map((tf) => (
            <button
              key={tf.id}
              onClick={() => onTimeframeChange(tf.id)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                timeframe === tf.id
                  ? "bg-industrial-orange text-white shadow-xs scale-102"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>

        {/* Profile & Navigation Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs font-bold text-white/80 hover:text-white flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-all"
          >
            <span>Saytni Ko'rish</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 text-xs">
            <div className="w-6 h-6 rounded-full bg-industrial-orange text-white flex items-center justify-center font-bold text-xs">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="font-mono font-semibold text-white/90 truncate max-w-[140px]">
              {userEmail}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="gap-1.5 text-xs font-extrabold bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Chiqish</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
