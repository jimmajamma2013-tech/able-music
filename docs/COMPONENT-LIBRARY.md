# ABLE — Component Library
**Created: 2026-03-16 | Purpose: prevent component drift across files.**

This document specifies all reusable UI components that appear across two or more ABLE pages. When implementing a component in a new file, match this spec exactly. Do not invent a new implementation of an existing component.

**Two surfaces, two sets of tokens:**
- Surface 1 (able-v7.html, start.html, landing.html, fan.html): dark navy, DM Sans body, `--color-accent` artist-controlled
- Surface 2 (admin.html): near-black `#09090f`, Plus Jakarta Sans body, amber `--acc: #f4b942`

Components listed below note which surface(s) they appear on.

---

## 1. Bottom Sheet

**What it is:** A modal panel that slides up from the bottom of the screen. Used for secondary editing and detail views. The main content behind it scales down and dims.

**Used in:** able-v7.html (edit mode panels — top card, fan sign-up, CTAs, links, music, shows), admin.html (fan detail, add show, add snap card)

**Surface:** Both

### able-v7.html implementation

**JS functions:**
```javascript
openSheet(icon, title, bodyHTML, onSave)  // opens with injected content
closeSheet()                               // closes + fires onSave callback
```

**HTML structure:**
```html
<!-- Backdrop -->
<div id="bsBackdrop" class="bs-backdrop" hidden aria-hidden="true"></div>

<!-- Sheet -->
<div id="bottomSheet" class="bottom-sheet" role="dialog"
     aria-modal="true" aria-labelledby="bsTitle" hidden>
  <div class="bs-handle" aria-hidden="true"></div>
  <div class="bs-header">
    <span class="bs-icon" id="bsIcon" aria-hidden="true"></span>
    <h2 class="bs-title" id="bsTitle"></h2>
    <button class="bs-close pressable" id="bsClose" aria-label="Close">✕</button>
  </div>
  <div class="bs-body" id="bsBody"></div>
  <div class="bs-footer">
    <button class="bs-cancel pressable" id="bsCancel">Cancel</button>
    <button class="bs-save btn-primary pressable" id="bsSave">Save</button>
  </div>
</div>
```

### admin.html implementation

**JS functions:**
```javascript
openAdminSheet(icon, title, bodyHTML)  // opens; no onSave callback (admin uses its own save logic)
closeAdminSheet()                       // closes
```

**HTML structure:**
```html
<div id="adminSheetBackdrop" hidden></div>
<div id="adminSheet" class="admin-sheet" hidden>
  <div class="sheet-handle"></div>
  <div class="sheet-header">
    <span id="adminSheetIcon"></span>
    <span id="adminSheetTitle"></span>
    <button onclick="closeAdminSheet()">✕</button>
  </div>
  <div id="adminSheetBody" class="sheet-body"></div>
</div>
```

### Animation
- Entry: `translateY(100%) → translateY(0)`, `var(--ease-spring)`, 350ms
- Exit: `translateY(0) → translateY(100%)`, `var(--ease-accel)`, 250ms (always faster than entry)
- Backdrop: `opacity: 0 → 0.55`, `var(--ease-standard)`, 250ms

### Accessibility
- `role="dialog"` and `aria-modal="true"` on the sheet container
- `aria-labelledby` pointing to the title element
- Escape key closes the sheet: `document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet() })`
- Android back gesture: `history.pushState({panel: 'sheet'}, '')` on open; `window.addEventListener('popstate', closeSheet)` handles back gesture
- Swipe-to-dismiss: track `touchstart` → `touchend` delta; if deltaY > 60px, call closeSheet() (B9)
- Return focus to the trigger element on close

---

## 2. Toast Notification

**What it is:** A short status message that appears at the bottom of the screen for ~2.2 seconds, then auto-dismisses. One message at a time.

**Used in:** admin.html (save confirmations, copy confirmations, error notices)

**Surface:** Surface 2 (admin.html)

**JS function:**
```javascript
showToast(msg)   // msg: short string, e.g. "Saved." or "Link copied."
```

**HTML:**
```html
<div id="adminToast" class="admin-toast" role="status" aria-live="polite"></div>
```

