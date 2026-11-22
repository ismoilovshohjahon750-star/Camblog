import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateDiscountPricing,
  filterArticles,
  formatUzs,
  getRelatedArticles,
  validateNewsletterInput,
} from './blogLogic';
import { ARTICLES } from '../data/articles';
import type { Article } from '../types/blog';

const MOCK_ARTICLES: Article[] = [
  {
    id: 'promo-50',
    slug: '50-chegirma-biznesni-avtomatlashtirish',
    category: 'Yangiliklar',
    title: '50% Chegirma: Biznesni Avtomatlashtirish Imkoniyati',
    subtitle: 'SAM CORPdan yilning eng yirik aksiyasi',
    excerpt: 'Telegram botlar va CRM tizimlariga 50% chegirma shartlari.',
    publishedAt: '22 Noyabr, 2026',
    readTimeMinutes: 4,
    author: { name: 'Ismoilov Shohjahon', role: 'Bosh arxitektor' },
    image: '/img1.jpg',
    imageAlt: 'Promo',
    featured: true,
    keyTakeaways: ['50% chegirma barcha paketlarga amal qiladi'],
    sections: [
      {
        heading: 'Aksiya tafsilotlari',
        paragraphs: ['Biznes jarayonlarini avtomatlashtirish endi ikki barobar arzon.'],
      },
    ],
    claimSteps: [{ step: '01', title: 'Murojaat', description: '@SAMcorpManagerBot ga yozing' }],
    relatedIds: ['tg-bots', 'crm-sys'],
  },
  {
    id: 'tg-bots',
    slug: 'telegram-botlar-savdo',
    category: 'Telegram Botlar',
    title: 'Telegram Botlar: Savdo, Muloqot va Avtomatlashtirish',
    subtitle: '24/7 ishlaydigan savdo kanali',
    excerpt: 'Buyurtmalarni avtomatik qabul qilish va mijozlar bilan muloqot.',
    publishedAt: '20 Noyabr, 2026',
    readTimeMinutes: 5,
    author: { name: 'Olloberganov Aslbek', role: 'Telegram Botlar Muhandisi' },
    image: '/img2.jpg',
    imageAlt: 'Telegram bot',
    keyTakeaways: ['Tezkor buyurtma qabul qilish'],
    sections: [
      {
        heading: 'Savdo voronkasi',
        paragraphs: ['Click va Payme integratsiyasi bilan tolovlar avtomatlashadi.'],
      },
    ],
    claimSteps: [{ step: '01', title: 'Ariza', description: 'Telefon orqali boglaning' }],
    relatedIds: ['crm-sys'],
  },
  {
    id: 'crm-sys',
    slug: 'crm-tizimlari-mijozlar',
    category: 'CRM Tizimlari',
    title: 'CRM Tizimlari: Mijozlar Boshqaruvi va Hisobotlar',
    subtitle: 'Aniq analitika va nazorat',
    excerpt: 'Lidlar boshqaruvi va real vaqt hisobotlari.',
    publishedAt: '18 Noyabr, 2026',
    readTimeMinutes: 6,
    author: { name: 'Karimboyev Mamurjon', role: 'Loyihalar Rahbari' },
    image: '/img3.jpg',
    imageAlt: 'CRM',
    keyTakeaways: ['Barcha mijozlar yagona bazada'],
    sections: [
      {
        heading: 'Hisobotlar',
        paragraphs: ['Har bir menejer samaradorligini real vaqtda kuzating.'],
      },
    ],
    claimSteps: [{ step: '01', title: 'Demo', description: 'Sayt orqali sorov qoldiring' }],
    relatedIds: ['promo-50'],
  },
];

test('filterArticles returns all articles for Barchasi with empty query', () => {
  const result = filterArticles(MOCK_ARTICLES, 'Barchasi', '');
  assert.equal(result.length, 3);
});

test('filterArticles filters strictly by category', () => {
  const result = filterArticles(MOCK_ARTICLES, 'Telegram Botlar', '');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'tg-bots');
});

test('filterArticles searches across title, excerpt, and section prose case-insensitively', () => {
  const byTitle = filterArticles(MOCK_ARTICLES, 'Barchasi', '  HISOBOTLAR ');
  assert.equal(byTitle.length, 1);
  assert.equal(byTitle[0].id, 'crm-sys');

  const bySection = filterArticles(MOCK_ARTICLES, 'Barchasi', 'Payme');
  assert.equal(bySection.length, 1);
  assert.equal(bySection[0].id, 'tg-bots');
});

test('filterArticles returns empty array when category and query do not match', () => {
  const result = filterArticles(MOCK_ARTICLES, 'CRM Tizimlari', 'Payme');
  assert.equal(result.length, 0);
});

test('getRelatedArticles excludes current article and respects limit', () => {
  const related = getRelatedArticles(MOCK_ARTICLES, MOCK_ARTICLES[0], 2);
  assert.equal(related.length, 2);
  assert.equal(related.some((a) => a.id === 'promo-50'), false);
});

test('calculateDiscountPricing calculates 50% discount accurately with formatted UZS strings', () => {
  const pricing = calculateDiscountPricing(8000000, 50);
  assert.equal(pricing.originalAmount, 8000000);
  assert.equal(pricing.discountedAmount, 4000000);
  assert.equal(pricing.savingsAmount, 4000000);
  assert.equal(pricing.originalFormatted, "8 000 000 so'm");
  assert.equal(pricing.discountedFormatted, "4 000 000 so'm");
  assert.equal(formatUzs(1250000), "1 250 000 so'm");
});

test('validateNewsletterInput rejects empty/invalid emails and accepts valid addresses', () => {
  assert.equal(validateNewsletterInput('').valid, false);
  assert.equal(validateNewsletterInput('not-an-email').valid, false);
  assert.equal(validateNewsletterInput('user@').valid, false);
  assert.equal(validateNewsletterInput('founder@cloudbot.uz').valid, true);
});

test('ARTICLES use only the three official SAM CORP publishers', () => {
  const allowedAuthors = new Set([
    'Ismoilov Shohjahon',
    'Olloberganov Aslbek',
    'Karimboyev Mamurjon',
  ]);
  const usedAuthors = new Set(ARTICLES.map((article) => article.author.name));

  for (const author of usedAuthors) {
    assert.equal(allowedAuthors.has(author), true, `Unexpected author: ${author}`);
  }
  assert.equal(usedAuthors.size, 3);
});

