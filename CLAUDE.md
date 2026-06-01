@AGENTS.md

# Joy Das — Portfolio Project Context

This file is read by Claude (and is useful for any developer/AI assistant picking up this project). It captures intent, decisions, and history so context isn't lost between sessions.

---

## ⚡ Session handoff — last updated 2026-05-30

This is the operations manual. Read it top to bottom before touching anything. After reading you should be able to: add case studies, ship to production, edit content in Sanity, tweak design, recover from breakage, and scale the homepage to N projects — without re-reading chat history.

The repo lives at `C:\Users\Think\OneDrive\Desktop\Resume\Joy_Das\joy-portfolio`. All paths below are relative to that directory unless absolute.

### Table of contents
1. Current state
2. Open tasks
3. Daily workflow & restart matrix
4. Shipping to production (the full deploy cycle)
5. Sanity content operations
6. Design tweaks — what's locked, what's safe
7. Recipe A: image-stack case study
8. Recipe B: static HTML case study
9. Scaling the homepage beyond 6 projects
10. Environment variables & secrets
11. Disaster recovery
12. Key files (mini-map)
13. Quick command reference
14. Gotchas
15. Pointer to detailed session memory

---

### 1. Current state

**Working locally** (verified `npm run dev` at `http://localhost:3000`):
- 6 internal case study pages routed at `/work/<slug>`: builder, way-finder, clarity, digital-signage, one (image-stack template) + book-it (static HTML build with Next.js rewrite).
- Homepage project cards all link to internal `/work/<slug>` routes (Sanity-driven + `src/data/portfolio.ts` fallback).
- Sanity Project schema patched: `href` field accepts both `https://...` and `/`-prefixed paths.
- Hero has a Spline cube iframe on the right (the React lib failed due to a Turbopack/protobuf conflict — see gotchas).
- Site `--background` token switched from cream (`#f3eee5`) to pure white (`#ffffff`). Hero and `/work/*` pages remain `bg-black`.

**Sanity production data** (verified via direct GROQ on 2026-05-30):
All 6 Project docs published with internal hrefs:
- Clarity → `/work/clarity`
- Digital Signage → `/work/digital-signage`
- One Finance → `/work/one`
- Builder → `/work/builder`
- Way Finder → `/work/way-finder`
- Book it → `/work/book-it`

**NOT yet on production.** None of the case-study work has been pushed to `main`. Production at https://joy-portfolio-joyd4272s-projects.vercel.app still serves the pre-case-study site with Webflow card links. Section 4 below walks through shipping.

### 2. Open tasks

In priority order — each is self-contained, can be completed in any session:

1. **Ship the current local state to production.** See Section 4.
2. **Nudge the Hero Spline cube.** Currently overlaps the "AT: RDZ-NFS..." experience block. Move up, push right, shrink one size step. The wrapper div lives inside `src/components/Hero.tsx`. Current classes include `top-4 lg:top-6`, `-right-8 md:-right-16 lg:-right-20`, `w-[340px] lg:w-[420px] xl:w-[480px]`. Iterate visually.
3. **OTT case study.** Recipe A if image frames, Recipe B if HTML build.
4. **Future projects** (TBD names) — same recipes.
5. **Eventually:** add custom domain (joydas.com / joydas.dev), `og:image` for social previews, Sanity Visual Editing for in-Studio live preview.

### 3. Daily workflow & restart matrix

**The shape of a normal session:**
1. Open a terminal in the repo: `cd C:\Users\Think\OneDrive\Desktop\Resume\Joy_Das\joy-portfolio`.
2. Start the dev server: `npm run dev`. Leave it running in that terminal.
3. Open `http://localhost:3000` in a browser.
4. Make edits — files save → Turbopack hot-reloads → browser updates within ~200ms.
5. When done, Ctrl+C the dev server. Commit and push if you're ready (Section 4).

**Restart matrix — when do you need to restart `npm run dev`?**

| What changed | Hot reload enough? | Why |
|---|---|---|
| A `.tsx` component | Yes | Turbopack picks it up. |
| `globals.css` | Yes | Turbopack picks it up. |
| `public/*` assets (new image, etc.) | Yes (browser refresh) | Static files served straight. |
| `src/sanity/schemas/*.ts` | Mostly yes — Studio tab needs refresh | Schema reloads on edit. |
| `next.config.ts` | **NO — full restart required** | Config only reads at boot. |
| `package.json` deps | **NO — restart after `npm install`** | Module resolution cached. |
| Sanity content edit (via Studio) | **NO — see "fetch cache" gotcha** | Next caches fetch indefinitely with `revalidate: false`. Force-clear: `Remove-Item -Recurse -Force .next`, then `npm run dev`. |

