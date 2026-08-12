import type { Account, Commitment, ForecastPoint, Opportunity } from "@/lib/types";

export const accounts: Account[] = [
  { id: "acc-1", name: "Everyday", institution: "Monzo", type: "current", balance: { amountMinor: 834260, currency: "GBP" }, liquidity: "liquid" },
  { id: "acc-2", name: "Reserve", institution: "Marcus", type: "savings", balance: { amountMinor: 2047550, currency: "GBP" }, liquidity: "liquid" },
  { id: "acc-3", name: "Stocks & Shares ISA", institution: "Vanguard", type: "investment", balance: { amountMinor: 4691460, currency: "GBP" }, liquidity: "invested" },
];

export const commitments: Commitment[] = [
  { id: "com-1", name: "Mortgage", category: "Home", amount: { amountMinor: 184000, currency: "GBP" }, dueDate: "2026-08-15", cadence: "monthly", status: "scheduled" },
  { id: "com-2", name: "British Gas", category: "Utilities", amount: { amountMinor: 14280, currency: "GBP" }, dueDate: "2026-08-18", cadence: "monthly", status: "expected" },
  { id: "com-3", name: "Car insurance", category: "Insurance", amount: { amountMinor: 68400, currency: "GBP" }, dueDate: "2026-08-22", cadence: "yearly", status: "scheduled" },
  { id: "com-4", name: "Council tax", category: "Home", amount: { amountMinor: 21900, currency: "GBP" }, dueDate: "2026-08-28", cadence: "monthly", status: "scheduled" },
];

export const forecast: ForecastPoint[] = [
  ["12 Aug", 27818], ["16 Aug", 25512], ["20 Aug", 25196], ["24 Aug", 23845], ["28 Aug", 23218], ["01 Sep", 28240], ["05 Sep", 27431], ["11 Sep", 26489],
].map(([date, value]) => ({ date: String(date), balance: { amountMinor: Number(value) * 100, currency: "GBP" } }));

export const opportunities: Opportunity[] = [
  { id: "opp-1", title: "Move idle cash", description: "£8,300 is earning below the current easy-access market rate.", annualImpact: { amountMinor: 28200, currency: "GBP" }, confidence: "high", category: "cash" },
  { id: "opp-2", title: "Review overlapping cover", description: "Two device protection plans appear to cover the same household.", annualImpact: { amountMinor: 16740, currency: "GBP" }, confidence: "medium", category: "subscription" },
  { id: "opp-3", title: "Switch energy tariff", description: "Your fixed term ends in 38 days; comparable plans are lower.", annualImpact: { amountMinor: 21600, currency: "GBP" }, confidence: "medium", category: "rate" },
];
