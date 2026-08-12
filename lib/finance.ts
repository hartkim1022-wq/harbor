import type { Account, Commitment, CurrencyCode, ExchangeRateSnapshot, HarborData, Subscription, Transaction } from "./types";

export interface FinanceMetrics {
  reportingCurrency: CurrencyCode;
  netWorthMinor: number;
  assetsMinor: number;
  liquidCashMinor: number;
  liabilitiesMinor: number;
  monthlyIncomeMinor: number;
  monthlySpendingMinor: number;
  fixedSpendingMinor: number;
  flexibleSpendingMinor: number;
  committedCashMinor: number;
  freeCashMinor: number;
  essentialMonthlyBurnMinor: number;
  financialRunwayMonths: number | null;
}

export function convertMinor(amountMinor: number, currency: CurrencyCode, rates: ExchangeRateSnapshot) {
  if (currency === rates.baseCurrency) return amountMinor;
  const rate = rates.rates[currency];
  if (!rate) throw new Error(`Missing ${currency}/${rates.baseCurrency} exchange rate`);
  return Math.round(amountMinor * rate);
}

export function isLiability(account: Account) { return account.type === "credit_card" || account.balanceMinor < 0; }
export function isLiquid(account: Account) { return ["current", "savings", "cash", "e_wallet"].includes(account.type); }

function inMonth(date: string, month: string) { return date.slice(0, 7) === month; }
function expenseAmount(transaction: Transaction, rates: ExchangeRateSnapshot) {
  return transaction.type === "expense" ? Math.abs(convertMinor(transaction.amountMinor, transaction.currency, rates)) : 0;
}

export function calculateAccountMetrics(accounts: Account[], rates: ExchangeRateSnapshot) {
  let assetsMinor = 0; let liabilitiesMinor = 0; let liquidCashMinor = 0;
  for (const account of accounts) {
    const value = convertMinor(account.balanceMinor, account.currency, rates);
    if (value >= 0 && account.type !== "credit_card") assetsMinor += value;
    else liabilitiesMinor += Math.abs(value);
    if (isLiquid(account) && value > 0) liquidCashMinor += value;
  }
  return { assetsMinor, liabilitiesMinor, liquidCashMinor, netWorthMinor: assetsMinor - liabilitiesMinor };
}

export function calculateTransactionMetrics(transactions: Transaction[], rates: ExchangeRateSnapshot, month: string) {
  const relevant = transactions.filter((transaction) => inMonth(transaction.date, month));
  let monthlyIncomeMinor = 0; let monthlySpendingMinor = 0; let fixedSpendingMinor = 0; let flexibleSpendingMinor = 0; let essentialTransactionSpendMinor = 0;
  for (const transaction of relevant) {
    if (transaction.type === "transfer") continue;
    if (transaction.type === "income") monthlyIncomeMinor += Math.abs(convertMinor(transaction.amountMinor, transaction.currency, rates));
    const expense = expenseAmount(transaction, rates);
    monthlySpendingMinor += expense;
    if (transaction.spendingNature === "fixed") fixedSpendingMinor += expense;
    if (transaction.spendingNature === "flexible") flexibleSpendingMinor += expense;
    if (transaction.essential) essentialTransactionSpendMinor += expense;
  }
  return { monthlyIncomeMinor, monthlySpendingMinor, fixedSpendingMinor, flexibleSpendingMinor, essentialTransactionSpendMinor };
}

function monthlyEquivalent(amountMinor: number, cadence: Commitment["cadence"] | Subscription["cadence"]) {
  if (cadence === "yearly") return Math.round(amountMinor / 12);
  if (cadence === "quarterly") return Math.round(amountMinor / 3);
  return amountMinor;
}

export function calculateCommittedCash(commitments: Commitment[], subscriptions: Subscription[], rates: ExchangeRateSnapshot, fromDate: string, horizonDays = 30) {
  const start = new Date(`${fromDate}T00:00:00Z`).getTime();
  const end = start + horizonDays * 86_400_000;
  const due = (date: string) => { const time = new Date(`${date}T00:00:00Z`).getTime(); return time >= start && time <= end; };
  const commitmentTotal = commitments.filter((item) => item.status !== "paid" && due(item.dueDate)).reduce((sum, item) => sum + convertMinor(item.amount.amountMinor, item.amount.currency, rates), 0);
  const subscriptionTotal = subscriptions.filter((item) => item.active && due(item.nextPaymentDate)).reduce((sum, item) => sum + convertMinor(item.amount.amountMinor, item.amount.currency, rates), 0);
  return commitmentTotal + subscriptionTotal;
}

export function calculateFinanceMetrics(data: HarborData, month: string, asOfDate: string): FinanceMetrics {
  const accounts = calculateAccountMetrics(data.accounts, data.rates);
  const transactions = calculateTransactionMetrics(data.transactions, data.rates, month);
  const committedCashMinor = calculateCommittedCash(data.commitments, data.subscriptions, data.rates, asOfDate);
  const essentialCommitments = data.commitments.filter((item) => item.essential && item.status !== "paid").reduce((sum, item) => sum + monthlyEquivalent(convertMinor(item.amount.amountMinor, item.amount.currency, data.rates), item.cadence), 0);
  const essentialSubscriptions = data.subscriptions.filter((item) => item.essential && item.active).reduce((sum, item) => sum + monthlyEquivalent(convertMinor(item.amount.amountMinor, item.amount.currency, data.rates), item.cadence), 0);
  const essentialMonthlyBurnMinor = transactions.essentialTransactionSpendMinor + essentialCommitments + essentialSubscriptions;
  return {
    reportingCurrency: data.rates.baseCurrency, ...accounts, ...transactions, committedCashMinor,
    freeCashMinor: accounts.liquidCashMinor - committedCashMinor,
    essentialMonthlyBurnMinor,
    financialRunwayMonths: essentialMonthlyBurnMinor === 0 ? null : accounts.liquidCashMinor / essentialMonthlyBurnMinor,
  };
}
