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

export type RecurrenceUnit = string;
export interface Recurrence { interval: number; unit: RecurrenceUnit }
export const RECURRENCE_PRESETS = ["weekly", "monthly", "quarterly", "yearly", "custom"] as const;
export type RecurringStatus = "active" | "paused" | "cancelled";

export interface Subscription {
  id: string; name: string; amount: Money; recurrence: Recurrence; nextDate: string;
  accountId: string; category: string; status: RecurringStatus; startDate: string | null;
  endDate: string | null; notes: string | null; essential: boolean;
  createdAt: string; updatedAt: string;
}
export type SubscriptionInput = Omit<Subscription, "id" | "createdAt" | "updatedAt">;

export type CommitmentKind = string;
export interface Commitment {
  id: string; name: string; amount: Money; recurrence: Recurrence; nextDate: string;
  accountId: string; destinationAccountId: string | null; liabilityAccountId: string | null;
  category: string; status: RecurringStatus; kind: CommitmentKind; essential: boolean;
  startDate: string | null; endDate: string | null; notes: string | null;
  createdAt: string; updatedAt: string;
}
export type CommitmentInput = Omit<Commitment, "id" | "createdAt" | "updatedAt">;

export interface ForecastPoint { date: string; balance: Money; label?: string }
export interface Opportunity { id: string; title: string; description: string; annualImpact: Money; confidence: "high" | "medium" | "low"; category: "subscription" | "cash" | "fees" | "rate" }

export interface ExchangeRateSnapshot {
  baseCurrency: CurrencyCode;
  capturedAt: string;
  /** Number of base-currency minor units represented by one minor unit. */
  rates: Record<string, number>;
}

export type ThemePreference = "system" | "light" | "dark";
export interface HarborProfile {
  id: string;
  displayName: string;
  fullName: string | null;
  avatarDataUrl: string | null;
  baseCurrency: CurrencyCode;
  timeZone: string;
  language: string;
  theme: ThemePreference;
  createdAt: string;
  updatedAt: string;
}
export type HarborProfileInput = Pick<HarborProfile, "displayName" | "fullName" | "avatarDataUrl" | "baseCurrency" | "timeZone" | "language" | "theme">;

export interface HarborData {
  profile: HarborProfile;
  accounts: Account[];
  transactions: Transaction[];
  commitments: Commitment[];
  subscriptions: Subscription[];
  rates: ExchangeRateSnapshot;
}
