"use client";

import React, { useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, Upload, LogOut, Check, X, RefreshCw, Search, Image as ImageIcon, Link2, Type } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Image registry – ALL known images, grouped by page                */
/* ------------------------------------------------------------------ */
const IMAGE_REGISTRY: Record<string, { page: string; description: string }> = {
  "logo_japanSystem.png": { page: "ทั่วเว็บ (Navbar/Footer)", description: "โลโก้บริษัท" },
  "homebg.jpg": { page: "Home", description: "รูปพื้นหลัง Hero" },
  "topB_company_profile.jpg": { page: "Company Profile", description: "รูปพื้นหลัง Hero" },
  "office.jpg": { page: "Company Profile", description: "รูปสำนักงาน" },
  "topbg_system.jpg": { page: "IT System", description: "รูปพื้นหลัง Hero" },
  "Maintainance.png": { page: "IT System", description: "ไอคอน Maintenance" },
  "Website & Online marketing.png": { page: "IT System", description: "ไอคอน Website & Marketing" },
  "IT Support & Help Desk.png": { page: "IT System", description: "ไอคอน IT Support" },
  "Product management system.png": { page: "IT System", description: "ไอคอน Product Management" },
  "bg_etax_hero.jpg": { page: "e-Tax", description: "รูปพื้นหลัง Hero" },
  "bg_painpoints.jpg": { page: "e-Tax", description: "รูปพื้นหลัง Pain Points" },
  "icon_etax.png": { page: "e-Tax", description: "ไอคอน e-Tax" },
  "icon_signature.png": { page: "e-Tax", description: "ไอคอน Digital Signature" },
  "e-tax_diagram_en.jpg": { page: "e-Tax", description: "แผนภาพ e-Tax" },
  "benefit_1.png": { page: "e-Tax", description: "ไอคอนประโยชน์ข้อ 1" },
  "benefit_2.png": { page: "e-Tax", description: "ไอคอนประโยชน์ข้อ 2" },
  "benefit_3.png": { page: "e-Tax", description: "ไอคอนประโยชน์ข้อ 3" },
  "benefit_4.png": { page: "e-Tax", description: "ไอคอนประโยชน์ข้อ 4" },
  "bg_mmk.jpg": { page: "Marketing", description: "รูปพื้นหลัง Hero" },
  "commk.jpg": { page: "Marketing", description: "รูปพื้นหลังการ์ด" },
  "website-icon.png": { page: "Marketing", description: "ไอคอน Website" },
  "facebook.png": { page: "Marketing", description: "ไอคอน Facebook" },
  "instagram.png": { page: "Marketing", description: "ไอคอน Instagram" },
  "line.png": { page: "Marketing", description: "ไอคอน Line" },
  "Twitter.png": { page: "Marketing", description: "ไอคอน Twitter" },
  "logstar.png": { page: "My Log Star", description: "โลโก้ MylogStar (Hero)" },
  "mylogstar.png": { page: "My Log Star", description: "โลโก้ MylogStar (Feature)" },
  "fileserver.png": { page: "My Log Star", description: "รูป FileServer" },
  "desktop.jpg": { page: "My Log Star", description: "รูป Desktop" },
  "imcontact.jpg": { page: "Contact", description: "รูปพื้นหลัง Hero" },
  "topBG_contact.jpg": { page: "Contact", description: "รูปพื้นหลัง" },
  "topBG-new-releasesss.jpg": { page: "New Release", description: "รูปพื้นหลัง Hero" },
  "topimg-new-release.jpg": { page: "New Release", description: "รูป e-Tax section" },
  "botimg_new-release.png": { page: "New Release", description: "รูปด้านล่าง" },
  "test.jpg": { page: "Invoice & e-Receipt", description: "รูปพื้นหลัง Hero" },
};

