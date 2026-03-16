# ABLE — Artist Success: Analysis
**Created: 2026-03-16 | Status: ACTIVE — strategy doc**
**Current score: 4/10 | Target: 9/10**

---

## The core problem

An artist can set up an ABLE page in 5 minutes and never share it. Nothing about the current product prevents this. There is no friction at setup that asks "have you shared this?" There is no follow-up. There is no signal that tells the artist their page is working.

The most likely failure mode for ABLE is not a bad product. It is a good product that artists set up and forget. The value is invisible until fans arrive. Fans only arrive if the artist shares the link. The artist only shares the link if something in the product prompts them to, or if they remember to on their own.

Most don't remember.

---

## Day-by-day scoring: current state

### Day 0 — Setup (score: 6/10)

`start.html` covers this reasonably well. The wizard guides the artist through name, vibe, accent colour, CTA type, and release info. A live preview shows the page being built. It outputs to `admin.html` on completion.

What works:
- 5-minute setup is realistic
- Live preview reduces uncertainty
- Guided identity system gives the page a cohesive feel from the start
- Done screen has "Share" and "Open dashboard" options

What's missing:
- No single clear "your link is ready — put it in your bio now" moment at the very end of setup
- The done screen reads more like a task list than a moment worth pausing on
- Success = page published, link copied — but there is no context around why that link matters right now, tonight

Score: 6/10 — functional but misses the emotional weight of what just happened.

---

### Day 1 — First share (score: 1/10)

This is the largest gap in the entire product. After setup, the artist sees their admin dashboard. There is a first-run checklist — functional, but framed as a task list, not an urgent moment. Nothing says "your page is live and waiting — have you shared it yet?"

The artist closes the tab. The link sits in a localStorage object. Zero fans arrive.

What exists:
- First-run checklist (§13 in admin DESIGN-SPEC) — steps include copying the link and sharing it
- Welcome email spec (docs/systems/email/SPEC.md §Email 2) mentions putting the link in the bio

What's missing:
- A full-width, prominent card in admin with: the link, a pre-written Instagram caption, a pre-written TikTok caption, and a reason to act now
- This card should appear at the top of admin if the artist has zero page views yet
- It should dismiss when they copy the link or tap share — not before

Score: 1/10 — the most important activation moment in the product has almost no support.

---

### Day 3 — First fans (score: 3/10)

When an artist gets their first fan sign-ups, the milestone card system (admin DESIGN-SPEC §7) does show something — but only if the artist is in admin when it runs, and the card auto-dismisses after 6 seconds. For an artist who has been posting for years and never known if anyone was paying attention, a fan signing up is genuinely significant. The product should treat it that way.

What exists:
- Fan count updates on admin home
- Milestone card is specced (but unreliably timed and auto-dismissed)

What's missing:
- A persistent milestone card — manual dismiss only
- Honest copy: not "Congratulations, you're growing your audience" — something like "3 people signed up. They came because of you."
- A follow-up: "Do you know what you're going to say to them?"

Score: 3/10 — the moment happens; the product underreacts.

---

### Day 7 — Check-in (score: 2/10)

If an artist hasn't logged into admin in 7 days, ABLE does nothing. No email. No indication that their page is still running. The artist may not even remember they have an ABLE page.

What exists:
- `admin_ever_visited` is set on first admin load — presence/absence only, not frequency
- No visit frequency tracking

What's missing:
- Re-engagement email: "Your ABLE page is still running. X people visited this week." (V2 — requires Resend)
- On next visit: a catch-up greeting — "Good to see you. It's been 7 days. Here's what happened."
- The one-week summary sub-line in the greeting (specced in admin DESIGN-SPEC §5.2, depends on `admin_visit_dates` tracking being live)

Score: 2/10 — nothing exists to bring the artist back if they go quiet.

---

### Day 14 — Release nudge (score: 4/10)

