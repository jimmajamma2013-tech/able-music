# ABLE — Professionals / Freelancer Layer: Product Doctrine
**Authority: Claude (acting as final product authority)**
**Date: 2026-03-16**
**Status: CANONICAL — supersedes any prior draft thinking on this layer**

---

## 1. Core Judgment

The professionals layer is not a feature. It is the second half of ABLE's network effect.

Artists need ABLE to exist. Fans come because artists are there. But the professionals layer is what makes ABLE irreplaceable rather than swappable. An artist can build their link-in-bio on a dozen platforms. But their production credits, their trusted collaborators, and the professional layer that grows around their releases — that is ABLE-specific and cannot be replicated elsewhere without starting over.

The fundamental thing this feature is: **a proof-of-work network that emerges from real creative relationships, not from cold sign-ups.**

The professional profile is not a services page. It is a creative record — the accumulated evidence of who this person is, what they've contributed to, and which artists trusted them enough to put their name on a release.

That is what makes it ABLE. Not the booking form. The record.

---

## 2. Responses to the 8 Principles

### Principle 1: Professionals should enter ABLE through trust, not cold self-listing
**Agree fully.**

The strongest mechanic is: artist credits someone → person claims their profile → credit converts from plain text to live link. This is the correct entry path and it must be the primary one.

Cold sign-up should still be possible — a producer who has heard about ABLE and wants to get ahead of it should be able to create a profile before being credited. But a cold profile with no confirmed credits should look exactly like what it is: an unclaimed space, not a complete presence. The trust signal (confirmed credits from artists) is the thing that makes the profile worth visiting.

One clarification to sharpen this: the asymmetry rule should govern the *profile state*, not just the link state. A professional with 0 confirmed credits has a profile, but that profile should state clearly: "Credits pending — [Name] is known to work with [Artist] but credits are awaiting confirmation." It should not look identical to a profile with 5 confirmed credits. The trust state of the profile must be visible.

### Principle 2: The asymmetry rule should stay
**Agree, and make it stronger.**

Current rule:
- No ABLE profile → plain text
- Has ABLE profile → live link

Strengthened rule:
- No ABLE profile → plain text, 70% opacity
- Has ABLE profile, 0 confirmed credits → live link, but profile shows "Credits pending"
- Has ABLE profile, 1+ confirmed credits → live link, full opacity, profile shows trust signal
- Has ABLE profile, 3+ confirmed credits from different artists → profile shows "Credited by [N] artists" signal

The asymmetry should compound. The more trust you've earned, the more visible your presence. This is not algorithmic. It is the natural consequence of doing real work.

This also means: a professional who only self-claimed credits and got none confirmed should look different from one who has been credited and confirmed by artists. Both have profiles. Only one has trust.

### Principle 3: Artists I recommend + People I work with — one or two sections?
**Partly agree with two sub-groups. The exact treatment depends on the relationship type, not the person type.**

I'd reframe this slightly: the question is not "artist vs professional" — it's "do I endorse this person's work" vs "this person made something with me."

Recommendation = "I believe in what they do."
Credit = "They contributed to this specific release."

These are different trust statements. Credits live on release cards — that's already settled. Recommendations live on the profile page as a curated section.

For the profile page, I recommend **one section with two visual treatments**, not two separate sections:

- Section heading: **"People worth knowing"** (artist-owned, overridable)
- Sub-group 1: Artists — `type: 'artist'` — shown as artwork + name + genre
- Sub-group 2: Collaborators — `type: 'professional'` — shown as name + role + connected state

The section is unified because the trust signal is the same: the artist chose to put this person here. The visual treatment differs because the two types of people look different (artists have artwork/release context; professionals have role context).

Do not give the section a format that makes it look like a directory or a follow-list. It should look like a personal curation. Limited to 6 items total across both types. The artist's taste should be visible through the choices, not through a grid of 20 faces.

### Principle 4: Deepen, don't widen
**Agree completely.**

The test for every professional layer decision is: does this make ABLE feel more culturally rich and connected, or does it make it feel bigger and more complicated?

A fan who discovers Maya Beats through a credit on a track they loved — that deepens ABLE's world. A searchable directory of 500 producers in London with star ratings — that widens it sideways into a marketplace.

Every feature decision should pass this test. Widening features (directory, trending, comparison tools) should be refused or deferred to Phase 2 at the earliest, and even then, built in a way that doesn't change the fundamental feel.

