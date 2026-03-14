# 08 — Ambient & Passive Interactions (87–94)

Ambient interactions are the ones users never consciously notice but would immediately feel the loss of. They're the low-frequency hum beneath the louder micro-interactions. For ABLE, these communicate that the page is alive, present, and aware — not a static brochure.

---

## 87. Accent Glow Breathing — Resting State Pulse
**Verdict: [BUILD] — the background atmospheric layer of the page**

**What it is:** The ambient glow behind the hero card (`--color-ambient`, already a defined token in able-v3.html) breathes slowly at rest — expanding and contracting in a 4-second cycle at 0.1 opacity variance. Not noticeable unless you stare at it, but contributes to the page feeling "alive."

**Trigger → Rule → Feedback:**
- Trigger: page is in active (resting) state — continuous
- Rule: `--color-ambient` opacity oscillates between 0.12 and 0.18 over 4 seconds
- Feedback: the background feels like it has a heartbeat

**Implementation:**
```css
@keyframes glowBreathe {
  0%, 100% { opacity: 0.12; }
  50%       { opacity: 0.18; }
}
.ambient-glow {
  animation: glowBreathe 4s ease-in-out infinite;
  will-change: opacity; /* GPU compositor — no repaint */
}
```

**ABLE thoughts:** This is only viable if the glow is implemented as a separate layer (an absolutely-positioned `<div>` behind the content, with a radial gradient background and `opacity` animated). Never animate `background-color` in a loop — that triggers repaints. The opacity animation on a dedicated layer is GPU-composited and essentially free. The 4-second cycle is slow enough to be subconscious — if you sped it to 2 seconds, fans would notice it as a flashing element. At 4 seconds, they perceive it as "the page feels warm" without knowing why. Disable in `prefers-reduced-motion`. Also disable if the user has the Light theme — a breathing glow doesn't work on a light background.

---

## 88. Artwork-Driven Background — Dominant Colour Tints Ambient
**Verdict: [CONSIDER] — see #74, same principle applied to ambient glow**

**What it is:** The artist's current release artwork drives the colour of the background ambient glow. If the artwork is predominantly blue, the glow shifts blue. If warm, the glow warms. The `--color-accent` (artist's chosen colour) remains primary, but the ambient atmosphere responds to the artwork.

**ABLE thoughts:** This is the deeper version of #74. Spotify does this in the Now Playing view and it's one of the most beautiful things about the app. The technical approach: canvas sample the artwork (4×4 average), extract the dominant RGB, set `--color-ambient-rgb` to that value. The ambient glow then uses this colour at very low opacity (0.15). The artist's `--color-accent` still drives all interactive elements — CTAs, pills, active states. The artwork only influences the background atmosphere. This prevents the case where a cyan-accented artist has red artwork: CTAs stay cyan, but the background breathes red-warmth from the artwork. The two coexist. Technically achievable, moderately complex. Defer until Spotify integration is live and real artwork is loading.

---

## 89. Night Mode Ambient Shift — Subtle Blue-Shift After 9pm
**Verdict: [SKIP] — over-engineering without user control**

**What it is:** After 9pm local time, the ambient glow subtly shifts blue (cooler) to match the late-night energy of music consumption. The page "knows" what time it is and adjusts its atmosphere.

**ABLE thoughts:** This is clever but feels like the product designing for artists rather than letting artists design for fans. If an artist has deliberately chosen a warm amber accent, a time-based blue shift overrides their intent. The principle (from CLAUDE.md): the artist's page should reflect the artist's identity, not ABLE's ambient intelligence. Context-aware theming belongs at the fan dashboard level (fan.html), not on the artist's profile page. The artist's profile is their expression, not a responsive environment. Documented here to close the question: don't build time-based ambient shifts on the profile page.

---

## 90. Artist Name Text Shimmer — Gloss Pass on Load
**Verdict: [CONSIDER] — a one-time brand moment**

