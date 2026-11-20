import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  CheckCircle2,
  ClipboardList,
  Coffee,
  Download,
  Info,
  Minus,
  Plus,
  Receipt,
  RotateCcw,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import { MENU_ITEMS, SIMULATION_DISCLAIMER } from '../../data/menu';
import { useOutlet } from '../../context/OutletContext';
import { EASE_EDITORIAL } from '../../lib/motion';
import type {
  CartItem,
  DrinkMenuItem,
  DrinkSize,
  SaleTransaction,
  SugarLevel,
} from '../../types/portfolio';
import { CountUp } from '../ui/CountUp';

interface ReceiptSummary {
  transaction: SaleTransaction;
  cashReceived: number;
  change: number;
}

const SUGAR_LABELS: Record<SugarLevel, string> = {
  less: 'Less Sugar',
  normal: 'Normal',
  extra: 'Extra Sugar',
};

const SIZE_LABELS: Record<DrinkSize, string> = {
  reg: 'Reguler',
  large: 'Large',
};

function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

function formatSugarSop(baseGula: string, sugar: SugarLevel): string {
  if (sugar === 'less') {
    return `${baseGula} — dikurangi 50% (Less Sugar)`;
  }
  if (sugar === 'extra') {
    return `${baseGula} — ditambah +10 ml (Extra Sugar)`;
  }
  return `${baseGula} (Takaran Normal)`;
}

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '--:--';
  }
}

