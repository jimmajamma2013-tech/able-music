# Admin Dashboard — Full Spec
**File: `admin.html` | Updated: 2026-03-15**
**Current score: 6.1/10 → Target: 9/10**

> This is the artist's daily home. Every decision here should serve one goal: help the artist feel in control of their music career without feeling like they're using software.

---

## THE JOB OF THIS PAGE

Give the artist confidence that their page is working, their fans are building, and they know exactly what to do next.

**Three things the dashboard must do:**
1. Show the artist that their page is alive — real numbers, real activity
2. Put Campaign HQ front and centre — the core action is changing their page's moment
3. Surface the right next action without the artist having to hunt for it

**What it must NOT feel like:**
- A CMS admin panel
- A SaaS analytics dashboard
- A settings screen

It should feel like a **backstage view** — professional, clean, warm, with just enough data to feel in control.

---

## DESIGN LANGUAGE

The dashboard deliberately uses a **different visual language** from the artist profile (able-v7.html):

| Token | Value | Reason |
|---|---|---|
| Background | `#e8e4dd` (warm cream) | Not the same dark as the profile — separates "you managing" from "what fans see" |
| Accent | `#f4b942` (amber) | Warm, active, different from profile accent — signals "this is your workspace" |
| Font | Plus Jakarta Sans | Slightly more functional than DM Sans — reads better at small sizes |
| Shell / sidebar | `#1a1a2e` (near-black navy) | Grounds the UI, makes the cream content area breathe |

**This contrast is intentional and should never be changed.** The profile page can be any theme/accent the artist chooses. The dashboard is always warm cream + amber. It's their backstage pass.

---

## NAVIGATION ARCHITECTURE

### Sidebar (desktop, 220px)

**Artist identity (top):**
```
[Avatar initials]
Artist Name
ablemusic.co/slug
```

**Navigation sections:**

```
OVERVIEW
  Home           ← default landing page

CONTENT
  Profile        ← name, bio, links, section visibility
  Music          ← Spotify/YouTube/SoundCloud/Bandcamp embeds
  Shows          ← upcoming gigs, ticket links
  Updates        ← snap cards (short posts)
  Connections    ← platform links
  Merch          ← store URL + featured items
  Fan support    ← subscriptions, tips, packs

DATA
  Analytics      ← traffic, sources, click rates
  Fans           ← fan CRM, list, star/export

BROADCASTS      ← Pro feature — email your list [🔒 lock on free]

Settings
```

**Rules:**
- Active page: accent left border + slight background tint
- Section labels: 9.5px, uppercase, very muted — structural dividers, not content
- No icons beside nav items — labels are clear enough
- Mobile: sidebar collapses to bottom tab bar (5 tabs: Home, Fans, Campaign, Analytics, More)

### Top bar (56px, sticky)

```
[Page title]                    [Edit page →]
```

- Page title updates to match current section ("Home", "Music", "Fans", etc.)
- "Edit page →" links to able-v7.html?edit=1 — always visible, always one tap away

---

## PAGE 1 — HOME (The daily view)

This is the most important page in the entire admin. It's what the artist sees every day.

### Greeting (top)

```
Good to see you, [Name].
[contextual sub based on time of day / current state]
```

**Sub-line rules:**
- Default: `Your page, your list, your relationship.`
- If pre-release active: `[X] days until [release title].`
- If gig tonight active: `Show tonight. Your page is in gig mode.`
- If 0 fans: `When fans sign up, they'll be here.`
- If first visit today: show the above
- If returning (visited today): show recent stat change: `+[N] fans since you last checked.`

Never write: "Welcome back!" or "You're all set!" — banned phrases.

---

### First-run checklist (shown until all 4 done)

Appears as a card above stats. Four steps, each checkable:

1. **Your profile is set up** — check artist name, bio, theme ✓
2. **Your link is ready** — `ablemusic.co/[slug]` — tap to copy
3. **Share it somewhere** — Instagram bio, TikTok profile, email footer
4. **Add your music** — Spotify, YouTube, or SoundCloud link

Progress bar below the steps (fills as each is completed). Dismissable once all 4 are done.

**Copy rule:** Each step has a headline action + a one-line sub explaining why. "Share it somewhere" → `"Your fans can't find you until you point them here."`

---

### Stats row (4 cards)

```
[Page views]  [Link clicks]  [Fans joined]  [Click rate]
  248           47              12              19%
  +18 today     +3 today        +2 today        —
```

**Design:**
- Warm white cards on cream background
- Stat value: 28px, medium weight
- Delta below: 11px, green if positive, muted if zero
- Sparkline above each stat (small, 40px tall) — 7-day trend, SVG, amber line
- Loading state: skeleton pulse (not spinner)

**What NOT to show:**
- No percentage growth unless there's meaningful baseline (>20 views)
- No "—" for delta when it's the first day — show "First day ✨" instead
- No raw timestamps — always relative: "today", "this week"

