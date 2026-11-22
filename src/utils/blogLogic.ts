import type { Article, CategoryId } from '../types/blog';

export function filterArticles(
  articles: Article[],
  category: CategoryId,
  searchQuery: string
): Article[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return articles.filter((article) => {
    const matchesCategory = category === 'Barchasi' || article.category === category;
    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = [
      article.title,
      article.subtitle,
      article.excerpt,
      article.category,
      article.author.name,
      ...article.keyTakeaways,
      ...article.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bulletPoints ?? [])]),
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function getRelatedArticles(
  articles: Article[],
  currentArticle: Article,
  limit = 3
): Article[] {
  const byExplicitIds = currentArticle.relatedIds
    .map((id) => articles.find((a) => a.id === id))
    .filter((a): a is Article => Boolean(a && a.id !== currentArticle.id));

  if (byExplicitIds.length >= limit) {
    return byExplicitIds.slice(0, limit);
  }

  const remaining = articles.filter(
    (a) => a.id !== currentArticle.id && !byExplicitIds.some((rel) => rel.id === a.id)
  );

  return [...byExplicitIds, ...remaining].slice(0, limit);
}

export function formatUzs(amount: number): string {
  const rounded = Math.round(amount);
  const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${formatted} so'm`;
}

export interface DiscountPricingResult {
  originalAmount: number;
  discountedAmount: number;
  savingsAmount: number;
  discountPercent: number;
  originalFormatted: string;
  discountedFormatted: string;
  savingsFormatted: string;
}

export function calculateDiscountPricing(
  basePriceUzs: number,
  discountPercent = 50
): DiscountPricingResult {
  const safeBase = Math.max(0, basePriceUzs);
  const clampedDiscount = Math.min(100, Math.max(0, discountPercent));
  const discountedAmount = Math.round((safeBase * (100 - clampedDiscount)) / 100);
  const savingsAmount = safeBase - discountedAmount;

  return {
    originalAmount: safeBase,
    discountedAmount,
    savingsAmount,
    discountPercent: clampedDiscount,
    originalFormatted: formatUzs(safeBase),
    discountedFormatted: formatUzs(discountedAmount),
    savingsFormatted: formatUzs(savingsAmount),
  };
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateNewsletterInput(value: string): ValidationResult {
  const trimmed = value.trim();
  if (!trimmed) {
    return {
      valid: false,
      error: "Iltimos, elektron pochta manzilingizni kiriting.",
    };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailPattern.test(trimmed)) {
    return {
      valid: false,
      error: "Elektron pochta manzili noto'g'ri formatda (masalan: ism@kompaniya.uz).",
    };
  }

  return { valid: true };
}
