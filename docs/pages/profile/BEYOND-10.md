# Artist Profile — Beyond 10
*What happens when this is not just good but genuinely extraordinary.*

## Current ceiling: 9.7/10
## 20/10 vision: The fan opens a link and realises, in under five seconds, that this artist made something for them — not for the algorithm.

---

## The 3 things that would make this legendary

---

### 1. The countdown that has a character arc

**What it is:**
The pre-release countdown is not one experience — it is five. At 7+ days out: large type, unhurried, the release date stated plainly. At 3 days: the ambient glow on the hero card intensifies incrementally (opacity formula already specced: `clamp(0.12, 0.12 + 0.16 * (1 - daysLeft/14), 0.28)`). At 24 hours: the display shifts register — countdown numbers become the dominant visual on the page, the font weight heavier, the accent colour at full opacity. At 1 hour: the seconds appear for the first time. At 60 seconds exactly: the countdown switches to seconds-only at the largest possible type size, animating at 1.2× normal speed with a subtle scale pulse on each tick — not frantic, deliberate, like a held breath. At zero: a precise 800ms CSS transition — the hero slides from pre-release state to live state as if a curtain has been pulled. No page reload. No flash. A single smooth cross-fade as the countdown resolves to the track embed and the primary CTA becomes "Stream now."

**Why it matters:**
Most fans will not witness the zero crossing. The ones who do will screenshot it and send it to other people. This is the rarest category of viral moment — one that cannot be manufactured or bought, only stumbled into. It rewards being present at the exact right time. That is what concerts do. That is what release nights are for.

**Why no competitor has it:**
Linktree has no campaign state concept at all — their page is identical whether it is release day or three years after. Beacons has no countdown that changes character with proximity. Building this requires: a state machine that tracks time-to-release with subsecond precision, a CSS layer system where ambient glow, type weight, and CTA content are all separate controllable variables, and a design philosophy that says "the page is a performance." No competitor has all three.

**How to build it:**
Extend the existing `computeState()` to return `pre-release-72h`, `pre-release-24h`, `pre-release-1h`, `pre-release-final` (under 60 seconds), and `releasing` (the 800ms transition window). Each state maps to a CSS `data-state` class on `<body>`. The ambient glow layer (`#hero-ambient`) has `opacity` driven by a JS interval that recalculates every minute (switching to every second in the final hour). The countdown element gets `data-phase` attributes and CSS handles the visual register shift. The zero-crossing transition uses `@keyframes countdownResolve` — hero artwork fades up, countdown fades down, CTA morphs — all within 800ms using `var(--ease-decel)`. Total additional JS: ~80 lines. Total additional CSS: ~40 lines. Build time: 4 hours.

---

### 2. The fan sign-up confirmation that uses the artist's name and the fan's name together

**What it is:**
After a fan submits their email, the confirmation does not say "You're in." (which is currently correct). It says: "You're on [Artist Name]'s list."

If the fan typed their own name into the sign-up form (optional name field, not required), the confirmation reads: "You're on [Artist Name]'s list, [Fan First Name]."

The module then changes one more time, after 2 seconds: the text settles to a quieter state — "I'll reach out when something's worth saying." The artist's name remains visible as a possessive. The fan knows exactly whose list they are on and exactly what it is.

**Why it matters:**
"You're in." is correct because it avoids SaaS filler. "You're on Tendai's list" is extraordinary because it names the relationship specifically. The fan signed up not to a platform — they signed up to this artist. That distinction, stated plainly at the moment of sign-up, creates a different kind of relationship than any newsletter sign-up they have ever done. They are not a subscriber. They are on Tendai's list.

The use of the artist's name in the possessive — not "the artist's list", not "their list", but "[Name]'s list" — is the specific detail that creates the emotional weight. It takes one additional line of JS to interpolate the artist name into the confirmation string. The return on that one line is immense.

**Why no competitor has it:**
Every link-in-bio platform handles post-signup confirmation with platform-generic language because their product is the platform, not the artist. "You've been added to [Artist]'s list" feels like a system notification. "[Artist Name]'s list" feels like receiving something. ABLE can do this because the profile is always in the artist's voice — the post-signup confirmation is simply the first moment that voice is directed at the fan personally.

**How to build it:**
In the fan sign-up submission handler, after writing to `able_fans`:
```javascript
const artistFirstName = profile.name.split(' ')[0];
confirmationEl.textContent = `You're on ${artistFirstName}'s list.`;
if (fanName) confirmationEl.textContent = `You're on ${artistFirstName}'s list, ${fanName.split(' ')[0]}.`;
setTimeout(() => {
  confirmationEl.style.transition = 'opacity 0.4s var(--ease-decel)';
  confirmationEl.style.opacity = '0';
  setTimeout(() => {
    confirmationEl.textContent = "I'll reach out when something's worth saying.";
    confirmationEl.style.opacity = '1';
  }, 400);
}, 2000);
```
Optional name field: add a `<input type="text" placeholder="Your name (optional)" autocomplete="given-name">` above the email field. Not required, never validated. Build time: 45 minutes.

