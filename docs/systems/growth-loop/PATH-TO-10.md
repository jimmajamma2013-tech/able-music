# ABLE Growth Loop — Path to 10
**Created: 2026-03-16**

> Ordered implementation plan for taking the growth loop from 3.0/10 to 9.0/10. P0 requires no backend. P1 requires no backend. P2 is Supabase-blocked. True 10 requires real traffic data.

---

## P0 — Foundation (no backend required, implementable today)

### P0.1 — `?ref=` injection on footer link
**File:** `able-v7.html`
**Gap it closes:** Dimension 2 (Referral tracking) goes from 0 → 6
**Effort:** ~20 lines of JS

Add `initFooterLink()` to able-v7.html. Read artist slug from URL path or `localStorage.getItem('able_v3_profile').slug`. Set `#able-footer-cta` href to `https://ablemusic.co/?ref=[slug]`.

Acceptance criteria:
- Footer link contains `?ref=` when viewed at any artist profile URL
- Falls back to plain `https://ablemusic.co/` when slug is unavailable
- No JS error if `able_v3_profile` is absent or corrupt

---

### P0.2 — Footer click tracked in analytics
**File:** `able-v7.html`
**Gap it closes:** Dimension 8 (Analytics) goes from 0 → 4
**Effort:** 3 lines (inside `initFooterLink()` click listener)

Call `recordClick('Made with ABLE', 'footer', footerLink.href)` on tap. This requires adding `'footer'` to the `ClickType` type in `docs/systems/analytics/SPEC.md`.

Acceptance criteria:
- Tapping the footer appears in `able_clicks` as `type: 'footer'`
- Click is visible in admin analytics breakdown (once admin renders click type breakdown)

---

### P0.3 — landing.html `?ref=` detection and sessionStorage
**File:** `landing.html`
**Gap it closes:** Dimension 3 (Destination quality) goes from 2 → 5, Dimension 5 (Fan-to-artist conversion) goes from 1 → 4
**Effort:** ~30 lines of JS

Add `initReferralLanding()` to landing.html. Read `?ref=` param. Store to `sessionStorage('able_referral', ref)`. Call `personaliseHero(ref)`.

Acceptance criteria:
- `landing.html?ref=nadia` shows "Nadia is on ABLE."
- `landing.html?ref=the-1975` shows "The 1975 Is On ABLE." (slug → display name conversion)
- `landing.html` without `?ref=` shows standard hero — zero regression
- `sessionStorage.getItem('able_referral')` is set after the landing page loads with a valid `?ref=`

---

### P0.4 — start.html referral capture
**File:** `start.html`
**Gap it closes:** Dimension 5 (Fan-to-artist conversion) goes from 4 → 7
**Effort:** ~10 lines (in the existing `saveProfile()` function)

On wizard completion, call `captureReferral()` and merge `referredBy` into the profile object before writing to `localStorage`. Clear `sessionStorage('able_referral')` after capture.

Acceptance criteria:
- Completing the wizard after visiting `landing.html?ref=nadia` results in `able_v3_profile.referredBy = 'nadia'`
- Completing the wizard without a referral results in no `referredBy` field (not `null`, not empty string — simply absent)
- `sessionStorage` is cleared of the referral after capture

---

### P0.5 — Footer tap target fix
**File:** `able-v7.html` (CSS)
**Gap it closes:** Dimension 1 (Footer visibility) goes from 5 → 7
**Effort:** ~5 CSS lines

Ensure `.able-footer-link` has `min-height: 44px` and `line-height: 44px` with compensating negative margins. Verify across all 4 themes.

Acceptance criteria:
- Tap target is >= 44px on mobile at 375px viewport width
- Link is readable on Dark, Light, Glass, and Contrast themes
- No horizontal overflow at 320px (minimum supported width)

---

### P0.6 — Add `'footer'` to canonical source values
**Files:** `docs/systems/CROSS_PAGE_JOURNEYS.md`, `docs/systems/analytics/SPEC.md`
**Gap it closes:** Dimension 8 (Analytics) goes from 4 → 6
**Effort:** Doc edits only (no code)

