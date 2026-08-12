import { calculateAccountMetrics, convertMinor, isLiquid } from "./finance";
import { annualizedMinor, monthlyEquivalentMinor, occurrencesBetween, parseDate } from "./recurrence";
import type { HarborData } from "./types";

export type ForecastEventKind = "income" | "expense" | "subscription" | "commitment" | "transfer" | "debt_repayment";
export interface ForecastEvent { id: string; date: string; name: string; category: string; kind: ForecastEventKind; amountMinor: number; cashImpactMinor: number; liabilityImpactMinor?: number; essential: boolean }
export interface ForecastPoint { date: string; balanceMinor: number; events: ForecastEvent[] }
export interface ForecastResult { baseCurrency: string; horizonDays: number; startingBalanceMinor: number; projectedBalanceMinor: number; lowestBalanceMinor: number; lowestBalanceDate: string; totalUpcomingCommitmentsMinor: number; essentialRecurringMonthlyMinor: number; recurringMonthlyBurnMinor: number; recurringAnnualizedCostMinor: number; events: ForecastEvent[]; series: ForecastPoint[] }

function dateAfter(start: string, days: number) { const d=parseDate(start); d.setUTCDate(d.getUTCDate()+days); return d.toISOString().slice(0,10); }
function recurringEvents(data: HarborData, from: string, to: string): ForecastEvent[] {
  const subscriptions=data.subscriptions.filter(s=>s.status==="active").flatMap(s=>occurrencesBetween(s.nextDate,s.recurrence,from,to,s.endDate).map((date,i)=>({id:`sub:${s.id}:${i}`,date,name:s.name,category:s.category,kind:"subscription" as const,amountMinor:convertMinor(s.amount.amountMinor,s.amount.currency,data.rates),cashImpactMinor:-convertMinor(s.amount.amountMinor,s.amount.currency,data.rates),essential:s.essential})));
  const commitments=data.commitments.filter(c=>c.status==="active").flatMap(c=>occurrencesBetween(c.nextDate,c.recurrence,from,to,c.endDate).map((date,i)=>{const amount=convertMinor(c.amount.amountMinor,c.amount.currency,data.rates);const neutral=c.kind==="transfer"&&data.accounts.some(a=>a.id===c.destinationAccountId&&isLiquid(a));const kind:ForecastEventKind=c.kind==="expense"?"commitment":c.kind as ForecastEventKind;return {id:`com:${c.id}:${i}`,date,name:c.name,category:c.category,kind,amountMinor:amount,cashImpactMinor:c.kind==="income"?amount:neutral?0:-amount,liabilityImpactMinor:c.kind==="debt_repayment"&&c.liabilityAccountId?amount:undefined,essential:c.essential};}));
  return [...subscriptions,...commitments];
}
export function buildForecast(data: HarborData, asOfDate: string, horizonDays: 30|60|90): ForecastResult {
  const end=dateAfter(asOfDate,horizonDays); const starting=calculateAccountMetrics(data.accounts,data.rates).liquidCashMinor;
  const future=data.transactions.filter(t=>t.date>asOfDate&&t.date<=end).map(t=>{const amount=convertMinor(Math.abs(t.amountMinor),t.currency,data.rates);const internal=t.type==="transfer"&&data.accounts.some(a=>a.id===t.destinationAccountId&&isLiquid(a));return {id:`txn:${t.id}`,date:t.date,name:t.merchant,category:t.category,kind:t.type as ForecastEventKind,amountMinor:amount,cashImpactMinor:t.type==="income"?amount:internal?0:-amount,essential:t.essential};});
  const events=[...recurringEvents(data,asOfDate,end),...future].sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id));
  let balance=starting,lowest=starting,lowestDate=asOfDate; const series:ForecastPoint[]=[{date:asOfDate,balanceMinor:starting,events:[]}];
  for(const date of [...new Set(events.map(e=>e.date))]){const dayEvents=events.filter(e=>e.date===date);balance+=dayEvents.reduce((s,e)=>s+e.cashImpactMinor,0);series.push({date,balanceMinor:balance,events:dayEvents});if(balance<lowest){lowest=balance;lowestDate=date;}}
  const recurring=[...data.subscriptions.filter(s=>s.status==="active").map(s=>({amount:s.amount,recurrence:s.recurrence,essential:s.essential})),...data.commitments.filter(c=>c.status==="active"&&c.kind!=="income"&&c.kind!=="transfer").map(c=>({amount:c.amount,recurrence:c.recurrence,essential:c.essential}))];
  const annual=recurring.reduce((s,r)=>s+annualizedMinor(convertMinor(r.amount.amountMinor,r.amount.currency,data.rates),r.recurrence),0); const essential=recurring.filter(r=>r.essential).reduce((s,r)=>s+monthlyEquivalentMinor(convertMinor(r.amount.amountMinor,r.amount.currency,data.rates),r.recurrence),0);
  return {baseCurrency:data.rates.baseCurrency,horizonDays,startingBalanceMinor:starting,projectedBalanceMinor:balance,lowestBalanceMinor:lowest,lowestBalanceDate:lowestDate,totalUpcomingCommitmentsMinor:events.filter(e=>e.cashImpactMinor<0&&e.kind!=="transfer").reduce((s,e)=>s+Math.abs(e.cashImpactMinor),0),essentialRecurringMonthlyMinor:essential,recurringMonthlyBurnMinor:Math.round(annual/12),recurringAnnualizedCostMinor:annual,events,series};
}
