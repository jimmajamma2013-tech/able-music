# Admin Dashboard — Strategy Review Final
**File: `admin.html` | Created: 2026-03-15**

> Synthesis of all strategy docs. The definitive assessment before the final 20-angle review.

---

## THE ONE-LINE SUMMARY

The dashboard is 70% of the way to excellent — it has the right bones, the right data architecture, the right visual language — but it fails at the exact moment that matters most: when the artist opens it and wonders "is my page working?" The greeting is generic, the information hierarchy buries the most important card, and the mobile experience is likely broken.

---

## WHAT'S WORKING

### The visual language is right
Warm cream (#e8e4dd) + amber (#f4b942) + navy sidebar (#1a1a2e) works. It feels like a backstage environment, clearly separate from the fan-facing profile. The grain texture adds depth. Plus Jakarta Sans reads well at small dashboard sizes. This should not change.

### The data architecture is clean
localStorage → Supabase 1:1 mapping is correct. Stats, fans, clicks, views all stored with timestamps. Source tracking (Instagram/TikTok/Spotify/Direct) is implemented. This is a strong foundation.

### Campaign HQ exists and works
The state machine (profile/pre-release/live/gig) is implemented. The release timeline arc is a standout visual. C16 gig countdown bar is excellent. The concept is 10/10 — the execution needs hierarchy adjustment.

### Fan list is human
Source badges, stagger entrance animation, star system, filter pills — these make the fan list feel like a relationship, not a spreadsheet. The empty state copy ("Your list. Your relationship.") is strong.

### The nudge system is smart
Context-aware, single-nudge at a time, dismissable, stored to localStorage — this is exactly right. The copy for each nudge is good.

### "It's working" moment exists
The card exists, has the right copy, appears at the right time. Needs entrance animation and better wiring.

---

## WHAT'S FAILING

### The greeting is a placeholder
"Good to see you." is currently a heading with no dynamic content. No artist name. No context. The most important sentence in the entire dashboard is hardcoded to the same default state regardless of what's happening in the artist's world. This is the biggest single fix.

### Mobile is likely broken
The sidebar is `position:fixed; width:220px` with `margin-left:var(--sidebar)`. Without a confirmed media query that collapses the sidebar, mobile artists are either looking at sidebar-only or content that's hidden behind it. The CSS for mobile-nav exists but `display:none` appears twice. This needs a Playwright test to confirm.

### Campaign HQ is buried
The four stat cards are arguably more visually prominent than Campaign HQ. For an artist in pre-release with 3 days until their release, the countdown should dominate the page — not be below four equal-weight stat cards.

### Milestones don't exist
No first fan celebration. No 10-fan moment. No 100-fan moment. The dashboard tracks the numbers but never marks the emotional milestones that make an artist feel like something is actually happening.

### Day-1 experience is undefined
A new artist finishing the wizard lands in admin and sees infinite skeleton shimmer. The first-run checklist is there but the heading is slightly generic ("Get your page working — 4 quick things"). There's no distinction between "day 0" and "returning artist" experiences.

---

## THREE QUESTIONS EVERY ARTIST ASKS

### "Is my page working?"
**Current answer:** Check the stats row. Stats are in the right place. But shimmer-on-load means the answer is delayed.
**Ideal answer:** Instant. "248 visits, 12 fans, it's working." — first frame.

### "What should I do next?"
**Current answer:** Nudge system has a contextual prompt. First-run checklist if new.
**Ideal answer:** The page's hierarchy answers this without the artist searching. If Campaign HQ is the dominant card, the answer is obvious: check the campaign state.

### "When should I change my page's mode?"
**Current answer:** Campaign HQ explains each state. Auto-switch is mentioned in copy.
**Ideal answer:** "Your release is in 3 days. Your page is in Pre-release. It switches to Live automatically." — the dashboard communicates confidence.

---

## THE SPEC COMPLIANCE CHECK

From docs/pages/admin/SPEC.md, current gaps in the live build:

| Gap | SPEC says | Current state |
|---|---|---|
| Campaign HQ state switcher 56px tap target | min 56px height | `padding:9px 10px` — too small |
| Contextual greeting sub-line | Wire to state | Always default |
| Nudge dismissal persistent | Write to localStorage | Not confirmed |
| Fan list source filter pills | Add above table | Confirmed in STATUS.md |
| Analytics page | Build from localStorage | Partially built |
| Broadcasts page | Full Pro composer | Empty div → Pro gate |
| Export button on Fans page | Always visible | Not confirmed |
| Section drag-reorder | Add drag handle | Not implemented |
| "It's working" card | Wire to first click event | Exists but entrance missing |
| Mobile bottom tab bar | 5-tab mobile nav | CSS exists, not wired |

---

## AUTHORITY CROSS-CHECK

### V8_BUILD_AUTHORITY.md says about admin.html
> "Admin (5/10 — edit mode broken, auth gate dead)"

Note: V8 assessed admin at 5/10, we assessed at 6.8/10. The discrepancy is because edit mode V2 is now confirmed working (STATUS.md session 6) and auth gate has been removed. Our 6.8 assessment is more current.

### V8 "what gets it to 10" for artist journey:
- ✅ Spotify paste → profile 70% populated (Netlify function built)
- 🔴 Campaign state machine fires automatically (auto-switch exists, no visible indicator)
- ✅ AI writes the bio before they have to (AI trigger in profile page)
- 🔴 Fan list grows visibly with every share (no real-time update)
- 🟡 Gig mode tells the right story for tonight (C16 countdown bar ✅, post-show state ❌)
- 🔴 Edit mode clean, one system, every zone covered (edit mode V2 pill confirmed, but full zone coverage needs audit)
- 🔴 Credits become a live link (not yet — freelancer.html not built)

---

## BUILD PRIORITY STACK (for when building begins)

### P0 (before anything else)
1. Mobile sidebar collapse + bottom tab bar
2. Contextual greeting wired to profile state
3. Campaign HQ moved above stats row
4. Day-1 zero state replaces shimmer
5. First-run checklist title + completion moment

### P1 (high value, medium effort)
6. Milestone card system (fan #1, #10, #50, #100)
7. Live preview chip in topbar (artist's accent colour)
8. Copy audit pass (all labels, empty states, nudge copy)
9. "It's working" card entrance animation
10. Focus ring glow pattern

### P2 (refinements)
11. Post-gig 24h state
12. Auto-switch indicator copy in Campaign HQ
13. QR code in sidebar footer
14. Toast messages on ABLE voice
15. Skeleton shimmer aria-hidden

---

## WHAT SUCCESS LOOKS LIKE

An artist opens admin.html on their phone, 3 days before their release. They see:

```
Good to see you, Nadia.
3 days until Echoes. Your page is set.

[Campaign HQ — Pre-release mode — countdown ticking]
                                   ────●──────────
Echoes                                      3 days
Switches to Live automatically on 18 March.
[Edit release →]

[248 visits]  [47 clicks]  [12 fans]  [19%]

Your page has had visitors every day this week.
```

They know exactly what's happening. They know what will happen next. They don't need to hunt. This is a 9.9/10 dashboard.
