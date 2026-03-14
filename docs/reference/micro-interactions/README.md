# ABLE Micro-Interactions Reference
**Created: 2026-03-13 | Purpose: Research library for ABLE's interaction design vocabulary**

This folder documents 100 micro-interactions — small, specific moments of UI behaviour — organised by category. Not all will be implemented. This is a vocabulary to draw from, with honest notes on whether each one earns its place in ABLE specifically.

---

## How to use this document

Each entry covers:
- **What it is** — a clear description of the behaviour
- **Trigger → Rule → Feedback** — the NNGroup micro-interaction anatomy
- **Implementation notes** — CSS/JS hints at the level of specificity you'd need to build it
- **ABLE verdict** — should we build this? Why or why not? Priority if yes.

Entries marked **[BUILD]** are strongly recommended.
Entries marked **[CONSIDER]** need a conversation first.
Entries marked **[SKIP]** are documented for completeness but not suited to ABLE.

---

## Categories

| File | Coverage |
|---|---|
| [01-scroll-and-momentum.md](01-scroll-and-momentum.md) | 1–15: Scroll snap, lazy load, parallax, sticky, overscroll |
| [02-touch-and-tap.md](02-touch-and-tap.md) | 16–30: Press states, ripple, swipe, drag, long-press |
| [03-state-transitions.md](03-state-transitions.md) | 31–45: Campaign states, tab switches, theme changes |
| [04-entrance-and-exit.md](04-entrance-and-exit.md) | 46–60: Staggered bloom, panel slide-up, hero reveal |
| [05-form-and-input.md](05-form-and-input.md) | 61–70: Focus, float label, submit states, validation |
| [06-loading-and-skeleton.md](06-loading-and-skeleton.md) | 71–78: Shimmer, skeleton, progressive image, optimistic UI |
| [07-reward-and-success.md](07-reward-and-success.md) | 79–86: Fan signup, confetti, purchase celebration |
| [08-ambient-and-passive.md](08-ambient-and-passive.md) | 87–94: Glow breathing, artwork-driven colour, night shift |
| [09-navigation-and-wayfinding.md](09-navigation-and-wayfinding.md) | 95–100: Active tab, scroll-to-top, deep link |

---

## Design principles behind these choices

All micro-interactions in ABLE should pass this test (adapted from Tobias Ahlin + NNGroup):

1. **It serves the content, not the designer.** If removing it makes the page feel less alive but the user would never notice it being gone, it shouldn't be there.
2. **It communicates state.** The best micro-interactions carry information — "this tapped", "this loaded", "you succeeded", "this is currently live."
3. **It must work on mid-range Android.** 60fps requirement means nothing that animates `box-shadow`, `width`, `height`, or `filter` in a loop. Only `opacity`, `transform`, and `will-change: transform` in loops.
4. **It fits the emotional register of ABLE.** Premium but not showy. Alive but not hyperactive. A folk artist's page and an electronic artist's page should feel like different implementations of the same calm confidence.

---

## The 4 easing curves for ABLE

These four curves should cover every animation in the system:

```css
/* Spring: bouncy entrance, popup elements, CTAs popping into view */
--ease-spring:       cubic-bezier(0.34, 1.56, 0.64, 1);

/* Deceleration: content sliding in, panels rising, cards entering */
--ease-decel:        cubic-bezier(0.25, 0.46, 0.45, 0.94);

/* Acceleration: elements exiting, dismissals */
--ease-accel:        cubic-bezier(0.55, 0, 1, 0.45);

/* Standard: state changes, opacity transitions, colour shifts */
--ease-standard:     cubic-bezier(0.4, 0.0, 0.2, 1.0);
```
