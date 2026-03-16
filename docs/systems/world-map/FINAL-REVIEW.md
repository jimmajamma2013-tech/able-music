# World Map — Final Review
**Created: 2026-03-16**

---

## Does the World Map spec fulfil the "presence signal" vision?

**Yes, when fully built. Partially today.**

The spec in SPEC.md §1 defines the World Map correctly: a presence signal, not a productivity calendar. The test is whether a fan who lands on an artist's profile in the quiet period between releases — no new music, no gig announced — still feels that something is in motion. With only the current implementation (shows and releases auto-populated), that test passes only some of the time.

With the full spec — all 9 moment types, rehearsals visible to supporters, sessions behind an early-access window, a remix dropping in two weeks, an interview on Thursday — the calendar answers "what is this artist doing next?" every time. There is always something on the grid.

The spec fulfils the vision. The current build fulfils a subset of it.

---

## Is it distinctive enough? Does it look like nothing else in the music space?

**Not yet. It should. Here is what needs to change.**

Linktree calendars do not exist. Spotify does not have a per-artist calendar. Apple Music does not have one. Bandcamp has a shows list. Every other solution is either a touring database (Songkick, Bandsintheknow) or a generic social calendar.

The ABLE World Map's differentiators are:
1. It is embedded inside the artist's own branded profile — the same accent, the same feel
2. It spans all moment types, not just shows
3. It has access layers — a supporter sees things nobody else does
4. It is a live document the artist manages, not a scraped database

The current implementation has all the *mechanics* of these differentiators. It lacks the *visual character* to make them felt.

The specific gap: the calendar currently looks like a good, clean mobile calendar. The month label is 32px. The cells are 48px tall. It is well-built. It is not dramatic. It does not announce itself.

The fix (detailed in PATH-TO-10.md) is surgical: 52px month label, 64px cells, gradient card background, featured-moment callout bar. These are CSS changes. They will transform the visual impact without changing any logic.

When those four changes land, this will look like nothing else.

---

## Does the cross-surface linking work as a coherent system?

**The admin ↔ profile link works. The profile ↔ fan.html link is broken by design in V1.**

The path from artist to fan is:
1. Artist adds moment in admin.html
2. Moment appears in profile's World Map calendar
3. Fan signs up, gets seeded feed, sees moment in fan.html

Step 1 → 2 works correctly and immediately (same localStorage key, same device).

Step 2 → 3 is a one-time snapshot at sign-up time. The fan sees the moments that existed when they signed up, not new moments added later. This is the primary coherence failure in V1.

The V2 Supabase path (specced in SPEC.md §6.3 and PATH-TO-10.md P2.2) is complete — a SQL query, an RLS policy, and a Realtime subscription. It is ready to implement when Supabase auth lands.

For V1, the workaround in PATH-TO-10.md P2.1 (future-date tagging in the feed) makes the fan.html experience meaningfully better without requiring backend work.

**Verdict: coherent in spec, partially coherent in V1 build, fully coherent in V2 plan.**

---

## What is the minimum viable World Map for V1?

**Artist profile view only. Shows and releases only. No access gating. Empty state visible.**

Specifically:
- Calendar renders with auto-populated show moments (from `profile.events`) and release moment (from `profile.releaseDate`)
- Manual moments of type: show, release, livestream, announcement (the four most common cases)
- Tapping a moment shows the panel with title, date, and CTA
- Empty state: section visible with "Nothing announced yet. Check back." message instead of hidden
- Section heading: "What's coming" visible
- Mobile-first: swipe navigation, tap to expand, spring panel

This is almost exactly what is built today. The gap between "built" and "MVP" is three P0 fixes: section heading, empty state, and multi-moment panel.

**The MVP is 3 bug fixes away from being deployable.**

---

## What makes it 10/10 when fully built?

A 10/10 World Map has five properties:

**1. Visual drama.** The calendar is the largest typographic element on the page below the artist name. The month label at 52px announces the month. A fan scrolling past cannot miss it.

