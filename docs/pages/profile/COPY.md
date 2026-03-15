# Artist Profile — Copy Specification
**File: `able-v7.html` | Created: 2026-03-15**

**KEY PRINCIPLE: This page speaks in the ARTIST'S voice. Not ABLE's.**

The artist is the author of this page. Every default must be written as if the artist wrote it. ABLE is invisible. The fan should feel like they're in direct contact with the artist — not on a platform.

---

## 1. COPY LAWS FOR THIS PAGE

### Never write:
- "Subscribe to updates" → "Stay close."
- "Sign up" → "I'm in." (first person — fan speaks as themselves)
- "Get notified" → anything in the artist's voice
- "Join the list" → the list is theirs, not the platform's
- "Follow" → never
- "Content" → never
- "Profile" → the page is never described as a "profile" to fans
- Section headers in third person ("Music", "Events") → first person ("My music", "Shows")
- Any exclamation marks on copy written by ABLE
- "You're all set!" → never
- "Welcome!" → never

### Always write:
- In the artist's first person where possible
- Short. One true thing. Stop.
- Fan-facing CTAs in the fan's first person: "I'm in", "Count me in", "Yes"
- Trust language that names the artist, not ABLE: "Just [Artist Name]. No spam."
- Confirmations that sound human: "You're in. I'll keep you close."

---

## 2. PAGE META COPY

### `<title>`
```
[Artist Name] — ABLE
```
Default before profile loads: `ABLE`

### Open Graph / Social Share
```
og:title:       "[Artist Name]"
og:description: "[Artist bio first sentence, truncated to 120 chars] — Music, shows, and more."
og:image:       [Artist artwork URL]
twitter:card:   summary_large_image
```

Default description (no bio): `"Music, shows, and more — direct from [Artist Name]."`

Do not: "Artist profile powered by ABLE" — this is the current default and it is wrong.

---

## 3. HERO COPY BY STATE

### State: profile (default)

**Artist name:** artist-set. No default.
**Location + genre:** artist-set. No default.
**Tagline / bio snippet:** first 120 chars of artist bio, artist-set.

**Primary CTA (artist-set or defaults):**
- Default: "My music" → links to music section / latest release
- Acceptable defaults by vibe: "Listen", "Stream", "Hear this"

**Secondary CTA (artist-set or defaults):**
- Default: "Stay close" → scrolls to fan sign-up
- Acceptable: "About me", "Shows", "My work"

**Avoid:** "Learn more", "Explore", "Get started", "Find out more"

---

### State: pre-release

**Countdown heading:** artist-set, or default: "[Release title] — dropping in"
**Countdown units:** [X] days, [X] hours, [X] minutes — no seconds visible (seconds create anxiety, not anticipation)

**Release note (artist-written, optional — mirrors tonight note concept):**
> "This one took [time]. It's done. [Date]."

This is not a feature field the platform generates. It is a 2–3 sentence human message from the artist. Placeholder in the artist's admin: "Write something about what this release means to you. Two or three sentences. Your fans will read it before they hear it."

**Primary CTA:** "Pre-save" (or artist-set variant)
**Secondary CTA:** "My music" (existing releases)

**Trust line:** "You'll hear it before it goes everywhere. Just your email."

---

### State: live (post-release, within 14 days)

**Hero prompt (artist-set or default):**
- Default: "It's out."
- With title: "[Release title] is out."
- Artist-customisable: anything in their voice

**Primary CTA:** "Stream now" / "Listen now" / artist-set
**Secondary CTA:** "Stay close" / fan sign-up

**Artist voice examples:**
- "Two years making this. Here it is."
- "Stream it. Tell me what you think."
- "Out now everywhere."

---

### State: gig (24h manual toggle)

**"Tonight note" (artist-written — mandatory, not optional):**
> 2–3 sentences. The artist writes something human about tonight.
> Examples:
> - "I've been looking forward to this for months. The room is small. It's going to be good."
> - "Playing [venue] tonight. Doors at 8. Come early."
> - "This might be my favourite venue I've ever played. Come if you can."

**Venue + time display:**
```
Tonight: [Venue Name], [City]
Doors [time] · [day, date]
```

