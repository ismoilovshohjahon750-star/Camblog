import React, { useState } from 'react';
import { Check, ExternalLink, Globe, Maximize2, Phone, Send, X } from 'lucide-react';
import {
  DISCOUNT_PACKAGES,
  POSTER_ARTWORK_IMAGE,
  SAM_CORP_CONTACTS,
} from '../data/articles';
import type { DiscountPackage } from '../types/blog';
import { calculateDiscountPricing } from '../utils/blogLogic';
import { BrandLogo } from './BrandLogo';
import { ResilientImage } from './ResilientImage';

type PosterSpotlight = 'umumiy' | 'telegram' | 'crm';

const SPOTLIGHT_COPY: Record<
  PosterSpotlight,
  {
    kicker: string;
    headline: string;
    description: string;
    highlights: string[];
  }
> = {
  umumiy: {
    kicker: 'SAM CORP Maxsus Aksiya',
    headline: 'SAM CORPDAN MAXSUS TAKLIF! 50% CHEGIRMA!',
    description:
      'Biznesingizni avtomatlashtiring va rivojlantiring! Telegram botlar va CRM tizimlariga 50% chegirma.',
    highlights: [
      'Telegram savdo va muloqot botlari',
      'Mijozlar boshqaruvi va CRM hisobotlar',
      'Bepul dastlabki texnik maslahat',
    ],
  },
  telegram: {
    kicker: 'Telegram Botlar',
    headline: '24/7 Savdo, Buyurtma va To‘lov Botlari — 50% Chegirma',
    description:
      'Mijozlaringiz bilan Telegram ichida tezkor savdo voronkasi, katalog va Click/Payme to‘lovlarini yo‘lga qo‘ying.',
    highlights: [
      'Avtomatik mahsulot katalogi va savatcha',
      'Click, Payme va Uzum to‘lov integratsiyasi',
      'Buyurtma statusi bo‘yicha avtomatik xabarnoma',
    ],
  },
  crm: {
    kicker: 'CRM Tizimlari',
    headline: 'Mijozlar Bazasi va Real-Vaqt Hisobotlar — 50% Chegirma',
    description:
      'Barcha lidlarni yagona savdo voronkasida nazorat qiling, menejerlar KPI va kunlik tushumni aniq ko‘ring.',
    highlights: [
      'Telegram, Instagram va qo‘ng‘iroqlarni birlashtirish',
      'Menejerlar samaradorligi va konversiya tahlili',
      'Rahbar uchun avtomatik kunlik hisobotlar',
    ],
  },
};

