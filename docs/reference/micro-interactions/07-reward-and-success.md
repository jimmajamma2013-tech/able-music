# 07 — Reward & Success States (79–86)

These are the moments that matter most. The Peak-End Rule says users judge experiences by their peaks and their endings. Every interaction in this section is either a peak moment (fan signs up, purchase completes) or a closing beat that leaves the fan feeling good about what just happened.

---

## 79. Fan Sign-Up Confetti — The Burst on "Stay Close"
**Verdict: [BUILD] — ABLE's most visible moment of delight**

**What it is:** When a fan successfully submits the email capture form, a brief burst of particles — dots in the artist's accent colour and white — launches upward from the button and falls away. Duration: ~1.5 seconds. The particles are small (4–8px), numerous (30–50), and dissipate naturally.

**Trigger → Rule → Feedback:**
- Trigger: form submit success
- Rule: spawn particle elements at button position; animate with random velocity vectors upward, gravity pulls down, fade out over 1.5s
- Feedback: a moment of celebration that the fan has connected with the artist

**Implementation:**
```js
function burstConfetti(originEl) {
  const rect = originEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const accentRgb = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-accent-rgb').trim();

  for (let i = 0; i < 40; i++) {
    const dot = document.createElement('span');
    const angle = (Math.random() * 120 - 60) * (Math.PI / 180); // -60° to +60° upward
    const speed = Math.random() * 200 + 100;
    const vx = Math.sin(angle) * speed;
    const vy = -Math.cos(angle) * speed; // upward
    const size = Math.random() * 6 + 4;
    const colour = Math.random() > 0.5 ? `rgb(${accentRgb})` : '#ffffff';

    dot.style.cssText = `
      position: fixed;
      left: ${cx}px; top: ${cy}px;
      width: ${size}px; height: ${size}px;
      border-radius: 50%;
      background: ${colour};
      pointer-events: none;
      z-index: 1000;
    `;
    document.body.appendChild(dot);

    dot.animate([
      { transform: `translate(0, 0)`, opacity: 1 },
      { transform: `translate(${vx}px, ${vy + 80}px)`, opacity: 0 } // gravity adds +80px
    ], {
      duration: 1200 + Math.random() * 400,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      fill: 'forwards'
    }).finished.then(() => dot.remove());
  }
}
```

