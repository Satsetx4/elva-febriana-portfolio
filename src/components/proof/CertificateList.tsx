import { Award, ExternalLink } from 'lucide-react';
import type { Certificate } from '../../types/portfolio';

export function CertificateList({
  certificates,
}: {
  certificates: Certificate[];
}) {
  if (certificates.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="border-b border-line pb-4">
        <p className="eyebrow">Dokumen Pendukung</p>
        <h2 className="font-serif text-3xl font-medium text-ink mt-1">
          Sertifikat &amp; Pelatihan
        </h2>
      </div>

      <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
        {certificates.map((cert) => (
          <li
            key={cert.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6"
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-bg text-gold">
                <Award className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h3 className="font-sans text-base font-semibold text-ink">
                  {cert.title}
                </h3>
                <p className="meta">
                  {cert.issuer} · {cert.year}
                </p>
              </div>
            </div>

            {cert.file && (
              <a
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start sm:self-center shrink-0 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-bg px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-gold hover:bg-gold-soft/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <span>Lihat Sertifikat</span>
                <ExternalLink
                  className="h-4 w-4 text-gold"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
