# AGENTS.md

## Project

Next.js 16 static-export site deployed to Cloudflare Workers. Privacy-first Unix timestamp / date converter — all logic runs client-side via native `Date` and `Intl` APIs.

## Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Lint | `npm run lint` |
| Full build (static export + postbuild) | `npm run build` |

There is no dedicated `typecheck`, `test`, or `format` script. TypeScript checking happens inside `next build`.

## Architecture

- **Static export**: `next.config.ts` sets `output: "export"`. All routes are pre-rendered at build time. No server runtime.
- **`trailingSlash: true`** — all routes end with `/`. Links and sitemap URLs must include trailing slashes.
- **i18n via next-intl**: locales are `en` (default, no URL prefix) and `zh` (prefix `/zh`). Routing config in `i18n/routing.ts`. Translation files in `messages/{en,zh}.json`.
- **App router with `[locale]` segment**: every page lives under `app/[locale]/`. The root `app/layout.tsx` is the outer shell; `app/[locale]/layout.tsx` wraps with `NextIntlClientProvider`.
- **`generateStaticParams()`** in `app/[locale]/layout.tsx` produces static pages for both locales.
- **Metadata routes** (`sitemap.ts`, `robots.ts`, `manifest.ts`, `opengraph-image.tsx`) must export `const dynamic = "force-static"` to work with static export.
- **shadcn/ui** (base-nova style, Tailwind v4): components in `components/ui/`. Config in `components.json`. Use `npx shadcn@latest add <component>` to add new ones. Primitives are `@base-ui/react`, not Radix.
- **Core logic** in `lib/time.ts` — pure functions, no server calls.
- **Theme system**: dark/light/system mode + 6 color palettes (default, sakura, mint, ocean, sunset, graphite) managed by `components/theme-sync.tsx`.
- **Tool pages** under `app/[locale]/tools/` are SEO landing pages with `TechArticle`, `HowTo`, `FAQPage`, and `BreadcrumbList` schemas. Chinese tool pages are "localized thin page" stubs (CTA card + link to English guide), not full translations.

## Build pipeline quirk

`npm run build` runs `next build && node scripts/postbuild.mjs`. The postbuild script:

1. Promotes `out/en/*` into `out/` (so English is at the root, not `/en/`).
2. Patches `<html lang="zh-CN">` in all HTML under `out/zh/`.
3. Generates `out/sw.js` — a service worker with precache manifest derived from the built routes.

**Do not edit `out/sw.js` by hand** — it is regenerated every build. If you need to change SW behavior, edit `scripts/postbuild.mjs`.

## Deployment

`wrangler.toml` points Cloudflare Workers static assets at `./out/`. After `npm run build`, deploy with `npx wrangler deploy` (or via CI).

`public/_redirects` handles Cloudflare Pages redirect rules (`/en` → `/`, `/en/*` → `/:splat`).

## Conventions

- Path alias `@/*` maps to the project root (see `tsconfig.json` `paths`).
- **Client components** use i18n navigation helpers from `i18n/navigation.ts` (`Link`, `redirect`, `usePathname`, `useRouter`, `getPathname`).
- **Server components must NOT import `Link` from `@/i18n/navigation`** — it calls `headers()` which breaks static export prerender. Use `import Link from "next/link"` instead. (See playbook `05-static-export-nextintl.md` §3.)
- Server components call `setRequestLocale(locale)` before any `next-intl` server API to avoid the "missing locale" warning.
- Pages export `generateMetadata()` for per-locale SEO (title, description, canonical, hreflang with `x-default`).
- `params` is a `Promise` in Next.js 16 — always `await params` before using.
- Icons: `lucide-react`. Toast: `sonner`. Fonts: `geist` (sans + mono).
- CSS: Tailwind v4 via `@tailwindcss/postcss` plugin. Global styles in `app/globals.css`. Dark mode uses `.dark` class variant (`@custom-variant dark (&:is(.dark *))`).
- `LayoutShell` component (`components/layout-shell.tsx`) renders Header + main + Footer wrapper.
- `not-found.tsx` is at the root `app/` level (outside `[locale]`) — it's the shared 404 page.
- No `.env` files are committed. No secrets or API keys are needed — the app is fully client-side.

## Gotchas

- **No `Github` icon in lucide-react** — the header uses an inline SVG for the GitHub icon. If replacing with a lucide icon, verify the export exists first; many common brand icons are not in lucide.
- **Locale toggle uses `window.location.href`**, not `router.replace()`. This is intentional — static export + next-intl requires a full navigation to load the correct locale's static page.
- **`components.json` has `"hooks": "@/hooks"` alias** but no `hooks/` directory exists yet. shadcn will create it when a component needs it.
- **OG image and icon routes** are dynamic `ImageResponse` routes (`app/opengraph-image.tsx`, `app/icon-192.png/route.tsx`, `app/icon-512.png/route.tsx`) — they render at build time, not served as static files.
- **Translation files** live in `messages/{en,zh}.json`. Both files must have identical key structures. `next-intl` silently returns the key path if a translation is missing.
- **Viewport**: do NOT set `userScalable: false` or `maximumScale` — violates WCAG 2.2 AA.
- **Base UI orientation**: use `data-[orientation=horizontal]:` not `data-horizontal:`. The boolean variant silently fails with Base UI's `data-orientation` attribute.
- **Font wiring**: `--font-sans` in `globals.css` must reference `var(--font-geist-sans)` (not self-reference). `font-sans` must be applied on `body`, not `html`.
- **Comparison tables** in `AboutFaqData.tsx` must include an `asOf` date (handbook requirement for defensive dating).
- **Handbook reference**: detailed product requirements, checklists, and templates live in the sibling repo at `/Users/atlas/Data/Nextjs_project/shuttlelab-handbook/`.
