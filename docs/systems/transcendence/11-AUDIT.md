# ABLE — 11/10 Audit
**Created: 2026-03-16 | Status: ACTIVE — living document, update when surfaces change**

---

This document runs every active surface and system through the 11/10 test. For each, the current score is assessed honestly, the gap is named specifically, and one clear recommendation is given for reaching 11.

Scores are assigned on three levels:
- **10** — complete and correct. Does what it should. No obvious gaps.
- **9** — nearly there. One specific detail is missing that would close the gap.
- **Could be 11** — currently impossible to see because it hasn't been built, but the path is clear.

---

## able-v7.html — Artist Profile

### What's at 10
- Page state system: the auto-switch from pre-release → live → profile is architecturally correct. The page knows what moment it's in.
- Theme system: four themes (Dark, Light, Glass, Contrast) all function and all feel intentional.
- Spring physics: the easing functions create a consistent personality across all interactions.
- Fan capture: "Stay close." is exactly the right CTA — an invitation, not a conversion push.
- CTA hierarchy: Hero → Quick Actions → Section Actions enforced with global dedupe. Correct.
- Copy register: "On tonight." / "Out now." / "Dropping [date]" — present tense, immediate. Right.

### What's at 9
- The countdown (pre-release mode) ticks correctly but doesn't have a character arc. It is a clock, not a story. In the final 24 hours, the final hour, the final minute — the design doesn't respond to the approaching moment.
- The "Made with ABLE ✦" footer link exists but may not yet route to a discovery page. The symbol is correct; the destination needs to exist.
- The first fan sign-up on a profile has no special treatment. It is the most important moment on this surface and currently looks like every other sign-up.

### Could be 11
**The countdown climax.** In the final 60 seconds before a release goes live, the profile transforms briefly into a spectacle. The ambient glow on the hero card intensifies. The countdown switches to seconds-only. The numbers render in the largest possible type. At zero, there is a short burst animation as the hero slides from pre-release to live mode. This is a moment most fans will never see. The ones who do will screenshot it. The cost is a single time-gated CSS animation plus a seconds-to-minutes display switch. The payoff is a word-of-mouth moment that no marketing budget could replicate.

**Recommendation:** Build the countdown climax when the pre-release system is otherwise complete. It is the last 2% of the pre-release feature and the detail that elevates it from functional to unforgettable. Estimated build: 3–4 hours.

---

## admin.html — Artist Dashboard

### What's at 10
- Fan list structure: email, timestamp, source — clean, readable, not gamified.
- Campaign HQ: four states displayed clearly. The artist always knows what their page is doing.
- Page state controls: toggle, override, gig countdown bar — functional and honest.
- Shows page: date, venue, doors time, ticket URL — all the right data fields.
- Bottom sheet component: reusable, consistent, well-implemented.
- Stats: views, fans, clicks — scoped correctly. Nothing the artist doesn't need.

### What's at 9
- The greeting is implemented but not yet dynamic. "Good to see you, [Name]." is correct for most sessions. On a show day it should say "You're on tonight." That line costs nothing to build — one conditional check against `able_shows` for today's date. It is currently missing.
- The first fan moment in admin is not yet implemented. When the artist views their fan list for the very first time and there is exactly one entry, the copy should be different. Currently it looks the same as any other fan row. The zero-to-one moment is the most memorable moment in the artist's ABLE journey and admin currently treats it as ordinary.
- The auto-gig indicator (source: auto vs manual) needs to clearly distinguish when gig mode was activated by the calendar versus by the artist. When it is auto-activated, the admin indicator should say: "On tonight — [Venue], doors [time]. Auto from your shows list." The source attribution makes the magic visible.

### Could be 11
**"You're on tonight."** — the greeting when `able_shows` contains a show dated today. This is the highest-value, lowest-effort 11/10 moment in the entire product. An artist who opens their admin dashboard on the morning of a show and sees "You're on tonight." instead of "Good to see you" will tell people about it. The product has read their calendar without being asked. That's a different kind of product. Build this alongside auto-gig — it is one `if` statement away from existing.

**The first fan revelation.** The fan list empty state is currently correct copy. But the transition from empty to one entry is a product moment that should be treated as such. When the count crosses from 0 to 1, the admin should surface it differently: "Your first fan. This is how every list starts." — displayed once, above the first row, disappearing permanently on the next visit. The artist's relationship with their fan list begins here. Make it memorable.

