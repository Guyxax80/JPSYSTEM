"use client";

import { useEffect, useState } from "react";
import { SiteImage as Image } from "@/components/SiteImage";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/Card";
import { PageTitle } from "@/components/PageTitle";
import { ChevronDown } from "lucide-react";
import { decode } from "html-entities";

export default function Home() {
  const [home, setHome] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [heroSrc, setHeroSrc] = useState("/homebg.jpg"); // ✅ เพิ่ม

  // ✅ HOME ACF
  useEffect(() => {
    fetch(
      "https://primary-production-012cd.up.railway.app/wp-json/wp/v2/pages?slug=home-page"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setHome(data[0].acf);
        }
      });
  }, []);

  // ✅ SERVICES + featured image
  useEffect(() => {
    fetch(
      "https://primary-production-012cd.up.railway.app/wp-json/wp/v2/services?_embed&orderby=menu_order&order=asc"
    )
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  // ✅ FIX: แปลง hero_image (ID → URL) โดยไม่แตะ UI
  useEffect(() => {
    const rawHero = home?.hero_image;

    // กรณีเป็น ID
    if (typeof rawHero === "number") {
      fetch(
        `https://primary-production-012cd.up.railway.app/wp-json/wp/v2/media/${rawHero}`
      )
        .then((res) => res.json())
        .then((data) => {
          const url = data?.source_url;
          setHeroSrc(url && url.trim() !== "" ? url : "/homebg.jpg");
        })
        .catch(() => setHeroSrc("/homebg.jpg"));
    }

    // กรณีเป็น string
    else if (typeof rawHero === "string") {
      setHeroSrc(rawHero.trim() !== "" ? rawHero : "/homebg.jpg");
    }

    // กรณีเป็น object (ACF)
    else if (typeof rawHero === "object") {
      const url = rawHero?.url;
      setHeroSrc(url && url.trim() !== "" ? url : "/homebg.jpg");
    }

    // fallback
    else {
      setHeroSrc("/homebg.jpg");
    }
  }, [home]);

  // ✅ icon (เพิ่มกันค่าว่างนิดเดียว ไม่กระทบ UI)
  const getIcon = (item: any) => {
    const url = item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    return url && url.trim() !== "" ? url : "/iconfallback.png";
  };

  if (!home) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="relative overflow-hidden">
      <PageTitle title="Home" />

      {/* ================= HERO ================= */}
      <section className="relative border-b border-slate-100">
        <div className="relative overflow-hidden">
          <div className="aspect-[9/14] w-full sm:aspect-[16/10] lg:aspect-[21/9]">
            {home?.hero_image ? (
              <Image
                src={heroSrc}
                alt="Home background"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <Image
                src="/homebg.jpg"
                alt="Home background"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            )}
          </div>

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/50 to-slate-950/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/20 to-indigo-900/10" />

          {/* 🔥 UI เดิม */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 sm:px-6 text-center">
            <div className="max-w-3xl w-full">

              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-white/90 uppercase">
                    {home.hero_badge}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl drop-shadow-2xl">
                  {home.hero_title}
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-3 sm:mt-4 text-sm text-white/70 max-w-2xl mx-auto sm:text-base lg:text-lg">
                  {home.hero_subtitle}
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href={home.cta_primary_link || "#"}
                    className="shimmer w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-white px-5 sm:px-6 py-3 text-sm font-semibold text-slate-900 shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                  >
                    {home.cta_primary_text}
                    <span className="ml-2">→</span>
                  </Link>

                  <Link
                    href={home.cta_secondary_link || "#"}
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 sm:px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                  >
                    {home.cta_secondary_text}
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.4}>
              <button
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-8 sm:mt-12 group relative inline-flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14"
              >
                <div className="absolute inset-0 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/15 group-hover:border-white/40" />
                <ChevronDown className="relative h-5 w-5 sm:h-6 sm:w-6 text-white animate-bounce" />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES (ไม่แตะเลย) */}
      <section id="services" className="relative py-14 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />

        <Container>
          <div className="relative">
            <Reveal>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-slate-600 shadow-sm mb-3 sm:mb-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                    {home.services_title || "Services"}
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
                    {home.services_subtitle || "Our Services"}
                  </h2>
                </div>
                  <Link
                    href="/it-system"
                    className="hidden text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors sm:inline-flex items-center gap-1"
                    data-cursor="interactive"
                  >
                    {home.learn_more_text || "Learn More"}
                    <span className="text-sky-500 transition-transform group-hover:translate-x-1">→</span>
                  </Link>
              </div>
            </Reveal>

            <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 3).map((item, idx) => (
                <Reveal key={item.id} delay={0.06 * idx}>
                  <Card
                    title={decode(item.title.rendered)}
                    desc={item.acf?.description}
                    href={item.acf?.link || "#"}
                    icon={
                      <Image
                        src={getIcon(item)}
                        alt={decode(item.title.rendered)}
                        width={24}
                        height={24}
                        className="h-6 w-6 object-contain"
                      />
                    }
                  />
                </Reveal>
              ))}
            </div>

            <div className="mt-4 sm:mt-5 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:px-20">
              {services.slice(3, 5).map((item, idx) => (
                <Reveal key={item.id} delay={0.04 * idx}>
                  <Card
                    title={decode(item.title.rendered)}
                    desc={item.acf?.description}
                    href={item.acf?.link || "#"}
                    icon={
                      <Image
                        src={getIcon(item)}
                        alt={decode(item.title.rendered)}
                        width={24}
                        height={24}
                        className="h-6 w-6 object-contain"
                      />
                    }
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}