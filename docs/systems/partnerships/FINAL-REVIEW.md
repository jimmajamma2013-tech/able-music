# PARTNERSHIPS.md — Final Review
**5 quality gate questions**
**Date: 2026-03-16**

---

## Quality Gate 1

**If James handed this document to a developer today, could they build the Spotify integration without any additional research?**

**Answer: Yes, with one exception.**

The spec provides: OAuth 2.0 PKCE flow, required scopes (`user-read-private`, `user-read-email`, client credentials for public artist data), the distinction between public artist data (no user OAuth) and personalised features (full auth code flow), the redirect URI pattern (`able.fm/spotify-callback`), 24-hour TTL caching in `able_spotify_cache`, fallback to cached data on API downtime, and the explicit instruction to never show an error to the fan.

The one exception: the spec notes that pre-save requires a Spotify for Artists partnership agreement but does not specify where to apply. This is a V2 concern, not a V1 blocker. For V1, the integration is fully buildable from the document.

---

## Quality Gate 2

**If an Abler reads Section 5 in full, do they understand exactly how much they will earn and when they will be paid?**

**Answer: Yes.**

The commission table is explicit: 20% for 6 months (Fan Abler), 25% for 12 months (Creator Abler), 30% for 12 months (Partner Abler). The qualification thresholds are specified (10+ referrals or 10k+ social reach for Creator). The payout mechanics are clear: Stripe Connect or bank account, monthly on the 1st, £20 minimum threshold, 3–5 business day settlement. What counts as a conversion is defined (artist upgrades to paid tier, completes onboarding, has at least 1 fan sign-up within 30 days). What does not count is also defined (self-referrals, same-IP conversions, accounts that lapse within 30 days).

The only nuance not spelled out: earnings on tiered accounts. If an Abler's referral upgrades from Artist (£9) to Artist Pro (£19) mid-commission-period, does the rate apply to the new price? The spec should clarify: "Commission applies to the subscription fee at the time of billing cycle — if a referred artist upgrades, the higher rate applies from the next billing cycle."

---

## Quality Gate 3

**Does the document make ABLE more attractive to a potential partner, or does it read like an internal spec?**

**Answer: It reads as an internal spec — which is correct. But it contains the seeds of an external pitch.**

The document is deliberately an internal working document. It is not a partner deck. However, Section 8 ("ABLE Positioning in Partnerships") contains the raw material for a compelling external pitch: the audience size claim (500–5,000 engaged artists), the positioning point (authentic, not corporate), and the "build first, pitch with data" strategy.

For the first real partnership conversations (music schools, management companies), James will need to extract Section 8 into a 2-page partner brief. The internal spec is the right place to start — the brief should come from it, not replace it.

---

## Quality Gate 4

**Does any part of this document contradict ABLE's core promise to artists?**

**Answer: No. The document consistently reinforces it.**

Three specific checks:

- **Fan email data:** The anti-patterns section explicitly prohibits sharing fan email data with any partner. The individual integration specs confirm this per-partner (Spotify: "no fan data sent," Bandsintown: "no fan data sent," Resend: "fan email addresses passed to Resend only at send time — not held in Resend as a contact list").

- **0% commission promise:** The spec does not create any undisclosed revenue mechanism from artist-to-fan transactions. The Stripe Connect section notes ABLE's suggested 5% platform fee and states this is disclosed before setup.

- **Artist ownership:** The Abler programme pays Ablers from ABLE's subscription revenue, not from a cut of the artist's earnings. The artist never pays for being referred.

The document is internally consistent with the strategy.

---

## Quality Gate 5

**Does the spec make the right call on what to build in V1 vs. defer?**

**Answer: Yes. The four V1 integrations are the correct four.**

The case for each:

- **Spotify:** Removes the empty state problem — the single biggest onboarding friction. Without this, artists have to manually enter their discography. With it, the profile is 70% populated in 10 seconds. Non-negotiable for V1.

- **Bandsintown:** Shows are a time-sensitive asset. An artist with a show in 10 days needs that show on their profile now. Manual entry is error-prone and adds friction. Auto-sync is low effort to build and high value to the artist. The API is free and requires no partner negotiation.

- **oEmbed:** Without embeds, the profile is a list of links — exactly what Linktree is. Music, video, and podcast embeds make the profile a destination, not a directory. This is fundamental to ABLE's positioning.

- **Resend:** Without email, ABLE cannot fulfill its core promise. The fan signs up. The artist needs to know. The fan needs confirmation. Without email, the sign-up is a silent event with no proof. Resend is the infrastructure for the product's most important moment.

What is correctly deferred:

- **Stripe Connect** is deferred because it depends on the Support Pack product, which depends on having artists who have proven the basic profile works. Building payment infrastructure before the product has users is premature.

- **Linktree CSV import** is deferred because it is a switcher's tool. You need people wanting to switch before you need the migration tool.

- **PostHog** is deferred because it answers product questions ABLE doesn't have at launch. Before 50 active artists, the analytics are noise.

The phasing is correct.

---

## Summary Verdict

`PARTNERSHIPS.md` is ready to use as a working authority document. It is not a finished artefact — the three improvements identified in PATH-TO-10.md (risk assessment depth, Bandsintown scaling note, V2 technical integration specs) should be addressed before Month 4 when the first commercial partnership conversations begin.

The document is at **9.0/10**. To reach 9.5/10, address the risk and scalability gaps. To reach a true 10/10, the document would need one year of real partnership experience written back into it — the commercial terms will sharpen once ABLE has sat across the table from BIMM and a management company and knows what actually works.

**The old `ECOSYSTEM_AND_PARTNERSHIPS.md` was 3.5/10.** It was a vision document pretending to be a working spec. It had valuable ideas (Rooms, Music Map, Press Pack Generator, Story Mode) that belong in a future roadmap doc but made the current document unactionable. Those ideas are explicitly preserved — they are not lost, just deferred to the correct location.

The new spec is the operational document. The old doc is the dream list. Both have their place.
