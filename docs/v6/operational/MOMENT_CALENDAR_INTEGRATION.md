# ABLE — Moment Calendar: Profile Integration Spec
**Created:** 2026-03-14
**Status:** ACTIVE — companion to MOMENT_CALENDAR_SPEC.md

---

## 1. Top card / hero relationship

The top card asks: **what is happening right now?**
The calendar answers: **what is the shape of the next 90 days?**

They never contradict each other. They actively reinforce.

**The rule:** when the next calendar moment is within 7 days, the top card pulls from it. Beyond 7 days, the top card follows its own state logic. The calendar always shows everything regardless.

**State-to-calendar mapping:**

| Profile state | Top card | Calendar emphasis |
|---|---|---|
| pre-release (release in ≤ 3 days) | Countdown, pre-save CTA | Release moment pulsing accent ring |
| live (release week) | Stream now, artwork prominent | Release moment shows "Live now" badge |
| gig (tonight toggle) | Tickets front-and-centre | Nearest Show moment elevated, ticket CTA full-width in panel |
| profile (no active state) | Latest release | Next 2–3 moments equal weight, no forced emphasis |

**The bridge:** The state chip in the hero. When a moment is within 7 days, the chip text is generated from it:
- "Tickets Friday"
- "New music tomorrow"
- "Early access tonight"

Tapping the chip scrolls to the calendar section and auto-selects the relevant date.

**Navigation thread:** hero → state chip → calendar section → action. Single thread, no confusion.

**When the top card does NOT pull from the calendar:**
When `gig` state is active (tonight toggle on), the top card is in full gig mode. Calendar supports but does not override.

---

## 2. Placement in profile hierarchy

**Position: second major section, immediately after hero CTAs and Quick Action pills.**

Full section order (top to bottom):

```
1. Top card (artwork/video, state chip, name, bio, primary + secondary CTAs)
2. Quick Action pills
3. ── MOMENT CALENDAR ──
4. Listen / Music
5. Shows (linked from calendar; detailed view)
6. Merch
7. Support
8. Fan capture (if not pinned to hero)
9. Credits
10. Recommendations
11. Footer
```

**Why this placement:**

After the hero, the fan's next question is: *what's happening?* The calendar answers first. It frames everything that follows: Music is what to listen to now, Shows is where to go, Merch and Support deepen the relationship. The calendar provides the context for all of it.

---

## 3. Visual scale and dominance

**Mobile:**

Full-width inside a card (16px horizontal padding). Section header: month label + nav buttons (hidden on mobile — use swipe). Grid: 7 cols, ~48px wide cells on 375px, 48px row height. Total grid: ~300px. Section total: ~360–380px of vertical space. Comparable footprint to a 4–5 track Listen section. **It commands real space.**

**Desktop (≥768px):**

Two-column layout:
- Left: month grid at ~420px
- Right: persistent detail panel showing selected date moments

No overlay on desktop — the detail panel is always visible beside the grid, updating on date selection.

**Card vs full-bleed:**

Always card-contained — same `--r-lg` surface card as other sections, 1px `rgba(255,255,255,0.06)` border. Never full-bleed. The calendar reads as a premium object, not a wallpaper.

**Visual elevation vs other sections:**

The calendar card has a slightly richer background: `rgba(255,255,255,0.02)` above the standard surface — very subtle elevation that distinguishes it as a tool rather than a content list. The month label in `var(--font-display)` at 28–32px gives it editorial weight that other section headers don't have.

---

## 4. Interaction with state logic

The calendar reads from profile state; it does not define its own.

**Pre-release:**
- Release moment on release date: slow pulsing accent ring (4s ease, opacity 0.6→1.0). Reduced-motion: static ring.
- Day cells between today and release date: thin accent underline (connecting strip, 2px, 30% opacity) — creates a visual countdown without numbers.
- Detail panel: "5 days to go" alongside countdown.

**Live:**
- Release moment: "Live now" green dot replaces type-colored dot.
- Panel: "Out now" badge, stream CTA.
- Other moments: secondary weight, fully visible.

**Gig:**
- Tonight's Show moment: auto-selected when calendar renders.
- No pulsing. Urgency lives in the top card.
- Calendar confirms the moment and provides ticket CTA.

**Profile:**
- No single moment elevated.
- Next 2–3 upcoming dates shown at equal visual weight.
- Calendar reads as "here's what's coming."

---

## 5. Interaction with other sections

**Listen / Music:**
Release calendar moments link to specific release cards in the Listen section. CTA in detail panel → scrolls to Listen, auto-expands the release card. If moment has `embedUrl`, show compact embed inline in the detail panel (conduit principle — experience inside the page, not a link out).

**Shows:**
Show moments in the calendar = same data as Shows section. Calendar is the primary discovery surface. Shows section is the detailed deep-dive. "See all shows" at bottom of calendar → navigates to Shows section. Shows section should appear immediately below the calendar in the section order.

