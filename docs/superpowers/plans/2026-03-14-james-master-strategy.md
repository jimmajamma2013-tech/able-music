# James — Master Strategy Document
**Written: 2026-03-14 | Upgraded: 2026-03-16 | Review: every 90 days**

> This document is the north star. Every decision — product, business, personal — should be filtered through it.
> The goal is not to build a company. The goal is to build freedom. The company is the vehicle.

---

## The one sentence

Build ABLE into a self-sustaining business that gives independent artists the infrastructure to own their fan relationships — and in doing so, build yourself out of employment, into health, and into a life lived on your terms across continents.

---

## Part 0: The North Star — What Life Looks Like in 3 Years

It's March 2029. You're 47. You wake up in Porto, in a flat you're renting month-to-month, with a monitor arm holding a 4K display at eye level. Your morning HRV reading on the Oura is 72 — higher than when you were 40, because you've been sleeping well, not drinking, and training three times a week. The C5/C6 has been managed to the point where it's background noise rather than a daily constraint.

You open your laptop. n8n sent you a weekly digest at 7am: ABLE is at £42,000 MRR. 3,200 paying artists. Net churn is 2.1%. There are 4 new support tickets — your community manager already handled 3 of them. You spend 90 minutes reviewing a spec for the Spanish-language version of the platform, written by a Colombian hire you found via Medellín's music community. You have a call with a Lagos-based producer who wants to bring 20 West African artists to ABLE.

At noon, you stop. You eat well. You walk for 40 minutes along the Douro. You don't think about work. You think about where you're going next — Chiang Mai for two months in June, a music festival in Medellín in September.

You have £400,000 in liquid assets. Your ISA is compounding. The business is on a trajectory where an exit at £3–5M is plausible by 2031 if you want it. Or you keep running it because you're profitable, free, and doing something you believe in.

This is not fantasy. It is a reasonable outcome of consistent execution over 36 months. This document is the map.

---

## Where you are right now

- 44 years old, employed at £60k/yr, ~10 hrs/day committed
- Building ABLE: a platform for independent musicians you genuinely believe in
- £30k budget to deploy strategically
- C5/C6 herniated disk — a constraint to manage, and a reason to move fast
- Agent-assisted development stack already configured
- High-spec Mac incoming (128GB unified memory)

**The single most important thing to understand:** You are not behind. You are exactly where you need to be. At 44 with AI agents, you can build in 18 months what took a 25-person team 5 years in 2015. The leverage is unprecedented. The window is now.

---

## Part 1: Hardware & Local Tech Stack

### The Machine
**Mac Studio M4 Max (128GB unified memory)** — the right call.

Why this specific machine:
- 128GB unified memory means you can run 70B parameter models locally without swapping
- M4 Max's Neural Engine processes tokens at ~3-4x the speed of M3
- It's a workstation, not a laptop — stationary base when you're at your main location
- For travel: MacBook Pro M4 Pro 36GB is enough for day-to-day; heavy local inference stays at base

**Additional hardware:**
- 4TB NVMe external SSD (Samsung T9) — model storage. Models are 20-80GB each
- 4K external display (LG UltraFine or Dell UltraSharp) — screen space matters for multi-agent work
- UPS (uninterruptible power supply) — protects work during power cuts
- Ergonomic setup: standing desk converter, monitor arm, good chair — non-negotiable given your disk
- Red light therapy panel (more on this in health section) — can use while working

### Local LLM Stack
**Ollama** — the runtime. Simple, reliable, free.

Models to have installed:
| Model | Size | Use |
|---|---|---|
| DeepSeek-R1 70B | ~45GB | Deep reasoning, strategy, complex decisions |
| Llama 3.3 70B | ~45GB | General tasks, writing, fast iteration |
| Qwen2.5-Coder 32B | ~20GB | Code generation, cheaper than Claude for routine tasks |
| Phi-4 14B | ~9GB | Fast, lightweight — email drafts, quick lookups |
| Llama 3.2 3B | ~2GB | Always-on monitoring, instant responses |

**Why local LLMs matter:**
- Cost: running 1,000 tasks/day locally costs £0 vs £50-200/day on APIs at scale
- Privacy: artist data, fan data, business financials stay on your machine
- Speed: no API latency for monitoring and automation tasks
- Availability: works offline on a plane to Chiang Mai

### The Agent Orchestration Layer
**n8n (self-hosted on your Mac)** — this is the central nervous system of your business.

n8n connects everything:
- Supabase → triggers on new signups, fan captures, churned artists
- Email (Resend/Loops) → automated sequences triggered by behaviour
- Slack/Discord → internal alerts and notifications to you
- Market data APIs → daily digests on stocks/crypto/gold
- Accounting → transactions auto-categorised, P&L auto-updated
- Claude API + local Ollama → AI processing at each step

Think of n8n as the pipes. Claude/local LLMs are the intelligence inside the pipes. Supabase is the memory. You are the decision-maker who only touches edge cases.

**Full tool stack:**

| Category | Tool | Cost |
|---|---|---|
| Dev agent | Claude Code | ~£60/mo |
| Local LLM runtime | Ollama | Free |
| Workflow automation | n8n (self-hosted) | Free |
| Database | Supabase | Free → £25/mo |
| Email platform | Loops.so | Free → £49/mo |
| Analytics | PostHog (self-hosted) | Free |
| Accounting | FreeAgent | £19/mo |
| Legal docs | Genie AI | £50/mo |
| Browser automation | Playwright MCP (configured) | Free |
| Market data | TradingView + Alpha Vantage API | £15/mo |
| Password/secrets | 1Password | £4/mo |
| Monitoring | Uptime Kuma (self-hosted) | Free |
| Communication | Discord (community) | Free |
| Video calls | Whereby (no download required for artists) | £12/mo |

Total monthly tool cost: **~£230/mo**. Negligible at any meaningful revenue level.

---

## Part 2: The Agent Operating System

The goal is a business that runs itself, surfaces exceptions to you, and only needs you for decisions that require human judgement. Here is the full agent architecture.

### Development Loop (perpetual)
```
User (you) writes a brief
  → Claude Code builds the feature
    → Playwright MCP runs smoke tests + screenshots
      → Claude Code reviews its own output
        → You approve or redirect
          → Committed, shipped
```

Running continuously. No waiting for a developer. No standups. No PRs sitting open for days.

**Parallel agent pattern:** Two features at once, in isolated git worktrees. One agent works on the artist-facing page, another works on the admin dashboard. You review both when done.

### Artist Support Loop (automated)
```
New artist signs up (Supabase trigger)
  → n8n fires welcome sequence (Loops email)
    → Day 1: "here's how to set your first CTA"
    → Day 3: "your page has had X views — here's what to do next"
    → Day 7: "artists with a release date set get 3x more fan signups"
  → If no CTA set by day 5: Ollama Phi-4 drafts a personal nudge email
  → If churned (no login 14 days): re-engagement sequence fires
```

Zero manual effort. Feels personal because the copy is specific.

