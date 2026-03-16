# ABLE — Master Review #1
**Date:** 2026-03-16
**Reviewer:** Claude Code + James Cuthbert
**Trigger:** Post strategy-sprint review — first complete documentation audit
**Files audited:** All 240+ .md files in `docs/`

> This is the first actual Master Review. Not a template — a live audit. Every section below reflects real findings from reading the codebase.

---

## Phase 1: Index

**Total .md files found:** 241 (via `find docs/ -name "*.md" | wc -l`)

**Pages docs inventory:**

| Page | SPEC | 20-ANGLE | USER-JOURNEYS | COPY | PATH-TO-10 | DESIGN-SPEC | STRATEGY-REVIEW-FINAL | FINAL-20-ANGLE | FINAL-20-ANGLE-2 |
|---|---|---|---|---|---|---|---|---|---|
| profile | ✓ | ✓ | ✓ | ✓ | ✓ | **MISSING** | ✓ | ✓ | ✓ |
| admin | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| onboarding | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| landing | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| fan | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| freelancer | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

**Critical finding:** `docs/pages/profile/DESIGN-SPEC.md` does not exist. CONTEXT.md references it as existing with a score of 9.7/10. This is the artist profile — the core product. This is a P0 gap.

**Systems inventory (directories checked):**

45 system directories found. Systems with non-standard naming (no SPEC.md):

| System | Primary Doc | Has PATH-TO-10 | Has FINAL-REVIEW | Gap |
|---|---|---|---|---|
| organic-growth | ORGANIC-GROWTH.md | ✓ | ✓ | Primary doc name non-standard |
| partnerships | PARTNERSHIPS.md | ✓ | ✓ | Primary doc name non-standard |
| social-media | SOCIAL-MEDIA-PLAN.md | ✓ | ✓ | Primary doc name non-standard |
| notifications | NOTIFICATIONS.md | ✓ | ✓ | Primary doc name non-standard |
| ai-agents | AI-AGENTS.md | ✓ | ✓ | No SPEC.md — AI-AGENTS.md is the spec |
| ai-workflow | AI-WORKFLOW.md | ✗ | ✗ | Only one doc in directory |
| team | TEAM.md | ✓ | ✓ | Primary doc name non-standard |
| transcendence | WHAT-11-LOOKS-LIKE.md + 11-AUDIT.md + NEVER-SHIP.md | ✗ | ✗ | Philosophical set — different structure (by design) |
| think-out-of-the-box | ideas/ (directory only) | ✗ | ✗ | Essentially empty — P1 gap |
| founder-roadmap | (not found in file list) | ✗ | ✗ | Directory exists but no .md files in index |
| hardware-software | FREE-TOOLS-AND-APIS.md | ✗ | ✗ | Only one doc |
| tools-and-apis | (not in file list) | ✗ | ✗ | Directory exists — no files in main index |
| marketing | SPEC.md | ✓ | ✓ | Missing ANALYSIS.md |

**Systems not listed in CONTEXT.md or FILE-STRUCTURE.md (unlisted):**
- `docs/systems/founder-roadmap/` — directory exists, no indexed files
- `docs/systems/hardware-software/` — `FREE-TOOLS-AND-APIS.md` exists but not indexed
- `docs/systems/tools-and-apis/` — directory referenced in CONTEXT.md but contents not in file index
- `docs/systems/think-out-of-the-box/` — referenced in MASTER-REVIEW-PROTOCOL.md but is essentially empty

**Index status:** `docs/FILE-STRUCTURE.md` does not list `docs/systems/master-review/` (just created) — update needed.

---

## Phase 2: Contradictions Found

