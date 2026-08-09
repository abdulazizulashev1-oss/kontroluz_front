"use client";

import React from "react";
import Link from "next/link";
import { Shield, Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-industrial-blue-dark text-white border-t-4 border-industrial-orange pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Brand & Organization Bio */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-industrial-orange p-2 rounded">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white">
              KONTROL<span className="text-industrial-orange">.UZ</span>
            </span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {t("footer.description")}
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>ISO 9001 / ISO 14001</span>
          </div>
        </div>

        {/* Categories Navigation */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-industrial-orange mb-4 border-b border-blue-900/50 pb-2">
            {t("footer.categories")}
          </h3>
          <ul className="space-y-2.5 text-sm text-slate-300">
            <li>
              <Link href="/katalog?category=videokuzatuv" className="hover:text-white transition-colors">
                IP & PTZ Cameras
              </Link>
            </li>
            <li>
              <Link href="/katalog?category=videokuzatuv" className="hover:text-white transition-colors">
                4K NVR Recorders
              </Link>
            </li>
            <li>
              <Link href="/katalog?category=kirishni-boshqarish" className="hover:text-white transition-colors">
                Biometric Turnstiles
              </Link>
            </li>
            <li>
              <Link href="/katalog?category=yongin-xavfsizligi" className="hover:text-white transition-colors">
                Fire Safety Sensors
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-industrial-orange mb-4 border-b border-blue-900/50 pb-2">
            {t("footer.navigation")}
          </h3>
          <ul className="space-y-2.5 text-sm text-slate-300">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link href="/katalog" className="hover:text-white transition-colors">
                {t("nav.catalog")}
              </Link>
            </li>
            <li>
              <Link href="/#calculator" className="hover:text-white transition-colors">
                {t("nav.calculator")}
              </Link>
            </li>
            <li>
              <Link href="/kontaktlar" className="hover:text-white transition-colors">
                {t("nav.contacts")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info & Address */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-industrial-orange mb-4 border-b border-blue-900/50 pb-2">
            {t("footer.contacts")}
          </h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-industrial-orange flex-shrink-0 mt-0.5" />
              <span>{t("footer.address")}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-industrial-orange flex-shrink-0" />
              <a href="tel:+998712006800" className="hover:underline font-bold text-white">
                {t("nav.phone")}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-industrial-orange flex-shrink-0" />
              <span>info@kontrol.uz</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-industrial-orange flex-shrink-0" />
              <span>{t("nav.workingHours")}</span>
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
