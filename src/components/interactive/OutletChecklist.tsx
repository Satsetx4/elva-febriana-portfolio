import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  AlertTriangle,
  Award,
  Check,
  ClipboardCheck,
  Minus,
  Package,
  Plus,
  RotateCcw,
} from 'lucide-react';
import { useOutlet } from '../../context/OutletContext';
import { EASE_EDITORIAL } from '../../lib/motion';
import type { ShiftType } from '../../types/portfolio';

type ChecklistTab = 'stok' | 'kebersihan';

export function OutletChecklist() {
  const {
    stock,
    checklist,
    lowStockCount,
    adjustStock,
    resetStock,
    toggleChecklistItem,
    resetChecklist,
  } = useOutlet();

  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<ChecklistTab>('stok');
  const [activeShift, setActiveShift] = useState<ShiftType>('buka');

  const shiftItems = useMemo(
    () => checklist.filter((item) => item.shift === activeShift),
    [checklist, activeShift],
  );

  const completedCount = useMemo(
    () => shiftItems.filter((item) => item.checked).length,
    [shiftItems],
  );

  const progressPercent = useMemo(() => {
    if (shiftItems.length === 0) return 0;
    return Math.round((completedCount / shiftItems.length) * 100);
  }, [completedCount, shiftItems.length]);

  const isShiftReady =
    shiftItems.length > 0 && completedCount === shiftItems.length;

  return (
    <div className="space-y-5">
      {/* Sub-tabs Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-2">
        <div className="grid w-full grid-cols-2 gap-2 sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab('stok')}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-colors ${
              activeTab === 'stok'
                ? 'border border-gold bg-gold-soft text-ink'
                : 'border border-transparent text-muted hover:text-ink'
            }`}
          >
            <Package className="h-4 w-4" strokeWidth={1.5} />
            <span>Stok Bahan</span>
            {lowStockCount > 0 ? (
              <span className="rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-amber-700 dark:text-amber-300">
                {lowStockCount}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('kebersihan')}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-colors ${
              activeTab === 'kebersihan'
                ? 'border border-gold bg-gold-soft text-ink'
                : 'border border-transparent text-muted hover:text-ink'
            }`}
          >
            <ClipboardCheck className="h-4 w-4" strokeWidth={1.5} />
            <span>Kebersihan Shift</span>
          </button>
        </div>

        <p className="hidden px-2 text-xs text-muted sm:block">
          {activeTab === 'stok'
            ? 'Terhubung otomatis dengan transaksi Kasir POS'
            : `Progres Shift ${activeShift === 'buka' ? 'Buka' : 'Tutup'}: ${progressPercent}%`}
        </p>
      </div>

      {/* Tab Content */}
      {activeTab === 'stok' ? (
        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <div>
              <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-gold">
                Inventori Outlet
              </p>
              <h3 className="font-serif text-xl font-semibold text-ink">
                Kontrol Stok Bahan Baku
              </h3>
            </div>
            <button
              type="button"
              onClick={resetStock}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-bg/70 px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-gold"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
              Restok Awal
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {stock.map((item) => {
              const isLow = item.qty <= item.minStock;
              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between gap-3 rounded-xl border p-3.5 transition-colors ${
                    isLow
                      ? 'border-amber-600/40 bg-amber-500/5 dark:border-amber-400/30'
                      : 'border-line bg-bg/50'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-medium text-ink">
                        {item.name}
                      </p>
                      {isLow ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-600/30 bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium text-amber-800 dark:text-amber-300">
                          <AlertTriangle
                            className="h-3 w-3"
                            strokeWidth={1.5}
                          />
                          Menipis
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-xs text-muted">
                      Batas minimum: {item.minStock} {item.unit}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      aria-label={`Kurangi stok ${item.name}`}
                      disabled={item.qty <= 0}
                      onClick={() => adjustStock(item.id, -1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-ink transition-colors hover:border-gold disabled:opacity-40"
                    >
                      <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                    <div className="min-w-[54px] text-center">
                      <span className="text-sm font-semibold tabular-nums text-ink">
                        {item.qty}
                      </span>{' '}
                      <span className="text-[11px] text-muted">
                        {item.unit}
                      </span>
                    </div>
                    <button
                      type="button"
                      aria-label={`Tambah stok ${item.name}`}
                      onClick={() => adjustStock(item.id, 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-ink transition-colors hover:border-gold"
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <div className="flex items-center gap-2">
              {(['buka', 'tutup'] as const).map((shift) => (
                <button
                  key={shift}
                  type="button"
                  onClick={() => setActiveShift(shift)}
                  className={`rounded-xl border px-3.5 py-2 text-xs font-medium transition-colors ${
                    activeShift === shift
                      ? 'border-gold bg-gold-soft text-ink'
                      : 'border-line bg-bg/60 text-muted hover:text-ink'
                  }`}
                >
                  {shift === 'buka' ? 'Shift Buka' : 'Shift Tutup'}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => resetChecklist(activeShift)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-bg/70 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-gold hover:text-ink"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
              Reset Shift
            </button>
          </div>

          {/* Animated Gold Progress Bar */}
          <div className="mb-5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted">
                Kelengkapan {activeShift === 'buka' ? 'Shift Buka' : 'Shift Tutup'}
              </span>
              <span className="font-medium tabular-nums text-ink">
                {completedCount}/{shiftItems.length} selesai ({progressPercent}%)
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full border border-line bg-bg">
              <motion.div
                className="h-full rounded-full bg-gold"
                initial={false}
                animate={{ width: `${progressPercent}%` }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.4,
                  ease: EASE_EDITORIAL,
                }}
              />
            </div>
          </div>

          {/* Checklist Items */}
          <ul className="space-y-2.5">
            {shiftItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={item.checked}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-colors ${
                    item.checked
                      ? 'border-gold/50 bg-gold-soft/40'
                      : 'border-line bg-bg/50 hover:border-gold/50'
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                      item.checked
                        ? 'border-gold bg-gold text-surface'
                        : 'border-line bg-surface text-transparent'
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>

                  <span
                    className={`text-sm leading-relaxed transition-all duration-200 ${
                      item.checked
                        ? 'text-muted line-through decoration-gold/70'
                        : 'text-ink'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Editorial "Outlet Siap" Gold Seal Badge */}
          <AnimatePresence>
            {isShiftReady ? (
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 8, scale: 0.98 }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.35, ease: EASE_EDITORIAL },
                }}
                exit={{ opacity: 0, y: -6 }}
                className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-gold bg-gold-soft/70 px-4 py-3.5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold bg-surface text-gold">
                    <Award className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-serif text-lg font-semibold text-ink">
                      Outlet Siap
                    </p>
                    <p className="text-xs text-muted">
                      Seluruh standar{' '}
                      {activeShift === 'buka' ? 'persiapan buka' : 'tutup shift'}{' '}
                      telah terpenuhi 100%.
                    </p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-gold/60 bg-surface px-3 py-1 font-serif text-xs font-semibold tracking-wider uppercase text-gold">
                  100% Terverifikasi
                </span>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
