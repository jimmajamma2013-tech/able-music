# ABLE — Showcase Mode: Visual & Interaction Layer
**Created:** 2026-03-14
**Status:** ACTIVE — addendum to SHOWCASE_CAMPAIGN_MODE_SPEC.md

This document defines the motion design, loading behaviour, micro-interactions, and performance model for Showcase Mode. It is a companion to the core spec and does not repeat product decisions already made there.

---

## Design Principle

Showcase Mode is the most deliberate surface on ABLE. An artist sends a showcase link to a journalist, a festival booker, or a label A&R — someone whose time is valuable and whose impression forms in the first ten seconds. The interaction layer must honour that context.

**Premium. Editorial. Unhurried.**

Not flashy. Not demonstrative. The motion should feel like turning a page in a beautiful magazine — inevitable, confident, silent. Every animation has a job. If it doesn't serve the content, it does not exist.

---

## 1. Page Entry — Progressive Reveal

When a showcase URL loads, sections reveal from top to bottom as a choreographed sequence — not all at once, not on scroll (that feels choppy on a first-impression surface).

### Timing sequence (DOM ready → visible)

| Element | Delay | Duration | Easing |
|---|---|---|---|
| Top card (Showcase Object) | 0ms | 600ms | deceleration `cubic-bezier(0.25,0.46,0.45,0.94)` |
| Artist name + role chip | 80ms | 400ms | deceleration |
| Intro bio | 200ms | 350ms | deceleration |
| First content section | 360ms | 350ms | deceleration |
| Subsequent sections | staggered +80ms each | 300ms | deceleration |

Each element enters with: `opacity: 0 → 1` + `transform: translateY(12px) → translateY(0)`.

The Y-translate is kept intentionally small (12px, not the typical 24–32px used in marketing sites). Showcase Mode is not trying to be dramatic — it is trying to be immediate and credible.

### Top card reveal specifically

The Showcase Object (artwork, video, performance image) reveals last within the top card, after the structural chrome is already visible. This prevents a jarring content-pop:

1. Card background + shape appears at 0ms (instant, no animation — card is there)
2. Artwork/image fades in `0 → 1` over 500ms (blur-up, see §3)
3. Overlay text + CTA reveals at 200ms offset

---

## 2. Skeleton Loading States

Skeleton states are shown for two conditions:
- Network latency (artwork / video thumbnail not yet loaded)
- State transitions when the artist switches context in admin preview

### Skeleton system

All skeletons use the same pulse animation: `opacity: 0.06 → 0.15 → 0.06`, 1.8s ease-in-out, infinite. On light theme: `opacity: 0.05 → 0.10 → 0.05`.

**Top card skeleton:**
- Full-bleed rectangle, same aspect ratio as the actual card (3:4 portrait for artwork, 16:9 for video, 1:1 for performance photo)
- No shimmer bar — pulse only. Shimmer reads as loading spinner energy; we want quiet patience.
- Artist name shown as two stacked pill shapes (not placeholder text)

**Section skeleton (used while context switch resolves):**
- Section header: one 40% wide pill, 14px height
- Content rows: three stacked pills at 100%, 80%, 60% width. Height: 12px with 8px gap.
- Quote tiles: bordered rectangle, 80% width, 72px height

### Transition from skeleton → content

The skeleton does not slide away. It fades out at `opacity: 1 → 0` over 200ms, simultaneous with the content fading in at `opacity: 0 → 1` over 300ms. The crossfade overlap (100ms) ensures there is no white flash between states.

