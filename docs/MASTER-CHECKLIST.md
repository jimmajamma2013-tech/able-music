# ABLE — Master Checklist
**The definitive "nothing gets missed" document. Read this at the start of every work session.**
*Updated: 2026-03-16 | Update at the end of every session.*

---

## Part 1: Session Start (5 minutes — every session, no exceptions)

- [ ] Read `CONTEXT.md` — active files, tokens, authority order, copy rules
- [ ] Read `docs/STATUS.md` — what's built, what's next, known issues
- [ ] Confirm current branch: `git branch`
- [ ] Confirm clean working tree: `git status`
- [ ] If BUILD session: take a Playwright screenshot of the page being built (confirms MCP is live)
- [ ] If STRATEGY session: check Part 2 below — confirm which systems still need docs

---

## Part 2: Strategy Completeness Tracker

The full process is defined in `docs/process/PROCESS.md`. For pages, the full 8-stage process produces 9 files per page. For systems, a 4-file set is the minimum (ANALYSIS → SPEC → PATH-TO-10 → FINAL-REVIEW).

**Column key:**
- ANALYSIS = 20-angle or equivalent analysis exists
- SPEC = full spec written
- USER-JOURNEYS = user journey maps written
- PATH-TO-10 = systematic path-to-10 written
- STRATEGY-REVIEW = strategy review final written
- FINAL-ANGLE = FINAL-20-ANGLE-REVIEW.md written
- FINAL-ANGLE-2 = FINAL-20-ANGLE-REVIEW-2.md written (mandatory — see PROCESS.md Stage 7C)
- COPY = COPY.md written
- DESIGN-SPEC = DESIGN-SPEC.md written
- SCORE = best available score from final review doc

### Pages

| Page | SCORE | ANALYSIS | SPEC | USER-JOURNEYS | COPY | PATH-TO-10 | DESIGN-SPEC | STRATEGY-REVIEW | FINAL-ANGLE | FINAL-ANGLE-2 |
|---|---|---|---|---|---|---|---|---|---|---|
| `able-v7.html` (profile) | 9.7 | ✅ | ✅ | ✅ | ✅ | ✅ | ⏳ | ✅ | ✅ | ✅ |
| `admin.html` | 8.8 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `start.html` (onboarding) | 8.8 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `landing.html` | 9.5 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `fan.html` | 8.45 | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ | ✅ |
| `freelancer.html` | 9.2 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

Note: `able-v7.html` DESIGN-SPEC is the gap. The page is built but the spec was superseded during v7 development — see `docs/pages/profile/` for current state.

### Systems (4-file minimum: ANALYSIS + SPEC + PATH-TO-10 + FINAL-REVIEW)

