"use client";

import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Send,
  MessageCircle,
  ChevronRight,
  Gauge,
  Zap,
  Wind,
  Cpu,
  Activity,
  Wrench,
  Layers,
  LayoutGrid,
  Home,
  ShoppingCart,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { Instagram, Facebook } from "@/components/ui/brand-icons";
import { useTranslation } from "@/lib/i18n/context";
import { Logo } from "@/components/ui/logo";
import { DynamicWorkingHours } from "@/components/features/dynamic-working-hours";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-industrial-blue-dark text-white border-t-4 border-industrial-orange pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12">
        {/* Kolonna 1: Brend, Rasmiy Maqom va Ijtimoiy Aloqa */}
        <div className="space-y-4">
          <Logo variant="footer" />
          <p className="text-xs text-slate-300 leading-relaxed">
            {t("footer.description")}
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-200 font-semibold bg-white/5 py-1.5 px-2.5 rounded-lg border border-white/10 w-fit">
            <CheckCircle2 className="w-4 h-4 text-industrial-orange flex-shrink-0" />
            <span>Rasmiy Distribyutor & Sanoat Integratori</span>
          </div>

          {/* Ijtimoiy tarmoqlar va Messengerlar */}
          <div className="pt-2 space-y-2">
            <h5 className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
              {t("footer.socials")}
            </h5>
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href="https://t.me/Kontrollshopbot"
                target="_blank"
                rel="noopener noreferrer"
                title="Telegram Bot (@Kontrollshopbot)"
                aria-label="Telegram Bot"
                className="w-8 h-8 rounded-lg bg-[#229ED9] hover:bg-[#1E88C7] text-white flex items-center justify-center transition-all hover:scale-105 shadow-2xs"
              >
                <Send className="w-4 h-4 -translate-x-0.5 translate-y-0.5" />
              </a>
              <a
                href="https://wa.me/998903291284"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp (+998 90 329 12 84)"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center transition-all hover:scale-105 shadow-2xs"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/kontroluz/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram (@kontroluz)"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center transition-all hover:scale-105 shadow-2xs"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/kontroluz"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook (Kontrol.uz)"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-[#1877F2] hover:bg-[#166fe5] text-white flex items-center justify-center transition-all hover:scale-105 shadow-2xs"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Kolonna 2: Saytdagi Asosiy Menular (Navigatsiya) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-industrial-orange shrink-0" />
            <h4 className="text-sm font-extrabold uppercase text-industrial-orange tracking-wider">
              {t("footer.navigation")}
            </h4>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li>
              <Link href="/" className="hover:text-white transition-colors flex items-center gap-2 group">
                <Home className="w-3.5 h-3.5 text-industrial-orange group-hover:scale-110 transition-transform shrink-0" />
                <span>{t("nav.home")}</span>
              </Link>
            </li>
            <li>
              <Link href="/katalog" className="hover:text-white transition-colors flex items-center gap-2 group">
                <LayoutGrid className="w-3.5 h-3.5 text-industrial-orange group-hover:scale-110 transition-transform shrink-0" />
                <span className="font-semibold text-white">{t("nav.catalog")}</span>
              </Link>
            </li>
            <li>
              <Link href="/kontaktlar" className="hover:text-white transition-colors flex items-center gap-2 group">
                <MapPin className="w-3.5 h-3.5 text-industrial-orange group-hover:scale-110 transition-transform shrink-0" />
                <span>{t("nav.contacts")}</span>
              </Link>
            </li>
            <li>
              <Link href="/savat" className="hover:text-white transition-colors flex items-center gap-2 group">
                <ShoppingCart className="w-3.5 h-3.5 text-industrial-orange group-hover:scale-110 transition-transform shrink-0" />
                <span>{t("nav.cart")}</span>
              </Link>
            </li>
            <li>
              <Link href="/maxfiylik-siyosati" className="hover:text-white transition-colors flex items-center gap-2 group text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors shrink-0" />
                <span>{t("footer.privacyPolicy")}</span>
              </Link>
            </li>
            <li>
              <Link href="/foydalanish-shartlari" className="hover:text-white transition-colors flex items-center gap-2 group text-slate-400">
                <FileText className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors shrink-0" />
                <span>{t("footer.termsOfService")}</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Kolonna 3: Haqiqiy Sanoat va Energetika Kategoriyalari */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-industrial-orange shrink-0" />
            <h4 className="text-sm font-extrabold uppercase text-industrial-orange tracking-wider">
              {t("footer.categories")}
            </h4>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li>
              <Link href="/katalog?category=counters" className="hover:text-white transition-colors flex items-center gap-2 group">
                <Gauge className="w-4 h-4 text-industrial-orange group-hover:scale-110 transition-transform shrink-0" />
                <span>{t("footer.catCounters")}</span>
              </Link>
            </li>
            <li>
              <Link href="/katalog?category=electrical-equipment" className="hover:text-white transition-colors flex items-center gap-2 group">
                <Zap className="w-4 h-4 text-industrial-orange group-hover:scale-110 transition-transform shrink-0" />
                <span>{t("footer.catElectrical")}</span>
              </Link>
            </li>
            <li>
              <Link href="/katalog?category=Pneumatics" className="hover:text-white transition-colors flex items-center gap-2 group">
                <Wind className="w-4 h-4 text-industrial-orange group-hover:scale-110 transition-transform shrink-0" />
                <span>{t("footer.catPneumatics")}</span>
              </Link>
            </li>
            <li>
              <Link href="/katalog?category=instrumentation-automation" className="hover:text-white transition-colors flex items-center gap-2 group">
                <Cpu className="w-4 h-4 text-industrial-orange group-hover:scale-110 transition-transform shrink-0" />
                <span>{t("footer.catAutomation")}</span>
              </Link>
            </li>
            <li>
              <Link href="/katalog?category=electricity-meters" className="hover:text-white transition-colors flex items-center gap-2 group">
                <Activity className="w-4 h-4 text-industrial-orange group-hover:scale-110 transition-transform shrink-0" />
                <span>{t("footer.catElectricityMeters")}</span>
              </Link>
            </li>
            <li>
              <Link href="/katalog?category=misc-tools" className="hover:text-white transition-colors flex items-center gap-2 group">
                <Wrench className="w-4 h-4 text-industrial-orange group-hover:scale-110 transition-transform shrink-0" />
                <span>{t("footer.catMiscTools")}</span>
              </Link>
            </li>
            <li className="pt-1">
              <Link
                href="/katalog"
                className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-industrial-orange hover:text-white transition-colors uppercase tracking-wider group"
              >
                <Layers className="w-3.5 h-3.5 text-industrial-orange group-hover:scale-110 transition-transform shrink-0" />
                <span>{t("footer.viewAllCategories")}</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Kolonna 4: Rasmiy Filiallar va Bog'lanish */}
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold uppercase text-industrial-orange tracking-wider">
            {t("footer.contacts")}
          </h4>
          <div className="space-y-3 text-xs text-slate-300">
            {/* 1-Filial */}
            <div className="space-y-0.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-industrial-orange flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">
                    {t("branches.qorasaroy.name")}
                  </span>
                  <span className="text-[11px] text-slate-300 leading-tight block">
                    {t("branches.qorasaroy.address")}
                  </span>
                </div>
              </div>
            </div>

            {/* 2-Filial */}
            <div className="space-y-0.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">
                    {t("branches.mainOffice.name")}
                  </span>
                  <span className="text-[11px] text-slate-300 leading-tight block">
                    {t("branches.mainOffice.address")}
                  </span>
                </div>
              </div>
            </div>

            {/* Telefon raqam */}
            <div className="pt-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-industrial-orange flex-shrink-0" />
                <a href="tel:+998712006800" className="hover:underline font-bold text-white text-xs">
                  +998 (71) 200-68-00
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-industrial-orange flex-shrink-0" />
              <a href="mailto:info@kontrol.uz" className="hover:underline text-slate-300 hover:text-white">
                info@kontrol.uz
              </a>
            </div>

            {/* Ish tartibi */}
            <div className="flex items-center gap-2 pt-1">
              <Clock className="w-4 h-4 text-industrial-orange flex-shrink-0" />
              <DynamicWorkingHours variant="badge" className="bg-white/10 text-white border-white/20 text-[11px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Sub-footer (Mualliflik huquqi va Huquqiy sahifalar) */}
      <div className="max-w-7xl mx-auto px-4 border-t border-blue-900/60 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
        <div>
          © 2026 Kontrol.uz — {t("footer.allRightsReserved")}
        </div>
        <div className="flex gap-6">
          <Link href="/maxfiylik-siyosati" className="hover:text-white hover:underline transition-colors">
            {t("footer.privacyPolicy")}
          </Link>
          <Link href="/foydalanish-shartlari" className="hover:text-white hover:underline transition-colors">
            {t("footer.termsOfService")}
          </Link>
          <Link href="/kontaktlar" className="hover:text-white hover:underline transition-colors">
            {t("nav.contacts")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
