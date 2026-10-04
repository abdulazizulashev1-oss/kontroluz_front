"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Send,
  CheckCircle2,
  User,
  Phone,
  Building2,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";
import { createLead } from "@/lib/api";

interface SmetaModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function SmetaModal({ isOpen: propIsOpen, onClose }: SmetaModalProps) {
  const { t } = useTranslation();
  const [internalOpen, setInternalOpen] = useState(false);

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
      setIsSubmitted(false);
      setClientName("");
      setClientPhone("+998 ");
      setClientCompany("");
      setClientComment("");
    }
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || clientPhone.length < 9) {
      setErrorMsg("Iltimos, ismingiz va to'liq telefon raqamingizni kiriting.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const res = await createLead({
      clientName: clientName.trim(),
      phone: clientPhone.trim(),
      company: clientCompany.trim() || undefined,
      category: "Ariza Yuborish",
      message: clientComment.trim() || "Veb-saytdan yangi ariza kelib tushdi",
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
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-industrial-border overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-industrial-blue to-industrial-blue-dark text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shadow-inner text-industrial-orange">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                <span>{t("nav.calculator") || "Ariza Yuborish"}</span>
              </h3>
              <p className="text-[11px] sm:text-xs text-white/80 line-clamp-1">
                Arizangizni qoldiring, mutaxassislarimiz tez orada siz bilan bog'lanishadi
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
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {isSubmitted ? (
            <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-black text-industrial-blue">
                  Arizangiz Qabul Qilindi!
                </h4>
                <p className="text-xs sm:text-sm text-industrial-text-muted max-w-sm mx-auto leading-relaxed">
                  Hurmatli <span className="font-bold text-industrial-text">{clientName}</span>, arizangiz muvaffaqiyatli qabul qilindi. Tez orada mutaxassisimiz{" "}
                  <span className="font-bold text-industrial-blue">{clientPhone}</span> raqamingizga bog'lanadi.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  onClick={handleClose}
                  className="bg-industrial-blue hover:bg-industrial-blue-dark text-white px-8 py-2.5 rounded-lg font-bold text-xs"
                >
                  Tushunarli, rahmat
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitLead} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-industrial-text flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-industrial-orange" />
                  <span>Ismingiz *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Jamshidbek"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full p-2.5 text-xs border border-industrial-border rounded-lg bg-industrial-surface-low focus:bg-white focus:outline-none focus:border-industrial-blue font-medium transition-colors"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-industrial-text flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-industrial-orange" />
                  <span>Telefon raqamingiz *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+998 90 123 45 67"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full p-2.5 text-xs border border-industrial-border rounded-lg bg-industrial-surface-low focus:bg-white focus:outline-none focus:border-industrial-blue font-bold text-industrial-blue transition-colors"
                />
              </div>

              {/* Company */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-industrial-text flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-industrial-blue" />
                  <span>Kompaniya / Korxona nomi (Ixtiyoriy)</span>
                </label>
                <input
                  type="text"
                  placeholder="Masalan: Orient Industrial MChJ"
                  value={clientCompany}
                  onChange={(e) => setClientCompany(e.target.value)}
                  className="w-full p-2.5 text-xs border border-industrial-border rounded-lg bg-industrial-surface-low focus:bg-white focus:outline-none focus:border-industrial-blue font-medium transition-colors"
                />
              </div>

              {/* Additional notes */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-industrial-text">
                  Qo'shimcha talab yoki xabar:
                </label>
                <textarea
                  rows={3}
                  placeholder="Qanday uskunalar yoki xizmat kerakligi haqida qisqacha yozing..."
                  value={clientComment}
                  onChange={(e) => setClientComment(e.target.value)}
                  className="w-full p-2.5 text-xs border border-industrial-border rounded-lg bg-industrial-surface-low focus:bg-white focus:outline-none focus:border-industrial-blue font-medium resize-none transition-colors"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-industrial-orange hover:bg-industrial-orange/90 text-white font-black py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all uppercase tracking-wide cursor-pointer h-11"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Yuborilmoqda...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t("nav.calculator") || "Arizani Yuborish"}</span>
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
