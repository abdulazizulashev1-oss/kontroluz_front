"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  ShoppingCart,
  Menu,
  X,
  Search,
  ChevronDown,
  Globe,
  Headphones,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart/cart-context";
import { LanguageDropdown } from "@/components/layout/language-dropdown";
import { DynamicWorkingHours } from "@/components/features/dynamic-working-hours";
import { SmetaModal } from "@/components/features/smeta-modal";
import { Logo } from "@/components/ui/logo";

function SearchBarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("search") || "");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      router.push(`/katalog?search=${encodeURIComponent(query)}`);
    } else {
      router.push("/katalog");
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="relative w-80">
      <Input
        type="text"
        placeholder={t("nav.searchPlaceholder")}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-4 pr-10 py-1.5 text-xs border border-industrial-border rounded bg-white focus:ring-1 focus:ring-industrial-blue"
      />
      <button
        type="submit"
        aria-label="Qidirish"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-industrial-blue"
      >
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
}

function MobileInlineSearchBar({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("search") || "");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      router.push(`/katalog?search=${encodeURIComponent(query)}`);
      onClose?.();
    } else {
      router.push("/katalog");
      onClose?.();
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="relative w-full">
      <Input
        type="text"
        placeholder={t("nav.searchPlaceholder")}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-3.5 pr-10 py-2 text-xs border border-industrial-border rounded-lg bg-industrial-surface-low/60 focus:bg-white focus:ring-1 focus:ring-industrial-blue w-full shadow-2xs"
      />
      <button
        type="submit"
        aria-label="Qidirish"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-industrial-blue"
      >
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
}

