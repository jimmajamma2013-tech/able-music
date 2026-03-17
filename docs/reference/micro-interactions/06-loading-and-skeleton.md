# 06 — Loading & Skeleton States (71–78)

Loading is where trust is most fragile. A blank screen, a layout jump, or a sudden pop of content all undermine the premium quality ABLE works hard to establish. The goal: the fan should never feel like the page is broken or incomplete.

---

## 71. Shimmer Skeleton — The Standard Loading State
**Verdict: [BUILD] — documented in DESIGN_RESEARCH_2026, must be implemented**

**What it is:** Before the artist's profile data loads, a skeleton screen shows the approximate shapes of the content. Skeleton elements have a left-to-right shimmer gradient sweeping across them every 1.5 seconds, suggesting active loading rather than a broken page.

**Trigger → Rule → Feedback:**
- Trigger: page load begins (skeleton shown immediately, before any data)
- Rule: placeholder elements approximate the dimensions of real content; shimmer animation runs in a loop
- Feedback: the page appears structured and actively loading

**Implementation:**
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-card) 25%,
    var(--color-card-raised) 50%,
    var(--color-card) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: var(--radius-card);
}
@keyframes shimmer {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}

/* Skeleton shapes to match content */
.skeleton-hero  { height: 320px; }
.skeleton-name  { height: 32px; width: 60%; }
.skeleton-bio   { height: 14px; width: 80%; margin-top: 8px; }
.skeleton-bio-2 { height: 14px; width: 55%; margin-top: 6px; }
.skeleton-cta   { height: 52px; border-radius: var(--radius-button); }
.skeleton-pill  { height: 36px; width: 90px; border-radius: var(--radius-pill); }
.skeleton-card  { height: 80px; }
```

**ABLE thoughts:** NNGroup research (DESIGN_RESEARCH_2026, #54) establishes skeleton screens as optimal for 2–10 second loads. ABLE targets under 2 seconds first meaningful paint — so the skeleton should only be visible for a brief moment. Its value is in preventing the jarring experience of blank → content. The critical dimensions: the skeleton `hero` shape must match the real hero card approximately. A 320px skeleton followed by a 280px real hero causes layout shift (CLS score impact). Measure real hero height and match the skeleton. The shimmer speed — 1.5s per cycle — feels like "in progress" not "stuck". Slower than 2s starts to feel broken.

---

## 72. Content Swap Crossfade — Skeleton to Reality
**Verdict: [BUILD] — see #52 for implementation, this is the operational spec**

**What it is:** The transition from skeleton to real content. Both exist in the DOM simultaneously for ~200ms — skeleton fading out, content fading in. The crossfade covers any shape differences between skeleton approximation and real content.

**ABLE thoughts:** The shape-matching limitation (#71) is mitigated by the crossfade. Even if the skeleton artist-name placeholder is 60% wide and the real name is 75% wide, the 200ms crossfade blurs this difference. The fan's eye sees "content appeared" rather than "content replaced skeleton in a specific layout." The longer the crossfade, the more layout shift is hidden — but at the cost of the perceived load time feeling slower. 200ms is the sweet spot. A 400ms crossfade would make the page feel sluggish even if technically fast.

---

## 73. Progressive Image Load — Blur-Up From Placeholder
**Verdict: [BUILD] — the high-quality image loading pattern**

**What it is:** Large images (hero artwork, track artwork) load in two phases. First, a tiny blurred version (4×4px or 8×8px, stored inline as a base64 data URL or a CSS gradient) displays immediately. Then the full resolution loads and crossfades in over the blur.

**Trigger → Rule → Feedback:**
- Trigger: page load (blur shown immediately), then full image loaded
- Rule: blur placeholder at full dimensions, `filter: blur(20px) scale(1.1)`. On load: `opacity: 0 → 1` on the real image
- Feedback: the space is never empty — a colourful, blurry preview gives shape before clarity

**Implementation:**
```html
<div class="img-wrap">
  <div class="img-blur" style="background: linear-gradient(135deg, #e05242, #c44234)"></div>
  <img data-src="artwork.jpg" class="img-main" alt="Release artwork">
