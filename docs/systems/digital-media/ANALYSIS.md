# ABLE — Digital Media Presence: 20-Angle Analysis
**Written: 2026-03-16 | Author: James Cuthbert + Claude**
**Status: Honest baseline audit — read before any media action**
**Read alongside:** `DIGITAL-MEDIA.md`, `PATH-TO-10.md`, `FINAL-REVIEW.md`

> This document scores ABLE's actual digital media presence as of March 2026, not its potential. The purpose is a clear-eyed gap map — not a strategy document (that's `DIGITAL-MEDIA.md`) but an honest audit of the current state of each dimension. Scores are 1–10. A 10 means it is operating at best-in-class for an early-stage, pre-revenue, solo-founded music SaaS.

---

## The scoring context

ABLE is pre-revenue, pre-launch, and solo-founded. Some dimensions are inherently low at this stage — that is expected, not alarming. The purpose of this audit is to distinguish between:

- Dimensions that are low because it is too early (acceptable)
- Dimensions that are low because of an avoidable gap (actionable)
- Dimensions that are unexpectedly strong (double down)

---

## Dimension 1: Website SEO

**Score: 3/10**

**Current state:** The ABLE product lives in HTML files (`able-v7.html`, `admin.html`, `landing.html`) without a public Netlify deployment to `ablemusic.co`. The domain is referenced in documentation but not confirmed live. There is a spec for SEO and OG cards (`docs/systems/seo-og/SPEC.md`, scored 5.7→9.0 with two critical bugs found) but it has not been built and deployed. There are no indexed pages, no title tag optimisation, no structured data, no sitemap, and no confirmed canonical domain in a search index.

**Why this score and not lower:** The SEO spec is thorough and ready to build. The gap is deployment, not design. A spec with no deployment is a 3, not a 1.

**Critical gap:** The product does not appear in Google search results for any relevant query ("link in bio for musicians", "music artist fan page", "Linktree for musicians"). This is the most urgent SEO gap because every day without indexing is a day of compounding lost opportunity.

**P0 action:** Deploy to `ablemusic.co` on Netlify. Implement the OG meta tags from `seo-og/SPEC.md`. Submit a sitemap to Google Search Console. This is not a content problem — it is a deployment problem.

---

## Dimension 2: OG Meta Tags (Social Preview Cards)

**Score: 3/10**

**Current state:** OG meta tags are specced (`docs/systems/seo-og/SPEC.md`) but the spec identified two critical bugs in the current HTML. The artist profile page currently generates no useful OG card when shared on social platforms — links to artist pages produce either a blank preview or a generic platform preview. This is a first-impression problem: every artist who shares their ABLE link gets a degraded preview.

**The specific impact:** When an artist shares their ABLE page link on Twitter/X, in a Discord, or via iMessage, the preview card is the first thing their fans see. A blank or generic card signals an unprofessional tool. A well-formatted card with artist artwork, name, and bio signals a platform worth using.

**P0 action:** Fix the two critical OG bugs from `seo-og/SPEC.md`. Add dynamic OG tags (artist name, artwork, bio excerpt) to `able-v7.html`. This is a 2-hour engineering task that has outsized first-impression impact.

---

## Dimension 3: Instagram Presence

**Score: 2/10**

**Current state:** ABLE has an Instagram strategy (`docs/systems/instagram-strategy/INSTAGRAM-DATA-AND-LEADS.md`, scored 9.6/10) but no active account. The strategy is excellent — the execution has not started. No posts, no followers, no audience.

**Why a 2 and not a 1:** The strategy is operationally ready. The content types are defined (Type A founder content, Type B thought leadership, Type C social proof). The warm lead pipeline approach is mapped. This is not a planning problem. It is a starting problem.

**Honest note:** Instagram is the primary social proof channel for ABLE's target audience (independent artists). Many independent artists will look up ABLE on Instagram before signing up. An empty account is worse than a non-existent account in some respects — it signals a company that started and then stopped. A small, consistent, curated account is better than a large inconsistent one.

**P0 action:** Post the first three pieces of content. Founder face on camera. No production required. The strategy tells you exactly what to say.

---

## Dimension 4: TikTok Presence

**Score: 1/10**

**Current state:** No TikTok account. No TikTok content strategy documented. TikTok is the primary discovery channel for independent music fans and a significant platform for artist-facing tools content. Damien Keyes (referenced in `DIGITAL-MEDIA.md` as a target YouTube outreach channel) also has a large TikTok presence in the music business education space.

**Is this a gap or a deferral?** A deferral — correctly. At pre-revenue, one channel done well (Instagram) is more valuable than three channels done poorly. TikTok is Phase 2.