### Financial Operating System (automated)
```
Every transaction (Stripe/bank)
  → FreeAgent auto-categorises
    → n8n weekly summary: revenue, MRR, churn, burn rate
      → Ollama generates plain-English P&L summary
        → Sent to you as a weekly Slack message: "Here's your week. MRR: £X. 3 new paying artists. 1 churn. Net: +£X."
```

You look at this once a week. That's it.

### Compliance & Legal Loop (semi-automated)
```
GDPR: Supabase handles data residency (EU region)
Privacy policy: auto-updated via Genie AI template when you add new data collection
Terms of service: version-controlled, artists accept on signup
VAT: FreeAgent calculates, you approve and submit quarterly
Annual accounts: FreeAgent exports, accountant files (£500/yr)
```

### Market Monitoring Loop (background)
```
Every morning at 07:00:
  → Alpha Vantage API pulls: S&P 500, BTC, ETH, Gold, Silver, GBP/USD
    → Ollama DeepSeek-R1 analyses vs your position thresholds
      → If anything worth noting: Slack message "Gold up 2.3% — at 6-week high. Your position: [X]"
      → If nothing to act on: silence
```

You get signal, not noise.

### Agent Handoff Protocol (what keeps running when you can't)

This is the list of what continues without your input and what stops immediately:

**Continues automatically (n8n + Loops):**
- Artist welcome email sequences (Day 1, 3, 7)
- Churn re-engagement sequences
- Weekly financial summary generation
- Market monitoring digest
- Uptime monitoring alerts (Uptime Kuma → Slack)
- PostHog analytics collection

**Stops immediately if you're unavailable:**
- New feature development (requires your direction)
- Artist support tickets requiring judgement (product questions, edge cases)
- Producer outreach (no one is doing this but you)
- New partnerships or commercial conversations

**The 2-week absence test:** If you were unreachable for 14 days, here is what would happen to ABLE:
- Automated sequences continue. Artists get onboarded automatically.
- No new features ship. The product stays exactly as it was.
- Support tickets pile up. Artists don't churn immediately over this — most tolerate 5–7 day response times.
- Producer relationships go cold if not recently established.
- Revenue likely continues at current levels. No catastrophic drop.

**What this tells you:** Your current business can survive 2 weeks without you if the automations are running. The fragility is in growth (producer outreach) and support (ticket backlog). The mitigation for both is hiring a community manager before you need one, not after. At £2,000 MRR, the community manager is self-funding.

---

## Part 3: ABLE — Path to 10/10 at Each Stage

### Stage 1: Months 1–3 — Depth over breadth

**The 10/10 scenario means:**
50 artists who are genuinely evangelical. NPS above 50. Zero bugs on mobile.

**What you do:**
1. Personally identify 300 artists on TikTok/SoundCloud/Bandcamp who have 1k–50k followers and are clearly independent (no label). Export to a spreadsheet.
2. Your community manager sends each a 3-line personal message. Not a template. References something specific about their music.
3. Get on 20-minute calls with the ones who respond. Record everything. Feed transcripts to Claude for pattern extraction: "what are these artists actually frustrated about?"
4. Build exactly what they say is broken. Nothing else.
5. Set up PostHog on able-v3.html — track every tap, every scroll depth, every drop-off point. Let the data tell you where artists give up.

**Tools that win this stage:**
- Tally.so for artist feedback forms (free, beautiful, embeds anywhere)
- Notion for tracking your 300 outreach targets (free)
- Loom for sending personal video messages to artists who engage (more human than email)
- Calendly embedded in admin.html for booking onboarding calls

**The 10/10 outcome:** By month 3, you have 50 artists who tell other artists about ABLE without being asked. That's the only metric that matters here.

---

### Stage 2: Months 4–8 — Find the channel

**The 10/10 scenario means:**
One acquisition channel producing 100+ signups/week at under £5/signup. You've stopped doing things that don't work.

**The channel tests (£500 each, run simultaneously):**

| Channel | How to test | Success metric |
|---|---|---|
| TikTok ads | Target: "independent musician", "music producer" interests. Creative: real artist showing their ABLE page | Under £6 cost per signup |
| Music newsletter sponsorships | Hypebot, Music Business Worldwide, The Music Network | Under £8 cost per signup |
| Reddit organic | r/WeAreTheMusicMakers — genuinely helpful posts, no pitching | Signups attributed to Reddit traffic |
| Producer community seeding | Identify 20 producers with large followings. Offer them free Artist Pro. | Each producer brings 5+ artists |
| YouTube creator outreach | Music production channels (10k-500k subs). Affiliate deal: £5 per paying signup | Under £8 cost per paying artist |

**The 10/10 move:** The producer seeding channel is almost certainly the winner. One producer with 50k Instagram followers posts their ABLE profile → 200 of their artist clients look it up → 40 sign up → 8 convert to paid. Cost: one free Artist Pro account (£19/mo value). ROI: £96/mo recurring.

**Double down hard on whichever channel hits under £6/signup. Kill the rest immediately.**

---

### Stage 3: Months 9–18 — Retention and depth

**The 10/10 scenario means:**
Monthly churn under 5%. Artists upgrading, not leaving. The product is genuinely indispensable.

