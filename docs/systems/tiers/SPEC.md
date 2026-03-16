# ABLE — Tier System Spec
**System:** Tiers
**Version:** 1.0
**Date:** 2026-03-16
**Status:** ACTIVE — supersedes tier references in PLATFORM_STRATEGY.md and V6_BUILD_AUTHORITY.md §2.3 on any point this document addresses

---

## 0. Tier philosophy

Tiers at ABLE are not a lock-and-key access control system. They are a natural progression of how seriously an artist is treating their relationship with their audience.

A Free account is a real, complete product — not a crippled demo. A fan can sign up. The page looks good. The artist gets the four campaign states. This is the core product.

Artist and Artist Pro unlock the depth: more fans, more snap cards, better data, email broadcasts, fan membership. These are for artists who are ready to go deeper. They are not necessary for the first step.

**Gate design rule:** Every gated feature shows a blurred preview of what it looks like with real data, plus one specific sentence explaining the value. Never "unlock this feature." Always "see exactly which release brought each fan to your page."

**Upgrade trigger rule:** One upgrade nudge per session, maximum. Do not interrupt the artist's workflow with upgrade prompts on every action. The nudge is earned by reaching a genuine limit or a genuine moment of readiness.

---

## 1. Tier structure

### Free — £0/month

The starting point. No card required. The artist's profile is real and usable from day one.

**Profile and page:**
- Full artist profile page (able-v7.html) with all four themes and all seven vibes
- Custom handle: `ablemusic.co/[handle]` — claimed at signup, unique
- All four campaign states: profile / pre-release / live / gig — these are the core product
- Bio, hero CTA, secondary CTA, location, genre tag
- 3 Quick Action pills (link out to platforms, external URLs)
- Social links in footer: unlimited (these are just links)

**Fan capture:**
- Fan sign-up form on profile page
- Cap: 100 fans total. Progress bar visible from fan 1: "N/100 fans."
- At 95 fans: "Your list is nearly full. 100 people have asked to hear from you."
- Fan data stored: email, timestamp, source (UTM tag or direct)
- Fan data exportable as CSV (no feature gate on data portability — artist's data is the artist's data, always)
- No email broadcasts from Free tier
- ABLE branding on fan sign-up confirmation email: "Signed up via [Artist Name]'s ABLE page. Made with ABLE."

**Analytics:**
- Views: last 30 days, daily breakdown
- Clicks: last 30 days, by CTA label
- Fan count: total, no source breakdown
- No campaign attribution, no UTM breakdown, no source chart
- No historical data before the rolling 30-day window

**Snap cards:**
- 1 snap card maximum
- All snap card types available (release, show, update, custom)

**Embeds and content:**
- Spotify embed: yes (auto-detect from URL, inline player)
- YouTube embed: yes
- SoundCloud embed: yes
- Events section: yes (manual entry, unlimited events)
- Merch section: yes (external link only)
- Support section: not available (requires Artist)

**Import and connections:**
- Spotify import at signup: yes (one-time, pulls artist name, top tracks, genres)
- Linktree import at signup: yes (one-time, pulls existing links into Quick Action pills)
- No ongoing sync (one-time import only)
- Platform connections (Bandsintown, YouTube): yes, but manual refresh only

**Branding:**
- "Made with ABLE" quiet footer line — one line, `var(--color-text-3)`, links to `ablemusic.co?ref=[handle]`
- Cannot be removed on Free tier

**Support:**
- Community Discord / help docs only
- No direct support channel

---

### Artist — £9/month (£90/year — "2 months free")

For artists taking their relationship with their audience seriously. The tier where most artists who gig regularly and release music should live.

**Everything in Free, plus:**

**Profile and page:**
- Unlimited Quick Action pills
- 5 Snap Cards (up from 1)
- Snap card scheduling: publish at future date (basic, date only — not time)
- Remove ABLE branding from page footer
- Custom domain: `ablemusic.co/[chosen-slug]` (vs auto-generated handle) — or bring your own custom domain (Phase 2)