**Why 1 and not lower:** TikTok's algorithm has a genuine "any video can go viral" property. A single good video about "what your bio link should look like on release day" could reach 100,000 artists. The upside is real. But the channel requires video output consistently, and James's time at this stage is better allocated to product and earned press.

**Planned action:** Build to Phase 2. When Instagram has 12+ posts and the first earned press piece is published, add TikTok as a second channel with repurposed content.

---

## Dimension 5: Twitter/X Presence

**Score: 2/10**

**Current state:** No confirmed ABLE account on Twitter/X. Twitter/X remains the primary channel for music tech founders, music industry professionals, and indie hackers to share work and build in public. The indie hacker and build-in-public communities on Twitter/X are the most direct audience for James's secondary story (solo founder, AI-assisted build).

**The specific opportunity:** "Building in public" on Twitter/X (sharing real numbers, showing product screenshots, asking questions, responding to other music tech conversations) produces warm relationships with journalists, podcasters, and potential users without cold outreach. It is the most efficient low-volume high-signal channel at the founder's personal brand level.

**P0 action:** Set up the ABLE Twitter/X account. Pin the Hypebot article once published. Post 3 product screenshots this week. The bar for Twitter/X content quality is much lower than Instagram — it rewards frequency over polish.

---

## Dimension 6: YouTube Presence

**Score: 1/10**

**Current state:** No YouTube channel. The strategy correctly defers this to Phase 2. The channel should be created and left empty rather than created and deleted later.

**What is missing that costs nothing:** A YouTube channel should be created now, even with zero videos, so that: (a) the handle `@ablemusic` or equivalent is secured, (b) the channel appears in search results when journalists and potential partners search for ABLE, and (c) the first video has a home when Phase 2 begins.

**P0 action:** Create the YouTube channel. Add the ABLE branding (banner, profile image, description). Leave it empty. Costs 20 minutes. Secures the namespace.

---

## Dimension 7: Video Content Strategy

**Score: 2/10**

**Current state:** `DIGITAL-MEDIA.md` has a thorough video content strategy for Phase 2 — tutorial series, artist features, behind-the-build content. None of it exists yet. No demo video exists on the landing page or anywhere publicly accessible.

**The immediate gap that matters:** There is no short-form product demo video. When a potential artist hears about ABLE from any channel and Googles it, they will find no video showing them what the product looks like. A 90-second screen-recorded walkthrough of the onboarding and profile page is the highest-value video asset ABLE could produce right now — it converts visitors who are already curious. It requires no YouTube channel, no production budget, and can be embedded directly on `landing.html`.

**P0 action:** Record a 90-second demo video using QuickTime or similar. Screen recording of the onboarding flow → profile page → campaign mode change. No voiceover required — on-screen text captions are sufficient. Embed on `landing.html`.

---

## Dimension 8: Podcast Presence

**Score: 1/10**

**Current state:** No podcast appearances. No podcast pitches sent. The strategy for podcast outreach is excellent (`DIGITAL-MEDIA.md` Part 3) with specific episode angles and pitch templates. Execution has not started.

**The opportunity cost:** Music Tectonics' Startup Session has an open application form. This is the lowest-friction podcast opportunity available — no cold pitch, no relationship required, just a form submission. It is documented in the strategy. It has not been submitted.

**Why this matters more than press at this stage:** A 30-minute podcast episode on New Artist Model or Music Tectonics reaches an audience that is actively seeking tools and strategies. The audience self-selects as highly engaged. Podcast listeners are the highest-converting discovery channel for SaaS products aimed at professional users.

**P0 action:** Submit the Music Tectonics Startup Session application form this week. Prepare the 3 talking points from `DIGITAL-MEDIA.md` Part 3.2. Run them out loud once before any appearance.

---

## Dimension 9: Press and PR Coverage

**Score: 1/10**

**Current state:** No press coverage. No pitches sent. No guest posts published. The earned media strategy is documented at 9.5/10 quality — the gap is entirely execution. No articles, no mentions, no "as featured in" social proof.

**What is missing:** The first piece of third-party validation. Until ABLE has one piece of coverage in a publication with more than 5,000 readers, every artist considering signing up has only the product itself as proof that ABLE is real and legitimate. Press coverage is not vanity — it is social proof infrastructure.

**The compounding effect works in reverse too:** Every month without the first Hypebot article is a month the flywheel hasn't started. The article takes 3 hours to write. It is the highest-leverage 3 hours in the current strategy.

**P0 action:** Write and submit the Music Think Tank guest post. The argument structure is in `DIGITAL-MEDIA.md` Part 2.3. Block 3 hours. Submit this week.

