# ABLE — The Build Process
**The exact sequence for taking any page from current state to 10/10.**
**Created: 2026-03-15 | Expanded: 2026-03-16**

> This process was defined in theory, then battle-tested on the landing page. Every stage below is the refined version — what actually produced a 9.5/10 strategy score, ready to build. Follow it exactly. Do not skip stages. Do not reorder. This document is both a process and a manifesto. Read it as both.

> **The core idea:** every build step is a rethink, not just an implementation. The spec is the floor, not the ceiling. The build earns the scores. Playwright verification is not optional — it is the build. The loop never ends.

---

## THE FULL PROCESS — 9 STAGES

```
Stage 0 → Context Load
Stage 1 → Purpose
Stage 2 → Competitive Research
Stage 3 → 20-Angle Analysis (first pass)
Stage 4 → User Journey Maps
Stage 5 → Copy First
Stage 6 → Path to 10 + Design Spec
Stage 7 → Strategy Review + Final 20-Angle
Stage 8 → Build + Playwright Verify (continuous improvement loop)
Stage 9 → Post-Page Final Review
```

---

## STAGE 0 — CONTEXT LOAD
**Time: 10–15 minutes. Every session, before anything else. No exceptions.**

Do not open a code file. Do not write a single line of HTML. Do not read the spec. Read the orientation documents first. This is not bureaucracy — it is the difference between building the right thing and building efficiently in the wrong direction.

### What to read, and why

**1. `CONTEXT.md` — active files, tokens, authority order**

Read this completely. Extract:
- Which file is currently active for the page you're working on. (The answer is always in the top table. Do not assume from memory.)
- The design tokens for the target page. Write them down. You will need them during build and they must be memorised, not looked up.
- The authority order for this session. Which docs supersede which? CONTEXT.md tells you this explicitly.
- The localStorage key list. Every key you will read or write during this session should be known before you start. If a key isn't in the canonical list, it either doesn't exist yet or it's a bug.
- The CTA architecture rules. Three zones, strict caps. Know these before writing a single button.

**Red flags in CONTEXT.md:**
- A file listed as active that you don't recognise — something has been renamed or updated since your last session. Stop and understand the change.
- A token value that differs from what you remember — the design system may have been updated.
- A key listed as deprecated — check you're not still writing to it anywhere.

**2. `docs/STATUS.md` — current build state**

Read the last three session summaries. Extract:
- What was the last thing committed? Start from that exact point.
- Are there any known issues that affect the section you're building? Known issues compound if not tracked.
- What is the current score for this page? Do not start building under the assumption that you know the score.
- What has been deferred? Deferred items from a previous session sometimes become immediately relevant.

**Red flags in STATUS.md:**
- A session summary that ends with "deferred items" and one of those items is the section you're about to build — resolve the deferral before starting fresh work.
- Scores that feel inconsistently high — if the admin page is at 9.7/10 but you know the fan sign-up flow has a bug, trust the bug, not the score.
- A date that is more than 3 days old — something may have shifted in the design decisions since then. Check CONTEXT.md authority order again.

**3. The relevant DESIGN-SPEC.md for the page**

This is your primary build document for Stage 8. At Stage 0, read it at a high level:
- What sections exist?
- What is the build order specified in PATH-TO-10.md?
- Are there any spec notes marked "deferred" or "TBD" — those require resolution before building, not after.

**4. `docs/pages/[page]/FINAL-20-ANGLE-REVIEW-2.md`**

Read the final scores and targets. These are the numbers you are building toward. Know them. If any angle has a note like "blocked by real user data" — understand that ceiling before you start. You cannot earn a 10 on Social Proof during a pre-launch solo build. Honest ceilings are not failures; they are context.

**5. `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md` — a brief re-read**

Even if you've read this before, a 5-minute reread before every session recalibrates your copy instincts. The banned phrases list must be live in your head during build, not something you check after the fact.

**6. `docs/v6/PRODUCT_TRUTH.md` — what ABLE is**

One read-through at the start of every new page. Not every session — but any time you start work on a page you haven't touched before. ABLE has a clear identity. It is not a tool. It is not a platform. It is a place for artists to be themselves. Every design decision should be testable against this.

### The orientation sentence

Before proceeding to Stage 1, write this sentence and confirm it:

> *"This page is for [user type], who fears [specific fear], and the constraint on this session is [constraint]."*

The fear is specific. "Wasting time" is not a fear. "Being locked into another platform that doesn't understand musicians" is a fear. "Signing up and having nothing to show their fans" is a fear. If you cannot name the fear precisely, re-read `docs/pages/[page]/USER-JOURNEYS.md` or `docs/process/FEAR_MAPS.md`.

The constraint is honest. "No backend yet" is a real constraint. "Only 2 hours" is a real constraint. "Can't show social proof because no real users yet" is a real constraint. Naming constraints at the start prevents them from becoming silent compromises at the end.

**Do not proceed until you can write that sentence without looking at the docs.**

### Orientation checklist

- [ ] Active file confirmed
- [ ] Design tokens written down (from memory after reading CONTEXT.md)
- [ ] Last session summary read — starting from correct point
- [ ] Current page score confirmed
- [ ] Known issues for this section noted
- [ ] Deferred items reviewed — none blocking this session
- [ ] DESIGN-SPEC.md read at high level — build order known
- [ ] FINAL-20-ANGLE-REVIEW-2.md scores known — targets confirmed
- [ ] Honest ceilings identified and accepted
- [ ] Orientation sentence written and confirmed

**Output:** The orientation sentence. Do not proceed without it.

---

## STAGE 1 — PURPOSE
**What must this page DO? Not what features does it have — what must it accomplish?**

This stage takes 20–30 minutes and produces one sentence. That sentence is the most important artefact of the entire process. Everything else — the design, the copy, the CTA weight, the hero headline — flows from it. Get it wrong here and every subsequent stage produces beautiful work in the wrong direction.

### The distinction: job vs features

A feature is "fan email capture." A job is "make every artist who lands on this page feel confident that they will never lose a single fan to an algorithm again."

The job statement names the outcome, not the mechanism. It answers "what changes in the user's life" not "what is on the page."

### Questions to answer before writing the job statement

**Primary:**
- What is the one thing this page must make a visitor think, feel, or do?
- What has changed for the visitor as a result of spending time on this page?
- If this page were to disappear from the product entirely, what would break?

