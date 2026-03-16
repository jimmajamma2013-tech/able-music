# Admin Dashboard — Copy First
**File: `admin.html` | Created: 2026-03-15**

> Every piece of copy in admin.html, written first. Build follows copy, never the other way.

---

## VOICE GUIDE FOR ADMIN.HTML

The dashboard has a different voice register to the public profile (able-v7.html). Both are ABLE voice, but:

- **Profile page**: artist's own first person voice — poetic, intentional, their world
- **Dashboard**: warm professional. ABLE talking to the artist. Like a smart manager, not a SaaS product. Direct, warm, never cheesy, never generic.

**The test for every dashboard copy line:** Would a respected independent music manager say this? If it sounds like a startup, rewrite it.

---

## GREETING SYSTEM

### Static (no data)
```
Good to see you, [Name].
Your page, your list, your relationship.
```

### Dynamic (context-aware sub-line)

| State | Sub-line |
|---|---|
| Day 0, first visit | Your page is live. |
| Pre-release active, >3 days | [N] days until [release title]. |
| Pre-release active, 1–3 days | [N] days. Your page is set. |
| Pre-release active, today | [Release title] is out today. |
| Live state, days 1–7 | [Release title] is out. This is your window. |
| Live state, days 8–14 | [N] days left in your live window. |
| Gig mode active | You're on tonight. |
| Post-gig (within 24h) | Last night at [venue]. [N] fans joined. |
| No campaign, quiet | Your page, your list, your relationship. |
| Returning (visited today) | +[N] [fans/visits] since you last checked. |

### Artist name rules
- Use first name only ("Nadia", not "Nadia Chen")
- If name is unknown: "Good to see you." (not "Good to see you, Artist")
- Extract first name from `profile.name` — take first space-separated token

---

## FIRST-RUN CHECKLIST

### Title
```
Four things, then you're live.
```
(Not: "Get your page working — 4 quick things")

### Steps

**Step 1 — Photo/artwork**
```
Title: Add a photo or piece of artwork
Sub: This goes at the top of your page — the first thing fans see
```

**Step 2 — Copy link**
```
Title: Copy your page link
Sub: Your link: ablemusic.co/[slug] — tap to copy it
```

**Step 3 — Share it**
```
Title: Put the link in your Instagram and TikTok bio
Sub: This is where your first fans will find you
```

**Step 4 — Music**
```
Title: Add your latest release
Sub: Paste a Spotify, YouTube, or SoundCloud link — artwork fills in automatically
```

### Completion moment
```
Your page is ready. This is where your fans start.
```
(Shown briefly before checklist dismisses — 2s then fade)

### Dismiss button
```
Hide this
```
(Not "Got it, hide this" — too affirmative)

---

## CAMPAIGN HQ COPY

### Section header
```
Campaign HQ
```

### State labels and descriptions

**Profile state**
```
Label: Your page
Description: Base profile. Fans see your latest release and who you are.
```

**Pre-release state**
```
Label: Pre-release
Description: Countdown is running. Fans can pre-save.
```

**Live state**
```
Label: Live
Description: Release window. Your music is front and centre.
```

**Gig Tonight state**
```
Label: Gig Tonight
Description: Tickets are front and centre. This switches off at midnight.
```

### State-specific body copy

**Profile state (quiet)**
```
Your page is live.
Releasing something?
[Set a release date →]
```

**Pre-release state**
```
[Release title]
[Countdown: 3 days 14 hours 22 minutes]
Switches to Live automatically on [date].
[Edit release →]
```

**Live state**
```
[Release title] is out.
[N] days left in your live window.
Your page is in release mode.
[Edit release →]  [Back to base →]
```

**Gig Tonight**
```
Gig mode is on.
Turns off at midnight.
[Turn off early]  [Edit show details →]
```

### Auto-switch hint
```
Switches automatically on [date].
```
(Not "Auto-switches" — "switches automatically" reads more naturally)

---

## STATS SECTION

### Stat labels
```
Visits
Clicks
Fans
Click rate
```
(Not "Link clicks", not "Fans joined" — shorter is better at the label level)

### Delta copy
```
+3 today
+12 this week
First day ✦   ← (when baseline is 0, day 1 only)
—             ← (when no delta data)
```

### Sparkline alt text (aria)
```
aria-label="[Stat name] over the past 7 days"
```

### Zero state copy (shown instead of shimmer on day 1)
```
0 visits yet
Put your link in your bio and they'll find you.
```
→ This replaces the indefinite shimmer for new artists

---

## NUDGE SYSTEM COPY

