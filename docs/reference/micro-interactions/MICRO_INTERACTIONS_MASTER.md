# ABLE Micro-Interactions — Master Research Document
**Compiled: 2026-03-14 | Status: Reference — does not override V6_BUILD_AUTHORITY.md**

---

## Framing: The aesthetic goal

"Felt, not seen." Every interaction should make the page feel alive and responsive without drawing attention to itself. The test: if you remove it, the page feels slightly dead. If the user consciously notices it, it has failed.

Applies to all four themes (Dark, Light, Glass, Contrast) and all seven vibes. Nothing here should work only on Dark mode.

---

## Part 1 — Taxonomy of micro-interaction categories

The 200 interactions in this document fall into 9 categories. ABLE's profile page touches all of them.

| Category | What it covers | ABLE context |
|---|---|---|
| A. Scroll & Momentum | Rubber-band, snap, parallax, sticky headers, lazy reveal | Platform pills bloom, hero collapse, tab bar hide |
| B. Touch & Tap Feedback | Press states, ripple, colour flash, spring-back | Every interactive element — CTAs, pills, cards |
| C. State Transitions | Campaign state changes, theme switches, tab switches | Profile/Pre-release/Live/Gig crossfades |
| D. Entrance & Exit | Page bloom, panel slide-up, hero reveal, panel dismiss | First load, bottom sheets, stagger |
| E. Form & Input | Focus glow, floating label, error shake, submit states | Fan capture, wizard steps |
| F. Loading & Skeleton | Shimmer, skeleton, progressive image, optimistic UI | First load, slow connections |
| G. Reward & Success | Confetti, checkmark, counter tick, copy flash | Fan sign-up, support purchase, share |
| H. Ambient & Passive | Glow breathing, artwork colour extraction, glass depth | Background atmosphere, gig mode |
| I. Navigation & Wayfinding | Active tab, section label, scroll-to-top, deep link | Tab bar, section orientation |

---

## Part 2 — 200 interactions: best-in-class references by category

### Category A — Scroll & Momentum

| # | Interaction | Best-in-class reference | Notes |
|---|---|---|---|
| A1 | iOS rubber-band overscroll | iOS Safari (native) | Use `overscroll-behavior-y: contain` on the inner scroll container |
| A2 | Scroll snap proximity (section-to-section) | Apple.com product pages | `scroll-snap-type: y proximity` — never `mandatory` on mobile |
| A3 | Lazy image fade-in on viewport entry | Unsplash, Medium | `IntersectionObserver` with 100px rootMargin; fade 300ms decel |
| A4 | Sticky header collapse (hero → minimal bar) | Spotify app, Apple Music | `position: sticky`, `backdrop-filter` kicks in at scroll |
| A5 | Parallax hero artwork (0.7x scroll rate) | Apple.com, Awwwards winners | `rAF` only; `will-change: transform`; test on Pixel 5a |
| A6 | Tab bar hide on scroll down / reveal on scroll up | Instagram, Twitter/X, Gmail | Direction detection; min 100px scroll before triggering |
| A7 | Ambient glow scroll response | Framer.com | JS-driven, glass theme only, rAF-throttled |
| A8 | Section header sticky pin below top bar | Notion, Linear | `position: sticky; top: calc(header-h + 8px)` |
| A9 | Overscroll background tint (accent bleeds) | iOS native, Vercel | `background-color` on `<html>`, `color-mix()` |
| A10 | Platform pill left-to-right wave reveal | Awwwards, Codrops showcases | `translateX(-8px)` start, 50ms per pill stagger |
| A11 | Artist name scale compression on scroll | Spotify (Now Playing), Apple Music app | Interpolate 48px → 24px over hero height scroll distance |
| A12 | Scroll-triggered section entrance (Y-axis fade-up) | Linear, Vercel site | `IntersectionObserver`, 300ms decel, 60ms stagger, cap at 6 |
| A13 | Scroll progress on wizard steps (start.html only) | Stripe onboarding, Typeform | Use only on wizard; never on the public artist profile |
| A14 | Horizontal scroll drag resistance (snap cards) | Native iOS scroll containers | CSS `scroll-snap` + `overscroll-behavior: none` |
| A15 | Snap-to-card on snap card row | Dribbble-style horizontal carousels | `scroll-snap-type: x mandatory` on container |
| A16 | Below-fold section lazy rendering | Gatsby, Next.js | Phase 2 perf optimisation; placeholder IntersectionObserver |
| A17 | Pull-to-refresh custom indicator | iOS Mail, Notion mobile | Admin only; public profile does not need this |
| A18 | Reading position persistence (admin) | Notion, Linear | Session-store active section; relevant in admin, not profile |
| A19 | Scroll-velocity detection (opacity, not blur) | Native apps | Use `opacity` dim during fast scroll; never `filter: blur()` |
| A20 | Hero gradient intensifies as user scrolls into it | Awwwards gold winners | Optional; sine curve opacity; Dark + Glass only |

---

### Category B — Touch & Tap Feedback

| # | Interaction | Best-in-class reference | Notes |
|---|---|---|---|
| B1 | Scale-down on press (0.97) | iOS system UI (every app) | CSS `:active` + `touchstart` doc listener for iOS fix |
| B2 | Spring-back release (0.97 → 1.02 → 1.0) | Framer, Linear | JS class toggle; `--ease-spring` on release only |
| B3 | CTA background flash on tap (lighter accent) | Stripe payment buttons | `color-mix(accent 80%, white 20%)` on `:active` |
| B4 | Primary CTA glow on press (radial pulse) | Apple Music, Framer | `::after` pseudo-element + `opacity` (not `box-shadow` in loop) |
| B5 | Ripple from touch origin (accent, 0.25 opacity) | Material Design (Google) | Subtle version only; primary CTA only; not ghost buttons |
| B6 | Platform pill press state (0.95 scale + dim) | Notion tags, Linear pill controls | Tells fan pills are tappable links, not static labels |
| B7 | Long-press contextual menu on track card | iOS Photos, Apple Maps | Admin only; fans: use explicit share button |
| B8 | Double-tap heart on artwork | Instagram (trained behaviour) | Only if fan "like" persists to backend; otherwise defer |
| B9 | Swipe-to-dismiss on bottom sheet | iOS Sheets, Google Maps | 30% panel height threshold; spring-back if below |
| B10 | Swipe-reveal fan list row (admin) | iOS Mail | Admin fan list only; swipe-left → archive |
| B11 | Edge-swipe to dismiss push panel | iOS native back gesture | For push navigation only; current arch uses bottom sheets |
| B12 | Visual haptic: scale pop on threshold action | iOS Haptic feedback (visual equiv.) | Fan sign-up, support purchase; not every press |
| B13 | Drag resistance on snap card overflow | Native iOS scroll | CSS gives this mostly for free; custom is optional polish |
| B14 | Tab icon bounce on selection (1.15 then settle) | iOS tab bars (stock apps) | Spring easing; don't fire on re-tap of active tab |
| B15 | Support tier card lift on selection | Stripe pricing cards, Framer | `translateY(-4px)` + accent border; non-selected dims |
| B16 | `touch-action: manipulation` on all interactives | PWA best practice | Eliminates 300ms tap delay; non-negotiable |
| B17 | Hover scale on desktop (1.02) | Linear, Vercel, Framer | `@media (hover: hover)` only; no hover on touch |
| B18 | Icon button scale on press (vs label button) | Figma, Linear | Icon-only controls deserve more prominent press state |
| B19 | Card tilt on hover (desktop, glass theme) | Framer templates, Codrops | `perspective(1000px) rotateX/Y` capped ±5deg; glass theme only |
| B20 | Focus ring — accent colour, not browser blue | All premium SaaS products | `outline: 2px solid var(--color-accent); outline-offset: 2px` |

