# ABLE — GPT Step-by-Step Review
**Use with GPT-5 (or current GPT model) | Do steps in order | Don't skip**

Each step shows exactly what to paste and which file to attach (if any).
Wait for GPT to respond before moving to the next step.

---

## STEP 1 — Anchor (no file needed)

**Paste this exactly:**

```
You are about to review ABLE (Artist Before Label).

Before I share any documents, here's what ABLE is — read this carefully:

ABLE is a premium mobile-first platform for independent musicians.

What it does:
- Artists get a single bio link (replaces Linktree)
- Fans who land on the page can sign up with their email — artist owns that list forever
- The page has 4 campaign states: profile (default), pre-release (countdown + pre-save), live (new release), gig (show tonight)
- Artists get real analytics: who clicked what, when, from where
- Eventually: fan dashboard, freelancer profiles (producers, mixers, etc.)

What it is NOT:
- Not a marketplace
- Not a social network
- Not a streaming platform
- Not a music distributor
- Not a SaaS tool for labels or managers

Competitors it replaces: Linktree, Beacons, Koji, Laylo, Mailchimp (partially).

Target user: independent UK artist, 1k–50k listeners, serious about their craft, averse to corporate music-industry language.

Confirm you understand this before I share the docs.
```

**Wait for confirmation, then go to Step 2.**

---

## STEP 2 — Share the main doc

**Attach or paste the full contents of:**
`docs/GPT-REVIEW/ABLE-STRATEGIC-REVIEW.md` (226KB)

**Then paste this:**

```
This is the full strategic documentation for ABLE — product spec, design system, copy philosophy, competitive analysis, pricing, and current scores.

Read it fully. Don't respond yet. When you're done, just say "Ready" and I'll ask the first question.
```

**Wait for "Ready", then go to Step 3.**

---

## STEP 3 — Product concept

**Paste this (no new file):**

```
First question.

Is the core concept sound?

An independent artist uses ABLE as their single bio link. Fans land on it from Instagram/TikTok. Instead of just clicking a Spotify link, they sign up with email. The artist owns that list — no algorithm, no platform risk, no middleman.

Three things I want you to assess:
1. Is "email ownership" a compelling enough reason for an artist to switch from Linktree?
2. Is there a real behaviour change required from fans, and is it too much to ask?
3. Does this solve a problem artists actually feel, or one they don't know they have yet?

Be direct. Don't hedge.
```

---

## STEP 4 — The email moat

**Paste this (no new file):**

```
ABLE's entire moat is the email list.

But: Instagram follow = 1 tap. Email sign-up = tap, type, submit, confirm inbox. Industry average drop-off across those steps is significant.

Make the case FOR email capture. Then make the case AGAINST it. Then tell me: is the "owned data" argument strong enough to justify the conversion friction, or does ABLE need to add one-tap follow options (Instagram, Spotify) to survive?

What does the data say about email vs social follow conversion in music specifically?
```

---

## STEP 5 — Campaign states

**Paste this (no new file):**

```
ABLE has 4 page states. The artist's bio link changes meaning depending on where they are in their release cycle:

- profile: default, shows latest release as stream CTA
- pre-release: countdown timer, pre-save CTA, locked content teasers
- live: new release drops, stream CTA front-and-centre, 14-day window
- gig: manual 24hr toggle, tickets front-and-centre, "on tonight" tag

The auto-switch logic: if now < releaseDate → pre-release. If now < releaseDate + 14d → live. Else → profile. Gig is always manual.

Question: Is this genuinely differentiated from Linktree, or is it a complexity most artists will ignore?

What percentage of artists do you think would actively use campaign states vs set it once and forget it? What would change that?
```

---

## STEP 6 — Competitive position

**Attach or paste:**
`docs/systems/competitive/MARKET-INTELLIGENCE.md` (25KB)

**Then paste this:**

```
That's ABLE's live competitive intelligence doc.

I want a cold assessment:

1. Linktree has 50M users and brand dominance. What's the realistic switching cost for an artist already on Linktree?
2. Beacons went to 0% take rate on sales. Does that invalidate ABLE's "we don't take a cut" positioning?
3. Laylo added Instagram DM fan capture. If the big players copy every ABLE feature, what's left that they can't replicate?
4. What's the one thing ABLE has that none of them can easily copy?
```

---

## STEP 7 — Red Team

**Paste this (no new file):**

```
You are now an adversarial investor. You've seen 40 "Linktree killer" pitches. Most failed within 18 months.

Give me the three most specific reasons ABLE fails in the first 90 days after launch.

Rules:
- No vague "execution risk" answers
- Each failure mode must be specific to ABLE's model, not generic startup risk
- For each one, tell me: is it fatal, or is there a fix?
```

---

## STEP 8 — Pricing

**Paste this (no new file):**

```
ABLE's tier structure:

- Free: basic profile, 1 snap card, 100 fan sign-ups, basic stats
- Artist £9/mo: unlimited snap cards, up to 2k fans, campaign states, connections
- Artist Pro £19/mo: full fan CRM, email broadcasts, support packs, advanced analytics
- Label £49/mo: 10 artist pages, team access, aggregate analytics, API

Target market is UK independent artists. Most are earning under £20k/year from music.

Three questions:
1. Is £9/mo the right entry price, or should it be lower to reduce friction at the free→paid conversion?
2. Is "Artist Pro" at £19 doing too much — should email broadcasts be a separate product?
3. Is the Label tier priced correctly, or is £49 too cheap for what it offers?
```

---

## STEP 9 — Build order

**Paste this (no new file):**

```
Assume a solo founder, no team, 3 months to first paying users.

What is the minimum viable version of ABLE that:
1. Proves the email capture concept works
2. Gives at least one artist a reason to pay £9/mo
3. Can be built without a backend (localStorage first, Supabase later)

What features are essential on day one?
What can wait until month 2 or 3?
What should never be built at all?
```

---

## STEP 10 — Final score

**Paste this (no new file):**

```
Final question.

Based on everything you've read and everything we've discussed:

Give me your honest strategic readiness score out of 10.

Not the quality of the docs. Not how well-thought-out the strategy is. The score should answer this specific question:

"Is ABLE ready to acquire and retain 100 paying artists within 6 months of launch?"

Format your answer as:
- Score: X/10
- What gets it to a 9: [3 specific things]
- What would make it a 5 or lower: [the single biggest risk]
- Your one-line verdict on whether to build this
```

---

## After Step 10

Bring the score and the "what gets it to a 9" list back here. We'll map those directly to the build backlog.
