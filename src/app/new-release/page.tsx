"use client";

import { SiteImage as Image } from "@/components/SiteImage";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { LazyYouTube } from "@/components/LazyYouTube";

export default function NewReleasePage() {
  const { t } = useLanguage();
  const p = t.pages.newRelease;

  return (
    <div className="relative overflow-hidden py-10 sm:py-14 md:py-16 bg-sky-50 min-h-screen">
      <PageTitle title={p.metaTitle} />

      <Container>
        {/* --- ส่วนหัว Hero Section --- */}
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] bg-slate-900 px-5 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20 border border-slate-100 shadow-xl">
            <div className="absolute inset-0 z-0">
              <Image
                src="/topBG-new-releasesss.jpg"
                alt="Background visual"
                fill
                sizes="(max-width: 768px) 95vw, 90vw"
                quality={60}
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="relative z-10 mx-auto max-w-2xl text-center text-white">
              <h1 className="text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl drop-shadow-lg">
                {p.title}
              </h1>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-white/80 font-normal drop-shadow-md">
                {p.subtitle}
              </p>
            </div>
          </div>
        </Reveal>

        {/* --- ส่วนเนื้อหา e-Tax Section --- */}
        <Reveal delay={0.06}>
          <div className="mt-6 sm:mt-10 overflow-hidden rounded-2xl sm:rounded-[2rem] border border-slate-200 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.06)]">
            <div className="border-b border-slate-200 bg-white px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10">
              <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
                    {p.eTaxHeading}
                  </h2>
                  <p className="mt-2 sm:mt-3 text-sm leading-6 text-slate-600">
                    {p.taxInvoiceSubtitle}
                  </p>
                </div>
                <div className="shrink-0">
                  <div className="aspect-[5/3] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 lg:w-56">
                    <Image
                      src="/topimg-new-release.jpg"
                      alt="New release top visual"
                      width={560}
                      height={336}
                      sizes="(max-width: 1024px) 90vw, 224px"
                      quality={65}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10">
              {/* ตารางคำนวณ */}
              <div className="grid gap-2 sm:gap-3 rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-6 text-sm text-slate-700 sm:text-base">
                <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(160px,1fr)_minmax(120px,auto)] gap-3 sm:gap-4 font-semibold text-slate-900">
                  <div className="text-sm sm:text-base">{p.costTable.option}</div>
                  <div className="text-right text-sm sm:text-base">{p.costTable.value}</div>
                </div>
                <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(160px,1fr)_minmax(120px,auto)] gap-3 sm:gap-4 border-t border-slate-200 pt-3 sm:pt-4">
                  <div className="text-sm sm:text-base">{p.costTable.usePaper}</div>
                  <div className="text-right text-sm sm:text-base">{p.costTable.usePaperVal}</div>
                </div>
                <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(160px,1fr)_minmax(120px,auto)] gap-3 sm:gap-4 border-t border-slate-200 pt-3 sm:pt-4">
                  <div className="text-sm sm:text-base">{p.costTable.printingFee}</div>
                  <div className="text-right text-sm sm:text-base">{p.costTable.printingFeeVal}</div>
                </div>
                <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(160px,1fr)_minmax(120px,auto)] gap-3 sm:gap-4 border-t border-slate-200 pt-3 sm:pt-4">
                  <div className="text-sm sm:text-base">{p.costTable.storageMaterial}</div>
                  <div className="text-right text-sm sm:text-base">{p.costTable.storageMaterialVal}</div>
                </div>
                <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(160px,1fr)_minmax(120px,auto)] gap-3 sm:gap-4 border-t border-slate-200 pt-3 sm:pt-4">
                  <div className="text-sm sm:text-base">{p.costTable.deliveryFee}</div>
                  <div className="text-right text-sm sm:text-base">{p.costTable.deliveryFeeVal}</div>
                </div>
                <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(160px,1fr)_minmax(120px,auto)] gap-3 sm:gap-4 border-t border-slate-200 pt-3 sm:pt-4">
                  <div className="font-semibold text-red-600 text-sm sm:text-base">{p.costTable.total}</div>
                  <div className="text-right font-semibold text-red-600 text-sm sm:text-base">{p.costTable.totalVal}</div>
                </div>
              </div>

              {/* ส่วนสรุปรายเดือน */}
              <div className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-[0_16px_36px_rgba(15,23,42,0.06)] text-sm text-slate-700 sm:text-base">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <div className="grid h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 place-items-center rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 text-slate-900">
                    <span className="text-base sm:text-lg font-bold">£</span>
                  </div>
                  <div className="min-w-0 w-full">
                    <div className="font-semibold text-slate-900">
                      {p.monthlyCostLabel}
                    </div>
                    <div className="mt-2 sm:mt-3 text-sm sm:text-base font-bold leading-6 text-red-600">
                      {p.monthlyCostValue}
                    </div>
                    <div className="mt-1 sm:mt-2 text-xs sm:text-sm font-semibold leading-6 text-red-600">
                      {p.monthlyCostReduction}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 flex justify-center sm:justify-end">
                <Link
                  href="/e-tax"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 active:scale-95"
                >
                  {t.common.readMore}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* --- ส่วนวิดีโอและรูปภาพด้านล่าง --- */}
        <div className="mt-6 sm:mt-10 grid gap-5 sm:gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <Reveal delay={0.08}>
            <div className="rounded-2xl sm:rounded-[1.75rem] border border-slate-200 bg-white p-4 sm:p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <LazyYouTube videoId="R8GhVnNnbV8" title="My Log Star video" />
            </div>
          </Reveal>

          <Reveal>
            <div className="relative rounded-2xl sm:rounded-[1.75rem] border border-slate-200 bg-white p-4 sm:p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] flex flex-col h-full">
              <div className="overflow-hidden rounded-xl sm:rounded-3xl border border-slate-200 bg-slate-50">
                <Image
                  src="/botimg_new-release.png"
                  alt="Bottom new release visual"
                  width={1200}
                  height={720}
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-4 sm:mt-6 flex justify-center sm:justify-end">
                <Link
                  href="/my-log-star"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-slate-900 px-5 sm:px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-slate-800 hover:-translate-y-1 active:scale-95"
                >
                  {t.common.readMore}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}