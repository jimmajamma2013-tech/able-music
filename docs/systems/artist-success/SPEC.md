# ABLE — Artist Success: Specification
**Created: 2026-03-16 | Status: ACTIVE — the 30-day artist success playbook**

---

## Principles

1. ABLE is not a drip campaign. Every moment described here is triggered by what the artist actually did — or didn't do. Not by a timer alone.
2. Nudges are context-aware or they don't exist. "You should do something" is not a nudge. "You've had 12 visitors from Instagram but no fans yet — here's why that happens" is a nudge.
3. ABLE never pushes an artist toward something they've already done. Read the state first.
4. The first 30 days are about one thing: making the artist believe their page is worth maintaining.
5. No exclamation marks. No "congratulations". No "superstar". No "growing your audience".

---

## Data the success system reads

All signals come from existing localStorage keys. One new key is added: `admin_visit_dates`.

| Signal | Source | Used for |
|---|---|---|
| First ever visit | `admin_ever_visited` | Day 0 greeting |
| Fan count + timestamps | `able_fans` | Milestones, upgrade awareness |
| View events + sources | `able_views` | "Someone visited" signal, source breakdown |
| Release date | `able_v3_profile.releaseDate` | Campaign nudge targeting |
| Profile completeness | `able_v3_profile` fields | Page quality check |
| Admin visit history | `admin_visit_dates` (new) | Time-based nudge timing |
| Dismissed nudges | `able_dismissed_nudges` | Never resurface dismissed nudge |

### New key: `admin_visit_dates`

```javascript
// Called at the top of every admin.html init
function recordAdminVisit() {
  const today = new Date().toISOString().split('T')[0]; // "2026-03-16"
  const visits = JSON.parse(localStorage.getItem('admin_visit_dates') || '[]');
  if (visits[visits.length - 1] !== today) {
    visits.push(today);
    if (visits.length > 60) visits.splice(0, visits.length - 60); // keep last 60 days
    localStorage.setItem('admin_visit_dates', JSON.stringify(visits));
  }
}
```

This 10-line function is the foundation of all time-based nudge logic. Nothing else in this spec works without it.

---

## Day 0 — Setup complete

**Success criteria**: Page is live, link is copied.

**What exists (already built):**
- Wizard collects name, vibe, accent, CTA, release info
- Live preview phone shows the page being built
- Done screen has "Share" and "Open dashboard"
- First-run checklist in admin (§13 in admin DESIGN-SPEC)
- Greeting: "Good to meet you, [Name]." / sub-line: "Your page is live."

**What to add:**

On the done screen in `start.html`, after the "Your page is live" heading, add one line of contextual copy before the CTA buttons:

```
"Put that link in your bio before you close this tab."
```

This is the most underused real estate in the entire onboarding. The artist is at peak motivation. One sentence is enough.

In admin, the first-run checklist step for "Put the link in your bio" should:
- Show the full link prominently
- Have an inline [Copy link] button that copies immediately
- On mobile: show a "Share" button that opens the native share sheet

**Nudge on Day 0 (first-ever admin load):**

```
"Put your ABLE link in your Instagram bio. That's the whole strategy."
```

Inline [Copy link] button. Dismiss is persistent (`able_dismissed_nudges` → `'day0-bio-nudge'`).

---

## Day 1 — First share

**This is the most important moment in the artist's first week. It is currently almost entirely unsupported.**

**Success criteria**: Artist has shared the link. Proxy: at least 1 page view has appeared in `able_views`.

### If zero page views after 24–48 hours

Trigger: second admin.html load AND `able_views.length === 0`

Show the Day 1 share card — **full-width, not a nudge — a card**:

```
"Your page is live at ablemusic.co/[slug].

Have you shared it yet?"
```

Below the headline, two copy-ready caption blocks (tappable to copy):

**Instagram caption:**
```
[Link in bio — tap to find my music, upcoming shows, and what I'm working on.]
```
(Artist edits before posting — this is a starting point.)

**TikTok caption:**
```
[Link in bio — shows, music, and what's next.]
```

Card copy (below captions):
```
"Your page is ready. Share it in your bio and see who shows up."
```

Card actions:
- [Copy my link] — copies `ablemusic.co/[slug]` to clipboard
- [Copy Instagram caption]
- [Copy TikTok caption]
- [×] Dismiss (marks `'day1-share-card'` in `able_dismissed_nudges`)

Card auto-dismisses when artist copies the link. Does not dismiss just on scroll.