export function Header() {
  const router = useRouter();
  const { t } = useTranslation();
  const { totalCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSmetaModalOpen, setIsSmetaModalOpen] = useState(false);

  // Branch Selector Dropdown State
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const branchDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        branchDropdownRef.current &&
        !branchDropdownRef.current.contains(e.target as Node)
      ) {
        setIsBranchDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectBranch = (branchId: "qorasaroy" | "main-office") => {
    setIsBranchDropdownOpen(false);

    // Dispatch custom event for BranchLocationsMap
    window.dispatchEvent(
      new CustomEvent("select-branch-map", { detail: { branchId } })
    );

    // Scroll to contact section so user can get in touch & view branch map
    const contactEl =
      document.getElementById("contact-section") ||
      document.getElementById("contact") ||
      document.getElementById("branches-map");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push(`/#contact-section`);
    }
  };

  const handleScrollToContact = () => {
    const contactEl =
      document.getElementById("contact-section") ||
      document.getElementById("contact") ||
      document.getElementById("branches-map");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push(`/#contact-section`);
    }
  };

  return (
    <>
      <header className="w-full flex flex-col z-50 bg-white shadow-xs border-b border-industrial-border">
        {/* 1. Top Row: Compact, Responsive Info Bar */}
        <div className="border-b border-gray-200/80 py-1.5 sm:py-2 bg-industrial-surface-low text-xs text-industrial-text-muted">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: City & Branch Dropdown Selector */}
            <div className="flex items-center gap-3 sm:gap-6 min-w-0">
              <div className="relative shrink-0" ref={branchDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
                  className="flex items-center gap-1 cursor-pointer group text-left"
                  aria-expanded={isBranchDropdownOpen}
                  aria-label="Filialni tanlash"
                >
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-industrial-blue shrink-0" />
                  <span className="font-bold text-[11px] sm:text-xs text-industrial-blue border-b border-dotted border-industrial-blue group-hover:text-industrial-orange truncate">
                    {t("nav.city")}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 text-gray-500 shrink-0 transition-transform ${
                      isBranchDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu for 2 Branches */}
                {isBranchDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 z-50 bg-white border border-industrial-border rounded-xl shadow-2xl p-2 w-72 sm:w-80 animate-in fade-in slide-in-from-top-2 duration-150 space-y-1">
                    <div className="px-3 py-1.5 border-b border-gray-100 text-[10px] font-black uppercase text-industrial-blue tracking-wider flex items-center justify-between">
                      <span>{t("branches.mapSectionTitle")}</span>
                      <span className="text-industrial-orange font-mono font-bold">2 TA FILIAL</span>
                    </div>

                    {/* Branch 1 Option */}
                    <button
                      type="button"
                      onClick={() => handleSelectBranch("qorasaroy")}
                      className="w-full p-2.5 rounded-lg hover:bg-industrial-surface-low text-left transition-colors flex items-start gap-2.5 group/b cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-md bg-industrial-blue/10 text-industrial-blue flex items-center justify-center shrink-0 group-hover/b:bg-industrial-blue group-hover/b:text-white transition-colors mt-0.5">
                        <MapPin className="w-4 h-4 text-industrial-orange group-hover/b:text-white" />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <div className="font-extrabold text-xs text-industrial-text group-hover/b:text-industrial-blue transition-colors flex items-center gap-1.5">
                          <span>{t("branches.qorasaroy.name")}</span>
                          <span className="text-[9px] font-black bg-industrial-orange text-white px-1.5 py-0.2 rounded">
                            {t("branches.qorasaroy.badge")}
                          </span>
                        </div>
                        <p className="text-[11px] text-industrial-text-muted line-clamp-1">
                          {t("branches.qorasaroy.address")}
                        </p>
                      </div>
                    </button>

                    {/* Branch 2 Option */}
                    <button
                      type="button"
                      onClick={() => handleSelectBranch("main-office")}
                      className="w-full p-2.5 rounded-lg hover:bg-industrial-surface-low text-left transition-colors flex items-start gap-2.5 group/b cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-md bg-industrial-orange/10 text-industrial-blue flex items-center justify-center shrink-0 group-hover/b:bg-industrial-orange group-hover/b:text-white transition-colors mt-0.5">
                        <MapPin className="w-4 h-4 text-industrial-blue group-hover/b:text-white" />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <div className="font-extrabold text-xs text-industrial-text group-hover/b:text-industrial-blue transition-colors flex items-center gap-1.5">
                          <span>{t("branches.mainOffice.name")}</span>
                          <span className="text-[9px] font-black bg-industrial-blue text-white px-1.5 py-0.2 rounded">
                            {t("branches.mainOffice.badge")}
                          </span>
                        </div>
                        <p className="text-[11px] text-industrial-text-muted line-clamp-1">
                          {t("branches.mainOffice.address")}
                        </p>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleScrollToContact}
                className="hidden md:flex items-center gap-1.5 cursor-pointer hover:text-industrial-blue text-industrial-text transition-colors group"
                aria-label="Servis va ombor markaziga o'tish"
              >
                <MapPin className="w-4 h-4 text-industrial-orange shrink-0 group-hover:scale-110 transition-transform" />
                <span className="border-b border-dotted border-gray-400 group-hover:border-industrial-blue font-medium">
                  {t("nav.serviceCenter")}
                </span>
              </button>
              <div className="hidden lg:flex items-center">
                <DynamicWorkingHours variant="header" />
              </div>
            </div>

            {/* Right: Phone Number & Language Selector */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <a
                href="tel:+998781137027"
                className="text-[11px] sm:text-xs md:text-sm font-extrabold text-industrial-text hover:text-industrial-blue flex items-center gap-1 shrink-0"
              >
                <Phone className="w-3 h-3 text-industrial-orange sm:hidden" />
                <span>+998 78 113 70 27</span>
              </a>

              <div className="shrink-0">
                <LanguageDropdown />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Middle Row: Main Branding & Actions Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3 w-full">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo */}
            <Logo variant="header" />

            {/* Desktop Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Telegram Bot Button */}
              <a
                href="https://t.me/kontrol_uz_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-[#229ED9] hover:bg-[#1E88C7] text-white p-2 sm:px-3.5 sm:py-2.5 rounded-lg text-xs font-extrabold shadow-2xs hover:shadow-md transition-all group shrink-0"
                title="Telegram Bot (@kontrol_uz_bot)"
              >
                <svg
                  className="w-4 h-4 text-white fill-current group-hover:scale-110 transition-transform"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
                <span className="hidden xl:inline">Telegram Bot</span>
              </a>

              {/* Desktop Calculator Modal Trigger */}
              <button
                type="button"
                onClick={() => setIsSmetaModalOpen(true)}
                className="hidden sm:inline-flex bg-industrial-blue text-white px-3.5 py-2.5 rounded-lg items-center gap-1.5 text-xs font-bold hover:bg-industrial-blue-dark transition-all cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-industrial-orange" />
                <span>{t("nav.calculator")}</span>
              </button>

              <Link href="/katalog" className="hidden md:inline-block">
                <button className="bg-industrial-orange text-white px-3.5 py-2.5 rounded-lg text-xs font-extrabold uppercase leading-tight hover:bg-industrial-orange-dark transition-colors cursor-pointer">
                  {t("nav.catalog")}
                </button>
              </Link>

              <Link href="/kontaktlar" className="hidden lg:inline-block">
                <button className="bg-industrial-blue-dark text-white px-3.5 py-2.5 rounded-lg text-xs font-extrabold uppercase leading-tight hover:bg-black transition-colors cursor-pointer">
                  {t("nav.contacts")}
                </button>
              </Link>

              {/* Cart Button */}
              <Link href="/savat" className="shrink-0">
                <button
                  className="bg-[#00a67e] hover:bg-[#008f6c] text-white p-2 sm:p-2.5 rounded-lg relative transition-all flex items-center justify-center cursor-pointer"
                  aria-label="Xarid Savati"
                >
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-[#00a67e] text-[10px] sm:text-[11px] font-black w-4.5 h-4.5 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border-2 border-[#00a67e] shadow-2xs">
                    {totalCount}
                  </span>
                </button>
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 text-industrial-text hover:text-industrial-blue rounded-lg hover:bg-industrial-surface-low transition-colors cursor-pointer"
                aria-label="Menyu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Quick Search Bar (Prominently visible on mobile screens) */}
          <div className="px-3 pt-2 pb-1 lg:hidden">
            <Suspense fallback={<div className="h-9 bg-gray-100 rounded-lg animate-pulse" />}>
              <MobileInlineSearchBar />
            </Suspense>
          </div>
        </div>

        {/* 3. Bottom Row: Desktop Navigation Links & Search */}
        <div className="bg-industrial-surface-low border-t border-gray-200 hidden lg:block">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-2">
            <nav className="flex items-center gap-7 font-bold text-sm text-industrial-text">
              <Link
                href="/"
                className="flex items-center gap-1.5 text-industrial-blue hover:text-industrial-orange transition-colors"
              >
                <span>{t("nav.home")}</span>
              </Link>
              <Link
                href="/katalog"
                className="flex items-center gap-1.5 hover:text-industrial-blue transition-colors"
              >
                <Menu className="w-4 h-4 text-industrial-orange" />
                <span>{t("nav.catalog")}</span>
              </Link>
              <button
                type="button"
                onClick={() => setIsSmetaModalOpen(true)}
                className="hover:text-industrial-blue transition-colors cursor-pointer font-bold"
              >
                {t("nav.calculator")}
              </button>
              <Link href="/kontaktlar" className="hover:text-industrial-blue transition-colors">
                {t("nav.contacts")}
              </Link>
              <Link href="/savat" className="hover:text-industrial-blue transition-colors">
                {t("nav.cart")}
              </Link>
            </nav>

            <Suspense fallback={
              <div className="relative w-80">
                <Input type="text" placeholder={t("nav.searchPlaceholder")} className="pl-4 pr-10 py-1.5 text-xs border border-industrial-border rounded bg-white" disabled />
              </div>
            }>
              <SearchBarContent />
            </Suspense>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-industrial-border py-4 px-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-2 text-sm font-bold text-industrial-text">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg hover:bg-industrial-surface-low border-b border-gray-100 flex items-center justify-between"
              >
                <span>{t("nav.home")}</span>
              </Link>
              <Link
                href="/katalog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg hover:bg-industrial-surface-low border-b border-gray-100 flex items-center justify-between text-industrial-blue"
              >
                <span>{t("nav.catalog")}</span>
                <span className="text-xs bg-industrial-blue/10 px-2 py-0.5 rounded text-industrial-blue font-mono">TOP</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSmetaModalOpen(true);
                }}
                className="w-full text-left py-2.5 px-3 rounded-lg hover:bg-industrial-surface-low border-b border-gray-100 flex items-center justify-between text-industrial-orange font-bold cursor-pointer"
              >
                <span>{t("nav.calculator")}</span>
              </button>
              <Link
                href="/kontaktlar"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg hover:bg-industrial-surface-low border-b border-gray-100 flex items-center justify-between"
              >
                <span>{t("nav.contacts")}</span>
              </Link>
              <Link
                href="/savat"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg hover:bg-emerald-50 text-[#00a67e] flex items-center justify-between"
              >
                <span>{t("nav.cart")}</span>
                <span className="text-xs bg-[#00a67e] text-white px-2 py-0.5 rounded-full font-mono">{totalCount}</span>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Global Smeta Calculator Modal */}
      <SmetaModal
        isOpen={isSmetaModalOpen}
        onClose={() => setIsSmetaModalOpen(false)}
      />
    </>
  );
}
