import type { HarborData, Opportunity } from "@/lib/types";

const now = "2026-08-12T08:00:00.000Z";
export const initialData: HarborData = {
  accounts: [
    { id: "acc-1", name: "Everyday", institution: "Monzo", type: "current", currency: "GBP", balanceMinor: 834260, creditLimitMinor: null, createdAt: now, updatedAt: now },
    { id: "acc-2", name: "Reserve", institution: "Marcus", type: "savings", currency: "GBP", balanceMinor: 2047550, creditLimitMinor: null, createdAt: now, updatedAt: now },
    { id: "acc-3", name: "Stocks & Shares ISA", institution: "Vanguard", type: "investment", currency: "GBP", balanceMinor: 4691460, creditLimitMinor: null, createdAt: now, updatedAt: now },
    { id: "acc-4", name: "Rewards Card", institution: "Barclaycard", type: "credit_card", currency: "GBP", balanceMinor: -390400, creditLimitMinor: 1000000, createdAt: now, updatedAt: now },
  ],
  transactions: [
    { id: "txn-1", date: "2026-08-01", accountId: "acc-1", destinationAccountId: null, amountMinor: 520000, currency: "GBP", merchant: "Acme Studio", category: "Salary", notes: null, type: "income", spendingNature: null, essential: false, createdAt: now, updatedAt: now },
    { id: "txn-2", date: "2026-08-03", accountId: "acc-1", destinationAccountId: null, amountMinor: 184000, currency: "GBP", merchant: "Oakfield Mortgage", category: "Home", notes: null, type: "expense", spendingNature: "fixed", essential: true, createdAt: now, updatedAt: now },
    { id: "txn-3", date: "2026-08-05", accountId: "acc-1", destinationAccountId: null, amountMinor: 12640, currency: "GBP", merchant: "Waitrose", category: "Groceries", notes: null, type: "expense", spendingNature: "flexible", essential: true, createdAt: now, updatedAt: now },
    { id: "txn-4", date: "2026-08-07", accountId: "acc-1", destinationAccountId: "acc-2", amountMinor: 100000, currency: "GBP", merchant: "Reserve transfer", category: "Transfer", notes: "Monthly savings", type: "transfer", spendingNature: null, essential: false, createdAt: now, updatedAt: now },
    { id: "txn-5", date: "2026-08-09", accountId: "acc-4", destinationAccountId: null, amountMinor: 8640, currency: "GBP", merchant: "TfL", category: "Transport", notes: null, type: "expense", spendingNature: "flexible", essential: true, createdAt: now, updatedAt: now },
    { id: "txn-6", date: "2026-08-10", accountId: "acc-4", destinationAccountId: null, amountMinor: 18900, currency: "GBP", merchant: "The Garden Table", category: "Dining", notes: null, type: "expense", spendingNature: "flexible", essential: false, createdAt: now, updatedAt: now },
  ],
  commitments: [
    { id: "com-1", name: "Mortgage", category: "Home", amount: { amountMinor: 184000, currency: "GBP" }, dueDate: "2026-08-15", cadence: "monthly", status: "scheduled", essential: true },
    { id: "com-2", name: "British Gas", category: "Utilities", amount: { amountMinor: 14280, currency: "GBP" }, dueDate: "2026-08-18", cadence: "monthly", status: "expected", essential: true },
    { id: "com-3", name: "Car insurance", category: "Insurance", amount: { amountMinor: 68400, currency: "GBP" }, dueDate: "2026-08-22", cadence: "yearly", status: "scheduled", essential: true },
    { id: "com-4", name: "Council tax", category: "Home", amount: { amountMinor: 21900, currency: "GBP" }, dueDate: "2026-08-28", cadence: "monthly", status: "scheduled", essential: true },
  ],
  subscriptions: [
    { id: "sub-1", name: "Cloud storage", amount: { amountMinor: 899, currency: "GBP" }, nextPaymentDate: "2026-08-20", cadence: "monthly", essential: false, active: true },
  ],
  rates: { baseCurrency: "GBP", capturedAt: now, rates: { GBP: 1, CNY: 0.103, USD: 0.742, EUR: 0.856 } },
};

export const opportunities: Opportunity[] = [
  { id: "opp-1", title: "Move idle cash", description: "£8,300 is earning below the current easy-access market rate.", annualImpact: { amountMinor: 28200, currency: "GBP" }, confidence: "high", category: "cash" },
  { id: "opp-2", title: "Review overlapping cover", description: "Two device protection plans appear to cover the same household.", annualImpact: { amountMinor: 16740, currency: "GBP" }, confidence: "medium", category: "subscription" },
  { id: "opp-3", title: "Switch energy tariff", description: "Your fixed term ends in 38 days; comparable plans are lower.", annualImpact: { amountMinor: 21600, currency: "GBP" }, confidence: "medium", category: "rate" },
];
