@AGENTS.md

# Joy Das — Portfolio Project Context

This file is read by Claude (and is useful for any developer/AI assistant picking up this project). It captures intent, decisions, and history so context isn't lost between sessions.

## What this project is
Personal portfolio site for Joy Das (UI/UX & Product Designer, based in Bengaluru, working remotely).
- **Figma source of truth:** https://www.figma.com/design/R5K4HpwhqdnJL7mCg8ECff/Joy-Das-%E2%80%94-Portfolio-Resume
- **Live Webflow portfolio (current site):** https://designnerd-joy.webflow.io/
- **Old Adobe portfolio:** https://designnerd.myportfolio.com/
- **Email contact:** joy.d4272@gmail.com
- **Phone:** +91 8095 624 272
- **Goal:** Single-page portfolio, fully responsive, content driven from a CMS (Sanity) once design is locked. Deployed on Vercel.

## Hosting (deployed)
- **GitHub repo:** https://github.com/joyd4272/joy-portfolio
  - `main` branch — Production. Stable pre-Sanity Figma-locked build + LinkedIn URL fix.
  - `feature/sanity-cms` branch — Preview. Sanity CMS integration in progress.
  - `deploy/initial` branch — retired (superseded by main + feature/sanity-cms).
- **Vercel project:** joy-portfolio (under `joyd4272s-projects`)

### Production (`main`)
- **Canonical URL (for CV/job applications):** https://joy-portfolio-joyd4272s-projects.vercel.app
- Aliases: https://joy-portfolio-gamma.vercel.app · https://joy-portfolio-git-main-joyd4272s-projects.vercel.app
- Production branch: `main`. Pushes to main auto-deploy as production.

### Preview (`feature/sanity-cms`)
- **Branch alias (auto-updates on each push):** https://joy-portfolio-git-feature-sanity-cms-joyd4272s-projects.vercel.app
- Specific deployment: https://joy-portfolio-fihqa5ns2-joyd4272s-projects.vercel.app
- Studio embedded at `/studio` on this preview. CORS origin needs to be added in Sanity for the preview alias.

## Stack
- Next.js 16.2.6 (App Router, Turbopack)
- React 19.2.4
- TypeScript (strict)
- Tailwind v4 (via `@tailwindcss/postcss`)
- ESLint
- Geist sans/mono fonts from `next/font/google`

Next.js 16 has breaking changes — see `node_modules/next/dist/docs/` and the `AGENTS.md` callout above when in doubt.

## File layout
```
public/
  joy-logo.svg               Figma-exported JOY mark + wordmark
  Joy_Das_Resume.pdf         Resume PDF (download target from CTA button)
src/
  app/
    layout.tsx               Geist fonts, page metadata
    page.tsx                 Composes the section components in order
    globals.css              Tailwind import, design tokens, marquee/dock keyframes
  components/
    Header.tsx               Sticky nav, hamburger on mobile, "Available for work" pill
    Logo.tsx                 Inline JOY SVG, uses currentColor
    Hero.tsx                 [ I am ] label, "Joy Das" headline, 4 info fields
    Marquee.tsx              Auto-scrolling skills strip with star separators
    Stats.tsx                10+ / 08 / 07 with short uppercase labels
    Skills.tsx               6 disciplines with descriptions and tag chips
    Journey.tsx              Dark experience timeline (8 roles)
    Projects.tsx             Color-coded project cards, asymmetric 3-row grid
    KitAndHuman.tsx          Auto-scrolling dock, education, hobby grid
    CTA.tsx                  Found my work interesting? + email + resume buttons
    Footer.tsx               Contact + nav columns, JOY DAS watermark
  data/
    portfolio.ts             ALL content lives here. Single source of truth until
                             Sanity is wired up.
```

