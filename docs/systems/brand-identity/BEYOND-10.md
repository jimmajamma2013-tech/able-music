# Brand Identity — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is when the ABLE wordmark looks like it has always existed — when an artist's public profile feels unmistakably theirs, and when ABLE's presence on that page is a whisper that earns its place.

---

## Moment 1: The Wordmark That Was Always There

**What it is:** An artist opens ABLE for the first time — landing.html on a phone. The wordmark "ABLE" is in the header. Barlow Condensed 700. ALL CAPS. White on midnight navy. They don't think "that's a good logo." They just proceed. Three months later, when they see it on a slide at a music conference, they feel ownership of it. That is 20/10 brand — invisible when it's working, recognisable when it counts.

**Why it's 20/10:** Brand invisibility in context, recognisability in contrast. The ABLE wordmark must not demand attention on landing.html — it must just be there, like the name above a door. The moment it becomes design-y or trying, it fails. The moment someone recognises it out of context and feels something, it has succeeded.

**Exact implementation:**

The wordmark spec rendered as an SVG path (not live text — this is the critical detail that ensures consistent rendering across every environment):

```svg
<!-- /assets/wordmark/able-wordmark-white.svg -->
<!-- Barlow Condensed 700 — converted to paths -->
<!-- Dimensions: variable width × 32px height (natural proportion of the typeface) -->
<!-- Letter-spacing: -0.02em applied before path conversion -->
<svg viewBox="0 0 [width] 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Path data generated from: Barlow Condensed 700, "ABLE", -0.02em tracking, outlined -->
  <path d="[path data]" fill="#ffffff"/>
</svg>
```

The specific reason this is SVG paths and not a font tag: a page that renders "ABLE" in Barlow Condensed on a device that hasn't loaded the font yet shows the wordmark in system fallback for a split second. That moment — even 100ms — is brand degradation. SVG paths render instantly, identically, on every device. No font loading dependency. No flash.

Size implementation across pages:
- `landing.html` hero: `height: 40px` (the SVG scales proportionally — never set width explicitly)
- `admin.html` header: `height: 24px`
- `start.html` header: `height: 24px`
- "Made with ABLE" footer: `height: 13px` (at this size the wordmark is a mark, not a headline)

The "was always there" test: show `landing.html` to someone who hasn't seen ABLE before. Wait 5 minutes. Show them a slide with just the wordmark, white on dark. If they say "that's the ABLE logo" without hesitation, the brand has landed. If they say "oh, the link-in-bio thing" — that's actually better.

---

## Moment 2: The One-Sentence Brand Line

**What it is:** The sentence on `landing.html` that makes an artist stop scrolling, read it twice, and either think "that's for me" or "that's not for me" — with no ambiguity. The sentence that makes a journalist writing about ABLE's positioning quote it in their article. The sentence that an artist uses when they explain ABLE to their manager.

**Why it's 20/10:** A brand line that functions as self-selection. Not a tagline to be admired — a sentence that works as a filter. The wrong artists should read it and think "this isn't really for me." The right artists should read it and feel seen. Both outcomes are correct.

**Exact implementation:**

The current spec has: "ABLE is the quiet confidence of an artist who knows their work is worth showing up for." This is the internal calibration tool — it is not the landing page line.

The landing.html hero line candidates (built from the brand personality and the copy philosophy):

**Candidate 1:** "The page that belongs to you, not to the platform."
- Passes the test: names the competitor class without naming a competitor
- Fails for some: not music-specific enough, could apply to any creator tool
- Best for: artists who have already felt the platform problem

**Candidate 2:** "Your fans' emails. Not the algorithm's."
- Passes the test: immediately positions the core value proposition
- Fails for some: presupposes the artist already understands the email ownership argument
- Best for: artists who are already thinking about this

**Candidate 3:** "Your music deserves a page that knows you."
- Passes the test: emotionally specific, implies the product has intelligence
- Fails for some: slightly vague — "knows you" in what sense?
- Best for: artists who have been frustrated by generic link tools

