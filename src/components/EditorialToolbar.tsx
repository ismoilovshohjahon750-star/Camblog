import React from 'react';
import { Moon, Search, Sun, X } from 'lucide-react';
import { BLOG_CATEGORIES } from '../data/articles';
import type { CategoryId } from '../types/blog';

interface EditorialToolbarProps {
  activeCategory: CategoryId;
  onCategoryChange: (category: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  resultCount: number;
}

export const EditorialToolbar: React.FC<EditorialToolbarProps> = ({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  theme,
  onToggleTheme,
  resultCount,
}) => {
  return (
    <section
      aria-label="Maqolalarni filtrlash va qidirish"
      className="border-y border-neutral-200 bg-[#F8F9FA] dark:border-neutral-800 dark:bg-[#161922]"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Blog ruknlari"
          className="flex flex-wrap items-center gap-1.5"
        >
          {BLOG_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategoryChange(category)}
                className={`shrink-0 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A73E8] ${
                  isActive
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                    : 'text-neutral-600 hover:bg-neutral-200/70 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Search & Light/Dark Theme Switcher */}
        <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
          <div className="relative flex-1 sm:w-64 sm:flex-none">
            <label htmlFor="blog-search-input" className="sr-only">
              Maqolalar bo‘yicha qidirish
            </label>
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400"
              aria-hidden="true"
            />
            <input
              id="blog-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Mavzu bo‘yicha qidirish..."
              className="h-10 w-full rounded-lg border border-neutral-300 bg-white pr-9 pl-9 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#1A73E8] focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 dark:border-neutral-700 dark:bg-[#111318] dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-[#60A5FA]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Qidiruvni tozalash"
                className="absolute top-1/2 right-2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Kunduzgi rejimga o‘tish' : 'Tungi rejimga o‘tish'}
            className="inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-neutral-300 bg-white px-3.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A73E8] dark:border-neutral-700 dark:bg-[#111318] dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-4 w-4 text-amber-400" aria-hidden="true" />
                <span>Kunduzgi rejim</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-neutral-600" aria-hidden="true" />
                <span>Tungi rejim</span>
              </>
            )}
          </button>

          <span className="hidden text-xs font-medium tabular-nums text-neutral-500 xl:inline-block dark:text-neutral-400">
            {resultCount} ta maqola
          </span>
        </div>
      </div>
    </section>
  );
};
