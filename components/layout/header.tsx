"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart/cart-context";
import { Language } from "@/lib/i18n/translations";

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
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-industrial-blue"
      >
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
}

function MobileSearchBarContent({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("search") || "");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      router.push(`/katalog?search=${encodeURIComponent(query)}`);
      onClose();
    } else {
      router.push("/katalog");
      onClose();
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="relative">
      <Input
        type="text"
        placeholder={t("nav.searchPlaceholder")}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pr-10"
      />
      <button
        type="submit"
        className="absolute right-3 top-3 text-gray-400 hover:text-industrial-blue"
      >
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
}

import { LanguageDropdown } from "@/components/layout/language-dropdown";

export function Header() {
  const { locale, setLocale, t } = useTranslation();
  const { totalCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full flex flex-col z-50 bg-white shadow-sm border-b border-industrial-border">
      {/* 1. Top Row: Info Bar & Language Selector */}
      <div className="border-b border-gray-200/80 py-2 bg-industrial-surface-low text-xs text-industrial-text-muted">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 cursor-pointer group">
              <MapPin className="w-4 h-4 text-industrial-blue" />
              <span className="font-bold text-industrial-blue border-b border-dotted border-industrial-blue group-hover:text-industrial-orange">
                Toshkent
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>Servis va Sklad markazi</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5">
              <span>{t("nav.workingHours")}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Language Switcher Dropdown */}
            <LanguageDropdown />

            <a
              href="tel:+998712006800"
              className="text-sm font-extrabold text-industrial-text hover:text-industrial-blue"
            >
              {t("nav.phone")}
            </a>
            <a
              href="mailto:info@kontrol.uz"
              className="hidden sm:flex items-center gap-1 border-b border-gray-300 hover:text-industrial-blue"
            >
              <Mail className="w-3.5 h-3.5 text-gray-500" />
              <span>info@kontrol.uz</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Middle Row: Branding & Primary CTAs */}
      <div className="py-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-6">
          {/* Logo & Call Back Button */}
          <div className="flex items-center gap-6 flex-1">
            <Link href="/" className="flex flex-col group">
              <span className="text-2xl sm:text-3xl font-black text-industrial-blue tracking-tight leading-none group-hover:text-industrial-blue-dark">
                KONTROL<span className="text-industrial-orange">.UZ</span>
              </span>
              <span className="text-[10px] text-industrial-text-muted uppercase tracking-widest font-bold mt-0.5">
                {t("hero.badge")}
              </span>
            </Link>

            <a href="tel:+998712006800" className="hidden xl:inline-block">
              <button className="border-2 border-industrial-blue text-industrial-blue px-4 py-2 rounded text-xs font-extrabold hover:bg-industrial-blue hover:text-white transition-colors">
                +998 71 200 68 00
              </button>
            </a>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <Link href="/#calculator" className="hidden sm:inline-block">
              <button className="bg-industrial-blue text-white px-4 py-2.5 rounded flex items-center gap-2 text-xs font-bold hover:bg-industrial-blue-dark transition-colors">
                <MessageSquare className="w-4 h-4 text-industrial-orange" />
                <span>{t("nav.calculator")}</span>
              </button>
            </Link>

            <Link href="/katalog" className="hidden md:inline-block">
              <button className="bg-industrial-orange text-white px-4 py-2.5 rounded text-xs font-extrabold uppercase leading-tight hover:bg-industrial-orange-dark transition-colors">
                {t("nav.catalog")}
              </button>
            </Link>

            <Link href="/kontaktlar" className="hidden md:inline-block">
              <button className="bg-industrial-blue-dark text-white px-4 py-2.5 rounded text-xs font-extrabold uppercase leading-tight hover:bg-black transition-colors">
                {t("nav.contacts")}
              </button>
            </Link>

            {/* Cart Button */}
            <Link href="/savat">
              <button className="bg-[#00a67e] hover:bg-[#008f6c] text-white p-3 rounded relative transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 bg-white text-[#00a67e] text-[11px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#00a67e]">
                  {totalCount}
                </span>
              </button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-industrial-text hover:text-industrial-blue"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Bottom Row: Navigation Links & Search */}
      <div className="bg-industrial-surface-low border-b border-gray-200 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-2.5">
          <nav className="flex items-center gap-8 font-bold text-sm text-industrial-text">
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
            <Link href="/#calculator" className="hover:text-industrial-blue transition-colors">
              {t("nav.calculator")}
            </Link>
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

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-industrial-border p-4 space-y-4">
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between bg-industrial-surface-low p-2.5 rounded-lg border border-industrial-border-subtle">
            <span className="text-xs font-bold text-industrial-text flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-industrial-blue" /> Til / Язык:
            </span>
            <LanguageDropdown />
          </div>

          <Suspense fallback={
            <div className="relative">
              <Input type="text" placeholder={t("nav.searchPlaceholder")} className="pr-10" disabled />
            </div>
          }>
            <MobileSearchBarContent onClose={() => setIsMobileMenuOpen(false)} />
          </Suspense>

          <nav className="flex flex-col gap-2 font-bold text-sm">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b">
              {t("nav.home")}
            </Link>
            <Link href="/katalog" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-industrial-blue border-b">
              {t("nav.catalog")}
            </Link>
            <Link href="/#calculator" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-industrial-orange border-b">
              {t("nav.calculator")}
            </Link>
            <Link href="/kontaktlar" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b">
              {t("nav.contacts")}
            </Link>
            <Link href="/savat" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-[#00a67e]">
              {t("nav.cart")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
