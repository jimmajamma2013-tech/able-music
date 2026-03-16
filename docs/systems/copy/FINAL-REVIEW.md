# ABLE Copy System — Final Review
**Created: 2026-03-15 | Projected scores post-implementation**

> This document captures the final projected scores after all improvements in PATH-TO-10.md are completed, and provides the copy calibration test — 10 before/after rewrites that anyone can use to check whether new copy fits ABLE's voice.

---

## Final scores (projected post-P1)

| Dimension | Current | After P0 | After P1 | Notes |
|---|---|---|---|---|
| 1. Platform voice consistency | 7/10 | 8.5/10 | 9.5/10 | "dashboard" violations fixed; greeting system live |
| 2. Banned phrases compliance | 7.5/10 | 9/10 | 9.5/10 | All confirmed violations fixed; Playwright test in P2 |
| 3. Artist default copy | 8.5/10 | 9/10 | 9.5/10 | Placeholders specced; OG meta corrected |
| 4. Empty state copy | 6/10 | 7/10 | 9/10 | Admin empty states verified and implemented in P1 |
| 5. Error state copy | 7/10 | 7.5/10 | 9/10 | Full error spec written in P1; admin confirm() dialogs remain |
| 6. Notification/toast copy | 6.5/10 | 8/10 | 9.5/10 | Toast audit complete in P0/P1; error toasts specced |
| 7. Microcopy precision | 8/10 | 8.5/10 | 9.5/10 | Editor placeholders specced in P0 |
| 8. Admin copy | 8/10 | 8.5/10 | 9.5/10 | Greeting live; motivation cards implemented |
| 9. Fan copy | 8.5/10 | 8.5/10 | 9.5/10 | fan.html Phase 2 — score reflects spec quality |
| 10. Copy documentation | 9/10 | 9.5/10 | 9.5/10 | Master spec now exists; contractor-ready |

**Overall after P1: 9.5/10**
**Overall after P2 (regression test + AI): 10/10**

The path from 9.5 to 10 requires the Playwright copy regression test (so the score is machine-verifiable) and the AI copy suggestion spec (which completes the copy system as a product feature, not just a style guide).

---

## What 10/10 looks like

A score of 10 means:
1. Every visible string across all active pages has been written against the spec — not typed inline by a developer
2. The Playwright regression test runs on every build and fails if a banned phrase is present
3. A contractor can be given SPEC.md and PATH-TO-10.md and produce correct copy without a brief
4. Artists can optionally receive copy suggestions from ABLE that are on-register
5. The copy documentation is updated in the same commit as any copy change in code

ABLE is currently at ~7.5. The foundation is excellent — the gap is implementation consistency and systematic enforcement. Nothing about the philosophy needs to change.

---

## Copy calibration test

**How to use this:** Read both the "before" and "after" versions. If you cannot feel the difference, read the SPEC.md section 2.2 register table and try again. If a line you have written feels closer to the "before" versions, rewrite it.

This is the test. Ten pairs. If your copy reads like the "after" column, it's on register.

---

### Test 1: Fan sign-up heading

**Before**
> Subscribe to get updates from this artist

**After**
> Stay close.

**What changed:** "Subscribe" is a platform category. "Get updates" is passive and generic. "Stay close." is the artist inviting the fan into proximity. The period is intentional — it's a complete thought, not an instruction.

---

### Test 2: Post sign-up confirmation

**Before**
> You're subscribed! We'll keep you updated with news and releases.

**After**
> You're in. I'll keep you close.

**What changed:** "Subscribed" is a transaction. "We'll keep you updated" is a platform promise. The after version is the artist speaking directly. "I'll keep you close" implies a relationship, not a broadcast. "You're in." is three syllables and says everything.

---

### Test 3: Admin page greeting

**Before**
> Welcome back, James! You're on a roll — 3 new fans this week. Keep it up!

**After**
> Good to see you, James.
> 3 fans this week — that's new.

**What changed:** "Welcome back" is SaaS filler. "You're on a roll" is sycophantic. "Keep it up!" has an exclamation mark and is condescending. The after version greets warmly (one beat), then gives the artist information without editorialising. "That's new" is an observation, not a compliment.

---

### Test 4: Tier upgrade prompt