### Context-aware nudges (one at a time)

| Trigger | Nudge text |
|---|---|
| No music links | Your page has no music on it. Add a Spotify or YouTube link → |
| No shows | Playing anywhere soon? Your fans want to know → |
| Pre-save CTA but no release date | You've got a pre-save CTA but no release date. Set one → |
| 90+ fans, free tier | You're at [N] fans — 10 away from the free limit. Artist tier removes the cap. → |
| No snap card | Updates are one of the most-clicked things on a page. Tell fans what's happening → |
| No music for 60 days | Your last release was [date]. Anything new in the works? → |

### Nudge design rules
- Max 1 visible at a time
- No exclamation marks
- Tap target: the whole nudge card, not just an arrow
- Dismiss: × button, stores to `able_dismissed_nudges` in localStorage

---

## FAN LIST COPY

### Page title
```
Fans
```

### Empty state
```
When fans sign up on your page, they'll appear here.
Your list. Your relationship. No algorithm in the way.
```

### First fan milestone
```
Your first fan.
This is how every list starts.
```
(Appears as a card above the list, dismissible, shown once)

### Fan count line (above list)
```
[N] fans
```
(Not "You have N fans" — just the number and label)

### Fan cap warning (at 90/100)
```
You're close to your 100 fan limit. Artist tier removes the cap.
```

### Fan cap reached (at 100)
```
Your list is full. These are 100 people who wanted to stay close to your music.
When you're ready to grow beyond this, Artist tier removes the limit.
```
(Per §9.1 exact copy from V6_BUILD_AUTHORITY — do not change)

### Export button
```
Export as CSV →
```
(Always visible, always available)

### Export empty state
```
Export as CSV →
No fans yet.
```

---

## MOTIVATION MOMENTS

### "It's working" card (first click data)
```
Someone tapped a link.
See which one in [Analytics →]
```

### Fan milestone cards

**Fan #1**
```
Your first fan.
This is how every list starts.
```

**Fan #10**
```
10 fans.
10 people who said yes.
```

**Fan #50**
```
50 fans.
50 people your music reached directly.
```

**Fan #100**
```
100 fans.
100 people who asked to hear from you directly. Artist tier removes the cap.
```

### Streak / consistency (optional, future)
```
Your page has had visitors every day this week.
```

---

## SECTION EMPTY STATES

### Music
```
Add your music.
Paste a Spotify, YouTube, SoundCloud, or Bandcamp link.
```

### Shows
```
Playing anywhere soon?
Add the venue and date — your fans can get tickets without leaving your page.
```

### Updates (snap cards)
```
Updates are one of the most-clicked things on a page.
Tell fans what's happening.
```

### Connections
```
Paste your platform links.
We'll turn them into native embeds fans can use without leaving your page.
```

### Merch
```
Got merch?
Add your store link and up to 3 featured items.
```

### Fan support
```
Let people support you directly.
No platform takes a cut.
```

---

## TIER GATE COPY

### Upgrade bar (persistent, home page)
```
Free plan. Broadcasts, full fan analytics, and direct email when you're ready.
[See what's included →]
```
(After 3 visits: auto-hide until fan count reaches 50+)

### Broadcasts gate
```
Write to your fans directly.
Not a broadcast. Not a newsletter. Just you and the people who signed up.
From £19/month.
[See Artist Pro →]
```

### Analytics gate (full history)
```
Full analytics: see exactly which post sent you fans, for 90 days.
From £19/month.
[See Artist Pro →]
```

### Fan list gate (100+ fans)
```
Your list is at 100. Artist tier gives you unlimited fans, CSV export by source, and fan engagement history.
From £9/month.
```

---

## SETTINGS COPY

### Account section
```
Your account
[email address]
Magic link sign-in — no password required.
```

### Plan section
```
Your plan: Free
[See what's in each plan →]
```

### Danger zone
```
Delete your page
This removes your page and all fan data. This cannot be undone.
[Delete page]
```

---

## COPY TO NEVER USE IN ADMIN.HTML

- "Welcome back!" — banned
- "You're all set!" — banned
- "Get started" — banned
- "Upgrade now" — banned (use "See Artist Pro →" or "From £X/month")
- "Fan CRM" — internal term only, never user-facing
- "Dashboard" — page title stays "Home"
- "Content management" — use section names
- "Your campaign" — use "your page" or Campaign HQ label
- Exclamation marks on any functional copy
- "Engagement" — use "clicks" or "how people are using your page"
- "Grow your audience" — banned
- "Monetise" — banned
