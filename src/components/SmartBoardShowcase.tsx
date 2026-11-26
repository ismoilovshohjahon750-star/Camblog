import React, { useState } from 'react';
import {
  ArrowUpRight,
  Clock,
  Cpu,
  LayoutGrid,
  Lock,
  Monitor,
  Send,
  ShieldCheck,
  Sliders,
} from 'lucide-react';
import { SAM_CORP_CONTACTS, SMARTBOARD_IMAGES } from '../data/articles';
import type { Article } from '../types/blog';
import { ResilientImage } from './ResilientImage';

interface SmartBoardShowcaseProps {
  article?: Article;
  onReadArticle: (article: Article) => void;
}

type ScreenId = 'desktop' | 'apps' | 'lock';

const SCREEN_TABS: {
  id: ScreenId;
  label: string;
  title: string;
  description: string;
  src: string;
  alt: string;
}[] = [
  {
    id: 'desktop',
    label: 'Ishchi stol va Dock',
    title: 'Minimalist ishchi stol va Frosted Glass Dock',
    description:
      'Dars sessiyasi ochilgach pastki qismda shaffof oyna effektli panel faollashadi. 4 tagacha ilovani Drag-and-Drop bilan mahkamlash va o‘ng tugma orqali More Apps ro‘yxatini ochish mumkin.',
    src: SMARTBOARD_IMAGES.desktopDock,
    alt: 'SmartBoard 86 ishchi stoli va pastki frosted glass Dock paneli',
  },
  {
    id: 'apps',
    label: 'Barcha ilovalar',
    title: 'More Apps — O‘rnatilgan ilovalar panjarasi',
    description:
      'Barcha ta’lim va tizim ilovalari tartibli panjarada jamlangan. Kerakli ilovani barmoq bilan bosib turib Dock paneliga olib chiqish yoki qaytarish xotirada saqlanadi.',
    src: SMARTBOARD_IMAGES.moreApps,
    alt: 'SmartBoard 86 barcha ilovalar ro‘yxati (More Apps) ekrani',
  },
  {
    id: 'lock',
    label: 'Xavfsiz kutish rejimi',
    title: 'Blokirovka (App Pinned) — Tanaffusda to‘liq himoya',
    description:
      'Oq-qora tog‘ manzarasi orqasida chuqurlik effektli yirik soat ko‘rinadi. Pastki panel va tizim navigatsiyasi yashiriladi; qayta yoqilganda ham himoya avtomatik faollashadi.',
    src: SMARTBOARD_IMAGES.lockedScreen,
    alt: 'SmartBoard 86 App pinned xavfsiz blokirovka kutish rejimi',
  },
];

const CAPABILITIES = [
  {
    icon: Lock,
    title: '1. Xavfsiz blokirovka (Kutish) rejimi',
    text: 'Tanaffus va darsdan tashqari vaqtlarda navigatsiya hamda begona ilovalar to‘liq cheklanadi, qurilma qayta yoqilganda ham himoya saqlanadi.',
  },
  {
    icon: LayoutGrid,
    title: '2. Minimalist ishchi stol va Dock paneli',
    text: '4 tagacha asosiy ilovani suzuvchi frosted glass panelga Drag-and-Drop usulida mahkamlash va More Apps orqali tezkor ochish.',
  },
  {
    icon: Send,
    title: '3. Masofadan Telegram boshqaruvi',
    text: 'Ruxsat etilgan o‘qituvchi va IT administratorlar darsni ochishi, vaqtni uzaytirishi, pauza qo‘yishi va doskani masofadan qulflashi mumkin.',
  },
  {
    icon: Clock,
    title: '4. Dars taymeri va Whiteboard',
    text: '45 daqiqalik suzuvchi taymer 5 daqiqa qolganda ovozli ogohlantirish beradi; tezkor tushuntirish uchun to‘liq ekranli Whiteboard kiritilgan.',
  },
  {
    icon: ShieldCheck,
    title: '5. Markazlashtirilgan nazorat va PIN-kod',
    text: 'Xonalar, o‘qituvchilar va kirish jurnali alohida boshqariladi; tizim sozlamalari PIN-kod bilan himoyalangan.',
  },
];

