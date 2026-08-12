# Harbor agent guide

## Product philosophy

Harbor is a personal financial operating system, not a colourful expense tracker. Every screen should help the user understand their position, near-term obligations, future cash flow, or a concrete optimization decision. Prefer calm clarity over urgency, gamification, streaks, and moral language about spending.

The visual character is restrained, premium, and information-dense without feeling crowded: warm neutrals, deep green, crisp typography, subtle borders, and limited semantic colour. Copy should be concise, specific, and written in plain British English. GBP is the default reporting currency.

## Architecture

- Keep route composition in `app/`, reusable product views in `components/`, primitives in `components/ui/`, domain contracts in `lib/types.ts`, and mock/fixture data in `data/`.
- Components consume typed domain values. They must not parse or calculate from formatted money strings.
- Store money as integer minor units with an ISO-style currency code. Never use a bare number for a monetary value.
- Cross-currency aggregation requires an explicit dated rate snapshot. Preserve native amounts and the reporting-currency result.
- Treat commitments, subscriptions, and transactions as related but distinct concepts. A subscription may generate commitments; a settled commitment may link to a transaction.
- Keep mock repositories replaceable by future server-side data access. Do not introduce banking integrations, authentication, or persistence until requested.

## Coding conventions

- TypeScript strict mode is required. Prefer explicit domain types and small pure formatting/selector functions.
- Use server components by default; add client components only for real interaction.
- Use Tailwind utilities and CSS variables for shared design tokens. Extend the shadcn/ui-style primitives in `components/ui/` rather than duplicating controls.
- Preserve keyboard focus, semantic HTML, accessible names, reduced-motion behaviour, responsive layouts, and useful empty/loading/error states.
- Keep files focused. Avoid premature abstractions, opaque generic helpers, and dependencies that duplicate a small existing utility.
- Use `Intl.NumberFormat` for currency and locale display. Dates must be timezone-aware once they leave fixtures.

## Change rules

- Do not change financial definitions silently. Document metric formula changes in `ARCHITECTURE.md` and cover them with tests.
- Do not add colourful category palettes, celebratory animations, or alarming red indicators for ordinary spending variance.
- Never expose credentials or log sensitive financial payloads.
- Before handoff, run lint, `tsc --noEmit`, and the production build. Fix errors rather than suppressing rules without a documented reason.
- Keep product copy and mock figures internally consistent across cards, charts, and lists.
