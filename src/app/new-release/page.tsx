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
  const { lang, t } = useLanguage(); // ✅ IMPORTANT FIX
  const p = t.pages.newRelease;

  const [pageData, setPageData] = useState<NewReleasePageData | null>(null);

  const [topImage, setTopImage] = useState<string | null>(null);
  const [bottomImage, setBottomImage] = useState<string | null>(null);
  const [mylogstarImage, setMylogstarImage] = useState<string | null>(null);

  // ----------------------------
  // FETCH MEDIA
  // ----------------------------
  const getMedia = async (id: number) => {
    const res = await fetch(
      `https://primary-production-012cd.up.railway.app/wp-json/wp/v2/media/${id}`
    );

    if (!res.ok) throw new Error("Failed to fetch media");

    return await res.json();
  };

  // ----------------------------
  // YOUTUBE ID
  // ----------------------------
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

  // ----------------------------
  // FETCH PAGE DATA (LANG AWARE)
  // ----------------------------
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const res = await fetch(
          `https://primary-production-012cd.up.railway.app/wp-json/wp/v2/pages?slug=new-release&lang=${lang}` // ✅ IMPORTANT
        );

        if (!res.ok) throw new Error("Failed to fetch page");

        const data = await res.json();
        if (!data?.length) return;

        const page = data[0];
        setPageData(page);

        // reset images
        setTopImage(null);
        setBottomImage(null);
        setMylogstarImage(null);

        // TOP IMAGE
        if (page?.acf?.top_image) {
          const media = await getMedia(page.acf.top_image);
          setTopImage(media?.source_url || null);
        }

        // BOTTOM IMAGE
        if (page?.acf?.bottom_image) {
          const media = await getMedia(page.acf.bottom_image);
          setBottomImage(media?.source_url || null);
        }

        // MYLOGSTAR IMAGE
        if (page?.acf?.mylogstar) {
          const media = await getMedia(page.acf.mylogstar);
          setMylogstarImage(media?.source_url || null);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPageData();
  }, [lang]); // ✅ IMPORTANT FIX

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <div className="relative overflow-hidden py-10 sm:py-14 md:py-16 bg-sky-50 min-h-screen">
      <PageTitle title={p.metaTitle} />

      <Container>

        {/* HERO */}
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-slate-900 px-5 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20">

            <div className="absolute inset-0 z-0">
              <Image
                src={topImage || "/topBG-new-releasesss.jpg"}
                alt="bg"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="relative z-10 text-center text-white">
              <h1 className="text-3xl font-bold">
                {pageData?.acf?.hero_title || p.title}
              </h1>

              <p className="mt-3 text-white/80">
                {pageData?.acf?.hero_subtitle || p.subtitle}
              </p>
            </div>

          </div>
        </Reveal>

        {/* eTax Section */}
        <Reveal delay={0.06}>
          <div className="mt-8 rounded-2xl bg-white border">

            <div className="p-6">

              {/* H2 */}
              <h2 className="text-2xl font-bold">
                {pageData?.acf?.eTaxInvoiceReceipt ||
                  p.eTaxInvoiceReceipt}
              </h2>

              {/* H4 */}
              <h4 className="mt-2 text-base text-gray-600">
                {pageData?.acf?.etax_heading ||
                  p.eTaxHeading}
              </h4>

              <p className="mt-2 text-sm text-gray-500">
                {pageData?.acf?.tax_invoice_subtitle}
              </p>

            </div>

          </div>
        </Reveal>

        {/* VIDEO */}
        <div className="mt-8">
          <LazyYouTube
            videoId={
              pageData?.acf?.youtube_url
                ? getYoutubeId(pageData.acf.youtube_url)
                : "R8GhVnNnbV8"
            }
            title="video"
          />
        </div>

      </Container>
    </div>
  );
}