**Recommendation:** A/B test candidates 1 and 2 on landing.html. Split traffic 50/50 for 30 days with at least 500 unique visits per variant. Measure: scroll depth, time on page, and wizard start rate. The winner becomes the permanent hero line. The loser becomes the sub-headline.

The OG card implementation (exact HTML for `landing.html` `<head>`):
```html
<meta property="og:title" content="ABLE — The page that belongs to you">
<meta property="og:description" content="Fan capture, campaign states, gig mode. Your link-in-bio that works as hard as you do. Free to start.">
<meta property="og:image" content="https://ablemusic.co/assets/og/og-landing.png">
```

The OG image spec (exact layout for creation in Figma):
- Canvas: 1200×630px, fill #0d0e1a
- ABLE wordmark SVG: position top-left, 48px from top, 48px from left, height 40px
- Hero line: Barlow Condensed 700, 44px, white, centred vertically and horizontally, max-width 800px
- ✦: white, 24px, centred, 24px below the hero line
- Domain: "ablemusic.co", DM Sans 400, 18px, #666a8a, bottom-right, 48px padding

---

## Moment 3: At Home on an Artist's iPhone and a Conference Slide

**What it is:** An ABLE artist's profile page screenshot appears in a music industry conference presentation about independent artist tools. The ABLE wordmark is visible in the "Made with ABLE" footer. The presenter uses it as an example of "what a modern artist page looks like." The same screenshot, shared by the artist on Instagram that evening, looks at home in their feed — not like a product screenshot, like a part of their world.

**Why it's 20/10:** Brand duality. The design must work at two opposite ends of the context spectrum simultaneously: intimate and personal on a phone, credible and polished on a 16:9 slide at a conference. Most design fails one of these tests. ABLE must pass both.

**Exact implementation:**

The "at home on Instagram" test (for able-v7.html):
- Screenshot the profile at 430px (iPhone 15 Pro viewport)
- Crop to the hero section only
- The artist's accent colour dominates
- The ABLE wordmark is not visible in the hero crop — it is in the footer, below the fold
- The artist's name, artwork, and CTA fill the frame
- Result: the screenshot looks like the artist's own design, not ABLE's

The "at home on a conference slide" test (for landing.html):
- Screenshot landing.html at 1440px
- The design reads clearly at slide resolution — no fine details that compress to noise
- The wordmark is legible
- The copy is short enough to be read from the back of a room
- The colour palette (midnight navy, white, amber) is distinctive without being loud

The "Made with ABLE" footer spec (final implementation):

```css
.made-with-able {
  display: block;
  text-align: center;
  padding: 32px 0 24px;
  font-size: 13px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  color: var(--color-text-3);  /* approximately 40% opacity muted text */
  text-decoration: none;
  letter-spacing: 0.01em;
}

.made-with-able:hover {
  color: var(--color-text-2);  /* slightly brighter on hover — subtle, not dramatic */
}
```

HTML:
```html
<a href="/?src=footer&artist={{SLUG}}" class="made-with-able" aria-label="Made with ABLE">
  ✦ ABLE · Your page is free →
</a>
```

The typographic reason this works: at 13px, Barlow Condensed is too small to render well — so the footer uses DM Sans (the body font for profiles). The ✦ and the wordmark "ABLE" at 13px in DM Sans read as a credit, not a logo. That distinction is intentional. On the profile page, ABLE is not branding — it is a credit.

The conference slide test, specifically: take a 430px screenshot of any artist's profile in dark theme. Put it on a 1920×1080 white slide. Does it look good? If yes, the design passes the duality test. If the profile looks like a dark phone UI dropped onto a white background, the colours or the composition need work.

---

## The 20/10 test

You know the brand identity has crossed from excellent to extraordinary when an artist says "I want my page to look like ABLE" — meaning they want their page to look that considered — not that they want it to look like ABLE's branding.