| # | Contradiction | Doc A says | Doc B says | Resolution | Status |
|---|---|---|---|---|---|
| C1 | Domain name | `ABLE_STRATEGY.md`: "ablemusic.co" (landing page URL, referral links) | `EXECUTION_RISK.md`: "site:able.fm", `GROWTH_STRATEGY.md`: "able.fm/campaign" | `ABLE_STRATEGY.md` uses `ablemusic.co` consistently. `GROWTH_STRATEGY.md` and `EXECUTION_RISK.md` use `able.fm`. **CONTEXT.md** uses `ablemusic.co`. STATUS.md uses `ablemusic.co`. V8_BUILD_AUTHORITY.md uses `ablemusic.co`. **Resolution: `ablemusic.co` is correct. All `able.fm` references outside of archive docs are regressions.** | Unfixed — P0 |
| C2 | Profile DESIGN-SPEC.md score | `CONTEXT.md` line 46: `docs/pages/profile/DESIGN-SPEC.md` score 9.7/10 | `docs/pages/profile/` directory: DESIGN-SPEC.md does not exist | CONTEXT.md is wrong — the file doesn't exist. The score is fictitious. **Resolution: Create `docs/pages/profile/DESIGN-SPEC.md`. Remove the score reference from CONTEXT.md until the file exists.** | Unfixed — P0 |
| C3 | Freelancer build model | `CLAUDE.md` (project): "freelancer-start.html (separate onboarding) → freelancer.html (their profile) → admin.html variant" | `V8_BUILD_AUTHORITY.md` §1.3: "shared admin.html with context-appropriate sections shown/hidden per activated layer. One profile model." | V8_BUILD_AUTHORITY.md is authoritative (explicitly states it supersedes v6 docs). CLAUDE.md is outdated on this point. **Resolution: CLAUDE.md needs updating — freelancer admin is shared admin.html with activated layers, not a separate page.** | Unfixed — P1 |
| C4 | Free tier fan cap (Colombia strategy) | `ABLE_STRATEGY.md`: "Freemium extended: Free tier with 200 fan signups (instead of 100) for Colombian artists" — listed as an **option** | `docs/systems/tiers/SPEC.md`: free tier cap is 100 fans, no regional exception | Strategy doc presents 200-fan Colombia tier as an option; tier spec makes no provision for it. **Resolution: Add a note to tiers/SPEC.md that regional cap variants are deferred to Phase 2. The 100-fan cap is the V1 spec.** | Unfixed — P1 |
| C5 | Fan cap trigger copy | `ABLE_STRATEGY.md`: "Your list is full. These are 100 people who asked to hear from you. Upgrade to keep growing." | `docs/systems/copy/SPEC.md` and STATUS.md: "Upgrade to keep growing" is a **banned phrase** | ABLE_STRATEGY.md predates the copy system and contains a phrase the copy system later banned. **Resolution: Update ABLE_STRATEGY.md's illustrative copy to use the current approved version.** | Unfixed — P1 |
| C6 | Process doc page status table | `docs/process/PROCESS.md` bottom table: "Admin — Stage 0: ✅, Stage 1: ✅, Stages 2-7: —" | `docs/STATUS.md`: admin strategy docs are complete (9.7/10) | PROCESS.md status table was last updated mid-sprint and doesn't reflect completion of admin docs. **Resolution: Update PROCESS.md status table to reflect actual sprint completion.** | Unfixed — P2 |
| C7 | Spotify import score | `CONTEXT.md`: "Spotify import — 10/10" | `docs/STATUS.md`: "Spotify import — 5.2→9.0/10" | Two different documents claim two different scores for the same system. `STATUS.md` says 9.0/10, `CONTEXT.md` says 10/10. **Resolution: Read `docs/systems/spotify-import/FINAL-REVIEW.md` and use that score as authoritative. Update CONTEXT.md.** | Unfixed — P1 |
| C8 | CRM score | `CONTEXT.md`: "CRM — 4/10 current → path to 10 in PATH-TO-10.md" | `docs/STATUS.md`: "CRM — 4→10/10 ✅" | STATUS.md claims CRM reached 10/10. CONTEXT.md still shows it at 4/10. **Resolution: CONTEXT.md is stale. Update to reflect STATUS.md score.** | Unfixed — P1 |

---

## Phase 3: Completeness Gaps

