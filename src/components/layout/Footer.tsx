import { Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROFILE } from '../../data/profile';
import { trackEvent } from '../../lib/storage';
import type { RoutePath } from '../../types/portfolio';

const FOOTER_LINKS: ReadonlyArray<{ to: RoutePath; label: string }> = [
  { to: '/', label: 'Beranda' },
  { to: '/tentang', label: 'Tentang' },
  { to: '/pengalaman', label: 'Pengalaman' },
  { to: '/pendidikan', label: 'Pendidikan' },
  { to: '/kontak', label: 'Kontak' },
];

export function Footer() {
  const year = new Date().getFullYear();
  const waHref = `https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(
    `Halo ${PROFILE.name}, saya melihat portofolio Anda dan ingin berdiskusi.`,
  )}`;

  return (
    <footer className="no-print border-t border-line bg-surface/65 pb-24 md:pb-10">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/45 bg-gold-soft/70 font-sans text-sm font-bold text-ink">
                EF
              </span>
              <div>
                <p className="font-sans text-base font-semibold text-ink">
                  {PROFILE.name}
                </p>
                <p className="text-sm leading-relaxed text-muted">{PROFILE.city}</p>
              </div>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {PROFILE.headline}. Terbuka untuk peluang kerja di bidang operasional, layanan pelanggan, dan administrasi.
            </p>
          </div>

          <div>
            <p className="eyebrow">
              Navigasi
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {FOOTER_LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex min-h-[36px] items-center text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/sitemap.xml"
                  className="inline-flex min-h-[36px] items-center text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  Peta Situs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">
              Kontak Langsung
            </p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('wa_click', 'footer_wa')}
                className="inline-flex min-h-[40px] items-center gap-2 text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <MessageCircle className="h-4 w-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
                <span>{PROFILE.phone}</span>
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                onClick={() => trackEvent('cta_click', 'footer_email')}
                className="inline-flex min-h-[40px] items-center gap-2 break-all text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <Mail className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
                <span>{PROFILE.email}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <p className="text-sm leading-relaxed text-muted">
            © {year} {PROFILE.name}. Seluruh hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
