> **REFERENCE** — This file informs product, design, and build thinking but does not override the v6 authority chain. See `docs/v6/00_AUTHORITY_ORDER.md` for precedence rules.

---

# ABLE — Master Plan
**Written: 2026-03-13. Informed by: all project docs, 12 competitor screenshots, competitive analysis.**

---

## A note before the plan

Most product plans are lists of features arranged in priority order. This one is different. Before we talk about what to build, we need to be honest about what we've seen from the competition, what the research actually tells us about artists and their behaviour, and where the genuine opportunity lives. The features follow from the understanding. Get the understanding wrong and the roadmap is just noise.

---

## 1. What the competition shows us

After looking at every major competitor, here is the honest picture:

**Linktree** has won the generic link-in-bio category. They have 70M+ users and a brand that every creator knows. They are not a music product — they are a universal utility, like a phone contact card. Artists use them because everyone does, not because they love them. The design is generic by design. It works for a tattoo artist, a fitness influencer, and a DJ equally well — which means it works perfectly well for none of them. Artists use Linktree the same way they use Excel: it does the job, nobody gets excited about it, and they will switch the moment something better and equally easy exists.

**Bandcamp** is the gold standard nobody talks about enough. Their homepage stat — "Fans have paid artists $1.69 billion" — is the most powerful sentence in music tech. It's specific, it's honest, it frames everything around what matters: money reaching artists, not platform valuation. Their design is functional and slightly austere, but their philosophy is perfect: the relationship is between the fan and the artist, and Bandcamp's job is to get out of the way and take a fair cut. This is the spirit ABLE should aspire to, applied to the link-in-bio context.

**Patreon** has the right emotional framing — "Creators. Fans. Nothing in between." — but they've drifted upmarket toward high-earning creators and away from emerging musicians. Their pricing and positioning is now built around people making $10k+ per month. The independent artist earning £18k/year from music doesn't feel at home there.

**Spotify for Artists** is sophisticated and beautiful, but it exists to serve Spotify's interests. Artists use it because they have to, not because it gives them power. Everything you build there belongs to Spotify. When they change the algorithm, you have no recourse.

**Feature.fm** is the closest thing to what ABLE wants to be — fan data ownership, smart links, music-first. But it feels like a SaaS tool built by engineers who understand the market but don't love the music. The copy is functional. The design is clean but cold. There's no emotional reason to choose it over the alternatives.

**Stan.store** leads with the shopping/creator economy angle. Zero transaction fees. "All-in-one creator store." This works for YouTubers selling digital products. It's wrong for musicians. A musician's relationship with their audience is not a commercial transaction — or shouldn't feel like one, at least on first contact.

**ToneDen** has effectively pivoted away from music entirely. They now describe themselves as "where brands grow." The music vertical they used to serve is now an afterthought. This is an opportunity.

**SubmitHub** solves a real and specific problem (getting music to playlist curators and blogs) very well. It's functional, honest, and artists trust it precisely because it doesn't oversell itself. ABLE should be allies with SubmitHub, not competitors. Integration is the right move.

**The gap, stated plainly:** There is no product that combines a beautiful, artist-identity-first public profile with campaign-state awareness, genuine fan data ownership, UK-appropriate pricing, and an emotional register that creative people with depth actually respond to. That is the gap ABLE fills.

---

## 2. The three users — who they actually are

### The Artist

The artist that ABLE is built for is not a pop star and is not a hobbyist. They are somewhere in between: serious about their music, releasing regularly, building an audience slowly and genuinely, probably earning between £8k–£25k per year from music (with much of that from live shows), and deeply suspicious of anything that feels like it's trying to commercialise their relationship with their audience.

Their Myers-Briggs breakdown (from the COPY_AND_DESIGN_PHILOSOPHY doc) tells us something important about how to design for them: the majority are introverted feelers (INFP, INFJ, ISFP) who make decisions based on whether something *feels right*, not on feature checklists. They will read the copy on your landing page and know within three sentences whether it was written by someone who understands them. They have extraordinary sensitivity to inauthenticity.

What they want from ABLE, in order of priority:
1. A page that looks like them, immediately, without a design degree
2. To know that the people who found them can find them again (fan email ownership)
3. To not feel like they're running a business every time they log in
4. Clarity on what's actually working (simple, honest analytics)
5. Tools to do the things they're already doing but better (promoting releases, selling tickets, selling merch)

What will make them leave: if ABLE starts to feel like Patreon (too monetisation-forward), if the language shifts to "grow your audience" and "maximise conversions," if the data is used in ways they didn't consent to, or if the platform changes the rules in ways that disadvantage them.

**The genre split matters.** A folk singer-songwriter and a techno DJ have radically different aesthetics, different relationships with their audience, different comfort with technology, and different reasons to use ABLE. The 7-genre vibe system in VISUAL_SYSTEM.md is the right answer to this — but it needs to extend beyond just visual styling. The copy, the CTA language, the default section order, should all flex by genre. A folk artist's page should lead with "Listen" and feel warm. An electronic artist's page should feel minimal and confident. This is a long-term build but the architecture should allow for it from day one.

### The Fan

The fan who arrives at an ABLE page came from somewhere: a reel, a story, a recommendation, a gig poster QR code. They are already interested — ABLE didn't have to convince them. The job is not to convert them but to *not waste their arrival*.

