"use client";

import { SiteImage as Image } from "@/components/SiteImage";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { useImageConfig } from "@/components/ImageConfigProvider";

export default function CompanyProfilePage() {
  const { t } = useLanguage();
  const { resolve } = useImageConfig();
  const p = t.pages.company;

  return (
    <div className="relative overflow-hidden">
      <PageTitle title={p.metaTitle} />

      {/* Section 1: Hero */}
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/topB_company_profile.jpg"
            alt="Company background"
            fill
            sizes="100vw"
            quality={50}
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10">
          <Container>
            <div className="max-w-2xl">
              <Reveal>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                  {p.title}
                </h1>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-3 sm:mt-5 text-base sm:text-lg font-normal leading-7 sm:leading-8 text-slate-700">
                  {p.subtitle}
                </p>
              </Reveal>
            </div>
          </Container>
        </div>
      </section>

      {/* Section 2: About */}
      <section className="relative py-10 sm:py-14 md:py-16 overflow-hidden">
        {/* Background decorations */}
        <div className="hidden sm:block absolute -right-32 top-20 h-64 w-64 rounded-full bg-sky-100/40 blur-3xl" />
        <div className="hidden sm:block absolute -left-32 bottom-20 h-48 w-48 rounded-full bg-indigo-100/30 blur-3xl" />

        <Container>
          <div className="relative grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-[0_28px_90px_rgba(15,23,42,0.08)] card-glow gradient-border">
                <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
                  {p.about.title}
                </h2>
                <div className="mt-3 sm:mt-4 h-0.5 w-12 sm:w-16 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" />
                <p className="mt-4 sm:mt-5 text-sm sm:text-base font-light leading-6 sm:leading-7 text-slate-600">
                  {p.about.body}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-100 bg-white shadow-[0_28px_90px_rgba(15,23,42,0.08)]">
                <div
                  className="aspect-[16/10] w-full transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{
                    backgroundImage: `url('${resolve("/office.jpg")}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  aria-label={p.about.imageAlt}
                  role="img"
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/45 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/30 to-transparent" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Section 3: Corporate Information */}
      <section className="relative border-y border-slate-100 bg-gradient-to-br from-slate-50 to-sky-50/30 py-10 sm:py-14 md:py-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-2/3 bg-gradient-to-r from-transparent via-sky-200/50 to-transparent" />

        <Container>
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
                {p.infoTitle}
              </h2>
            </div>
          </Reveal>

          <div className="mt-6 sm:mt-10 overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-100 bg-white shadow-[0_28px_90px_rgba(15,23,42,0.06)]">
            <div className="divide-y divide-slate-100">
              {p.info.map((r, idx) => (
                <Reveal key={r.k} delay={0.04 * idx}>
                  <div className="grid grid-cols-1 gap-1 sm:gap-2 p-4 sm:p-6 sm:grid-cols-3 sm:items-center transition-colors duration-300 hover:bg-sky-50/30">
                    <div className="flex items-center gap-2 text-sm font-bold tracking-wide text-indigo-700">
                      <span className="inline-block w-1 h-5 rounded-full bg-gradient-to-b from-indigo-500 to-sky-400 shrink-0" />
                      {r.k}
                    </div>
                    <div className="sm:col-span-2 text-sm font-semibold text-slate-900 break-words">
                      {r.v}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}