**Before**
> Upgrade to Artist Pro to unlock full analytics, email broadcasts, and advanced fan insights. Start your 14-day free trial today.

**After**
> Write to your fans directly.
> Not a broadcast. Not a newsletter. Just you and the people who signed up.
> From £19/month.
> See Artist Pro →

**What changed:** "Upgrade to unlock" is the paradigm where the platform withholds value and charges to release it. "Advanced fan insights" is buzzword copy. The after version describes what the artist can actually do (write to their fans), distinguishes it from what it is not (a broadcast, a newsletter), prices it honestly, and gives a specific CTA. No trial pressure.

---

### Test 5: Admin empty fan list

**Before**
> You have no fans yet. Start sharing your page to grow your audience and build your fanbase.

**After**
> When fans sign up on your page, they'll appear here.
> Your list. Your relationship. No algorithm in the way.

**What changed:** "Grow your audience" and "build your fanbase" are banned. "No fans yet" makes the artist feel like they've failed. The after version describes what will happen (not what hasn't happened yet) and explains the value of the feature (it's theirs, directly, no algorithm). The artist does not feel judged for having an empty list.

---

### Test 6: Email validation error

**Before**
> Error: Please enter a valid email address to continue.

**After**
> Check your email address.

**What changed:** "Error:" is cold and formal. "Please enter a valid" is bureaucratic. "To continue" implies the system is gatekeeping. The after version is calm, specific, and trusts the user to know what "check your email address" means. Four words.

---

### Test 7: Onboarding step — fan CTA screen

**Before**
> Choose your call-to-action. This is the button fans will see on your page. Select the option that best fits your goals.

**After**
> What do you want fans to do when they land on your page?
> One action. What matters most right now?

**What changed:** "Call-to-action" is marketing jargon. "Select the option that best fits your goals" is corporate consulting speak. The after version asks a direct question in plain language, and the sub-line focuses the decision. "What matters most right now?" acknowledges that the answer changes — the artist isn't locked in.

---

### Test 8: Onboarding done screen

**Before**
> Congratulations! You're all set. Your profile is live and ready to share. Start by sharing it on your social media to get your first fans.

**After**
> Your page is live.

**What changed:** "Congratulations" is the voice of a platform congratulating itself on completing a form. "You're all set" is banned. "Start by sharing it on your social media to get your first fans" is growth advice from a marketing tool. "Your page is live." is a fact. A consequential fact. That is the moment. Saying more makes it smaller.

---

### Test 9: Close Circle invitation

**Before**
> Join [Artist Name]'s inner circle for exclusive content, early access to new music, and premium fan perks. From just £4.99/month. Cancel any time.

**After**
> Stay closer.
> A small group of people get things a bit earlier — new music before it's out, first shot at tickets, occasional messages that don't go everywhere.
> £5 a month. You can leave whenever.

**What changed:** "Exclusive content" is banned — it is the language of paywalled YouTube. "Premium fan perks" is subscriptionbox marketing. "From just £4.99" uses pence (banned) and the word "just" which minimises the price dishonestly. The after version describes specifically what the fan actually gets, in plain language, without hype. "You can leave whenever" is more honest and less pressured than "Cancel any time" — one is a human assurance, the other is a terms-of-service clause.

---

### Test 10: Admin section — empty shows

**Before**
> No shows added. Click the Add Show button to add your first event and start engaging with local fans.

**After**
> Playing anywhere soon?
> Add the venue and date — your fans can get tickets without leaving your page.

**What changed:** "No shows added" describes an absence. The after version asks a question that implies possibility. "Start engaging with local fans" is banned (both "engaging" and "local fans" as a metric). The after version explains the value of adding shows (fans can get tickets without leaving) rather than just instructing the artist to click a button.

---

## Summary of what makes ABLE copy different

**It is not:**
- Cheerful or affirmative
- Growth-oriented or metric-obsessed
- Platform-focused (ABLE is never the subject of its own copy)
- Written for conversion

**It is:**
- Direct — says one thing, then stops
- Honest — does not spin empty states or failures
- Specific — "3 fans this week" not "your audience is growing"
- First-person where possible — the artist is the author, ABLE is the door
- Understated — British product, UK register, the period does more than the exclamation mark

The single test: **would an independent artist with real credibility be embarrassed if this appeared on their page?**

If yes — rewrite it.
If no — ship it.
