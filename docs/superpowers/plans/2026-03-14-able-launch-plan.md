# ABLE Launch Plan — From Where We Are to Live
**Written: 2026-03-14**
**For: James Cuthbert**
**Budget: £3,000**
**Status: Ready to execute**

---

## What this is

A clear, sequenced guide. Not a wall of theory. You read this once, follow Step 1, and then stop. Come back for Step 2 when Step 1 is done. That's the whole method.

You are not behind. The product is good. The code is working. The database is live. The only thing between now and "ABLE is real" is the list below.

---

## Where we are right now

| What's done | Status |
|---|---|
| Artist profile (`able-v6.html`) | Complete — 7 vibes, 4 themes, campaign states, all micro-interactions |
| Admin dashboard (`admin.html`) | Complete — Campaign HQ, fan list, analytics, snap cards CRUD, world map |
| Onboarding wizard (`start.html`) | Complete — 5-step, feel system, identity wiring |
| Landing page (`landing.html`) | Complete — pricing (£0/£9/£19/£49), world map demo |
| Supabase database | **Live** — profiles, fans, clicks, views, snap_cards tables |
| Supabase wiring | **Live** — profile sync, fan capture, click tracking, view tracking |
| Referral tracking | **Live** — "Made with ABLE" footer links ablemusic.co?ref=handle |

**What's missing before real artists can use it:**
1. The files need to be hosted on the internet (Netlify)
2. ablemusic.co needs to point to that hosting (DNS)
3. You need one real artist profile to test end-to-end
4. Magic link auth (so artists own their data, not just localStorage)

Items 1 and 2 are a 30-minute job. Item 3 is yours. Item 4 is Phase 2.

---

## The sequence

### STEP 1 — Deploy to Netlify (you do this, ~20 minutes)

This gets the product live on a real URL.

**What to do:**

