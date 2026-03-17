# ABLE — 300 Founder Wins
**Created: 2026-03-16 | Read this when you need momentum. Pick one action. Do it now.**

> These are not tasks on a list. They are evidence that you are moving. Every completed item is a data point that says: this is real, it is growing, and you are the one building it.

---

## How to use this

- **Easy wins (5–30 min):** Do these when energy is low, you're on a commute, or you need a quick win before a bigger session
- **Medium wins (1–3 hrs):** Do these in a focused session — single task, no interruptions
- **Hard wins (half-day+):** Block dedicated time, phone away, no social media. These move the needle.

**Cross-references:** Every item links to the authoritative doc where applicable. The doc tells you exactly how to do it.

---

## EASY WINS (1–100)

### Product (1–20)

1. Open `docs/STATUS.md` and update the date at the top → it should always reflect today's session
2. Run `git log --oneline -20` and write one sentence summarising what shipped last week — paste it into `docs/STATUS.md` as the last session summary
3. Open `able-v7.html` in a browser, go to 375px viewport, scroll every section — note any pixel that bleeds outside the viewport → log it in `docs/STATUS.md` known issues
4. Open `admin.html`, check the browser console for errors — if any appear, add them to `docs/STATUS.md` known issues → see `docs/systems/error-states/SPEC.md`
5. Fix the `#888` hardcoded colour bug in `admin.html` at lines L44 and L1288 — replace with `var(--text-muted)` → see `docs/STATUS.md` design system entry
6. Open `start.html` on a real iPhone Safari (or BrowserStack) and tap through the wizard to completion — note anything that feels broken or off
7. Audit Quick Action pills in `able-v7.html`: are all 4 showing in mobile view? Tap each one and confirm the CTA click tracking fires (check `localStorage.able_clicks`)
8. Check all four campaign states in `able-v7.html`: set a future release date (pre-release), set a past date +1 day (live), activate gig mode, then clear all (profile) — verify each visually renders correctly
9. Read `docs/systems/artist-tools/PATH-TO-10.md` and find the first P0 fix listed — it is under 2 hours. Do it now.
10. Run a Playwright smoke test on `able-v7.html` — open `mcp__playwright__browser_navigate` and check the page loads, no console errors → see `docs/systems/pathway/PRE-SHIFT-CHECKLIST.md` product section
11. Check `able_fans` in localStorage after a test fan sign-up — does the object contain `{email, ts, source}`? If source is missing, that is a bug
12. Open `landing.html` and read the copy on the hero section. Check every line against `docs/systems/COPY_AND_DESIGN_PHILOSOPHY.md` banned phrases list — flag any remaining violations
13. Verify the OG image tag is correctly set in `able-v7.html` `<head>` — open the page URL in Twitter Card Validator or opengraph.xyz and check it renders → see `docs/systems/seo-og/SPEC.md`
14. Check `docs/systems/artist-tools/SPEC.md` for the accent colour picker spec — read the HTML snippet. Decide if this is today's 2-hour build.
15. Add the close circle "payments required" state from `docs/systems/artist-tools/SPEC.md` — it is a P0 fix under 2 hours
16. Sort the shows list by date ascending in `admin.html` — the P0 fix from `docs/systems/artist-tools/PATH-TO-10.md`
17. Add the star toggle confirmation animation — referenced in `docs/systems/artist-tools/PATH-TO-10.md` as P0
18. Open `fan.html` and check the "Following feed" section loads with demo data — if the feed is empty, add the demo data from `docs/pages/fan/DESIGN-SPEC.md`
19. Verify the "Made with ABLE" footer link in `able-v7.html` contains a valid `?ref=` parameter — test that it routes correctly to `landing.html` or `start.html`
20. Read `docs/systems/copy/SPEC.md` — find the 8 "dashboard" violations listed and fix all of them in one pass across the active files

---

### Marketing (21–40)

21. Update your Instagram bio to: "Your music. Your fans. Your relationship. ↓" + ablemusic.co link with `?utm_source=instagram&utm_medium=bio&utm_campaign=always-on` → see `docs/systems/instagram-strategy/INSTAGRAM-DATA-AND-LEADS.md` Part 5, Week 1
22. Download your Instagram data archive: Settings → Accounts Centre → Your information → Download your information → JSON format → then open the JSON and identify your 20 highest-engagement posts → see `INSTAGRAM-DATA-AND-LEADS.md` Part 1.2
23. Set up Metricool free tier — connect Instagram and TikTok. Takes 10 minutes. You will now receive a weekly summary automatically → see `INSTAGRAM-DATA-AND-LEADS.md` Part 4.1
24. Write one Type A "you've been thinking this but haven't said it" post using one of the three example frames in `docs/systems/instagram-strategy/INSTAGRAM-DATA-AND-LEADS.md` Part 2.3. Do not post yet — just write it and save it.
25. Post the Type A observation post you wrote in #24. End it with a specific question. No ABLE mention. → see `SOCIAL-MEDIA-PLAN.md` Part 3
26. Take a 15–30 second screen recording of the ABLE pre-release campaign state — this is the Type B product-in-use Reel. Record it. Edit is optional today — just capture it.
27. Set up UTM-tagged bio link: use bit.ly or your own shortener to point to `ablemusic.co?utm_source=instagram&utm_medium=bio&utm_campaign=always-on` → see `INSTAGRAM-DATA-AND-LEADS.md` Part 3.6
28. Open your Instagram Insights (Profile → Professional Dashboard). Write down these four numbers: link-in-bio click rate, profile visit rate from last 3 posts, story tap-back rate, story tap-forward rate → see `INSTAGRAM-DATA-AND-LEADS.md` Part 1.4
29. Create your warm list document — open Apple Notes or Notion, create a note titled "ABLE Warm Leads", add the header row from `INSTAGRAM-DATA-AND-LEADS.md` Part 3.3. Add any artists already engaged with your content.
30. Post the Type B screen recording Reel you made in #26 — text overlay: "This is what an artist's page looks like at 11pm the night before a release." No CTA in the first 3 seconds.
31. Find 5 independent artists who commented on your last Instagram post that mentions music industry reality. Add them to your warm list. → see `INSTAGRAM-DATA-AND-LEADS.md` Part 3.3
32. Draft DMs for the top 3 warm list members who have engaged twice and show clear artist signals. Use the "Good" DM framework from `INSTAGRAM-DATA-AND-LEADS.md` Part 3.4. Send them.
33. Post the Type A observation post to X as a 3-tweet thread — expand the single thought into 3 connected observations → see `SOCIAL-MEDIA-PLAN.md` Part 2.4
34. Check your Instagram Story poll responses from the last 7 days — reply personally to every artist who voted or responded to a question sticker
35. Post one Story reposting your best-performing post from the last 3 months + a poll sticker ("Is this you?" / "Not me") + link sticker to ablemusic.co → see `INSTAGRAM-DATA-AND-LEADS.md` Part 2.4
36. Secure your handles on Threads: create an account matching your Instagram handle. Set the bio. Do not post anything yet. → see `docs/systems/social-media/ACCOUNT-STRATEGY.md` Part 2
37. Secure your YouTube channel. Set the name to "ABLE" or "ABLE Music". Upload the brand palette as a banner. No content required yet → see `ACCOUNT-STRATEGY.md` Part 2
38. Create the Facebook brand protection page. Set the profile photo, bio, and website. Do not invest time beyond this → see `ACCOUNT-STRATEGY.md` Part 2
39. Post one LinkedIn update about building ABLE — something specific about a product decision or market insight. Audience: labels, managers, music educators → see `ACCOUNT-STRATEGY.md` Part 2
40. Write a tweet about the campaign state system — "There is no other link-in-bio that knows whether you have a release coming, a gig tonight, or it's six weeks post-release. That distinction matters." → no edits, post it

