# Time Shuttle

A free, privacy-first online Unix timestamp and date converter. Convert timestamps, compare timezones, calculate relative time, and batch-process multiple timestamps — fast, in your browser. Everything runs in the browser; no data is sent to any server.

**🔗 Try it live: [Free Unix timestamp & timezone converter](https://time.shuttlelab.org)** — convert timestamps and timezones instantly in your browser.

## Features

- **Unix ↔ Date Conversion** — Paste a Unix timestamp (seconds or milliseconds) to get a human-readable date, or enter a date to get the Unix timestamp. Auto-detects 10-digit (seconds) vs 13-digit (milliseconds) input.
- **Current Timestamp Display** — Live-updating Unix timestamp (seconds + milliseconds) that refreshes every second, with one-click copy.
- **Multi-Format Output** — View the same moment as Unix (s), Unix (ms), ISO 8601, RFC 2822, UTC string, localized date, and relative time ("3 hours ago" / "3天前").
- **Timezone Converter** — Convert dates between any timezones using the full IANA timezone database via `Intl.supportedValuesOf('timeZone')`. Handles daylight saving time automatically.
- **Relative Time Calculation** — Uses `Intl.RelativeTimeFormat` with locale support (English and Chinese).
- **Batch Conversion** — Paste multiple Unix timestamps (one per line) and convert them all at once.
- **100% Private** — All conversions happen in your browser using native `Date` and `Intl` APIs. No data is ever uploaded.
- **Free Forever** — No limits, no ads, no signup, no hidden fees.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Produces a static export in `out/` ready for Cloudflare Workers static assets.

## License

Licensed under the GNU Affero General Public License v3.0 — see [LICENSE](./LICENSE).

Free to use, modify, and self-host. If you run a modified version as a network
service, you must open-source your modifications (AGPL §13). For commercial
licensing without copyleft obligations, contact support@shuttlelab.org.
