# 01 — Scroll & Momentum Interactions (1–15)

---

## 1. iOS Momentum Scroll (Rubber-banding)
**Verdict: [BUILD] — already partially present, needs verification**

**What it is:** When the user scrolls past the top or bottom edge of the scroll container, content resists and springs back with elastic deceleration — the "rubber-band" effect native to iOS Safari.

**Trigger → Rule → Feedback:**
- Trigger: `touchstart` / `touchmove` past scroll boundary
- Rule: native iOS behaviour, but can be broken by CSS if overflow is set incorrectly
- Feedback: content stretches and snaps back with native momentum

**Implementation:**
```css
.v3-shell {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; /* legacy iOS, still needed for some edge cases */
  overscroll-behavior-y: contain;   /* prevents chain-scrolling to the browser chrome */
}
```

**ABLE thoughts:** The profile page is a fan's first experience of the artist. The moment they drag the page and it feels sticky or wrong — trust is broken before they've read a word. This is infrastructure, not a feature. Currently `overscroll-behavior: none` is set on `body` in able-v3.html, which is correct globally. Ensure the `.v3-scroll-area` inner container uses `overscroll-behavior-y: contain` so the shell itself absorbs the bounce without pulling browser chrome.

---

## 2. Scroll Snap — Section-to-Section
**Verdict: [CONSIDER] — depends on content length**

**What it is:** As the user scrolls, the page snaps to the next logical section boundary (Hero, Music, Events, Merch, Support) rather than stopping mid-section.

**Trigger → Rule → Feedback:**
- Trigger: scroll momentum naturally decelerates
- Rule: `scroll-snap-align: start` on section containers, `scroll-snap-type: y mandatory` on parent
- Feedback: scroll settles at the section start, not a random pixel

**Implementation:**
```css
.v3-scroll-area {
  scroll-snap-type: y proximity; /* 'proximity' not 'mandatory' — mandatory is too aggressive on mobile */
}
.v3-section {
  scroll-snap-align: start;
  scroll-snap-stop: normal;
}
```

**ABLE thoughts:** Use `proximity` not `mandatory`. Mandatory snapping on mobile creates a jarring, trapped feeling — fans scrolling fast will be interrupted. Proximity snapping only kicks in when the scroll naturally lands near a boundary. This is the difference between "helpful" and "fighting the user". Most importantly: test this on Android Chrome. Snap behaviour differs subtly between iOS Safari and Chrome on Android. If it feels wrong on either, skip it — a good free scroll is better than inconsistent snapping. Best candidate section for snap: the transition from the Hero card to the Music section.

---

## 3. Lazy Image Load — Fade-in on Viewport Entry
**Verdict: [BUILD] — high priority for performance**

**What it is:** Images below the fold don't load until they're about to enter the viewport. When they load, they fade in from opacity 0 to 1 rather than popping in.

**Trigger → Rule → Feedback:**
- Trigger: `IntersectionObserver` fires when image is within ~100px of viewport
- Rule: set `src` from `data-src`, add `.loaded` class
- Feedback: `opacity: 0 → 1` transition over 300ms with `--ease-decel`