What the fan wants:
1. To find the thing they came for quickly (the music, the tickets, the merch)
2. To feel close to the artist without it feeling curated or corporate
3. A way to stay connected that doesn't require following another social account (email is still the best tool for this, which is why fan email capture is the second most important thing ABLE does after the profile page itself)
4. The sense that being an early fan means something

What ABLE should never do to a fan: make them feel like a number in a dashboard. The fan email list should feel, from the fan's side, like a private channel between them and the artist. Every broadcast the artist sends should feel like it was written to them personally.

The fan journey over time:
- **Discovery**: Arrives from social media. Sees the artist's page. Impressed (or not). Clicks the primary CTA (streams the music, watches the video).
- **Capture**: Signs up to the email list. The moment this happens, the fan relationship begins.
- **Depth**: Buys a support pack. Follows on Spotify. Buys a ticket. Starts showing up at gigs.
- **Superfan**: Buys merch without being asked. Shares the artist's page. Joins the Launch Squad. Tips in the Room.

ABLE's job is to make each step on this journey feel natural, never pushed.

### The Freelancer

The producer, mixing engineer, videographer, photographer. Their needs are different enough that a fully separate product concept is warranted, but their entry point into ABLE is elegant: they get credited on a release snap card, someone clicks the credit, and lands on their ABLE freelancer profile. Growth by association, not by marketing.

What the freelancer wants:
- A professional profile that looks credible to artists considering hiring them
- Credits that are verified and linked (not self-reported vanity)
- A rate card and portfolio without having to maintain a Squarespace site
- To be found by the right artists, not to hustle for every project

The freelancer product is currently secondary to the artist product, but it's architecturally important: it creates a second user type that brings credibility to the platform (real industry professionals vouching for it with their presence) and a built-in growth loop (artists credit freelancers, freelancers join, freelancers recommend ABLE to other artists they work with).

---

## 3. The product hierarchy — an honest restatement

From PRODUCT_HIERARCHY_AND_TRUST.md, the tiers are clear. Here's the honest version with research-informed additions:

**Must be immaculate (Tier 1):**
The profile page, the fan email capture, and the CTA conversion. These three things are the entire product for most artists for the first six months. They don't care about analytics, CRM, or broadcasts yet. They want a page that looks great and a way to capture the people who find them. If these three things aren't perfect, nothing else matters.

One thing the existing docs understate: **page speed is part of Tier 1.** An artist sharing their ABLE link in an Instagram caption needs it to load in under two seconds on a 4G connection. Every millisecond of load time is a lost fan. This means: no heavy JavaScript frameworks, no third-party scripts that block rendering, no large unoptimised images. The current single-HTML-file architecture is actually correct for this reason. Keep it that way for as long as possible.

**Grows retention (Tier 2):**
Analytics, the fan list, profile editing, integrations. Artists upgrade when they start seeing data they care about. The key insight from the competition: **Spotify for Artists is the benchmark for what artists expect from analytics.** They're used to seeing listener counts, stream counts, listener geography. ABLE's analytics need to feel at least as sophisticated as what they get for free from Spotify — but focused on *what they own* (fan email clicks, CTA conversions, support pack revenue) rather than what they don't (streams, saves).

**Builds the moat (Tier 3):**
The superfan system, support packs, campaign states, broadcasts, Rooms, Launch Squad, credits system, Artist Recommendations. These are the features that make ABLE irreplaceable. An artist who has 600 email subscribers, three support pack tiers, and has run two Launch Squad campaigns is not going to switch to Linktree. This is where loyalty becomes advocacy.

---

## 4. Competitive positioning — the single honest sentence

ABLE is not trying to beat Linktree at being a link-in-bio tool. ABLE is making Linktree irrelevant for the specific audience of serious independent musicians by being the first product that treats the artist-fan relationship as the product itself, not as a feature.

The positioning statement (internal, not marketing copy):
> *ABLE is what you use when you stop thinking of your link-in-bio as a list of links and start thinking of it as the front door to your relationship with your audience.*

---

## 5. Design system — what research adds to the existing docs

The VISUAL_SYSTEM.md and COPY_AND_DESIGN_PHILOSOPHY.md are strong. Here's what looking at the competition adds:

**On colour:** Every competitor is either dark-and-generic (Linktree green, Feature.fm teal) or light-and-corporate (Patreon white, SubmitHub white). Nobody is doing the warm dark luxury that the ABLE design DNA calls for. Amber on navy is genuinely differentiated. The addition of deep red for urgency states is the right call — it means something only when it appears. Don't let it creep into decorative use.

**On typography:** Barlow Condensed is already the right choice. Looking at the competitors, none of them use a condensed display face — they all default to the same humanist sans-serifs. This is a real differentiator. Make the artist name bigger and more confident. Make the section headers more editorial. The typography is where ABLE looks and feels different from everything else in the market.

**On empty states and loading states:** This is where trust is built or lost. Bandcamp handles empty states beautifully — they feel like an artist who hasn't uploaded yet, not a broken page. ABLE needs to design its empty states with the same care as its populated states. An artist whose Spotify isn't connected yet shouldn't see a broken section — they should see an elegant placeholder that makes the connection obvious and easy.

