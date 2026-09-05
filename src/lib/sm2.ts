/**
 * SM-2 spaced repetition (SuperMemo 2).
 * Used by the Exam Prep Engine so EPS-TOPIK vocabulary resurfaces right before
 * it is about to be forgotten.
 */
export interface SrsCard {
  ease: number; // EF, floor 1.3
  interval: number; // days
  reps: number;
  lapses: number;
  due: string; // ISO date
  lastQuality: number;
  seen: boolean;
}

export const DEFAULT_CARD: SrsCard = {
  ease: 2.5,
  interval: 0,
  reps: 0,
  lapses: 0,
  due: '',
  lastQuality: -1,
  seen: false,
};

export type Rating = 'again' | 'hard' | 'good' | 'easy';

const QUALITY: Record<Rating, number> = { again: 1, hard: 3, good: 4, easy: 5 };

function isoPlus(days: number): string {
  const d = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

export function schedule(card: SrsCard, rating: Rating): SrsCard {
  const q = QUALITY[rating];
  const c: SrsCard = { ...card, seen: true, lastQuality: q };

  if (q < 3) {
    // Failed recall: restart the cycle but remember the lapse for analytics.
    c.reps = 0;
    c.interval = 1;
    c.lapses = card.lapses + 1;
    c.ease = Math.max(1.3, card.ease - 0.2);
    c.due = isoPlus(1);
    return c;
  }

  c.ease = Math.max(1.3, card.ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  c.reps = card.reps + 1;

  if (c.reps === 1) c.interval = rating === 'easy' ? 4 : 1;
  else if (c.reps === 2) c.interval = rating === 'easy' ? 9 : 6;
  else c.interval = Math.round(card.interval * c.ease * (rating === 'hard' ? 0.7 : 1));

  if (rating === 'easy') c.interval = Math.round(c.interval * 1.3);
  c.interval = Math.min(c.interval, 365);
  c.due = isoPlus(c.interval);
  return c;
}

export function isDue(card: SrsCard | undefined): boolean {
  if (!card || !card.seen) return true;
  const today = isoPlus(0);
  return card.due <= today;
}

export function isMastered(card: SrsCard | undefined): boolean {
  return !!card && card.seen && card.interval >= 21 && card.ease >= 2.3;
}
