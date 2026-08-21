"use client";

import React, { useState } from "react";
import { Calculator, CheckCircle, Cpu, ArrowRight, X, Phone, User, CheckCircle2 } from "lucide-react";
import { CalculatorPayload, CalculatorResult } from "@/shared/types";
import { calculateSecuritySolution, createLead } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n/context";

export function SolutionCalculator() {
  const { t } = useTranslation();
  const [payload, setPayload] = useState<CalculatorPayload>({
    objectType: "office",
    areaSqM: 150,
    entryPointsCount: 2,
    cameraResolution: "4mp",
    storageDays: 14,
    needsAccessControl: true,
    needsFireAlarm: false,
    needsIntercom: true,
  });

  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [loading, setLoading] = useState(false);

  // Lead modal state
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadCompany, setLeadCompany] = useState("");
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await calculateSecuritySolution(payload);
    setResult(res);
    setLoading(false);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    setLeadSubmitting(true);
    await createLead({
      clientName: leadName,
      phone: leadPhone,
      company: leadCompany,
      objectType: payload.objectType,
      areaSqM: payload.areaSqM,
      estimatedPriceMin: result?.estimatedPriceMin,
      estimatedPriceMax: result?.estimatedPriceMax,
      message: `Kalkulyator Smeta: ${result?.recommendedPackage} (${payload.areaSqM} m², ${payload.entryPointsCount} nuqta, ${payload.cameraResolution})`,
    });
    setLeadSubmitting(false);
    setLeadSuccess(true);
  };

  return (
    <section id="calculator" className="py-14 bg-white border-b border-industrial-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-extrabold uppercase text-industrial-orange tracking-widest flex items-center justify-center gap-1.5">
            <Calculator className="w-4 h-4" />
            {t("calculator.badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-industrial-text tracking-tight">
            {t("calculator.title")}
          </h2>
          <p className="text-sm text-industrial-text-muted">
            {t("calculator.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Calculator Input Form */}
          <div className="lg:col-span-7">
            <Card className="p-6 bg-industrial-surface-low border-2 border-industrial-border">
              <form onSubmit={handleCalculate} className="space-y-6">
                {/* Object Type */}
                <div>
                  <label className="block text-xs font-bold uppercase text-industrial-text mb-2">
                    1. {t("calculator.objectType")}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: "office", label: t("calculator.objectTypes.office") },
                      { id: "warehouse", label: t("calculator.objectTypes.warehouse") },
                      { id: "industrial", label: t("calculator.objectTypes.industrial") },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          setPayload({ ...payload, objectType: item.id as any })
                        }
                        className={`p-3 text-xs font-bold rounded border text-left transition-all cursor-pointer ${
                          payload.objectType === item.id
                            ? "bg-industrial-blue text-white border-industrial-blue shadow-sm"
                            : "bg-white text-industrial-text border-industrial-border hover:border-industrial-blue"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Area & Entry points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-industrial-text mb-1">
                      {t("calculator.area")}: <span className="text-industrial-orange font-extrabold">{payload.areaSqM} m²</span>
                    </label>
                    <input
                      type="range"
                      min={20}
                      max={2000}
                      step={10}
                      value={payload.areaSqM}
                      onChange={(e) =>
                        setPayload({ ...payload, areaSqM: Number(e.target.value) })
                      }
                      className="w-full accent-industrial-blue cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-industrial-text mb-1">
                      {t("calculator.entryPoints")}: <span className="text-industrial-orange font-extrabold">{payload.entryPointsCount}</span>
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={payload.entryPointsCount}
                      onChange={(e) =>
                        setPayload({
                          ...payload,
                          entryPointsCount: Number(e.target.value),
                        })
                      }
                      className="w-full p-2 text-sm rounded border border-industrial-border bg-white font-bold"
                    />
                  </div>
                </div>

                {/* Camera Quality */}
                <div>
                  <label className="block text-xs font-bold uppercase text-industrial-text mb-2">
                    {t("calculator.cameraRes")}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "2mp", label: "2MP Full HD" },
                      { id: "4mp", label: "4MP Super HD" },
                      { id: "8mp_4k", label: "8MP 4K Ultra HD" },
                    ].map((res) => (
                      <button
                        key={res.id}
                        type="button"
                        onClick={() =>
                          setPayload({ ...payload, cameraResolution: res.id as any })
                        }
                        className={`p-2.5 text-xs font-bold rounded border text-center transition-all cursor-pointer ${
                          payload.cameraResolution === res.id
                            ? "bg-industrial-orange text-white border-industrial-orange shadow-sm"
                            : "bg-white text-industrial-text border-industrial-border"
                        }`}
                      >
                        {res.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Modules */}
                <div>
                  <label className="block text-xs font-bold uppercase text-industrial-text mb-2">
                    {t("calculator.additionalModules")}
                  </label>
                  <div className="flex flex-wrap gap-4 text-xs font-semibold">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={payload.needsAccessControl}
                        onChange={(e) =>
                          setPayload({ ...payload, needsAccessControl: e.target.checked })
                        }
                        className="w-4 h-4 accent-industrial-blue"
                      />
                      <span>{t("calculator.needsAccessControl")}</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={payload.needsFireAlarm}
                        onChange={(e) =>
                          setPayload({ ...payload, needsFireAlarm: e.target.checked })
                        }
                        className="w-4 h-4 accent-industrial-blue"
                      />
                      <span>{t("calculator.needsFireAlarm")}</span>
                    </label>
                  </div>
                </div>

                <Button type="submit" variant="cta" size="lg" className="w-full gap-2 text-base font-extrabold">
                  {loading ? t("calculator.calculating") : t("calculator.calculateBtn")}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </form>
            </Card>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5">
            {result ? (
              <Card className="bg-industrial-blue text-white p-6 shadow-xl border-0 space-y-4 animate-in fade-in duration-300">
                <CardHeader className="p-0 pb-4 border-b border-white/20">
                  <span className="text-xs text-industrial-orange font-extrabold uppercase tracking-wider">
                    {t("calculator.resultTitle")}
                  </span>
                  <CardTitle className="text-xl font-extrabold text-white mt-1">
                    {result.recommendedPackage}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-2 space-y-4">
                  <div className="bg-white/10 p-4 rounded border border-white/20">
                    <div className="text-xs text-slate-200">{t("calculator.estimatedCost")}:</div>
                    <div className="text-2xl font-extrabold text-industrial-orange mt-1">
                      {formatPrice(result.estimatedPriceMin)} - {formatPrice(result.estimatedPriceMax)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      {t("calculator.includedProducts")}:
                    </div>
                    <ul className="space-y-2 text-xs">
                      {result.suggestedProducts.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between items-center bg-white/5 p-2 rounded"
                        >
                          <span className="font-semibold text-slate-100">
                            {item.name} ({item.quantity})
                          </span>
                          <span className="font-extrabold text-industrial-orange">
                            {formatPrice(item.unitPrice * item.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    type="button"
                    onClick={() => {
                      setIsLeadModalOpen(true);
                      setLeadSuccess(false);
                    }}
                    variant="cta"
                    className="w-full gap-2 text-sm mt-4 font-extrabold py-3"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{t("calculator.submitLeadBtn")}</span>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-industrial-surface-low border-2 border-dashed border-industrial-border p-8 text-center flex flex-col items-center justify-center space-y-3">
                <Cpu className="w-12 h-12 text-industrial-blue opacity-50" />
                <h3 className="font-bold text-industrial-text text-base">
                  {t("calculator.resultTitle")}
                </h3>
                <p className="text-xs text-industrial-text-muted max-w-xs">
                  {t("calculator.subtitle")}
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Lead Submission Modal Dialog */}
      {isLeadModalOpen && (
        <div
          onClick={() => setIsLeadModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-industrial-border relative space-y-5"
          >
            <button
              onClick={() => setIsLeadModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-industrial-text p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {leadSuccess ? (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-industrial-blue">{t("calculator.submitSuccess")}</h3>
                <p className="text-xs text-industrial-text-muted">
                  <span className="font-bold text-industrial-text">{leadPhone}</span>
                </p>
                <Button
                  variant="cta"
                  onClick={() => setIsLeadModalOpen(false)}
                  className="w-full font-bold text-xs"
                >
                  {t("calculator.closeBtn")}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] font-mono font-bold text-industrial-orange uppercase">
                    {t("calculator.badge")}
                  </span>
                  <h3 className="text-lg font-black text-industrial-text mt-0.5">
                    {t("calculator.modalTitle")}
                  </h3>
                  <p className="text-xs text-industrial-text-muted mt-1">
                    {t("calculator.modalDesc")}
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-industrial-text flex items-center gap-1.5 mb-1">
                      <User className="w-3.5 h-3.5 text-industrial-orange" /> {t("calculator.nameLabel")} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t("calculator.namePlaceholder")}
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full p-2.5 border border-industrial-border rounded bg-industrial-surface-low text-xs font-semibold focus:outline-none focus:border-industrial-blue"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-industrial-text flex items-center gap-1.5 mb-1">
                      <Phone className="w-3.5 h-3.5 text-industrial-orange" /> {t("calculator.phoneLabel")} *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={t("calculator.phonePlaceholder")}
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="w-full p-2.5 border border-industrial-border rounded bg-industrial-surface-low text-xs font-semibold focus:outline-none focus:border-industrial-blue"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-industrial-text block mb-1">
                      {t("calculator.companyLabel")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("calculator.companyPlaceholder")}
                      value={leadCompany}
                      onChange={(e) => setLeadCompany(e.target.value)}
                      className="w-full p-2.5 border border-industrial-border rounded bg-industrial-surface-low text-xs font-semibold focus:outline-none focus:border-industrial-blue"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="cta"
                  disabled={leadSubmitting}
                  className="w-full py-3 text-xs font-extrabold"
                >
                  {leadSubmitting ? t("calculator.submittingBtn") : t("calculator.submitBtn")}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
