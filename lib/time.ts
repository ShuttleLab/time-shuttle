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

export function convertTimezone(date: Date, fromTz: string, toTz: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: toTz,
    }).format(date);
  } catch {
    return date.toISOString();
  }
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

export function batchConvertTimestamps(input: string): { input: string; output: string }[] {
  const lines = input.split("\n").filter((l) => l.trim());
  return lines.map((line) => {
    const trimmed = line.trim();
    const date = parseTimestamp(trimmed);
    if (!date) {
      return { input: trimmed, output: "Invalid timestamp" };
    }
    return { input: trimmed, output: date.toISOString() };
  });
}
