import { useState } from 'react';
import {
  AlertTriangle,
  ClipboardCheck,
  Coffee,
  ReceiptText,
  RotateCcw,
} from 'lucide-react';
import { OutletProvider, useOutlet } from '../../context/OutletContext';
import { OutletChecklist } from './OutletChecklist';
import { PosSimulator } from './PosSimulator';

type ExperienceTab = 'pos' | 'checklist';

function OutletSimulatorInner() {
  const [activeTab, setActiveTab] = useState<ExperienceTab>('pos');
  const [resetKey, setResetKey] = useState(0);
  const {
    totalCupsSold,
    lowStockCount,
    resetSales,
    resetStock,
    resetChecklist,
  } = useOutlet();

  const handleResetSimulation = () => {
    resetSales();
    resetStock();
    resetChecklist();
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="tablist"
          aria-label="Mode simulasi operasional outlet"
          className="flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            role="tab"
            id="tab-sim-pos"
            aria-selected={activeTab === 'pos'}
            aria-controls="panel-sim-outlet"
            onClick={() => setActiveTab('pos')}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
              activeTab === 'pos'
                ? 'bg-ink text-bg'
                : 'border border-line bg-surface text-muted hover:border-gold hover:text-ink'
            }`}
          >
            <ReceiptText className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            <span>Simulasi Kasir POS</span>
          </button>

          <button
            type="button"
            role="tab"
            id="tab-sim-checklist"
            aria-selected={activeTab === 'checklist'}
            aria-controls="panel-sim-outlet"
            onClick={() => setActiveTab('checklist')}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
              activeTab === 'checklist'
                ? 'bg-ink text-bg'
                : 'border border-line bg-surface text-muted hover:border-gold hover:text-ink'
            }`}
          >
            <ClipboardCheck className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            <span>Ceklis Stok &amp; Kebersihan</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] font-medium text-ink">
            <Coffee className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
            <span className="tabular-nums">{totalCupsSold} cup terjual</span>
          </span>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium ${
              lowStockCount > 0
                ? 'border-gold bg-gold-soft text-gold-ink'
                : 'border-line bg-surface text-muted'
            }`}
          >
            <AlertTriangle
              className={`h-4 w-4 shrink-0 ${lowStockCount > 0 ? 'text-gold' : 'text-muted'}`}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="tabular-nums">{lowStockCount} stok menipis</span>
          </span>

          <button
            type="button"
            onClick={handleResetSimulation}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-gold hover:bg-gold-soft/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <RotateCcw className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
            <span>Reset Simulasi</span>
          </button>
        </div>
      </div>

      <div
        id="panel-sim-outlet"
        role="tabpanel"
        aria-labelledby={
          activeTab === 'pos' ? 'tab-sim-pos' : 'tab-sim-checklist'
        }
      >
        {activeTab === 'pos' ? (
          <PosSimulator key={`pos-${resetKey}`} />
        ) : (
          <OutletChecklist key={`checklist-${resetKey}`} />
        )}
      </div>
    </div>
  );
}

export default function OutletSimulatorSection() {
  return (
    <OutletProvider>
      <OutletSimulatorInner />
    </OutletProvider>
  );
}
