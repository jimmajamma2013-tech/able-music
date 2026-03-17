# ABLE — Brand Identity: Final Review
**Created: 2026-03-16 | Target: 8.5/10 | Current: 5/10**

> This document tracks the score of the brand identity spec over time. It is updated when meaningful progress is made against the PATH-TO-10.md checklist.

---

## Scoring rubric

| Score | What it means |
|---|---|
| 0–2 | Not started or critically incomplete |
| 3–4 | Documented but not executed |
| 5–6 | Partially executed or implicitly consistent |
| 7–8 | Substantially complete, minor gaps remain |
| 9–10 | Production-ready, all elements present and consistent |

---

## Dimension scores

### 1. Wordmark
**Current: 6/10 | Target: 8/10**

Reaching 8 requires:
- SVG asset created and deployed
- All instances in the codebase audited and consistent
- Rules documented in GUIDELINES.md

What keeps it from 10:
- No version with the ✦ lockup (Phase 2)
- SVG asset as `<img>` not yet replacing `<span>` elements (optional for V1)

---

### 2. The ✦ symbol
**Current: 5/10 | Target: 8/10**

Reaching 8 requires:
- Rules documented (done — SPEC.md §4)
- Full codebase audit completed
- All non-compliant instances removed

What keeps it from 10:
- The locked-up SVG with wordmark (Phase 2)
- Animated version for special moments (Phase 2)

---

### 3. Favicon
**Current: 2/10 | Target: 10/10**

Reaching 10 requires:
- All 6 files created and deployed
- Applied to all 4 active pages
- Verified across browsers and devices

This is the fastest path from a low score to a high one. One focused session. No creative ambiguity. The spec is clear. It just needs to be done.

---

### 4. OG image template
**Current: 3/10 | Target: 8/10**

Reaching 8 requires:
- Landing page OG card designed and exported
- Meta tags added to landing.html
- Verified in social sharing debuggers

What keeps it from 10:
- Artist page dynamic OG card (Phase 2 — requires Supabase backend)

---

### 5. Artist page as brand expression
**Current: 8/10 | Target: 9/10**

Reaching 9 requires:
- "Brand recedes" principle explicitly documented in GUIDELINES.md
- Confirmed that the only ABLE brand element on the artist page is the "Made with ABLE" footer (free tier)

What keeps it from 10:
- Dynamic OG card for artist pages (Phase 2)

---

### 6. Admin as deliberately different surface
**Current: 7/10 | Target: 8/10**

Reaching 8 requires:
- Backstage metaphor documented in GUIDELINES.md
- Warm cream (#e8e4dd) light state audited in admin.html
- Confirmed that the amber accent (#f4b942) is applied consistently

---

### 7. Brand voice
**Current: 6/10 | Target: 9/10**

Reaching 9 requires:
- One-sentence brand personality documented (done — SPEC.md §1)
- ABLE's own voice distinct from artist voice, documented with examples (done — SPEC.md §2)
- GUIDELINES.md includes 3 on-brand and 3 off-brand example phrases

---

### 8. "Made with ABLE" as brand touchpoint
**Current: 4/10 | Target: 9/10**

Reaching 9 requires:
- Copy finalised (done — SPEC.md §7)
- Link target specified (done — SPEC.md §7)
- Visual treatment specified (done — SPEC.md §7)
- Implemented correctly in able-v7.html
- Tier gating confirmed working

---

## Composite score

| Dimension | Current | With PATH-TO-10 Phase 0 | With Phase 1 | Ceiling |
|---|---|---|---|---|
| Wordmark | 6/10 | 7/10 | 8/10 | 9/10 |
| The ✦ symbol | 5/10 | 7/10 | 8/10 | 9/10 |
| Favicon | 2/10 | **10/10** | 10/10 | 10/10 |
| OG image template | 3/10 | **8/10** | 8/10 | 9/10 |
| Artist page as brand | 8/10 | 8/10 | 9/10 | 10/10 |
| Admin as different surface | 7/10 | 7/10 | 8/10 | 9/10 |
| Brand voice | 6/10 | 7/10 | 9/10 | 9/10 |
| "Made with ABLE" | 4/10 | 8/10 | 9/10 | 9/10 |
| **Weighted average** | **~5/10** | **~7.75/10** | **~8.5/10** | **~9.3/10** |

**Target of 8.5/10 is achievable through Phase 0 + Phase 1. Phase 2 items are improvements, not requirements.**

---

## Honest summary

ABLE has an implicit brand identity that is stronger than the score suggests. The design choices — midnight navy, amber admin accent, Barlow Condensed, the ✦ symbol, the vibe system — are coherent and distinctive enough that someone encountering multiple surfaces would recognise them as the same product. The deficit is documentation and a few missing assets.

**The two quick wins that move the score most:**
1. Favicon: moves dimension 3 from 2/10 to 10/10. One session. The spec is exact.
2. OG image: moves dimension 4 from 3/10 to 8/10. One session. The layout is specified.

Together these two items bring the composite score to approximately 7.75/10 without touching the documentation.

**The documentation work (GUIDELINES.md + "Made with ABLE" implementation)** brings it to 8.5/10.

The ceiling of 9.3/10 requires Phase 2 items that depend on things not yet built (Supabase, real beta artist pages). That ceiling is appropriate — brand identity is never finished, and 8.5/10 is production-ready.

---

## Score history

| Date | Score | What changed |
|---|---|---|
| 2026-03-16 | 5/10 | Initial assessment — identity implicit, spec written, assets missing |
| — | — | Update this when PATH-TO-10.md items are completed |

---

## One thing to remember

ABLE's brand is at its strongest when it is least visible. On an artist's page, the brand is the artist. ABLE's job is to disappear and let the relationship between artist and fan happen unimpeded.

Every brand decision should be tested against this: does this make ABLE louder, or does it make the artist's presence more possible?

The favicon, the OG card, the footer — these are ABLE's brand on ABLE's surfaces. On the artist's surface, ABLE steps back. That restraint is the brand.
