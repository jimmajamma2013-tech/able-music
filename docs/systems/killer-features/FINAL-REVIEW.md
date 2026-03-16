# ABLE — Killer Features: Final Review
**Created: 2026-03-16 | Status: ACTIVE — build sequencing decision**

---

## The question this document answers

Which of these eight features belong in the current build? In what order? What should ship before any V2 work begins?

---

## What V1 can ship (no backend required)

Three features can be fully built — or meaningfully advanced — with zero backend changes, zero new dependencies, and no changes to the localStorage data model beyond minor additions:

**1. Auto-gig from calendar — build now**
All data already exists in `able_shows`. The logic is 30 lines of JS. The impact is a 0→8 jump on the most time-critical feature in the product. This is the clearest possible argument for a P0: high value, low effort, no dependencies.

**2. Deep link campaigns — build now**
URL parameter parsing is two lines. The source tagging hooks into existing event write functions. The campaign creator UI is a small addition to admin analytics. The fan-facing chip is new but minor. This is also P0: it immediately makes every social post the artist publishes more intelligent, and it gives ABLE real attribution data for the first time.

**3. One-tap release announcement — build next (P1)**
The release moment is the most important moment in an artist's ABLE lifecycle. Currently ABLE goes silent when it should be loudest. This feature is 5–7 hours and shares infrastructure with tonight draft automation. Build these together.

**4. Tonight draft automation — build with one-tap announcement (P1)**
Same bottom sheet infrastructure, same draft generation pattern. Build as a paired feature. The combined build time is 8–10 hours for both.

**5. QR code for gig-mode — build with auto-gig (P0 addendum)**
2–3 hours, one CDN dependency (`qrcode.js`). Bundles naturally with the auto-gig work since both touch the admin gig mode panel. Ship as part of the same PR.

---

## What requires backend (V2)

These three features cannot be meaningfully completed in V1:

**True Spotify pre-save** — Spotify OAuth requires a server-side token exchange. Cannot be done safely in a browser-only environment. V1 action: audit and correct any copy that calls email collection a "pre-save." That's the only honest V1 step.

**Fan location heatmap** — Worth starting data collection in V1 (optional geolocation on sign-up, city stored in fan object). But the map display and routing intelligence are meaningless without server-side aggregation across all fans. V1 plants the seed; V2 delivers the value.

**Snap card read receipts** — Can be partially built in V1 (IntersectionObserver + localStorage count) but the numbers will be unreliable and potentially discouraging for artists with small audiences. Recommend deferring until Supabase is live and views can be accurately counted cross-device.

---

## Recommended V1 sequencing

### Sprint 1 (immediate build — ~12 hours)

**Auto-gig from calendar** + **QR code for gig-mode**
- Start here. Two features, one PR, one focused area of the codebase (gig mode system in both files).
- Auto-gig: `checkAutoGig()` function, admin indicator, 60-second polling.
- QR: `qrcode.js` CDN, canvas render, download/share.
- Test: show today with doors time / show today without doors time / no show today / multiple shows today.

**Deep link campaigns**
- Can run in parallel with sprint 1 (different area of codebase — analytics + fan sign-up).
- URL param parsing, source tagging, campaign creator, analytics breakdown.
- Test: known campaign name / unknown campaign name / no campaign param / reduced-motion scroll.

### Sprint 2 (~10 hours)

**One-tap release announcement** + **Tonight draft automation**
- Build together — shared bottom sheet, shared draft generation infrastructure.
- Release announcement: detect live state, generate drafts, publish snap card, copy caption.
- Tonight draft: detect show today, generate tonight-specific drafts.
- Test: release with full data / release with minimal data / no fans yet / Pro vs free tier email draft.

### Sprint 3 — V2 prep only

**Spotify pre-save V1 copy audit** (30 minutes)
- Ensure no "pre-save" language appears where only email collection is happening.
- This is a fix, not a feature.

**Fan location data collection start** (2 hours)
- Optional geolocation on fan sign-up form in `able-v7.html`.
- Data stored for future V2 map. No admin display yet.

---

## What not to build in V1

Do not build the fan location map, snap card read receipts, or true Spotify pre-save until Supabase is live. Partial implementations of these features carry more risk than value:
- A read receipt that says "Seen by 2 fans" when the artist has 500 on their list looks broken, not insightful.
- A location heatmap with 12% of fans represented (opt-in rate reality) is misleading, not useful.
- A fake pre-save button damages artist trust more than the absence of the feature.

---

## The case for the P0 decision

Auto-gig and deep links together represent the highest-impact, lowest-effort combination in this entire feature set. They are:

- **Zero new infrastructure** — both run entirely on existing localStorage architecture
- **Immediately visible** — artists see the value the next time they have a show or share a Story
- **Compounding** — deep link analytics data becomes more valuable over time; auto-gig removes a friction point that currently causes artists to miss the most important window in their page lifecycle

If only one decision comes from this document: build auto-gig and deep links first, before any V2 work begins.

---

## Final scores (V1 delivery)

| Feature | V1 score | Worth building in V1? |
|---|---|---|
| Auto-gig from calendar | 8/10 | Yes — P0 |
| Deep link campaigns | 9/10 | Yes — P0 |
| One-tap announcement | 8/10 | Yes — P1 |
| Tonight draft automation | 8/10 | Yes — P1 (with announcement) |
| QR code gig-mode | 8/10 | Yes — P0 addendum |
| Snap card read receipts | 5/10 | Defer to V2 |
| Fan location heatmap | 2/10 | Data collection only |
| True Spotify pre-save | 4/10 | Copy fix only, full feature V2 |

---

## What success looks like after V1

An artist using ABLE after V1:
1. Adds a show. Forgets about gig mode. It turns on at doors time. Their fans who visit that evening see the show front and centre. The artist didn't have to remember anything.
2. Posts a Story about their vinyl restock. Uses the campaign link from admin. After 48 hours, they can see in analytics: "47 people came from that Story. 12 signed up. 8 clicked the merch link." That's a number that previously didn't exist anywhere.
3. Their EP goes live. Admin asks: "Let your fans know?" They see the drafts, tap publish on the snap card, copy the caption, and they're done. Three tasks, one minute.

Those three moments are worth more than any amount of dashboard polish. They are moments where ABLE pays back the artist's trust in a way they can see and feel.

---

*This document supersedes any conflicting build priority from `docs/STATUS.md` for killer features specifically.*
*Update `docs/STATUS.md` when V1 builds are complete.*