## Design system
- Color tokens declared in `globals.css` and exposed via Tailwind's `@theme inline`:
  - `--background` (#f3eee5 cream/beige), `--foreground` (#111)
  - `--accent` (#ff5b1f orange — stars, dots, contact CTA, highlights)
  - `--dark-bg` / `--dark-foreground` for Journey/CTA/Footer sections
  - `--card-signage` (lime green) for highlight tile + availability dot
  - Per-card tints: `--card-builder`, `--card-bookit`, etc.
- SVG icons use `fill="currentColor"` so they inherit text color.
- Thin horizontal section dividers via `border-t border-[var(--border)]`.

## Polish phase — LOCKED ✓
Design polish complete and locked by Jo on 2026-05-12. Do not make design or content changes proactively. Only modify if Jo explicitly asks.

- [x] Header / Nav
- [x] Hero
- [x] Marquee
- [x] Stats
- [x] Skills
- [x] Journey — 8 roles with full Figma content, "Currently" pulsing pill on top
- [x] Projects — Asymmetric 3-row grid (2:1, 1:1, 1:2); each card deep-links to Webflow case study
- [x] Kit & Human — Auto-scrolling dock with 9 tools; hobby grid 4×2
- [x] CTA — mailto + resume PDF download wired
- [x] Footer — Lime availability dot, "Inter Semi Bold" tagline, Navigate hidden on mobile

### Final content state
- Current role at RDZ-NFS shows **Remote** (Jo is based in Bengaluru, works remotely).
- Favicon: `src/app/icon.svg` (JOY mark on dark rounded tile). Legacy `favicon.ico` left in place as a fallback.
- Writing tone: hyphens removed within words (user centric, end to end, AI driven, Cross functional, non technical, elearning). Em dashes and middle dots kept as stylistic punctuation.

## Animation phase — LOCKED ✓
Animation polish locked by Jo on 2026-05-12. Do not modify these animations unless explicitly asked.

### Shared timing
- Easing curve: `cubic-bezier(0.22, 1, 0.36, 1)` — near GSAP `power3.out`. Variables `--cta-ease` and `--cta-duration` (420ms) live in `:root` in `globals.css`.
- Nav uses its own curve: `cubic-bezier(0.65, 0, 0.35, 1)` (near GSAP `power3.inOut`), 480ms.
- All animations respect `prefers-reduced-motion`.

### Implemented animations

1. **Nav links** (`.nav-link` family in `globals.css`, applied in `Header.tsx`):
   - Text "flips up" on hover: original text translates up & out, an accent-orange duplicate slides up from below
   - `[` slides 3px left, `]` slides 3px right, both color-shift to accent
   - Same triggers fire on `:focus-visible` for keyboard nav

2. **CTA "Let's talk"** (`.cta-talk` family in `CTA.tsx`):
   - Pill lifts 2px with soft orange glow shadow
   - Black arrow chip slides right 4px and turns orange
   - Arrow inside chip rotates -45° (points up-right, "sent")

3. **CTA "Download résumé.pdf"** (`.cta-download` family in `CTA.tsx`):
   - Pill lifts 2px, border brightens to white-ish
   - Down arrow tickers: current arrow slides down out of view, fresh arrow slides in from above
   - Uses a wrapper with `overflow: hidden` and two stacked SVGs (one base, one `.is-incoming`)

4. **Header "Available for work"** (`.cta-status` family in `Header.tsx`):
   - Pill lifts 1px with subtle green glow shadow
   - Green status dot scales to 1.35×

5. **Inline arrow links — "View full portfolio →"** (`.cta-link` family in `Projects.tsx`):
   - Whole link shifts to accent color
   - Arrow character translates right 6px

6. **Hero scroll divergence** (`Hero.tsx` is a client component; `.hero-pane-left` / `.hero-pane-right` in `globals.css`):
   - Section sets a `--hero-progress` CSS variable (0→1) based on scroll position via rAF-throttled scroll listener
   - Left pane (Joy + tagline + pill) translates `calc(var(--hero-progress) * -120px)`
   - Right pane (Das + info fields) translates `calc(var(--hero-progress) * 120px)`
   - Uses `translate3d` for GPU acceleration
   - Disabled below 768px width (would push content offscreen)
   - Disabled when `prefers-reduced-motion` is set

## Verified journey timeline
1. RDZ-NFS Technology Solutions · Pune · Jan 2025 — Present (Currently)
2. Pinnacleu · Remote · Jun 2024 — Dec 2024
3. ValueLabs · Bangalore · Aug 2022 — Jun 2024
4. L&T Technology Services · Bangalore · Aug 2018 — Aug 2022
5. Smarterhomes Technology · Bangalore · Jan 2018 — Aug 2018
6. Verse Innovation / Dailyhunt · Bangalore · Jul 2015 — Jan 2018
7. Creative Books IT Solutions · Bangalore · Apr 2014 — Jul 2015
8. Vedicventures Learning Pvt Ltd · Bangalore · May 2013 — Apr 2014

## Project case-study URLs (Webflow)
- Builder → https://designnerd-joy.webflow.io/builder
- Book it → https://designnerd-joy.webflow.io/book-it
- Way Finder → https://designnerd-joy.webflow.io/way-finder
- Clarity → https://designnerd-joy.webflow.io/clarity-2
- Digital Signage → https://designnerd-joy.webflow.io/digital-signage
- One → https://designnerd-joy.webflow.io/one-finance

## Social links
- LinkedIn (placeholder — needs real URL)
- Old projects → https://designnerd.myportfolio.com/
- Webflow → https://designnerd-joy.webflow.io/

## Known gotchas
- **OneDrive corrupts files.** This project currently lives inside OneDrive. OneDrive periodically zeros out files. Recommended: move to `C:\Users\Think\Projects\` before pushing.
- **Stray lockfile.** If `C:\Users\Think\package-lock.json` exists, delete it.
- **Mobile scrollbars are invisible.** Use auto-scroll for "more content" affordance, not static scroll bars.

### Recovery snippet
```powershell
cd C:\Users\Think\OneDrive\Desktop\Resume\Joy_Das\joy-portfolio
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
Remove-Item C:\Users\Think\package-lock.json -ErrorAction SilentlyContinue
npm install
npm run dev
```

## Roadmap
1. Get real LinkedIn URL from Jo and wire it up.
2. Move project out of OneDrive (recommended).
3. ~~Git init + push to GitHub~~ ✅ Done. Repo: https://github.com/joyd4272/joy-portfolio
4. ~~Vercel deploy~~ ✅ Done. Preview: https://joy-portfolio-gamma.vercel.app
5. Add Sanity CMS — see "Sanity integration plan" below.
6. Promote to production via `vercel --prod` (after Sanity is wired and LinkedIn URL is real).

## Sanity integration plan

### Sanity project (created)
- **Project name:** Joy Das Portfolio
- **Project ID:** `2lw0wkod`
- **Organization ID:** `o5KsDY7wm`
- **Dataset:** `production`
- **Plan:** Growth Trial (30 days, auto-downgrades to free Hobby — that's the intended end state)
- **Dashboard:** https://www.sanity.io/manage (look for "Joy Das Portfolio")
- **CORS origins allowed:**
  - http://localhost:3000 (Next.js dev)
  - http://localhost:3333 (Sanity Studio dev — added by `sanity init`)
  - https://joy-portfolio-gamma.vercel.app (Vercel preview — pending Jo to add)
  - Production URL to be added after promotion.

### Architecture
Headless CMS pattern with on-demand revalidation:
- **Sanity Content Lake** — hosted database for all content (free Hobby plan, ample headroom for this site)
- **Sanity Studio** — embedded at `/studio` route in this Next.js app
- **Next.js fetch + ISR** — pages fetch content from Sanity at build time; cached
- **Revalidation API route** — `/api/revalidate` on this site
- **Sanity webhook** — calls `/api/revalidate` on every publish, with a shared secret
- **Visual / Live Preview** (optional second pass) — Sanity's `@sanity/visual-editing` + Next.js Live Mode for in-Studio live preview while editing drafts

Time from "Publish in Studio" → "live on site" should be 1–5 seconds via the revalidation route.

### Schemas to build
One **singleton** for site-level config + one **document type per repeating collection**:

- `profile` (singleton) — name, role, tagline, intro, currentRole, currentCompany, location, email, phone, address, availability, resumeFile (asset), portfolioUrl
- `educationItem` (could be embedded in profile or its own type) — degree, school, discipline, period
- `marqueeItem` — label (ordered)
- `stat` — value, label (ordered)
- `skill` — title, body, tags (string array), order
- `journeyItem` — role, company, location, period, current (bool), bullets (string array), order
- `project` — number, name, category, blurb, href (URL), background (color), foreground (color), arrowBg, arrowFg, order
- `dockTool` — name, note, primary (bool), order
- `hobby` — name, note, icon (predefined list), highlight (bool), order
- `socialLink` — label, href, order
- `navItem` — label, href, order
- `siteSettings` (singleton) — availability text, copyright tagline, og:image asset, etc.

### Dependencies to add
- `next-sanity` — Next.js integration
- `@sanity/image-url` — image URL builder
- `@sanity/vision` — query playground (dev tool, inside studio)
- `sanity` — studio runtime
- `@sanity/visual-editing` — optional live preview

### Implementation order
1. Run `sanity init` with the existing project ID (Jo provides it). Use embedded studio mode.
2. Create schema files under `src/sanity/schemas/`.
3. Configure `src/sanity/config.ts` + `src/sanity/client.ts`.
4. Create `src/app/studio/[[...tool]]/page.tsx` for the embedded Studio.
5. Migrate content: write a script that imports `src/data/portfolio.ts` and seeds Sanity via the management API. Run once.
6. Update each section component to fetch from Sanity instead of importing from `src/data/portfolio.ts`. Use `next-sanity`'s `defineQuery` + caching.
7. Create `src/app/api/revalidate/route.ts` — verifies Sanity webhook signature, calls `revalidateTag()` for the affected content type.
8. Add Sanity webhook in the Sanity dashboard pointing at `https://<production-url>/api/revalidate` with the shared secret.
9. Add the production URL + studio URL to Sanity's CORS origins.
10. (Optional, second pass) Wire up Visual Editing / Live Preview.
11. Deploy. Test the full loop: edit in studio → publish → see live update in <5s.

### Env vars needed (in Vercel + local `.env.local`)
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (production)
- `SANITY_API_READ_TOKEN` (server-side, for draft preview)
- `SANITY_WEBHOOK_SECRET` (shared with the Sanity webhook config)

### Things to NOT do during setup
- Don't accept the default schemas from `sanity init` — we want our own tailored to the sections.
- Don't delete `src/data/portfolio.ts` until the migration script is verified.
- Don't expose any tokens to the client bundle — only `NEXT_PUBLIC_*` vars are safe in `'use client'` code.

## Tooling on the developer machine
- node v24.15.0, npm 11.12.1, git 2.54.0
- gh (GitHub CLI) 2.91.0
- vercel CLI 52.0.0
- sanity 6.5.1

## Conventions
- All content lives in `src/data/portfolio.ts` until Sanity is connected.
- New sections live in `src/components/SectionName.tsx`, exported as default, composed in `src/app/page.tsx`.
- Tailwind v4 — use core utilities. Custom CSS for animations only (`globals.css`).
- Mobile-first responsive: design works at 390px width, scales up via `sm:` / `md:` / `lg:` breakpoints.