When in doubt: Ctrl+C → `npm run dev` again. Cheap, never wrong.

### 4. Shipping to production (the full deploy cycle)

**The pipeline:**
```
local repo → git push origin main → GitHub → Vercel webhook → build → live
```

Vercel auto-deploys on every push to `main`. There's no `vercel deploy` step you run manually for production.

**Pre-flight checklist** before pushing:
1. Local site at `localhost:3000` looks right end-to-end (homepage scroll, click each project card, click "Back to home" from each case study).
2. No errors in the dev server terminal or browser console.
3. `git status` shows only files you intend to commit.

**The push:**
```powershell
cd C:\Users\Think\OneDrive\Desktop\Resume\Joy_Das\joy-portfolio

# Look at what's changed
git status
git diff --stat

# Stage everything
git add .

# Commit. Pick a message that describes the user-visible change.
git commit -m "feat(work): internal case studies + book-it static build + spline hero"

# Push to main — this triggers production deploy
git push origin main
```

**While Vercel builds (~1–3 minutes):**
- Watch progress at https://vercel.com/joyd4272s-projects/joy-portfolio
- Or via CLI: `vercel ls` (most recent deploy at top)
- Build status: 🔄 building → ✅ ready, or ❌ error with logs

**Post-deploy verification:**
1. Open https://joy-portfolio-joyd4272s-projects.vercel.app in an incognito window (avoids browser cache).
2. Scroll the homepage. Click every project card. Each should route to a working `/work/<slug>` page.
3. Click "Back to home" from a case study. Should return cleanly.
4. Visit https://joy-portfolio-joyd4272s-projects.vercel.app/studio. Confirm it loads, you can log in, and all 6 Project docs are published.
5. Visit one case study URL directly (e.g. `/work/clarity`). Should work.

**If the deploy fails:**
- Read the Vercel build log. 90% of failures are TypeScript errors or missing files.
- Fix locally, commit, push again — Vercel rebuilds automatically.
- The previous deploy stays live until the new one succeeds (zero-downtime).

**If the deploy succeeds but the site looks wrong:**
- Sanity content fetch may have stale cache. Open Studio → edit any field → revert → Publish. The webhook fires and revalidates the production cache.
- If it persists, manually hit `https://joy-portfolio-joyd4272s-projects.vercel.app/api/revalidate?secret=<SANITY_WEBHOOK_SECRET>` — but the secret should NEVER be exposed in chat. Use Vercel env vars to look it up.

**Rolling back to a previous deploy** (the panic button):
1. Vercel dashboard → joy-portfolio → Deployments tab.
2. Find a previous green deploy (older).
3. Click `⋯` menu → "Promote to Production".
4. Takes ~30 seconds. The bad deploy stays archived; you can re-promote to it later.

This is the single safest rollback. Don't try to fix forward when something is broken on production unless you have a working local repro.

### 5. Sanity content operations

