# ABLE — Launch Sequence Specification
**Created: 2026-03-16 | Status: canonical**

> This is the how. ANALYSIS.md is the why. PATH-TO-10.md is the checklist.
> These are the four phases from nothing to public launch. Do not skip phases.

---

## Phase 0 — Founder's proof (James only)

**Duration:** 1 week (can be done in a weekend if focused)
**Goal:** A live, compelling artist page from the person building the platform. No shortcuts.

### What James builds

**His own ABLE page:**
- Real name, real bio written in his actual voice
- Real music or creative work (existing tracks, projects, whatever is live)
- Real shows if any, or a genuine snap card about what he's working on
- A real accent colour and vibe — not a test, a choice
- Hero CTAs that point to something real
- Fan sign-up live and functional

**Why it has to be real:**
You cannot show a placeholder to artists and ask them to trust you with their audience relationship. The founder's page is the product's first credibility signal. If James can build something he's proud to share, the product works. If he can't, there's something to fix before anyone else touches it.

### What James tests personally

Complete the full flow, end to end, from a fresh browser (no cached data):

1. Open landing.html — does it communicate clearly in under 10 seconds?
2. Tap the hero CTA — does start.html open cleanly?
3. Complete the onboarding wizard — does it feel like 5 minutes, not 15?
4. Land on able-v7.html — does the page look like something worth sharing?
5. Open admin.html — does the greeting feel right? Does the dashboard feel useful?
6. Set a campaign state — does the page update correctly?
7. Sign up as a fan (use a second browser or incognito) — does the sign-up work? Does the confirmation email arrive?
8. Check admin.html — does the fan appear in the list with the right source?
9. Activate gig mode — does the page switch state? Does the countdown appear?
10. Check the fan list source breakdown — does it show the right source?

Any failure on this list is a P0 bug. Fix it before inviting anyone else.

### The 5 real fans

Before Phase 1 starts, James signs up 5 real fans to his own page. These are real people — friends, genuine music listeners, people who would actually be interested. This is not a vanity metric. This is a test of:
- Whether the fan sign-up flow works end-to-end
- Whether the confirmation email arrives and sounds right
- Whether the source tracking is working
- Whether seeing real fan emails in admin.html gives the emotional response it should

"Your list. Your relationship." — that feeling only lands when the list is real.

### Identifying the 10 beta artists

Before Phase 0 closes, James writes a list of 10 real artists he knows personally or has a genuine warm connection to. The criteria:

