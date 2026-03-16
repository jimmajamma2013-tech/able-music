# ABLE — Explainer System Specification
**Date: 2026-03-16 | Status: ACTIVE — approved for build**

> This document defines the complete explainer system for ABLE. "Explainers" are every tooltip, orientation card, wizard context line, and inline hint that helps artists understand what ABLE is doing and what to do next. The system has three types. Every explainer in the product is defined here with exact copy.

---

## The Explainer Philosophy

ABLE is not a complicated product. But it introduces a small number of concepts that are genuinely new — campaign states, fan capture, gig mode, Close Circle — and these need one moment of clear orientation.

The standard for every explainer: if a 22-year-old indie artist encounters this concept for the first time, with no Linktree experience and no one to ask, does this text give them enough to move forward confidently?

**Rules for all explainer copy:**

1. One sentence or two. Never three.
2. Say what it *is*, not what it *does for* the artist — the artist can infer the value once they understand the thing.
3. No SaaS language ("This powerful feature allows you to…"). Direct, human.
4. Never imply the artist doesn't know what they're doing. Inform, don't instruct.
5. Tooltips disappear on tap/click-away. Orientation cards dismiss with ×. Neither auto-dismisses.

---

## Type 1: Contextual Tooltips

A small `ⓘ` icon placed inline next to any feature label that introduces an ABLE-specific concept. Tap/hover shows a tooltip.

### Component spec

```
[Feature Label]  ⓘ
                 ↓ (on tap/hover)
┌────────────────────────────────┐
│  Tooltip text. One or two      │
│  sentences.                    │
└────────────────────────────────┘
```

- Icon: `ⓘ` — 14px, `var(--color-muted)`, inline after the label with 6px gap
- Tooltip container: `background: var(--color-card)`, `border: 1px solid var(--color-border)`, `border-radius: 10px`, `padding: 10px 14px`, `max-width: 260px`
- Tooltip text: DM Sans / Plus Jakarta Sans 13px, `var(--color-text)`, `line-height: 1.5`
- Entrance: `opacity: 0; transform: translateY(4px)` → `opacity: 1; transform: translateY(0)`, 180ms `var(--ease-decel)`
- Dismiss: tap/click anywhere outside, or tap the `ⓘ` again
- On mobile: tooltip appears below the icon, full-width minus 32px margin, pointer arrow centred on icon
- On desktop: tooltip appears below-right of the icon

---

### Complete tooltip inventory — admin.html

Every concept-heavy feature in admin.html that needs a `ⓘ`:

---

#### Campaign HQ — Page State

**Label:** "Page state"

**Tooltip:**
```
Your page shows different things depending on what's happening. Set a release date and it shifts automatically — pre-release countdown, then live stream, then back to your profile.
```

---

#### Campaign HQ — Gig Mode

**Label:** "Gig mode"

**Tooltip:**
```
Switches your page to show tonight's show front and centre — venue, time, and ticket link at the top. Lasts 24 hours, then resets automatically.
```

---

#### Campaign HQ — Pre-release

**Label:** "Release date"

**Tooltip:**
```
Set the date and your page enters countdown mode. Fans see a timer and a pre-save CTA instead of your usual profile. It switches to live mode automatically when the date arrives.
```

---

#### Fan List — Source column

**Label:** "Source"

**Tooltip:**
```
Where a fan signed up from — your profile page, a QR code, a direct share, or somewhere else. Useful for knowing which moments are bringing people in.
```

---

#### Fan List — Starred fans

**Label:** "Starred"

**Tooltip:**
```
Your own shortlist. Star fans you want to remember — early supporters, regulars at your shows, people who've messaged. No one sees this but you.
```

---

#### Stats — Views

**Label:** "Views"

**Tooltip:**
```
Every time someone opens your page. Doesn't include your own visits when you're logged in.
```

---

#### Stats — Tap-through rate

**Label:** "Tap-through"

**Tooltip:**
```
The share of visitors who tapped something on your page. A higher number means your page is converting attention into action.
```

---

#### Accent colour

**Label:** "Accent colour"

**Tooltip:**
```
This colour runs through your whole page — buttons, glows, highlights. Match it to your latest artwork and it'll feel like it was designed together.
```

