import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Coffee,
  MapPin,
  ReceiptText,
} from 'lucide-react';
import { PosSimulator } from '../components/interactive/PosSimulator';
import { OutletChecklist } from '../components/interactive/OutletChecklist';
import { AppHeader } from '../components/layout/AppHeader';
import { useOutlet } from '../context/OutletContext';
import { WORK_EXPERIENCES } from '../data/profile';

type ExperienceTab = 'pos' | 'checklist';

export function ExperiencePage() {
  const [activeTab, setActiveTab] = useState<ExperienceTab>('pos');
  const { totalCupsSold, lowStockCount } = useOutlet();
  const baristaExp = WORK_EXPERIENCES[0];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-14">
      <AppHeader
        title="Pengalaman & Simulasi Kerja"
        breadcrumbLabel="Pengalaman"
        backTo="/"
      />

      {/* Featured Work Card */}
      {baristaExp && (
        <section className="rounded-2xl border border-line bg-surface p-6 sm:p-9 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-line pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-gold-soft px-3.5 py-1 text-xs font-medium text-gold">
                <Coffee className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Pengalaman Kerja Utama</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink">
                {baristaExp.role} — {baristaExp.company}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
              <span className="rounded-full border border-line bg-bg px-3.5 py-1 font-medium text-ink">
                {baristaExp.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gold" strokeWidth={1.5} />
                {baristaExp.location}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-medium">
              Tanggung Jawab Harian
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {baristaExp.responsibilities.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-line bg-bg p-4 text-sm text-ink leading-relaxed"
                >
                  <CheckCircle2
                    className="w-4 h-4 text-gold shrink-0 mt-0.5"
                    strokeWidth={1.5}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Interactive Tab Switcher + Live Cross-Tab Outlet Pills */}
      <section className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-line pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('pos')}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                activeTab === 'pos'
                  ? 'bg-ink text-bg'
                  : 'border border-line bg-surface text-muted hover:text-ink hover:border-gold'
              }`}
            >
              <ReceiptText className="w-4 h-4" strokeWidth={1.5} />
              <span>Simulasi Kasir POS</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('checklist')}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                activeTab === 'checklist'
                  ? 'bg-ink text-bg'
                  : 'border border-line bg-surface text-muted hover:text-ink hover:border-gold'
              }`}
            >
              <ClipboardCheck className="w-4 h-4" strokeWidth={1.5} />
              <span>Ceklis Stok &amp; Kebersihan</span>
            </button>
          </div>

          {/* Live state pills linking POS sales & Outlet stock */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-ink">
              <Coffee className="w-3.5 h-3.5 text-gold" strokeWidth={1.5} />
              <span>{totalCupsSold} cup terjual</span>
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 ${
                lowStockCount > 0
                  ? 'border-gold bg-gold-soft text-gold font-medium'
                  : 'border-line bg-surface text-muted'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>{lowStockCount} stok menipis</span>
            </span>
          </div>
        </div>

        <div>
          {activeTab === 'pos' ? <PosSimulator /> : <OutletChecklist />}
        </div>
      </section>
    </div>
  );
}