| System | SCORE | ANALYSIS | SPEC | PATH-TO-10 | FINAL-REVIEW | Notes |
|---|---|---|---|---|---|---|
| Design system | — | ✅ `DESIGN_SYSTEM_SPEC.md` | ✅ | ✅ `DESIGN_SYSTEM_PATH_TO_10.md` | — | Bugs: admin.html L44+L1288 `#888` |
| Micro-interactions | — | ✅ `MICRO_INTERACTIONS_SPEC.md` | ✅ | ✅ `MICRO_INTERACTIONS_PATH_TO_10.md` | — | Focus ring + @view-transition specced |
| Cross-page journeys | — | ✅ | ✅ `CROSS_PAGE_JOURNEYS.md` | ✅ | — | |
| Copy system | 7/10 | ✅ | ✅ | ✅ | ✅ | P0 bugs → Part 4 |
| Data architecture | 9.5/10 | ✅ | ✅ | ✅ | ✅ | Live bug: `able_profile` key conflict |
| SEO + OG | 9.0/10 | ✅ | ✅ | ✅ | ✅ | 2 critical bugs → Part 3 |
| Email | 4.0/10 | ✅ | ✅ | ✅ | ✅ | Phase 2 build — Resend |
| Tier gates | 3.7/10 | ✅ | ✅ | ✅ | ✅ | Full gate copy + upgrade sheet written |
| Spotify import | 9.0/10 | ✅ | ✅ | ✅ | ✅ | Function exists but not fully built |
| Analytics | 9.5/10 | ✅ | ✅ | ✅ | ✅ | |
| Error states | 9.0/10 | ✅ | ✅ | ✅ | ✅ | |
| PWA | 8.5/10 | ✅ | ✅ | ✅ | ✅ | |
| AI copy | 8.5/10 | ✅ | ✅ | ✅ | ✅ | |
| oEmbed proxy | 8.5/10 | ✅ | ✅ | ✅ | ✅ | |
| Platform admin | 6.0/10 | ✅ | ✅ | ✅ | ✅ | SQL library + V2 spec written |
| World Map | 10/10 | ✅ | ✅ | ✅ | ✅ | P0 bugs identified |
| Explainers | 5.5/10 | ✅ | ✅ | ✅ | ✅ | Spec complete — build pending |
| Growth loop | 7.0/10 | ✅ | ✅ | ✅ | ✅ | |
| Launch sequence | 7.5/10 | ✅ | ✅ | ✅ | ✅ | |
| QA testing | 9.0/10 | ✅ | ✅ | ✅ | ✅ | |
| Legal compliance | 8.5/10 | ✅ | ✅ | ✅ | ✅ | Gates in PRE-BUILD-CHECKLIST.md |
| Competitive | 8.5/10 | ✅ | ✅ | ✅ | ✅ | |
| Brand identity | 8.5/10 | ✅ | ✅ | ✅ | ✅ | |
| Artist success | 8.5/10 | ✅ | ✅ | ✅ | ✅ | |
| Killer features | 8.0/10 | ✅ | ✅ | ✅ | ✅ | |
| Reels feed | 7.5/10 | ✅ | ✅ | ✅ | ✅ | Phase 2 |
| CRM | 4.0/10 | ✅ | ✅ | ✅ | — | FINAL-REVIEW missing |
| Integrations | — | ✅ | ✅ | ✅ | — | FINAL-REVIEW missing |
| Transcendence | — | ✅ `11-AUDIT.md` | ✅ `WHAT-11-LOOKS-LIKE.md` | — | — | Special format — no PATH-TO-10 |
| Personas | — | ✅ `ARTIST.md` | — | — | — | Only artist persona written |

**Gaps requiring action:**
- `crm/FINAL-REVIEW.md` — missing
- `integrations/FINAL-REVIEW.md` — missing
- `transcendence/PATH-TO-10.md` — not applicable (different format) but review if needed
- `personas/` — only ARTIST.md written; FAN and FREELANCER personas missing
- `able-v7.html` — DESIGN-SPEC.md not in `/docs/pages/profile/` (built from v6 spec, needs v7 update)

---

## Part 3: Known Bugs — Fix Before Build

Every confirmed bug found across all strategy docs. Fix these before touching anything else.

### P0 — Ship blockers (must fix before any page goes to a real user)

| # | File | Location | Symptom | Fix |
|---|---|---|---|---|
| B1 | `admin.html` | L44 | `--dash-t3: #888888` fails WCAG AA contrast | Change to `#777777` |
| B2 | `admin.html` | L1288 | Hardcoded `#888` fails WCAG AA | Change to `#777777` |
| B3 | `able-v7.html` | OG meta | OG image broken for file-picker uploads (blob: URI in meta tag) | Only write OG image tag when URL is a real absolute URL |
| B4 | `able-v7.html` | `<meta name="description">` | Never updated dynamically from profile data | Write `updateMetaDescription(profile.bio)` on profile load |
| B5 | `admin.html` + `start.html` | localStorage | `able_profile` and `able_v3_profile` key conflict — wizard writes to one, admin reads the other | Canonicalise to `able_v3_profile` everywhere; update start.html to write to the correct key |
| B6 | `admin.html`, `start.html`, `landing.html` | Focus styles | Focus ring glow pattern missing — flat 2px ring instead of spec'd glow | Implement per `docs/systems/MICRO_INTERACTIONS_PATH_TO_10.md` |
| B7 | `start.html` (Netlify function) | Spotify import | Function exists (`netlify/functions/spotify-import.js`) but the import flow is not complete | Build the full import path per `docs/systems/spotify-import/SPEC.md` |