---

#### Close Circle / Supporter

**Label:** "Close Circle"

**Tooltip:**
```
Supporters pay a small monthly amount directly to you. You set the amount. ABLE takes nothing — this goes straight to you.
```

---

#### Snap Cards

**Label:** "Snap cards"

**Tooltip:**
```
Short updates — a thought, a photo, a clip, a behind-the-scenes moment. They live on your page between releases. Not a post. Not a story. Just a moment.
```

---

#### Connections / Credits

**Label:** "Credits"

**Tooltip:**
```
Other artists and collaborators you've worked with. Confirmed by both sides. Fans can see who made your music with you.
```

---

#### Broadcasts

**Label:** "Broadcasts"

**Tooltip:**
```
Write directly to everyone who signed up on your page. Not a newsletter — just you, reaching your list when something's actually happening.
```

---

#### Tier gates — the lock icon

**Label:** Lock icon `⛒` or padlock

**Tooltip:**
```
This is on the [Tier Name] plan. See what's included →
```

*"See what's included →" links to the pricing/upgrade flow.*

---

### Complete tooltip inventory — start.html (wizard)

Tooltips in the wizard are smaller and lighter — they should not feel like documentation in the middle of a setup flow. Used only for the two concepts that are genuinely novel to a first-time artist.

---

#### Screen 3 — Accent colour

**Label:** "Pick a colour that feels like you."

**`ⓘ` tooltip:**
```
One colour. It becomes every button, every highlight, every glow on your page. The easiest way to make it feel like yours.
```

---

#### Screen 7 — Gig mode (within the "Playing tonight" card)

**`ⓘ` tooltip (on the card):**
```
Your page shifts to show the gig front and centre — venue, time, tickets. Resets automatically after 24 hours.
```

---

## Type 2: Section Orientation Cards

Shown once when an artist opens a section they haven't used before. Dismisses with ×. Never shown again after dismissal. Stored in `able_dismissed_nudges` localStorage key (existing key — just add new IDs).

### Component spec

```
┌────────────────────────────────────────────┐
│  [Section name]                          × │
│                                            │
│  What this is.                             │
│  What fans experience.                     │
│  How artists typically use it.             │
│                                            │
│  [Optional: one link or CTA]               │
└────────────────────────────────────────────┘
```

- Container: `background: var(--color-card)`, `border: 1px solid var(--color-accent)` at 30% opacity, `border-radius: 14px`, `padding: 18px 20px`, full-width within section
- Heading: Plus Jakarta Sans 13px weight 600, `var(--color-amber)` — the section name as label, not a headline
- Body text: Plus Jakarta Sans 14px, `var(--color-text)`, `line-height: 1.6`
- Dismiss button: `×` at top-right, 20px touch target, `var(--color-muted)`
- Entrance: only on first open of that section — `opacity: 0; transform: translateY(-6px)` → visible, 200ms ease
- Storage: `able_dismissed_nudges` — push the section ID string on dismiss, e.g. `'orientation-close-circle'`

---

### Complete orientation card inventory

---

#### Close Circle / Supporter

**Nudge ID:** `orientation-close-circle`

```
Close Circle

Let people support you monthly. You set the amount — even £2 or £3 a month. They get early access, a closer connection. You get recurring income without selling anything.

Most artists use it for superfans who'd happily pay to feel closer — not as a paywall, just an open door.
```

---

#### Broadcasts

**Nudge ID:** `orientation-broadcasts`

```
Broadcasts

Write directly to your fans — everyone who signed up on your page. Not a marketing newsletter. Just you, sending a message when something real is happening.

Most artists use it for release announcements, show confirmations, and the occasional personal update. It works because your list only has people who asked to be there.
```

---

#### Snap Cards

**Nudge ID:** `orientation-snap-cards`

```
Snap cards

Short moments. A photo, a thought, a clip — something that lives on your page between releases. Not a post. Not a story. Just a small window for fans who land on your page mid-cycle.

Most artists use them for studio updates, show previews, or anything that feels too small for a release and too personal for social.
```

---

#### Gig Mode

**Nudge ID:** `orientation-gig-mode`

