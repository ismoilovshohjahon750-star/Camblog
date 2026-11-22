import 'dotenv/config';
import express, { type NextFunction, type Request, type Response } from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import {
  buildNewsletterEmailContent,
  buildRawMimeEmail,
  isValidEmailAddress,
  sanitizeHeaderValue,
} from './src/utils/emailUtils.ts';
import { ARTICLES } from './src/data/articles.ts';
import type {
  CampaignRecipientResult,
  EmailCampaign,
  Subscriber,
} from './src/types/blog.ts';

interface NewsletterStore {
  subscribers: Subscriber[];
  campaigns: EmailCampaign[];
}

interface VerifiedAdmin {
  email: string;
  accessToken: string;
}

interface AuthenticatedRequest extends Request {
  admin?: VerifiedAdmin;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 3000);
const DATA_DIR = path.resolve(__dirname, 'data');
const STORE_PATH = path.resolve(DATA_DIR, 'newsletter.json');
const GMAIL_SCOPE = 'https://www.googleapis.com/auth/gmail.send';
const DEFAULT_ADMIN_EMAIL = 'ismoilovshohjahon750@gmail.com';

if (!STORE_PATH.startsWith(DATA_DIR + path.sep)) {
  throw new Error('Invalid data store path configuration');
}

function getAllowedAdmins(): Set<string> {
  const configured = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (configured.length > 0) {
    return new Set(configured);
  }
  return new Set([DEFAULT_ADMIN_EMAIL]);
}

let storeWriteChain: Promise<void> = Promise.resolve();

async function ensureStoreFile(): Promise<NewsletterStore> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<NewsletterStore>;
    return {
      subscribers: Array.isArray(parsed.subscribers) ? parsed.subscribers : [],
      campaigns: Array.isArray(parsed.campaigns) ? parsed.campaigns : [],
    };
  } catch {
    const initial: NewsletterStore = { subscribers: [], campaigns: [] };
    await fs.writeFile(STORE_PATH, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
}

async function readStore(): Promise<NewsletterStore> {
  return ensureStoreFile();
}

async function mutateStore<T>(
  mutator: (store: NewsletterStore) => Promise<T> | T
): Promise<T> {
  const nextOp = storeWriteChain.then(async () => {
    const store = await ensureStoreFile();
    const result = await mutator(store);
    const tempPath = path.resolve(DATA_DIR, `newsletter.${crypto.randomUUID()}.tmp`);
    await fs.writeFile(tempPath, JSON.stringify(store, null, 2), 'utf-8');
    await fs.rename(tempPath, STORE_PATH);
    return result;
  });

  storeWriteChain = nextOp.then(
    () => undefined,
    () => undefined
  );
  return nextOp;
}

async function requireAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: "Admin huquqini tasdiqlash uchun Google hisobingiz bilan kiring.",
    });
    return;
  }

  const accessToken = authHeader.slice('Bearer '.length).trim();
  if (!accessToken || accessToken.length > 4096) {
    res.status(401).json({ error: "Yaroqsiz ruxsat tokeni." });
    return;
  }

  try {
    const url = new URL('https://www.googleapis.com/oauth2/v3/tokeninfo');
    url.searchParams.set('access_token', accessToken);

    const tokenRes = await fetch(url.toString());
    if (!tokenRes.ok) {
      res.status(401).json({
        error: "Google sessiyasi muddati tugagan. Qaytadan kiring.",
      });
      return;
    }

    const tokenInfo = (await tokenRes.json()) as {
      email?: string;
      email_verified?: string | boolean;
      scope?: string;
    };

    const email = (tokenInfo.email || '').trim().toLowerCase();
    const isVerified =
      tokenInfo.email_verified === true || tokenInfo.email_verified === 'true';
    const scopes = (tokenInfo.scope || '').split(/\s+/);

    if (!email || !isVerified) {
      res.status(403).json({
        error: "Tasdiqlangan Google email manzili topilmadi.",
      });
      return;
    }

    if (!scopes.includes(GMAIL_SCOPE)) {
      res.status(403).json({
        error: "Gmail orqali xabar yuborish ruxsati berilmagan.",
      });
      return;
    }

    const allowedAdmins = getAllowedAdmins();
    if (!allowedAdmins.has(email)) {
      res.status(403).json({
        error: `${email} hisobida admin huquqi mavjud emas.`,
      });
      return;
    }

    req.admin = { email, accessToken };
    next();
  } catch {
    res.status(502).json({
      error: "Google autentifikatsiya xizmati bilan bog'lanishda xatolik yuz berdi.",
    });
  }
}

