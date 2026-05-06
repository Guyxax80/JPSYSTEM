"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Language } from "@/i18n/translations";
import { translations } from "@/i18n/translations";

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (typeof translations)[Language];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "jst-lang";

/** Apply dot-notation overrides to a nested object */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyOverrides(base: any, overrides: Record<string, string>): any {
  const result = JSON.parse(JSON.stringify(base));
  for (const [dotKey, value] of Object.entries(overrides)) {
    const keys = dotKey.split(".");
    let obj = result;
    for (let i = 0; i < keys.length - 1; i++) {
      if (obj[keys[i]] === undefined) break;
      obj = obj[keys[i]];
    }
    const lastKey = keys[keys.length - 1];
    if (obj && lastKey in obj) {
      obj[lastKey] = value;
    }
  }
  return result;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const [textOverrides, setTextOverrides] = useState<Record<string, Record<string, string>>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = window.localStorage.getItem(STORAGE_KEY) as Language | null;

    if (saved && saved in translations) {
      setLangState(saved);
      return;
    }

    // Auto-detect: Japanese browser → "jp", everything else → "en"
    const browserLang = navigator.language || "";
    const detected: Language = browserLang.startsWith("ja") ? "jp" : "en";
    setLangState(detected);
  }, []);

  // Load text overrides from API
  useEffect(() => {
    fetch("/api/admin/text")
      .then((r) => r.json())
      .then((data) => {
        if (data.overrides) setTextOverrides(data.overrides);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.dataset.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(() => {
    const base = translations[lang];
    const langOverrides = textOverrides[lang] || {};
    const merged = Object.keys(langOverrides).length > 0
      ? applyOverrides(base, langOverrides)
      : base;

    return {
      lang,
      setLang: (next) => setLangState(next),
      t: merged,
    };
  }, [lang, textOverrides]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