**Required:**
- James can reach them directly (phone, DM, email — a real conversation, not a cold outreach)
- They are actively making music (releasing, gigging, or both)
- They have at least some social presence (doesn't need to be large — consistent matters more)
- They are honest people who will say what doesn't work, not just what's polite

**Preferred:**
- Genre variety — at least 4 different vibes from the 7-vibe system
- Some have an upcoming release or gig (tests campaign states with real data)
- At least 2 who are not based in the UK (tests international relevance)
- At least 1 who is less digitally fluent (tests onboarding for the non-technical user)

**The list is not a maybe list.** These are people James is confident will say yes when he reaches out personally. If he's not confident, they shouldn't be on the list.

---

## Phase 1 — Private beta (10 artists, 2 weeks)

**Duration:** 2 weeks
**Goal:** 10 live pages. 100 real fan sign-ups across all pages. Honest feedback. No public attention yet.

### Onboarding each artist

James walks each artist through ABLE personally. Not a video tutorial. Not documentation. A real conversation — either in person, on a call, or via voice note exchange. The goal is that each artist feels like James built this for them specifically, because in a meaningful sense he did.

**The onboarding conversation covers:**

1. "Here's what ABLE actually is." — One minute. Direct. The core truth: your link-in-bio that owns the relationship.
2. "Here's your page." — Open start.html together (or send the URL and be on a call while they complete it).
3. "Here's your dashboard." — Show them the 3 things that matter first: their live page URL, the campaign state, and the fan list.
4. "Here's how to tell me when something breaks." — Send the WhatsApp group link or Discord channel. Make it feel easy to report problems.
5. "Here's what I'm trying to learn." — Be honest. "I want to know: does this feel worth putting in your bio? Would you actually use this?"

**What James does NOT do at this stage:**
- Send a "getting started" email blast
- Ask them to post about ABLE publicly
- Offer any incentives or free upgrades as conditions for feedback
- Make them feel like they're doing James a favour (they're helping shape something real — that's the pitch)

### Running the 2-week beta

**Week 1:**
- All 10 artists onboarded by Day 5
- James checks admin.html for each artist's page (when Supabase is live this is aggregated — for now, he checks each page)
- Any bug reported: acknowledged within 4 hours, fixed within 48 hours
- Personal check-in with each artist at the end of Week 1: "How's it going? What's weird?"

**Week 2:**
- Weekly feedback prompt: voice note or message, 3 questions max:
  1. "What's the one thing you wish worked differently?"
  2. "Have you put the link in your bio yet? If not, what's stopping you?"
  3. "Have any of your fans signed up? What did they say about the page?"
- James logs every piece of feedback in a running doc
- Minimum 8 of 10 artists must have put the link live in their bio before Phase 2 starts

### Phase 1 success criteria (gates to Phase 2)

These must all be true before Phase 2 begins:

- [ ] All 10 artists have live pages
- [ ] At least 100 real fan sign-ups across all pages (10 per artist average)
- [ ] At least 3 artists have set a campaign state (pre-release, live, or gig)
- [ ] Average feedback score: "would you keep using this?" ≥7/10
- [ ] No P0 bugs outstanding (show-stopping, data loss, broken flows)
- [ ] At least 8 of 10 artists have put the ABLE link in their social bio
- [ ] James has fixed at least 3 things the beta artists flagged

If these criteria are not met at the end of 2 weeks, Phase 1 extends by 1 week. Phase 2 does not start until the criteria are met. No exceptions.

---

## Phase 2 — Soft launch (word of mouth, James's network)

**Duration:** 4 weeks
**Goal:** 50 live pages. 500 fan sign-ups. 1 paid upgrade.

### The "here's what I built" post

James writes one post about ABLE. It is not a product announcement. It is a founder story.

**What it covers:**
- Who James is (brief — not a bio, a human)
- What he noticed was broken in the world for independent artists
- What he built, and why
- A link to his own ABLE page (the proof)
- An invitation: "If you're a musician and this sounds like something you'd use, I'd love to show you."

**What it does not include:**
- Pricing
- Feature lists
- "Sign up now" energy
- Exclamation marks

**Where it goes:**
- James's own social (wherever he has a music-adjacent following — LinkedIn, Twitter/X, Instagram, TikTok, or wherever he is actually present)
- James's personal email list if one exists
- One music community where he is already a known voice (not a cold post — a community where he's been a participant)

**Tone reference:** Not "here's my startup." More like "here's what I've been working on at midnight for the last few months. It's finally ready to show."

### What the 10 beta artists do (if they want to)

By Phase 2, the 10 beta artists have had 2 weeks to form an opinion. If they're genuinely using the platform and find it useful, James asks them — individually, not in a group message — if they'd be comfortable sharing it with one or two other artists they know.

Not a referral programme. Not an incentive. A genuine "if you think a friend would benefit from this, I'd love to meet them."

This is the most powerful distribution channel at this stage — artist word of mouth is the trust network the product was built for.

### The "Made with ABLE" footer doing its job

Every free-tier artist page has an "ABLE" link in the footer. By Phase 2, with 50+ pages live, fans are discovering ABLE organically through artist pages for the first time. This is the passive loop.

Measure: check the source breakdown in analytics. Any `direct` traffic that arrives at landing.html or start.html without a referral source is likely this loop working. The "Made with ABLE" footer should eventually be the largest source channel.

### The first paid upgrade

Phase 2 success requires at least 1 artist to upgrade from free to a paid tier. This is not about revenue. It is proof that:
- The tier gates are working (artists can see what they're missing)
- The value proposition is legible at the upgrade moment
- Someone finds the product worth paying for

If no one upgrades during Phase 2, the tier gate experience needs to be audited. The gold lock pattern (blurred preview + specific value overlay) should be doing this work — if it isn't, the overlays are not specific enough about what the artist gets.

### Phase 2 success criteria (gates to Phase 3)

- [ ] 50 live artist pages
- [ ] 500 real fan sign-ups across platform
- [ ] 1 paid tier upgrade (any tier)
- [ ] "Made with ABLE" footer generating at least 5 inbound artist registrations (measurable via source)
- [ ] Average NPS from beta cohort: ≥50
- [ ] No P0 bugs outstanding
- [ ] At least 10 artists logging into admin.html at least once per week (retention signal)

---

## Phase 3 — Public launch (when the product is proven)

**Duration:** Ongoing
**Goal:** 200 live pages. 5,000 fan sign-ups. 50 paid upgrades. First music press coverage.

### The public launch moment

Phase 3 does not begin with a big announcement. It begins with the evidence that the product works. The announcement is the conclusion, not the beginning.

**What "proven" means:**
- 10 artists have been using ABLE consistently for at least 1 month
- The upgrade path is working (measurable conversion from free to paid)
- No critical bugs in the last 2 weeks
- The "Made with ABLE" footer is generating inbound consistently

**What Phase 3 adds:**
- Music press outreach (Music Ally Sandbox pitch — spec in GROWTH_STRATEGY.md)
- Producer seeding programme (20 producers, free Artist Pro for life — highest-ROI channel)
- Reddit organic presence (r/WeAreTheMusicMakers — helpful, not promotional)
- TikTok / Instagram: "here's how ABLE works" format (show the product, don't explain it)
- Product Hunt launch (coordinate with a phase 2 win — "50 artists already using it")

### The affiliate loop activates in Phase 3

By Phase 3, the referral system should be built. Every artist gets a unique referral link. 1 month free per artist they bring who converts to paid. This is the self-sustaining loop — the cost is zero until revenue already exists, because "1 month free" is only paid out on a converted paying artist.

### Success metrics at each milestone

| Milestone | Artists | Fan sign-ups | Paid upgrades | MRR |
|---|---|---|---|---|
| End of Phase 1 | 10 | 100 | 0 | £0 |
| End of Phase 2 | 50 | 500 | 10 | ~£90–190 |
| Phase 3 milestone 1 | 200 | 5,000 | 50 | ~£450–950 |
| Phase 3 milestone 2 | 500 | 15,000 | 150 | ~£1,350–2,850 |
| Job exit trigger | — | — | — | £5,000+ sustained for 3 months |

---

## What happens if it doesn't go to plan

**If Phase 1 stalls (artists not putting link in bio):**
The onboarding created friction, or the page isn't compelling enough, or the value proposition wasn't clear in the 1:1 conversation. Fix the onboarding wizard first. Then revisit the founder story — is it honest and specific enough?

**If Phase 2 produces no paid upgrades:**
The tier gates are not doing their job. Audit every gold lock overlay — are they specific? "You have 23 fans in Manchester. Upgrade to see who they are before your show there." vs. "Upgrade for advanced analytics." The former converts. The latter doesn't.

**If "Made with ABLE" footer generates no inbound:**
Either there isn't enough traffic to the artist pages yet, or the footer design is too subtle. Check: is the link visible? Is it on every free-tier page? Is the CTA clear? ("Built with ABLE · Your page is free →")

**If an artist's page breaks publicly:**
Fix it within 4 hours. Communicate with the artist directly. Do not let a broken page sit. An artist's bio link is the entry point for their audience — a broken page is a broken relationship, and that artist will leave and tell others.

---

## Founding artist email (Phase 1 personal outreach — exact copy)

This is the message James sends to each of the 10 founding artists. It is a personal message, not a broadcast. Send it individually. Every "you" in this copy refers to one specific person.

---

Subject: `something I've been building`

Hey [Name] —

It's James. I've been building something for the last few months and I think you might actually want to use it.

It's called ABLE. Here's the short version: it's a page that lives in your bio link and understands where you are in your cycle. Pre-release, drop day, gig night — the page adapts. Fans who land on it can sign up with their email, and those emails go directly to you. Not to a platform. Not to an algorithm. Yours.

I built it because I kept watching artists send people to Linktree and get nothing back. No contact details. No relationship. Just a tap and a bounce.

Your page is free to set up. It takes about 8 minutes. I'd love to set it up with you — call, voice note, whatever works. And I want your honest reaction: is this something you'd actually put in your bio?

[Link to start.html]

James

---

**Send conditions:**
- Personal message, not a template blast
- Only send to artists whose music James has genuinely listened to
- Do not send to more than 10 people at once (maintaining personal quality over quantity)
- Wait for at least a short response before sending the follow-up onboarding message

---

## Press intro (Phase 3 — music press cold outreach)

For use when approaching music industry press (Music Ally, DIY Magazine, Pitchfork UK, The Guardian Music, etc.) at Phase 3 launch. Adapt per publication.

---

Subject: `Independent artist tool — worth a look?`

Hi [Name] —

I'm James, founder of ABLE. I've built a free link-in-bio specifically for independent musicians — one that understands the artist's release cycle and owns the fan relationship for them, not for the platform.

The point of difference: when a fan signs up on an artist's ABLE page, the email address belongs to the artist. When the artist's account gets restricted on Instagram, the list survives. When the algorithm stops working, the list still works. That's the whole thesis.

We're [N] artists in, [N] fan sign-ups, and the first [N] paid upgrades have happened. The product is working. A few artists using it:

- [Artist name] — [brief description of their use case, with their permission]
- [Artist name] — [brief description]

I'm not looking for coverage yet — I'm reaching out because [publication name] covers independent artist tools seriously and I'd like to know if this is worth a longer conversation once we're a bit further along.

Happy to share access to a founder account if it's useful.

James

---

**Press outreach rules:**
- Never name-drop ABLE's competitors directly
- Only send when Phase 2 criteria are met (50 artists, 500 fans, 1 upgrade)
- Personalise the intro for each publication — generic pitches are ignored
- Do not use "disrupting" / "revolutionising" / "changing the game" in any press copy
