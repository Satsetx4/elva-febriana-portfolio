import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import type {
  CartItem,
  ChecklistItem,
  SaleTransaction,
  ShiftType,
  StockItem,
} from '../types/portfolio';
import {
  INITIAL_CHECKLIST,
  INITIAL_STOCK,
  MENU_ITEMS,
} from '../data/menu';
import { STORAGE_KEYS, safeGet, safeSet } from '../lib/storage';

interface OutletContextValue {
  sales: SaleTransaction[];
  stock: StockItem[];
  checklist: ChecklistItem[];
  lowStockCount: number;
  totalCupsSold: number;
  totalOmzet: number;
  recordSale: (
    items: CartItem[],
    cashReceived: number,
    paymentMethod?: 'Tunai' | 'QRIS',
  ) => SaleTransaction;
  resetSales: () => void;
  adjustStock: (id: string, delta: number) => void;
  resetStock: () => void;
  toggleChecklistItem: (id: string) => void;
  resetChecklist: (shift?: ShiftType) => void;
}

const OutletContext = createContext<OutletContextValue | undefined>(undefined);

function cloneInitialStock(): StockItem[] {
  return INITIAL_STOCK.map((item) => ({ ...item }));
}

function cloneInitialChecklist(): ChecklistItem[] {
  return INITIAL_CHECKLIST.map((item) => ({ ...item }));
}

function readInitialSales(): SaleTransaction[] {
  const stored = safeGet<SaleTransaction[]>(STORAGE_KEYS.sales, []);
  return Array.isArray(stored) ? stored : [];
}

function readInitialStock(): StockItem[] {
  const stored = safeGet<StockItem[]>(STORAGE_KEYS.stock, INITIAL_STOCK);
  if (!Array.isArray(stored) || stored.length === 0) {
    return cloneInitialStock();
  }
  return stored;
}

function readInitialChecklist(): ChecklistItem[] {
  const stored = safeGet<ChecklistItem[]>(
    STORAGE_KEYS.shift,
    INITIAL_CHECKLIST,
  );
  if (!Array.isArray(stored) || stored.length === 0) {
    return cloneInitialChecklist();
  }
  return stored;
}

export function OutletProvider({ children }: { children: ReactNode }) {
  const [sales, setSales] = useState<SaleTransaction[]>(readInitialSales);
  const [stock, setStock] = useState<StockItem[]>(readInitialStock);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    readInitialChecklist,
  );

  const lowStockCount = useMemo(
    () => stock.filter((item) => item.qty <= item.minStock).length,
    [stock],
  );

  const totalCupsSold = useMemo(
    () =>
      sales.reduce(
        (sum, tx) =>
          sum + tx.items.reduce((itemSum, item) => itemSum + item.qty, 0),
        0,
      ),
    [sales],
  );

  const totalOmzet = useMemo(
    () => sales.reduce((sum, tx) => sum + tx.total, 0),
    [sales],
  );

  const recordSale = useCallback(
    (
      items: CartItem[],
      cashReceived: number,
      paymentMethod: 'Tunai' | 'QRIS' = 'Tunai',
    ): SaleTransaction => {
      const total = items.reduce(
        (sum, item) => sum + item.unitPrice * item.qty,
        0,
      );
      const safeCash = Math.max(0, cashReceived);
      const resolvedMethod: 'Tunai' | 'QRIS' =
        safeCash === total && paymentMethod === 'QRIS' ? 'QRIS' : paymentMethod;

      const transaction: SaleTransaction = {
        id: `TRX-${Date.now().toString().slice(-6)}`,
        timestamp: new Date().toISOString(),
        items: items.map((item) => ({ ...item })),
        total,
        paymentMethod: resolvedMethod,
      };

      setSales((prev) => {
        const next = [transaction, ...prev];
        safeSet(STORAGE_KEYS.sales, next);
        return next;
      });

      const deductions: Record<string, number> = {};
      for (const item of items) {
        const drink = MENU_ITEMS.find((m) => m.id === item.drinkId);
        if (drink) {
          for (const [stockId, amount] of Object.entries(drink.stockUsage)) {
            deductions[stockId] =
              (deductions[stockId] ?? 0) + amount * item.qty;
          }
        }

        const cupKey = item.size === 'large' ? 'cup-large' : 'cup-reg';
        deductions[cupKey] = (deductions[cupKey] ?? 0) + item.qty;

        if (!drink?.stockUsage?.sedotan) {
          deductions.sedotan = (deductions.sedotan ?? 0) + item.qty;
        }
        if (!drink?.stockUsage?.es) {
          deductions.es = (deductions.es ?? 0) + item.qty;
        }
      }

      setStock((prev) => {
        const next = prev.map((s) => {
          const used = deductions[s.id] ?? 0;
          if (used <= 0) return s;
          return {
            ...s,
            qty: Math.max(0, s.qty - used),
          };
        });
        safeSet(STORAGE_KEYS.stock, next);
        return next;
      });

      return transaction;
    },
    [],
  );

  const resetSales = useCallback(() => {
    setSales([]);
    safeSet(STORAGE_KEYS.sales, []);
  }, []);

  const adjustStock = useCallback((id: string, delta: number) => {
    setStock((prev) => {
      const next = prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(0, item.qty + delta) }
          : item,
      );
      safeSet(STORAGE_KEYS.stock, next);
      return next;
    });
  }, []);

  const resetStock = useCallback(() => {
    const fresh = cloneInitialStock();
    setStock(fresh);
    safeSet(STORAGE_KEYS.stock, fresh);
  }, []);

  const toggleChecklistItem = useCallback((id: string) => {
    setChecklist((prev) => {
      const next = prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      );
      safeSet(STORAGE_KEYS.shift, next);
      return next;
    });
  }, []);

  const resetChecklist = useCallback((shift?: ShiftType) => {
    setChecklist((prev) => {
      const next = prev.map((item) => {
        if (!shift || item.shift === shift) {
          return { ...item, checked: false };
        }
        return item;
      });
      safeSet(STORAGE_KEYS.shift, next);
      return next;
    });
  }, []);

  const value = useMemo<OutletContextValue>(
    () => ({
      sales,
      stock,
      checklist,
      lowStockCount,
      totalCupsSold,
      totalOmzet,
      recordSale,
      resetSales,
      adjustStock,
      resetStock,
      toggleChecklistItem,
      resetChecklist,
    }),
    [
      sales,
      stock,
      checklist,
      lowStockCount,
      totalCupsSold,
      totalOmzet,
      recordSale,
      resetSales,
      adjustStock,
      resetStock,
      toggleChecklistItem,
      resetChecklist,
    ],
  );

  return (
    <OutletContext.Provider value={value}>{children}</OutletContext.Provider>
  );
}

export function useOutlet(): OutletContextValue {
  const ctx = useContext(OutletContext);
  if (!ctx) {
    throw new Error('useOutlet harus digunakan di dalam OutletProvider');
  }
  return ctx;
}