**Never show:**
- Spinner icons (too technical)
- Progress bars (implies duration knowledge we don't have)
- "Loading…" text (breaks the editorial register)

---

## 3. Image Handling — Blur-Up

All images in Showcase Mode use the blur-up loading pattern. This is especially important for the Showcase Object, which occupies full-bleed above the fold.

**Implementation:**

1. A tiny (20px wide) version of the image is inlined as a base64 `src` on `<img>` or as a CSS background
2. A `filter: blur(20px) scale(1.05)` is applied to prevent edge halos
3. The full image is loaded with `loading="lazy"` on all below-fold images, `loading="eager"` on the top card
4. On full-image load, transition: `filter: blur(20px) → blur(0)` over 400ms, deceleration easing
5. The scale(1.05) on the blur state snaps back: `scale(1.05) → scale(1)` synchronously with the blur clear

If no low-res placeholder is available, the image container shows the card skeleton (§2) until load completes.

### Lazy loading scope

| Element | Loading strategy |
|---|---|
| Showcase Object (top card) | `loading="eager"` — above fold, load immediately |
| Artist photo in credits section | `loading="lazy"` — defer until near viewport |
| Press shot thumbnails (downloadable assets section) | `loading="lazy"` |
| Past shows section (no images) | N/A |
| Collaborator avatars | `loading="lazy"`, 40px circle — small enough to load fast anyway |

Video embeds (YouTube, Vimeo) are **not loaded until the user taps the thumbnail**. An `<img>` thumbnail from the embed provider is shown first. On tap: the `<iframe>` is injected. This prevents each YouTube embed from adding ~500KB to the page load.

---

## 4. Top Card — Context Transition

When the artist switches context in admin preview (Release → Booking → Press), the top card transitions to reflect the new Showcase Object.

**Transition:**

1. Current Showcase Object: `opacity: 1 → 0` over 200ms, `scale(1) → scale(0.97)`
2. New Showcase Object: `opacity: 0 → 1` over 350ms, `scale(0.97) → scale(1)`
3. Overlap: new content starts entering at the 150ms mark (while old is still fading)

The card container height animates smoothly if the new Showcase Object has a different aspect ratio — using `height` with the deceleration easing, 300ms.

Supporting content below the top card (bio, sections) does not animate on context switch — only the top card changes. The page does not scroll during the transition.

**Admin preview: section reordering**

When the context changes, sections animate out and in with a simple crossfade, not a slide reorder. Reordering elements with motion is disorienting. Show → hide → rearrange → show is the correct sequence, at the DOM level, with fade timing applied:
- Each removed section: `opacity: 1 → 0`, 150ms
- After 150ms: DOM reorder
- Each new section: `opacity: 0 → 1`, 200ms, staggered +50ms per section

---

## 5. Card and Section Micro-Interactions

### Press quote tiles

Press quotes are shown as bordered tiles. On hover (desktop):
- Border: `rgba(255,255,255,0.12) → rgba(255,255,255,0.24)` over 180ms
- No transform — quotes are text, not clickable cards
- Attribution text: slight opacity increase `0.6 → 0.8`

On light theme: border `rgba(0,0,0,0.10) → rgba(0,0,0,0.20)`.

### Showcase Object (top card) — artwork/photo

On hover (desktop only, not touch):
- Subtle brightness increase: `filter: brightness(1) → brightness(1.03)` over 200ms
- No scale — the card is full-bleed, scaling it looks wrong
- If type is `video`: a play icon fades in at the centre, `opacity: 0 → 0.9` over 150ms

### Downloadable asset rows (Press context)

Each row is a horizontal strip: label + file type chip + download icon.

On hover:
- Row background: `transparent → rgba(255,255,255,0.05)` over 150ms
- Download icon: `translateX(0) → translateX(2px)` over 150ms (small right nudge — reads as "pull")
- No underline, no colour change on the label text

On tap/click:
- Row background: flash to `rgba(255,255,255,0.12)` for 120ms, then fade back

### Credits chain (collaborator list)

Each credit row has an avatar + name + role. If the credit links to an ABLE profile, the row is tappable.

On hover (linked rows only):
- Row background: `transparent → rgba(255,255,255,0.05)`
- Name text: accent colour transition, 180ms

On tap:
- Row: scale `1 → 0.98` for 100ms (micro-press feedback), then back to 1 before navigation

### Tour date rows (Booking context)

Tour dates are read-only reference rows. On hover:
- Row background: `transparent → rgba(255,255,255,0.04)` — barely perceptible
- No interaction beyond this — they're not CTAs

### World Map integration (within showcase)

When the World Map section appears in a Release or Booking showcase, it uses the same month grid from the main profile. However:
- The section only shows if there are moments within 60 days
- The month title and grid animate in with the section's reveal timing (part of the stagger sequence, not separate)
- Calendar dot hover states are identical to the main profile (type-coloured dot pulses subtly on hover)

---

## 6. CTA Behaviour

### Primary CTA (varies by context)

The primary CTA in Showcase Mode is always the most important action for the context — stream, book, or enquire. It inherits the same button interaction model as the main profile:

- Rest: fill with `--color-accent` (artist's accent)
- Hover: brightness(1.08), 150ms
- Active/press: scale(0.97), 80ms, then spring back scale(0.97→1.02→1), 200ms total
- After tap: a brief radial ripple from the tap point, 300ms, `rgba(255,255,255,0.15)`, `border-radius: 50%` expanding outward

### Secondary CTA (ghost style)

- Rest: `border: 1.5px solid rgba(255,255,255,0.25)`, transparent fill
- Hover: fill `rgba(255,255,255,0.07)`, 150ms
- Active: fill `rgba(255,255,255,0.14)`, 80ms

### Booking enquiry / contact CTA (all contexts)

The contact action appears at the bottom of all showcase contexts. It is styled as a text link, not a button:
- Rest: accent colour, no underline
- Hover: underline `text-decoration: underline`, 0ms (instant — this is a link)
- The underline appears at full opacity — no fade. Links should feel like links.

---

## 7. Token-gated State (Private Showcase)

When a visitor arrives at a private token link (`/showcase?t=[token]`), the showcase loads normally — no special treatment of the private state. There is no "private" label shown to the recipient. From their perspective, they received a link and it worked.

The artist sees a "Private" badge in admin, but the recipient sees nothing. The deliberate invisibility of the token gate is the design intent — it respects the recipient's experience over the admin's status signalling.

If the token has been regenerated (link is now invalid), the visitor sees:

**Error state:**
- Dark overlay on the top card area (no content shown)
- One line of text, centred: *"This link is no longer active. Contact [artist name] for an updated link."*
- Artist name is shown (taken from the `handle`/slug in the URL), but no profile content is exposed
- The error state has no animation — it is immediate and final

---

## 8. Share Card Generation — In-Admin UX

The share card preview in admin is the one place in Showcase Mode where we add a small flourish — because the artist is actively creating something to share, and it should feel like a moment.

**Card preview reveal:**
When the artist taps "Generate share card":
1. The admin section smoothly expands to reveal the card preview area: `max-height: 0 → 520px`, 350ms deceleration
2. The card fades in simultaneously: `opacity: 0 → 1`, 300ms, 80ms delay
3. The card enters with a very subtle scale: `scale(0.96) → scale(1)`, 350ms spring `cubic-bezier(0.34,1.56,0.64,1)`

**Background toggle (black / accent):**
A two-option toggle: dark / accent. On switch:
- The card background crossfades, `opacity: 0.5 → 1` over 200ms
- Text and overlay elements stay — only the background layer changes

**Download button:**
- Standard button treatment (same as primary CTA)
- On click: button briefly reads "Downloading…" for 800ms (or until the download starts), then returns to "Download PNG"
- No spinner — the label change is sufficient feedback

---

## 9. Mobile Performance Rules

Showcase Mode is likely to be opened on a mid-range Android phone tapped in a WhatsApp conversation. Performance is a design constraint, not an afterthought.

### What never runs on mobile

- `backdrop-filter` on any non-essential element (keeps compositing layers to a minimum)
- `filter: blur()` animations (GPU-expensive on mid-range devices) — blur-up resolves to static once loaded; no ongoing blur animations
- Parallax on the top card artwork (common in "premium" templates, expensive, not worth it)
- Box-shadow on cards that are animating position or opacity simultaneously

### Throttle rules (`prefers-reduced-motion` and performance)

| Trigger | Behaviour |
|---|---|
| `prefers-reduced-motion: reduce` | All `transform` and `opacity` transitions disabled except page entry fade (opacity only, 200ms max) |
| `prefers-reduced-motion: reduce` | Context switch transition: instant |
| `prefers-reduced-motion: reduce` | Share card reveal: instant |
| Slow network detected (experimental: `navigator.connection.effectiveType === '2g'`) | Blur-up disabled; images load normally without placeholder |
| Slow network | Video embed thumbnail replaced with plain-text link: "Watch on YouTube →" |

### Compositing budget

Maximum 3 simultaneous composited layers at any point during showcase load:
1. Top card image (hardware-composited for the blur-up transition)
2. Primary CTA button (composited for ripple)
3. Page scroll container

All other transitions use `opacity` and `transform` on non-composited elements where possible. The stagger sequence (§1) deliberately runs sequentially to avoid simultaneous compositing pressure.

### Image sizing

Showcase Object images are requested at 2x device pixel ratio, max width 800px. The 20px blur-up placeholder is inlined as SVG (not PNG base64) — typically 200–400 bytes vs. 1–4KB for base64 PNG.

---

## 10. Typography as Motion

In Showcase Mode, the most important "animation" is none at all — it is the hierarchy established by static typography. The interaction layer should reinforce this, not undercut it.

**Rules:**

- Artist name: never animated after initial page reveal. It is the anchor. It does not move.
- Section headers: no hover state, no underline, no pointer cursor (they are labels, not links)
- Bio copy: no hover state, max 280 chars (prose at this length reads in one breath)
- Press quote text: no hover effect on the text itself — only the tile border responds (§5)
- CTA label text: no separate text animation — the button's scale/brightness communicates the interaction

**On mobile, all hover states are suppressed.** No `:hover` styles activate on touch devices. Tap states use the active press model only (scale + ripple). This prevents sticky hover states on iOS that can make a page feel broken.

---

## 11. Accessibility in Motion

- All animations use `opacity` and `transform` only — no `width`, `height`, `top`, `left`, or `margin` animations (these trigger layout, which is inaccessible to some screen reader users and expensive for all users)
- Focus states are never animated away — a focused element keeps its focus ring regardless of any transition
- `aria-live="polite"` on the top card area: when the artist switches context in admin, a status update is announced to screen reader users: *"Showcase updated: Booking view"*
- Skeleton placeholders carry `aria-hidden="true"` — they are visual only, not part of the accessible document
- Error state (invalid token, §7) is tagged `role="alert"` — announced immediately on load

---

*This document is the visual/interaction authority for Showcase Mode. Implementation must reference both this document and SHOWCASE_CAMPAIGN_MODE_SPEC.md. Where this document conflicts with a general v6 motion rule, the more conservative behaviour wins — Showcase Mode defaults to restraint.*
