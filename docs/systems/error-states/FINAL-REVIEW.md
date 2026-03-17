# ABLE — Error States: Final Review
**Created: 2026-03-16 | Updated: 2026-03-16 | Score: 9/10 spec-complete**

---

## Summary verdict

The current build has essentially no error handling. It is a happy-path implementation. The good news: all the fixes are well-understood, the patterns are canonical, and none of them require architectural changes.

The spec is complete. Implementation is mechanical. This goes from 3.5/10 to 9/10 in one focused session.

---

## What 8/10 means (after `safeGet`/`safeSet` + empty states)

**`safeGet` and `safeSet` implemented, and empty states rendering = 8/10**

These two functions are the structural fix. Before them, a single corrupt localStorage entry crashes the page entirely — no recovery, no message, just a blank screen or a console error. After them:

- Every JSON parse failure is caught and returns the fallback value
- Every localStorage write failure shows a toast rather than silently failing
- The empty profile state ("This page isn't set up yet") renders instead of a blank page when `able_v3_profile` is null

8/10 at this point because the structural protection is in place but the higher-level error states (Spotify import failures, fan sign-up validation copy, empty vs error distinction in admin) are not yet built.

## What 9/10 means (after all try/catch wrapped + all error states have UI)

- `safeGet()` / `safeSet()` in all pages — no more JSON parse crashes
- Image fallback (initials avatar) on every external image load
- Network offline toast on admin.html and start.html
- Spotify import: all 5 failure modes handled with specific copy
- Fan sign-up validation: custom copy, duplicate detection
- Empty vs error state distinction throughout admin.html
- All error copy matches the canonical SPEC.md table
- Recovery path exists for every error state

At 9/10 the product feels considered. Errors don't reveal the seams. Artists and fans trust it with their data.

---

## What stops it reaching 10

**Two things:**

1. **Playwright tests for each error state.** Until error states are automated-tested, regressions will happen silently. A future edit to the fan sign-up handler could break duplicate detection and no one would know. Tests make the spec durable.

2. **Real device testing.** Devtools offline mode is not the same as actually offline on an iPhone on the Tube. The service worker, the localStorage quota edge case, the iOS Safari image rendering — these only show up on real hardware.

10/10 is achievable. It is a test authoring + QA session, not a design session.

---

## Scores after P0 + P1 complete

| Dimension | Before | After safeGet/safeSet + empty states | After all P0+P1 |
|---|---|---|---|
| Network failure | 2/10 | 2/10 | 8/10 |
| localStorage corruption | 1/10 | 9/10 | 9/10 |
| Form validation | 4/10 | 4/10 | 9/10 |
| Spotify import failure | 2/10 | 2/10 | 9/10 |
| Image load failure | 1/10 | 8/10 | 9/10 |
| Empty vs error state distinction | 4/10 | 6/10 | 9/10 |
| Error copy quality | 3/10 | 4/10 | 9/10 |
| Recovery paths | 3/10 | 7/10 | 8/10 |
| **Average** | **2.5/10** | **5.3/10 → 8/10** | **8.9/10 → 9/10** |

---

## Priority order for implementation

1. P0.1 — `safeGet()` / `safeSet()` everywhere — wrap the 5 critical reads first (30 min)
2. P0.1 — empty profile state HTML (15 min) → **at this point: 8/10**
3. P0.2 — Image fallback (30 min)
4. P0.3 — Network offline toast (30 min)
5. P1.1 — Spotify import error states (2 hrs)
6. P1.2 — Fan sign-up validation copy (1 hr)
7. P1.3 — Empty vs error state audit (1 hr) → **at this point: 9/10**

**Total P0+P1 estimate: 5.5 hours**

After step 2 completes: able-v7.html is safe to share publicly (no more crash risk).
After step 7 completes: the build is beta-ready from an error-handling perspective.

---

## Cross-references

- SPEC.md — canonical patterns and copy for all error states
- ANALYSIS.md — full audit of current state across 8 dimensions
- PATH-TO-10.md — prioritised implementation tasks with test criteria
- `docs/systems/pwa/SPEC.md` — service worker spec (P2.1 in PATH-TO-10.md)
