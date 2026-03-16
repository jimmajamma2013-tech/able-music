# ABLE — Explainer System: Path to 10/10
**Date: 2026-03-16 | Status: ACTIVE**

> Starting score: 5.5/10. This document tracks what needs to happen, in what order, to reach 10/10.

---

## Starting position

| Surface | Score |
|---|---|
| start.html wizard guidance | 6/10 |
| admin.html section explainers | 4/10 |
| able-v7.html owner hints | 5/10 |
| Import flow guidance | 7/10 |
| Tier gate explainers | 7/10 |
| Error message clarity | 7/10 |
| **Overall** | **5.5/10** |

---

## P0 — Blocking: must ship before these surfaces are considered production-ready

### P0.1 — Import flow UX copy
**Status: DONE** (§7 added to `docs/systems/spotify-import/SPEC.md` in this session)
**Impact:** Import is the first moment an artist experiences the product. Undefined copy was a build blocker.
**Estimated score gain:** Import flow: 6/10 → 9/10

---

## P1 — High priority: orientation without these, the product is incomplete

### P1.1 — Wizard context lines (Screens 6 and 7)

**What:** Two short context lines, one on Screen 6 (fan capture), one on Screen 7 (current moment), placed above the choice cards.

**Screen 6 context line:**
```
When a fan taps this on your page, they sign up. You get their email. That's yours to keep — no platform in the way.
```

**Screen 7 context line:**
```
Choose the right mode and your page reconfigures itself — the layout, the CTA, the message. Fans see something that matches where you actually are right now.
```

**File to update:** `start.html`
**Spec:** `docs/systems/explainers/SPEC.md` — Type 3
**Estimated score gain:** Wizard: 6/10 → 8/10

---

### P1.2 — Tooltip component implementation

**What:** Build the reusable `ⓘ` tooltip component in `shared/able.js`. CSS in `shared/style.css`. Implement on all 14 tooltip targets defined in `docs/systems/explainers/SPEC.md`.

**Priority targets (implement in this order):**

1. admin.html — Gig mode (most-encountered unfamiliar concept)
2. admin.html — Page state / Campaign HQ
3. admin.html — Close Circle
4. admin.html — Accent colour
5. admin.html — Broadcasts
6. admin.html — Snap cards
7. start.html Screen 3 — Accent colour
8. start.html Screen 7 — Gig mode card
9. admin.html — Fan source
10. admin.html — Tap-through rate
11. admin.html — Starred fans
12. admin.html — Credits / Connections
13. admin.html — Views
14. admin.html — Tier gate locks

**Files to update:** `shared/able.js`, `shared/style.css`, `admin.html`, `start.html`
**Estimated score gain:** Admin: 4/10 → 7/10 | Wizard: 8/10 → 8.5/10

---

### P1.3 — Section orientation cards (admin.html)

**What:** 10 orientation card components in admin.html — one per section listed in SPEC.md. Each card shows once, dismisses with ×, stored in `able_dismissed_nudges`.

**Sections to cover:**
1. Close Circle / Supporter (`orientation-close-circle`)
2. Broadcasts (`orientation-broadcasts`)
3. Snap Cards (`orientation-snap-cards`)
4. Gig Mode (`orientation-gig-mode`)
5. Merch (`orientation-merch`)
6. Shows / Events (`orientation-shows`)
7. Fan List (`orientation-fan-list`)
8. Analytics (`orientation-analytics`)
9. Connections / Credits (`orientation-connections`)
10. Releases / Music (`orientation-releases`)

All copy is defined in `docs/systems/explainers/SPEC.md` — Type 2.

**Files to update:** `admin.html`
**Estimated score gain:** Admin: 7/10 → 8.5/10

---

### P1.4 — "Something else" sub-card context (Screen 2)

**What:** Add a one-line reassurance below the "Something else" vibe card when it's selected.

**Copy:**
```
No problem — you'll be able to set your genre and accent from your dashboard once your page is live.
```

**File to update:** `start.html`
**Estimated score gain:** Minor — closes a real anxiety moment

---

## P2 — Meaningful but not blocking

### P2.1 — Tier gate overlay copy

**What:** Write out the specific copy for each individual tier gate overlay. The SPEC.md pattern says "always say what they get" — the actual text isn't written for every gate yet.

**Gates that need specific copy (not just the generic pattern):**

| Feature | Overlay copy |
|---|---|
| Broadcasts | "Write directly to your fans. Available on Artist plan." |
| Close Circle | "Set up monthly supporter payments. Available on Artist plan." |
| Fan email export | "Download your fan list as a CSV. Available on Artist plan." |
| Advanced analytics | "See where fans are coming from, per-link tap data, and weekly trends. Available on Artist Pro." |
| Custom domain | "Use your own domain — e.g. yourbandname.com. Available on Artist Pro." |
| Multi-artist (Label) | "Manage multiple artist pages from one dashboard. Available on Label plan." |

**Files to update:** `admin.html`, `docs/systems/tier-gates/SPEC.md`
**Estimated score gain:** Tier gates: 7/10 → 9/10

---

### P2.2 — Owner orientation card on able-v7.html (first visit)

**What:** A one-time orientation card shown to the artist when they first view their own live page. Explains that this is what fans see, and that the dashboard is where they manage everything.

**Card copy:**
```
This is your page.

This is what fans see when they tap your link. To change what's on it, go to your dashboard.

[Open dashboard →]                              [×]
```

**Files to update:** `able-v7.html`
**Estimated score gain:** Profile owner hints: 5/10 → 7/10

---

### P2.3 — Import explainer UI component

**What:** The "what gets imported / what we don't" content (defined in spotify-import SPEC.md §7.9) needs a UI home. Recommendation: a collapsible "What does this import?" panel on Screen 0, collapsed by default, tap to expand.

**Collapsed state:**
```
What does this import?  ↓
```

**Expanded state:**
```
What does this import?  ↑

You get: your name, profile image, genres, and your latest releases (up to 10).
We don't get: your bio (Spotify doesn't share this), monthly listeners, or your fan count.
```

**Files to update:** `start.html`
**Estimated score gain:** Import flow: 9/10 → 10/10

---

### P2.4 — Validation error copy audit (admin.html)

**What:** Audit every form validation error in admin.html and ensure each follows the "human language, path forward" rule. Replace any generic browser validation or bare error messages.

**Estimated score gain:** Error message clarity: 7/10 → 9/10

---

## Projected scores at completion

| Surface | Current | After P1 | After P2 | Target |
|---|---|---|---|---|
| start.html wizard guidance | 6/10 | 8.5/10 | 9/10 | 9/10 |
| admin.html section explainers | 4/10 | 8.5/10 | 9/10 | 9/10 |
| able-v7.html owner hints | 5/10 | 5/10 | 7/10 | 8/10 |
| Import flow guidance | 7/10 | 9/10 | 10/10 | 10/10 |
| Tier gate explainers | 7/10 | 7/10 | 9/10 | 9/10 |
| Error message clarity | 7/10 | 7/10 | 9/10 | 9/10 |
| **Overall** | **5.5/10** | **7.5/10** | **9/10** | **9/10** |

**10/10 is achievable after P2 is complete.** The remaining 1 point requires real user testing with the target artist persona to identify gaps that can't be discovered by reading specs.

---

## Definition of 10/10

A 22-year-old indie artist — no Linktree experience, no one to ask — sets up their ABLE page in 5 minutes, shares it in their Instagram bio, and when their first fan signs up they understand what happened and where to see it.

At no point do they pause, feel confused, or reach for their phone to search "how does ABLE work."

That's the test.