### Principle 5: Proof-of-work first, selling second
**Agree, and this is the most important principle.**

The professional profile must feel like a creative record before it feels like a services page. The structure I'd recommend:

1. Who they are (name, primary role, one line)
2. Work they've been part of (credits — the proof)
3. What they contribute (portfolio — the demonstration)
4. How to reach them (enquiry — the door)

The rate card exists, but it lives at the bottom, not the top. It is optional. A professional who doesn't want to list rates can say "Enquire for rates" and that is fine. The first thing a visitor should encounter is not a price — it is a track they've worked on, or a name they recognise who trusted this person.

Rate cards are useful. They are not the identity.

### Principle 6: ABLE should not become a pure booking platform
**Agree, with one addition.**

The enquiry flow should be simple, calm, and serious. Not instant. Not gamified. Not a marketplace race.

One thing to add: **the enquiry should require context before it's sent.** Not a 50-question brief — just enough to ensure the professional receives something they can actually respond to. "What are you working on, and when do you need it?" is enough. This filters out noise while respecting both parties' time.

A professional who receives 10 copy-paste enquiries with no context has been handed noise. A professional who receives 3 genuine briefs has been given something worth their time. ABLE should build for quality of enquiry, not volume.

### Principle 7: The visual and copy treatment must remain premium
**Agree completely.**

What it should sound like instead:

Not "hire top talent" → "Work with people who know what they're doing."
Not "find the best producers" → "The producers behind the music you already love."
Not "book creators fast" → Nothing fast. Fast is not the register.
Not "browse freelancers" → "People who've worked with [Artist]."
Not "grow your team" → Never say this.
Not "certified pros" → "Credited by artists on ABLE."

The copy system must feel like it was written by an artist for other artists and professionals. Not by a startup for buyers and sellers.

### Principle 8: Sequencing matters
**Agree fully. The spec's dependency chain is correct. See Section 5 below for the exact split.**

---

## 3. Product Doctrine

### What professionals are inside ABLE

Professionals inside ABLE are people whose identity is built from the work they've done, not the services they offer. They are not listed. They are discovered. They are not rated. They are trusted.

A producer who has worked on 10 ABLE-artist releases and had those credits confirmed is a node in ABLE's creative network. Their profile is the record of that. Fans find them through releases they already love. Artists find them through mutual collaborators. Neither route starts with a search bar.

### Why they belong

ABLE is about the ecosystem around independent music, not just the artist in isolation. Every artist has people behind their work. Those people should exist in ABLE's world, not be invisible. Making them visible deepens the platform and gives artists a reason to keep their release data current (because credits are valuable, not just metadata).

It also creates a second acquisition vector that doesn't depend on paid marketing: every artist release is a passive introduction to the professionals behind it.

### What makes this ABLE-native

1. Discovery through trust, not search
2. Credits as the primary proof mechanism, not self-reported services
3. The professional profile is earned, not claimed alone
4. The aesthetic is calm, premium, and consistent with the artist world
5. No marketplace signals (ratings, trending, comparisons, instant pricing)

### What this must never become

- A directory of people available for hire
- A platform where professionals market themselves cold
- A race to the bottom on rates
- A popularity contest with follower counts or star ratings
- A place where spam enquiries are the norm
- Louder or busier than the artist side

---

## 4. The Complete Product Model

```
ARTIST releases a track
  → credits Maya Beats (Production) with her ABLE handle
  → maya-beats.html now has a confirmed credit
  → on the artist's profile, "Production: Maya Beats" is a live link

FAN finds the artist's page
  → loves the production
  → taps "Maya Beats"
  → lands on Maya's profile
  → sees who else she's worked with
  → finds another artist she likes

ANOTHER ARTIST finds Maya's profile
  → wants to work with someone who makes that sound
  → sends an enquiry through ABLE's form
  → ABLE relays the message to Maya's email without exposing it
  → Maya replies directly

MAYA sees that 12 people found her profile via credits this month
  → knows which releases to credit more carefully
  → adds another portfolio item
  → her profile gets richer as she does more work

ABLE's network deepens
  → not through growth hacks or viral mechanics
  → through real work accumulating real trust
```

This is the model. Every feature decision should map back to it.

---

## 5. V1 / V1.5 / Phase 2 Split

### V1 — Trust foundation (build now)