**Studio access:**
- Production: https://joy-portfolio-joyd4272s-projects.vercel.app/studio
- Local: http://localhost:3000/studio (only when `npm run dev` is running)
- Login: same Sanity account that created the project (Jo's joy.d4272@gmail.com)

**Editing content (no code changes needed):**
1. Open Studio (production or local — both write to the same Sanity Content Lake).
2. Pick a doc type from the left rail (Profile, Project, Marquee Item, Stat, Skill, Journey Item, Dock Tool, Hobby, Social Link, Nav Item, Site Settings).
3. Edit fields. The doc enters Draft state (orange dot).
4. Click **Publish** (bottom-right). Green dot replaces orange.
5. Production site reflects the change within ~30–60 seconds (Sanity CDN cache TTL).

**The webhook flow** (already wired, don't re-wire):
```
Studio Publish
  → Sanity Content Lake updates
  → Webhook fires to https://joy-portfolio-joyd4272s-projects.vercel.app/api/revalidate
  → Route verifies signature using SANITY_WEBHOOK_SECRET
  → Calls revalidateTag(_type) — busts the fetch cache for that doc type
  → Next render fetches fresh data
```

The webhook is signed. Don't ever post `SANITY_WEBHOOK_SECRET` in chat. It lives only in Vercel env vars + locally in `.env.local`.

**When the live site doesn't show your edit:**
1. **Wait 30–60s** — Sanity CDN cache.
2. Hard refresh the browser (Ctrl+Shift+R).
3. If still stale, in Vercel dashboard → Deployments → most recent → "Redeploy". This bypasses ALL caches.
4. As a last resort, in Studio: open the affected doc → change something trivial → save → revert → Publish. Re-fires the webhook.

**Local Studio quirks:**
- The local Studio sees whatever schema is in your repo right now. So if you edit `src/sanity/schemas/*.ts` locally, the local Studio reflects it immediately (Turbopack reload). Production Studio doesn't reflect the change until next push.
- This is why on 2026-05-30 we used local Studio to publish docs with `/work/<slug>` paths: production Studio still rejected those values until the schema patch ships.

**Schema changes:**
- Schema files live in `src/sanity/schemas/`.
- Adding a field: edit the relevant schema, save. Local Studio shows the new field immediately. Existing docs render without the field until you populate it.
- Removing a field: deprecate first (don't break in-flight drafts). Set `hidden: true` in the schema for one release, then delete in the next.
- Field validation: use `Rule.required()` and `Rule.custom()` patterns. Project schema's `href` field is the reference example for accepting flexible inputs.

**Adding new doc types:**
1. Create `src/sanity/schemas/<name>.ts`.
2. Register it in `src/sanity/schemas/index.ts` (or wherever the schemas array is).
3. Define a Studio structure entry in `src/sanity/structure.ts` (or `deskStructure.ts`) so it shows in the left rail.
4. Restart Studio (browser refresh).

### 6. Design tweaks — what's locked, what's safe

**Jo's "locked" markers** (don't change without explicit asking):
- The journey timeline content (8 roles, dates, locations) — see "Verified journey timeline" further down in this file.
- Animation timings (`--cta-ease`, `--cta-duration`, nav-link flips, hero scroll divergence) — see "Animation phase locked" section.
- Section composition order in `src/app/page.tsx` (Header, Hero, Marquee, Stats, Skills, Journey, Projects, KitAndHuman, CTA, Footer).

**Safe to tweak freely** (Jo's edits or design refinement):
- Design tokens in `src/app/globals.css`: `--background`, `--foreground`, `--accent`, per-card colors. Changes propagate everywhere.
- Tailwind class adjustments in any component for layout, spacing, typography.
- Case study image dimensions (max-width on `/work/<slug>` is `max-w-7xl`).
- Hero Spline cube positioning (the wrapper div in `Hero.tsx`).
- Copy: any text in `src/data/portfolio.ts` (also editable via Studio for whichever fields are Sanity-backed).

**Where to tweak each design thing:**

| Design dimension | File | Notes |
|---|---|---|
| Background color (light mode) | `src/app/globals.css` `--background` | Currently `#ffffff`. |
| Accent (orange) | `src/app/globals.css` `--accent` | `#ff5b1f`. Used in stars, CTAs, hovers. |
| Per-project card colors | Sanity Studio Project doc, fields `background` / `foreground` / `arrowBg` / `arrowFg` | Sanity overrides `src/data/portfolio.ts` fallback. |
| Hero layout | `src/components/Hero.tsx` | Two-column at md+, stacks on mobile. Cube hidden on mobile. |
| Hero cube position | `src/components/Hero.tsx` cube wrapper div | Tweak `top-*`, `-right-*`, `w-[*]` values. |
| Site fonts | `src/app/layout.tsx` (Geist) + `globals.css` (any custom font-faces) | Geist sans + Geist mono via next/font/google. |
| Case study background | `src/app/work/[slug]/page.tsx` `<main>` className | Currently `bg-black text-white`. |
| Case study max width | `src/app/work/[slug]/page.tsx` | Three places use `max-w-7xl` — keep them in sync. |
| Section padding | The component for that section, look for `py-*`, `mt-*`. |
| Homepage card grid | `src/components/Projects.tsx`. Asymmetric 3-row pattern. |

**Mobile-first reminder:** classes without breakpoints apply at all sizes; `md:`, `lg:`, `xl:` are progressive enhancements. Touch each tweak at 390px width, 768px (iPad), and 1440px+ desktop.

### 7. Recipe A — adding an image-stack case study

For projects shipped as a vertical stack of PNG/JPG frames (Builder, Way Finder, Digital Signage all use this pattern).

1. **Pick a slug.** kebab-case, e.g. `ott`, `acme-rebrand`. The slug becomes the URL: `/work/<slug>`.
2. **Drop images into `public/work/<slug>/`.** Name them zero-padded so they sort lexically: `01.png`, `02.png`, ... The page renders them in that order.
3. **Add the slug to `CASE_STUDIES` in `src/app/work/[slug]/page.tsx`:**
   ```ts
   ott: {
     title: "OTT",
     category: "Streaming product",
     images: Array.from({ length: 12 }, (_, i) =>
       `${String(i + 1).padStart(2, "0")}.png`
     ),
   },
   ```
   The `length` is the image count. For variable-length filenames (like the `one` slug), use a literal array.
4. **Add a Project doc in Sanity Studio** (`localhost:3000/studio` if local, production Studio otherwise):
   - Name, Category, Blurb, Number ("07" if it's the 7th).
   - Case study URL: `/work/<slug>`.
   - Background / Foreground / Arrow colors (match the work's palette).
   - Publish.
5. **(Optional but recommended) Update `src/data/portfolio.ts` fallback array** with the same entry so the card renders even if Sanity returns empty.
6. **Verify locally.** If you added the slug after the dev server started, restart `npm run dev` to refresh the static map. Visit `/work/<slug>` and click the card on the homepage.
7. **Commit and push** — see Section 4.

Background is hard-coded `bg-black text-white`, single "← Back to home" CTA renders automatically. No per-page styling needed.

### 8. Recipe B — adding a static HTML case study (Book It pattern)

For animated HTML/CSS builds that shouldn't be rebuilt in React.

1. **Pick a slug.** kebab-case.
2. **Drop the build into `public/work/<slug>/`.** Must contain `index.html`. Sibling folders (`assets/`, `images/`, etc.) come along. Relative paths inside the HTML resolve relative to `public/work/<slug>/`.
3. **Add a rewrite to `next.config.ts`:**
   ```ts
   async rewrites() {
     return [
       { source: "/work/book-it", destination: "/work/book-it/index.html" },
       { source: "/work/<slug>",  destination: "/work/<slug>/index.html" },
     ];
   }
   ```
   Without this, Next.js's dynamic `[slug]` route catches the URL and 404s because the slug isn't in `CASE_STUDIES`. Rewrites are evaluated BEFORE route matching.
4. **Back to home affordance:**
   - If the HTML has a back link in its nav (Book It does): make sure its `href="/"`. Check with `grep -i "back to home" public/work/<slug>/index.html`.
   - If not: inject the floating pill. Look at the Book It snippet — a `position: fixed; top: 16px; left: 16px` anchor with `backdrop-filter: blur(8px)`. Add `data-cowork-back-home` attribute so it's easy to find later.
5. **Add Project doc in Sanity Studio.** Case study URL = `/work/<slug>`. Publish.
6. **Restart `npm run dev` and nuke `.next/`.** `next.config.ts` only reads at startup, and the dynamic route's earlier 404 may still be cached.
7. **Commit and push.**

Tradeoffs: bigger payload (Book It is ~6.7MB because images are base64-inlined), no shared layout, no Next image optimization. Worth it when animation fidelity matters more than perf.

### 9. Scaling the homepage beyond 6 projects

The current `Projects.tsx` hard-codes a 6-card asymmetric grid:
```
Row 1: Builder (2/3) + Book it (1/3)
Row 2: Way Finder (1/2) + Clarity (1/2)
Row 3: Digital Signage (1/3) + One (2/3)
```

The code does this with explicit destructuring:
```ts
const [builder, bookit] = projects.slice(0, 2);
const row2 = projects.slice(2, 4);
const [signage, one] = projects.slice(4, 6);
```

**To add a 7th project:**
- If you want it integrated in the rhythm: extend to a 4-row layout. Examples:
  - 4-row 6+3 pattern: keep rows 1–3, add Row 4 with the 7th card alone (full-width) or split it (1/2 + space).
  - 4-row 8-card pattern: 2/3 + 1/3, 1/2 + 1/2, 1/2 + 1/2, 1/3 + 2/3. You'd need 8 projects, so this is the natural target if you're going to 8+.
- Edit `src/components/Projects.tsx`. Add to the destructuring, add a new `<div className="grid grid-cols-1 md:grid-cols-X gap-4">` block. Keep the same `<Card>` API.
- Order on the homepage is determined by the Sanity Project doc's `order` field (asc). Renumber existing docs if needed.

**8-card target** is the cleanest expansion (current rows already use 2:1, 1:1, 1:2 ratios — adding 1:2 + 2:1 keeps the rhythm symmetric).

### 10. Environment variables & secrets

**Vercel env vars** (set per environment: Production / Preview / Development):
- `NEXT_PUBLIC_SANITY_PROJECT_ID` = `2lw0wkod` (safe to expose)
- `NEXT_PUBLIC_SANITY_DATASET` = `production` (safe to expose)
- `SANITY_WEBHOOK_SECRET` = (secret; signed webhook verification — set via Vercel REST API, NEVER paste in chat)

**Local-only secrets** (in `.env.local`, gitignored, NEVER push to Vercel):
- `SANITY_API_WRITE_TOKEN` = (one-off seed scripts only, very high privilege)

**Updating an env var:**
- Vercel dashboard → joy-portfolio → Settings → Environment Variables.
- After changing, you must trigger a redeploy for the value to apply (Vercel dashboard → Deployments → Redeploy).

**`.env.local` file** in repo root (gitignored by default in Next.js):
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=2lw0wkod
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=<your-token-if-you-need-it>
```

If `.env.local` is missing locally, `npm run dev` still works because the public vars are inferred / defaulted. The write token is only needed when running seed scripts.

### 11. Disaster recovery

**Site is broken on production:**
1. Vercel dashboard → Deployments → find last green deploy → "Promote to Production". ~30s rollback.
2. Don't try to fix forward unless you have a clean local repro.

**Local dev server won't start / weird errors:**
```powershell
cd C:\Users\Think\OneDrive\Desktop\Resume\Joy_Das\joy-portfolio
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm install
npm run dev
```

**Local changes look wrong but production looks fine:**
- 99% of the time it's the `.next/` disk cache holding stale Sanity data. Nuke it:
  ```powershell
  Remove-Item -Recurse -Force .next
  ```
  Then restart `npm run dev`.

**Accidentally committed a secret:**
1. Don't push if you haven't already. `git reset HEAD~1` to undo the commit. Remove the secret. Recommit.
2. If you already pushed: immediately rotate the secret (Sanity dashboard → API → Tokens → regenerate; or Vercel → re-roll the webhook secret). Then `git filter-branch` or BFG to scrub history if needed.

**Sanity doc got deleted by accident:**
- Sanity has document history. Open Studio → click "History" tab on the doc → restore a previous version. Works for the past ~7 days on the free plan.

**Reverting a commit you already pushed to main:**
```powershell
git log  # find the bad commit's SHA
git revert <sha>  # creates a new commit that undoes the bad one
git push origin main  # Vercel auto-deploys the revert
```
Don't `git reset --hard` and force-push to main — it rewrites history and breaks anyone else's local clone.

### 12. Key files (mini-map)

| File | Purpose |
|---|---|
| `src/app/page.tsx` | Homepage. Composes section components in order. |
| `src/app/layout.tsx` | Root layout, Geist fonts, page metadata. |
| `src/app/globals.css` | Tailwind import, design tokens (`--background`, `--accent`, etc.), animation keyframes. |
| `src/app/work/[slug]/page.tsx` | Image-stack case studies. Static `CASE_STUDIES` map. `dynamicParams = false`. |
| `src/app/studio/[[...tool]]/page.tsx` | Embedded Sanity Studio. Has `"use client"` directive (required for Next 16 + Turbopack). |
| `src/app/api/revalidate/route.ts` | Sanity webhook receiver. Verifies signature, calls `revalidateTag()`. |
| `src/components/Hero.tsx` | Hero section with Spline cube wrapper. |
| `src/components/SplineCube.tsx` | Iframe-based Spline embed (client component). |
| `src/components/Projects.tsx` | Homepage cards. Card sniffs href: `http(s)://` → external new tab; else → Next `<Link>`. |
| `src/components/{Header,Hero,Marquee,Stats,Skills,Journey,KitAndHuman,CTA,Footer}.tsx` | Per-section presentation components. |
| `src/components/{Header,Hero,Stats,Skills,Journey}Loader.tsx` | Server loader wrappers around client section components. They fetch from Sanity + pass props down. |
| `src/data/portfolio.ts` | Sanity fallback. Single source of truth before CMS was wired; now mirrors CMS for resilience. |
| `src/sanity/client.ts` | Sanity read client. `useCdn: process.env.NODE_ENV === "production"`. |
| `src/sanity/config.ts` | Studio config. `basePath: "/studio"` is critical. |
| `src/sanity/schemas/*.ts` | 11 schemas: profile, siteSettings (singletons), and 9 collections. |
| `src/sanity/schemas/project.ts` | The case-study schema with the custom href validator. |
| `next.config.ts` | Rewrites for static-HTML case studies. Add one entry per HTML build. |
| `public/work/<slug>/` | Per-project static assets. |
| `public/Joy_Das_Resume.pdf` | Resume PDF served from CTA download button. |
| `public/joy-logo.svg` | JOY mark used in Header. |
| `.env.local` | Local-only env vars. Gitignored. |

### 13. Quick command reference

```powershell
# Get to the repo (every session starts here)
cd C:\Users\Think\OneDrive\Desktop\Resume\Joy_Das\joy-portfolio

# Daily dev
npm run dev                 # Start dev server (Turbopack)
npm run build               # Production build (catches TypeScript errors)
npm run lint                # ESLint pass

# When local cache misbehaves
Remove-Item -Recurse -Force .next
npm run dev

# Full nuclear reset
Remove-Item -Recurse -Force .next, node_modules
Remove-Item -Force package-lock.json
npm install
npm run dev

# Check what's about to ship
git status
git diff --stat
git diff -- src/                # specific path

# Ship to production
git add .
git commit -m "concise message"
git push origin main

# Watch the deploy
vercel ls                       # list recent deploys
# OR open https://vercel.com/joyd4272s-projects/joy-portfolio

# Sanity Studio access
# Local:      http://localhost:3000/studio
# Production: https://joy-portfolio-joyd4272s-projects.vercel.app/studio

# Quick Sanity data check (paste in browser, returns JSON)
# https://2lw0wkod.api.sanity.io/v2025-01-01/data/query/production?query=*%5B_type%3D%3D%22project%22%5D%7Bname%2Chref%7D

# Rollback a bad production deploy
# Vercel dashboard → Deployments → previous green → ⋯ → "Promote to Production"
```

### 14. Gotchas

- **OneDrive on-demand sync is cloud-only.** Files in `C:\Users\Think\OneDrive\...` may show in directory listings but fail to read until materialized. The Cowork Linux sandbox FUSE mount hits this hard; Claude Code (Windows-native) handles it fine. If `cp` fails with "No such file or directory" on a file you can clearly see, right-click the parent folder in Explorer → "Always keep on this device", then retry.
- **Next.js 16 fetch cache persists to disk.** `npm run dev` restart alone doesn't bust it because of `revalidate: false` on Sanity fetches. Force-clear with `Remove-Item -Recurse -Force .next` then `npm run dev`. This bites every time Sanity content changes locally — production is fine because the webhook handles it.
- **Sanity `type: "url"` enforces http(s)://.** Schema was patched to `type: "string"` + custom regex validator to accept both external URLs and root-relative paths. Don't revert.
- **`next.config.ts` only reads at startup.** Adding a rewrite needs a full dev-server restart, not just save+reload.
- **Production Studio runs whatever's deployed.** If you change `src/sanity/schemas/*.ts` locally, the local Studio (`localhost:3000/studio`) sees the new schema but production Studio doesn't until next push. Workaround: publish content edits via local Studio when schema is newer locally.
- **Spline + Turbopack don't mix via React lib.** `@splinetool/react-spline` crashes with "Data read, but end of buffer not reached" because Turbopack mangles the protobuf scene file. Use the iframe embed at `my.spline.design` instead — already in place. Don't reinstall the React lib.
- **OneDrive corrupts node_modules / .next.** Recovery: nuke + reinstall (see Section 11).
- **`useCdn` is true in production, false in dev.** Means production Sanity fetches go through the Sanity CDN (faster but 30–60s cache). If you ever need <5s revalidation, set `useCdn: false` in `src/sanity/client.ts` — costs more API calls but feels instant.
- **NextStudio in Next 16 needs `"use client"`.** Already in place at `src/app/studio/[[...tool]]/page.tsx`. Don't remove.
- **Sanity config needs `basePath: "/studio"`.** Already in place at `src/sanity/config.ts`. Don't remove.
- **Vercel env vars must be set per environment.** "Production" and "Preview" are separate scopes. `.env.local` is local-only.
- **Don't paste secrets in chat.** API tokens, webhook secrets — only in Vercel env vars and `.env.local`.

### 15. Pointer to detailed session memory

A more verbose timeline + decision log from the 2026-05-30 build sessions lives at `<cowork-outputs>/conversation_memory.md`. That file gets overwritten each session, so treat it as a recent-context dump. Treat THIS CLAUDE.md as the canonical, version-controlled handoff.

---

## What this project is
Personal portfolio site for Joy Das (UI/UX & Product Designer, based in Bengaluru, working remotely).
- **Figma source of truth:** https://www.figma.com/design/R5K4HpwhqdnJL7mCg8ECff/Joy-Das-%E2%80%94-Portfolio-Resume
- **Live Webflow portfolio (current site):** https://designnerd-joy.webflow.io/
- **Old Adobe portfolio:** https://designnerd.myportfolio.com/
- **Email contact:** joy.d4272@gmail.com
- **Phone:** +91 8095 624 272
- **Goal:** Single-page portfolio, fully responsive, content driven from a CMS (Sanity) once design is locked. Deployed on Vercel.

## Hosting (deployed) — Sanity-backed PRODUCTION live
- **GitHub repo:** https://github.com/joyd4272/joy-portfolio
  - `main` branch — **Production. Sanity-backed, fully wired.** Canonical URL for CV/job applications.
  - `feature/sanity-cms` branch — Kept as preview sandbox (optional, can delete later).
  - `deploy/initial` branch — retired.

### Canonical URL to share
**https://joy-portfolio-joyd4272s-projects.vercel.app**
Also aliased at: `joy-portfolio-gamma.vercel.app` and `joy-portfolio-git-main-joyd4272s-projects.vercel.app`.

## Sanity webhook (live on preview)
- Endpoint: `/api/revalidate` (verifies signature using `SANITY_WEBHOOK_SECRET`)
- Sanity webhook URL: preview deployment + `/api/revalidate`
- API version: `v2025-02-19`
- Triggers: Create / Update / Delete (not drafts)
- Vercel Deployment Protection: **disabled** so webhook can reach the route
- Round-trip latency: 30-60s (due to Sanity CDN cache layer in production). Accepted for portfolio use; could be made <5s by setting `useCdn: false` in `src/sanity/client.ts` if needed later.
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
  - `--background` (#ffffff pure white — switched from the original #f3eee5 cream on 2026-05-30), `--foreground` (#111)
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

## Project case-study URLs

**Current (internal — as of 2026-05-30):**
- Builder → `/work/builder`
- Book it → `/work/book-it` (static HTML build)
- Way Finder → `/work/way-finder`
- Clarity → `/work/clarity`
- Digital Signage → `/work/digital-signage`
- One → `/work/one`

**Legacy Webflow URLs (kept for reference — no longer used by the site):**
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

## ~~Planned change — internal case study pages~~ ✅ DONE (2026-05-30)

Implemented. See "Session handoff" section at the top of this file for current state. The notes below remain as historical scoping context; they no longer reflect what's open.

Jo wants to replace the current "project cards link to Webflow" pattern with internal case study pages built into this Next.js app.

### Scope
- 6 existing projects + **3 new projects** = 9 total cards on homepage
- Project cards on landing page point to `/work/<slug>` (internal route), not Webflow
- Case study pages are **hardcoded** (no Sanity CMS) — only the landing page stays CMS-driven
- 3 new projects: names/details TBD

### Implementation sketch
- New route group: `src/app/work/[slug]/page.tsx` (dynamic) or per-project files (static)
- Shared case study layout: `src/components/project-page/` (Hero, Overview, Process, Visuals, Outcome, NextProject)
- Visuals: store in `public/work/<slug>/` and import directly. No CMS images.
- Per-project content: hardcoded in the page file or a co-located `data.ts`

### Schema decision
- Replace project schema's `href` (external URL) with `slug` (internal identifier).
- Component builds URL: `/work/${slug}`.
- Migration script needed: convert existing href values to slug values for the 6 existing projects.

### Homepage grid update
- Current 6-card grid: 2:1, 1:1, 1:2 asymmetric.
- 9-card grid: pattern TBD. Default option = extend the asymmetric rhythm over 4 rows.

### Open questions (ask Jo before starting)
1. What are the 3 new projects? (name, category, blurb, year)
2. Case study page structure: same layout for all, or per-project flexibility?
3. URL pattern: `/work/<slug>` confirmed?
4. Webflow status: archived vs. fully retired?
5. Asset storage: `public/work/<slug>/` is the planned path — confirm.
6. Order on the homepage: how do the 9 cards sort?

### Clarifications received (May 2026)
- **5 image-stack projects**: Builder, Way Finder, Clarity, Digital Signage, One. Each page = one or more big images stacked vertically. No interactivity. Just navbar + big image + footer. (Example: Clarity is a single very tall PNG showing the whole product case study.)
- **2 HTML build projects**: Book it and OTT. Already built (or in progress) in vanilla HTML/CSS with heavy animations. NOT live yet.
- **Decision**: HTML builds STAY HTML, served from `public/work/book-it/` and `public/work/ott/` as static files. Next.js auto-serves these at the URL paths. Don't rebuild in React — too risky for animation fidelity, time-expensive.
- **Asset path**: `public/work/<slug>/` confirmed.
- **The 3rd new project**: still TBD. Jo originally said "3 more" but has only named OTT so far. Confirm count before scoping homepage grid.

### Open implementation tasks (for next build session)
- Drop HTML builds for Book It and OTT into `public/work/book-it/` and `public/work/ott/`. Commit.
- Drop case study images into `public/work/<slug>/` for the 5 image-stack projects. Commit.
- Create dynamic route `src/app/work/[slug]/page.tsx` that handles both image-stack and HTML projects. OR per-project files at `src/app/work/<slug>/page.tsx`.
- For HTML-build projects, route handler should either redirect/serve the HTML, or use `notFound()` and let Next.js's static file serving from `public/` handle it directly.
- Update Sanity Project schema: replace `href` (URL) with `slug` (internal identifier). Migration script needed.
- Update Projects.tsx to use `/work/${slug}` for the href, target="_self" (internal nav).
- Extend the homepage grid pattern from 6 to 8 or 9 cards (depending on final count).

## Future project — separate 3D-heavy portfolio (planned, not yet started)

Jo also plans to build a *second*, 3D-focused portfolio as a separate project (not an evolution of this one). Notes for that future session:

- Different email accounts for Sanity + Vercel — clean org separation from joy-portfolio.
- Tech stack target: Next.js 16 + React Three Fiber + drei + Spline (mixed approach).
- Jo has personally-made 3D assets to work with (formats and source tools TBD — likely Blender / Spline / KeyShot output).
- Asset pipeline: GLB preferred (binary GLTF). Use gltf-transform for compression. Target <2MB per hero scene.
- Render strategy: static renders as loading placeholders, interactive scenes hydrated after first paint.
- Start a fresh Cowork session for this — different scope, different decisions, different memory.

## Future enhancement — Spline 3D integration (planned, not yet started)

Jo wants to add an interactive 3D scene later (likely in the Hero background or as a feature element). Approach when starting:

- Use `@splinetool/react-spline` (npm package) — official React wrapper, cleanest integration.
- Wrap in `next/dynamic({ ssr: false })` and use a client component — Spline needs WebGL.
- Show a static fallback image while the scene loads. Pre-load critical content above the 3D layer.
- Hide on small screens (`lg:` only) — mobile devices struggle with full WebGL scenes.
- Respect `prefers-reduced-motion`.
- Test bundle size; the runtime is ~600KB-1MB gzipped. Consider iframe embed if bundle budget matters.

Typical placement options:
- Hero background — most impactful, ties to design voice
- Kit & Human dock — reinforces the "Spline 3D" tool listed
- Per-project case studies — 3D hero per project

When Jo says "let's add a Spline scene," start with: scene URL + intended placement + fallback image. Then scaffold `src/components/Hero3D.tsx` with lazy-load.

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