export function PosSimulator() {
  const {
    sales,
    totalCupsSold,
    totalOmzet,
    recordSale,
    resetSales,
  } = useOutlet();

  const shouldReduceMotion = useReducedMotion();
  const [selectedDrink, setSelectedDrink] = useState<DrinkMenuItem>(
    MENU_ITEMS[0],
  );
  const [size, setSize] = useState<DrinkSize>('reg');
  const [sugar, setSugar] = useState<SugarLevel>('normal');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cashInput, setCashInput] = useState<string>('');
  const [lastReceipt, setLastReceipt] = useState<ReceiptSummary | null>(null);

  const activeSop = selectedDrink.sop[size];
  const activePrice = selectedDrink.price[size];

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0),
    [cart],
  );

  const cashReceived = useMemo(() => {
    const parsed = Number(cashInput.replace(/\D/g, ''));
    return Number.isFinite(parsed) ? parsed : 0;
  }, [cashInput]);

  const changeAmount = cashReceived - cartTotal;
  const canCheckout = cart.length > 0 && cashReceived >= cartTotal;

  const bestSeller = useMemo(() => {
    if (sales.length === 0) return 'Belum ada';
    const counts = new Map<string, number>();
    for (const tx of sales) {
      for (const item of tx.items) {
        counts.set(item.name, (counts.get(item.name) ?? 0) + item.qty);
      }
    }
    let topName = 'Belum ada';
    let topQty = 0;
    for (const [name, qty] of counts.entries()) {
      if (qty > topQty) {
        topQty = qty;
        topName = `${name} (${qty})`;
      }
    }
    return topName;
  }, [sales]);

  const handleAddToCart = () => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.drinkId === selectedDrink.id &&
          item.size === size &&
          item.sugar === sugar,
      );
      if (existingIndex >= 0) {
        return prev.map((item, idx) =>
          idx === existingIndex ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      const nextItem: CartItem = {
        id: `${selectedDrink.id}-${size}-${sugar}-${Date.now()}`,
        drinkId: selectedDrink.id,
        name: selectedDrink.name,
        size,
        sugar,
        qty: 1,
        unitPrice: activePrice,
      };
      return [...prev, nextItem];
    });
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCompleteTransaction = () => {
    if (!canCheckout) return;
    const tx = recordSale(cart, cashReceived, 'Tunai');
    setLastReceipt({
      transaction: tx,
      cashReceived,
      change: cashReceived - tx.total,
    });
    setCart([]);
    setCashInput('');
  };

  const handleExportCsv = () => {
    if (sales.length === 0) return;
    const header = 'ID Transaksi,Waktu,Menu,Jumlah Cup,Metode,Total (Rp)';
    const rows = sales.map((tx) => {
      const itemText = tx.items
        .map(
          (i) =>
            `${i.name} (${SIZE_LABELS[i.size]}/${SUGAR_LABELS[i.sugar]}) x${i.qty}`,
        )
        .join('; ');
      const cups = tx.items.reduce((s, i) => s + i.qty, 0);
      return [
        tx.id,
        formatTime(tx.timestamp),
        `"${itemText.replace(/"/g, '""')}"`,
        String(cups),
        tx.paymentMethod,
        String(tx.total),
      ].join(',');
    });
    const csvContent = [header, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rekap-kasir-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleResetAll = () => {
    resetSales();
    setLastReceipt(null);
  };

  return (
    <div className="space-y-6">
      {/* Subtle Editorial Disclaimer */}
      <div className="flex items-start gap-3 rounded-xl border border-line bg-gold-soft/50 px-4 py-3 text-sm leading-relaxed text-muted">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
        <p>{SIMULATION_DISCLAIMER}</p>
      </div>

      {/* Main Split Grid: Menu + SOP vs Cart + Payment */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: Menu Selection & SOP Racikan */}
        <div className="space-y-5 lg:col-span-7">
          <div className="rounded-2xl border border-line bg-surface p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="eyebrow">Daftar Menu</p>
                <h3 className="font-sans text-xl font-semibold text-ink">
                  Pilih Minuman &amp; Takaran
                </h3>
              </div>
              <Coffee className="h-5 w-5 text-gold" strokeWidth={1.5} aria-hidden="true" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {MENU_ITEMS.map((drink) => {
                const isSelected = drink.id === selectedDrink.id;
                return (
                  <button
                    key={drink.id}
                    type="button"
                    onClick={() => setSelectedDrink(drink)}
                    className={`group rounded-xl border p-3.5 text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-gold bg-gold-soft/60 shadow-xs'
                        : 'border-line bg-bg/50 hover:border-gold/50 hover:bg-gold-soft/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="meta">{drink.category}</span>
                        <p className="mt-0.5 font-sans text-lg font-semibold text-ink">
                          {drink.name}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full border border-line bg-surface px-2.5 py-0.5 text-[13px] font-semibold tabular-nums text-ink">
                        {formatRupiah(drink.price[size])}
                      </span>
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
                      {drink.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Size & Sugar Controls */}
            <div className="mt-5 grid gap-4 border-t border-line pt-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-medium text-muted">
                  Ukuran Cup
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {(['reg', 'large'] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSize(option)}
                      className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                        size === option
                          ? 'border-gold bg-gold-soft text-ink'
                          : 'border-line bg-bg/60 text-muted hover:text-ink'
                      }`}
                    >
                      {SIZE_LABELS[option]} · {formatRupiah(selectedDrink.price[option])}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-muted">
                  Tingkat Gula
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {(['less', 'normal', 'extra'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSugar(level)}
                      className={`min-h-[44px] rounded-lg border px-2 py-2 text-sm font-medium transition-colors ${
                        sugar === level
                          ? 'border-gold bg-gold-soft text-ink'
                          : 'border-line bg-bg/60 text-muted hover:text-ink'
                      }`}
                    >
                      {level === 'less'
                        ? 'Less'
                        : level === 'normal'
                          ? 'Normal'
                          : 'Extra'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Live Kartu SOP Racikan */}
          <div className="rounded-2xl border border-line bg-surface p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ClipboardList
                  className="h-4 w-4 text-gold"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h4 className="font-sans text-lg font-semibold text-ink">
                  Kartu SOP Racikan
                </h4>
              </div>
              <span className="pill border border-line bg-gold-soft text-gold-ink">
                {selectedDrink.name} · {SIZE_LABELS[size]}
              </span>
            </div>

            <dl className="grid gap-2.5 text-sm sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-bg/50 p-3">
                <dt className="meta">Base Teh</dt>
                <dd className="mt-1 font-medium text-ink">{activeSop.teh}</dd>
              </div>
              <div className="rounded-xl border border-line bg-bg/50 p-3">
                <dt className="meta">Takaran Gula</dt>
                <dd className="mt-1 font-medium text-ink">
                  {formatSugarSop(activeSop.gula, sugar)}
                </dd>
              </div>
              {activeSop.tambahan ? (
                <div className="rounded-xl border border-line bg-bg/50 p-3">
                  <dt className="meta">Tambahan</dt>
                  <dd className="mt-1 font-medium text-ink">
                    {activeSop.tambahan}
                  </dd>
                </div>
              ) : null}
              <div className="rounded-xl border border-line bg-bg/50 p-3">
                <dt className="meta">Es Batu</dt>
                <dd className="mt-1 font-medium text-ink">{activeSop.es}</dd>
              </div>
            </dl>

            <p className="mt-3 rounded-xl border border-dashed border-line bg-bg/40 px-3.5 py-2.5 text-sm leading-relaxed text-muted">
              <span className="font-semibold text-ink">Catatan Barista:</span>{' '}
              {activeSop.catatan}
            </p>

            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-gold bg-gold-soft px-4 py-2.5 text-sm font-medium text-ink transition-all hover:border-gold-ink hover:bg-gold-ink hover:text-surface active:scale-[0.99]"
            >
              <Plus className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              <span>Tambah ke Pesanan ({formatRupiah(activePrice)})</span>
            </button>
          </div>
        </div>

        {/* Right: Cart, Payment & Receipt */}
        <div className="space-y-5 lg:col-span-5">
          <div className="rounded-2xl border border-line bg-surface p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag
                  className="h-4 w-4 text-gold"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="font-sans text-xl font-semibold text-ink">
                  Keranjang Pesanan
                </h3>
              </div>
              <span className="text-sm font-medium tabular-nums text-muted">
                {cart.reduce((s, i) => s + i.qty, 0)} cup
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="rounded-xl border border-dashed border-line bg-bg/40 px-4 py-8 text-center text-sm leading-relaxed text-muted">
                Belum ada minuman di pesanan. Pilih menu di sebelah kiri lalu
                klik &ldquo;Tambah ke Pesanan&rdquo;.
              </div>
            ) : (
              <ul className="space-y-2.5">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-line bg-bg/50 px-3 py-2.5"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">
                        {item.name}
                      </p>
                      <p className="meta">
                        {SIZE_LABELS[item.size]} · {SUGAR_LABELS[item.sugar]} ·{' '}
                        {formatRupiah(item.unitPrice)}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        type="button"
                        aria-label={`Kurangi ${item.name}`}
                        onClick={() => handleUpdateQty(item.id, -1)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-ink hover:border-gold"
                      >
                        <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </button>
                      <span className="w-7 text-center text-sm font-semibold tabular-nums text-ink">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        aria-label={`Tambah ${item.name}`}
                        onClick={() => handleUpdateQty(item.id, 1)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-ink hover:border-gold"
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Hapus ${item.name}`}
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-muted hover:text-ink"
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Subtotal & Payment */}
            <div className="mt-4 space-y-3 border-t border-line pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="font-sans text-xl font-semibold tabular-nums text-ink">
                  {formatRupiah(cartTotal)}
                </span>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-muted">
                  Pembayaran Tunai
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
                  <button
                    type="button"
                    disabled={cartTotal === 0}
                    onClick={() => setCashInput(String(cartTotal))}
                    className="min-h-[44px] rounded-lg border border-line bg-bg/60 px-3 py-2 text-sm font-medium text-ink transition-colors hover:border-gold disabled:opacity-40"
                  >
                    Uang Pas
                  </button>
                  {[20000, 50000, 100000].map((nominal) => (
                    <button
                      key={nominal}
                      type="button"
                      disabled={cartTotal === 0}
                      onClick={() => setCashInput(String(nominal))}
                      className="min-h-[44px] rounded-lg border border-line bg-bg/60 px-3 py-2 text-sm font-medium tabular-nums text-ink transition-colors hover:border-gold disabled:opacity-40"
                    >
                      {formatRupiah(nominal)}
                    </button>
                  ))}
                </div>

                <label className="mt-2.5 block">
                  <span className="sr-only">Nominal Tunai Diterima</span>
                  <input
                    type="number"
                    min={0}
                    inputMode="numeric"
                    value={cashInput}
                    onChange={(e) => setCashInput(e.target.value)}
                    placeholder="Masukkan nominal tunai (Rp)..."
                    className="min-h-[44px] w-full rounded-xl border border-line bg-bg/60 px-3.5 py-2.5 text-base sm:text-sm tabular-nums text-ink placeholder:text-muted focus:border-gold focus:outline-none"
                  />
                </label>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-line bg-bg/40 px-3.5 py-2.5 text-sm">
                <span className="text-muted">Kembalian</span>
                <span
                  className={`font-semibold tabular-nums ${
                    cart.length > 0 && changeAmount < 0
                      ? 'text-amber-800 dark:text-amber-300'
                      : 'text-ink'
                  }`}
                >
                  {cart.length === 0
                    ? 'Rp 0'
                    : changeAmount < 0
                      ? `Kurang ${formatRupiah(Math.abs(changeAmount))}`
                      : formatRupiah(changeAmount)}
                </span>
              </div>

              <button
                type="button"
                disabled={!canCheckout}
                onClick={handleCompleteTransaction}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Receipt className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                <span>Selesaikan Transaksi</span>
              </button>
            </div>
          </div>

          {/* Struk Transaksi & Stock Deduction Confirmation */}
          <AnimatePresence mode="wait">
            {lastReceipt ? (
              <motion.div
                key={lastReceipt.transaction.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: shouldReduceMotion ? 0 : 0.3,
                    ease: EASE_EDITORIAL,
                  },
                }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                className="rounded-2xl border border-gold/60 bg-surface p-5"
              >
                <div className="flex items-start gap-2.5 rounded-xl border border-line bg-gold-soft/60 px-3.5 py-2.5 text-sm leading-relaxed text-ink">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span>
                    Transaksi tercatat. Stok bahan baku di{' '}
                    <strong>Ceklis Outlet</strong> otomatis terpotong sesuai
                    resep SOP.
                  </span>
                </div>

                <div className="mt-4 border-b border-dashed border-line pb-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-sans text-lg font-semibold text-ink">
                      Struk Transaksi
                    </h4>
                    <span className="text-[13px] font-medium tabular-nums text-muted">
                      {lastReceipt.transaction.id} ·{' '}
                      {formatTime(lastReceipt.transaction.timestamp)}
                    </span>
                  </div>
                </div>

                <ul className="my-3 space-y-1.5 text-sm">
                  {lastReceipt.transaction.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-2 text-ink"
                    >
                      <span className="truncate">
                        {item.qty}x {item.name} ({SIZE_LABELS[item.size]},{' '}
                        {SUGAR_LABELS[item.sugar]})
                      </span>
                      <span className="shrink-0 tabular-nums">
                        {formatRupiah(item.unitPrice * item.qty)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-1 border-t border-dashed border-line pt-3 text-sm">
                  <div className="flex justify-between font-semibold text-ink">
                    <span>Total</span>
                    <span className="tabular-nums">
                      {formatRupiah(lastReceipt.transaction.total)}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Tunai</span>
                    <span className="tabular-nums">
                      {formatRupiah(lastReceipt.cashReceived)}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Kembalian</span>
                    <span className="tabular-nums">
                      {formatRupiah(lastReceipt.change)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* Rekap Penjualan Harian */}
      <div className="rounded-2xl border border-line bg-surface p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <div>
            <p className="eyebrow">Laporan Shift</p>
            <h3 className="font-sans text-xl font-semibold text-ink">
              Rekap Penjualan Harian
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={sales.length === 0}
              onClick={handleExportCsv}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-line bg-bg/70 px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:border-gold disabled:opacity-40"
            >
              <Download className="h-4 w-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
              <span>Ekspor CSV</span>
            </button>
            <button
              type="button"
              disabled={sales.length === 0 && !lastReceipt}
              onClick={handleResetAll}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-line bg-bg/70 px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:border-gold hover:text-ink disabled:opacity-40"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              <span>Tutup Kasir (Reset)</span>
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-line bg-bg/50 p-4">
            <p className="text-sm text-muted">Total Cup Terjual</p>
            <p className="mt-1 font-sans text-2xl font-semibold tabular-nums text-ink">
              <CountUp value={totalCupsSold} suffix=" cup" />
            </p>
          </div>
          <div className="rounded-xl border border-line bg-bg/50 p-4">
            <p className="text-sm text-muted">Total Omzet</p>
            <p className="mt-1 font-sans text-2xl font-semibold tabular-nums text-ink">
              <CountUp prefix="Rp " value={totalOmzet} />
            </p>
          </div>
          <div className="rounded-xl border border-line bg-bg/50 p-4">
            <p className="text-sm text-muted">Menu Terlaris</p>
            <p className="mt-1 truncate font-sans text-lg font-semibold text-ink">
              {bestSeller}
            </p>
          </div>
        </div>

        {sales.length > 0 ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-muted">
                  <th className="py-2 pr-3 font-medium">ID</th>
                  <th className="py-2 pr-3 font-medium">Waktu</th>
                  <th className="py-2 pr-3 font-medium">Rincian Pesanan</th>
                  <th className="py-2 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {sales.slice(0, 8).map((tx) => (
                  <tr key={tx.id}>
                    <td className="py-2.5 pr-3 font-medium tabular-nums text-ink">
                      {tx.id}
                    </td>
                    <td className="py-2.5 pr-3 tabular-nums text-muted">
                      {formatTime(tx.timestamp)}
                    </td>
                    <td className="py-2.5 pr-3 text-ink">
                      {tx.items
                        .map(
                          (item) =>
                            `${item.name} (${SIZE_LABELS[item.size]}) x${item.qty}`,
                        )
                        .join(', ')}
                    </td>
                    <td className="py-2.5 text-right font-medium tabular-nums text-ink">
                      {formatRupiah(tx.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 text-center text-sm text-muted">
            Belum ada transaksi tercatat pada shift ini.
          </p>
        )}
      </div>
    </div>
  );
}