This card should appear at the top of the admin home section, above Campaign HQ, for any artist who has never had a page view.

---

### If 1+ page views (the first signal moment)

Trigger: `able_views.length > 0` AND `'day1-first-visit'` not in dismissed

Show amber milestone card:

```
"Someone visited your page."
```

If source data is available:
```
"Someone found you from [Instagram / TikTok / a direct link]."
```

If multiple views from the same source:
```
"[N] people have visited from [Instagram]."
```

Design: amber milestone card (same component as fan milestones). Manual dismiss only — no auto-dismiss. Dismiss key: `'day1-first-visit'`.

This is not a nudge. This is a moment. Treat it visually as such.

---

## Day 3 — First fans

**Success criteria**: Artist has at least 1 fan signed up.

### If 1+ fans — celebrate it

This is the most important milestone in the artist's first week. ABLE should acknowledge it.

**If exactly 1 fan:**
```
"Your first fan. This is how every list starts."
```

**If 2–4 fans:**
```
"[N] people signed up. They came because of you."
```

**If 5–9 fans:**
```
"[N] fans in [X] days. Your page is working."
```

Design: amber milestone card. Manual dismiss only. Dismiss key: `'day3-fan-milestone'`.

Do not push toward anything after this card. Let the moment breathe.

---

### If 0 fans after 3 days and some views

Trigger: `getDaysSinceFirstVisit() >= 3` AND `able_fans.length === 0` AND `able_views.length > 0`

```
"You've had [N] visitor[s]. None have signed up yet.

That usually means: the sign-up form is below the fold, or the page doesn't have enough content yet to earn it.

The most common fix: add a photo and a bio. Give people something to hold onto."
```

Action: [Edit my page →]
Dismiss key: `'day3-no-fans-views'`

---

### If 0 fans after 3 days and no views at all

Trigger: `getDaysSinceFirstVisit() >= 3` AND `able_fans.length === 0` AND `able_views.length === 0`

```
"Your page hasn't had any visitors yet.

The most direct path: put your link in your Instagram bio — not in a story, in the bio. That's where people look."
```

Action: [Copy my link →]
Dismiss key: `'day3-no-fans-no-views'`

---

## Day 7 — Check-in

**What ABLE does on the admin load that crosses the 7-day mark:**

Replace the normal greeting sub-line with a one-week summary (runs once, on the crossing load only):

```javascript
function buildWeekOneSub(fanCount, viewCount) {
  if (fanCount > 0 && viewCount > 0)
    return `${viewCount} visit${viewCount !== 1 ? 's' : ''}, ${fanCount} fan${fanCount !== 1 ? 's' : ''}. A real start.`;
  if (viewCount > 0 && fanCount === 0)
    return `${viewCount} visit${viewCount !== 1 ? 's' : ''} this week. Your first fan is close.`;
  return 'One week in. Your page is ready when your link is in your bio.';
}
```

**If artist has been away for 7+ days (returning after absence):**

Greeting sub-line:
```
"Good to see you. It's been [N] days."
```

If new fans since last visit:
```
"[N] new fan[s] since you were last here."
```

This is the V1 re-engagement mechanism. V2 adds an email at 7-day dormancy (requires Resend).

---

### Day 7 — release nudge

Trigger: `getDaysSinceFirstVisit() >= 7` AND `!profile.releaseDate` AND not dismissed

```
"Are you working on something?

Setting a release date turns on pre-release mode — countdown timer, pre-save CTA. Worth adding even for back-catalogue."
```

Action: [Set a release →] — opens Campaign HQ / release date picker
Dismiss key: `'day7-no-release'`

---

## Day 14 — Release nudge (persistent)

The existing §9.1 nudge cards fire after the artist has already set a date. This nudge fires for artists who have not.

Trigger: `getDaysSinceFirstVisit() >= 14` AND `!profile.releaseDate` AND not dismissed

```
"You've been on ABLE for a fortnight with no release campaign set.

Pre-release mode turns your page into a countdown with a pre-save CTA. Fans who sign up while it's counting down are arriving with momentum — they know something is coming."
```

Action: [Set a release →]
Dismiss key: `'day14-no-campaign'`

---

### Day 14 — fan cap warning (tier-aware)

Trigger: `able_fans.length >= 80` AND free tier AND not dismissed

```
"You have [N] fans. The free tier holds up to 100.

When you hit 100, sign-ups will stop. Artist plan is £9/month — removes the cap, adds broadcasts and the full fan list."
```

Action: [See what you get →] — opens upgrade bottom sheet
Dismiss key: `'day14-fan-cap-warning'`