**CSS class:** `.admin-toast` — positioned fixed bottom-center, `opacity: 0` at rest. Class `.show` added by JS sets `opacity: 1`.

**Animation:**
- Show: `opacity: 0 → 1`, 150ms
- Auto-hide after 2200ms: class `.show` removed, `opacity: 1 → 0`, 150ms

**Copy rules (from `docs/systems/copy/SPEC.md` §2.5):**
- "Saved." for any profile/content save
- "Copied." for any copy-to-clipboard action
- "Show added." / "Show removed." for shows
- Never: "Successfully saved!", "Your changes have been saved", "Done!"
- Maximum 4 words. Past tense. Period.

**Accessibility:**
- `role="status"` and `aria-live="polite"` so screen readers announce it without interrupting
- `aria-atomic="true"` ensures the full message is announced when it updates

---

## 3. Accent Pill / Tag

**What it is:** A small inline label used to indicate page state, tier, content type, or status. Rounded pill shape.

**Used in:** able-v7.html (state chip: "Pre-release", "Out now", "On tonight"), admin.html (tier badge, source badge on fan list), landing.html (pricing tier labels)

**Surface:** Both (token colours differ per surface)

**CSS classes:**
```
.state-chip              — hero zone, campaign state indicator
.state-chip--pre         — pre-release state (amber, #fbbf24)
.state-chip--live        — live state (red, #ef4444)
.state-chip--gig         — gig state (deep red, #8b1e1e) — gig only, nowhere else
.tier-badge              — admin tier indicator
.source-badge            — fan list source label (instagram, tiktok, direct, etc.)
```

**HTML pattern (state chip):**
```html
<span class="state-chip state-chip--live" aria-label="Out now">Out now</span>
```

**Gig state special behaviour:** `.state-chip--gig` has a glow pulse animation (C7):
```css
.state-chip--gig::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: var(--r-pill);
  box-shadow: 0 0 16px rgba(139,30,30,0.6);
  opacity: 0;
  animation: badge-glow-pulse 2s ease-in-out infinite;
}
@keyframes badge-glow-pulse {
  0%, 100% { opacity: 0; }
  50%       { opacity: 1; }
}
```

**Accessibility:**
- Always provide `aria-label` if the pill contains only an icon or abbreviated text
- State changes must be announced: use `aria-live="polite"` on the parent container, or update via `aria-label` attribute

---

## 4. Primary Button

**What it is:** The main action button. Full-width in mobile context. Accent fill. Used for Hero CTAs and primary form submits.

**Used in:** able-v7.html (Hero CTA, fan sign-up submit), start.html (wizard step CTAs), landing.html (hero CTA)

**Surface:** Surface 1

**CSS class:** `.btn-primary` (alias: `.hero-cta--primary` on hero CTAs — applied alongside `.btn-primary` by JS, adds no extra style)

**HTML pattern:**
```html
<a class="btn-primary pressable" href="https://..." role="button">Listen on Spotify</a>
<!-- or as a button -->
<button class="btn-primary pressable" type="submit">I'm in</button>
```

**Key CSS properties:**
- `min-height: 56px` — non-negotiable tap target
- `width: 100%` — full width in mobile context
- `background-color: var(--color-accent)` — artist-controlled
- `border-radius: var(--r-sm)` — NOT `--r-pill`. Small radius signals premium. Pills are for Quick Action links only.
- `font-size: var(--text-base)` / `font-weight: 700` / `text-transform: uppercase` / `letter-spacing: 0.04em`

**Glow (always present, dims at rest):**
```css
.btn-primary::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: var(--r-sm);
  box-shadow: 0 8px 40px var(--color-accent-glow);
  opacity: 0.45;                         /* rest state */
  transition: opacity var(--dur-fast) var(--ease-standard);
}
.btn-primary:hover::after { opacity: 1; }
```

**Press state (B3 + B4):** JS adds class `.pressing` on `pointerdown`, removes on `pointerup`/`pointercancel`:
```css
.btn-primary.pressing {
  background: color-mix(in srgb, var(--color-accent) 80%, white 20%);
  transform: scale(0.97);
}
.btn-primary.pressing::after { opacity: 1; }
```

