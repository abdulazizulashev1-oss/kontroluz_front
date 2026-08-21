"use client";

import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, Phone, User, Building2, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n/context";
import { createLead, fetchCategories } from "@/lib/api";
import { Category } from "@/shared/types";

export function ContactForm() {
  const { t, locale } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    category: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadCategories() {
      try {
        const cats = await fetchCategories(locale);
        if (isMounted && cats && cats.length > 0) {
          setCategories(cats);
          setFormData((prev) => ({
            ...prev,
            category: prev.category || cats[0].name,
          }));
        }
      } catch (err) {
        // Fallback handled
      }
    }
    loadCategories();
    return () => {
      isMounted = false;
    };
  }, [locale]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const res = await createLead({
      clientName: formData.name,
      phone: formData.phone,
      company: formData.company,
      category: formData.category,
      message: formData.message,
    });

    setLoading(false);
    if (res.success) {
      setSubmitted(true);
    } else {
      setErrorMsg(res.error || "Arizani yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    }
  };

  if (submitted) {
    return (
      <Card className="p-8 bg-white border border-emerald-200 shadow-md text-center space-y-4 animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-industrial-blue">{t("contact.successMessage")}</h3>
        <p className="text-xs text-industrial-text-muted max-w-md mx-auto leading-relaxed">
          Hurmatli <span className="font-bold text-industrial-text">{formData.name}</span>, arizangiz muvaffaqiyatli qabul qilindi. Tez orada mutaxassislarimiz <span className="font-bold text-industrial-blue">{formData.phone}</span> raqami orqali siz bilan bog'lanishadi.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", phone: "", company: "", category: "videokuzatuv", message: "" });
          }}
          className="text-xs font-bold border-industrial-blue text-industrial-blue hover:bg-industrial-blue hover:text-white"
        >
          {t("contact.sendBtn")}
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:p-8 bg-white border border-industrial-border shadow-sm space-y-6">
      <div className="border-b border-industrial-border pb-4">
        <h2 className="text-xl sm:text-2xl font-black text-industrial-blue">
          {t("contact.title")}
        </h2>
        <p className="text-xs text-industrial-text-muted mt-1">
          {t("contact.subtitle")}
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="font-bold text-industrial-text flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-industrial-orange" />
              <span>{t("contact.nameLabel")} *</span>
            </label>
            <input
              type="text"
              required
              placeholder={t("contact.namePlaceholder")}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border border-industrial-border rounded bg-industrial-surface-low text-industrial-text focus:outline-none focus:border-industrial-blue text-xs font-medium"
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-1.5">
            <label className="font-bold text-industrial-text flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-industrial-orange" />
              <span>{t("contact.phoneLabel")} *</span>
            </label>
            <input
              type="tel"
              required
              placeholder={t("contact.phonePlaceholder")}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-3 border border-industrial-border rounded bg-industrial-surface-low text-industrial-text focus:outline-none focus:border-industrial-blue text-xs font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Company Name */}
          <div className="space-y-1.5">
            <label className="font-bold text-industrial-text flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-industrial-blue" />
              <span>{t("contact.companyLabel")}</span>
            </label>
            <input
              type="text"
              placeholder={t("contact.companyPlaceholder")}
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full p-3 border border-industrial-border rounded bg-industrial-surface-low text-industrial-text focus:outline-none focus:border-industrial-blue text-xs font-medium"
            />
          </div>

          {/* Category Select */}
          <div className="space-y-1.5">
            <label className="font-bold text-industrial-text flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-industrial-blue" />
              <span>{t("categories.title")}</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-3 border border-industrial-border rounded bg-industrial-surface-low text-industrial-text focus:outline-none focus:border-industrial-blue text-xs font-bold cursor-pointer"
            >
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat.id || cat.slug} value={cat.name}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <>
                  <option value="Elektr Hisoblagichlar">Elektr Hisoblagichlar</option>
                  <option value="Pnevmatika va Fitinglar">Pnevmatika va Fitinglar</option>
                  <option value="KIPiA va Avtomatika">KIPiA va Avtomatika</option>
                  <option value="Videokuzatuv Tizimlari">Videokuzatuv Tizimlari</option>
                  <option value="Kirishni Boshqarish (SKUD)">Kirishni Boshqarish (SKUD)</option>
                  <option value="Yong'in Xavfsizligi">Yong'in Xavfsizligi</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Message Field */}
        <div className="space-y-1.5">
          <label className="font-bold text-industrial-text">{t("contact.messageLabel")}</label>
          <textarea
            rows={4}
            placeholder={t("contact.messagePlaceholder")}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full p-3 border border-industrial-border rounded bg-industrial-surface-low text-industrial-text focus:outline-none focus:border-industrial-blue text-xs font-medium"
          />
        </div>

        <Button
          type="submit"
          variant="cta"
          disabled={loading}
          className="w-full py-3.5 text-sm font-extrabold gap-2"
        >
          <Send className="w-4 h-4" />
          <span>{loading ? t("contact.sendingBtn") : t("contact.sendBtn")}</span>
        </Button>
      </form>
    </Card>
  );
}