---

## Dimension 10: Brand Consistency Across Channels

**Score: 5/10**

**Current state:** The brand identity is internally consistent — name (ABLE / Artist Before Label), design system (Midnight Navy, amber accent, DM Sans/Barlow Condensed), copy voice (no exclamation marks, artist-first language). The brand guidelines exist implicitly across `CLAUDE.md` and the copy system spec. However, there are no external-facing brand assets — no press kit, no logo variants, no brand guideline PDF, no social media templates. Brand consistency cannot be scored across channels that do not yet exist.

**What is strong:** The product itself has excellent brand consistency. The `COPY_AND_DESIGN_PHILOSOPHY.md` is comprehensive. The copy system spec identifies violations. The design system is tokenised. The brand foundation is solid.

**What is missing:** A single-page press kit (logo, tagline, one-paragraph description, founder bio) that can be attached to any outreach email. Without this, every journalist who wants to write about ABLE has to extract the information from the product itself.

**P1 action:** Create a one-page digital press kit. 45-minute task. Include: ABLE logo (SVG), tagline, one-paragraph product description, founder bio (James), three key stats (artist count, fan sign-ups, X), contact email. Host on `ablemusic.co/press`.

---

## Dimension 11: Content Repurposing System

**Score: 2/10**

**Current state:** No content repurposing system exists because no content exists to repurpose. The strategy implies a repurposing model (guest post → Instagram content → podcast talking point) but this is documented implicitly rather than explicitly.

**What a 10/10 looks like here:** Every piece of content produced by James — a guest post, a podcast appearance, a product update — has a documented extraction protocol. One Hypebot article produces: 3 Instagram posts, 2 Twitter/X threads, 1 podcast talking point, 1 email to the artist list. The content is created once and published many ways.

**Why this matters at early stage:** James's time is the constraint. A content repurposing system means that the 3 hours spent writing the Hypebot article produces content for 6 other channels, not just Hypebot. The leverage per hour of content creation increases by 6x.

**P1 action:** Once the first piece of external content is published (guest post, podcast), write a 10-item extraction log: what 10 other pieces of content can this single piece produce? This becomes the template for all future content.

---

## Dimension 12: Creator Economy Positioning

**Score: 4/10**

**Current state:** ABLE is correctly positioned in its own strategy documents as the antithesis of creator economy generic tools — it is musician-specific, anti-algorithm, anti-vanity-metric. This positioning is clearly articulated in `docs/v6/PRODUCT_TRUTH.md` and `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md`. However, this differentiation is not visible to anyone outside the strategy documents.

**The external positioning gap:** When an independent artist searches "link in bio for musicians" or "music tools for artists", they find Linktree, Beacons, and artist.io. They do not find ABLE. They do not encounter the "owned fan data" argument anywhere in the creator economy conversation. ABLE's differentiation exists in documents, not in the marketplace conversation.

**What changes this:** The Hypebot guest post. That single piece of published thinking — the "artists have built their audience on borrowed land" argument — puts ABLE's differentiation into the public conversation. Until that article exists, the differentiation is private.

**P0 action:** Publish the guest post. This single action moves the creator economy positioning score from 4 to 6.

---

## Dimension 13: Paid Media Readiness

**Score: 2/10**

**Current state:** Not the right time for paid media. `DIGITAL-MEDIA.md` and the growth strategy both correctly position paid acquisition as Phase 2 only — after organic channels are working and LTV:CAC can be calculated. Without conversion rate data, without CAC baselines, and without MRR, paid media will burn money without learning.

**What "readiness" means here:** Even though paid media is correctly deferred, the infrastructure for it should be set up now so Phase 2 can start immediately when the time comes. This means: UTM tracking confirmed working in PostHog, conversion events firing on the sign-up page, and a baseline conversion rate established from organic traffic.

**The specific gap:** If paid media starts in month 6 and PostHog was not set up to capture UTM parameters on day one, the first 6 months of organic conversion data is lost — which means the paid media optimisation has no historical baseline to compare against.

**P0 action:** Confirm PostHog is capturing UTM parameters on the landing page and sign-up events. 20-minute engineering check. This is documented as a gap in `PATH-TO-10.md` Dimension 7.

---

## Dimension 14: Influencer and Collaboration Strategy

**Score: 1/10**

**Current state:** No influencer relationships. No collaborations. The YouTube outreach strategy is documented (Damien Keyes, music marketing educators) but not actioned. No warm relationships with music industry content creators.