What exists and is accessible:

**A. Credits on release cards (artist side)**
- `credits[]` array in release data model — DONE
- Credit rendering on artist profile: plain text (no handle) vs live link (handle set) — DONE
- Admin release editor: add/edit credits with name, role, handle — DONE

**B. Artist profile recommendations section**
- "People worth knowing" section on able-v7.html
- Up to 6 items: artists (artwork card) and professionals (name + role card)
- Artist manages this in admin under Profile settings
- Items with no ABLE handle: plain text. Items with handle: live link.
- No headcount, no metrics, no rankings

**C. Professional profile page (minimal)**
- `able-v7.html` serves both artist and professional profiles — unified rendering, context-aware sections
- Professional profile shows: name, role, short bio, credits list (confirmed at full opacity / pending at 70% / unverified hidden), one portfolio link, basic enquiry prompt
- Same dark theme, same design system, same accent logic
- No booking system yet — just a contact prompt ("Get in touch")

**D. Claim flow (minimal)**
- When a professional signs up (via `freelancer-start.html`), they search for credits against their name
- Match found → sends confirmation request to artist
- Artist confirms → credit goes live as confirmed
- No Supabase required yet — can be localStorage-first with Netlify form fallback for enquiries

**V1 is essentially: the credits display + claim mechanism + minimal professional page, built before the backend.**

### V1.5 — Structure and confidence (3-6 months post V1)

**Requires Supabase auth to be live.**

- Full credit verification state machine (pending → confirmed / expired / denied)
- Artist receives notification when freelancer claims a credit
- `freelancer-start.html` full wizard (5-step, per SPEC.md §8)
- Portfolio items on professional profile (up to 2 audio, 1 video)
- Basic enquiry relay via Netlify function (no email exposed, relayed message only)
- Availability state (open / limited / closed) on profile
- "Found via credits this month" stat visible to professional in their dashboard
- Admin: artists can see pending credit confirmations and approve/deny
- Rate card (optional, appears below the fold on professional profile)

### Phase 2 — Rich network (12+ months post V1)

- Before/after audio comparison player for engineers
- Full credit analytics (which releases drive the most profile visits per credit)
- Discord OAuth + Community Member badge
- Premium Freelancer tier (£9/month) with portfolio analytics and deposit facilitation
- Light discovery surface — not a full directory, but "professionals who worked with artists you follow"
- Booking deposit via Stripe Connect
- Cron job: 30-day pending credit auto-expiry
- Manual review queue for first 5 credits on new profiles

---

## 6. Profile-Side Feature Design (Artist Profile — able-v7.html)

### Section: "People worth knowing"

**Placement:** After the music/releases section, before fan capture. Not the first section. Discovery should follow the music, not precede it.

**Naming:** Default "People worth knowing." Artist-overridable. If they want "My collaborators" or "The people behind this" that is theirs to set. No algorithmic rename. No default that sounds generic.

**Visual treatment:**
- Section heading: Barlow Condensed, 13px, uppercase, 60% opacity — same weight as other section titles
- Items: horizontal scroll on mobile, 2-column grid on desktop (max 3 rows visible before collapse)
- Max 6 items before "See all" collapse
- **Artist type item:** 72×72px artwork square (border-radius: 8px) + name (14px, font-weight 600) + genre tag (11px, accent-tinted) + arrow icon
- **Professional type item:** no artwork square — instead a small role chip (10px uppercase, accent 20% opacity bg) + name (14px) + one-line context ("Mixed 3 of my last 5 releases") if artist has written it + arrow icon
- Hover state: name turns accent colour, arrow translates 3px right, spring easing
- Item with no ABLE handle: no arrow, no hover state, name at 65% opacity. Not a link. Not pretending to be one.
- Empty state (no items added): section does not appear. Never show an empty "People worth knowing" section.

**CTA language:**
- No CTA on the section itself. The items are the signal. Visiting is the action.
- The only copy is the section title and the item cards.

**Mobile behaviour:**
- Stack vertically. Two-column grid at 375px (artist item is artwork + name only at this width).
- Professional items: single column, name + role on one line.

**Hierarchy:**
- This section should feel like a personal endorsement, not a feature. It lives below the primary content (music, events, merch) and above the fan capture form. It is secondary, but it is editorial. The artist chose every item.

---

## 7. Professional Profile Design

### Purpose

