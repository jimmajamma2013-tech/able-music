# Landing Page — Path to 10
**Every angle. Every gap. Exactly what makes each one a 10.**
**Created: 2026-03-15 | This is the build brief for Stage 6.**

> Go through this document before touching a line of code. Every decision below has a reason. Do not skip or reorder.

---

## ANGLE 1 — First 3 Seconds
**Current: 5/10 → Target: 10/10**

What a visitor must understand in 3 seconds, before reading or scrolling:
1. This is for musicians
2. Something real is happening on that phone screen
3. There is one obvious thing to do

**What makes it a 10:**

The layout must do the work, not the copy. Three elements must be legible at a glance:

- **Eyebrow:** `For independent artists` — 12px, accent colour, letter-spaced 0.15em, uppercase. Appears above headline. Tiny but decisive — it filters out non-artists before they waste time reading.
- **Headline:** `100 real fans beat 10,000 strangers.` — 56px desktop, 40px mobile, Barlow Condensed 700, white. First thing the eye lands on.
- **Phone:** Right side of hero, 390px × 844px at 70% scale. A real YouTube Short playing silently. The frame looks like a real iPhone. This communicates "this is a real product" without a word.

**Spec changes:**
- Eyebrow must appear above headline, not inline with it
- Phone scale: 70% on desktop (273px wide visible). Not 280px full size — it must feel like a phone in the distance, not a giant mockup.
- CTA button must be visible in the 3-second scan zone — above the fold, no scrolling required at 1280px viewport

---

## ANGLE 2 — Product Demo
**Current: 2/10 → Target: 10/10**

The most important element on the page. Currently broken. This is the entire product thesis made visible.

**What makes it a 10:**

**The phone:**
- Frame: SVG smartphone outline, subtle drop shadow, screen area is a clipped `<div>` — content plays inside it
- Dimensions: 390px × 844px intrinsic, displayed at 70% scale on desktop (273px × 590px)
- Screen area: inner `<div>` with `border-radius: 40px`, `overflow: hidden`, black background

**The 4 state buttons:**
- Horizontal row below the phone on desktop
- Each button: min 56px height, 140px wide, `border-radius: 14px`
- Default state: `background: rgba(255,255,255,0.06)`, `border: 1.5px solid rgba(255,255,255,0.12)`
- Active state: `background: rgba(255,255,255,0.12)`, `border-color: rgba(255,255,255,0.3)`, left-border 3px accent colour
- Each button has: state name (15px, 600 weight) + sub-label (11px, muted)
- Mobile: horizontal scroll row, `overflow-x: auto`, `scroll-snap-type: x mandatory`

**What renders inside the phone for each state:**

