# 09 — Navigation & Wayfinding (95–100)

Six final interactions focused on helping fans and artists know where they are, how they got here, and how to get where they're going. These are the interactions that turn a collection of features into a coherent place.

---

## 95. Active Tab — Weighted Dot with Settled Feel
**Verdict: [BUILD] — the navigation system's resting expression**

**What it is:** The active tab dot indicator is not blinking, not animated when at rest. It sits below the selected tab with a settled, slightly weighted presence — slightly larger than a dot that's just arrived (post-spring animation), with a subtle inner glow in the accent colour.

**Implementation:**
```css
.tab-dot {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 0 2px rgba(var(--color-accent-rgb), 0.2); /* inner glow */
  transition: left 350ms cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 200ms var(--ease-standard);
}
/* When settled (after animation completes) */
.tab-dot.settled {
  box-shadow: 0 0 0 4px rgba(var(--color-accent-rgb), 0.12); /* slightly wider, softer */
}
```

**ABLE thoughts:** The tab dot's resting state communicates "you are here" without demanding attention. The inner glow is so subtle that it's barely perceptible on the Dark theme — but it creates a small halo of accent colour that, at the periphery of vision, tells the fan which section they're in. The "settled" class fires after the spring animation completes (via `transitionend` event). The visual difference between "just arrived" and "settled" is tiny but meaningful: it's like the dot has exhaled. This is the most invisible entry in the entire 100, but it makes the navigation feel intentional rather than mechanical.

---

## 96. Section Header Fade-In on Entry — Content-Aware Label Reveal
**Verdict: [BUILD] — pairs with #10 (sticky labels)**

**What it is:** When a section (Music, Events, Merch) first enters the viewport as the fan scrolls down, its section label ("Listen", "Shows", "Merch") doesn't just appear — it fades in from 0 opacity over 200ms. The transition from "no label" to "labelled section" marks the crossing into a new content zone.

**Trigger → Rule → Feedback:**
- Trigger: IntersectionObserver fires on the section container
- Rule: section label transitions from `opacity: 0` to `opacity: 1` over 200ms once the section enters viewport
- Feedback: the label arrives as the fan arrives at the section

