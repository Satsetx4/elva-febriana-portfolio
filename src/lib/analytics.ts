import { track } from '@vercel/analytics';
import type { AnalyticsEventName } from '../types/portfolio';

export function trackEvent(name: AnalyticsEventName, label: string): void {
  try {
    track(name, { label });
  } catch {
    // Ignore analytics errors in offline or blocked contexts
  }
}