**ABLE thoughts:** Peak-end rule (DESIGN_RESEARCH_2026, #57): the fan sign-up is the single most important conversion event on the profile page. The moment the fan connects their email to an artist they care about should feel celebratory — not clinically confirmed. The confetti is in the artist's accent colour: a folk artist's warm ochre particles feel different from an electronic artist's cyan particles. This is correct — the celebration is artist-specific. Guard with `prefers-reduced-motion`: skip confetti entirely and just show the success state (#80 / #66). The confetti should also respect the viewport — particles that travel off-screen are fine, particles that cause horizontal scroll are not.

---

## 80. CTA Success Ripple — Fan Taps and the Page Acknowledges
**Verdict: [BUILD] — for every successful CTA tap that navigates away**

**What it is:** When a fan taps a platform link (Spotify, Apple Music) and successfully navigates to the platform, a ripple briefly expands from the tapped element before the navigation completes. The ripple communicates "this tap registered and is being acted upon."

**Trigger → Rule → Feedback:**
- Trigger: `click` on a platform pill or CTA link (before navigation)
- Rule: ripple animation fires immediately; navigation is deferred by 150ms to let the ripple be visible
- Feedback: the tap is visually acknowledged before the user leaves the page

**ABLE thoughts:** Navigation taps are the most common interaction on the profile page. Most fans don't sign up — they tap Spotify and go listen. The immediate visual feedback (#16) covers the press state. But for navigation taps specifically, there's a gap between "I pressed this" and "the page is navigating" — especially on slower connections where the new tab takes a moment to open. The ripple fills that gap. Defer navigation by 150ms: `setTimeout(() => window.open(url), 150)` — long enough to see the feedback, short enough that the fan doesn't notice the delay. Only apply this deferral on tap/click — if the user opens via context menu, don't interfere.

---

## 81. Fan Count Increment — Dashboard Counter Ticks Up
**Verdict: [BUILD] — the metric that makes admin.html feel worth opening**

**What it is:** When the dashboard fan count increments (new sign-up received), the number briefly scales up to 1.1, the digit changes with a brief flip animation, and the number returns to 1.0. The counter feels like a live scoreboard, not a static database query.

**Trigger → Rule → Feedback:**
- Trigger: new fan sign-up event (real-time via localStorage listener or WebSocket in future)
- Rule: scale-up (100ms), digit change with flip (#35 technique), scale-down (200ms spring)
- Feedback: the number "reacts" to the new fan — it feels alive

**Implementation:**
```js
function incrementCounter(el, currentValue) {
  el.style.transform = 'scale(1.1)';
  el.style.transition = 'transform 100ms ease-out';
  setTimeout(() => {
    el.textContent = currentValue + 1;
    el.style.transform = 'scale(1.0)';
    el.style.transition = 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)';
  }, 100);
}
```

**ABLE thoughts:** The master plan (section 10, monetisation) identifies the "87 fans — upgrade to keep capturing" moment as the primary conversion trigger for the paid tier. The fan counter is the metric that drives this realisation. An artist who watches their counter tick up in real-time (even if just via localStorage-driven updates) is motivated in a way that a static "87 fans" label is not. The live feeling of the counter is the reason to keep the dashboard open. Eventually, with Supabase real-time subscriptions, this becomes genuinely live. Until then, poll localStorage every 5 seconds and increment if a new entry has appeared.

---

## 82. Support Pack Purchase Celebration — Glow and Checkmark
**Verdict: [BUILD] — the purchase completion moment**

**What it is:** When a fan completes a support pack purchase (via Stripe or a payment link), the support section shows a brief celebration state: the purchased tier card gains a full accent glow, a checkmark icon animates in, and a warm confirmation message appears below.

**Trigger → Rule → Feedback:**
- Trigger: Stripe success callback / return URL with `?success=true`
- Rule: highlight the purchased tier card with glow, animate checkmark in, show confirmation text
- Feedback: "You're supporting [Artist Name] at the [Tier] level" — specific and warm

**ABLE thoughts:** The master plan is clear: "The fan email list should feel, from the fan's side, like a private channel between them and the artist." A support pack purchase is an even more intimate act — the fan is saying "I believe in you with money." The celebration should feel proportionate to that. Not a confetti burst (that's for sign-ups) — something warmer and more settled. The glow that stays on the purchased tier card is permanent (or for the session) — a visible reminder of the commitment made. The confirmation copy is critical: "You're supporting [Name] at [Tier]" is direct and relational. "Payment successful" is transactional and cold.

---

## 83. Copy-Link Flash — Success on URL Copy
**Verdict: [BUILD] — tiny but ubiquitous**

**What it is:** When an artist copies their ABLE URL from admin.html (or when a fan copies a share link), the input field or button briefly flashes with a success colour and the label changes from "Copy link" to "Copied!" for 2 seconds.

**Trigger → Rule → Feedback:**
- Trigger: Clipboard API `writeText()` success
- Rule: button background transitions to `rgba(accent, 0.15)`, label changes, resets after 2000ms
- Feedback: "it's in your clipboard" is confirmed without leaving the page

**Implementation:**
```js
async function copyLink(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
    const original = btn.textContent;
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('copied');
    }, 2000);
  } catch (err) {
    btn.textContent = 'Copy failed — try again';
  }
}
```

**ABLE thoughts:** This is the most-used admin interaction for active artists. Every time they share their ABLE link in an Instagram story, a tweet, or a WhatsApp message, they copy it from admin.html. The copy feedback is therefore the most frequently seen "success" state in the entire product. It must be immediate and clear. The 2-second reset is correct — long enough to register, short enough that they can copy again if they need to. Show the artist's shortened ABLE URL (`able.fm/artistname`) not the full URL — seeing their identity in that format is a brand moment every time.

---

## 84. Pre-Save Confirmation Burst — Stars on Pre-Save
**Verdict: [BUILD] — the pre-release peak moment**

**What it is:** When a fan taps "Pre-save" and the save is confirmed from the DSP, a star burst animation radiates from the button — 6–8 small star/sparkle shapes that expand outward and fade. More contained than the confetti burst (#79), but equally celebratory.

**Trigger → Rule → Feedback:**
- Trigger: pre-save DSP API confirmation
- Rule: 8 star elements animate outward from the button center in a radial pattern (45° apart)
- Feedback: "you've pre-saved this release — you're part of the launch" feeling

**Implementation:**
```css
@keyframes starBurst {
  0%   { transform: translate(0, 0) scale(0); opacity: 1; }
  60%  { opacity: 1; }
  100% { transform: translate(var(--dx), var(--dy)) scale(1); opacity: 0; }
}
.star-particle {
  position: absolute;
  width: 8px; height: 8px;
  background: var(--color-accent);
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  animation: starBurst 700ms var(--ease-decel) forwards;
}
```

**ABLE thoughts:** The pre-release state is the most emotionally charged campaign state — the artist is waiting for their release, fans are building anticipation. The pre-save moment is when a fan says "I'm going to be there for launch day." That deserves acknowledgement. Stars are the right metaphor: the artist is about to release something into the world. The burst is contained (elements travel ~40px from the button, not across the screen) because the pre-save is a quiet, personal commitment, not a public celebration. Use `prefers-reduced-motion` fallback: no burst, just the button morphing to a "Saved ✓" state.

---

## 85. Email Confirmation Shows Their Email Back
**Verdict: [BUILD] — Recognition over Recall (NNGroup #47)**

**What it is:** After the fan capture form submits successfully, the confirmation message shows the fan's email back to them: "We've got you — [email@example.com] is on [Artist Name]'s list." The email is displayed in a slightly highlighted span (accent colour, low opacity background).

**Implementation:**
```js
function showConfirmation(email, artistName) {
  fanCaptureSection.innerHTML = `
    <p class="confirm-text">
      We've got you —
      <span class="confirm-email">${sanitizeEmail(email)}</span>
      is on ${artistName}'s list.
    </p>
    <p class="confirm-sub">I'll reach out when something's actually happening.</p>
  `;
}
```
```css
.confirm-email {
  background: rgba(var(--color-accent-rgb), 0.12);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--color-accent);
}
```

**ABLE thoughts:** This is the copy philosophy and the NNGroup recognition principle working in concert. Showing the email back does two things: (1) confirms accuracy — the fan can verify what was captured; (2) creates a personalised moment — "We've got you" is warm, and seeing their own email highlighted in the artist's accent colour makes it feel like a receipt from a person, not a system. The second line — "I'll reach out when something's actually happening" — is the artist's voice promising no spam. This is the most important post-conversion copy in the product.

---

## 86. Snap Card Publish Animation — Card Flips Into Grid
**Verdict: [CONSIDER] — admin.html, satisfying but complex**

**What it is:** When an artist publishes a new snap card from admin.html, it doesn't just appear in the snap cards grid. It "flips" into place: the card starts face-down (showing the card back, in the accent colour), rotates 180° to reveal the content, then settles into the grid. Duration: 500ms.

**Trigger → Rule → Feedback:**
- Trigger: snap card publish button press, after save confirms
- Rule: new card placed in grid at `rotateY(180deg)`, transitions to `rotateY(0)` with spring
- Feedback: the new card reveals itself with a physical reveal — like turning over a playing card

**Implementation:**
```css
.snap-card-new {
  transform: rotateY(180deg);
  backface-visibility: hidden;
  transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.snap-card-new.revealed {
  transform: rotateY(0deg);
}
```

**ABLE thoughts:** This is genuinely satisfying but adds meaningful CSS complexity (3D transform context, backface-visibility, perspective on the grid container). The flip metaphor is relevant: snap cards are the artist's "cards to play" — each one is a moment of communication. The reveal has narrative weight. However, the complexity cost is high for what's essentially a one-time-per-card interaction. Start with a simpler entrance (scale from 0 + fade in, as in #54) and upgrade to the flip if the snap card UI becomes a core daily-use feature that artists interact with frequently enough to appreciate the animation.
