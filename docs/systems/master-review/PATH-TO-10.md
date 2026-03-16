# Master Review System — Path to 10
**Created:** 2026-03-16
**Current score:** 7.5/10 (protocol exists and is actionable; first real review completed; gaps found are honest)
**Target:** 10/10

---

## Current state assessment

The Master Review system is newly created. It has a protocol document, a current review, and a final review. The protocol is comprehensive and follows the ABLE build philosophy. However, it has not yet been battle-tested through multiple review cycles. A system that hasn't been used more than once cannot honestly claim 10/10.

**Why 7.5, not higher:**
- The protocol exists and is actionable (not theoretical): +2 above baseline
- The first real review produced genuine findings (8 contradictions, 10 gaps): +1.5
- The trigger system is clearly defined: +1
- Agent dispatch protocol is defined: +0.5
- But: no proven track record of catching real gaps before they caused build problems: -1.5
- But: the "done" definition (two clean consecutive reviews) has not been approached yet: -1

---

## Dimension scores

| Dimension | Current | Target | Gap |
|---|---|---|---|
| Protocol completeness | 8.5 | 10 | Missing: cross-doc linking checks, version history tracking |
| Actionability | 8.0 | 10 | An agent could follow it; some judgment calls still needed |
| Trigger coverage | 9.0 | 10 | All mandatory triggers defined; optional triggers could be richer |
| Agent-readability | 7.5 | 10 | Requires ABLE context to fully understand; could be more self-contained |
| Connection to build process | 8.0 | 10 | References PROCESS.md but could be tighter — e.g. run Master Review as Stage 0.5 before every sprint |
| Track record | 0 | 10 | Cannot score above 0 — must be earned through multiple cycles |
| Finding-to-fixing rate | N/A (first review) | 8+ | Measure: what % of gaps found in Review #1 are fixed before Review #2? |

---

## Path to 9/10

**P0 — Complete one full improvement cycle**
The path from 7.5 to 9 requires completing one complete cycle:
1. Review #1 finds gaps (done — this document)
2. Gaps are acted on (profile DESIGN-SPEC.md created, domain fixed, scores updated)
3. Review #2 is run
4. Review #2 finds fewer gaps than Review #1 — the protocol is working

Without this cycle, the protocol is theoretical. After it, the protocol is proven.

**Target:** after Review #2, if finding count is <50% of Review #1, upgrade to 8.5/10.

---

**P1 — Add version history tracking**

Every Master Review should leave a permanent record. Currently, `CURRENT-REVIEW.md` is overwritten each time. Add a convention:

1. When a new review is run, rename the previous `CURRENT-REVIEW.md` to `REVIEW-[YYYY-MM-DD].md`
2. Always keep `CURRENT-REVIEW.md` as the latest
3. This creates an audit trail showing how the documentation improved over time

This is a process change, not a document change. Takes 5 minutes per review cycle.

---

**P1 — Add a "document health score" to FILE-STRUCTURE.md**

Currently FILE-STRUCTURE.md lists documents by status (Complete / In progress / Maintained). Add a column for health score (1–10, from the most recent FINAL-REVIEW.md). This makes the Master Review Phase 4 (score audit) trivially fast — instead of hunting through individual FINAL-REVIEW.md files, the scores are in one place.

The health score column requires updating FILE-STRUCTURE.md after every Master Review — which is already a Phase 7 action. Cost: ~30 minutes per review to update. Benefit: Phase 4 of subsequent reviews takes 10 minutes instead of 45.

---

**P2 — Make the protocol more self-contained for cold-start agents**

Currently, running a Master Review requires background knowledge of the ABLE build process, the authority hierarchy (V8 > V6), and the 8-stage PROCESS.md framework. An agent reading only MASTER-REVIEW-PROTOCOL.md cold would need to ask clarifying questions.

Improvement: add a "Quick orientation for a cold-start agent" section to the protocol with the minimum 5 facts they need to run Phase 2 (the coherence audit) without reading other docs first:
1. The authoritative domain is `ablemusic.co`
2. V8_BUILD_AUTHORITY.md supersedes all v6 docs
3. Active HTML files are: able-v7.html, admin.html, start.html, landing.html, fan.html
4. Fan cap on free tier is 100 fans (£0/month)
5. The core thesis is: "The relationship between artist and fan belongs to them. ABLE is the conduit."

These five facts catch the most common contradiction types without requiring full doc reads.

---

**P2 — Define a "minimum viable Master Review" (30-minute version)**

The full protocol is 3–4 hours. There will be sessions where the full review isn't practical. Define a 30-minute version that catches the highest-value issues:

1. Run `find docs/ -name "*.md" | wc -l` — check total count vs last review
2. Check CONTEXT.md scores against STATUS.md scores — find any conflict
3. Check `docs/pages/profile/` for DESIGN-SPEC.md (the most critical single gap)
4. Grep for `ablemusic.co` — catch domain inconsistencies
5. Read STATUS.md last session summary — anything built but not specced?

Five checks, 30 minutes. Catches P0 issues even on constrained sessions. Not a replacement for the full review — a safety net between full reviews.

---

## Path to 10/10

The Master Review system reaches 10/10 when:

1. **Track record:** Three complete review cycles have been run (Reviews #1, #2, #3)
2. **Proof of effectiveness:** Each subsequent review found fewer P0 gaps than the previous — the system is genuinely improving documentation quality, not just documenting it
3. **Zero surprises at build time:** No build session has been interrupted by a spec gap that the Master Review should have caught
4. **Two consecutive clean reviews:** As defined in the protocol — the ultimate test

**Realistic timeline:** 10/10 is achievable after 60–90 days of active development (3 monthly reviews).

---

## Beyond 10

If 10/10 is reached, the next frontier is predictive review:

Rather than reviewing what exists and finding gaps, the system would anticipate what needs to exist based on the product roadmap. Before any new feature is built, the Master Review system flags: "This feature will need these 5 docs. Do they exist?" If not, the docs are created proactively, not reactively.

This requires connecting the Master Review to the product roadmap — which doesn't yet have a formal system in ABLE docs. That's a Year 2 consideration when the team is larger and the build pace is faster.

A second "beyond 10" dimension: automated health monitoring. A script that runs `find docs/` checks and CONTEXT.md score-vs-reality comparisons on every git push. Catches the most common doc rot (files referenced but not existing, scores that don't match their source docs) without requiring a manual session.