The professional profile is a creative record and a single trusted point of contact. It is not a catalogue. It is not a portfolio site. It is the answer to "who is this person and what have they made?"

### Page structure (top to bottom)

**1. Identity header**
- Name (Barlow Condensed, 28px, same as artist name treatment)
- Primary role (14px, accent-tinted, uppercase — "MIXING ENGINEER", "PRODUCER")
- Location: city only ("London", "Manchester", "Remote") — optional
- Short bio: max 120 characters. Written in first person. "I mix for artists who care about the room between the notes." No CVs. No keyword stuffing.
- Accent: professional-set, same architecture as artist accent (one hex, full page rebrand)
- Avatar: same circular photo treatment as artist profile — or initials if no photo

**2. Credits — the proof section**
- Heading: "Work" — nothing more
- Credits listed as: [Artist Name] — [Release Title] — [Role]
- Confirmed credits: full opacity, live link on artist name (links to their ABLE profile), tick signal (✓ subtle, not a badge — just a visual indicator)
- Pending credits: 70% opacity, no link, shown with "— awaiting confirmation" in 10px italic
- Unverified credits: not shown publicly (hidden, available in dashboard)
- Max 8 credits shown before collapse ("Show more")
- If 0 confirmed credits: "Credits pending — [Name] is building their record on ABLE." Not empty. Not pretending.
- No year, no chart positions, no streaming numbers on this page. This is not a CV.

**3. Portfolio — the demonstration**
- Heading: "Listen" or "Watch" depending on content type
- Max 2 items in V1 (free)
- Each item: oEmbed preview (SoundCloud, YouTube, Vimeo) + one-line label ("I mixed this from stems")
- Before/after (Phase 2): most differentiating format for engineers. Two players. One button each. Tapping one pauses the other.
- No photo grids in V1 — this is for music professionals, not visual creatives primarily

**4. Artists on ABLE** (auto-generated, not editable by professional)
- Heading: "Artists they work with on ABLE"
- Compact horizontal strip of artist avatars with names
- Only confirmed-credit artists shown
- This is the social proof, not the rate card. This section earns trust passively as credits accumulate.
- Empty until first confirmed credit: section hidden.

**5. Availability + Enquiry** (at bottom, always)
- Availability chip: "Open for new work" / "Limited availability" / "Not taking bookings"
- If open: "Send an enquiry" button → opens a simple 4-field form
- If not taking bookings: "Not available right now" — small, clear, no CTA
- Rate card (if set): shown discreetly above the enquiry button, not leading the page
  - Format: "Production — from £300/track. Mixing — from £150/stem."
  - Never a price table. Never comparison format.
  - If no rate card set: "Enquire for rates" (not a problem, just a fact)

### What the professional profile must never become
- A services catalogue (long list of packages, tiers, options)
- A testimonials page (no "what clients say" section)
- A metrics dashboard visible to visitors (no "profile views", no "response rate %")
- A social feed (no activity timeline, no posts)
- Louder than the artist profile it links from

---

## 8. Onboarding and Claiming Flow

### Who gets in and how

**Path 1: Claim-first (primary)**
A professional signs up because an artist has already named them in a credit. They receive a notification ("You've been credited on ABLE — claim your profile to activate the link"). They follow the link, go through the 3-step claim wizard, confirm the credit, and their profile goes live. The link on the artist's page converts from plain text to live within 24h of confirmation.

**Path 2: Cold sign-up (valid but secondary)**
A professional who hears about ABLE before being credited can sign up via `freelancer-start.html`. Their profile is live immediately but credits are pending. They should be told clearly: "Your profile is live. Credits are what make it worth finding — add your credits to get started."

Cold profiles without confirmed credits should not be promoted or surfaced via any discovery mechanism. They exist but they are quiet.

### freelancer-start.html — 4 steps (V1)

**Step 1: What do you do?**
- Role picker (max 3): Producer / Mixing Engineer / Mastering Engineer / Recording Engineer / Session Musician / Music Videographer / Photographer / Other
- No lengthy descriptions — trust the artist
- Handle set here: "How should people find you? ablemusic.co/[handle]"
- Email: magic link sent → continue in email

**Step 2: Who have you worked with?**
- "Search for an artist or release you've contributed to"
- Search against ABLE artist profiles first (fast, instant)
- Free text fallback (creates unverified credit)
- "Did you work on any of these?" checklist
- Skip option prominent: "I'll add credits after I see my page"

