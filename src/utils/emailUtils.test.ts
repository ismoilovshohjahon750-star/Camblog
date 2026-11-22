import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildNewsletterEmailContent,
  buildRawMimeEmail,
  encodeMimeHeader,
  escapeHtml,
  isValidEmailAddress,
  sanitizeHeaderValue,
} from './emailUtils.ts';
import { ARTICLES } from '../data/articles.ts';

function decodeBase64Url(encoded: string): string {
  const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(base64, 'base64').toString('utf-8');
}

test('sanitizeHeaderValue removes CR/LF/NUL characters to prevent header injection', () => {
  assert.equal(sanitizeHeaderValue("Salom\r\nBcc: evil@attacker.com"), 'Salom Bcc: evil@attacker.com');
  assert.equal(sanitizeHeaderValue('clean@cloudbot.uz\0'), 'clean@cloudbot.uz');
});

test('encodeMimeHeader encodes Uzbek UTF-8 subjects with RFC 2047 and leaves ASCII intact', () => {
  assert.equal(encodeMimeHeader('SAM CORP Update'), 'SAM CORP Update');
  const encoded = encodeMimeHeader('SAM CORPdan Maxsus Taklif: 50% Chegirma — O‘zbekiston');
  assert.equal(encoded.startsWith('=?UTF-8?B?'), true);
  assert.equal(encoded.endsWith('?='), true);
});

test('escapeHtml neutralizes script tags and attributes', () => {
  assert.equal(
    escapeHtml('<script>alert("xss")</script> & \'test\''),
    '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt; &amp; &#39;test&#39;'
  );
});

test('buildRawMimeEmail constructs valid multipart base64url MIME payload without header injection', () => {
  const raw = buildRawMimeEmail({
    to: "user@example.com\r\nCc: attacker@evil.com",
    subject: 'Yangi maqola: Telegram Botlar',
    textBody: 'Matn korinishi',
    htmlBody: '<p>HTML korinishi</p>',
  });

  assert.equal(/[+/=]/.test(raw), false);
  const decoded = decodeBase64Url(raw);
  assert.equal(decoded.includes('MIME-Version: 1.0'), true);
  assert.equal(decoded.includes('To: user@example.com Cc: attacker@evil.com'), true);
  assert.equal(decoded.includes('\r\nCc: attacker@evil.com'), false);
  assert.equal(decoded.includes('Content-Type: multipart/alternative;'), true);
});

test('buildNewsletterEmailContent generates escaped HTML and text for a blog article', () => {
  const article = ARTICLES[0];
  const built = buildNewsletterEmailContent({
    article,
    customMessage: '<script>alert(1)</script> Yangi tafsilotlar!',
    siteUrl: 'https://www.cloudbot.uz',
  });

  assert.equal(built.subject.includes(article.title), true);
  assert.equal(built.htmlBody.includes('<script>alert(1)</script>'), false);
  assert.equal(built.htmlBody.includes('&lt;script&gt;alert(1)&lt;/script&gt;'), true);
  assert.equal(built.htmlBody.includes('@SAMcorpManagerBot'), true);
  assert.equal(built.textBody.includes(article.author.name), true);
});

test('isValidEmailAddress rejects malformed emails and CRLF payloads', () => {
  assert.equal(isValidEmailAddress('ismoilovshohjahon750@gmail.com'), true);
  assert.equal(isValidEmailAddress("user@test.uz\r\nBcc: bad@evil.com"), false);
  assert.equal(isValidEmailAddress('invalid-email'), false);
});