### Fixed — do not reintroduce

| # | What was fixed | Where | Session |
|---|---|---|---|
| F1 | `level:'superfan'` → `level:'core'` | `admin.html` | Session 3 |
| F2 | "dashboard" removed from 8 user-facing locations | All active files | Sessions 4–5 |
| F3 | Google OAuth button removed — magic link only | `landing.html`, `start.html` | Sessions 3–5 |
| F4 | "Most popular" badge removed from pricing | `landing.html` | Session 4 |
| F5 | "Unlock" / "get started" / "convert" copy swept | All active files | Session 4 |

---

## Part 4: Copy Fixes — P0 Status

From `docs/systems/copy/PATH-TO-10.md`. These must be done before any page goes live.

| Fix | File | Status | Notes |
|---|---|---|---|
| P0.2 `<title>Dashboard` → `<title>ABLE` | `admin.html` | ✅ Done | Confirmed session 5 |
| P0.3 "dashboard" in done screen | `start.html` L1291 | ✅ Done | "Click it and you'll see your page." |
| P0.4 "Full dashboard" in owner context bar | `able-v7.html` L9619 | ✅ Done | Confirmed session 5 |
| P0.5 "dashboard" in FAQ | `landing.html` L1525 | ✅ Done | Confirmed session 5 |
| P0.6 `level:'superfan'` → `level:'core'` | `admin.html` | ✅ Done | Confirmed session 3 |
| P0.7 Toast copy standardisation | `admin.html` | ⏳ Pending | Audit all `showToast()` calls — ~8–12 changes |
| P0.8 Admin form placeholder copy audit | `admin.html` | ⏳ Pending | ~15–20 placeholders to review |
| P0.9 Greeting system verification | `admin.html` | ⏳ Pending | Verify "Good to see you, [Name]." is wired |