**Merch:**
Merch Drop moments link to Merch section. Detail panel may include a product image if `imageUrl` is set on the moment. Active drops: "Shop now" CTA. Past drops: "View in Merch" — may still be available.

**Support:**
Early Access and Supporter moments create passive, honest upgrade prompts. Non-supporter fans see the moment, see what they're missing, see a clear path. No hard sell. The Support section below reinforces what being a supporter means and gives the full picture.

**Fan capture:**
"Notify me" CTA on `access: 'fan'` moments → fan capture form, pre-sourced with moment title. High-intent capture: the fan is signing up for a specific reason.

**Credits:**
No direct relationship in v1.

**Recommendations:**
No direct relationship in v1. Future: show upcoming moments from recommended artists ("Playing next Saturday").

---

## 6. "What's next" feeling

Three mechanisms create momentum without noise:

**1. The visible horizon.**
4–6 moments across 60 days signals "this artist has a world." The fan feels rhythm and intention even without interacting with each moment.

**2. Auto-selected nearest moment.**
On page load, the calendar auto-navigates to today's month and selects the nearest upcoming moment date (not today if no moments today). The fan immediately sees what's relevant.

**3. State chip breadcrumb.**
Hero chip → within-7-days summary → scrolls to calendar. Persistent, low-urgency, useful.

**Avoiding noise:**
Soft admin warning when a month has >6 moments: "Your calendar is full this month — consider whether each moment deserves its own date." Not a hard limit. A product guardrail.

---

## 7. Visual language inside the profile

**What distinguishes the calendar visually from other sections:**
- Slightly elevated background (`rgba(255,255,255,0.02)` above surface)
- `var(--font-display)` for month label at 28–32px — editorial presence
- Subtle cell grid lines: 1px `rgba(255,255,255,0.04)` — gives it structure without feeling like a spreadsheet
- Type-colored dots: the primary information carrier in the grid
- Detail panel: `rgba(255,255,255,0.06)` surface, type color at full opacity for badge

**Icons:** detail panel only, not in the grid. Grid = date + dot. Panel = icon + type label + full content.

**Accent inheritance:** CTAs in the detail panel use `var(--color-accent)` — the artist's own accent. The calendar inherits the artist's identity rather than imposing its own color system.

**Premium test:** remove the artist name. Does the calendar feel like it belongs to a musician's world? It should. Dark surface, editorial header, type-colored dots, clean grid — music-native, not productivity-tool.

---

## 8. Mobile-first behaviour

**Grid dimensions:**

```css
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0; /* no gap — cells are full-bleed in the grid */
}
.calendar-cell {
  min-height: 48px;
  padding: 6px 4px 4px;
  cursor: pointer;
  position: relative;
}
```

Dot sits in the lower third of the cell. Date number vertically centered in the upper half. Empty cells: clean space, no visual content.

**Month navigation:**

```javascript
// Touch-based swipe on the grid
let touchStartX = 0
grid.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX)
grid.addEventListener('touchend', e => {
  const deltaX = touchStartX - e.changedTouches[0].clientX
  const deltaY = Math.abs(e.changedTouches[0].clientY - e.touches[0]?.clientY || 0)
  if (Math.abs(deltaX) > 40 && deltaY < 20) {
    navigateMonth(deltaX > 0 ? 1 : -1)
  }
})
```

**Date tap → detail panel:**

Half-sheet from bottom. Covers ~50% viewport. Grid still partially visible — tapping a new date updates the panel without dismissing. Dismiss: swipe down or tap the drag handle.

Tapping an empty date: 120ms accent scale on the cell, then deselects. No "nothing here" message. Silence is correct.

**Preventing cramped feel:**
- 48px row height is the floor, never compromised
- 7-column grid uses full available width
- Empty cells are clean space, not missing-data indicators
- Month header (44px) breathes above the grid

---

## 9. Profile cohesion

What makes the calendar feel integrated:

**1. Shared state source.** The calendar reads the same state that drives the top card. Pre-release → both emphasise the release date. Gig → both highlight tonight. One source, two expressions.

**2. Auto-populated from existing data.** Releases and shows appear in the calendar without additional entry. The calendar reflects what's already in the profile — it's not a separate calendar tool.

**3. Artist accent inheritance.** Type-colored CTAs use `var(--color-accent)`. The calendar speaks the artist's visual language.

**4. Section links, not exits.** Every calendar CTA either triggers an action or navigates within the profile. The fan goes deeper, not out.

**5. The temporal dimension.** The calendar adds the one thing ABLE profiles currently lack: a sense of time. From static snapshot to living world. That is the cohesion argument. Everything else in the profile exists at a point in time; the calendar shows the arc.
