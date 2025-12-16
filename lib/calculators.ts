/**
 * Pure calculation functions for educational tools.
 * These are conceptual illustrations, not tax advice.
 */

export type ExpenseCategory = {
  label: string;
  amount: number;
};

export type NetIncomeInput = {
  grossIncome: number;
  expenses: ExpenseCategory[];
};

export type NetIncomeResult = {
  grossIncome: number;
  totalExpenses: number;
  netIncome: number;
  expenses: ExpenseCategory[];
};

/**
 * Calculate net business income (pre-tax).
 * Educational illustration only.
 */
export function calculateNetIncome(input: NetIncomeInput): NetIncomeResult {
  const totalExpenses = input.expenses.reduce((sum, e) => sum + e.amount, 0);
  const netIncome = input.grossIncome - totalExpenses;

  return {
    grossIncome: input.grossIncome,
    totalExpenses,
    netIncome: Math.max(0, netIncome),
    expenses: input.expenses,
  };
}

export type QuarterlyEstimateInput = {
  annualNetIncome: number;
};

export type QuarterlyEstimateResult = {
  annualNetIncome: number;
  selfEmploymentTax: number;
  estimatedIncomeTax: number;
  totalAnnualTax: number;
  quarterlyPayment: number;
  effectiveRate: number;
};

/**
 * Calculate rough quarterly estimated tax payments.
 * Uses simplified brackets for educational illustration.
 * NOT tax advice — actual obligations vary by situation.
 */
export function calculateQuarterlyEstimate(
  input: QuarterlyEstimateInput
): QuarterlyEstimateResult {
  const { annualNetIncome } = input;

  // Self-employment tax: 15.3% on 92.35% of net income (simplified)
  const seBase = annualNetIncome * 0.9235;
  const selfEmploymentTax = seBase * 0.153;

  // Simplified federal income tax estimate (2024 single brackets, rough)
  // This is purely educational — real tax depends on many factors
  const taxableIncome = annualNetIncome - selfEmploymentTax * 0.5; // SE deduction
  let estimatedIncomeTax = 0;

  if (taxableIncome <= 11600) {
    estimatedIncomeTax = taxableIncome * 0.1;
  } else if (taxableIncome <= 47150) {
    estimatedIncomeTax = 1160 + (taxableIncome - 11600) * 0.12;
  } else if (taxableIncome <= 100525) {
    estimatedIncomeTax = 5426 + (taxableIncome - 47150) * 0.22;
  } else if (taxableIncome <= 191950) {
    estimatedIncomeTax = 17168.5 + (taxableIncome - 100525) * 0.24;
  } else {
    estimatedIncomeTax = 39110.5 + (taxableIncome - 191950) * 0.32;
  }

  const totalAnnualTax = selfEmploymentTax + estimatedIncomeTax;
  const quarterlyPayment = totalAnnualTax / 4;
  const effectiveRate =
    annualNetIncome > 0 ? (totalAnnualTax / annualNetIncome) * 100 : 0;

  return {
    annualNetIncome,
    selfEmploymentTax: Math.round(selfEmploymentTax),
    estimatedIncomeTax: Math.round(estimatedIncomeTax),
    totalAnnualTax: Math.round(totalAnnualTax),
    quarterlyPayment: Math.round(quarterlyPayment),
    effectiveRate: Math.round(effectiveRate * 10) / 10,
  };
}

/**
 * Default expense categories by role.
 * Used to pre-populate calculator inputs.
 */
export function getDefaultExpenses(role?: string): ExpenseCategory[] {
  const common: ExpenseCategory[] = [
    { label: "Booth rent / shop fees", amount: 0 },
    { label: "Supplies & products", amount: 0 },
    { label: "Tools & equipment", amount: 0 },
    { label: "Continuing education", amount: 0 },
    { label: "Software & apps", amount: 0 },
    { label: "Marketing", amount: 0 },
    { label: "Insurance", amount: 0 },
    { label: "Other", amount: 0 },
  ];

  if (role === "barber") {
    return [
      { label: "Booth rent / chair rental", amount: 0 },
      { label: "Clippers & blades", amount: 0 },
      { label: "Styling products", amount: 0 },
      { label: "Capes & towels", amount: 0 },
      { label: "Barber license renewal", amount: 0 },
      { label: "Continuing education", amount: 0 },
      { label: "Software & booking apps", amount: 0 },
      { label: "Marketing", amount: 0 },
      { label: "Insurance", amount: 0 },
      { label: "Other", amount: 0 },
    ];
  }

  if (role === "cosmetologist") {
    return [
      { label: "Booth rent / station rental", amount: 0 },
      { label: "Hair color & chemicals", amount: 0 },
      { label: "Styling tools", amount: 0 },
      { label: "Skincare products", amount: 0 },
      { label: "Cosmetology license renewal", amount: 0 },
      { label: "Continuing education", amount: 0 },
      { label: "Software & booking apps", amount: 0 },
      { label: "Marketing", amount: 0 },
      { label: "Insurance", amount: 0 },
      { label: "Other", amount: 0 },
    ];
  }

  return common;
}

/**
 * Format currency for display.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
