# ABLE — Daily Actions
**Created: 2026-03-16 | Update this file when your routine changes**
**Open this first. Every morning.**

> This is your daily operating system. It is designed for someone who has a full-time job and is building ABLE. Total daily commitment: 2–3 hours. Every action on this page has a purpose. Nothing is here for decoration.

---

## The context this document was built for

- Full-time employed (currently ~£60k/yr)
- Building ABLE solo, with AI agents
- C5/C6 cervical disc — not a complaint, a constraint to design around
- Target: £5,000 MRR sustained for 3 months → hand in notice
- Exit trigger horizon: 12–18 months from now
- Health target: C5/C6 managed to background noise, not daily constraint

If any of these change, update this document.

---

## Morning Protocol (30–40 min — before coding, before email)

### Non-negotiables (every day, no exceptions)

These are not aspirational. If you skip them, note it and understand why. Three missed in a week is a warning sign. See `docs/systems/master-plan-alignment/MASTER-PLAN-ALIGNMENT.md` Domain 9 Warning Signs.

**1. C5/C6 morning movement sequence (10 min)**

Do these in order. Lying or standing — not at a desk.

| Exercise | Reps | Notes |
|---|---|---|
| Cat-cow | 10 slow reps | Full spinal articulation, not rushing |
| Chin tucks | 10 holds × 3 sec | Against wall if possible. Double chin position. |
| Wall angels | 10 reps | Back flat to wall, wrists and elbows stay on wall throughout |
| Bird-dog | 10 each side | No rotation in the lower back. Slow and controlled. |
| Dead bug | 10 each side | Lower back stays glued to floor throughout |
| Neck side stretch | 30 sec each side | Gravity only — never force the neck |

This is the single most important 10 minutes of your day. The C5/C6 is a manageable condition when treated consistently. It becomes a crisis when ignored during crunch periods. Read: `docs/systems/pathway/PATHWAY.md` Part 7 Health and `docs/systems/master-plan-alignment/MASTER-PLAN-ALIGNMENT.md` Domain 9.

**2. Red light therapy (10 min)**

Position the panel at neck/upper back level. Use while reading. Starts once the panel arrives (target: Q2 2026 per `docs/systems/pathway/PRE-SHIFT-CHECKLIST.md` Hardware/Workspace). Until then: substitute with 10 minutes of deliberate stillness away from a screen.

**3. Read CONTEXT.md (3 min)**

Open `CONTEXT.md` at the project root. Read it. The tokens, the active files, the rules. This is the 3-minute context load that prevents 30 minutes of avoidable error.

**4. Read STATUS.md (2 min)**

Open `docs/STATUS.md`. Read the last session summary. What shipped? What's open? What's blocked? Never start a session without this.

**5. Run `git log --oneline -5` (1 min)**

Two seconds in terminal. Confirms you know what the codebase state is. Prevents the build-over-build mistake.

---

### Optional morning additions (when energy allows)

**Review warm list (5 min, commute-friendly)**

Open your warm list document (Apple Notes or Notion). Has anyone engaged with your content in the last 24 hours? Add them. If anyone has been warm for 3 weeks without a direct conversation, flag them for a DM tonight. See `docs/systems/instagram-strategy/INSTAGRAM-DATA-AND-LEADS.md` Part 3.3.

**Check Instagram comments and DMs (5 min, commute-friendly)**

Reply to every comment that reveals the commenter is an independent artist. Reply to every DM within 24 hours. This is not social media maintenance — it is the primary lead generation action for ABLE. See `INSTAGRAM-DATA-AND-LEADS.md` Part 3.2.

---

## Weekly Rotating Focus (Monday–Sunday)

The weekly rotating focus is the single most important thing that gets dedicated attention that day beyond the non-negotiables. One domain per day. One action per domain. Not a long list — one thing done well.

---

### Monday — Product

**Morning check (in commute or at desk before other work):**
- Open `docs/STATUS.md` and identify the current P0. Write it on a sticky note or phone note. That is today's product goal.