Admin has a pre-release nudge card (§9.1 moment 2) that shows when an artist saves a future release date. However:
- It is session-flagged (shows once, doesn't persist)
- It fires after the artist has already set a date — not when they haven't
- There is no nudge for artists who have been on ABLE for 2 weeks with no campaign set

What exists:
- Pre-release nudge (fires after setting a date)
- Gig mode nudge (fires after activating gig mode)

What's missing:
- A 14-day check: if no release date has been set and no campaign has been activated, show:
  "Setting a release date turns on pre-release mode — countdown timer, pre-save CTA. Worth adding even for back-catalogue."
- Contextual specificity: what state the artist is in, what campaign mode would give them

Score: 4/10 — nudge exists but targets the wrong moment (after action, not before).

---

### Day 30 — Retention (score: 2/10)

At day 30, ABLE does nothing. There is no summary. No "here's what happened." No moment where the artist sees the value they've received. There is also nothing that connects free tier limitations to the upgrade value at the moment when it's most relevant.

What exists:
- Analytics page shows all-time stats
- Fan count visible on admin home

What's missing:
- Monthly summary card: "This month: X visits, Y fans, Z clicks."
- Tier nudge for artists approaching the free cap: specific value of upgrading — not "upgrade to keep growing" (banned copy), but "You've got 67 fans. Artist plan removes the 100 fan cap and lets you email them directly."
- A reason to come back beyond checking a number

Score: 2/10 — the most natural retention moment in the monthly cycle goes unused.

---

## Where artists drop off: the case

The failure curve is almost certainly front-loaded:

**Day 0–1**: Setup is completed but the link is never shared. No fans arrive. The artist never sees value. Churn is invisible — they just stop logging in.

**Day 3–7**: Artist shared the link once, got 1–2 fans, then stopped. The product didn't acknowledge the milestone or nudge them toward more. They underestimate what they have.

**Day 14–30**: Artist has 30–40 fans and has no idea if that's good, bad, or what to do next. Nobody told them. No context. No direction.

The compounding problem: an artist who doesn't share the link on Day 1 almost never does. The activation window is narrow. Once the initial motivation from setup fades, it takes an external prompt to re-engage — and ABLE currently provides none.

---

## What nudges exist today

From `admin.html` §9.1:
- **Pre-release nudge card**: appears when artist saves a future release date. Session-flagged (shows once).
- **Gig mode nudge card**: appears when artist activates gig mode. Session-flagged.

That is all. Two nudges, both triggered by actions the artist already took. Neither addresses the activation failure (not sharing the link), the milestone gap (first fans deserving acknowledgement), the 7-day check-in, or the 30-day summary.

---

## What's missing: summary

| Moment | What's missing | V1 or V2? |
|---|---|---|
| Day 0 done screen | Emotional beat + bio link urgency | V1 (start.html minor edit) |
| Day 1 share card | Prominent admin card, link + caption drafts, triggers on zero views | V1 (admin.html) |
| Day 3 first fans | Persistent milestone card, manual dismiss, honest copy | V1 (admin.html) |
| Day 7 check-in | Re-engagement email | V2 (Resend) |
| Day 7 greeting | One-week summary sub-line (depends on `admin_visit_dates`) | V1 (admin.html) |
| Day 14 release nudge | Nudge for artists who have NOT set a date (not those who have) | V1 (copy fix + trigger) |
| Day 30 summary | Monthly summary card + contextual tier nudge | V1 (logic) / V2 (email version) |

The single highest-impact addition: **the Day 1 share card in admin.html**. Everything else builds on fans arriving. Without that, the milestone, check-in, and summary moments never have anything to say.

---

## Overall score: 4/10

The admin.html design spec is excellent. The nudge system architecture in `docs/pages/admin/DESIGN-SPEC.md` is sound. The gap is in the connective tissue — the system that knows where the artist is in their 30-day journey and responds to it.

A well-designed dashboard that an artist never comes back to is a 4/10 product. The nudges are what turn it into something that earns loyalty.

---

*Next: See `SPEC.md` for the complete artist success playbook with all copy and trigger conditions.*
*See `PATH-TO-10.md` for implementation path and scoring milestones.*
*See `FINAL-REVIEW.md` for build sequencing recommendation.*