**Primary CTA:** "Get tickets" / "Get your ticket" / artist-set
**Secondary CTA (can't make it):** "Stay close — I'll let you know when the next one is"

**Going tonight counter:** "[N] people going tonight" — below the CTAs, subdued. 0 when none.

**Post-show state (after show-end time):**
- Primary CTA shifts to: "Stay close" (fan sign-up primary)
- Secondary: "Merch" if merch section exists
- Post-show note (optional, artist-written): "Good night. Thank you."
- If no post-show note set: nothing — silence is honest

---

## 4. FAN SIGN-UP MODULE

This module is the most important piece of copy on the page. It must feel like an invitation from the artist, not a form from a platform.

### Primary module (inline, after snap cards or before events)

**Heading (display font, large):**
- Artist-set: anything in their voice
- Default: "Stay close."
- With first name: "Stay close, [Artist first name] said."
- Never: "Subscribe", "Sign up", "Get notified", "Join the newsletter"

**Subtext (small, artist-set):**
- Default: "Just your email. I'll reach out when something's actually happening."
- With artist name in it: "Just [Artist Name]. No spam."
- Extended default: "No frequency. No algorithm. Just me, when I have something worth saying."

**Input placeholder:** "Your email"
- Never: "Email address", "Enter your email", "you@email.com"

**Submit button (first-person fan voice):**
- Default: "I'm in"
- Alternatives: "Count me in", "Yes", "Let's stay close"
- Never: "Subscribe", "Sign up", "Submit", "Send"

**Trust line (below the input):**
- "Just [Artist Name]. No spam."
- "Your email goes to [Artist Name] directly. Not to any platform."

---

### Post-submit confirmation state

**Confetti fires. Toast appears:**
> "You're in."

**Below the sign-up module (replaces the form):**
> "You're in. I'll keep you close."

This is artist-voiced. It should sound like the artist said it, not like a system confirmation.

**Confirmation email subject (Resend / not yet wired):**
> "Confirm you want to hear from [Artist Name]"

**Confirmation email body:**
> "[Artist Name] asked me to check this is actually you.
> [Confirm your email →]
> If you didn't sign up, ignore this."

Note: The email is sent on behalf of ABLE but voiced as the artist. It uses the artist's name throughout. ABLE's branding is in the footer of the email only ("Sent via ABLE · Unsubscribe").

**Post-confirmation (in fan dashboard, not on profile):**
> "You've signed up to hear from [Artist Name]."
> "They can now reach you directly. You can leave at any time."

---

### Secondary module (bottom of page, quieter)

**Heading:** "Stay close." (same, smaller)
**Subtext:** absent
**Button:** "I'm in" (same)

---

## 5. SECTION HEADERS

The page's section headers should be in the artist's voice where possible.

| Section | Default header | Artist's voice option |
|---|---|---|
| Music / Releases | "My music" | Artist-customisable: "My records", "Releases", "Discography" |
| Events / Shows | "Shows" | "Where I'm playing", "Live", "On tour" |
| Merch | "Stuff" | "Things", "Merch", "Shop" |
| Snap cards | No header — flows after hero | — |
| Support / Close Circle | (no visible header — flows inline) | — |
| Recommendations | "Artists I believe in" | "These artists", "Listen to them", "Check these out" |

Section headers use the artist's display font and letter-spacing. They should feel like the artist's handwriting in their genre.

---

## 6. RELEASE CARDS

**Stream button:** "Stream" / "Listen" — never "Play" (the fan doesn't control the context)
**Watch button:** "Watch" — for video-linked releases

**Credits section heading (collapsed by default):**
"Made with" — followed by credit list

**Credits line:**
"[Role]: [Name]" — e.g. "Produced by Maya Beats"
If confirmed and has ABLE handle: "Produced by [Maya Beats →]" (live link)

**Empty music section:**
- Do not show: "No releases added yet"
- Instead: nothing — hide the section if empty, or show a placeholder with: "Back soon."
- In owner mode: show an edit prompt: "Add your music. Paste a Spotify or SoundCloud link."

---

## 7. EVENTS SECTION

**Show card anatomy:**
```
[Artwork or venue photo]
[Venue Name]
[City · Date]
[Doors: time] (if set)
[Get tickets →] or [Sold out] or [Free]
```

**No shows state:**
Hide the section if empty. Never: "No shows added yet." In owner mode: "Add a show — paste a Ticketmaster or Eventbrite link."

**Gig mode — featured show card:**
Pulled to top. Pulsing "Tonight" badge. Larger. Ticket price visible if set.

---

## 8. CLOSE CIRCLE COPY

This is the most sensitive copy on the page. It must not sound like a subscription product.

**Section label (very small, uppercase):**
"Close circle"

**The pitch (artist-set, or this default):**
> "Stay closer.
> A small group of people get things a bit earlier — new music before it's out, first shot at tickets, occasional messages that don't go everywhere.
> £5 a month. You can leave whenever."

**Never write:**
- "Exclusive content"
- "Join the community"
- "Become a supporter"
- "Premium access"
- "Unlock exclusive benefits"
- Any price with pence (£4.99 → £5)

**Join button:** "Join the circle"
**Already a supporter:** "You're in the circle" (quiet, warm)

**Post-join:**
> "You're in. You'll hear from [Artist Name] before anyone else does."

---

## 9. SNAP CARDS

**What snap cards are:** Short posts in the artist's voice. Photos, text, links. A horizontal scrolling row of recent things.

**Copy rule:** every snap card should sound like it was written by the artist, not generated by a platform.

**Good snap card examples:**
- "Finished mixing last night. Two years."
- "Playing Bristol this Friday. Tickets in bio."
- "New record coming. More soon."

**Bad snap card defaults:**
- "New post from [Artist Name]!"
- "Check out our latest update"
- Anything with an exclamation mark that ABLE writes

**CTA on snap card:** artist-set. Default: none.

---

## 10. PLATFORM PILLS

Platform pills are the artist's natural presence on other platforms. They should feel like shortcuts to where the artist lives, not a link list.

**Label copy:** platform name only, no verbs.
- "Spotify" not "Stream on Spotify"
- "Instagram" not "Follow on Instagram"
- "YouTube" not "Subscribe on YouTube"

**Overflow button:** "+ [N] more" — subdued, accent colour

---

## 11. RECOMMENDATIONS SECTION

**Section header:** "Artists I believe in"
**Sub-header (optional):** "Worth your time."

**Individual artist entry:**
- Artist name
- Genre / brief description (1 line)
- Link: "→" (icon only, or artist name is the link)

**Copy principle:** every recommendation feels like the artist personally chose it. Not an algorithm. Not "Similar artists." The artist vouches for these people.

---

## 12. MADE WITH ABLE FOOTER

**Text:** "Made with ABLE"
**Style:** Small. Quiet. Never styled to compete with any other page element.
**Position:** bottom of page, below all content
**Not:** "Powered by ABLE", "Built on ABLE", "Part of the ABLE network"

The footer is honest. It is never the point.

---

## 13. OWNER-MODE COPY

When the artist views their own page, a few additional strings appear:

**Edit pill label:** "Edit" (nothing else)

**Dashed zone hint (on hover):** "Tap to edit"

**Auto-save toast:** "Saved." (period, no exclamation)

**Go to admin link (in edit panel):** "Your dashboard →"

**Share your page link:** "Copy page link"
**After copy:** toast: "Copied." (period, no exclamation)

---

## 14. EMPTY STATE COPY (CRITICAL)

The empty state is currently 3/10. Copy can help but only so much — the Spotify import flow is the real fix.

Until Spotify import is built:

**Artist name not set:** show nothing — do not render the name zone
**Bio not set:** show nothing — do not render the bio zone
**No releases:** hide the music section entirely
**No shows:** hide the events section entirely
**No snap cards:** hide the snap cards row entirely

The principle: **a page with fewer sections is better than a page with empty sections.**

The only copy that helps in this state:
- Hero tagline (if artist set one): shown as is
- Profile mode CTA: "Stay close" fan sign-up (always present)
- Made with ABLE footer (always present)

**In owner mode with empty sections, add edit prompts:**
- Empty music section: "Add your latest music. Paste a Spotify link."
- Empty events section: "Add a show. Paste a Ticketmaster link."
- Empty snap cards: "Write something. A snap card is just a note — one sentence, a photo, a thought."

These prompts are only visible to the artist owner. Fans never see empty-state placeholder text.