---

### Category C — State Transitions

| # | Interaction | Best-in-class reference | Notes |
|---|---|---|---|
| C1 | Tab sliding indicator (spring, with overshoot) | Linear, Framer, Vercel | `getBoundingClientRect` → `left` transition with spring |
| C2 | Campaign state hero crossfade | Framer, Webflow (interaction mode) | 150ms out, 250ms in; asymmetric; ambient glow interpolates |
| C3 | Theme transition (all colours simultaneously) | Linear dark/light switch | Apply to `.v3-shell`, cascade; skip `backdrop-filter` transition |
| C4 | Gig mode activation flash (one-time, per session) | Flash/strobe stage lighting (metaphor) | Opacity overlay 0 → 0.2 → 0 in 200ms; session-flagged |
| C5 | Countdown digit flip (split-flap clock) | Departures boards, Dan Eden's Animate.css | `rotateX` + `backface-visibility: hidden`; max 8 digits |
| C6 | "Out Now" live pulsing dot | Instagram Live, YouTube Live, TikTok | 2s ease-in-out loop; `scale(1)→1.4` and `opacity`; stop in reduced-motion |
| C7 | Gig badge warm glow pulse | Neon sign (metaphor), iOS notification badges | `::after` `opacity` pulse; never animate `box-shadow` directly |
| C8 | Profile state "quiet return" (slowest transition) | — | 500ms crossfade with no spring; the emotional exhale |
| C9 | Platform pill accent fill on selection | Spotify library (selected playlist source) | Only if "preferred platform" preference is implemented |
| C10 | Overflow pill expansion (inline, not modal) | Notion tags, GitHub label pickers | `scale(0.8)→1` with 60ms stagger; inline not bottom sheet |
| C11 | Section accordion expand/collapse | Notion, Linear sidebar | Admin only; public profile should never collapse sections |
| C12 | Support pack tier select: card lift + glow | Stripe pricing pages | `translateY(-4px)` + accent glow; CTA activates |
| C13 | Release badge text swap (asymmetric crossfade) | All state-driven UIs | 100ms out / 200ms in; content exits fast |
| C14 | Admin campaign toggle morphs (fill + icon swap) | Linear status controls | Full accent fill on active; others dimmed |
| C15 | Connection badge fade-in slide (Spotify linked) | Stripe "payment method linked" | `opacity: 0, translateX(8px)` → final; arrives from right |
| C16 | Gig mode countdown timer (24hr depletion bar) | Snapchat stories timer, Instagram stories | Thin progress bar under gig button in admin |
| C17 | Pre-release background intensification (day-by-day) | Cinematic tension building (metaphor) | Interpolate ambient opacity 0.12→0.28 over 14 days |
| C18 | Error state border flash (red, auto-clear on retype) | All form validation libraries | `--color-state-live` border; remove on `input` event |
| C19 | Active state chip crossfade (pre-release→live) | Framer smart components | Same asymmetric fade as C13 |
| C20 | Admin stats real-time increment (fan arrives) | Stripe dashboard live updates | localStorage poll (5s), Supabase realtime in backend phase |

---

### Category D — Entrance & Exit

| # | Interaction | Best-in-class reference | Notes |
|---|---|---|---|
| D1 | Staggered card bloom on page load | Awwwards gold, Codrops | Hero: rAF instant. Below fold: IntersectionObserver. Cap stagger at 6 |
| D2 | Hero name slide-up reveal | Spotify, Apple Music artist view | 400ms decel; `document.fonts.ready` before firing |
| D3 | Platform pill wave (left to right, translateX) | Card reveal animations, Dribbble | 50ms per pill; horizontal stagger on horizontal element |
| D4 | Tab bar slide-up after hero (200ms delay) | iOS app launch sequences | Navigation arrives second; content is primary |
| D5 | Bottom sheet slide-up (spring entry) | iOS Sheets, Google Maps, Spotify queue | `translateY(100%)→0`, 350ms spring; backdrop 250ms standard |
| D6 | Panel backdrop fade (semi-transparent, tap-to-dismiss) | All modal systems | `pointer-events: none` until active; `pointer-events: all` when active |
| D7 | Skeleton → real content crossfade (200ms) | Stripe, Airbnb | Both in DOM simultaneously; skeleton fades out, content fades in |
| D8 | Below-fold section entrance (first visit only) | Medium articles | Session-flag prevents replaying on reload |
| D9 | Modal scale entry (0.92 → 1.0 with spring) | Framer, Linear modals | Start.html wizard steps; not profile page |
| D10 | Toast notification slide-in (bottom, above tab bar) | iOS notifications, Stripe dashboard | `env(safe-area-inset-bottom)` for iPhone notch clearance |
| D11 | Gig banner drop (theatrical, once per session) | Stage banner unfurl (metaphor) | Choose: flash (C4) OR banner drop; not both |
| D12 | Panel exit (acceleration curve, faster than entry) | iOS dismiss physics | `--ease-accel`, 250ms; always faster than entrance |
| D13 | Fan list row stagger (admin, first load, 8 rows) | Stripe dashboard, Linear lists | 40ms stagger; rows feel like real individual records |
| D14 | Stats counter animate from zero (admin) | Stripe, Linear, GitHub stats | 800ms ease-out cubic; first load only |
| D15 | Platform pill first-load shimmer (once, not looping) | Premium product launches, Apple Store | Session-flagged; shimmer is a reveal, not a loading state |
| D16 | Profile scale to 0.95 behind open panel | iOS native (sheet layer) | Underlying content recedes; panel feels "above" the profile |
| D17 | Panel content reveal scale (0.95 → 1.0 on return) | iOS navigation patterns | Content "rises" as panel dismisses |
| D18 | Wizard step entrance (slide from right, spring) | Typeform, Framer wizard templates | Step exits left, next step enters from right |
| D19 | Skeleton synchronised shimmer (all in unison) | Premium skeleton implementations | `animation-delay: 0s` on all; single phase, single organism |
| D20 | Hero artwork blur-up (gradient placeholder → real image) | Gatsby, Next.js Image, Medium | CSS gradient at full dims; real image fades over |

---

### Category E — Form & Input