**Accessibility:**
- `aria-label` when the button label alone is ambiguous
- `:focus-visible` must show the glow ring (not just the ::after shadow — add a distinct focus indicator)
- Minimum 44×44px touch target (56px height satisfies this)
- `touch-action: manipulation` on `.pressable` (eliminates 300ms tap delay)

---

## 5. Ghost / Secondary Button

**What it is:** A subordinate action button. Outline only, no fill. Clearly quieter than the primary CTA.

**Used in:** able-v7.html (Hero secondary CTA), start.html (back/skip actions), landing.html (secondary hero CTA)

**Surface:** Surface 1

**CSS class:** `.btn-secondary` (alias: `.hero-cta--secondary` on hero — applied alongside `.btn-secondary`, adds no extra style)

**HTML pattern:**
```html
<a class="btn-secondary pressable" href="https://...">Pre-save</a>
```

**Key CSS properties:**
- `min-height: 56px`
- `width: 100%`
- `background: transparent`
- `border: 1px solid rgba(255,255,255,0.28)` — dark theme default
- `border-radius: var(--r-sm)` — same as primary, same vibe
- `font-size: var(--text-xs)` / `font-weight: 600` / `text-transform: uppercase` / `letter-spacing: 0.08em`
- Text color: `var(--color-text-2)` at rest

**Hover state:**
```css
.btn-secondary:hover {
  border-color: rgba(var(--color-accent-rgb), 0.5);
  color: var(--color-text);
}
```

**Theme variants:**
- Light: `border-color: rgba(0,0,0,0.20)`
- Contrast: `border-color: rgba(255,255,255,0.2)`
- Glass: `border-color: rgba(255,255,255,0.15)` + `backdrop-filter: blur(8px)`

**Press state:** Same `scale(0.97)` `.pressing` class as primary button.

**Accessibility:** Same requirements as primary button.

---

## 6. Section Header

**What it is:** The heading row at the top of each main content section. Always contains a section title. Optionally contains a right-side action link.

**Used in:** able-v7.html (Music, Shows, Snap Cards, Merch, Support, Recommendations sections)

**Surface:** Surface 1

**CSS classes:**
```
.section-header              — primary header (with accent border-top)
.section-header--secondary   — secondary header (quieter, less visual weight)
.section-title               — the heading text (Barlow Condensed, large)
.section-action              — the right-side link
```

**HTML pattern:**
```html
<header class="section-header">
  <h2 class="section-title">My music</h2>
  <a class="section-action pressable" href="#">See all →</a>
</header>
```

**Primary header CSS (key properties):**
```css
.section-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-top: var(--sp-5);
  border-top: 1px solid rgba(var(--color-accent-rgb), 0.38);  /* accent rule above */
  margin-bottom: var(--sp-6);
}
.section-title {
  font-family: var(--font-d);
  font-size: clamp(32px, 9vw, var(--text-4xl));
  font-weight: var(--font-d-weight);
  text-transform: var(--font-d-transform);
}
.section-action {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
```

**Secondary variant:** Used for Support, Recommendations. Quieter border, smaller title, reduced opacity.

**Scroll animation (I2):** Section headers fade in when they enter the viewport. Use `IntersectionObserver` with `threshold: 0.3`. Apply `opacity: 0 → 1` + `translateY(8px → 0)` over 300ms decel.

**Accessibility:**
- Section headers must use heading elements (`<h2>`) not `<div>` — they are navigation landmarks
- The `section-action` link must have descriptive `aria-label` if label text alone is ambiguous ("See all" → "See all shows")

---

## 7. Empty State

**What it is:** The state shown inside a section when there is no content, but the artist is in owner mode (logged in). Never shown to fans — sections with no content are hidden from fans entirely.

**Used in:** able-v7.html (music, shows, merch, snap cards, recommendations sections — owner mode only)

**Surface:** Surface 1

**CSS classes:**
```
.section-empty           — wrapper
.section-empty__circle   — emoji/icon in a circle
.section-empty__eyebrow  — "Only you can see this" (owner indicator)
.section-empty__headline — the action heading
.section-empty__sub      — supporting copy
.section-empty__action   — the CTA link
```