**Session start ritual (5 min before any code):**
1. Read `CONTEXT.md` (if not done in morning protocol)
2. Check `docs/STATUS.md`
3. Run `git log --oneline -5`
4. Rename any open Playwright browser tabs to reflect the task (e.g., `document.title = "ABLE — Testing fan sign-up flow"`) — so you can track what's open. See `memory/feedback_browser_tabs.md`

**Monday P0s (rotate through these in order over the weeks):**
- Week 1: Fix the `#888` hardcoded colour bugs in `admin.html` L44 + L1288 → `docs/STATUS.md` design system
- Week 2: Sort shows list by date ascending in `admin.html` → `docs/systems/artist-tools/PATH-TO-10.md`
- Week 3: Add accent colour picker in `admin.html` → `docs/systems/artist-tools/SPEC.md`
- Week 4: Close Circle "payments required" state → `docs/systems/artist-tools/SPEC.md`
- Week 5+: Begin Supabase auth (magic link) → `docs/systems/data-architecture/SPEC.md`

**Commit discipline (mandatory every Monday coding session):**
- Commit after each logical chunk. Format: `feat(scope): description` or `fix(scope): description`
- Never leave a Monday session without a commit. The git log is the evidence of progress.

---

### Tuesday — Marketing / Instagram

**Morning (commute, 10 min):**
- Check Instagram Insights on phone: profile visit rate, link-in-bio click rate. Note any number that feels surprising.
- Reply to any Instagram comments from the last 24 hours.

**Evening session (30–45 min):**
- Write or post one piece of content. Use the content type rotation:
  - Week 1 Tuesday: Type A observation post (no ABLE mention, artist reality) → `INSTAGRAM-DATA-AND-LEADS.md` Part 2.3
  - Week 2 Tuesday: Type B product Reel (screen recording, campaign state in context)
  - Week 3 Tuesday: Schedule next week's content in Later.com (30-min batch)
  - Week 4 Tuesday: Cross-post best Instagram content to X as a thread → `SOCIAL-MEDIA-PLAN.md` Part 2.4

**Tuesday DM check (10 min, evening):**
- Review warm list. Anyone with 2+ engagements in the last week who clearly is an independent artist — draft the DM using the framework in `INSTAGRAM-DATA-AND-LEADS.md` Part 3.4.
- Send 2–3 DMs maximum. Quality over volume. Never automate.

---

### Wednesday — Legal / Operations / Admin

**Morning (commute, 10 min):**
- Check `docs/systems/pathway/PRE-SHIFT-CHECKLIST.md` — what is the next incomplete item that would take under 30 minutes? Do it tonight.

**Evening session (30–60 min):**
One of these per Wednesday, rotating:
- Week 1: Legal/business infrastructure (Companies House, ICO, bank account, FreeAgent setup) → `PRE-SHIFT-CHECKLIST.md` Financial — Business
- Week 2: n8n workflow build or improvement → `docs/superpowers/plans/2026-03-14-james-master-strategy.md` Part 2
- Week 3: Financial review — check Stripe (when live), FreeAgent, update MRR tracker. 20 minutes. → `docs/systems/accounting/SPEC.md` Section 3 MRR tracking template
- Week 4: Infrastructure check — Supabase, Netlify, Uptime Kuma, GitHub. All green? → `PRE-SHIFT-CHECKLIST.md` Infrastructure

**R&D time log entry (5 min, every Wednesday):**
Log every qualifying R&D hour from the week. Date, description, hours, category. The spreadsheet reference is in `docs/systems/accounting/SPEC.md` Section 7. This is worth £13,706 in Year 1. Do not skip it.

---

### Thursday — Relationships / Community

**Morning (commute, 10 min):**
- Read one post in r/WeAreTheMusicMakers or r/edmproduction. Note any recurring independent artist frustration. Is it something ABLE addresses?
- Check the ABLE Discord (once live) for any artist questions that need a human response.

