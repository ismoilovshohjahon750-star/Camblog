import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Article } from '../types/blog';
import { ResilientImage } from './ResilientImage';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onSelect }) => {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-[#161922] dark:hover:border-neutral-700">
      <button
        type="button"
        onClick={() => onSelect(article)}
        className="flex h-full flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A73E8]"
      >
        <div className="aspect-[4/3] w-full overflow-hidden border-b border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
          <ResilientImage
            src={article.image}
            alt={article.imageAlt}
            fallbackTitle={article.category}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            {/* Zero-pill unboxed metadata line */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              <span className="font-semibold text-[#1A73E8] dark:text-[#60A5FA]">
                {article.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>{article.publishedAt}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{article.readTimeMinutes} daqiqa</span>
            </div>

            <h3 className="mt-3 font-display text-lg leading-snug font-bold text-balance text-neutral-900 transition-colors group-hover:text-[#1A73E8] dark:text-neutral-50 dark:group-hover:text-[#60A5FA]">
              {article.title}
            </h3>

            <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {article.excerpt}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4 text-xs font-medium text-neutral-500 dark:border-neutral-800/80 dark:text-neutral-400">
            <span className="truncate">{article.author.name}</span>
            <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-[#1A73E8] dark:text-[#60A5FA]">
              <span>O‘qish</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </button>
    </article>
  );
};