*Profile state:*
- Artist name "Luna" in Barlow Condensed, large
- Cyan accent (#5bbfcc)
- Top card: YouTube Short iframe — `src="https://www.youtube.com/embed/[ID]?autoplay=1&mute=1&loop=1&playsinline=1"` — 9:16 ratio, fills top 45% of phone
- Below: "Stay close." fan sign-up button, platform pills (Spotify, Apple Music, Instagram)
- State chip top-right: `● Profile` — green dot

*Pre-release state:*
- Countdown timer: `3 DAYS 14:22:07` — large, live-ticking, Barlow Condensed
- Artwork behind with `filter: brightness(0.4)` + accent colour glow
- CTA button: "Hear it first →"
- State chip: `● Pre-release` — purple dot, subtle glow

*Live state:*
- Spotify embed iframe at top — real track, plays in phone
- "It's out now →" CTA prominent
- State chip: `● Out now` — green dot

*Gig Tonight state:*
- Venue name: "Moth Club, London" in large Barlow Condensed
- Time: "Tonight · Doors 7pm"
- "Get tickets →" CTA full-width, amber fill, urgent
- State chip: `● Tonight` — red/amber dot with pulse animation

**State transition:**
- Cross-fade: `opacity 0 → 1`, duration 300ms, `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Only `opacity` and `transform` animated — no layout shift

**The quiet line below the demo (centred, italic, 18px, muted):**
`Artists don't change their Linktree on release day. ABLE changes for you.`

---

## ANGLE 3 — Headline Copy
**Current: 7/10 → Target: 10/10**

The headline is correct. Do not change it. The remaining 3 points come from execution.

**What makes it a 10:**

- **Eyebrow above headline:** `For independent artists` — gives the headline a target. The headline is more powerful when the reader knows it's speaking to them before they read it.
- **Headline:** `100 real fans beat 10,000 strangers.` — 56px desktop / 40px mobile. Barlow Condensed 700. White. The period stays.
- **Sub-headline rhythm:** Each sentence is its own thought, separated by a full stop. `Your page shifts with your moment.` `Release day.` `Tonight's gig.` `What's dropping next.` `Every fan who signs up — that email is yours.` `Forever.` The full-stop rhythm matches the headline's energy. Do not run these together as a paragraph.
- **Type spec:** Sub at 20px desktop / 17px mobile. DM Sans 400. Line-height 1.7. Not compressed. Room to breathe between sentences.

---

## ANGLE 4 — CTA Design and Weight
**Current: 4/10 → Target: 10/10**

The CTA must be the second-most visible thing on the page after the headline.

**What makes it a 10:**

**Primary CTA button:**
- Copy: `Your page is free →`
- Height: 52px
- Padding: `0 32px`
- Background: `#e05242` (or artist-accent-level energy — must feel substantial)
- Text: white, 17px, 600 weight
- Border-radius: 12px
- Hover: `filter: brightness(1.08)` + `transform: translate(-1px, -2px)` + `box-shadow: 0 8px 24px rgba(224,82,66,0.4)` — spring ease, 200ms
- Mobile: `width: calc(100% - 32px)`, full-width feel

**Secondary CTA (text link only, not a button):**
- Copy: `Already have a page? Sign in →`
- 14px, `color: rgba(255,255,255,0.5)` — significantly lower visual weight than primary
- Positioned below primary CTA, 12px gap

**Trust line:**
- Copy: `No card required. Free forever.`
- 12px, `color: rgba(255,255,255,0.38)` — barely there, but reassuring on close inspection

**Hierarchy rule:** Primary CTA > headline > sub-headline > secondary CTA > trust line. Nothing should compete with the primary CTA in the hero's visual weight.

---

## ANGLE 5 — Copy Voice
**Current: 6/10 → Target: 10/10**

All copy is now in COPY.md. The gap was in sections not yet written — FAQ, pricing, the Linktree section. Those are now locked in.

**What makes it a 10:**

Run the following audit before building:

- [ ] Zero exclamation marks in the entire document
- [ ] Zero uses of: "Sign up", "Get started", "Unlock", "Grow your audience", "Turn fans into superfans", "Content creator", "Going viral"
- [ ] Every CTA is specific: `Your page is free →` not `Create account`
- [ ] FAQ answers read like a human wrote them — read each one aloud
- [ ] The Linktree comparison section sounds pointed but not aggressive: `You've had a Linktree for 2 years. What does it know about your release dropping in 3 days?`
- [ ] Pricing descriptors lead with outcome: `Your page, forever.` not `Basic features included`

The copy in COPY.md passes this audit. Build from that document exactly.

---

## ANGLE 6 — Linktree Switcher Pitch
**Current: 3/10 → Target: 10/10**

~80% of target artists have a Linktree. This section is their specific reason to switch. It must be a full, dedicated section — not a bullet point.

**What makes it a 10:**

**Section 4 — full dedicated section with:**

Layout: two columns desktop (copy left, comparison right), stacked mobile.

Left column:
- Headline: `You've had a Linktree for 2 years.` (28px, 700)
- Sub: `What does it know about your release dropping in 3 days?` (17px, muted)

Right column — the comparison:
- Two-column text layout: `Linktree` header / `ABLE` header
- 4 comparison rows (as in COPY.md)
- Linktree column: slightly muted text, no icons
- ABLE column: slightly brighter text, each row has a small accent-coloured tick (✓)

Below both columns (full width):
- Ghost button (outline, not filled): `Paste your Linktree — we'll import your links →`
  - Links to `start.html?import=linktree`
  - `border: 1.5px solid rgba(255,255,255,0.3)`, `border-radius: 10px`, 48px height
  - Hover: border brightens, slight background fill
- Small copy below button: `Spotify, Apple Music, YouTube, Bandcamp — anything we recognise becomes a native ABLE link. Unknown links import as custom buttons.`

**The switcher CTA must be present. This is not optional. It is the most important acquisition pathway on the page.**

---

## ANGLE 7 — Mobile Experience
**Current: 5/10 → Target: 10/10**

Artists live on their phones. A significant % of landing page visitors arrive on mobile. Mobile must be first-class.

**What makes it a 10:**

**375px layout (iPhone SE) — the minimum bar:**

*Navigation:*
- Wordmark left, single `Start →` CTA right
- CTA: 36px height, accent fill, `0 14px` padding
- No secondary links visible — Sign in moves to footer

*Hero:*
- Text stacks above phone (not side-by-side)
- Eyebrow → Headline → Sub → CTA → Trust line, vertically
- Phone below text, scales to viewport: `width: calc(100% - 32px)`, max-width 343px
- CTA: full-width pill below sub-headline

*Demo section:*
- Phone centred, full-width minus 32px padding
- State buttons: `display: flex`, `overflow-x: auto`, `scroll-snap-type: x mandatory`, no wrapping
- Each button: `flex-shrink: 0`, `scroll-snap-align: start`, 48px height, 120px wide
- Touch-scroll indicator: subtle fade on right edge showing more buttons exist

*All sections:*
- All tap targets ≥ 48px (measure with Playwright after build)
- No horizontal scroll on page body (overflow-x: hidden on body)
- Font sizes: body minimum 15px, trust/legal lines minimum 12px
- Hero CTA: `width: calc(100% - 32px)`, not a centred pill

**Test at 375px AND 390px (iPhone 14 Pro) in Playwright before marking mobile complete.**

---

## ANGLE 8 — Performance
**Current: 5/10 → Target: 10/10**

LCP must be ≤ 2.5s on mobile 4G. The demo iframes are the biggest risk.

**What makes it a 10:**

**Font loading (do first, lowest cost):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="[fonts URL]">
```
Load DM Sans and Barlow Condensed. These are already in use — ensure they're preloaded, not just linked.

**Hero section — no iframes in the viewport:**
The hero phone in Section 2 shows Profile state by default. Profile state uses a YouTube Short. Do NOT load the iframe on page load.

Instead:
- Show a static poster image from the YouTube thumbnail: `https://img.youtube.com/vi/[VIDEO_ID]/maxresdefault.jpg`
- Overlay a play indicator (CSS only, no SVG icon needed — just a semi-transparent circle)
- Load the actual iframe only when the user clicks OR when the demo section (Section 3) enters viewport

**Demo section iframes — lazy load:**
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadDemoEmbeds(); // creates iframes and sets src
      observer.disconnect();
    }
  });
}, { rootMargin: '200px' });
observer.observe(document.getElementById('demo-section'));
```

**What NOT to do:**
- Do not add `loading="lazy"` to iframes (no browser support)
- Do not use `<video>` for YouTube — use the iframe after intersection
- Do not preload the Spotify iframe — load only when Live state is first activated

**Target:** LCP ≤ 2.5s on Lighthouse mobile simulation. Run after build.

---

## ANGLE 9 — Social Proof
**Current: 2/10 → Target: 8/10 (honest ceiling until real users exist)**

Cannot reach 10/10 without real user quotes. But can reach 8/10 with honest framing.

**What makes it a 8/10 now:**

**Phase 1 (before first real users — do this now):**
- The demo IS the social proof. A beautiful, real-looking demo with a real artist's music playing says: someone who understands musicians built this.
- Add one small line under the hero CTA: `Built by an independent artist, for independent artists.` — this is authentic social proof. James is the target user.
- Footer: no fake user count. Honest absence.

**Phase 2 (after first 10 artists sign up — add then):**
Add a small section between FAQ and Footer:
```
"My first release on ABLE got 47 email sign-ups in 3 days.
I've never had that from Linktree."
— [Artist name], [City]
```
Two or three quotes max. Real. Specific numbers. Not "this changed my life."

**Phase 3 (after seeding 20 producers):**
Add producer names to the social proof. `Used by producers and artists in London, Manchester, Medellín.` Geographic credibility matters for the target audience.

**Never fabricate.** An empty social proof section is better than a fake one. Musicians can tell.

---

## ANGLE 10 — Trust Signals
**Current: 4/10 → Target: 10/10**

A new visitor has three core fears: card required, spam, lock-in. All three must be addressed.

**What makes it a 10:**

**Under the hero CTA:**
- `No card required. Free forever.` — already in COPY.md
- This must be 12px, clearly visible, NOT in a tiny grey that looks like legal disclaimer

**In Fan Ownership section (Section 5):**
- `If ABLE closes tomorrow — unlikely, but — you export your list and leave with everything.` — this is the ultimate trust claim. It tells artists we won't hold their data hostage.
- `We take 0%. No commission. No lock-in.` — specific, verifiable claims

**In FAQ:**
- `Can I cancel? Yes, any time.` — must be there
- `Who owns my fans' emails? You do. 100%.` — must be there

