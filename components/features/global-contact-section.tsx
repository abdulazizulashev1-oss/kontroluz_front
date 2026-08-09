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
      url: "https://t.me/kontrol_bot",
      icon: Send,
      color: "bg-[#0088cc] hover:bg-[#0077b5] text-white",
      tag: "@kontrol_bot",
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

          {/* Right Column: Location & Interactive Map Card */}
          <div className="lg:col-span-6">
            <Card className="p-6 bg-white border border-industrial-border shadow-sm h-full flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-industrial-border pb-3">
                  <h3 className="font-extrabold text-sm text-industrial-blue flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-industrial-orange" />
                    <span>{t("contact.addressTitle")}</span>
                  </h3>
                  <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {t("contact.workingHours")}
                  </span>
                </div>

                <p className="text-xs text-industrial-text-muted leading-relaxed">
                  {t("contact.address")}
                </p>
              </div>

              {/* Map Canvas */}
              <div className="relative w-full h-56 bg-industrial-surface-low rounded-lg border border-industrial-border-subtle overflow-hidden group flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-90 group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80')",
                  }}
                ></div>

                <div className="absolute inset-0 bg-industrial-blue/40"></div>

                <div className="relative z-10 text-center space-y-2 p-4">
                  <div className="inline-flex items-center gap-2 bg-industrial-blue text-white px-4 py-2 rounded-full font-extrabold text-xs shadow-xl border border-white/20">
                    <MapPin className="w-4 h-4 text-industrial-orange" />
                    <span>Kontrol.uz Tashkent Showroom & Sklad</span>
                  </div>

                  <div>
                    <a
                      href="https://yandex.uz/maps"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-industrial-orange text-white text-xs font-bold px-4 py-2 rounded hover:bg-industrial-orange-dark transition-colors shadow"
                    >
                      <span>Yandex / Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