type UploadStatus = "idle" | "uploading" | "success" | "error";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPage, setFilterPage] = useState("all");

  const [uploadStates, setUploadStates] = useState<Record<string, UploadStatus>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [urlInputs, setUrlInputs] = useState<Record<string, string>>({});
  const [showUrlInput, setShowUrlInput] = useState<Record<string, boolean>>({});

  /* ---- Auth ---- */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
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
      setAuthError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setAuthLoading(false);
    }
  };

  /* ---- Load overrides ---- */
  const loadOverrides = useCallback(async (pw?: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw || password }),
      });
      const data = await res.json();
      if (data.overrides) setOverrides(data.overrides);
    } catch { /* silent */ }
    finally { setLoading(false); }
  }, [password]);

  /* ---- File Upload ---- */
  const handleUpload = async (targetName: string, file: File) => {
    setUploadStates((s) => ({ ...s, [targetName]: "uploading" }));
    try {
      const formData = new FormData();
      formData.append("password", password);
      formData.append("file", file);
      formData.append("targetName", targetName);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (res.ok) {
        setUploadStates((s) => ({ ...s, [targetName]: "success" }));
        setTimeout(() => setUploadStates((s) => ({ ...s, [targetName]: "idle" })), 3000);
        loadOverrides();
      } else {
        setUploadStates((s) => ({ ...s, [targetName]: "error" }));
      }
    } catch {
      setUploadStates((s) => ({ ...s, [targetName]: "error" }));
    }
  };

  /* ---- URL Upload ---- */
  const handleUrlUpload = async (targetName: string) => {
    const url = urlInputs[targetName]?.trim();
    if (!url) return;
    setUploadStates((s) => ({ ...s, [targetName]: "uploading" }));
    try {
      const res = await fetch("/api/admin/url-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, url, targetName }),
      });
      if (res.ok) {
        setUploadStates((s) => ({ ...s, [targetName]: "success" }));
        setUrlInputs((s) => ({ ...s, [targetName]: "" }));
        setShowUrlInput((s) => ({ ...s, [targetName]: false }));
        setTimeout(() => setUploadStates((s) => ({ ...s, [targetName]: "idle" })), 3000);
        loadOverrides();
      } else {
        const data = await res.json();
        alert(data.error || "ไม่สามารถดาวน์โหลดรูปจาก URL ได้");
        setUploadStates((s) => ({ ...s, [targetName]: "error" }));
      }
    } catch {
      setUploadStates((s) => ({ ...s, [targetName]: "error" }));
    }
  };

  /* ---- Filter & Group ---- */
  const allPages = Array.from(new Set(Object.values(IMAGE_REGISTRY).map((v) => v.page)));
  const allEntries = Object.entries(IMAGE_REGISTRY);

  const filteredEntries = allEntries.filter(([name, reg]) => {
    const matchPage = filterPage === "all" || reg.page === filterPage;
    const matchSearch = !searchQuery ||
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchPage && matchSearch;
  });

  const grouped = filteredEntries.reduce<Record<string, [string, typeof IMAGE_REGISTRY[string]][]>>((acc, entry) => {
    const page = entry[1].page;
    if (!acc[page]) acc[page] = [];
    acc[page].push(entry);
    return acc;
  }, {});

  /* ---- LOGIN ---- */
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-4">
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-60 w-60 rounded-full bg-indigo-500/10 blur-[100px]" />
        <form onSubmit={handleLogin} className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 sm:p-10 shadow-2xl">
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/25">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white tracking-tight">Admin Panel</h1>
              <p className="mt-1 text-sm text-white/50">Japan System Thailand</p>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="admin-password" className="block text-xs font-semibold tracking-wide text-white/60 uppercase">Password</label>
            <input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoFocus
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20" placeholder="Enter admin password" />
          </div>
          {authError && (
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm text-red-300">
              <X className="h-4 w-4 shrink-0" />{authError}
            </div>
          )}
          <button type="submit" disabled={authLoading}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
            {authLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>
      </div>
    );
  }

  /* ---- DASHBOARD ---- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-sm">
              <ImageIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">Image Manager</h1>
              <p className="hidden sm:block text-xs text-slate-500">Japan System Thailand — Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/admin/text"
              className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs font-medium text-emerald-600 shadow-sm hover:bg-emerald-50">
              <Type className="h-3.5 w-3.5" />แก้ข้อความ
            </Link>
            <button onClick={() => loadOverrides()} disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-50">
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /><span className="hidden sm:inline">Refresh</span>
            </button>
            <button onClick={() => { setAuthed(false); setPassword(""); setOverrides({}); }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-600 shadow-sm hover:bg-red-50">
              <LogOut className="h-3.5 w-3.5" /><span className="hidden sm:inline">ออกจากระบบ</span>
            </button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="ค้นหาไฟล์..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 shadow-sm" />
          </div>
          <select value={filterPage} onChange={(e) => setFilterPage(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 shadow-sm">
            <option value="all">ทุกหน้า</option>
            {allPages.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <p className="mt-3 text-xs text-slate-500">แสดง {filteredEntries.length} จาก {allEntries.length} รูป • {Object.keys(overrides).length} รูปถูกแก้ไข</p>
      </div>

      {/* Image grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-12 space-y-8">
        {Object.entries(grouped).map(([page, entries]) => (
          <section key={page}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-sm font-bold tracking-tight text-slate-800 uppercase">{page}</h2>
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400">{entries.length} ไฟล์</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {entries.map(([name, reg]) => {
                const status = uploadStates[name] || "idle";
                const hasOverride = !!overrides[name];
                const previewSrc = hasOverride ? overrides[name] : `/${name}`;

                return (
                  <div key={name} className="group rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-slate-300">
                    {/* Preview */}
                    <div className="relative aspect-video bg-slate-100 border-b border-slate-100 overflow-hidden">
                      <Image src={previewSrc} alt={name} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-105" unoptimized />
                      {hasOverride && (
                        <div className="absolute top-2 right-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">CLOUD</div>
                      )}
                      {status === "uploading" && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                          <RefreshCw className="h-5 w-5 animate-spin text-sky-600" />
                        </div>
                      )}
                      {status === "success" && (
                        <div className="absolute inset-0 bg-emerald-500/10 backdrop-blur-sm flex items-center justify-center">
                          <Check className="h-5 w-5 text-emerald-600" />
                        </div>
                      )}
                      {status === "error" && (
                        <div className="absolute inset-0 bg-red-500/10 backdrop-blur-sm flex items-center justify-center">
                          <X className="h-5 w-5 text-red-600" />
                        </div>
                      )}
                    </div>

                    {/* Info + actions */}
                    <div className="p-4">
                      <p className="text-sm font-semibold text-slate-900 truncate" title={name}>{name}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{reg.description}</p>
                      {hasOverride && (
                        <p className="mt-1 text-[10px] text-emerald-600 font-medium truncate" title={overrides[name]}>☁️ {overrides[name].split("/").pop()}</p>
                      )}

                      <input ref={(el) => { fileInputRefs.current[name] = el; }} type="file" accept="image/*" className="hidden"
                        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(name, f); e.target.value = ""; }} />

                      <div className="mt-3 flex gap-2">
                        <button onClick={() => fileInputRefs.current[name]?.click()} disabled={status === "uploading"}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-3 py-2.5 text-xs font-semibold text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50">
                          <Upload className="h-3.5 w-3.5" />อัปโหลด
                        </button>
                        <button onClick={() => setShowUrlInput((s) => ({ ...s, [name]: !s[name] }))} disabled={status === "uploading"}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-50">
                          <Link2 className="h-3.5 w-3.5" />URL
                        </button>
                      </div>

                      {showUrlInput[name] && (
                        <div className="mt-2 flex gap-2">
                          <input type="url" value={urlInputs[name] || ""} onChange={(e) => setUrlInputs((s) => ({ ...s, [name]: e.target.value }))}
                            placeholder="วาง URL รูปภาพ..."
                            className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-100" />
                          <button onClick={() => handleUrlUpload(name)} disabled={!urlInputs[name]?.trim() || status === "uploading"}
                            className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-600 disabled:opacity-40">ตกลง</button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {loading && (
          <div className="text-center py-16">
            <RefreshCw className="mx-auto h-8 w-8 text-slate-400 animate-spin" />
            <p className="mt-3 text-sm text-slate-500">กำลังโหลด...</p>
          </div>
        )}
      </div>
    </div>
  );
}
