export type CategoryId =
  | 'Barchasi'
  | 'Yangiliklar'
  | 'Telegram Botlar'
  | 'CRM Tizimlari'
  | 'Keyslar'
  | 'Qo‘llanmalar';

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  pullQuote?: string;
  bulletPoints?: string[];
}

export interface ArticleMetric {
  label: string;
  value: string;
  context: string;
}

export interface DiscountStep {
  step: string;
  title: string;
  description: string;
}

export interface Article {
  id: string;
  slug: string;
  category: Exclude<CategoryId, 'Barchasi'>;
  title: string;
  subtitle: string;
  excerpt: string;
  publishedAt: string;
  readTimeMinutes: number;
  author: {
    name: string;
    role: string;
  };
  image: string;
  imageAlt: string;
  featured?: boolean;
  keyTakeaways: string[];
  metrics?: ArticleMetric[];
  sections: ArticleSection[];
  claimSteps: DiscountStep[];
  relatedIds: string[];
}

export interface DiscountPackage {
  id: 'telegram-bot' | 'crm-system' | 'bundle';
  name: string;
  categoryLabel: string;
  summary: string;
  basePriceUzs: number;
  deliveryDays: string;
  features: string[];
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  subscribedAt: string;
  source: 'blog-form' | 'admin-manual';
  status: 'active';
}

export interface CampaignRecipientResult {
  email: string;
  status: 'sent' | 'failed';
  messageId?: string;
  error?: string;
}

export interface EmailCampaign {
  id: string;
  subject: string;
  articleId?: string;
  sentBy: string;
  sentAt: string;
  totalRecipients: number;
  deliveredCount: number;
  failedCount: number;
  recipients: CampaignRecipientResult[];
}

export interface NewsletterStats {
  subscriberCount: number;
  campaignCount: number;
  lastCampaignAt: string | null;
}

