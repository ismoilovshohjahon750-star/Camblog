import React from 'react';
import { Globe, Mail, Phone, Send } from 'lucide-react';
import { BLOG_CATEGORIES, SAM_CORP_CONTACTS } from '../data/articles';
import type { CategoryId } from '../types/blog';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onSelectCategory: (category: CategoryId) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenDispatcher: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateSection,
  onOpenDispatcher,
}) => {
  return (
    <footer className="border-t border-neutral-200 bg-white py-12 text-sm dark:border-neutral-800 dark:bg-[#111318]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Summary */}
          <div className="md:col-span-5">
            <div className="flex items-center">
              <BrandLogo className="h-11 w-[100px]" />
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Biznes jarayonlarini avtomatlashtirish, Telegram savdo botlari va zamonaviy
              CRM tizimlari bo‘yicha rasmiy blog hamda maxsus takliflar platformasi.
            </p>
          </div>

          {/* Categories */}
          <div className="md:col-span-3">
            <h3 className="font-display text-sm font-bold text-neutral-900 dark:text-neutral-100">
              Blog Ruknlari
            </h3>
            <ul className="mt-3 space-y-2">
              {BLOG_CATEGORIES.map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCategory(category);
                      onNavigateSection('maqolalar');
                    }}
                    className="text-neutral-600 transition-colors hover:text-[#1A73E8] dark:text-neutral-400 dark:hover:text-[#60A5FA]"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4">
            <h3 className="font-display text-sm font-bold text-neutral-900 dark:text-neutral-100">
              Rasmiy Aloqa
            </h3>
            <ul className="mt-3 space-y-2.5">
              <li>
                <a
                  href={SAM_CORP_CONTACTS.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-neutral-600 transition-colors hover:text-[#1A73E8] dark:text-neutral-400 dark:hover:text-[#60A5FA]"
                >
                  <Send className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{SAM_CORP_CONTACTS.telegramHandle}</span>
                </a>
              </li>
              <li>
                <a
                  href={SAM_CORP_CONTACTS.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-neutral-600 transition-colors hover:text-[#1A73E8] dark:text-neutral-400 dark:hover:text-[#60A5FA]"
                >
                  <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{SAM_CORP_CONTACTS.websiteDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={SAM_CORP_CONTACTS.phoneHref}
                  className="inline-flex items-center gap-2 tabular-nums text-neutral-600 transition-colors hover:text-[#1A73E8] dark:text-neutral-400 dark:hover:text-[#60A5FA]"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{SAM_CORP_CONTACTS.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenDispatcher}
                  className="inline-flex items-center gap-2 font-medium text-[#1A73E8] transition-colors hover:underline dark:text-[#60A5FA]"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Email Xabarnoma Tizimi</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-neutral-200 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center dark:border-neutral-800 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} SAM CORP. Barcha huquqlar himoyalangan.</p>
          <p>Biznes avtomatlashtirish, Telegram botlar va CRM tizimlari bo‘yicha rasmiy blog.</p>
        </div>
      </div>
    </footer>
  );
};
