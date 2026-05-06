"use client";

import { SiteImage as Image } from "@/components/SiteImage";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { ChevronDown } from "lucide-react";

export default function ITSystemPage() {
  const { t } = useLanguage();
  const p = t.pages.itSystem;

  const serviceImages = [
    "/Maintainance.png",
    "/Website & Online marketing.png",
    "/IT Support & Help Desk.png",
    "/Product management system.png",
  ];

  const scrollToContent = () => {
    const content = document.getElementById("it-content");
    content?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      <PageTitle title={p.metaTitle} />

      {/* --- Hero Section --- */}
      <section className="relative h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/topbg_system.jpg"
            alt="IT System Background"
            fill
            sizes="100vw"
            quality={65}
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/50 to-slate-900/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/20 to-indigo-900/10" />
        </div>

        {/* Decorative floating elements */}
        <div className="hidden sm:block absolute -right-20 top-1/4 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl animate-float" />
        <div className="hidden sm:block absolute -left-16 bottom-1/3 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl animate-float-delayed" />

        <div className="relative z-10 text-center px-5 sm:px-6 max-w-3xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-md mb-4 sm:mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-white/90 uppercase">
                {p.productsTitle}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-2xl">
              {p.title}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-white/70 max-w-2xl mx-auto">
              {p.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <button
              onClick={scrollToContent}
              className="mt-8 sm:mt-12 group relative inline-flex items-center justify-center"
            >
              <div className="absolute h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/15" />
              <ChevronDown className="relative h-6 w-6 sm:h-7 sm:w-7 text-white animate-bounce" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* --- Products / Services Grid --- */}
      <section id="it-content" className="relative py-14 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-2/3 bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
        <div className="hidden sm:block absolute -right-32 top-20 h-64 w-64 rounded-full bg-sky-100/50 blur-3xl" />
        <div className="hidden sm:block absolute -left-32 bottom-20 h-64 w-64 rounded-full bg-indigo-100/30 blur-3xl" />

        <Container>
          <div className="relative">
            <Reveal>
              <div className="text-center mb-10 sm:mb-14">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-slate-600 shadow-sm mb-3 sm:mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                  {p.productsTitle}
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
                  {p.title}
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2">
              {p.serviceItems.map((item, idx) => (
                <Reveal key={item.title} delay={0.08 * idx}>
                  <div className="group relative rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-5 sm:p-7 shadow-[0_24px_80px_rgba(15,23,42,0.06)] card-glow gradient-border overflow-hidden">
                    {/* Gradient accent on hover */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-sky-50/0 to-indigo-50/0 transition-all duration-500 group-hover:from-sky-50/50 group-hover:to-indigo-50/30" />

                    <div className="relative flex flex-col items-start gap-4 sm:gap-5">
                      <div className="w-full sm:w-auto shrink-0">
                        <div className="relative aspect-[4/3] sm:aspect-square w-full sm:w-28 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
                          <Image
                            src={serviceImages[idx]}
                            alt={item.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 112px"
                            loading="lazy"
                            className="object-contain p-3 sm:p-2 transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-sky-700">
                          {item.title}
                        </h3>
                        <div className="mt-2 h-0.5 w-8 sm:w-10 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                    </div>

                    {/* Arrow indicator */}
                    <div className="absolute right-4 sm:right-5 top-4 sm:top-5 opacity-0 transition-all duration-300 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0">
                      <span className="text-sky-500/60 text-sm">→</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* --- Features Grid --- */}
      <section className="relative py-14 sm:py-20 overflow-hidden bg-gradient-to-br from-slate-50 to-sky-50/30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-2/3 bg-gradient-to-r from-transparent via-sky-200/50 to-transparent" />

        <Container>
          <Reveal>
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
                {p.productsTitle}
              </h2>
              <div className="mt-3 sm:mt-4 mx-auto h-0.5 w-12 sm:w-16 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
            {p.features.map((feature, idx) => (
              <Reveal key={feature.title} delay={0.06 * idx}>
                <div className="group rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-[0_24px_80px_rgba(15,23,42,0.06)] hover-lift">
                  <div className="flex items-start gap-4">
                    <div className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 shadow-md shadow-sky-500/20 transition-transform duration-300 group-hover:scale-110">
                      <span className="text-white text-lg sm:text-xl font-bold">{idx + 1}</span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-bold tracking-tight text-slate-900">
                        {feature.title}
                      </h3>
                      <p className="mt-1.5 sm:mt-2 text-sm leading-6 text-slate-500">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          <Reveal delay={0.2}>
            <div className="mt-10 sm:mt-14 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold text-white shadow-xl shadow-slate-900/10 transition-all hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-2xl shimmer"
              >
                {t.nav.contact}
                <span className="ml-2 text-white/60">→</span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
