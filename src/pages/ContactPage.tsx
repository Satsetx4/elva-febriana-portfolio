import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Mail,
  MapPin,
  MessageCircle,
  RotateCcw,
  Send,
} from 'lucide-react';
import { AppHeader } from '../components/layout/AppHeader';
import { PROFILE } from '../data/profile';
import {
  STORAGE_KEYS,
  clearAllElvaStorage,
  safeGet,
  safeSet,
  trackEvent,
} from '../lib/storage';

interface ContactDraft {
  senderName: string;
  organization: string;
  message: string;
}

interface FormErrors {
  senderName?: string;
  message?: string;
}

const EMPTY_DRAFT: ContactDraft = {
  senderName: '',
  organization: '',
  message: '',
};

export function ContactPage() {
  const [draft, setDraft] = useState<ContactDraft>(() =>
    safeGet<ContactDraft>(STORAGE_KEYS.contactDraft, EMPTY_DRAFT),
  );
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [copied, setCopied] = useState(false);
  const [submittedNotice, setSubmittedNotice] = useState(false);

  useEffect(() => {
    safeSet(STORAGE_KEYS.contactDraft, draft);
  }, [draft]);

  const buildFormattedMessage = (): string => {
    const nama = draft.senderName.trim() || 'Bapak/Ibu';
    const instansi = draft.organization.trim()
      ? ` (${draft.organization.trim()})`
      : '';
    const isi = draft.message.trim();
    return `Halo Elva Febriana,\nSaya ${nama}${instansi}.\n\n${isi}`;
  };

  const handleCopyMessage = async () => {
    const text = buildFormattedMessage();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback ignored if clipboard permission unavailable
    }
  };

  const handleDownloadVcard = () => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${PROFILE.name}`,
      'N:Febriana;Elva;;;',
      `TEL;TYPE=CELL:${PROFILE.phone}`,
      `EMAIL:${PROFILE.email}`,
      `ADR;TYPE=HOME:;;Probolinggo;Jawa Timur;;Indonesia`,
      `NOTE:${PROFILE.headline}`,
      'END:VCARD',
    ].join('\r\n');

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Elva-Febriana.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    trackEvent('cta_click', 'download_vcard');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Anti-spam honeypot check
    if (honeypot.trim() !== '') {
      return;
    }

    const nextErrors: FormErrors = {};
    if (draft.senderName.trim().length < 2) {
      nextErrors.senderName = 'Mohon isi nama lengkap Anda (minimal 2 karakter).';
    }
    if (draft.message.trim().length < 10) {
      nextErrors.message =
        'Mohon tuliskan pesan atau kebutuhan Anda minimal 10 karakter.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    trackEvent('form_submit', 'contact_wa');
    trackEvent('wa_click', 'contact_form');
    setSubmittedNotice(true);

    const waUrl = `https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(
      buildFormattedMessage(),
    )}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleResetLocalData = () => {
    if (
      window.confirm(
        'Hapus draf formulir, data simulasi, dan preferensi tema yang tersimpan di perangkat ini?',
      )
    ) {
      clearAllElvaStorage();
      window.location.reload();
    }
  };

  const directWaHref = `https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(
    'Halo Elva, saya tertarik menghubungi Anda terkait peluang kerja atau kolaborasi.',
  )}`;

  const mapsHref = 'https://maps.google.com/?q=Probolinggo,+Jawa+Timur';

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-14">
      <AppHeader
        title="Hubungi Langsung"
        breadcrumbLabel="Kontak"
        backTo="/"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Direct Contact Cards */}
        <div className="lg:col-span-5 space-y-4">
          <a
            href={directWaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('wa_click', 'contact_card')}
            className="group flex items-start justify-between gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-gold"
          >
            <div className="flex items-start gap-3.5">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold">
                <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div>
                <p className="meta">
                  WhatsApp
                </p>
                <p className="font-sans text-lg font-semibold text-ink mt-0.5">
                  {PROFILE.phone}
                </p>
                <p className="text-sm text-muted mt-1">
                  Respons cepat untuk wawancara &amp; diskusi kerja
                </p>
              </div>
            </div>
            <ArrowUpRight
              className="w-4 h-4 text-muted group-hover:text-gold transition-colors shrink-0 mt-1"
              strokeWidth={1.5}
            />
          </a>

          <a
            href={`mailto:${PROFILE.email}`}
            className="group flex items-start justify-between gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-gold"
          >
            <div className="flex items-start gap-3.5">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-bg text-gold">
                <Mail className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div>
                <p className="meta">
                  Email
                </p>
                <p className="font-sans text-lg font-semibold text-ink mt-0.5 break-all">
                  {PROFILE.email}
                </p>
              </div>
            </div>
            <ArrowUpRight
              className="w-4 h-4 text-muted group-hover:text-gold transition-colors shrink-0 mt-1"
              strokeWidth={1.5}
            />
          </a>

          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start justify-between gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-gold"
          >
            <div className="flex items-start gap-3.5">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-bg text-gold">
                <MapPin className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div>
                <p className="meta">
                  Domisili
                </p>
                <p className="font-sans text-lg font-semibold text-ink mt-0.5">
                  {PROFILE.city}
                </p>
              </div>
            </div>
            <ArrowUpRight
              className="w-4 h-4 text-muted group-hover:text-gold transition-colors shrink-0 mt-1"
              strokeWidth={1.5}
            />
          </a>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            {PROFILE.cvUrl && (
              <a
                href={PROFILE.cvUrl}
                download
                onClick={() => trackEvent('cta_click', 'download_cv')}
                className="w-full inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-ink text-bg px-5 py-3 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <Download className="w-4 h-4" strokeWidth={1.5} />
                <span>Unduh CV (PDF + QR)</span>
              </a>
            )}
            <button
              type="button"
              onClick={handleDownloadVcard}
              className="w-full inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-gold hover:bg-gold-soft/60 active:scale-[0.98]"
            >
              <Download className="w-4 h-4 text-gold" strokeWidth={1.5} />
              <span>Unduh vCard (.vcf)</span>
            </button>
          </div>
        </div>

        {/* Validated Contact Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="lg:col-span-7 rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-5"
        >
          <div className="space-y-1 border-b border-line pb-4">
            <p className="eyebrow">
              Kirim Pesan Terstruktur
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-ink">
              Jadwalkan Wawancara atau Diskusi
            </h2>
          </div>

          {/* Honeypot field */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_url">Website URL</label>
            <input
              id="website_url"
              name="website_url"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="senderName"
              className="block text-sm font-semibold text-ink"
            >
              Nama Anda <span className="text-gold-ink">*</span>
            </label>
            <input
              id="senderName"
              type="text"
              value={draft.senderName}
              onChange={(e) => {
                setDraft((prev) => ({ ...prev, senderName: e.target.value }));
                if (errors.senderName) {
                  setErrors((prev) => ({ ...prev, senderName: undefined }));
                }
              }}
              placeholder="Contoh: Ibu Rina / HRD"
              className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-base text-ink placeholder:text-muted focus:border-gold focus:outline-none"
            />
            {errors.senderName && (
              <p role="alert" className="text-sm text-red-700 dark:text-red-400">
                {errors.senderName}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="organization"
              className="block text-sm font-semibold text-ink"
            >
              Nama Usaha / Instansi (Opsional)
            </label>
            <input
              id="organization"
              type="text"
              value={draft.organization}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, organization: e.target.value }))
              }
              placeholder="Contoh: Kedai Kopi Nusantara"
              className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-base text-ink placeholder:text-muted focus:border-gold focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-ink"
            >
              Pesan <span className="text-gold-ink">*</span>
            </label>
            <textarea
              id="message"
              rows={4}
              value={draft.message}
              onChange={(e) => {
                setDraft((prev) => ({ ...prev, message: e.target.value }));
                if (errors.message) {
                  setErrors((prev) => ({ ...prev, message: undefined }));
                }
              }}
              placeholder="Tuliskan posisi yang ditawarkan, jadwal wawancara, atau pertanyaan Anda..."
              className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-base text-ink placeholder:text-muted focus:border-gold focus:outline-none resize-y"
            />
            {errors.message && (
              <p role="alert" className="text-sm text-red-700 dark:text-red-400">
                {errors.message}
              </p>
            )}
          </div>

          {submittedNotice && (
            <p className="rounded-xl border border-gold/40 bg-gold-soft/60 px-4 py-2.5 text-sm text-ink">
              Pesan siap dikirim melalui tab WhatsApp yang baru dibuka.
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-ink text-bg px-6 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <Send className="w-4 h-4" strokeWidth={1.5} />
              <span>Kirim via WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleCopyMessage}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-gold hover:bg-gold-soft/60 active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  <span>Pesan Disalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  <span>Salin Pesan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="border-t border-line pt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          Draf pesan dan preferensi tampilan tersimpan secara lokal di browser ini.
        </p>
        <button
          type="button"
          onClick={handleResetLocalData}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm text-muted transition-colors hover:border-gold hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <RotateCcw className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          <span>Hapus data tersimpan di perangkat ini</span>
        </button>
      </div>
    </div>
  );
}