**User type:**
- Which of the three visitor types is this page primarily for? (New artist exploring / Switcher comparing / Fan of a specific artist)
- Is there a meaningful secondary visitor type? (A journalist? A label A&R? An artist's manager?)
- What does the primary visitor already know when they arrive? What don't they know?

**Ordering logic:**
- What did the user do immediately before arriving at this page?
- What do we want them to do immediately after?
- Is this page a destination or a transition?

**The breaking test:**
Ask: "What breaks if this page doesn't exist?" The answer reveals the page's true job. If nothing breaks — the page is probably redundant. If something critical breaks — that is the job.

### Job statement examples (by page type)

**Landing page:**
*"Convert a curious independent artist — who has heard of ABLE but not yet committed — into someone who starts building their profile today, by showing the product actually working, making the Linktree comparison explicit, and removing every reason to hesitate."*

**Onboarding wizard:**
*"Get an artist from zero to a live, personalised profile they are proud to share — in under 4 minutes — without asking them anything that feels like bureaucracy, and without losing them to confusion, boredom, or the feeling that this is just another form."*

**Artist profile (fan-facing):**
*"Make every fan who lands here feel closer to this artist than they do anywhere else online — and give them one clear, un-ignorable action that keeps that closeness real."*

**Admin dashboard:**
*"Give an artist a clear view of what their page is doing, who is showing up, and what they should do next — without requiring them to be a marketer, a data analyst, or a growth hacker."*

**Fan dashboard:**
*"Make a fan feel like they know what is happening with every artist they care about — not through an algorithm, but because the artist chose to tell them directly."*

### Anti-patterns in job statements

These are common mistakes. If your job statement reads like one of these, rewrite it:

- **The feature list disguised as a job:** "The landing page must show pricing, demo, and CTA." That is a feature list. Add the "so that" — what must those features accomplish?
- **The business goal disguised as a user job:** "Convert 40% of visitors to sign-ups." That is a metric. The job statement must describe the user's experience, not the business outcome.
- **The vague emotional statement:** "Make artists feel good about ABLE." Too vague. What specifically do they feel? Trusted? Understood? Relieved? Excited? Name the specific emotion.
- **The audience-of-one problem:** Writing a job statement for a hypothetical average user. The job statement should be testable against a specific, named person. If you cannot test it against Declan (27, Manchester, 2.4k Instagram followers, tried Linktree, gave up), it is too abstract.

### Secondary purpose detection

After writing the primary job statement, check for secondary purposes. A page rarely has only one job. But if it has more than two, it has too many.

- Landing page secondary: "Serve the occasional journalist, A&R, or manager who lands here and needs a fast, credible overview of what ABLE is."
- Artist profile secondary: "Give the artist a link they are proud to share — something that looks better than every competitor's equivalent."
- Onboarding secondary: "Begin building the artist's mental model of what Campaign HQ is, even before they've activated it."

Write the secondary job in one sentence, clearly subordinated to the primary. If secondary jobs are competing with the primary for design weight — resolve the competition before proceeding. The primary job wins. Always.

### The one-screen test

Before locking the job statement, ask: "Could this job be communicated on a single screen?" If yes — the page may be simpler than you think. If no — what are the minimum number of screens required?

This test prevents over-engineering. Many pages try to do five jobs and fail at all five. A page with one clear job, executed with precision, always outperforms a page with five mediocre executions.

**Output:** One sentence primary job statement. One sentence secondary job statement (optional). Written down, locked, referenced throughout every subsequent stage.

If you cannot write the primary job statement clearly, you do not understand the page. Do not proceed until you can.

---

## STAGE 2 — COMPETITIVE RESEARCH
**What do real users say? What does world-class look like? What are competitors doing wrong?**

Research is not inspiration tourism. It is intelligence gathering with a specific mission: find the gaps, validate the assumptions, and steal intelligently from what already works at the highest level.

**Time budget: 60–90 minutes of active research, run in parallel with document writing where possible.**

### The research mission (always the same three questions)

1. **What are real users of comparable products saying?** Not what they say in structured interviews — what they write when no one is watching, in reviews, forum posts, and community threads.
2. **What does world-class look like in this category?** Not "pretty" — genuinely effective. Measured by conversion, retention, recommendation. What specifically makes it work?
3. **What are competitors getting wrong that we could get right?** The gap between what users complain about and what competitors still haven't fixed is always there. Find it.

### Search queries to run (for each research area)

**Direct competitor analysis (Linktree, Beacons, Feature.fm):**
```
"Linktree review" site:reddit.com
"Beacons alternatives" site:reddit.com
"linktree problems" site:trustpilot.com
"feature.fm review" musicians
"linktree for artists" OR "beacons for musicians" complaints 2025 2026
"linktree spam" OR "linktree blocked" instagram tiktok
```

**Real user complaints (artists specifically):**
```
site:reddit.com/r/WeAreTheMusicMakers "link in bio"
site:reddit.com/r/musicproduction "linktree" OR "bio link"
site:reddit.com/r/independentmusic "fan sign up" OR "fan email"
"independent musician" "link in bio" problems 2025
```

**World-class examples (adjacent industries):**
```
"best onboarding 2025 2026" UX
"best link in bio page" design
"musician landing page" best examples
"indie artist" "pre-save" best practices
"musician website" "fan sign up" conversion
```

**Conversion benchmarks:**
```
"link in bio" conversion rate benchmark 2025
"pre-save campaign" conversion rate music
"fan email capture" conversion music artists
```

**Switching behaviour:**
```
"switched from linktree" musician
"cancelled linktree" reason
"left beacons" why
```

### Sources to check for each finding type

| Finding type | Source | What to look for |
|---|---|---|
| Real complaints | Reddit (r/WeAreTheMusicMakers, r/musicproduction, r/indieheads) | Repeated frustrations, unmet needs |
| Product reviews | Trustpilot, Product Hunt, G2, Capterra | 1-star and 2-star reviews specifically — the honest ones |
| App Store | Apple App Store + Google Play reviews | Linktree, Beacons — filter by lowest rating |
| Design examples | Muzli, Awwwards, Dribbble | World-class UX for reference only — not to copy |
| Conversion data | CXL, ConversionXL, Unbounce blog | Landing page and onboarding benchmarks |
| Music industry | Hypebot, MusicAlly, The Trichordist | Music-specific platform behaviour and artist psychology |

### How to evaluate competitor copy quality

When you read a competitor's copy, ask these five questions:

1. **Does it describe the user's situation or the product's features?** User-situation copy converts. Feature-list copy does not. *"You've got 3 seconds when someone taps your link"* is user-situation. *"Customisable link-in-bio"* is feature-list.
2. **Is there a specific claim or a platitude?** *"Your fans stay close"* is a platitude. *"Every fan who signs up gets added to your private list — no algorithm between you"* is a specific claim.
3. **Does it assume the user is a professional marketer or treat them like a musician?** Marketing jargon (*"optimise your conversion funnel"*) is a trust signal failure for independent musicians. They know immediately it's not for them.
4. **Does it make the competitive comparison explicit?** The best copy does not avoid the comparison — it makes it, on its own terms, without desperation.
5. **Read it aloud.** Does it sound like something a real person would say? Or does it sound like something a committee approved?

### The research output template

For each finding, write one entry in this format:

```
## Finding [N]
**Source:** [URL or "Reddit r/WeAreTheMusicMakers"]
**What it says:** [direct quote or close paraphrase]
**What it means for ABLE:** [one sentence — specific, actionable]
**Which angle it affects:** [angle number from 20-angle framework]
**Priority:** P0 / P1 / P2
```

Aim for 8–12 findings. Quality over quantity. A finding that does not have a clear "what it means for ABLE" is not a finding — it is noise.

### Cheap wins from competitor failures

This is the highest-ROI research output. A cheap win is something a competitor is getting wrong that:
- Real users are complaining about
- Is technically straightforward to get right
- Directly affects the primary job of the page

Examples:
- Linktree's `linktr.ee` domain gets flagged as spam by Instagram and TikTok. ABLE's domain is clean. Cost: zero. Differentiator: real. Name it in copy.
- Beacons uses "content creator" throughout. ABLE never does. Cost: copy edit. Differentiator: meaningful to musicians.
- Most link-in-bio tools show a blank page on first load with no guidance. ABLE's onboarding goes directly to a live preview. Cost: already built. Differentiator: name it in the wizard.

### The competitor gap matrix

After completing research, build this table:

| Problem | Linktree | Beacons | Feature.fm | ABLE |
|---|---|---|---|---|
| Domain spam flagging | ✗ (bad domain) | ✗ (same) | Partial | ✓ (clean domain) |
| Artist identity vs creator identity | ✗ | ✗ | Partial | ✓ |
| Fan email without algorithm | ✗ | Partial | ✗ | ✓ |
| Pre-release campaign mode | ✗ | ✗ | ✓ | ✓ |
| [Add per research findings] | | | | |

This matrix is not for publication. It is for internal clarity about where ABLE genuinely wins — so those wins can be named specifically in copy.

### Handling negative findings

Not every finding will support the current spec. Sometimes research will surface:
- A competitor doing something better than ABLE's current spec
- A user complaint that directly applies to ABLE's current design
- Evidence that an assumption in the spec is wrong

These findings are the most valuable. Do not suppress them. Log them in the research document and bring them to Stage 7. If a finding is severe enough to change the page's primary job — go back to Stage 1 before proceeding.

### The "steal intelligently" principle

Stealing intelligently means:
- Taking the *reason* something works, not the execution
- Adapting it to ABLE's specific user, voice, and constraints
- Acknowledging the source in your research notes (not the final product — just internally)

Stealing unintelligently means copying the execution. That produces a product that looks like a worse version of the original. Take the insight. Build something new from it.

**Output:** `COMPETITIVE-RESEARCH.md` — 8–12 findings, in template format, with the competitor gap matrix. Prioritised. Actionable. Each finding traces directly to a 20-angle number.

---

## STAGE 3 — FIRST-PASS 20-ANGLE ANALYSIS
**Score the current state. Identify the P0 gaps. Do not inflate.**

The 20-angle analysis is the core diagnostic tool of this process. It transforms qualitative intuition into structured, scored, actionable analysis. Run it after every significant build milestone. Run it before any major spec decision. It does not tell you what to build — it tells you where the gaps are so you can decide what to build.

**The analysis requires honesty above all else.** An inflated score is worse than a low score. An inflated score gives you false confidence. A low score with an honest path to improvement gives you a plan.

### The 20 angles — detailed guidance for each

---

**Angle 1 — First impression**
*What is understood in the first 3 seconds, before the user reads a single word?*

This is about the visual signal — not the text. What does the layout, the colour, the dominant visual element communicate before reading?

What a 10 looks like: A first-time visitor at 375px can, in 3 seconds, identify: (1) what type of thing this is, (2) who it is for, (3) a sense of quality. They don't need to read. The visual language tells them.

Common failure modes:
- Generic hero that could be any SaaS product — no visual identity
- Cluttered layout with no dominant element — the eye has nowhere to go
- Typography that doesn't match the claimed quality level (bold claims, weak type)
- Accent colour that reads as corporate rather than expressive

How to test it: Take a Playwright screenshot at 375px. Look at it for 3 seconds. Write down the three things a first-time visitor would understand. Then ask: are those the three things you intended?

---

**Angle 2 — Primary job**
*Does the page deliver its one job from Stage 1?*

After the first pass is complete, re-read the Stage 1 job statement. Then ask: does what was built actually accomplish this? The job statement is the test.

What a 10 looks like: Every section of the page serves the primary job. Nothing contradicts it. The visitor who completes the primary action (signs up, continues to the next page, understands the differentiator) has experienced exactly what the job statement promised.

Common failure modes:
- Sections that serve a business goal rather than the user's job (e.g., pricing section that feels like a sales pitch rather than a clarification)
- Page that delivers the job but buries it — correct information in the wrong order
- Page that delivers half the job but loses the user before completing it

---

**Angle 3 — Headline / entry copy**
*Does the first thing they read resonate — or just describe?*

The headline is not a title. It is not a description. It is the first moment of recognition — where the user thinks "yes, this is for me."

What a 10 looks like: An independent musician reads the headline and thinks "exactly." Not "interesting." Not "I'll read more." Exactly — as in: this person understands my situation precisely.

Common failure modes:
- Clever copy that doesn't land with the specific user type ("You've got music to make. We've got everything else." — what does that even mean?)
- Descriptive copy that lists features instead of naming the problem ("The link-in-bio for musicians" is descriptive, not resonant)
- Trying to be broad enough to include everyone — and connecting with no one

Test it: Read the headline aloud as if you are Declan (27, Manchester, 2.4k Instagram followers, slight sceptic). Does it sound like something written specifically for him? Or does it sound like something written about him, for an investor deck?

---

**Angle 4 — CTA design and weight**
*Is the action clear, visible, and sized correctly at every breakpoint?*

The CTA is where the page's job becomes a user action. It must dominate without being aggressive. It must be specific without being clinical. It must feel inevitable.

What a 10 looks like: At 375px, the primary CTA is visible without scrolling. It is 48px minimum height. The copy is specific ("Your page is free →" not "Get started"). There is only one primary CTA above the fold. The secondary CTA (if it exists) is clearly subordinated.

Common failure modes:
- Multiple primary CTAs competing for attention (the page can't decide what it wants)
- Generic copy ("Sign up", "Get started", "Create account") — banished
- CTA that looks like a button but feels like bureaucracy
- Hero CTA visible at 1280px but scrolled out at 375px

---

**Angle 5 — Copy voice**
*Does every line sound like ABLE, not generic SaaS?*

This is an audit, not a feeling. Go through every piece of user-facing text on the page with the banned phrase list from `docs/systems/copy/SPEC.md`. Any line that could have been written by Linktree, Mailchimp, or a generic startup is a regression.

What a 10 looks like: Read any 10 random pieces of copy from the page. Every one sounds direct, specific, and in the artist's register. No exclamation marks on dashboard copy. No passive voice where active would serve better. No "unlock" anywhere.

Common failure modes:
- Banned phrases that slipped through during coding (check every string, not just the obvious CTAs)
- Placeholder copy that never got replaced
- Copy that was correct in the spec but was slightly altered during implementation to something generic

---

**Angle 6 — Primary differentiator**
*Is the core "why ABLE not Linktree" argument made explicit?*

Not just implicit — explicit. Users who land on any ABLE page have likely also seen Linktree, Beacons, or another link-in-bio tool. The differentiator must be named on the page, in a form that a scanning user would encounter without reading carefully.

What a 10 looks like: A visitor who has also looked at Linktree can, after 30 seconds on this page, articulate one specific thing ABLE does that Linktree doesn't. Not "it's more beautiful" — something functional and specific.

Common failure modes:
- Differentiator buried in body copy that requires reading
- Differentiator stated as a feature ("fan sign-up") rather than a benefit ("your fans, your list, no algorithm between you")
- Differentiator that is genuinely not differentiated (Beacons also has fan sign-up)

---

**Angle 7 — Mobile experience**
*Does this work at 375px without compromise?*

Not "it works" — it works without compromise. Every section, every interactive element, every tap target, every animation. ABLE is a mobile-first product for artists who primarily use their phones. The mobile experience is not a reduced version of the desktop experience. It is the experience.

What a 10 looks like: Playwright screenshot at 375px shows: no horizontal scroll, no clipped elements, no tap targets below 48px, no text that requires pinch-to-zoom, no layout that breaks at 320px.

Common failure modes:
- Desktop layout that reflows to mobile but with insufficient padding
- Tap targets that are visually large but have a small hit area (common with CSS that sets height but not min-height)
- Animations that work on desktop but cause jank on mobile
- `position: fixed` elements that interact badly with iOS keyboard

---

**Angle 8 — Performance**
*Does this add meaningful load time without a return?*

Every asset that loads is a user who might leave before seeing the page. Performance is not perfectionism — it is respect for the user's time and connection.

What a 10 looks like: LCP ≤ 2.5s on a simulated 4G mobile connection. No CLS. No visible layout shift. Fonts preloaded. First render does not wait for any API call.

Common failure modes:
- Loading fonts without `preload` — FOUT on slow connections
- A hero image that is not sized/compressed — kills LCP single-handedly
- Rendering API data in the hero section before the API has responded
- Unused CSS that adds hundreds of kilobytes

---

**Angle 9 — Social proof**
*Does this section earn belief — or just assert it?*

Social proof is the hardest angle to score honestly pre-launch. The honest ceiling at launch is: testimonials from real beta users, or specific early metrics ("10 artists in the first week"). Invented social proof is not social proof — it is fabrication that erodes trust the moment it's questioned.

What a 10 looks like: Specific, named, verifiable proof. An artist name and a specific outcome ("Declan James went from 0 to 847 fans on his list in the month before his album dropped"). At pre-launch: honesty about what is real, combined with trust-building through specificity in everything else.

Common failure modes:
- Anonymous testimonials ("A musician in London said...") — these erode trust, not build it
- Inflated metrics ("Join 10,000 artists!") before there are 10,000 artists
- The absence of any social proof without acknowledgement — early-stage products should name their stage honestly

**Honest ceiling:** Until there are real, verified users with real outcomes, this angle cannot exceed 7/10. Name the ceiling and move on.

---

**Angle 10 — Trust signals**
*Does this build or erode trust?*

Trust is fragile. It is built through specificity, honesty, and the absence of signals that trigger suspicion. It is eroded by vagueness, inflated claims, and anything that makes the user feel processed rather than understood.

What a 10 looks like: Every trust-critical moment in the user's journey has a specific, honest signal. "No card required. Free forever." not "We value your privacy." The pricing is exactly what is charged. There are no hidden surprises in the sign-up flow. The product does exactly what the page said it does.

Common failure modes:
- Vague privacy language that feels like legal boilerplate
- Pricing that looks different after sign-up
- A modal or popup that appears before the user has had a chance to read anything

---

**Angle 11 — Visual hierarchy**
*Can a scanner understand this without reading?*

Most users scan before they read. The visual hierarchy is the page's communication to the scanner. It should be possible to understand the page's structure, key claims, and primary action without reading a word — through size, weight, contrast, and spatial relationships alone.

What a 10 looks like: A non-English speaker looking at a Playwright screenshot at 375px can identify: (1) what the page is about, (2) where the most important thing is, (3) where to act. Without reading a word.

Common failure modes:
- Body copy that is the same size as section headings — no hierarchy
- CTAs that don't visually dominate the sections they're in
- Too many elements at the same visual weight competing for attention

---

**Angle 12 — End-to-end pathway**
*Does the full journey through and beyond this page work?*

A page is not an island. What happens before it determines who arrives. What happens after it determines whether the visit mattered. The pathway must be coherent from first contact to post-conversion.

What a 10 looks like: A user can arrive from any realistic source (Instagram bio link, direct share, search), complete the page's primary job, and land in a sensible next state — without dead ends, broken links, or confusion about what comes next.

Common failure modes:
- Landing page CTA that goes to a 404 or an unfinished page
- Sign-up flow that doesn't end with a logical "what next"
- Mobile scroll that has no visible conclusion — user doesn't know when they've seen everything

---

**Angle 13 — Conversion clarity**
*Is the outcome of taking action obvious?*

Before a user clicks a CTA, they should be able to predict exactly what will happen. Uncertainty at the CTA is friction. "What happens when I click this?" is a question no CTA should leave unanswered.

What a 10 looks like: The CTA copy states or implies the outcome clearly. "Start your free page →" tells the user: they will get a page, it will be free, and it will require them to start something (implying onboarding). No surprises.

Common failure modes:
- "Get started" — started with what? What happens? Where do I go?
- Sign-up button that implies account creation when the first step is actually a wizard
- CTA that leads to a different outcome than suggested (e.g., "See how it works" that leads to a sign-up wall)

---

**Angle 14 — Emotional resonance**
*Does this make the target user feel understood?*

This is not about sentiment. It is about recognition — the specific moment when a user thinks "this was built for me." It is the most valuable thing a product page can produce, and it cannot be faked.

What a 10 looks like: An independent musician with 2,000 followers and a day job reads this page and thinks "finally." Not "interesting." Not "I'll look into this." Finally.

Common failure modes:
- Copy that resonates with musicians in theory but describes them from the outside ("Showcase your music to your fans")
- Page that is technically correct but lacks a moment of genuine understanding — it describes the user's situation without naming the feeling
- Visual design that communicates "professional tool" rather than "built by someone who understands music"

---

**Angle 15 — The "13-year-old" test**
*Non-technical user: does this confuse them?*

Simplicity is a feature. If a 13-year-old who knows nothing about music platforms cannot understand what to do on this page, the page is too complex.

What a 10 looks like: Every action on the page is obvious to a first-time user with no prior context. The hierarchy guides them. The copy is jargon-free. The primary action is impossible to miss.

Common failure modes:
- Technical language that assumes music industry knowledge ("Bandsintown integration", "oEmbed", "Supabase")
- UI patterns that require prior knowledge to use (e.g., edit icons without labels, or action that requires hover to reveal)
- Form fields without clear labels or context

---

**Angle 16 — Single memory**
*If the user leaves after this page, what sticks?*

Every page should leave the user with one thing. Not five things. Not a general impression. One specific, memorable thing that they could repeat to a friend in one sentence.

What a 10 looks like: You can name the one thing this page leaves in the user's memory. It is intentional. It is the most important thing. And the page's visual and copy hierarchy makes it the most memorable element — not by accident, but by design.

Common failure modes:
- Page that tries to communicate too much and leaves users with a general sense rather than a specific memory
- Page where the most visually prominent element is not the most important element
- Page that the user can summarise as "a website for musicians" — too vague to be useful

---

**Angle 17 — Secondary user**
*Is there a secondary user type who lands here? Are they served?*

Every page has a secondary user. Landing pages are visited by label scouts, managers, and journalists, not just independent musicians. Artist profiles are visited by other artists, not just fans. Admin dashboards are occasionally viewed by managers on behalf of an artist.

What a 10 looks like: The secondary user can extract what they need from this page without it compromising the primary user's experience. They may not get a dedicated CTA — but they get enough context to understand the product.

Common failure modes:
- Page entirely optimised for one user type that leaves secondary users confused
- Page that tries to serve secondary users explicitly and dilutes the primary experience

---

**Angle 18 — Discoverability**
*SEO basics, OG tags, shareability*

This page will be shared. Links will be previewed. Search engines will crawl it. If the OG tags are missing or wrong, the preview will be ugly or empty. If the title tag is generic, it won't rank for the terms that matter.

What a 10 looks like: Check source. Title tag: specific and accurate. Meta description: specific claim, not generic blurb. OG:image: populated, correct dimensions (1200×630). OG:title: same as title or specific variant. Twitter card: set. Canonical URL: set.

Common failure modes:
- Title tag left as "ABLE" or "Untitled Document"
- OG:image missing — social previews show a blank square
- Meta description that is the same for all pages

---

**Angle 19 — AI red team**
*What would kill this page's effectiveness? List all threats.*

Run the adversarial pass. Imagine everything that could go wrong and ask: does the page survive it?

Threats to consider:
- Artist shares their profile on Instagram. Instagram flags the domain as spam. (Has this happened with our domain?)
- A prospective fan arrives with ad-blocker enabled. Does the page still function?
- The artist hasn't updated their profile in 6 months. Does the page look stale or abandoned?
- A journalist arrives looking for the artist's booking contact. They can't find it. They leave.
- Playwright confirms a mobile layout issue that a real user would hit on the most popular iPhone model in the target market.

**Output:** A list of specific threats with honest assessments of each. Not all threats are equal — prioritise P0 (breaks core function), P1 (degrades core function), P2 (nice to fix).

---

**Angle 20 — North star**
*Does this feel like ABLE, or like "a tool"?*

This is the final sense check. ABLE has an identity. It is for artists with depth. It is not a marketing platform. It is not a CRM. It is not a link aggregator. It is a place for artists to be themselves.

What a 10 looks like: An independent musician who has never heard of ABLE looks at this page and, before reading a word, senses that it was built by people who understand music — not by people who optimised a product for musicians.

Common failure modes:
- Design that prioritises conversion over expression
- Copy that talks at artists rather than with them
- A page that looks like it could be for any "creator" rather than specifically for musicians

---

### Running the first-pass analysis

Score honestly. First-pass scores are usually between 4 and 7. That is normal. The gaps revealed by low scores are exactly what Stages 4–7 are designed to close.

For each angle below 8, write:
- What is specifically wrong (not "it's low" — what exactly)
- What the path to 8 looks like
- What the path to 10 looks like (may differ from path to 8)
- Whether there is an honest ceiling below 10, and why

### Multiple passes

Run a minimum of 3 passes after the first-pass scores. Show updated scores after every pass. Never stop because the score looks high.

After reaching 10 on any angle, ask: "What would make this an 11 if 11 existed?" That answer becomes the next design iteration or a product roadmap item.

### P0 prioritisation rule

P0 angles are those where the current score is below 6 AND the angle directly affects the primary job (Angle 2). Specifically:
- Angle 2 (Primary job) below 7 = P0. Stop everything. Fix this first.
- Angle 7 (Mobile) below 6 = P0. Mobile is the experience.
- Angle 14 (Emotional resonance) below 6 = P0. The page does not connect.
- Any other angle below 5 = P1. Plan a specific fix before proceeding.

### Angle interdependencies

Some angles cannot be high if others are low:
- Angle 3 (Headline) and Angle 14 (Emotional resonance) are coupled — weak headline means weak resonance
- Angle 4 (CTA) and Angle 13 (Conversion clarity) are coupled — confusing CTA means unclear conversion
- Angle 5 (Copy voice) affects almost everything — bad copy degrades trust, resonance, first impression, and north star simultaneously
- Angle 1 (First impression) and Angle 11 (Visual hierarchy) are coupled — poor hierarchy kills first impression

When fixing a low-scoring angle, check its coupled angles. Fixing one often lifts both — or one fix can inadvertently lower the other.

**Output:** Scored analysis document with all 20 angles. P0 gaps identified and named. At least 3 paths-to-10 written before proceeding to Stage 4.

---

## STAGE 4 — USER JOURNEY MAPS
**Who actually uses this page? What do they experience? What do they fear?**

*Added after the landing page exercise — not because it was forgotten, but because building without it revealed what was missing.*

Before writing a single word of copy, map who actually uses this page and what their experience is. Not who you imagine uses it — who actually does, with their real context, their real fears, and their real motivations.

The purpose of this stage is to make every subsequent design decision testable against a real person. Not a persona — a person. Declan James, 27, Manchester, 2.4k Instagram followers, a Linktree he set up in 2023 and never updates because the platform gives him nothing back.

Every design decision must be testable against Declan. "Would Declan notice this?" "Would Declan trust this?" "Would Declan find this patronising?" If the answer to any of those is "I don't know" — the journey map is not complete.

### Journey map template — complete field list

For each user type that lands on this page, write a complete journey map with these fields:

---

**Identity:**
- Name, age, city (specific)
- Occupation (separate from music, if applicable — most independent artists have day jobs)
- Music context: genre, release stage, platform following size
- Current toolkit: what platforms are they using today? What are they paying for?
- Why they might arrive at this page: what was the trigger?

**Emotional baseline:**
- What are they feeling when they arrive?
- What is their default level of trust toward a new platform?
- What is their primary fear about this type of product?
- What would need to happen in the first 10 seconds to make them stay?

**The arrival moment:**
- How did they get here? (Instagram bio tap, friend recommendation, Google search, direct share)
- What device are they on? (Almost always mobile — but specify)
- What time of day, and what context? (In bed, in a break between sets, at their desk)
- What did they see immediately before this page?

**The path — step by step:**
- Every step, including pre-page steps (e.g., "they searched for Linktree alternatives")
- At each step: what do they see? What do they think? What do they feel?
- At each step: what is the risk of losing them here?

**Decision points:**
- Where could they drop? (List every one)
- What would make them drop? (Be specific — "the page looks generic" is not specific enough; "it looks like the same Canva template as every other music platform" is specific)
- Where do they convert? What makes them act?

**The fear inventory:**
- List every fear the user carries into this experience. Classify each as:
  - **F1 — Trust fears:** "Is this a real company? Will they misuse my email?"
  - **F2 — Commitment fears:** "Will I be locked in? What if I want to leave?"
  - **F3 — Effort fears:** "Is this going to take all afternoon to set up?"
  - **F4 — Exposure fears:** "What will my fans see? Will it look unprofessional?"
  - **F5 — Relevance fears:** "Is this actually for someone like me, or for big artists with real teams?"

**What ABLE must do:**
- For each fear: what specific design or copy decision addresses it?
- For each decision point: what must be true on the page to keep them?

---

### Example: Declan (the sceptical Manchester artist)

**Identity:**
- Declan James, 27, Manchester
- Works Monday–Friday in a logistics company
- Makes lo-fi indie music with 2.4k Instagram followers, 1.1k on Spotify monthly listeners
- Currently uses Linktree (free tier, last updated 4 months ago)
- Pays for nothing music-related except his Spotify subscription
- Arrived via a friend's share of an ABLE artist profile — he saw it and thought "that looks different"

**Emotional baseline:**
- Slightly sceptical — he's seen a lot of "platforms for musicians" that are just generic SaaS with a guitar icon
- Tired of platforms that want his data without giving anything back
- Proud of his music but not expecting much from an unknown platform
- His primary fear: "This will be another thing I set up once and abandon because it's not worth maintaining"

**The arrival moment:**
- He's on his phone during a lunch break
- He tapped a link from a friend's WhatsApp message: "Have you seen this? Looks like a proper Linktree alternative for musicians"
- He's giving this 90 seconds

**The path:**
1. Page loads. He sees the artist profile of whoever his friend shared. Not a marketing page — an actual artist's page. First thought: "OK, this is interesting."
2. He scrolls. He sees the artist's music, their events, a fan sign-up. He thinks: "I could have this."
3. He notices the "Made with ABLE" footer. He taps it.
4. He lands on the landing page. He sees the headline. Is it "finally"? Or is it "interesting"?
5. He sees the Linktree comparison. Specific claims, not general ones. Does he recognise himself in the comparison?
6. He sees the price. Free. No card required. His commitment fear is addressed immediately.
7. He sees the CTA: "Your page is free →". He hesitates. "How long will this take?"
8. He either taps it or closes the tab. This is the conversion moment.

**Decision points:**
- Step 4: Landing page headline doesn't resonate → leaves
- Step 5: Competitor comparison feels defensive or desperate → trust erodes, leaves
- Step 6: Price is unclear or requires hunting → effort fear activates, leaves
- Step 7: CTA implies a long process → effort fear activates, leaves

**Fear inventory:**
- F5: "Is this for someone with 2,400 followers, or for artists with real teams?" — address by showing the onboarding for artists at exactly his scale
- F3: "How long will the setup take?" — address by naming the time commitment in the CTA or immediately adjacent copy
- F2: "What happens if I want to leave?" — address by confirming no lock-in, no card required
- F1: "Will they spam me?" — address by specificity (not generic privacy language) and no email required until fan capture

**What the page must do:**

| Moment | What Declan needs | How the page delivers it |
|---|---|---|
| First 3 seconds | A visual signal that this is different | Quality design, not generic template |
| First 10 seconds | Recognition — "this is for someone like me" | Copy that speaks directly to his situation |
| CTA moment | Reduction of effort fear | Time commitment stated or implied |
| After tapping CTA | Confirmation that commitment is low | "Free. No card. 4 minutes." in onboarding entry |

### Identifying journey gaps

A journey gap is a moment in the map where the current design does not address what the user needs. Common gaps:

- **The blank loading state gap:** User arrives while the page is loading. What do they see? If it's a white screen for 800ms, that's a gap.
- **The "what next" gap:** User completes the primary action. Where do they go? If there's no clear next state, that's a gap.
- **The mobile return gap:** User arrives on mobile, gets interested, wants to continue on desktop later. Is there a way to resume? That's a gap.
- **The "come back later" gap:** User isn't ready to sign up. Is there a low-commitment action they can take instead? If not, that's a gap — and a lost fan.

### The emotion curve

After mapping the path, draw (or describe) the emotion curve: how does the user's confidence, trust, and excitement change at each step? It should look like a staircase with one inflection point — not a rollercoaster.

A healthy emotion curve: arrives neutral or slightly sceptical → first impression builds curiosity → headline builds recognition → comparison builds confidence → price removes commitment fear → CTA is obvious and low-friction → lands in onboarding feeling: "I'm actually doing this."

An unhealthy emotion curve: arrives neutral → generic first impression, flat → copy doesn't resonate, slight drop → pricing is unclear, trust drops → CTA is generic, friction → lands in a sign-up form, trust drops further.

### Translating journey findings into product requirements

Each journey gap and each fear translates directly into a product requirement. Format:

```
Journey gap: [description]
User affected: [name from journey map]
Fear type: [F1–F5]
Product requirement: [specific design or copy change]
Priority: P0 / P1 / P2
```

These requirements feed directly into Stage 6 (Design Spec) and the PATH-TO-10.md.

**Output:** `USER-JOURNEYS.md` — 2–3 complete journey maps, each with the full template, fear inventory, and "what the page must do" table. Journey gaps listed with product requirements. Emotion curve described for each journey.

---

## STAGE 5 — COPY FIRST
**Write every word before designing anything. The copy tells you what the design must accommodate.**

This is the stage most builders skip. They open a design tool, arrange elements, and fill in copy later. The result is copy that fits the design rather than design that serves the copy. That is backwards. Copy is the substance. Design is the container.

Copy tells you:
- How much space you need for a section
- What the visual hierarchy must be (the most important thing needs the most space)
- What the page must communicate at each point and in what order
- Where a section will feel empty (and therefore either needs more copy or needs to be cut)
- Where a CTA needs to be louder or quieter

### The copy hierarchy (write in this order, always)

For every section of every page, write copy in this exact hierarchy:

1. **Section headline** — the primary claim, in the artist's register. Written first.
2. **Sub-headline or eyebrow** — the context or qualifier. Sometimes absent — and that's fine.
3. **Body copy** — only if needed. Many sections do not need body copy. If you are writing body copy to fill space, cut it.
4. **CTAs** — first person where possible. Specific outcome implied. Never generic.
5. **Trust lines** — specific claims, not platitudes. "No card required. Free forever." is a trust line. "We value your privacy" is not.
6. **Empty states** — what does the user see when a section has no data yet? This is one of the most important copy jobs on the page and one of the most neglected.
7. **Micro-copy** — labels, hints, placeholders, error messages, confirmations. Every word matters. Placeholders especially — they are often the first copy a user sees.

### The voice calibration test

Before writing any copy for a page, run these 5 calibration questions:

1. **Who is speaking?** On the artist profile page, the voice is the artist — first person. On the landing page, the voice is ABLE addressing the artist — second person ("your fans", "your page"). On the admin dashboard, the voice is a trusted peer, not a product manager.

2. **What is the register?** ABLE's register is: warm, direct, specific, slightly laconic. Not formal. Not chatty. Not corporate. Think: a peer who knows the music industry and isn't trying to sell you something.

3. **What is the reader's emotional state when they encounter this copy?** If the user is in a flow state (mid-onboarding), copy should be brief and forward-moving. If they're evaluating (landing page comparison section), copy should be specific and evidence-based. Different emotional states require different registers.

4. **What is the single thing this copy must achieve?** One sentence. If you cannot state what this piece of copy must accomplish in one sentence, you don't know what you're writing yet.

5. **Could Linktree have written this?** If yes — rewrite. Every line of ABLE copy should be identifiably ABLE's, not generically applicable to any music platform.

### The read-aloud test

After writing any section of copy, read it aloud. Not skimming — actually speaking the words out loud.

If you stumble over a sentence — it's too long or too complex. Simplify.
If a word sounds like jargon when spoken — replace it with the word a musician would actually use.
If the CTA sounds like a command rather than an invitation — rewrite it.
If the trust line sounds like legal copy — it will feel like legal copy to the user. Rewrite as a specific claim.

The read-aloud test catches more problems than any other editorial process. Use it after every section, not just at the end.

### A full copy hierarchy example

For the landing page hero section:

```
[SECTION HEADLINE]
"Your music. Your fans. Nothing in between."

[SUB-HEADLINE]
"The profile that works as hard as you do —
without an algorithm deciding who sees it."

[BODY COPY]
(none required — the headline and sub-headline do the work)

[PRIMARY CTA]
"Your page is free →"

[TRUST LINE]
"No card required. Set up in 4 minutes."

[SECONDARY CTA]
"See how it works ↓"
```

Note: no body copy between headline and CTA. The trust line does the work the body copy would have wasted words on.

### Handling copy that requires dynamic data

Some sections of ABLE pages display data that doesn't exist yet (fan counts, release dates, streaming numbers). Write the copy for both states:

- **Populated state:** Copy that uses the dynamic data naturally ("47 people on your list")
- **Empty state:** Copy that is honest and action-oriented, never apologetic ("Your list starts here. Share your page to start growing it.")

Empty state copy is not a failure state. It is the first thing many artists see. It should feel like an invitation, not a void.

### How to write CTAs that don't sound like CTAs

Generic CTA: "Get started"
ABLE CTA: "Your page is free →"

The difference:
- "Get started" describes an action. "Your page is free →" describes an outcome.
- "Get started" is imperative. "Your page is free →" is declarative — it tells you what you're getting before you tap.
- "Get started" could be on any product. "Your page is free →" is specific to ABLE.

Rules for every CTA:
- State the outcome, not the action
- First person where possible ("Start building mine" over "Start building yours")
- Specific over generic ("Your page is free →" over "Sign up free")
- Arrow (→) only for forward progression CTAs. Not for destructive actions. Not for modals.
- Never: "Sign up", "Create account", "Get started", "Join now", "Try for free" — rewrite all of these

### Placeholder copy rules

Placeholder copy in form fields is a trust signal and a micro-UX element. Rules:

- **What's OK:** Placeholder that sets expectation: `your@email.com` for an email field. Short, specific, realistic.
- **What's not OK:** Placeholder that tries to do copy's job: `Enter your email to join the ABLE community` — too long, too try-hard, vanishes on focus.
- **What's never OK:** Generic placeholder text left from a template: `Enter text here`, `placeholder text`, etc. These are visible evidence that the product is unfinished.
- Placeholders are not labels. If the user needs to know what to type after they've started typing, use a label, not a placeholder.

### Iteration rules

Write the first draft. Then rewrite at least twice. Three rewrites is the minimum. Not because the first draft is always wrong — sometimes it's right — but because a third pass almost always finds a word or phrase that wasn't earned the first time.

Lock copy only after the third pass. "Locked" means: nothing changes during implementation. If a developer or AI agent wants to change copy during implementation, the copy must be changed in COPY.md first, then propagated to the HTML.

**Output:** `COPY.md` — every word on the page, in hierarchy order (section by section, field by field), annotated with placement and context. No design or code until this document exists.

---

## STAGE 6 — PATH TO 10 + DESIGN SPEC
**Two documents. The first explains exactly how to get every angle to 10. The second gives a developer everything needed to build without a single question.**

---

### Part A: Path to 10

Return to the 20-angle analysis from Stage 3. For every angle below 10:

1. What exactly makes it a 10? (Be specific — not "better copy" but "the headline must name the exact fear an artist has about Linktree: that their fans belong to the platform, not to them")
2. What specific design decisions, copy changes, or technical implementations get it there?
3. What is the honest ceiling — and why? (If an angle cannot reach 10 at current build stage, document the ceiling and the reason)

#### Path to 10 format

```
## Angle [N] — [Name]
**Current score:** [N]
**Target:** 10 (or named ceiling)
**Gap:** [what exactly is preventing 10]

**Path:**
1. [Specific change 1]
2. [Specific change 2]
...

**Honest ceiling:** [If applicable — what prevents 10 at this stage and why]
**Ceiling can be lifted by:** [What would need to change — real users, backend, etc.]
```

#### Build-dependent vs strategy-dependent paths

Some angles require product changes to reach 10. Others require only design or copy changes. Know the difference:

- **Design-dependent:** Angles 1, 3, 4, 7, 11 — can reach 10 through design and copy alone
- **Strategy-dependent:** Angle 9 (Social proof) — requires real users with real outcomes
- **Build-dependent:** Angle 8 (Performance) — requires specific technical implementation
- **Context-dependent:** Angle 6 (Differentiator) — requires knowing what competitors do well (research-dependent)

**Output:** `PATH-TO-10.md` — every angle addressed. Honest about ceilings. Build order implied by dependencies.

---

### Part B: Design Spec

With purpose clear, research done, angles scored, journeys mapped, copy written, and paths to 10 defined — now spec the design.

The design spec is a contract. It is the document that a developer (human or AI) builds from, without asking a single question. If the spec is ambiguous, the build will be ambiguous. If the spec has gaps, the developer will fill them with guesses. Gaps in specs become bugs in builds.

**The developer test:** After writing the spec, ask: "Could a developer who has never seen ABLE, never spoken to me, and knows only standard HTML/CSS/JS, build this page from this document?" If the answer is no — the spec has gaps. Find them and fill them.

#### Design spec template — complete field list

For every section and every component, document the following:

---

**Section metadata:**
- Section name and ID (exact `id=""` value used in HTML)
- Purpose (one sentence — from the journey map)
- Visibility rule: always visible / visible only in fan view / visible only to owner / conditional on profile data

**Layout:**
- Container: max-width, centering method (margin auto / flexbox / grid)
- Desktop layout: grid columns, flex direction, gap values
- Mobile layout (375px): how layout changes, column count, stacking order
- Padding: top/bottom/left/right — desktop and mobile separately
- Any `position: sticky/fixed/absolute` elements: specified with z-index and trigger condition

**Typography — for every text element:**
- Element type (h1, h2, p, span, label, etc.)
- Font family (token reference: `--font`, `--font-display`)
- Font size: desktop (px) and mobile (px)
- Font weight (numeric: 400, 500, 600, 700)
- Line-height (unitless ratio)
- Letter-spacing (if non-default — specify in `em`)
- Colour (token reference: `--color-text`, `--color-muted`, `--color-accent` etc.)
- Text transform (if applicable)
- Max-width (for readability — long lines need constraining)
- Margin: top and bottom from adjacent elements

**Colour — for every surface:**
- Background: token reference
- Border: token reference + width + style + radius
- State colours: hover (token ref), active/pressed (token ref), disabled (token ref)
- Accent usage: where the artist-set accent is applied and what property

**Animation spec — for every animated element:**
- Trigger: what causes this animation (page load / scroll-into-view / user click / state change)
- What moves: exactly which CSS properties (opacity, transform, filter — never width/height/colour)
- Initial state: exact values
- Final state: exact values
- Duration: milliseconds
- Easing: token reference OR exact cubic-bezier values
- Delay: if staggered — the stagger increment and maximum total delay
- `prefers-reduced-motion` fallback: always specified. Usually: no movement, instant state change.
- Browser support check: note any animation using newer CSS features (@starting-style, View Transitions) with the `@supports` guard requirement

**Interactive states — for every interactive element:**
- Default: full spec
- Hover (desktop only): what changes, transition duration
- Active/pressed: what changes, duration (usually 150ms max for responsiveness)
- Disabled: appearance, pointer-events behaviour, aria-disabled
- Focus: visible focus ring spec (WCAG 2.2 AA minimum — 3px outline, 2px offset)
- Loading (where applicable): skeleton state or spinner — specify exactly
- Error (where applicable): error state appearance, message placement, timing
- Empty (where applicable): empty state appearance and copy (from COPY.md)

**Interaction spec — what happens when:**
- User taps/clicks this element: what changes immediately, what changes after a delay
- Any state saved to localStorage: key name, value format, when written
- Any DOM change: what gets added/removed/changed
- Any side effects: e.g., "saving profile also triggers syncProfile() — debounced 300ms"

**Accessibility spec:**
- `aria-label` values (for icon-only buttons)
- `aria-live` regions (for dynamic content: error messages, counts, confirmations)
- `role` attributes (for non-semantic elements used as interactive components)
- Keyboard interactions: tab order, enter/space behaviour, arrow key navigation (for grids/lists)
- Focus management: where focus goes after an action (e.g., "after modal closes, focus returns to trigger")

---

#### Specifying animations in detail

Animations are the most under-specified part of most design systems. Vague animation specs ("fade in smoothly") produce arbitrary implementations. Use this format:

```
Animation: [name]
Trigger: [exact trigger]
Target: [CSS selector]
Properties:
  opacity: 0 → 1
  transform: translateY(8px) → translateY(0)
Duration: 240ms
Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)  /* --ease-decel token */
Delay: [base delay] + [stagger increment × index] (max: [max total delay])
prefers-reduced-motion: opacity change only (no transform), same duration
Browser support: @starting-style — Chrome 117+, Safari 17.5+, Firefox 129+.
  Guard with: @supports (selector(:has(*))) { [animation block] }
```

#### Token-first rule

Never specify a loose hex code in the design spec. Every colour is a token reference. This is not a style preference — it is a functional requirement. If a hex code appears in the spec, it will appear as a hardcoded value in the HTML. Hardcoded values break themes.

Exception: when defining the token itself. `:root { --color-bg: #0d0e1a }` — this is correct. Using `#0d0e1a` anywhere outside a `:root` block is not.

#### Handling spec gaps

If a section of the spec is genuinely unclear — document the gap explicitly:

```
⚠️ SPEC GAP: The hover state for the platform pill is not defined.
Options: (a) slight lighten of pill background; (b) accent colour underline; (c) scale(1.03)
Decision needed before build: [person responsible]
```

A documented gap is better than an undocumented assumption. The developer filling an undocumented gap might make the wrong choice. A documented gap requires a decision.

**Output:** `DESIGN-SPEC.md` — a developer can build the entire page from this document without asking a single question. Every section. Every component. Every state. Every animation.

---

## STAGE 7 — STRATEGY REVIEW + FINAL 20-ANGLE
**Synthesise everything. Check the research against the spec. Run the final pass. Establish the pre-build authority document.**

This stage is the transition from strategy to build. Everything before this stage is thinking. Everything after is doing. Stage 7 is the quality gate between them.

It answers one question: *"Is there anything left on the table?"*

If the answer is yes — find it and address it before building. Once build starts, strategy changes cost 10x as much to implement.

---

### Part A: Strategy Review

The synthesis checklist. Work through these in order:

**1. Research-vs-spec gap check**

Pull out the competitive research findings from Stage 2. For each finding:
- Is it addressed in the design spec?
- If yes: where? (reference the spec section)
- If no: should it be? If yes, update the spec. If no, document why not.

A finding that is not addressed and not explained is a gap. Find all gaps before proceeding.

**2. Journey-map-to-spec coherence check**

Pull out the "what the page must do" table from each journey map. For each row:
- Is there a specific design or copy element in the spec that does this?
- If yes: note it.
- If no: add it. The journey map says it must be there. The spec must include it.

**3. Honest ceiling review**

For every angle that has a ceiling below 10:
- Is the ceiling genuinely honest? Or was it set conservatively and can be challenged?
- Is the ceiling truly blocked, or is it blocked by a specific implementation decision that could be changed?
- If the ceiling is genuinely real (e.g., social proof requires real users): document it and move on. Do not spend time on ceilings you cannot lift at this stage.

**4. The "ceiling examination" process**

For each angle not at 10, ask: *"What would make this a 10? And can we do that thing?"*

This is a challenge pass — the goal is to find any angle where the ceiling was set too low. Sometimes a ceiling that seemed like a product limitation is actually a copy or design limitation in disguise.

Example: "Social proof cannot be 10 without real users" — but can you get to 9.5 by naming the early community honestly and making it feel significant rather than small? Sometimes the ceiling is at 8.5, not 7. Push until you find the real ceiling.

**5. Strategic risk identification**

What is the single biggest thing that could undermine this page's effectiveness?

Common strategic risks:
- Domain reputation: has the ABLE domain been flagged by any major platform's spam filter?
- Competitive move: has a competitor just shipped something that addresses the main differentiator in our copy?
- Trust gap: is there a promise on the page that the current product cannot deliver?
- Legal risk: does any claim on the page require specific compliance (pricing, free tier terms, data handling)?

Strategic risks that are fixable as copy edits → fix immediately.
Strategic risks that require product changes → log in the roadmap and add a guardrail to the page copy.
Strategic risks that are genuinely unresolvable → document them honestly. Do not pretend they don't exist.

**Output:** `STRATEGY-REVIEW-FINAL.md` — final synthesis, research-vs-spec gap check completed, journey-to-spec coherence confirmed, honest ceilings documented, strategic risks listed with guardrails.

---

### Part B: Final 20-Angle Review

Re-score all 20 angles with every stage incorporated. This is Pass 3 at minimum. Show the full scorecard.

For each angle, record:
- New score
- What changed since the first-pass score (what work was done to get here)
- If not 10: exactly what makes it a 10, and what specifically is blocking it

**The FINAL-20-ANGLE-REVIEW-2 protocol (mandatory):**

After completing the Final 20-Angle Review (Pass 3), always produce a FINAL-20-ANGLE-REVIEW-2 document. This is Passes 4 and 5.

Pass 4: Challenge every ceiling from Pass 3. Ask: "What did we miss? What would a world-class competitor do here that we haven't specced?"

Run a dedicated research pass targeting the specific angles that didn't reach 10 in Pass 3. For each ceiling angle:
- Search for world-class examples of how this specific problem is solved
- Check if the competitive research surfaced anything that now looks relevant
- Ask: "Is there a design solution we haven't considered?"

Pass 5: After implementing improvements from Pass 4, re-score. If Pass 5 overall is the same as Pass 3, write exactly why — that is valuable data. The point is not to get higher scores — it is to be certain there is nothing left on the table.

**What qualifies as a strategic risk vs a design preference:**

Strategic risk: something that, if unaddressed, could make the page fail its primary job. (Missing trust signal, broken flow, inaccurate claim)

Design preference: something that would make the page better but whose absence does not cause failure. (Typography refinement, colour balance, animation timing)

Only strategic risks block shipping. Design preferences go in the roadmap.

**The final quality gate:**

Before signing off Stage 7 and beginning Stage 8, answer these four questions honestly:

1. Has every research finding been addressed or explicitly dismissed?
2. Has every journey map fear been addressed in the spec?
3. Have all P0 angles reached at least 8/10?
4. Has Pass 5 been completed and its results recorded?

All four must be "yes." If any is "no" — address the gap before starting the build.

**Output:** `FINAL-20-ANGLE-REVIEW.md` (Pass 3) and `FINAL-20-ANGLE-REVIEW-2.md` (Passes 4 + 5). Together, these form the definitive pre-build authority document.

---

## STAGE 8 — BUILD + PLAYWRIGHT VERIFY

This is not just a coding stage. It is a verification stage. The build earns the spec scores.

---

### 8.0 Pre-build orientation (every session, before first line of code)

**Load ALL authority documents for the page being built:**

| Document | What to extract |
|---|---|
| `FINAL-20-ANGLE-REVIEW-2.md` | Target scores for every angle. Build earns these — do not assume them. |
| `DESIGN-SPEC.md` | Every px, every colour token, every animation spec. Build from this exactly. No improvising. |
| `COPY.md` | Every word locked. Do not change copy in HTML. If copy needs changing, update COPY.md first. |
| `PATH-TO-10.md` | Build order. Follow the sequence — it reflects dependency chains. |
| `USER-JOURNEYS.md` | Who is using this. Test against Declan (Spotify import), Sofia (Linktree), Amir (scratch) at each milestone. |
| `STRATEGY-REVIEW-FINAL.md` | The "why" behind each decision. If a spec decision seems wrong during build, check here before changing it. |

**Write this sentence before coding:** *"This page is for [user], who fears [fear], and the P0 thing that must work is [P0]."* If you cannot write it, re-read the docs.

---

### 8.1 Pre-build research check

Before each major section, spend 5–10 minutes on targeted research:

```
web search: "[section name] UX best practice 2025 2026"
web search: "[competitor] how does [feature] work"
```

Specific checks per section type:
- **Import flows:** Search for how Spotify/Linktree API failures are handled in production. Find real error rate data.
- **Live preview:** Search for CSS variable update performance. Test if 0ms debounce is actually perceptible.
- **Mobile keyboard:** Always test `visualViewport` API before assuming it works on the target iOS version.
- **Animations:** Check `@starting-style` browser support table before using. Use `@supports` guard if needed.
- **Accessibility:** Run axe-core scan after every interactive component is built.

---

### 8.2 Build order

Follow the build order in `PATH-TO-10.md` exactly. For onboarding specifically:

1. HTML scaffold + CSS design tokens + font loading
2. Screen 0 (Hook + import input + import Netlify function integration)
3. Live preview panel (desktop layout first, then mobile pill/sheet)
4. Screens 1–4 (Name, Vibe, Colour, Theme) — the core OQPS flow
5. Screens 5–7 (Links, Fan CTA, Moment) — the choices
6. Screen 8 (Done — labor illusion → celebration sequence)
7. Step transitions (`@starting-style`, View Transitions API, stagger)
8. Error and fallback states for all import paths
9. Mobile polish (keyboard handling, touch targets, overscroll)
10. Accessibility audit (axe-core + manual keyboard nav + focus management)
11. Animation polish (`prefers-reduced-motion`, spring easing, done screen beats)
12. End-to-end smoke test (full flow → able-v7.html renders correctly)

**Do not skip steps. Do not batch them.** Each step is a commit.

---

### 8.3 After each section: score check

After each section in the build order is complete:

1. Take Playwright screenshots at 375px, 390px, 768px, 1280px
2. Look at each screenshot against the relevant DESIGN-SPEC section
3. Score the relevant angles against target (from FINAL-20-ANGLE-REVIEW-2.md)
4. If any angle is below target: fix before proceeding
5. Commit with descriptive message

**Show the current scorecard after each major section.** Keep a running tally. Never hide scores.

---

### 8.4 Playwright verification checklist (run after EVERY significant section)

**Visual:**
- [ ] Screenshot at 375px (iPhone SE) — no horizontal scroll
- [ ] Screenshot at 390px (iPhone 14 Pro) — matches mobile spec
- [ ] Screenshot at 768px (iPad) — two-column or single-column correctly
- [ ] Screenshot at 1280px (laptop) — matches desktop spec
- [ ] Vibe card grid: exactly 2 columns at 375px, 3 columns at 768px+
- [ ] Preview panel: hidden on mobile, floating pill visible from Step 2
- [ ] Done screen: centered single column, accent gradient visible

**Interaction:**
- [ ] All tap targets ≥ 48px — measure with Playwright `getBoundingClientRect()`
- [ ] Import input: focus state shows accent border, spinner visible during import
- [ ] Import success: green confirmation state visible, auto-advance fires
- [ ] Import failure: amber state visible, fallback path functional
- [ ] Vibe card selection: spring animation plays, selected state visible
- [ ] Colour swatch: preview updates in 0 frames (CSS variable change)
- [ ] Back navigation: correct directional transition, state preserved
- [ ] Screen 8 CTA: "See your live page →" opens able-v7.html with correct data

**Mobile-specific:**
- [ ] Virtual keyboard does not hide Continue button (iOS Safari + Chrome Android)
- [ ] `overscroll-behavior: contain` prevents iOS bounce
- [ ] `touch-action: manipulation` removes tap delay on all cards/buttons
- [ ] Preview pill appears at Step 2, opens bottom sheet correctly
- [ ] Bottom sheet: 92vh height, drag handle visible, closes on backdrop tap

**Performance:**
- [ ] Lighthouse mobile: LCP ≤ 2.5s, Performance ≥ 85, no CLS
- [ ] Fonts: DM Sans + Barlow Condensed loaded via preload (no FOUT)
- [ ] Service worker registers on first load
- [ ] Step 2 assets preloaded after first Step 1 input interaction
- [ ] Import API calls: timeout ≤ 8s, fallback state appears on timeout

**Accessibility:**
- [ ] axe-core: zero critical violations
- [ ] Keyboard: tab order is logical across all 8 screens
- [ ] Vibe grid: arrow keys navigate between cards (native radio)
- [ ] Focus moves to screen headline on each step transition
- [ ] `aria-live="assertive"` on error messages — test with VoiceOver

**Animation:**
- [ ] `@starting-style` entrance plays on screen entry (Chrome + Safari + Firefox)
- [ ] Content stagger: heading → subtitle → cards in sequence
- [ ] Card selection: `scale(0.97)` press response visible
- [ ] Done screen: building sequence (3 steps), pulse ring (one loop), headline spring
- [ ] All animations disabled correctly under `prefers-reduced-motion: reduce`

**Data:**
- [ ] `able_wizard_draft` written to localStorage after each screen advance
- [ ] `able_v3_profile` written on Screen 7 submit
- [ ] `able_wizard_draft` deleted after Screen 7 submit
- [ ] Session recovery: close mid-wizard, return, sees "Picking up where you left off."
- [ ] `able_wizard_draft` older than 24 hours is ignored (clean start)

**End-to-end flow:**
- [ ] Full journey (Spotify import path): Screen 0 → Screen 8 in one session
- [ ] Full journey (Linktree import path): `?import=linktree` → Screen 8
- [ ] Full journey (scratch): type name → Screen 8
- [ ] After Screen 8: "See your live page →" → able-v7.html shows correct profile
- [ ] Profile renders with correct name, accent colour, theme, CTA text

**Commit after each section is verified.** Do not batch commits.

---

### 8.5 Two-pass review per section

When a section passes the Playwright checklist:

**Pass 1 — Spec fidelity:** Does it match DESIGN-SPEC.md exactly?
- Every pixel value
- Every colour token (no loose hex codes)
- Every copy string (matches COPY.md exactly)
- Every animation timing

**Pass 2 — User perspective:** Would the target user be impressed or confused?
- Put yourself in Declan's position (26, Manchester, slight sceptic)
- Look at the 390px screenshot only
- Is there anything that looks like a form? Fix it.
- Is there anything that looks generic SaaS? Fix it.

Both passes must pass. Neither is optional.

---

### 8.6 Final build score

After all sections are built and verified, run the full 20-angle analysis against the **live built page** — not the spec. Open the page in Playwright. Screenshot all viewports. Score every angle honestly.

Show the full scorecard:

| Angle | Spec target | Built score | Gap | Action |
|---|---|---|---|---|

If any angle is below spec target: fix it. Do not ship below spec.

If any angle exceeded spec: note it. Update FINAL-20-ANGLE-REVIEW-2.md.

---

### 8.7 AI user story check (before any PR or release)

Before calling a build complete, run every AI-native user story:

> "An AI agent wants to update my artist profile. Can it do everything a human can do through the UI?"

Specifically for onboarding:
- Can an AI agent drive the wizard programmatically? (headless Playwright)
- Are all interactive elements accessible by ID/data attribute?
- Can the import be triggered via a direct API call rather than UI?
- Is the localStorage profile schema documented for programmatic reads?

If the answer to any is "no": add the programmatic interface before calling it done. ABLE must be agent-native from the start.

---

### 8.8 — Continuous Improvement Loop

**This loop never ends. It runs during every build session and beyond. It is not an addendum to the build — it is the build.**

The mechanical steps of 8.0–8.7 produce a page that matches its spec. The continuous improvement loop produces a page that exceeds its spec. These are not the same thing. The spec was written before building. Building reveals things the spec did not anticipate. The improvement loop is how you capture those revelations and act on them.

#### When to trigger the loop

The continuous improvement loop is triggered:

1. **After each verified section** — once a section passes its Playwright checks (8.4) and two-pass review (8.5), before committing: pause and scan. Do not batch this pause. Do it every section.

2. **When intuition fires** — any time during build when something feels wrong, even if Playwright shows a pass. If a section looks technically correct but feels off, the improvement loop runs immediately.

3. **At the midpoint of any page** — after building approximately half the sections, stop and run a full scan of all strategy docs simultaneously. Not to second-guess the spec — to find anything the spec missed that has now become visible.

4. **When research surfaces something new** — if a web search during build (Stage 8.1 pre-build research) returns something that changes the picture, the improvement loop evaluates it before proceeding.

#### What to scan

When the loop triggers, scan these documents in this order:

1. **`FINAL-20-ANGLE-REVIEW-2.md`** — look at the "what would make this an 11" notes. Can any of them be implemented in the current build session without scope creep?

2. **`PATH-TO-10.md`** — are there improvements listed there that aren't yet in the build? Could any of them be implemented now, before the section is committed?

3. **`DESIGN-SPEC.md`** — are there any sections marked "spec complete" with notes like "further thought needed"? Do those notes now have answers, having seen the built sections around them?

4. **`docs/systems/MICRO_INTERACTIONS_SPEC.md`** — does the current section have any interactions that are in the system spec but not in the page spec? The system spec was written at a higher level of abstraction — some interactions may apply here but weren't carried through to the page spec.

5. **`docs/systems/copy/SPEC.md`** — read the ABLE copy voice section with fresh eyes after spending time building. Does the current section's copy feel completely in register? Or has build fatigue produced something slightly flatter?

6. **`USER-JOURNEYS.md`** — open the journey map for the primary user. Go to the step in the journey that corresponds to the section just built. Is what was built exactly what the journey map said the user needs at that moment?

#### How to decide: implement now vs backlog

Every potential enhancement gets evaluated against three criteria:

**Scope:** Is this a change to the current section only, or does it affect other sections, other pages, or shared systems?
- Current section only → eligible for immediate implementation
- Multiple sections on this page → eligible if it can be done without blocking current progress
- Other pages or shared systems → never implement during a single-page build session. Document and defer.

**Confidence:** Is this clearly better than the spec, or just different?
- Clearly better (addresses a specific user fear, improves a specific 20-angle score) → implement
- Different but not clearly better → defer to the roadmap
- Better but risky (might break something else) → document the risk, implement with extra Playwright verification

**Time:** Will implementing this now slow down the build significantly?
- Under 20 minutes → implement immediately if scope and confidence pass
- 20–60 minutes → implement now only if it affects a P0 angle
- Over 60 minutes → defer unless it addresses a P0 failure

#### Quick spec for an enhancement

Before implementing any significant enhancement (anything that takes more than 20 minutes), write a mini-spec in `ENHANCEMENT-LOG.md`:

```
## [Date] — [Section] — [Enhancement title]
**What:** [one sentence — what exactly changes]
**Why it's better:** [which 20-angle it improves, and by how much]
**Scope:** current section / multiple sections / cross-page
**Time estimate:** [minutes]
**Risk:** [what could go wrong if this is wrong]
**Status:** proposed → approved → in-progress → implemented → deferred
```

The "why it's better" field is the most important. If you cannot name which angle improves and by how much — the enhancement is a design preference, not an improvement. Design preferences go to the roadmap.

#### Which docs always need updating after an enhancement

After any significant enhancement is implemented and verified:

1. **`DESIGN-SPEC.md`** — mark the affected section as "implemented (enhanced)" with a note of what changed. Never leave DESIGN-SPEC.md behind the built state.

2. **`ENHANCEMENT-LOG.md`** — mark the entry as "implemented" with the commit SHA.

3. **`FINAL-20-ANGLE-REVIEW-2.md`** — if the enhancement improved a specific angle score, update the score and note what changed to achieve it.

4. **`docs/STATUS.md`** — add the enhancement to the "last session summary" section.

5. **System specs** (`docs/systems/`) — if the enhancement touches a shared pattern (animation easing, copy register, interaction design), update the relevant system spec so future pages can benefit from it.

If any of these docs is not updated after an enhancement, the next build session starts with stale information. That compounding staleness is how "we have great docs" becomes "nobody reads the docs."

#### The "never ship below spec" gate

After implementing an enhancement, the full Playwright verification (8.4) runs again for the affected sections. Not just the new elements — the whole section. Enhancements can introduce regressions in adjacent elements.

If the enhanced section now scores lower on any Playwright check than it did before the enhancement — the enhancement is reverted and re-specced. An improvement that breaks something is not an improvement.

#### Handling inspiration that contradicts the current spec direction

Sometimes during build, a scan of the docs or a piece of research produces an insight that seems to contradict the current spec direction entirely. This is not a reason to panic. It is a reason to be systematic.

**If the contradiction is a minor design question** (e.g., "maybe the CTA should be amber instead of accent") — note it in ENHANCEMENT-LOG.md as a P2 design preference. Continue building. Evaluate after the section is complete.

**If the contradiction is a significant structural question** (e.g., "the journey map says the user needs a preview here, but the spec doesn't have one") — stop. Re-read the relevant journey map section and the relevant spec section. If the contradiction is real: update the spec before continuing. A spec built on a wrong assumption produces a page built on a wrong assumption.

**If the contradiction challenges the primary job** (e.g., "research suggests the primary user type is actually different from what Stage 1 established") — this is a Stage 1 failure. Stop. Update Stage 1. Update Stage 3. Update Stage 4. Update Stage 5. Update Stage 6. Only then continue Stage 8. This sounds extreme. It is. But building on a wrong primary job produces a wrong product, regardless of how well the build is executed.

#### The loop never ends

The continuous improvement loop does not stop when the build is complete. After Stage 8, it continues in Stage 9 (post-page final review). After Stage 9, it continues in the next build session on the same page. After the page ships, it continues as real user data comes in.

The loop is not a process stage. It is a disposition. The question "is there anything better here that we haven't done yet?" has no end state. The answer is always "maybe." The work is to keep asking.

---

## STAGE 8 — BUILD PHILOSOPHY ADDENDUM
**What the mechanical checklist (8.0–8.8) does not cover.**

The sections above define *what* to verify. These sections define *how to think* during the build. They are not optional. They are the difference between shipping a correct page and shipping a great one.

---

### 8a — Pre-build setup (every session before first line of code)

Before writing a single line of code, complete the following in order:

1. **Read `docs/BUILD-READY-INDEX.md`** — this file (when it exists) contains the build order, known pre-existing bugs, and any deferred decisions from the strategy phase. Read it completely. If it doesn't exist yet, create it before proceeding.
2. **Read `docs/PRE-BUILD-CHECKLIST.md`** — confirm the environment is correct: Playwright installed, Chromium available, target file is the right one, no uncommitted changes on top of a previous build session.
3. **Confirm branch:** `git status` — you should be on `build/[page-name]` branched from main. If not, create it: `git checkout -b build/[page-name]`.
4. **Confirm Playwright works:** Run `npx playwright install chromium` (idempotent — safe to run again). Take a test screenshot of the current file to confirm the environment is live before touching any code.
5. **Parse-check the current file before editing:** `node -e "require('fs').readFileSync('able-v7.html','utf8')"` — confirms the file is readable. Optionally extract the `<script>` block and run `node -e "new Function(src)"` to confirm the existing JS is already parse-safe before any changes.
6. **Write the orientation sentence:** *"This page is for [user], who fears [fear], and the P0 thing that must work is [P0]."* This must be possible to write without re-reading docs. If it isn't, re-read docs. Do not proceed until this sentence is written.

**Time budget: 15 minutes.** Do not skip this setup. A broken environment wastes more time than the setup saves.

---

### 8b — The build loop (repeat for every section)

Every section of every page follows this loop. Not some sections. Every section.

**1. Read the spec completely.**
Open `DESIGN-SPEC.md` and read the section for this component from top to bottom before writing any code. Do not skim. If the spec says "16px gap between items at mobile", that is what gets built. No improvisation at this stage.

**2. Write the code.**
Implement exactly to spec. Resist the temptation to improve during this step — that comes in step 6. The goal here is faithful translation, not interpretation.

**3. Parse-check every JS block touched.**
For any JavaScript modified: `node -e "new Function(jsBlock)"`. A parse error caught here takes 10 seconds to fix. A parse error caught in production breaks every artist's profile. Run this every time without exception.

**4. Playwright verify.**
Take screenshots at 375px and 1280px. Rename the document title before taking the screenshot so the tab is identifiable later:
```js
document.title = 'ABLE v7 — [section name] — mobile 375'
```
Use the Playwright MCP tools: `mcp__playwright__browser_navigate`, `mcp__playwright__browser_resize`, `mcp__playwright__browser_take_screenshot`.

**5. Compare to spec.**
Place the screenshot mentally against the relevant DESIGN-SPEC section. Check every element:
- Spacing correct?
- Colour tokens correct (no loose hex)?
- Typography matches spec (size, weight, line-height)?
- Animation timing correct?
- Copy matches COPY.md exactly?

If anything differs from spec: fix it before proceeding to step 6. The spec is the authority. Do not rationalise differences.

**6. Rethink.**
Now that you can see it built and verified — is the spec still right? This is the deliberate pause. Ask honestly:
- Does this feel like ABLE, or does it feel like something else?
- Is there anything that looks technically correct but feels off?
- Would an independent musician landing on this page feel respected, or processed?
- Is there a better solution that the spec didn't anticipate because specs are written before building?

If the answer to any of these is "this could be better", note it. Do not implement yet — go to Stage 8.8 (continuous improvement loop). If the spec is correct and the build is faithful: proceed to step 7.

**7. Commit.**
`git commit -m "feat([page]): [section] — exact description of what was built"`

One section = one commit. Do not batch sections into a single commit. The commit history is the build log.

---

### 8c — The enhancement loop (continuous during build)

*This is the inline version of Stage 8.8 — applied at the section level during build.*

When you find an enhancement worth implementing:

1. **Write it in `ENHANCEMENT-LOG.md`** (create in `docs/pages/[page-name]/` if it doesn't exist). Entry format:
   ```
   ## [Date] — [Section] — [Enhancement title]
   **What:** [one sentence description]
   **Why:** [why this is better than the spec]
   **Impact:** minor tweak / significant change / cross-page change
   **Status:** discovered / in-progress / implemented / deferred
   ```

2. **If it's a minor tweak** (copy refinement, spacing adjustment, colour token swap): implement immediately. Update DESIGN-SPEC.md to mark the change. Commit as `fix([page]): [description]`.

3. **If it's a significant change** (new interaction, layout rethink, new section): stop. Write a 2-paragraph mini-spec in ENHANCEMENT-LOG.md. Answer: (a) what exactly is the enhancement, and (b) why is this genuinely better, not just different? If the answer to (b) is clear: implement it. If it's not clear, defer and continue.

4. **If it's a cross-page change** (affects design system, multiple pages, or shared components): document it in the relevant system spec (`docs/systems/`) and log a note in STATUS.md. Do not implement cross-page changes during a single-page build session — they get their own session.

---

### 8d — Playwright verification protocol

Playwright verification is not a step that happens once at the end. It runs after every significant section during the build. It is as much part of the build process as writing the code.

**What to verify — the minimum set per section:**

| Check | How | Pass criteria |
|---|---|---|
| Mobile layout (375px) | `browser_resize({width:375})` → screenshot | No horizontal scroll. No clipped elements. All text readable. |
| Desktop layout (1280px) | `browser_resize({width:1280})` → screenshot | Layout matches spec. No excess whitespace. |
| Tap targets | `browser_evaluate({script: 'Array.from(document.querySelectorAll("button,a,[role=button]")).map(el=>{const r=el.getBoundingClientRect();return{tag:el.tagName,w:r.width,h:r.height,text:el.textContent.trim().slice(0,20)}})'})` | Every interactive element: min 44px in both dimensions. |
| Console errors | `browser_console_messages()` | Zero errors. Zero undefined references. |
| Theme: Dark | Apply dark theme via JS, screenshot | All surfaces use correct tokens. No hardcoded colours visible. |
| Theme: Light | Apply light theme, screenshot | Readable on cream background. No dark-only assumptions. |
| Theme: Glass | Apply glass theme (requires background image), screenshot | Backdrop-filter renders. No broken surfaces. |
| Theme: Contrast | Apply contrast theme, screenshot | Maximum legibility. Accent still visible. |
| Animation | Trigger the animation, screenshot (or use `browser_evaluate` to check computed styles) | Animation fires. Duration and easing match spec. |
| Reduced motion | `browser_evaluate({script: "document.documentElement.setAttribute('data-reduced-motion','true')"})` + screenshot | No movement. Static state is correct. |

**After every screenshot, rename the tab:**
```js
document.title = 'ABLE — [page] — [section] — [viewport] — [theme]'
// Example: 'ABLE — v7 — hero — 375px — dark'
```
This creates a consistent audit trail in the Playwright browser history.

**Failure protocol — no exceptions:**
If Playwright reveals something wrong:
1. Note exactly what is wrong, at which viewport, on which theme.
2. Fix the CSS or JS.
3. Re-run the exact same Playwright check.
4. Do not proceed to the next section until the current section passes all checks.

There is no "I'll fix it later." Defects compound. A layout bug at the hero section will cascade into everything built on top of it.

---

### 8e — The rethink trigger

This is the stage most agents skip. It is the most important one.

A build agent that only follows specs produces technically correct work. The rethink is what produces work that feels like it was made by someone who cares.

**Stop and rethink when any of these are true:**

- **"Technically correct but feels wrong."** Playwright shows something that passes every check but doesn't look right. Trust this feeling. It is data. Something is off. Find it.

- **"Copy sounds like copy."** Read the section's text aloud, as if you are Declan (26, Manchester, 2.4k Instagram followers, slight sceptic). Does it sound like something he'd read and think "yes, this is for me"? Or does it sound like something a marketing team wrote about him? If the latter: rewrite before shipping.

- **"The interaction is mechanical."** The button press works, the animation fires, the state updates — but there's no delight. No surprise. No moment where a user thinks "oh, that's nice." This is the hardest thing to spec but the easiest to feel. If an interaction feels like form-filling rather than music, it needs more.

- **"This could be any app."** A competitor could ship this exact section unchanged. If that is true, it is not ABLE. ABLE has opinions. Every section should have at least one moment that would not exist on Linktree or Beacons — something that says: we understand what music actually is.

**What happens when a rethink triggers:**
1. Stop. Do not commit what you have.
2. Open FINAL-20-ANGLE-REVIEW-2.md and re-read angle 20 (North star) and angle 14 (Emotional resonance).
3. Read the copy from COPY.md for this section aloud.
4. Look at the Playwright screenshot one more time.
5. Write down in one sentence what feels wrong.
6. Fix it. Then go back to 8b step 5 and verify the fix is actually an improvement, not just a change.

The rethink is not a delay. It is the build. The spec is the floor, not the ceiling.

---

### 8f — Coherence maintenance

After every completed page — before merging, before calling it done — run the full coherence check. This takes 30–45 minutes and is not optional.

**1. Cross-page coherence.**
Open the current page and the previous completed page side-by-side in Playwright. Do they feel like the same product? Check:
- Typography: same fonts, same scale relationships, same hierarchy pattern?
- Motion: same easing variables, same duration range, same spring physics?
- Voice: does the copy on this page sound like the same person who wrote the other pages?
- Colour: accent colour is different per artist (by design), but admin amber, system red, system green — are they consistent?

**2. Copy audit.**
Read every piece of user-facing text in the page against the banned phrases list in `docs/systems/copy/SPEC.md`. Any violation must be fixed before merge. Common regressions to check:
- "Get started" / "Sign up" appearing in CTAs
- Exclamation marks in dashboard or admin copy
- "Grow" / "unlock" / "superfans" / "content creator" appearing anywhere
- Generic placeholder copy that wasn't replaced with ABLE voice

**3. Token audit.**
Grep for hardcoded hex values anywhere outside `:root` or `@media (prefers-color-scheme)` blocks:
```bash
grep -n "#[0-9a-fA-F]\{3,6\}" [file].html | grep -v "^[0-9]*:.*:root\|^[0-9]*:.*--\|^[0-9]*:.*<!--"
```
Every hit that is not a CSS custom property definition or a comment is a regression. Fix it.

**4. Data audit.**
Scan every `localStorage.getItem()` and `localStorage.setItem()` call:
- Is the key name in the canonical list from CONTEXT.md? If not: it must be added to the canonical list before shipping.
- Does every `getItem` have a fallback? `localStorage.getItem('key') || defaultValue` — never a bare read.
- Does every `JSON.parse` have a `try/catch`? Malformed localStorage data from a previous session will break a real user's page without error handling.

**5. Theme audit.**
Switch through all four themes in Playwright and take a screenshot of every section on each theme:
- Dark: everything readable, no overflow, accent visible
- Light: cream background renders, text is dark enough, no dark-only assumptions
- Glass: backdrop-filter renders (Chrome + Safari), no broken backgrounds
- Contrast: pure black base, maximum legibility, accent still visible against black

If any theme breaks any section: fix before merge. Theme support is not progressive enhancement — it is a core feature.

**6. Doc update.**
At the end of the coherence check, update:
- `docs/STATUS.md` — mark sections as built, add any new known issues discovered
- `DESIGN-SPEC.md` — mark every built section as "implemented" with the commit SHA
- `ENHANCEMENT-LOG.md` — mark any implemented enhancements as complete
- The date at the top of STATUS.md

This is not optional housekeeping. It is how the next session starts with orientation rather than confusion.

---

## STAGE 9 — POST-PAGE FINAL REVIEW

After an entire page is built and the coherence check (8f) is complete, run the final review before any PR or merge.

This takes approximately 60–90 minutes. It is not a formality. It is a fresh-eyes pass that treats the live built page as the primary document, not the spec.

---

### 9.1 — Fresh 20-angle analysis on the live page

Open the page in Playwright. Take screenshots at 375px, 390px, 768px, and 1280px. Then run the full 20-angle analysis from scratch — not from the spec. Do not look at the spec scores. Score what you actually see.

| Angle | What to look for in the screenshots | Known ceiling |
|---|---|---|
| 1. First impression | What does a non-artist see in 3 seconds? | — |
| 2. Primary job | Does the page deliver its one job from Stage 1? | — |
| 3. Headline / entry copy | Read the first line aloud. Does it land? | — |
| 4. CTA design and weight | Is the primary action visible without scrolling at 375px? | — |
| 5. Copy voice | Read 10 random pieces of copy. ABLE voice or generic? | — |
| 6. Primary differentiator | Does this page make the ABLE vs Linktree argument without needing words? | — |
| 7. Mobile experience | 375px screenshot: any clipping, overflow, small tap targets? | — |
| 8. Performance | Check Lighthouse. LCP, CLS, Performance score. | — |
| 9. Social proof | Does any section earn belief? Or is it assertion? | Requires real users to hit 10 |
| 10. Trust signals | What makes an artist trust this page? Does it exist? | — |
| 11. Visual hierarchy | Can a scanner understand it without reading? | — |
| 12. End-to-end pathway | Does the flow through and beyond this page work? | — |
| 13. Conversion clarity | Is the outcome of taking action obvious? | — |
| 14. Emotional resonance | Does it make an independent musician feel understood? | — |
| 15. The 13-year-old test | Show screenshot to a hypothetical non-technical user. Confusing? | — |
| 16. Single memory | If they leave after this page, what sticks? | — |
| 17. Secondary user | Is any secondary user type served if they land here? | — |
| 18. Discoverability | Check OG tags in source. Are they populated dynamically? | — |
| 19. AI red team | What would break this page's effectiveness? Still valid? | — |
| 20. North star | Does this feel like ABLE, or like a tool? | — |

Show the full scorecard. Do not hide any angle. Compare scores to the spec target from FINAL-20-ANGLE-REVIEW-2.md.

**If any built score is below spec target:** it is a regression. Find the cause and fix it before the final review is complete.

**If any built score exceeds spec target:** note it. Update FINAL-20-ANGLE-REVIEW-2.md. This is valuable data for the next page.

---

### 9.2 — Copy calibration test

Run the copy through the calibration test from `docs/systems/copy/SPEC.md`. For every piece of user-facing text:

1. **The first-person test:** Read it as if you are the artist. Does it sound like you, or does it sound like someone describing you to an investor?
2. **The aloud test:** Read it out loud. Does it sound natural? Or does it sound like it was written?
3. **The banned phrase scan:** Does any line contain a banned phrase, a synonym of a banned phrase, or the spirit of a banned phrase even if the exact words are absent?
4. **The specific claim test:** Every trust line and empty state — is it a specific claim or a platitude? Platitudes must be replaced with specific claims before shipping.

Copy that fails any of these tests must be rewritten. Copy fixes are not minor — they are the difference between ABLE feeling like a product and feeling like a person.

---

### 9.3 — Playwright smoke test

Run the 15-minute manual checklist:

1. Full user flow from entry to completion (simulate the target user journey end-to-end)
2. All CTAs fire correctly (Playwright click + verify state change)
3. All four themes render correctly at 375px
4. localStorage is written and read correctly (check after each flow step)
5. No console errors at any point in the flow
6. Fan sign-up (if applicable): data written to `able_fans`, confirmation state renders
7. Profile state transitions (if applicable): cycle through all four states, verify each renders
8. Links: all external links open in new tab with `rel="noopener noreferrer"`
9. Keyboard nav: tab through all interactive elements, confirm logical order
10. Reduced motion: force `prefers-reduced-motion: reduce`, confirm no movement

If any check fails: it is a P0. Fix before shipping.

---

### 9.4 — AI agent compatibility check

Run the check from Stage 8.7 against the final build. Specifically:

- Can every interactive element be addressed by a CSS selector or data attribute?
- Is every localStorage schema documented in CONTEXT.md?
- Does the page work when loaded with a pre-seeded localStorage profile?
- Are there any actions that require mouse hover to reveal (invisible to agents)?

Any "no" answer is a defect. Add the programmatic interface before calling the page done.

---

### 9.5 — Post-build session summary

Write a summary and add it to STATUS.md under "Last session summary". The summary must include:

- What was built (bullet list of sections, in order)
- Final scores achieved (vs spec targets)
- Any enhancements added beyond spec (and why)
- Any known gaps or honest ceilings (with reasoning)
- Any deferred items (moved to roadmap or next session)
- The final commit SHA

Format:
```
## Last session summary (session [N]) — [page name]
Built: [list]
Final scores: [scorecard table or summary]
Enhancements: [list or "none"]
Known gaps: [list or "none — all spec targets met"]
Deferred: [list or "none"]
Final SHA: [sha]
```

---

### 9.6 — Final commit

```bash
git commit -m "feat([page]): complete build — [X.X/10] — [one-sentence description of what was built]"
```

The commit message must include the final score. This makes the build history searchable and honest.

Do not open a PR until all of 9.1–9.5 are complete and passing.

---

## THE BUILD RETHINK PROTOCOL

*A dedicated section on how to rethink during build. Every section. Every time.*

The spec is the contract you made with the problem before you fully understood it. The build is when you fully understand it. The rethink is what happens in between.

Building is not transcription. A builder who only transcribes the spec produces a technically faithful product that misses the thing the spec could not anticipate: how it actually feels to use.

### Questions to ask at every section

Before committing any section, answer these questions honestly:

**Does it feel like it was made for a musician?**
Not "does it serve a musician's functional need" — does it feel like it was made by someone who understands what music means to the person who makes it? This is a qualitative test. It cannot be reduced to a checklist item. But it can be felt. If you cannot feel it, ask: what would an independent artist feel when they look at this? If the answer is "I'm being processed" rather than "I'm understood" — fix it.

**Is there a moment of delight?**
Not every section needs delight. But if a section has zero delight — no moment where an artist thinks "that's smart" or "oh, that's nice" — it's probably doing exactly what it needs to do and nothing more. That's sufficient for infrastructure. It's insufficient for the parts of the product that face the artist directly.

**What would I cut?**
Every section that passes the first rethink should face a second question: what's the least important element here? If cutting it would make the section better (or leave it unchanged), cut it. Simpler is almost always better.

**Is the copy doing the work, or is the design?**
If a section depends on the design to communicate what the copy doesn't, the copy isn't strong enough. Conversely, if the copy has to explain what the design should make obvious, the design has failed. Each should do its own work.

**Could this be 10% better in 10 minutes?**
This question catches the "good enough" trap. Often the last 10% of a section's quality is right there — one copy edit, one spacing adjustment, one animation timing tweak. It just requires asking the question before committing.

### How to handle "this doesn't feel right"

When something doesn't feel right during build:

1. **Name the feeling.** Not "it feels wrong" — what specifically? "The headline is doing too much work" is a name. "The colour of this button doesn't feel like it belongs" is a name. Without a name, you can't fix it.

2. **Check if it's in the spec.** Is what's bothering you something the spec got wrong, or something the implementation missed? Look at DESIGN-SPEC.md for this section. If the spec shows the thing that bothers you: the spec may need updating. If the spec shows something different from what was built: the implementation needs fixing.

3. **Sleep on it (or Playwright it).** Sometimes what feels wrong during build looks fine on a screenshot — the feeling was implementation anxiety, not a real problem. Take the Playwright screenshot first. If it looks right in the screenshot, the feeling was noise. If it looks wrong in the screenshot, the feeling was signal.

4. **Ask: is this a rethink or a rabbit hole?** A rethink leads to a specific, improvable change. A rabbit hole leads to questioning every decision you've ever made and produces nothing. The difference: a rethink has a "fix" within reach. A rabbit hole is open-ended. If you're in a rabbit hole, note the feeling in ENHANCEMENT-LOG.md and come back to it at the next scheduled scan.

### When to deviate from spec vs when to update spec

**Deviate from spec when:**
- The spec has a clear error (wrong px value, wrong colour token, copy that contradicts COPY.md)
- A minor detail was underspecified and the obvious correct choice differs from the spec
- Playwright reveals that the spec produces a mobile layout that fails (e.g., elements overlap that the spec didn't anticipate)

In all these cases: fix the code AND update the spec. The spec must reflect the built state.

**Update spec before deviating when:**
- The change affects more than one section
- The change represents a different design philosophy (not a correction, but a new direction)
- The change involves copy (always update COPY.md before updating the HTML)

**Never deviate from spec when:**
- You simply prefer a different aesthetic — that is a design preference, not a correction
- You've seen something similar on another product and want to match it — that is copying, not improvement
- The spec feels too specific and you want more flexibility — specificity is the spec's value, not a bug

---

## THE 11/10 PUSH

*After every 10/10 build score, what to do next.*

A score of 10 is not the end. It is the beginning of the next question: *"What would make this an 11, if 11 existed?"*

This question is not rhetorical. It has real answers. And those answers become either the next design iteration or the next product roadmap item.

### How to find the 11

After reaching a 10 on any angle, run the 11 search:

**1. Check the honest ceiling.**
Is this actually a 10, or is it a "we can't do better with current constraints" score that was called 10 for convenience? There is a difference. A true 10 means: within the current technical and resource constraints, nothing better can be done here. A constrained 10 means: it could be better if [specific constraint] were lifted. Name the constraint. That naming is the 11.

**2. Ask what the best version of this looks like, without constraints.**
Not "what's practical" — what's the absolute best this could be? This is a thought experiment. It produces things that may be Phase 2 or Phase 3 features. But naming them now means they get built eventually. The 11 is always somewhere. Find it.

**3. Look at the best work in adjacent industries.**
The best onboarding in any software product. The best artist landing page anywhere. The best mobile form in any app. Not to copy — to calibrate. If the best version of this type of thing exists at a quality level that makes your 10 look like an 8, your 10 was not a 10. Go back and set the ceiling higher.

**4. Ask the user.**
Not a formal user test — a thought exercise. If Declan used this feature for 3 months, what would he still be frustrated by? What habit would he have to work around? What would he wish was different? Those answers are the 11.

### How to know you've genuinely reached the ceiling

The ceiling is genuine when:
- You've run the 11 search and found only things that require fundamentally different technology, many more real users, or resources that aren't available now
- You've looked at the best version of this type of thing in any adjacent industry and your version compares favourably
- You've had the "rethink" pause (Stage 8e) produce no new insights
- You've run multiple passes of the 20-angle analysis on the built page and scores have stabilised

Write down why the ceiling is where it is. "Social proof cannot exceed 8.5 at pre-launch because the specific claims that earn belief require real user outcomes, which don't yet exist" is a ceiling explanation. "We can't make this better" is not.

### The distinction between "good enough" and "genuinely excellent"

Good enough: the page works. Users can complete the primary job. The spec was implemented faithfully. There are no bugs. It meets the minimum quality bar.

Genuinely excellent: the page works, and it also has moments that make artists feel understood, interactions that feel alive, copy that sounds like it was written by someone who has actually played a show to 50 people and knows what that feels like.

Good enough ships products. Genuinely excellent builds loyal users.

The 11/10 push is not perfectionism. It is the difference between a product that works and a product that gets recommended. ABLE's growth model depends on the latter. Artists recommend ABLE because it understands them, not because it functions correctly.

---

## THE PLAYWRIGHT-FIRST PHILOSOPHY

*Visual verification is not optional. It is not a finishing step. It is part of building.*

### Why verification cannot be optional

Every assumption made during build is a potential defect. Assumptions about how CSS behaves on mobile. Assumptions about how a user will read a section. Assumptions about whether an animation plays smoothly on a specific iOS version. Every one of these assumptions is testable. Playwright tests them.

The cost of not testing: a real artist opens their profile on their iPhone SE at a gig venue and the text is clipped. A fan taps a CTA and nothing happens because the tap target was 36px. An animation janks on a mid-range Android phone. These failures happen in the real world, to real users, not in the development environment where everything works perfectly.

There is no version of ABLE being world-class that involves shipping unverified pages. The verification is not bureaucracy. It is respect for the user.

### How to make Playwright fast enough not to slow you down

Playwright is fast when used correctly. The fear that verification will slow down the build is usually based on the assumption that it runs once at the end, as a monolithic check. That assumption is wrong. Verification runs after every section. Small, targeted, fast.

**Fast Playwright pattern:**
1. Navigate to the file (once per session, not once per section)
2. Resize to 375px (one call)
3. Take screenshot (one call)
4. Look at screenshot (5 seconds)
5. Navigate to 1280px (one call)
6. Take screenshot (one call)
7. Look at screenshot (5 seconds)

Total time: under 2 minutes per section. That is not a slowdown. That is a quality gate.

**What slows Playwright down:**
- Running it for the first time in a session on a file that hasn't changed (unnecessary)
- Running the full 80-item checklist after every small change (overkill — save the full checklist for section completion)
- Waiting for Playwright to load external resources (always use local files where possible)

**Make it a habit, not a task.** The difference between Playwright as a habit and Playwright as a task: a habit is triggered automatically when a section is complete. A task is scheduled, dreaded, skimped on. Make verification part of the definition of "a section is complete." It is not done until it is verified.

### What to do when Playwright reveals something different from expected

This happens. Playwright is a mirror, not a validator. Sometimes the mirror shows something the spec didn't anticipate. The correct response to every Playwright surprise:

**1. Name exactly what is different.** Not "it looks wrong" — "the hero headline is wrapping at 375px but not at 390px, which means there is a hard-coded `min-width` somewhere that shouldn't be there."

**2. Check the spec.** Is this a spec failure (the spec was silent on this case) or an implementation failure (the spec addressed it and the implementation missed it)? The answer determines where the fix goes.

**3. Fix the root cause, not the symptom.** If a layout breaks at 375px because of a fixed width, the fix is not adding `max-width: 100%` to the symptom element — it is finding the element with the fixed width and removing the constraint.

**4. Verify the fix.** Re-run the exact Playwright check that revealed the problem. Confirm it passes. Then check that the fix didn't break anything adjacent.

**5. Update the spec if the spec was silent.** If Playwright revealed a case the spec didn't cover, add the spec entry. "No horizontal scroll at 375px" is now documented. Future builds don't have to discover this the same way.

---

## THE FILING STRUCTURE (one page, all docs)

For each page, create this folder structure:

```
docs/pages/[page-name]/
├── SPEC.md                      ← Stage 1 — purpose + vision
├── COMPETITIVE-RESEARCH.md      ← Stage 2 — findings in template format
├── 20-ANGLE-ANALYSIS.md         ← Stage 3 — first-pass scored analysis
├── USER-JOURNEYS.md             ← Stage 4 — journey maps
├── COPY.md                      ← Stage 5 — every word, locked
├── PATH-TO-10.md                ← Stage 6A — systematic path to 10
├── DESIGN-SPEC.md               ← Stage 6B — exact build spec
├── STRATEGY-REVIEW-FINAL.md    ← Stage 7A — final synthesis
├── FINAL-20-ANGLE-REVIEW.md    ← Stage 7B — definitive pre-build score (3 passes)
├── FINAL-20-ANGLE-REVIEW-2.md  ← Stage 7C — second final push (Pass 4 + 5)
└── ENHANCEMENT-LOG.md          ← Stage 8 — enhancements found during build
```

**Stage 7C is mandatory.** After FINAL-20-ANGLE-REVIEW.md is written, always produce FINAL-20-ANGLE-REVIEW-2.md. Challenge every ceiling from Stage 7B. Ask: "what did we miss? What would a world-class competitor do here that we haven't specced?" Run a dedicated research pass targeting the specific angles that didn't reach 10 in Stage 7B. Show Pass 4 and Pass 5 scores. If Pass 5 overall is the same as Pass 3, write exactly why — that is also valuable. The second final is about proving there is nothing left on the table.

---

## CURRENT STATUS BY PAGE

| Page | Stage 0 | Stage 1 | Stage 2 | Stage 3 | Stage 4 | Stage 5 | Stage 6 | Stage 7 | Stage 8 |
|---|---|---|---|---|---|---|---|---|---|
| **Landing** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| **Onboarding** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | — |
| **Artist Profile** | ✅ | — | — | — | — | — | — | — | — |
| **Admin** | ✅ | ✅ | — | — | — | — | — | — | — |
| **Fan** | ✅ | — | — | — | — | — | — | — | — |

**Next: Onboarding — Stage 4 through Stage 7.**

---

## RULES THAT CANNOT BE BROKEN

1. **Copy before design.** Never spec a layout before copy is written.
2. **20 angles before building.** Never write code on an unscored section.
3. **User journeys before copy.** Never write for a hypothetical user.
4. **Research before angles.** Never score based on assumptions.
5. **Playwright after building.** Never ship unverified.
6. **One page at a time.** Finish all stages on one page before starting another.
7. **Honest ceilings.** Never inflate a score. Social proof at 2 isn't 8 because you wrote it in the spec.
8. **Guardrails in the roadmap.** Any risk found in Stage 7 that isn't a copy fix goes into the product roadmap, not the landing page.
9. **Keep going until you surpass 10.** Do not stop at what seems like a ceiling. When a score feels like a 10, do at least one more pass and ask: "is there genuinely nothing left?" Sometimes what looks like a 10 has further to go. Keep pushing until every angle is challenged at least twice after the first 10 score is recorded.
10. **Multiple revision passes — keep going.** Minimum 3 passes after the first-pass scores. Show updated scores after every single pass. Never stop because the score looks high.
11. **A score of 10 is not the end.** After reaching 10, ask: "What would make this an 11 if 11 existed?" Those answers become the next design iteration or product roadmap item.
12. **Always show scores.** Every time scores are produced or updated, display the full scorecard table. Never hide scores.
13. **Always use every tool available.** Before scoring or reviewing any page/section, run web search, web fetch, and research agents to find: real user complaints, competitor patterns, world-class examples, conversion data. Assume there is always something online that will sharpen the thinking. Never score from assumptions alone.
14. **Research runs in background.** Dispatch research agents in parallel with document writing — never block progress waiting for research. Fold findings in at Stage 7.
15. **Always think product-wide.** Every page decision must be tested against: does this serve the ABLE brand? Does it serve this specific user type? Does it connect to the journey before and after this page? A technically perfect page that breaks product coherence is not a 10.
16. **Playwright is part of building, not after building.** Verification runs after every section, not once at the end. A section is not complete until it is verified.
17. **The rethink is mandatory.** Every section faces the rethink trigger (Stage 8e) before commit. "Technically correct" and "genuinely good" are not the same thing.
18. **The improvement loop never ends.** Stage 8.8 runs after every verified section and continues beyond build completion. The question "is there anything better here?" has no end state.
19. **Update all docs after every enhancement.** DESIGN-SPEC.md, ENHANCEMENT-LOG.md, FINAL-20-ANGLE-REVIEW-2.md, STATUS.md — all updated. Never leave docs behind the built state.
20. **The spec is the floor, not the ceiling.** Everything in the spec must be built. Everything not in the spec that would make the page genuinely better should be sought through the improvement loop and built if it passes the scope/confidence/time test.
