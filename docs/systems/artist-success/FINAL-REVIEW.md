# ABLE — Artist Success: Final Review
**Created: 2026-03-16 | Status: ACTIVE — build sequencing decision**
**Spec completeness: 8.5/10 → builds to 9/10 with email flows**

---

## Does ABLE currently do enough to get artists to value?

No.

The product is well-designed. The admin dashboard is clear. The onboarding wizard is smooth. The underlying architecture — nudge slot, milestone cards, greeting system, Campaign HQ — is solid. But none of it is wired to the artist's 30-day journey.

An artist who sets up ABLE today:
- Has no prominent "share your link" moment beyond a checklist item
- Gets no acknowledgement when their first fan signs up (unless they happen to be in admin at the right second)
- Receives no re-engagement if they go quiet after day 3
- Sees no summary of what happened at day 30

The product asks the artist to care about ABLE. ABLE does not yet demonstrate that it cares about the artist.

---

## What's the biggest risk?

**Artist sets up but never shares the link. Zero fans arrive. Artist cancels.**

This is not a product quality problem. It is an activation problem. The product works — it just never gets used.

Every downstream success metric (fan count, CTA clicks, upgrade rate, retention) depends on the artist sharing their link. That one action is the gate. If it doesn't happen in the first 24–48 hours, the probability of it happening at all drops sharply.

The product currently has no mechanism to prevent this.

---

## The V1 fix: Day 1 share card

The single highest-impact addition to `admin.html` is a full-width share card that appears at the top of the home section when the artist has zero page views.

It contains:
- The artist's link
- A pre-written Instagram caption (ready to copy)
- A pre-written TikTok caption (ready to copy)
- Copy that says exactly what the product does, in the artist's language:
  "Your page is ready. Share it in your bio and see who shows up."

It dismisses when the artist copies the link. Not before.

This card is the difference between "I set up ABLE once" and "I actually gave it a chance."

---

## What happens after the share card works?

Once the artist has shared their link and fans start arriving, the rest of the success system becomes relevant:

1. **First-visit card** — "Someone found you from Instagram." (amber milestone, manual dismiss) — makes the link feel real
2. **Fan milestone** — "3 people signed up. They came because of you." — makes the list feel meaningful
3. **Day 7 summary sub-line** — "47 visits, 12 fans. A real start." — gives context at the one-week mark
4. **Day 30 summary** — "This month: 340 visits, 67 fans, 23 clicks." — the artist sees the year they could have
5. **Tier nudge** (if 50+ fans): "You're past the point where this is an experiment." — the right moment to mention upgrading

These moments are not marketing. They are the product demonstrating value.

---

## Score: current → after P1 → after P2

| Stage | Score | Key change |
|---|---|---|
| Current | 4/10 | No activation, no milestones, no summary |
| + Day 1 share card + Day 3 milestone | 6.5/10 | Activation gap addressed, first fans acknowledged |
| + Full P1 nudge system (Day 7 + Day 14 + Day 30) | 7/10 | 30-day journey has structure |
| + P2 email flows (dormancy + monthly summary) | 9/10 | ABLE reaches artists even when they're not logging in |
| + P3 (cohort validation) | 9.5/10 | Nudge timing refined from real data |

---

## Build sequencing recommendation

### Build in this order

**1. `admin_visit_dates` tracking** (15 minutes)
Add to admin.html init. Everything time-based depends on this.

**2. Day 1 share card** (2–3 hours)
Highest impact. Addresses the biggest single failure mode. Ship this first.

**3. Day 1 first-visit milestone card** (1 hour)
Pairs with the share card — together they handle the artist's first 48 hours.

**4. Day 3 fan milestone + no-fans nudge** (2 hours)
Acknowledges the first fans, catches artists who haven't got any yet.

**5. Day 7 greeting sub-line + release nudge** (1 hour combined)
One-week check-in. Low effort, high signal.

**6. Fan cap warning** (1 hour)
Fan count check. Fire this on sign-up event too, not just on admin load.

**7. Day 30 summary card** (2–3 hours)
Monthly moment. The most complex in this list but one of the most valuable.

**8. Return-after-absence greeting** (30 minutes)
Extension of existing greeting system.

**Total V1 build: ~10–12 hours**

All zero backend. All zero new dependencies.

---

## What NOT to build in V1

**Re-engagement email** — requires Supabase auth + Resend. The V1 equivalent (return-after-absence greeting) is a reasonable proxy until backend is live.

**Monthly summary email** — same dependency. The in-app Day 30 card delivers the same content to artists who are logging in. The email reaches those who aren't — which is why it matters more in the long run.

**A/B testing nudge copy** — too much infrastructure for the current stage. Write one version, ship it, revise it based on what artists say.

**Personalised success score** — risks feeling gamified in a way that contradicts ABLE's values. The data is all available if this is ever built, but the design and copy need careful thought that isn't warranted before the basic nudge system is running.

---

## The test

After building the Day 1 share card, watch whether artists who see it go on to get their first fan within 7 days at a higher rate than those who don't. That is the validation. If the answer is yes, the rest of the nudge system is worth building in the same direction.

If the answer is no — the card was dismissed, ignored, or the captions weren't used — that is the signal to revise the copy and framing before going further.

The system is worth nothing if it is not tested against reality.

---

## What success looks like at 30 days

An artist using ABLE with the full success system in place:

**Day 0:** Sets up. Done screen says "Put that link in your bio before you close this tab." They do it.

**Day 1:** Opens admin. Share card is gone — they already copied the link. "Someone found you from Instagram." Amber card. Manual dismiss. They read it twice.

**Day 3:** "3 people signed up. They came because of you." They screenshot it and send it to their manager.

**Day 7:** "47 visits, 12 fans. A real start." They don't need a nudge. They're back tomorrow.

**Day 30:** "This month: 340 visits, 67 fans, 23 clicks." They upgrade.

That is the 30-day arc ABLE should deliver. Every item in this spec exists to make that arc more likely for more artists.

---

*This document supersedes any conflicting priority for artist success system from `docs/STATUS.md`.*
*Update `docs/STATUS.md` when P0 and P1 builds are complete.*