**ABLE thoughts:** This is a companion to the sticky section header (#10) and the staggered entrance (#7). The fade-in on entry creates a moment of orientation: "you've entered the Music section." Combined with the sticky label (#10) that then follows the fan as they scroll through the section, the section identity is continuously reinforced. Without this, sections blur together on a long page — fans lose track of where they are. The NNGroup "trunk test" (DESIGN_RESEARCH_2026, #39) asks: "where am I?" The section label fade-in answers that question at the moment it becomes relevant.

---

## 97. Back Navigation Gesture Trail — Panel Exit Reveals Previous
**Verdict: [BUILD] — for panels using horizontal push navigation**

**What it is:** When a panel is dismissed via swipe-down (#25) or swipe-back, as the panel moves away, the content underneath it is revealed with a slight scale-up from 0.95 to 1.0 — as if the previous layer is "rising" to meet the returning user.

**Trigger → Rule → Feedback:**
- Trigger: panel dismiss gesture crosses threshold
- Rule: underlying content `transform: scale(0.95) → scale(1.0)` as the panel exits, with `--ease-decel`
- Feedback: the previous context "re-enters" the foreground — spatial memory is maintained

**Implementation:**
```js
function dismissPanel(panel) {
  panel.classList.add('closing');
  underlyingContent.style.transition = `transform 300ms var(--ease-decel)`;
  underlyingContent.style.transform = 'scale(1.0)';
  panel.addEventListener('transitionend', () => {
    panel.style.display = 'none';
  }, { once: true });
}
function openPanel(panel) {
  underlyingContent.style.transform = 'scale(0.95)';
  panel.classList.add('open');
}
```

**ABLE thoughts:** This is the iOS navigation pattern: when a new layer opens, the previous layer recedes (scale down). When the new layer closes, the previous layer returns (scale up). It creates a spatial mental model: content is layered, not replaced. Without this, opening and closing a panel feels like teleportation — there's no sense of where the panel "came from." The 0.95 scale on the underlying content is barely visible — it's a shadow at the periphery. But it makes the panel feel like it's floating above the profile rather than replacing it. Use this pattern for any panel that opens over the full artist profile page.

---

## 98. Deep Link State — Section Highlighted on Direct Arrival
**Verdict: [BUILD] — for when fans arrive at specific sections via URL hash**

**What it is:** If a fan arrives at `able.fm/artist#merch` (via a direct shared link), the page loads, scrolls to the Merch section, and briefly highlights it — a 1-second warm glow around the section that fades out. The fan knows they've arrived at exactly where they were sent.

**Trigger → Rule → Feedback:**
- Trigger: URL hash contains a valid section ID (`#music`, `#events`, `#merch`, `#support`)
- Rule: scroll to section, apply `.highlight` class (accent border/glow), remove after 1.5s
- Feedback: the section "waves" at the fan — "you're here, this is what was shared with you"

**Implementation:**
```js
window.addEventListener('load', () => {
  const hash = window.location.hash.slice(1);
  const section = document.getElementById(hash);
  if (section) {
    setTimeout(() => { // Allow entrance animations to complete first
      section.scrollIntoView({ behavior: 'smooth' });
      section.classList.add('hash-highlight');
      setTimeout(() => section.classList.remove('hash-highlight'), 1500);
    }, 400);
  }
});
```
```css
.hash-highlight {
  animation: hashPulse 1.5s ease-out forwards;
}
@keyframes hashPulse {
  0%   { box-shadow: inset 0 0 0 2px rgba(var(--color-accent-rgb), 0.5); }
  100% { box-shadow: inset 0 0 0 2px rgba(var(--color-accent-rgb), 0); }
}
```

**ABLE thoughts:** Artists will share direct links to specific sections. "Check out my new merch 👇" with a `#merch` link is a natural social media use case. Without the highlight, the fan arrives at the correct section but has no confirmation they're in the right place — they have to read the section header to orient themselves. The brief highlight is the "you're here" confirmation. The 400ms delay is important: it lets the entrance animations (staggered bloom, #46) complete before scrolling starts — so the fan isn't scrolled to a section that hasn't animated in yet.

---

## 99. Scroll-to-Top on Active Tab Re-Tap
**Verdict: [BUILD] — the standard for bottom-tab-bar apps**

**What it is:** If the fan taps the already-active tab (the one they're currently on), the page smoothly scrolls back to the top of that section. This is how Instagram, Twitter, and every major mobile app handles the "I want to go back to the start" intent.

**Trigger → Rule → Feedback:**
- Trigger: `click` on a tab item that is already the active tab
- Rule: smooth scroll to `scrollTop: 0` on the main scroll container
- Feedback: the page returns to its top position with `behavior: 'smooth'`

**Implementation:**
```js
tabItems.forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.classList.contains('active')) {
      // Re-tapped active tab: scroll to top
      shell.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // New tab: normal navigation
      navigateToTab(tab);
    }
  });
});
```

**ABLE thoughts:** This is free to implement and extremely valuable for fans who've scrolled to the bottom of the page and want to return to the top. The alternative — a "back to top" button — is visual clutter. The behaviour is discoverable via convention (users who know this pattern will try it; users who don't will use it accidentally and discover it). The smooth scroll speed should be calibrated: too fast feels teleported, too slow feels sluggish. `behavior: 'smooth'` uses the browser default which is generally well-calibrated. The tab bar icon bounce (#20) should NOT fire on a re-tap scroll-to-top — it would feel weird to see the icon bounce when you're staying on the same section.

---

## 100. Page Load State Restoration — Return Visitor Orientation
**Verdict: [CONSIDER] — requires session state management**

**What it is:** When a fan returns to the same artist's page (same session or across sessions via localStorage), the page "remembers" where they were. If they were on the Events section, the page loads to the top (standard behaviour) but briefly surfaces the Events tab with a subtle pulse — "welcome back, you were looking at Shows."

**Trigger → Rule → Feedback:**
- Trigger: page load, `sessionStorage` contains previous scroll position and active section
- Rule: restore scroll position silently; briefly highlight the previously-active section indicator in the tab bar
- Feedback: the fan has a sense of "I was here before" — continuity of experience

**ABLE thoughts:** This is the last entry in the 100 and it's deliberately ambitious. The NNGroup "Recognition vs Recall" principle (#47): returning fans shouldn't have to remember where they were — the page should offer that recognition for them. In practice, session restoration for a music fan visiting an artist profile is unusual — they typically come from a fresh link each time. The more valuable application is in the admin dashboard: an artist who was deep in the fan list section should return to the fan list, not the overview. Session state restoration belongs more in admin.html than in the public profile. For the public profile, standard scroll-to-top on load is correct. Document this pattern for admin.html's navigation system when it's built out.

---

## Summary: Build Priority Matrix

| # | Interaction | Priority | Complexity |
|---|---|---|---|
| 16 | Scale-down on press | **Must build** | Low |
| 17 | Spring-back release | **Must build** | Low |
| 31 | Tab sliding indicator | **Must build** | Medium |
| 7  | Scroll-triggered entrances | **Must build** | Medium |
| 46 | Staggered card bloom | **Must build** | Medium |
| 71 | Shimmer skeleton | **Must build** | Medium |
| 64 | Submit loading → checkmark | **Must build** | Medium |
| 79 | Fan signup confetti | **Must build** | Medium |
| 61 | Email focus glow | **Must build** | Low |
| 36 | Live state pulsing dot | **Must build** | Low |
| 32 | Campaign state crossfade | **Must build** | Medium |
| 99 | Scroll-to-top on re-tap | **Must build** | Low |
| 3  | Lazy image load | **Must build** | Low |
| 85 | Email shown back in confirm | **Must build** | Low |
| 47 | Hero name reveal | **Must build** | Low |
| 50 | Panel slide-up | **Must build** | Medium |
| 25 | Swipe-to-dismiss panels | **Build next** | High |
| 34 | Gig mode flash | **Build next** | Low |
| 35 | Countdown digit flip | **Build next** | High |
| 83 | Copy-link flash | **Build next** | Low |
