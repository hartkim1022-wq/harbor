# Harbor — initial architecture

## Product shape

Harbor is a forward-looking personal financial operating system. The first release prioritises a single coherent position: assets and liabilities, liquidity after known commitments, projected balances, and actionable opportunities. It deliberately avoids budget-category gamification.

## Project structure

- `app/`: Next.js routes, metadata, and global theme.
- `components/ui/`: small shadcn/ui-style primitives owned by Harbor.
- `components/dashboard/`: dashboard composition and domain-specific views.
- `data/`: replaceable mock repositories. No component should invent domain data.
- `lib/types.ts`: shared domain contracts.
- `lib/format.ts`: locale and currency presentation helpers.

Future sections should become route groups under `app/(app)/`, sharing an authenticated-ready app shell when real routing and identity are introduced.

## Data model

Money is `{ amountMinor, currency }`; calculations never use display strings or floating-point major units. The initial domain is `Account`, `Commitment`, `ForecastPoint`, and `Opportunity`. Transactions and subscriptions should reference accounts and feed commitments/forecasting rather than maintain separate dashboard totals.

Cross-currency totals must only be calculated through a dated exchange-rate snapshot and retain both native and reporting-currency amounts. GBP is the current reporting currency; currency codes are extensible beyond GBP, CNY, USD, and EUR.

## Derived metrics

- Net worth = assets − liabilities.
- Committed cash = scheduled/expected obligations in the selected horizon.
- Free cash = liquid cash − committed cash.
- Runway = liquid cash ÷ average monthly essential outgoings.
- Projected balance = current liquid position + forecast inflows − forecast outflows.

These formulas should move into tested selectors when live data is introduced.
