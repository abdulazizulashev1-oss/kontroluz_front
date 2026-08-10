import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Building,
  ShieldCheck,
  Headphones,
  Award,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/features/json-ld";
import { ContactForm } from "@/components/features/contact-form";
import { Card } from "@/components/ui/card";

import { BranchLocationsMap } from "@/components/features/branch-locations-map";

export const metadata: Metadata = {
  title: "Kontaktlar va Manzil — Kontrol.uz",
  description:
    "Kontrol.uz sanoat uskunalar B2B distribyutori filiallari: Qorasaroy va Markaziy Servis Markazi. Telefon: +998 (71) 200-68-00",
};

export default function ContactsPage() {
  const breadcrumbs = [
    { name: "Bosh sahifa", url: "https://kontrol.uz" },
    { name: "Kontaktlar", url: "https://kontrol.uz/kontaktlar" },
  ];

  return (
    <div className="bg-industrial-surface min-h-screen py-8">
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-industrial-text-muted flex items-center gap-2">
          <Link href="/" className="hover:underline">
            Bosh sahifa
          </Link>
          <span>/</span>
          <span className="font-bold text-industrial-blue">Kontaktlar va Filiallar</span>
        </nav>

        {/* Hero Title Section */}
        <div className="bg-industrial-blue text-white p-8 rounded-2xl shadow-md space-y-3 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="bg-industrial-orange text-white text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider">
              24/7 B2B ALOQA LINIYASI
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-2">
              Biz Bilan Bog'laning va Filiallarimizga Tashrif Buyuring
            </h1>
            <p className="text-sm text-white/90 leading-relaxed font-normal">
              Sanoat uskunalarini yetkazib berish, smeta tuzish va loyihalash bo'yicha filiallarimiz va servis markazlarimiz bilan bog'laning.
            </p>
          </div>
        </div>

        {/* 4 Bento Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: 1-Filial Qorasaroy */}
          <Card className="p-6 bg-white border border-industrial-border space-y-3 shadow-sm hover:border-industrial-blue transition-all">
            <div className="w-10 h-10 rounded-lg bg-industrial-blue/10 text-industrial-blue flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-industrial-text">1-Filial: Qorasaroy</h3>
            <p className="text-xs text-industrial-text-muted leading-relaxed">
              Toshkent shahri, Olmazor tumani, Qorasaroy ko'chasi.
            </p>
          </Card>

          {/* Card 2: Bosh Ofis & Showroom */}
          <Card className="p-6 bg-white border border-industrial-border space-y-3 shadow-sm hover:border-industrial-blue transition-all">
            <div className="w-10 h-10 rounded-lg bg-industrial-orange/10 text-industrial-orange flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-industrial-text">Bosh Ofis & Sklad</h3>
            <p className="text-xs text-industrial-text-muted leading-relaxed">
              Toshkent shahri, Chilonzor tumani, Kontrol Bosh Ofisi.
            </p>
          </Card>

          {/* Card 3: Phone */}
          <Card className="p-6 bg-white border border-industrial-border space-y-3 shadow-sm hover:border-industrial-blue transition-all">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-industrial-text">Telefon Liniyalari</h3>
            <div className="text-xs font-bold text-industrial-blue space-y-1">
              <div>+998 (71) 200-68-00</div>
              <div>+998 (71) 200-55-44</div>
            </div>
          </Card>

          {/* Card 4: Hours */}
          <Card className="p-6 bg-white border border-industrial-border space-y-3 shadow-sm hover:border-industrial-blue transition-all">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-industrial-text">Ish Vaqti</h3>
            <div className="text-xs text-industrial-text-muted space-y-1">
              <div>Dushanba - Juma: 09:00 - 18:00</div>
              <div>Shanba: 09:00 - 15:00</div>
            </div>
          </Card>
        </div>

        {/* 2 Branches Interactive Google Maps Section */}
        <BranchLocationsMap />

        {/* Main Content Grid: Form + Regional Coverage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Area */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Regional Network Info */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 bg-white border border-industrial-border space-y-4">
              <h3 className="font-extrabold text-base text-industrial-blue flex items-center gap-2">
                <Building className="w-5 h-5 text-industrial-orange" />
                Respublika Bo'ylab Servis Tarmog'i
              </h3>
              <p className="text-xs text-industrial-text-muted leading-relaxed">
                Kontrol.uz O'zbekistonning barcha viloyatlarida rasmiy distribyutorlik va servis markazlariga ega.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-industrial-surface-low rounded border border-industrial-border-subtle text-center">
                  <div className="text-2xl font-black text-industrial-blue">28 ta</div>
                  <div className="text-[11px] text-industrial-text-muted font-semibold">B2B Savdo Ofislari</div>
                </div>
                <div className="p-3 bg-industrial-surface-low rounded border border-industrial-border-subtle text-center">
                  <div className="text-2xl font-black text-industrial-orange">35 ta</div>
                  <div className="text-[11px] text-industrial-text-muted font-semibold">Servis Markazlari</div>
                </div>
              </div>

              <div className="pt-2 space-y-2 text-xs text-industrial-text font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ISO 9001:2015 Sertifikatlangan Sanoat Servisi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-industrial-blue shrink-0" />
                  <span>24/7 Operativ Texnik Konsultatsiya</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-industrial-orange shrink-0" />
                  <span>Toshkent Markaziy Omboridan Tezkor Yuklash</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