---

### Campaign HQ (the heart of the dashboard)

This section is the **primary product differentiator**. It must look like the most important part of the page — because it is.

**What it shows:**

Current state pill (large, prominent):
```
● Profile   /   ● Pre-release   /   ● Live   /   ● Gig Tonight
```
Active state is filled, others are ghost. Spring animation on switch.

**For each state — what the HQ shows:**

**Profile state (default):**
```
Your page is live.
                                [Campaign is quiet right now]
Releasing something?
[ Set a release date → ]
```

**Pre-release state:**
```
[Release title]
[Countdown: 3 days 14 hrs 22 mins]        ← live updating
[Timeline arc: ────●────────────]           ← pre / live / after
Auto-switches to Live on release date.
[ Edit release → ]
```

**Live state:**
```
[Release title] is out.
[Countdown: 12 days left in Live window]
Your page is in release mode.
[ Edit release → ]  [ Back to Profile ]
```

**Gig Tonight state:**
```
Gig mode is active.
Turns off automatically at midnight.      ← specific, not vague
[ Turn off early ]
[ Edit show details → ]
```

**The state switcher:**
Four large tap targets arranged horizontally. Each has:
- State name (16px, medium)
- One-line description (11px, muted)
- Current state: amber filled, rest: ghost bordered

Minimum 56px height each. No dropdown — always visible.

---

### "It's working" moment

A gentle card that appears when the artist first gets click or fan data:

```
It's working.
[N] people have visited your page.
[N] fan sign-ups — your list is building.
```

Appears once, stays until dismissed. Amber border, warm tone.

---

### Nudge system (below Campaign HQ)

Context-aware single nudge — one at a time, dismissable:

| Trigger | Nudge copy |
|---|---|
| 0 music links | `Your page has no music on it. Add a Spotify or YouTube link →` |
| 0 shows | `Playing anywhere soon? Your fans want to know →` |
| Pre-save but no release date | `You've got a pre-save CTA but no release date. Set one →` |
| 90+ fans, free tier | `You're at [N] fans. Free tier covers 100. After that, your list needs Artist tier →` |
| No snap card | `Updates are one of the most-clicked sections. Add a quick post →` |

**Rules:**
- Max 1 nudge visible at a time
- Dismiss stores to `able_dismissed_nudges` localStorage key
- Never show the same nudge twice (unless context changes)
- No exclamation marks in nudge copy

---

## PAGE 2 — PROFILE

The artist edits what fans see. Three sections:

### Identity card
- Avatar (upload or initials)
- Artist name (editable inline)
- Bio (editable, 160 char max, character counter)
- Slug / URL (editable, validates uniqueness)
- Accent colour (colour picker — same as onboarding)
- Theme (Dark / Light / Glass / Contrast)

### Platform links
Same as onboarding connections — detect platform type, show native pill.

### Section visibility + order
Toggle which sections appear on the artist's public page:
- Music toggle
- Shows toggle
- Updates toggle
- Merch toggle
- Fan support toggle

Drag to reorder. This writes to `able_v3_profile.sectionOrder`.

---

## PAGE 3 — MUSIC

Add embeds. Paste a URL, metadata fills automatically.

**Supported:**
- Spotify track / album / playlist
- YouTube video / Short
- SoundCloud track
- Bandcamp album

**Empty state:**
`Add your music. Paste a Spotify, YouTube, SoundCloud, or Bandcamp link.`
→ Not "No music added yet" — tell them what to do.

**Each item shows:** Platform icon + artwork + title + type badge + remove button.

---

## PAGE 4 — SHOWS

Add upcoming gigs. Each show:
- Venue name
- Date + time (date picker)
- Ticket URL (optional)
- Featured toggle (shows this gig in gig mode)

**Empty state:**
`Playing anywhere soon? Add the venue and date — your fans can get tickets without leaving your page.`

**Sorting:** Upcoming shows first (chronological), past shows collapsed below.

---

## PAGE 5 — UPDATES (Snap Cards)

Short posts/announcements. Think: Instagram story meets sticky note.

**Each snap card:**
- Text (140 chars max)
- Optional emoji header
- Optional link (becomes a CTA button)
- Active toggle (show/hide without deleting)

**Free tier:** 1 snap card. Artist tier: unlimited.

**Empty state:**
`Updates are one of the most-clicked things on an artist's page. Tell fans what's happening.`

---

## PAGE 6 — CONNECTIONS

Platform links that embed natively on the artist's page.

**Auto-detected from URL:**
- Spotify → Spotify embed
- YouTube → YouTube iframe
- SoundCloud → SoundCloud widget
- Bandcamp → Bandcamp embed
- Instagram → static link
- TikTok → static link

**Empty state:**
`Paste your platform links. We'll turn them into native embeds fans can use without leaving your page.`

---

## PAGE 7 — MERCH

