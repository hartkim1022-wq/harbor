# Harbor architecture

## Product shape

Harbor is a forward-looking personal financial operating system. Phase 4 adds Beacon, a deterministic financial intelligence pipeline operating over the Phase 1–3 position, transaction, recurrence, and forecast engines. It deliberately avoids budget gamification, conversational AI, and bank integrations.

## Project structure

- `app/`: route composition and typed HTTP endpoints.
- `components/finance-workspace.tsx`: client workspace orchestration and navigation.
- `components/accounts/`, `components/transactions/`, `components/dashboard/`: domain views.
- `components/ui/`: small shadcn/ui-style primitives owned by Harbor.
- `lib/types.ts`: shared domain contracts; `lib/recurrence.ts`: calendar recurrence; `lib/forecast.ts`: deterministic future event projection; `lib/finance.ts`: position selectors; `lib/repository.ts`: data access.
- `lib/beacon/`: UI-independent intelligence pipeline, registered analyzers, scoring, historical analytics, recommendations, and timeline generation.
- `data/`: initial fixture used to seed a new personal workspace and as a local development fallback.
- `db/`: persistence schema; `drizzle/`: checked-in migrations.

## Persistence and repository boundary

Phase 2 uses a private Cloudflare D1 database. The initial workspace is stored as a single versionable aggregate because Harbor currently has one user, no authentication, and a small local dataset. The UI only talks to `HarborRepository`; it does not import D1, Drizzle, or route-handler details. A later PostgreSQL/Supabase implementation can satisfy the same interface while normalized tables are introduced.

API failures never pretend a write succeeded. The read endpoint may use the fixture as a development fallback when a local database binding is unavailable; writes require persistence.

## Data model

Money uses integer minor units plus a currency code. Accounts contain a native currency and balance; credit cards may include a credit limit. Transactions support income, expense, and internal transfer, with optional fixed/flexible and essential classifications for expenses. Transfers hold both source and destination Harbor account IDs.

Subscriptions and commitments remain separate domain records but share the same `{ interval, unit }` recurrence contract. The recurrence engine performs calendar-safe month/year additions, clamping invalid dates to the last day of the target month. Paused and cancelled records remain historical but emit no forecast events. Commitments distinguish expense, income, internal transfer, and debt repayment; repayments may reference the liability they reduce.

Cross-currency totals use an explicit dated `ExchangeRateSnapshot` and preserve native record values. GBP is the current reporting currency; GBP, CNY, USD, and EUR are presented initially while codes remain extensible.

## Forecast definitions

Forecasts start from positive liquid account balances and produce event-based series for 30, 60, or 90 days. They apply active recurring records and future-dated manual transactions. Internal transfers between liquid Harbor accounts have zero net-cash impact. Debt repayments reduce liquid cash and record an equal positive liability impact when a liability account is referenced. No probabilistic assumptions or inferred income are added.

Recurring monthly and annualised costs use a 365.2425-day calendar-year equivalent. Cancelled/paused records and recurring income/transfers are excluded from recurring burn. Lowest balance includes the starting position and every event date.

FX is intentionally static in Phase 3. Every conversion uses the dated rate snapshot stored with the workspace; missing rates throw rather than silently adding unlike currencies. Live rates remain out of scope.

## Financial definitions

- Assets = positive non-credit account balances in reporting currency.
- Liabilities = absolute value of negative balances and credit-card balances.
- Net worth = assets − liabilities.
- Liquid cash = positive current, savings, cash, and e-wallet balances.
- Monthly income/spending = income/expense transactions in the selected calendar month. Internal transfers are excluded from both.
- Fixed/flexible spending = monthly expense transactions with the corresponding nature.
- Committed cash = unpaid commitments plus active subscription payments due within the next 30 days.
- Free cash = liquid cash − committed cash.
- Essential monthly burn = essential current-month expense transactions plus monthly equivalents of essential recurring commitments and subscriptions.
- Financial runway = liquid cash ÷ essential monthly burn. It is undefined, not infinite, when burn is zero.

All definitions live in `lib/finance.ts` and require tests when changed.

## Beacon architecture

`BeaconPipeline` creates one immutable analysis context, executes registered `BeaconAnalyzer` plugins, merges their structured findings/risks/recommendations, calculates the health score, and builds the timeline. New analyzers register through the pipeline without editing existing analyzers. Components consume `BeaconReport`; analyzers never render UI.

The Financial Health Score is a bounded weighted mean: liquidity 15%, runway 20%, cash-flow stability 15%, debt load 15%, subscription efficiency 10%, spending stability 10%, and commitment risk 15%. Each dimension exposes its own formula description and confidence. Weights favour solvency and forward resilience over discretionary optimisation.

Recommendations must name potential annual and monthly value, lifestyle impact, confidence, calculations, records analyzed, and reasoning. Essential recurring records are excluded from reduction recommendations. Savings are maximum modeled potential, never a guarantee.

Historical analytics use recorded transactions over 30/90/180/365-day windows. Commitment and subscription trends use recorded start/end dates. Runway and net-worth movements are explicitly labeled transaction-backcast estimates until Harbor stores periodic snapshots; Beacon never presents them as observed balances.
