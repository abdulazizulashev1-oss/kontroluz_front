"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Phone, Clock, ExternalLink, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface Branch {
  id: string;
  name: string;
  badge: string;
  address: string;
  phone: string;
  rawPhone: string;
  workingHours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
  embedUrl: string;
}

export const BRANCHES: Branch[] = [
  {
    id: "qorasaroy",
    name: "Kontrol Qorasaroy Filiali",
    badge: "1-Filial & Do'kon",
    address: "Toshkent shahri, Olmazor tumani, Qorasaroy ko'chasi",
    phone: "+998 (71) 200-68-00",
    rawPhone: "+998712006800",
    workingHours: "Dush - Shan: 09:00 - 18:00",
    coordinates: {
      lat: 41.3572598,
      lng: 69.2427857,
    },
    googleMapsUrl:
      "https://www.google.com/maps/place/Kontrol+Qorasaroy/@41.3572598,69.2427857,19z/data=!4m12!1m5!3m4!2zNDHCsDIxJzI2LjAiTiA2OcKwMTQnMzMuNyJF!8m2!3d41.357225!4d69.242706!3m5!1s0x38ae8d007275dfa1:0x3f9cead8d5d7c99a!8m2!3d41.3572598!4d69.2427857!16s%2Fg%2F11x82xvmg6?entry=ttu",
    embedUrl:
      "https://maps.google.com/maps?q=41.3572598,69.2427857&hl=uz&z=17&output=embed",
  },
  {
    id: "main-office",
    name: "Kontrol Bosh Ofis & Servis Markazi",
    badge: "Bosh Ofis & Sklad",
    address: "Toshkent shahri, Chilonzor tumani, Kontrol Markaziy Ofis & Showroom",
    phone: "+998 (71) 200-55-44",
    rawPhone: "+998712005544",
    workingHours: "Dush - Juma: 09:00 - 18:00",
    coordinates: {
      lat: 41.2547777,
      lng: 69.2019358,
    },
    googleMapsUrl:
      "https://www.google.com/maps/place/Kontrol/@41.2547777,69.2019358,19z/data=!3m1!4b1!4m6!3m5!1s0x38ae8b341f77f315:0xbf6396ddb0f36182!8m2!3d41.2547777!4d69.2019358!16s%2Fg%2F11k3_mf8xr?entry=ttu",
    embedUrl:
      "https://maps.google.com/maps?q=41.2547777,69.2019358&hl=uz&z=17&output=embed",
  },
];

export function BranchLocationsMap() {
  const [activeBranchId, setActiveBranchId] = useState<string>("qorasaroy");

  const activeBranch = BRANCHES.find((b) => b.id === activeBranchId) || BRANCHES[0];

  return (
    <Card className="p-6 bg-white border border-industrial-border shadow-sm rounded-2xl space-y-6">
      {/* Header with Title & Branch Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-industrial-border pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-industrial-blue uppercase">
            <Building2 className="w-4 h-4 text-industrial-orange" />
            <span>Bizning Filiallarimiz va Xarita</span>
          </div>
          <h3 className="text-xl font-black text-industrial-text mt-0.5">
            Toshkentdagi Rasmiy Filiallarimiz
          </h3>
        </div>

        {/* Branch Selector Tabs */}
        <div className="flex items-center gap-2 bg-industrial-surface-low p-1.5 rounded-xl border border-industrial-border-subtle text-xs font-bold">
          {BRANCHES.map((b) => (
            <button
              key={b.id}
              onClick={() => setActiveBranchId(b.id)}
              className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeBranchId === b.id
                  ? "bg-industrial-blue text-white shadow-xs"
                  : "text-industrial-text-muted hover:text-industrial-text hover:bg-white"
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-industrial-orange" />
              <span>{b.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Branch Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BRANCHES.map((branch) => {
          const isActive = branch.id === activeBranchId;
          return (
            <div
              key={branch.id}
              onClick={() => setActiveBranchId(branch.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                isActive
                  ? "bg-blue-50/50 border-industrial-blue shadow-xs"
                  : "bg-industrial-surface-low border-industrial-border-subtle hover:border-gray-300"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                        isActive
                          ? "bg-industrial-blue text-white"
                          : "bg-gray-200 text-industrial-text-muted"
                      }`}
                    >
                      {branch.badge}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm text-industrial-text">
                    {branch.name}
                  </h4>
                  <p className="text-xs text-industrial-text-muted flex items-start gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-industrial-orange shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-industrial-border-subtle/70 flex items-center justify-between text-xs">
                <a
                  href={`tel:${branch.rawPhone}`}
                  className="font-bold text-industrial-blue hover:text-industrial-orange flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>{branch.phone}</span>
                </a>

                <a
                  href={branch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs font-bold text-industrial-orange hover:underline flex items-center gap-1"
                >
                  <span>Google Xaritada Ochish</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Google Map Iframe Container */}
      <div className="relative w-full h-[380px] sm:h-[440px] rounded-2xl overflow-hidden border border-industrial-border shadow-inner bg-industrial-surface-low">
        <iframe
          key={activeBranch.id}
          title={activeBranch.name}
          src={activeBranch.embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />

        {/* Floating Quick Action Overlay Badge */}
        <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-industrial-border shadow-lg space-y-1 max-w-[280px]">
          <div className="text-xs font-black text-industrial-blue flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-industrial-orange" />
            <span>{activeBranch.name}</span>
          </div>
          <p className="text-[11px] text-industrial-text-muted leading-snug">
            {activeBranch.address}
          </p>
          <div className="pt-1">
            <a
              href={activeBranch.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-industrial-orange text-white text-[10px] font-extrabold px-2.5 py-1 rounded hover:bg-industrial-orange-dark transition-colors shadow-2xs"
            >
              <span>Marshrut tuzish (Google Maps)</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
}
