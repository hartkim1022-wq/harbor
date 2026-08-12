# Harbor architecture

## Product shape

Harbor is a forward-looking personal financial operating system. Phase 2 establishes the first working loop: maintain accounts and transactions, then see position, cash availability, spending, commitments, and runway update from those records. It deliberately avoids budget gamification and bank integrations.

## Project structure

- `app/`: route composition and typed HTTP endpoints.
- `components/finance-workspace.tsx`: client workspace orchestration and navigation.
- `components/accounts/`, `components/transactions/`, `components/dashboard/`: domain views.
- `components/ui/`: small shadcn/ui-style primitives owned by Harbor.
- `lib/types.ts`: shared domain contracts; `lib/finance.ts`: pure financial selectors; `lib/repository.ts`: data-access contract and HTTP implementation.
- `data/`: initial fixture used to seed a new personal workspace and as a local development fallback.
- `db/`: persistence schema; `drizzle/`: checked-in migrations.

## Persistence and repository boundary

Phase 2 uses a private Cloudflare D1 database. The initial workspace is stored as a single versionable aggregate because Harbor currently has one user, no authentication, and a small local dataset. The UI only talks to `HarborRepository`; it does not import D1, Drizzle, or route-handler details. A later PostgreSQL/Supabase implementation can satisfy the same interface while normalized tables are introduced.

API failures never pretend a write succeeded. The read endpoint may use the fixture as a development fallback when a local database binding is unavailable; writes require persistence.

## Data model

Money uses integer minor units plus a currency code. Accounts contain a native currency and balance; credit cards may include a credit limit. Transactions support income, expense, and internal transfer, with optional fixed/flexible and essential classifications for expenses. Transfers hold both source and destination Harbor account IDs.

Cross-currency totals use an explicit dated `ExchangeRateSnapshot` and preserve native record values. GBP is the current reporting currency; GBP, CNY, USD, and EUR are presented initially while codes remain extensible.

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
