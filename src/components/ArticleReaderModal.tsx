import React, { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowUpRight, Check, Globe, Phone, Send, X } from 'lucide-react';
import { SAM_CORP_CONTACTS } from '../data/articles';
import type { Article } from '../types/blog';
import { getRelatedArticles } from '../utils/blogLogic';
import { ResilientImage } from './ResilientImage';

interface ArticleReaderModalProps {
  article: Article | null;
  allArticles: Article[];
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  allArticles,
  onClose,
  onSelectArticle,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!article) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [article, onClose]);

  if (!article) return null;

  const relatedArticles = getRelatedArticles(allArticles, article, 3);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reader-article-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/65 p-0 backdrop-blur-xs sm:p-6"
      onClick={onClose}
    >
      <div
        ref={scrollContainerRef}
        onClick={(e) => e.stopPropagation()}
        className="relative h-full w-full max-w-4xl overflow-y-auto bg-white shadow-2xl sm:max-h-[92vh] sm:rounded-2xl sm:border sm:border-neutral-200 dark:bg-[#111318] dark:sm:border-neutral-800"
      >
        {/* Sticky Reader Top Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-neutral-200 bg-white/95 px-5 py-3.5 backdrop-blur-sm sm:px-8 dark:border-neutral-800 dark:bg-[#111318]/95">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Blogga qaytish</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Maqolani yopish"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Article Content Container */}
        <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-10">
          {/* Unboxed Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
            <span className="font-semibold text-[#1A73E8] dark:text-[#60A5FA]">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{article.readTimeMinutes} daqiqa o‘qish</span>
          </div>

          <h1
            id="reader-article-title"
            className="mt-3 font-display text-2xl leading-tight font-bold tracking-tight text-balance text-neutral-900 sm:text-4xl dark:text-neutral-50"
          >
            {article.title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300">
            {article.subtitle}
          </p>

          <div className="mt-5 flex items-center gap-3 border-y border-neutral-200 py-3.5 text-sm dark:border-neutral-800">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              {article.author.name}
            </span>
            <span className="text-neutral-400" aria-hidden="true">
              /
            </span>
            <span className="text-neutral-500 dark:text-neutral-400">
              {article.author.role}
            </span>
          </div>

          {/* Hero Image */}
          <div className="mt-7 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="aspect-[16/9] w-full">
              <ResilientImage
                src={article.image}
                alt={article.imageAlt}
                fallbackTitle={article.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Metrics Row if present */}
          {article.metrics && article.metrics.length > 0 && (
            <div className="mt-8 grid grid-cols-1 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-[#F8F9FA] sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-neutral-800 dark:border-neutral-800 dark:bg-[#161922]">
              {article.metrics.map((metric) => (
                <div key={metric.label} className="p-5">
                  <div className="font-display text-2xl font-bold tabular-nums text-[#1A73E8] dark:text-[#60A5FA]">
                    {metric.value}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {metric.label}
                  </div>
                  <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                    {metric.context}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Key Takeaways */}
          <div className="mt-8 rounded-xl border border-neutral-200 bg-[#F8F9FA] p-6 dark:border-neutral-800 dark:bg-[#161922]">
            <h2 className="font-display text-base font-bold text-neutral-900 dark:text-neutral-50">
              Asosiy xulosalar
            </h2>
            <ul className="mt-3.5 space-y-2.5">
              {article.keyTakeaways.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300"
                >
                  <Check
                    className="mt-1 h-4 w-4 shrink-0 text-[#1A73E8] dark:text-[#60A5FA]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Body Prose Sections */}
          <div className="mt-8 space-y-8">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl dark:text-neutral-50">
                  {section.heading}
                </h2>
                <div className="mt-3.5 space-y-4 text-base leading-[1.75] text-neutral-700 dark:text-neutral-300">
                  {section.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {section.pullQuote && (
                  <blockquote className="my-7 border-y border-neutral-200 py-5 font-display text-lg leading-relaxed font-semibold text-neutral-900 sm:text-xl dark:border-neutral-800 dark:text-neutral-100">
                    “{section.pullQuote}”
                  </blockquote>
                )}

                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="mt-4 space-y-2.5">
                    {section.bulletPoints.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-300"
                      >
                        <Check
                          className="mt-1.5 h-4 w-4 shrink-0 text-[#1A73E8] dark:text-[#60A5FA]"
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Step-by-Step Guide */}
          <section className="mt-10 rounded-2xl border border-neutral-200 bg-[#F8F9FA] p-6 sm:p-7 dark:border-neutral-800 dark:bg-[#161922]">
            <h2 className="font-display text-lg font-bold text-neutral-900 sm:text-xl dark:text-neutral-50">
              {article.id === 'chegirma-50-imkoniyat'
                ? '50% chegirmadan foydalanish bo‘yicha qadamlar'
                : 'Amaliy qadamlar va bog‘lanish tartibi'}
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {article.claimSteps.map((item) => (
                <div
                  key={item.step}
                  className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-[#111318]"
                >
                  <span className="font-mono text-xs font-semibold tabular-nums text-[#1A73E8] dark:text-[#60A5FA]">
                    {item.step}
                  </span>
                  <h3 className="mt-1.5 font-display text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-neutral-200 pt-5 dark:border-neutral-800">
              <a
                href={SAM_CORP_CONTACTS.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#1A73E8] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1557B0] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8]"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                <span>{SAM_CORP_CONTACTS.telegramHandle}</span>
              </a>
              <a
                href={SAM_CORP_CONTACTS.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-[#111318] dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                <Globe className="h-4 w-4" aria-hidden="true" />
                <span>{SAM_CORP_CONTACTS.websiteDisplay}</span>
              </a>
              <a
                href={SAM_CORP_CONTACTS.phoneHref}
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium tabular-nums text-neutral-800 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-[#111318] dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>{SAM_CORP_CONTACTS.phoneDisplay}</span>
              </a>
            </div>
          </section>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-800">
              <h2 className="font-display text-lg font-bold text-neutral-900 dark:text-neutral-50">
                Mavzuga oid maqolalar
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {relatedArticles.map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => onSelectArticle(rel)}
                    className="group flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-4 text-left transition-colors hover:border-[#1A73E8] dark:border-neutral-800 dark:bg-[#161922] dark:hover:border-[#60A5FA]"
                  >
                    <div>
                      <span className="text-xs font-semibold text-[#1A73E8] dark:text-[#60A5FA]">
                        {rel.category}
                      </span>
                      <h3 className="mt-1.5 line-clamp-2 font-display text-sm font-bold text-neutral-900 group-hover:text-[#1A73E8] dark:text-neutral-100 dark:group-hover:text-[#60A5FA]">
                        {rel.title}
                      </h3>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                      <span className="tabular-nums">{rel.readTimeMinutes} daqiqa</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