Note: this nudge fires on fan count, not on day. An artist who reaches 80 fans on Day 3 should see it on Day 3.

---

## Day 30 — Retention summary

**This is a card, not a nudge. It belongs at the top of the admin home, below the greeting.**

Trigger: `getDaysSinceFirstVisit() >= 30` AND `'day30-summary'` not in dismissed

```
"Your first month on ABLE."

[N] visits   [N] fans   [N] clicks
Most visited from: [Instagram / TikTok / direct]
```

Below the numbers, one contextual line:

**If 0 fans:**
```
"Your first fan. Put your link in your bio and leave it there."
```
Action: [Copy my link]

**If 1–9 fans:**
```
"Your list is starting. Sharing in a story reaches people that the bio link misses."
```
Action: [Copy my link]

**If 10–50 fans:**
```
"[N] fans in a month is a real list. A broadcast would bring them back to your page."
```
Action: [Set up a broadcast →] (tier-gated if free)

**If 50+ fans:**
```
"[N] fans. You're past the point where this is an experiment."
```
Action: [See Artist plans →] (if still free)

Dismiss key: `'day30-summary'` — stores permanently, never reappears.

V2: this same summary is emailed to the artist monthly (requires Resend + Supabase).

---

## Nudge system architecture

### Priority order (highest first)

1. Fan cap warning (approaching 100 fans — most urgent, always wins)
2. Day 1 share card (if zero views — activation is the most critical early need)
3. Fan milestone card (first fan, 3 fans, 10 fans — manual dismiss, amber card)
4. Day 1 first-visit card (if views exist, no milestone yet)
5. Day 3 contextual (no fans + views / no fans + no views)
6. Day 7 release nudge
7. Day 14 no-campaign nudge
8. Page quality nudge (missing photo, bio, or platform link)

Only one nudge shows at a time. The priority system ensures the most urgent message wins.

### Nudge evaluation on every admin.html load

```javascript
function evaluateNudges(profile, fans, views) {
  const dismissed = JSON.parse(localStorage.getItem('able_dismissed_nudges') || '[]');
  const days = getDaysSinceFirstVisit();
  const fanCount = fans.length;
  const viewCount = views.length;

  // Fan cap (fires regardless of day)
  if (fanCount >= 80 && !dismissed.includes('day14-fan-cap-warning')) {
    return showNudge('day14-fan-cap-warning', { /* ... */ });
  }

  // Day 1 share card (zero views)
  if (viewCount === 0 && !dismissed.includes('day1-share-card')) {
    return showShareCard();
  }

  // Day 1 first visit milestone
  if (viewCount > 0 && !dismissed.includes('day1-first-visit')) {
    return showMilestoneCard('day1-first-visit', /* ... */);
  }

  // Day 3 no fans
  if (days >= 3 && fanCount === 0) {
    const key = viewCount > 0 ? 'day3-no-fans-views' : 'day3-no-fans-no-views';
    if (!dismissed.includes(key)) return showNudge(key, { /* ... */ });
  }

  // Day 7 no release
  if (days >= 7 && !profile.releaseDate && !dismissed.includes('day7-no-release')) {
    return showNudge('day7-no-release', { /* ... */ });
  }

  // Day 14 no campaign
  if (days >= 14 && !profile.releaseDate && !dismissed.includes('day14-no-campaign')) {
    return showNudge('day14-no-campaign', { /* ... */ });
  }
}
```

### A dismissed nudge never reappears

```javascript
function dismissNudge(id) {
  const dismissed = JSON.parse(localStorage.getItem('able_dismissed_nudges') || '[]');
  if (!dismissed.includes(id)) {
    dismissed.push(id);
    localStorage.setItem('able_dismissed_nudges', JSON.stringify(dismissed));
  }
  document.getElementById('contextNudge').hidden = true;
}
```

---

## Copy register for all nudge text

Every line in this spec follows the copy rules from `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md`:

- Never: "You're growing", "Turn fans into superfans", "Unlock", "Get started", "Congratulations"
- Never: exclamation marks in dashboard copy
- Always: specific numbers ("12 visitors") not generalisations ("some visitors")
- Always: state the situation, let the artist decide
- Tone: knowledgeable peer who's been around the music industry — not a platform assistant
- One thing at a time — a nudge that asks two things asks nothing

The Day 1 share card is the one exception to single-action nudges — it contains multiple caption options because the whole point is to give the artist something ready to use, not just an instruction. This is a tool, not a prompt.