**On the onboarding flow (start.html):** The 90-second wizard concept is correct and validated by every competitor's approach. Linktree gets you set up in 60 seconds. Beacons in 90. Feature.fm takes longer. The benchmark is: an artist should see a page that already looks like them before they've made a single design decision. The genre vibe picker is the key moment — it's where ABLE differentiates. The moment an artist selects "Indie / Alternative" and sees the Space Grotesk font and muted sage accent appear, they feel understood. That feeling is the conversion.

---

## 6. Copy strategy — applied by touchpoint

### Landing page
The headline "When they click, be ready." works because it captures the core insight (the page knows what moment it is) without selling a feature. The sub-copy "Your ABLE page knows what's happening — a new release, a show tonight, or just you as you are. One link that's always the right one." is honest and specific.

What the landing page needs to convey, in order:
1. This was made for musicians, not "creators" (establish identity immediately)
2. It adapts to what's happening in your career (the campaign states concept, shown in the interactive demo)
3. Your fans sign up with their email — you own that list forever (the trust-builder)
4. It looks like you, not like a template (the genre vibe system)
5. It's free to start (remove the barrier)

The interactive phone demo on the landing page is the right approach — it shows all five of these things without a word of explanation. Prioritise making that demo feel alive and real over any amount of copy.

### Onboarding wizard (start.html)
This is the highest-stakes copy on the platform. An artist who abandons the wizard is lost, probably forever. The wizard copy needs to:
- Feel like a conversation, not a form
- Never use the word "step" (it sounds like work)
- Ask questions that feel like they matter ("What do you make?" not "Select genre")
- Show progress without a progress bar (progress bars are anxiety-inducing; instead, each screen should feel like a natural next question)
- Have a clear "I'll do this later" escape for every optional field

**Specific wizard copy suggestions:**
- Screen 1: "Who are you?" → "What do you make?" with genre options as visual tiles, each rendered in its own font and accent colour
- Screen 2: "What colour feels right?" → show swatches based on genre suggestion, with real-time preview of the page updating
- Screen 3: "What's happening right now?" → Pre-release / Just released / Playing shows / Just being me — these become the campaign state presets
- Screen 4: "Where can people find your music?" → paste a Spotify link, or add links manually
- Screen 5: "Here's your page." → show the live preview, give them their URL (`able.fm/yourname`), put "Share this" as the primary CTA

### Artist profile (able-v3.html)
First-person throughout. The page is the artist speaking, not a platform introducing them. The bio field should be labelled "In your words" in the editor. Every piece of text on the page should be something the artist would say themselves.

Specific copy improvements needed:
- The fan capture section currently says "Stay close." which is right. The supporting text should be "I'll only reach out when something's actually happening." This removes the fear of being spammed.
- The events section header should be "Shows" — warmer than "Events."
- The music section header should be "Listen" — more inviting than "Music."
- The "Out Now" hero tag should also offer: "Dropping [Date]" (pre-release), "On Tonight" (gig), "Latest" (profile mode).

### Artist dashboard (admin.html)
The dashboard should feel like a well-organised backstage, not a SaaS control panel. Every label should reflect what the artist actually cares about:
- "Views" → "People who came to your page"
- "Conversions" → "Taps on your CTAs"
- "Subscribers" → "People who signed up"
- Campaign states: shown as the artist's current situation ("You're in pre-release mode for [Release Name]. Drops in 12 days.") not as a status toggle.

---

## 7. The growth model — how ABLE gets artists without a marketing budget

The organic growth loop in DISCOVERY_AND_GROWTH.md is right. Here's how to sequence it:

**Phase 1 (now): Artist brings fans, fans stay.**
Every artist who signs up and uses ABLE shares their link in their bio. Every fan who clicks that link sees an ABLE page. Some of those fans, who are themselves musicians or know musicians, notice the page and wonder "how did they do this?" — the "Powered by ABLE" credit on free-tier pages is the answer. This is the Linktree / Typeform model and it works.

**Phase 2 (3-6 months): Artists bring other artists.**
The "Artists I'm Digging" recommendation feature is the single most elegant growth mechanism in the roadmap. When artist A recommends artist B, artist B gets a notification and a badge. Artist B signs up because being recommended feels like recognition, not like a marketing pitch. This is the right way to grow in a community that values authenticity — recognition, not acquisition.

**Phase 3 (6-12 months): Credits bring freelancers, freelancers bring more artists.**
Once the credits system is live and working, the freelancer growth loop begins. A mixer credits on a release, the credit links to their profile, artists find them, artists book them, those artists join ABLE because their collaborators are on it.

**Phase 4 (12+ months): Ablers.**
The referral programme makes sense once there's a meaningful Pro subscription base. A 20-30% commission on recurring subscriptions is generous enough to generate genuine advocacy from music educators, bloggers, and artist managers. But launch this too early and you attract the wrong kind of advocate (people who promote anything for commission) rather than the right kind (people who genuinely use and love the product).

**What not to do:** paid acquisition, influencer campaigns, Product Hunt launches, cold outreach to artists. These all attract the wrong kind of user (people who joined because of a campaign, not because ABLE solved their problem). The users who will stick and pay and advocate are the ones who found ABLE because another artist they respect was using it.

---

## 8. The trust architecture — building credibility from zero