**Implementation:**
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.onload = () => img.classList.add('loaded');
      observer.unobserve(img);
    }
  });
}, { rootMargin: '100px' });
```
```css
img[data-src] { opacity: 0; transition: opacity 300ms var(--ease-decel); }
img.loaded    { opacity: 1; }
```

**ABLE thoughts:** The master plan explicitly flags page speed as Tier 1. A profile with 5 track artworks, event images, and merch photos could be 800KB of images if loaded eagerly. Lazy loading with `IntersectionObserver` (not the deprecated `loading="lazy"` attribute alone) gives precise control. The fade-in prevents the jarring pop. Critical: the hero artwork should NOT be lazy-loaded — it's above the fold and needs to load immediately. Only apply lazy loading to track cards, event images, and merch thumbnails.

---

## 4. Sticky Header Collapse — Hero to Minimal Bar
**Verdict: [BUILD] — already partially implemented, needs polish**

**What it is:** As the user scrolls past the hero section, the top of the page collapses to a minimal sticky bar showing only the artist name and maybe the accent dot. The full hero re-expands when scrolling back to top.

**Trigger → Rule → Feedback:**
- Trigger: scroll position crosses `heroHeight` threshold
- Rule: toggle `.scrolled` class on the shell wrapper
- Feedback: hero shrinks, a minimal `position: sticky` bar appears from the top

**Implementation:**
```js
const shell = document.querySelector('.v3-shell');
const THRESHOLD = document.querySelector('.v3-hero').offsetHeight * 0.6;
shell.addEventListener('scroll', () => {
  shell.classList.toggle('scrolled', shell.scrollTop > THRESHOLD);
});
```
```css
.v3-top-bar {
  position: sticky; top: 0; z-index: 10;
  transition: height 250ms var(--ease-standard),
              backdrop-filter 250ms var(--ease-standard);
}
.scrolled .v3-top-bar {
  height: 52px;
  backdrop-filter: blur(28px) saturate(180%);
  background: rgba(13,14,26,0.85);
}
```

**ABLE thoughts:** This is the interaction Spotify and Apple Music both do well. On a fan's first scroll, the artist name should remain visible as they explore the page — it's the anchor that tells them "you're still looking at this person". The collapse shouldn't feel like the UI is trying to be clever — it should feel like the page making room. Key risk: don't let the collapsed bar compete with the tab bar. The shell should be scrolled-header at top, content in middle, tab bar at bottom. Three layers, distinct purposes.

---

## 5. Parallax Artwork — Hero Art at 0.7x Scroll Rate
**Verdict: [CONSIDER] — premium feel but GPU budget risk**

**What it is:** The hero artwork scrolls at a slower rate than the surrounding content, creating a sense of depth. Content moves at 1x speed; artwork moves at 0.7x speed.

**Trigger → Rule → Feedback:**
- Trigger: scroll event on the shell
- Rule: `transform: translateY(scrollY * 0.3)` on the artwork layer
- Feedback: artwork appears to be "behind" the content, receding as user scrolls

**Implementation:**
```js
// Use requestAnimationFrame, never inline scroll handler
let ticking = false;
shell.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const offset = shell.scrollTop * 0.3;
      heroArt.style.transform = `translateY(${offset}px)`;
      ticking = false;
    });
    ticking = true;
  }
});
```
```css
.v3-hero-art {
  will-change: transform; /* hint to browser to composite this layer */
}
```

**ABLE thoughts:** Tobias Ahlin's rule applies: only animate `transform` and `opacity`, never `top`/`left`. The `will-change: transform` on the artwork element creates a GPU compositor layer, keeping this at 60fps even on mid-range Android. However — measure before shipping. On a phone with limited GPU memory, too many compositor layers causes dropped frames. Test on a Pixel 5a or Samsung A-series before committing. If it drops below 60fps in testing, remove it entirely — a slightly flat hero is better than choppy parallax.

---

## 6. Pull-to-Refresh — Custom Indicator
**Verdict: [CONSIDER] — only relevant in admin dashboard context**

**What it is:** When the user pulls down past the top of the scroll area, a custom indicator appears showing a refresh is in progress. The artist's accent colour drives the indicator.

**Trigger → Rule → Feedback:**
- Trigger: touchstart at scroll position 0, then touchmove downward
- Rule: track delta Y, if > 64px trigger refresh
- Feedback: a circular indicator grows from the top of the screen, spins with accent colour, then page reloads data

**Implementation:**
```js
let startY = 0;
shell.addEventListener('touchstart', e => { startY = e.touches[0].clientY; });
shell.addEventListener('touchmove', e => {
  if (shell.scrollTop === 0) {
    const delta = e.touches[0].clientY - startY;
    if (delta > 0) indicator.style.transform = `translateY(${Math.min(delta * 0.5, 64)}px)`;
  }
});
```

**ABLE thoughts:** The artist profile page is primarily read-only for fans — they don't need a pull-to-refresh. This interaction makes most sense in admin.html where the artist wants to see updated stats, or in a hypothetical fan dashboard. On the public profile, a standard page reload serves the same purpose without the complexity. File this under "admin dashboard v2" rather than the current sprint.

---

## 7. Scroll-Triggered Entrance — Cards Fade/Slide Up
**Verdict: [BUILD] — high visual impact, low performance cost**

**What it is:** As the user scrolls down and content sections enter the viewport, cards slide up from 20px below their final position and fade in. Each card in a group is staggered by 60ms.

**Trigger → Rule → Feedback:**
- Trigger: `IntersectionObserver` on each card/pill/section
- Rule: add `.visible` class when element enters viewport
- Feedback: `opacity: 0 → 1`, `translateY(20px) → translateY(0)` over 300ms with `--ease-decel`

**Implementation:**
```css
.will-animate {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 300ms var(--ease-decel),
              transform 300ms var(--ease-decel);
}
.will-animate.visible {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger via CSS custom property set in JS */
.will-animate { transition-delay: var(--stagger, 0ms); }
```
```js
const items = document.querySelectorAll('.will-animate');
items.forEach((el, i) => {
  el.style.setProperty('--stagger', `${(i % 6) * 60}ms`);
});
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
}, { threshold: 0.1 });
items.forEach(el => obs.observe(el));
```

**ABLE thoughts:** The DESIGN_RESEARCH_2026 doc covers this in detail (entry #34, Awwwards/Codrops research). The "bloom" effect — content assembling itself as the fan arrives — is one of the strongest signals of a premium, considered product. The stagger cap at 6 items is important: beyond item 6, reset the stagger to 0ms so items 7+ don't have 420ms+ delays. A fan scrolling fast through the page shouldn't watch items crawl in. Items already in view on page load should have no animation (use `{ threshold: 0 }` observer option and mark items already intersecting on load as immediately `.visible`).

---

## 8. Tab Bar Hide-on-Scroll / Show-on-Scroll-Up
**Verdict: [BUILD] — maximises screen real estate without losing navigation**

**What it is:** The bottom tab bar slides down and out of view when the user scrolls down (reading content). It reappears when the user scrolls back up (indicating intent to navigate).

**Trigger → Rule → Feedback:**
- Trigger: scroll direction change, detected by comparing current vs previous scrollTop
- Rule: if scrolling down AND past 100px, hide bar; if scrolling up, show bar
- Feedback: tab bar `transform: translateY(0) → translateY(100%)` with 200ms `--ease-accel` on hide; reverse on show

**Implementation:**
```js
let lastScroll = 0;
shell.addEventListener('scroll', () => {
  const current = shell.scrollTop;
  const dir = current > lastScroll ? 'down' : 'up';
  if (current > 100) {
    tabBar.classList.toggle('hidden', dir === 'down');
  }
  lastScroll = current;
});
```
```css
.v3-tab-bar {
  transition: transform 200ms var(--ease-accel);
}
.v3-tab-bar.hidden {
  transform: translateY(100%);
}
```

**ABLE thoughts:** The tab bar occupies ~56px of vertical space on a 667px screen (iPhone SE) — that's 8% of the visible viewport. On the Music section reading a track list, the fan doesn't need navigation. This is the right call. One nuance: if the fan is at the bottom of the page and scrolls down (overscroll), don't hide the tab bar — they've run out of content and the tab bar appearing to invite them elsewhere is correct UX. Check for `current > maxScroll - 100` condition before hiding.

---

## 9. Ambient Glow Responds to Scroll
**Verdict: [CONSIDER] — subtle delight, measurable cost**

**What it is:** The ambient background glow (driven by `--color-ambient`) subtly increases in intensity as the user scrolls deeper into the page, creating a sense of immersion, then fades back at the bottom.

**Trigger → Rule → Feedback:**
- Trigger: scroll position (0 to maxScroll)
- Rule: calculate glow opacity as a sine curve peaking at 40% scroll depth
- Feedback: `--color-ambient` opacity transitions smoothly from 0.15 → 0.30 → 0.15

**Implementation:**
```js
shell.addEventListener('scroll', () => {
  const progress = shell.scrollTop / (shell.scrollHeight - shell.clientHeight);
  const glowIntensity = 0.15 + Math.sin(progress * Math.PI) * 0.15; // peaks at 50% scroll
  shell.style.setProperty('--color-ambient', `rgba(${accentRgb}, ${glowIntensity})`);
});
```

**ABLE thoughts:** This would be invisible to 90% of users — it's a background element responding to a passive action. That's either a waste of complexity or a subliminal quality signal, depending on who you ask. My view: implement it only on the Glass theme where the ambient glow is already the dominant atmospheric element. On the Dark theme it's too subtle to notice. Gate it behind `@media (prefers-reduced-motion: no-preference)` and check that the JS `scroll` listener doesn't fire more than once per rAF.

---

## 10. Section Header Pin — Labels Stick Below Tab Bar
**Verdict: [BUILD] — critical for orientation on longer pages**

**What it is:** As the user scrolls into a section (Music, Events, Merch), the section label ("Listen", "Shows", "Merch") sticks to the top of the content area, just below the sticky header, until the next section pushes it off.

**Trigger → Rule → Feedback:**
- Trigger: section header reaches top of scroll container
- Rule: `position: sticky` with a `top` value equal to the sticky header height
- Feedback: label stays visible while the user reads content in that section; slides away when the next section arrives

**Implementation:**
```css
.v3-section-label {
  position: sticky;
  top: calc(var(--header-height, 52px) + 8px);
  z-index: 5;
  background: var(--color-bg);
  padding: 8px 0 6px;
}
```

**ABLE thoughts:** This is the simplest navigation aid on the page and the most overlooked. Without it, a fan scrolling through 12 track listings has no idea they've passed from the Music section into the Events section — the content runs together. `position: sticky` in CSS is free — no JavaScript needed. The only risk is the `top` value needing to account for the sticky header bar height. Store that value in a CSS custom property so both sticky elements respect the same offset.

---

## 11. Overscroll Background Color Tint
**Verdict: [CONSIDER] — a very small polish detail**

**What it is:** When the user over-scrolls past the top of the page (iOS rubber-band), the background area revealed above the top of content tints to a slightly warmer, lighter version of `--color-bg`. Instead of pure navy, it feels like the page is breathing.

**Trigger → Rule → Feedback:**
- Trigger: overscroll at top (iOS native bounce)
- Rule: set `background-color` on `<html>` or `<body>` to a warmer tone than the shell
- Feedback: the "bounce zone" reveals a different colour than the page background

**Implementation:**
```css
html {
  background-color: color-mix(in srgb, var(--color-bg) 85%, var(--color-accent) 15%);
}
.v3-shell {
  background-color: var(--color-bg);
}
```

**ABLE thoughts:** This is a 2-line change with zero JavaScript. It turns the accidental overscroll bounce from a UI glitch into a micro-moment of brand personality. The accent colour briefly peeks through, reinforcing the artist's colour identity. It works differently across genres: a cyan-accented electronic artist gets a cyan tint, a warm-ochre folk artist gets a warm tint. Worth adding but not worth debugging if it causes cross-browser issues.

---

## 12. Reveal-on-Scroll for Platform Pills
**Verdict: [BUILD] — already covered by interaction #7, specific implementation**

**What it is:** Platform pills (Spotify, Apple Music, Instagram, etc.) don't appear all at once. They enter in a wave from left to right, each 50ms behind the previous, as the platform pill row enters the viewport.

**Trigger → Rule → Feedback:**
- Trigger: pill row enters viewport (IntersectionObserver)
- Rule: same stagger mechanism as #7, but horizontal: pills translate from `translateX(-10px)` to `translateX(0)` rather than Y
- Feedback: pills bloom in from left, creating a "wave" effect

**ABLE thoughts:** The pill section is visually dense — 4-7 platform logos at once. An instant pop-in looks busy. A left-to-right wave communicates intentional sequencing: "here are the places you can find this artist, in order of importance." The delay also draws the eye from left to right, reinforcing reading direction. Use the same IntersectionObserver from #7 — no additional infrastructure needed, just a direction flag.

---

## 13. Artist Name Scale Compression on Scroll
**Verdict: [BUILD] — establishes the hero-to-navigation transition**

**What it is:** The Barlow Condensed hero name begins enormous (at the Dieter Rams / Paula Scher maximum size) and smoothly scales down as the user scrolls past the hero section, settling at a smaller size in the sticky header bar.

**Trigger → Rule → Feedback:**
- Trigger: scroll position relative to hero height
- Rule: interpolate font-size between the hero size and the sticky bar size based on scroll progress through the hero zone
- Feedback: smooth, continuous size compression rather than a jump

**Implementation:**
```js
const heroHeight = hero.offsetHeight;
shell.addEventListener('scroll', () => {
  const progress = Math.min(shell.scrollTop / heroHeight, 1);
  const size = 48 - (progress * 24); // 48px → 24px
  heroName.style.fontSize = `${size}px`;
});
```

**ABLE thoughts:** Paula Scher's principle: the name IS the design. This interaction makes the name feel like it has physical weight — it's enormous and then it retreats, but it never disappears. Artists should feel proud that their name commands that space. The compression should be a continuous CSS interpolation using `calc()` and CSS scroll-driven animations if browser support allows (Chrome 115+), or the JS approach above. Key: never let the name drop below ~20px in the header state. It must remain legible and proud.

---

## 14. Page-Edge Scroll Progress Indicator
**Verdict: [SKIP] — conflicts with ABLE's philosophy**

**What it is:** A thin line or bar along the top or left edge of the screen that fills as the user scrolls through the page, indicating reading progress.

**ABLE thoughts:** A progress bar on a music artist's profile page communicates "this is content to get through" rather than "this is a space to be in." ABLE is not a blog post or a checkout flow. Fans should feel like they're exploring, not completing a task. A progress indicator would be correct on the onboarding wizard (start.html) or on a long admin settings page — not on the public artist profile. Documenting here because it's commonly requested, but the answer for the profile is no.

---

## 15. Scroll-Velocity Based Blur
**Verdict: [SKIP] — GPU cost too high**

**What it is:** During fast scroll, content blurs slightly (similar to motion blur in native apps). When scrolling stops, the blur clears and content snaps into focus.

**Trigger → Rule → Feedback:**
- Trigger: scroll velocity above a threshold
- Rule: apply `filter: blur(Npx)` based on scroll velocity delta
- Feedback: fast scroll = blurred content; settled = sharp

**ABLE thoughts:** `filter: blur()` does not animate on the GPU compositor thread — it repaints the entire composited layer, causing frame drops. This is explicitly called out in DESIGN_RESEARCH_2026 (#25, Tobiasz Ahlin performance rule). Even if it looked beautiful, it would drop below 60fps on mid-range Android. Skip entirely. If a similar "scroll is fast" cue is needed, consider reducing the opacity of secondary content slightly during fast scroll using `opacity` (which IS GPU-composited) rather than blur.
