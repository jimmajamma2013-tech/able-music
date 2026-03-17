# Artist Profile Page — Specification
**File: `able-v7.html` | Created: 2026-03-15**
**Strategy score: see FINAL-20-ANGLE-REVIEW-2.md**

---

## 1. PURPOSE

`able-v7.html` is the public artist profile — the single page a fan sees when they tap the artist's link-in-bio on Instagram, TikTok, or any social platform. It is the core product. Every other page in ABLE exists to support this one.

**Primary job:** Fan lands → understands immediately who this artist is → takes one meaningful action (signs up, streams, buys a ticket, joins Close Circle) → artist owns that relationship from this moment forward.

**What it must feel like:** The artist built this themselves. Not a Linktree. Not a smart link page. Not a platform template. A place that feels specific to this person — their colour, their font, their voice, their world.

**What it must not feel like:** A SaaS product page. A generic link-in-bio. A form. A funnel.

---

## 2. THE CONDUIT PRINCIPLE

ABLE is the door, not the room.

The profile page is a conduit between the artist and the fan. ABLE's job is to disappear. When it works perfectly, the fan feels like they are in direct contact with the artist — not with a platform that happens to host the artist's content.

This principle affects every decision on this page:
- The fan sign-up is in the artist's voice, not ABLE's
- The confirmation email sounds like the artist wrote it
- Section headers say "My music" not "Music section"
- The artist's accent colour dominates; ABLE's brand is invisible
- The footer says "Made with ABLE" once, small, at the bottom — never the point

---

## 3. WHO IT IS FOR

### Primary user: The fan
A person who discovered this artist on social media. They tapped the bio link. They probably don't know what ABLE is. They came here because of the artist, not the platform.

**What they need:**
- Immediate confirmation they're in the right place (artist's face, name, sound)
- One obvious next step (stream / sign up / get tickets — context-dependent)
- A sense of the artist's world, not a list of links
- An invitation to stay close — not a subscription form

### Secondary user: The artist (owner view)
The artist opens their own page to check how it looks, edit something, or share it. They should see a clean, confident version of their profile with gentle edit affordances — not a noisy CMS interface layered on top.

**What they need:**
- Their page looks right
- They can tap anything to edit it in place
- They can share it immediately

---

## 4. THE PAGE'S JOBS BY STATE

The page has four states, each with a different primary job:

| State | Primary job | Fan's question answered |
|---|---|---|
| `profile` | Build the relationship | "Who is this artist?" |
| `pre-release` | Create anticipation | "When does it drop? How do I hear it first?" |
| `live` | Convert attention to streams | "Where do I listen right now?" |
| `gig` | Drive ticket sales and sign-ups | "Are there tickets left? Where is it?" |

The state machine is the page's most powerful feature. Each state changes the entire visual hierarchy — not just a banner or chip. The hero CTA shifts. The top card shifts. The urgency register of the copy shifts. This is what no other link-in-bio platform can do.

---

## 5. CONTENT HIERARCHY

### Zone 1 — Hero (above the fold)
- Artist artwork / video / embed (campaign-state dependent)
- Artist name (display font, vibe-specific, full width)
- Location + genre tags
- Hero CTAs: max 2. Primary = accent fill. Secondary = ghost.
- Optional: "Tonight note" in gig mode, countdown in pre-release mode

### Zone 2 — Quick Actions
- Platform pills: max 4 narrow / 6 wide + overflow
- These are the artist's natural presence on other platforms — feel like a natural extension, not a link list

### Zone 3 — Sections (scroll)
- Snap cards (artist voice posts, horizontal scroll)
- Music (release cards with Stream/Watch CTAs)
- Events (bento grid)
- Merch (bento grid)
- Support (Close Circle)
- Recommendations (artists they believe in)
- Fan sign-up (email capture, artist's voice)
- Made with ABLE footer

### Zone 4 — Sticky elements
- Artist bar (A4): frosted glass, triggers at 70% hero scroll, fan-view only
- Edit pill (owner-only): floating pill, edit mode access

---

## 6. THE FAN SIGN-UP AS A CEREMONY

The fan sign-up module is not a form. It is a moment. The heading is in the artist's voice. The button is first-person. The trust line is honest.

**The difference this makes:**
- "Subscribe to updates" → low conversion
- "Stay close. Just your email. I'll reach out when something's actually happening." → high conversion

The confirmation email sounds like the artist wrote it:
> "You're in. I'll keep you close."
> Sent on behalf of [Artist Name].

This is the moment the relationship starts. The email belongs to the artist the second the fan confirms. That's the entire ABLE proposition in one event.

---

## 7. PERFORMANCE REQUIREMENTS

| Metric | Target |
|---|---|
| LCP | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.10 |
| HTML (gzipped) | ≤ 340kB |

**Rendering law:** render from localStorage immediately. Never wait for an API. External failure → degrade gracefully → never show a blank section shell.

---

## 8. DESIGN SYSTEM REFERENCE

| Token | Value |
|---|---|
| `--color-bg` | `#0a0b10` (dark theme base) |
| `--color-card` | `#16161e` |
| `--color-accent` | Artist-set (default `#e07b3a`) |
| `--font-body` | DM Sans |
| `--font-d` | Barlow Condensed (default, overridden per vibe) |
| Spring easing | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Deceleration | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |

**4 themes:** Dark / Light / Glass / Contrast. All must work on every vibe.
**7 vibes:** Electronic, Hip Hop, R&B/Soul, Indie/Alt, Pop, Rock/Metal, Acoustic/Folk. Each has distinct font, motion timing, and accent suggestion.

---

## 9. CROSS-PAGE COHERENCE

`able-v7.html` sits between `start.html` (onboarding) and `admin.html` (dashboard) in the artist journey. The connection must feel seamless:

- **start.html → able-v7.html:** `@view-transition` with `view-transition-name: artist-name` — the artist name flies from the Done screen preview into the profile hero. Progressive enhancement.
- **admin.html → able-v7.html:** Shared ABLE logo element with `view-transition-name: able-logo`. "Edit page →" in admin topbar links here.
- **Shared design language:** DM Sans body font is used in both `able-v7.html` and `start.html`. Admin uses Plus Jakarta Sans — deliberately different to mark the interior/backstage divide.

---

## 10. DONE CRITERIA

The page is shippable when:
- [ ] All 4 campaign states render correctly across all 7 vibes × 4 themes
- [ ] Fan sign-up stores to Supabase and triggers confirmation email in artist voice
- [ ] Gig mode has tonight note + post-show state
- [ ] Credits display confirmed/unconfirmed treatment + live link when ableHandle exists
- [ ] `@view-transition: artist-name` fires on navigate from start.html
- [ ] WCAG 2.2 AA on all 4 themes + all 7 vibes
- [ ] CLS < 0.10, LCP < 2.5s, HTML < 340kB gzipped
- [ ] Empty state experience (no data) reads as intentional, not broken