1. Go to [netlify.com](https://netlify.com) and sign up with your GitHub account
2. Click **"Add new site" → "Import an existing project"**
3. Connect GitHub — find the `ABLE MERGED` repository
4. Build settings: leave blank (no build command, no publish directory — just root)
5. Click **Deploy**

Netlify will give you a URL like `https://wonderful-artist-abc123.netlify.app`. That's ABLE live on the internet.

**Cost:** £0 — Netlify's free tier handles this easily.

---

### STEP 2 — Connect ablemusic.co to Netlify (~15 minutes on 123reg)

Once Netlify is live:

1. In Netlify: go to **Site settings → Domain management → Add custom domain**
2. Type `ablemusic.co` → Netlify will show you DNS records to add
3. In 123reg: go to your domain → **DNS Management**
4. Add a **CNAME record**: `www` → `[your-netlify-site-name].netlify.app`
5. Add an **A record** (or ALIAS): `@` (root domain) → Netlify's load balancer IP (Netlify shows this)
6. Click save on 123reg — DNS propagation takes 5–30 minutes

**Netlify also gives you free SSL** (HTTPS) automatically. No cost.

**After this:** ablemusic.co loads ABLE. That's your domain live.

---

### STEP 3 — Test with your own profile (~30 minutes)

Before showing anyone:

1. Go to `ablemusic.co/start.html` — run through the wizard as an artist
2. Set up a real profile: your name, a test vibe, accent colour, one CTA
3. Open `ablemusic.co/admin.html` — check Campaign HQ, fan list, analytics load
4. Share `ablemusic.co/able-v6.html` with one trusted person and ask them to sign up as a fan
5. Check your admin fan list — they should appear within seconds

If that works end-to-end, the product is real.

---

### STEP 4 — Find your first 5 artist beta users (~1 week)

Not 500. Five. Specifically, five independent artists who:
- Are active on Instagram or TikTok
- Don't have a great link-in-bio right now (Linktree/Beacons)
- Are releasing music in the next 3 months

Where to find them:
- Your own network first — who do you already know who makes music?
- Instagram: search `#independentartist #newmusic` in your city/genre
- Reddit: r/WeAreTheMusicMakers, r/singing, r/guitarists
- Twitter/X: music production communities
- Local gig listings: who's playing small venues near you?

What to say:
> "I've built a free tool for independent artists — better than Linktree, specifically for music. You get a real profile page, fan email capture, and your own world map of where your listeners are. It's free. I'd love you to be one of five artists I test it with before we launch publicly. 20 minutes to set up."

**Goal:** 5 real profiles, real data, real feedback. Not revenue yet. Proof that artists want this.

---

### STEP 5 — PostHog analytics (I do this, ~20 minutes)

Once the site is live I'll add PostHog to all pages. This gives you:
- How many people land on each artist's page
- Where they drop off
- Which CTAs get clicked most
- Session replays (watch exactly what users do)

Free up to 1 million events/month. You'll see your first artist's behaviour in real time.

**Cost:** £0 (free tier is massive)

---

### STEP 6 — Email onboarding sequence via Loops.so (~2 hours to set up)

Loops.so is what sends emails when an artist signs up. It's purpose-built for SaaS.

**Three emails to write:**

1. **Welcome (sends immediately):**
   > "You're in. Your ABLE profile is live. Here's your link: [url]. Share it anywhere. We built this for artists like you."

2. **Day 3 — first check-in:**
   > "How's your profile looking? If you haven't set a release date yet, it takes 30 seconds — and your page shifts into pre-release mode the moment you do."

3. **Day 7 — first fan captured:**
   > "Someone signed up to your list. [Name] from [source]. This is how it starts."

**Cost:** £0 on Loops free tier (1,000 contacts). Move to paid (~$30/mo) when you hit that.

---

### STEP 7 — Stripe Connect setup (~1 hour)

This enables Support Packs (artists can receive direct payments).

1. Create a Stripe account at stripe.com
2. Enable **Stripe Connect** — this lets you onboard artists as sub-accounts
3. In admin.html: there's already a Support Packs section — it just needs your live Stripe Connect credentials
4. Set ABLE's cut: **0%** (confirmed product decision — artists keep everything in v1, ABLE earns on subscriptions not transactions)

**Cost:** Stripe takes ~1.4% + 20p per transaction (EU cards). That's their fee, not yours.

---

## Budget allocation (£3,000)

| Item | Cost | When |
|---|---|---|
| Netlify Pro (if needed for custom headers, functions) | £0–£15/mo | After first 100 artists |
| Loops.so email | £0 free → £30/mo | When 1k+ contacts |
| PostHog | £0 free | Now |
| Supabase | £0 free → £20/mo | After significant usage |
| Stripe Connect | 0% cut, Stripe's fee only | From day 1 |
| Domain renewal (ablemusic.co) | ~£15/yr | Yearly |
| First paid marketing (targeted Instagram ads to artists) | £200–£500 | After beta validation |
| Design assets (if you want professional photos/videos for landing) | £200–£500 | Optional |
| Legal (simple T&Cs + Privacy Policy for GDPR) | £100–£300 via lawyer or termly.io | Before public launch |
| **Buffer / unexpected** | £1,500+ | Holds |

**The honest truth:** You don't need to spend most of this to get to 50 paying artists. The product is built. Spending money on ads before you have product-market fit is waste. Hold the budget until you have 20 real artists actively using it, then amplify what's already working.

---

## Social media strategy (safe approaches only)

### What we CAN do right now (no scraping, no API abuse):

**Spotify Artist API (official)**
- ABLE can read an artist's public Spotify data: monthly listeners, top tracks, recent releases
- This populates their profile automatically (so artists don't have to manually enter this)
- Requires: Spotify Developer account (free), artist grants ABLE access via OAuth
- I can build this in ~2 hours when you're ready

**Bandsintown API (official)**
- Auto-populates the Shows section from an artist's existing Bandsintown gig list
- Requires: Bandsintown API key (free for independent use)

**Instagram Basic Display API**
- Artists can connect their Instagram so their latest posts appear as snap cards
- Requires: Meta Developer account, Facebook app review (takes ~2 weeks)
- Build this for Phase 2 — it's a meaningful retention driver

**What NOT to do:**
- Scraping artist profiles from other platforms — violates ToS, legal risk
- Mass DM campaigns — platform bans, reputational damage
- Buying followers/email lists — worthless data, GDPR risk

### Organic social content strategy (what actually works):

1. **Show the product working** — screen-record an artist setting up their profile in 2 minutes. Post this on Instagram/TikTok. No voiceover needed, just the product being beautiful.

2. **Amplify your beta artists** — when an artist uses ABLE, post about them on your account: "This artist just launched on ABLE. Their page: [link]." Artists repost this. Their followers see ABLE.

3. **Music community Reddit** — post genuinely helpful things in r/WeAreTheMusicMakers. When relevant, mention ABLE. Don't spam. One genuine post per week.

4. **ProductHunt launch** (Phase 2, when you have 20+ active profiles) — coordinate a launch day with your beta artists each posting about it on the same day. This can get you 500+ signups in 24 hours.

---

## CRM enhancements already in the product (or easy to add)

**Already live:**
- Fan capture with GDPR double opt-in
- Fan source tracking (Instagram, TikTok, direct, QR, email)
- Click tracking (which CTAs, when, from where)
- View tracking (page views, source attribution)
- Fan list in admin with confirmed status

**Easy to add next (highest ROI):**

1. **Fan lifetime value** — show admin how many shows a fan has attended, how many releases they've been notified for. Simple count in localStorage, big signal.

2. **Profile completeness score** — admin shows "Your profile is 60% complete. Add a release date to unlock pre-release mode (+20%)." This drives artist engagement without them needing to ask.

3. **First fan notification** — when an artist gets their very first fan sign-up, a push notification or email fires: "Your first fan just joined your list." This moment matters. Make it feel real.

4. **Weekly digest email** — every Monday, artists get: "3 new fans this week. Your top CTA: [label]. You've been seen [n] times." Simple, motivating, builds habit.

5. **Artist share card** — one tap in admin generates a share image: "I'm on ABLE. Come find my music: ablemusic.co/[handle]" — pre-sized for Instagram stories, Twitter, LinkedIn.

---

## What the other tab is building right now

The second session is actively building UI enhancements to admin.html and able-v6.html. Recent commits include:
- Full snap cards CRUD in admin
- Section reordering with ↑↓ buttons
- Inline add-moment form
- Inline feel picker
- Section visibility toggles based on content

**Don't worry about conflicts.** We're working in separate areas. I commit after every task.

---

## The investor story (when you're ready)

When you have 20 real artists using ABLE and 200 fans captured across those profiles, the pitch becomes:

> "Independent artists spend £15–50/mo on Linktree, Bandsintown, Mailchimp, and Shopify link tools separately. ABLE replaces all of them for £9/mo and adds fan capture, a world map, and direct payment collection with 0% ABLE cut. We have [n] artists in beta, [n] fans captured, [n]% week-on-week growth. The product is complete. We're raising to acquire artists."

The world map alone is a visual that investors don't forget. The 0% cut positioning is genuinely different. The "artists keep everything" angle matters to the press.

---

## Your next action (just one thing)

**Right now: Step 1 — deploy to Netlify.**

Go to netlify.com. Connect GitHub. Deploy. It takes 20 minutes and when it's done, ABLE is live on the internet.

Come back here when that's done and we'll do Step 2 (domain).

Everything else waits until the product is live.

---

*This plan lives at `docs/superpowers/plans/2026-03-14-able-launch-plan.md`*
*Update it after each step is complete.*