export const SmartBoardShowcase: React.FC<SmartBoardShowcaseProps> = ({
  article,
  onReadArticle,
}) => {
  const [activeScreenId, setActiveScreenId] = useState<ScreenId>('desktop');

  const currentScreen =
    SCREEN_TABS.find((tab) => tab.id === activeScreenId) ?? SCREEN_TABS[0];

  return (
    <section
      id="smartboard-86"
      aria-labelledby="smartboard-heading"
      className="scroll-mt-20 border-t border-neutral-200 bg-white py-16 sm:py-20 dark:border-neutral-800 dark:bg-[#111318]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-neutral-200 pb-8 lg:flex-row lg:items-end dark:border-neutral-800">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              <span className="font-semibold text-[#1A73E8] dark:text-[#60A5FA]">
                SAM Corp korporativ yechimlari
              </span>
              <span aria-hidden="true">·</span>
              <span>Versiya 1.0</span>
              <span aria-hidden="true">·</span>
              <span>86 dyuymli 4K Android panellar</span>
            </div>
            <h2
              id="smartboard-heading"
              className="mt-2 font-display text-2xl leading-tight font-bold tracking-tight text-balance text-neutral-900 sm:text-4xl dark:text-neutral-50"
            >
              SmartBoard 86: Interaktiv doskalar uchun xavfsiz boshqaruv va launcher tizimi
            </h2>
            <p className="mt-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
              Maktablar, universitetlar, o‘quv markazlari va konferensiya zallaridagi katta
              ekranli Android doskalarni tanaffusda himoyalangan holatda saqlash hamda dars
              jarayonlarini Telegram orqali tartibli avtomatlashtirish yechimi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {article && (
              <button
                type="button"
                onClick={() => onReadArticle(article)}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-[#1A73E8] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1557B0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A73E8] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8]"
              >
                <span>To‘liq maqolani o‘qish</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
            <a
              href={SAM_CORP_CONTACTS.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-[#1A73E8] dark:border-neutral-700 dark:bg-[#161922] dark:text-neutral-100 dark:hover:border-[#60A5FA]"
            >
              <Send className="h-4 w-4 text-[#1A73E8] dark:text-[#60A5FA]" aria-hidden="true" />
              <span>Demo so‘rash</span>
            </a>
          </div>
        </div>

        {/* Interactive Gallery + Capabilities Grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left 7 Cols: Interactive 3-Screen SmartBoard 86 Viewer */}
          <div className="lg:col-span-7">
            <div
              role="tablist"
              aria-label="SmartBoard 86 ekran ko‘rinishlari"
              className="mb-4 flex flex-wrap gap-2"
            >
              {SCREEN_TABS.map((tab) => {
                const isSelected = tab.id === activeScreenId;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveScreenId(tab.id)}
                    className={`rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                      isSelected
                        ? 'border-[#1A73E8] bg-[#1A73E8] text-white dark:border-[#2563EB] dark:bg-[#2563EB]'
                        : 'border-neutral-200 bg-[#F8F9FA] text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#161922] dark:text-neutral-300 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-[#F8F9FA] dark:border-neutral-800 dark:bg-[#161922]">
              <div className="aspect-[16/8] w-full overflow-hidden bg-neutral-950">
                <ResilientImage
                  src={currentScreen.src}
                  alt={currentScreen.alt}
                  fallbackTitle={currentScreen.title}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="border-t border-neutral-200 p-5 sm:p-6 dark:border-neutral-800">
                <h3 className="font-display text-base font-bold text-neutral-900 sm:text-lg dark:text-neutral-50">
                  {currentScreen.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {currentScreen.description}
                </p>

                {/* Quick 3-thumbnail switcher strip */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {SCREEN_TABS.map((thumb) => {
                    const active = thumb.id === activeScreenId;
                    return (
                      <button
                        key={thumb.id}
                        type="button"
                        onClick={() => setActiveScreenId(thumb.id)}
                        aria-label={`Ekran ko‘rinishini tanlash: ${thumb.label}`}
                        className={`overflow-hidden rounded-lg border text-left transition-colors ${
                          active
                            ? 'border-[#1A73E8] ring-2 ring-[#1A73E8]/25 dark:border-[#60A5FA]'
                            : 'border-neutral-200 opacity-80 hover:opacity-100 dark:border-neutral-700'
                        }`}
                      >
                        <div className="aspect-[16/8] w-full bg-neutral-950">
                          <ResilientImage
                            src={thumb.src}
                            alt={thumb.alt}
                            fallbackTitle={thumb.label}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: 5 Core Capabilities */}
          <div className="space-y-3 lg:col-span-5">
            {CAPABILITIES.map((cap) => {
              const IconComponent = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="rounded-xl border border-neutral-200 bg-[#F8F9FA] p-4 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-[#161922] dark:hover:border-neutral-700"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#1A73E8] border border-neutral-200 dark:border-neutral-700 dark:bg-[#111318] dark:text-[#60A5FA]">
                      <IconComponent className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        {cap.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                        {cap.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technical Requirements & Privacy Strip */}
        <div className="mt-8 grid grid-cols-1 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-[#F8F9FA] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x dark:divide-neutral-800 dark:border-neutral-800 dark:bg-[#161922]">
          <div className="p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1A73E8] dark:text-[#60A5FA]">
              <Monitor className="h-4 w-4" aria-hidden="true" />
              <span>Operatsion tizim</span>
            </div>
            <div className="mt-1.5 font-display text-sm font-bold text-neutral-900 dark:text-neutral-100">
              Android 7.0 – 16 (API 24+)
            </div>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              Katta formatli 4K gorizontal (Landscape) displeylar uchun moslashtirilgan.
            </p>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1A73E8] dark:text-[#60A5FA]">
              <Sliders className="h-4 w-4" aria-hidden="true" />
              <span>Operativ xotira (RAM)</span>
            </div>
            <div className="mt-1.5 font-display text-sm font-bold text-neutral-900 dark:text-neutral-100">
              Minimal 2 GB (4 GB+ tavsiya)
            </div>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              4K panellarda silliq animatsiya va ko‘p ilovali ishlash uchun.
            </p>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1A73E8] dark:text-[#60A5FA]">
              <Cpu className="h-4 w-4" aria-hidden="true" />
              <span>Protsessor arxitekturasi</span>
            </div>
            <div className="mt-1.5 font-display text-sm font-bold text-neutral-900 dark:text-neutral-100">
              ARM64, ARMv7, x86_64, x86
            </div>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              Bozordagi barcha asosiy interaktiv panellar va Android pristavkalar bilan mos.
            </p>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1A73E8] dark:text-[#60A5FA]">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <span>Xavfsizlik va maxfiylik</span>
            </div>
            <div className="mt-1.5 font-display text-sm font-bold text-neutral-900 dark:text-neutral-100">
              Yopiq nazorat modeli
            </div>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              Fayllar begona xizmatlarga uzatilmaydi; faqat vakolatli hisoblar boshqaradi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
