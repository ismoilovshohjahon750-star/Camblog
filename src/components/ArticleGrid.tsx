import React from 'react';
import { FileSearch } from 'lucide-react';
import type { Article, CategoryId } from '../types/blog';
import { ArticleCard } from './ArticleCard';

interface ArticleGridProps {
  articles: Article[];
  activeCategory: CategoryId;
  searchQuery: string;
  onSelectArticle: (article: Article) => void;
  onResetFilters: () => void;
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  activeCategory,
  searchQuery,
  onSelectArticle,
  onResetFilters,
}) => {
  return (
    <section
      id="maqolalar"
      aria-labelledby="articles-grid-heading"
      className="bg-white py-14 sm:py-16 dark:bg-[#111318]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-2 border-b border-neutral-200 pb-5 sm:flex-row sm:items-end dark:border-neutral-800">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#1A73E8] dark:text-[#60A5FA]">
              SAM CORP Editorial
            </p>
            <h2
              id="articles-grid-heading"
              className="mt-1 font-display text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-50"
            >
              {activeCategory === 'Barchasi' ? 'So‘nggi Maqolalar va Qo‘llanmalar' : activeCategory}
            </h2>
          </div>
          <p className="text-sm tabular-nums text-neutral-500 dark:text-neutral-400">
            Jami {articles.length} ta nashr
            {searchQuery.trim() ? ` · “${searchQuery.trim()}” bo‘yicha` : ''}
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-[#F8F9FA] px-6 py-16 text-center dark:border-neutral-800 dark:bg-[#161922]">
            <FileSearch
              className="h-10 w-10 text-neutral-400 dark:text-neutral-500"
              aria-hidden="true"
            />
            <h3 className="mt-4 font-display text-lg font-bold text-neutral-900 dark:text-neutral-50">
              Mos maqolalar topilmadi
            </h3>
            <p className="mt-2 max-w-md text-sm text-neutral-600 dark:text-neutral-300">
              Tanlangan rukn yoki qidiruv so‘zingiz bo‘yicha maqola mavjud emas. Barcha
              nashrlarni ko‘rish uchun filtrlarni tozalang.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-6 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              Barcha maqolalarni ko‘rish
            </button>
          </div>
        ) : (
          <div
            data-testid="articles-grid"
            className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onSelect={onSelectArticle}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