| Page / System | Missing Files | Priority | Action |
|---|---|---|---|
| profile page | `DESIGN-SPEC.md` — CONTEXT.md says it exists at 9.7/10, but it is absent | **P0** | Create `docs/pages/profile/DESIGN-SPEC.md` — the core product page cannot enter the build phase without it |
| think-out-of-the-box | The directory exists with an `ideas/` subdirectory but no content | **P1** | Populate with lateral thinking techniques and examples, or remove the directory — referenced in MASTER-REVIEW-PROTOCOL.md as a resource |
| ai-workflow | Only `AI-WORKFLOW.md` exists — no PATH-TO-10, no FINAL-REVIEW | **P2** | Add PATH-TO-10 and FINAL-REVIEW, or reclassify as a reference document (not a spec) |
| founder-roadmap | Directory exists, no indexed files visible | **P2** | Audit directory contents and either index them or move to archive |
| hardware-software | `FREE-TOOLS-AND-APIS.md` exists but is not indexed in FILE-STRUCTURE.md | **P2** | Add to FILE-STRUCTURE.md, or merge into `docs/process/TOOLS.md` |
| marketing | No ANALYSIS.md in `docs/systems/marketing/` | **P2** | The other systems all have ANALYSIS.md — add it or confirm not needed |
| profile page | No `DESIGN-SPEC.md` = the artist profile page has no build spec | **P0** | Create the spec. The page is built (able-v7.html exists) — spec needs to be reverse-engineered from the current build and then improved |
| Freelancer onboarding | `freelancer-start.html` is referenced but there is no `docs/pages/freelancer-onboarding/` directory | **P1** | Either create the page spec (Phase 2 scope) or explicitly document it as Phase 2 in STATUS.md |
| Franchise / Label tier | ABLE_STRATEGY.md mentions Label tier (£49/mo, 10 artist pages) but there is no spec for the label UX or the admin experience for managing 10 profiles | **P1** | Add Label tier UX spec to `docs/systems/tiers/SPEC.md` or create a dedicated `docs/pages/label-admin/` section |
| Spanish / bilingual product | ABLE_STRATEGY.md documents a Colombia beachhead and three localisation options. There is no `docs/systems/localisation/` spec | **P2** | Create a localisation spec before the Colombia beachhead is activated. Currently deferred to "after 50 Colombian artists" — document that decision explicitly |

---

## Phase 4: Score Summary

The following scores are drawn from `FINAL-REVIEW.md` files where they exist, or from STATUS.md/CONTEXT.md as secondary sources. Discrepancies between sources are noted.

### Pages

