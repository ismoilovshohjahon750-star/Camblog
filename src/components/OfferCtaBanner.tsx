import React, { useState } from 'react';
import { CheckCircle2, Globe, Loader2, Mail, Phone, Send } from 'lucide-react';
import { SAM_CORP_CONTACTS } from '../data/articles';
import type { NewsletterStats } from '../types/blog';
import { validateNewsletterInput } from '../utils/blogLogic';

interface OfferCtaBannerProps {
  stats: NewsletterStats | null;
  onSubscribed: () => void;
  onOpenDispatcher: () => void;
}

export const OfferCtaBanner: React.FC<OfferCtaBannerProps> = ({
  stats,
  onSubscribed,
  onOpenDispatcher,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedState, setSubmittedState] = useState<{
    email: string;
    alreadySubscribed: boolean;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateNewsletterInput(email);
    if (!validation.valid) {
      setErrorMessage(validation.error ?? "Noto'g'ri ma'lumot.");
      return;
    }

    setErrorMessage(null);
    setSubmitting(true);
    try {
      const response = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || undefined,
        }),
      });
      const payload = (await response.json()) as {
        alreadySubscribed?: boolean;
        error?: string;
      };

      if (!response.ok) {
        setErrorMessage(payload.error ?? "Obuna saqlashda xatolik yuz berdi.");
        return;
      }

      setSubmittedState({
        email: email.trim().toLowerCase(),
        alreadySubscribed: Boolean(payload.alreadySubscribed),
      });
      setEmail('');
      setName('');
      onSubscribed();
    } catch {
      setErrorMessage("Server bilan aloqa o'rnatib bo'lmadi. Qayta urinib ko'ring.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="murojaat"
      aria-labelledby="cta-section-heading"
      className="border-t border-neutral-200 bg-[#F8F9FA] py-16 sm:py-20 dark:border-neutral-800 dark:bg-[#14171F]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Direct CTA Channels */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-wide text-[#1A73E8] dark:text-[#60A5FA]">
              SAM CORP — Hamkorlik va Maslahat
            </p>
            <h2
              id="cta-section-heading"
              className="mt-2 font-display text-2xl leading-tight font-bold tracking-tight text-balance text-neutral-900 sm:text-4xl dark:text-neutral-50"
            >
              Biznesingizni avtomatlashtirish bo‘yicha bepul maslahat oling
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
              Telegram botlar, CRM tizimlari yoki joriy 50% chegirma aksiyasi yuzasidan
              savollaringiz bo‘lsa, jamoamiz bilan bevosita bog‘laning.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={SAM_CORP_CONTACTS.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-[#1A73E8] bg-[#1A73E8] px-4 py-3.5 text-white transition-colors hover:bg-[#1557B0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A73E8] dark:border-[#2563EB] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8]"
              >
                <Send className="h-5 w-5 shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-xs text-blue-100">Telegram bot</div>
                  <div className="whitespace-nowrap font-display text-sm font-bold">
                    {SAM_CORP_CONTACTS.telegramHandle}
                  </div>
                </div>
              </a>

              <a
                href={SAM_CORP_CONTACTS.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-neutral-300 bg-white px-4 py-3.5 text-neutral-900 transition-colors hover:border-[#1A73E8] dark:border-neutral-700 dark:bg-[#111318] dark:text-neutral-100 dark:hover:border-[#60A5FA]"
              >
                <Globe
                  className="h-5 w-5 shrink-0 text-[#1A73E8] dark:text-[#60A5FA]"
                  aria-hidden="true"
                />
                <div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    Rasmiy veb-sayt
                  </div>
                  <div className="whitespace-nowrap font-display text-sm font-bold">
                    {SAM_CORP_CONTACTS.websiteDisplay}
                  </div>
                </div>
              </a>

              <a
                href={SAM_CORP_CONTACTS.phoneHref}
                className="flex items-center gap-3 rounded-xl border border-neutral-300 bg-white px-4 py-3.5 text-neutral-900 transition-colors hover:border-[#1A73E8] dark:border-neutral-700 dark:bg-[#111318] dark:text-neutral-100 dark:hover:border-[#60A5FA]"
              >
                <Phone
                  className="h-5 w-5 shrink-0 text-[#1A73E8] dark:text-[#60A5FA]"
                  aria-hidden="true"
                />
                <div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    Telefon raqam
                  </div>
                  <div className="whitespace-nowrap font-display text-sm font-bold tabular-nums">
                    {SAM_CORP_CONTACTS.phoneDisplay}
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Newsletter Subscription & Dispatch Entry */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 lg:col-span-5 dark:border-neutral-800 dark:bg-[#161922]">
            <div className="flex items-center gap-2.5 text-neutral-900 dark:text-neutral-50">
              <Mail
                className="h-5 w-5 text-[#1A73E8] dark:text-[#60A5FA]"
                aria-hidden="true"
              />
              <h3 className="font-display text-lg font-bold">
                SAM CORP Blogiga Obuna Bo‘ling
              </h3>
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              Yangi maqolalar, amaliy keyslar, texnik qo‘llanmalar va maxsus aksiyalar
              haqida birinchilardan bo‘lib email orqali xabardor bo‘ling.
            </p>

            {submittedState ? (
              <div
                role="status"
                aria-live="polite"
                className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-400"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-display text-sm font-bold text-emerald-900 dark:text-emerald-200">
                      {submittedState.alreadySubscribed
                        ? 'Siz allaqachon obunachilar ro‘yxatidasiz!'
                        : 'Obunangiz bazaga saqlandi!'}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-emerald-800 dark:text-emerald-300">
                      <span className="font-medium">{submittedState.email}</span> manzili
                      SAM CORP rasmiy blogi yangiliklar ro‘yxatiga ulandi.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmittedState(null)}
                      className="mt-3 text-xs font-semibold text-emerald-800 underline underline-offset-4 hover:text-emerald-950 dark:text-emerald-300 dark:hover:text-white"
                    >
                      Boshqa manzil qo‘shish
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-3">
                <div>
                  <label
                    htmlFor="newsletter-name-input"
                    className="block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    Ism yoki kompaniya (ixtiyoriy)
                  </label>
                  <input
                    id="newsletter-name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masalan: Alisher · CloudBot"
                    className="mt-1.5 h-10 w-full rounded-lg border border-neutral-300 bg-white px-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#1A73E8] focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 dark:border-neutral-700 dark:bg-[#111318] dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-[#60A5FA]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="newsletter-email-input"
                    className="block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    Elektron pochta manzili
                  </label>
                  <input
                    id="newsletter-email-input"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="ism@kompaniya.uz"
                    aria-invalid={Boolean(errorMessage)}
                    aria-describedby={errorMessage ? 'newsletter-error' : undefined}
                    className="mt-1.5 h-11 w-full rounded-lg border border-neutral-300 bg-white px-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#1A73E8] focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 dark:border-neutral-700 dark:bg-[#111318] dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-[#60A5FA]"
                  />
                  {errorMessage && (
                    <p
                      id="newsletter-error"
                      role="alert"
                      className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                    >
                      {errorMessage}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A73E8] disabled:opacity-60 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                  Blog yangiliklariga obuna bo‘lish
                </button>
              </form>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-200 pt-4 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
              <span className="tabular-nums">
                {stats
                  ? `Bazadagi obunachilar: ${stats.subscriberCount} ta`
                  : 'Yangiliklarni emailga oling'}
              </span>
              <button
                type="button"
                onClick={onOpenDispatcher}
                className="font-semibold text-[#1A73E8] hover:underline dark:text-[#60A5FA]"
              >
                Admin: Yangilik yuborish
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
