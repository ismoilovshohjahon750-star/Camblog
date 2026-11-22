import type { Article } from '../types/blog.ts';

const CONTROL_CHARS_RE = /[\r\n\0]+/g;

export function sanitizeHeaderValue(value: string): string {
  return value.replace(CONTROL_CHARS_RE, ' ').trim();
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function encodeBase64(input: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(input, 'utf-8').toString('base64');
  }
  const bytes = new TextEncoder().encode(input);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function encodeBase64Url(input: string): string {
  return encodeBase64(input)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

export function encodeMimeHeader(value: string): string {
  const clean = sanitizeHeaderValue(value);
  // Use RFC 2047 UTF-8 Base64 encoding whenever non-ASCII characters are present
  const hasNonAscii = /[^\x20-\x7E]/.test(clean);
  if (!hasNonAscii) {
    return clean;
  }
  return `=?UTF-8?B?${encodeBase64(clean)}?=`;
}

export interface RawMimeEmailInput {
  to: string;
  from?: string;
  subject: string;
  textBody: string;
  htmlBody: string;
}

export function buildRawMimeEmail(input: RawMimeEmailInput): string {
  const safeTo = sanitizeHeaderValue(input.to);
  const safeSubject = encodeMimeHeader(input.subject);
  const safeFrom = input.from ? sanitizeHeaderValue(input.from) : '';
  const boundary = `samcorp_boundary_${Date.now().toString(36)}`;

  const headers: string[] = [
    'MIME-Version: 1.0',
    ...(safeFrom ? [`From: ${safeFrom}`] : []),
    `To: ${safeTo}`,
    `Subject: ${safeSubject}`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ];

  const textEncoded = encodeBase64(input.textBody);
  const htmlEncoded = encodeBase64(input.htmlBody);

  const mimeMessage = [
    ...headers,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    textEncoded,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    htmlEncoded,
    '',
    `--${boundary}--`,
  ].join('\r\n');

  return encodeBase64Url(mimeMessage);
}

export interface NewsletterTemplateOptions {
  article?: Article;
  customSubject?: string;
  customMessage?: string;
  siteUrl?: string;
}

export interface BuiltNewsletterEmail {
  subject: string;
  textBody: string;
  htmlBody: string;
}

function getSafeSiteUrl(siteUrl?: string): string {
  const candidate = (siteUrl ?? 'https://www.cloudbot.uz').trim();
  try {
    const parsed = new URL(candidate);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.origin;
    }
  } catch {
    // Fallback below
  }
  return 'https://www.cloudbot.uz';
}

export function buildNewsletterEmailContent(
  options: NewsletterTemplateOptions
): BuiltNewsletterEmail {
  const safeOrigin = getSafeSiteUrl(options.siteUrl);
  const extraNote = (options.customMessage ?? '').trim();

  if (options.article) {
    const { article } = options;
    const subject = sanitizeHeaderValue(
      options.customSubject?.trim() || `SAM CORP Blog: ${article.title}`
    );
    const articleUrl = `${safeOrigin}/#maqolalar`;

    const takeawaysText = article.keyTakeaways
      .map((item, idx) => `${idx + 1}. ${item}`)
      .join('\n');

    const textParts = [
      `SAM CORP RASMIY BLOGI — ${article.category.toUpperCase()}`,
      '',
      article.title,
      article.subtitle,
      '',
      `Muallif: ${article.author.name} (${article.author.role}) | ${article.publishedAt}`,
      '',
      ...(extraNote ? ['Qoshimcha xabar:', extraNote, ''] : []),
      article.excerpt,
      '',
      'Asosiy xulosalar:',
      takeawaysText,
      '',
      `Batafsil oqish: ${articleUrl}`,
      '',
      '---',
      'SAM CORP — Telegram Botlar va CRM Tizimlari (50% Chegirma Aksiyasi)',
      'Telegram: https://t.me/SAMcorpManagerBot (@SAMcorpManagerBot)',
      'Veb-sayt: https://www.cloudbot.uz',
      'Telefon: +998 77 499 71 55',
    ];

    const takeawaysHtml = article.keyTakeaways
      .map(
        (item) =>
          `<li style="margin:0 0 8px 0;color:#374151;line-height:1.55;">${escapeHtml(item)}</li>`
      )
      .join('');

    const extraNoteHtml = extraNote
      ? `<div style="margin:20px 0;padding:14px 16px;background-color:#eff6ff;border-radius:10px;border:1px solid #bfdbfe;color:#1e3a8a;font-size:14px;line-height:1.6;">${escapeHtml(extraNote).replace(/\n/g, '<br />')}</div>`
      : '';

    const htmlBody = `<!doctype html>
<html lang="uz">
  <head><meta charset="UTF-8" /></head>
  <body style="margin:0;padding:24px 12px;background-color:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
    <div style="max-width:600px;margin:0 auto;background-color:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
      <div style="padding:24px 28px;border-bottom:1px solid #e5e7eb;">
        <div style="font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#1a73e8;">SAM CORP Rasmiy Blogi &middot; ${escapeHtml(article.category)}</div>
        <h1 style="margin:10px 0 8px 0;font-size:22px;line-height:1.3;color:#111827;">${escapeHtml(article.title)}</h1>
        <p style="margin:0;font-size:15px;line-height:1.55;color:#4b5563;">${escapeHtml(article.subtitle)}</p>
        <div style="margin-top:12px;font-size:12px;color:#6b7280;">Nashr qiluvchi: <strong style="color:#111827;">${escapeHtml(article.author.name)}</strong> &middot; ${escapeHtml(article.publishedAt)}</div>
      </div>
      <div style="padding:24px 28px;">
        ${extraNoteHtml}
        <p style="margin:0 0 18px 0;font-size:15px;line-height:1.65;color:#1f2937;">${escapeHtml(article.excerpt)}</p>
        <div style="margin:0 0 22px 0;padding:16px 18px;background-color:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;">
          <div style="margin-bottom:10px;font-size:13px;font-weight:700;color:#111827;">Asosiy xulosalar</div>
          <ul style="margin:0;padding-left:18px;font-size:14px;">${takeawaysHtml}</ul>
        </div>
        <div style="margin:24px 0 8px 0;">
          <a href="${escapeHtml(articleUrl)}" style="display:inline-block;padding:12px 22px;background-color:#1a73e8;color:#ffffff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">Maqolani to‘liq o‘qish</a>
        </div>
      </div>
      <div style="padding:20px 28px;background-color:#f8f9fa;border-top:1px solid #e5e7eb;font-size:12px;line-height:1.6;color:#6b7280;">
        <div style="font-weight:700;color:#111827;margin-bottom:4px;">SAM CORP — Biznesni Avtomatlashtirish Ekotizimi</div>
        <div>Telegram: <a href="https://t.me/SAMcorpManagerBot" style="color:#1a73e8;text-decoration:none;">@SAMcorpManagerBot</a> &middot; Sayt: <a href="https://www.cloudbot.uz" style="color:#1a73e8;text-decoration:none;">www.cloudbot.uz</a> &middot; Tel: +998 77 499 71 55</div>
      </div>
    </div>
  </body>
</html>`;

    return {
      subject,
      textBody: textParts.join('\n'),
      htmlBody,
    };
  }

  const subject = sanitizeHeaderValue(
    options.customSubject?.trim() || 'SAM CORP Rasmiy Blogidan Yangilik'
  );
  const bodyText = extraNote || 'SAM CORP blogida yangi maqola va maxsus takliflar e’lon qilindi.';

  const htmlBody = `<!doctype html>
<html lang="uz">
  <head><meta charset="UTF-8" /></head>
  <body style="margin:0;padding:24px 12px;background-color:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
    <div style="max-width:600px;margin:0 auto;background-color:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
      <div style="padding:24px 28px;border-bottom:1px solid #e5e7eb;">
        <div style="font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#1a73e8;">SAM CORP Rasmiy Xabarnoma</div>
        <h1 style="margin:10px 0 0 0;font-size:22px;line-height:1.3;color:#111827;">${escapeHtml(subject)}</h1>
      </div>
      <div style="padding:24px 28px;">
        <p style="margin:0 0 22px 0;font-size:15px;line-height:1.65;color:#1f2937;">${escapeHtml(bodyText).replace(/\n/g, '<br />')}</p>
        <a href="${escapeHtml(safeOrigin)}" style="display:inline-block;padding:12px 22px;background-color:#1a73e8;color:#ffffff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">SAM CORP Blogiga o‘tish</a>
      </div>
      <div style="padding:20px 28px;background-color:#f8f9fa;border-top:1px solid #e5e7eb;font-size:12px;line-height:1.6;color:#6b7280;">
        <div>Telegram: <a href="https://t.me/SAMcorpManagerBot" style="color:#1a73e8;text-decoration:none;">@SAMcorpManagerBot</a> &middot; Sayt: <a href="https://www.cloudbot.uz" style="color:#1a73e8;text-decoration:none;">www.cloudbot.uz</a> &middot; Tel: +998 77 499 71 55</div>
      </div>
    </div>
  </body>
</html>`;

  const textBody = [
    'SAM CORP RASMIY XABARNOMA',
    subject,
    '',
    bodyText,
    '',
    `Saytga otish: ${safeOrigin}`,
    'Telegram: @SAMcorpManagerBot | Tel: +998 77 499 71 55',
  ].join('\n');

  return { subject, textBody, htmlBody };
}

export function isValidEmailAddress(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed || trimmed.length > 254 || CONTROL_CHARS_RE.test(trimmed)) {
    return false;
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}