| Page | Score (CONTEXT.md) | Score (STATUS.md) | Source doc score | Honest assessment | Action |
|---|---|---|---|---|---|
| `start.html` (Onboarding) | 9.9/10 | 9.9/10 | FINAL-20-ANGLE-REVIEW-2.md | 9.9/10 — well-documented, all 9 stage docs present | None |
| `admin.html` | 9.7/10 | 9.7/10 | FINAL-20-ANGLE-REVIEW-2.md | 9.7/10 — all 9 stage docs present | Verify DESIGN-SPEC.md vs actual admin.html build |
| `landing.html` | 9.65/10 | 9.65/10 | FINAL-20-ANGLE-REVIEW-2.md | 9.65/10 — all 9 stage docs present | None |
| `able-v7.html` (Profile) | 9.7/10 | 9.7/10 (strategy complete) | No DESIGN-SPEC.md | **Cannot claim 9.7 without DESIGN-SPEC.md** — strategy is 9.7 but build spec is 0/10 (doesn't exist) | Create DESIGN-SPEC.md — P0 |
| `fan.html` | 9.24/10 | 9.24/10 | FINAL-20-ANGLE-REVIEW-2.md | 9.24/10 — all docs present, honest score | None |
| `freelancer.html` | 0/10 | 0/10 (Phase 2) | All 9 stage docs exist | Paradox: all docs exist, HTML file doesn't. Score is for the spec (pre-build). Honest | Clarify that freelancer score is spec-complete but build-incomplete |

### Systems

| System | CONTEXT.md Score | STATUS.md Score | Honest Assessment | Priority Action |
|---|---|---|---|---|
| Design system | 9.5/10 | 9.5→10/10 | 10/10 if PATH-TO-10 bugs are fixed | Fix admin.html L44+L1288 `#888` hardcoded hex values |
| Micro-interactions | 9.5/10 | 9.5→10/10 | 10/10 with focus ring + @view-transition | Implement the specced improvements |
| Cross-page journeys | 9.0/10 | 9.0/10 | 9.0/10 — solid but no ANALYSIS.md | Add ANALYSIS.md if not present |
| Copy system | 9.5/10 | 7.5→9.5/10 | 9.5/10 — known violations in copy need fixing | Fix 8 "dashboard" violations + toast inconsistency |
| Data architecture | 9.3/10 | 6.8→9.3/10 | 9.3/10 — live bug found (undocumented) | Confirm live bug is fixed and documented |
| SEO + OG | 9.0/10 | 5.7→9.0/10 | 9.0/10 — 2 critical bugs found | Confirm both bugs are fixed |
| Email system | 9.5/10 | 4.0→9.5/10 | 9.5/10 — solid | None immediate |
| Tier gates | 9.0/10 | 3.7→9.0/10 | 9.0/10 — full gate copy exists | None immediate |
| Spotify import | **10/10** | 5.2→9.0/10 | **Score conflict** — CONTEXT.md says 10, STATUS.md says 9.0 | Resolve: read FINAL-REVIEW.md and use that score |
| Platform admin | 7/10 | 0→7/10 | 7/10 — V1 SQL library complete, V2 UI not built | Acceptable at V1 stage |
| CRM | **4/10** (CONTEXT.md) | **10/10** (STATUS.md) | **Score conflict** — 6-point gap | Read `docs/systems/crm/FINAL-REVIEW.md` and resolve |
| World Map | 9.2/10 | 5.2→9.2/10 | 9.2/10 — P0 bugs identified | Fix: multi-moment panel, empty state, nav button size, section heading, focus trap |
| Reels/Clips | — | 7.5/10 | 7.5/10 — V1 scope reasonable | None immediate |
| Integrations | — | 4/10 | 4/10 → 8/10 after P0 build work | P0: Ticketmaster + Spotify deploy |
| Artist tools | — | 6.8/10 | 6.8/10 → 9/10 after P0 fixes | P0: shows date sort, Close Circle state, accent picker |
| Analytics | In progress | In progress | Spec exists (605 lines), PATH-TO-10 exists | Complete ANALYSIS.md and FINAL-REVIEW.md |
| Error states | In progress | In progress | Spec exists (364 lines) | Complete PATH-TO-10.md and FINAL-REVIEW.md |
| PWA | In progress | In progress | Spec exists (411 lines) | Complete PATH-TO-10.md and FINAL-REVIEW.md |
| Tiers | — | — | SPEC.md exists — comprehensive | Add ANALYSIS.md |
| Legal compliance | — | — | Has all 4 docs | Spot-check: is GDPR double opt-in captured correctly? |
| Accounting | — | — | Has all 3 docs | Verify it addresses Portugal NHR tax strategy |
| Monetisation | — | — | Has all 4 docs | Verify Close Circle Stripe Connect spec is complete |

---

## Phase 5: New Gaps Found

| # | Gap | Priority | Action | Owner |
|---|---|---|---|---|
| G1 | `docs/pages/profile/DESIGN-SPEC.md` does not exist — the core product's build spec is missing | **P0** | Create the spec. Reverse-engineer from current `able-v7.html` and FINAL-20-ANGLE-REVIEW-2.md then spec forward | James + agent |
| G2 | Domain inconsistency: `able.fm` appears in GROWTH_STRATEGY.md and EXECUTION_RISK.md. `ablemusic.co` is the correct domain per CONTEXT.md, STATUS.md, V8_BUILD_AUTHORITY.md | **P0** | Audit all docs for `able.fm` references and replace with `ablemusic.co`. One grep and fix. | Agent |
| G3 | Label tier UX is not specced. £49/mo "10 artist pages" tier has no admin experience design — how does a manager switch between artists? How does data aggregate? | **P1** | Add Label tier UX to `docs/systems/tiers/SPEC.md` §3 or create `docs/pages/label-admin/SPEC.md` | James |
| G4 | Post-release-window state is not covered in error state docs. Artist sets release date → 14 days pass → page auto-switches back to "profile" state. What if artist doesn't know? Where is the nudge? | **P1** | Add "post-release transition nudge" to `docs/systems/artist-tools/SPEC.md` and admin.html Campaign HQ spec | James + agent |
| G5 | Fan who discovers ABLE independently (not via an artist's profile) has no documented journey. If a fan searches for ABLE directly, lands on landing.html — what happens? They can't use ABLE without an artist to follow. | **P1** | Add "fan-first discovery" journey to `docs/pages/landing/USER-JOURNEYS.md` and `docs/pages/fan/USER-JOURNEYS.md` | James |
| G6 | Scalability assumptions not documented. Current architecture (localStorage-first, no backend) is fine for demo. At 5,000 fans per artist × 1,000 artists = 5M fan records. localStorage doesn't scale. Where is the localStorage→Supabase migration spec? | **P1** | `docs/systems/data-architecture/SPEC.md` mentions "flush-to-API call" but doesn't spec the migration. Create a migration runbook. | James + agent |
| G7 | `docs/systems/think-out-of-the-box/` is empty. It is referenced as a resource in the master review protocol. If it doesn't exist as a real resource, references to it are broken. | **P1** | Either populate with lateral thinking techniques relevant to ABLE, or remove all references to it | James |
| G8 | No "ABLE voice" audit of the freelancer page docs. The freelancer profile has a different product register (professional, not fan-facing) but the VOICE-BIBLE.md banned phrases still apply. Has freelancer copy been audited against the copy system? | **P1** | Run freelancer COPY.md through the copy system audit — check against `docs/systems/copy/SPEC.md` and `docs/VOICE-BIBLE.md` | Agent |
| G9 | No spec for what happens when Supabase is down. Error states spec covers localStorage and UI errors but not backend unavailability during live use. | **P2** | Add "backend unavailable" state to `docs/systems/error-states/SPEC.md` | Agent |
| G10 | Colombia localisation decision is documented in ABLE_STRATEGY.md (Option A: English only for V1) but the trigger condition for switching to bilingual ("when 50 Colombian artists are active") is not tracked anywhere — no metric, no owner, no review date | **P2** | Create `docs/systems/localisation/SPEC.md` that documents Option A decision, the 50-artist trigger, and what bilingual means in practice | James |

---

## Phase 6: Beyond-10 Candidates

Systems that claim 10/10 and were challenged for a 10.5+:

| Document | Current Claim | Challenge | Potential 10+ | Added to PATH-TO-10 |
|---|---|---|---|---|
| `docs/systems/spotify-import/SPEC.md` | 10/10 | Does the import spec cover: what happens when the artist's Spotify catalogue is in a non-Latin script (Japanese, Arabic, Korean)? Does the spec address rate limiting when 50 artists all do imports simultaneously at launch? | 10.5: Add non-Latin character handling + concurrent rate limit spec | No — needs research first |
| `docs/systems/copy/SPEC.md` | 9.5/10 | Is the voice bible tested against real artist feedback? The ABLE voice is designed for a 22–38 year old UK independent — but the Colombia beachhead has a different cultural register. Does the copy spec acknowledge this? | 10+: Cultural register variants for Colombia market | No — needs input from Colombian artists |
| `docs/pages/onboarding/FINAL-20-ANGLE-REVIEW-2.md` | 9.9/10 | The onboarding is specced for a solo artist. What about a band (2–5 members)? Who owns the ABLE profile? Which email is the login? What's the bio voice for a band? | 10.5: Band/collective onboarding variant | No — deferred to Phase 2 |
| `docs/systems/email/SPEC.md` | 9.5/10 | The email system is specced for one-to-many broadcasts. What about the artist replying individually to a fan who responds to a broadcast? ABLE's philosophy is direct relationship — can artists respond 1:1? | 10+: Direct fan reply flow | No — depends on Supabase email backend |

---

## Overall Assessment

```
Total .md files in docs/: ~241
Pages at all 9 stages complete: 5/6 (profile missing DESIGN-SPEC.md)
Systems with full standard doc set: ~32/45 (some use non-standard naming by design)
Systems at 9+ score: ~14
Systems at 10/10 (claimed): 3 (Spotify import claimed; design system + micro-interactions claimed post PATH-TO-10)
Systems below 7/10: 3 (analytics in-progress, error-states in-progress, pwa in-progress)
Score conflicts between CONTEXT.md and STATUS.md: 2 (Spotify import, CRM)
Critical gaps (P0): 2 (profile DESIGN-SPEC.md missing, domain name inconsistency)
High-priority gaps (P1): 8
Contradictions fixed this review: 0 (identified — not yet fixed — this review is the diagnosis)
Next review: 2026-04-15 (30-day cycle) or earlier if profile DESIGN-SPEC.md is completed
```

---

## Immediate Actions (P0 — before any build work begins)

**Action 1: Create `docs/pages/profile/DESIGN-SPEC.md`**
The artist profile is the core product. The build spec is missing. A developer working on `able-v7.html` has no authoritative spec to follow. This is the highest-priority gap in the entire documentation system.

The spec should be created by:
1. Reading `docs/pages/profile/FINAL-20-ANGLE-REVIEW-2.md` and `PATH-TO-10.md` (both exist and are detailed)
2. Inspecting current `able-v7.html` build state to capture what's implemented
3. Writing the spec forward from the PATH-TO-10 gap analysis

**Action 2: Resolve domain name inconsistency**
`able.fm` appears in at least 3 strategy docs. `ablemusic.co` is the correct domain per all primary authority docs. Run a grep across all docs and replace `able.fm` with `ablemusic.co` except in archive docs. Takes 10 minutes.

**Action 3: Update CONTEXT.md scores**
CONTEXT.md shows CRM at 4/10 (STATUS.md says 10/10) and Spotify import at 10/10 (STATUS.md says 9.0/10). Read the FINAL-REVIEW.md for both systems and correct CONTEXT.md.

---

## "Try Again" Schedule

First follow-up review: 2026-04-16 (30 days)
Target by then: Profile DESIGN-SPEC.md created, domain inconsistency fixed, score conflicts resolved
Definition of done: Two consecutive reviews with zero new P0 or P1 gaps
Current status: Review #1 of N (N ≥ 3 to reach "done")
