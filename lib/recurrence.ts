import type { Recurrence } from "./types";

const DAY_MS = 86_400_000;
export function parseDate(date: string) { return new Date(`${date}T00:00:00.000Z`); }
export function formatDate(date: Date) { return date.toISOString().slice(0, 10); }

/** Calendar-safe recurrence: month/year additions clamp to the last valid day. */
export function addRecurrence(dateString: string, recurrence: Recurrence): string {
  const date = parseDate(dateString);
  if (recurrence.unit === "day") return formatDate(new Date(date.getTime() + recurrence.interval * DAY_MS));
  if (recurrence.unit === "week") return formatDate(new Date(date.getTime() + recurrence.interval * 7 * DAY_MS));
  const year = date.getUTCFullYear(); const month = date.getUTCMonth(); const day = date.getUTCDate();
  const targetMonth = recurrence.unit === "year" ? month : month + recurrence.interval;
  const targetYear = recurrence.unit === "year" ? year + recurrence.interval : year + Math.floor(targetMonth / 12);
  const normalMonth = recurrence.unit === "year" ? month : ((targetMonth % 12) + 12) % 12;
  const lastDay = new Date(Date.UTC(targetYear, normalMonth + 1, 0)).getUTCDate();
  return formatDate(new Date(Date.UTC(targetYear, normalMonth, Math.min(day, lastDay))));
}

export function occurrencesBetween(nextDate: string, recurrence: Recurrence, fromDate: string, toDate: string, endDate?: string | null) {
  const dates: string[] = []; let cursor = nextDate; let guard = 0;
  while (cursor < fromDate && guard++ < 1000) cursor = addRecurrence(cursor, recurrence);
  while (cursor <= toDate && (!endDate || cursor <= endDate) && guard++ < 1000) { dates.push(cursor); cursor = addRecurrence(cursor, recurrence); }
  return dates;
}

export function annualOccurrences(recurrence: Recurrence) {
  const days = recurrence.unit === "day" ? recurrence.interval : recurrence.unit === "week" ? recurrence.interval * 7 : recurrence.unit === "month" ? recurrence.interval * 365.2425 / 12 : recurrence.interval * 365.2425;
  return 365.2425 / days;
}
export function annualizedMinor(amountMinor: number, recurrence: Recurrence) { return Math.round(amountMinor * annualOccurrences(recurrence)); }
export function monthlyEquivalentMinor(amountMinor: number, recurrence: Recurrence) { return Math.round(annualizedMinor(amountMinor, recurrence) / 12); }
export function recurrenceLabel(recurrence: Recurrence) {
  if (recurrence.unit === "week" && recurrence.interval === 1) return "Weekly";
  if (recurrence.unit === "month" && recurrence.interval === 1) return "Monthly";
  if (recurrence.unit === "month" && recurrence.interval === 3) return "Quarterly";
  if (recurrence.unit === "year" && recurrence.interval === 1) return "Yearly";
  return `Every ${recurrence.interval} ${recurrence.unit}${recurrence.interval === 1 ? "" : "s"}`;
}
