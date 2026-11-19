import type { AnalyticsEvent, AnalyticsEventName } from '../types/portfolio';

export const STORAGE_KEYS = {
  theme: 'elva_theme',
  sales: 'elva_pos_sales',
  stock: 'elva_outlet_check_stock',
  shift: 'elva_outlet_check_shift',
  contactDraft: 'elva_contact_draft',
  events: 'elva_events',
} as const;

export function safeGet<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined') return fallback;
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function safeSet<T>(key: string, value: T): boolean {
  try {
    if (typeof window === 'undefined') return false;
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function safeRemove(key: string): boolean {
  try {
    if (typeof window === 'undefined') return false;
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function clearAllElvaStorage(): void {
  Object.values(STORAGE_KEYS).forEach((key) => {
    safeRemove(key);
  });
}

export function getTrackedEvents(): AnalyticsEvent[] {
  return safeGet<AnalyticsEvent[]>(STORAGE_KEYS.events, []);
}

export function trackEvent(
  name: AnalyticsEventName,
  label: string,
): AnalyticsEvent {
  const entry: AnalyticsEvent = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name,
    label,
    timestamp: new Date().toISOString(),
  };

  const existing = getTrackedEvents();
  const next = [entry, ...existing].slice(0, 50);
  safeSet(STORAGE_KEYS.events, next);
  return entry;
}
