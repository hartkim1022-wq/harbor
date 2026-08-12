export const SUPPORTED_CURRENCIES = ["GBP", "CNY", "USD", "EUR"] as const;
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];
export type CurrencyCode = SupportedCurrency | (string & {});

/** Monetary values are stored in minor units to avoid floating-point drift. */
export interface Money { amountMinor: number; currency: CurrencyCode }

export const ACCOUNT_TYPES = ["current", "savings", "cash", "credit_card", "e_wallet", "investment"] as const;
/** Known values are presented by the UI; string keeps future account types forward-compatible. */
export type AccountType = string;

export interface Account {
  id: string;
  name: string;
  institution: string;
  type: AccountType;
  currency: CurrencyCode;
  balanceMinor: number;
  creditLimitMinor: number | null;
  createdAt: string;
  updatedAt: string;
}

export type AccountInput = Omit<Account, "id" | "createdAt" | "updatedAt">;
export const TRANSACTION_TYPES = ["income", "expense", "transfer"] as const;
export type TransactionType = string;
export type SpendingNature = "fixed" | "flexible";

export interface Transaction {
  id: string;
  date: string;
  accountId: string;
  destinationAccountId: string | null;
  amountMinor: number;
  currency: CurrencyCode;
  merchant: string;
  category: string;
  notes: string | null;
  type: TransactionType;
  spendingNature: SpendingNature | null;
  essential: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TransactionInput = Omit<Transaction, "id" | "createdAt" | "updatedAt">;

export interface Commitment {
  id: string; name: string; category: string; amount: Money; dueDate: string;
  cadence: "once" | "monthly" | "quarterly" | "yearly";
  status: "scheduled" | "expected" | "paid"; essential: boolean;
}

export interface Subscription {
  id: string; name: string; amount: Money; nextPaymentDate: string;
  cadence: "monthly" | "quarterly" | "yearly"; essential: boolean; active: boolean;
}

export interface ForecastPoint { date: string; balance: Money; label?: string }
export interface Opportunity { id: string; title: string; description: string; annualImpact: Money; confidence: "high" | "medium" | "low"; category: "subscription" | "cash" | "fees" | "rate" }

export interface ExchangeRateSnapshot {
  baseCurrency: CurrencyCode;
  capturedAt: string;
  /** Number of base-currency minor units represented by one minor unit. */
  rates: Record<string, number>;
}

export interface HarborData {
  accounts: Account[];
  transactions: Transaction[];
  commitments: Commitment[];
  subscriptions: Subscription[];
  rates: ExchangeRateSnapshot;
}
