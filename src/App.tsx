/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArticleGrid } from './components/ArticleGrid';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { EditorialToolbar } from './components/EditorialToolbar';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroFeaturedStory } from './components/HeroFeaturedStory';
import { NewsletterDispatchModal } from './components/NewsletterDispatchModal';
import { OfferCtaBanner } from './components/OfferCtaBanner';
import { PosterShowcase } from './components/PosterShowcase';
import { ARTICLES } from './data/articles';
import type { Article, CategoryId, NewsletterStats } from './types/blog';
import { filterArticles } from './utils/blogLogic';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('Barchasi');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [dispatchOpen, setDispatchOpen] = useState(false);
  const [newsletterStats, setNewsletterStats] = useState<NewsletterStats | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('samcorp-theme', theme);
    } catch {
      // Ignore storage failures in restricted contexts
    }
  }, [theme]);

  const refreshStats = useCallback(async () => {
    try {
      const res = await fetch('/api/newsletter/stats');
      if (res.ok) {
        const data = (await res.json()) as NewsletterStats;
        setNewsletterStats(data);
      }
    } catch {
      // Ignore transient stats fetch errors
    }
  }, []);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  const featuredArticle = useMemo(
    () => ARTICLES.find((a) => a.featured) ?? ARTICLES[0],
    []
  );

  const filteredArticles = useMemo(
    () => filterArticles(ARTICLES, activeCategory, searchQuery),
    [activeCategory, searchQuery]
  );

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleResetFilters = () => {
    setActiveCategory('Barchasi');
    setSearchQuery('');
  };

  return (
    <div id="top" className="min-h-screen bg-white text-neutral-900 dark:bg-[#111318] dark:text-neutral-100">
      <Header
        onSelectCategory={setActiveCategory}
        onNavigateSection={handleNavigateSection}
      />

      <main>
        <HeroFeaturedStory
          article={featuredArticle}
          onReadArticle={setSelectedArticle}
          onScrollToPoster={() => handleNavigateSection('poster-vitrina')}
        />

        <EditorialToolbar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          theme={theme}
          onToggleTheme={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
          resultCount={filteredArticles.length}
        />

        <ArticleGrid
          articles={filteredArticles}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          onSelectArticle={setSelectedArticle}
          onResetFilters={handleResetFilters}
        />

        <PosterShowcase />

        <OfferCtaBanner
          stats={newsletterStats}
          onSubscribed={refreshStats}
          onOpenDispatcher={() => setDispatchOpen(true)}
        />
      </main>

      <Footer
        onSelectCategory={setActiveCategory}
        onNavigateSection={handleNavigateSection}
        onOpenDispatcher={() => setDispatchOpen(true)}
      />

      <ArticleReaderModal
        article={selectedArticle}
        allArticles={ARTICLES}
        onClose={() => setSelectedArticle(null)}
        onSelectArticle={setSelectedArticle}
      />

      <NewsletterDispatchModal
        isOpen={dispatchOpen}
        articles={ARTICLES}
        onClose={() => setDispatchOpen(false)}
        onStatsChanged={refreshStats}
      />
    </div>
  );
}
