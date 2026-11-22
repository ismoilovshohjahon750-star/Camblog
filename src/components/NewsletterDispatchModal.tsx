import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { User } from 'firebase/auth';
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  LogOut,
  Mail,
  Plus,
  Send,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import type {
  Article,
  EmailCampaign,
  Subscriber,
} from '../types/blog';
import {
  getGmailAccessToken,
  initGoogleAuth,
  signInWithGoogleForGmail,
  signOutGoogle,
} from '../services/googleAuth';
import { buildNewsletterEmailContent, isValidEmailAddress } from '../utils/emailUtils';

interface NewsletterDispatchModalProps {
  isOpen: boolean;
  articles: Article[];
  onClose: () => void;
  onStatsChanged: () => void;
}

type ModalTab = 'compose' | 'subscribers';

export const NewsletterDispatchModal: React.FC<NewsletterDispatchModalProps> = ({
  isOpen,
  articles,
  onClose,
  onStatsChanged,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    getGmailAccessToken()
  );
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<ModalTab>('compose');
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);

  // Compose state
  const [selectedArticleId, setSelectedArticleId] = useState<string>(
    articles[0]?.id ?? ''
  );
  const [subject, setSubject] = useState<string>(() =>
    articles[0] ? `SAM CORP Blog: ${articles[0].title}` : ''
  );
  const [customMessage, setCustomMessage] = useState<string>('');
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [quickRecipientInput, setQuickRecipientInput] = useState('');
  const [quickRecipientError, setQuickRecipientError] = useState<string | null>(null);

  // Add subscriber state (Subscribers tab)
  const [newSubEmail, setNewSubEmail] = useState('');
  const [newSubName, setNewSubName] = useState('');
  const [newSubError, setNewSubError] = useState<string | null>(null);
  const [addingSub, setAddingSub] = useState(false);

  // Explicit Confirmation & Send state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [lastSentCampaign, setLastSentCampaign] = useState<EmailCampaign | null>(null);

  useEffect(() => {
    const unsubscribe = initGoogleAuth(
      (signedInUser, token) => {
        setUser(signedInUser);
        setAccessToken(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (confirmOpen) {
          setConfirmOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, confirmOpen, onClose]);

  const fetchAdminData = useCallback(async (token: string) => {
    setLoadingData(true);
    setDataError(null);
    try {
      const response = await fetch('/api/admin/subscribers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const payload = (await response.json()) as {
        subscribers?: Subscriber[];
        campaigns?: EmailCampaign[];
        error?: string;
      };
      if (!response.ok) {
        setDataError(payload.error || "Ma'lumotlarni yuklab bo'lmadi.");
        return;
      }
      const loadedSubs = payload.subscribers ?? [];
      setSubscribers(loadedSubs);
      setCampaigns(payload.campaigns ?? []);
      setSelectedEmails((prev) => {
        if (prev.length > 0) return prev;
        return loadedSubs.map((s) => s.email);
      });
    } catch {
      setDataError("Server bilan aloqa o'rnatib bo'lmadi.");
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen && accessToken) {
      fetchAdminData(accessToken);
    }
  }, [isOpen, accessToken, fetchAdminData]);

  const selectedArticle = useMemo(
    () => articles.find((a) => a.id === selectedArticleId),
    [articles, selectedArticleId]
  );

  const emailPreview = useMemo(
    () =>
      buildNewsletterEmailContent({
        article: selectedArticle,
        customSubject: subject,
        customMessage,
        siteUrl:
          typeof window !== 'undefined'
            ? window.location.origin
            : 'https://www.cloudbot.uz',
      }),
    [selectedArticle, subject, customMessage]
  );

  const handleArticleChange = (nextId: string) => {
    setSelectedArticleId(nextId);
    const found = articles.find((a) => a.id === nextId);
    if (found) {
      setSubject(`SAM CORP Blog: ${found.title}`);
    } else if (!subject.trim()) {
      setSubject('SAM CORP Rasmiy Blogidan Yangilik');
    }
    setLastSentCampaign(null);
    setSendError(null);
  };

  const handleGoogleLogin = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const result = await signInWithGoogleForGmail();
      setUser(result.user);
      setAccessToken(result.accessToken);
      await fetchAdminData(result.accessToken);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Google hisobiga kirishda xatolik yuz berdi.";
      setAuthError(msg);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOutGoogle();
    setUser(null);
    setAccessToken(null);
    setSubscribers([]);
    setCampaigns([]);
    setSelectedEmails([]);
    setConfirmOpen(false);
    setLastSentCampaign(null);
  };

  const toggleRecipient = (email: string) => {
    setSelectedEmails((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  const handleAddQuickRecipient = () => {
    const normalized = quickRecipientInput.trim().toLowerCase();
    if (!isValidEmailAddress(normalized)) {
      setQuickRecipientError("To'g'ri elektron pochta manzilini kiriting.");
      return;
    }
    setQuickRecipientError(null);
    if (!selectedEmails.includes(normalized)) {
      setSelectedEmails((prev) => [...prev, normalized]);
    }
    setQuickRecipientInput('');
  };

  const handleAddSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;
    if (!isValidEmailAddress(newSubEmail)) {
      setNewSubError("To'g'ri elektron pochta manzilini kiriting.");
      return;
    }
    setNewSubError(null);
    setAddingSub(true);
    try {
      const res = await fetch('/api/admin/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email: newSubEmail.trim(),
          name: newSubName.trim() || undefined,
        }),
      });
      const payload = (await res.json()) as {
        subscriber?: Subscriber;
        error?: string;
      };
      if (!res.ok) {
        setNewSubError(payload.error || "Qo'shib bo'lmadi.");
        return;
      }
      setNewSubEmail('');
      setNewSubName('');
      await fetchAdminData(accessToken);
      if (payload.subscriber && !selectedEmails.includes(payload.subscriber.email)) {
        setSelectedEmails((prev) => [...prev, payload.subscriber!.email]);
      }
      onStatsChanged();
    } catch {
      setNewSubError("Server bilan bog'lanishda xatolik.");
    } finally {
      setAddingSub(false);
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (!accessToken) return;
    try {
      const res = await fetch(`/api/admin/subscribers/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.ok) {
        const deletedSub = subscribers.find((s) => s.id === id);
        if (deletedSub) {
          setSelectedEmails((prev) => prev.filter((e) => e !== deletedSub.email));
        }
        await fetchAdminData(accessToken);
        onStatsChanged();
      }
    } catch {
      setDataError("Obunachini o'chirishda xatolik yuz berdi.");
    }
  };

  const handleRequestSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSendError(null);
    if (selectedEmails.length === 0) {
      setSendError("Kamida bitta qabul qiluvchi manzilini tanlang.");
      return;
    }
    if (!selectedArticle && (!subject.trim() || !customMessage.trim())) {
      setSendError("Erkin xabarnoma uchun mavzu va xabar matnini kiriting.");
      return;
    }
    setConfirmOpen(true);
  };

  const handleConfirmedSend = async () => {
    if (!accessToken) return;
    setSending(true);
    setSendError(null);
    try {
      const res = await fetch('/api/admin/campaigns/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          articleId: selectedArticleId || undefined,
          subject: subject.trim(),
          message: customMessage.trim(),
          recipients: selectedEmails,
        }),
      });
      const payload = (await res.json()) as {
        campaign?: EmailCampaign;
        error?: string;
      };
      if (!res.ok || !payload.campaign) {
        setSendError(payload.error || "Email yuborishda xatolik yuz berdi.");
        setConfirmOpen(false);
        return;
      }
      setLastSentCampaign(payload.campaign);
      setConfirmOpen(false);
      await fetchAdminData(accessToken);
      onStatsChanged();
    } catch {
      setSendError("Server bilan aloqa uzildi.");
      setConfirmOpen(false);
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-dispatch-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/70 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget && !confirmOpen) {
          onClose();
        }
      }}
    >
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-[#161922]">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <Mail
              className="h-5 w-5 text-[#1A73E8] dark:text-[#60A5FA]"
              aria-hidden="true"
            />
            <div>
              <h2
                id="newsletter-dispatch-title"
                className="font-display text-lg font-bold text-neutral-900 dark:text-neutral-50"
              >
                Email Xabarnoma Tizimi
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Obunachilarga yangilik va maqolalarni Gmail orqali yuborish
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Xabarnoma oynasini yopish"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {!accessToken ? (
            <div className="mx-auto max-w-md py-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-[#1A73E8] dark:bg-blue-950/40 dark:text-[#60A5FA]">
                <Mail className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-neutral-900 dark:text-neutral-50">
                Gmail bilan boshqarish
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                Obunachilar ro‘yxatini ko‘rish va blog yangiliklarini haqiqiy
                email sifatida yuborish uchun administrator Google hisobi bilan
                kiring.
              </p>

              {authError && (
                <p
                  role="alert"
                  className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
                >
                  {authError}
                </p>
              )}

              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={authLoading}
                  className="gsi-material-button"
                >
                  <div className="gsi-material-button-state" />
                  <div className="gsi-material-button-content-wrapper">
                    <div className="gsi-material-button-icon">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        className="block h-5 w-5"
                      >
                        <path
                          fill="#EA4335"
                          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                        />
                        <path
                          fill="#4285F4"
                          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                        />
                        <path
                          fill="#34A853"
                          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                        />
                        <path fill="none" d="M0 0h48v48H0z" />
                      </svg>
                    </div>
                    <span className="gsi-material-button-contents">
                      {authLoading ? 'Kirilmoqda...' : 'Sign in with Google'}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Signed-in admin bar & tabs */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-4 dark:border-neutral-800">
                <div role="tablist" aria-label="Xabarnoma bo‘limlari" className="flex gap-2">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'compose'}
                    onClick={() => setActiveTab('compose')}
                    className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                      activeTab === 'compose'
                        ? 'bg-[#1A73E8] text-white dark:bg-[#2563EB]'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                    }`}
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Yangilik yuborish
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'subscribers'}
                    onClick={() => setActiveTab('subscribers')}
                    className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                      activeTab === 'subscribers'
                        ? 'bg-[#1A73E8] text-white dark:bg-[#2563EB]'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                    }`}
                  >
                    <Users className="h-4 w-4" aria-hidden="true" />
                    Obunachilar ({subscribers.length})
                  </button>
                </div>

                <div className="flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-300">
                  <span>{user?.email}</span>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 px-2.5 py-1.5 font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                  >
                    <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                    Chiqish
                  </button>
                </div>
              </div>

              {dataError && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
                >
                  {dataError}
                </div>
              )}

              {loadingData ? (
                <div className="flex items-center justify-center py-12 text-sm text-neutral-500">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Ma’lumotlar yuklanmoqda...
                </div>
              ) : activeTab === 'compose' ? (
                <form onSubmit={handleRequestSend} className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                  {/* Left: Message & Template */}
                  <div className="space-y-4 lg:col-span-7">
                    <div>
                      <label
                        htmlFor="dispatch-article-select"
                        className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                      >
                        Maqola shabloni yoki erkin xabar
                      </label>
                      <select
                        id="dispatch-article-select"
                        value={selectedArticleId}
                        onChange={(e) => handleArticleChange(e.target.value)}
                        className="mt-1.5 h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-900 focus:border-[#1A73E8] focus:outline-none dark:border-neutral-700 dark:bg-[#111318] dark:text-neutral-100"
                      >
                        <option value="">Erkin xabar / Maxsus e’lon</option>
                        {articles.map((art) => (
                          <option key={art.id} value={art.id}>
                            [{art.category}] {art.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="dispatch-subject-input"
                        className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                      >
                        Email mavzusi (Subject)
                      </label>
                      <input
                        id="dispatch-subject-input"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="SAM CORP Blog: Yangi maqola va 50% chegirma"
                        className="mt-1.5 h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-900 focus:border-[#1A73E8] focus:outline-none dark:border-neutral-700 dark:bg-[#111318] dark:text-neutral-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="dispatch-message-input"
                        className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                      >
                        {selectedArticle
                          ? 'Qo‘shimcha kirish matni (ixtiyoriy)'
                          : 'Xabar matni'}
                      </label>
                      <textarea
                        id="dispatch-message-input"
                        rows={4}
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        placeholder={
                          selectedArticle
                            ? "Obunachilar uchun qisqa shaxsiy izoh qo‘shishingiz mumkin..."
                            : "Yangilik yoki maxsus taklif matnini kiriting..."
                        }
                        className="mt-1.5 w-full rounded-lg border border-neutral-300 bg-white p-3 text-sm text-neutral-900 focus:border-[#1A73E8] focus:outline-none dark:border-neutral-700 dark:bg-[#111318] dark:text-neutral-100"
                      />
                    </div>

                    {/* Preview card */}
                    <div className="rounded-xl border border-neutral-200 bg-[#F8F9FA] p-4 dark:border-neutral-800 dark:bg-[#111318]">
                      <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                        Xabar ko‘rinishi
                      </div>
                      <p className="mt-1 font-display text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        {emailPreview.subject}
                      </p>
                      <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                        {selectedArticle
                          ? `${customMessage.trim() ? `${customMessage.trim()}\n\n` : ''}${selectedArticle.excerpt}`
                          : customMessage.trim() ||
                            'SAM CORP blogida yangi maqola va maxsus takliflar e’lon qilindi.'}
                      </p>
                    </div>
                  </div>

                  {/* Right: Recipients & Dispatch */}
                  <div className="flex flex-col justify-between space-y-4 lg:col-span-5">
                    <div className="space-y-3 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                          Qabul qiluvchilar ({selectedEmails.length} tanlangan)
                        </span>
                        {subscribers.length > 0 && (
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedEmails(
                                selectedEmails.length === subscribers.length
                                  ? []
                                  : subscribers.map((s) => s.email)
                              )
                            }
                            className="text-xs font-semibold text-[#1A73E8] hover:underline dark:text-[#60A5FA]"
                          >
                            {selectedEmails.length === subscribers.length
                              ? 'Bekor qilish'
                              : 'Barchasini tanlash'}
                          </button>
                        )}
                      </div>

                      {/* Quick manual recipient add */}
                      <div className="flex gap-2">
                        <input
                          type="email"
                          aria-label="Test yoki qo‘shimcha qabul qiluvchi manzili"
                          value={quickRecipientInput}
                          onChange={(e) => {
                            setQuickRecipientInput(e.target.value);
                            if (quickRecipientError) setQuickRecipientError(null);
                          }}
                          placeholder="Manzil qo‘shish (masalan: test@gmail.com)"
                          className="h-9 flex-1 rounded-lg border border-neutral-300 bg-white px-2.5 text-xs text-neutral-900 focus:border-[#1A73E8] focus:outline-none dark:border-neutral-700 dark:bg-[#111318] dark:text-neutral-100"
                        />
                        <button
                          type="button"
                          onClick={handleAddQuickRecipient}
                          className="inline-flex h-9 items-center gap-1 rounded-lg border border-neutral-300 px-2.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                        >
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          Qo‘shish
                        </button>
                      </div>
                      {quickRecipientError && (
                        <p className="text-xs text-red-600 dark:text-red-400">
                          {quickRecipientError}
                        </p>
                      )}

                      <div className="max-h-52 space-y-1.5 overflow-y-auto pr-1">
                        {Array.from(
                          new Set([
                            ...subscribers.map((s) => s.email),
                            ...selectedEmails,
                          ])
                        ).length === 0 ? (
                          <p className="py-4 text-center text-xs text-neutral-500">
                            Hozircha obunachilar yo‘q. Yuqorida manzil qo‘shing yoki
                            blog formasidan obuna bo‘ling.
                          </p>
                        ) : (
                          Array.from(
                            new Set([
                              ...subscribers.map((s) => s.email),
                              ...selectedEmails,
                            ])
                          ).map((emailAddr) => {
                            const subObj = subscribers.find(
                              (s) => s.email === emailAddr
                            );
                            const checked = selectedEmails.includes(emailAddr);
                            return (
                              <label
                                key={emailAddr}
                                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
                              >
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => toggleRecipient(emailAddr)}
                                  className="h-4 w-4 rounded border-neutral-300 text-[#1A73E8]"
                                />
                                <span className="truncate font-medium text-neutral-800 dark:text-neutral-200">
                                  {emailAddr}
                                </span>
                                {subObj?.name && (
                                  <span className="truncate text-neutral-400">
                                    ({subObj.name})
                                  </span>
                                )}
                              </label>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {sendError && (
                      <p
                        role="alert"
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
                      >
                        {sendError}
                      </p>
                    )}

                    {lastSentCampaign && (
                      <div
                        role="status"
                        className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs dark:border-emerald-900/60 dark:bg-emerald-950/30"
                      >
                        <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-200">
                          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                          <span>
                            Yuborildi: {lastSentCampaign.deliveredCount} /{' '}
                            {lastSentCampaign.totalRecipients} ta manzil
                          </span>
                        </div>
                        <ul className="mt-2 space-y-1 text-emerald-800 dark:text-emerald-300">
                          {lastSentCampaign.recipients.map((r) => (
                            <li key={r.email} className="truncate">
                              {r.email}:{' '}
                              {r.status === 'sent'
                                ? `Yetkazildi (ID: ${r.messageId})`
                                : `Xato (${r.error})`}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={sending || selectedEmails.length === 0}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1A73E8] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1557B0] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8]"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Gmail orqali yuborish ({selectedEmails.length})
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Add subscriber manually */}
                  <form
                    onSubmit={handleAddSubscriber}
                    className="flex flex-wrap items-end gap-3 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800"
                  >
                    <div className="min-w-[200px] flex-1">
                      <label
                        htmlFor="admin-add-sub-email"
                        className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                      >
                        Yangi obunachi emaili
                      </label>
                      <input
                        id="admin-add-sub-email"
                        type="email"
                        value={newSubEmail}
                        onChange={(e) => {
                          setNewSubEmail(e.target.value);
                          if (newSubError) setNewSubError(null);
                        }}
                        placeholder="mijoz@kompaniya.uz"
                        className="mt-1 h-9 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-900 focus:border-[#1A73E8] focus:outline-none dark:border-neutral-700 dark:bg-[#111318] dark:text-neutral-100"
                      />
                    </div>
                    <div className="min-w-[160px] flex-1">
                      <label
                        htmlFor="admin-add-sub-name"
                        className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                      >
                        Ism / Kompaniya (ixtiyoriy)
                      </label>
                      <input
                        id="admin-add-sub-name"
                        type="text"
                        value={newSubName}
                        onChange={(e) => setNewSubName(e.target.value)}
                        placeholder="Masalan: CloudBot"
                        className="mt-1 h-9 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-900 focus:border-[#1A73E8] focus:outline-none dark:border-neutral-700 dark:bg-[#111318] dark:text-neutral-100"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={addingSub}
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-neutral-900 px-4 text-xs font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                      Qo‘shish
                    </button>
                    {newSubError && (
                      <p className="w-full text-xs text-red-600 dark:text-red-400">
                        {newSubError}
                      </p>
                    )}
                  </form>

                  {/* Subscriber List */}
                  <div>
                    <h3 className="font-display text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      Saqlangan obunachilar ({subscribers.length})
                    </h3>
                    {subscribers.length === 0 ? (
                      <p className="mt-3 text-sm text-neutral-500">
                        Hozircha ro‘yxatdan o‘tgan obunachi yo‘q.
                      </p>
                    ) : (
                      <ul className="mt-3 divide-y divide-neutral-200 rounded-xl border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
                        {subscribers.map((sub) => (
                          <li
                            key={sub.id}
                            className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm"
                          >
                            <div className="min-w-0">
                              <div className="truncate font-medium text-neutral-900 dark:text-neutral-100">
                                {sub.email}
                              </div>
                              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                                {sub.name ? `${sub.name} · ` : ''}
                                {new Date(sub.subscribedAt).toLocaleDateString('uz-UZ')}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteSubscriber(sub.id)}
                              aria-label={`O'chirish: ${sub.email}`}
                              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Campaign History */}
                  <div>
                    <h3 className="font-display text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      Yuborilgan xabarnomalar tarixi ({campaigns.length})
                    </h3>
                    {campaigns.length === 0 ? (
                      <p className="mt-3 text-sm text-neutral-500">
                        Hali hech qanday xabarnoma yuborilmagan.
                      </p>
                    ) : (
                      <ul className="mt-3 space-y-2">
                        {campaigns.map((camp) => (
                          <li
                            key={camp.id}
                            className="rounded-xl border border-neutral-200 p-3.5 text-xs dark:border-neutral-800"
                          >
                            <div className="font-display text-sm font-bold text-neutral-900 dark:text-neutral-100">
                              {camp.subject}
                            </div>
                            <div className="mt-1 text-neutral-500 dark:text-neutral-400">
                              Yetkazildi: {camp.deliveredCount}/{camp.totalRecipients} ·
                              Yuboruvchi: {camp.sentBy} ·{' '}
                              {new Date(camp.sentAt).toLocaleString('uz-UZ')}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mandatory Explicit Confirmation Dialog before sending emails */}
        {confirmOpen && (
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-send-heading"
            className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-950/75 p-4 backdrop-blur-xs"
          >
            <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl dark:border-neutral-700 dark:bg-[#1B1F2A]">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400"
                  aria-hidden="true"
                />
                <div>
                  <h3
                    id="confirm-send-heading"
                    className="font-display text-base font-bold text-neutral-900 dark:text-neutral-50"
                  >
                    Email yuborishni tasdiqlaysizmi?
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                    Siz{' '}
                    <strong className="text-neutral-900 dark:text-white">
                      {selectedEmails.length} ta
                    </strong>{' '}
                    qabul qiluvchiga Gmail hisobingiz (
                    <span className="font-medium">{user?.email}</span>) orqali
                    haqiqiy email xabari yubormoqchisiz:
                  </p>
                  <p className="mt-2 rounded-lg bg-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                    {emailPreview.subject}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  disabled={sending}
                  onClick={() => setConfirmOpen(false)}
                  className="rounded-lg border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  Bekor qilish
                </button>
                <button
                  type="button"
                  disabled={sending}
                  onClick={handleConfirmedSend}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#1A73E8] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1557B0] disabled:opacity-60 dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8]"
                >
                  {sending ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                      Yuborilmoqda...
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" aria-hidden="true" />
                      Ha, Gmail orqali yuborish
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
