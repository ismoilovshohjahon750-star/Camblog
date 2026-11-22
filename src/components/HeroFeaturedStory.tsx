import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Article } from '../types/blog';
import { ResilientImage } from './ResilientImage';

interface HeroFeaturedStoryProps {
  article: Article;
  onReadArticle: (article: Article) => void;
  onScrollToPoster: () => void;
}

export const HeroFeaturedStory: React.FC<HeroFeaturedStoryProps> = ({
  article,
  onReadArticle,
  onScrollToPoster,
}) => {
  return (
    <section
      aria-labelledby="hero-headline"
      className="bg-white pt-10 pb-12 sm:pt-14 sm:pb-16 dark:bg-[#111318]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Editorial Column */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              {/* Unboxed Editorial Metadata Kicker */}
              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
                <span className="font-semibold text-[#1A73E8] dark:text-[#60A5FA]">
                  SAM CORP Rasmiy Blogi
                </span>
                <span aria-hidden="true">·</span>
                <span>{article.category}</span>
                <span aria-hidden="true">·</span>
                <span>{article.publishedAt}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{article.readTimeMinutes} daqiqa o‘qish</span>
              </div>

              <h1
                id="hero-headline"
                className="font-display text-[clamp(2rem,3.4vw,3rem)] leading-[1.14] font-bold tracking-tight text-balance text-neutral-900 dark:text-neutral-50"
              >
                {article.title}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300">
                {article.subtitle}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onReadArticle(article)}
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#1A73E8] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1557B0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A73E8] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8]"
              >
                <span>Maqolani o‘qish</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onScrollToPoster}
                className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A73E8] dark:border-neutral-700 dark:bg-[#181B23] dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                <span>Joriy 50% chegirma taklifi</span>
              </button>
            </div>
          </div>

          {/* Right Media Column */}
          <div className="lg:col-span-6">
            <button
              type="button"
              onClick={() => onReadArticle(article)}
              aria-label={`Maqolani ochish: ${article.title}`}
              className="group block h-full w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A73E8] dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="aspect-video h-full w-full overflow-hidden">
                <ResilientImage
                  src={article.image}
                  alt={article.imageAlt}
                  fallbackTitle="SAM CORP Rasmiy Blogi"
                  className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Full-Width Editorial Pillars Strip Below Hero Split */}
        <div className="mt-8 grid grid-cols-1 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-[#F8F9FA] sm:mt-10 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-neutral-800 dark:border-neutral-800 dark:bg-[#161922]">
          <div className="px-5 py-3.5 sm:px-6 sm:py-4">
            <div className="font-display text-lg font-bold text-neutral-900 dark:text-neutral-50">
              Telegram Botlar
            </div>
            <div className="mt-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Savdo, katalog va 24/7 muloqot
            </div>
            <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
              To‘lov tizimlari va avtomatik buyurtmalar arxitekturasi
            </p>
          </div>
          <div className="px-5 py-3.5 sm:px-6 sm:py-4">
            <div className="font-display text-lg font-bold text-neutral-900 dark:text-neutral-50">
              CRM Tizimlari
            </div>
            <div className="mt-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Mijozlar bazasi va real-vaqt tahlil
            </div>
            <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
              Savdo voronkasi, KPI nazorati va kunlik hisobotlar
            </p>
          </div>
          <div className="px-5 py-3.5 sm:px-6 sm:py-4">
            <div className="font-display text-lg font-bold text-[#1A73E8] dark:text-[#60A5FA]">
              50% Chegirma E’loni
            </div>
            <div className="mt-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Joriy mavsumiy aksiya
            </div>
            <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
              Yangi bot va CRM loyihalari uchun maxsus shartlar
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
