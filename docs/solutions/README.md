# ABLE — Solutions Library
**This folder stores solved problems so future sessions don't repeat the work.**

---

## Purpose

ABLE is built across many AI agent sessions. Without a record of solved problems:
- The same bug gets rediscovered and re-debugged
- Fixes that took 2 hours get undone in 10 minutes of well-intentioned editing
- Agents make confident-but-wrong decisions that contradict hard-won lessons

Each solution file documents: what broke, why, how it was fixed, and the generalised rule.

---

## Naming convention

File name = the problem, not the solution. Kebab-case. Examples:
- `admin-mobile-layout-overflow.md` — not `fixed-stats-grid.md`
- `copy-banned-phrases-sweep.md` — not `copy-improvements.md`
- `theme-glass-without-background.md` — not `glass-fix.md`

---

## When to add a solution

Add a solution file when:
- You spent more than 30 minutes debugging something non-obvious
- The fix touches a pattern that will recur (mobile layout, theme tokens, copy compliance)
- You want to prevent a specific class of regression

Do not add solution files for:
- Simple typo fixes
- Feature additions (those belong in `docs/specs/`)
- One-off content changes

---

## Index

| File | Problem solved | Commit |
|---|---|---|
| `admin-mobile-layout-overflow.md` | Stats grid + topbar overflow on mobile | `7e09139` |
| `copy-compliance-banned-phrases.md` | Banned SaaS phrases across all 4 active files | `0a91eb9`, `fb56213`, `e0bd543` |
| `google-oauth-removal.md` | Incorrect Google OAuth button — ABLE is magic-link only | `e0bd543`, `097a720` |
