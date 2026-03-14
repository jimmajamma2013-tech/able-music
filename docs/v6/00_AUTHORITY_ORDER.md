# ABLE V6 — Authority Order
**Status:** ACTIVE — this is the first file to read in any v6 session.

---

## Precedence (highest to lowest)

When any two files disagree, the higher-ranking file wins. No exceptions.

1. `docs/v6/core/V6_BUILD_AUTHORITY.md` — final decisions, resolved contradictions, hard law
2. `docs/v6/addenda/V5_RESEARCH_ADDENDUM.md` — 26 sections of corrections and precision
3. `docs/v6/build/V5_BUILD_PROMPT.md` — complete build spec and phase structure
4. `docs/v6/build/V5_MASTER_BRIEF.md` — synthesised brief (companion to build prompt)
5. `docs/v6/core/VISUAL_SYSTEM.md` — authoritative on fonts, accent values, vibe specs
6. `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md` — copy register and voice

## Operational docs (inform but do not override the above)

Files in `docs/v6/operational/` carry implementation detail for specific systems. They are subordinate to the authority chain above. Where they conflict with core authority, core wins.

## Reference docs

Files in `docs/reference/` inform product, design, and build thinking. They are **not** authoritative. They do not silently override v6 authority. They are the research foundation that produced the decisions in `docs/v6/core/`.

## Archive

Files in `docs/archive/` are historical only. They must not be used as current build authority. They contain superseded specs, old plans, and earlier versions. If you find yourself citing an archive file to justify a decision, stop — check whether that decision is captured in the v6 authority chain instead.

---

**Rule:** Any decision not addressed in the v6 authority chain → escalate to `V6_BUILD_AUTHORITY.md`, resolve it there, commit it. Do not leave it unresolved in reference or archive.

---

## Settled decisions quick-reference

These are often-confused points. The answer is here so you don't have to dig.

| Question | Answer |
|---|---|
| Body font for v6 profile? | DM Sans (not Plus Jakarta Sans — that's admin only) |
| How many themes? | 4: Dark, Light, Glass, Contrast. Mid does not exist. |
| Target file? | `able-v6.html` (not v5) |
| Backend for v1? | Supabase (not Cloudflare D1 — that's a v2 option) |
| Electronic r-mult? | 0.6 (not 0.8) |
| Pop display font? | Barlow Condensed 700 (not Nunito) |
| Spotify monthly listeners in UI? | No — not available via public API |
| Bandsintown required? | No — optional enrichment only |
| FMP as performance metric? | No — use LCP/INP/CLS only |
| Fan capture above fold? | No — after hero, bio, and pills (screenful 3) |
