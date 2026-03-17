# ABLE — Artist Success: Path to 10
**Created: 2026-03-16 | Status: ACTIVE — implementation path + scoring milestones**

---

## Current state: 4/10

The admin.html design spec is excellent. The underlying architecture — nudge slot, milestone cards, greeting system, first-run checklist — is solid. The gap is not in the spec. It is in the connective tissue: the system that knows where the artist is in their 30-day journey and responds to it.

A well-specced dashboard that a third of artists never come back to is a 4/10 product. The nudge system takes it to 7/10. The email flows take it to 9/10.

---

## Score at each stage

| Stage | Score | What changes |
|---|---|---|
| Current | 4/10 | Basic nudges (pre-release, gig mode), no activation flow, no milestones, no summary |
| P0 complete | 5/10 | Visit tracking live, Day 0 bio nudge, Day 1 share card trigger condition ready |
| P1 complete | 7/10 | Day 1 share card + first-visit card + Day 3 + Day 7 + Day 14 + Day 30 summary |
| P2 complete (email flows) | 9/10 | 7-day re-engagement email + monthly summary email via Resend |
| P3 complete (cohort data) | 9.5/10 | Nudge timing refined from real cohort behaviour |
| 10/10 | Requires data | Cohort validation + push notifications for first fan |

---

## P0 — Foundation (build before any real users arrive)

### P0.1 — `admin_visit_dates` tracking

**File:** `admin.html`
**Effort:** 10 lines of JS, top of init script

```javascript
function recordAdminVisit() {
  const today = new Date().toISOString().split('T')[0];
  const visits = JSON.parse(localStorage.getItem('admin_visit_dates') || '[]');
  if (visits[visits.length - 1] !== today) {
    visits.push(today);
    if (visits.length > 60) visits.splice(0, visits.length - 60);
    localStorage.setItem('admin_visit_dates', JSON.stringify(visits));
  }
}
recordAdminVisit();
```

All time-based nudge logic depends on this. Nothing else in this path works without it. Build first.

**Ticket:** `p0-admin-visit-tracking`
**Build time:** 15 minutes

---

### P0.2 — Day 0 bio nudge

**File:** `admin.html`
**Effort:** 1 nudge card, 1 dismiss condition

On first ever admin load (`!admin_ever_visited`), below the first-run checklist, show:

```
"Put your ABLE link in your Instagram bio. That's the whole strategy."
```

Inline [Copy link] button. Persistent dismiss.

This is the single most important nudge in the product. Getting the link into the artist's bio is what drives first fans, which drives everything else.

**Ticket:** `p0-day0-bio-nudge`
**Build time:** 30 minutes

---

### P0.3 — First-run checklist: verify all steps are genuinely interactive

**File:** `admin.html`
**Effort:** Audit + fix broken steps

Each step in the first-run checklist (admin DESIGN-SPEC §13) must do something when tapped:
- Step 2 "Copy your page link" → `navigator.clipboard.writeText(slug)` + toast "Copied."
- Step 3 "Put the link in your bio" → shows link prominently, copy button, mobile share sheet
- Step 4 "Add a release" → opens Campaign HQ release date picker

If any step is decorative (instruction only, no action), it is broken. Fix before launch.

**Ticket:** `p0-frc-interactive-steps`
**Build time:** 1–2 hours (depending on how many steps need fixing)

---

## P1 — Core nudge system (build within first 2 weeks of real users)

### P1.1 — Day 1 share card (HIGHEST IMPACT ADDITION)

**File:** `admin.html`
**Effort:** New card component, 2 caption templates, clipboard copy

Trigger: second admin load AND `able_views.length === 0` AND `'day1-share-card'` not dismissed

Full-width card at top of admin home:

```
"Your page is live at ablemusic.co/[slug]. Have you shared it yet?"

[Instagram caption — tap to copy]
[TikTok caption — tap to copy]
[Copy my link]
```

Card auto-dismisses when artist copies the link.

This is P1.1 because it directly addresses the highest-priority drop-off point: artists who set up and never share.

**Ticket:** `p1-day1-share-card`
**Build time:** 2–3 hours

---

### P1.2 — Day 1 first-visit milestone card