**Step 3: One sentence about your work**
- Bio field: 120 characters max
- Placeholder: "I mix for artists who care about how it sounds in a room."
- No multi-paragraph bio. One sentence. The credits do the rest.

**Step 4: Done**
- "Your profile is live at ablemusic.co/[handle]"
- Copy link button
- "You have [N] credits awaiting artist confirmation — we'll notify you when they confirm."
- No "share on social" push. They're professionals. They know how to share a link.

### What to not ask in onboarding
- Portfolio (add it later)
- Rates (add it later)
- Discord (definitely add it later)
- Genres, tags, keywords
- Anything that slows the path to "profile is live"

The wizard must be completable in 4 minutes. The profile is the reward. The first confirmed credit is the real moment.

### The "live" moment
The first confirmed credit — when an artist confirms "yes, they worked on my release" — is the equivalent of the artist's "first fan." It should be surfaced explicitly in the professional's dashboard: "Your credit on [Artist]'s '[Track]' is confirmed. Your name is now a live link on their page." That is the moment. It should feel like a moment.

---

## 9. Booking / Enquiry Flow

### What this is

A calm, direct path from "I want to work with this person" to "I've sent them something real." Not a booking engine. Not a quote request platform. A professional contact form that filters for intent.

### The 4-field form (that's it)

1. **Your name** — plain text
2. **What you're working on** — 280 characters. "I'm finishing a debut EP, mostly electronic, need mixing on 6 tracks. Release planned for June."
3. **When do you need it?** — rough timeframe. Free text. "End of May" is fine.
4. **Your email** — so they can reply

No budget field in V1. Budget conversations happen in the reply. Putting a budget field on the form either filters out real clients who don't know their budget yet, or attracts bottom-of-range enquiries. Neither is what ABLE wants.

Optional (V1.5): "Are you an ABLE artist?" — checkbox. If yes, the professional can see the artist's profile context without any extra steps. This creates a genuinely useful warm-handoff.

### What happens after submit

1. ABLE relays the enquiry to the professional's email (via Netlify function — no address exposed)
2. Enquirer gets: "Your enquiry has been sent to [Name]. They'll be in touch if it's a good fit."
3. Professional's email contains the full enquiry + the enquirer's email so they can reply directly
4. Professional's email address is never sent to the enquirer until they manually reply

Rate limit: 3 enquiries per email address per professional per 24 hours. Enforced server-side. Silent limit — the form submits successfully, the enquiry is held for review. Not shown to user.

### What to refuse
- Instant quote calculator
- Budget match / rate comparison
- "Get 5 quotes" format
- Automated response + nudge sequences
- Enquiry visibility metrics shown publicly ("usually responds in 2 hours")
- Any mechanic that makes the professional feel like a commodity

---

## 10. Copy System

### Tone

Professional, warm, direct. The register is closer to a trusted music lawyer's email than to a SaaS onboarding flow. It assumes the reader is competent. It does not explain things twice. It does not celebrate actions that are just normal. It does not use the word "amazing."

### Sample copy

**Artist profile section heading:**
- "People worth knowing"
- "The people behind this" (artist override)
- "Collaborators" (minimal override)

**Professional profile — section headings:**
- "Work" (credits section — never "Portfolio of credits" or "Verified collaborations")
- "Listen" (portfolio section)
- "Artists they work with on ABLE" (auto-generated trust strip)

**Credits — confirmed state:**
- No label. A tick mark. The credit speaks.

**Credits — pending state:**
- "[Artist Name] — confirmation pending"
- Not: "Unverified" — too cold. Not: "Awaiting response" — too corporate.

**Credits — 0 confirmed:**
- "Credits pending — [Name] is building their record on ABLE."
- Not: "No credits yet." Not: "This profile is new."

**Enquiry button:**
- "Send an enquiry" — direct, no pressure
- Not: "Book now" (implies the decision is made)
- Not: "Get a quote" (implies marketplace)
- Not: "Connect" (meaningless)

**Enquiry confirmation:**
- "Your enquiry has been sent to [Name]. They'll be in touch if it's a good fit."
- Not: "Message sent!" (exclamation mark is wrong)
- Not: "We've forwarded your request" (removes humanity)

**Availability — open:**
- "Open for new work"

**Availability — limited:**
- "Limited availability"

