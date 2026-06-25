# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # local dev server (next dev)
npm run build    # next build (static export to out/) + scripts/postbuild.mjs
npm run start    # serve a production build
npm run lint     # eslint (eslint-config-next)
```

There is no test suite. The pure functions in `lib/time.ts` are the only thing worth unit-testing if tests are ever added.

## What this is

Time Shuttle is a free, **100% client-side** Unix timestamp / date / timezone converter. All conversion logic runs in the browser via native `Date` and `Intl` APIs — nothing is sent to a server. The site is statically exported and deployed to **Cloudflare Workers static assets** (`wrangler.toml` points at `out/`).

## Architecture

**Static export + i18n routing.** `next.config.ts` sets `output: "export"` and `trailingSlash: true`, wrapped by the next-intl plugin (`i18n/request.ts`). Locales are `en` (default) and `zh`, with `localePrefix: "as-needed"` (`i18n/routing.ts`) — so English lives at `/` and Chinese at `/zh`. All pages live under `app/[locale]/` and use `generateStaticParams` + `setRequestLocale(locale)`. Use `Link`/`useRouter` from `i18n/navigation.ts` (locale-aware), not `next/link`, for internal app navigation.

**The postbuild step is load-bearing** (`scripts/postbuild.mjs`, runs after every `next build`). It does three things and the site is broken without it:
1. Promotes `out/en/*` up to `out/` (so the default locale serves from root) and deletes `out/en`.
2. Patches `<html lang="en">` → `lang="zh-CN"` in all `out/zh/**/*.html`.
3. Generates `out/sw.js` (the service worker) with a fresh cache version and a precache list collected from the built routes.

**Two root layouts.** `app/layout.tsx` is the real `<html>`/`<body>` shell — fonts (Geist), `ThemeProvider`, `Toaster`, service-worker registration, and global SEO metadata/structured data. `app/[locale]/layout.tsx` wraps children in `NextIntlClientProvider` + `LayoutShell` (header/footer chrome) and emits per-locale metadata with `hreflang` alternates.

**The interactive tool is one client component:** `components/home-content.tsx` (`"use client"`). It holds all converter state and renders three tabs — Formats, Timezone, Batch — calling the pure helpers in `lib/time.ts`. Conversions are reactive: `useEffect` re-runs on input/mode/timezone changes rather than on a submit button (except Batch, which has an explicit button).

**`lib/time.ts` is the conversion core** and has no React/DOM dependencies. Key behaviors to preserve:
- Timestamp unit auto-detection by digit length: ≤10 digits = seconds, ≤13 = milliseconds (`parseTimestamp`, `detectTimestampUnit`).
- `wallClockToInstant(input, tz)` reinterprets a bare wall-clock string as being in a chosen IANA timezone; if the string already carries `Z`/`±hh:mm` it's treated as absolute. It relies on `tzOffsetMs`, which derives an offset by formatting the instant in the target tz via `Intl.DateTimeFormat` — this is how DST is handled correctly. In the Timezone tab, pure-digit input is treated as an absolute timestamp (tz-independent); anything else is wall-clock in the source tz.
- Timezone list comes from `Intl.supportedValuesOf("timeZone")` with a small hardcoded fallback.

**SEO landing pages** under `app/[locale]/tools/*` (e.g. `timestamp-to-date`) are separate static pages, not the tool itself. The English variants embed JSON-LD structured data (BreadcrumbList / HowTo / FAQPage / TechArticle) and full article content; the Chinese variants are thin pages that link back to `/#tool`. They exist for search ranking and funnel users to the real tool.

## UI / theming conventions

- **shadcn/ui** (style `base-nova`, base color `neutral`) in `components/ui/`, built on `@base-ui/react`. Icons are `lucide-react`. Path aliases: `@/components`, `@/lib`, `@/lib/utils` (the `cn` helper), `@/components/ui`.
- Tailwind v4 (CSS-first, configured entirely in `app/globals.css` via `@theme inline` — there is no `tailwind.config`). Colors are oklch CSS variables.
- **Theming has two independent axes**, both managed by `ThemeProvider` in `components/theme-sync.tsx` and persisted to `localStorage`:
  - Mode: `system`/`light`/`dark` → toggles the `.dark` class on `<html>`.
  - Palette: one of 6 named palettes (`default`, `sakura`, `mint`, `ocean`, `sunset`, `graphite`) → sets `data-palette` on `<html>`. Each palette overrides `--primary` etc. in `globals.css`, with separate light and `.dark[data-palette=...]` blocks. To add a palette: add it to the `PALETTES` array **and** add matching CSS blocks.

## Adding strings / locales

All UI text lives in `messages/en.json` and `messages/zh.json`, keyed by namespace (`common`, `home`, `tools`, `about`, `privacyPage`, `termsPage`, `toolPages`). Add a key to **both** files. Access via `useTranslations("namespace")` in client components or `getTranslations({ locale, namespace })` on the server. Adding a locale means updating `routing.locales`, adding a `messages/<locale>.json`, and accounting for the lang-patch in `scripts/postbuild.mjs`.

## Notes

- `app/icon-192.png/route.tsx` and `icon-512.png/route.tsx` generate PWA icons; `app/manifest.ts`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` are the standard Next metadata routes.
- `out/` is committed build output — regenerate it with `npm run build`, don't hand-edit.
- License is AGPL-3.0-only.
