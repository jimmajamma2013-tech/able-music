# Dimension J10 — Documentation Currency
**Category:** Launch Readiness & Cross-Page Coherence
**Phase:** 10 (Launch)
**Status:** Not started

`docs/STATUS.md` and `CONTEXT.md` accurately reflect the current build state. No referenced files are missing. No scores are stale. The Supabase project URL and anon key are current. The active file list matches reality. Full compliance means that any developer picking up the project for the first time — or Claude Code starting a new session — gets an accurate, complete picture of where ABLE stands. Stale documentation causes compounding errors: Claude recommends changes to files that no longer exist, references localStorage keys that have been renamed, or reports a feature as complete that has since regressed. Documentation is not an afterthought; it is the single source of truth that prevents the project from becoming incoherent across sessions.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Confirm `CONTEXT.md` active files list names `able-v7.html` as the artist profile — not `able-v8.html` (no such file exists) | DOC | 5 | 1 | H | 1 |
| 2 | Confirm `CONTEXT.md` active files list does not reference `able-v3.html`, `able-v4.html`, `able-v5.html`, or `able-v6.html` as active | DOC | 5 | 1 | H | 1 |
| 3 | Confirm `CONTEXT.md` Supabase project URL is `https://jgspraqrnjrerzhnnhtb.supabase.co` — verify it is still live | DOC | 4 | 1 | M | 2 |
| 4 | Confirm `CONTEXT.md` Supabase anon key matches the current publishable key in the Supabase dashboard | DOC | 4 | 1 | M | 2 |
| 5 | Confirm `CONTEXT.md` localStorage key list matches the keys currently used in the active files — run a grep audit | DOC | 5 | 2 | H | 1 |
| 6 | Confirm `CONTEXT.md` does not reference `able_profile` (legacy) without noting it is superseded by `able_v3_profile` | DOC | 4 | 1 | M | 2 |
| 7 | Confirm `CONTEXT.md` "Tokens" section reflects the current CSS custom property names used in `able-v7.html` | DOC | 4 | 1 | M | 2 |
| 8 | Confirm `CONTEXT.md` "Active rules" section has not been silently overridden by `CLAUDE.md` changes | DOC | 3 | 1 | L | 3 |
| 9 | Confirm `docs/STATUS.md` correctly lists all four active HTML files with their current build status | DOC | 5 | 1 | H | 1 |
| 10 | Confirm `docs/STATUS.md` was last updated after the most recent session — check the `Last updated` date at the top | DOC | 5 | 1 | H | 1 |
| 11 | Confirm `docs/STATUS.md` "Known issues" section is current — no issues marked as fixed that have since regressed | DOC | 5 | 2 | H | 1 |
| 12 | Confirm `docs/STATUS.md` "What's next" section reflects the actual current priorities — not last month's | DOC | 4 | 1 | M | 2 |
| 13 | Confirm `docs/STATUS.md` dimension scores are not stale — any dimension completed since the last update must be marked | DOC | 4 | 2 | M | 2 |
| 14 | Confirm `CLAUDE.md` (project root) active files table is correct and matches the filesystem | DOC | 5 | 1 | H | 1 |
| 15 | Confirm `CLAUDE.md` does not reference `able-merged.html` as an active file — it is in `_archive/` | DOC | 4 | 1 | M | 2 |
| 16 | Confirm `CLAUDE.md` localStorage table includes all keys currently used by the active pages | DOC | 4 | 2 | M | 2 |
| 17 | Confirm `CLAUDE.md` copy philosophy section has not been accidentally overwritten by a session | DOC | 4 | 1 | M | 2 |
| 18 | Confirm `CLAUDE.md` tier system table is current — prices and feature gates have not changed since last update | DOC | 3 | 1 | L | 3 |
| 19 | Confirm `CLAUDE.md` design tokens match the CSS custom properties in `able-v7.html` exactly | DOC | 4 | 1 | M | 2 |
| 20 | Confirm `CLAUDE.md` admin design tokens match the CSS custom properties in `admin.html` exactly | DOC | 4 | 1 | M | 2 |
| 21 | Confirm `docs/systems/data-architecture/SPEC.md` localStorage schema is current and resolves the `able_profile` vs `able_v3_profile` inconsistency | DOC | 4 | 2 | M | 2 |
| 22 | Confirm `docs/systems/copy/SPEC.md` banned phrases list is current and has not grown stale | DOC | 3 | 1 | L | 3 |
| 23 | Confirm `docs/systems/DESIGN_SYSTEM_SPEC.md` token values match `able-v7.html` — spot-check `--color-bg`, `--color-card`, `--color-accent` default | DOC | 4 | 1 | M | 2 |
| 24 | Confirm `docs/systems/CROSS_PAGE_JOURNEYS.md` journey diagrams reflect the current start.html → admin.html data flow | DOC | 4 | 2 | M | 2 |
| 25 | Confirm `docs/systems/tier-gates/SPEC.md` gold lock pattern description matches what is currently implemented in `admin.html` | DOC | 3 | 2 | L | 3 |
| 26 | Confirm `docs/systems/analytics/SPEC.md` event schema matches the events currently being written to `able_clicks` and `able_views` | DOC | 3 | 2 | L | 3 |
| 27 | Confirm `docs/systems/email/SPEC.md` email templates match the current `fan-confirmation.js` Netlify function output | DOC | 4 | 2 | M | 2 |
| 28 | Confirm `docs/systems/pwa/SPEC.md` reflects the current `manifest.json` contents — `start_url`, `icons`, `theme_color` | DOC | 3 | 1 | L | 3 |
| 29 | Confirm `docs/systems/spotify-import/SPEC.md` matches the current state of the Spotify import Netlify function | DOC | 3 | 1 | L | 4 |
| 30 | Confirm `docs/systems/seo-og/SPEC.md` title and description templates match what is currently in the HTML files | DOC | 3 | 1 | L | 3 |
| 31 | Confirm `docs/pages/profile/DESIGN-SPEC.md` feature checklist is annotated with "built" / "not built" / "partial" for each item | DOC | 4 | 2 | M | 3 |
| 32 | Confirm `docs/pages/admin/DESIGN-SPEC.md` feature checklist is annotated with build status | DOC | 4 | 2 | M | 3 |
| 33 | Confirm `docs/pages/onboarding/DESIGN-SPEC.md` feature checklist is annotated with build status | DOC | 3 | 2 | L | 3 |
| 34 | Confirm `docs/pages/landing/DESIGN-SPEC.md` feature checklist is annotated with build status | DOC | 3 | 2 | L | 3 |
| 35 | Confirm `docs/v6/core/V6_BUILD_AUTHORITY.md` resolved decisions have not been silently contradicted by code changes | DOC | 3 | 2 | L | 3 |
| 36 | Confirm `docs/v6/00_AUTHORITY_ORDER.md` still correctly places V8 docs at the top of the precedence order | DOC | 3 | 1 | L | 3 |
| 37 | Confirm `MEMORY.md` (`~/.claude/projects/.../memory/MEMORY.md`) active file note says `able-v7.html` not `able-v3.html` | DOC | 4 | 1 | M | 2 |
| 38 | Confirm `MEMORY.md` Supabase project URL and anon key entries are current | DOC | 4 | 1 | M | 2 |
| 39 | Confirm `MEMORY.md` does not reference any abandoned or archived files as active | DOC | 4 | 1 | M | 2 |
| 40 | Confirm `MEMORY.md` `currentDate` is maintained at session start — it must reflect the actual current date | DOC | 3 | 1 | L | 3 |
| 41 | Confirm no `docs/audit/dimensions/` file references `able-v8.html` — use `able-v7.html` consistently | DOC | 4 | 2 | M | 2 |
| 42 | Confirm `docs/audit/100-DIMENSIONS.md` dimension status column is current — completed dimensions must be marked | DOC | 4 | 2 | M | 2 |
| 43 | Confirm `docs/audit/100-DIMENSIONS.md` references all 10 J-series dimensions (J1–J10) as a complete block | DOC | 3 | 1 | L | 3 |
| 44 | Confirm `docs/STATUS.md` lists the current branch name (`v2-simplified`) and its relationship to `main` | DOC | 3 | 1 | L | 3 |
| 45 | Confirm `docs/STATUS.md` records the most recent commit hash and message for orientation | DOC | 3 | 1 | L | 3 |
| 46 | Confirm `docs/STATUS.md` "What's been built" section has not omitted major features added in sessions 11–14 | DOC | 4 | 2 | M | 2 |
| 47 | Confirm the `netlify.toml` redirect rule documented in `CONTEXT.md` or `CLAUDE.md` matches the current `netlify.toml` file exactly | DOC | 4 | 1 | M | 2 |
| 48 | Confirm `docs/systems/freelancer-auth/PRODUCT-DOCTRINE.md` build phase references are still accurate | DOC | 3 | 1 | L | 4 |
| 49 | Confirm all file paths referenced in `CLAUDE.md` "Doc files" section exist on disk | DOC | 4 | 2 | M | 2 |
| 50 | Confirm all file paths referenced in `CONTEXT.md` "Active files" section exist on disk | DOC | 4 | 2 | M | 2 |
| 51 | Confirm `docs/systems/error-states/SPEC.md` error patterns match what is currently implemented — not just planned | DOC | 3 | 2 | L | 4 |
| 52 | Confirm `docs/systems/MICRO_INTERACTIONS_SPEC.md` list of implemented interactions is kept up to date | DOC | 3 | 2 | L | 4 |
| 53 | Confirm `docs/reference/research/PRODUCT_HIERARCHY_AND_TRUST.md` feature priority order has not been silently overridden | DOC | 3 | 1 | L | 4 |
| 54 | Confirm `_archive/` directory contains exactly the files referenced as archived in `CLAUDE.md` — no active files have migrated in accidentally | DOC | 4 | 1 | M | 2 |
| 55 | Confirm `index.html` is still a redirect stub and has not been accidentally edited | DOC | 4 | 1 | M | 2 |
| 56 | Confirm no `.md` files in `docs/` reference a Supabase URL other than `https://jgspraqrnjrerzhnnhtb.supabase.co` | DOC | 4 | 2 | M | 2 |
| 57 | Confirm `reference_supabase.md` (if it exists) is consistent with the current Supabase project state | DOC | 3 | 1 | L | 3 |
| 58 | Confirm `docs/STATUS.md` "P0 blockers" section is empty or lists only real, current blockers | DOC | 5 | 1 | H | 1 |
| 59 | Confirm `docs/STATUS.md` "P0 NEVER-SHIP" section exists and reflects the current philosophy | DOC | 4 | 1 | M | 2 |
| 60 | Confirm the `CONTEXT.md` "tokens" section does not list any CSS variables that have been renamed or removed | DOC | 4 | 1 | M | 2 |
| 61 | Confirm all V8 design spec files have a `Last updated` date that post-dates the corresponding HTML file's last major change | DOC | 3 | 2 | L | 4 |
| 62 | Confirm `docs/systems/brand-identity/DOCTRINE.md` typography doctrine is consistent with the fonts currently loaded in all four active pages | DOC | 3 | 1 | L | 3 |
| 63 | Confirm `CONTEXT.md` "CTA architecture" section still reflects the three-zone, max-2-hero model currently in able-v7.html | DOC | 4 | 1 | M | 2 |
| 64 | Confirm `CONTEXT.md` "Page state system" section matches the current state logic in able-v7.html | DOC | 4 | 2 | M | 2 |
| 65 | Confirm `CONTEXT.md` campaign state `stateOverride` field name matches the field name currently in `able_v3_profile` | DOC | 4 | 1 | M | 2 |
| 66 | Confirm `docs/systems/data-architecture/SPEC.md` `able_tier` values ("free", "artist", "artist-pro", "label") match what admin.html writes | DOC | 3 | 1 | L | 3 |
| 67 | Confirm `docs/STATUS.md` mentions the known localStorage key naming inconsistency with a resolution status | DOC | 4 | 1 | M | 2 |
| 68 | Confirm `docs/STATUS.md` records whether the J1 DNS records (SPF, DKIM, DMARC) have been set | DOC | 4 | 1 | M | 2 |
| 69 | Confirm `docs/STATUS.md` records whether the service worker cache version has been bumped after recent changes | DOC | 3 | 1 | L | 3 |
| 70 | Confirm `docs/STATUS.md` records the current Netlify site URL and the last successful production deploy date | DOC | 3 | 1 | L | 3 |
| 71 | Confirm `CLAUDE.md` "Working rules" rule #8 ("Run Playwright smoke tests") reflects the current MCP configuration | DOC | 3 | 1 | L | 3 |
| 72 | Confirm the `.claude/settings.json` MCP config is current and Playwright MCP is correctly configured | DOC | 3 | 1 | L | 3 |
| 73 | Confirm `docs/STATUS.md` "Sessions" log is maintained with key decisions from each session | DOC | 3 | 1 | L | 3 |
| 74 | Confirm `docs/STATUS.md` session 14 entry is present and accurate | DOC | 3 | 1 | L | 3 |
| 75 | Confirm `CONTEXT.md` "Backend plan" Supabase CDN script URL is the current version (`@2`) | DOC | 3 | 1 | L | 3 |
| 76 | Confirm the `docs/audit/100-DIMENSIONS.md` master index is sorted correctly by category (A through J) | DOC | 3 | 1 | L | 4 |
| 77 | Confirm `docs/audit/100-DIMENSIONS.md` each dimension entry has a correct file path to its detail file | DOC | 3 | 1 | L | 4 |
| 78 | Confirm no dimension detail file in `docs/audit/dimensions/` is missing from `100-DIMENSIONS.md` | DOC | 3 | 2 | L | 4 |
| 79 | Confirm `docs/systems/competitive/PATH-TO-10.md` competitive analysis is dated and not older than 90 days | DOC | 2 | 1 | L | 5 |
| 80 | Confirm `docs/systems/digital-media/FINAL-REVIEW.md` is not referenced as an active spec in `CLAUDE.md` | DOC | 2 | 1 | L | 5 |
| 81 | Confirm `docs/systems/master-plan-alignment/FINAL-REVIEW.md` is not referenced as active build authority | DOC | 2 | 1 | L | 5 |
| 82 | Confirm `instagram-snapshot.md` and `tiktok-snapshot.md` are labelled as research snapshots, not specifications | DOC | 2 | 1 | L | 5 |
| 83 | Confirm `docs/systems/complaint-resolution/ANALYSIS.md` has a clear status label (research, not active spec) | DOC | 2 | 1 | L | 5 |
| 84 | Confirm `docs/systems/va-strategy/ANALYSIS.md` has a clear status label | DOC | 2 | 1 | L | 5 |
| 85 | Confirm `docs/systems/think-out-of-the-box/ANALYSIS.md` has a clear status label | DOC | 2 | 1 | L | 5 |
| 86 | Confirm `docs/systems/hardware-software/ANALYSIS.md` has a clear status label | DOC | 2 | 1 | L | 5 |
| 87 | Confirm `CONTEXT.md` lists every `.md` file in `docs/` that Claude should read at session start | DOC | 3 | 2 | L | 3 |
| 88 | Confirm `CONTEXT.md` has a "Do not read" section listing files Claude should skip to save context window | DOC | 3 | 1 | L | 4 |
| 89 | Confirm `docs/archive/superseded-v5/PRODUCT_SPEC.md` is correctly labelled as archived — not referenced as active | DOC | 3 | 1 | L | 3 |
| 90 | Confirm `docs/archive/superseded-v5/QA_SMOKE_TESTS.md` is correctly labelled as archived | DOC | 3 | 1 | L | 3 |
| 91 | Confirm there are no TODOs or FIXMEs in `CONTEXT.md` or `docs/STATUS.md` that are older than 30 days | DOC | 3 | 1 | L | 3 |
| 92 | Confirm the project memory file (`MEMORY.md`) has been updated to reflect new working conventions from recent sessions | DOC | 3 | 1 | L | 3 |
| 93 | Confirm `MEMORY.md` `feedback_check_docs.md` reference is still accurate — Claude must check V6 authority docs before implementing | DOC | 3 | 1 | L | 3 |
| 94 | Confirm `MEMORY.md` `project_active_file.md` correctly identifies `able-v7.html` as the active artist profile file | DOC | 4 | 1 | M | 2 |
| 95 | Confirm `CONTEXT.md` CTA zone caps (Hero max 2, Pills max 4/6, Section max 2) match what is enforced in able-v7.html | DOC | 4 | 2 | M | 2 |
| 96 | Confirm no file in `docs/` references a Netlify function that has not yet been created as if it were complete | DOC | 3 | 1 | L | 3 |
| 97 | Confirm `docs/STATUS.md` build state matches the actual state of each HTML file when opened in a browser today | DOC | 5 | 2 | H | 1 |
| 98 | Confirm all session notes in `docs/STATUS.md` are in reverse-chronological order (most recent first) | DOC | 2 | 1 | L | 5 |
| 99 | Confirm `docs/STATUS.md` contains a "Launch checklist" section with J1–J10 completion status | DOC | 4 | 2 | M | 2 |
| 100 | Confirm `STATUS.md` is updated to mark J10 complete — confirming that all documentation is current and the project is ready for launch | DOC | 2 | 1 | L | 6 |