**2. All 9 moment types.** Not just shows and releases. A supporter sees the rehearsal session on Wednesday. A fan sees the early access window opening Thursday. A first-time visitor sees public moments and knows that behind the dots there is more. This is the content engine that keeps the profile alive every day of the year.

**3. Access layers that create pull.** Lock-ring dots for supporter moments are visible to non-supporters. The teaser text ("Close circle hears this first") creates the desire to upgrade. This is not artificial scarcity — the moment is genuinely exclusive. The World Map makes that exclusivity visible and legible.

**4. Cross-surface coherence (Supabase live).** The artist adds a rehearsal moment in admin on Tuesday. By Tuesday evening, every fan who has opted into Realtime notifications sees it in their fan dashboard. The artist is not broadcasting — they are opening a window. The fan is not scrolling a feed — they are following a real person's schedule.

**5. The fan's cross-artist calendar.** When a fan follows 8 artists and opens fan.html on a Friday morning, they see in 10 seconds: one release yesterday, two shows next week, one supporter early-access window opening today. They take three actions without leaving the page. This is the flywheel that makes fan.html worth bookmarking.

---

## The gap between "distinctive" and "standard"

There is a specific risk with the World Map that does not apply to other sections on the profile: it can very easily become a standard mobile calendar with some coloured dots.

The test: does a designer from outside music look at a screenshot of the World Map section and say "I know exactly what this is — it is an ABLE artist profile"? Or do they say "nice calendar implementation"?

Currently the answer is the second. The design language is competent but not owned.

The owned version has:
- The month label at 52px in Barlow Condensed, occupying real visual space
- The gradient card background that places the calendar in a slightly different register from the rest of the page
- The featured-moment callout bar above the grid that uses the artist's accent colour as ambient light
- The lock-ring dots that communicate access layers visually, not just in the panel
- The empty state message that speaks in ABLE's voice rather than hiding

These are not large changes. They are the difference between "good calendar" and "the artist's world".

---

## Spec quality score: 9.2/10

**What earns the score:**

- The four-file structure (Analysis → Spec → Path-to-10 → Review) is the right structure for a cross-surface feature this complex.
- ANALYSIS.md is honest — it does not inflate the current implementation. The 5.2/10 baseline is accurate.
- SPEC.md §7 (copy for all moment types) is unusually complete. Most specs omit the CTA copy, which means developers have to guess. Every type has three CTA states.
- PATH-TO-10.md provides actual code — not pseudocode, not abstract descriptions. The focus trap implementation, the `resolveAccess()` migration wrapper, the `wmEditingId` edit flow — these are drop-in.
- SPEC.md §6 (data flow) covers both V1 localStorage and V2 Supabase with enough specificity to implement without a second research pass.
- The Playwright test suite in PATH-TO-10.md covers 12 meaningful scenarios, not smoke tests.

**What would push it to 10:**

- A wireframe or visual reference for the "oversized" calendar treatment (described well in words, but a picture would close the gap)
- Explicit mention of how the World Map interacts with the gig mode state — a gig-mode profile should promote the show moment on that day to a featured position regardless of section order
- The `earlyAccessHours` logic edge cases: what if `earlyAccessHours` is set but `access.level` is `public`? (Answer: `public` overrides — early access only applies to gated levels. This should be explicit in the spec.)

---

## Final verdict

The World Map is the most conceptually distinctive feature in ABLE. No other link-in-bio platform, no other smart link product, no other artist dashboard has this — a unified presence signal that spans all moment types, respects access layers, and connects three surfaces.

The implementation is functional but not yet felt. The spec is complete. The path is clear.

**Three bug fixes (P0) make it shippable. Four CSS changes make it signature. A Supabase migration makes it real.**

The difference between the World Map at 5.2 and the World Map at 10 is not an architectural change. It is attention to the detail that makes something feel like it was made by people who cared.
