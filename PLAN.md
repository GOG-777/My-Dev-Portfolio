# PLAN.md — DESIGN.md implementation

Branch: `redesign/professional`. One commit per phase, conventional messages.
No new dependencies without approval. TODO placeholders where real content is missing.

---

## Phase 0 — audit findings

**Stack** — Vite 7 + React 19 + TS 5.9 + Tailwind 3.4 + react-router-dom 7 + lucide-react.
Deploy: `vercel.json` SPA rewrite, plus gitignored `Dockerfile`/`docker-compose.yml`
(Vite dev server, host port 5177). No CI. No tests. No forms, no analytics, no secrets.

**Routes** — `/` (HomePage), `/projects/praise-fashion`, `/projects/course-registration`,
`/projects/url-shortener`. Sitemap and robots list exactly these four. All must keep working.

**Real content worth keeping** — Praise Fashion (8 features, 11-item stack, 4 architecture
notes, 6 annotated screenshots, Nigerian pickup-station logic), Course Registration
(UNIPORT course data, 2 real GitHub repo links), URL Shortener (honest "frontend demo,
archived" framing), plus handles: github.com/GOG-777, linkedin.com/in/gog-thegenius,
t.me/thegenius_001, x.com/thegenius_xyz, instagram.com/thegenius_001, avatar.jpg (16 KB).

**Missing** — outcomes (numbers, results) for all three case studies, live/repo links for
Praise Fashion and URL Shortener, bio facts, email address, real OG image (1200×630).

**DESIGN.md violations to remove** — purple/blue gradients on every surface,
`backdrop-blur` glass nav, mouse-follow `blur-3xl` orb, 100-particle canvas, skill bars
with invented percentages, vanity stats (15+/50K+/20+/2+), 14-card tech-logo wall,
"Vibe Coder" copy, 2 decorative illustrations in use + 2 dead, GalaxyIcon brand mark,
`.emoji` class + Noto emoji font in Dockerfile, `#8B5CF6` theme-color, 4.3 MB of PNG
screenshots (largest 963 KB), 3 unused screenshots.

**Must not break** — the 4 routes and their URLs, sitemap/robots, Vercel SPA rewrite,
the GitHub live feed (`useGitHubProjects` + localStorage cache), `ScrollToTop`,
the 5 social URLs, the 2 real GitHub repo links, Docker dev on port 5177.

---

## Phase 1 — Tokens, fonts, base styles, layout shell, theme toggle

**New**
- `src/styles/tokens.css` — the only place raw values live. Light defaults on `:root`,
  dark overrides under `[data-theme="dark"]`. Color (paper/ink/muted/line/accent),
  spacing scale (4→128), radius (0–2px), border widths, fluid type scale via `clamp()`,
  grid vars (`--maxw: 1200px`, 12 columns, gutters).
- `src/styles/fonts.css` — `@font-face` for the vendored woff2 files, `font-display: swap`.
- `public/fonts/*.woff2` — Instrument Serif 400, Geist 400/500, Geist Mono 400/500.
- `src/components/ThemeToggle.tsx` — 3-state (system/light/dark) or 2-state + system
  default; persists to `localStorage`, updates `data-theme`.
- `src/hooks/useTheme.ts` — resolves `prefers-color-scheme`, reads/writes storage,
  keeps `document.documentElement.dataset.theme` in sync.
- `src/components/Layout.tsx` — skip link, `<SiteHeader>`, `<main id="main">`, `<SiteFooter>`.
- `src/components/SiteHeader.tsx` — wordmark, section nav, ThemeToggle, no backdrop blur.
- `src/components/SiteFooter.tsx` — contact links, `LAST_UPDATED` constant, colophon.
- `src/components/Container.tsx` / `src/components/Grid.tsx` — 1200px container and
  12-column grid wrappers.

**Modified**
- `src/index.css` — replaced with imports of tokens/fonts/base; base resets, focus ring
  in accent, `:focus-visible` only, global `prefers-reduced-motion` kill-switch,
  `::selection`, `text-wrap: pretty`, no dark-mode Tailwind `dark:` classes anywhere.
- `tailwind.config.js` — theme mapped to the CSS variables (`colors.paper = var(--c-paper)`
  …), font families, spacing from the token scale, `borderRadius` capped at 2px.
  Utility classes stay for layout only.
- `src/App.tsx` — routes wrapped in `<Layout>` via a layout route; same 4 paths.
- `index.html` — inline no-FOUC theme script in `<head>` (before any CSS paint), two
  `theme-color` metas with `media`, drop `keywords`, keep sitemap link and favicon link.
- `.dockerignore` / `Dockerfile` (gitignored, local only) — remove the emoji font install.

**Deleted**
- `src/App.css` (dead, Vite template), `src/assets/react.svg` (dead),
  `src/components/CoderSVG.tsx` + `src/components/CodeWindowSVG.tsx` (imported nowhere),
  `index.html.backup`, `README-vite-backup.md`, `docker-buildx` (533 KB of scraped GitHub
  HTML committed by mistake — tracked, so removal is a real repo change).
- Dead CSS `.emoji`, `.modal-enter/.modal-exit` (from `src/index.css`).
- `src/components/GalaxyIcon.tsx` — replaced by the hero signature mark; the galaxy is not
  in the design spec. (Confirm in Q7.)

**Acceptance** — page renders in light and dark, toggle persists across reload, no flash of
wrong theme, no banned visual (gradient/blur/glow) present, 360/768/1440 layout has no
horizontal scroll.

---

## Phase 2 — Home page: Hero, Selected Work, Capabilities, About, Contact, Footer

**New**
- `src/components/sections/Hero.tsx` — name, one-line positioning, one paragraph,
  two text links (Work, Contact), signature mark as the single accent detail.
- `src/components/SignatureMark.tsx` — hand-built inline SVG: fine grid lines + one slowly
  moving point/line, < 5 KB, no library, deterministic (no `Math.random`), static fallback
  when `prefers-reduced-motion: reduce`.
- `src/data/projects.ts` — curated `selectedWork` rows: index (01…), title, one-line
  outcome, stack, year, href, caseStudyRoute. Authored content, not generated.
- `src/components/sections/SelectedWork.tsx` — indexed rows with hairline separators,
  diagonal rule lines, not cards.
- `src/components/sections/Capabilities.tsx` — grouped plain-text lists (Platform /
  Data / Delivery), no icons, no bars.
- `src/components/sections/About.tsx` — first person, specific, no "vibe coder" copy.
- `src/components/sections/Contact.tsx` — mailto + existing social handles as plain links.
  No form (would require a service = new dependency).

**Modified**
- `src/pages/HomePage.tsx` — rewritten as composition of the sections above; all canvas,
  particle, mouse-tracking, stats, skill-bar, tech-grid and illustration code removed.

**Retired / pending Q5**
- `src/components/MyProjects.tsx` — replaced. `src/hooks/useGitHubProjects.ts` kept only if
  Q5 says the live feed stays (rendered as plain text rows, not cards).

**Content gaps** — outcome lines for the three projects, and any About facts, get
`<!-- TODO: confirm -->` placeholders surfaced in the UI as `TODO` only where a line
cannot be honestly cut.

---

## Phase 3 — Case study template, then pages

**New**
- `src/components/case-study/CaseStudyPage.tsx` — one template: title, meta row (year,
  role, stack), Problem, Role, Key decisions (list), Stack, Outcome, Links. Screenshots as
  `<figure>` + `<figcaption>` grid, lazy-loaded. No modal, no carousel, no duplicated
  keyboard handlers.
- `src/data/case-studies/praise-fashion.ts`, `course-registration.ts`, `url-shortener.ts` —
  structured content lifted from the current pages, with TODO placeholders for outcomes
  and missing links.
- `src/pages/case-studies/{PraiseFashion,CourseRegistration,URLShortener}.tsx` — thin
  wrappers (~15 lines each).

**Modified**
- `src/App.tsx`, `src/data/projects.ts` — point at the new page paths; route URLs unchanged.
- Screenshots under `public/images/projects/**` — converted to WebP and resized with local
  ImageMagick (no install), originals dropped after visual check.

**Deleted**
- `src/pages/PraiseFashion.tsx`, `CourseRegistration.tsx`, `URLShortener.tsx` (604/601/522
  lines, ~150–200 duplicated lines each), plus the 3 unused screenshots
  (`course-registration/api-endpoints{,_2}.png`, `urlshortener/mail-verified.png`).

**Open** — Q6 decides whether URL Shortener gets a full case study or a short archive entry.

---

## Phase 4 — Metadata, accessibility, performance, cleanup, Lighthouse

**Metadata**
- `index.html` — title, description, canonical, OG + Twitter tags with a real 1200×630 OG
  image, favicon set (svg + 32 png + apple-touch 180), Person JSON-LD (name, url, sameAs
  for the 5 real profiles). OG card and favicon rasterized locally with `rsvg-convert`.
- `public/sitemap.xml` — refreshed `lastmod`, same 4 URLs. `public/robots.txt` — keep,
  verify the sitemap URL matches the canonical domain (Q3).

**Accessibility** — skip link verified, semantic landmarks, heading order, alt text on every
screenshot, visible focus states, keyboard pass on nav/toggle/links, contrast check on
muted-on-paper in both themes, reduced-motion verified.

**Performance** — preload the 2 most-used font files, subset to latin, verify no CLS from
fonts/images (explicit width/height on screenshots), confirm the only network call left is
the GitHub feed, `npm run build` bundle review, check for unused deps (lucide-react — Q10).

**Cleanup** — final sweep for dead code, unused assets, banned classes (`bg-gradient`,
`backdrop-blur`, `blur-3xl`, `shadow-`), stray files, and `package.json` keys.

**Lighthouse** — mobile 95+ ×4, LCP < 2.0 s, CLS < 0.05. No Chrome and no Lighthouse CLI is
installed locally (Q11).

**Also in this phase** — README refresh (stack, structure, how to run) if you want the repo
docs to match the redesign.

---

## Open questions

| # | Question | Recommendation |
|---|---|---|
| Q1 | Fonts: vendor woff2 files into `public/fonts/` (needs a one-time download of the font files, no npm install) or install `@fontsource/*` packages? | Vendor the files — no dependency, self-hosted per spec. Needs your OK to download. |
| Q2 | Lockfile: `package-lock.json` is deleted in the worktree while `pnpm-lock.yaml` + `pnpm-workspace.yaml` are new and untracked; `Dockerfile` runs `npm install`; `pnpm-workspace` disables `@swc/core` + `esbuild` build scripts (pnpm installs can break the build). Which is canonical? | Pick one and commit only that lockfile. Recommend npm (matches the Dockerfile) unless you've moved to pnpm. |
| Q3 | Canonical domain for meta/OG/sitemap/JSON-LD — stay `https://gog-portfolio.vercel.app`? | Keep it unless a custom domain is coming. |
| Q4 | Deploy target of record: Vercel (`vercel.json`) or Docker? The Dockerfile `EXPOSE 5173` and compose `5177:5177` disagree. | Vercel for prod; fix the Docker port mismatch in the same phase. |
| Q5 | Keep the live GitHub feed (`useGitHubProjects`) as a plain-text "Open source" list, or drop it in favour of curated rows only? | Keep it — it's working functionality and a real data source; render as rows, not cards. Note repo descriptions are not outcomes, so Selected Work stays hand-written. |
| Q6 | URL Shortener is a frontend-only demo with no repo or demo link; DESIGN.md says cut unbacked claims. Full case study or short archived entry? | Short archived entry (one paragraph + stack), reconsider once a link exists. |
| Q7 | Keep the galaxy brand mark / avatar portrait, or go text-only? DESIGN.md never mentions a logo or photo. | Drop the galaxy for the abstract mark; keep the avatar only if you want a face in the About section. |
| Q8 | Identity: stay anonymous ("GOG / TheGenius"), or use a real name? | Keep the handle; Person JSON-LD uses it as `name` with the real profiles in `sameAs`. |
| Q9 | Email for the Contact section / mailto — none exists in the repo today. | Give me an address, or Contact ships with the 5 social links only. |
| Q10 | Remove `lucide-react` once the old pages are gone? | Remove — it exists only for chrome we're deleting. |
| Q11 | Lighthouse needs a Chrome build and the Lighthouse CLI; neither is installed. OK to run `npx lighthouse` (downloads the CLI, ~large) and/or install Chrome? | Ask before running; otherwise I'll report the manual checklist and you run Lighthouse yourself. |
| Q12 | Keep Tailwind 3 (theme mapped to CSS tokens, utilities for layout only) or replace it with plain CSS? | Keep Tailwind — it's already a dependency, and mapping the theme to tokens keeps the spec's "define once" rule. |
| Q13 | Real outcome data (numbers, results) for the three case studies, and any About facts. | Send whatever is real; everything else ships as a marked TODO rather than invented. |
