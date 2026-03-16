# ABLE — Launch Sequence: Path to 10/10
**Last updated: 2026-03-16**

> This is the checklist. SPEC.md is the strategy. ANALYSIS.md is the diagnosis. FINAL-REVIEW.md is the score.
> Work through this in order. Do not skip items. Each item has a clear done state.

---

## Phase 0 — Before any artist touches the product

### P0.1 — James's own ABLE page
**Done when:** A live URL exists that James is comfortable sharing with a musician he respects.

- [ ] Complete start.html onboarding wizard with real data (not test data)
- [ ] Real bio written in James's actual voice
- [ ] At least 1 real music link or creative work linked
- [ ] Accent colour and vibe chosen deliberately
- [ ] Hero CTAs pointing to something real
- [ ] Fan sign-up wording feels genuine
- [ ] Page loads cleanly at 375px, 390px, and 430px
- [ ] Page URL noted and saved

**Confidence check:** Would James share this URL in a DM to an artist he knows and say "this is what I built"? If yes: done. If not: keep working.

---

### P0.2 — End-to-end flow tested personally
**Done when:** James has completed every step below without errors, in a clean browser.

- [ ] Clear all localStorage (DevTools → Application → Clear All)
- [ ] Open landing.html — does the value proposition land in under 10 seconds?
- [ ] Tap hero CTA — does start.html open?
- [ ] Complete wizard with Spotify URL (if Spotify import is wired) or manually
- [ ] Arrive at able-v7.html — is the page compelling?
- [ ] Open admin.html — does the greeting appear? Is the dashboard navigable?
- [ ] Set campaign state to "pre-release" with a future date — does the page switch?
- [ ] Set campaign state to "gig" — does the page switch? Does the countdown appear?
- [ ] Sign up as a fan (incognito window) — does the flow complete?
- [ ] Check admin.html fan list — does the fan appear with the correct source?
- [ ] Activate gig mode, wait for auto-deactivate at midnight (or manually test the logic)

**Bug log:** Any failure above = P0 bug. Log it, fix it, retest before moving forward.

---

### P0.3 — 5 real fan sign-ups on James's page
**Done when:** James's own page has 5 real fan emails in the fan list from real people.