**HTML pattern:**
```html
<div class="section-empty">
  <div class="section-empty__circle" aria-hidden="true">🎵</div>
  <p class="section-empty__eyebrow">Only you can see this</p>
  <p class="section-empty__headline">Add your music.</p>
  <p class="section-empty__sub">Paste a Spotify, Apple Music, or SoundCloud link and it appears here instantly.</p>
  <a class="section-empty__action pressable" href="admin.html">Add music →</a>
</div>
```

**Copy rules (from `docs/systems/copy/SPEC.md` §2.5):**
- Eyebrow: "Only you can see this" — always this exact phrase for owner-visible empty states
- Headline: specific action. "Add your music." / "Add a show date." / "Add something."
- Sub: one sentence connecting the feature to its value. "When you add a show, the ticket button goes front and centre for every fan who visits."
- Action CTA: links to admin.html. "Add music →" / "Add a show →"

**Fan-facing rule:** Never render a section shell with placeholder content for fans. Empty sections are hidden via JS:
```javascript
function shouldRender(section, profile) {
  switch(section) {
    case 'music':  return profile.releases?.length > 0;
    case 'events': return profile.shows?.length > 0;
    case 'snap':   return profile.snapCards?.length > 0;
    case 'merch':  return profile.merch?.items?.length > 0;
    default: return true;
  }
}
```

**Accessibility:**
- The empty state container should have `aria-label` describing which section it belongs to
- The action link must be keyboard-reachable

---

## 8. Fan Sign-Up Form

**What it is:** The email capture form that appears on the artist's profile page. Two instances per page: primary (after hero, bio, pills — screenful 3), secondary (above footer).

**Used in:** able-v7.html only (ids: `fan-form`, `fan-form-2`)

**Surface:** Surface 1

**HTML structure (complete):**
```html
<section class="fan-capture" id="fan-capture"
         aria-labelledby="fan-capture-heading">
  <h2 class="fan-capture__heading" id="fan-capture-heading">Stay close.</h2>
  <p class="fan-capture__sub">I'll only reach out when something's actually happening.</p>
  <form class="fan-capture__form" id="fan-form" novalidate>
    <div class="fan-capture__field-wrap">
      <label for="fan-email" class="sr-only">Email address</label>
      <input class="fan-capture__input" id="fan-email"
             type="email"
             inputmode="email"
             autocomplete="email"
             autocapitalize="off"
             placeholder="your@email.com"
             aria-required="true"
             aria-describedby="fan-error">
      <button class="fan-capture__btn btn-primary pressable"
              type="submit" id="fan-submit">
        <span class="fan-submit-label">I'm in</span>
        <span class="fan-submit-spinner" aria-hidden="true" hidden><!-- SVG spinner --></span>
        <span class="fan-submit-check" aria-hidden="true" hidden>✓</span>
      </button>
    </div>
    <p class="fan-capture__error" id="fan-error"
       role="alert" aria-live="polite" hidden></p>
  </form>
  <p class="fan-capture__trust">Just <span id="fan-artist-name">the artist</span>. No spam.</p>
  <div class="fan-capture__echo" id="fan-echo" hidden>
    <p class="fan-capture__echo-text" id="fan-echo-text"></p>
    <p class="fan-capture__echo-confirm">You're on the list.</p>
  </div>
</section>
```

**Input attributes — all required (from `V6_BUILD_AUTHORITY.md` §8.3):**
- `type="email"` — mobile keyboard with @ key
- `inputmode="email"` — correct virtual keyboard on Android
- `autocomplete="email"` — browser autofill
- `autocapitalize="off"` — prevents capitalising email addresses on iOS

**Submit flow (from `V6_BUILD_AUTHORITY.md` §8.2 + §7.2 item 7):**
1. `pointerdown` → button `.pressing` state
2. Submit → spinner appears (optimistic)
3. Email stored to `able_fans` in localStorage (and synced to Supabase when live)
4. Spinner → checkmark (✓) → confetti particles (G1, 40 particles)
5. Echo text: "We've got you — [email] is on [Artist]'s list."
6. Form hides; echo module shows

**Error state (E11):**
- On invalid email: `translateX` shake animation (400ms), border → `--color-state-live` (red)
- Error message appears 400ms after shake begins (not simultaneous)
- Error message clears when user retypes (keydown event)