---

### 3. Post-gig state that behaves like the morning after a concert

**What it is:**
The post-gig state is currently a quieter profile with "Stay close" as the primary CTA. The 20/10 version: when gig mode transitions to post-gig (show end time passed, gig timer still running), the profile does something no other platform does — it acknowledges the specific night.

The hero changes to show: the venue name and city (from `able_shows`), the date — not formatted as a date but as "Last night" if it was yesterday. The tonight note the artist wrote before the show is now displayed in the hero, not hidden. The CTA is "You were there — stay close." (if the artist has enabled a specific post-show CTA). The fan who visits this page in the 36 hours after a show arrives at a page that is specifically about last night's show, not a generic artist profile.

If the artist uploaded a photo or video after the show (snap card added in the post-gig window), it appears at the top of the snap cards row with a soft "From last night" label — not ABLE-written, but prompted by the admin system.

**Why it matters:**
The post-gig emotional window is the highest-receptivity moment in a fan's relationship with an artist. They have just shared a physical space. The fan who goes home and checks the ABLE link from the artist's bio is in a fundamentally different emotional state than the fan who finds the link casually three weeks later. The product should know this and respond to it. "Last night at The Jazz Café. Stay close." is what an artist would actually say the morning after a show. ABLE can say it for them automatically.

**Why no competitor has it:**
This requires: show data with time precision, a post-gig state machine, and the conviction that a page should behave differently depending on what happened last night. No link-in-bio platform has any of these three things. They would have to rebuild their product thesis to build this.

**How to build it:**
Extend `computeState()` with the `post-gig` state (already partially specced in FINAL-20-ANGLE-REVIEW-2.md). Add a `post-gig` CSS class that renders: `gig-tonight-note` in the hero (moved from the bottom of the hero card to a featured position), the venue from `able_shows`, and "Last night" date formatting. In the hero CTA zone, replace the primary CTA with the post-show CTA if the artist set one, otherwise fall back to "Stay close." Logic: `if (showDate === yesterday) return 'Last night'; else return formattedDate`. Build time: 3 hours.

---

## The one moment

A fan attended a show. It was not a huge venue. They found the artist through a friend six months ago. After the show, standing outside in the cold, they pull out their phone and tap the ABLE link they bookmarked months ago. The page says: "Last night at The Lexington. Stay close." Their name is in the fan list. The artist does not know them. But the product knew they were there, knew the show just ended, and said something specific about it. The fan puts their phone away and thinks: this artist has their life together. They sign up. They stay.

That moment costs zero server calls. It costs one conditional check against `able_shows` and one string interpolation.

---

## What competitors would have to become to match this

**Linktree** would have to abandon their universal-tool positioning entirely. Their product thesis is "one link for everything" — it serves musicians, podcasters, influencers, and brands with the same interface. A campaign state machine that behaves differently based on release dates and show times requires a music-specific data model that Linktree structurally cannot build without segmenting their audience. Linktree cannot do this while also serving an Instagram influencer. They would have to choose.

**Beacons** is closer — they have campaign features. But Beacons' model is a feature shop: artists assemble profiles from components. The post-gig state transformation, the countdown character arc, the artist-name fan confirmation — these are not features you assemble. They emerge from a system that knows the artist's context at every moment. Beacons would have to rebuild from philosophy, not from features.

**Squarespace / Wix bio links** are template tools. The question doesn't apply. They are solving a different problem.

---

## The 20/10 build spec

**Changes:**
- Extend `computeState()` to return `pre-release-72h`, `pre-release-24h`, `pre-release-1h`, `pre-release-final`, `releasing`, `post-gig`
- Add per-phase ambient glow opacity calculation on a 1-minute interval, switching to 1-second in the final hour
- Add seconds-only countdown display for `pre-release-final` state (60 seconds and under)
- Add `countdownResolve` keyframe animation for the zero-crossing moment
- Add artist-name possessive to fan sign-up confirmation: "You're on [Name]'s list."
- Add optional fan name field to sign-up form (not required, autocomplete="given-name")
- Add post-gig hero copy: venue name, "Last night" date formatting, tonight note displayed in hero
- Add post-gig primary CTA: artist-set post-show message, fallback to "Stay close."

**Removes:**
- The countdown that just ticks (replaced by the countdown that has a character arc)
- The generic "You're in." post-signup message (replaced by artist-name possessive)
- The empty post-gig state (replaced by the morning-after context)

**Does not change:**
- The spring physics system
- The four themes
- The seven vibes
- The CTA hierarchy (Hero max 2, Quick Actions max 6, Section Actions max 2)
- The "Made with ABLE ✦" footer position and size