**File:** `admin.html`
**Effort:** Condition check + amber milestone card with source label

Trigger: `able_views.length > 0` AND `'day1-first-visit'` not dismissed

```
"Someone found you from [Instagram / TikTok / a direct link]."
```

Amber card. Manual dismiss only. No auto-dismiss.

**Ticket:** `p1-day1-first-visit-card`
**Build time:** 1 hour

---

### P1.3 — Day 3 first-fans milestone

**File:** `admin.html`
**Effort:** Fan count check + milestone card variants

Trigger: `getDaysSinceFirstVisit() >= 3` AND `able_fans.length > 0` AND not dismissed

```
"[N] people signed up. They came because of you."
```

(Exact copy variants by fan count in SPEC.md.)

Amber card. Manual dismiss.

**Ticket:** `p1-day3-fan-milestone`
**Build time:** 1 hour

---

### P1.4 — Day 3 no-fans contextual nudge

**File:** `admin.html`
**Effort:** Two condition branches (views/no views)

Trigger: `getDaysSinceFirstVisit() >= 3` AND `able_fans.length === 0`

Two variants:
- Views exist: "You've had [N] visitors. None have signed up yet..." → [Edit my page]
- No views: "Your page hasn't had any visitors yet..." → [Copy my link]

(Full copy in SPEC.md.)

**Ticket:** `p1-day3-no-fans-nudge`
**Build time:** 1 hour

---

### P1.5 — Day 7 one-week greeting sub-line

**File:** `admin.html` — `buildGreetingSub()` function
**Effort:** Add time-aware branch to existing greeting function

On the admin load that crosses 7 days, sub-line becomes a one-week summary:

```javascript
if (daysSinceStart >= 7 && daysSinceStart < 8) {
  return buildWeekOneSub(fanCount, viewCount);
}
```

(Full function in SPEC.md.)

Runs once. Normal greeting resumes the next day.

**Ticket:** `p1-day7-greeting`
**Build time:** 30 minutes

---

### P1.6 — Day 7 no-release nudge

**File:** `admin.html`
**Effort:** Condition check + nudge

Trigger: `getDaysSinceFirstVisit() >= 7` AND `!profile.releaseDate` AND not dismissed

```
"Are you working on something?

Setting a release date turns on pre-release mode — countdown timer, pre-save CTA. Worth adding even for back-catalogue."
```

Action: [Set a release →]
Dismiss key: `'day7-no-release'`

**Ticket:** `p1-day7-release-nudge`
**Build time:** 30 minutes

---

### P1.7 — Fan cap warning (80+ fans)

**File:** `admin.html`
**Effort:** Fan count check + tier-aware nudge

Trigger: `able_fans.length >= 80` AND free tier AND not dismissed

```
"You have [N] fans. The free tier holds up to 100.

When you hit 100, sign-ups will stop. Artist plan is £9/month — removes the cap, adds broadcasts and full fan list."
```

Action: [See what you get →] → upgrade bottom sheet

Note: evaluate on every admin load AND on each fan sign-up event (not just on page load — an artist going viral could skip past 80 without visiting admin).

**Ticket:** `p1-fan-cap-warning`
**Build time:** 1 hour

---

### P1.8 — Day 30 summary card

**File:** `admin.html`
**Effort:** New card component (larger than nudge), 4 copy variants, source breakdown computation

Trigger: `getDaysSinceFirstVisit() >= 30` AND `'day30-summary'` not dismissed

Structure: heading + three stat blocks (views, fans, clicks) + source label + contextual next step.

(Full copy variants by fan count in SPEC.md.)

Dismiss stores permanently.

**Ticket:** `p1-day30-summary`
**Build time:** 2–3 hours

---

### P1.9 — Return-after-absence greeting

**File:** `admin.html`
**Effort:** Extend `buildGreetingSub()` with absence-detection branch

Trigger: `admin_visit_dates` most recent entry is 7+ days ago

```
"Good to see you. It's been [N] days."
```

Sub-line if new fans:
```
"[N] new fan[s] since you were last here."
```

**Ticket:** `p1-return-greeting`
**Build time:** 30 minutes

---

## Total P1 build time estimate

