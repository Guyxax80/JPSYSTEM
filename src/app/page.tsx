"use client";

import { useEffect, useState } from "react";
import { SiteImage as Image } from "@/components/SiteImage";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/Card";
import { PageTitle } from "@/components/PageTitle";
import { ChevronDown } from "lucide-react";

// 🔧 helper: ดึง media จาก ID
const getMedia = async (id: number) => {
  const res = await fetch(
    `https://primary-production-012cd.up.railway.app/wp-json/wp/v2/media/${id}`
  );
  return res.json();
};

export default function Home() {
  const [home, setHome] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [icons, setIcons] = useState<Record<number, string>>({});

  useEffect(() => {
    // 🔹 ดึง Home ACF
    fetch(
      "https://primary-production-012cd.up.railway.app/wp-json/wp/v2/pages?slug=home"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setHome(data[0].acf);
        }
      });

    // 🔹 ดึง Services
    fetch(
      "https://primary-production-012cd.up.railway.app/wp-json/wp/v2/services?orderby=menu_order&order=asc"
    )
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  // 🔥 ดึง icon จาก ACF (ID → URL)
  useEffect(() => {
    if (services.length === 0) return;

    const fetchIcons = async () => {
      const map: Record<number, string> = {};

      for (const item of services) {
        if (item.acf?.icon) {
          try {
            const media = await getMedia(item.acf.icon);
            if (media?.source_url) {
              map[item.id] = media.source_url;
            }
          } catch (err) {
            console.error("Icon error:", err);
          }
        }
      }

      setIcons(map);
    };

    fetchIcons();
  }, [services]);

  if (!home) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="relative overflow-hidden">
      <PageTitle title="Home" />

      {/* ================= HERO ================= */}
      <section className="relative border-b border-slate-100">
        <div className="relative overflow-hidden">
          <div className="aspect-[9/14] w-full sm:aspect-[16/10] lg:aspect-[21/9]">
            <Image
              src={home.hero_image || "/homebg.jpg"}
              alt="Home background"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/50 to-slate-950/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/20 to-indigo-900/10" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <div className="max-w-3xl w-full">
              <Reveal>
                <div className="text-white/80 text-xs tracking-widest uppercase">
                  {home.hero_eyebrow}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="mt-4 text-3xl sm:text-5xl font-bold text-white">
                  {home.hero_title}
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-4 text-white/70">
                  {home.hero_subtitle}
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href={home.cta_primary_link || "#"}
                    className="bg-white text-black px-6 py-3 rounded-full font-semibold"
                  >
                    {home.cta_primary_text}
                  </Link>

                  <Link
                    href={home.cta_secondary_link || "#"}
                    className="border border-white text-white px-6 py-3 rounded-full"
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
                className="mt-10"
              >
                <ChevronDown className="text-white animate-bounce" />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section
        id="services"
        className="relative py-20 bg-slate-50 overflow-hidden"
      >
        <Container>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Our Service</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((item, idx) => (
              <Reveal key={item.id} delay={0.05 * idx}>
                <Card
                  title={item.title.rendered}
                  desc={item.acf?.description}
                  href={item.acf?.link || "#"}
                  icon={
                    <Image
                      src={icons[item.id] || "/fallback-icon.png"}
                      alt="Service icon"
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain"
                    />
                  }
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}