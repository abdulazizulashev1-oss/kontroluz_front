"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Lock, Mail, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AdminLoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!login || !password) return;

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", login, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Login yoki parol noto'g'ri");
        setIsLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setErrorMsg("Tarmoq xatosi yuz berdi. Qayta urinib ko'ring.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-industrial-surface flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Subtle Accent Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-industrial-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-industrial-orange/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center justify-center group mb-2">
            <Image
              src="/images/logo.png"
              alt="Kontrol.uz"
              width={240}
              height={56}
              className="h-12 w-auto object-contain group-hover:scale-102 transition-transform"
              priority
            />
          </Link>
          <div className="inline-block bg-industrial-blue/10 text-industrial-blue px-3 py-1 rounded-full text-xs font-mono font-bold">
            SUPER ADMIN DASHBOARD
          </div>
          <p className="text-xs text-industrial-text-muted">
            Analitika, hisobotlar va tizimni boshqarish uchun tizimga kiring
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-8 bg-white border border-industrial-border shadow-xl rounded-3xl space-y-6">
          {errorMsg && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold flex items-center gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-extrabold text-industrial-text flex items-center gap-1.5 mb-1.5">
                <Mail className="w-3.5 h-3.5 text-industrial-blue" />
                <span>Admin Login / Email</span>
              </label>
              <input
                type="text"
                required
                placeholder="admin@kontrol.uz"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="w-full p-3 bg-industrial-surface-low border border-industrial-border rounded-xl font-semibold text-xs text-industrial-text focus:outline-none focus:border-industrial-blue focus:bg-white transition-all shadow-inner"
              />
            </div>

            <div>
              <label className="font-extrabold text-industrial-text flex items-center gap-1.5 mb-1.5">
                <Lock className="w-3.5 h-3.5 text-industrial-orange" />
                <span>Maxfiy Parol</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pr-10 bg-industrial-surface-low border border-industrial-border rounded-xl font-semibold text-xs text-industrial-text focus:outline-none focus:border-industrial-blue focus:bg-white transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-industrial-text p-1 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="cta"
              disabled={isLoading}
              className="w-full py-3.5 text-xs font-black gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer mt-2"
            >
              <span>{isLoading ? "Tekshirilmoqda..." : "Boshqaruv Paneliga Kirish"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="pt-2 border-t border-industrial-border-subtle text-center">
            <Link
              href="/"
              className="text-[11px] font-bold text-industrial-blue hover:text-industrial-orange transition-colors"
            >
              ← Bosh sahifaga qaytish
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