---

### Legal / Admin (41–55)

41. Go to companies.house.gov.uk/register. Register ABLE Labs Ltd (or ABLE Music Ltd). Cost £50. Takes 25 minutes. This is the single most important easy win on the entire list → see `docs/systems/pathway/PRE-SHIFT-CHECKLIST.md` Financial — Business
42. Choose SIC code 62012 (Business and domestic software development) when registering → see `docs/systems/founder-roadmap/500-STEPS.md` step 2
43. Save your Companies House authentication code in 1Password immediately after registration — you need it for every annual confirmation statement → see `500-STEPS.md` step 5
44. Register for ICO (Information Commissioner's Office) at ico.org.uk/registration. Cost £40/year. Required before collecting a single fan email in production. Takes 10 minutes → see `PRE-SHIFT-CHECKLIST.md` Legal/Compliance and `500-STEPS.md` step 8
45. Open a Starling Business account online — takes 20 minutes, no monthly fee. Apply immediately after company formation → see `docs/systems/accounting/SPEC.md` Section 4 and `PRE-SHIFT-CHECKLIST.md`
46. Set up FreeAgent (£19/month) and connect it to your Starling Business account → see `docs/systems/accounting/SPEC.md` Section 4
47. Create a time log spreadsheet for R&D tracking: columns = date, activity description, hours, which qualifying R&D category. Start logging every build session from today. This is worth £13,706 in Year 1 alone → see `docs/systems/accounting/SPEC.md` Section 7
48. Register for Dext (receipt capture) — photograph every invoice from Netlify, Supabase, Anthropic. Connects to FreeAgent automatically → see `docs/systems/accounting/SPEC.md` Section 4
49. Set up Stripe account — not test mode, real mode. Connect to your business bank account. → see `PRE-SHIFT-CHECKLIST.md` Financial — Business and `docs/systems/accounting/SPEC.md` Section 5
50. Enable Stripe Revenue Recognition in the Stripe Dashboard → Settings → Revenue Recognition → enable → see `docs/systems/accounting/SPEC.md` Section 5
51. Enable Stripe Tax in the Stripe Dashboard — this auto-calculates and collects EU VAT from first EU subscriber → see `docs/systems/accounting/SPEC.md` Section 8
52. Set your Stripe payout schedule to weekly (not daily) — reduces FreeAgent reconciliation complexity → see `docs/systems/accounting/SPEC.md` Section 5
53. Transfer your domain (ablemusic.co) into the company's name once ABLE Labs Ltd is incorporated → see `docs/systems/pathway/PATHWAY.md` Part 3
54. Google "UK tech startup accountant R&D credits" + read 3 firms' sites. Budget £1,000–1,500/year. Book a free intro call with one → see `docs/systems/accounting/SPEC.md` Section 7 and `PATHWAY.md` Part 2
55. Run a trade mark search for "ABLE" in Class 41 (entertainment) and Class 42 (software) at the UK IPO website (ipo.gov.uk) — takes 15 minutes → see `PRE-SHIFT-CHECKLIST.md` Legal/Compliance

---

### Financial (56–65)

56. Open a Marcus, Chip, or Chase UK savings account and designate it as your emergency fund target. The target is 6 months of personal expenses → see `docs/systems/pathway/PATHWAY.md` Part 2
57. Calculate your actual monthly personal spend from the last 3 months of bank statements. Write the number down. Multiply by 6. That is your emergency fund target → see `PATHWAY.md` Part 2
58. Log into your Vanguard Stocks & Shares ISA (or open one at vanguard.co.uk) and check how much of the £20,000 annual allowance remains. If the tax year is still open (before 5 April), move funds in now → see `docs/systems/master-plan-alignment/MASTER-PLAN-ALIGNMENT.md` Domain 10
59. Get a pension transfer value statement from your current employer's pension provider — call HR or log into the portal. This takes 5 minutes to request → see `PATHWAY.md` Part 2
60. Set up the MRR tracking template from `docs/systems/accounting/SPEC.md` Section 3 — add it as a Google Sheet or Notion table: New MRR / Expansion MRR / Churn MRR / Contraction MRR / Net New MRR. Track from first paid user.
61. Get income protection insurance quotes from British Friendly, Holloway Friendly, and LV= — takes 20 minutes online. Note the premium for a £2,500/month benefit. → see `PATHWAY.md` Part 2
62. Set the company accounting year-end to 31 March in FreeAgent — aligns with UK tax year → see `docs/systems/accounting/SPEC.md` Section 1
63. Set aside 19% of all net profit in a dedicated "tax pot" account from first revenue day — automate this as a standing order if possible → see `docs/systems/accounting/SPEC.md` Section 1
64. Research the Portugal D8 Digital Nomad Visa requirements — minimum monthly income threshold, required documentation. Note them in `docs/systems/pathway/PATHWAY.md` Part 10 → see `MASTER-PLAN-ALIGNMENT.md` Domain 8
65. Find a UK/Portugal cross-border accountant — search "UK founder Portugal NHR accountant". Budget £500/year. Book an intro call → see `MASTER-PLAN-ALIGNMENT.md` Domain 8

---

### Community (66–73)

66. Create the ABLE Discord server. Name it "ABLE — Artist Community". Create channels: #general, #releases, #show-your-page, #bugs-and-feedback, #new-members → see `docs/systems/social-media/ACCOUNT-STRATEGY.md` Part 2
67. Write a welcome message for the ABLE Discord #general channel. Voice: direct, warm, one paragraph. Do not sound like a startup. Sound like a person → see `docs/COPY_AND_DESIGN_PHILOSOPHY.md` (or `docs/systems/copy/SPEC.md`)
68. Join r/WeAreTheMusicMakers and r/edmproduction on Reddit. As yourself, not a brand account. Read the top posts from the last week. Note 3 recurring frustrations that ABLE solves.
69. Comment (as yourself, not ABLE) on one Reddit post where an independent artist describes a problem ABLE solves. Be helpful. Do not pitch. → see `ACCOUNT-STRATEGY.md` Part 2
70. Find 3 UK music industry Discord servers to join as James (not as ABLE). Introduce yourself as building a platform for independent artists. Be a participant, not a promoter.
71. Find the Indie Hackers community and read the "Show IH" posts from the last 2 weeks. Find one founder building something adjacent to ABLE. Comment on their post with something genuinely useful.
72. Post a "building in public" tweet or Instagram story: one specific thing you shipped this week, one number (even if small), one thing you learned. Consistent practice → see `SOCIAL-MEDIA-PLAN.md` Part 1
73. Find MicroConf community and Indie Hackers Discord — join both. Find one other solo SaaS founder. Send them a message introducing yourself. The goal is a monthly check-in, not a pitch.

---

### Personal Brand (74–80)

74. Update your LinkedIn headline to: "Founder, ABLE — the independent artist's professional home" → see `docs/systems/pathway/PATHWAY.md` Part 8
75. Update your Twitter/X bio to mention ABLE as what you're building. Keep it specific: "Building @ablefm — link-in-bio for artists who care about who their fans actually are"
76. Update your Instagram personal bio to something honest and specific about what you're building — not a startup pitch, a person telling the truth about what they're doing
77. Take a screenshot of something you're proud of in the ABLE product. Post it to your personal account with one sentence about what makes it different. No hashtags. No exclamation marks.
78. Write a "why I'm building this" post — one specific moment that made you understand this problem. 3 paragraphs. Personal. Use your own voice. Save it. Post it when it feels right.
79. Audit your GitHub profile — does it link to ablemusic.co? Is the repo description accurate? Take 5 minutes to tidy it.
80. Check that all social media account recovery options (email, phone) are tied to a business email address, not your personal Gmail → see `docs/systems/pathway/PRE-SHIFT-CHECKLIST.md` Legal/Compliance

---

---

## MEDIUM WINS (101–200)

### Product (101–130)

101. Wire Supabase auth (magic link) — this is the single highest-priority product build. Without it, every artist loses their data if they clear their browser. Start with `supabase.auth.signInWithOtp()` → see `docs/STATUS.md` medium priority list and `docs/systems/data-architecture/SPEC.md`
102. Build the Supabase write path for `able_v3_profile` — on save in admin.html, `upsert` to the `profiles` table. The data model already exists in `docs/systems/data-architecture/SPEC.md`
103. Wire Supabase write for fan sign-ups — on fan capture in `able-v7.html`, `insert` into the `fans` table with `{email, ts, source, artist_id}`. Required before production → see `docs/systems/data-architecture/SPEC.md`
104. Deploy to Netlify and configure ablemusic.co DNS — the product is not real until it's at a real URL. Follow Netlify's custom domain setup. Takes 1–2 hours including DNS propagation wait → see `docs/STATUS.md` medium priority
105. Build the Ticketmaster events import — the spec is complete and ready to build in `docs/systems/integrations/SPEC.md`. The `ticketmaster-import.js` Netlify function code is already written. Build time: 4 hours.
106. Build the Spotify profile import — `spotify-import.js` Netlify function exists. Wire the `start.html` import step to call it and populate the profile fields → see `docs/systems/integrations/SPEC.md`
107. Build the accent colour picker in `admin.html` — the HTML snippet is in `docs/systems/artist-tools/SPEC.md`. Estimated build: 2 hours.
108. Set up Resend or Loops for transactional email — fan sign-up confirmation email needs a working delivery layer before production. Configure DKIM and verify the sending domain → see `docs/systems/pathway/PRE-SHIFT-CHECKLIST.md` Infrastructure
109. Write the fan sign-up confirmation email in ABLE voice — do not write "Thank you for signing up." Write something that sounds like it came from the artist. Reference the artist name dynamically → see `docs/systems/email/SPEC.md`
110. Build the artist welcome email sequence in Loops/Resend — 3 emails: Day 1 ("here's how to set your first CTA"), Day 3 ("your page has had X views"), Day 7 ("artists with a release date get 3x more fans") → see `docs/superpowers/plans/2026-03-14-james-master-strategy.md` Part 2
111. Set up PostHog (self-hosted or cloud) and wire the `landing_page_visit` event with UTM source/medium/campaign params → see `docs/systems/instagram-strategy/INSTAGRAM-DATA-AND-LEADS.md` Part 3.6
112. Wire the 5 PostHog funnel events: `landing_page_visit → onboarding_started → profile_created → first_fan_signup → upgrade_initiated` → see `docs/systems/growth-strategy/GROWTH-STRATEGY.md` Part 1
113. Set up Uptime Kuma (self-hosted) watching ablemusic.co and the Supabase endpoint — Slack or Telegram notification on downtime → see `PRE-SHIFT-CHECKLIST.md` Infrastructure
114. Set up UptimeRobot (cloud alternative, free tier) as a backup monitor → see `PRE-SHIFT-CHECKLIST.md` Infrastructure
115. Configure 1Password — add all critical credentials: Supabase, Stripe, Netlify, Resend, PostHog, HMRC Government Gateway, Companies House. Enable 2FA on all → see `PRE-SHIFT-CHECKLIST.md` Infrastructure
116. Protect the main branch on GitHub — no force pushes, require PR for merge → see `PRE-SHIFT-CHECKLIST.md` Infrastructure
117. Run a full grep for hardcoded secrets in the codebase — search for known key patterns (supabase URL, Stripe pk_, Anthropic sk-) before any code is public → see `PRE-SHIFT-CHECKLIST.md` Infrastructure
118. Write the privacy policy — plain English, published at ablemusic.co/privacy. Template from Genie AI, then personalise. Key sections: what's collected, where stored, how to delete → see `docs/systems/pathway/PATHWAY.md` Part 3 and `PRE-SHIFT-CHECKLIST.md` Legal
119. Write the terms of service — published at ablemusic.co/terms. Key clause: "fan data belongs to the artist" — write this explicitly. It is a competitive differentiator → see `PATHWAY.md` Part 3
120. Add the GDPR fan deletion flow — artist can delete individual fan records from admin.html, and deletion propagates to Supabase + Resend → see `PATHWAY.md` Part 3 and `PRE-SHIFT-CHECKLIST.md`
121. Wire the campaign state `pre-release` countdown to a specific release date in `able-v7.html` — verify that setting a future release date in admin.html correctly switches the public profile to pre-release state
122. Test all 4 campaign states on a real device (iPhone Safari, iOS 17+): profile, pre-release, live, gig — check every transition, every visual element → see `PRE-SHIFT-CHECKLIST.md` Product
123. Add the PWA manifest to `able-v7.html` — `manifest.json` with name, icons (at least 192px and 512px), theme_color matching the artist accent, display: standalone → see `docs/STATUS.md` future list
124. Fix the 2 critical SEO/OG card bugs listed in `docs/STATUS.md` → see `docs/systems/seo-og/SPEC.md`
125. Build the `campaignState` capture at sign-up — the P0.1 CRM action from `docs/systems/crm/SPEC.md`. Record which campaign state was active when the fan signed up. This is the single highest-ROI CRM action.
126. Build the Linktree import function — the spec and code are in `docs/systems/integrations/SPEC.md`. Parses `__NEXT_DATA__` JSON. Useful for onboarding artists who come from Linktree.
127. Test the fan sign-up to confirmation email flow on Gmail, Outlook, and Hotmail — these three clients have different rendering. Check the email renders correctly on all three → see `PRE-SHIFT-CHECKLIST.md` Product
128. Verify that `able_views` events in localStorage include a `source` field — if not, fix the tracking call to include `document.referrer` or UTM params
129. Build the state change toast — when an artist changes campaign state in admin.html, show a toast confirming what the public page now shows → see `docs/systems/artist-tools/PATH-TO-10.md` P1
130. Build release status badges in the music section — "Pre-release", "Out now", "Legacy" based on date comparison → see `docs/systems/artist-tools/PATH-TO-10.md` P1

---

### Marketing (131–150)

131. Post the Type B product-in-use Reel showing the pre-release campaign state: "This is what an ABLE page looks like 3 days before a single drops." Screen recording, 20 seconds, no voiceover opening → see `SOCIAL-MEDIA-PLAN.md` Part 2.3
132. Post the Type B Reel showing the gig mode: "I'm playing tonight" toggle activated. Artists need to see this working in context → see `SOCIAL-MEDIA-PLAN.md` Part 2.3
133. Write the "Made with ABLE" fan-to-artist funnel copy — the line that appears after the fan confirmation that says "Are you an artist? Build your page free →" — write this in ABLE voice, then wire it into the fan sign-up flow → see `docs/systems/growth-strategy/GROWTH-STRATEGY.md` Part 2 PLG Loop 1
134. Draft ABLE's SEO article #1 from the article plan in `docs/GROWTH_STRATEGY.md` — write it, don't publish yet. 800–1,200 words. Target an actual search term.
135. Set up a Metricool account and check the best posting times for your specific audience — this tells you when to schedule content → see `INSTAGRAM-DATA-AND-LEADS.md` Part 4.1
136. Create the 4 Instagram story templates for regular use: Type A post-ify, product demo, poll sticker, and link sticker. Build them in Canva or Figma using ABLE brand palette (Midnight Navy + Amber)
137. Write 5 Type A "observation" posts ready to schedule — one for each week of the next month. Save them in a Notes doc. The discipline is the volume → see `SOCIAL-MEDIA-PLAN.md` Part 2.3
138. Build the ABLE founding artists landing page — a separate section of landing.html (or a dedicated URL) where the first 10 artists can see they are the founding cohort and what that means. Copy: "You're one of 10. This means something." → see `docs/systems/growth-strategy/GROWTH-STRATEGY.md` Part 3
139. Write the founding artist outreach email — personalised, direct, no pitch. 3 paragraphs. Reference something specific about their music. End with a link to their profile (or the onboarding wizard). → see `docs/systems/growth-strategy/GROWTH-STRATEGY.md`
140. Post the founding artist outreach to the first 3 names on your list — these should be real artists you know or have engaged with, not cold outreach
141. Set up Later.com (free tier) for Instagram scheduling — schedule next week's content in one Sunday evening session → see `INSTAGRAM-DATA-AND-LEADS.md` Part 4.1
142. Draft a "building in public" thread on X — 5 tweets covering: the problem, the insight, what you've built, what's next, who you're building for → see `SOCIAL-MEDIA-PLAN.md` Part 1
143. Post the thread in #142 on a Tuesday or Thursday morning (highest X engagement windows for product/founder content)
144. Create a Notion or spreadsheet tracking the 4 Instagram metrics: link-in-bio click rate, profile visit rate, story-to-link rate, DM rate. One row per week. → see `INSTAGRAM-DATA-AND-LEADS.md` Part 1.4
145. Check your warm list — anyone who has been warm for 3 weeks without a direct conversation gets a DM today. Use the framework in `INSTAGRAM-DATA-AND-LEADS.md` Part 3.4
146. Set up the UTM tracking sheet — every UTM source/medium combination mapped to sign-up events in PostHog. Build the attribution picture from the first user. → see `INSTAGRAM-DATA-AND-LEADS.md` Part 3.6
147. Write the artist feature template for Instagram — one paragraph about the artist, one line about their ABLE page. The format for month 2 artist features → see `INSTAGRAM-DATA-AND-LEADS.md` Part 2.3 Type C
148. Create the ABLE press kit — 2 paragraphs about ABLE, 3 screenshots of the product, founder bio (50 words), key stats (artists, fans captured, campaign states). Keep it updated monthly.
149. Draft the first SEO article from `docs/GROWTH_STRATEGY.md` article plan. Publish it on ablemusic.co/blog (static page is fine at V1, no CMS needed). → see `docs/systems/growth-strategy/GROWTH-STRATEGY.md`
150. Set up the Abler programme spec from `docs/systems/growth-strategy/GROWTH-STRATEGY.md` — define what an Abler gets, the referral link structure, and the landing page copy. Do not build the technical layer yet — just the spec and the offer copy.

---

### Operations (151–165)

151. Install n8n locally on your Mac: `npm install -g n8n` then `n8n start` — verify it runs and the UI is accessible at localhost:5678 → see `docs/superpowers/plans/2026-03-14-james-master-strategy.md` Part 1
152. Install Ollama on your Mac and download the `phi4:14b` model: `ollama pull phi4:14b` — the lightweight model for fast, always-on tasks → see `docs/superpowers/plans/2026-03-14-james-master-strategy.md` Part 1
153. Download `llama3.3:70b` via Ollama — the general-purpose model for writing, strategy, iteration → see `docs/superpowers/plans/2026-03-14-james-master-strategy.md` Part 1 (requires Mac Studio M4 Max for 70B)
154. Build the first n8n workflow: Supabase new artist insert → Telegram notification to yourself: "New artist signed up: [email], Source: [source]" → see `docs/superpowers/plans/2026-03-14-james-master-strategy.md` Part 2
155. Build the n8n artist welcome sequence — trigger on new Supabase artist insert, fire Loops Day 1 email → see `docs/superpowers/plans/2026-03-14-james-master-strategy.md` Part 2 Artist Support Loop
156. Build the n8n churn detection workflow: no login for 14 days → fire churn re-engagement email via Loops → see `docs/superpowers/plans/2026-03-14-james-master-strategy.md` Part 2
157. Build the n8n weekly financial summary: pull Stripe MRR via API → generate plain-English summary with Ollama → send as Telegram message → see `docs/superpowers/plans/2026-03-14-james-master-strategy.md` Part 2 Financial OS
158. Set up Time Machine backup on your Mac to a 4TB external SSD (Samsung T9) — configure daily automatic backup → see `docs/systems/pathway/PRE-SHIFT-CHECKLIST.md` Hardware/Workspace
159. Enable GitHub Actions on the ABLE repo — add a basic lint check that runs on every push to prevent obvious JS errors shipping → see `docs/systems/coding-strategy/SPEC.md`
160. Set up the Notion alignment dashboard from `docs/systems/master-plan-alignment/MASTER-PLAN-ALIGNMENT.md` Part 6 — 10 domains, status colour, current metric, next action
161. Create a `docs/systems/master-plan-alignment/MONTHLY-REVIEW-2026-03.md` file using the template from `MASTER-PLAN-ALIGNMENT.md` Part 3. Fill in every domain honestly with current state.
162. Set up 1Password team vault — store all ABLE credentials with 2FA enabled on Stripe, Supabase, Netlify, GitHub → see `PRE-SHIFT-CHECKLIST.md` Infrastructure
163. Verify DKIM and DMARC are configured on the ablemusic.co email domain — use MXToolbox to check. Required before any email delivery → see `PRE-SHIFT-CHECKLIST.md` Infrastructure
164. Set up Supabase row-level security (RLS) — each artist can only read and write their own data. Test with two artist accounts → see `PATHWAY.md` Part 5 and `docs/systems/data-architecture/SPEC.md`
165. Upgrade Supabase to Pro (£25/month) — the free tier pauses after 7 days of inactivity. Not acceptable for a live product with paying artists → see `PRE-SHIFT-CHECKLIST.md` Infrastructure

---

### Learning (166–175)

166. Read the full `docs/systems/growth-strategy/GROWTH-STRATEGY.md` end to end — note the one mechanism you haven't started that has the highest leverage at this stage
167. Read `docs/systems/crm/SPEC.md` end to end — the CRM build is more sophisticated than a spreadsheet. Understand the data model before touching the code.
168. Read `docs/systems/monetisation/SPEC.md` — understand the full tier gate logic before building Stripe → see `docs/STATUS.md` tier gate system entry
169. Spend 30 minutes in the Linktree product as an independent artist — set up a profile, try to do what ABLE can do. Note everything that ABLE does better, and everything Linktree does that ABLE doesn't yet do.
170. Read 5 artist testimonials on Koji.co or Linktree's website — what do artists actually say they value? Do these map to ABLE's pitch? Note any gaps.
171. Read the Supabase documentation for Row Level Security (RLS) — 30 minutes. You will need this before any real user data lives in Supabase → see `docs/systems/data-architecture/SPEC.md`
172. Watch a PostHog "getting started with funnels" tutorial — 20 minutes. Understanding the tool before you need to read it under pressure matters → see `docs/systems/master-plan-alignment/MASTER-PLAN-ALIGNMENT.md` Domain 4
173. Read `docs/systems/investor-strategy/INVESTOR-STRATEGY.md` — not to start fundraising, but to understand what signals investors look for. It shapes what to measure now.
174. Read one competitor's changelog or product update from the last 3 months (Linktree, Koji, bio.fm, Beacons). Note: what did they build? What does it tell you about where the market is going?
175. Read `docs/systems/world-map/SPEC.md` — the World Map (calendar view) has P0 bugs. Understand the spec before fixing them.

---

### Relationships (176–185)

176. Identify 3 independent artists you genuinely respect who are releasing music in the next 60 days. Reach out as a person (DM or email), not as ABLE. Tell them what you're building and offer them a founding artist profile.
177. Find one music industry person (producer, manager, A&R) in your existing network who would understand ABLE's value immediately. Have a real conversation — not a pitch. Ask what they'd need to recommend it to their artists.
178. Find a music-focused accountant or advisor who has worked with indie artists. Connect on LinkedIn. They are a future referral partner: every artist they advise is a warm ABLE lead.
179. Find a SaaS founder at a similar stage (pre-revenue, solo, building with AI). Book a 45-minute call. The goal is a monthly peer check-in, not a business development conversation → see `PATHWAY.md` Part 7 Support system
180. Identify the 5 people who need to hear the ABLE exit story personally before you post about it publicly — not colleagues, not family generically, but the 5 specific people whose opinion you genuinely value → see `PATHWAY.md` Part 8
181. Connect with a UK-based startup solicitor (Founder-friendly firms: Lawpath, Juro, or a recommended intro). Get on their email list. Have £200–400 budgeted for ToS review → see `PATHWAY.md` Part 3
182. Find a physiotherapist who specialises in cervical spine — not a general physio. Book an assessment. This is a non-negotiable on the pre-shift checklist → see `PRE-SHIFT-CHECKLIST.md` Personal and `PATHWAY.md` Part 7 Health
183. Identify a co-working space near your location. Book a trial day. Note what it does for your focus and energy → see `PATHWAY.md` Part 7 Loneliness
184. Find one music journalist or music industry blogger who covers independent artist tools. Follow them. Understand what they write about before you pitch ABLE to them.
185. Identify a therapist or coach you could see in Year 1 — not because anything is wrong, but because the first year of solo founding benefits from consistent outside perspective → see `PATHWAY.md` Part 7 Mental health

---

### Health (186–195)

186. Do the C5/C6 morning routine right now — the full sequence: cat-cow (10 reps), chin tucks (10 reps), wall angels (10 reps), bird-dog (10 each side), dead bug (10 each side) → see `docs/systems/master-plan-alignment/MASTER-PLAN-ALIGNMENT.md` Domain 9 non-negotiables
187. Set an alarm at 22:30 every night labelled "Stop. Close the laptop." Do not override it on weekdays → see `MASTER-PLAN-ALIGNMENT.md` Domain 9 non-negotiables
188. Put a calendar block every morning for 20 minutes labelled "Morning protocol — not negotiable" before any work begins
189. Audit your current desk setup — is the monitor at exact eye level? If not, find a book or box to prop it up today. This is the most impactful 2-minute health action you can take → see `PRE-SHIFT-CHECKLIST.md` Hardware/Workspace
190. Research the Mito Red Light or equivalent red light therapy panel — add to cart. Budget: £150–250. Schedule 10-minute daily use at neck/upper back → see `docs/systems/pathway/PATHWAY.md` Part 6 and `PRE-SHIFT-CHECKLIST.md`
191. Set a 90-minute work timer right now. When it rings, stand up and do 5 minutes of movement — do not stay seated → see `MASTER-PLAN-ALIGNMENT.md` Domain 9 non-negotiables
192. Book a GP appointment to discuss the C5/C6 — get a referral letter ready for private physio or MRI if needed. Having the referral is faster than starting from zero → see `PATHWAY.md` Part 7 Health
193. Research private MRI at Nuffield Health or BMI Healthcare — note the cost and booking process. This is the clearest signal on disc status → see `PATHWAY.md` Part 7 Health
194. Look up strength training gyms within 20 minutes of your home or work. The target is 3x/week. Booking a trial session is the first action → see `MASTER-PLAN-ALIGNMENT.md` Domain 9 non-negotiables
195. Track your sleep start and wake time for 7 days — just in Apple Health or a note. You cannot improve what you're not measuring. The target is in bed by 22:30 → see `MASTER-PLAN-ALIGNMENT.md` Domain 9 non-negotiables

---

---

## HARD WINS (201–300)

### Product (201–240)

201. Build full Supabase auth + magic link sign-in on `admin.html` — this is the foundational unblock. Without it, no real user data survives. Block a half-day. → see `docs/systems/data-architecture/SPEC.md` and `docs/STATUS.md` medium priority
202. Wire all admin.html mutations to write to Supabase in addition to localStorage: saveProfile, saveFans, saveClicks, saveShows, saveSnapCards, saveConnections → see `docs/systems/data-architecture/SPEC.md`
203. Build the Supabase Row Level Security (RLS) policies for all tables — test with two artist accounts accessing each other's data (they should not be able to) → see `docs/systems/data-architecture/SPEC.md`
204. Build the GDPR fan deletion flow end-to-end: admin.html delete button → Supabase delete → Resend/Loops contact delete → event tracking anonymise → test manually → see `PATHWAY.md` Part 3 and `PRE-SHIFT-CHECKLIST.md` Legal
205. Wire Stripe subscriptions — create a Stripe product for each tier (Free, Artist £9/mo, Artist Pro £19/mo, Label £49/mo), wire the subscription creation on upgrade flow, confirm the webhook upgrades the artist record in Supabase → see `docs/systems/monetisation/SPEC.md` and `PRE-SHIFT-CHECKLIST.md`
206. Test Stripe webhook: make a real £1 test payment, confirm the webhook fires, confirm the artist account is upgraded in Supabase, confirm the payment appears in FreeAgent → see `PRE-SHIFT-CHECKLIST.md` Product
207. Build the full artist onboarding Supabase persistence path: start.html wizard completion → Supabase insert to `profiles` table → admin.html auth picks up the profile → all fields populated → see `docs/systems/data-architecture/SPEC.md`
208. Complete the fan.html Following feed — wire it to real Supabase data (artists the fan has signed up for) and display their latest release/gig using the `able_shows` and `able_v3_profile` data → see `docs/STATUS.md` and `docs/pages/fan/DESIGN-SPEC.md`
209. Build the Netlify deploy pipeline: push to `main` → Netlify build → live at ablemusic.co. Set environment variables (Supabase URL + anon key, Stripe keys) in Netlify dashboard → see `docs/STATUS.md` medium priority
210. Build the SEO/OG card system fully — fix the 2 critical bugs from `docs/systems/seo-og/SPEC.md`. Verify with Twitter Card Validator and LinkedIn Post Inspector → see `docs/systems/seo-og/SPEC.md`
211. Build the Spotify import full path: `start.html` step 0 → Netlify function calls Spotify Web API → populates artist name, genre, profile image, latest release → saves to Supabase profile → see `docs/systems/integrations/SPEC.md`
212. Build the Ticketmaster events import: Netlify function `ticketmaster-import.js` (code already in `docs/systems/integrations/SPEC.md`) → wire to admin.html "Import shows" button → populate `able_shows` → see `docs/systems/integrations/SPEC.md`
213. Run a complete Playwright smoke test suite across all 5 pages — `able-v7.html`, `admin.html`, `start.html`, `landing.html`, `fan.html` — write the test scripts, run them, confirm pass → see `PRE-SHIFT-CHECKLIST.md` Product
214. Build the Close Circle payments required state — see spec in `docs/systems/artist-tools/SPEC.md`. Artists who haven't connected Stripe see a specific empty state: "To start receiving support, you need to connect Stripe."
215. Build the n8n Instagram-to-ABLE pipeline: Supabase new artist insert where `source = 'instagram_bio'` → n8n Telegram alert → "DM this artist within 24 hours" → see `docs/systems/instagram-strategy/INSTAGRAM-DATA-AND-LEADS.md` Part 4.3
216. Build the full artist welcome email n8n sequence — Day 1, 3, 7 — integrated with Loops.so API. Test with a real email address. Confirm all three arrive correctly with correct copy → see `docs/superpowers/plans/2026-03-14-james-master-strategy.md` Part 2
217. Build the churn re-engagement n8n flow — 14 days no Supabase auth.sign_in → Loops email fires → track click-through back to admin.html → see `docs/superpowers/plans/2026-03-14-james-master-strategy.md` Part 2
218. Build the World Map P0 bugs: multi-moment panel, empty state, nav button sizing, section heading, focus trap — see `docs/systems/world-map/SPEC.md` and `docs/STATUS.md` for the full bug list
219. Build the clips/reels section in `able-v7.html` — V1 scope: YouTube Short + TikTok embeds, modal overlay player, artist admin management, `able_clips` localStorage key → see `docs/systems/reels-feed/SPEC.md`
220. Build the freelancer profile page (`freelancer.html`) — start from the spec in `docs/v6/operational/FREELANCER_SPEC.md`. This is Phase 2 but pre-spec it now with a half-day session → see `docs/STATUS.md`
221. Build the press pack / EPK auto-generation — a single exportable page that pulls from the artist's profile: bio, links, recent release, photos. One-click copy or PDF → see `docs/STATUS.md` medium priority
222. Build the Spotify deploy system: on first artist profile save, deploy a Supabase record that is publicly accessible at a predictable URL — the artist's public profile URL structure → see `docs/systems/integrations/SPEC.md` P0 Spotify deploy
223. Build the CRM P0.1 action: capture `campaignState` at fan sign-up moment — store in the fan record alongside `{email, ts, source}` → see `docs/systems/crm/SPEC.md` P0.1
224. Audit every PostHog funnel event name against the spec in `docs/systems/analytics/` — confirm all events fire correctly in production and appear in the PostHog dashboard → see `docs/STATUS.md` analytics schema
225. Build full PWA installability: `manifest.json`, service worker caching, add-to-home-screen prompt — test on iPhone Safari and Android Chrome → see `docs/STATUS.md` PWA/installability
226. Run the complete pre-shift product checklist from `docs/systems/pathway/PRE-SHIFT-CHECKLIST.md` Product section — all 10 items. Any that fail are bugs to fix now.
227. Build the Last.fm proxy for listener counts — spec in `docs/systems/integrations/SPEC.md`. This replaces the (unavailable) Spotify monthly listeners endpoint → see `docs/STATUS.md` integrations
228. Build the error states for all empty/loading/failed conditions across all 5 pages — full spec in `docs/systems/error-states/SPEC.md`
229. Write a full suite of 50 Playwright tests against `docs/USER-STORIES.md` acceptance criteria — run them all. This is the quality gate before any real user traffic → see `docs/STATUS.md` Playwright references
230. Build Stripe Connect for artist support payments — Close Circle Phase 1: artist connects Stripe → fan can tip/pay → ABLE takes 0% in V1 (Stripe fee only) → see `docs/systems/artist-tools/SPEC.md` Close Circle section and CLAUDE.md support section copy

---

### Growth (231–250)

231. Find 10 independent UK artists who are in active pre-release right now. DM all 10 personally using the framework from `INSTAGRAM-DATA-AND-LEADS.md` Part 3.4. Track responses.
232. Build the founding artists programme end-to-end: landing page copy, outreach email sequence, Discord onboarding, and the founder DM within 24 hours of sign-up → see `docs/systems/growth-strategy/GROWTH-STRATEGY.md` Part 3
233. Get 3 real artists to build profiles on ABLE. Be present during their onboarding. Watch them use the product. Note every moment of friction. This session is more valuable than any code you write → see `docs/systems/founder-roadmap/ANALYSIS.md` The Three Things
234. Publish the first SEO article on ablemusic.co/blog — 800–1,200 words, targeting an artist-relevant search term from `docs/GROWTH_STRATEGY.md` article plan. Include internal links to the landing page.
235. Set up the "Made with ABLE" fan-to-artist funnel — the secondary CTA on the fan sign-up confirmation screen. Build it, test it, and measure the conversion rate using PostHog → see `docs/systems/growth-strategy/GROWTH-STRATEGY.md` Part 2 PLG Loop 1
236. Design and build the Abler referral programme — a page on ablemusic.co/abler that explains the programme, the referral link structure, and the earnings calculator → see `docs/systems/growth-strategy/GROWTH-STRATEGY.md`
237. Build the artist discovery page — a non-algorithmic directory of ABLE artists. Sort by genre/vibe. No vanity metrics. Just "find artists like you" → see `docs/STATUS.md` future list and `docs/reference/research/DISCOVERY_AND_GROWTH.md`
238. Plan and execute ABLE's first artist feature on Instagram — find an artist who is a beta user, write a genuine 4-line feature about their music, post it, tag them. Track reshares. → see `INSTAGRAM-DATA-AND-LEADS.md` Part 2.3 Type C
239. Get one press placement — find one music tech journalist or newsletter writer who covers independent artist tools. Pitch them a 3-sentence product story. The story: "A UK solo founder built the only link-in-bio that knows what moment of your artist career you're in."
240. Get 10 artists on the platform actively (logged in within 30 days) — this is a gate on `PRE-SHIFT-CHECKLIST.md`. This is a sales action, not a product action. Track how many conversations it takes to get to 10.

---

### Business / Financial (241–260)

241. Formulate your full pre-exit financial plan: calculate emergency fund target, ISA remainder, pension decision, income protection premium — one document with all the numbers → see `PATHWAY.md` Part 2
242. Complete all 15 items in the `PRE-SHIFT-CHECKLIST.md` Financial — Personal section. Each item is a 20-minute action. Block a half-day.
243. Engage an accountant — find one, have the intro call, confirm they understand SaaS revenue recognition and R&D tax credits. Budget £1,000–1,500/year → see `docs/systems/accounting/SPEC.md` Section 4 and `PATHWAY.md` Part 2
244. Set up your R&D tracking spreadsheet and log every hour spent on the 5 qualifying activities from `docs/systems/accounting/SPEC.md` Section 7 retroactively from today. This is potentially £13,706 in Year 1.
245. Build the financial model — a spreadsheet projecting from £0 MRR to the job exit trigger (£5,000 MRR) with assumptions: monthly new artists, conversion rate to paid, churn rate, growth rate → see `docs/systems/founder-roadmap/ANALYSIS.md` Runway section
246. Get a cross-border UK/Portugal accountant intro call — find them via "UK founder Portugal NHR accountant" search. This is not urgent now but requires 6 months of lead time → see `PATHWAY.md` Part 10 and `MASTER-PLAN-ALIGNMENT.md` Domain 8
247. File ABLE Labs Ltd IP assignment — a simple one-page document assigning all code, brand, and domain assets from James Cuthbert to ABLE Labs Ltd. Generate via Genie AI → see `PATHWAY.md` Part 3
248. Set up the salary vs dividend structure with your accountant: £12,570/year salary (personal allowance, tax-free) + dividends on profit. Do not guess at this — confirm the structure before first revenue → see `docs/systems/accounting/SPEC.md` Section 1
249. Register for EU VAT OSS via HMRC before taking first EU paid subscriber — the process is at gov.uk/government/publications/vat-one-stop-shop-registration → see `docs/systems/accounting/SPEC.md` Section 8
250. Complete the `PRE-SHIFT-CHECKLIST.md` Financial — Business section (12 items) entirely. These are the gatekeeping items before any paying artist joins → see `PRE-SHIFT-CHECKLIST.md`

---

### Personal Readiness (251–265)

251. Take one week of annual leave and work on ABLE full-time from home — a trial run of the post-exit rhythm. Note: when do you start? When do you stop? Do you go outside? → see `PATHWAY.md` Part 7 Routine testing
252. Write your "why I'm building ABLE" document — one page, for yourself, not for investors. Read the north star section of the master strategy first → see `docs/superpowers/plans/2026-03-14-james-master-strategy.md` Part 0
253. Identify and book a co-working space for one day — even if you work from home most days, the one day a week matters for energy, human contact, and perspective → see `PATHWAY.md` Part 7 Loneliness
254. Start a weekly 5-sentence journal: what changed this week, what's blocked, what you learned, how your body feels, one thing you're grateful for. Not for ABLE — for you. → see `PATHWAY.md` Part 7 Mental health
255. Find and engage a physiotherapist who specialises in cervical spine issues — not just any physio. Have an assessment. Begin a monthly maintenance relationship → see `PRE-SHIFT-CHECKLIST.md` Personal
256. Build the hardware upgrade plan: Mac Studio M4 Max, external 4K display on monitor arm, standing desk converter, ergonomic keyboard and mouse, red light panel, UPS — with costs and timeline → see `docs/systems/pathway/PRE-SHIFT-CHECKLIST.md` Hardware/Workspace and `PATHWAY.md` Part 6
257. Research Portugal D8 Digital Nomad Visa requirements fully — income threshold, document list, timeline. Note the application window relative to your exit date → see `PATHWAY.md` Part 10 and `MASTER-PLAN-ALIGNMENT.md` Domain 8
258. Have one honest conversation with someone close to you about ABLE — what it is, why it matters, and that you are building toward leaving your job. Not a pitch. Just the truth. → see `PATHWAY.md` Part 7 Support system
259. Write your resignation letter — the complete text, warmed and professional. Save it. Do not send it. Reading it makes the exit feel real and pre-empts panic decisions → see `PATHWAY.md` Part 8
260. Write the "I'm all in" email to your founding artists — the one you send on exit day. Write it now. It tells you what you believe about ABLE and why it matters → see `PATHWAY.md` Part 8

---

### Systems (261–280)

261. Complete the full `docs/systems/master-plan-alignment/MASTER-PLAN-ALIGNMENT.md` monthly review for March 2026 — all 10 domains, honest current state, next single action per domain → see `MASTER-PLAN-ALIGNMENT.md` Part 2
262. Build the n8n weekly financial summary in full — Stripe MRR pull → Ollama plain-English summary → Telegram message every Monday at 07:00 → see `docs/superpowers/plans/2026-03-14-james-master-strategy.md` Part 2 Financial OS
263. Build the n8n market monitoring loop: Alpha Vantage API pulls S&P 500, BTC, Gold, GBP/USD at 07:00 → Ollama DeepSeek-R1 analyses vs position thresholds → Telegram if noteworthy → see `docs/superpowers/plans/2026-03-14-james-master-strategy.md` Part 2 Market Monitoring Loop
264. Set up the Notion alignment dashboard fully — all 10 domains, status colour codes, linked to live data where possible → see `MASTER-PLAN-ALIGNMENT.md` Part 6
265. Build the n8n "new artist from Instagram" pipeline: Supabase insert with Instagram source → Telegram DM prompt → "Reply to this artist within 24 hours" with their handle → see `INSTAGRAM-DATA-AND-LEADS.md` Part 4.3
266. Configure self-hosted PostHog on the Mac Studio — all ABLE analytics running locally, full data privacy, no per-event charges → see `MASTER-PLAN-ALIGNMENT.md` Domain 4 and `docs/superpowers/plans/2026-03-14-james-master-strategy.md` Part 1 tool stack
267. Install and configure the full Mac Studio AI stack when hardware arrives: Ollama + DeepSeek-R1 70B + Llama 3.3 70B + Qwen2.5-Coder 32B + Phi-4 14B + n8n persistent service → see `MASTER-PLAN-ALIGNMENT.md` Domain 3 and `docs/superpowers/plans/2026-03-14-james-master-strategy.md` Part 1
268. Run the quarterly strategy review process from `MASTER-PLAN-ALIGNMENT.md` Part 5 — re-read the full master strategy, update it based on what you've learned, run the 20-angle analysis
269. Build the ABLE Discord community infrastructure — channels, rules, welcome bot message, founding artist badge, pinned resources → see `docs/systems/social-media/ACCOUNT-STRATEGY.md` Part 2 Discord entry
270. Build the complete backup protocol: Time Machine to 4TB SSD (daily), GitHub private repo for all code, Supabase backup export monthly, 1Password for all credentials — test the restore process once → see `PRE-SHIFT-CHECKLIST.md` Infrastructure

---

### Transcendence (281–300)

*These are the wins that compound everything else. They require significant focus and are not tasks — they are shifts.*

281. Complete every item in `docs/systems/pathway/PRE-SHIFT-CHECKLIST.md` — all 79 items. Every green box is one step closer to handing in your notice from a position of strength.
282. Get 50 artists actively using the product (logged in within last 30 days) — the gate from `PRE-SHIFT-CHECKLIST.md`. This is not a product task, it is a sales and marketing task.
283. Get 10 paying artists — the gate from `PRE-SHIFT-CHECKLIST.md`. This is the first evidence of willingness to pay. The first £90/month is not about money — it is about signal.
284. Reach £2,000 MRR — Gate 1 from `docs/systems/master-plan-alignment/MASTER-PLAN-ALIGNMENT.md` Domain 7. This is approximately 222 paying artists on the Artist tier. Sustained for 30 days.
285. Reach £5,000 MRR for 3 consecutive months — the job exit trigger from `docs/systems/pathway/PATHWAY.md` Part 1. The full green-light condition. This is the number.
286. Send the NPS survey to all active artists — read the results, identify the top 3 recurring themes, build the features that address them → see `PRE-SHIFT-CHECKLIST.md` Product
287. Ship the freelancer.html page live at ablemusic.co/freelancer — this opens the second user journey and doubles the addressable market in the existing music community → see `docs/STATUS.md` future
288. Publish 10 SEO articles on ablemusic.co/blog — one per month for 10 months. Track organic search traffic monthly. This builds the compound acquisition channel → see `docs/systems/growth-strategy/GROWTH-STRATEGY.md`
289. Get ABLE featured in one music industry newsletter (Hypebot, MBW, The Music Void, or equivalent) — pitch the campaign state system as the story. It is genuinely novel.
290. Build the analytics dashboard visible to artists in admin.html — showing fan growth over time, CTA click-through rate, top traffic sources, campaign state effectiveness → see `docs/STATUS.md` future analytics
291. Build ABLE Distribution — the first ABLE Labs product beyond the core platform. The spec starting point is in `docs/superpowers/plans/2026-03-14-james-master-strategy.md` Part 3 → not before £10k MRR
292. Engage two advisors from the music industry or SaaS world — 0.1–0.25% equity, 2–4 year vesting, advisory agreement via Genie AI. Their networks and judgment are worth far more than the equity → see `docs/systems/founder-roadmap/ANALYSIS.md` Team section
293. Apply for the Portugal D8 Digital Nomad Visa — once post-exit ABLE revenue is demonstrably stable and the D8 income threshold is met → see `PATHWAY.md` Part 10
294. Apply for Non-Habitual Resident (NHR) status in Portugal in the first year of residency — 10-year favourable tax treatment starts from NHR approval. This is a financial decision of significant long-term value → see `PATHWAY.md` Part 10
295. Hand in your notice — the right day, from a position of strength, with every pre-shift item complete. Send the personal messages before the LinkedIn update. Mark the day → see `PATHWAY.md` Part 8
296. Run ABLE's first R&D tax credit claim — with your accountant and a specialist firm (WhisperClaims or Ayming). At 1,500 qualifying hours, this is potentially £13,706 back in Year 1 → see `docs/systems/accounting/SPEC.md` Section 7
297. Get your first press feature as a founder — not just ABLE the product, but your story: the solo founder, the C5/C6, building with AI, the independent music conviction. This is the kind of story music press wants.
298. Build 50 paying artists to a place where word-of-mouth is generating sign-ups you did not directly cause — measure it via PostHog attribution. When 20%+ of signups come from organic referral, the product is working → see `docs/systems/growth-strategy/GROWTH-STRATEGY.md`
299. Wake up in Porto, open the n8n weekly digest, read the ABLE MRR line, close the laptop, and go for a walk. This is not a product action. It is the point of everything → see `docs/superpowers/plans/2026-03-14-james-master-strategy.md` Part 0 North Star
300. Re-read this document and cross off every item you've completed. The number you see is the evidence that this was real all along.

---

*Last updated: 2026-03-16*
*Cross-reference: `500-STEPS.md` for sequenced 90-day roadmap | `DAILY-ACTIONS.md` for the daily operating system | `ANALYSIS.md` for honest state assessment*
