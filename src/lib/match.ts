import { VISA_LIST, Visa, WIZARD_AGE_BOOST, WIZARD_PRIORITY_BOOST } from '../data/visas';

export interface Match {
  visa: Visa;
  score: number; // 0-99 fit score
  reasons: string[]; // i18n keys explaining the fit
}

/**
 * Decision-tree scorer used by the 5-question wizard and by onboarding.
 * Base suitability + goal alignment + profile boosts + priority weighting.
 */
export function scoreVisas(answers: Record<string, string>): Match[] {
  const matches: Match[] = VISA_LIST.map((visa) => {
    let score = 35;
    const reasons = new Set<string>();

    if (answers.goal && visa.goals.includes(answers.goal)) {
      score += 35;
      reasons.add(answers.goal);
    }

    (['status', 'korean'] as const).forEach((key) => {
      const ans = answers[key];
      if (!ans) return;
      const boost = visa.scoreBoost[ans] ?? 0;
      score += boost;
      if (boost > 0) reasons.add(ans);
    });

    if (answers.priority) {
      const boost = WIZARD_PRIORITY_BOOST[answers.priority]?.[visa.id] ?? 0;
      score += boost;
      if (boost > 0) reasons.add(answers.priority);
    }

    if (answers.age) {
      const boost = WIZARD_AGE_BOOST[answers.age]?.[visa.id] ?? 0;
      score += boost;
      if (boost > 0) reasons.add(answers.age);
    }

    return { visa, score: Math.max(5, Math.min(99, Math.round(score))), reasons: Array.from(reasons) };
  });

  return matches.sort((a, b) => b.score - a.score);
}

export function topMatches(answers: Record<string, string>, min = 55, limit = 3): Match[] {
  return scoreVisas(answers).filter((m) => m.score >= min).slice(0, limit);
}