**The right framing at this stage:** "Influencer strategy" at pre-revenue is not a paid strategy — it is a relationship-building strategy. The correct action is to begin engaging with 5–8 music industry content creators on Twitter/X and Instagram organically: commenting thoughtfully on their content, sharing their work, being a visible and credible participant in their conversation. When ABLE is ready to pitch a product feature, the relationship pre-exists the pitch.

**Time investment:** 15 minutes per day on two platforms (Twitter/X and Instagram), following and engaging with target creators. This compounds. Six months of genuine engagement before the product pitch results in warm relationships, not cold outreach.

**P1 action:** Build a list of 10 music industry content creators (YouTube, podcast, Twitter/X) whose audience overlaps with ABLE's target artist. Follow all 10. Engage genuinely for 30 days before any product mention.

---

## Dimension 15: Community Building

**Score: 2/10**

**Current state:** No community presence. The 30-day community participation strategy is documented in `DIGITAL-MEDIA.md` Part 5 — communities are identified (r/WeAreTheMusicMakers, r/musicproduction, Independent Music Promotion Facebook Group), the 30-day rule is clear. Execution has not started.

**The asymmetric upside:** r/WeAreTheMusicMakers has 1.7 million members. A single well-timed, well-framed product mention — after 30 days of genuine participation — can reach a highly relevant audience of independent musicians with zero cost. The 30-day investment is the price of the distribution. It is the cheapest paid-equivalent channel in the entire strategy.

**The risk:** Starting immediately with a product mention (the thing most founders do) produces no result at best, a ban at worst, and certainly a community reputation as a promoter rather than a contributor.

**P0 action:** Join r/WeAreTheMusicMakers and r/musicproduction today. Set a calendar reminder for 30 days. Post 2 genuinely helpful, non-ABLE answers per week for 30 days. Day 31 is when the product mention becomes available.

---

## Dimension 16: Email List

**Score: 1/10**

**Current state:** No email list. No artist waitlist. No newsletter. The email system is specced for post-onboarding artist communications (welcome sequence, churn re-engagement) but there is no pre-launch capture mechanism for artists who are interested but not yet signed up.

**The missed opportunity:** A pre-launch waitlist email from `landing.html` — "Get early access + 3 months free Artist tier" — would have been building since the product was first shareable. Every artist who visited `landing.html` and did not sign up is a lead that was not captured.

**Not a permanent gap:** The waitlist can be added to `landing.html` today. A Loops or Mailchimp form, a compelling single-sentence reason to join, and a confirmation email. This is a 90-minute task and produces an owned asset (email addresses) that no algorithm controls.

**P0 action:** Add a waitlist / early access sign-up to `landing.html`. Integrate with Loops. Set up a single confirmation email with the ABLE copy voice. This is independent of the full Supabase auth implementation.

---

## Dimension 17: Landing Page Conversion

**Score: 4/10**

**Current state:** `landing.html` has a marketing landing page with pricing, FAQ, and a demo phone. The strategy spec for it is scored at 9.65/10. However: (a) the page is not publicly deployed, (b) there is no waitlist or early access capture, (c) there is no social proof (no testimonials, no press mentions, no artist count), and (d) there is no demo video. A landing page without proof and without a working sign-up mechanism converts at near-zero.

**What a 7/10 version needs:** Deployment + OG tags fixed + a working early access capture form + at least one artist quote or testimonial.

**What a 10/10 version needs:** All of the above plus a demo video, "as featured in" press logos, and a real artist count number that increases.

**P0 action:** Deploy the page. Fix the OG tags. Add the waitlist form. These three actions move the score from 4 to 6 within one sprint.

---

## Dimension 18: Demo Video

**Score: 0/10**

**Current state:** No demo video exists anywhere. No screen recording of the product. No walkthrough of the onboarding flow. No visual evidence of what ABLE looks like in use.

**Why this is a P0 gap:** Every visitor to `landing.html` who is considering ABLE as their platform wants to see the product before they commit to onboarding. Text descriptions and static screenshots do not substitute. A 90-second screen recording of the onboarding flow → profile page → campaign mode change → fan sign-up capture is the single most converting asset on the landing page.

**The production bar:** Zero. QuickTime screen recording. No script. Just show the product working. Add simple captions if needed. Upload to YouTube (unlisted if preferred). Embed on `landing.html`. Total time: 2 hours.

**P0 action:** Record the demo video this week. Embed it. This is the highest-leverage 2 hours in the entire digital media strategy.

---

## Dimension 19: Case Studies and Testimonials

**Score: 0/10**

**Current state:** No case studies. No testimonials. No artist quotes. The product has no paying artists and no public users yet, so this is expected at this stage.

