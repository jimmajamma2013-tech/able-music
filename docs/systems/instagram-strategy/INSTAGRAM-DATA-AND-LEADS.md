# ABLE — Instagram Data and Warm Lead Strategy
**Created: 2026-03-16 | Author: James Cuthbert + Claude**
**Status: Canonical — read before any Instagram action**
**Related:** `docs/systems/social-media/SOCIAL-MEDIA-PLAN.md`, `docs/ABLE_STRATEGY.md`, `docs/GROWTH_STRATEGY.md`

> This document answers three questions: what Instagram data is actually useful, how to turn existing followers into ABLE artist sign-ups, and how to build a system that does this consistently without becoming a content machine.

---

## The premise

James has an existing Instagram following. Some percentage of those followers are independent artists. Some smaller percentage are independent artists who actively release music and are the exact person ABLE is built for.

The job is not to grow the Instagram following. The job is to identify the artists already in it, earn their trust with content that is genuinely useful to them, and convert them into ABLE sign-ups at the right moment — without the whole thing feeling like a funnel.

That distinction matters. Independent musicians have a finely tuned radar for being marketed at. The moment this feels like a lead generation campaign, the trust is gone. The strategy works precisely because it is not a campaign — it is a sustained, honest, direct conversation with the specific people James understands better than anyone else targeting them.

---

## Part 1: Instagram Data — What to Pull and Why

### 1.1 The principle

Do not track everything. Track only what changes a decision. Every metric on this list has a corresponding decision attached to it. If a metric would not change what you post or how you engage, it is not worth tracking.

### 1.2 The data sources (from lowest to highest effort)

**Tier 1: Instagram Insights (native, free, no setup)**

Available on any Business or Creator account. Accessible directly from the app. Pull these numbers weekly:

| Metric | What it tells you | Decision it drives |
|---|---|---|
| Reach per post | How many unique accounts saw each piece of content | Double down on content types with 3× average reach |
| Profile visits from each post | Which posts drive curiosity about you specifically | High profile visits = content that earns trust, not just impressions |
| Link-in-bio clicks | Direct traffic signal to ablemusic.co | The single most important conversion metric on Instagram |
| Story tap-forward rate | Are people skipping your story? | High tap-forward = something in that story is wrong — too long, wrong content |
| Story tap-back rate | Are people rewatching a specific moment? | High tap-back = something landed — find it, replicate it |
| Follower demographics (age, location, top cities) | Are you reaching UK artists aged 22–38? | If not, the content is reaching the wrong people — adjust |
| Best posting times | When your specific audience is active | Post content about ABLE when engagement is highest — not on auto-schedule |

How to access: Open Instagram app → Profile → Professional Dashboard → Content You Shared → tap any post → View Insights. Download the aggregate Insights CSV weekly from Creator Studio on desktop.

**Tier 2: Instagram Data Download (no API, personal export)**

Go to Settings → Accounts Centre → Your information and permissions → Download your information → select JSON format → select specific data categories:

