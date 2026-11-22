import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { CategoryId } from '../types/blog';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  onSelectCategory: (category: CategoryId) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectCategory,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/90 bg-white/95 backdrop-blur-sm dark:border-neutral-800/90 dark:bg-[#111318]/95">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Official SAM CORP Brand Logo */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick(() => {
              onSelectCategory('Barchasi');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            });
          }}
          className="flex shrink-0 items-center whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A73E8]"
        >
          <BrandLogo className="h-10 w-[92px]" />
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav
          aria-label="Asosiy navigatsiya"
          className="hidden items-center gap-6 md:flex"
        >
          <button
            type="button"
            onClick={() => {
              onSelectCategory('Barchasi');
              onNavigateSection('maqolalar');
            }}
            className="shrink-0 whitespace-nowrap text-sm font-medium text-neutral-600 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A73E8] dark:text-neutral-300 dark:hover:text-white"
          >
            Barcha maqolalar
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectCategory('Yangiliklar');
              onNavigateSection('maqolalar');
            }}
            className="shrink-0 whitespace-nowrap text-sm font-medium text-neutral-600 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A73E8] dark:text-neutral-300 dark:hover:text-white"
          >
            Yangiliklar
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectCategory('Telegram Botlar');
              onNavigateSection('maqolalar');
            }}
            className="shrink-0 whitespace-nowrap text-sm font-medium text-neutral-600 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A73E8] dark:text-neutral-300 dark:hover:text-white"
          >
            Telegram Botlar
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectCategory('CRM Tizimlari');
              onNavigateSection('maqolalar');
            }}
            className="shrink-0 whitespace-nowrap text-sm font-medium text-neutral-600 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A73E8] dark:text-neutral-300 dark:hover:text-white"
          >
            CRM Tizimlari
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectCategory('Keyslar');
              onNavigateSection('maqolalar');
            }}
            className="shrink-0 whitespace-nowrap text-sm font-medium text-neutral-600 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A73E8] dark:text-neutral-300 dark:hover:text-white"
          >
            Keyslar
          </button>
        </nav>

        {/* Zone 3: Single Primary Action (+ mobile menu trigger on small screens) */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigateSection('murojaat')}
            className="shrink-0 whitespace-nowrap rounded-lg bg-[#1A73E8] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1557B0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A73E8] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8]"
          >
            Bog‘lanish
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 transition-colors hover:bg-neutral-100 md:hidden dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-neutral-200 bg-white px-4 py-4 md:hidden dark:border-neutral-800 dark:bg-[#111318]">
          <nav aria-label="Mobil navigatsiya" className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() =>
                handleNavClick(() => {
                  onSelectCategory('Barchasi');
                  onNavigateSection('maqolalar');
                })
              }
              className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-neutral-800 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-800"
            >
              Barcha maqolalar
            </button>
            <button
              type="button"
              onClick={() =>
                handleNavClick(() => {
                  onSelectCategory('Yangiliklar');
                  onNavigateSection('maqolalar');
                })
              }
              className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-neutral-800 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-800"
            >
              Yangiliklar
            </button>
            <button
              type="button"
              onClick={() =>
                handleNavClick(() => {
                  onSelectCategory('Telegram Botlar');
                  onNavigateSection('maqolalar');
                })
              }
              className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-neutral-800 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-800"
            >
              Telegram Botlar
            </button>
            <button
              type="button"
              onClick={() =>
                handleNavClick(() => {
                  onSelectCategory('CRM Tizimlari');
                  onNavigateSection('maqolalar');
                })
              }
              className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-neutral-800 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-800"
            >
              CRM Tizimlari
            </button>
            <button
              type="button"
              onClick={() =>
                handleNavClick(() => {
                  onSelectCategory('Keyslar');
                  onNavigateSection('maqolalar');
                })
              }
              className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-neutral-800 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-800"
            >
              Keyslar
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