**What is possible without paying users:** Beta testers. Even 3–5 artists using the product in a closed beta and providing a one-sentence quote ("ABLE is the first link-in-bio that actually knows when I'm dropping something") constitutes social proof. It does not require the user to be famous. It requires the product to be good enough that a real artist would say something honest about it.

**The longer-term arc:** The artist feature video format (`DIGITAL-MEDIA.md` Part 4.1) is designed to produce this. An artist talking on camera about their ABLE page is the most credible possible testimonial. Six of these in the first 12 months would fundamentally change the conversion rate of the landing page.

**P1 action:** Identify 5 artists (friends, contacts, producer network) who would use a beta version of ABLE and provide a quote. Reach out this month. Do not wait for paying users to generate social proof.

---

## Dimension 20: Founder Personal Brand

**Score: 3/10**

**Current state:** James does not currently have a visible public presence as a music tech founder. No Twitter/X activity as a founder. No LinkedIn thought leadership. No published articles or talks. No podcast appearances. The personal brand effectively does not exist yet in the digital media landscape.

**Why this matters as much as the product brand:** At pre-revenue, founder credibility is product credibility. A music industry journalist evaluating whether to cover ABLE will Google "James Cuthbert ABLE" before deciding. An artist evaluating whether to trust ABLE with their fan data will ask "who built this?" The founder's publicly visible track record and point of view are a material part of the trust signal.

**What a 6/10 looks like:** 3 months of consistent Twitter/X activity as a music tech founder (product screenshots, observations about the independent music landscape, responses to industry news). One published article (the Hypebot guest post). A LinkedIn profile that references ABLE with clear positioning.

**What a 10/10 looks like:** All of the above plus podcast appearances, a known point of view in the music industry conversation, and genuine relationships with journalists and content creators in the space.

**P0 action:** Update the LinkedIn profile to position James as "Building ABLE — a platform for independent artists to own their fan relationships." Post the first Twitter/X thread about why ABLE exists. These two actions cost 90 minutes and establish the minimum viable personal brand signal.

---

## Summary scores

| Dimension | Score | Status |
|---|---|---|
| Website SEO | 3/10 | P0 — deploy + submit to Search Console |
| OG meta tags | 3/10 | P0 — fix two critical bugs |
| Instagram presence | 2/10 | P0 — first 3 posts |
| TikTok presence | 1/10 | Phase 2 — correctly deferred |
| Twitter/X presence | 2/10 | P0 — set up account + first thread |
| YouTube presence | 1/10 | P0 — create channel, secure handle |
| Video content strategy | 2/10 | P0 — 90-second demo video |
| Podcast presence | 1/10 | P0 — Music Tectonics application |
| Press and PR | 1/10 | P0 — Hypebot guest post |
| Brand consistency | 5/10 | P1 — press kit + social assets |
| Content repurposing | 2/10 | P1 — extraction template after first piece |
| Creator economy positioning | 4/10 | P0 — resolved by publishing guest post |
| Paid media readiness | 2/10 | P0 — confirm PostHog UTM capture |
| Influencer/collab strategy | 1/10 | P1 — build target list + engage |
| Community building | 2/10 | P0 — join communities, start 30-day rule |
| Email list | 1/10 | P0 — waitlist on landing.html |
| Landing page conversion | 4/10 | P0 — deploy + OG + waitlist |
| Demo video | 0/10 | P0 — record and embed |
| Case studies/testimonials | 0/10 | P1 — 5 beta artists |
| Founder personal brand | 3/10 | P0 — LinkedIn + first Twitter/X thread |

**Overall score: 2.0/10**

The low overall score is not a crisis — it is expected and appropriate for a pre-deployment, pre-revenue product at this stage. The score is being held low by execution gaps, not design gaps. The strategy is strong. The gaps are in doing the first thing.

---

## The honest summary

ABLE has exceptional strategy documentation and a weak external footprint. The strategy quality is arguably 9/10 across every system. The execution quality in digital media is approximately 2/10. This is a normal state for a solo founder who has been building product — the product is strong, the presence is not yet.

The five actions that would move the score most rapidly:

1. **Deploy to ablemusic.co** — moves SEO, OG tags, landing page, and demo video scores simultaneously
2. **Write and publish the Hypebot guest post** — moves press, creator economy positioning, and personal brand scores simultaneously
3. **Record the 90-second demo video** — moves video content and landing page scores simultaneously
4. **Set up Twitter/X + LinkedIn** — moves personal brand and creator economy positioning scores simultaneously
5. **Add waitlist to landing.html** — moves email list and landing page scores simultaneously

None of these require budget. All of them require time. The ordering matters: deploy first (no press piece should send traffic to an undeployed product).
