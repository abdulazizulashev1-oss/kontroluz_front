"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations, TranslationDictionary } from "./translations";

interface LanguageContextType {
  locale: Language;
  setLocale: (lang: Language) => void;
  t: (path: string) => string;
  dict: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "kontrol_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Language>("uz");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY) as Language;
      if (savedLang && (savedLang === "uz" || savedLang === "ru" || savedLang === "en")) {
        setLocaleState(savedLang);
      }
    } catch (e) {
      console.warn("Could not access localStorage for language preference.");
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const setLocale = (lang: Language) => {
    setLocaleState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      console.warn("Could not save language preference to localStorage.");
    }
  };

  const dict = translations[locale] || translations.uz;

  const t = (path: string): string => {
    const keys = path.split(".");
    let current: any = dict;
    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        return path;
      }
    }
    return typeof current === "string" ? current : path;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, dict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
