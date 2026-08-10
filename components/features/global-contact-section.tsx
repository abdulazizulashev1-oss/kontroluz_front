"use client";

import React from "react";
import {
  Phone,
  MessageCircle,
  Instagram,
  Facebook,
  MapPin,
  Send,
  ExternalLink,
  Clock,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n/context";

export function GlobalContactSection() {
  const { t } = useTranslation();

  const phoneNumbers = [
    { label: t("contact.contactInfoTitle"), number: "+998 (71) 200-68-00", raw: "+998712006800" },
    { label: t("engineering.feature4Title"), number: "+998 (71) 200-55-44", raw: "+998712005544" },
    { label: t("hero.stat2Label"), number: "+998 (90) 123-45-67", raw: "+998901234567" },
  ];

  const socialLinks = [
    {
      name: "Telegram Bot",
      url: "https://t.me/kontrol_uz_bot",
      icon: Send,
      color: "bg-[#0088cc] hover:bg-[#0077b5] text-white",
      tag: "@kontrol_uz_bot",
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/998712006800",
      icon: MessageCircle,
      color: "bg-[#25D366] hover:bg-[#20ba5a] text-white",
      tag: "WhatsApp Business",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/kontrol.uz",
      icon: Instagram,
      color: "bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white",
      tag: "@kontrol.uz",
    },
    {
      name: "Facebook",
      url: "https://facebook.com/kontroluz",
      icon: Facebook,
      color: "bg-[#1877F2] hover:bg-[#166fe5] text-white",
      tag: "Kontrol.uz Industrial",
    },
  ];

  return (
    <section className="bg-industrial-surface-low border-t border-industrial-border py-12">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="bg-industrial-orange text-white text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider">
            {t("contact.badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-industrial-blue">
            {t("contact.title")}
          </h2>
          <p className="text-xs sm:text-sm text-industrial-text-muted">
            {t("contact.subtitle")}
          </p>
        </div>

        {/* Main Grid: Left Contacts & Right Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Phones & Social Messengers */}
          <div className="lg:col-span-6 space-y-6">
            {/* 3 Phone Numbers Card */}
            <Card className="p-6 bg-white border border-industrial-border space-y-4 shadow-sm">
              <h3 className="font-extrabold text-sm text-industrial-blue flex items-center gap-2 border-b border-industrial-border pb-3">
                <Phone className="w-4 h-4 text-industrial-orange" />
                <span>{t("contact.contactInfoTitle")}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {phoneNumbers.map((phone, idx) => (
                  <a
                    key={idx}
                    href={`tel:${phone.raw}`}
                    className="p-3 bg-industrial-surface-low rounded border border-industrial-border-subtle hover:border-industrial-blue transition-all group block"
                  >
                    <div className="text-[10px] text-industrial-text-muted font-semibold line-clamp-1">
                      {phone.label}
                    </div>
                    <div className="font-black text-xs text-industrial-blue group-hover:text-industrial-orange transition-colors mt-1">
                      {phone.number}
                    </div>
                  </a>
                ))}
              </div>
            </Card>

            {/* Social & Messenger Links Card */}
            <Card className="p-6 bg-white border border-industrial-border space-y-4 shadow-sm">
              <h3 className="font-extrabold text-sm text-industrial-blue flex items-center gap-2 border-b border-industrial-border pb-3">
                <MessageCircle className="w-4 h-4 text-industrial-orange" />
                <span>Social Media & Messengers</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} p-3 rounded-lg flex flex-col items-center justify-center text-center transition-all shadow-sm group`}
                    >
                      <Icon className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                      <span className="font-extrabold text-xs">{social.name}</span>
                      <span className="text-[9px] opacity-80 mt-0.5 truncate max-w-full">
                        {social.tag}
                      </span>
                    </a>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Right Column: 2 Branches Interactive Google Map */}
          <div className="lg:col-span-6">
            <Card className="p-5 sm:p-6 bg-white border border-industrial-border shadow-sm h-full flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-industrial-border pb-2.5">
                  <h3 className="font-extrabold text-sm text-industrial-blue flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-industrial-orange" />
                    <span>Filiallarimiz Joylashuvi</span>
                  </h3>
                  <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Dush-Juma: 09:00-18:00
                  </span>
                </div>

                {/* Branch Quick Switcher */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2.5 bg-blue-50/60 rounded-lg border border-industrial-blue/30 space-y-1">
                    <div className="font-extrabold text-industrial-blue flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-industrial-blue" />
                      <span>1-Filial: Qorasaroy</span>
                    </div>
                    <p className="text-[11px] text-industrial-text-muted leading-tight">
                      Olmazor tumani, Qorasaroy ko'chasi
                    </p>
                    <a
                      href="https://www.google.com/maps/place/Kontrol+Qorasaroy/@41.3572598,69.2427857,19z"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-industrial-orange hover:underline flex items-center gap-1 pt-0.5"
                    >
                      <span>Google Xaritada</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>

                  <div className="p-2.5 bg-industrial-surface-low rounded-lg border border-industrial-border-subtle space-y-1">
                    <div className="font-extrabold text-industrial-text flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-industrial-orange" />
                      <span>Bosh Ofis: Chilonzor</span>
                    </div>
                    <p className="text-[11px] text-industrial-text-muted leading-tight">
                      Chilonzor tumani, Bosh Ofis & Sklad
                    </p>
                    <a
                      href="https://www.google.com/maps/place/Kontrol/@41.2547777,69.2019358,19z"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-industrial-orange hover:underline flex items-center gap-1 pt-0.5"
                    >
                      <span>Google Xaritada</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Map Iframe */}
              <div className="relative w-full h-56 rounded-xl border border-industrial-border overflow-hidden shadow-inner bg-industrial-surface-low">
                <iframe
                  title="Kontrol Qorasaroy & Bosh Ofis"
                  src="https://maps.google.com/maps?q=41.3572598,69.2427857&hl=uz&z=14&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