Categories worth downloading:
- Posts and content (full history + captions)
- Comments (what you've said and what others have said on your posts)
- Followers and following (username list)
- Direct messages (for DM context, see Part 3)
- Story activity (views, sticker interactions)

What you can do with the export:
- Open the JSON files in any spreadsheet tool (or ask Claude to parse them) to identify which posts generated the highest comment engagement over your full account history
- Cross-reference your follower list against known artists manually (start with your most engaged commenters)
- Build a personal database of "engaged artists" — people who are already warm, before you ever send a DM

Frequency: download once per quarter. This is a strategy input, not a daily tool.

**Tier 3: Instagram Graph API (requires setup, provides real-time data)**

This is the official API route. Requires a Business or Creator account connected to a Facebook Page. Setup takes approximately one hour.

What it provides that Insights doesn't:
- Historical post data going back further than the 90-day native Insights window
- Per-post engagement rate (likes + comments + saves ÷ reach) — a cleaner quality signal than raw likes
- Follower growth over time (daily, not just the current snapshot)
- Media type breakdown: which format (Reel, carousel, single image) consistently outperforms

Setup steps:
1. Go to developers.facebook.com → Create a new App → select Business type
2. Add the Instagram Graph API product
3. Connect your Instagram Business account via Facebook Business Manager
4. Generate a long-lived access token (valid 60 days, refreshable)
5. Use the token to query: `GET /me/media?fields=id,caption,media_type,timestamp,like_count,comments_count,reach,impressions,engagement`

Rate limits: 200 calls per hour per user. Sufficient for daily automation.

The output feeds into a Google Sheet or Notion database via a simple script (or n8n, see below). You end up with a table showing every post's performance — sorted by engagement rate, filterable by content type, timestamped.

**Tier 4: Third-party analytics tools (free tiers sufficient)**

Metricool (free tier): connects to Instagram, pulls the same data as the API but with a visual dashboard. Useful for: identifying best posting times based on your specific audience (not generic advice), and tracking hashtag performance over time. Set it up once and check it monthly.

Later.com (free tier): primarily a scheduling tool, but the analytics layer shows link-in-bio click tracking and post performance side by side. Useful if you want to see the correlation between a specific post type and bio link clicks on the same day.

Neither of these replaces the API for raw data access. They are dashboards for quick visual reads.

### 1.3 The four metrics that actually change behaviour

After all the data is available, you will look at four numbers and make decisions from them. Everything else is context.

**1. Link-in-bio click rate** (link clicks ÷ profile visits)

This is the primary conversion signal. If someone visits your profile and does not click the link, either the bio copy is wrong, the link destination is wrong, or they are not the right audience. Target: 15%+. If it is below 10%, test a bio copy change.

**2. Profile visit rate per post** (profile visits ÷ post reach)

This measures how much a post creates curiosity about you personally. Content about ABLE that has a high profile visit rate is working — people want to know more. Content that has reach but zero profile visits is entertainment, not acquisition. Target: 3%+. Below 1% = decorative content, reconsider.

**3. Story-to-link rate** (link sticker taps ÷ story views)

Stories with a link sticker to ablemusic.co. The percentage who actually tap. Target: 5%+. Below 2% = the story doesn't create enough urgency or relevance to click. Review what you're saying in the story itself.

**4. Engaged-follower-to-DM conversion** (DMs received following a post ÷ post engagement)

After a post that specifically invites DMs ("if you're an independent artist, reply or DM me"), how many do you get? Target: 1 DM per 50 comments. Below this, the CTA is too passive or buried.

### 1.4 Setting up a weekly data ritual (30 minutes, Monday morning)

Pull these four numbers weekly. Write them in a single row in a tracking sheet. Do not analyse week-by-week noise — look at 4-week rolling averages. Make one decision per week from the data. Not five. One.

The tracking sheet:
```
Week | Link click rate | Profile visit rate | Story-to-link rate | DM rate | One change made
```

---

## Part 2: Content Strategy for Warm Leads

### 2.1 What "warm lead" means in this context

A warm lead is an independent artist who:
- Has seen your content more than once
- Has engaged (liked, saved, commented, or shared) at least once
- Follows you, or follows you and has visited your profile
- Is not yet on ABLE

They are warm because they have self-selected into paying attention to you. The job of content is to move them from warm to hot (comments, DMs, bio link click) and then from hot to converted (ABLE sign-up). Content alone does not close the loop — personal engagement does (see Part 3). But content pre-warms every DM.

### 2.2 The content ratio (non-negotiable)

**70% about artists and the independent music world. 20% about ABLE as a product. 10% about building in public.**

This ratio is not arbitrary. It reflects the trust mathematics of the independent music community. An account that talks about ABLE 50% of the time is a product account. An account that talks about artists 70% of the time is a music industry account that happens to have a product. The audience — independent artists — will follow the latter and distrust the former.

This means: most of your best content will not mention ABLE at all. That is the strategy, not a concession.

### 2.3 The three content types that generate warm leads

**Type A: The "you've been thinking this but haven't said it" post**

These are observations about the reality of being an independent musician in 2026. They are specific, not generic. They resonate because the person reading thinks "that is exactly my situation." They generate saves (the highest-signal engagement on Instagram, above likes) and DMs from artists who want to continue the conversation.

Examples of the frame (not the actual post — adjust to James's voice):

- "Your Spotify pre-save link is in your bio for 3 weeks and then it just sits there. No new release. No context. Just a Spotify link from October."
- "You played a show last night. Someone told their friend about you. Their friend Googled you. They found your Instagram. They found a Spotify link. They didn't save it. That relationship ended right there."
- "The algorithm gave you 10,000 views on a Reel. You have no idea who any of them are. Neither do they, really."

These posts do not pitch ABLE. They name the problem ABLE solves. Every artist who engages with them is pre-qualified.

The structural rule: end with a question that invites a response. Not "what do you think?" — that is lazy. "Has this happened to you?" or "What did you do instead?" — specific, lower friction.

**Type B: The product-in-use demonstration**

Show an ABLE page doing what it does. Not a feature tour — a moment. "This is what an artist's page looks like at 11pm the night before a release drops." "This is what the page shifts to at midnight on release day." "This is the admin view when 47 fans have signed up."

These posts are about ABLE but they are not about ABLE as a product. They are about moments in an artist's career — moments the viewer has experienced and immediately recognises. The product appears as the solution in context, not as the pitch.

Format: screen recording as a Reel, 15–30 seconds. No voiceover in the first 3 seconds — just the visual. Text overlay identifying the moment. End with the bio link as the CTA.

Frequency: one per week maximum. More than this tips the ratio the wrong way.

**Type C: The artist feature**

Pick a real artist using ABLE. Post about them. Not a testimonial (testimonials are brand content). A genuine feature — something you find interesting about their music, their career, or the way they use their page.

The format: carousel or single image with 3–5 lines of copy in the caption about the artist, then one line at the end about where their page lives. Tag them. They reshare it to their audience. Their audience — many of whom are also artists — discovers both the artist and ABLE simultaneously.

This is the single highest-ROI content type on the list because it compounds in three directions: it serves the featured artist (they get reach), it introduces ABLE to new audiences (their followers), and it demonstrates ABLE's quality to anyone who taps through to the page.

Cadence: once per fortnight from Month 2 onwards. You cannot feature artists you don't have yet — the early features are James's own page and anyone willing to be a beta tester.

### 2.4 Reposting strategy — turning old content into new warm leads

Instagram's algorithm suppresses posts after 24–48 hours. Your best posts from 3 months ago have probably been seen by 30–40% of your current followers, which means 60–70% of your current audience has never seen them.

**The 72-hour Story repost**

Every post that performs above average (measured by profile visit rate, not just reach) gets story-ified 72 hours after posting. Process:

1. Screenshot or save the post
2. Add one interactive element: a poll ("Is this you?" / "Not me"), a slider ("How many times has this happened?"), or a question sticker ("What did you do instead?")
3. Add a link sticker to ablemusic.co
4. Post to Stories

The poll or question element is not decoration. It is a data collection mechanism. Every artist who votes in the poll or responds to the question has self-identified as engaged. They are warm leads. Check responses daily and reply to every one personally.

**The archive audit**

Once per month: review your top 10 posts from the last 90 days by profile visit rate (not reach). The one with the highest profile visit rate gets reposted to Stories with updated context. "I posted this 6 weeks ago and it clearly landed — adding it here for anyone who missed it."

This is not spam. It is surfacing content that clearly resonates to the portion of your audience who didn't see it the first time.

**Cross-platform reposting**

Instagram Reels → TikTok: every Reel that performs above average (3%+ profile visit rate) gets reposted to TikTok. Remove the Instagram watermark first using SnapTik.app or similar. TikTok has a separate audience — artists who follow James on TikTok but not Instagram, and vice versa.

Important: do not auto-post to TikTok. TikTok's caption and hashtag strategy is different. The video content is the same — write a fresh caption for the TikTok context. Takes 5 minutes per post. Worth it.

Instagram best captions → X/Twitter: the observation posts (Type A above) translate directly to X as short-form threads. Expand the single thought into 3–4 connected observations. The X audience skews toward industry (producers, managers, music journalists) — slightly different from Instagram's artist-focused audience but equally valuable for ABLE's reach.

Instagram carousels → LinkedIn: if James is posting anything about the build process or music industry infrastructure, the LinkedIn audience (managers, labels, music educators) is the right secondary audience. One cross-post per fortnight at most.

### 2.5 What not to post

These are tempting. Each one will reduce the quality of warm leads even if it increases follower count or engagement.

**Engagement bait** ("Comment your music genre below"). Generates comments from people who want their comment seen, not from people who are engaged with the content. Inflates engagement numbers, deflates lead quality.

**Trend audio Reels with no artist-relevant content**. These bring followers who like the trend, not followers who care about independent music. Every unqualified follower dilutes the ratio of potential leads in your audience.

**"ABLE launched a new feature" announcement posts**. Feature announcements are relevant to existing users. They do not convert potential users — people who don't yet have ABLE do not care about the new admin dashboard feature. Show them the outcome, not the feature.

**Quotes from other people with generic music inspiration**. This signals that you do not have your own point of view. The artists ABLE is for are not looking for inspiration — they are looking for someone who understands their specific situation.

---

## Part 3: Converting Warm Leads — The Personal Engagement System

### 3.1 The funnel states (and what moves people through them)

The content strategy above does not convert followers to sign-ups on its own. Content moves people from cold to warm. Personal engagement — replies, DMs, and direct conversation — moves them from warm to converted.

```
Cold (never heard of James / ABLE)
  → Warm (follows; has engaged at least once)
  → Hot (commented on a post; visited profile; mentioned artists specifically)
  → Lead (clicked bio link; visited ablemusic.co)
  → Converted (created ABLE profile)
```

The content strategy handles cold → warm automatically. Everything from warm → converted requires personal engagement.

### 3.2 The daily engagement protocol (20 minutes maximum)

This is the daily work. Not optional. Not delegatable until ABLE has 200+ artists and a community manager exists.

**Morning (10 minutes):**
- Check comments from the last 24 hours on all posts. Reply to every comment that asks a question or reveals that the commenter is an artist. Ignore generic emoji comments.
- Check DMs. Reply to every DM within 24 hours. If someone DMs after seeing an ABLE-related post, they are already warm — treat the DM as a conversation, not a funnel.
- Check Story poll/slider responses. Note any artists who engaged. Add to warm list (see 3.3).

**Evening (10 minutes):**
- Check the comments on any post from today. Reply within a few hours while the post is still active in the algorithm.
- Identify 2–3 people in the comments across recent posts who have now engaged multiple times. These are moving to hot. No action yet — just note them.

### 3.3 The warm list (simple, personal)

Keep a running document — a note in Apple Notes or Notion — of artists who have engaged with your content more than once. Not a CRM. Not a tool. A list of names and one line about their situation.

Format:
```
@handle — what they engage with — what they do — last contact note
```

Example:
```
@kiera_sonics — engaged on "Spotify link in bio" post + story poll — indie singer-songwriter, releasing EP in May — hasn't heard of ABLE yet
@beatsbyarlo — DMed after admin dashboard Reel — producer, has 3 artist clients — potential Abler candidate
```

Review this list every Sunday. Anyone who has been warm for 3 weeks without a direct conversation moves to the next step.

### 3.4 The DM approach — what to say and what not to say

When to DM: after someone has engaged with your content at least twice and shows clear signals of being an independent artist (posts about music, references their own releases, mentions gigs or shows).

The DM is not a pitch. It is the start of a real conversation. If James would not send this message to someone he met at a show, he should not send it on Instagram.

**The framework:**

1. Reference something specific they did or said (their content, their comment, something real)
2. Acknowledge their situation without overclaiming ("sounds like you're..." not "I know exactly how you feel")
3. Mention ABLE as context, not as a pitch — the purpose of mentioning it is to explain why you're reaching out, not to close a sale
4. End with an invitation, not a CTA — something that invites a response without requiring one

**What this looks like in practice:**

Bad: "Hey! I saw your comment on my post. I built ABLE for artists like you! It's a free link-in-bio with fan email capture. Check it out!"

Good: "Saw you commented on that post about the Spotify link — the bit about not knowing who actually saved the single landed for me. That's the exact thing I built ABLE around. If it's useful: ablemusic.co. No strings, genuinely curious what you think."

The difference: the good version references something specific, explains the personal connection between their situation and what ABLE does, and offers without requiring. It does not use an exclamation mark. It sounds like a person, not a marketing account.

**The follow-up (only if they respond positively):**

If they engage with the DM and want to know more:
- Send them to `ablemusic.co` directly (not a landing page — the actual product)
- Offer to talk through what ABLE does if they have questions ("happy to jump on a voice note or reply here if anything's unclear")
- Do not send a second DM if they do not respond to the first one

### 3.5 The Instagram-to-sign-up moment

The highest-converting sequence for turning warm Instagram followers into ABLE sign-ups:

1. Artist sees a post about the problem (Type A content — "you've been thinking this")
2. They save it or comment. They are now warm.
3. They see a Reel of an ABLE page in a campaign state they recognise ("that's what I need before my next release")
4. They visit James's profile. Bio says: "Your music. Your fans. Your relationship. ↓" and links to ablemusic.co
5. They tap the link. They land on landing.html with `?utm_source=instagram_bio`
6. They see the demo — a real ABLE page in the states they just watched in the Reel
7. They start the wizard. They paste their Spotify link. Their page is live in 4 minutes.

The critical dependency: the landing page and onboarding wizard must be genuinely excellent before any of this matters. If someone goes through steps 1–6 and hits a mediocre onboarding, the warm lead evaporates. The content strategy can only convert as many people as the product can retain in the first session.

### 3.6 UTM tracking (so you know what is working)

Every link to ablemusic.co from Instagram must carry a UTM parameter. Without this, you cannot attribute sign-ups to specific content types or campaigns.

Bio link: `https://ablemusic.co?utm_source=instagram&utm_medium=bio&utm_campaign=always-on`

Story link sticker: `https://ablemusic.co?utm_source=instagram&utm_medium=story&utm_campaign=story_name`

Post in caption (if linking): `https://ablemusic.co?utm_source=instagram&utm_medium=post&utm_campaign=post_slug`

These feed into PostHog, which records:
```javascript
posthog.capture('landing_page_visit', {
  source: 'instagram',
  medium: 'bio' | 'story' | 'post',
  campaign: 'always-on' | story_name | post_slug
})
```

Check the PostHog dashboard weekly: which UTM source is generating sign-ups that activate (create a profile and capture at least one fan)? That is the content type to prioritise.

---

## Part 4: Automation — What to Automate and What Not To

### 4.1 What to automate (safe, ToS-compliant)

**Scheduled posting via Later or Buffer**

All posts can be scheduled in advance. This is officially supported by Instagram. Use Later (free tier) or Buffer ($15/mo). Schedule posts in batches on Sunday evening for the coming week. Do not schedule Stories — they need to feel live and responsive. Only scheduled feed posts and Reels.

**Analytics pull via Metricool**

Set up Metricool (free tier) to track Instagram, TikTok, and X simultaneously. Weekly email summary arrives automatically. Takes 5 minutes to set up. Cuts the weekly analytics review from 30 minutes to 10.

**Cross-post Reel to TikTok via n8n (when the automation is stable)**

n8n can watch for new Instagram Reels (via the Graph API webhook) and trigger a notification that prompts you to post the same content to TikTok with a fresh caption. This is not automatic posting — it is a workflow that removes the friction of remembering. The manual step (writing the TikTok caption) stays manual because TikTok copy needs to be different.

Note on TikTok cross-posting automation: check the current state of Instagram → TikTok automation before implementing. Both platforms update their ToS frequently on this. As of early 2026, scheduled posting via third-party tools is permitted; auto-reposting between platforms sits in a grey area. Verify before automating.

**UTM tagging and link tracking**

Use a single short link (built with bit.ly or your own short domain) for the bio link. Update the destination URL when running specific campaigns. This means you do not have to change the bio link every time — you change the destination behind the short link. All traffic is tracked via UTM automatically.

### 4.2 What not to automate

**Auto-DM to new followers.** Instagram penalises this and it is immediately detectable as inauthentic. One artist who receives a generic automated DM from ABLE will post about it. The independent music community is small. The damage is disproportionate to any gain.

**Auto-reply to comments.** Same reason. Generic auto-replies destroy the perception of authenticity that is the core of the content strategy. Every reply must be human.

**Hashtag following/unfollowing loops.** Against Instagram's terms of service. Risky account suspension. ABLE's brand is built on authenticity — getting banned for bot behaviour would be catastrophic.

**Bulk engagement bots of any kind.** Not worth discussing. The risk is total account loss plus reputational damage in exactly the community ABLE is trying to earn trust with.

### 4.3 The n8n workflow for warm lead tracking

When a new artist signs up to ABLE with `utm_source=instagram`:

1. Supabase writes the artist record with `source: 'instagram_bio'` or `source: 'instagram_story'`
2. n8n webhook fires on new Supabase insert with Instagram source
3. n8n sends a Telegram notification: "New artist from Instagram — @[instagram_handle if collected] — [email]. Day 1 DM opportunity."
4. Within 24 hours: find their Instagram, send a personal DM: "Saw you joined ABLE — glad it's useful. Let me know if anything's unclear or if the page needs anything."

This is not a welcome sequence. It is a personal touch from the founder within the first day. At small scale (first 200 artists), this is achievable and the impact is significant: artists who get a personal DM from the founder within 24 hours activate at roughly 3× the rate of those who don't.

---

## Part 5: The First 30 Days — Concrete Actions

This is not a strategy summary. It is a sequence. Do these in order.

**Week 1:**
- Confirm Instagram account is set to Business or Creator (required for Insights)
- Set bio copy to: "Your music. Your fans. Your relationship. ↓" + ablemusic.co link with UTM
- Set up Metricool free tier — connect Instagram and TikTok
- Download Instagram data archive (Settings → Account → Download data) — open the JSON files, identify your 20 highest-engagement posts from the last 90 days
- Review those 20 posts: what topics appear? What format? This is your early content signal

**Week 2:**
- Post one Type A observation post (the problem post). No mention of ABLE.
- Create your warm list document. Add every artist who engages with the post.
- Set up UTM-tagged bio link
- Post one Story reposting your best-performing post from the last 3 months + poll sticker

**Week 3:**
- Post one Type B product-in-use Reel (15–30 seconds, showing a campaign state)
- Check bio link click rate from Insights — is it above 10% of profile visits?
- Send first 3 personal DMs to warm list members who have engaged twice and show clear artist signals
- Post the Type A content to X as a short thread

**Week 4:**
- Review all four key metrics. Write them down.
- Post one Type A observation. Different topic to Week 2.
- DM 3 more warm list members
- Story: link sticker to ablemusic.co, reference the problem from the Type A post this week
- Identify if there is one artist who has engaged enthusiastically — reach out about featuring them (Month 2 onwards)

**Ongoing (monthly ritual):**
- Download analytics from Metricool — 15 minutes, note the one content type that consistently produces profile visits above 3%
- Archive audit: find the top post from 90 days ago, Story-ify it
- Review warm list: anyone warm for 3+ weeks gets a DM
- Update the tracking sheet with the four key metrics

---

## The standard this document is measured against

This strategy is at 10/10 when:
- James knows exactly which Instagram content type drives the most ABLE sign-ups (data-informed, not guessed)
- Every engaged artist in his audience has been personally acknowledged within 48 hours of engaging
- The first 50 ABLE artists can be traced back to specific Instagram posts or DMs in the attribution data
- No post has been written that could appear on a generic marketing account — everything is specific to the independent music world
- The content ratio (70/20/10) has been maintained across the first 30 posts
- The DM approach has never felt like a pitch to anyone who received one

**See `PATH-TO-10.md` for the gap analysis and scored audit process.**
**See `FINAL-REVIEW.md` for the final quality checklist before calling this complete.**