export const PosterShowcase: React.FC = () => {
  const [spotlight, setSpotlight] = useState<PosterSpotlight>('umumiy');
  const [selectedPackageId, setSelectedPackageId] = useState<DiscountPackage['id']>('bundle');
  const [posterZoomOpen, setPosterZoomOpen] = useState(false);

  const activePackage =
    DISCOUNT_PACKAGES.find((pkg) => pkg.id === selectedPackageId) ?? DISCOUNT_PACKAGES[0];
  const pricing = calculateDiscountPricing(activePackage.basePriceUzs, 50);
  const activeCopy = SPOTLIGHT_COPY[spotlight];

  const renderPosterCard = (isZoomed = false) => (
    <div
      className={`relative overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#161922] ${
        isZoomed ? 'mx-auto max-w-2xl' : 'h-full'
      }`}
    >
      {/* Top Poster Art Header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-neutral-200 dark:border-neutral-800">
        <ResilientImage
          src={POSTER_ARTWORK_IMAGE}
          alt="SAM CORP 50% chegirma reklama posteri grafikasi"
          fallbackTitle="SAM CORP — 50% Chegirma Posteri"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/45 to-neutral-950/90" />
        <div className="absolute inset-0 flex flex-col justify-between p-6 text-white sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <BrandLogo className="h-8 w-[74px]" onDarkSurface />
            <span className="font-mono text-xs font-semibold tracking-wider text-white">
              50% CHEGIRMA
            </span>
          </div>

          <div>
            <p className="text-xs font-medium tracking-wide text-blue-200">
              {activeCopy.kicker}
            </p>
            <h3 className="mt-1.5 font-display text-xl leading-tight font-bold text-balance text-white sm:text-2xl">
              {activeCopy.headline}
            </h3>
          </div>
        </div>
      </div>

      {/* Poster Editorial Body */}
      <div className="p-6 sm:p-7">
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {activeCopy.description}
        </p>

        <ul className="mt-5 space-y-2.5">
          {activeCopy.highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-sm text-neutral-800 dark:text-neutral-200"
            >
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-[#1A73E8] dark:text-[#60A5FA]"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-neutral-200 pt-5 dark:border-neutral-800">
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            Chegirmadan foydalanish uchun hozirroq murojaat qiling:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={SAM_CORP_CONTACTS.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-800 transition-colors hover:border-[#1A73E8] hover:text-[#1A73E8] dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
            >
              <Send className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{SAM_CORP_CONTACTS.telegramHandle}</span>
            </a>
            <a
              href={SAM_CORP_CONTACTS.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-800 transition-colors hover:border-[#1A73E8] hover:text-[#1A73E8] dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
            >
              <Globe className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{SAM_CORP_CONTACTS.websiteDisplay}</span>
            </a>
            <a
              href={SAM_CORP_CONTACTS.phoneHref}
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-neutral-200 px-3 py-2 text-xs font-medium tabular-nums text-neutral-800 transition-colors hover:border-[#1A73E8] hover:text-[#1A73E8] dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{SAM_CORP_CONTACTS.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="poster-vitrina"
      aria-labelledby="poster-section-heading"
      className="border-t border-neutral-200 bg-[#F8F9FA] py-14 sm:py-16 dark:border-neutral-800 dark:bg-[#14171F]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#1A73E8] dark:text-[#60A5FA]">
              Joriy Aksiya E’loni · Cheklangan muddat
            </p>
            <h2
              id="poster-section-heading"
              className="mt-1.5 font-display text-2xl font-bold tracking-tight text-balance text-neutral-900 sm:text-3xl dark:text-neutral-50"
            >
              Maxsus Taklif: Botlar va CRM Tizimlariga 50% Chegirma
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div
              role="group"
              aria-label="Poster ko‘rinishini tanlash"
              className="inline-flex rounded-lg border border-neutral-200 bg-white p-1 dark:border-neutral-800 dark:bg-[#111318]"
            >
              {(
                [
                  { id: 'umumiy', label: 'Umumiy' },
                  { id: 'telegram', label: 'Telegram Bot' },
                  { id: 'crm', label: 'CRM Tizim' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSpotlight(tab.id)}
                  className={`shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    spotlight === tab.id
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                      : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setPosterZoomOpen(true)}
              aria-label="Posterni to‘liq ko‘rish"
              className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-[#111318] dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Kattalashtirish</span>
            </button>
          </div>
        </div>

        {/* Two-Column Balanced Grid: Left Interactive Poster, Right 50% Savings Calculator */}
        <div className="mt-8 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">{renderPosterCard(false)}</div>

          <div className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 lg:col-span-6 dark:border-neutral-800 dark:bg-[#161922]">
            <div>
              <div className="flex items-center justify-between gap-4 border-b border-neutral-200 pb-4 dark:border-neutral-800">
                <div>
                  <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-neutral-50">
                    50% Chegirma Kalkulyatori
                  </h3>
                  <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                    Yo‘nalishni tanlang va tejaladigan mablag‘ni ko‘ring
                  </p>
                </div>
                <span className="font-mono text-xs font-semibold tabular-nums text-[#1A73E8] dark:text-[#60A5FA]">
                  -50% AKSIYA
                </span>
              </div>

              {/* Package Selector */}
              <div className="mt-5 grid grid-cols-1 gap-2.5">
                {DISCOUNT_PACKAGES.map((pkg) => {
                  const selected = pkg.id === selectedPackageId;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackageId(pkg.id)}
                      aria-pressed={selected}
                      className={`flex w-full items-center justify-between gap-4 rounded-xl border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A73E8] ${
                        selected
                          ? 'border-[#1A73E8] bg-blue-50/60 dark:border-[#60A5FA] dark:bg-blue-950/25'
                          : 'border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-800 dark:bg-[#111318] dark:hover:border-neutral-700'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="font-display text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                          {pkg.name}
                        </div>
                        <div className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                          Muddat: {pkg.deliveryDays}
                        </div>
                      </div>
                      <span className="shrink-0 font-mono text-xs font-semibold tabular-nums text-[#1A73E8] dark:text-[#60A5FA]">
                        {calculateDiscountPricing(pkg.basePriceUzs, 50).discountedFormatted}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Package Pricing Breakdown */}
              <div className="mt-6 rounded-xl border border-neutral-200 bg-[#F8F9FA] p-5 dark:border-neutral-800 dark:bg-[#111318]">
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {activePackage.summary}
                </p>

                <div className="mt-4 grid grid-cols-1 gap-3 border-t border-neutral-200 pt-4 sm:grid-cols-3 dark:border-neutral-800">
                  <div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      Standart narx
                    </div>
                    <div className="mt-1 whitespace-nowrap font-mono text-sm font-medium tabular-nums text-neutral-500 line-through dark:text-neutral-400">
                      {pricing.originalFormatted}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#1A73E8] dark:text-[#60A5FA]">
                      50% Chegirma bilan
                    </div>
                    <div className="mt-1 whitespace-nowrap font-mono text-sm font-bold tabular-nums text-neutral-900 sm:text-base dark:text-white">
                      {pricing.discountedFormatted}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      Sizning tejovingiz
                    </div>
                    <div className="mt-1 whitespace-nowrap font-mono text-sm font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">
                      {pricing.savingsFormatted}
                    </div>
                  </div>
                </div>
              </div>

              <ul className="mt-5 space-y-2">
                {activePackage.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-2.5 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300"
                  >
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1A73E8] dark:text-[#60A5FA]"
                      aria-hidden="true"
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-neutral-200 pt-5 dark:border-neutral-800">
              <a
                href={SAM_CORP_CONTACTS.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#1A73E8] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1557B0] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8]"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                <span>Chegirmani band qilish</span>
              </a>
              <a
                href={SAM_CORP_CONTACTS.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                <span>www.cloudbot.uz</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Poster Fullscreen Modal */}
      {posterZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="SAM CORP 50% Chegirma Posteri"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
          onClick={() => setPosterZoomOpen(false)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPosterZoomOpen(false)}
              aria-label="Posterni yopish"
              className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
            >
              <X className="h-5 w-5" />
            </button>
            {renderPosterCard(true)}
          </div>
        </div>
      )}
    </section>
  );
};
