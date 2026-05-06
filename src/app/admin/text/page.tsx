"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Save, RefreshCw, ArrowLeft, Globe, Check, X } from "lucide-react";
import Link from "next/link";
import type { Language } from "@/i18n/translations";
import { translations } from "@/i18n/translations";

/* ------------------------------------------------------------------ */
/*  Editable fields registry (dot-notation key → Thai label)          */
/* ------------------------------------------------------------------ */
const EDITABLE_FIELDS: Record<string, { section: string; label: string; multiline?: boolean }> = {
  // Brand
  "brand": { section: "ทั่วไป", label: "ชื่อบริษัท" },
  // Common
  "common.addressValue": { section: "ทั่วไป", label: "ที่อยู่" },
  "common.email": { section: "ทั่วไป", label: "Email Label" },
  "common.phone": { section: "ทั่วไป", label: "Phone Label" },
  "common.copyright": { section: "ทั่วไป", label: "Copyright" },
  // Home
  "pages.home.hero.title": { section: "Home", label: "Hero Title" },
  "pages.home.hero.subtitle": { section: "Home", label: "Hero Subtitle", multiline: true },
  // Company
  "pages.company.title": { section: "Company Profile", label: "หัวข้อหน้า" },
  "pages.company.subtitle": { section: "Company Profile", label: "คำบรรยาย", multiline: true },
  "pages.company.about.title": { section: "Company Profile", label: "About Title" },
  "pages.company.about.body": { section: "Company Profile", label: "About Body", multiline: true },
  // IT System
  "pages.itSystem.title": { section: "IT System", label: "หัวข้อหน้า" },
  "pages.itSystem.subtitle": { section: "IT System", label: "คำบรรยาย" },
  // e-Tax
  "pages.eTax.title": { section: "e-Tax", label: "หัวข้อหน้า" },
  "pages.eTax.heroSubtitle": { section: "e-Tax", label: "คำบรรยาย Hero", multiline: true },
  "pages.eTax.aboutTitle": { section: "e-Tax", label: "About Title" },
  "pages.eTax.aboutDesc": { section: "e-Tax", label: "About Desc", multiline: true },
  // Marketing
  "pages.marketing.title": { section: "Marketing", label: "หัวข้อหน้า" },
  "pages.marketing.subtitle": { section: "Marketing", label: "คำบรรยาย", multiline: true },
  "pages.marketing.heroTitle": { section: "Marketing", label: "Hero Title" },
  // My Log Star
  "pages.myLogStar.title": { section: "My Log Star", label: "หัวข้อหน้า" },
  "pages.myLogStar.subtitle": { section: "My Log Star", label: "คำบรรยาย" },
  "pages.myLogStar.heroDesc": { section: "My Log Star", label: "Hero Description", multiline: true },
  // Contact
  "pages.contact.title": { section: "Contact", label: "หัวข้อหน้า" },
  "pages.contact.subtitle": { section: "Contact", label: "คำบรรยาย", multiline: true },
  // New Release
  "pages.newRelease.title": { section: "New Release", label: "หัวข้อหน้า" },
  "pages.newRelease.subtitle": { section: "New Release", label: "คำบรรยาย" },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getNestedValue(obj: any, dotKey: string): string {
  const keys = dotKey.split(".");
  let current = obj;
  for (const k of keys) {
    if (current === undefined || current === null) return "";
    current = current[k];
  }
  return typeof current === "string" ? current : "";
}

const LANG_LABELS: Record<Language, string> = { en: "English", th: "ภาษาไทย", jp: "日本語" };

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function TextEditorPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");

  const [activeLang, setActiveLang] = useState<Language>("en");
  const [overrides, setOverrides] = useState<Record<string, Record<string, string>>>({});
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"" | "success" | "error">("");
  const [filterSection, setFilterSection] = useState("all");

  /* ---- Auth ---- */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuthed(true);
        loadOverrides(password);
      } else {
        setAuthError("รหัสผ่านไม่ถูกต้อง");
      }
    } catch {
      setAuthError("เกิดข้อผิดพลาด");
    }
  };

  /* ---- Load ---- */
  const loadOverrides = useCallback(async (pw?: string) => {
    try {
      const res = await fetch("/api/admin/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw || password, action: "read" }),
      });
      const data = await res.json();
      if (data.overrides) {
        setOverrides(data.overrides);
        setEditValues(data.overrides[activeLang] || {});
      }
    } catch { /* silent */ }
  }, [password, activeLang]);

  /* When language changes, load that language's overrides into edit values */
  useEffect(() => {
    setEditValues(overrides[activeLang] || {});
  }, [activeLang, overrides]);

  /* ---- Save ---- */
  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("");

    // Only save fields that differ from defaults
    const cleaned: Record<string, string> = {};
    for (const [key, val] of Object.entries(editValues)) {
      const defaultVal = getNestedValue(translations[activeLang], key);
      if (val && val !== defaultVal) {
        cleaned[key] = val;
      }
    }

    const newOverrides = { ...overrides, [activeLang]: cleaned };

    try {
      const res = await fetch("/api/admin/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, action: "write", overrides: newOverrides }),
      });
      if (res.ok) {
        setOverrides(newOverrides);
        setSaveStatus("success");
        setTimeout(() => setSaveStatus(""), 3000);
      } else {
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  /* ---- Sections ---- */
  const allSections = Array.from(new Set(Object.values(EDITABLE_FIELDS).map((f) => f.section)));

  const filteredFields = Object.entries(EDITABLE_FIELDS).filter(
    ([, f]) => filterSection === "all" || f.section === filterSection
  );

  const grouped = filteredFields.reduce<Record<string, [string, typeof EDITABLE_FIELDS[string]][]>>((acc, entry) => {
    const sec = entry[1].section;
    if (!acc[sec]) acc[sec] = [];
    acc[sec].push(entry);
    return acc;
  }, {});

  const changedCount = Object.keys(editValues).filter((k) => {
    const def = getNestedValue(translations[activeLang], k);
    return editValues[k] && editValues[k] !== def;
  }).length;

  /* ---- LOGIN ---- */
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-4">
        <form onSubmit={handleLogin} className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Text Editor</h1>
            <p className="text-sm text-white/50">Japan System Thailand</p>
          </div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoFocus
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20"
            placeholder="Enter admin password" />
          {authError && <p className="mt-2 text-sm text-red-300">{authError}</p>}
          <button type="submit" className="mt-4 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    );
  }

  /* ---- EDITOR ---- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 hover:bg-slate-50">
              <ArrowLeft className="h-4 w-4 text-slate-600" />
            </Link>
            <div>
              <h1 className="text-base font-bold text-slate-900">Text Editor</h1>
              <p className="text-[11px] text-slate-500">แก้ไขข้อความบนเว็บไซต์</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {saveStatus === "success" && <span className="flex items-center gap-1 text-xs text-emerald-600"><Check className="h-3.5 w-3.5" />บันทึกแล้ว</span>}
            {saveStatus === "error" && <span className="flex items-center gap-1 text-xs text-red-500"><X className="h-3.5 w-3.5" />ผิดพลาด</span>}
            <button onClick={handleSave} disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:shadow-md disabled:opacity-50">
              {saving ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              บันทึก {changedCount > 0 && `(${changedCount})`}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 space-y-6">
        {/* Language tabs + filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-1 bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
            {(["en", "th", "jp"] as Language[]).map((l) => (
              <button key={l} onClick={() => setActiveLang(l)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeLang === l ? "bg-slate-900 text-white shadow" : "text-slate-600 hover:bg-slate-50"}`}>
                {LANG_LABELS[l]}
              </button>
            ))}
          </div>
          <select value={filterSection} onChange={(e) => setFilterSection(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
            <option value="all">ทุกส่วน</option>
            {allSections.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Fields */}
        {Object.entries(grouped).map(([section, fields]) => (
          <section key={section} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-100 px-5 py-3">
              <h2 className="text-sm font-bold text-slate-800">{section}</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {fields.map(([key, field]) => {
                const defaultVal = getNestedValue(translations[activeLang], key);
                const currentVal = editValues[key] ?? "";
                const isChanged = currentVal !== "" && currentVal !== defaultVal;

                return (
                  <div key={key} className="px-5 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-slate-700">{field.label}</label>
                      {isChanged && <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">แก้ไขแล้ว</span>}
                    </div>
                    <p className="text-[11px] text-slate-400 mb-2 truncate" title={key}>key: {key}</p>
                    {field.multiline ? (
                      <textarea
                        value={currentVal || defaultVal}
                        onChange={(e) => setEditValues((s) => ({ ...s, [key]: e.target.value }))}
                        rows={3}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-100 resize-y"
                      />
                    ) : (
                      <input
                        type="text"
                        value={currentVal || defaultVal}
                        onChange={(e) => setEditValues((s) => ({ ...s, [key]: e.target.value }))}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-100"
                      />
                    )}
                    {isChanged && (
                      <button onClick={() => setEditValues((s) => { const n = { ...s }; delete n[key]; return n; })}
                        className="mt-1 text-[11px] text-slate-400 hover:text-red-500 transition-colors">
                        ↩ คืนค่าเดิม
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