- [ ] Share the page URL with 5 real people (friends, genuine music listeners, people who'd care)
- [ ] Confirm the sign-up flow works for each person
- [ ] Confirm each fan appears in admin.html with a source
- [ ] Confirm the confirmation email arrives and sounds right

**Note:** These are real people. Don't ask them to "test" anything. Ask them to sign up because you're sharing something you made. The difference matters.

---

### P0.4 — Named beta artist list
**Done when:** A document exists with 12 artists (10 primary + 2 buffer), contact method, and why each is on the list.

- [ ] List 12 artists James knows personally or has a genuine warm path to
- [ ] For each: name, contact method, genre/vibe, why they're a good fit
- [ ] For each: confirm at least 1 active social account or recent release
- [ ] Genre check: at least 4 different vibes from the 7-vibe system represented
- [ ] At least 1 artist who is less digitally fluent (tests onboarding for non-technical users)
- [ ] At least 2 who are not UK-based (tests international relevance)
- [ ] **At least 3 with an imminent release or gig (within 6 weeks)** — this is required, not preferred. The campaign state system is ABLE's most differentiating feature and it goes untested without real urgency.
- [ ] 2 buffer artists clearly marked — if a primary artist drops out, approach these two next
- [ ] James is confident each primary artist will say yes to a personal invitation

**Format:** This can be a simple list in a text doc or a note. It does not need to be a spreadsheet.

---

### P0.5 — Smoke test suite passing
**Done when:** Playwright smoke tests cover all critical paths and pass on a clean run.

- [ ] Test: start.html wizard completes without errors
- [ ] Test: able-v7.html renders correctly for each of the 4 campaign states
- [ ] Test: fan sign-up stores correctly to localStorage
- [ ] Test: admin.html fan list shows sign-ups with correct source
- [ ] Test: campaign state change in admin reflects on able-v7.html
- [ ] Test: gig mode activates and deactivates correctly
- [ ] Test: all 4 themes (Dark / Light / Glass / Contrast) render without layout breaks at 375px
- [ ] Test: no horizontal scroll at 375px on any page

---

### P0.6 — Product deployed to live URL
**Done when:** landing.html is accessible at a real public URL with HTTPS.

- [ ] Deploy to Netlify (drag-and-drop deploy — no build pipeline required)
- [ ] Confirm HTTPS is active and certificate is valid
- [ ] Test the live URL on mobile data (not Wi-Fi) on an actual phone
- [ ] Test the live URL on Android and iOS (different browser engines)
- [ ] Page title and og:image set correctly for when the URL is shared on social

**Why this is P0:** The "here's what I built" post and every artist outreach will share a URL. That URL must work before any outreach begins.

---

## Phase 1 — Private beta (10 artists, 2 weeks)

### P1.1 — Onboarding infrastructure ready
**Done when:** James can onboard each artist smoothly without improvising.

- [ ] Opening DM written (see below — exact message, not just talking points)
- [ ] Onboarding talking points written (5 things James knows cold — not reads off a script)
- [ ] WhatsApp group or Discord channel created for beta artists
- [ ] Feedback template written: 3 questions James will ask at end of Week 1 and Week 2
- [ ] Fix turnaround target communicated to beta artists: "I'll fix anything reported within 48 hours"
- [ ] James's availability confirmed: he can respond to messages within 4 hours during Phase 1

**The opening DM (exact message for artist outreach):**

```
Hey [Name],

I've been building something for musicians for the past few months and I want to show it to
a small group of people I actually respect before it goes anywhere wider.

It's a profile page that owns the fan relationship — instead of Linktree, where fans tap
and disappear, this captures their email directly so you have a list that belongs to you.
It also knows where you are in your release cycle — pre-release, drop day, on tonight —
and switches automatically so your page always feels right for the moment.

Would you be up for trying it? Completely free, I'd walk you through it in 10 minutes,
and honest feedback — including if you think it's not for you — is what I need.

[James]
```

**Key principles for this DM:**
- Personal. Never copy-paste to multiple people at once without adjusting the name and one detail.
- Not a feature list. Not pricing. Not "sign up now."
- Direct ask: "Would you be up for trying it?" Not "check it out when you have a chance."
- The word "respect" is load-bearing. It is not flattery — it signals that James is selective.

---

### P1.2 — All 10 artists onboarded
**Done when:** 10 artists have live pages.

For each artist:
- [ ] Personal outreach made (not a group message — individual conversations)
- [ ] 1:1 onboarding conversation completed (in person, call, or voice notes)
- [ ] Artist has completed start.html wizard
- [ ] Artist's page is live at their URL
- [ ] Artist has the WhatsApp/Discord channel link
- [ ] Artist has been shown how to access admin.html

---

### P1.3 — 100 real fan sign-ups
**Done when:** Aggregate fan count across all 10 pages reaches 100.

- [ ] Track sign-up count weekly
- [ ] If any artist is below 5 fans after Week 1: check if their link is in their bio, offer to help
- [ ] Confirm source tracking is working

---

### P1.4 — Week 1 and Week 2 feedback collected
**Done when:** James has heard from at least 8 of 10 artists at each checkpoint.

- [ ] Send Week 1 prompt individually (not to the group)
- [ ] Log every piece of feedback received
- [ ] Identify the top 3 friction points
- [ ] Fix at least 1 friction point before Week 2 prompt
- [ ] Check all Phase 1 success criteria before declaring Phase 2 ready

---

## Phase 2 — Soft launch (50 artists target)

### P2.1 — The "here's what I built" post
**Done when:** The post is written, reviewed, and scheduled.

- [ ] Post written in James's voice — founder story, not product announcement
- [ ] No feature lists, no pricing, no exclamation marks
- [ ] Ends with a personal invitation to reach out, not a CTA button
- [ ] Includes a link to James's own ABLE page (the proof)
- [ ] Reviewed by one other person who knows James well (does it sound like him?)
- [ ] Posted on the platform where James has an actual music-adjacent audience

---

### P2.2 — Producer seeding strategy (the bridge from 10 to 50)

This is the highest-leverage Phase 2 action. It is not a fallback — it is a planned channel that operates in parallel with word-of-mouth from the 10 beta artists.

**The logic:**

Word-of-mouth from 10 artists works in theory but is uncontrolled in practice. A producer with 6–12 artist clients can deliver multiple artists from a single outreach. Twenty producer outreaches, at 25% conversion (5 producers), with an average of 7 artist clients each = 35 additional artists. Combined with word-of-mouth from the original 10 = 50 artists is achievable without the entire plan depending on spontaneous enthusiasm.

**How producer seeding works:**

The offer to producers is different from the offer to artists. The producer is not ABLE's user in the same way — they are a multiplier. The pitch to a producer is:

- "You already manage the digital presence of 6–8 artists. ABLE gives each of them a better link-in-bio that captures fan emails, handles their release campaigns automatically, and looks completely different from every Linktree they're currently using."
- "You can set it up for them in the time it would take to rebuild their Linktree. They get a tool that actually works for their career. You get to be the person who introduced it."
- "Free Artist Pro for life, for you — forever, not a trial — in exchange for setting up your first 3 artists on ABLE."

The "free Artist Pro for life" is not a discount. It is a recognition that a producer who converts 3 or more artists is worth more than any paid tier revenue from them directly.

**The producer outreach DM (exact message — different from artist DM):**

```
Hey [Name],

I've been building a platform for independent musicians — a profile page that owns the
fan relationship instead of handing it to Linktree. It also handles campaign states
automatically (pre-release countdown, drop day mode, gig mode on the night) so artists
don't have to manually update their bio link every release cycle.

I know you work with [X / several] artists. The offer: if you set up 3 of your artists
on ABLE, I'll give you Artist Pro for life. No monthly fee, no trial, permanent.

It takes about 10 minutes per artist — less if you use the Spotify import. Happy to walk
you through it if that's useful.

Would that be worth a conversation?

[James]
```

**Key differences from the artist DM:**
- Leads with the time-saving benefit to the producer, not the artist identity benefit
- Explicit offer stated upfront (producer is evaluating ROI, not just curiosity)
- "Set up 3 of your artists" — specific action, specific threshold, specific reward
- "10 minutes per artist" — respects their time, makes it concrete

**The 20 producer targets:**

Identify 20 producers who:
- Have 5–15 independent artist clients (not major label roster — independent)
- Have visible credits on releases by artists who would benefit from ABLE
- Are reachable by James directly (Instagram, Twitter/X, LinkedIn, mutual connection)
- Are based in markets ABLE wants to be strong in first (UK first, then US/EU)

**Where to find them:**
- Credits on recent independent releases (DistroKid artists, Bandcamp releases, small label rosters)
- SoundBetter and AirGigs profiles (session musicians and producers with client lists)
- LinkedIn: "music producer independent" + UK geography
- Twitter/X: music production communities, #producerlife, #beatmaker — filter for professionals with client mentions

**Outreach goal:** 20 DMs sent within the first 2 weeks of Phase 2. Not all at once — 3–4 per day over a week.

---

### P2.3 — The press story (written, not yet sent)

**When to send:** After Phase 2 success criteria are met (50 artists, 500 fans, 1 paid upgrade). Not before.

**The story that is actually true right now:**

"Independent musician builds the tool he always wished existed — after a herniated disk forced him off stage, he built what became ABLE using AI agents to write faster than a team. It's not another link aggregator. It's a profile that knows what moment the artist is in."

This story works because:
- It is personal (James's own situation — C5/C6 injury, forced pivot, genuine need)
- It is specific (AI agents to build, single-file architecture, no VC funding)
- It has a philosophy (artist owns the fan relationship, no cut taken, fan emails belong to the artist)
- It has a product hook (the page state system — no other tool knows when the artist is on tonight)

**The journalists who would write this (specific, not just publications):**

| Name | Publication | Why |
|---|---|---|
| Stuart Dredge | Music Ally | Covers music tech products and founder stories in depth. Consistent advocate for independent artist tools. |
| Cherie Hu | Water & Music | Explicitly covers fan-owned relationships and direct-to-fan tools. ABLE's philosophy is aligned with what she writes about. |
| Murray Stassen | MBW | Music Business Worldwide — covers industry tools and platforms at the independent end. |
| Anyone writing for the Music Ally Sandbox section | Music Ally | Sandbox specifically covers early-stage music tech. No user requirement — the idea and founder story qualify. |

**What to send (not a press release — a personal note):**

```
Hi [Name],

I'm building a tool called ABLE — a link-in-bio for independent musicians that owns the
fan relationship instead of handing it to the platform. The artist keeps the fan emails.
No algorithm in the way. The page knows when you're pre-release, live, or on tonight,
and switches automatically.

I built it after a herniated disk kept me off stage and I had too much time to think
about what independent artists actually need from their online presence. I've been
building it mostly alone, using AI agents for a lot of the heavy lifting — which is
its own unusual story.

10 artists are on it now. I'm not ready for coverage yet — I wanted to introduce myself
first and flag that in 6–8 weeks, when Phase 2 completes, there might be a story here
worth writing. If that sounds interesting, I'll send you the details when the numbers
are real.

[James]
```

**Why to send this now (before Phase 3):** This is not a press pitch. It is an introduction. Journalists who receive unsolicited introductions before any ask is made remember the person who did it differently from people who cold pitch when they want coverage. Send this at the Phase 2 midpoint (when 25+ artists are live and the story is gaining weight). The actual pitch comes when the Phase 2 criteria are met.

**Where to find contact details:**
- Twitter/X DMs (most music journalists are reachable this way)
- LinkedIn
- Their publication's contributor page often has a contact form or email

---

### P2.4 — Risk mitigation: if word-of-mouth from 10 artists doesn't produce 40 more

This is the honest contingency. Not a backup plan — a parallel plan.

**The scenario:** Phase 1 completes. The 10 beta artists are engaged. They recommend ABLE to some friends. 4 weeks into Phase 2, the artist count is at 22 — not 50.

**The response (not a crisis, a sequence):**

1. Producer seeding activates at full pace. All 20 DMs have been sent. Follow up with anyone who didn't respond in the first 2 weeks. Producer seeding is the primary bridge — it was always going to be needed.

2. James's "here's what I built" post goes out on his highest-attention platform. Not a second post — a repost or reshare on a second platform (e.g. if Twitter was first, LinkedIn next). The post is the same story on a different audience.

3. Music Ally Sandbox outreach. If the artist count is 22+ and there's genuine traction (real fans signed up, real artists with links in bio), the Sandbox story pitch is now justified. Send the "introduction email" from P2.3.

4. One music community post. Not promotional — a "what I've been building and what I've learned" post on r/WeAreTheMusicMakers or an equivalent. ABLE's honesty and philosophy resonate strongly in that community.

**What does NOT happen:**
- No panic feature builds. If the product isn't converting 10 artists into 50 more, it is not because the features are wrong.
- No paid acquisition. Not enough budget and not enough social proof yet.
- No discount offers or "free for first 100 artists" promotions. These devalue the product permanently.

**The honest truth:** If Phase 2 produces 30 artists instead of 50, that is not failure. It is a slower timeline. The Phase 2 success criteria are gates, not deadlines. Extend the phase by 2 weeks and continue.

---

### P2.5 — Phase 2 success criteria check
**Done when:** All Phase 2 criteria are met.

- [ ] 50 live artist pages
- [ ] 500 real fan sign-ups
- [ ] 1 paid tier upgrade
- [ ] "Made with ABLE" footer generating at least 5 inbound artist registrations
- [ ] Average NPS from beta cohort: at least 50
- [ ] No P0 bugs outstanding
- [ ] At least 10 artists logging into admin.html at least once per week

---

## What's left after Path-to-10 is complete

Items deliberately deferred — not forgotten:

| Item | Why deferred | When to pick up |
|---|---|---|
| Supabase auth | localStorage sufficient for Phase 1 | Before Phase 2 goes wide |
| fan.html | Not needed for artist beta | Phase 2 (when fans need a reason to return) |
| Email broadcasts | Artist Pro gate — needs paying artists first | After first paid upgrades |
| Freelancer profiles | Phase 2 entirely | After £2k MRR |
| Custom domains | Nice-to-have, not conversion-critical | Phase 3 |
| Stripe payments | Needed for support packs | Phase 2, after first paid artist tier |
| Referral link generation | Needed for affiliate loop | Before Phase 3 public launch |
| Music press outreach | Needs proof first — introduction now, pitch at Phase 3 | Phase 3 |
| Producer seeding programme | Highest-ROI channel — starts Phase 2, Week 1 | Phase 2, running in parallel with word-of-mouth |