**Focus state (E1):**
```css
.fan-capture__input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-soft);
  outline: none;
}
```

**Accessibility:**
- `<label class="sr-only">` — visually hidden but present for screen readers (do not use `placeholder` as a substitute for a label)
- `aria-required="true"` on input
- `aria-describedby="fan-error"` links input to error message
- Error `<p>` has `role="alert"` and `aria-live="polite"`
- `novalidate` on `<form>` — we handle validation in JS, not browser native (gives us the shake animation)

---

## 9. Quick Action Pill

**What it is:** A small horizontal link pill used in the Quick Action zone below the hero. Displays a platform/destination name and optionally an icon. Max 4 visible on narrow screens (375px), 6 on wide screens, with a "More" overflow toggle.

**Used in:** able-v7.html (Quick Action zone, platform zone)

**Surface:** Surface 1

**CSS class:** `.pill`

**HTML pattern:**
```html
<a class="pill pressable" href="https://..." target="_blank" rel="noopener"
   data-type="platform"
   aria-label="Spotify">
  <span class="pill__icon" aria-hidden="true">
    <!-- SVG or text icon -->
  </span>
  <span class="pill__label">Spotify</span>
</a>
```

**Key CSS (platform zone layout — 2-column grid, not horizontal scroll):**
```css
.pills-track {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-2);
}
.pill {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--sp-3);
  border-radius: var(--r-md);             /* pills use --r-md in the grid context */
  border: 1px solid var(--color-border);
  background: var(--color-card);
  min-height: 44px;
  padding: var(--sp-3) var(--sp-4);
}
```

**Entrance animation (A10/D3):** On first load, pills animate in with a horizontal wave:
```css
/* Applied by JS stagger — each pill gets animation-delay: i * 50ms */
@keyframes pill-enter {
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: translateX(0); }
}
```

**First-load shimmer (D15):** A shimmer sweep fires once per session on each pill, flagged to `sessionStorage` so it does not repeat on tab re-focus.

**Press state:** `.pressing` class adds `scale(0.97)` (B1).
**Hover/focus state:** Border brightens and icon reaches full opacity.

**Accessibility:**
- `aria-label` on the `<a>` if the pill label alone is not descriptive enough ("Open" is not sufficient)
- Overflow "More" button must have `aria-expanded` state
- All pills must be reachable by keyboard

---

## 10. Platform Pill (streaming service)

**What it is:** A variant of the Quick Action Pill styled specifically for streaming platform links. Includes the platform logo, platform name, and a subtle accent on the active/hovered state. Appears in the platform zone (2-column grid).

**Used in:** able-v7.html (Platforms section, stored in `profile.platforms[]`)

**Surface:** Surface 1

**CSS class:** `.pill` with `data-type="platform"` — same base class as Quick Action Pill; differentiated by the grid context and the icon treatment.

**HTML pattern:**
```html
<a class="pill pill-shimmer-once pressable" href="https://open.spotify.com/..."
   target="_blank" rel="noopener noreferrer"
   data-type="platform"
   aria-label="Listen on Spotify">
  <span class="pill__icon" aria-hidden="true">
    <svg><!-- Spotify SVG logo --></svg>
  </span>
  <span class="pill__label">Spotify</span>
  <span class="pill__arrow" aria-hidden="true">↗</span>
</a>
```

**Active platform accent (H5):** When a platform is the "active" platform (matches current release context), the pill border transitions to `rgba(var(--color-accent-rgb), 0.5)` and the icon reaches full opacity.

**Icon treatment:** SVG logos for known platforms (Spotify, Apple Music, YouTube, SoundCloud, Bandcamp, Tidal, Deezer, Amazon Music). Platform logos are monochrome and coloured with `currentColor` or filled white — they adapt to theme. Never use platform brand colours as the icon colour (it clashes with arbitrary artist accent colours).

**Accessibility:**
- `aria-label` must read as a human action: "Listen on Spotify", not just "Spotify"
- `target="_blank"` requires `rel="noopener noreferrer"`
- External link indicator (↗ arrow) is `aria-hidden="true"` — screen reader hears the `aria-label` instead