**Evening session (30 min):**
One per Thursday, rotating:
- Week 1: Outreach to 3 potential founding artists. Personalised, not generic. See `docs/systems/growth-strategy/GROWTH-STRATEGY.md` Part 3.
- Week 2: Check in with another founder (Indie Hackers, MicroConf, peer group). 20-minute call or message thread. → `docs/systems/pathway/PATHWAY.md` Part 7 Support system
- Week 3: Engage with music industry content on LinkedIn — not brand posts, personal perspective. One comment that adds something real.
- Week 4: Artist conversation — reach out to a current or potential ABLE artist with a genuine question: "What's the hardest thing about your release this month?" Record the answer. → `docs/systems/founder-roadmap/ANALYSIS.md` The Three Things

---

### Friday — Learning / Review

**Morning (commute, 15 min):**
- Read one doc from the `docs/systems/` library — pick one you haven't read this week. The `docs/FILE-STRUCTURE.md` reading order guide has suggestions.
- Note one thing that changes what you're building next week.

**Evening session (30 min):**
One per Friday, rotating:
- Week 1: Competitor research — spend 30 minutes in Linktree, Koji, bio.fm, or Beacons as an artist. What do they do well that ABLE doesn't yet?
- Week 2: Read `docs/v6/core/V6_BUILD_AUTHORITY.md` — has anything on the product list shifted priority based on what you've learned this week?
- Week 3: Explore one new tool or workflow — n8n template, Supabase feature, PostHog capability. 30 minutes of deliberate learning.
- Week 4: Read the latest post from one founder newsletter (Lenny's Newsletter, Indie Hackers, or similar) — extract one applicable idea.

---

### Saturday — Health / Workspace / Hardware

**Morning (the unhurried morning — this day is for being a person):**
- Full C5/C6 routine (longer version if energy allows — add 10 minutes of neck-specific physiotherapy exercises given by your physio)
- Red light therapy: 10 minutes
- Strength training (gym session): the target is 3x/week — Saturday is one of the three. See `MASTER-PLAN-ALIGNMENT.md` Domain 9 non-negotiables.

**Session focus (1–2 hours, mid-morning):**
One per Saturday, rotating:
- Week 1: Workspace audit — is the monitor at eye level? Keyboard position neutral? Stand for 20 minutes while working? → `PRE-SHIFT-CHECKLIST.md` Hardware/Workspace
- Week 2: Financial health check — personal savings, ISA, emergency fund progress. Update `MASTER-PLAN-ALIGNMENT.md` Domain 10 current state.
- Week 3: Hardware upgrade research — next planned purchase (monitor arm, standing desk, ergonomic keyboard). Confirm timeline. → `PRE-SHIFT-CHECKLIST.md` Hardware/Workspace
- Week 4: Intentional rest day — no ABLE. Not because it is mandated, but because the creative work requires recovery. Read, walk, talk to people.

---

### Sunday — Review / Strategy / Planning

**Sunday review (30 min — non-negotiable)**

This is the most important 30 minutes of the week. Do it at the same time every Sunday. Morning is better.

**Step 1 (5 min): Warm list review**

Open your warm list document. Anyone warm for 3+ weeks without a direct conversation → plan the DM for Monday. Anyone who has progressed (commented multiple times, visited the profile, responded to a story poll) → they are now hot. Plan the next step.

**Step 2 (5 min): Instagram data check**

Pull the four key metrics from Instagram Insights:
```
Week | Link click rate | Profile visit rate | Story-to-link rate | DM rate | One change made
```
Add this week's row to the tracking sheet. Look at the 4-week rolling average, not individual week noise. Make one decision. Not five. One. See `INSTAGRAM-DATA-AND-LEADS.md` Part 1.4.

**Step 3 (5 min): Progress vs 500-STEPS.md**

Open `docs/systems/founder-roadmap/500-STEPS.md`. Where are you? Check off any steps completed this week. Note the next 3 steps. Does the current week's work align with the roadmap sequence? If not, why?

**Step 4 (5 min): Health check (honest)**

Answer these honestly — not to feel good, but to get accurate data:
- C5/C6 pain level this week: 0–10
- Morning routine completed: N/7 days
- In bed by 22:30: N/7 days
- Strength training sessions: 0/1/2/3
- Did work stop after 21:00 more than once? Y/N

If any score is 3/10 or below, that domain gets Monday's focus. See `MASTER-PLAN-ALIGNMENT.md` Part 7 Warning Signs.

**Step 5 (5 min): What shipped this week**

Write 3 sentences:
1. What shipped (product, marketing, legal, operations — anything)
2. What is blocked and why
3. Tomorrow's P0 (one thing, specific, achievable Monday evening)

Add this to the bottom of `docs/STATUS.md` as the session summary. Keep the record. In the hard months, reading back 8 weeks of progress is the most powerful antidote to progress amnesia.

**Step 6 (5 min): Next week planning**

Look at the weekly rotating focus for the coming week (Mon–Sat above). What is the specific action for each day? Write them on a sticky note or phone note. Having the plan means Monday morning is already decided.

---

## During Work — Session Protocols

### Session start ritual (every coding session)
1. Rename the Playwright browser tab: `document.title = "ABLE — [task description]"` — so you know what's open when you have multiple tabs. See `memory/feedback_browser_tabs.md`
2. Read `CONTEXT.md` (if not done this morning) — 3 minutes
3. Check `docs/STATUS.md` (if not done this morning) — 2 minutes
4. Run `git log --oneline -5` — 10 seconds
5. Check `docs/v6/core/V6_BUILD_AUTHORITY.md` if building anything on the artist profile, admin, or onboarding wizard — it is the primary authority for all product decisions. See `memory/feedback_check_docs.md`

### Before writing any UI copy
Read `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md` or `docs/systems/copy/SPEC.md` banned phrases list. Every time. Not occasionally. This is a non-negotiable that protects the most differentiating quality the product has.

### Before any CSS change
Verify all 4 themes still work after the change (Dark, Light, Contrast, Glass). If you cannot quickly test all 4, add a TODO and mark it before the next commit. Never ship a CSS change that has not been verified across all 4 themes.

### Parse check every JS block after editing
After editing any JavaScript block: `node -e "new Function(src)"` equivalent — or at minimum, open the file in the browser and check the console is clean. See CLAUDE.md working rules.

### Commit discipline
- Commit after each logical chunk. Not every line. Not every file. After each logical, reversible unit of work.
- Format: `feat(scope): description` / `fix(scope): description` / `docs(scope): description`
- A session with no commits is a session that did not ship. Avoid them.
- Never force-push without explicit instruction. Never use `reset --hard` without explicit instruction.

### 90-minute work blocks
Set a timer. When it rings, stand up. Move for 5 minutes minimum. Not the bathroom — actual movement. Then sit (or stand) and continue. The C5/C6 does not respond well to unbroken 3-hour desk sessions. This is health maintenance, not a productivity hack.

---

## End of Day (15 min — before 21:00)

Do not skip this. It takes 15 minutes and prevents tomorrow morning's cognitive overhead.

**1. What shipped (2 min)**

One sentence. Not a brag. Just a record. "Wired the fan sign-up Supabase write path. Test passes." Add it to `docs/STATUS.md` if it is session-worthy.

**2. What's blocked (2 min)**

One sentence. If something is blocked, name it specifically. "Supabase RLS policy not saving correctly — throwing 403 on update." Vague blocks don't get resolved. Named blocks can be debugged.

**3. Tomorrow's P0 (1 min)**

One specific thing. Write it on a sticky note or phone note. "Tomorrow: wire the accent colour picker in admin.html to the profile save flow." When you open the laptop tomorrow, you know exactly what you're doing.

**4. Git status clean? (2 min)**

Run `git status`. Are there uncommitted changes? Either commit them (if they're done) or stash them (if they're mid-flight). Never leave a session with mystery uncommitted work.

**5. Instagram evening check (5 min)**

Check comments and DMs from today. Reply to any artist who engaged. Check if today's post (if you posted) has any early engagement worth responding to. See `INSTAGRAM-DATA-AND-LEADS.md` Part 3.2 Evening protocol.

**6. Health close (3 min)**

Do these before bed:
- Stop all screens 30 minutes before sleep (or use Night Shift + minimal brightness if unavoidable)
- Set in-bed time alarm: 22:30
- Note pain level: is anything elevated compared to this morning? If yes, what happened in the session that might have caused it?

---

## The 20-Minute Instagram Daily Ritual

This is the daily lead generation engine. Total time: 20 minutes, split across morning and evening.

### Morning (10 min)

**Check comments** from the last 24 hours on all posts. Reply to every comment that:
- Asks a question
- Reveals the commenter is an independent artist
- Shows genuine engagement with the problem (not a generic emoji)

Ignore: generic likes, "🔥", and comments that are clearly not from artists.

**Check DMs.** Reply to every DM within 24 hours. If a DM came after someone saw an ABLE-related post, treat it as a warm lead. Reply as a person. See `INSTAGRAM-DATA-AND-LEADS.md` Part 3.4.

**Check Story responses.** If you posted a poll or question sticker in the last 24 hours, check who responded. Artists who respond to story interactions are warm. Note their handles on your warm list.

### Evening (10 min)

**Check today's post** (if you posted) — are there early comments worth responding to while the post is still active in the algorithm?

**Identify 2–3 people** across recent posts who have engaged multiple times. These are moving to hot. No action tonight — just note them in your warm list.

**Check the bio link click rate** from Insights if today was a content day — did the post drive any profile visits? This is your weekly conversion signal.

### Weekly data ritual (Monday morning, 30 min)

Once per week, pull the full analytics review:
1. Open Instagram Insights (Professional Dashboard → Content You Shared)
2. Write the four key metrics in your tracking sheet
3. Open Metricool dashboard — check best posting times for this week
4. Make one content decision from the data. Not five. One.

See `INSTAGRAM-DATA-AND-LEADS.md` Part 1.4 for the exact metrics and decision framework.

---

## Weekly Review (Sunday, 30 min)

See the Sunday section in Weekly Rotating Focus above. This is the canonical location.

Summary of what happens:
- Warm list review
- Instagram 4 metrics pull and tracking sheet update
- Progress vs `500-STEPS.md`
- Health check (honest scores)
- What shipped / what's blocked / tomorrow's P0
- Next week planning

---

## Monthly Review (First Sunday of each month, 60–90 min)

**When:** First Sunday of each month. Non-negotiable. Mark it in your calendar.

**Step 1 (10 min): Master plan alignment check**

Open `docs/systems/master-plan-alignment/MASTER-PLAN-ALIGNMENT.md`. Re-read Part 0 (The North Star) first — not skimming, reading.

Then complete the alignment check for all 10 domains using the template in Part 2:
1. ABLE Product
2. ABLE Labs
3. Hardware + AI Stack
4. Agent Operating System
5. Market Tracking
6. Company Structure
7. Job Exit Strategy — which gate are you at?
8. Digital Nomad Lifestyle
9. Health
10. Personal Finance

For each domain: current state (one honest sentence), gap to goal, next single action.

**Step 2 (10 min): Pre-shift checklist progress**

Open `docs/systems/pathway/PRE-SHIFT-CHECKLIST.md`. How many items have been completed since last month? What is the next item in each section? Update the monthly review log at the bottom of the file.

**Step 3 (10 min): Product score update**

Open `docs/STATUS.md`. What has shipped? What has improved? Update any scores that have moved. Is the known issues list accurate?

**Step 4 (10 min): Instagram archive audit**

Find the top post from the last 90 days by profile visit rate (not reach). Story-ify it — "I posted this 6 weeks ago and it clearly landed." See `INSTAGRAM-DATA-AND-LEADS.md` Part 2.4. This is one action that takes 5 minutes and regenerates value from content you already created.

**Step 5 (10 min): Financial review**

Pull these numbers:
- ABLE MRR (current)
- Cash in business bank account (when Stripe is live)
- Personal emergency fund progress vs target
- ISA contribution year-to-date (if tax year is open)
- R&D time log hours this month

Update `MASTER-PLAN-ALIGNMENT.md` Domain 10 current state.

**Step 6 (5 min): Write the monthly review file**

Save as: `docs/systems/master-plan-alignment/MONTHLY-REVIEW-[YYYY-MM].md`

Template from `MASTER-PLAN-ALIGNMENT.md` Part 3. Three outputs:
1. The one domain that moved most this month
2. The one domain that stagnated (be honest)
3. The single most important thing to move next month

---

## Quarterly Review (First Weekend of Each Quarter, 2 hours)

Quarters: January, April, July, October.

**Step 1 (20 min): Re-read the full master strategy**

Open `docs/superpowers/plans/2026-03-14-james-master-strategy.md`. Read the whole document. Not skimming. You will have forgotten parts. The act of re-reading always surfaces something neglected.

**Step 2 (15 min): Update the master strategy**

What has changed? What did you learn? What turned out to be wrong? Edit the document directly — it should evolve as reality does. See `MASTER-PLAN-ALIGNMENT.md` Part 5.

**Step 3 (20 min): The 20-angle analysis**

Ask DeepSeek-R1 70B (once local stack is live) or Claude:

"Here is my current business and life situation: [paste 3-paragraph context]. Analyse my current trajectory from 20 different angles — financial, product, health, relationships, competitive environment, timing, personal sustainability, etc. What am I not seeing?"

Review critically. Write down the 3 things that surprised you. See `MASTER-PLAN-ALIGNMENT.md` Part 5 Step 3.

**Step 4 (15 min): Biggest assumption check**

Identify the 3 most important assumptions you are currently making. For each:
- Is there evidence for this assumption?
- If wrong, how would the strategy change?
- What would I need to see to know it's wrong?

Examples per `MASTER-PLAN-ALIGNMENT.md` Part 5: "Independent artists will pay for owned fan relationships." "Producer-seeding is the right acquisition channel." "£5k MRR = safe exit."

**Step 5 (10 min): What would change my strategy?**

Write the short list. "I would significantly change direction if..." This is not a plan to pivot. It is insurance against being slow to recognise a genuine change.

**Output:** A brief updated master strategy and a `docs/systems/master-plan-alignment/QUARTERLY-REVIEW-[YYYY-Q#].md` file.

---

## Commute Actions (low-cognitive, screen-optional)

These are actions that can be done on a phone during a commute, without a laptop.

**Daily commute (pick one per day):**
- Check Instagram Insights and copy numbers into your tracking note
- Reply to Instagram comments and DMs (see the 20-minute daily ritual)
- Read one doc from `docs/systems/` on GitHub Mobile or in a notes app
- Review warm list and plan DMs
- Add one entry to your R&D time log
- Review `docs/systems/pathway/PRE-SHIFT-CHECKLIST.md` and note the next action
- Write a Type A observation post draft in Apple Notes — edit on the train, post in the evening

**When reading is not possible (walking, exercise):**
- Voice-memo one observation about independent artists or ABLE — these are often the raw material for Type A posts
- Think about the answer to one question from the quarterly strategy review
- Mentally replay the last product decision: was it right? what would you do differently?

---

## Warning Signs — When to Stop and Recalibrate

These are the signals from `docs/systems/master-plan-alignment/MASTER-PLAN-ALIGNMENT.md` Part 7 that indicate something is off. If more than 2 appear in the same week, stop and run the monthly review immediately.

**Product drift:**
- More than 3 features shipped this week with no user feedback data backing them
- No new artist conversations for 2+ weeks
- Building documentation instead of shipping product

**Health drift:**
- Morning C5/C6 routine missed more than 3 times in one week
- Pain level consistently above 4/10 for 5+ days
- Work stopping after 21:00 as a regular pattern (not once — as a pattern)
- Sleep starting after 23:00 more than twice in a week

**Marketing drift:**
- No content posted in 7 days
- No DM sent to a warm lead in 10 days
- Instagram metrics not checked for 2 weeks

**Financial drift:**
- MRR not growing for 6 weeks (when Stripe is live)
- No movement on pre-shift checklist items for 4 weeks
- Spending on tools above £300/month without reviewing `MASTER-PLAN-ALIGNMENT.md` Decision Filter

**Mental drift:**
- Major product direction change driven by competitor news, not user insight
- Decision made in an evening without the 24-hour rule
- Cannot clearly state what has moved in the last 30 days

**The response to any warning sign:** Stop. Re-read `docs/superpowers/plans/2026-03-14-james-master-strategy.md` Part 0 (The North Star). Complete the alignment check for the relevant domain. Identify the single next action. Do it.

---

## The Decision Filter

Before any decision involving significant time, money, or direction — run it through these 5 questions from `docs/systems/master-plan-alignment/MASTER-PLAN-ALIGNMENT.md` Part 4:

1. Does this get me closer to or further from £5k MRR?
2. Does this get me closer to or further from the nomad lifestyle?
3. Does this support or harm the C5/C6 condition?
4. Does this build or consume the £30k budget?
5. Does this increase or decrease the AI leverage advantage?

A "no" on one is a flag. A "no" on two or more means pause for 24 hours. The 24-hour rule applies to any decision that feels urgent but unclear.

---

## The Daily Scorecard

Rate yourself on this once per week (Sunday review). Not to judge — to calibrate.

| Category | Non-negotiable | Days this week |
|---|---|---|
| C5/C6 morning routine | Daily | /7 |
| In bed by 22:30 | Daily | /7 |
| Work stopped before 21:00 | Daily | /7 |
| 90-minute work blocks with movement | Every session | /sessions |
| Committed to git at least once | Every coding day | /coding days |
| Instagram engagement protocol | Daily | /7 |
| Warm list reviewed | Weekly (Sunday) | done Y/N |
| End-of-day ritual completed | Daily | /7 |

**Reading the score:** If any row is below 4/7, that is a pattern. Not a bad day. A pattern. Patterns require a system change, not willpower.

---

## Anchor Moments (the moments that tell you this is real)

When you have a bad day — nothing shipped, no one responded, the product feels broken — return to this section.

**The first fan sign-up** on a real artist's page that you didn't engineer yourself. That happened because the product worked.

**The first DM from a warm artist** who says "I've been thinking about this exact problem." That is the product finding its user.

**The first £9** that hits the Stripe dashboard. Not a big number. The most important number you will ever see.

**Re-reading `docs/superpowers/plans/2026-03-14-james-master-strategy.md` Part 0** — the Porto morning. The 07:00 n8n digest. The walk along the Douro. This is not fantasy. It is a reasonable outcome of consistent execution over 36 months.

The daily actions in this document are the path between here and there. Not fast. Not dramatic. Consistent.

---

## Quick Reference — Where Everything Lives

| I need to... | Go here |
|---|---|
| Know what to build next | `docs/STATUS.md` → `docs/v6/core/V6_BUILD_AUTHORITY.md` |
| Know the full product roadmap | `docs/systems/founder-roadmap/500-STEPS.md` |
| Find a quick action | `docs/systems/founder-roadmap/300-WINS.md` |
| Check the business exit plan | `docs/systems/pathway/PATHWAY.md` |
| Check what needs to be done before exit | `docs/systems/pathway/PRE-SHIFT-CHECKLIST.md` |
| Write copy for anything | `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md` or `docs/systems/copy/SPEC.md` |
| Check the design system tokens | CLAUDE.md Design System section |
| Know the data architecture | `docs/systems/data-architecture/SPEC.md` |
| Run the monthly alignment review | `docs/systems/master-plan-alignment/MASTER-PLAN-ALIGNMENT.md` |
| Check Instagram strategy | `docs/systems/instagram-strategy/INSTAGRAM-DATA-AND-LEADS.md` |
| Know what content to post | `docs/systems/social-media/SOCIAL-MEDIA-PLAN.md` |
| Check accounting setup | `docs/systems/accounting/SPEC.md` |
| Check the honest state of the build | `docs/systems/founder-roadmap/ANALYSIS.md` |
| Build a product feature | `docs/systems/[feature]/SPEC.md` |
| Fix a P0 bug | `docs/STATUS.md` known issues |
| Know the growth priorities | `docs/systems/growth-strategy/GROWTH-STRATEGY.md` |

---

*Open this first. Every morning.*
*Last updated: 2026-03-16*
*Next review: 2026-04-16 (monthly update)*