**In footer:**
- Privacy Policy link — must exist before any real users arrive (P1 legal requirement)
- `© 2026 ABLE Music Ltd. Built for artists, not algorithms.` — subtle credibility signal

**What NOT to do:**
- No SSL padlock icons or "256-bit encryption" badges — these feel like scam site defences
- No cookie banner in the middle of the page experience — defer to Iubenda banner at very bottom
- No "as seen in" logos unless real and recent

---

## ANGLE 11 — Visual Hierarchy
**Current: 5/10 → Target: 10/10**

At a glance, without reading, the page must tell a story. Each section must have one dominant element.

**What makes it a 10:**

**Section-by-section dominance:**

| Section | Dominant element |
|---|---|
| Hero | Headline (56px) — the phone is secondary |
| Demo | The phone — it's the full focus, buttons are supporting |
| Linktree | The comparison table — direct, no decoration |
| Fan Ownership | The headline: `Every email is yours. Forever.` (centred, large) |
| How It Works | The 3 step numbers — large, accent colour |
| Pricing | The tier names + prices — clear visual hierarchy per card |
| FAQ | The questions — readable, expandable |

**Section separation:**
- 96px padding between sections on desktop, 64px on mobile
- Background alternation creates rhythm without dividers:
  - Section 1 (nav): transparent
  - Section 2 (hero): `#09090f`
  - Section 3 (demo): `#0d0f1a` (very slightly lighter)
  - Section 4 (Linktree): `#09090f`
  - Section 5 (fan ownership): `#0d0f1a` — centred, editorial
  - Section 6 (how it works): `#09090f`
  - Section 7 (pricing): `#0d0f1a`
  - Section 8 (FAQ): `#09090f`
  - Section 9 (footer): `#070709`

