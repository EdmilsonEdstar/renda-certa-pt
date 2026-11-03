
export type EffortStatus =
  | "good"
  | "moderate"
  | "low"
  | "missing";

export type EffortThresholds = {
  goodMax: number;
  moderateMax: number;
};

// Limites iniciais de classificação do protótipo.
export const DEFAULT_EFFORT_THRESHOLDS: EffortThresholds = {
  goodMax: 25,
  moderateMax: 35,
};

/**
 * Calcula a taxa de esforço habitacional.
 * Fórmula: renda mensal / rendimento líquido mensal * 100.
 */
export function calculateEffortRate(
  monthlyRent: number | null | undefined,
  householdNetIncome: number | null | undefined
): number | null {
  if (
    monthlyRent == null ||
    householdNetIncome == null ||
    !Number.isFinite(monthlyRent) ||
    !Number.isFinite(householdNetIncome) ||
    monthlyRent < 0 ||
    householdNetIncome <= 0
  ) {
    return null;
  }

  return (monthlyRent / householdNetIncome) * 100;
}

/**
 * Classifica a taxa de esforço.
 */
export function classifyEffort(
  rate: number | null,
  thresholds: EffortThresholds = DEFAULT_EFFORT_THRESHOLDS
): EffortStatus {
  if (
    rate === null ||
    !Number.isFinite(rate) ||
    rate < 0 ||
    !Number.isFinite(thresholds.goodMax) ||
    !Number.isFinite(thresholds.moderateMax) ||
    thresholds.goodMax < 0 ||
    thresholds.moderateMax < thresholds.goodMax
  ) {
    return "missing";
  }

  if (rate <= thresholds.goodMax) {
    return "good";
  }

  if (rate <= thresholds.moderateMax) {
    return "moderate";
  }

  return "low";
}

/**
 * Calcula o rendimento que sobra depois de pagar a renda.
 * Não representa poupança.
 */
export function calculateRemainingAfterRent(
  monthlyRent: number | null | undefined,
  householdNetIncome: number | null | undefined
): number | null {
  if (
    monthlyRent == null ||
    householdNetIncome == null ||
    !Number.isFinite(monthlyRent) ||
    !Number.isFinite(householdNetIncome) ||
    monthlyRent < 0 ||
    householdNetIncome <= 0
  ) {
    return null;
  }

  return householdNetIncome - monthlyRent;
}
