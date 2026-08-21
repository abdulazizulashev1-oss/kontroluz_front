"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Shield, Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";
import { Logo } from "@/components/ui/logo";
import { DynamicWorkingHours } from "@/components/features/dynamic-working-hours";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-industrial-blue-dark text-white border-t-4 border-industrial-orange pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Brand & Organization Bio */}
        <div className="space-y-4">
          <Logo variant="footer" />
          <p className="text-xs text-slate-300 leading-relaxed">
            {t("footer.description")}
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-industrial-orange flex-shrink-0" />
            <span>ISO 9001:2026 Sertifikatlangan Diler</span>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold uppercase text-industrial-orange tracking-wider">
            {t("footer.navigation")}
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li>
              <Link href="/katalog" className="hover:text-white transition-colors">
                {t("nav.catalog")}
              </Link>
            </li>
            <li>
              <Link href="/kontaktlar" className="hover:text-white transition-colors">
                {t("nav.contacts")}
              </Link>
            </li>
            <li>
              <Link href="/savat" className="hover:text-white transition-colors">
                {t("nav.cart")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Top Product Categories */}
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold uppercase text-industrial-orange tracking-wider">
            {t("footer.categories")}
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li>
              <Link href="/katalog?category=videokuzatuv" className="hover:text-white transition-colors">
                {t("footer.catCctv")}
              </Link>
            </li>
            <li>
              <Link href="/katalog?category=nvr-videoregistratorlar" className="hover:text-white transition-colors">
                {t("footer.catNvr")}
              </Link>
            </li>
            <li>
              <Link href="/katalog?category=skud-va-turniketlar" className="hover:text-white transition-colors">
                {t("footer.catTurnstiles")}
              </Link>
            </li>
            <li>
              <Link href="/katalog?category=yongin-xavfsizligi" className="hover:text-white transition-colors">
                {t("footer.catFire")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Official Head Office Contacts */}
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold uppercase text-industrial-orange tracking-wider">
            {t("footer.contacts")}
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-industrial-orange flex-shrink-0 mt-0.5" />
              <span>{t("footer.address")}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-industrial-orange flex-shrink-0" />
              <a href="tel:+998781137027" className="hover:underline font-bold text-white">
                {t("nav.phone")}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-industrial-orange flex-shrink-0" />
              <span>info@kontrol.uz</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-industrial-orange flex-shrink-0" />
              <DynamicWorkingHours variant="badge" className="bg-white/10 text-white border-white/20" />
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Sub-footer */}
      <div className="max-w-7xl mx-auto px-4 border-t border-blue-900/60 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
        <div>
          © 2026 Kontrol.uz — {t("footer.allRightsReserved")}
        </div>
        <div className="flex gap-6">
          <Link href="/" className="hover:underline">
            {t("footer.privacyPolicy")}
          </Link>
          <Link href="/" className="hover:underline">
            {t("footer.termsOfService")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
