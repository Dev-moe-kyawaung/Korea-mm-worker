import { Lang, LOCALE } from '../i18n';

export const DAY_MS = 24 * 60 * 60 * 1000;

export function daysUntil(iso: string): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const target = new Date(iso + 'T00:00:00');
  const t = new Date(target.getFullYear(), target.getMonth(), target.getDate()).getTime();
  return Math.round((t - start) / DAY_MS);
}

export function formatDate(iso: string, lang: Lang): string {
  try {
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString(LOCALE[lang], { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return iso;
  }
}

export function todayISO(offsetDays = 0): string {
  const d = new Date(Date.now() + offsetDays * DAY_MS);
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/** 90 / 60 / 30 / 7 day urgency buckets used by the vault tracker. */
export type Urgency = 'expired' | 'u7' | 'u30' | 'u60' | 'u90' | 'ok';

export function urgencyFor(days: number): Urgency {
  if (days < 0) return 'expired';
  if (days <= 7) return 'u7';
  if (days <= 30) return 'u30';
  if (days <= 60) return 'u60';
  if (days <= 90) return 'u90';
  return 'ok';
}

export function isISODate(v: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(new Date(v + 'T00:00:00').getTime());
}
