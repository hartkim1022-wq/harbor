import assert from "node:assert/strict";
import test from "node:test";
import { calculateFinanceMetrics } from "../lib/finance";
import type { HarborData } from "../lib/types";

const now="2026-08-12T00:00:00Z";
function data(overrides:Partial<HarborData>):HarborData{return { accounts:[],transactions:[],commitments:[],subscriptions:[],rates:{baseCurrency:"GBP",capturedAt:now,rates:{GBP:1,USD:.8}},...overrides};}
const account=(id:string,type:"current"|"credit_card",balanceMinor:number)=>({id,name:id,institution:"Test",type,currency:"GBP" as const,balanceMinor,creditLimitMinor:null,createdAt:now,updatedAt:now});
const transaction=(id:string,type:"income"|"expense"|"transfer",amountMinor:number)=>({id,date:"2026-08-05",accountId:"cash",destinationAccountId:type==="transfer"?"savings":null,amountMinor,currency:"GBP" as const,merchant:"Test",category:"Test",notes:null,type,spendingNature:type==="expense"?"flexible" as const:null,essential:type==="expense",createdAt:now,updatedAt:now});

test("transfers do not count as income or spending",()=>{const result=calculateFinanceMetrics(data({accounts:[account("cash","current",100000),account("savings","current",200000)],transactions:[transaction("transfer","transfer",50000)]}),"2026-08","2026-08-01");assert.equal(result.monthlyIncomeMinor,0);assert.equal(result.monthlySpendingMinor,0);});
test("credit and negative balances are liabilities",()=>{const result=calculateFinanceMetrics(data({accounts:[account("cash","current",400000),account("card","credit_card",-125000),account("overdraft","current",-25000)]}),"2026-08","2026-08-01");assert.equal(result.assetsMinor,400000);assert.equal(result.liabilitiesMinor,150000);assert.equal(result.netWorthMinor,250000);});
test("negative liquid balances do not inflate liquid cash",()=>{const result=calculateFinanceMetrics(data({accounts:[account("cash","current",100000),account("overdraft","current",-40000)]}),"2026-08","2026-08-01");assert.equal(result.liquidCashMinor,100000);});
test("zero essential spending yields an undefined runway",()=>{const result=calculateFinanceMetrics(data({accounts:[account("cash","current",100000)]}),"2026-08","2026-08-01");assert.equal(result.essentialMonthlyBurnMinor,0);assert.equal(result.financialRunwayMonths,null);});
test("expenses split into fixed and flexible spending",()=>{const fixed={...transaction("rent","expense",80000),spendingNature:"fixed" as const};const flexible=transaction("food","expense",20000);const result=calculateFinanceMetrics(data({transactions:[fixed,flexible]}),"2026-08","2026-08-01");assert.equal(result.monthlySpendingMinor,100000);assert.equal(result.fixedSpendingMinor,80000);assert.equal(result.flexibleSpendingMinor,20000);});