**Recommendation:** Build the dynamic greeting as part of the auto-gig sprint. It shares no infrastructure with auto-gig other than reading `able_shows` — but it should ship in the same commit because the emotional impact of both features is identical: the product knows what day it is for you.

---

## start.html — Onboarding Wizard

### What's at 10
- Three-step structure: identity → vibe → first action. Correct sequence.
- Live preview: the phone updates in real time as the artist types. This is exactly right — they see their page being born.
- Vibe selection: genre-mapped colour presets. Artists choose a vibe and the page immediately feels like theirs.
- Spotify import: one URL → populated profile. The empty state problem is solved at the moment of onboarding.

### What's at 9
- The done screen. It is the final moment of onboarding and its importance is inversely proportional to how much attention has been paid to it. Currently it likely has more words than needed. The correct done state is three words. Everything else is noise.
- The transition from step 3 to the done screen should feel like a reveal, not a page reload. The live preview phone has been building throughout onboarding — the done screen should feel like the phone becoming real.

### Could be 11
**"Your page is live."** — three words on the done screen, nothing more. No "here's what to do next." No tutorial prompt. No confetti animation. No "you're all set." Just the fact.

The artist has just spent five minutes building something. They know what to do next — they need to put the link in their bio. They don't need instructions. They need the confirmation. Three words delivers that and exits cleanly. This is a product philosophy choice as much as a copy choice: ABLE trusts the artist to know what to do. That trust, expressed at the end of onboarding, sets the tone for the entire relationship.

**Recommendation:** Strip the done screen to its minimum. Three words. The page's URL displayed once. A "Copy link" action. Nothing else. Every additional element is noise at the most important moment of the artist's first session.

---

## fan.html — Fan Dashboard

### What's at 10
- Conceptual architecture: follows-based feed of artists, upcoming shows, new drops. The right information hierarchy for a fan who cares about multiple artists.
- The non-algorithmic position: fans see artists in chronological order of upcoming moments, not by engagement score. This is correct and deliberately different from every social platform they use.

### What's at 9
- Visual polish relative to able-v7.html. The fan experience should feel at least as premium as the artist experience — fans are not second-class users of this system.
- The empty state (no followed artists yet) needs to be as carefully written as every other empty state in the product. The fan who just signed up from an ABLE profile and lands on fan.html for the first time needs to understand immediately what this place is and why it's worth coming back to.

### Could be 11
**The cross-artist calendar moment.** A fan follows six artists. In the fan.html calendar view, they notice that two artists they love are both playing shows in Manchester within the same five-day window. Neither artist knew about the other's show. ABLE didn't plan it. The data made it visible. The fan realises that ABLE is doing something no social platform does: giving them a coherent view of the music they care about, structured around time rather than engagement. This is the moment fan.html becomes a daily product rather than a registration receipt. It requires nothing more than rendering followed artists' `able_shows` data in a shared calendar view. The serendipity is structural — it emerges from the data automatically once enough artists and enough fans exist.

**Recommendation:** Build the cross-artist calendar as the primary feature of fan.html version 2. It requires no new data, no new infrastructure — only a calendar view that reads from shows data across followed artist profiles. The value to fans is immediate and compounding.

---

## landing.html — Marketing Page

### What's at 10
- Hero headline: "When they click, be ready." — correct register, correct tension.
- Copy voice throughout: no SaaS jargon, written from inside the music industry.
- Pricing section: honest, specific, no dark patterns.
- Interactive demo phone concept: shows the product working, not just described.
- The three proof points: beautiful, functional, relationship-owned — in the right order.

### What's at 9
- The demo phone currently shows a single static state. The product's core differentiator is that the page changes. A static demo explains the concept; an animated demo proves it. The 15-second state cycle described below is the gap.
- The testimonial section needs to carry a specific number: "340 fan sign-ups in the week after I dropped my EP" is worth ten "ABLE changed how I work" quotes. The copy philosophy applies to testimonials too: specific is always better than general.

### Could be 11
**The demo phone that cycles through all four campaign states automatically.** A visitor lands on landing.html and the phone mockup is showing an artist's profile in normal state. After 4 seconds, it shifts to pre-release mode — countdown appears, hero CTA changes to "Be first to know." After another 4 seconds, it shifts to live — the track embeds, "Stream now" becomes the primary CTA. After another 4 seconds, it shifts to gig mode — "On tonight," tickets front and centre. Then it resets. The entire value proposition of ABLE — "your page knows what moment it is" — is demonstrated in 15 seconds without a word of explanation. The visitor who watches this understands ABLE better than any paragraph of copy could achieve.