Add `footer: 'footer'` to `SOURCE_VALUES` in CROSS_PAGE_JOURNEYS.md. Add `'footer'` to `AnalyticsSource` type in analytics/SPEC.md. Add referrer-based detection for ablemusic.co in `detectSource()`.

Acceptance criteria:
- `'footer'` appears in canonical source values list
- `detectSource()` returns `'footer'` when `document.referrer` includes `ablemusic.co/`

---

**P0 score impact: 3.0 → 6.2/10**

---

## P1 — Visibility and attribution (no backend required)

### P1.1 — Admin nudge: referred signups count
**File:** `admin.html`
**Gap it closes:** Dimension 4 (Artist incentive) goes from 4 → 7
**Effort:** ~20 lines (read `referredBy` from all profiles in localStorage, count matches)

In the Fans section of admin.html, query all localStorage artist profiles for `referredBy === currentArtistSlug`. Count them. Show nudge: "1 artist has created a page after visiting yours." (see SPEC.md §7 for full copy).

Note: This approach works only while ABLE is localStorage-first. When Supabase lands, this query moves server-side. The admin nudge UI is the same either way.

Acceptance criteria:
- Nudge appears when `referredSignups >= 1`
- Nudge is absent (not shown, not zero-stated) when `referredSignups === 0`
- Copy is singular/plural correct (1 artist / N artists)
- Nudge dismisses correctly if artist dismisses it (stores in `able_dismissed_nudges`)

---

### P1.2 — `'footer'` in admin source breakdown
**File:** `admin.html`
**Gap it closes:** Dimension 8 (Analytics) goes from 6 → 8
**Effort:** Admin source breakdown bars already exist — ensure `'footer'` is a labelled source

The admin analytics source breakdown already renders bars for each source value. Ensure:
- `'footer'` source appears with label "ABLE footer" (not raw `footer` string)
- Source badge in fan list can show "ABLE footer" for fans who signed up after a footer tap

Acceptable label map addition:
```javascript
const SOURCE_LABELS = {
  ig:            'Instagram',
  tt:            'TikTok',
  sp:            'Spotify',
  qr:            'QR code',
  story:         'Story',
  direct:        'Direct',
  email:         'Email',
  'fan-dashboard': 'Fan dashboard',
  twitter:       'Twitter',
  footer:        'ABLE footer',  // NEW
  other:         'Other',
};
```

Acceptance criteria:
- "ABLE footer" label appears in source breakdown if any footer-sourced views exist
- Source badge "ABLE footer" appears in fan list for fans who signed up from a footer tap

---

### P1.3 — Personalised landing uses artist name (Phase 1 approximation)
**File:** `landing.html`
**Gap it closes:** Dimension 3 (Destination quality) goes from 5 → 7
**Effort:** Already in P0.3 — this is the quality gate confirming it looks right

After P0.3 ships, manually verify these cases in the browser:
- `?ref=nadia` → "Nadia is on ABLE." — single-word slug, reads correctly
- `?ref=nadia-rose` → "Nadia Rose is on ABLE." — two-word slug, reads correctly
- `?ref=the-1975` → "The 1975 Is On ABLE." — mixed alphanumeric, acceptable (capitalisation of "1975" is fine)
- `?ref=dj-shadow` → "Dj Shadow Is On ABLE." — note: "Dj" capitalises oddly. Phase 2 (Supabase artist name lookup) fixes this. Acceptable in Phase 1.
- `?ref=` (empty) → falls back to standard landing. No crash.
- `?ref=<script>alert(1)</script>` → `encodeURIComponent` on write, `textContent` on read (not `innerHTML`) — XSS safe.

Acceptance criteria:
- All above cases render without JS errors
- XSS: setting `headline.textContent` (not `innerHTML`) prevents injection

---

**P1 score impact: 6.2 → 8.0/10**

---

## P2 — Discovery and depth (Supabase required)

### P2.1 — Personalised landing uses real artist name from Supabase
**File:** `landing.html`
**Requires:** Supabase `profiles` table with `slug` and `name` columns
**Gap it closes:** Dimension 3 (Destination quality) goes from 7 → 9

Replace the slug-capitalisation approximation with a live `fetchArtistName(slug)` call:

```javascript
async function fetchArtistName(slug) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('name')
      .eq('slug', slug)
      .single();
    if (error || !data) return null;
    return data.name;
  } catch (e) {
    return null; // network failure — fall back to slug-derived name
  }
}

// In personaliseHero(), after Phase 1 approximation:
fetchArtistName(slug).then(name => {
  if (name && headline) headline.textContent = `${name} is on ABLE.`;
});
```

Acceptance criteria:
- Artist with slug `dj-shadow` and name "DJ Shadow" shows "DJ Shadow is on ABLE."
- Network failure falls back to slug-capitalisation without error
- Supabase query uses anon key — no auth required for public artist name lookup

---

### P2.2 — Referred signups in admin via Supabase
**File:** `admin.html`
**Requires:** Supabase `profiles` table with `referred_by` column
**Gap it closes:** Dimension 4 (Artist incentive) goes from 7 → 8.5

Replace the localStorage scan (P1.1) with a Supabase query:

```javascript
const { count } = await supabase
  .from('profiles')
  .select('*', { count: 'exact', head: true })
  .eq('referred_by', currentArtistSlug);
```

Show the count in the admin nudge and, once >= 1, promote to a stat card in the "Your impact" section.

---

### P2.3 — Artist directory from referred landing
**File:** New page: `directory.html` (or section of landing.html)
**Requires:** Supabase `profiles` with `genre_vibe` column
**Gap it closes:** Dimension 6 (Discovery value) goes from 0 → 7

A referred visitor who lands on `landing.html?ref=nadia` (Nadia is tagged `Electronic / Club`) sees a strip at the bottom of the landing page:

```
Other artists on ABLE
[3 artist cards — same genre_vibe as referrer]
```

Each card: artist name + accent colour chip + "View page →" link.

This is passive discovery — no algorithm, no ranking, no engagement scoring. Just "other artists who are similar."

Acceptance criteria:
- Strip only shows when `?ref=` is present and the referring artist has a `genre_vibe` set
- Falls back gracefully if Supabase query fails (strip simply absent)
- Maximum 3 artist cards — does not overwhelm the primary CTA

---

### P2.4 — Platform-level growth loop analytics
**Requires:** Supabase `profiles` table + internal admin view (not artist-facing)
**Gap it closes:** Dimension 8 (Analytics) goes from 8 → 9.5

Internal Supabase view:

```sql
create view growth_loop_stats as
select
  p.slug           as referring_artist,
  p.name           as referring_artist_name,
  count(r.id)      as referred_signups,
  count(r.id) * 1.0 / nullif(p.footer_clicks, 0) as footer_conversion_rate
from profiles p
left join profiles r on r.referred_by = p.slug
group by p.slug, p.name, p.footer_clicks
order by referred_signups desc;
```

`p.footer_clicks` is a counter column on `profiles` incremented (via Supabase function or Netlify function) each time a footer link is tapped on that artist's page.

This is an internal analytics surface — not exposed to artists directly in V1. Used to:
1. Identify the top 10 referring artists (to evaluate incentive programme in Phase 3)
2. Measure footer conversion rate (taps → signups)
3. A/B test landing page copy changes against measured conversion

---

**P2 score impact: 8.0 → 9.0/10**

---

## Summary

| Phase | Actions | Score impact | Backend required |
|---|---|---|---|
| P0 | `?ref=` injection, click tracking, sessionStorage carry, tap target, source value | 3.0 → 6.2 | No |
| P1 | Admin nudge, source breakdown label, landing QA | 6.2 → 8.0 | No |
| P2 | Supabase name lookup, Supabase referral count, artist directory, platform analytics | 8.0 → 9.0 | Yes |
| True 10 | Real traffic data, A/B tested copy, conversion rate measured | 9.0 → 9.0+ | Yes + time |

---

## What prevents a 10

A 10 requires things that cannot be specced — only observed:
1. **Real referral data**: does the `?ref=` system produce measurable uplift in signups?
2. **Conversion rate measurement**: what percentage of footer taps become new artist profiles?
3. **Copy validation**: does "Nadia is on ABLE." outperform the generic landing headline? A/B test required.
4. **Artist directory quality**: does the "artists like this" strip produce genuine discovery, or just noise?

None of these require more spec. They require shipped code and real users.