**Typography hierarchy (global rules):**
- Section headlines: 36px desktop / 28px mobile, Barlow Condensed 700 or DM Sans 700
- Section subs: 18px, DM Sans 400, muted colour
- Body: 16px, DM Sans 400, line-height 1.7
- Small/trust: 12-13px, muted

---

## ANGLE 12 — Switcher Pathway End-to-End
**Current: 2/10 → Target: 9/10**

The full journey: "I'm on Linktree" → lands on ABLE landing page → sees comparison → pastes Linktree URL → links imported → page live.

**What makes it a 9/10 (honest ceiling — import function must be built):**

**Step 1 — Landing page CTA (design work, can do now):**
- Section 4 comparison exists with `Paste your Linktree →` CTA
- CTA links to: `start.html?import=linktree`

**Step 2 — Onboarding detects the query param (build work):**
```javascript
const params = new URLSearchParams(window.location.search);
if (params.get('import') === 'linktree') {
  // Skip to Screen 0 with Linktree import input focused
  showScreen(0);
  document.getElementById('importInput').focus();
  document.getElementById('importInput').placeholder = 'Paste your Linktree URL...';
}
```

**Step 3 — Linktree import Netlify function (build work):**
- Function: `netlify/functions/linktree-import.js`
- Takes a `linktr.ee/[handle]` URL
- Fetches the page HTML (Linktree is server-rendered enough for basic fetch)
- Parses `<a href>` tags matching known patterns
- Returns: `{ links: [{ url, platform, label }], name: '...' }`
- Failure fallback: `{ error: 'Could not read this Linktree. It may be private.' }`