This is achievable with `setInterval` plus CSS class switches on the phone shell. No backend. No new component. The existing artist profile rendering already supports all four states — the landing page demo just needs to cycle through them.

**Recommendation:** Build the state-cycling demo as a priority landing page improvement. It is the most direct possible demonstration of the product's core thesis. A visitor who watches it immediately understands why ABLE is different from Linktree. Estimated build: 4–6 hours.

---

## Copy System

### What's at 10
- Register: the banned phrase list is correctly scoped. No "monetise," no "grow your audience," no exclamation marks on dashboard copy.
- Voice: first-person on profile, warm-businesslike on admin, honest on landing. Three registers, three contexts, all defined.
- Empty states: the fan list empty state is among the best copy in the product.
- Error states: "That didn't go through. Try again?" — exactly right.

### What's at 9
- The upgrade nudge copy. When an artist hits 100 fans and ABLE says it's time to upgrade, that moment needs to feel earned — not like an upsell. The copy currently scoped is correct in principle but the line "These are 100 people who asked to hear from you" should be the exact phrasing used. This is the highest-stakes copywriting moment in the product and it needs to be locked.
- Milestone copy more broadly. When an artist passes 50 fans, 100 fans, 500 fans — does ABLE notice? It should. Not with a badge. Not with a confetti animation. With a single, specific sentence in admin. "You've got 100 people who asked to hear from you." Once. Quietly. Then it's gone.

### Could be 11
**Milestone sentences.** Every milestone — first fan, 10 fans, 50 fans, 100 fans, first click, first show added — should be acknowledged with a single sentence in admin that appears once and disappears. These are not gamification. They are the product reading the moment and saying something true. The cumulative effect of these moments — each small, each specific, each earned — is an artist who feels like the product is paying attention to them. That feeling is not created by a single feature. It is created by a pattern of small, honest acknowledgements over time. This is the 11/10 quality that is hardest to describe and easiest to feel.

---

## Micro-Interactions System

### What's at 10
- Spring easing on button presses: `cubic-bezier(0.34, 1.56, 0.64, 1)` — bouncy, alive.
- Deceleration on slides and dismissals: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — natural, not mechanical.
- Bottom sheet behaviour in admin: smooth, gestural, dismissible.

### What's at 9
- Consistency across all surfaces. The spring physics feel is defined but needs auditing on admin.html and start.html to confirm it's applied consistently everywhere — not just on the profile page.
- The tap feedback on mobile (the brief scale-down on touch) should be uniform across all interactive elements. If some buttons have it and some don't, the inconsistency reads as unfinished.

### Could be 11
**A unified haptic vocabulary.** Every interaction category has its own physical weight:
- CTA taps: brief, confident bounce.
- Destructive actions (delete, deactivate): slower, heavier — a slight pause before confirming.
- Success states (fan signed up, snap card published): a small bloom, not a celebration.
- Error states: a single, brief lateral oscillation — not aggressive, but distinct.

This is not achievable through visual design alone — it requires `navigator.vibrate()` on supported devices, carefully calibrated to the interaction type. On devices without haptic support, the visual timing compensates. When this is done correctly, the product feels physically real in a way that no other link-in-bio tool comes close to achieving.

---

## Data Architecture

### What's at 10
- localStorage keys map 1:1 to future Supabase tables. Migration path is clean.
- Key naming is consistent and descriptive: `able_fans`, `able_clicks`, `able_views`.
- The `source` field on all event objects allows attribution without a separate events table.

### What's at 9
- The `able_shows` data model needs a `soldOut` boolean field to support the "Sold out" CTA replacement in gig mode. Currently unspecified.
- The `able_v3_profile.release.announced` field (from the killer features spec) needs to be formally added to the data architecture documentation.

### Could be 11
**Timestamps that carry meaning.** Every event in `able_fans`, `able_clicks`, and `able_views` has a `ts` field. When this data is read back in admin.html, the product should surface patterns that are invisible in raw numbers: "3 fans signed up in the hour after you posted on Tuesday." That observation — derived entirely from timestamp comparison — turns a list into an insight. It requires no new data collection. It requires only a time-aware analytics layer that groups events by the artist's recent social activity patterns (inferred from traffic spikes). This is V2 work — it requires server-side aggregation — but it is the direction that makes the analytics product genuinely useful rather than merely accurate.

---

*Update this document when any surface reaches a new score. The purpose is to keep the gap between current and possible visible at all times — not as a source of anxiety, but as a compass.*
