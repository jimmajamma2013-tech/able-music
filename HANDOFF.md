# ABLE v3 — Handoff Context for New Tab

> **For the new Claude Code tab:** Read this file first, then read the two files linked below. That is all you need. Do not read `able-merged.html` unless looking for a specific JS pattern.

---

## What we are building

ABLE is a premium mobile-first artist profile (link-in-bio for musicians). It is a **single HTML file** — no bundler, no framework, no build pipeline.

**Active work file:** `able-v3.html` — this is what you edit.
**Reference file:** `able-merged.html` — read this for JS patterns ONLY (localStorage, safeRender, applyMode). Do NOT copy its CSS.
**Do not touch:** `index.html`, `able-merged.html`, `able-v2.html`

---

## Two documents you must read before writing any code

1. **Design spec:** `docs/superpowers/specs/2026-03-10-able-v3-design.md`
   - All colour tokens, type tokens, spacing tokens
   - Layout structure, section anatomy
   - All 4 themes (Dark / Light / Contrast / Glass)
   - Motion plan, build order, what v3 is NOT doing

2. **Implementation plan:** `docs/superpowers/plans/2026-03-10-able-v3-build.md`
   - Step-by-step build tasks with exact code
   - Start at whichever Chunk/Task is not yet complete
   - Use `superpowers:subagent-driven-development` to execute it

---

## Design decisions already made (do not re-ask or re-debate these)

| Decision | Answer |
|---|---|
| Direction | Premium & Conversion-first (Stripe/Linear applied to music) |
| Base colour | Midnight Navy `#0d0e1a` |
| Accent | Artist-owned blue `#3b82f6` (one CSS var = full rebrand) |
| Feel | Calm, Apple-like, iOS native, user friendly |
| Typography | Plus Jakarta Sans (Google Fonts) |
| Hero | Artwork-led — latest release fills the top |
| Shell | iOS Native — bottom tab bar, card sheets |
| Aesthetic | 2026 without generic |
| Approach | C — hero-first, ship fast, iterate section by section |

---

## Current state of `able-v3.html`

The file exists and has been started. It includes:
- iOS shell (status bar, bottom tab bar with 5 tabs: Home / Music / Events / Merch / Support)
- Artwork hero with gradient fade, release tag pill, avatar
- Artist info (name, genre, location, bio with expand)
- Primary + Secondary CTAs
- Quick Action pills (platform links)
- Music section preview (tracklist rows)
- Events section preview
- 4 theme switcher (Dark / Light / Contrast / Glass)
- localStorage profile wiring
- All CSS token system

**What may still need work:**
- Merch section
- Support section
- Full Music tab (all releases, embed mode)
- Full Events tab
- Admin/editor panel (left-side wiring like v1/v2)
- Polish pass on each section

---

## Rules — never violate these

1. Small, scoped changes only — one concern at a time
2. Never redesign — enhance what exists
3. All 4 themes must work after every change
4. Prefer tokenised CSS — no inline styles for colours/spacing
5. Mobile-first — 44px min tap targets, no overflow, no jank
6. Never push to main — user will review first
7. Single HTML file — no new files, no external CSS, no bundlers

---

## How to proceed

Tell Claude Code in the new tab:

> "Please read HANDOFF.md, then read the design spec and implementation plan it points to. Then use superpowers:subagent-driven-development to continue executing the plan on `able-v3.html`, starting from whichever tasks are incomplete."
