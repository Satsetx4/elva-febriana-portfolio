import { Suspense, lazy, useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  Coffee,
  MapPin,
} from 'lucide-react';
import { AppHeader } from '../components/layout/AppHeader';
import { MetricsStrip } from '../components/proof/MetricsStrip';
import { ProofGallery } from '../components/proof/ProofGallery';
import { METRICS, PROOF_PHOTOS, WORK_EXPERIENCES } from '../data/profile';

const OutletSimulatorSection = lazy(
  () => import('../components/interactive/OutletSimulatorSection'),
);

export function ExperiencePage() {
  const [simLoaded, setSimLoaded] = useState(false);
  const baristaExp = WORK_EXPERIENCES[0];
  const outletPhotos = PROOF_PHOTOS.filter((p) => p.context === 'outlet');

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-14">
      <AppHeader
        title="Pengalaman Kerja"
        breadcrumbLabel="Pengalaman"
        backTo="/"
      />

      {/* Section 1: Featured Barista Work Card */}
      {baristaExp && (
        <section className="rounded-2xl border border-line bg-surface p-6 sm:p-9 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-line pb-6">
            <div className="space-y-2.5">
              <div className="pill bg-gold-soft text-gold-ink">
                <Coffee
                  className="w-4 h-4 text-gold"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span>Pengalaman Kerja Utama</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-ink">
                {baristaExp.role} — {baristaExp.company}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
              <span className="pill border border-line bg-bg text-ink">
                {baristaExp.duration}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted">
                <MapPin
                  className="w-4 h-4 text-gold"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span>{baristaExp.location}</span>
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="eyebrow">Tanggung Jawab Harian</p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {baristaExp.responsibilities.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-line bg-bg p-4"
                >
                  <CheckCircle2
                    className="w-4 h-4 text-gold shrink-0 mt-1"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className="body text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {METRICS.length > 0 ? (
            <div className="border-t border-line pt-6">
              <MetricsStrip metrics={METRICS} compact />
            </div>
          ) : null}
        </section>
      )}

      {/* Section 2: Proof Gallery (automatically hidden when empty) */}
      <ProofGallery
        photos={outletPhotos}
        eyebrow="Dokumentasi Outlet"
        heading="Suasana Kerja di Balik Bar"
      />

      {/* Section 3: Collapsible Lazy-Loaded Outlet Simulator */}
      <section aria-label="Simulasi Alur Kerja Outlet">
        <details
          id="simulasi"
          className="group rounded-2xl border border-line bg-surface transition-colors"
          onToggle={(e) => {
            if (e.currentTarget.open) setSimLoaded(true);
          }}
        >
          <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer flex items-start justify-between gap-4 p-6 sm:p-8 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
            <div className="space-y-2">
              <p className="eyebrow">Bonus · Demo Interaktif</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
                Bonus: Simulasi Alur Kerja Outlet
              </h2>
              <p className="body">
                Demonstrasi interaktif pemahaman SOP, kasir, dan stok. Menu &amp;
                harga hanya contoh.
              </p>
            </div>

            <span
              aria-hidden="true"
              className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-bg transition-colors group-hover:border-gold"
            >
              <ChevronDown
                className="h-5 w-5 text-gold transition-transform duration-200 group-open:rotate-180"
                strokeWidth={1.5}
              />
            </span>
          </summary>

          <div className="border-t border-line p-5 sm:p-8">
            {simLoaded ? (
              <Suspense
                fallback={
                  <p className="py-6 text-center body">Memuat simulasi…</p>
                }
              >
                <OutletSimulatorSection />
              </Suspense>
            ) : null}
          </div>
        </details>
      </section>
    </div>
  );
}