**Availability — closed:**
- "Not taking bookings right now"
- Not: "Fully booked!" (too cheerful for what is a simple fact)

**Onboarding — credit step:**
- "Who have you worked with? Search for an artist or release you've contributed to."
- Not: "Add your credits to stand out!"
- Not: "Let artists know you worked with them"

**First confirmed credit notification:**
- "Your credit on [Artist]'s '[Track]' is confirmed. Your name is now a live link on their page."

**Rate card intro (on profile):**
- "[Name]'s rates" — or just the rates, no label
- Not: "Starting from" — too salesy
- "Enquire for rates" if no rate card set — not "Rates available on request" (too corporate)

**Onboarding done screen:**
- "Your profile is live at ablemusic.co/[handle]."
- Sub-line: "Credits are what make it worth finding — we'll let you know when artists confirm yours."

**Fan discovering a professional via a credit:**
- No copy shown to fan about what a credit is. The link speaks. If they're curious enough to tap it, the profile answers.

**Artist — empty state on credit field:**
- "Who worked on this? Add their name and role."
- Not: "Give credit where it's due!" (patronising)
- Not: "Tag your collaborators" (Instagram language, wrong register)

---

## 11. Visual / UX System

### How it sits inside ABLE

The professional profile uses the same dark theme as the artist profile (`able-v7.html`). Same base tokens. Same font system. Same spring easing. The professional is in ABLE's world, not a separate one.

The only visual difference: the professional's profile accent is set by the professional, not by the artist. The page does not inherit any artist's accent. The professional has their own identity.

### Cards and items

**Credit item:**
```
[Artist Name]           [Role]
[Release Title]          ✓ or ○ or hidden
```
- Confirmed: full opacity, artist name is a live link (accent-coloured on hover)
- Pending: 70% opacity, no link, small status text below
- Typographic, not card-based. This is a list of real work, not a grid of tiles.

**Portfolio item:**
- oEmbed preview with a one-line label below
- No rating, no "X plays", no social proof from external platforms shown in ABLE's UI
- Clean card: `border-radius: 12px`, `border: 1px solid rgba(accent, 0.12)`, `background: rgba(accent, 0.04)`

**"People worth knowing" items (on artist profile):**
- Artist item: 72×72px artwork, name below, genre tag in accent tint
- Professional item: no artwork — role chip (8px uppercase, accent bg at 15%) + name + optional context note
- Both: clean list, not a grid. The spacing between items communicates that each one was chosen, not populated automatically.

**Confirmed credit trust signal:**
- Subtle ✓ mark at end of credit line. 12px. Accent colour at 60%. Not a badge. Not a "Verified" label. Just the mark.
- No explanation needed. The asymmetry between credited and uncredited speaks for itself.

**Professional profile — enquiry section:**
- Availability chip: `padding: 4px 10px`, `border-radius: 20px`
  - Open: `background: rgba(green, 0.12)`, `color: green-tinted`
  - Limited: `background: rgba(amber, 0.12)`, `color: amber`
  - Closed: `background: rgba(text, 0.06)`, `color: text at 50%`
- Enquiry form: same field treatment as start.html / admin.html fields — consistent across ABLE

**"Artists on ABLE" strip (auto-generated):**
- Compact horizontal row of artist avatars (32×32px circles) with names on hover
- No more than 6 visible before "+N more" truncation
- This strip is the social proof section. Its power is that it is auto-generated from confirmed credits — the professional did not curate it. That is what makes it trustworthy.

### What the profile must never look like
- A Fiverr card (price leading, green "online now" indicator, reviews count)
- A LinkedIn summary (wall of text self-description)
- A SoundBetter profile (rate card too prominent, too much selling language)
- A social feed (no activity, no recency, no "last active" signals)

---

## 12. What to Refuse

This is the non-negotiable list. None of these should ever appear in the professionals layer:

- Star ratings or review scores
- Follower counts or profile view counts shown publicly
- "Top rated" or "Featured" professional labels (algorithmic or paid)
- "Response rate" percentage shown publicly
- "Usually responds in X hours"
- "Starting at £X" as a leading signal on browse surfaces
- Cold search as the primary discovery path (search exists, but recommendation + credits come first)
- "Browse freelancers" as primary navigation
- Trending professionals list
- Comparison tables between professionals
- Any form of popularity leaderboard
- Spam enquiry mechanics (no "open to any project" mass contact forms)
- Services packages in a Fiverr format ("Basic / Standard / Premium")
- Publicly visible number of bookings completed
- Discount or "limited time offer" signals
- Any copy using: "hire", "marketplace", "top talent", "verified professional", "certified", "trusted sellers", "buy"