This is the hardest part of being a new platform. Artists have been burned before: platforms that promised and disappeared, terms that changed, data that was used without consent. The trust signals ABLE needs to establish, in order:

**Signal 1: Data portability, stated clearly and kept.**
"Your fan list is yours. Export it as a CSV any time. Even if you leave." This should be on the landing page, in the onboarding, and in the dashboard. It should be so easy to export that artists almost do it as a test — and when they do, they see it works perfectly, and they trust ABLE more, not less.

**Signal 2: Honest numbers everywhere.**
No "10,000+ artists" until it's true. No inflated vanity stats. The proof strip on the landing page should only show numbers that are genuinely verifiable. Consider showing live numbers (artists currently live on ABLE) rather than cumulative numbers that can age badly.

**Signal 3: The founder's face.**
This is in the docs and it's correct. An about page with a real person who cares about music, a real story about why this was built, a real face. This is worth more than any press mention. Artists are people-readers — they will trust a person before they trust a company.

**Signal 4: Industry partnerships.**
Help Musicians UK is the right first partnership. They are trusted by the music community in the UK, they serve exactly the artist profile ABLE is built for, and a partnership with them is an immediate signal that ABLE is serious and well-intentioned. The Featured Artists Coalition (FAC) is the second. These partnerships don't need to be commercial — a presence in their newsletter, a resource in their tools page, is enough to start.

**Signal 5: A public roadmap.**
"Here's what we're building. Here's what we shipped. Here's what we decided not to build and why." Artists who can see the product being made in public trust the people making it. A monthly changelog, honest and specific, builds more loyalty than any marketing campaign.

---

## 9. The fan experience vision

The fan journey on ABLE currently ends at the artist's profile page: they sign up, they get a confirmation, they might come back when the artist sends a broadcast. The vision is bigger than this.

