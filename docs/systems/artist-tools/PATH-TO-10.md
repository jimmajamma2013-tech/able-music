# Artist Tools — Path to 10
**Date: 2026-03-16 | Current score: 6.8/10 | Target: 9/10**

> Prioritised fix list across all 13 admin tools. P0 = blocks launch quality. P1 = ships in V1. P2 = V2. P3 = Phase 2+.
> Full spec for each tool in `SPEC.md`. Analysis in `ANALYSIS.md`.

---

## P0 — Blocking (Fix Before Launch)

### P0-1: Shows manager — date sort and past show archiving
**Tool:** Shows manager (#4)
**Why P0:** Artists entering real shows will immediately notice that entries display in order of entry rather than chronological. An artist with 10 shows entered out of order will see a broken experience. Past shows staying in the active list creates noise.

**Fix:**
```javascript
// In renderShowsList() — sort before render:
shows.sort((a, b) => a.date.localeCompare(b.date));

// Filter: hide past shows by default
const now = new Date().toISOString().split('T')[0];
const upcoming = shows.filter(s => s.date >= now);
const past = shows.filter(s => s.date < now);
// Render upcoming first, then a collapsed "Past shows ([N])" section
```

**Effort:** ~1 hour. Pure JS sort and filter.

---

### P0-2: Close Circle — "Payments setup required" state
**Tool:** Support / Close Circle (#7)
**Why P0:** Close Circle cannot process payments without Stripe. If an artist enables it and shares their page, fans see support packs they can't actually buy. This erodes trust.

**Fix:** When Close Circle is enabled but no Stripe Connect is active, show:
```
You've set up your support packs.
Now connect Stripe to start receiving payments.
0% taken by ABLE. Stripe standard fee only.

[Connect Stripe →]  (links to Stripe Connect onboarding)
```
The support section on `able-v7.html` should also reflect this — if Close Circle is enabled but Stripe is not connected, show "Coming soon" or hide the section from fans.

**Effort:** ~2 hours. No new backend needed — just a state check and fallback UI.

---

### P0-3: Accent colour picker in admin.html
**Tool:** Profile identity (#11)
**Why P0:** The accent colour is set in the wizard but cannot be changed in admin.html after onboarding. Artists change their brand colour. This is a basic CRUD operation that's completely missing.

**Fix:** Add accent colour picker to the Profile Identity card in admin.html. See `SPEC.md §11` for the exact HTML. Picker writes to `able_v3_profile.accent` and calls `syncProfile()`.

**Effort:** ~2 hours. The CSS variable system is already there — just needs the input UI.

---

### P0-4: Star toggle wired in fan row
**Tool:** Fan list (#2)
**Why P0:** `able_starred_fans` exists as a localStorage key in the data spec but the star icon in the fan row is not confirmed as wired. If the key exists but the UI doesn't write to it, it's dead data.

**Fix:** Confirm `fan row HTML includes <button class="star-btn" onclick="toggleStar(fan.email)">` and `toggleStar()` writes to/reads from `able_starred_fans`. If not wired, wire it.

**Effort:** ~1 hour. Confirm and wire.

---

## P1 — Ships in V1

### P1-1: Campaign HQ — state change toast
**Tool:** Campaign HQ (#1)
**Why P1:** On mobile, the state pill that confirms a state change is often off-screen after tapping a button. A toast message ("Live." / "Pre-release." / "Profile mode.") makes the action feel confirmed.

**Fix:**
```javascript
function setCampaignState(state) {
  // ... existing logic ...
  const COPY = { profile: 'Profile mode.', pre: 'Pre-release.', live: 'Live.', gig: 'Gig mode on.' };
  showToast(COPY[state]);
}
```

**Effort:** 30 minutes.

---

### P1-2: Analytics — UTM source tracking
**Tool:** Analytics (#8)
**Why P1:** Without UTM tracking, analytics show source as "direct" for almost all visits. The "Where your fans came from" chart is meaningless without this data.

**Fix:** When artist copies their page link from admin, append UTM parameters:
- "Copy Instagram link" → `?utm_source=instagram&utm_medium=bio`
- "Copy TikTok link" → `?utm_source=tiktok&utm_medium=bio`
- `able-v7.html` reads UTM on load, stores in fan/view/click events

**Effort:** ~3 hours. Pure client-side. No API required.

---

### P1-3: Music manager — release status badges
**Tool:** Music/releases manager (#5)
**Why P1:** All releases look the same in admin regardless of whether they're upcoming, just out, or years old. Adding status badges (Upcoming / Live / Archive) makes the manager scannable.

**Fix:** Computed from release date:
```javascript
function getReleaseStatus(releaseDate) {
  if (!releaseDate) return 'draft';
  const d = new Date(releaseDate);
  const now = new Date();
  const liveWindow = 14 * 24 * 60 * 60 * 1000;
  if (d > now) return 'upcoming';
  if (now - d < liveWindow) return 'live';
  return 'archive';
}
```

**Effort:** ~2 hours.

---

### P1-4: Section order — empty-section warning
**Tool:** Section order + visibility (#9)
**Why P1:** Artists frequently leave sections visible that have no content (empty music section, empty merch section). Fans see an empty section header. The section order panel should warn about this.

**Fix:** In `renderSectionOrder()`, check if each section has content. If visible + empty, add an amber "Empty" badge next to the section name. Copy: "This section is visible but has no content."

**Effort:** ~2 hours.

---

### P1-5: Connections — URL validation + RA field
**Tool:** Connections (#10)
**Why P1:** No URL validation means artists can accidentally paste partial URLs or make typos that break platform pills. RA (Resident Advisor) is missing — a significant gap for the electronic/club artist segment.

**Fix:**
- Add debounced URL validation: if a field value doesn't start with `https://`, show inline amber hint
- Add RA field: `<input placeholder="https://ra.co/dj/..." name="ra">`

**Effort:** ~2 hours.

---

### P1-6: Your World — moment editing + "next moment" on home
**Tool:** Your World (#13)
**Why P1:** Remove-only moments means artists lose work if they want to change a detail. The "next moment" display on the admin home page is a low-effort, high-impact addition to the greeting system.

**Fix:**
- Add edit-in-place: clicking a moment expands its row to show the add form, pre-filled
- On admin home, below the greeting sub-line: "Next: [moment.title] — [formatted date]"

**Effort:** ~3 hours.

---

### P1-7: Add ANTHROPIC_API_KEY to environment variable checklist
**Tool:** Profile identity (#11)
**Why P1:** AI bio and CTA suggestions (`aiSuggestBio`, `aiSuggestCta`) use `netlify/functions/ai-copy.js` which requires `ANTHROPIC_API_KEY`. This is not documented in the Netlify setup. Result: the AI copy buttons silently fail.

**Fix:** Add `ANTHROPIC_API_KEY` to the environment variables table in `docs/systems/artist-tools/SPEC.md` and to any deployment checklist. Register at console.anthropic.com.

**Effort:** 15 minutes.

---

## P2 — V2 Improvements

### P2-1: Ticketmaster shows import
**Tool:** Shows manager (#4)
**Why P2:** Auto-importing upcoming shows eliminates the most time-consuming manual entry task. But the Netlify function needs to be built first (see `docs/systems/integrations/PATH-TO-10.md P0-1`).

**Fix:** After `ticketmaster-import.js` is built:
- Add "Import shows →" button to shows manager header
- Prompt: "Enter your artist name to find upcoming shows"
- On success: preview with checkboxes, "Add all" button
- Merge with existing shows (deduplicate by date + venue)

**Effort:** ~3 hours (after ticketmaster function exists).

---

### P2-2: Snap card drag-to-reorder
**Tool:** Snap card manager (#3)
**Why P2:** Up/down arrows work but drag is more intuitive, especially on mobile.

**Fix:** Use the HTML5 Drag and Drop API or a touch-compatible implementation:
```javascript
// On dragend, calculate new index from drop position, update array, re-render
```
Fallback: up/down arrows remain for accessibility.

**Effort:** ~4 hours.

---

### P2-3: Merch manager — reorder arrows + sold-out toggle
**Tool:** Merch manager (#6)
**Why P2:** Merch items have no reorder capability (inconsistent with snap cards, which do). Sold-out toggle is a basic merch management requirement.

**Fix:** Mirror the snap card reorder pattern for merch items. Add `sold_out` boolean field to each merch item. Sold-out items display with a grey badge and are de-emphasised.

**Effort:** ~3 hours.

---

### P2-4: Broadcasts send function
**Tool:** Broadcasts (#12)
**Why P2:** The broadcast compose UI exists behind a Pro gate but cannot send. `netlify/functions/broadcast-send.js` using Resend API needs to be built.

**Fix:** See `docs/systems/email/SPEC.md` for the full broadcast spec. Build:
- `netlify/functions/broadcast-send.js` — loops through `able_fans`, sends via Resend
- Add preview step before send
- Set `RESEND_API_KEY` in Netlify environment variables

**Effort:** ~6 hours.

---

### P2-5: Analytics — time-range selector
**Tool:** Analytics (#8)
**Why P2:** All-time stats are less useful than "last 7 days" or "last 30 days" for spotting trends.

**Fix:** Add a segmented control above the stats row: "7d / 30d / All time". Filter `able_views`, `able_clicks`, `able_fans` by timestamp before computing stats.

**Effort:** ~3 hours.

---

### P2-6: Your World — state integration nudges
**Tool:** Your World (#13)
**Why P2:** Adding a release-type moment for a future date should offer "Switch to pre-release mode." Adding a gig-type moment for today should offer "Turn on gig mode." These contextual nudges are the "smart admin" moment.

**Effort:** ~2 hours.

---

## P3 — Phase 2+

### P3-1: Stripe Connect for Close Circle
**Tool:** Support / Close Circle (#7)
Enables actual payment processing. Requires full Stripe Connect integration. Complex — see `docs/apis/stripe.md`.

### P3-2: PostHog analytics integration
**Tool:** Analytics (#8)
Persistent cross-device analytics. See `docs/apis/posthog.md`. Requires backend.

### P3-3: Spotify discography import in music manager
**Tool:** Music/releases manager (#5)
Pull full discography from Spotify import payload. Available in `/v1/artists/{id}/albums`.

### P3-4: Shopify/Big Cartel merch import
**Tool:** Merch manager (#6)
Live product cards with real prices and images. See `docs/reference/research/INTEGRATIONS_AND_AI_RESEARCH.md §4`.

---

## Score Projection

| After | Expected admin toolset score |
|---|---|
| P0 complete (shows sort, Close Circle state, accent picker, star toggle) | 7.5/10 |
| P1 complete (toast, UTM, release status, empty warnings, RA field, moments edit) | 8.5/10 |
| P2 complete (events import, drag reorder, broadcasts send, analytics range) | 9/10 |
| P3 complete (Stripe, PostHog, discography import) | 9.5/10 |
