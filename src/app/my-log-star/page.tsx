"use client";

import { SiteImage as Image } from "@/components/SiteImage";
import { type ReactNode, useState } from "react";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { LazyYouTube } from "@/components/LazyYouTube";

function Chip({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-slate-700">
      {children}
    </span>
  );
}

function FeatureCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
      <div className="text-sm font-bold tracking-tight text-slate-900">{title}</div>
      <div className="mt-3 sm:mt-4 text-sm leading-6 sm:leading-7 text-slate-600">{children}</div>
    </div>
  );
}

function AccordionItem({
  title,
  isOpen,
  onToggle,
  children,
  imageSrc,
  imageAlt,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-100 bg-white shadow-[0_16px_56px_rgba(15,23,42,0.06)]">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 sm:gap-4 px-4 py-4 sm:px-6 sm:py-5 text-left text-base sm:text-lg font-semibold text-slate-900 transition-colors hover:bg-slate-50"
        onClick={onToggle}
      >
        <span>{title}</span>
        <span className="text-slate-500 shrink-0">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="border-t border-slate-100 px-4 py-4 sm:px-6 sm:py-5 bg-white">
          <div className="text-sm leading-6 sm:leading-7 text-slate-600 whitespace-pre-line">{children}</div>
          {imageSrc && (
            <div className="mt-6">
              <div className="relative overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                <Image
                  src={imageSrc}
                  alt={imageAlt || title}
                  width={1200}
                  height={720}
                  sizes="(max-width: 1024px) 90vw, 70vw"
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function MyLogStarPage() {
  const { t } = useLanguage();
  const p = t.pages.myLogStar;
  const [openSection, setOpenSection] = useState("fileServer");

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? "" : id);
  };

  return (
    <div className="py-10 sm:py-14 md:py-16 bg-sky-50 min-h-screen">
      <PageTitle title={p.metaTitle} />
      <Container>
        <Reveal>
          <div className="max-w-3xl">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              {p.heroTitle}
            </h1>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-6 sm:leading-7 text-slate-600">
              {p.heroDesc}
            </p>
          </div>
        </Reveal>

        <div className="mt-6 sm:mt-10 grid gap-5 sm:gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <div className="space-y-5 sm:space-y-6">
              {/* ส่วนวิดีโอ */}
              <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
                <LazyYouTube videoId="R8GhVnNnbV8" title="My Log Star Overview" />
              </div>
              {/* รูปภาพประกอบ 1 */}
              <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
                <div className="relative overflow-hidden rounded-xl sm:rounded-3xl border border-slate-100 bg-slate-50">
                  <Image
                    src="/logstar.png"
                    alt="LogStar"
                    width={1200}
                    height={720}
                    sizes="(max-width: 1024px) 90vw, 55vw"
                    loading="lazy"
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-5 sm:space-y-6">
              {/* รูปภาพประกอบ 2 */}
              <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
                <div className="relative overflow-hidden rounded-xl sm:rounded-3xl border border-slate-100 bg-slate-50">
                  <Image
                    src="/mylogstar.png"
                    alt="MylogStar"
                    width={1200}
                    height={720}
                    sizes="(max-width: 1024px) 90vw, 35vw"
                    loading="lazy"
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
              {/* การ์ดฟีเจอร์ */}
              <FeatureCard title={p.featureTitle}>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <div className="font-semibold text-slate-900">{p.featureLogCollectionTitle}</div>
                    <div className="mt-1.5 sm:mt-2 text-sm leading-6 sm:leading-7 text-slate-600">
                      {p.featureLogCollectionDesc}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{p.featureLogAvailabilityTitle}</div>
                    <div className="mt-1.5 sm:mt-2 text-sm leading-6 sm:leading-7 text-slate-600">
                      {p.featureLogAvailabilityDesc}
                    </div>
                  </div>
                </div>
              </FeatureCard>
            </div>
          </Reveal>
        </div>

        {/* Accordion ส่วนรายละเอียดเพิ่มเติม */}
        <div className="mt-8 sm:mt-12 space-y-3 sm:space-y-4">
          {p.accordion.map((section) => (
            <AccordionItem
              key={section.id}
              title={section.title}
              isOpen={openSection === section.id}
              onToggle={() => toggleSection(section.id)}
              imageSrc={section.id === "standalone" ? "/fileserver.png" : section.id === "console" ? "/desktop.jpg" : undefined}
              imageAlt={section.id === "standalone" ? "MylogStar FileServer" : section.id === "console" ? "MylogStar Desktop" : undefined}
            >
              {section.content}
            </AccordionItem>
          ))}
        </div>
      </Container>
    </div>
  );
}