</div>
```
```css
.img-blur  { position: absolute; inset: 0; border-radius: inherit; }
.img-main  { opacity: 0; transition: opacity 300ms var(--ease-standard); position: relative; z-index: 1; }
.img-main.loaded { opacity: 1; }
```

**ABLE thoughts:** The simplest version of this is a CSS gradient as the placeholder (using the artist's accent colour). This costs zero extra network requests. The gradient suggests the artwork's colour before the artwork loads. More sophisticated versions use a 4×4px thumbnail (40 bytes base64) as the blur — this is Gatsby/Next.js's "blur hash" approach. For ABLE's single-file architecture, the CSS gradient approach is correct: use `background: linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))` as the placeholder. The artwork loads over it. On slow 4G connections (which many music fans are on at gigs or festivals), this prevents a blank white rectangle where the artwork should be.

---

## 74. Artwork Colour Extraction — Page Accent Updates on Load
**Verdict: [CONSIDER] — technically complex, high payoff**

**What it is:** When the artist's artwork loads, dominant colours are extracted and applied to the ambient glow and potentially the accent system. The page subtly adjusts its colour temperature to match the artwork.

**Implementation:**
```js
// Using canvas to sample artwork colours
function extractDominantColor(img) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 4; canvas.height = 4;
  ctx.drawImage(img, 0, 0, 4, 4);
  const data = ctx.getImageData(0, 0, 4, 4).data;
  let r = 0, g = 0, b = 0;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i]; g += data[i+1]; b += data[i+2];
  }
  const pixels = data.length / 4;
  return { r: r/pixels, g: g/pixels, b: b/pixels };
}
```

**ABLE thoughts:** Spotify does this — the album artwork colour drives the background gradient in the Now Playing view. Apple Music does it too. It's technically achievable with canvas sampling (CORS considerations apply for cross-origin images). The question for ABLE: does the ambient glow colour update based on artwork, or does the artist's chosen accent remain primary? My recommendation: the artist's accent should remain the primary system colour. The artwork extraction is an additive glow only — `--color-ambient` updates, but `--color-accent` does not. This way the artist's deliberate brand colour is preserved, but the ambient atmosphere responds to their current artwork. High complexity for a subtle effect — defer until the rest of the loading system is solid.

---

## 75. Lazy Section Rendering — Below-Fold Sections Not in DOM Until Near
**Verdict: [CONSIDER] — performance optimisation, invisible to users**

**What it is:** Sections below the visible fold (Events, Merch, Support) are not rendered in the DOM on initial page load. They're replaced with a placeholder element and rendered on demand when the user scrolls within ~300px of them.

**Trigger → Rule → Feedback:**
- Trigger: IntersectionObserver fires on placeholder element
- Rule: replace placeholder with real section HTML; trigger entrance animation
- Feedback: invisible to the fan — sections appear to be pre-loaded when they scroll to them

**ABLE thoughts:** For the current single-file HTML architecture, sections are all in the DOM but hidden. True lazy rendering would require JS-templated sections. The performance benefit depends on section complexity — if Events and Merch sections have multiple cards with images, lazy rendering reduces initial DOM complexity. For now, the bigger wins are lazy image loading (#3) and skeleton screens (#71). Lazy section rendering is a Phase 2 performance optimisation for when artist profiles have 10+ events, 12+ merch items, etc.

---

## 76. Connection Loading Ring — Circular Progress for Spotify Link
**Verdict: [BUILD] — admin.html, during Spotify OAuth flow**

**What it is:** When an artist initiates the Spotify connection flow in admin.html, a circular progress ring appears next to the "Connect Spotify" button, indicating the OAuth handshake is in progress. On success, it transitions to the connection badge (#45).

**Implementation:**
```css
.connection-ring {
  width: 20px; height: 20px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-accent);
  animation: spin 700ms linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
```

**ABLE thoughts:** The ring should only be visible during the actual loading window (typically 1–3 seconds for OAuth callback). After 5 seconds without resolution, replace with an error state: "Connection timed out — try again." The Stripe design principle: exact numbers, not vague indicators. If the connection status can include timing (e.g. "Connecting to Spotify..." with a time counter), that's better than an indefinite spinner. Indefinite spinners are anxiety-inducing. A time counter communicates that the system is still working and hasn't frozen.

---

## 77. Optimistic UI — Fan List Count Increments Immediately
**Verdict: [BUILD] — the instant gratification that makes admin feel alive**

**What it is:** When a fan signs up on the artist's profile page, the fan count in admin.html increments immediately — before the server confirms the write. If the server write fails, the count is rolled back and an error is shown.

**Trigger → Rule → Feedback:**
- Trigger: fan sign-up event fires (localStorage write succeeds)
- Rule: fan count `+1` immediately; queue the server write; on failure, `-1` and show toast
- Feedback: artist sees their list growing in real-time without any latency

**ABLE thoughts:** The Doherty Threshold applies here too: artists watching their admin dashboard while sharing their link on social media should see the fan count grow as shares are clicked. Waiting for server confirmation (even 200ms) creates a "delayed counter" experience that feels broken. Optimistic UI is the correct approach. The rollback on failure is important for correctness but is a rare edge case — most writes succeed. The ABLE architecture (localStorage currently, Supabase later) can support this: localStorage write is synchronous and instant, Supabase upsert can be async in the background.

---

## 78. Skeleton Pulse Synchronisation — All Shimmer in Unison
**Verdict: [BUILD] — a small detail that prevents the skeleton from feeling chaotic**

**What it is:** All skeleton elements on the page shimmer in the same phase — the gradient sweep moves across all elements simultaneously, not with different offsets. The page pulses as one breathing organism, not as a scattered collection of independent loaders.

**Implementation:**
```css
/* All .skeleton elements share the same animation with no delay offset */
.skeleton {
  animation: shimmer 1.5s ease-in-out infinite;
  animation-delay: 0s; /* Critical: no per-element delay */
}
```

**ABLE thoughts:** This is a tiny detail with a significant effect. When skeleton elements shimmer out-of-phase with each other, the loading state looks janky and uncoordinated — like multiple separate loading indicators have been placed on the page independently. When they all shimmer together, the loading state feels intentional and cohesive. All skeleton elements should use the same `1.5s` animation with `animation-delay: 0s`. The synchronisation happens naturally if all elements are added to the DOM at the same time with the same CSS class. If elements are added at different times, use a shared start timestamp to synchronise the animation phase.