**What drives retention:**
1. **The stats dashboard is actually useful.** Artists can see: page views by source, fan capture rate, CTA conversion rate, which release gets the most plays. If an artist can make a better decision because of ABLE data, they never leave.
2. **Fan dashboard goes live (fan.html).** When fans have a reason to come back to ABLE (their followed artists' updates, upcoming shows, new drops), the artist's page becomes a destination, not just a link. This is the lock-in moment.
3. **Email broadcasts.** Artist Pro tier can email their fan list directly from ABLE. This makes ABLE mission-critical — their relationship with their fans lives here.

**Churn intervention (automated):**
```
Artist hasn't logged into admin in 14 days
  → Ollama generates personalised message: "Your page had 47 views this week — want to see who's engaging?"
    → If no response in 7 days → offer a 1-month discount
      → If no response → tag as at-risk, flag to community manager for a personal message
```

---

### Stage 4: Year 2 — Network effects

**The 10/10 scenario means:**
Artists are discovering other artists on ABLE. The freelancer credit graph is generating organic signups. Labels are on £49/mo plans. ABLE is mentioned in music press without you having to pitch it.

**What to build:**
1. **Artist discovery page** — a curated, non-algorithmic "artists you might like" feed. Curation is done by taste, not engagement metrics. This is the anti-algorithm.
2. **Freelancer credits live** — a producer's ABLE page shows every artist they've worked with. Each credit is a link. Each artist link drives discovery.
3. **Press packs (EPKs)** — auto-generated from the artist's ABLE profile. One click → PDF press pack with bio, photo, streaming stats, booking contact. Labels and journalists need this. It's currently painful to create. ABLE makes it instant.

**Label strategy:**
Direct outreach to 100 independent labels (not majors — they move too slowly). Offer a demo. Show them the aggregate analytics view. 10 labels paying £49/mo = £490/mo. 50 labels = £2,450/mo. This is achievable with direct sales, no advertising.

---

### Stage 5: Year 3–5 — Platform

**The 10/10 scenario means:**
ABLE is the default home for independent artists. The artist-fan relationship lives here. Acquisition interest from Spotify, TikTok Music, or a major distributor. Or you're raising a Series A.

**What makes this happen:**
- Fan dashboard with 500k+ active fans
- Email broadcast product used by 10,000+ artists to reach their fans
- The data moat: you know which fans engage most, which CTAs convert, which release types perform — data no DSP has because they don't own the direct relationship
- Press pack / EPK tool used by music journalists and labels to research artists

---

## Part 4: ABLE Labs — Diversification

ABLE Labs is the parent company. ABLE Music is the first product. The Labs model means you build infrastructure once and spin up new products on top of it.

### Vertical diversification (deeper into music)

**Priority 1: ABLE Distribution**
What: White-label music distribution to Spotify, Apple Music, Amazon, Tidal — direct from the ABLE dashboard.
Why: Artists already trust ABLE with their profile and their fans. Adding distribution means they never need DistroKid or TuneCore. Revenue: £19.99/yr per release or £9.99/mo unlimited.
When: Year 2. Partner with a white-label distributor (Amuse, Stem, or similar) rather than building from scratch.
Revenue potential: 5,000 artists × £9.99/mo = £50k MRR alone.
**Trigger: activate when ABLE reaches 1,000 paying artists and £10,000 MRR. Not before.**

**Priority 2: ABLE AI Tools**
What: AI-powered artist tools, charged per use or as an add-on tier.
- Bio generator: input genre, mood, influences → 3 bio options in artist's voice
- Press release generator: input release details → press release + email pitch to blogs
- Lyric sheet formatter: input lyrics → properly formatted PDF
- Sync brief matching: artist uploads track → AI matches to open sync licensing briefs
Revenue: £4.99–9.99/month add-on, or per-use credits.
**Trigger: activate when AI features are genuinely better than free alternatives. Don't ship average AI tools.**

**Priority 3: ABLE Sync**
What: A sync licensing marketplace. Brands, film supervisors, ad agencies post briefs. Artists submit tracks. ABLE takes 15% commission on placements.
Why: Sync deals range from £500 to £50,000+. Even 2-3 placements/month at £2,000 avg = £600/mo commission at low volume.
When: Year 2-3. Requires building the brief/submission flow and relationships with music supervisors.
**Trigger: activate when ABLE has 2,000+ active artists and a working relationship with 3+ music supervisors.**

**Priority 4: ABLE Radio**
What: A curated streaming/discovery layer — independent artists only, no major label content.
Why: Creates a reason for fans to spend time on ABLE. Non-algorithmic curation (human + AI) makes it meaningfully different from Spotify's Discover Weekly.
Revenue: Ad-supported free tier, or £3.99/mo for ad-free. Fan-facing, not artist-facing.
When: Year 3.

### Horizontal diversification (adjacent creator types)

The ABLE infrastructure (profile, CTA zones, fan capture, analytics, campaign states) works for any creator type. The marginal cost of expanding is low.

| Product | Creator type | Why it makes sense |
|---|---|---|
| ABLE for Podcasters | Independent podcasters | Same pain point: Linktree is generic, they need a proper home |
| ABLE for Comedians | Stand-up comics, sketch creators | Tour dates, clips, merch — identical CTA architecture |
| ABLE for Visual Artists | Illustrators, photographers | Portfolio + prints + commissions |
| ABLE for Writers | Authors, journalists, essayists | Newsletter, book links, events |

**Strategy:** Don't build these. Validate demand first. If 50 podcasters find ABLE and start using it despite it being music-branded, that's your signal to build ABLE for Podcasters.

### The Creator OS (Year 3–5 vision)
ABLE Labs becomes the infrastructure layer for all independent creators. Not a social network. Not a marketplace. A professional home — your page, your fans, your data, your money.

This is a billion-pound idea if executed correctly. The TAM is not 15 million musicians. It's 500 million creators globally who currently have no professional home.

---

## Part 5: Market Tracking — Side Income

This is a separate, parallel track. Not a distraction from ABLE — a financial resilience layer.

### The setup
- **TradingView** for charting (free tier is sufficient)
- **Alpha Vantage API** for data feeds (free tier: 25 requests/min)
- **Local Ollama DeepSeek-R1** for analysis
- **n8n** to orchestrate the daily digest

### What you track
- S&P 500 (broad market health)
- BTC and ETH (crypto positions)
- Gold (XAU/USD) and Silver (XAG/USD) — inflation hedges
- GBP/USD (relevant as you're UK-based, earning/spending in multiple currencies as a nomad)

### The strategy (not day trading — position-based)
1. **Gold and Silver as the base.** With a C5/C6 disk, high-stress active trading is counterproductive. Gold and silver are slow, reliable inflation hedges. Buy physical (BullionVault.com, UK-based, insured storage) or ETFs (iShares Physical Gold ETC — ISA eligible).
2. **BTC: 10% of investable assets.** Long-term hold. No active trading. Rebalance quarterly.
3. **S&P 500 via ISA:** Max your ISA (£20,000/yr) in a global index fund (Vanguard FTSE All-World). This is the lowest-risk highest-return vehicle available to you as a UK resident.
4. **The AI layer:** Daily digest tells you if any position has moved significantly. You decide to act or hold. Target: <30 minutes/week on this.

### Monthly asset allocation (based on current £30k budget)

| Allocation | Amount | Vehicle |
|---|---|---|
| Business runway (ABLE) | £15,000 | Starling business account — deploy over 12 months |
| ISA top-up (Year 1) | £5,000 | Vanguard FTSE All-World |
| Gold/Silver | £4,000 | BullionVault or iShares Gold ETC |
| BTC | £3,000 | Ledger hardware wallet — long-term hold |
| Emergency float | £3,000 | High-interest savings (Chase UK or Marcus) |

**Do not touch the emergency float.** It is the buffer that keeps you making good decisions instead of panicked ones.

### Tax note
Max your Stocks & Shares ISA (£20,000/yr) before anything else. All gains are tax-free. At £60k salary you pay 40% on anything above £50,270 — every pound into ISA saves you 40p in tax.

---

## Part 6: Company Structure

### The structure

```
ABLE Labs Ltd (UK Ltd — holding company)
    ├── ABLE Music Ltd (UK Ltd — operating company)
    ├── [Future] ABLE Distribution Ltd
    ├── [Future] ABLE Sync Ltd
    └── [Future] any other products
```

Why separate entities:
- Ring-fences liability — if one product has a legal issue it doesn't touch the others
- Cleaner for future investment (investor takes stake in ABLE Music, not the whole Labs)
- Tax efficiency — profits can be managed across entities

**If you're spending significant time in Portugal (NHR regime):**
Portugal's Non-Habitual Resident programme gives you 10 years of heavily reduced tax on foreign-sourced income. As a UK company paying a Portuguese-resident director salary, this can legally reduce your effective tax rate significantly. Get advice from a UK/PT cross-border accountant before moving.

**If you spend time in Dubai (DMCC Free Zone):**
0% income tax, 0% capital gains. With ABLE Labs structured correctly, periods of Dubai residency (183+ days) can shift your tax residency. Combine with Estonia e-Residency for EU business banking if needed.

**The honest take:** Get a good cross-border accountant in Year 2 when revenue is real. Don't over-engineer the structure before you have income. But set up ABLE Labs Ltd now — it costs £50 and gives you the umbrella to operate under.

### What you need immediately
1. ABLE Labs Ltd incorporated (£50, done online at Companies House in 24hrs)
2. ABLE Music Ltd incorporated as subsidiary (or trade as ABLE Labs Ltd initially — simpler)
3. Business bank account: Starling Business (free, instant setup, good API)
4. FreeAgent connected to Starling (automatic transaction import)
5. Accountant: find one who understands tech startups and SaaS. Budget £1,000-1,500/yr.

---

## Part 7: Job Exit Strategy

You earn £60k/yr. You need to replace roughly £4,000/mo net to maintain current lifestyle. As a business owner you have more deductions, so the gross figure is lower — call it £5,000 MRR as the safe exit point.

### The phased approach

**Phase 1: Now to £2,000 MRR (alongside job)**
- Use every evening and weekend hour on ABLE
- Agents handle most of the build work — you're directing, not coding
- Community manager is handling artist relationships during your work hours
- n8n automations mean the business runs during the day without you
- This phase: 100% employed. ABLE is a side project with real traction.

**Phase 2: £2,000–4,000 MRR — negotiate part-time or contract**
- At this point ABLE is generating real income
- Approach your employer: offer to go 3 days/week or move to a contract arrangement
- Many employers prefer this to losing someone — especially if you frame it as "personal project, not a competitor"
- 2 days freed up per week massively accelerates ABLE growth
- This phase: hybrid. Income stable, ABLE growing fast.

**Phase 3: £5,000+ MRR sustained for 3 months — resign**
- This is the number. Not £3k, not £4k — £5k, sustained, for 3 consecutive months
- Give appropriate notice. Leave well. That employer may become a customer, a reference, or a contact who introduces you to someone valuable.
- At this point ABLE covers your living costs plus a small buffer
- You become full-time on ABLE Labs

**Estimated timeline:** 15–22 months from now, assuming consistent execution. Best case (one viral moment, strong channel): 10–12 months.

**The discipline:** Do not resign at £3k MRR. You will regret it. The cushion matters for your health and decision-making quality.

### Exit process (when the trigger is hit)

Don't just resign and disappear. Manage it:

1. Three months before you plan to exit, tell no one at work.
2. Ensure ABLE automations are running reliably for 60+ days.
3. Ensure community manager is fully onboarded and capable of handling artist relationships independently.
4. Brief an accountant on the Portugal NHR application — begin the process while still employed.
5. Confirm your UK address is formally maintained (for company registration and banking).
6. Give your employer 4 weeks notice minimum. Leave the door open.
7. Week 1 post-exit: do not work 14-hour days. This is a reset. Take 10 days to establish the rhythm that will sustain you for years.

---

## Part 8: Digital Nomad Lifestyle Design

The order of markets to operate from, with practical notes:

### Portugal (primary base, recommended)
- NHR tax regime: 10 years favourable tax on foreign income
- Time zone: UTC+0/+1 — perfect for UK business, reasonable for US
- Cost of living: Lisbon £1,800-2,500/mo (rent + food + life). Porto: £1,400-2,000/mo
- Internet: excellent in major cities, variable in countryside
- Community: large remote worker community, growing tech scene
- Visa: as a UK citizen post-Brexit, you need a D8 Digital Nomad Visa (€760 income threshold)
- Best base for long stays — the NHR tax benefit alone is worth it

### Thailand (Chiang Mai or Bangkok)
- Cost of living: £800-1,400/mo with good quality of life
- Internet: excellent in co-working spaces (CAMP, MANGO, Punspace in Chiang Mai)
- Time zone: UTC+7 — morning async, late evenings for UK calls
- Health: excellent private hospitals. Bumrungrad in Bangkok is world-class for your disk treatment
- Visa: Thailand Long-Term Resident Visa (LTR) — new programme, 10 years, requires £40k/yr income proof. Alternatively tourist visa with border runs until LTR qualifies.
- Best for: deep work periods, cost reduction, excellent food, your back (warm weather genuinely helps)

### Dubai
- Cost of living: higher than it looks (£2,500-4,000/mo with any comfort)
- Tax: 0% income tax, 0% capital gains — meaningful at scale
- Time zone: UTC+4 — good for UK and Asia
- Useful for: business meetings, networking in the music/tech space, banking conversations
- Visa: freelancer/remote work visa available. Worth 1-3 month stays per year for network building.

### Colombia (Medellín specifically)
- Cost of living: £700-1,200/mo — exceptional value
- Internet: good in El Poblado neighbourhood
- Time zone: UTC-5 — works well for late UK evenings
- Music scene: Medellín has produced J Balvin, Maluma, Karol G — the independent layer underneath is enormous and growing. Colombia is one of ABLE's two core beachhead markets. Time here is both personal living and active market development. These reinforce each other.
- Visa: 90-day tourist (extendable), Digital Nomad Visa available
- Best for: stretching budget, activating the Colombia beachhead in person, creative energy
- Who to find here: identify 5–10 Medellín-based producers with international credits. Give them free Artist Pro. The producer seeding strategy works doubly well here because Colombian music communities run on personal trust and warm introductions.
- Language note: Spanish is essential for deep relationships. Invest in conversational Spanish before a Colombia stint. Even basic competency dramatically changes how you're received.

### The practical rhythm
3 months Portugal → 2 months Thailand → 1 month Dubai → 3 months Colombia → repeat, adjusting based on what's working

Keep a UK address (family home, registered address service) for banking and company registration. Do not fully cut UK ties until tax residency transition is clean and advised by an accountant.

---

## Part 9: Health Protocol — C5/C6 and Longevity

This is not optional. Your capacity to execute this plan depends entirely on your physical and cognitive function. A bad back month costs you more than a bad revenue month.

### Non-negotiable daily structure

**Morning (before sitting down to work):**
1. Wake. No phone for 20 minutes.
2. Sunlight exposure — 10 minutes outside or by a window. Sets circadian rhythm.
3. Movement sequence (15 minutes, non-negotiable):
   - Cat-cow: 10 reps — mobilises the cervical spine
   - Chin tucks: 15 reps — retracts the head, reduces forward head posture load on C5/C6
   - Wall angels: 10 reps — opens the chest, counteracts screen-forward posture
   - Bird-dog: 10 reps each side — deep spinal stabilisation
   - Dead bug: 10 reps each side — anterior core activation without spinal flexion
   This routine takes 15 minutes. It directly addresses the mechanical loading pattern that aggravates C5/C6. Do it before you open a laptop.
4. Red light therapy: 10 minutes, panel positioned at neck/upper back. Use while doing nothing else — reading, thinking, stretching. This is not a productivity interruption; it's tissue maintenance.

**During the work day:**
- Work in 90-minute blocks maximum. Then stand, walk, or lie down for 10 minutes.
- Set up a standing desk converter. Alternate sitting and standing every 90 minutes.
- Monitor at eye level. If you're looking down at a screen, you are loading your disk.
- No more than 4 hours of continuous screen time without a proper break (walk outside, not just standing).

**Evening:**
- Stop work by 21:00. Non-negotiable.
- No blue light after 21:00 (Night Shift / blue-blocking glasses if you must look at screens).
- In bed by 22:30. Sleep 7-9 hours. This is the highest-ROI health intervention and costs nothing.
- Sleep position: on your back with a pillow under your knees, or on your side with a pillow between your knees. Never on your stomach.

### Treatment track (short term, budget £2,000–5,000)
1. **MRI first** — if you haven't had a recent one, get one privately (£400-600 at Nuffield Health or BMI Healthcare). You need to know the current state of the disc.
2. **Physiotherapy** — not generic NHS physio. Find a specialist in cervical disc issues. 8-12 sessions. Focus on McKenzie Method or DNS (Dynamic Neuromuscular Stabilisation).
3. **Decompression therapy** — spinal traction. Available at specialist chiro/physio clinics. Reduces disc pressure directly.
4. **PRP injection** — Platelet-Rich Plasma. Your own blood, spun down, injected into the disc space. Promotes healing. Available in UK privately: £800-1,500. Good evidence base for disc issues.

### Emerging treatments (2–5 years)
These are in clinical trials now and will likely be available by 2028–2030:
- **Exosome therapy for disc regeneration** — exosomes derived from stem cells injected into the disc space, promoting regeneration of the nucleus pulposus (the gel core that herniates). Phase 2/3 trials in the US and Europe showing strong results.
- **Hydrogel nucleus pulposus replacement** — the herniated disc material is replaced with a biomaterial that restores disc height and function. Less invasive than fusion surgery.
- **Gene therapy** — targeting the genes responsible for disc degeneration. Very early stage, but 10-year outlook is promising.

**Budget for this:** £5,000–10,000 in Year 2 when ABLE revenue is real. The best investment you make.

### When pain flares — the protocol

Pain is information. The response matters more than the pain itself.

**Immediate (same day):**
- Stop the trigger activity. If it's desk work, stop.
- 20 minutes horizontal — lie flat with knees supported. Let the disk decompress.
- Ice or heat on the neck/upper back (whichever gives relief). 15 minutes.
- Do not take anti-inflammatory and keep working. That's suppressing a signal, not addressing it.

**Work protocol during a flare:**
- Shift to voice dictation for written work. Dragon Dictate or Apple Dictation.
- Use Claude for heavy writing loads. Brief it verbally. Review on phone at a comfortable angle.
- Do not push through a flare with willpower. That turns a 2-day disruption into a 2-week one.
- Light movement only — walking is fine. No resistance training during a flare.

**Pain as a decision tool:**
If you've been in pain for 3+ consecutive days, something in your environment is wrong. Ask: How many hours did I sit today? Did I do the morning routine? Am I stressed and not moving? The pain is telling you something behavioural has drifted. Use it as a diagnostic, not a punishment.

### Longevity protocol (build gradually, not all at once)

**Foundation layer (low cost, high impact):**
- Sleep 7-9 hours — the single highest-ROI health intervention. Non-negotiable.
- Strength training 3x/week — protects your spine, improves metabolic health, slows aging markers
- Time-restricted eating (16:8) — not starvation, just eating within an 8-hour window. Strong evidence for longevity markers.
- Sunlight exposure first thing in the morning — sets circadian rhythm, improves sleep quality

**Monitoring layer (£200-500/yr):**
- Oura Ring or WHOOP — tracks HRV (heart rate variability), sleep quality, recovery. Your body's dashboard.
- Annual blood panel: InsideTracker (US/EU available) or Function Health (US). Tracks 100+ biomarkers. You can't improve what you don't measure.
- Continuous Glucose Monitor (CGM): Levels (US) or Supersapiens (EU). 2-week wear tells you exactly how your body responds to food. Worth doing once a year.

**Supplement layer (discuss with doctor — these are research-based, not medical advice):**
- Vitamin D3 + K2 (most UK residents are deficient — especially relevant if travelling to low-sun climates)
- Magnesium glycinate (sleep quality, muscle recovery, hundreds of enzymatic processes)
- Omega-3 (EPA/DHA) — anti-inflammatory, relevant for disc health
- NMN or NR (NAD+ precursor) — longevity research, increasingly mainstream. Bryan Johnson takes this.

**Red light therapy:**
A good red light panel (Mito Red Light, £300-500) used 10 minutes/day on the neck/upper back area has solid evidence for reducing inflammation and promoting tissue healing. Works well paired with your ergonomic desk setup. The protocol: 630-850nm wavelength, 10–15 minutes, 15–20cm from the skin, daily.

### The goal stated clearly
At 50: better resting HRV than you have now. Stronger. Disk managed or resolved. Living on your terms.
At 55: biologically measurably younger. Not a vanity goal — a strategic one. Your decision-making, creativity, and energy compound with your health.

---

## Part 10: Mental Health and Decision Hygiene

This section exists because execution at this intensity without a support framework produces burnout, not success. Building alone is hard. Building alone while managing a physical condition, while still employed, is harder. This is acknowledged directly so you can plan for it.

### The three failure modes to watch for

**1. Decision fatigue spirals**
You make 50 product decisions a day. At peak fatigue, those decisions get worse. The mitigation: make big decisions in the first 90 minutes of the day, before you've processed anything else. Never make a major product or financial decision after 18:00. If you can't tell whether something is a good idea, sleep on it.

**2. Isolation drift**
Building alone, especially while working remotely across time zones, creates a slow erosion of perspective. The signal is when you find yourself deeply certain about something that you haven't tested against another person. Combat this with: one weekly call with someone who understands what you're building (a founder peer, a mentor, a trusted friend who gets the work). Not a therapy session. Just a reality check.

**3. Progress amnesia**
When you're deep in the work, it's easy to forget how far you've come. You compare today's messy progress to the polished north star in your head and feel behind. The mitigation: keep a weekly 5-sentence log of what actually changed this week. Not a journal. Five sentences. "Shipped the fan list view. Had a call with Mia (producer, Manchester). She's bringing 4 artists. MRR hit £480. Pain was manageable." That log is evidence against the feeling that nothing is moving.

### When you hit a wall

A wall is not a sign that the plan is wrong. It is a normal feature of sustained creative and entrepreneurial work. The protocol:

1. Take the rest of that day off. Completely. Not "light work." Off.
2. The next morning, do the movement routine before anything else.
3. Reread Part 0 of this document (The North Star).
4. Write down the one thing that's actually stuck. Not a list — one thing. Then decide: is this a build problem (Claude can help), a business problem (talk to a founder peer), or an emotional problem (walk, sleep, don't open the laptop until you've processed it)?
5. The worst decision you can make at a wall is a major pivot. Do not redesign the product, change the business model, or abandon a strategy while you're in a low state. Those decisions need a high state.

### Decision hygiene rules

- **The 24-hour rule on major decisions.** If it costs more than £500, involves a significant product direction change, or feels urgent, wait 24 hours. Good decisions survive 24 hours. Panic decisions do not.
- **No strategy work after a bad night's sleep.** Use those days for mechanical work: code reviews, email replies, research. Not direction-setting.
- **Weekly review, Sunday evening, 30 minutes.** Review the week's log. Set the single most important thing for the coming week. This takes 30 minutes and prevents drift.
- **Read no competitor news for 90 days at a time.** Nothing useful comes from knowing what Linktree's latest round was or what Beacons shipped last week. You're not in a sprint against them. You're building something different.

---

## Part 11: Tech Evolution — How to Think About the Next 5 Years

### 1 year (2027)
- Claude and competing models are significantly more capable at long-horizon agentic tasks
- Local LLMs approach GPT-4 class performance on a machine like yours
- AI coding agents produce production-quality code with minimal supervision
- Voice interfaces are mainstream — consider adding voice-first features to ABLE admin
- **How to adapt:** Start delegating more complex decisions to agents. The human bottleneck shifts from "doing" to "quality control and direction."

### 2 years (2028)
- Multi-agent orchestration is turnkey — you won't need to custom-build n8n workflows for most things
- AI customer support is indistinguishable from human support for routine queries
- Video generation is good enough for marketing content (your artist case study videos)
- Music AI tools are commoditised — every platform will have them
- **How to adapt:** ABLE's moat is not the AI tools. It's the artist-fan relationship data and the direct connection. Double down on that. Let the AI features become table stakes quickly.

### 5 years (2031)
- Agents can run autonomously for weeks on well-defined tasks
- Physical-digital integration is maturing (AR, spatial computing)
- The number of people making music has tripled due to AI-assisted creation
- Neural interfaces for music creation are in early commercial availability (Neuralink-adjacent)
- **How to adapt:** ABLE's TAM has grown massively. The platform should already be positioned for all independent creators, not just musicians. ABLE Labs is the parent of 5+ products.

### The one thing to never forget
**Platforms that own the relationship win.** Spotify owns the algorithm. Labels own the catalogue. ABLE should own the direct artist-fan relationship — the email addresses, the fan behaviour data, the personal connection. That is the durable asset. Every feature decision should strengthen that ownership.

---

## Part 12: 10 Things You're Not Thinking About

These are the most important ones. Read each one twice.

**1. Your email list is worth more than your platform.**
The artist email list you're building (able_fans) is your most valuable asset — more than the code, the brand, or the features. Every fan email captured is a direct line between an artist and a human being who cares about their music. This must be protected, exported regularly, and treated as sacred. If ABLE disappeared tomorrow, the artists with their fan lists intact still have something. Protect this aggressively.

**2. The Portugal NHR tax regime could save you £20-30k/yr.**
At £200k/yr company revenue, paying yourself properly in Portugal vs. the UK could mean a difference of £20,000+ in tax annually. That compounds significantly. This requires real cross-border tax advice but is entirely legal and used by thousands of UK founders. Do not ignore this.

**3. Max your ISA every year starting now.**
£20,000/yr into a Stocks & Shares ISA (Vanguard FTSE All-World). All gains, all dividends, tax-free forever. At 44 with even 15 years of compounding, this is your financial bedrock alongside the business. If you do nothing else in this document, do this.

**4. Open source the non-core parts of ABLE.**
Open sourcing ABLE's analytics layer, the fan capture widget, or the CTA zone component creates: developer community, brand awareness in the tech world, and potential enterprise/API customers who come inbound rather than requiring outreach. Does not undermine your business — increases it.

**5. The producer network is your growth engine, not ads.**
Music producers work with hundreds of artists. One producer who loves ABLE and features it to their clients is worth £50k of advertising. Build a dedicated producer programme: free Artist Pro for life in exchange for featuring ABLE to their clients. 20 producers, each bringing 10 artists, with 3 converting to paid = 60 paying artists at zero acquisition cost.

**6. Angel investing is a career when your ABLE income is real.**
At £500k–£1M in business assets, deploying 10-20% into early-stage music tech (via Seedrs, Crowdcube, or direct angel deals) does two things: compounds your capital, and gives you an insider network in the industry you're building in. You stop being a founder and start being part of the ecosystem.

**7. Your personal brand is a business asset.**
You are a 44-year-old who is building a music platform using AI agents from scratch, while managing a herniated disk, and living across three continents. That is a compelling story. Documenting this journey on Twitter/X, Substack, or a podcast builds inbound leads for ABLE, potential investor interest, and speaking opportunities. You don't have to be a "content creator." One honest post per week about what you're learning is enough.

**8. Pension contributions at £60k salary are extremely tax-efficient.**
You pay 40% tax on income above £50,270. A £9,730 pension contribution costs you £5,838 after tax relief — you're essentially buying £9,730 in pension for £5,838. Your employer likely matches some of this. Max it while the income is there.

**9. ABLE should have an affiliate/referral programme from day one.**
Artists are community-oriented. Give them a referral link, offer them 1 month free per artist they bring who converts to paid. This creates a self-sustaining acquisition loop that costs you nothing upfront and only pays out when it's already generated revenue.

**10. Leisure time is increasing — you are building in the right direction.**
The 4-day work week is spreading. AI assistance is reducing production barriers in music. The creator economy is not a bubble — it's a structural shift in how humans spend their time and money. In 10 years, the number of active musicians globally will be 3-5x what it is today. You are not chasing a trend. You are building infrastructure for a wave that hasn't fully arrived yet. That timing is exceptional.

---

## Part 13: The Community Manager Role

This hire is not optional — it is structural. You cannot build ABLE and do artist relationships during the work day while employed. This role is the bridge.

### What they do (specifically)

**Artist outreach (weeks 1-8):**
- Research and identify 20 UK-based independent artists per day from TikTok, Bandcamp, SoundCloud
- Send personalised 3-line messages — not templates. Reference a specific track, show, or moment. If they can't do this authentically, they're wrong for the role.
- Track all outreach in Notion. Status: contacted → responded → on call → active → referred
- Respond to inbound artist enquiries within 4 hours during business hours

**Ongoing artist relationships:**
- First point of contact for artists who have questions about their profile
- Recognise the difference between "product support" (escalate to you) and "how do I use this feature" (answer it themselves)
- Flag artists who are doing something interesting with ABLE that could be a case study
- Send a personal check-in to every paying artist once a month. One sentence. "How's the release going?" This is relationship maintenance, not marketing.

**Producer seeding programme:**
- Manage the list of 20 target producers
- Coordinate the free Artist Pro gifting
- Follow up with producers after they've been using ABLE for 2 weeks: "Has it been useful? Any artists you'd want us to reach out to directly?"
- Track producer → artist referrals in Notion

**What they do NOT do:**
- Product decisions
- Financial or commercial decisions
- Technical support (anything involving the product breaking)
- Social media content creation (that's a separate role, later)

### Who they are

Not a generalist VA. Specifically: someone who cares about music, has credibility in the independent music world (even a small amount), and communicates like a human being rather than a brand. They don't need to be a developer or marketer. They need to be trusted by artists.

**Where to find them:**
- Music industry Discord servers
- Ask your first 20 artists if they know anyone
- Job boards: Work in Music, MuseFind, or indeed.co.uk with careful copy
- Music journalism / music blog background is a good signal

### Compensation
Part-time initially. 20 hours/week. £15-18/hr for someone in the UK. £600-720/mo. At £2,000 MRR, this is fully self-funding.

---

## Part 14: The Don't Do List

These are the 12-month restrictions. Not suggestions. Restrictions.

**1. No new product lines before ABLE reaches £5,000 MRR.**
ABLE Distribution, ABLE Sync, ABLE Radio — these are real ideas. They are also distractions before the core product has proven traction. Every hour spent designing ABLE Radio is an hour not spent getting artist 47 to convert to paid.

**2. No investor conversations before 100 paying artists.**
You have nothing to show yet. Investors who talk to you now are not going to invest in what you have — they'll invest in what you promise, and that puts you in a relationship that shapes your roadmap for the wrong reasons. Get to 100 paying artists first. Then have conversations from a position of demonstrated traction.

**3. No major technology stack changes.**
No Next.js rewrite. No React migration. No "let's rebuild this in a proper framework." The current stack (single HTML files, direct editing, Supabase backend) is working and ships fast. The moment you add a build pipeline, you add complexity that will cost 3–4 months. This is a known pattern and you will feel the pull. Resist it until you have a team that can own the complexity.

**4. No conferences or events unless they directly produce artist sign-ups.**
SXSW, ADE, The Great Escape — these are real events where real music industry people go. They are also expensive (travel, time, tickets) and produce almost no ROI for a product at this stage. The exception: an event where you have a confirmed meeting with 3+ producers who have agreed in advance to hear a ABLE pitch. Otherwise, the money goes to product and outreach.

**5. No social comparison spirals.**
Do not read funding announcements for Linktree, Beacons, or Feature.fm. Do not track their product updates. This is not because you should ignore competition — it's because at this stage, reading about competitors is almost always a mood regulation problem disguised as research. Set a quarterly competitor review (30 minutes, structured) and otherwise stay in your own lane.

**6. No working past 22:00 more than twice a week.**
This is not a lifestyle preference. This is a performance decision. Sleep debt accumulates. Decisions made on sleep debt are consistently worse. The work after 22:00 is rarely your best work and it costs you the next morning. The rule is twice a week maximum, and only when something genuinely cannot wait.

**7. No hiring for roles that aren't yet causing pain.**
You don't need a marketing hire, a designer, or a second developer until the absence of those people is visibly costing you. The community manager is needed now — that absence is already costing you. Everything else waits until the absence is painful, not theoretical.

**8. No platform rebuilds or major redesigns based on a single piece of feedback.**
You will hear from one artist who wants ABLE to look completely different. You will have one bad user session where everything feels wrong. Neither of these is a mandate for a redesign. Pattern-match across 10+ artists before any major UX shift.

**9. No spending on tools you don't use within 7 days of signing up.**
The list of "useful tools I'll use when I get to it" is a known budget drain for solo founders. If you sign up for something and don't use it within 7 days, cancel it. No exceptions.

**10. No taking on consulting or freelance work to supplement income during this phase.**
It's tempting when ABLE revenue is small. Resist it. Consulting work is the enemy of ABLE progress. It fills the same creative and strategic hours that ABLE needs. If money is tight, cut expenses — don't add obligations.

---

## Part 15: First 90 Days — Week by Week

This is the most important section in this document. The 5-year plan is directional. This is operational. Zero ambiguity.

---

### Week 1 (Days 1–7)

**Primary focus:** Foundation — legal, financial, and technical infrastructure

**Actions:**
1. Incorporate ABLE Labs Ltd at Companies House. £50. Takes 24 hours online.
2. Open Starling Business account. Same day.
3. Connect FreeAgent to Starling. Configure accounts.
4. Set up Uptime Kuma monitoring on the current ABLE deployment. Takes 30 minutes.
5. Write a 1-page brief for a community manager. Post it to Work in Music and one music Discord.

**Success metric:** Company incorporated. Business bank open. Monitoring live. First community manager applications in.

**Do not do this week:** Do not start building new features. Do not touch the product. Infrastructure first.

---

### Week 2 (Days 8–14)

**Primary focus:** Product confidence — get able-v7.html to 9/10 for the artist critical path

**Actions:**
1. Run the artist critical path yourself end-to-end: land on start.html → onboard → view your profile → go to admin → check fan list. Write down everything that feels wrong.
2. Fix the top 3 friction points you identified. Agents do the build. You direct.
3. Run Playwright smoke tests on mobile (375px) and desktop.
4. Share the profile with 2 people who are not you and watch them use it without guiding them.
5. Set up PostHog on able-v7.html. Install the snippet. Verify events are coming through.

**Success metric:** At least 2 external people have used the onboarding without confusion. PostHog is recording events. No critical bugs on mobile.

**Do not do this week:** Do not outreach to artists yet. The product isn't ready for real feedback until you've fixed the obvious things yourself.

---

### Week 3 (Days 15–21)

**Primary focus:** First real artists — personal network activation

**Actions:**
1. Identify 10 people in your personal network who are musicians or know musicians. Message each one personally. "I'm building something I think you'd find useful. 20 minutes on a call?"
2. Get on 3 calls this week. Record them (with permission). Don't pitch — listen. Ask: "What does your current release process look like? What breaks down?"
3. Set up n8n on your Mac. Connect to Supabase. Build the artist welcome sequence (Day 1, 3, 7 emails).
4. Set up Loops.so. Import the welcome email templates.
5. Brief and interview the strongest community manager candidate from Week 1 applications.

**Success metric:** 3 calls completed. n8n is live and connected to Supabase. At least 1 artist has signed up and gone through the welcome sequence.

**Do not do this week:** Do not spend money on ads. Do not add features based on hypothetical user needs you haven't heard on a call yet.

---

### Week 4 (Days 22–28)

**Primary focus:** First feedback loop — build what week 3 calls revealed

**Actions:**
1. Review the 3 call recordings. Feed transcripts to Claude: "What are the top 3 frustrations these artists expressed? What do they wish existed?" Extract the specific patterns.
2. Build the single most important thing the calls revealed. One thing. Not three.
3. Hire the community manager if you've found the right person. Onboard them this week.
4. Brief the community manager on the outreach strategy. Have them send their first 10 personalised messages to artists.
5. Do your first weekly financial review. What have you spent? What's the burn rate?

**Success metric:** One piece of feedback has been turned into a shipped feature. Community manager is live and has sent first outreach batch.

**Do not do this week:** Do not hire more than one person. Do not change the outreach strategy before it's had 2 weeks to produce results.

---

### Week 5–6 (Days 29–42)

**Primary focus:** Outreach scale — building toward 50 contacted artists

**Actions:**
1. Community manager sends 10–15 personalised messages per day. Track in Notion.
2. You personally get on 2 calls per week with artists who respond. Continue feeding transcripts to Claude.
3. Set up the weekly financial summary n8n flow. Test it.
4. Build the second most important thing from your call feedback (from Week 4 pattern extraction).
5. Reach out to 3 UK-based music producers personally. Not via the community manager — you. These relationships need your credibility, not a junior hire's.

**Success metric:** 50 artists contacted. At least 5 have signed up. 3 producer conversations started.

**Do not do this week:** Do not change the product in response to feedback from only 1–2 artists. Wait for pattern.

---

### Week 7–8 (Days 43–56)

**Primary focus:** First producer seeding — identify and activate 3 producers

**Actions:**
1. From your 3 producer conversations, offer the 2 most receptive ones free Artist Pro accounts. Set them up personally with a 30-minute call.
2. Review PostHog data: where are users dropping off? Which CTAs are getting tapped? Where does the profile scroll end?
3. Brief Claude Code to address the top PostHog drop-off point.
4. Community manager is now running independently on daily outreach. Your job is weekly review of the Notion tracker and unblocking.
5. Write and schedule your first piece of public content about building ABLE. One post on X or LinkedIn. Honest, specific, not promotional.

**Success metric:** 2 producers have live Artist Pro accounts and have been briefed on referring artists. PostHog drop-off point identified and addressed. First public content live.

**Do not do this week:** Do not pitch producers as if you're selling to them. You're inviting them to something you think they'll value.

---

### Week 9–10 (Days 57–70)

**Primary focus:** First paying artists — activating the upgrade moment

**Actions:**
1. Review the artist list. Which active free-tier artists have the most fan sign-ups on their profile? These are your most likely upgrades.
2. Community manager sends a personal check-in to these artists: "You've had [X] fan sign-ups this month — impressive. Let me know if you hit the 100 limit and want to talk about options."
3. Set up Stripe on the ABLE platform if not already live. Test the full upgrade flow end-to-end.
4. Write the upgrade moment copy. When an artist hits 100 fans, what does the UI say? This is the highest-stakes copywriting in the product.
5. Check: do you have a functioning Terms of Service and Privacy Policy? If not, use Genie AI to generate them this week.

**Success metric:** Stripe is live. The upgrade flow works end-to-end. First 1–3 artists have converted to paid (or you have a clear reason why not).

**Do not do this week:** Do not reduce the free tier fan cap prematurely. Let the first artists hit it naturally.

---

### Week 11–12 (Days 71–84)

**Primary focus:** Consolidation and reflection — is the model working?

**Actions:**
1. Review 90-day progress: how many artists signed up? How many are active (logged in within 7 days)? How many converted to paid? What's MRR?
2. Update this document. What did you learn? What needs to change for the next 90 days?
3. Review the community manager's performance. Are artists responding? What's the quality of conversations?
4. Make a decision on the next 90-day primary focus: double down on what's working, or fix what's not working. Don't do both at once.
5. Book your first health review: physio assessment of the C5/C6, or MRI if not recently done.

**Success metric:** Clear picture of what's working and what isn't. Next 90-day plan drafted. Health check booked.

**Do not do this week:** Do not start new initiatives. This week is for understanding what you've built and making a clear-headed decision about what to do next.

---

## Part 16: The Resilience System

What happens if you get sick, burned out, or hit by an emergency? This section exists so that "James is unavailable for 2 weeks" is a solvable problem, not a catastrophic one.

### What continues automatically (zero James input required)
- n8n workflows: artist welcome sequences, churn re-engagement, weekly financial summary
- Loops email campaigns: all triggered sequences continue running
- Uptime Kuma monitoring: alerts go to Slack (but no one acts on them)
- PostHog analytics: data collection continues
- Supabase: database stays live, Stripe subscriptions continue billing
- Stripe: recurring billing runs without anyone touching anything

### What stops immediately
- New feature development
- Producer outreach and relationship building
- Artist support tickets requiring judgement calls
- Social content and community presence
- Financial decisions above £100

### Who covers what (current state and future state)

**Current state (solo founder):**
- Community manager handles artist communication within their brief
- No one handles technical issues
- No one handles producer relationships
- No one handles financial decisions

**Future state (by Month 6):**
- Community manager has a documented FAQ and decision tree for 80% of artist queries
- You have pre-written responses for the most common edge cases, stored in Notion
- Uptime Kuma alerts go to a secondary contact (a trusted tech friend) who can at minimum restart the deployment
- A "break glass" document exists: if James is unreachable for 7+ days, this document tells the community manager what to do, what not to do, and who to call

### The break-glass document (write this by Month 2)

This is a single page in Notion, marked clearly. It contains:
1. How to check if the ABLE platform is running (URL, what healthy looks like)
2. Who to contact if it's down (Netlify support, Supabase support — URLs and account credentials in 1Password)
3. What to tell artists if there's a problem: the exact words to use
4. Which Stripe decisions can wait vs. which are urgent
5. One emergency contact number (someone who understands the business enough to make a judgement call)

**This document protects the business. Write it when things are calm, not when things are breaking.**

### The 2-week absence checklist

Before any planned absence of 7+ days, verify:
- [ ] n8n workflows are running and tested in the last 48 hours
- [ ] Community manager has been briefed on anything unusual happening that week (launches, outreach campaigns)
- [ ] Break-glass document is current
- [ ] Stripe billing is healthy (no failed payments pending intervention)
- [ ] Uptime Kuma is monitoring the live URL
- [ ] Your phone has a note: "If artists email [email address], the community manager handles responses"

---

## Part 17: The 5-Year Millionaire Path

**Year 0 (now): Foundation**
- Incorporate ABLE Labs Ltd
- Max ISA (£20,000 into Vanguard)
- Set up n8n automation and full agent stack
- Deploy £30k into business systematically (see asset allocation table in Part 5)
- Target: first 50 paying artists

**Year 1: Traction**
- ABLE at £3,000-5,000 MRR
- Negotiate part-time or contract at job
- Hire community manager (already done by Month 2)
- Portugal or Thailand for 3-month stretch
- Begin disk treatment (PRP + physio)
- Target: full-time on ABLE

**Year 2: Scale**
- ABLE at £15,000-30,000 MRR
- Fan dashboard live
- ABLE Distribution white-label launched (trigger: 1,000 paying artists)
- First angel investment (£20-30k into 2-3 music tech startups)
- Portugal NHR residency established
- Net worth crossing £300,000 (business value + ISA + savings)

**Year 3: Compound**
- ABLE Labs at £50,000+ MRR across multiple products
- ABLE Sync live
- Serious acquisition conversations begin or Series A prep
- Net worth crossing £700,000
- Health protocol fully operational — biologically improving

**Year 4–5: Freedom**
- Either: ABLE acquired (£3-10M exit on strong product with 50k+ artists) or Series A raised and scaling to 500k artists
- Net worth crossing £1,000,000
- Digital nomad lifestyle fully operational
- Disk treatment completed or ongoing with best emerging tech
- Age 49-50: measurably healthier than age 44

---

## The daily operating principle

You do not need to execute this plan perfectly. You need to execute it consistently.

The agents handle the build. The automations handle the operations. The community manager handles the relationships. Your job is:

1. Make one good decision per day about where ABLE goes next
2. Review your weekly financial summary and act on it
3. Move your body and protect your spine
4. Keep investing in yourself — the longevity protocol is not optional

Everything else is handled.

---

*Review this document every 90 days. Update it as the plan evolves. The goal never changes: maximum freedom, lasting health, money that works for you.*