| # | Interaction | Best-in-class reference | Notes |
|---|---|---|---|
| E1 | Email focus glow (accent border + soft glow) | Stripe checkout, Linear | `border-color: accent`, `box-shadow: 0 0 0 3px accent-soft` |
| E2 | Float label (label rises on focus) | Material Design, Airbnb checkout | Use in wizard (multi-field); not fan capture (single field) |
| E3 | Character count fade-in near limit | Twitter/X composer, Notion | Admin text fields; fade in at 40 chars from limit; amber→red |
| E4 | Submit: instant spinner → checkmark (optimistic) | Stripe, Vercel deploy | Spinner fires on same frame as submit; don't wait for API |
| E5 | Error shake (translateX oscillation) | iOS lock screen wrong passcode | 400ms; 4 oscillations; `--color-state-live` border |
| E6 | Success morph (button → circular checkmark) | Typeform success states | Button width → 56px circle; text out, icon in |
| E7 | Browser autofill override (dark theme protection) | Any dark form on iOS Safari | `box-shadow: inset` trick; prevents yellow autofill bg |
| E8 | Field clear button (X, appears when content present) | iOS search bars | Fade in on `input.value.length > 0`; single-tap clear |
| E9 | Paste flash (background pulse on paste event) | Password manager UX | `paste` event listener; 400ms accent flash; common on mobile |
| E10 | Wizard progress spring fill | Typeform, Stripe onboarding | 3px bar; spring easing on width; thin, top-of-screen |
| E11 | Error message appears below field (delayed reveal) | Stripe validation, Linear | Appears 400ms after shake; not simultaneously |
| E12 | Auto-advance wizard step on valid input | Typeform (controversial) | Appropriate for single-field steps only; never ambush user |
| E13 | Input border radius matches vibe r-mult | ABLE design system | `border-radius: var(--r-md)` on inputs — vibe-driven |
| E14 | Password show/hide toggle (admin) | iOS password fields | Eye icon; `type="password"` ↔ `type="text"` |
| E15 | Email validation timing (on blur, not on type) | Stripe, Airbnb | Validate on `blur`; show error on `blur`; clear on `input` |
| E16 | Keyboard avoiding view on mobile | iOS native behaviour | `padding-bottom: var(--keyboard-height)` with visualViewport API |
| E17 | Form field active state border thickens | Linear, Stripe | 1px → 2px on focus; subtle but meaningful |
| E18 | Success copy echoes the fan's email back | Contentful sign-up, Framer | Recognition over Recall (NNGroup); "we've got you — [email]" |
| E19 | Name field optional fade-in (artist-configurable) | Conversational forms | Fades in below email if artist enables name capture |
| E20 | Form submission button minimum 44px height | iOS HIG, Google Material | Non-negotiable; `min-height: var(--tap-min)` |

---

### Category F — Loading & Skeleton

| # | Interaction | Best-in-class reference | Notes |
|---|---|---|---|
| F1 | Shimmer skeleton screen (unison shimmer) | Stripe dashboard, Facebook, LinkedIn | Background-position sweep; all elements same phase |
| F2 | Skeleton shape accuracy (match real content) | Airbnb, Dribbble | Square for artwork, ~2 lines for bio, pill for platform chip |
| F3 | Progressive image blur-up | Gatsby, Next.js, Medium | CSS gradient at full dims; real image fades in over it |
| F4 | Lazy image load (IntersectionObserver, not `loading="lazy"`) | Unsplash, Netflix, Medium | `rootMargin: '100px'`; fade 300ms on `.loaded` class |
| F5 | Artwork colour extraction (canvas → ambient token) | Spotify Now Playing, Apple Music | 4×4 canvas sample; sets `--color-ambient`; CORS required |
| F6 | Optimistic UI: fan count increments before API confirms | Stripe, Linear | Rollback on failure; localStorage write is synchronous |
| F7 | OAuth loading ring (Spotify connection) | Stripe Connect flow | 700ms spin; replace with error at 5s; not indefinite |
| F8 | Lazy section rendering (below-fold sections) | Gatsby, SvelteKit | Phase 2; placeholder IntersectionObserver |
| F9 | Content FOUC prevention (skeleton holds layout) | All production SPAs | Skeleton shapes must approximate real content dimensions |
| F10 | Font load guard (fire hero animation after fonts.ready) | Google Fonts best practice | `document.fonts.ready.then(() => triggerAnimation())` |
| F11 | Image error fallback (accent initials placeholder) | Airbnb, LinkedIn avatars | On `img.onerror`: show initials in Barlow Condensed on accent bg |
| F12 | API failure graceful degrade (cached → manual → hidden) | ABLE performance law | Never show broken section shell; degrade to manual data |
| F13 | Stats load optimistic display (cached first) | Vercel analytics, Stripe dashboard | Show last known value; update when API resolves |
| F14 | Embed load timeout with fallback link | ABLE conduit principle | Spotify iframe → if fails: "Listen on Spotify →" link |
| F15 | Placeholder accent gradient while artwork loads | ABLE design system | `background: linear-gradient(135deg, accent, accent-dark)` |
| F16 | Inline content flash prevention on theme init | All dark-mode SPAs | Inline critical CSS in `<head>` before paint; no FOUC |
| F17 | "Already loaded" section detection (skip entrance anim) | Performance-conscious UIs | Check `entry.isIntersecting` on observer init; mark as visible |
| F18 | Font swap fallback sizing (prevent layout shift) | Google Fonts `font-display: swap` | Size fallback fonts to match display font metrics |
| F19 | Background load order (hero first, below-fold lazy) | Waterfall optimisation | LCP image has `loading="eager"` and `fetchpriority="high"` |
| F20 | Single render of profile from localStorage (no waiting) | ABLE local-first law | Page renders complete from localStorage before any API call |

---

### Category G — Reward & Success