The **fan dashboard** (fan.html — not yet built) is where the fan experience expands. It should show:
- The artists they follow on ABLE, in a feed ordered by activity (new release, new show, new snap card)
- "Shows near you" — events from artists they follow, filtered by their location
- "You might like" — artists recommended by artists they already follow
- Their "fan since" date for each artist — gamifying loyalty without making it feel like a game
- Their superfan badges (where they've earned them)

The fan dashboard should not look like a social network. It should look like a well-curated newsletter that happens to be visual — not a scroll, not an algorithm, but a personal digest of the artists they actually care about.

The key insight the competition misses: **fans don't want to follow more artists, they want to go deeper with the ones they already love.** ABLE's fan experience should be built around depth, not breadth.

---

## 10. The monetisation model — designed for real artists

Most independent UK artists earn under £20k per year from music. Many earn under £10k. The pricing model must be designed around this reality.

**Current tiers (as documented in PLATFORM_STRATEGY.md):**
- Free: £0/mo — enough to be useful, not enough to be complete
- Artist: £9/mo — the right upgrade price for an active artist
- Artist Pro: £19/mo — for artists with a real fanbase to look after
- Label: £49/mo — not the immediate focus

**What makes artists upgrade:**
Research from comparable B2B-to-creator products (Substack, ConvertKit, Patreon) consistently shows the same trigger: artists upgrade when they feel they're leaving something valuable on the table by not upgrading. For ABLE, the specific moment is:
- "You've had 87 fan sign-ups this month. Your free plan limit is 100. Upgrade to keep capturing." (fan capture gating)
- "Your release dropped 3 days ago. Here's what your top fans clicked — upgrade to see the full analytics." (data tease)
- "3 of your fans spent over 90 seconds on your page. Superfan mode would tell you who they are." (superfan tease)

These are not dark patterns — they're honest value propositions. The artist genuinely gets more by upgrading. The framing is about what they *gain*, not what they *lose*.

**The gold lock pattern** (already in CLAUDE.md) is correct: Pro features show a blurred preview with a specific value proposition overlay. "See the full picture — upgrade to Artist" is weaker than "You have 23 fans in Manchester. Upgrade to see who they are and send them a message before your show." Always specific, always the exact value, never generic.

**What should always be free:**
The profile page, the basic fan capture (up to 100), the ability to export your data, the QR code, the genre vibe system, basic analytics (7-day views and clicks). If these aren't free, artists won't join. The free tier is the marketing.

---

## 11. The 90-day sprint — what to build right now

Given everything above, here are the 20 most important things to build or improve in the next 90 days, in priority order:

**Weeks 1-2: Get the core right**
1. **start.html wizard** — refactor to match the new copy philosophy. Questions feel like a conversation. Genre picker shows a live preview of the page updating. This is the first impression for every new artist and it's currently underdeveloped relative to the profile page.
2. **Fan email capture** — add to able-v3.html properly. The fan capture section needs to actually capture emails (connect to Supabase or a simple Netlify form + Mailchimp). Right now it's visual-only.
3. **Page speed audit** — measure load time on 4G. Remove any render-blocking resources. Target under 2 seconds first meaningful paint on mobile.
4. **Analytics basics** — views, clicks, sign-ups as real numbers in admin.html, not placeholders. Even localStorage-based is fine for now. Artists need to see that their page is working.

**Weeks 3-4: Make the page feel alive**
5. **Campaign states working end-to-end** — artist sets a release date in admin.html, the profile page switches to pre-release mode automatically, flips on release day. This is the feature that makes ABLE feel intelligent, not just beautiful.
6. **Spotify connection** — pull in artist name, photo, top tracks. This alone saves the artist 10 minutes of setup and makes their page look real immediately.
7. **Social share card** — auto-generated OG image for each artist page using their accent colour, name, and photo. Every shared link should look like it was designed.
8. **Mobile profile QR code** — downloadable from the dashboard. Simple, coloured, works.

**Weeks 5-6: Build the distribution mechanics**
9. **"Artists I'm Digging"** — the recommendation section on the artist profile. Up to 5 artists, with optional one-line "why." Non-ABLE artists get a plain link; ABLE artists get a linked badge. This is the most powerful organic growth feature and it's a 2-day build.
10. **Bio writer (Claude API)** — artist pastes their Spotify URL or answers three questions, Claude generates three bio options in different tones (warm, minimal, editorial). One-click to use. Massive perceived value, almost zero cost.
11. **Caption pack on snap card publish** — when an artist publishes a snap card (new release, new show), ABLE instantly generates three caption options for Instagram, TikTok, and Twitter. Pre-filled with their ABLE link.
12. **Referral code** — every artist gets a unique referral URL (able.fm/ref/[code]). Tracked in their dashboard. Basic affiliate setup without the Abler programme initially.

**Weeks 7-9: Deepen the fan relationship**
13. **Fan list in dashboard** — every signed-up fan visible with: name/email, join date, source (which CTA they clicked), number of visits. Simple table. Exportable as CSV. This is the feature that justifies the Artist tier.
14. **Broadcast email** — artist writes a message in their dashboard, sends to their fan list. Could be as simple as connecting to Mailchimp/Brevo API initially. The artist doesn't need to know or care what the backend is.
15. **Support packs** — the artist can set up 1-3 support tiers with a Stripe payment link. Fans see a "Support" section on the profile. This is the first moment ABLE becomes a direct revenue source for artists.
16. **Credits on snap cards** — "Produced by / Mixed by / Photography by" fields on each snap card. If the credited person has an ABLE profile, it links. If not, it's a plain name. The foundation of the freelancer discovery layer.

**Weeks 10-12: Polish and trust**
17. **Artist vibe picker in onboarding** — make the 7-genre system visual and live-preview in start.html. The moment this works properly, onboarding completion rates will increase significantly.
18. **About page with founder story** — able.fm/about. Real writing, real photo, real reason this was built. This is more important than most people think.
19. **Public roadmap / changelog** — able.fm/changelog. A simple static page updated monthly. Shows momentum. Builds trust. Gives artists a reason to come back.
20. **Help Musicians UK partnership outreach** — this is a relationship, not a feature, but it belongs in the 90-day plan. A presence in their tools directory is worth more than any paid campaign.

---

## 12. Things the docs have right that need protecting

A few things in the existing documentation are so good they need to be protected from feature creep and scope expansion:

**The single accent colour system.** One artist colour, applied everywhere. It's the most powerful design idea in the product. Don't let anyone add "accent colour 2" or gradient options. The constraint is the feature.

**The CTA hierarchy.** Hero (max 2) → Pills (max 4/6) → Section (max 2). This hierarchy is correct and based on real conversion research. Never add a fourth zone or raise the maximums. Every time someone wants to "add one more link to the hero," the answer is no.

**The copy register.** The words ABLE never uses are as important as the words it does use. Build a lint check into the admin.html text editor that highlights banned phrases: "monetise," "grow your audience," "content creator," "going viral." This sounds extreme but the consistency of voice is what makes ABLE feel like a brand rather than a feature set.

**The anti-social-network principle.** ABLE is not building a feed, an algorithm, or a follower count. Every feature proposal should be checked against this. The moment ABLE starts surfacing "suggested artists for you" based on follower counts, it has become a worse version of something that already exists.

---

## 13. What the founder's docs get right — and where to push harder

The vision in these docs is genuinely good. The "Artist Before Label" framing is correct and emotionally resonant. The product hierarchy is the right way to think about build order. The copy philosophy is sharp.

Where to push harder:

**The fan experience needs more ambition.** The docs focus almost entirely on the artist. The fan experience — what happens after the sign-up, how the fan grows to become a superfan — is underdeveloped. The fan dashboard is mentioned but not designed. This is the second half of the product and it deserves as much thought as the artist profile.

**The onboarding wizard is underweighted.** It's listed as "ACTIVE — edit this" in CLAUDE.md but there's very little specific direction on how it should feel and what it should do. The wizard is the most important sales moment in the entire product. A new artist who doesn't complete the wizard never joins. One who completes it in 90 seconds and sees a beautiful page is converted. This deserves a dedicated design sprint.

**The freelancer product needs a name.** "Freelancer profile" is functional but forgettable. Consider: ABLE Credits, ABLE Studio, ABLE Pro (reserved for artists), ABLE Guild. The product is interesting enough to have its own identity within the ABLE family.

**The AI angle needs a timeline.** The ECOSYSTEM_AND_PARTNERSHIPS.md outlines agent-powered tools well. The bio writer and caption generator are correctly identified as "build first." But there's no timeline or architecture guidance. Recommendation: start with direct Claude API calls for the bio writer (no agent infrastructure needed, just a single API call), ship it as a feature within 30 days, and use the usage data to decide what to build next with AI.

**The Rooms feature is the long-term moat.** Everything else in the roadmap can be copied by Linktree with a team of 20 engineers in six months. Rooms — a lightweight, async, private community space attached to an artist profile, with Stage Can tipping and Launch Squad mobilisation — cannot be easily copied because it requires a different philosophy about what a platform is for. Linktree is a utility. Rooms is a relationship. Build toward it.

---

## 14. Risks and honest uncertainties

**Risk 1: The chicken and egg problem.**
ABLE is more valuable to artists when their fans are already familiar with it, and more valuable to fans when more of their favourite artists are on it. Getting to the point where either side finds value without the other is the first challenge. The mitigation: the artist profile page is valuable to an artist even with zero fans — it looks better than Linktree immediately. Start there.

**Risk 2: The Linktree muscle memory.**
"Put your Linktree in your bio" is already a reflex for millions of artists. "Put your ABLE in your bio" requires a behaviour change. Mitigation: make the import from Linktree effortless (paste your Linktree URL, ABLE imports your links), and make the first page creation as fast as Linktree's.

**Risk 3: UK market size.**
The UK independent music scene is the right cultural fit for ABLE but it's a smaller total addressable market than the US. The pricing (£9/mo, £19/mo) is calibrated for UK artists, which means lower revenue per user than a US-first product. Mitigation: ABLE should work for UK artists first, but the product is culturally exportable — Berlin, Amsterdam, Melbourne, Toronto all have strong independent music scenes with the same values and psychology.

**Risk 4: Artist churn.**
Artists stop releasing. Artists get signed. Artists quit music. The churn rate in this market is structurally higher than in B2B SaaS. The mitigation is the fan ownership proposition: even if an artist steps back from releasing for a year, their email list is still on ABLE, they're still paying to maintain it. The fan list is the thing that keeps them subscribed.

**Risk 5: The feature creep trap.**
Every good product idea from the ecosystem doc is a potential distraction from perfecting the core. Rooms, Story Mode, the Music Map, the grant database — all of these are genuinely interesting. None of them matter if the artist profile page isn't immaculate. The product hierarchy doc exists to prevent this and should be referenced before every sprint planning session.

---

## 15. The north star

Everything in this document points to the same place: ABLE is the platform that makes an independent artist feel, for the first time, like they own their relationship with their audience.

Not their streams. Not their followers. Not their plays. Their *relationship*.

The fan list. The email they can send. The page that looks like them. The data they can export. The credits that link to their collaborators. The recommendations that bring new fans from other artists. The launch squad that amplifies their release. The support packs that let fans say "I believe in you" with money.

None of this requires a label. None of this requires an algorithm. None of it belongs to anyone but the artist.

That's what "Artist Before Label" actually means. Not that labels are bad — but that the artist's tools, data, and relationship with their audience should be theirs first, always.

Build that. The rest follows.

---

*This document should be read before every sprint planning session and revisited whenever a major feature decision is made. It is not a feature list. It is the reasoning behind every feature list. Questions to ask: Does this feature make the artist feel more in control of their career? Does it make the fan experience feel more personal and less transactional? Does it serve the artist we're actually building for — the serious, thoughtful, independent musician — not a hypothetical power user? If yes to all three: build it.*

---

## 16. Research Synthesis — The 1% That Matters

*Added 2026-03-13. Drawn from four deep research documents: DESIGN_RESEARCH_2026.md, brainstorms/2026-03-13-top-minds-insights.md, USER_RESEARCH.md, and INTEGRATIONS_AND_AI_RESEARCH.md. Approximately 300 sources, 400+ people and companies researched. What follows is the 1% that changes ABLE.*

---

### From the World's Best Designers

**Dieter Rams / Jony Ive — restraint is the material.** Every element on the artist profile must earn its place. Not "less for the sake of minimalism" but "less because everything here serves a purpose." The glass theme's `backdrop-filter` should feel like frosted aluminium, not a CSS trick. The moment decorative chrome competes with the artist's artwork, it has failed.

**Paula Scher — the artist name IS the design.** In Barlow Condensed, the name should fill the hero width. At 375px mobile, it should span nearly the full viewport. Resist shrinking it for layout convenience. This is the single most impactful typographic decision on the page and it's already in the design — protect it.

**Stefan Sagmeister — each artist's page must feel like *them*.** If 20 artist profiles look interchangeable at a glance, the accent colour system has failed. The accent must permeate enough of the UI (CTAs, tabs, pills, section dividers) that the page reads as the artist's identity, not a template.

**Tobias Ahlin — layer the easing types.** The spring curve `cubic-bezier(0.34,1.56,0.64,1)` is correct for CTA bounce. But content panels sliding up should use deceleration `(0.25,0.46,0.45,0.94)`. Mixing easing types makes the UI feel alive. Applying one curve to everything makes it feel mechanical.

**Airbnb Design — skeleton screens must approximate the shape.** When no artist photo exists, show the accent colour as background with initials in Barlow Condensed. Not a grey rectangle. The placeholder communicates the *shape* of the content that will arrive — never a blank void.

**Stripe Design — the dashboard earns trust through precision.** "127 fans" not "100+ fans." Exact numbers. The artist is running a micro-business. Approximations feel dismissive.

**Linear Design — state transitions must be instant.** The switch between profile / pre-release / live / gig modes should be perceptible within 200ms of page load. No layout shift. This is not a visual polish task — it communicates the intelligence of the product.

---

### From the World's Best UX Experts

**Don Norman — emotional design has three levels.** Visceral (does it look right), behavioural (does it work), and reflective (does it represent who I am). ABLE must pass all three for INFP/ISFP artists: it must look like their world (visceral), work without confusion (behavioural), and feel like something they'd proudly put in their bio (reflective). Most link-in-bio tools pass behavioural and fail at the other two.

**Jakob Nielsen — first 10 seconds determine everything.** A fan arrives from a reel. They decide within 10 seconds whether to stay or leave. The artist name, the artwork, the primary CTA must all be in the viewport immediately, without scroll. Nothing else matters until the fan decides to stay.

**Luke Wroblewski — mobile first is not a setting, it's a decision.** 44px minimum tap targets are non-negotiable. No element that requires tapping should be smaller. ABLE is a mobile product — the desktop view is the secondary concern, not the primary canvas.

**Steve Krug — don't make the fan think.** The primary CTA should be obvious. One thing. Not three options. The fan came from a reel — they want to continue the experience, not make a decision. "Listen on Spotify" is a continuation. "Choose from 6 options" is a barrier.

**Hick's Law** — every additional choice doubles decision time. The CTA hierarchy (Hero max 2, Pills max 4/6, Section max 2) is not a design constraint — it's a conversion principle grounded in UX law. Never override it.

**Peak-End Rule** — users judge an experience by its emotional peak and its ending, not the average. For artists: the peak is the moment they see their page look beautiful for the first time. The ending is the confirmation email after sign-up. Both of these must be excellent. Everything in between can be serviceable.

**Aesthetic-usability effect** — users perceive beautiful products as working better, even when they don't. ABLE's design quality is not vanity — it creates genuine trust that the fan will complete their action (sign-up, ticket purchase, stream click). The investment in visual quality has a direct conversion rate return.

---

### From the World's Best Developers & Founders

**Kevin Kelly — 1,000 true fans.** An independent artist needs only 1,000 true fans to earn a sustainable living. If each of those fans spends £100/year (a show ticket, merch, a support pack), that's £100,000/year. ABLE's job is not to get artists millions of streams — it's to help them identify and deepen relationships with their 1,000. Every feature should be evaluated against this: does it help identify and serve the artist's true fans?

**DHH / 37signals — convention over configuration.** The wizard (start.html) should make smart default choices. An artist should not have to decide their accent colour in step 1 — ABLE should guess it from their Spotify artwork, then let them adjust. Convention first, customisation second. Calm products make confident choices on behalf of users.

**Pieter Levels — build in public, show the numbers.** "52 artists have collected 4,200 fan emails through ABLE" is more compelling than any marketing copy. Transparency about real metrics builds trust faster than claims. Show live artist counts and fan sign-ups on the landing page — real numbers, updated daily.

**Derek Sivers / CD Baby — demystify the tool.** Show the artist what "accent colour" actually does. Show them the CSS variable. Artists who understand the tool feel ownership, not dependency. Onboarding should teach, not just collect.

**Paul Graham — do things that don't scale first.** Recruit the first 10 artists individually. Set up their profiles personally. Give them attention ABLE can't sustain at 10,000 users. The learnings from those 10 conversations will be worth more than any survey.

**Nathan Barry / Kit — email is the only channel artists own.** The fan sign-up capture is the single most important feature in the product. Every design decision should make it more prominent and more trustworthy. The artist's email list is their business — and it's the only asset that doesn't belong to an algorithm.

**Paul Jarvis / Company of One — ABLE doesn't need 100,000 artists.** 2,000 artists on the Artist tier (£9/mo) = £18,000 MRR = a real sustainable indie business. Design with that target in mind. Every artist should feel personally known.

**Jack Conte / Patreon — the rebellion framing works.** "Artist Before Label" is ABLE's version of Patreon's "creators vs platforms" positioning. This is not just marketing — it's a genuine values statement that the right artist will recognise immediately and sign up for. Don't dilute it.

**Ethan Diamond / Bandcamp — "Fans have paid artists X" is the most powerful sentence in music tech.** It's specific, honest, and frames everything around what matters. ABLE's equivalent, when it arrives: "Artists on ABLE have collected [X] fan relationships. None of those relationships belong to any platform except ABLE." Hold that sentence in reserve for when the numbers are real.

**Joel Spolsky — never rewrite from scratch.** The existing able-v3.html contains working theme switching, localStorage, tab navigation, CTA zone logic. Extend it. Every line of code contains accumulated knowledge about edge cases. Refactor in place.

---

### From Real Artists, Fans, and Industry Professionals

**From the DIY Class of 2026 and similar research on 50 independent artists:**
- The artists ABLE serves are releasing consistently, earning £8k–£25k from music, operating without major label backing. They are Alessi Rose (opened for Dua Lipa, needs to capture that warm audience), Nell Mescal (building independent from surname recognition), Man/Woman/Chainsaw (Fiction Records deal but live fanbase is London-heavy — gig mode is directly useful).
- Common pattern: these artists have **strong short-form video presence but no owned audience infrastructure**. They have warm audiences with nowhere to go. ABLE is the place.
- The support slot is one of the highest-value fan capture moments. An artist who supports Dua Lipa plays to 15,000 people who've never heard them. They need a way to capture that room. ABLE's gig mode + fan capture is built for exactly this.

**From fan behaviour research:**
- Spotify: super listeners are 2% of monthly listeners but drive 18% of streams and 50% of ticket sales. Goldman Sachs values the superfan market at $4.3 billion annually. 20% of US listeners qualify as superfans (Luminate 2025).
- **Implication**: ABLE's superfan scoring (engagement depth, return visits, multiple CTA clicks) is not a vanity feature — it identifies the 2% who drive the majority of artist revenue. This is the list artists should be emailing first.
- Fans don't want to follow more artists. They want to go deeper with the ones they already love. ABLE's fan experience should be built around depth, not breadth.

**From freelancer research (SoundBetter, 400,000+ users):**
- SoundBetter has the market but charges commission and commoditises relationships. A freelancer's ABLE credits page — populated by artists who credit them on snap cards — creates an organic referral engine that no marketplace can replicate. The credits system is ABLE's freelancer product. It grows without any additional onboarding friction.

**From music industry professionals (booking agents, A&R, sync supervisors, curators):**
- Booking agents make decisions based on where artists have fans geographically. ABLE's fan location data (even approximate) is booking intelligence. "You have fans in 12 cities" is an actionable insight agents currently have to piece together manually.
- Playlist curators use SubmitHub because it's honest and structured. ABLE's integration with SubmitHub (affiliate + "Promote this release" panel) is the right relationship — ally, not competitor.
- The stat that defines ABLE's total addressable market: **13,800 artists earn $100,000+/year from Spotify alone. The 100,000th-ranked artist now earns $7,300/year — up 20x in a decade.** These are working musicians taking music seriously. They need professional infrastructure that matches how they think.

---

### The Integrations That Change Everything

*(Full detail in INTEGRATIONS_AND_AI_RESEARCH.md)*

**Build these first (high value, clean API, relatively easy):**
1. **Ticketmaster Discovery API** — free, single platform-wide key, events by artist name with zero per-artist setup; covers ~80% of ABLE's target artists. *(Bandsintown keys are per-artist — not viable as a platform-wide integration. See INTEGRATIONS_AND_AI_RESEARCH.md Part 7–8.)*
2. **YouTube Data API v3** — pull latest video, thumbnail, view count; best social API on the list
3. **Spotify Web API** — artist photo, top tracks, discography, genres; makes the profile feel real in 10 seconds. *(Monthly listener count is NOT available in any Spotify API endpoint — do not build features around this. Use Last.fm for reach data.)*
4. **Last.fm artist.getInfo** — 30-day unique listeners + bio text + tags; free, platform-wide key, zero per-artist setup
5. **Mailchimp / Kit export** — one-click fan list export; the trust signal that data portability is real

**The single best quick win:**
Build a **Linktree importer**: artist pastes their Linktree URL → ABLE parses and imports all links as CTAs. This is the muscle-memory override for the majority of ABLE's target acquisition. Achievable without an API (Linktree pages are public HTML). This is the answer to "why switch?"

**AI: Build these in order:**
1. Bio writer (Claude API — a few cents per generation, enormous perceived value)
2. Caption pack on snap card publish (3 Instagram/TikTok captions, pre-filled with ABLE link)
3. Release campaign planner (enter date → 6-week content calendar)
4. Transcription in Rooms (OpenAI Whisper — $0.006/minute, for voice note accessibility)
5. Voice cloning for dispatches (ElevenLabs — artist records 30 seconds, generates spoken content in their voice)

**What to protect from the integrations wishlist:**
Analytics (own it), Email broadcasts (own the artist-fan relationship), Fan CRM and superfan scoring (the moat). Never outsource these.

---

### What All the Research Agrees On

Every source — from Dieter Rams to Kevin Kelly to the DIY Class of 2026 to NN Group — points to the same underlying principle when applied to ABLE:

**Restraint creates trust. Trust enables depth. Depth creates superfans.**

The temptation is always to add more: more features, more integrations, more prompts, more onboarding steps. Every one of those additions adds cognitive load to an artist who already has too much to think about. The products that artists love — Bandcamp, Spotify for Artists, Ableton — all have strong opinions about what they are and are not. ABLE should too.

The design vision, the copy register, the CTA hierarchy, the anti-social-network principle — these are all expressions of the same thing: knowing what ABLE is, and refusing to be something else.

---

*Research documents referenced:*
- `docs/DESIGN_RESEARCH_2026.md` — 60 entries: top designers, UI experts, UX experts
- `docs/brainstorms/2026-03-13-top-minds-insights.md` — 160 entries: top developers, strategists, AI experts, founders
- `docs/USER_RESEARCH.md` — 50 artists, 50 freelancers, 50 fans, 50 industry professionals; Spotify Loud & Clear 2025/2026 data
- `docs/INTEGRATIONS_AND_AI_RESEARCH.md` — full integration priority matrix, AI tool landscape, agent opportunities

*Last updated: 2026-03-13*
