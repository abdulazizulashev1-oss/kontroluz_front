"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";
import { Language } from "@/lib/i18n/translations";

export function LanguageDropdown() {
  const router = useRouter();
  const { locale, setLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string; flag: string; name: string }[] = [
    { code: "ru", label: "RU", flag: "🇷🇺", name: "Русский" },
    { code: "uz", label: "UZ", flag: "🇺🇿", name: "O'zbekcha" },
    { code: "en", label: "EN", flag: "🇬🇧", name: "English" },
  ];

  const activeLang = languages.find((l) => l.code === locale) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Dropdown Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-lg bg-white border border-gray-300 hover:border-industrial-blue text-industrial-blue shadow-xs transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-industrial-blue"
      >
        <Globe className="w-3.5 h-3.5 text-industrial-blue" />
        <span className="text-[13px]">{activeLang.flag}</span>
        <span className="font-mono">{activeLang.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-industrial-orange" : "text-gray-500"
          }`}
        />
      </button>

      {/* Floating Dropdown Options Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-industrial-border rounded-xl shadow-xl z-50 py-1.5 font-bold text-xs animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-industrial-text-muted font-extrabold border-b border-gray-100">
            Tilni tanlang / Язык:
          </div>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLocale(lang.code);
                setIsOpen(false);
                router.refresh();
              }}
              className={`w-full text-left px-3 py-2 flex items-center justify-between transition-colors ${
                locale === lang.code
                  ? "bg-industrial-blue/10 text-industrial-blue font-black"
                  : "text-gray-700 hover:bg-industrial-surface-low hover:text-industrial-blue"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">{lang.flag}</span>
                <span className="font-semibold text-xs">{lang.name}</span>
              </div>
              {locale === lang.code && <Check className="w-4 h-4 text-industrial-blue shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
