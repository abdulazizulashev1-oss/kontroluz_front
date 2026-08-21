"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Calculator,
  Building2,
  Warehouse,
  Factory,
  Home,
  Camera,
  ShieldCheck,
  Flame,
  PhoneCall,
  User,
  Phone,
  Send,
  CheckCircle2,
  Sparkles,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/context";
import { createLead } from "@/lib/api";

interface SmetaModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function SmetaModal({ isOpen: propIsOpen, onClose }: SmetaModalProps) {
  const { t, locale } = useTranslation();
  const [internalOpen, setInternalOpen] = useState(false);

  // Form parameters
  const [objectType, setObjectType] = useState<"office" | "warehouse" | "industrial" | "home">("office");
  const [areaSqM, setAreaSqM] = useState<number>(150);
  const [entryPoints, setEntryPoints] = useState<number>(2);
  const [cameraRes, setCameraRes] = useState<"2mp" | "4mp" | "8mp">("4mp");
  const [storageDays, setStorageDays] = useState<number>(14);
  const [needsSkud, setNeedsSkud] = useState<boolean>(true);
  const [needsFireAlarm, setNeedsFireAlarm] = useState<boolean>(false);
  const [needsIntercom, setNeedsIntercom] = useState<boolean>(true);

  // Lead fields
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("+998 ");
  const [clientCompany, setClientCompany] = useState("");
  const [clientComment, setClientComment] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync with prop or global event listener
  useEffect(() => {
    if (propIsOpen !== undefined) {
      setInternalOpen(propIsOpen);
    }
  }, [propIsOpen]);

  useEffect(() => {
    const handleOpenEvent = () => setInternalOpen(true);
    const handleCloseEvent = () => setInternalOpen(false);

    window.addEventListener("open-smeta-modal", handleOpenEvent);
    window.addEventListener("close-smeta-modal", handleCloseEvent);

    return () => {
      window.removeEventListener("open-smeta-modal", handleOpenEvent);
      window.removeEventListener("close-smeta-modal", handleCloseEvent);
    };
  }, []);

  const isOpen = propIsOpen !== undefined ? propIsOpen : internalOpen;

  const handleClose = () => {
    setInternalOpen(false);
    onClose?.();
    if (isSubmitted) {
      setTimeout(() => {
        setIsSubmitted(false);
        setClientName("");
        setClientPhone("+998 ");
        setClientCompany("");
        setClientComment("");
      }, 300);
    }
  };

  // Dynamic cost calculation
  const camerasCount = Math.max(2, Math.ceil(areaSqM / 40));
  const baseCostPerCam = cameraRes === "8mp" ? 1850000 : cameraRes === "4mp" ? 1200000 : 750000;
  const nvrCost = camerasCount > 16 ? 4800000 : camerasCount > 8 ? 2900000 : 1500000;
  const storageCost = (storageDays / 7) * 450000;
  const skudCost = needsSkud ? entryPoints * 2800000 : 0;
  const fireCost = needsFireAlarm ? Math.ceil(areaSqM / 30) * 180000 + 1900000 : 0;
  const intercomCost = needsIntercom ? 1650000 : 0;

