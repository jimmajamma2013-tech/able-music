# ABLE — Killer Features: Final Review
**Created: 2026-03-16 | Revised: 2026-03-16 | Status: ACTIVE — build sequencing decision**

---

## The question this document answers

Which of these features belong in the current build? In what order? What should ship before any V2 work begins?

---

## What V1 can ship (no backend required)

Four features can be fully built — or meaningfully advanced — with zero backend changes, zero new dependencies, and no changes to the localStorage data model beyond minor additions:

**1. Auto-gig from calendar — build now (P0)**
All data already exists in `able_shows`. The logic is 40 lines of JS. The impact is a 0→8 jump on the most time-critical feature in the product. This is the clearest possible argument for a P0: high value, low effort, no dependencies.

**2. Deep link campaigns — build now (P0)**
URL parameter parsing is two lines. The source tagging hooks into existing event write functions. The campaign creator UI is a small addition to admin analytics. The fan-facing chip is new but minor. This is also P0: it immediately makes every social post the artist publishes more intelligent.

**3. Day 1 share card — build now (P0, highest priority overall)**
This is the most important missing feature in the entire product. Without it, artists complete the wizard and then don't share — and ABLE gets no organic growth, no fans, and no network effect. The share card converts the highest-motivation moment (wizard completion) into the first share. It is a 3–4 hour build with no new data dependencies. There is no good reason this has not shipped yet.

**4. One-tap release announcement — build next (P1)**
The release moment is the most important moment in an artist's ABLE lifecycle. Currently ABLE goes silent when it should be loudest. This feature is 5–7 hours and shares infrastructure with tonight draft automation. Build these together.

**5. Tonight draft automation — build with one-tap announcement (P1)**
Same bottom sheet infrastructure, same draft generation pattern. Build as a paired feature. The combined build time is 8–10 hours for both.

**6. QR code for gig-mode — build with auto-gig (P0 addendum)**
2–3 hours, one CDN dependency (`qrcode.js`). Bundles naturally with the auto-gig work since both touch the admin gig mode panel. Ship as part of the same PR.

---

## What requires backend (V2)

These three features cannot be meaningfully completed in V1:

**True Spotify pre-save** — Spotify OAuth requires a server-side token exchange. Cannot be done safely in a browser-only environment. V1 action: audit and correct any copy that calls email collection a "pre-save." That's the only honest V1 step.

**Fan location heatmap** — Worth starting data collection in V1 (optional geolocation on sign-up, city stored in fan object). But the map display and routing intelligence are meaningless without server-side aggregation across all fans. V1 plants the seed; V2 delivers the value.

**Snap card read receipts** — Can be partially built in V1 (IntersectionObserver + localStorage count) but the numbers will be unreliable and potentially discouraging for artists with small audiences. Recommend deferring until Supabase is live and views can be accurately counted cross-device.

---

## Recommended V1 sequencing

### Sprint 1 (immediate build — ~15 hours)

**Day 1 share card** (build first — 3–4 hours)
- Start here. One file (`start.html`), zero data dependencies, highest impact.
- Call `showDay1ShareCard(profile)` at the end of `completeWizard()`.
- Include: URL copy button, pre-written IG caption, pre-written tweet, "See my page" link, "Go to your dashboard" exit.
- Test: artist with full profile / artist with minimal profile (name only) / copy button in incognito.

**Auto-gig from calendar** + **QR code for gig-mode** (after share card — ~5 hours)
- Two features, one PR, one focused area of the codebase (gig mode system in both files).
- Auto-gig: `checkAutoGig()` function, admin indicator, 60-second polling.
- QR: `qrcode.js` CDN, canvas render, download/share.
- Test: show today with doors time / show today without doors time / no show today / multiple shows today.

**Deep link campaigns** (can run in parallel — ~6 hours)
- Different area of codebase — analytics + fan sign-up.
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

## Score trajectory after V1

| Feature | Now | After V1 | After V2 | V1 build time |
|---|---|---|---|---|
| Auto-gig from calendar | 0 | 8 | 9 | 2–3h |
| Deep link campaigns | 0 | 9 | 10 | 6–8h |
| **Day 1 share card** | **0** | **9.5** | **10** | **3–4h** |
| One-tap announcement | 0 | 8 | 9 | 5–7h |
| Tonight draft automation | 0 | 8 | 9 | 3–4h |
| QR code gig-mode | 0 | 8 | 9 | 2–3h |
| Snap card read receipts | 0 | 5 | 8 | defer |
| Fan location heatmap | 0 | 2 (data) | 8 | 2h (V1 data only) |
| True Spotify pre-save | 0 | 4 (honest framing) | 10 | 30min (V1) |

**Overall killer features score:**
- Before V1 sprint: **0/10** (all features unbuilt)
- After Sprint 1 (auto-gig + deep links + Day 1 share card + QR): **8/10**
- After Sprint 2 (+ one-tap announcement + tonight draft): **9/10**
- After V2 (Supabase): **9.5/10**

The jump from 0 to 8 happens in a single sprint. The Day 1 share card, which takes 3–4 hours, moves the activation metric more than any other feature in this list.

---

## The case for the Day 1 share card as the top priority

The existing P0 list (auto-gig + deep links) is correct and these features are valuable. But neither of them generates new users. They optimise the experience of existing users.

The Day 1 share card is fundamentally different. It generates new users.

Here is the arithmetic:
- If 10 artists complete the wizard without the share card: 2 share (from memory), 8 dormant.
- If 10 artists complete the wizard with the share card: 7 share (frictionless, pre-written), 3 dormant.

That delta — 2 shares vs 7 — is compounding. Each share gets ABLE in front of fans who tell their friends who are artists. This is how organic growth works. The share card is not a nice-to-have UI polish. It is the primary growth mechanism.

---

## What success looks like after V1

An artist using ABLE after V1:
1. Completes the wizard. Sees "Your page is live." Copies the pre-written caption with one tap. Posts it immediately.
2. Adds a show. Forgets about gig mode. It turns on at doors time.
3. Posts a Story about their vinyl restock. Uses the campaign link from admin. 48 hours later: "47 people came from that Story. 12 signed up. 8 clicked the merch link."
4. EP goes live. Admin asks: "Let your fans know?" They tap publish on the snap card, copy the caption, done.

Those four moments are worth more than any amount of dashboard polish. They are moments where ABLE pays back the artist's trust in a way they can see and feel.

---

*This document supersedes any conflicting build priority from `docs/STATUS.md` for killer features specifically.*
*Update `docs/STATUS.md` when V1 builds are complete.*
