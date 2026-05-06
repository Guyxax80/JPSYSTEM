"use client";

import Link from "next/link";
import {
  AlertTriangle,
  FileCheck,
  Fingerprint,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";

function StatBar({
  label,
  current,
  withSystem,
  currentProcessLabel,
  withJapanSystemLabel,
  currentLabel,
  withSystemLabel,
}: {
  label: string;
  current: number;
  withSystem: number;
  currentProcessLabel: string;
  withJapanSystemLabel: string;
  currentLabel: string;
  withSystemLabel: string;
}) {
  return (
    <div className="rounded-xl sm:rounded-2xl border border-slate-100 bg-white p-4 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="text-sm font-bold tracking-tight text-slate-900">{label}</div>
        <div className="text-xs font-semibold text-slate-500">
          {currentLabel} <span className="text-slate-900">{current}%</span> → {withSystemLabel}{" "}
          <span className="text-slate-900">{withSystem}%</span>
        </div>
      </div>
      <div className="mt-3 sm:mt-4 space-y-2">
        <div>
          <div className="mb-1 text-[11px] font-semibold tracking-wide text-slate-500">
            {currentProcessLabel}
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-slate-400/70 transition-all duration-1000"
              style={{ width: `${current}%` }}
            />
          </div>
        </div>
        <div>
          <div className="mb-1 text-[11px] font-semibold tracking-wide text-slate-500">
            {withJapanSystemLabel}
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-sky-500/70 transition-all duration-1000"
              style={{ width: `${withSystem}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InvoiceEReceiptPage() {
  const { t } = useLanguage();
  const p = t.pages.invoiceReceipt;

  return (
    <div>
      <PageTitle title={p.metaTitle} />

      {/* Section 1: Hero */}
      <section className="relative overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50" />
          <div
            className="absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(2,132,199,0.12), rgba(15,23,42,0.03)), url('/hero-it.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="hidden sm:block absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="hidden sm:block absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-slate-900/5 blur-3xl" />
        </div>

        <Container>
          <div className="relative py-12 sm:py-16 md:py-20 lg:py-24">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-100 bg-white/70 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                {p.heroChip}
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-4 sm:mt-6 max-w-3xl text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                {p.title}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-3 sm:mt-5 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7 md:text-lg">
                {p.heroSubtitle}
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 active:scale-95"
                  data-cursor="interactive"
                >
                  {p.cta.primary} <span className="ml-2 text-white/80">→</span>
                </Link>
                <Link
                  href="/e-tax"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-800 backdrop-blur transition-colors hover:border-slate-300 hover:bg-white/90 active:scale-95"
                  data-cursor="interactive"
                >
                  {p.cta.secondary}
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Section 2: Pain Points */}
      <section className="py-10 sm:py-14 md:py-16">
        <Container>
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
                {p.painTitle}
              </h2>
            </div>
          </Reveal>

          <div className="mt-6 sm:mt-10 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {p.painItems.map((it, idx) => (
              <Reveal key={it} delay={0.04 * idx}>
                <div className="rounded-xl sm:rounded-2xl border border-slate-100 bg-white p-4 sm:p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="grid h-9 w-9 sm:h-11 sm:w-11 shrink-0 place-items-center rounded-lg sm:rounded-xl border border-slate-100 bg-white">
                      <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-sky-600" strokeWidth={1.6} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold tracking-tight text-slate-900">
                        {it}
                      </div>
                      <div className="mt-1.5 sm:mt-2 text-sm leading-5 sm:leading-6 text-slate-600">
                        {p.painItemSub}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 3: Solution */}
      <section className="border-y border-slate-100 bg-slate-50/50 py-10 sm:py-14 md:py-16">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
                {p.solutionTitle}
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-6 sm:leading-7 text-slate-600">
                {p.solutionDesc}
              </p>
            </div>
          </Reveal>

          <div className="mt-6 sm:mt-10 grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">
            <Reveal>
              {/* Image Placeholder */}
              <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 to-slate-100 p-5 sm:p-7 shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
                <div className="aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl border border-slate-100 bg-white">
                  <div className="grid h-full w-full place-items-center">
                    <div className="text-xs font-semibold text-slate-500">{p.solutionIllustration}</div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="space-y-4 sm:space-y-5">
                <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-5 sm:p-7 shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
                  <div className="flex items-start gap-3 sm:gap-5">
                    <div className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-xl sm:rounded-2xl border border-slate-100 bg-white">
                      <FileCheck className="h-5 w-5 sm:h-6 sm:w-6 text-sky-600" strokeWidth={1.6} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold tracking-tight text-slate-900">
                        {p.blocks.eTax.title}
                      </div>
                      <div className="mt-1.5 sm:mt-2 text-sm leading-5 sm:leading-6 text-slate-600">
                        {p.blocks.eTax.desc}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-6 h-px w-full bg-slate-100" />
                  <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs font-semibold text-slate-600">
                    <div className="rounded-xl sm:rounded-2xl border border-slate-100 bg-white p-3 sm:p-4">
                      {p.solutionChipA}
                    </div>
                    <div className="rounded-xl sm:rounded-2xl border border-slate-100 bg-white p-3 sm:p-4">
                      {p.solutionChipB}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-5 sm:p-7 shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
                  <div className="flex items-start gap-3 sm:gap-5">
                    <div className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-xl sm:rounded-2xl border border-slate-100 bg-white">
                      <Fingerprint className="h-5 w-5 sm:h-6 sm:w-6 text-sky-600" strokeWidth={1.6} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold tracking-tight text-slate-900">
                        {p.blocks.signature.title}
                      </div>
                      <div className="mt-1.5 sm:mt-2 text-sm leading-5 sm:leading-6 text-slate-600">
                        {p.blocks.signature.desc}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-6 h-px w-full bg-slate-100" />
                  <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs font-semibold text-slate-600">
                    <div className="rounded-xl sm:rounded-2xl border border-slate-100 bg-white p-3 sm:p-4">
                      {p.sigChipA}
                    </div>
                    <div className="rounded-xl sm:rounded-2xl border border-slate-100 bg-white p-3 sm:p-4">
                      {p.sigChipB}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-sky-600 shrink-0" strokeWidth={1.6} />
                <div className="text-sm font-bold tracking-tight text-slate-900">
                  {p.trustTitle}
                </div>
              </div>
              <div className="mt-1.5 sm:mt-2 text-sm leading-5 sm:leading-6 text-slate-600">
                {p.trustDesc}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Section 4: Cost reduction & comparison */}
      <section className="py-10 sm:py-14 md:py-16">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
                {p.compareTitle}
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-6 sm:leading-7 text-slate-600">
                {p.compareSubtitle}
              </p>
            </div>
          </Reveal>

          <div className="mt-6 sm:mt-10 grid grid-cols-1 gap-4 sm:gap-5">
            {p.metrics.map((m, idx) => (
              <Reveal key={m.k} delay={0.05 * idx}>
                <StatBar
                  label={m.k}
                  current={m.current}
                  withSystem={m.withSystem}
                  currentProcessLabel={p.currentProcess}
                  withJapanSystemLabel={p.withJapanSystem}
                  currentLabel={p.currentLabel}
                  withSystemLabel={p.withSystemLabel}
                />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <div className="mt-6 sm:mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-5 sm:p-7 sm:flex-row sm:items-center">
              <div>
                <div className="text-sm font-bold tracking-tight text-slate-900">
                  {p.ctaTitle}
                </div>
                <div className="mt-1.5 sm:mt-2 text-sm leading-5 sm:leading-6 text-slate-600">
                  {p.ctaDesc}
                </div>
              </div>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 active:scale-95 shrink-0"
                data-cursor="interactive"
              >
                {p.cta.primary} <span className="ml-2 text-white/80">→</span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