  const subtotal = camerasCount * baseCostPerCam + nvrCost + storageCost + skudCost + fireCost + intercomCost;
  const estimatedMin = Math.round(subtotal * 0.95);
  const estimatedMax = Math.round(subtotal * 1.15);

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || clientPhone.length < 9) {
      setErrorMsg("Iltimos, ismingiz va to'liq telefon raqamingizni kiriting.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const objectTypeNames: Record<string, string> = {
      office: "Ofis va Biznes Markaz",
      warehouse: "Omborxona va Logistika",
      industrial: "Sanoat Zavodi / Korxona",
      home: "Xususiy Mulk / Villa",
    };

    const summaryDetails = `[Smeta So'rovi] Obyekt: ${objectTypeNames[objectType] || objectType} (${areaSqM} m²), Kameralar: ${camerasCount} ta (${cameraRes.toUpperCase()}), SKUD nuqtalari: ${entryPoints} ta, Arxiv: ${storageDays} kun. Qo'shimcha: ${needsSkud ? "SKUD " : ""}${needsFireAlarm ? "Yong'in " : ""}${needsIntercom ? "Interkom" : ""}. Izoh: ${clientComment || "Mavjud emas"}`;

    const res = await createLead({
      clientName,
      phone: clientPhone,
      company: clientCompany || undefined,
      category: "Smeta Hisoboti",
      objectType,
      areaSqM,
      estimatedPriceMin: estimatedMin,
      estimatedPriceMax: estimatedMax,
      message: summaryDetails,
    });

    setIsSubmitting(false);

    if (res.success) {
      setIsSubmitted(true);
    } else {
      setErrorMsg(res.error || "Arizani yuborishda xatolik yuz berdi. Qayta urinib ko'ring.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-industrial-border overflow-hidden animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-industrial-blue to-industrial-blue-dark text-white px-5 sm:px-7 py-4.5 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shadow-inner text-industrial-orange">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
                <span>{t("calculator.title") || "Smeta Hisoblash va Loyiha Narxi"}</span>
              </h3>
              <p className="text-[11px] sm:text-xs text-white/80 line-clamp-1">
                {t("calculator.subtitle") || "Obyektingiz uchun moslashtirilgan smetani bir necha soniyada oling"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all cursor-pointer shrink-0 ml-2"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 md:p-7 overflow-y-auto space-y-6 scrollbar-thin">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl font-black text-industrial-blue">
                  {t("calculator.submitSuccess") || "Smeta Arizangiz Qabul Qilindi!"}
                </h4>
                <p className="text-xs sm:text-sm text-industrial-text-muted max-w-md mx-auto leading-relaxed">
                  Hurmatli <span className="font-bold text-industrial-text">{clientName}</span>, siz hisoblagan smeta parametrlari bo'yicha ma'lumot qabul qilindi. Tez orada muhandisimiz{" "}
                  <span className="font-bold text-industrial-blue">{clientPhone}</span> raqamingizga to'liq rasmiy taklif bilan bog'lanadi.
                </p>
              </div>

              {/* Calculated Summary Card */}
              <div className="bg-industrial-surface-low border border-industrial-border rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-gray-200 pb-1.5 font-semibold text-industrial-text">
                  <span>Hisoblangan Taxminiy Qiymat:</span>
                  <span className="font-mono text-industrial-orange font-bold">
                    {formatPrice(estimatedMin, "UZS")} – {formatPrice(estimatedMax, "UZS")}
                  </span>
                </div>
                <div className="flex justify-between text-industrial-text-muted">
                  <span>Tavsiya etilgan uskunalar:</span>
                  <span>{camerasCount} ta kamera, {needsSkud ? `${entryPoints} ta SKUD, ` : ""} NVR registrator</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  onClick={handleClose}
                  className="bg-industrial-blue hover:bg-industrial-blue-dark text-white px-8 py-2.5 rounded-lg font-bold text-xs"
                >
                  {t("calculator.closeBtn") || "Tushunarli"}
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitLead} className="space-y-6">
              {/* Step 1: Object Type Selection */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-industrial-blue tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-industrial-blue text-white inline-flex items-center justify-center text-[10px]">1</span>
                  <span>{t("calculator.objectType") || "Obyekt Turi"}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: "office", label: "Ofis / Biznes", icon: Building2 },
                    { id: "warehouse", label: "Omborxona", icon: Warehouse },
                    { id: "industrial", label: "Sanoat / Zavod", icon: Factory },
                    { id: "home", label: "Xususiy Mulk", icon: Home },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = objectType === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setObjectType(item.id as any)}
                        className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer ${
                          isSelected
                            ? "border-industrial-blue bg-industrial-blue/5 text-industrial-blue shadow-xs font-bold"
                            : "border-industrial-border-subtle bg-white text-industrial-text hover:border-industrial-blue/40"
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isSelected ? "text-industrial-blue" : "text-industrial-text-muted"}`} />
                        <span className="text-[11px] sm:text-xs leading-tight">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Dimensions & Quantity Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-industrial-surface-low p-4 rounded-xl border border-industrial-border-subtle">
                {/* Area in SqM */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-industrial-text">
                    <span>{t("calculator.area") || "Obyekt Maydoni"}:</span>
                    <span className="font-mono text-industrial-blue font-extrabold">{areaSqM} m²</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={2000}
                    step={10}
                    value={areaSqM}
                    onChange={(e) => setAreaSqM(Number(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-industrial-blue"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                    <span>20 m²</span>
                    <span>1,000 m²</span>
                    <span>2,000 m²</span>
                  </div>
                </div>

                {/* Entry Points / SKUD */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-industrial-text">
                    <span>{t("calculator.entryPoints") || "Eshiklar / SKUD Nuqtalari"}:</span>
                    <span className="font-mono text-industrial-orange font-extrabold">{entryPoints} ta</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    step={1}
                    value={entryPoints}
                    onChange={(e) => setEntryPoints(Number(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-industrial-orange"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                    <span>1 nuqta</span>
                    <span>10 nuqta</span>
                    <span>20 nuqta</span>
                  </div>
                </div>
              </div>

              {/* Step 3: Resolution & Storage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Camera Resolution */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-industrial-text flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-industrial-blue" />
                    <span>{t("calculator.cameraRes") || "Kamera Aniqligi"}:</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "2mp", label: "2MP Full HD" },
                      { id: "4mp", label: "4MP Ultra HD" },
                      { id: "8mp", label: "8MP 4K UHD" },
                    ].map((res) => (
                      <button
                        key={res.id}
                        type="button"
                        onClick={() => setCameraRes(res.id as any)}
                        className={`py-2 px-1 text-[11px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                          cameraRes === res.id
                            ? "bg-industrial-blue text-white border-industrial-blue shadow-xs"
                            : "bg-white text-industrial-text border-industrial-border hover:bg-gray-50"
                        }`}
                      >
                        {res.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Storage Days */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-industrial-text">
                    Video Yozuv Saqlash Muddati:
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[7, 14, 30, 60].map((days) => (
                      <button
                        key={days}
                        type="button"
                        onClick={() => setStorageDays(days)}
                        className={`py-2 text-[11px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                          storageDays === days
                            ? "bg-industrial-blue text-white border-industrial-blue shadow-xs"
                            : "bg-white text-industrial-text border-industrial-border hover:bg-gray-50"
                        }`}
                      >
                        {days} kun
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 4: Additional Systems */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-industrial-text">
                  Qo'shimcha Tizimlar:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <label
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all ${
                      needsSkud ? "bg-emerald-50/70 border-emerald-300 text-emerald-900" : "bg-white border-industrial-border text-industrial-text"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={needsSkud}
                      onChange={(e) => setNeedsSkud(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 accent-emerald-600"
                    />
                    <span className="text-xs font-semibold">SKUD / Biometriya</span>
                  </label>

                  <label
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all ${
                      needsFireAlarm ? "bg-amber-50/70 border-amber-300 text-amber-900" : "bg-white border-industrial-border text-industrial-text"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={needsFireAlarm}
                      onChange={(e) => setNeedsFireAlarm(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-600 accent-amber-600"
                    />
                    <span className="text-xs font-semibold">Yong'in Signalizatsiyasi</span>
                  </label>

                  <label
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all ${
                      needsIntercom ? "bg-sky-50/70 border-sky-300 text-sky-900" : "bg-white border-industrial-border text-industrial-text"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={needsIntercom}
                      onChange={(e) => setNeedsIntercom(e.target.checked)}
                      className="w-4 h-4 rounded text-sky-600 accent-sky-600"
                    />
                    <span className="text-xs font-semibold">IP Domofon / Interkom</span>
                  </label>
                </div>
              </div>

              {/* Real-Time Price Estimate Highlight Banner */}
              <div className="bg-gradient-to-r from-industrial-blue/10 via-industrial-surface-low to-industrial-orange/10 p-4 rounded-xl border border-industrial-blue/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="space-y-0.5 text-center sm:text-left">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-industrial-text-muted flex items-center gap-1 justify-center sm:justify-start">
                    <Sparkles className="w-3.5 h-3.5 text-industrial-orange" />
                    <span>Hisoblangan Taxminiy Smeta Qiymati:</span>
                  </div>
                  <div className="text-lg sm:text-2xl font-black font-mono text-industrial-blue">
                    {formatPrice(estimatedMin, "UZS")} – {formatPrice(estimatedMax, "UZS")}
                  </div>
                </div>
                <div className="text-center sm:text-right text-[11px] text-industrial-text-muted">
                  <div>Tavsiya: <span className="font-bold text-industrial-text">{camerasCount} ta kamera</span></div>
                  <div>NVR registrator va kabellar kiritilgan</div>
                </div>
              </div>

              {/* Step 5: Contact Lead Form */}
              <div className="space-y-3 pt-1 border-t border-industrial-border">
                <div className="text-xs font-black uppercase text-industrial-blue tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-industrial-blue text-white inline-flex items-center justify-center text-[10px]">2</span>
                  <span>{t("calculator.modalTitle") || "Smeta hisobotini rasmiy olish uchun ma'lumotlaringiz"}</span>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-industrial-text flex items-center gap-1">
                      <User className="w-3 h-3 text-industrial-orange" />
                      <span>{t("calculator.nameLabel") || "Ismingiz"} *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t("calculator.namePlaceholder") || "Masalan: Jamshidbek"}
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full p-2.5 text-xs border border-industrial-border rounded-lg bg-industrial-surface-low focus:bg-white focus:outline-none focus:border-industrial-blue font-medium"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-industrial-text flex items-center gap-1">
                      <Phone className="w-3 h-3 text-industrial-orange" />
                      <span>{t("calculator.phoneLabel") || "Telefon raqamingiz"} *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+998 90 123 45 67"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full p-2.5 text-xs border border-industrial-border rounded-lg bg-industrial-surface-low focus:bg-white focus:outline-none focus:border-industrial-blue font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Company */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-industrial-text">
                      {t("calculator.companyLabel") || "Kompaniya / Tashkilot nomi (Ixtiyoriy)"}
                    </label>
                    <input
                      type="text"
                      placeholder={t("calculator.companyPlaceholder") || "Masalan: Orient Industrial MChJ"}
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      className="w-full p-2.5 text-xs border border-industrial-border rounded-lg bg-industrial-surface-low focus:bg-white focus:outline-none focus:border-industrial-blue font-medium"
                    />
                  </div>

                  {/* Additional notes */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-industrial-text">
                      Qo'shimcha talab yoki manzil:
                    </label>
                    <input
                      type="text"
                      placeholder="Masalan: Toshkent shahar, montaj xizmati bilan"
                      value={clientComment}
                      onChange={(e) => setClientComment(e.target.value)}
                      className="w-full p-2.5 text-xs border border-industrial-border rounded-lg bg-industrial-surface-low focus:bg-white focus:outline-none focus:border-industrial-blue font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-industrial-orange hover:bg-industrial-orange-dark text-white font-black py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all uppercase tracking-wide cursor-pointer h-12"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t("calculator.submittingBtn") || "Yuborilmoqda..."}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t("calculator.submitBtn") || "Smeta Hisobotini Rasmiylashtirish"}</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