---

## 13. Exact Build Order

**Now (no backend required):**
1. ~~`credits[]` in admin release model~~ — DONE
2. ~~Credit live links on artist profile (plain text vs link)~~ — DONE
3. "People worth knowing" section on `able-v7.html` — artist can add artists + professionals they recommend
4. Admin management for that section (add/remove/reorder, handle field)

**V1 (localStorage first, Netlify functions for relay):**
5. `freelancer-start.html` — 4-step wizard, localStorage profile output, Netlify form fallback for credit notification emails
6. Professional profile rendering in `able-v7.html` — context-aware sections (professional type shows credits/portfolio/enquiry; artist type shows current view)
7. Enquiry relay via Netlify function (no Supabase required — just a serverless email relay)
8. Availability state and rate card (optional, stored in same localStorage profile key)

**V1.5 (requires Supabase auth):**
9. Magic link auth — single system for artists and professionals
10. Credit verification state machine (pending → confirmed / expired / denied)
11. Artist notification flow for credit confirmation
12. Profile claiming: new professional sign-up → scan artist credits → match → convert link
13. "Artists on ABLE" auto-generated strip (from confirmed credits)
14. "Found via credits this month" stat in professional dashboard

**Phase 2:**
15. Before/after audio comparison player
16. Discord OAuth + Community Member badge
17. Full credit analytics per release
18. Light discovery surface ("professionals who worked with artists you follow")
19. Premium Freelancer tier + booking deposits (Stripe Connect)
20. Cron: 30-day pending credit auto-expiry

---

## 14. File Updates Required

| File | What belongs there | Why |
|---|---|---|
| `able-v7.html` | "People worth knowing" section + professional profile rendering mode | Profile page serves both types; section needs adding |
| `admin.html` | Recommendations management section (add artist/professional to "People worth knowing") | Artists manage their recommendations here |
| `freelancer-start.html` | Create from scratch — 4-step wizard | Professional onboarding entry point |
| `netlify/functions/enquiry-relay.js` | Serverless email relay for booking enquiries | Keeps professional's email private |
| `docs/systems/freelancer-auth/SPEC.md` | Update with this doctrine's refinements (asymmetry rule, profile structure, copy system) | Keep spec current |
| `docs/systems/freelancer-auth/PRODUCT-DOCTRINE.md` | This document | Authority for all freelancer product decisions |
| `docs/pages/profile/DESIGN-SPEC.md` | Update §6.12 with "People worth knowing" design spec (two types, max 6, visual treatment) | Profile spec must match doctrine |
| `CLAUDE.md` | Update freelancer build order to match this doctrine | Build authority needs updating |

---

## 15. Final Verdict

**Yes. Start building now. The first chunk is the "People worth knowing" section on `able-v7.html`.**

Here is the exact reasoning:

The credits infrastructure is in place. The professional profile concept is solid. The spec is production-quality. The only reason not to build is the backend dependency — and that dependency does not apply to the first three items. "People worth knowing" on the artist profile, admin management for that section, and the start of `freelancer-start.html` are all buildable without Supabase.

The first real chunk should be: **"People worth knowing" section on able-v7.html + admin management**.

Why this first:
1. It immediately makes the artist profile richer without requiring any professional to sign up
2. It establishes the visual language for how recommendations are treated
3. It creates demand — artists will want to credit people who are on ABLE
4. It is the missing second half of the credits mechanic: credits live on releases, recommendations live on the profile

What it should not do at this stage: require professionals to already be on ABLE. An artist should be able to add anyone to their "People worth knowing" — with a handle if they're on ABLE, as plain text if not. The asymmetry rule applies from day one.

The second chunk should be `freelancer-start.html` — the 4-step wizard that lets a professional create a localStorage-first profile and go live, before the backend is ready.

The platform's second user type should exist by the end of this build phase.

---

*This document is the final authority on the professionals/freelancer layer. All build decisions should reference it.*
*Next document to update: `docs/pages/profile/DESIGN-SPEC.md` §6.12 — "People worth knowing" section design.*