async function sendViaGmailApi(
  accessToken: string,
  rawMimeBase64Url: string
): Promise<{ id?: string; error?: string }> {
  const response = await fetch(
    'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw: rawMimeBase64Url }),
    }
  );

  if (!response.ok) {
    let reason = `HTTP ${response.status}`;
    try {
      const errBody = (await response.json()) as {
        error?: { message?: string };
      };
      if (errBody?.error?.message) {
        reason = errBody.error.message;
      }
    } catch {
      // Ignore parse error
    }
    return { error: reason };
  }

  const data = (await response.json()) as { id?: string };
  return { id: data.id };
}

async function startServer() {
  await ensureStoreFile();

  const app = express();
  app.use(express.json({ limit: '64kb' }));

  // Public summary stats (no PII exposed)
  app.get('/api/newsletter/stats', async (_req: Request, res: Response) => {
    try {
      const store = await readStore();
      res.json({
        subscriberCount: store.subscribers.length,
        campaignCount: store.campaigns.length,
        lastCampaignAt:
          store.campaigns.length > 0 ? store.campaigns[0].sentAt : null,
      });
    } catch {
      res.status(500).json({ error: "Statistikani yuklab bo'lmadi." });
    }
  });

  // Public visitor subscription endpoint
  app.post('/api/subscribers', async (req: Request, res: Response) => {
    const rawEmail = typeof req.body?.email === 'string' ? req.body.email : '';
    const rawName = typeof req.body?.name === 'string' ? req.body.name : '';

    if (!isValidEmailAddress(rawEmail)) {
      res.status(400).json({
        error: "Elektron pochta manzili noto'g'ri formatda.",
      });
      return;
    }

    const normalizedEmail = rawEmail.trim().toLowerCase();
    const cleanName = sanitizeHeaderValue(rawName).slice(0, 80);

    try {
      const result = await mutateStore((store) => {
        const existing = store.subscribers.find(
          (s) => s.email === normalizedEmail
        );
        if (existing) {
          return {
            subscriber: existing,
            alreadySubscribed: true,
            subscriberCount: store.subscribers.length,
          };
        }

        const subscriber: Subscriber = {
          id: crypto.randomUUID(),
          email: normalizedEmail,
          ...(cleanName ? { name: cleanName } : {}),
          subscribedAt: new Date().toISOString(),
          source: 'blog-form',
          status: 'active',
        };
        store.subscribers.unshift(subscriber);
        return {
          subscriber,
          alreadySubscribed: false,
          subscriberCount: store.subscribers.length,
        };
      });

      res.status(result.alreadySubscribed ? 200 : 201).json(result);
    } catch {
      res.status(500).json({
        error: "Obunani saqlashda kutilmagan xatolik yuz berdi.",
      });
    }
  });

  // Protected Admin Routes
  app.get(
    '/api/admin/subscribers',
    requireAdmin,
    async (req: AuthenticatedRequest, res: Response) => {
      try {
        const store = await readStore();
        res.json({
          adminEmail: req.admin?.email,
          subscribers: store.subscribers,
          campaigns: store.campaigns,
        });
      } catch {
        res.status(500).json({
          error: "Obunachilar ro'yxatini yuklab bo'lmadi.",
        });
      }
    }
  );

  app.post(
    '/api/admin/subscribers',
    requireAdmin,
    async (req: AuthenticatedRequest, res: Response) => {
      const rawEmail = typeof req.body?.email === 'string' ? req.body.email : '';
      const rawName = typeof req.body?.name === 'string' ? req.body.name : '';

      if (!isValidEmailAddress(rawEmail)) {
        res.status(400).json({
          error: "To'g'ri elektron pochta manzilini kiriting.",
        });
        return;
      }

      const normalizedEmail = rawEmail.trim().toLowerCase();
      const cleanName = sanitizeHeaderValue(rawName).slice(0, 80);

      try {
        const outcome = await mutateStore((store) => {
          const existing = store.subscribers.find(
            (s) => s.email === normalizedEmail
          );
          if (existing) {
            return { subscriber: existing, alreadyExists: true };
          }
          const subscriber: Subscriber = {
            id: crypto.randomUUID(),
            email: normalizedEmail,
            ...(cleanName ? { name: cleanName } : {}),
            subscribedAt: new Date().toISOString(),
            source: 'admin-manual',
            status: 'active',
          };
          store.subscribers.unshift(subscriber);
          return { subscriber, alreadyExists: false };
        });

        res.status(outcome.alreadyExists ? 200 : 201).json(outcome);
      } catch {
        res.status(500).json({
          error: "Obunachini qo'shib bo'lmadi.",
        });
      }
    }
  );

  app.delete(
    '/api/admin/subscribers/:id',
    requireAdmin,
    async (req: AuthenticatedRequest, res: Response) => {
      const targetId = typeof req.params.id === 'string' ? req.params.id.trim() : '';
      if (!targetId || targetId.length > 64) {
        res.status(400).json({ error: "Yaroqsiz obunachi IDsi." });
        return;
      }

      try {
        const removed = await mutateStore((store) => {
          const idx = store.subscribers.findIndex((s) => s.id === targetId);
          if (idx === -1) return false;
          store.subscribers.splice(idx, 1);
          return true;
        });

        if (!removed) {
          res.status(404).json({ error: "Obunachi topilmadi." });
          return;
        }
        res.json({ deleted: true, id: targetId });
      } catch {
        res.status(500).json({ error: "Obunachini o'chirishda xatolik." });
      }
    }
  );

  app.post(
    '/api/admin/campaigns/send',
    requireAdmin,
    async (req: AuthenticatedRequest, res: Response) => {
      const admin = req.admin!;
      const articleId =
        typeof req.body?.articleId === 'string' ? req.body.articleId.trim() : '';
      const customSubject =
        typeof req.body?.subject === 'string' ? req.body.subject.trim() : '';
      const customMessage =
        typeof req.body?.message === 'string' ? req.body.message.trim() : '';
      const rawRecipients = Array.isArray(req.body?.recipients)
        ? (req.body.recipients as unknown[])
        : [];

      const uniqueRecipients = Array.from(
        new Set(
          rawRecipients
            .filter((item): item is string => typeof item === 'string')
            .map((e) => e.trim().toLowerCase())
            .filter((e) => isValidEmailAddress(e))
        )
      ).slice(0, 100);

      if (uniqueRecipients.length === 0) {
        res.status(400).json({
          error: "Kamida bitta to'g'ri qabul qiluvchi manzilini tanlang.",
        });
        return;
      }

      const selectedArticle = articleId
        ? ARTICLES.find((a) => a.id === articleId)
        : undefined;

      if (articleId && !selectedArticle) {
        res.status(400).json({ error: "Tanlangan maqola topilmadi." });
        return;
      }

      if (!selectedArticle && (!customSubject || !customMessage)) {
        res.status(400).json({
          error: "Erkin xabarnoma uchun mavzu va xabar matnini kiriting.",
        });
        return;
      }

      const originHeader = process.env.APP_URL || 'https://www.cloudbot.uz';
      const builtEmail = buildNewsletterEmailContent({
        article: selectedArticle,
        customSubject,
        customMessage,
        siteUrl: originHeader,
      });

      const recipientResults: CampaignRecipientResult[] = [];

      for (const recipientEmail of uniqueRecipients) {
        const rawMime = buildRawMimeEmail({
          from: `SAM CORP Blog <${admin.email}>`,
          to: recipientEmail,
          subject: builtEmail.subject,
          textBody: builtEmail.textBody,
          htmlBody: builtEmail.htmlBody,
        });

        const delivery = await sendViaGmailApi(admin.accessToken, rawMime);
        if (delivery.id) {
          recipientResults.push({
            email: recipientEmail,
            status: 'sent',
            messageId: delivery.id,
          });
        } else {
          recipientResults.push({
            email: recipientEmail,
            status: 'failed',
            error: delivery.error || "Yuborib bo'lmadi",
          });
        }
      }

      const deliveredCount = recipientResults.filter(
        (r) => r.status === 'sent'
      ).length;
      const failedCount = recipientResults.length - deliveredCount;

      const campaign: EmailCampaign = {
        id: crypto.randomUUID(),
        subject: builtEmail.subject,
        ...(selectedArticle ? { articleId: selectedArticle.id } : {}),
        sentBy: admin.email,
        sentAt: new Date().toISOString(),
        totalRecipients: recipientResults.length,
        deliveredCount,
        failedCount,
        recipients: recipientResults,
      };

      await mutateStore((store) => {
        store.campaigns.unshift(campaign);
        store.campaigns = store.campaigns.slice(0, 50);
      });

      res.status(deliveredCount > 0 ? 200 : 502).json({
        campaign,
        error:
          deliveredCount === 0
            ? recipientResults[0]?.error || "Xabarlarni yuborib bo'lmadi."
            : undefined,
      });
    }
  );

  // Mount Vite middleware in development or serve built dist/ in production
  if (process.env.NODE_ENV === 'production') {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distDir, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SAM CORP Blog server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