**Fan capture:**
- Fan sign-up: unlimited (no cap)
- Source breakdown in fan list: direct / Instagram / TikTok / YouTube / QR / email / other
- Basic fan list: email, join date, source
- Starred fans: ★ toggle on any fan row (stores in `able_starred_fans`)
- 1 email broadcast per month (plain text only)
  - Max recipients: 500 per send
  - Subject line + body text
  - {{first_name}} personalisation token if name was captured
  - Unsubscribe handled automatically
- No ABLE branding on fan confirmation email (artist's display name and domain only)

**Analytics:**
- 90-day rolling history (views and clicks)
- Source breakdown chart: where traffic comes from
- CTA performance: which pills and CTAs get the most taps
- Top fans by engagement (click count) — basic list, not full CRM

**Snap cards:**
- 5 snap cards (up from 1)

**Support packs:**
- Enabled: 1 price point, 1 pack type (one-time drop or monthly supporter — artist chooses one)
- Requires Stripe Connect setup (3-minute process, guided in admin)
- ABLE takes 5% on transactions

**Close Circle:**
- 1 membership tier
- Max 50 fans in Close Circle
- Content unlocks for Close Circle members (snap cards, exclusive links)

**Connections and import:**
- Ongoing Spotify sync: quarterly auto-refresh (pulls new releases, updates track list)
- Bandsintown connection: shows sync, events auto-import

**AI features (basic):**
- CTA copy variants: 3 suggestions per CTA type (Haiku model, 30/day limit)
- Caption generator: 3 Instagram/TikTok caption options when copying profile link (Haiku, 20/day)

**Support:**
- Email support (48-hour response target)

---

### Artist Pro — £19/month (£190/year — "2 months free")

For artists who are building a real audience relationship. Full CRM, unlimited broadcasts, advanced analytics, and the complete fan membership system.

**Everything in Artist, plus:**

**Fan CRM — full:**
- Unlimited fans (no broadcast cap for list size, see broadcast cap below)
- Full fan record per entry: email, name (if provided), join date, source, UTM parameters, campaign attribution, click history (which CTAs they've tapped), purchase history (if Stripe Connect active), show attendance (if Bandsintown connected)
- Campaign attribution: "Joined from pre-release campaign (Instagram reel, 14 Jan 2026)"
- Source chart with UTM breakdown
- Segmentation:
  - All fans
  - Fans from [specific campaign or date range]
  - Fans who clicked [specific CTA]
  - Fans who have not opened an email in 60 days
  - Starred fans only
- Fan notes: free-text note field on each fan record (not shown to fan, visible only to artist)
- CSV export: always available, includes all non-PII fields — email, join date, source, click count

**Stats — full:**
- Lifetime analytics history (from account creation, no rolling window)
- Campaign attribution with UTM breakdown
- Release campaign performance: pre-save clicks, stream clicks, fan sign-ups during campaign period
- Geographic breakdown: city-level (not street-level — privacy-preserving)
- Device type breakdown
- Top traffic sources over custom date range

**Email broadcasts — full:**
- Unlimited broadcasts (subject to Resend sending limits per plan)
- Max recipients per send: 2,000 (plain text)
- Rich text option: bold, italic, links, line breaks — no HTML templates
- Personalisation tokens: {{first_name}}, {{artist_name}}, {{show_city}}, {{release_title}}
- Preview before send: renders on a simulated mobile screen
- Open and click analytics per broadcast (within GDPR constraints — aggregate, not per-fan)
- Scheduled send: pick date and time
- Auto-unsubscribe handling
- Re-engagement segment: one-click "send to fans who haven't opened in 60 days"

**Snap cards — full:**
- Unlimited snap cards
- Snap card analytics: view count per card
- Scheduled publishing (date + time)

**Close Circle — full:**
- Unlimited membership tiers (e.g. "Inner Circle," "Day One," "Supporter")
- Unlimited fans per tier
- Exclusive snap cards per tier (visible only to Close Circle members of that tier or above)
- Exclusive link unlocks per tier
- ABLE takes 8% on Close Circle monthly subscriptions

**Support packs — full:**
- Multiple price points (up to 5 separate price tiers)
- All pack types: one-time drop, monthly supporter, lifetime fan
- Support pack analytics: which tier sells best, monthly recurring revenue from fan support

**AI features — full:**
- Bio writer: Sonnet model, 10/day — writes a 1-line bio in the artist's voice from 3 input words
- All Artist tier AI features
- Snap card copy suggestions: 3 variants per card type, Haiku, 20/day

**Auto-gig from calendar (Phase 2):**
- Connect Google Calendar → gig mode auto-activates on day of show
- Auto-expires 24h after show start time
- Manual override always available

**Bandsintown sync:**
- Automatic daily sync (not quarterly)
- Show ticket link update when sell-out status changes

**API access:**
- Read-only API for fan data (email list, sign-up timestamps, sources)
- For integrating with artist's own tools (Mailchimp export, Notion database, custom scripts)
- Rate limit: 100 requests/day
- Authentication: API key generated in admin dashboard

**Priority support:**
- 24-hour response target (not 48)
- Dedicated support email address (not general queue)

---

### Label — £49/month (£490/year — "2 months free")

For managers, small labels, and collectives managing multiple artists. The economics: 10 artists at Artist Pro would cost £190/month. Label tier is £49/month — £4.90 per artist vs £19 per artist standalone.

**Everything in Artist Pro, plus:**

**Multi-artist management:**
- 10 artist sub-accounts, each with their own complete Artist Pro profile
- Each artist has their own `ablemusic.co/handle`
- Label admin can switch between artist accounts from one login (no separate logins per artist)
- Label can invite artists to manage their own profiles (artist logs in, edits their own page, label retains view access)

**Team access:**
- 3 user seats per label account (label owner + 2 team members)
- Roles: Admin (full access) / Editor (can edit artist profiles, cannot change billing or account settings) / Viewer (read-only — for A&R who just need to see analytics)
- Invitation by email, access managed from label settings

**Aggregate analytics:**
- Cross-roster dashboard: total views, total fans, total CTA clicks across all 10 artists
- Per-artist performance comparison (which artists are growing fastest, which have highest fan capture rate)
- Email broadcast aggregate: delivery rate, open rate across roster (good for identifying deliverability issues)

**Email broadcasts — label:**
- Bulk broadcast to entire roster's fan list in one send
- Artist-specific merge fields still work (artist name, release info — auto-populated per artist)
- Useful for: label announcements, compilation releases, tour package with multiple acts

**Branding:**
- White-label confirmation emails: no ABLE branding on any fan-facing email from any sub-account
- Label's own domain for sending (custom sending domain setup — included in Label tier, Phase 2 for free/Artist)

**Account management:**
- Dedicated account manager (named person, direct contact)
- Monthly check-in call available (not mandatory)
- Priority onboarding: label gets a setup call when signing up, not just docs

**API access:**
- Full read/write API (not just read-only)
- Can programmatically create snap cards, update events, read fan lists
- Higher rate limit: 1,000 requests/day
- Webhooks: receive real-time notifications on fan sign-ups, CTA clicks, broadcast events

---

## 2. Feature matrix

| Feature | Free | Artist | Artist Pro | Label |
|---|---|---|---|---|
| Artist profile page | Yes | Yes | Yes | Yes (×10) |
| All 4 campaign states | Yes | Yes | Yes | Yes |
| All 4 themes + 7 vibes | Yes | Yes | Yes | Yes |
| Quick Action pills | 3 | Unlimited | Unlimited | Unlimited |
| Snap cards | 1 | 5 | Unlimited | Unlimited |
| Snap card scheduling | — | Basic (date) | Full (date + time) | Full |
| Fan sign-up | 100 cap | Unlimited | Unlimited | Unlimited |
| Fan source breakdown | — | Yes | Yes | Yes |
| Fan CRM (full) | — | — | Yes | Yes |
| Fan notes | — | — | Yes | Yes |
| Stats: history | 30 days | 90 days | Lifetime | Lifetime |
| Stats: UTM breakdown | — | — | Yes | Yes |
| Stats: geo breakdown | — | — | Yes | Yes |
| Email broadcasts | — | 1/month (500) | Unlimited (2,000) | Bulk (roster) |
| Email personalisation | — | {{first_name}} | Full tokens | Full tokens |
| ABLE branding on page | Yes | No | No | No |
| ABLE branding on emails | Yes | No | No | No (white-label) |
| Custom domain | — | Phase 2 | Phase 2 | Phase 2 |
| Support packs | — | 1 price point | Multiple | Multiple |
| Close Circle | — | 1 tier, 50 fans | Unlimited | Unlimited |
| Spotify sync | Signup only | Quarterly | Daily | Daily |
| Bandsintown sync | Manual | Auto | Daily auto | Daily auto |
| AI bio writer | — | — | Yes (Sonnet) | Yes |
| AI CTA variants | — | Yes (Haiku) | Yes | Yes |
| API access | — | — | Read-only | Read/write |
| Team access | — | — | — | 3 users |
| Multi-artist | — | — | — | 10 artists |
| Aggregate analytics | — | — | — | Yes |
| Account manager | — | — | — | Yes |
| Support | Community | Email 48h | Email 24h | Dedicated |

---

## 3. Gold lock pattern (every gated feature)

### Visual specification

When a feature is gated behind a higher tier, the UI shows:
- A blurred preview of the feature with real-seeming placeholder data
- An amber key icon (not a padlock — a key; you're unlocking something, not locked out of something)
- A single specific sentence of value copy
- A CTA: one specific upgrade action ("See fan sources — go Artist")

**Token:** `--acc` amber (`#f4b942`) for the glow and key icon — the same amber as the admin dashboard accent.

**CSS spec:**
```css
.tier-gate {
  position: relative;
  overflow: hidden;
}
.tier-gate .gate-blur {
  filter: blur(6px);
  pointer-events: none;
  user-select: none;
}
.tier-gate .gate-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(9, 9, 15, 0.72);
  border: 1px solid rgba(244, 185, 66, 0.3);
  border-radius: var(--r-lg);
  box-shadow: 0 0 0 1px rgba(244, 185, 66, 0.1),
              inset 0 0 32px rgba(244, 185, 66, 0.05);
}
.tier-gate .gate-key {
  /* key SVG icon, amber, 24px */
  color: #f4b942;
  margin-bottom: 8px;
}
.tier-gate .gate-copy {
  font: 500 13px/1.4 var(--font-body);
  color: var(--color-text-2);
  text-align: center;
  max-width: 200px;
  margin-bottom: 12px;
}
.tier-gate .gate-cta {
  /* pill CTA — amber border, amber text */
  font: 600 12px var(--font-body);
  color: #f4b942;
  border: 1px solid rgba(244, 185, 66, 0.5);
  border-radius: var(--r-pill);
  padding: 6px 14px;
}
```

### Copy rules for gate overlays

| Gated feature | Overlay copy |
|---|---|
| Fan source breakdown | "See which release brought each fan in. Artist." |
| Fan CRM (full) | "Know your 23 fans in Manchester before the show. Artist Pro." |
| Stats: 90-day history | "See how your page performed during your last campaign. Artist." |
| Stats: UTM breakdown | "Know exactly which posts drove sign-ups. Artist Pro." |
| Email broadcasts | "Send your record to the 67 people who asked for it. Artist." |
| Unlimited fans | "Your list is full. 100 people asked to hear from you. Artist." |
| Unlimited snap cards | "Tell the story beyond the release. Artist." |
| Support packs | "Let people support you directly — you keep 95%. Artist." |
| Close Circle (unlimited) | "Give your closest fans a home. Artist Pro." |
| Snap card scheduling | "Schedule your announcement for release day. Artist Pro." |
| Team access | "Add your manager to the dashboard. Label." |

**Rules:**
- Never use the word "upgrade" in overlay copy
- Always name the tier at the end (Artist / Artist Pro / Label)
- The value sentence is always specific ("23 fans in Manchester") not generic ("advanced analytics")
- One upgrade nudge per session. If the artist dismisses it, store `able_dismissed_nudges` — don't show again until next session.

---

## 4. Upgrade trigger moments

These are the specific moments in the artist's journey where upgrade intent is highest. Each has a specific intervention.

### Trigger 1: 100-fan limit reached
**Event:** Fan count hits 100.
**UI:** Progress bar `100/100` fills amber. Below: "Your list is full. These are 100 people who asked to hear from you. Don't leave them waiting."
**CTA:** "Keep your list growing — £9/month" — opens pricing modal
**Why this works:** Highest intent moment. Artist has proof the product works.

### Trigger 2: Release date set
**Event:** Artist enters a future release date in Campaign HQ.
**UI:** After saving: "You're getting ready for something. Artist trial gives you the full campaign toolkit — countdown, pre-save analytics, fan capture without the 100-fan limit."
**CTA:** "Try it free for 14 days" — auto-creates Stripe trial subscription
**Why this works:** Artist is in preparation mode. Investment in release = investment in tools.

### Trigger 3: Gig mode activated
**Event:** Artist toggles gig mode on.
**Same trigger as release date — 14-day Artist trial.**

### Trigger 4: First significant CTA activity
**Event:** 10 or more CTA clicks in a single day.
**UI:** In-dashboard notification (not a modal interruption): "12 people tapped your Spotify link today. Artist plan shows you which platform's doing best."
**CTA:** "See the full breakdown — Artist"
**Why this works:** Proof that the page is working. Curiosity creates upgrade intent.

### Trigger 5: Broadcast attempt on Free
**Event:** Free user clicks "Broadcast" (shown as a visible but gated option).
**UI:** Gate overlay: "Send your record to the 67 people who asked for it. Artist."
**CTA:** "Go Artist — £9/month"
**Why this works:** Artist understands the value and wants to act. Don't obstruct — convert.

### Trigger 6: Second snap card attempt on Free
**Event:** Free user tries to create a second snap card.
**UI:** "Add more of your story — you're limited to 1 snap card on Free. Artist gives you 5."
**CTA:** "Go Artist"

### Trigger 7: CRM curiosity on Artist
**Event:** Artist Pro feature (full CRM) viewed by Artist-tier user.
**UI:** Gate overlay with city-specific data (pulled from their actual fan geo data if available): "You have 14 fans in [city]. Artist Pro shows you who they are."
**CTA:** "Go Artist Pro — £19/month"

---

## 5. Annual billing

**Presentation rule:** Monthly price is the headline. Annual is an option, not the default.

**UI spec:**
```
Monthly    Annual (2 months free)
  £9/mo     [£90/yr ← selected / not selected]
```

When Annual is selected:
- Show: "£90 billed once a year. That's £7.50/month — 2 months free."
- Not: "Save 16.7%" — the "2 months free" framing is more tangible and converts better.

**When to show the annual prompt:**
- On initial pricing modal (both options visible)
- After 3 months on Monthly: "You've been on Artist for 3 months. Switch to annual — save 2 months."
- Never default to annual. Monthly optionality is important for indie artists on variable income.

---

## 6. Downgrade behaviour

When an artist downgrades from Artist/Pro to Free:
- Their fan list is preserved in full (it is their data)
- Their snap cards above the Free limit are hidden (not deleted) — visible again if they upgrade
- Their stats history is preserved but inaccessible (shown as locked, not deleted)
- Their campaigns and broadcasts stop
- ABLE branding re-appears on their profile page
- Fan limit re-activates at 100 (existing fans over 100 are preserved, new sign-ups are blocked)

**Copy:** "Your data is safe. It'll be here when you're ready to come back."

No warning email before downgrade (they chose this). Confirmation email after downgrade: "Your account is now on Free. Your fan list is safe — [N] fans are still there." + clear path to re-upgrade.

---

## 7. Pause option (churn reduction)

Instead of cancelling, any paid artist can pause their subscription for 1 month. During the pause:
- Profile page stays live (they don't lose their presence)
- They're downgraded to Free tier features for the pause period
- Fan list preserved in full
- At end of pause month, subscription auto-resumes
- One pause per 12-month period

**This significantly reduces hard cancellations.** Artists who pause and return have similar LTV to artists who never pause. Artists who cancel and return have much lower LTV (they've had time to find alternatives).

The pause option appears only in the cancellation flow — not as a persistent option in settings. When artist clicks "Cancel subscription," the first screen is: "Take a break instead? Pause for a month — your profile stays live and your fan list is safe."

---

*Authority: this file is the canonical tier spec. For monetisation commission details, see `docs/systems/monetisation/SPEC.md`. For gold lock visual implementation, see `docs/systems/DESIGN_SYSTEM_SPEC.md`. For upgrade trigger timing in admin.html, see `docs/pages/admin/DESIGN-SPEC.md`.*
