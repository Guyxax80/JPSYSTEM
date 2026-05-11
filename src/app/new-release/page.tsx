"use client";

import { SiteImage as Image } from "@/components/SiteImage";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { LazyYouTube } from "@/components/LazyYouTube";
import { useEffect, useState } from "react";

type NewReleasePageData = {
  acf?: {
    hero_title?: string;
    hero_subtitle?: string;
    eTaxInvoiceReceipt?: string;
    etax_heading?: string;
    tax_invoice_subtitle?: string;

    monthly_cost?: string;
    monthly_cost_label?: string;
    monthly_cost_reduction?: string;

    currency_symbol?: string;

    top_image?: number;
    bottom_image?: number;
    mylogstar?: number;

    youtube_url?: string;

    etax_button_text?: string;
    mylogstar_button_text?: string;

    cost_option_label?: string;
    cost_value_label?: string;

    use_paper?: string;
    use_paper_value?: string;

    printing_fee?: string;
    printing_fee_value?: string;

    storage_material?: string;
    storage_material_value?: string;

    delivery_fee?: string;
    delivery_fee_value?: string;

    total_label?: string;
    total_value?: string;
  };
};

export default function NewReleasePage() {
  const { t, lang } = useLanguage(); 
  const p = t.pages.newRelease;
  const slugMap: Record<string, string> = {
  en: "new-release",
  th: "new-release-th",
  jp: "new-release-jp",
};

  const [pageData, setPageData] =
    useState<NewReleasePageData | null>(null);

  const [topImage, setTopImage] = useState<string | null>(null);
  const [bottomImage, setBottomImage] = useState<string | null>(null);
  const [mylogstarImage, setMylogstarImage] = useState<string | null>(null);

  const getMedia = async (id: number) => {
    const res = await fetch(
      `https://primary-production-012cd.up.railway.app/wp-json/wp/v2/media/${id}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch media");
    }

    return await res.json();
  };

  const getYoutubeId = (url: string) => {
    try {
      const urlObj = new URL(url);

      if (urlObj.hostname.includes("youtu.be")) {
        return urlObj.pathname.replace("/", "");
      }

      return urlObj.searchParams.get("v") || "R8GhVnNnbV8";
    } catch {
      return "R8GhVnNnbV8";
    }
  };

useEffect(() => {
  const fetchPageData = async () => {
    try {
      const slug = slugMap[lang] || "new-release"; 

      const response = await fetch(
        `https://primary-production-012cd.up.railway.app/wp-json/wp/v2/pages?slug=${slug}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch page");
      }

      const data = await response.json();

      if (!data || !data.length) return;

      const page = data[0];
      setPageData(page);

      // TOP IMAGE
      if (page?.acf?.top_image) {
        try {
          const media = await getMedia(page.acf.top_image);
          if (media?.source_url) {
            setTopImage(media.source_url);
          }
        } catch (err) {
          console.error("Top image error:", err);
        }
      }

      // BOTTOM IMAGE
      if (page?.acf?.bottom_image) {
        try {
          const media = await getMedia(page.acf.bottom_image);
          if (media?.source_url) {
            setBottomImage(media.source_url);
          }
        } catch (err) {
          console.error("Bottom image error:", err);
        }
      }

      // MYLOGSTAR IMAGE
      if (page?.acf?.mylogstar) {
        try {
          const media = await getMedia(page.acf.mylogstar);
          if (media?.source_url) {
            setMylogstarImage(media.source_url);
          }
        } catch (err) {
          console.error("Mylogstar image error:", err);
        }
      }

    } catch (error) {
      console.error(error);
    }
  };

  fetchPageData();
}, [lang]); 

  return (
    <div className="relative overflow-hidden py-10 sm:py-14 md:py-16 bg-sky-50 min-h-screen">
      <PageTitle title={p.metaTitle} />

      <Container>
        {/* Hero Section */}
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] bg-slate-900 px-5 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20 border border-slate-100 shadow-xl">
            <div className="absolute inset-0 z-0">
              <Image
                src={topImage || "/topBG-new-releasesss.jpg"}
                alt="Background visual"
                fill
                sizes="(max-width: 768px) 95vw, 90vw"
                quality={60}
                className="object-cover"
                priority
                unoptimized
              />

              <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="relative z-10 mx-auto max-w-2xl text-center text-white">
              <h1 className="text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl drop-shadow-lg">
                {pageData?.acf?.hero_title || p.title}
              </h1>

              <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-white/80 font-normal drop-shadow-md">
                {pageData?.acf?.hero_subtitle || p.subtitle}
              </p>
            </div>
          </div>
        </Reveal>

        {/* eTax Section */}
        <Reveal delay={0.06}>
          <div className="mt-6 sm:mt-10 overflow-hidden rounded-2xl sm:rounded-[2rem] border border-slate-200 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.06)]">
            <div className="border-b border-slate-200 bg-white px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10">
              <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
                {/* eTax Header */}
                <div className="max-w-2xl">
                  
                  {/* H2 */}
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
                    {pageData?.acf?.eTaxInvoiceReceipt || p.eTaxInvoiceReceipt}
                  </h2>

                  {/* H4 */}
                  <h4 className="mt-2 sm:mt-3 text-base font-medium text-slate-700">
                    {pageData?.acf?.etax_heading || p.eTaxHeading}
                  </h4>

                  <p className="mt-2 sm:mt-3 text-sm leading-6 text-slate-600">
                    {pageData?.acf?.tax_invoice_subtitle || p.taxInvoiceSubtitle}
                  </p>
                </div>

                <div className="shrink-0">
                  <div className="aspect-[5/3] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 lg:w-56">
                    <Image
                      src={bottomImage || "/botimg_new-release.png"}
                      alt="Bottom new release visual"
                      width={1200}
                      height={720}
                      sizes="(max-width: 1024px) 90vw, 40vw"
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10">
              {/* Cost Table */}
              <div className="grid gap-2 sm:gap-3 rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-6 text-sm text-slate-700 sm:text-base">
                <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(160px,1fr)_minmax(120px,auto)] gap-3 sm:gap-4 font-semibold text-slate-900">
                  <div>
                    {pageData?.acf?.cost_option_label ||
                      p.costTable.option}
                  </div>

                  <div className="text-right">
                    {pageData?.acf?.cost_value_label ||
                      p.costTable.value}
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_auto] gap-3 sm:gap-4 border-t border-slate-200 pt-3 sm:pt-4">
                  <div>
                    {pageData?.acf?.use_paper ||
                      p.costTable.usePaper}
                  </div>

                  <div className="text-right">
                    {pageData?.acf?.use_paper_value ||
                      p.costTable.usePaperVal}
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_auto] gap-3 sm:gap-4 border-t border-slate-200 pt-3 sm:pt-4">
                  <div>
                    {pageData?.acf?.printing_fee ||
                      p.costTable.printingFee}
                  </div>

                  <div className="text-right">
                    {pageData?.acf?.printing_fee_value ||
                      p.costTable.printingFeeVal}
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_auto] gap-3 sm:gap-4 border-t border-slate-200 pt-3 sm:pt-4">
                  <div>
                    {pageData?.acf?.storage_material ||
                      p.costTable.storageMaterial}
                  </div>

                  <div className="text-right">
                    {pageData?.acf?.storage_material_value ||
                      p.costTable.storageMaterialVal}
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_auto] gap-3 sm:gap-4 border-t border-slate-200 pt-3 sm:pt-4">
                  <div>
                    {pageData?.acf?.delivery_fee ||
                      p.costTable.deliveryFee}
                  </div>

                  <div className="text-right">
                    {pageData?.acf?.delivery_fee_value ||
                      p.costTable.deliveryFeeVal}
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_auto] gap-3 sm:gap-4 border-t border-slate-200 pt-3 sm:pt-4">
                  <div className="font-semibold text-red-600">
                    {pageData?.acf?.total_label ||
                      p.costTable.total}
                  </div>

                  <div className="text-right font-semibold text-red-600">
                    {pageData?.acf?.total_value ||
                      p.costTable.totalVal}
                  </div>
                </div>
              </div>

              {/* Monthly Cost */}
              <div className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-[0_16px_36px_rgba(15,23,42,0.06)] text-sm text-slate-700 sm:text-base">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <div className="grid h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 place-items-center rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 text-slate-900">
                    <span className="text-base sm:text-lg font-bold">
                      {pageData?.acf?.currency_symbol || "£"}
                    </span>
                  </div>

                  <div className="min-w-0 w-full">
                    <div className="font-semibold text-slate-900">
                      {pageData?.acf?.monthly_cost ||
                        p.monthlyCostValue}
                    </div>

                    <div className="mt-2 sm:mt-3 text-sm sm:text-base font-bold leading-6 text-red-600">
                      {pageData?.acf?.monthly_cost_label ||
                        p.monthlyCostLabel}
                    </div>

                    <div className="mt-1 sm:mt-2 text-xs sm:text-sm font-semibold leading-6 text-red-600">
                      {pageData?.acf?.monthly_cost_reduction ||
                        p.monthlyCostReduction}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 flex justify-center sm:justify-end">
                <Link
                  href="/e-tax"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 active:scale-95"
                >
                  {pageData?.acf?.etax_button_text ||
                    t.common.readMore}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Video + Image */}
        <div className="mt-6 sm:mt-10 grid gap-5 sm:gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <Reveal delay={0.08}>
            <div className="rounded-2xl sm:rounded-[1.75rem] border border-slate-200 bg-white p-4 sm:p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <LazyYouTube
                videoId={
                  pageData?.acf?.youtube_url
                    ? getYoutubeId(pageData.acf.youtube_url)
                    : "R8GhVnNnbV8"
                }
                title="My Log Star video"
              />
            </div>
          </Reveal>

          <Reveal>
            <div className="relative rounded-2xl sm:rounded-[1.75rem] border border-slate-200 bg-white p-4 sm:p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] flex flex-col h-full">
              <div className="overflow-hidden rounded-xl sm:rounded-3xl border border-slate-200 bg-slate-50">
                <Image
                  src={mylogstarImage || "/topimg-new-release.jpg"}
                  alt="New release top visual"
                  width={560}
                  height={336}
                  sizes="(max-width: 1024px) 90vw, 224px"
                  quality={65}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-4 sm:mt-6 flex justify-center sm:justify-end">
                <Link
                  href="/my-log-star"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-slate-900 px-5 sm:px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-slate-800 hover:-translate-y-1 active:scale-95"
                >
                  {pageData?.acf?.mylogstar_button_text ||
                    t.common.readMore}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}