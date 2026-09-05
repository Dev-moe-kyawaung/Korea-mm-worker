/**
 * Korea payroll model: income tax (progressive + local 10%),
 * national pension 4.5%, health insurance 3.545%, employment insurance 0.9%.
 * Figures follow the 2025/2026 statutory employee shares; kept in one place so
 * the policy-sync job can update them.
 */
export const INSURANCE = {
  pension: 0.045,
  health: 0.03545,
  employment: 0.009,
  employmentSmall: 0.007, // workplaces with <15 employees
  employerIndustrial: 0.010, // worker's comp — employer only
  pensionCapMonthly: 6_370_000,
  healthCapMonthly: 6_700_000,
};

export const TAX = {
  standardDeduction: 550_000,
  basicDeduction: 1_630_000, // per person incl. taxpayer (2025 reform)
  brackets: [
    { upTo: 14_000_000, rate: 0.06 },
    { upTo: 55_000_000, rate: 0.15 },
    { upTo: 88_000_000, rate: 0.24 },
    { upTo: 150_000_000, rate: 0.35 },
    { upTo: 300_000_000, rate: 0.38 },
    { upTo: 500_000_000, rate: 0.4 },
    { upTo: 1_000_000_000, rate: 0.42 },
    { upTo: Infinity, rate: 0.45 },
  ],
  localRate: 0.1,
};

/** F-5 income floor = 2× per-capita GNI, ~₩104,800,000 per the April 2026 standard. */
export const F5_INCOME_THRESHOLD = 104_800_000;
export const F5_SOURCE_NOTE = 'April 2026 standard (2× per-capita GNI ≈ ₩104.8M)';

export interface SalaryInput {
  monthlyGross: number;
  dependents: number; // people including the worker
  smallWorkplace: boolean;
}

export interface SalaryResult {
  annualGross: number;
  pension: number;
  health: number;
  employment: number;
  incomeTax: number;
  localTax: number;
  totalDeductions: number;
  annualNet: number;
  monthlyNet: number;
  employerMonthlyCost: number;
  effectiveRate: number; // total deduction % of gross
  f5Progress: number; // 0..1+
  f5Gap: number;
}

function progressiveTax(taxable: number): number {
  if (taxable <= 0) return 0;
  let remaining = taxable;
  let lower = 0;
  let tax = 0;
  for (const b of TAX.brackets) {
    const slice = Math.min(remaining, b.upTo - lower);
    if (slice <= 0) break;
    tax += slice * b.rate;
    remaining -= slice;
    lower = b.upTo;
    if (remaining <= 0) break;
  }
  return tax;
}

export function calculate(input: SalaryInput): SalaryResult {
  const annualGross = Math.max(0, input.monthlyGross) * 12;
  const pBase = Math.min(input.monthlyGross, INSURANCE.pensionCapMonthly);
  const hBase = Math.min(input.monthlyGross, INSURANCE.healthCapMonthly);
  const pension = pBase * INSURANCE.pension * 12;
  const health = hBase * INSURANCE.health * 12;
  const employment =
    input.monthlyGross * (input.smallWorkplace ? INSURANCE.employmentSmall : INSURANCE.employment) * 12;

  const social = pension + health + employment;
  const dependents = Math.max(1, input.dependents);
  const personal = TAX.standardDeduction + TAX.basicDeduction * dependents;
  const taxable = Math.max(0, annualGross - social - personal);
  const incomeTax = progressiveTax(taxable);
  const localTax = incomeTax * TAX.localRate;

  const totalDeductions = social + incomeTax + localTax;
  const annualNet = annualGross - totalDeductions;
  const employerMonthlyCost =
    input.monthlyGross *
    (1 +
      INSURANCE.pension +
      INSURANCE.health +
      (input.smallWorkplace ? INSURANCE.employmentSmall : INSURANCE.employment) +
      INSURANCE.employerIndustrial);

  return {
    annualGross,
    pension,
    health,
    employment,
    incomeTax,
    localTax,
    totalDeductions,
    annualNet,
    monthlyNet: annualNet / 12,
    employerMonthlyCost,
    effectiveRate: annualGross > 0 ? totalDeductions / annualGross : 0,
    f5Progress: annualGross / F5_INCOME_THRESHOLD,
    f5Gap: Math.max(0, F5_INCOME_THRESHOLD - annualGross),
  };
}

/** FX channels compared by the remittance optimizer (fee % of amount sent). */
export interface Channel {
  id: string;
  name: string;
  feePct: number;
  speed: string;
}

export const CHANNELS: Channel[] = [
  { id: 'app', name: 'Remittance app', feePct: 0.007, speed: 'same day' },
  { id: 'center', name: 'Licensed FX center', feePct: 0.015, speed: '1–2 days' },
  { id: 'bank', name: 'Bank wire', feePct: 0.03, speed: '2–4 days' },
];

export function remittancePlan(monthlyNet: number, share: number, rate: number) {
  const amount = monthlyNet * share;
  const options = CHANNELS.map((c) => {
    const fee = amount * c.feePct;
    return { channel: c, amount, fee, delivered: (amount - fee) * rate };
  }).sort((a, b) => b.delivered - a.delivered);
  const best = options[0];
  const worst = options[options.length - 1];
  return {
    amount,
    options,
    best,
    monthlySavingsMMK: best.delivered - worst.delivered,
    annualSavingsMMK: (best.delivered - worst.delivered) * 12,
  };
}
