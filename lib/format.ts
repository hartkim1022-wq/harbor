import type { Money } from "./types";

export function formatMoney(money: Money, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: money.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options,
  }).format(money.amountMinor / 100);
}
