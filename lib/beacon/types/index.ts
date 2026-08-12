import type { HarborData } from "../../types";
export type Confidence="high"|"medium"|"low"; export type Severity="info"|"watch"|"high"|"critical";
export type BeaconCategory="liquidity"|"runway"|"cash_flow"|"debt"|"subscriptions"|"spending"|"commitments"|"income"|"savings";
export interface RelatedEntity{type:"account"|"transaction"|"subscription"|"commitment"|"forecast";id:string;label:string}
export interface Finding{id:string;severity:Severity;category:BeaconCategory;confidence:Confidence;title:string;description:string;relatedEntities:RelatedEntity[];evidence:string[]}
export interface Risk extends Finding{recommendedAction:string}
export type LifestyleImpact="none"|"low"|"moderate"|"high";
export interface Recommendation{id:string;category:"Subscriptions"|"Recurring Commitments"|"Debt"|"Cash Allocation"|"Spending"|"Savings"|"Income";title:string;potentialAnnualSavingsMinor:number;estimatedMonthlySavingsMinor:number;lifestyleImpact:LifestyleImpact;confidence:Confidence;reasoning:string;calculations:string[];dataAnalyzed:string[];relatedEntities:RelatedEntity[]}
export interface ScoreDimension{id:BeaconCategory;score:number;weight:number;title:string;description:string;confidence:Confidence}
export interface HealthScore{score:number;dimensions:ScoreDimension[];methodology:string}
export interface TimelineEvent{id:string;date:string;kind:"payment"|"income"|"transfer"|"forecast_low"|"forecast_recovery"|"recommendation";title:string;description:string;severity:Severity;amountMinor?:number}
export type AnalyticsWindow=30|90|180|365;
export interface HistoricalAnalytics{windowDays:AnalyticsWindow;averageMonthlySpendingMinor:number;incomeTrendPercent:number;commitmentTrendPercent:number;subscriptionTrendPercent:number;runwayTrendMonths:number;netWorthTrendMinor:number;cashFlowVolatilityMinor:number;monthsObserved:number}
export interface BeaconContext{data:HarborData;asOfDate:string;analytics:Record<AnalyticsWindow,HistoricalAnalytics>}
export interface AnalyzerResult{findings?:Finding[];risks?:Risk[];recommendations?:Recommendation[]}
export interface BeaconAnalyzer{id:string;analyze(context:BeaconContext):AnalyzerResult}
export interface BeaconReport{generatedAt:string;health:HealthScore;findings:Finding[];risks:Risk[];recommendations:Recommendation[];timeline:TimelineEvent[];analytics:Record<AnalyticsWindow,HistoricalAnalytics>;analyzersRun:string[]}