**Step 4 — Onboarding confirmation screen (build work):**
- Shows found links with platform badges
- Checkboxes: artist can deselect any they don't want
- "Import [N] links →" CTA

**Step 5 — Profile populated:**
- Links written to `able_v3_profile.links`
- Artist proceeds to finish onboarding (vibe, colour, theme)
- Done: their page is live with all their Linktree links imported

This pathway is the strongest acquisition funnel ABLE has. Every step must be seamless.

---

## ANGLE 13 — Pricing Clarity
**Current: 6/10 → Target: 10/10**

Pricing must feel honest, not like a trick.

**What makes it a 10:**

**Layout:** 4 tier cards in a row on desktop. Stack on mobile.

**Each card structure:**
1. Tier name (16px, 700)
2. Price (32px, 700 — most visible number on the card)
3. One-line descriptor (14px, muted) — what kind of artist this is for
4. Key line (13px, accent) — the one thing that matters about this tier
5. CTA button (48px height, appropriate style)
6. Feature list (3 items max, each starting with an outcome)

**Free tier card:**
- Slightly different treatment — lighter background or amber border, not just "first in a row"
- CTA: `Your page is free →` (accent fill)
- Small text below: `No card. No time limit.`

**Upgrade trigger (copy addition):**
Under the Free tier feature list, one small line:
`When 100 fans sign up, Artist tier removes the cap.`
This tells artists exactly when to upgrade, before they hit the wall.

**No "most popular" badge.** Explicitly banned.

**Annual toggle (Phase 2):** Not for v1 but worth noting: annual pricing (2 months free) should be added before Artist tier launch. Adds perceived value without changing the free tier.

---

## ANGLE 14 — Emotional Resonance
**Current: 6/10 → Target: 10/10**

The page talks about features. It should talk about the feeling.

**What makes it a 10:**

The feeling ABLE sells is not "campaign states" or "fan CRM". It is:

> *You release something. Real people show up. Those emails are yours.*

**Section 5 (Fan Ownership) rewrite to evoke this:**

Current approach: describes the feature ("email goes to your list, not ours").
Better approach: describes the feeling first, the feature second.

The rewritten copy (already in COPY.md) does this:
- Opens with the consequence: `Every email is yours. Forever.`
- Then explains: `When a fan signs up on your page, that email goes straight to your list. Not ours.`
- Then makes it real: `If you have 500 fans who signed up on your ABLE page, those 500 emails are yours. You own that relationship.`
- Then earns trust: `If ABLE closes tomorrow — unlikely, but — you export your list and leave with everything.`

**Demo — make the number visible:**
In the Live state of the demo phone, show:
```
● 47 fans signed up
```
A real number (even if fictional in the demo) makes the abstract concrete. The artist can picture their 47 people.

**Gig Tonight state — give it urgency:**
The phone in Gig state should look visibly different from the others — warmer, more urgent, amber tones. "TONIGHT" should be the first word you read.

---

## ANGLE 15 — "13-Year-Old" Test
**Current: 5/10 → Target: 10/10**

A 16-year-old SoundCloud artist should understand this without technical knowledge.

**What makes it a 10:**

**Jargon removal:**
- `Campaign states` → never appears in public copy. Always `Your page knows your moment.`
- `Pre-release mode` → `Something's coming` in public-facing labels
- `Live mode` → `It's out now` (not just "Live" — that sounds like a livestream)
- `Gig mode` → `I'm playing tonight`
- `CTA` → never appears in public copy
- `Embed` → never appears in public copy

**Demo instruction — micro-copy addition:**
Above the 4 state buttons:
```
Tap to see how your page changes →
```
11px, muted. Obvious instruction without being condescending.

**"No Spotify? No problem." addition:**
Below the hero sub-headline or in the How It Works section:
`Works with SoundCloud, Bandcamp, YouTube — or nothing at all. You don't need a Spotify page to get started.`

This removes a fear that many younger artists have.

---

## ANGLE 16 — The Single Memory
**Current: 6/10 → Target: 10/10**