```
Gig mode

Activate this before a show and your page shifts — the gig goes front and centre. Venue, time, ticket link at the top. Everything else steps back.

It lasts 24 hours, then resets on its own. Most artists turn it on the morning of the show.
```

---

#### Merch

**Nudge ID:** `orientation-merch`

```
Merch

Link your Shopify, Bandcamp, or BigCartel store and feature up to 3 items on your page. Fans tap through directly to buy.

Most artists feature one signature item — a vinyl, a limited tee, a zine — rather than their full catalogue. Pick the thing worth clicking on.
```

---

#### Shows / Events

**Nudge ID:** `orientation-shows`

```
Shows

Add your upcoming gigs and they appear on your page automatically. Fans tap the date to get tickets — you link directly to the ticket page.

One show can be marked as featured. If you're playing tonight, Gig Mode puts it even further front and centre.
```

---

#### Fan List

**Nudge ID:** `orientation-fan-list`

```
Fan list

Everyone who signed up on your page. This is your list — not a platform's list. When ABLE connects to email, you can write to them directly.

You own these relationships. No algorithm decides who sees your message.
```

---

#### Analytics

**Nudge ID:** `orientation-analytics`

```
Analytics

Who's coming to your page, when, and from where. Useful for knowing which platforms are actually sending fans your way.

Tap-through rate is the number to watch — it tells you whether your page is doing its job.
```

---

#### Connections / Credits

**Nudge ID:** `orientation-connections`

```
Connections

The people you've made music with — producers, mixers, collaborators. Credits are confirmed by both sides, so they're trustworthy.

Your collaborators' profiles link back to yours. Fans can discover your music through the people who made it with you.
```

---

#### Releases / Music

**Nudge ID:** `orientation-releases`

```
Releases

Your music, listed on your page. Import from Spotify or add manually — title, artwork, release date, streaming links.

Your latest release appears near the top of your page automatically. Use the campaign state system to shift into pre-release or live mode around it.
```

---

#### Page Settings / Appearance

**Nudge ID:** `orientation-appearance`

```
Appearance

Accent colour, theme, and layout. These affect how your page looks to every fan who visits.

The accent colour is the highest-impact change — it runs through every button, every highlight, every glow. Takes 30 seconds and makes the whole page feel intentional.
```

---

## Type 3: Onboarding Wizard Step Context

Each screen in start.html needs a heading and a sub-heading that explains not just *what* to enter but *why this step matters* — the first time an artist encounters an ABLE-specific concept, the sub-heading is their orientation.

This section defines the full heading + sub-heading + tooltip content for every screen where artist context is needed. Copy that already exists in `docs/pages/onboarding/COPY.md` is not reproduced here — only the additions and the contextual copy that was previously missing.

---

### Screen 0 — Hook / Import

**Why this step matters (sub-heading context already in COPY.md):**
Paste a Spotify or Linktree link and the wizard pre-fills itself. Not required — the wizard works without it. The sub-heading ("Paste your Spotify or Linktree link — we'll build the rest.") already covers the context well.

**Gap:** No reassurance for artists who don't have Spotify. COPY.md has "Works with Spotify, Linktree, SoundCloud, Bandcamp, YouTube — or nothing at all." This is correct but the "or nothing at all" reads slightly apologetic. The import is a shortcut, not a requirement — the sub-heading should project equal confidence in both paths.

**Revised framing for "Start from scratch" path:**

Instead of the current "Start from scratch →" (which implies the import is the right path and scratch is a fallback), consider:

```
Don't have a Spotify link handy?
Enter your name and we'll take it from there.
```

This preserves the import as the recommended path without making non-Spotify artists feel like second-class participants.

---

### Screen 1 — Name

**Heading:** "What do you go by?" ✓ (correct — no change)
**Sub:** "Your artist name, your real name, or whatever your fans know you as." ✓ (correct — no change)

**Missing context:** When pre-filled from Spotify, the micro-copy "From your Spotify profile — edit if needed." is good. No gap here.

---

### Screen 2 — Vibe / Genre

**Heading:** "What kind of music do you make?" ✓
**Sub:** "This sets the starting feel of your page. You can change everything later." ✓

**Gap:** "Something else — I'll set it myself" has no reassurance about what "setting it myself" means. An artist who selects this should see:

**Inline context below the "Something else" card (appears when it's selected):**
```
No problem — you'll be able to set your genre and accent from your dashboard once your page is live.
```

This prevents the anxiety of "did I break something by choosing this?"

---

### Screen 3 — Accent Colour

**Heading:** "Pick a colour that feels like you." ✓
**Sub:** "This becomes your accent — buttons, links, highlights. Change it any time." ✓

**Gap:** The contextual copy below the colour strip ("This is the colour your fans will tap…") is correct and present. Add `ⓘ` tooltip (see Type 1 above).

**Missing WHY context — add to sub-heading:**

Current sub is functional. Upgrade it to carry more meaning:

```
This is the one decision that changes how your whole page feels. Match it to your artwork and it becomes part of the aesthetic — not just a settings choice.
```

*(This is a proposed upgrade to the approved copy in COPY.md. If copy is locked, this replaces the existing sub only with sign-off.)*

---

### Screen 4 — Theme

**Heading:** "How should your page feel?" ✓
**Sub:** "You're choosing the atmosphere. What's right for your music?" ✓

No gaps. The four theme cards are descriptive and honest. Dark is pre-selected for the right reasons and the Glass note ("works best with a high-resolution artwork image") manages expectations correctly.

---

### Screen 5 — Links

**Heading (Version A):** "Here's what we found." ✓
**Heading (Version B):** "Where can fans find your music?" ✓

No gaps in copy. The manual link entry path is clear.

---

### Screen 6 — Fan Capture CTA

**Heading:** "What do you want fans to do when they land on your page?" ✓
**Sub:** "One action. What matters most right now?" ✓

**Gap:** An artist unfamiliar with the concept of fan capture may not understand what "Stay close." *means* in practice. A brief orientation sentence should appear at the top of this screen — above the choice cards:

**Context line (14px, muted, above the cards):**
```
When a fan taps this on your page, they sign up. You get their email. That's yours to keep — no platform in the way.
```

This is the most important concept in the entire wizard. It earns one sentence of explanation.

---

### Screen 7 — Current Moment

**Heading:** "What's happening right now?" ✓
**Sub:** "Your page shifts with your moment. This changes the whole front-page experience." ✓

**Gap:** The sub-heading mentions that "your page shifts" but doesn't explain the mechanism. First-time artists don't know what "shifts" means in practice. Add a context line above the cards:

**Context line (14px, muted, above the cards):**
```
Choose the right mode and your page reconfigures itself — the layout, the CTA, the message. Fans see something that matches where you actually are right now.
```

**Secondary gap:** The four card descriptions are correct. But "Playing tonight" has an auto-reset behaviour (24 hours) that is important enough to mention on the card itself, not just in the sub-input:

**Current card copy:**
```
Playing tonight.
Tickets front and centre. Lasts 24 hours, then resets.
```

**The "lasts 24 hours, then resets" line is already present in COPY.md** — this is correctly handled. No change needed.

---

### Screen 8 — Done

**Heading:** "Your page is live." ✓

No gaps. This screen is excellent. The exact phrase, full stop, is right.

---

## Implementation notes

### Tooltip component reuse

The same `ⓘ` tooltip component should be used across admin.html and start.html. Define it once in `shared/able.js` as a utility function:

```javascript
function initTooltips() {
  document.querySelectorAll('[data-tooltip]').forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleTooltip(icon);
    });
  });
  document.addEventListener('click', closeAllTooltips);
}
```

Usage in HTML:
```html
<span class="tooltip-icon" data-tooltip="Your page shows different things depending on what's happening.">ⓘ</span>
```

### Orientation card dismissal

Orientation cards use the existing `able_dismissed_nudges` key in localStorage. The IDs defined in this spec (e.g. `orientation-close-circle`) are the strings pushed to that array on dismiss.

### Wizard context lines

The "context lines" above the cards on Screen 6 and Screen 7 are a new pattern not currently in COPY.md. They are 14px, `var(--color-muted)`, and sit between the sub-heading and the first choice card. They are always visible — not a tooltip, not dismissible. They exist because these two screens introduce the two most unfamiliar concepts in the entire wizard.
