# Investor Readiness — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is when an investor says "I've never seen this data before" — and means it about ABLE's data specifically, not just the pitch.

---

## Moment 1: The Live Demo in Pre-Release Mode

**What it is:** The product demo opens on a real artist's profile with a live countdown running — 8 days, 14 hours, 23 minutes — and the investor watches a fan sign up in real time.

**Why it's 20/10:** Most SaaS demos show a polished mock with invented data. The ABLE demo shows a real artist's page — a name the investor can search, a countdown tied to an actual release date — and the fan sign-up form captures a real email that goes into the real fan list. When the screen cuts to admin.html and the new fan appears in the list with a timestamp from 45 seconds ago, every abstract claim about "fan ownership" becomes concrete. The investor is not being shown what the product will do. They are watching it do it.

**Exact implementation:**

Demo setup protocol — run this before any investor meeting or recording:

1. Choose a real artist profile (with permission). Not a demo account. A real artist who has used ABLE for at least 30 days and has at least 20 fans.
2. Set `able-v7.html` to pre-release mode with a real upcoming release date.
3. Open admin.html on a second tab, fan list visible, last 5 sign-ups shown.
4. Set browser DevTools to 375px viewport for mobile simulation.
5. Disable browser notifications and any personal tabs.

Demo flow — the four-screen sequence:

```
[0:00] Open able-v7.html at 375px. Let the page load. Say nothing.
       — Artist name, artwork, countdown visible. No narration for 5 seconds.

[0:05] Scroll slowly past music section, events, fan CTA.

[0:30] Tap "Stay close." (or current fan CTA). Sign-up sheet slides up.
       Fill in a real email address. Submit.
       — Confirmation appears: "You're on [Name]'s list."
       — Say: "That email belongs to the artist. Not ABLE. Not Instagram."

[1:15] Switch to admin.html. Navigate to fan list.
       — The just-submitted email is at the top, timestamped 45 seconds ago.
       — Source badge: "Direct" or "Instagram" (whichever is accurate).
       — Campaign state at sign-up: "Pre-release".

[2:00] Say: "That column — the moment they signed up — is something Linktree cannot tell you."
       — Hold on the fan list for 10 seconds. Let the investor read the data.

[2:30] Navigate to Campaign HQ. Switch state to Profile. Switch back to the profile page.
       — Countdown gone. Default profile view. One change in admin, page transforms.

[3:30] Open Linktree profile in second tab. Hold for 5 seconds. Return to ABLE tab.
       — No narration needed.
```

---

## Moment 2: The Data Slide That Has Never Been Seen Before

**What it is:** A single table in the investor deck showing fan acquisition rate by campaign state — pre-release, live, gig, profile — with a real conversion rate for each. The slide has no design beyond the table and one sentence of annotation.

**Why it's 20/10:** Every other link-in-bio platform shows page views and clicks. ABLE shows fan conversion rate by what the artist was doing at the time. "Pre-release: 8.4% conversion. Live: 5.1%. Gig: 11.2%. Profile: 2.3%." An investor with a portfolio of creator tools looks at this and knows they have never seen it before — because no other platform has the concept of campaign state. This is not a better version of existing data. It is a new category of data that only exists because ABLE was designed around the music release cycle.

**Exact implementation:**

The slide — exact layout (this is not a template, this is the spec):

```
ABLE knows what Linktree doesn't.

Campaign state at fan sign-up:

State         Visits    Sign-ups    Conversion
──────────────────────────────────────────────
Pre-release   1,840       154         8.4%
Gig mode        612        69        11.2%
Live week     2,103       107         5.1%
Profile       4,211        97         2.3%

The same artist. The same page. Different moments.
Pre-release converts fans at 3.6× the rate of a default profile.
```

No chart. No colour coding. The table speaks. The annotation below the table is one sentence. The insight is in the numbers, not the presentation.

When ABLE has enough real data to populate this table (60+ artists, 3+ months), this becomes the strongest single slide in the deck. Until then, it is the story being built toward — the reason the `campaignState` field was added to fan records from day one.

---

## Moment 3: The Monthly Update That Builds the Relationship Before the Ask

**What it is:** The investor who eventually writes a cheque has been receiving a 200-word monthly update for at least three months before any raise conversation starts. They already know the MRR trend, the one honest challenge, and the metric being watched.

**Why it's 20/10:** The worst time to meet an investor is when you need money. The best time is when you don't — when you can report a win, acknowledge a challenge, and ask a specific question that their experience can actually answer. The monthly update converts a cold outreach into a warm conversation. By the time ABLE is raise-ready, the investor has already decided whether they trust the founder. The update is the trust-building mechanism. The raise is just the conclusion of a relationship that started with honest numbers sent monthly.

**Exact implementation:**

Monthly update email — exact structure (200 words maximum, hard limit):

```
Subject: ABLE — [Month] [Year]

MRR: £[X] ([+/-X%] from last month)
Paying artists: [N]

---

This month's win:
[One specific thing. "Artist Kwame referred two colleagues after his fan list hit 40 emails.
Both signed up within 48 hours." Not "word of mouth is working."]

This month's challenge:
[One honest thing that isn't where it should be. "Free → paid conversion is at 6%,
below my 12% target. Testing new upgrade gate copy this week — specifically whether
naming the 100-fan limit explicitly converts better than the current vague lock icon."]

The metric I'm watching:
[The forward-looking signal. "Fan capture rate per profile — currently 5.8%,
targeting 8%. This is the number that tells me the campaign states are doing their job."]

One question for you:
[A specific, answerable question. "Have you seen any music tools successfully use
gig-specific urgency (tonight only, QR at the door) to convert passive fans to
email subscribers? Trying to decide whether to push gig mode harder in the next campaign."]

James
```

The rule that makes this work: the challenge line is not optional. An investor who receives three updates without a challenge line stops trusting the updates. The candour is the thing that makes the wins credible.

---

## The 20/10 test

An investor watches the live demo, sees the campaign state fan capture table, and emails within 24 hours asking for a call — not because they were sold to, but because they saw data they hadn't seen before and wanted to understand what it meant.

---

*See also: `docs/systems/investor-readiness/INVESTOR-READINESS.md` — full metrics spec, demo script, and data room structure*