| # | Interaction | Best-in-class reference | Notes |
|---|---|---|---|
| G1 | Fan sign-up confetti burst (accent + white particles) | Typeform completion, Duolingo | 40 particles; upward arc + gravity; 1.2s; `prefers-reduced-motion` |
| G2 | Submit button visual haptic (scale pop on success) | iOS success animations | 0.95 → 1.05 → 1.0; only for threshold moments |
| G3 | Fan count increment tick (admin, scale + flip) | Stripe live events, Linear | Scale 1.0 → 1.1; digit flip (#C5 technique); settle spring |
| G4 | Support pack purchase glow (card stays glowing) | Stripe Payment confirmation | `box-shadow` glow stays on purchased card; warm, settled |
| G5 | Copy-link flash ("Copied!" label for 2s) | All clipboard UIs (GitHub, Figma, Notion) | Accent bg flash; show `ablemusic.co/handle` not full URL |
| G6 | Pre-save confirmation star burst (8 radial stars) | App Store (Get button → update) | Stars at 45° intervals from button; more contained than confetti |
| G7 | Email echo in confirmation copy | Contentful, Framer, Mailchimp confirm | `confirm-email` span: accent bg at 12%, accent text colour |
| G8 | Form success: whole section morphs to confirmation | Typeform final step | `innerHTML` swap; artist first-person voice; no page navigation |
| G9 | Deep-link section highlight (1.5s pulsing border) | Direct link UX conventions | Appears after 400ms delay (lets entrance anims complete first) |
| G10 | Snap card publish flip (face-down → reveal) | Playing cards, Framer interactions | `rotateY(180→0deg)` spring; admin only; 500ms |
| G11 | Artist "connection confirmed" badge slide-in | Stripe dashboard patterns | `opacity: 0, translateX(8px)` → arrives from right |
| G12 | Upgrade trigger progress bar (N/100 fans) | Stripe metered billing, GitHub usage | Shows from fan 1; urgency copy at 95+ |
| G13 | Gig mode first-load spotlight flash | Stage lighting (metaphor) | 200ms one-time; `opacity` overlay; not a loop; session-flagged |
| G14 | Stats counter animate from zero (first dashboard open) | Linear onboarding, Stripe first use | 800ms; ease-out cubic; only on first load per session |
| G15 | Tier card active glow (selected Support pack) | Stripe pricing page | Accent border `1px solid var(--color-accent)`; non-selected: opacity 0.6 |
| G16 | "Your list is full" modal — warm, specific copy | — | Not a generic error; "These are 100 people who asked to hear from you." |
| G17 | First CTA click data arrived (gentle inline prompt) | Stripe first transaction notification | Emotion: "it's working." Copy: "12 people tapped your Spotify link today." |
| G18 | Pre-save count (how many fans pre-saved) | Spotify for Artists pre-save tracking | Show in admin; live ticker if real-time data available |
| G19 | Support purchase copy: personal not transactional | Stripe (payment success pattern) | "You're supporting [Name] at [Tier]" — not "Payment successful" |
| G20 | Progress feedback: percentage toward release goal | Album campaign planning metaphor | Admin only; optional context for pre-release stats |

---

### Category H — Ambient & Passive

| # | Interaction | Best-in-class reference | Notes |
|---|---|---|---|
| H1 | Ambient glow breathing (4s ease-in-out loop) | Apple Mac screensaver (metaphor) | `opacity` only on dedicated layer; GPU compositor; 4s |
| H2 | Artwork-driven ambient (canvas → `--color-ambient`) | Spotify Now Playing bg | Does NOT override `--color-accent`; ambient layer only |
| H3 | Gig mode ambient intensification (4s→2.5s, brighter) | Concert lighting energy (metaphor) | CSS custom property override on `data-state="gig"` |
| H4 | Artist name gloss pass (once on load) | Premium product photography lighting | `::after` linear-gradient sweep; Dark + Glass themes only |
| H5 | Glass depth deepens on card press | Jony Ive material quality (Apple) | `backdrop-filter: blur(28px→36px)` on `:active`; glass theme only |
| H6 | Equaliser animation in platform pill (playing live) | Spotify, Apple Music, YouTube | Only with real API data; not decorative; 3 bars, staggered heights |
| H7 | Overscroll accent tint (html background bleeds) | iOS rubber band (metaphor) | `color-mix(bg 85%, accent 15%)` on `<html>` |
| H8 | Fan capture "warmth" — accent tint in background | None (original) | Very low opacity accent behind fan capture section; draws eye |
| H9 | Pre-release ambient intensification (day-by-day) | — | Linear interpolation: 0.12 + (0.16 × (1 - daysLeft/14)) |
| H10 | Dark theme base: warm graphite (not cold blue-black) | ABLE visual system | `#0d0e1a` not `#000011`; warm white text, not harsh white |
| H11 | Section dividers (accent hairline at 0.08 opacity) | Linear, Stripe | `border-top: 1px solid rgba(var(--color-accent-rgb), 0.08)` |
| H12 | Scrolled-past section labels in tab bar (active context) | Instagram, YouTube app | Tab shows current content section; non-intrusive |
| H13 | Vibe-specific animation timing (R&B slower, Electronic sharper) | — | Override `--dur-mid` per vibe; folk 350ms, electronic 150ms |
| H14 | Light theme warmth (cream not clinical white) | ABLE visual system | `#f0ede8` base; never pure `#ffffff`; warm cream |
| H15 | Contrast theme — pure black, max legibility | iOS Increase Contrast mode | `#000000` base; `rgba(255,255,255,0.2)` borders |
| H16 | Accent glow on bio expanded (subtle connection to hero) | — | `rgba(accent, 0.03)` bg on expanded bio; barely perceptible |
| H17 | State-specific glow colour (pre-release amber, live red) | — | `--color-state-pre: #fbbf24` in hero gradient; state-driven |
| H18 | Night mode blue-shift (time-based) | f.lux, iOS Night Shift | **Explicitly skip** on artist profile; overrides artist's intent |
| H19 | Loading state pulse synchronisation (shimmer unison) | ABLE micro-interactions doc | `animation-delay: 0s` on all skeleton elements |
| H20 | Reduced-motion: all animations stop, page still usable | WCAG 2.2, iOS accessibility | `prefers-reduced-motion: reduce` law; not optional |

---

### Category I — Navigation & Wayfinding

| # | Interaction | Best-in-class reference | Notes |
|---|---|---|---|
| I1 | Tab dot settled state (halo glow at rest) | iOS tab bar, Framer | Post-animation `.settled` class; barely-there halo |
| I2 | Section label fade-in as user arrives | Medium, Notion | `IntersectionObserver` on section; 200ms opacity |
| I3 | Back navigation: underlying content rises (0.95→1.0) | iOS native navigation | Panel opens: scale to 0.95; panel closes: returns to 1.0 |
| I4 | Deep link section pulse (hash highlight) | GitHub, Notion | Fires 400ms after load (after entrance anims) |
| I5 | Scroll-to-top on active tab re-tap | Instagram, Twitter, Gmail | If `tab.classList.contains('active')`; `scrollTo({top:0, behavior:'smooth'})` |
| I6 | Android back gesture → close open panel | Android system UI | `history.pushState` on panel open; `popstate` → close |
| I7 | Active section context in tab label (optional) | YouTube, Instagram | Tab shows "Music" label only when scrolled into music section |
| I8 | Tab bar "Home" re-tap scrolls to artist name | iOS-convention | Same as I5; most fans will land on Home tab |
| I9 | Section visible indicator (breadcrumb trail) | Notion page outline | Not needed for ABLE's shorter profile; section headers sufficient |
| I10 | Keyboard navigation: visible focus ring on all elements | WCAG 2.2 AA | Accent outline 2px; cannot be removed or hidden |

---

## Part 3 — Top 30 for ABLE, ranked by impact vs complexity

This is the actionable priority list. Everything marked [BUILD] in the existing reference docs is included. New additions from this extended research are marked NEW.

### Tier 1 — Must build (highest impact, manageable complexity)

| Rank | # | Interaction | Impact | Complexity | Status in v6 |
|---|---|---|---|---|---|
| 1 | B1 | Scale-down on press (0.97) + spring-back | Foundation — without this, nothing else matters | Low | Specified in §7.2 #1 |
| 2 | D1 | Staggered card bloom on load | Strongest first impression signal | Medium | Specified in §7.2 #4 |
| 3 | D2 | Hero name reveal (slide-up, decel) | The page's "opening statement" | Low | Specified in §7.2 #3 |
| 4 | C1 | Tab indicator spring slide | Most distinctive ABLE navigation signature | Medium | Specified in §7.2 #2 |
| 5 | F1+F9 | Shimmer skeleton (unison, accurate shapes) | Prevents worst-case blank-screen experience | Medium | Specified in §7.2 #5 |
| 6 | E1 | Email focus glow (accent border + glow) | Converts browser blue ring to artist colour | Low | Specified in §7.2 #6 |
| 7 | E4+E6 | Submit: spinner → checkmark → success morph | Highest-stakes form moment | Medium | Specified in §7.2 #7 |
| 8 | G1 | Fan sign-up confetti burst | The peak moment; fans remember this | Medium | Specified in §7.2 #7 |
| 9 | G7+E18 | Email echo in confirmation copy | Recognition over Recall; personalised confirmation | Low | Specified in §7.2 #7 |
| 10 | C2 | Campaign state crossfade (asymmetric) | Most important state transition | Medium | Specified in §7.2 #9 |
| 11 | C6 | Live state pulsing dot | Communicates "this is current" without text | Low | Specified in §7.2 #10 |
| 12 | A6 | Tab bar hide/show on scroll | Reclaims 8% screen real estate; standard UX | Low | Specified in §7.2 #15 |
| 13 | D5 | Panel slide-up (spring) + D12 exit (accel) | Every bottom sheet; asymmetric entry/exit | Medium | Specified in §7.2 #13/14 |
| 14 | A4 | Sticky hero collapse on scroll | Keeps artist name visible while exploring | Medium | §7.3 Phase 2 |
| 15 | E9 | Paste flash on email input | Confirms paste; 60% of mobile users paste email | Low | Specified in §7.2 #16 |

### Tier 2 — Build next (high value, higher complexity or lower frequency)

| Rank | # | Interaction | Impact | Complexity | Notes |
|---|---|---|---|---|---|
| 16 | B9 | Swipe-to-dismiss bottom sheets | Expected by iOS users; no close button | High | Phase 2 |
| 17 | C4 | Gig mode activation flash | Most dramatic ABLE moment; once per session | Low | §7.3 Phase 2 |
| 18 | C5 | Countdown digit flip (pre-release) | Most engaging pre-release element | High | §7.3 Phase 2 |
| 19 | G5 | Copy-link flash ("Copied!") | Ubiquitous UX convention; always expected | Low | Specified in §7.2 #17 |
| 20 | H1+H3 | Ambient glow breathing + gig acceleration | Page feels alive; invisible but significant | Low | §7.3 Phase 2 |
| 21 | A11 | Artist name scale compression on scroll | Name stays visible while exploring | Medium | §7.3 Phase 2 |
| 22 | D20 | Blur-up image placeholders | Prevents blank rectangles on slow connections | Low | Specified in §7.2 #12 |
| 23 | H4 | Artist name gloss pass (once on load) | Premium reveal; editorial quality signal | Low | §7.3 Phase 2 |
| 24 | D10 | Toast notification (above tab bar) | Admin feedback; copy/save confirmations | Medium | Admin context |
| 25 | I5 | Scroll-to-top on active tab re-tap | Standard mobile convention; expected | Low | Specified in §7.2 #11 |

### Tier 3 — Consider (conditional on context or phase)

| Rank | # | Interaction | Condition |
|---|---|---|---|
| 26 | F5+H2 | Artwork colour extraction → ambient | Requires CORS-safe cross-origin images; significant payoff |
| 27 | C7 | Gig badge warm glow pulse | Only gig state; combine with H3 ambient acceleration |
| 28 | H5 | Glass blur deepens on press | Glass theme only; single-press only (not looping) |
| 29 | H6 | Equaliser animation in pill | Only with real Spotify "currently playing" API; never decorative |
| 30 | D15 | Platform pill first-load shimmer | Session-flagged; a reveal, not a loading state; subtle |

---

## Part 4 — Explicit DO NOT BUILD list

These are the micro-interactions most likely to make ABLE feel cheap, overused, or "AI-generated website." Do not implement any of them on the public artist profile.

### Outright avoid

| Interaction | Why |
|---|---|
| Cursor trail effects (sparkles, trails following mouse) | Aggressively associated with MySpace-era web design, free Wix templates |
| Animated gradient background (the "Aurora" bg, morphing colours in a loop) | Overused by AI product landing pages; #1 signifier of "built by a non-designer" in 2025–26 |
| Text typewriter effect on hero name or tagline | Signals: the product cannot commit to what it wants to say; always feels cheap |
| Scroll-jacked navigation (overriding browser scroll entirely) | Breaks momentum; breaks keyboard accessibility; breaks Android back gesture |
| Count-up numbers on every page visit (stats counting from 0 every time) | First visit: good. Subsequent visits: tedious and slows comprehension |
| Particle background (floating dots, connecting lines) | Direct association with generic "tech startup" aesthetic; opposite of ABLE's music identity |
| Image parallax at >0.6 speed differential | At high differential, users feel motion sick; performance kills 60fps on Android |
| Hover-triggered video autoplay on any card | Intrusive; adds cognitive load; violates "felt not seen" principle |
| Box-shadow animation in a CSS loop | Triggers repaint on every frame; drops below 60fps; use `::after` opacity instead |
| `filter: blur()` animation in a loop | Same GPU budget disaster as above |
| `width` or `height` animation (not `transform`) | Triggers layout recalculation on every frame |
| Progress bar on artist profile page | Says "this is content to get through" not "this is a space to be in" |
| Scroll-velocity motion blur (`filter: blur` on fast scroll) | Repaints constantly; destroys 60fps |
| Infinite auto-scrolling carousels | Removes user control; fans can't read at their pace |
| Background parallax on hero artwork at > 0.7x rate | Tested: causes motion sickness at high differentials |
| Spinning loading icon on the primary CTA | CTA is the most important element; a spinner on it communicates uncertainty |
| "Bouncing" attention-grabbing arrow pointing down | Patronising and design-101 clip art |
| All-caps hero text with a gradient fill | The double combination of these reads as Discord server banner |
| Neon glow on every interactive element (not just gig mode) | Gig mode earns the glow because it's earned by context; everywhere else is noise |
| Toast notifications with emoji | Infantilises the product; the copy is sufficient |
| Confetti on every CTA tap (not just fan sign-up) | Confetti is the fan sign-up reward; using it elsewhere dilutes it |
| "Add to home screen" PWA banner that appears immediately | Interrupts the fan's first experience; they haven't decided they like the page yet |
| Floating chat bubble in bottom right corner | Completely wrong for a music artist's fan page |
| Social proof ticker ("127 artists signed up this week") | ABLE is not Linktree; social proof as a pressure tactic contradicts the copy philosophy |
| "Lottie" animations (complex multi-layer loops) | Performance cost on Android; often feel out of place in serious music contexts |
| Blinking cursor in empty text fields | Doesn't need code; it's browser default; overriding it is never worth the effort |
| Magnetic cursor (cursor snaps to buttons on desktop) | Feels like a design portfolio trick, not a music platform feature |

### Avoid on ABLE's aesthetic register (right pattern, wrong context)

| Interaction | Why it's wrong for ABLE specifically |
|---|---|
| Double-tap heart on artwork | Feels Instagram; until the backend persists the reaction, it's a hollow gesture |
| Ripple effect on ghost/secondary buttons | Ripple is Material Design; ghost buttons are quiet; the combination clashes |
| Animated emoji in confirmation copy | Contradicts copy philosophy; "no exclamation marks on dashboard copy" extends to emoji |
| Stagger cap exceeded (> 6 items × 60ms) | Items 7+ will have 420ms+ delay; fans scrolling fast will see a slow waterfall |
| Spring easing on every element (not just entrances) | Spring is for arrivals and selections; overusing it makes the page feel elastic and unstable |
| Tab icon bounce on re-tap of active tab | Re-tap triggers scroll-to-top; the bounce is for new selections only |
| Skeleton shimmer out-of-phase (different `animation-delay` per element) | Looks like 20 independent loading states; use `animation-delay: 0s` on all |
| Long-press contextual menus on the fan-facing profile | Long press is a gesture fans don't know to look for; use explicit share buttons |
| Pull-to-refresh on the public artist profile | The profile is read-only for fans; pull-to-refresh is an admin dashboard pattern |

---

## Part 5 — CSS/JS patterns for top 10 implementations

The following are production-ready patterns aligned to ABLE's token system. Copy directly into `able-v6.html`.

---

### Pattern 1 — Universal press state (scale-down + spring-back)

Every interactive element. Zero exceptions.

```css
/* In :root — duration and easing tokens already defined in V6_BUILD_AUTHORITY.md §3.3 */

.interactive {
  touch-action: manipulation; /* eliminates 300ms tap delay */
  user-select: none;
  -webkit-user-select: none;
  transition: transform var(--dur-instant) ease-out,
              opacity var(--dur-instant) ease-out;
}

/* iOS fix: document touchstart listener (already in §7.2 #1 spec) */
/* JS: document.addEventListener('touchstart', () => {}, {passive: true}) */

.interactive:active {
  transform: scale(0.97);
  opacity: 0.88;
}
```

For the spring-back on release (requires JS class toggle):

```js
// Apply to all .interactive elements on DOMContentLoaded
document.querySelectorAll('.interactive').forEach(el => {
  el.addEventListener('pointerdown', () => {
    el.style.transition = `transform ${getComputedStyle(document.documentElement).getPropertyValue('--dur-instant')} ease-out`;
    el.style.transform = 'scale(0.97)';
  });
  el.addEventListener('pointerup', () => {
    el.style.transition = `transform var(--dur-slow) var(--ease-spring)`;
    el.style.transform = 'scale(1.0)';
  });
  el.addEventListener('pointercancel', () => {
    el.style.transition = `transform var(--dur-fast) ease-out`;
    el.style.transform = 'scale(1.0)';
  });
});
```

---

### Pattern 2 — Staggered card bloom (above-fold + below-fold)

Two systems. Never conflate them.

```css
/* Initial state — applied in HTML/JS before first paint */
.will-animate {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity var(--dur-mid) var(--ease-decel),
              transform var(--dur-mid) var(--ease-decel);
  transition-delay: var(--stagger, 0ms);
}
.will-animate.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Reduced motion fallback */
@media (prefers-reduced-motion: reduce) {
  .will-animate {
    opacity: 0;
    transform: none;
    transition: opacity var(--dur-fast) var(--ease-standard);
  }
}
```

```js
// Above-fold: fire on rAF after DOMContentLoaded
function initBloom() {
  // Above-fold: immediate stagger via rAF
  const aboveFold = document.querySelectorAll('.hero-zone .will-animate');
  aboveFold.forEach((el, i) => {
    el.style.setProperty('--stagger', `${i * 60}ms`);
  });
  requestAnimationFrame(() => {
    aboveFold.forEach(el => el.classList.add('visible'));
  });

  // Below-fold: IntersectionObserver
  const groups = {}; // group by parent section for stagger reset
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const section = el.closest('[data-section]')?.dataset.section || 'default';
      groups[section] = (groups[section] || 0);
      const stagger = (groups[section] % 6) * 60; // cap at 6 per group
      el.style.setProperty('--stagger', `${stagger}ms`);
      groups[section]++;
      el.classList.add('visible');
      observer.unobserve(el);
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.below-fold .will-animate').forEach(el => {
    // Mark already-visible elements immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    } else {
      observer.observe(el);
    }
  });
}

document.addEventListener('DOMContentLoaded', initBloom);
```

---

### Pattern 3 — Hero name reveal (font-load safe)

```css
.v3-artist-name {
  opacity: 0;
  transform: translateY(12px);
  /* Do NOT transition here — animation fires via JS class */
}
.v3-artist-name.revealed {
  opacity: 1;
  transform: translateY(0);
  transition: opacity var(--dur-slow) var(--ease-decel),
              transform var(--dur-slow) var(--ease-decel);
}

@media (prefers-reduced-motion: reduce) {
  .v3-artist-name {
    opacity: 1;
    transform: none;
  }
  .v3-artist-name.revealed {
    transition: none;
  }
}
```

```js
// Fire after fonts guaranteed loaded
document.fonts.ready.then(() => {
  requestAnimationFrame(() => {
    document.querySelector('.v3-artist-name')?.classList.add('revealed');
  });
});
```

---

### Pattern 4 — Tab indicator spring slide

```html
<!-- Single indicator element inside the tab bar -->
<div class="tab-indicator" aria-hidden="true"></div>
```

```css
.tab-bar {
  position: relative; /* positioning context for indicator */
}
.tab-indicator {
  position: absolute;
  bottom: 8px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 0 2px rgba(var(--color-accent-rgb), 0.2);
  transition: left var(--dur-slow) var(--ease-spring),
              box-shadow var(--dur-mid) var(--ease-standard);
  /* JS sets left position via getBoundingClientRect */
}
.tab-indicator.settled {
  box-shadow: 0 0 0 4px rgba(var(--color-accent-rgb), 0.12);
}

@media (prefers-reduced-motion: reduce) {
  .tab-indicator {
    transition: left 0.01ms, box-shadow 0.01ms;
  }
}
```

```js
const indicator = document.querySelector('.tab-indicator');
const tabBar = document.querySelector('.tab-bar');

function moveIndicator(activeTab) {
  const tabRect = activeTab.getBoundingClientRect();
  const barRect = tabBar.getBoundingClientRect();
  const targetLeft = (tabRect.left - barRect.left) + (tabRect.width / 2) - 2; // center of dot
  indicator.classList.remove('settled');
  indicator.style.left = `${targetLeft}px`;

  // Mark as settled after spring animation completes
  indicator.addEventListener('transitionend', () => {
    indicator.classList.add('settled');
  }, { once: true });
}

document.querySelectorAll('.tab-item').forEach(tab => {
  tab.addEventListener('click', () => moveIndicator(tab));
});

// Set initial position on load
const activeTab = document.querySelector('.tab-item.active');
if (activeTab) {
  indicator.style.transition = 'none'; // No animation on first render
  moveIndicator(activeTab);
  requestAnimationFrame(() => {
    indicator.style.transition = ''; // Re-enable
  });
}
```

---

### Pattern 5 — Email focus glow (kills browser blue ring)

```css
.fan-email-input {
  border: 1.5px solid var(--color-border);
  border-radius: var(--r-md);
  background: var(--color-card);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--text-base);
  padding: 0 var(--sp-4);
  min-height: var(--tap-min);
  width: 100%;
  outline: none; /* Remove default */
  transition: border-color var(--dur-fast) var(--ease-standard),
              box-shadow var(--dur-fast) var(--ease-standard),
              background-color var(--dur-fast) var(--ease-standard);

  /* iOS autofill protection */
  &:-webkit-autofill {
    -webkit-text-fill-color: var(--color-text) !important;
    box-shadow: 0 0 0 40px var(--color-card) inset !important;
  }
}

.fan-email-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(var(--color-accent-rgb), 0.18);
}

.fan-email-input.paste-flash {
  animation: pasteFlash var(--dur-slow) var(--ease-standard);
}

@keyframes pasteFlash {
  0%   { background-color: transparent; }
  30%  { background-color: rgba(var(--color-accent-rgb), 0.10); }
  100% { background-color: transparent; }
}
```

```js
// Paste detection
document.querySelector('.fan-email-input')?.addEventListener('paste', () => {
  const input = document.querySelector('.fan-email-input');
  input.classList.remove('paste-flash'); // Reset if already running
  requestAnimationFrame(() => input.classList.add('paste-flash'));
  input.addEventListener('animationend', () => input.classList.remove('paste-flash'), { once: true });
});
```

---

### Pattern 6 — Submit: spinner → checkmark → confetti → email echo

This is the most complex single interaction in the system. Broken into three phases.

```css
/* Phase structure */
.fan-submit-btn {
  position: relative; overflow: hidden;
  min-height: var(--tap-min);
  background: var(--color-accent);
  border-radius: var(--r-sm);
  transition: transform var(--dur-instant) ease-out;
}

.fan-submit-btn .btn-label,
.fan-submit-btn .btn-spinner,
.fan-submit-btn .btn-check {
  position: absolute;
  inset: 0;
  display: flex; align-items: center; justify-content: center;
  transition: opacity var(--dur-fast) var(--ease-standard);
}

.fan-submit-btn .btn-spinner { opacity: 0; }
.fan-submit-btn .btn-check   { opacity: 0; }

/* States */
.fan-submit-btn.loading .btn-label   { opacity: 0; }
.fan-submit-btn.loading .btn-spinner { opacity: 1; }

.fan-submit-btn.success .btn-spinner { opacity: 0; }
.fan-submit-btn.success .btn-check   { opacity: 1; }

/* Spinner */
.spinner-ring {
  width: 20px; height: 20px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  animation: spin 700ms linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Error shake */
.fan-email-input.error {
  border-color: var(--color-state-live);
  animation: errorShake var(--dur-slow) cubic-bezier(0.36, 0.07, 0.19, 0.97);
}
@keyframes errorShake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-8px); }
  40%       { transform: translateX(8px); }
  60%       { transform: translateX(-5px); }
  80%       { transform: translateX(5px); }
}
```

```js
async function handleFanSignup(email, artistName, btn, input) {
  // Phase 1: Loading (instant)
  btn.classList.add('loading');

  // Optimistic: assume success
  // Background: validate format
  if (!isValidEmail(email)) {
    btn.classList.remove('loading');
    input.classList.add('error');
    input.addEventListener('input', () => input.classList.remove('error'), { once: true });
    return;
  }

  // Phase 2: Success (300ms after loading)
  setTimeout(() => {
    btn.classList.remove('loading');
    btn.classList.add('success');

    // Phase 3: Confetti
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      burstConfetti(btn);
    }

    // Phase 4: Echo (after 400ms)
    setTimeout(() => {
      showEmailEcho(email, artistName);
    }, 400);
  }, 300);

  // Background API call (localStorage for now, Supabase later)
  try {
    saveFan(email);
  } catch (e) {
    // Rollback if needed (rare edge case)
    console.warn('Fan save failed:', e);
  }
}

function showEmailEcho(email, artistName) {
  const section = document.querySelector('.fan-capture-section');
  const sanitized = email.replace(/[<>]/g, '');
  section.innerHTML = `
    <p class="confirm-text">
      We've got you —
      <span class="confirm-email">${sanitized}</span>
      is on ${artistName}'s list.
    </p>
    <p class="confirm-sub">I'll reach out when something's actually happening.</p>
  `;
  section.style.opacity = '0';
  section.style.transition = `opacity var(--dur-mid) var(--ease-standard)`;
  requestAnimationFrame(() => { section.style.opacity = '1'; });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

---

### Pattern 7 — Confetti burst (40 particles, artist accent colour)

```js
function burstConfetti(originEl) {
  const rect = originEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const root = document.documentElement;
  const accentRgb = getComputedStyle(root)
    .getPropertyValue('--color-accent-rgb').trim() || '224,82,66';

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 40; i++) {
    const dot = document.createElement('span');
    const angle = (Math.random() * 120 - 60) * (Math.PI / 180);
    const speed = Math.random() * 200 + 80;
    const vx = Math.sin(angle) * speed;
    const vy = -(Math.cos(angle) * speed);
    const size = Math.random() * 5 + 4;
    const colour = Math.random() > 0.45 ? `rgb(${accentRgb})` : '#ffffff';
    const duration = 1100 + Math.random() * 400;

    dot.style.cssText = [
      `position: fixed`,
      `left: ${cx}px`,
      `top: ${cy}px`,
      `width: ${size}px`,
      `height: ${size}px`,
      `border-radius: 50%`,
      `background: ${colour}`,
      `pointer-events: none`,
      `z-index: 9999`,
    ].join(';');

    fragment.appendChild(dot);

    dot.animate([
      { transform: 'translate(0, 0)', opacity: 1 },
      { transform: `translate(${vx}px, ${vy + 90}px)`, opacity: 0 }
    ], {
      duration,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      fill: 'forwards'
    }).finished.then(() => dot.remove());
  }

  document.body.appendChild(fragment);
}
```

---

### Pattern 8 — Campaign state crossfade (asymmetric, ambient-aware)

```js
function transitionCampaignState(newState, heroContentEl, ambientEl) {
  // Phase 1: Fade out current content (fast — 150ms)
  heroContentEl.style.transition = `opacity 150ms var(--ease-standard)`;
  heroContentEl.style.opacity = '0';

  setTimeout(() => {
    // Apply new state (DOM update happens while invisible)
    applyCampaignState(newState, heroContentEl);

    // Phase 2: Fade in new content (slower — 250ms)
    heroContentEl.style.transition = `opacity 250ms var(--ease-standard)`;
    heroContentEl.style.opacity = '1';

    // Transition ambient glow colour simultaneously
    if (ambientEl) {
      const glowClass = {
        'pre-release': 'glow-pre',
        'live':        'glow-live',
        'gig':         'glow-gig',
        'profile':     'glow-profile'
      }[newState] || 'glow-profile';

      ambientEl.className = `ambient-glow ${glowClass}`;
    }
  }, 150);
}
```

```css
/* Ambient glow states — uses opacity transition only */
.ambient-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  transition: opacity var(--dur-mid) var(--ease-standard);
  will-change: opacity;
}

