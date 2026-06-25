export type TimeFormat = {
  unixSeconds: string;
  unixMilliseconds: string;
  iso8601: string;
  rfc2822: string;
  utcString: string;
  localized: string;
  relativeTime: string;
};

export function detectTimestampUnit(input: string): "seconds" | "milliseconds" | null {
  const trimmed = input.trim();
  if (!/^\d+$/.test(trimmed)) return null;
  const num = Number(trimmed);
  if (num <= 0) return null;
  if (trimmed.length <= 10) return "seconds";
  if (trimmed.length <= 13) return "milliseconds";
  return null;
}

export function parseTimestamp(input: string): Date | null {
  const trimmed = input.trim();
  if (!/^\d+$/.test(trimmed)) return null;
  const num = Number(trimmed);
  if (num <= 0) return null;

  if (trimmed.length <= 10) {
    return new Date(num * 1000);
  }
  if (trimmed.length <= 13) {
    return new Date(num);
  }
  return null;
}

export function parseDateInput(input: string): Date | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const d = new Date(trimmed);
  if (!isNaN(d.getTime())) return d;

  return null;
}

export function dateToUnixSeconds(date: Date): string {
  return Math.floor(date.getTime() / 1000).toString();
}

export function dateToUnixMilliseconds(date: Date): string {
  return date.getTime().toString();
}

export function formatAllFormats(date: Date, locale: string = "en"): TimeFormat {
  const unixS = Math.floor(date.getTime() / 1000);
  const unixMs = date.getTime();

  return {
    unixSeconds: unixS.toString(),
    unixMilliseconds: unixMs.toString(),
    iso8601: date.toISOString(),
    rfc2822: date.toUTCString(),
    utcString: date.toUTCString(),
    localized: formatDateLocalized(date, locale),
    relativeTime: formatRelativeTime(date, locale),
  };
}

export function formatDateLocalized(date: Date, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: locale !== "zh",
      timeZoneName: "short",
    }).format(date);
  } catch {
    return date.toLocaleString();
  }
}

export function formatRelativeTime(date: Date, locale: string): string {
  try {
    const rtf = new Intl.RelativeTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
      numeric: "auto",
    });

    const now = Date.now();
    const diffMs = date.getTime() - now;
    const diffSeconds = Math.round(diffMs / 1000);
    const diffMinutes = Math.round(diffSeconds / 60);
    const diffHours = Math.round(diffMinutes / 60);
    const diffDays = Math.round(diffHours / 24);
    const diffWeeks = Math.round(diffDays / 7);
    const diffMonths = Math.round(diffDays / 30);
    const diffYears = Math.round(diffDays / 365);

    if (Math.abs(diffSeconds) < 60) return rtf.format(diffSeconds, "second");
    if (Math.abs(diffMinutes) < 60) return rtf.format(diffMinutes, "minute");
    if (Math.abs(diffHours) < 24) return rtf.format(diffHours, "hour");
    if (Math.abs(diffDays) < 7) return rtf.format(diffDays, "day");
    if (Math.abs(diffWeeks) < 4) return rtf.format(diffWeeks, "week");
    if (Math.abs(diffMonths) < 12) return rtf.format(diffMonths, "month");
    return rtf.format(diffYears, "year");
  } catch {
    return "";
  }
}

export function getTimezoneList(): string[] {
  try {
    return Intl.supportedValuesOf("timeZone");
  } catch {
    return ["UTC", "America/New_York", "America/Los_Angeles", "Europe/London", "Europe/Paris", "Asia/Tokyo", "Asia/Shanghai", "Asia/Kolkata", "Australia/Sydney"];
  }
}

/**
 * Offset (in ms) of an IANA timezone at a given absolute instant.
 * offset = (wall-clock as-if-UTC) - (true UTC instant). E.g. America/New_York in winter ≈ -5h.
 */
function tzOffsetMs(tz: string, date: Date): number {
  try {
    const dtf = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const parts = dtf.formatToParts(date);
    const m: Record<string, number> = {};
    for (const p of parts) if (p.type !== "literal") m[p.type] = Number(p.value);
    let hour = m.hour;
    if (hour === 24) hour = 0; // some engines emit 24 for midnight
    const asUTC = Date.UTC(m.year, m.month - 1, m.day, hour, m.minute, m.second);
    return asUTC - date.getTime();
  } catch {
    return 0;
  }
}