- Store URL (Bandcamp / Shopify / any link)
- Featured items (up to 3): title, price, image URL, link
- Section visible toggle

**Empty state:**
`Got merch? Add your store link and up to 3 featured items.`

---

## PAGE 8 — FAN SUPPORT

Let fans support directly. Three modes:

| Type | Description |
|---|---|
| Tip jar | Single payment, any amount. Stripe link or Ko-fi/Buy Me a Coffee URL |
| Subscription | Monthly support. Patreon URL or ABLE-native (Pro tier) |
| Support pack | Specific offer: "£5 — get the demo EP" |

**Free tier:** Tip jar only (external link).
**Artist Pro:** ABLE-native subscriptions + packs.

**Empty state:**
`Let people support you directly. No platform takes a cut.`

---

## PAGE 9 — ANALYTICS

**Traffic section:**
- Page views over time (7d / 30d / 90d toggle)
- Traffic sources: Direct / Instagram / TikTok / Spotify / Other
- Source breakdown bar (horizontal proportional bar, colour-coded)

**Engagement section:**
- Click-through rate per CTA
- Which platform pills get clicked most
- Fan sign-up conversion rate (fans / views)

**Design rules:**
- No pie charts — bars only
- Numbers first, labels second
- Amber for primary metric line
- Muted grey for secondary
- Source colours match the canonical colour tokens in the CSS

**Pro gate:** 90-day history, geographic data, per-source conversion — blurred preview with: `"Full analytics from £19/month. See where your fans are coming from, not just how many."`

---

## PAGE 10 — FANS (CRM)

**The most emotionally important page in the admin.** This is where the artist sees their real fans.

### Fan list

Each row:
- Email address
- Join date (relative: "2 days ago", "Last week", "3 months ago")
- Source badge (Instagram / Spotify / TikTok / Direct — colour-coded)
- Star toggle (save specific fans)

**Sorting:** Newest first by default. Can sort by source.

**Filtering:** All / Starred / Instagram / TikTok / Spotify / Direct

**Free tier:** First 100 fans. At 90+: `"You're close to your 100 fan limit. Artist tier removes the cap."` At 100: soft gate with preview of fans 101–120 blurred.

**Empty state:**
`When fans sign up on your page, they'll appear here. Your list, your relationship — no algorithm between you.`

### Export
`Export as CSV →` — downloads all emails. Always available. Even on free tier. This is a trust commitment.

---

## PAGE 11 — BROADCASTS (Pro gate)

Compose and send an email to your fan list.

**Free/Artist tier:** Preview of the broadcast composer, blurred. Copy: `"Write to your fans directly. When you're ready: £19/month."`

**Artist Pro:** Full email composer:
- Subject line
- Body (rich text, not HTML — keep it simple)
- Preview text
- Send to: All fans / Starred fans / Fans from [source]
- Schedule: Send now / specific date+time
- Sent history

---

## MOBILE ARCHITECTURE (375px)

Sidebar collapses. Bottom tab bar shows 5 items:
```
[Home]  [Fans]  [Campaign]  [Content]  [More]
```

- Campaign tab opens Campaign HQ as a full-screen sheet
- Content tab opens a sheet with all content sections
- More opens remaining nav items

All tap targets minimum 56px. Bottom tab bar respects safe-area-inset-bottom.

---

## COPY PRINCIPLES

**Greeting rules:**
- Always use the artist's first name if known
- "Good to see you, [Name]." — warm, one beat, done
- Never: "Welcome back!", "Dashboard", "You're all set!"

**Section headlines:**
- "Fans" not "Fan CRM"
- "Shows" not "Events"
- "Updates" not "Snap Cards" (internal name only)
- "Broadcasts" not "Email campaigns"

**Empty states:**
- Always tell the artist WHAT to do
- Never just say what's missing
- Artist voice: "Playing anywhere soon?" not "No events added"

**Numbers:**
- Views: just the number, no units needed
- "2 fans joined today" not "Fan count: +2"
- "Your page has been visited 248 times" not "Total views: 248"

---

## CURRENT GAPS

| Gap | Severity | Fix |
|---|---|---|
| Campaign HQ state switcher too small on mobile | P0 | 56px tap targets, horizontal scroll on mobile |
| No contextual greeting sub-line (always shows default) | P1 | Wire to current state + recent activity |
| Nudge system exists but dismissal isn't persistent | P1 | Write dismissed IDs to localStorage |
| Fan list has no source filter pills | P1 | Add filter row above table |
| Analytics page is mostly empty/stub | P1 | Build charts from localStorage data |
| Broadcasts page is empty div | P1 | Build Pro-gated preview + full composer |
| No export button on Fans page | P1 | CSV export from localStorage data |
| Section visibility toggles exist but no drag-reorder | P2 | Add drag handle + sortable list |
| No "It's working" card logic | P2 | Wire to first click/fan event |
| Mobile bottom tab bar not implemented | P2 | Build 5-tab mobile nav |
