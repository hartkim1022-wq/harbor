export type CurrencyCode = "GBP" | "CNY" | "USD" | "EUR" | (string & {});

/** Monetary values are stored in minor units to avoid floating-point drift. */
export interface Money {
  amountMinor: number;
  currency: CurrencyCode;
}

export type AccountType = "current" | "savings" | "investment" | "credit";

export interface Account {
  id: string;
  name: string;
  institution: string;
  type: AccountType;
  balance: Money;
  liquidity: "liquid" | "invested" | "liability";
}

export interface Commitment {
  id: string;
  name: string;
  category: string;
  amount: Money;
  dueDate: string;
  cadence: "once" | "monthly" | "quarterly" | "yearly";
  status: "scheduled" | "expected" | "paid";
}

export interface ForecastPoint {
  date: string;
  balance: Money;
  label?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  annualImpact: Money;
  confidence: "high" | "medium" | "low";
  category: "subscription" | "cash" | "fees" | "rate";
}
