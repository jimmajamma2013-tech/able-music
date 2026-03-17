# Dimension J10 — Documentation Currency
**Category:** Launch Readiness & Cross-Page Coherence
**Phase:** 10 (Launch)
**Status:** Not started

*Documentation that is stale is worse than no documentation — it misleads future development. ABLE's build is guided by CONTEXT.md (session orientation), docs/STATUS.md (build state), CLAUDE.md (rules), and the V8 strategy docs. Before the first real artist uses the product, every document must accurately reflect reality: no referenced files that don't exist, no scores that haven't been updated, no active files listed that are actually archived. This dimension ensures the documentation system stays truthful as a prerequisite for confident autonomous development.*

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Verify CONTEXT.md active file list matches files actually at those paths on disk | DOC | 5 | 1 | L | 1 |
| 2 | Update docs/STATUS.md with the current wave completion state after each session | DOC | 5 | 1 | L | 1 |
| 3 | Verify Supabase project URL in docs is current and points to the live project | DOC | 4 | 1 | L | 1 |
| 4 | Verify Supabase anon key in docs matches the key currently in the HTML files | DOC | 4 | 1 | L | 1 |
| 5 | Confirm that able-v7.html is correctly listed as archived, and able-v8.html is the active profile | DOC | 5 | 1 | L | 1 |
| 6 | Update CONTEXT.md score column for all active pages after each significant session | DOC | 4 | 1 | L | 1 |
| 7 | Remove or update any reference in docs to files that have been moved to _archive/ | DOC | 4 | 1 | L | 1 |
| 8 | Ensure the 100-DIMENSIONS.md master sequence table matches the actual phase ordering in current strategy | DOC | 4 | 1 | L | 2 |
| 9 | Verify docs/systems/data-architecture/SPEC.md localStorage schema matches the actual keys in the HTML | DOC | 4 | 2 | L | 2 |
| 10 | Ensure CLAUDE.md active files table is accurate — able-v8.html not able-v7.html | DOC | 5 | 1 | L | 1 |
| 11 | Confirm all V8 DESIGN-SPEC.md files reference able-v8.html not an older version | DOC | 4 | 1 | L | 2 |
| 12 | Audit 100-DIMENSIONS.md for any dimension descriptions that have been made obsolete by completed work | DOC | 3 | 2 | L | 3 |
| 13 | Update STATUS.md known issues section after each fix | DOC | 4 | 1 | L | 1 |
| 14 | Confirm that docs/GPT-REVIEW/SESSION-16-03-26-FULL-REVIEW.md is still the most recent GPT review | DOC | 3 | 1 | L | 2 |
| 15 | Add a "Last verified" date to each doc file that references specific file paths | DOC | 3 | 2 | L | 4 |
| 16 | Remove stale "Next steps" sections from docs that have been superseded by the 100-DIMENSIONS framework | DOC | 3 | 2 | L | 4 |
| 17 | Verify that the token values in CONTEXT.md match the actual tokens in the HTML :root declarations | DOC | 4 | 2 | L | 2 |
| 18 | Confirm CROSS_PAGE_JOURNEYS.md reflects the actual localStorage data flow between pages | DOC | 3 | 2 | L | 3 |
| 19 | Verify DESIGN_SYSTEM_SPEC.md radius tokens match the --r-xs/sm/md/lg/xl/pill values in each file | DOC | 3 | 1 | L | 2 |
| 20 | Ensure DESIGN_SYSTEM_SPEC.md duration tokens match the actual --dur-fast/dur/dur-slow values per page | DOC | 3 | 1 | L | 2 |
| 21 | Verify the tier gate features list in docs matches the actual features gated in admin.html | DOC | 4 | 2 | L | 3 |
| 22 | Confirm that the 4 campaign states in docs match the actual stateOverride values in JS | DOC | 4 | 1 | L | 2 |
| 23 | Update docs/STATUS.md "What's built" checklist to reflect current completion state | DOC | 4 | 1 | L | 1 |
| 24 | Remove any "TODO" or "TBD" in CONTEXT.md that has since been resolved | DOC | 3 | 1 | L | 3 |
| 25 | Ensure V6_BUILD_AUTHORITY.md decisions that were superseded by V8 docs are marked as such | DOC | 3 | 2 | L | 4 |
| 26 | Confirm netlify.toml redirect rules in docs/systems match the actual netlify.toml file | DOC | 4 | 1 | L | 2 |
| 27 | Verify that the GPT session reviews in docs/GPT-REVIEW/ are named with ISO dates (YYYY-MM-DD format) | DOC | 2 | 1 | L | 4 |
| 28 | Confirm the domain "ablemusic.co" is referenced consistently (not "able.music.co" or other variants) | DOC | 3 | 1 | L | 2 |
| 29 | Update the brand token values in DESIGN_SYSTEM_SPEC.md if any were updated in the most recent session | DOC | 3 | 1 | L | 2 |
| 30 | Verify the Resend API key placeholder in docs is the correct placeholder format (not the real key) | DOC | 4 | 1 | H | 1 |
| 31 | Ensure admin_visit_dates localStorage key is documented in data-architecture/SPEC.md | DOC | 3 | 1 | L | 2 |
| 32 | Confirm able_dismissed_nudges localStorage key is documented with its expected values | DOC | 3 | 1 | L | 2 |
| 33 | Confirm able_starred_fans localStorage key is documented correctly | DOC | 3 | 1 | L | 2 |
| 34 | The 4 theme names (Dark, Light, Glass, Contrast) must be used consistently across all docs | DOC | 3 | 1 | L | 2 |
| 35 | Ensure 7 vibe names are listed identically in all relevant docs (Electronic, Hip Hop, R&B, Indie, Pop, Rock, Acoustic) | DOC | 3 | 1 | L | 2 |
| 36 | Verify that V8 DESIGN-SPEC.md describes the three CTA zones correctly matching the actual implementation | DOC | 3 | 2 | L | 3 |
| 37 | Confirm MICRO_INTERACTIONS_SPEC.md lists interactions that are actually built, with status notes | DOC | 3 | 2 | L | 4 |
| 38 | Remove references to files in docs/archive/superseded-v5/ from any non-archive doc context | DOC | 2 | 1 | L | 4 |
| 39 | Ensure docs/systems/copy/SPEC.md banned phrase list matches the most recent version in CLAUDE.md | DOC | 4 | 1 | L | 2 |
| 40 | Confirm the email spec in docs/systems/email/SPEC.md reflects the Resend provider, not any legacy provider | DOC | 3 | 1 | L | 3 |
| 41 | Verify PWA manifest icon paths in docs match actual icon files at those paths | DOC | 3 | 1 | L | 3 |
| 42 | Check that all doc "See also" cross-references point to files that exist | DOC | 3 | 1 | L | 3 |
| 43 | Add a changelog section to STATUS.md tracking what changed in each session | DOC | 3 | 2 | L | 4 |
| 44 | Confirm that the docs/audit/100-DIMENSIONS.md master sequence is still the authoritative ordering | DOC | 4 | 1 | L | 2 |
| 45 | Ensure docs/audit/dimensions/ contains exactly 100 files (one per dimension) | DOC | 4 | 1 | L | 2 |
| 46 | Confirm the phase numbering in docs/audit/dimensions/ files matches 100-DIMENSIONS.md sequence | DOC | 3 | 2 | L | 3 |
| 47 | Verify that CONTEXT.md "current score" column reflects the product score from the most recent GPT review | DOC | 4 | 1 | L | 2 |
| 48 | Ensure the "Date created" on each V8 DESIGN-SPEC.md reflects when V8 work began (not v6 era) | DOC | 2 | 1 | L | 4 |
| 49 | Confirm CROSS_PAGE_JOURNEYS.md describes the actual start.html → admin.html data handoff | DOC | 3 | 2 | L | 3 |
| 50 | Check all doc headings for the word "v3", "v6", "v7" — update to "v8" where the content describes current state | DOC | 3 | 2 | L | 3 |
| 51 | Ensure the Netlify function names in docs match the actual filenames in netlify/functions/ | DOC | 3 | 1 | L | 3 |
| 52 | Confirm PLATFORM_STRATEGY.md tier pricing (Free, £9, £19, £49) matches landing.html pricing section | DOC | 4 | 1 | L | 2 |
| 53 | Verify that the font stack documentation in DESIGN_SYSTEM_SPEC.md matches fonts loaded in HTML | DOC | 3 | 1 | L | 2 |
| 54 | Ensure no doc references "Plus Jakarta Sans" for V8 profile — that font is admin-only | DOC | 3 | 1 | L | 2 |
| 55 | Confirm the spring easing cubic-bezier in docs matches the actual value in CSS | DOC | 3 | 1 | L | 2 |
| 56 | Update 00_AUTHORITY_ORDER.md to reflect V8 docs layer at the top, V6 as fallback | DOC | 3 | 1 | L | 3 |
| 57 | Ensure all STATUS.md "known issues" that are fixed are removed or marked resolved | DOC | 4 | 1 | L | 2 |
| 58 | Confirm the "what's next" section in STATUS.md reflects the actual next dimension in the master sequence | DOC | 4 | 1 | L | 1 |
| 59 | Verify that CONTEXT.md "data architecture" section matches able_v3_profile schema in admin.html | DOC | 4 | 2 | L | 2 |
| 60 | Confirm no doc references the old "able_profile" key — only "able_v3_profile" is the canonical key | DOC | 4 | 1 | L | 2 |
| 61 | Check that the three CTA zone names ("Hero CTAs", "Quick Action pills", "Section Actions") are used consistently | DOC | 3 | 1 | L | 2 |
| 62 | Ensure the "global dedupe rule" is documented in at least one canonical spec doc | DOC | 3 | 1 | L | 3 |
| 63 | Verify GDPR data controller description in I1-related docs matches the actual consent copy in V8 | DOC | 4 | 2 | L | 3 |
| 64 | Confirm freelancer layer docs reference V8 ARTIST-PROFILE-RECOMMENDATIONS-DOCTRINE.md as primary | DOC | 3 | 1 | L | 3 |
| 65 | Ensure PRODUCT_HIERARCHY_AND_TRUST.md priority order is still accurate after V8 feature additions | DOC | 2 | 2 | L | 5 |
| 66 | Check that all doc dates are in ISO format (YYYY-MM-DD) | DOC | 2 | 2 | L | 5 |
| 67 | Confirm the visual wave system (Waves 0–8) is documented in STATUS.md or CONTEXT.md | DOC | 3 | 1 | L | 3 |
| 68 | Verify that any doc referencing "start.html → able_v3_profile" data flow is accurate | DOC | 4 | 1 | L | 2 |
| 69 | Ensure the four-page architecture (V8, admin, start, landing) is documented in CONTEXT.md | DOC | 4 | 1 | L | 2 |
| 70 | Remove any doc references to "Linktree" or competitor names in internal technical docs | DOC | 2 | 1 | L | 4 |
| 71 | Confirm the PWA service worker cache strategy in docs matches the actual sw.js implementation | DOC | 3 | 2 | L | 3 |
| 72 | Ensure the OG card paths in seo-og/SPEC.md match the actual file locations | DOC | 3 | 1 | L | 3 |
| 73 | Verify error-states/SPEC.md covers the current error surfaces (localStorage corruption, quota, network) | DOC | 3 | 2 | L | 4 |
| 74 | Confirm the Spotify import function allowlist in h4 docs matches what's in the actual function | DOC | 3 | 2 | L | 3 |
| 75 | Ensure the analytics event schema in docs/systems/analytics/SPEC.md matches actual able_clicks structure | DOC | 4 | 2 | L | 3 |
| 76 | Verify there are no broken internal links in any doc (links to section headers that were renamed) | DOC | 3 | 2 | L | 4 |
| 77 | Check all "Last updated:" dates in doc files — update stale ones | DOC | 3 | 1 | L | 3 |
| 78 | Ensure CONTEXT.md "active files" table is the definitive list used at the start of every session | DOC | 5 | 1 | L | 1 |
| 79 | Confirm no doc describes a feature as "planned" that is now built | DOC | 4 | 1 | L | 2 |
| 80 | Ensure the ABLE brand accent red (#e05242) is documented as the default, with note it is artist-overrideable | DOC | 3 | 1 | L | 3 |
| 81 | Verify admin.html amber accent (#f4b942) is documented as admin-only, distinct from artist accent | DOC | 3 | 1 | L | 3 |
| 82 | Check that all docs are written assuming able-v8.html is the profile file (not v3/v6/v7) | DOC | 5 | 2 | L | 1 |
| 83 | Confirm the shadow token additions (--shadow-lift, --shadow-deep, etc.) are documented in DESIGN_SYSTEM_SPEC.md | DOC | 3 | 1 | L | 3 |
| 84 | Confirm --r-xs token addition is documented in DESIGN_SYSTEM_SPEC.md | DOC | 3 | 1 | L | 3 |
| 85 | Check that CONTEXT.md session history section is updated with the most recent session summary | DOC | 3 | 1 | L | 2 |
| 86 | Ensure STATUS.md "Current scores" reflect any new GPT review scores | DOC | 4 | 1 | L | 2 |
| 87 | Verify that the master wave sequence (Waves 0–8) is accurately described in STATUS.md | DOC | 3 | 1 | L | 2 |
| 88 | Remove any doc reference to "able-merged.html" as an active file — it is archive only | DOC | 3 | 1 | L | 1 |
| 89 | Ensure all file paths in docs use the correct relative path from the project root | DOC | 3 | 2 | L | 3 |
| 90 | Confirm the git branch strategy (main, v2-simplified) is documented in STATUS.md or CONTEXT.md | DOC | 2 | 1 | L | 4 |
| 91 | Verify the Resend sender domain in docs matches the actual DNS records to be configured | DOC | 3 | 2 | M | 3 |
| 92 | Ensure the freelancer layer spec is marked as Phase 2 and not implied to be currently built | DOC | 3 | 1 | L | 3 |
| 93 | Check that docs/systems/tier-gates/SPEC.md feature list matches current admin.html gate implementations | DOC | 4 | 2 | L | 3 |
| 94 | Confirm the 100-DIMENSIONS master sequence is the single authoritative source for "what to do next" | DOC | 4 | 1 | L | 2 |
| 95 | Ensure STATUS.md is updated within the same commit as any significant feature work | DOC | 4 | 1 | L | 1 |
| 96 | Verify that CONTEXT.md is always the first file read at session start — add this instruction to the top of STATUS.md | DOC | 3 | 1 | L | 2 |
| 97 | Confirm docs/audit/ directory structure is documented — 100-DIMENSIONS.md as index, dimensions/ as individual files | DOC | 3 | 1 | L | 3 |
| 98 | Ensure no internal note (FIXME, TODO, HACK) survives in docs without an associated dimension reference | DOC | 3 | 2 | L | 4 |
| 99 | Run docs/STATUS.md review as the final action before any push to origin | DOC | 5 | 1 | L | 1 |
| 100 | Treat documentation currency as a lagging indicator of build health — if STATUS.md is stale, the build is at risk | DOC | 5 | 1 | L | 1 |