If a visitor closes the tab, what sticks? Currently: just the headline.

**What makes it a 10:**

There are two memories the page must plant:

1. `100 real fans beat 10,000 strangers.` — already lands. Keep it.
2. The demo phone switching states — the moment they see the countdown timer appear or the Gig mode urgency, they think: "I want to see what mine looks like."

Memory 2 only lands if the demo works (Angle 2). Fix the demo and this score goes to 10 automatically. They are linked.

**Secondary memory — the quiet line:**
`Artists don't change their Linktree on release day. ABLE changes for you.`

This line, placed below the demo, is the page's second-strongest copy. It crystallises the concept in one sentence for anyone who didn't fully get the demo. It should be:
- 18px, DM Sans 400 italic
- Centred
- Muted colour — not competing with anything, just landing
- Not animated — static. The stillness makes it read as a statement of fact.

---

## ANGLE 17 — Fan Entry Point
**Current: 1/10 → Target: 9/10**

Fans who land here (from "Made with ABLE" on an artist's page) have no path. One line in the footer fixes this.

**What makes it a 9/10:**

Footer, right column, below Privacy/Terms:
```
Not an artist?
Find artists on ABLE →
```

Links to `fan.html` (or the discover/directory page when it exists).

12px text, very muted. Not competing with anything. But it's there for the fan who's looking.

**Why not a full fan landing section:**
A fan who lands on a product marketing page for artists will not read a whole section about the fan experience. They just need a door. One line is the door.

---

## ANGLE 18 — Discoverability / SEO
**Current: 3/10 → Target: 8/10 (honest ceiling — SEO is a long game)**

SEO won't be a primary acquisition channel for 12 months. But the basics are free and should be done now.

**What makes it an 8/10 (the correct investment at this stage):**

**`<head>` additions:**
```html
<title>ABLE — Your artist page, built for real fans</title>
<meta name="description" content="Your page shifts with your moment. Release day, gig night, new drop — ABLE knows. Every fan sign-up goes straight to your list. Free forever.">
<meta property="og:title" content="ABLE — Your artist page, built for real fans">
<meta property="og:description" content="Build your fan list. Own your relationship. Free forever.">
<meta property="og:image" content="https://ablemusic.co/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
```

**Semantic HTML structure:**
- Hero headline: `<h1>`
- Section headlines: `<h2>`
- Sub-headlines: `<h3>`
- No `<div>` used where `<section>`, `<article>`, or `<p>` would be correct

**OG image:**
Create a 1200×630px image: ABLE wordmark + tagline + the hero phone showing a campaign state. This is what gets shared when someone pastes ablemusic.co into Slack, Twitter, or iMessage. It matters.

**What NOT to invest in right now:**
- Backlink building
- Keyword research campaigns
- Blog content
- Schema markup

Do the basics above and move on. Come back to SEO when there are 50+ paying artists.

---

## ANGLE 19 — AI Red Team
**Current: ongoing → Keep as live threat list**

The threats that would kill conversion. Address each before launch.

**Threat 1: "The demo looks fake" — KILLED by Angle 2**
Real YouTube Short + real Spotify embed. Non-negotiable.

**Threat 2: "I don't understand what makes this different from Linktree" — KILLED by Angle 6**
Section 4 with direct comparison. Switcher CTA. Explicit.

**Threat 3: "I'll give them my email and get spammed" — KILLED by Angle 10**
`No card. No commitment. Free forever.` under CTA. Fan Ownership section explains the philosophy. Privacy Policy link in footer.

**Threat 4: "I've seen 10 tools like this" — PARTIALLY KILLED by Angles 2 and 16**
The demo differentiates. The headline differentiates. The quiet line differentiates. Social proof (when it exists) will complete this.

**Threat 5: "I'll do it later" — KILLED by low time cost claim**
`From zero to live in under 5 minutes.` (Section 6 headline). `Paste your Spotify or Linktree link — we'll build the rest.` (onboarding Screen 0). The promise of zero-friction entry removes the "I'll do it later" objection.

**Remaining unresolved threats:**
- **Privacy policy doesn't exist** — legal requirement before any real users. P1. James needs Iubenda (£22/year).
- **Mobile keyboard covering input on iOS** — test in Playwright after build.
- **Spotify embed requiring interaction to play** — browsers block autoplay with sound. Muted autoplay is fine. Never try to autoplay with sound.

---

## ANGLE 20 — North Star Test
**Current: 4/10 → Target: 9/10**

Does this page feel like ABLE, or like "a tool"?

**What makes it a 9/10:**

The north star isn't a single element — it's the sum of every other angle. When angles 1–19 are resolved, the north star score follows automatically.

But there are three specific things that move the needle on "does this feel like ABLE":

**1. Typography confidence:**
- The headline at 56px, Barlow Condensed 700, no softening, no padding — is assertive. It doesn't apologise for being big.
- Sub-headline at 20px, generous line-height — gives each sentence room to land as a thought, not a paragraph.
- Section headlines in DM Sans 700 (not Barlow) — the contrast between display font (hero) and body font (sections) shows typographic range.

**2. The demo as a showcase piece:**
- The phone must look like something an artist would *want* their page to look like.
- Luna's page — cyan accent, dark background, real music playing — must be genuinely beautiful, not a mockup.
- If an independent artist sees that demo and thinks "I want mine to look like that", the north star test is passed.

**3. The quiet line:**
`Artists don't change their Linktree on release day. ABLE changes for you.`

This line, delivered with stillness below the demo, is the page's north star moment. It's not selling. It's stating a fact. That confidence — saying the true thing without hyperbole — is what separates ABLE from generic SaaS copy.

**Why 9/10 and not 10/10:**
The page reaches 10/10 on this angle when it has real social proof from real artists who sound exactly like the target user. That doesn't exist yet. When it does, the page earns its north star score completely.

---

## SUMMARY — SCORES AFTER IMPLEMENTING ALL ABOVE

| Angle | Current | After |
|---|---|---|
| 1. First 3 seconds | 5 | 9 |
| 2. Product demo | 2 | 9 |
| 3. Headline copy | 7 | 10 |
| 4. CTA design | 4 | 10 |
| 5. Copy voice | 6 | 10 |
| 6. Linktree switcher pitch | 3 | 9 |
| 7. Mobile experience | 5 | 9 |
| 8. Performance | 5 | 9 |
| 9. Social proof | 2 | 8 (honest ceiling) |
| 10. Trust signals | 4 | 9 |
| 11. Visual hierarchy | 5 | 9 |
| 12. Switcher pathway | 2 | 9 |
| 13. Pricing clarity | 6 | 10 |
| 14. Emotional resonance | 6 | 9 |
| 15. "13-year-old" test | 5 | 10 |
| 16. Single memory | 6 | 9 |
| 17. Fan entry point | 1 | 9 |
| 18. SEO | 3 | 8 (honest ceiling) |
| 19. AI red team | — | Resolved |
| 20. North star | 4 | 9 |

**Average after: 9.1/10**

---

## BUILD ORDER (Stage 6 sequence)

When building, this is the order that de-risks the most:

1. **HTML structure + semantic markup** — `<h1>`, `<h2>`, section IDs, OG tags
2. **Typography system** — font loading, sizing tokens, Barlow + DM Sans hierarchy
3. **Hero section** — headline, eyebrow, sub, CTA buttons (Angles 1, 3, 4)
4. **Demo phone frame** — SVG frame, phone dimensions, screen clip
5. **Demo state content** — 4 states, phone content per state (Angle 2)
6. **Demo state switcher** — buttons, transition logic, cross-fade (Angle 2)
7. **Linktree section** — comparison table, import CTA (Angles 6, 12)
8. **Fan ownership section** — copy-first, large type, no CTA (Angle 14)
9. **How it works** — 3 steps, icons, bottom CTA (Angle 5)
10. **Pricing section** — 4 tier cards, upgrade trigger copy (Angle 13)
11. **FAQ** — expandable, human copy (Angle 5)
12. **Footer** — fan entry point, trust links (Angles 10, 17)
13. **Lazy loading** — Intersection Observer for iframes (Angle 8)
14. **Mobile layout** — 375px audit, state button scroll (Angle 7)
15. **Playwright verification** — screenshot every section at 375px, 390px, 1280px