.ambient-glow::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    ellipse at top,
    rgba(var(--color-ambient), 0.25) 0%,
    transparent 65%
  );
  animation: glowBreathe 4s ease-in-out infinite;
}

@keyframes glowBreathe {
  0%, 100% { opacity: 0.8; }
  50%       { opacity: 1.0; }
}

.ambient-glow.glow-gig::after {
  animation-duration: 2.5s; /* Faster in gig mode */
}

@media (prefers-reduced-motion: reduce) {
  .ambient-glow::after { animation: none; opacity: 0.9; }
  [data-theme="light"] .ambient-glow::after { opacity: 0; }
}
```

---

### Pattern 9 — Error shake on invalid email

```css
@keyframes errorShake {
  0%, 100% { transform: translateX(0); }
  15%       { transform: translateX(-8px); }
  35%       { transform: translateX(8px); }
  55%       { transform: translateX(-5px); }
  75%       { transform: translateX(5px); }
}

.field-error {
  border-color: var(--color-state-live) !important;
  animation: errorShake var(--dur-slow) cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

.field-error-message {
  font-size: var(--text-sm);
  color: var(--color-state-live);
  margin-top: var(--sp-2);
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity var(--dur-fast) var(--ease-decel) 300ms,
              transform var(--dur-fast) var(--ease-decel) 300ms;
  /* Delayed: appears 300ms after the shake */
}

.field-error + .field-error-message {
  opacity: 1;
  transform: translateY(0);
}
```

```js
function shakeField(inputEl, messageEl, message) {
  inputEl.classList.add('field-error');
  messageEl.textContent = message;
  messageEl.classList.add('visible');

  // Auto-clear on retype
  inputEl.addEventListener('input', () => {
    inputEl.classList.remove('field-error');
    messageEl.classList.remove('visible');
  }, { once: true });

  // Remove animation class after it fires so it can fire again
  inputEl.addEventListener('animationend', () => {
    inputEl.classList.remove('field-error');
    // But keep the error border state via a separate .input-invalid class
  }, { once: true });
}
```

---

### Pattern 10 — Live state pulsing dot

```css
.live-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-state-live, #ef4444);
  animation: liveBreathe 2s ease-in-out infinite;
  will-change: opacity, transform; /* GPU-composited */
}