**P1 (medium priority — before public launch):**
- P1.1 Empty state copy audit (shows, releases, snap cards, connections, merch, support)
- P1.2 Toast copy audit across all files — no "Success!", "Error!", exclamation marks
- P1.3 Error state copy spec for admin implemented
- P1.4 Motivation milestone cards implemented (fan #1, #10, #50, #100)
- P1.5 Dynamic admin greeting states (7 states per `docs/pages/admin/COPY.md`)
- P1.6 fan.html copy — pull from `docs/pages/fan/COPY.md`, not written inline

---

## Part 5: Pre-Build Gates Summary

Full detail in `docs/PRE-BUILD-CHECKLIST.md`. Summary of gate status:

| Gate category | Status | Key dependency |
|---|---|---|
| Git hygiene (fresh branch, .gitignore, private repo) | ⏳ | Build branch must be cut from `main` |
| Playwright confirmed working | ⏳ | Run smoke test before first build session |
| Node parse-check pattern works | ⏳ | `node -e "new Function('const x=1;')"` → exit 0 |
| Supabase tables created + RLS configured | ⏳ | Decision: V1 localStorage or Supabase from day 1? |
| Netlify connected + env vars set | ⏳ | SUPABASE_URL, SERVICE_ROLE_KEY, RESEND_API_KEY |
| Domain confirmed + DNS pointed | ⏳ | ablemusic.co — confirm which is live |
| Founder's profile live + looks excellent | ⏳ | Required for landing.html social proof demo |
| Demo data fixtures written (profile, fans, artwork) | ⏳ | Needed for Playwright tests |
| Privacy policy published at `/privacy` | ⏳ | **Required before real users touch the product** |
| Terms of service published at `/terms` | ⏳ | **Required before real users touch the product** |
| Fan consent capture confirmed (`consent:true`) | ⏳ | GDPR — not optional |
| GDPR delete flow tested | ⏳ | Platform admin SQL query ready |
| Real device tested — iPhone Safari | ⏳ | Glass theme + spring physics must test on real hardware |
| File sizes within budget (gzip check) | ⏳ | Budgets: v7 120kB, admin 80kB, start 60kB, landing 40kB, fan 30kB |
| Copy P0 violations fixed (Part 4 above) | ⏳ | P0.7, P0.8, P0.9 still outstanding |
| Social proof numbers are real (or removed) | ⏳ | Landing.html shows "12,000+ artists" — placeholder |
| No console errors on any active page | ⏳ | Check before any session ends |

**Go/No-Go gate:** All of the above must be ✅ before opening to real artists. See `docs/PRE-BUILD-CHECKLIST.md` §13 for the full gate table.

---

## Part 6: Never-Forget Rules

These 10 rules are non-negotiable. They cannot be overridden by task pressure or "just this once" reasoning.

1. **No destructive git** — no force-push, no `rm -rf`, no `reset --hard` without explicit instruction from James.
2. **Mobile-first** — 44px minimum tap targets, no horizontal scroll at 375px, test keyboard doesn't break layout.
3. **All 4 themes must work** after any CSS change — Dark, Light, Glass, Contrast.
4. **No "dashboard" in user-facing copy** — not in titles, CTAs, toasts, empty states, or greeted copy.
5. **No "superfan" anywhere** — internal key is `core`, display label is `Core fan`.
6. **No exclamation marks** in admin or dashboard copy — not in toasts, headings, empty states, or greeetings.
7. **Commit after every logical chunk** — descriptive message, one thing per commit.
8. **Parse-check every JS block** after editing — `node -e "new Function(src)"` catches syntax errors before Playwright does.
9. **Playwright after every significant section** — screenshot at 375px, 390px, 768px, 1280px.
10. **Every string checked against `docs/systems/copy/SPEC.md`** before shipping — if the copy sounds like SaaS, rewrite it.

**Extended rules (from `docs/process/PROCESS.md`):**
- Copy before design. Never spec a layout before copy is written.
- 20-angle scoring before building. Never write code on an unscored page/section.
- User journeys before copy. Never write for a hypothetical user.
- Research before angles. Never score from assumptions.
- Honest ceilings. Never inflate a score. Social proof at 2 isn't 8 because you wrote it in the spec.
- One page at a time. Finish all stages before starting the next.

---

## Part 7: Build Session End Checklist

Do not close a session without completing all of the following:

- [ ] All changes committed with descriptive message (one logical chunk per commit)
- [ ] `docs/STATUS.md` updated — session summary written, newly discovered issues added
- [ ] Playwright smoke test run on every changed page — screenshots at 375px and 1280px
- [ ] Items completed in this session marked ✅ in Part 2 (strategy tracker) and Part 4 (copy fixes)
- [ ] Any new bugs found documented in `docs/STATUS.md` known issues section
- [ ] Any new copy violations found added to Part 4 above
- [ ] File sizes checked against budget if new content was added
- [ ] Update the date at the top of this file

---

## Quick reference: Active files

| File | What it is | Spec authority |
|---|---|---|
| `able-v7.html` | Artist public profile | `docs/pages/profile/DESIGN-SPEC.md` (pending update) |
| `admin.html` | Artist dashboard | `docs/pages/admin/DESIGN-SPEC.md` |
| `start.html` | Onboarding wizard | `docs/pages/onboarding/DESIGN-SPEC.md` |
| `landing.html` | Marketing landing page | `docs/pages/landing/DESIGN-SPEC.md` |
| `fan.html` | Fan dashboard | `docs/pages/fan/SPEC.md` (no DESIGN-SPEC yet) |
| `shared/able.js` | Shared JS utilities | — |
| `shared/style.css` | Shared CSS | `docs/systems/DESIGN_SYSTEM_SPEC.md` |

**Never touch:** `index.html`, `_archive/*`, `design-references/*`, `mockups/*`, `screenshots/*`

---

*Read `CONTEXT.md` first. Then this. Then build.*
