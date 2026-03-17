# Artist Tools — Final Review
**Date: 2026-03-16 | Score: 6.8/10 (current) → 9/10 (P2 complete)**

---

## Where the admin toolset stands

The admin.html has strong bones. Campaign HQ, fan list, and snap card manager are well-built — they feel like real tools, not placeholder UI. The data model is correct. The copy is on-brand. The motion system (stagger animations, spring easing, skeleton-to-data transitions) sets a quality bar that few competitor tools match.

The gaps fall into three categories:

**Category 1: Missing core functionality**
- Shows manager has no date sorting and no past-show archiving — basic list management issues that will be immediately visible to any artist with more than 3 shows
- Close Circle cannot process payments — the UI looks complete but it's a shell
- Accent colour cannot be changed after the wizard — a basic profile management gap

**Category 2: Missing analytics depth**
- Source attribution is effectively broken without UTM tracking — "Direct" for 80% of traffic is not useful data
- No time-range selector means all-time stats can't be compared period-to-period
- Release status badges and section empty-warnings are small fixes with high scan quality improvement

**Category 3: Known P2 items (not yet critical)**
- Broadcasts send function: UI is behind Pro gate, function not built
- Stripe Connect: required for Close Circle to work as a product
- Events auto-import: highest-value onboarding improvement after Spotify

The admin.html is at 6.8/10 for V1 quality, not V1 completeness. Most of the gaps are fixable in a few hours each.

---

## The "you're on tonight" moment

The single highest-impact admin improvement available is copy — not a feature.

When the artist opens admin.html and they have a show today:

```
Good to see you, Sofia.
You're on tonight.
```

This is already specced in `docs/pages/admin/DESIGN-SPEC.md §5.2` (`buildGreetingSub()` returns `'You\'re on tonight.'` when gig mode is active). The question is whether gig mode is reliably being activated when a show is today — and whether the greeting system is being called on every page load.

Confirm: `applyGreeting(profile)` is called in `DOMContentLoaded` or `showPage('home')`. If not, wire it. This single line — "You're on tonight." — is the moment the product stops feeling like software and starts feeling like something that knows the artist.

---

## What makes it 10/10

At 10/10, admin.html:

1. **Knows what the artist needs to do next** — the home page always has one clear next action, not a dashboard of equal-weight stats
2. **Reacts to the artist's situation** — "You're on tonight." / "Tomorrow." / "3 days until your release." — the greeting and home page change based on what's happening
3. **Shows honest data** — not vanity metrics, not "Spotify monthly listeners" (which isn't in the API), but real signals: views this week, fans from Instagram, click rate by CTA
4. **Makes the tools feel connected** — adding a release moment in Your World offers to set Campaign HQ to pre-release; a gig moment today offers to activate gig mode; Connections links flow into the live page pills
5. **Never makes the artist feel like they're configuring software** — every empty state, every nudge, every tool description is in the artist's voice, not SaaS micro-copy

---

## What makes it 11/10

The 11/10 moment is the admin.html greeting the artist has when they wake up after a show:

```
Good to see you, Sofia.
Last night at Barbican Centre. 7 fans joined.
```

This requires:
- Gig mode expiry timestamp (`able_gig_expires`)
- Fan sign-ups in the 24 hours before expiry
- The show name from `able_shows` (matched by last show date)

The data is already there. The `buildGreetingSub()` function in `DESIGN-SPEC.md §5.2` specifies exactly this behaviour — the post-gig case is already written. The question is whether it's wired.

This is not a hard feature. It is a moment. And moments are what make artists loyal to a product.

---

## Tool scores summary

| Tool | Score | Priority gap |
|---|---|---|
| Campaign HQ | 8/10 | State change toast (P1) |
| Fan list + export | 8/10 | Star toggle confirmation + search (P1) |
| Snap card manager | 8/10 | Card preview in admin (P2) |
| Shows manager | 6/10 | Date sort (P0), events import (P2) |
| Music/releases | 7/10 | Release status badges (P1) |
| Merch manager | 6/10 | Reorder + sold-out toggle (P2) |
| Close Circle | 5/10 | "Payments required" state (P0) |
| Analytics | 6/10 | UTM tracking (P1) |
| Section order | 8/10 | Empty section warning (P1) |
| Connections | 7/10 | URL validation + RA field (P1) |
| Profile identity | 7/10 | Accent picker (P0) |
| Broadcasts | 4/10 | Send function (P2) |
| Your World | 6/10 | Moment editing + state nudges (P1/P2) |

**Overall: 6.8/10 current → 9/10 after P2**

The P0 fixes (shows date sort, Close Circle state, accent picker, star toggle) are all under 2 hours each. They should be done before any new feature work.
