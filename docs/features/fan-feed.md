# Feature: Fan Feed
**Status: 🔄 Spec complete, build started (fan.html exists at 52KB) | Phase 2**

---

## What it is

The "Following" view inside fan.html. A chronological feed of moments from every artist a fan follows on ABLE — new releases, upcoming shows, pre-release countdowns, dispatches. Organised into time strips: Today, This week, Earlier.

This is not a social feed. There are no likes, no comments, no follower counts, no algorithmic ranking. It is a personal, time-ordered record of activity from artists the fan explicitly chose to follow.

---

## Feed item types

| Type | What it shows | Badge |
|---|---|---|
| New release | Artist name + release title + stream CTA | "New" |
| Show tonight | Artist + venue + ticket button | "Tonight" (amber pulse) |
| Upcoming show | Artist + venue + date | "Show" |
| Pre-release | Countdown to release + pre-save CTA | "Counting down" |
| Release day | "Out today: [Artist] — [Title]" | "Out today" |
| Dispatch | First 2 lines of artist note, opens to full reader | "New dispatch" |

---

## Time strip structure

```
TODAY
[Feed item — Nadia dropped "Echoes"]
[Feed item — Tendai playing tonight at Jazz Café]

THIS WEEK
[Feed item — Maya Beats — 3 days until "Shadow Work"]
[Feed item — Nadia playing Saturday at Fabric]

— you're up to date —
```

The "— you're up to date —" state is a ruled line with text, no emoji. Empty and caught-up are treated with calm honesty.

---

## Design register

fan.html is intentionally quieter than able-v7.html:
- No spring bounce animations (belongs to artist profiles)
- 320ms deceleration easing only — items arrive and settle
- 40ms stagger between feed items — gentle cascade
- No like buttons, no share counts, no engagement metrics
- Artist accent colours appear as 3px left borders — each artist is recognisable by colour

---

## Cold start strategy

After a fan first signs up from an artist's page, they are shown 2–3 suggested artists to follow:
"People who follow [Artist] also follow..."

Goal: fan leaves with 3 followed artists minimum. Users who follow 3+ artists have dramatically higher 30-day retention.

---

## Relationship to other features

- **Fan capture** — sign-up from an artist page creates the first entry in `fan_following`
- **Campaign states** — pre-release countdown and release-day items are driven by artist's campaign state
- **Shows & events** — show items in the feed come from followed artists' `able_shows` data
- **Close Circle** — CC dispatches appear in the feed as a special item type
- **Analytics** — clicks from fan feed are tracked as `source: 'fan-dashboard'` in artist analytics

---

## Storage

```javascript
// fan.html reads
fan_following: [{ artistSlug, followedTs, artistAccent }]

// Written by fan.html
fan_location: { city, country, lat, lng }  // for "Near me" view
```

Note: the full feed requires Supabase — fan.html cannot read other artists' localStorage. The feed is only fully live when backend is wired. Pre-Supabase, fan.html can show the one artist they followed from, but not a multi-artist feed.

---

## Phase classification

**Phase 2** — the multi-artist feed requires Supabase backend. Pre-backend, fan.html can show basic info about the one artist the fan came from, but the full feed experience requires real-time data from multiple artist profiles.

A "lite" fan.html that shows: "You follow [Artist]. Here's their latest." is achievable with localStorage only and could ship as part of V1 linked from the confirmation email.

---

## Spec reference

`docs/pages/fan/DESIGN-SPEC.md` — complete design spec (colour, typography, animations, component library)
`docs/systems/CROSS_PAGE_JOURNEYS.md` — fan journey §2.1, §2.2, §2.3
`docs/V8_BUILD_AUTHORITY.md` — fan.html tabs, cold-start strategy