| Ticket | Effort |
|---|---|
| p0-admin-visit-tracking | 15 min |
| p0-day0-bio-nudge | 30 min |
| p0-frc-interactive-steps | 1–2 hr |
| p1-day1-share-card | 2–3 hr |
| p1-day1-first-visit-card | 1 hr |
| p1-day3-fan-milestone | 1 hr |
| p1-day3-no-fans-nudge | 1 hr |
| p1-day7-greeting | 30 min |
| p1-day7-release-nudge | 30 min |
| p1-fan-cap-warning | 1 hr |
| p1-day30-summary | 2–3 hr |
| p1-return-greeting | 30 min |

**Total: ~12–14 hours**

All in V1 — zero backend required, zero new dependencies.

---

## P2 — Email flows (requires Supabase + Resend)

### P2.1 — 7-day dormancy email to artist

When Supabase auth is wired and Resend is configured:

**Subject:** `Your page is still live, [Name].`

**Body:**
```
[N] people have visited your page since you were last here.
[If new fans: M new fans signed up.]

[Open your dashboard →]
```

One email per dormancy event. Do not nag.

This is the highest-impact email in the V2 success system. The artist who hasn't been back in a week hasn't churned — they're just not thinking about ABLE. One data point changes that.

**Ticket:** `p2-dormancy-email`

---

### P2.2 — Monthly summary email to artist

**Subject:** `[Name] — your [Month] on ABLE`

**Body matches Day 30 summary card:** views, fans, clicks, source breakdown, one contextual next step.

Sent at 30 days, then monthly. Uses same contextual copy variants as the in-app card.

**Ticket:** `p2-monthly-summary-email`

---

### P2.3 — Wizard funnel tracking

```javascript
// In start.html, on each screen transition
function trackWizardStep(step) {
  const events = JSON.parse(localStorage.getItem('wizard_funnel') || '[]');
  events.push({ step, ts: Date.now() });
  localStorage.setItem('wizard_funnel', JSON.stringify(events));
}
// Steps: 'started', 'step_name', 'step_vibe', 'step_accent', 'step_cta', 'step_release', 'preview', 'done'
```

When Supabase lands: flush to `onboarding_events` table. This becomes the drop-off funnel.

**Ticket:** `p2-wizard-funnel-tracking`

---

## P3 — Future

### P3.1 — First fan push notification

When Supabase Realtime is live: subscribe to `fans` table INSERT for the artist's profile. On new fan, fire a browser notification (requires PWA install).

Title: `Someone joined your list`
Body: `Source: [Instagram / TikTok / direct]`

Makes the first fan moment instantaneous rather than discovered on next admin load.

**Ticket:** `p3-fan-push-notification`

---

### P3.2 — Cohort-validated nudge timing

After 50+ artists have used ABLE for 30+ days:

1. Group artists by 30-day fan count: 0, 1–5, 6–20, 20+
2. For each group: did they share the link within 24h? Set a release? Return in week 1?
3. Use this to validate Day 3 / Day 7 / Day 14 timing — adjust if real drop-off is earlier or later

The nudge timing in this spec (Day 3, Day 7, Day 14) is an informed guess. Real data will correct it.

**Ticket:** `p3-cohort-analysis`

---

## Score trajectory (detailed)

### Current: 4/10

Good architecture. No activation flow. Nudges fire for actions already taken (set release, activate gig), not for gaps (didn't share link, no fans yet).

### After P0: 5/10

Visit tracking is live. Bio nudge exists. First-run checklist steps actually do something. The foundation is in place.

### After P1: 7/10

The Day 1 share card alone moves the needle by 1.5 points. Artists who set up and don't share have a reason to act. Artists who get their first fans see the milestone acknowledged. The Day 30 summary gives artists a reason to return.

### After P2: 9/10

Email flows reach dormant artists before they forget ABLE exists. Monthly summary is the product's most important retention mechanism — it makes the value visible even when artists aren't logging in.

### After P3: 9.5/10

Cohort data validates the nudge timing. Push notifications make fan sign-ups feel real-time.

### 10/10

Not a document target. 10/10 requires real cohort data validating nudge timing and copy, which can only come from running the system with real artists for at least 90 days.

---

*See `FINAL-REVIEW.md` for build sequencing decision.*