**What it is:** As the artist name loads (#47), a single gloss pass sweeps across the Barlow Condensed letters from left to right — a white highlight at 30% opacity that sweeps and fades. It happens once, on first load, and never repeats.

**Implementation:**
```css
.v3-artist-name {
  position: relative;
  overflow: hidden;
}
.v3-artist-name::after {
  content: '';
  position: absolute;
  top: 0; left: -100%; bottom: 0;
  width: 50%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: glossPass 600ms ease-out 400ms forwards; /* 400ms delay after name appears */
}
@keyframes glossPass {
  from { left: -100%; }
  to   { left: 200%; opacity: 0; }
}
```

**ABLE thoughts:** Stefan Sagmeister's principle (DESIGN_RESEARCH_2026, #3): the accent colour and the page should feel like they belong to that artist, not a template. The gloss pass is a moment of "unveiling" — the name arrives (#47) and then briefly catches light. It reinforces the editorial quality of the Barlow Condensed choice. The caveat: this only works on the Dark and Glass themes. On the Light theme, a white gloss pass on white text is invisible. On the Glass theme, it interacts beautifully with the blurred background. Use `@media (prefers-color-scheme: dark)` detection or check the `data-theme` attribute before applying.

---

## 91. Active Gig — Slow Warm Pulse in Background
**Verdict: [BUILD] — the ambient signature of gig mode**

**What it is:** In gig mode, the ambient background glow intensifies and its breathing cycle accelerates slightly (from 4 seconds to 2.5 seconds) and warms — shifting toward a brighter version of the accent colour. The page feels more urgent, more alive, without any content change.

**Trigger → Rule → Feedback:**
- Trigger: gig mode is active
- Rule: `--gig-pulse: 2.5s` overrides the default `4s` breathing cycle; glow opacity range shifts from `0.12–0.18` to `0.15–0.25`
- Feedback: the atmosphere of the page is subtly different in gig mode — more energy, more urgency

**ABLE thoughts:** This is ambient storytelling — the page's atmosphere communicates the artist's current situation without any text. An artist who's playing tonight has more energy, more urgency in their space. The faster, brighter glow is a spatial metaphor for that. Combined with the pulsing gig badge (#37), the "On Tonight" banner, and the ticket CTA, the gig state should feel unmistakably different from the default profile state even without reading a word. The ambient glow is the "room temperature" of the page. In profile mode: calm. In gig mode: warm and alert. Technical note: use CSS custom property override on `data-state="gig"` rather than a separate animation, to keep the animation system unified.

---

## 92. Pre-Release Countdown Urgency — Background Intensifies as Date Approaches
**Verdict: [CONSIDER] — atmospheric storytelling for pre-release**

**What it is:** The background intensity of the pre-release state gradually changes as the release date approaches. 14 days out: neutral amber glow. 3 days out: warmer, slightly brighter. Release day: maximum intensity — the page is at its most energised before switching to the live state.

**Trigger → Rule → Feedback:**
- Trigger: `daysUntilRelease` value decreases
- Rule: interpolate `--color-ambient` opacity from `0.12` (14 days) to `0.28` (0 days)
- Feedback: the page builds in atmospheric tension as the release approaches

**ABLE thoughts:** This is the kind of detail that makes artists feel like ABLE is genuinely responsive to their career moment. The page "knows" the release is imminent. But it requires the countdown timer to be running accurately and the ambient system to be calculating the release-proximity value. For Phase 1, the release date either generates a pre-release state or doesn't — the granular day-by-day intensification is a Phase 2 refinement. Document it as the intended end state; implement it when the countdown system is fully functional. The linear interpolation approach is clean: `intensity = 0.12 + (0.16 * (1 - daysRemaining / 14))`.

---

## 93. Glass Blur Depth — Deepens on Card Press
**Verdict: [BUILD] — on the Glass theme, the press state has a material quality**

**What it is:** On the Glass theme, when a card or panel is pressed, the `backdrop-filter: blur()` value subtly increases — the glass gets "thicker" under the finger. Release: returns to normal blur depth with spring ease.

**Trigger → Rule → Feedback:**
- Trigger: `pointerdown` on glass-theme card
- Rule: `backdrop-filter: blur(28px) → blur(36px)` on press; spring back on release
- Feedback: the glass feels like it has physical depth that responds to touch

**Implementation:**
```css
/* Glass theme only */
[data-theme="glass"] .v3-card {
  backdrop-filter: blur(28px) saturate(180%);
  transition: backdrop-filter 80ms ease-out;
}
[data-theme="glass"] .v3-card:active {
  backdrop-filter: blur(36px) saturate(200%);
}
```

**ABLE thoughts:** `backdrop-filter` transitions are expensive — they require the browser to re-render the composited glass layer on every frame. On a single card press (80ms), this is unlikely to cause visible frame drops. In a loop, it would. Since this is only triggered on press (not in an animation loop), it's acceptable. Jony Ive's principle (DESIGN_RESEARCH_2026, #2): materials communicate values. On the Glass theme, the physical behaviour of the glass under pressure is a material quality signal. The frosted glass "responds" to the fan's touch. This is one of ABLE's most premium details — worth the small complexity cost on a theme that's already expensive to render. Test on Glass theme only, guard behind `[data-theme="glass"]`.

---

## 94. Track Playing Indicator — Equaliser Animation in Platform Pill
**Verdict: [CONSIDER] — requires platform integration to be meaningful**

**What it is:** If an artist has integrated with Spotify's real-time "currently playing" API, a platform pill for Spotify would show a small animated equaliser (three bars pulsing at different heights) to indicate the track is currently playing on the artist's Spotify. The pill reads as "listening live."

**Implementation:**
```css
.equaliser {
  display: inline-flex; gap: 2px; align-items: flex-end;
  height: 12px;
}
.eq-bar {
  width: 3px;
  background: var(--color-accent);
  border-radius: 2px;
  animation: eqPulse var(--duration) ease-in-out infinite alternate;
}
.eq-bar:nth-child(1) { --duration: 0.4s; height: 6px; }
.eq-bar:nth-child(2) { --duration: 0.6s; height: 10px; }
.eq-bar:nth-child(3) { --duration: 0.5s; height: 8px; }
@keyframes eqPulse {
  to { height: calc(var(--h, 8px) * 0.4); }
}
```

**ABLE thoughts:** The equaliser animation is a music-world universal signifier — everyone from Spotify to YouTube uses it to indicate "something is playing." If ABLE eventually exposes real-time artist listening data (from Spotify for Artists API), this indicator turns a static platform link into a live status indicator. "The artist is listening to something right now" is an intimacy signal fans respond to. However: this requires Spotify API integration that isn't built yet. Without real data, showing a "playing" indicator that isn't based on truth is a dark pattern. Document it as the intended end state when API integration is live. Don't show the equaliser based on fabricated data.