/**
 * Interpret a wall-clock date string as being in `tz`, returning the absolute instant.
 * e.g. wallClockToInstant("2024-01-15 12:00", "America/New_York") → 2024-01-15T17:00:00Z.
 * If the string already carries an explicit offset (Z or ±hh:mm) it is treated as absolute.
 */
export function wallClockToInstant(input: string, tz: string): Date | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const local = new Date(trimmed);
  if (isNaN(local.getTime())) return null;

  // Explicit offset/Z present → already an absolute instant, no reinterpretation.
  if (/(z|[+-]\d{2}:?\d{2})$/i.test(trimmed)) return local;

  // Recover the wall-clock components the user typed (local getters preserve them when
  // the string has no offset), then reinterpret those components as being in `tz`.
  const utcGuess = Date.UTC(
    local.getFullYear(),
    local.getMonth(),
    local.getDate(),
    local.getHours(),
    local.getMinutes(),
    local.getSeconds()
  );
  const offset = tzOffsetMs(tz, new Date(utcGuess));
  return new Date(utcGuess - offset);
}

export function formatInTimezone(date: Date, timezone: string, locale: string = "en"): string {
  try {
    return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: locale !== "zh",
      timeZone: timezone,
      timeZoneName: "short",
    }).format(date);
  } catch {
    return date.toISOString();
  }
}

/**
 * Time units ordered largest → smallest, each expressed as a multiple of one second.
 * year/month are calendar approximations (Julian year = 365.25 days, month = year/12);
 * everything from week down is an exact SI/decimal relationship.
 */
export const TIME_UNITS = [
  { id: "year", seconds: 31557600 }, // 365.25 days
  { id: "month", seconds: 2629800 }, // year / 12
  { id: "week", seconds: 604800 },
  { id: "day", seconds: 86400 },
  { id: "hour", seconds: 3600 },
  { id: "minute", seconds: 60 },
  { id: "second", seconds: 1 },
  { id: "millisecond", seconds: 1e-3 },
  { id: "microsecond", seconds: 1e-6 },
  { id: "nanosecond", seconds: 1e-9 },
  { id: "picosecond", seconds: 1e-12 },
  { id: "femtosecond", seconds: 1e-15 },
  { id: "attosecond", seconds: 1e-18 },
  { id: "zeptosecond", seconds: 1e-21 },
  { id: "yoctosecond", seconds: 1e-24 },
] as const;

export type TimeUnitId = (typeof TIME_UNITS)[number]["id"];

/** Convert `value` (given in `fromId` units) into every unit in TIME_UNITS. */
export function convertTimeUnit(value: number, fromId: TimeUnitId): { id: TimeUnitId; value: number }[] {
  const from = TIME_UNITS.find((u) => u.id === fromId);
  if (!from) return [];
  const seconds = value * from.seconds;
  return TIME_UNITS.map((u) => ({ id: u.id, value: seconds / u.seconds }));
}

/**
 * Format a numeric unit value for display. Falls back to trimmed scientific notation
 * for magnitudes that a plain decimal can't show cleanly (very large or very small),
 * otherwise a grouped decimal with up to 6 fraction digits.
 */
export function formatUnitValue(value: number): string {
  if (!Number.isFinite(value)) return "—";
  if (value === 0) return "0";
  const abs = Math.abs(value);
  if (abs >= 1e15 || abs < 1e-4) {
    const [mantissa, exp] = value.toExponential(6).split("e");
    return `${mantissa.replace(/\.?0+$/, "")}e${exp}`;
  }
  return value.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

export function batchConvertTimestamps(input: string): { input: string; output: string; valid: boolean }[] {
  const lines = input.split("\n").filter((l) => l.trim());
  return lines.map((line) => {
    const trimmed = line.trim();
    const date = parseTimestamp(trimmed);
    if (!date) {
      return { input: trimmed, output: "", valid: false };
    }
    return { input: trimmed, output: date.toISOString(), valid: true };
  });
}
