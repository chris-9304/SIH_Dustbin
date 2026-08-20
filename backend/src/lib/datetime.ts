/**
 * Local-calendar-day helpers. Bucketing by `toISOString().slice(0, 10)` bucket by UTC day,
 * which puts the day boundary at 05:30 for IST users instead of midnight — wrong for streaks
 * and daily analytics. These use an explicit IANA zone (env.APP_TIMEZONE) instead.
 */

const formatterCache = new Map<string, Intl.DateTimeFormat>();

function getFormatter(timeZone: string): Intl.DateTimeFormat {
  let formatter = formatterCache.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    formatterCache.set(timeZone, formatter);
  }
  return formatter;
}

/** Calendar-day key (YYYY-MM-DD) for `d` in the given IANA timezone. */
export function localDateKey(d: Date, timeZone: string): string {
  // en-CA formats as YYYY-MM-DD, so this needs no further reassembly.
  return getFormatter(timeZone).format(d);
}

/** Whole calendar days between two local date keys (positive if `b` is after `a`). */
export function daysBetweenLocal(a: Date, b: Date, timeZone: string): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const keyA = localDateKey(a, timeZone);
  const keyB = localDateKey(b, timeZone);
  return Math.round((Date.parse(keyB) - Date.parse(keyA)) / msPerDay);
}