@keyframes liveBreathe {
  0%, 100% {
    opacity: 1;
    transform: scale(1.0);
  }
  50% {
    opacity: 0.4;
    transform: scale(0.75);
  }
}

/* Gig mode variant: slightly faster, warmer */
[data-state="gig"] .live-dot {
  animation-duration: 1.8s;
  background: var(--color-state-gig, #8b1e1e);
}

@media (prefers-reduced-motion: reduce) {
  .live-dot {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

---

## Part 6 — Vibe-specific interaction adjustments

Not all 7 vibes should feel identical in motion. These are multipliers on the base system.

| Vibe | Animation feel | Timing adjustment | Spring character |
|---|---|---|---|
| Electronic/Club | Precise, sharp, instant | `--dur-mid: 180ms` | Spring overshoot +10% (more tension) |
| Hip Hop/Rap | Confident, weighted | `--dur-mid: 220ms` | Spring overshoot +5% |
| R&B/Soul | Smooth, lingering | `--dur-mid: 320ms` | Spring overshoot -5% (softer settle) |
| Indie/Alt | Unhurried, natural | `--dur-mid: 280ms` | Minimal spring; more decel |
| Pop | Energetic, bright | `--dur-mid: 200ms` | Spring overshoot +8% |
| Rock/Metal | Blunt, no-nonsense | `--dur-mid: 160ms` | Almost no spring; straight decel |
| Acoustic/Folk | Gentle, warm | `--dur-mid: 350ms` | Very soft spring; like breath |

Implementation: override `--dur-mid` and `--ease-spring` via the vibe class. Keep `--dur-instant` (80ms) and `--dur-fast` (150ms) constant — these are below the perception threshold.

```css
/* Example — Electronic vibe override */
.vibe-electronic {
  --dur-mid: 180ms;
  --ease-spring: cubic-bezier(0.30, 1.70, 0.58, 1); /* more tension */
}

/* Acoustic/Folk vibe override */
.vibe-acoustic {
  --dur-mid: 350ms;
  --ease-spring: cubic-bezier(0.34, 1.30, 0.64, 1); /* softer settle */
}
```

---

## Part 7 — Theme-specific interaction rules

| Theme | Specific adjustments |
|---|---|
| Dark (default) | All patterns as specified. Ambient glow active. |
| Light | Disable ambient glow breathing (`prefers-color-scheme` check). Gig flash at `rgba(0,0,0,0.1)` not accent. Confetti uses darker accent variant. |
| Glass | Glass depth on press (H5) active. Ambient glow most prominent. Panel backdrop uses `backdrop-filter`. Name gloss pass active. |
| Contrast | All animations still run. No glow effects (they'd reduce contrast). Focus ring extra thick: `outline: 3px solid var(--color-accent)`. |

---

## Part 8 — Performance budget per interaction

All interactions must meet the 60fps / INP ≤ 200ms law from V6_BUILD_AUTHORITY.md §4.

| Interaction | GPU cost | Main thread cost | Notes |
|---|---|---|---|
| Scale + opacity transitions | Zero (compositor only) | Zero | Safe for any frequency |
| `transform: translateX/Y` | Zero (compositor only) | Zero | Safe for any frequency |
| Ambient glow breathing (opacity) | Zero | Zero | `will-change: opacity` ensures compositor |
| Confetti (Web Animations API) | Low (40 elements, 1.2s) | Low | Avoid if >80 elements |
| Shimmer skeleton (background-position) | Low (one layer) | Zero | Synchronised = single GPU layer |
| `backdrop-filter` (glass theme) | High (per element) | Zero | Only on glass theme; not in loops |
| Canvas artwork extraction | Medium (one-time, async) | Low | Runs post-load; never blocks render |
| `box-shadow` (static, not animated) | Low (on paint only) | Low | Never animate in a loop |
| Digit flip (rotateX, backface-visibility) | Low | Zero | Max 8 elements simultaneously |
| Scroll listeners | Low | Medium | Always `requestAnimationFrame`-throttled |

---

*End of master document. For canonical build priorities, see V6_BUILD_AUTHORITY.md §7.2 (Phase 1) and §7.3 (Phase 2). This document extends and cross-references that authority — it does not override it.*
