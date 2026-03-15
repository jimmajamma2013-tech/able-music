# fan.html — Page Specification
**Last updated: 2026-03-15**
**Authority: V8_BUILD_AUTHORITY.md §6, §1.2**

---

## What this page is

fan.html is the fan's personal dashboard on ABLE. It is the answer to the question a fan asks after signing up from an artist's profile: "What happens now?"

It is not a social network. It is not a content feed. It is not Instagram or TikTok.

It is a place for a fan to stay close to the artists they care about — without an algorithm in the way. Every artist they follow is here because they chose them. Every item in their following strip is from a real person they actually wanted to hear from. Nothing is ranked. Nothing is promoted. Nothing is served to them by a machine.

---

## Primary job

**Show fans what is happening with the artists they chose to follow, so they never miss something they would have cared about.**

That is the entire job. One sentence. Do not expand it. Do not layer discovery on top of it until that primary job is done perfectly.

Secondary jobs, in order:
1. Help fans find more artists they might genuinely like — via taste (genre/city/vibe), not engagement metrics
2. Show fans what is playing near them, so a show they want to attend is never missed because they didn't know about it
3. Provide a space for Close Circle — the fans who go a little further

---

## The conduit principle applied to the fan dashboard

The root truth of ABLE is: "The relationship between artist and fan belongs to them. Not to a platform."

On fan.html this means:

- The fan should feel like they are looking at the artist's world, not ABLE's product
- Each artist appears in their own accent colour. The fan is moving between artist-owned spaces, not a generic platform feed
- The vocabulary is the artist's vocabulary: "New from Nova Reign" not "Nova Reign posted"
- ABLE is the door. The artists are the room.

---

## What fan.html must feel like

**It must feel like:**
- A clean, personal morning briefing from the artists you actually care about
- Warm. Specific. Direct. Not noisy.
- The same design world as the artist profiles they signed up from — dark, considered, quiet
- Something an artist would be proud to have their fans land on

**It must not feel like:**
- A social media feed
- A music streaming service
- A ticketing app
- An algorithmic recommendation engine
- A generic SaaS dashboard

---

## What fan.html must not do

- Surface content based on engagement metrics or popularity scores
- Show any kind of global trending or viral content
- Use the word "feed", "post", "content", "followers", "engagement"
- Manufacture scarcity or urgency
- Make the fan feel like they are being managed or targeted
- Gamify fan behaviour (badges, streaks, points, leaderboards)
- Show the fan to other fans
- Allow direct messages fan-to-fan or fan-to-artist (not a community platform)

---

## Sections, in order

1. **Header** — ABLE wordmark + notification icon + profile icon. No greeting copy on this iteration (first-name greeting requires auth — Phase 2).
2. **Content tabs** — Following / Discover / Near me. Simple, honest. No "For You" tab.
3. **Following view** (default):
   - Today strip — items from followed artists in the last 24 hours
   - This week strip — items from followed artists in the last 7 days, beyond today
   - Caught up state — when all items have been seen
   - Empty state — when the fan follows nobody
4. **Discover view**:
   - Filter pills: Emerging / Connected / By vibe / Just dropped
   - Artist cards with honest "why" reasons (genre match, shared credit, location)
   - Creatives section — producers, mixers, collaborators credited on artists the fan follows
5. **Near me view**:
   - Location display with edit option
   - Shows grouped by "This week" / "Coming up"
   - Both followed artists and discovery artists with shows nearby
   - Empty state if no shows in city
6. **Bottom tab bar** — Feed / Artists / Me. Three tabs only.

---

## Technical constraints

- Single HTML file. No build pipeline. No npm.
- localStorage first. Supabase when backend lands (Phase 2 per V8_BUILD_AUTHORITY.md §13 Phase 2)
- DM Sans only. Same font as able-v7.html artist profiles.
- Dark theme only for v1. `--color-bg: #0d0e1a`
- Platform accent: `#8b7cf4` (distinct from artist accent — this is ABLE's neutral, not an artist colour)
- Each artist displayed in their own accent colour, applied via inline style from data
- Mobile-first: 390px shell width, min 44px tap targets, no horizontal scroll at 375px
- Performance: LCP ≤ 2.5s, CLS ≤ 0.10 — render from localStorage immediately, no API wait

---

## Auth state (v1 — current)

v1 fan.html is localStorage-only. Demo data renders when no real data exists. This is intentional — the page must work and feel good before real data is connected.

Real auth (Phase 2): Supabase magic link → fan identity bound → real followed-artists data from `fan_follows` table → real moments from `moments` table → real shows from `shows` table.

---

## Tone and voice rules

Fan-facing copy is different from artist-facing copy but lives in the same register.

- Direct, warm, specific
- Never "your feed" — say "the artists you're following"
- Never "posted" — say "dropped", "just released", "playing tonight"
- Never "content" — say "music", "show", "update from the artist"
- Dates and times are specific. "Tonight, 8pm" not "upcoming event"
- Empty states are honest, not cheerful. "Nothing new today." not "All quiet on the western front!"
- Discovery is honest about why. "Similar to artists you follow" not "Recommended for you"

---

## Relationship to other pages

- Fan lands here after signing up on able-v7.html (the artist profile)
- fan.html links back to able-v7.html when a fan taps an artist or feed item
- fan.html does not link to admin.html — completely separate user type
- Close Circle on fan.html connects to payment flow (Phase 2 — Stripe)

---

## What success looks like

A fan opens fan.html on a Tuesday morning and in 10 seconds knows:
- Did any artist they follow release something new this week?
- Is anyone they follow playing near them soon?
- Is there anyone new they might like?

They get the answer to all three questions without scrolling more than once. They tap through to the artist's profile when something catches them. They close the app feeling like they stayed close without being overwhelmed.

That is the product. Everything else is detail.
