# ABLE — 100 Pre-Launch Dimensions
**Created: 2026-03-17**
**Current product score: 7.4/10 (GPT review, 2026-03-16)**
**Target: 10/10 across all 100 dimensions before first real user**

> Each dimension is a domain that will receive its own 100-point audit when we reach it.
> Work them in the MASTER SEQUENCE order below — not category order.
> GPT review insights are incorporated throughout.

---

## THE 100 DIMENSIONS

### Category A — Visual Design & Design System

**A1. Token completeness**
Every CSS value across all four pages traces back to a named design token. No hardcoded hex, rem, or opacity value outside a token declaration. Zero exceptions.

**A2. Two-surface separation**
Surface 1 (profile, landing, onboarding) and Surface 2 (admin) are architecturally distinct. No `--dash-*` token bleeds into Surface 1; no `--color-*` token bleeds into Surface 2.

**A3. Shadow and depth system**
`--shadow-card`, `--shadow-lift`, `--shadow-glow` tokens defined and correctly applied across all four themes including Glass and Contrast, where they are currently inconsistent.

**A4. Icon system consistency**
All inline SVGs follow a single source library, use defined size tokens, and share a common stroke weight. No mix of arbitrary 20/22/24px values.

**A5. Component inventory**
Every reusable component (button, pill, card, bottom sheet, stat card, snap card, gold lock overlay) is implemented once and not reimplemented per page with slight variations.

**A6. Vibe system integrity**
All seven vibes (Electronic, Hip Hop, R&B, Indie, Pop, Rock, Acoustic) produce a fully coherent page. No vibe leaves a default token unset.

**A7. Artist accent derivation**
`applyDerivedTokens()` correctly derives on-accent text colour, accent-RGB, radius multiplier, and ambient tint from a single `--color-accent` variable. Tested against all seven vibes.

**A8. Border radius system**
All radius values use `--r-sm/md/lg/xl/pill` tokens. No arbitrary `border-radius` values in any rule.

**A9. Elevation consistency**
Cards, modals, tooltips, and bottom sheets each sit at a consistent and correct elevation relative to the page. No two unrelated components share the same z-index.

**A10. Cross-page visual coherence**
A user moving from landing → onboarding → profile → admin experiences visual continuity. No jarring font, colour, or motion style jumps between pages.

---

### Category B — Typography & Spacing

**B1. Type scale completeness**
A defined scale (`--text-xs` through `--text-5xl`) covers every font-size used. No arbitrary pixel values outside the scale. All four pages use the same scale.

**B2. Font loading efficiency**
Only font weights actually used are loaded. Unused weights removed. Font display strategy (`swap` or `optional`) set correctly per use case.

**B3. Display font usage rules**
Barlow Condensed (hero names, stat values, countdowns) used consistently and never for body copy. Plus Jakarta Sans (admin) and DM Sans (profile) never cross-contaminate.

**B4. Landing font alignment**
Landing page currently uses a different editorial font from the rest of the product. Deliberate or drift — documented and resolved either way.

**B5. Line height system**
All line heights use one of three defined values: tight (1.1–1.2 for display), reading (1.5–1.65 for body), loose (1.7–1.8 for long-form). No arbitrary values.

**B6. Spacing scale completeness**
All padding, margin, and gap values use `--sp-N` tokens. No raw pixel/rem values outside the scale across all four pages.

**B7. Section rhythm consistency**
Vertical spacing between sections follows a consistent hierarchy. No sections feel too tight or too loose relative to their neighbours on the same page.

**B8. Mobile type scaling**
No text below 12px anywhere. No input text below 16px (prevents iOS auto-zoom). Hero text scales gracefully from 375px to 430px without overflow.

**B9. Letter-spacing consistency**
All uppercase label text uses defined letter-spacing values (0.08–0.14em). No pixel-based letter-spacing anywhere. Eyebrows, stat labels, and section labels all consistent.

**B10. Paragraph measure**
Long-form body text (bios, FAQ answers, landing sub-copy) constrained to 60–75 characters per line max. No lines wider than readable measure.

---

### Category C — Colour, Contrast & Themes

**C1. WCAG AA contrast compliance**
Every text/background combination meets 4.5:1 minimum (normal text) or 3:1 (large text). Verified across all four themes (Dark, Light, Glass, Contrast).

**C2. Light theme completeness**
The Light theme is fully specified and tested on all four pages. No element that looks correct in Dark looks broken in Light.

**C3. Glass theme completeness**
The Glass theme (backdrop-filter: blur(28px)) works correctly on all surfaces. Fallback for browsers without backdrop-filter support is implemented.

**C4. Contrast theme completeness**
The Contrast theme meets WCAG AAA (7:1) on all interactive elements. Pure black backgrounds with maximum-contrast text throughout.

**C5. Admin light-mode palette**
Admin uses a warm cream palette (`--dash-bg: #e4dfd7`). All admin text/background pairs meet WCAG AA. The palette is tested in real daylight conditions (cream + amber can fail outdoors).

**C6. Accent colour accessibility**
The artist-set accent colour has a minimum luminance constraint enforced. No accent colour can be set that would fail contrast on the fan capture button. Enforced in `applyDerivedTokens()`.

**C7. Focus ring visibility**
The three-layer focus ring is visible across all four themes, including against accent-coloured backgrounds and on the glass theme.

**C8. Status colour system**
State colours (live/pre/gig/stream) are distinguishable for colour-blind users. Not relying on hue alone — shape, weight, or label also differentiates states.

**C9. Hardcoded value elimination**
Zero hardcoded hex values in CSS rules across all four pages. Every colour references a token. Verified by grep.

**C10. Dark mode media query**
If a system dark/light preference is detected, the correct ABLE theme is applied by default. Artists' theme choice persists in localStorage and overrides the system preference.

---

### Category D — Copy, Voice & Messaging

**D1. Banned phrase compliance**
Every text string on every page and email audited against the ABLE banned phrase list. Zero instances of: "superfans", "grow your audience", "monetise", "engage your followers", "content creator", "going viral", exclamation marks on dashboard copy.

**D2. Campaign state copy coverage**
All four campaign states (profile / pre-release / live / gig) have unique, correct copy on every surface: fan capture heading, fan capture CTA, fan trust text, artist profile hero, admin campaign label, fan confirmation email subject.

**D3. First-person artist voice**
All copy on the artist profile page reads as first-person artist voice, not platform voice. "I'm playing tonight" not "This artist is performing tonight."

**D4. CTA verb directness**
Every action button uses a direct, specific verb. No "Go", "Continue", "Submit", "OK". Verified across all 4 pages and all emails.

**D5. Onboarding copy progression**
Each onboarding step feels like movement toward something real, not form-filling. Step labels, hints, and progress copy all use the ABLE voice. No SaaS micro-copy.

**D6. Empty state copy**
Every empty state on admin.html teaches the artist what to do next and why it matters. No blank panels, no "No data yet" without context.

**D7. Error state copy**
Every error message (form validation, API failure, network error) maintains the ABLE voice. No "Something went wrong." No technical error codes surfaced to users.

**D8. Tier gate copy**
Every gold lock overlay names the specific thing the artist gets when they upgrade. No generic "Upgrade to unlock". Verified across all locked features.

**D9. Landing page headline conversion**
The landing page above-the-fold copy leads with felt artist pain ("300,000 people through your bio. Nothing to show for it."), not strategic ownership argument. GPT confirmed: emotional trigger > strategic argument for cold acquisition.

**D10. Cross-page vocabulary consistency**
"Snap cards" vs "Updates" vs "Moments" — one term, used everywhere. Campaign mode vocabulary consistent between admin (where artists set it) and profile (where fans see it). All instances verified.

---

### Category E — Mobile UX & Touch

**E1. Tap target completeness**
Every interactive element — buttons, links, toggles, form fields, icon buttons — has a minimum 44×44px tap target. Verified at 375px and 390px.

**E2. Thumb zone mapping**
Primary CTAs (fan sign-up, campaign state toggle, save changes) sit in the bottom two-thirds of the screen on 390px iPhone. Nothing critical requires the top 20% of screen in portrait.

**E3. iOS Safari fixed positioning**
No fixed-position elements shift when the iOS keyboard appears. No content jumps on keyboard open/close. Bottom nav bar account for safe-area-inset-bottom.

**E4. Input type correctness**
Email fields: `type=email`. Phone fields: `type=tel`. Number fields: `type=number`. URL fields: `type=url`. Date fields: `type=date`. All verified. Correct keyboard appears on mobile for each.

**E5. iOS auto-zoom prevention**
All input font sizes are 16px or larger. iOS will not auto-zoom the viewport when any field is focused.

**E6. Scroll behaviour**
No scroll-jank on any page. No content layout shift during scroll. Parallax or sticky elements don't cause visual glitches on iOS.

**E7. Portrait and landscape**
All four pages are usable in landscape mobile. Nothing breaks, overflows, or disappears at 667×375 (iPhone landscape).

**E8. Slow network UX**
On a throttled 3G connection, every async action shows feedback within 300ms of tap. Loading skeletons or spinners present for all data-fetching operations.

**E9. Gesture conflict prevention**
No swipe areas in the product conflict with the browser back/forward gesture. Bottom sheets use vertical swipe only. No horizontal swipe cards that sit at the viewport edge.

**E10. Fan sign-up form friction**
The fan email capture form is single field, auto-focuses correctly, submits on return key, has a 44px submit button, and shows success state within 200ms of submission. The fastest possible path from intent to signed up.

---

### Category F — Interaction States & Motion

**F1. Hover state completeness**
Every interactive element has a defined hover state. No element changes nothing on hover. Verified across all four pages.

**F2. Active/pressed state**
Every tappable element has a pressed state (scale 0.97 or opacity reduction). Spring easing applied. Verified on mobile where hover doesn't fire.

**F3. Focus state completeness**
Three-layer focus ring applied to every focusable element across all four pages. No element loses its focus ring due to `outline: none` without a replacement.

**F4. Loading state completeness**
Every operation that takes >100ms has a loading state. Skeleton screens for data, spinner or pulse for actions, progress for multi-step flows.

**F5. Success state completeness**
Every form submission, save action, and destructive action has a success confirmation. Not just a state change — a moment of ceremony proportional to the action's importance.

**F6. Disabled state**
Disabled buttons and inputs are visually distinct (40% opacity minimum), not interactive, and have `aria-disabled` set. Not just `opacity: 0.5` with no aria attribute.

**F7. Transition timing consistency**
All transitions use `--dur-fast` (0.14s), `--dur` (0.16s), or `--dur-slow` (0.22s). No raw `0.15s`, `0.3s`, or `0.2s` values in transition rules. Verified by grep.

**F8. Spring easing usage**
Spring easing (`cubic-bezier(0.34,1.56,0.64,1)`) used only for physical/spatial movements (cards appearing, sheet opening, button press). Decel easing for UI state changes. No spring on opacity transitions.

**F9. Reduced-motion compliance**
All animations and transitions respect `prefers-reduced-motion: reduce`. Every `@keyframes` animation has a reduced-motion override. Tested with system preference set.

**F10. No transition: all**
Zero instances of `transition: all` in any CSS rule across all four pages. Every transition explicitly names the properties it affects. Verified by grep — count must be 0.

---

### Category G — Core Product Logic & User Flows

**G1. Campaign state transitions**
All four states (profile / pre-release / live / gig) transition correctly based on: release date in future (pre-release), release date reached (live), 14 days post-release (profile), manual gig toggle (gig). Auto-switch logic tested at each boundary.

**G2. Fan capture deduplication**
A fan signing up with the same email address twice does not create a duplicate entry. The second attempt is handled gracefully with a correct message. Existing email returns a different confirmation than a new sign-up.

**G3. CTA deduplication enforcement**
The global dedupe rule is enforced: the same URL cannot appear in both Hero CTAs and Quick Action pills. If added to Hero, it is removed from pills and vice versa. Tested in admin.html.

**G4. Gig mode expiry**
Gig mode automatically expires after 24 hours. The expiry is tested: set gig mode, advance clock, verify profile returns to correct previous state (not profile — previous state).

**G5. Release date edge cases**
Artist sets release date in past: profile goes to "live" mode, then to "profile" after 14 days. Artist sets release date in future then changes it: state recalculates correctly. Timezone handling is documented.

**G6. Tier gate enforcement**
Every feature behind a tier gate actually gates. Tested: free tier cannot access features gated at Artist or Artist Pro. Pro features show gold lock overlay, not just absent from the DOM.

**G7. localStorage schema integrity**
All localStorage keys match the canonical schema in `docs/systems/data-architecture/SPEC.md`. No key has been renamed. Reading a profile written by start.html in admin.html produces correct output.

**G8. Analytics event fidelity**
Every CTA tap, page view, fan sign-up, and campaign state change fires an analytics event. Events include correct properties: label, type, timestamp, source attribution. No duplicate events on double-tap.

**G9. Source attribution capture**
`?ref=` and `?source=` parameters are captured on page load and stored with fan sign-up events and click events. UTM parameters are also stored. All attribution paths from the GPT-confirmed acquisition mechanic (producer → artist → fan) are tracked.

**G10. First-visit state**
The artist profile has first-visit awareness. An artist visiting their own profile for the first time (detected via localStorage) sees a different CTA: "This is your page — share it" rather than the fan-facing experience. Admin.html first-visit shows onboarding nudges.

---

### Category H — Security, Data & Performance

**H1. XSS prevention**
All user-generated content rendered in the DOM is escaped. `innerHTML` is never used with untrusted data. `textContent` used for text nodes. `escHtml()` applied to all profile fields before render. Verified by code review.

**H2. Content Security Policy**
Netlify `_headers` file sets a restrictive CSP. `script-src` allows only ABLE's own scripts and defined CDN sources (Google Fonts, Supabase). `img-src` includes only known image hosts. No `unsafe-eval` or `unsafe-inline` in `script-src`.

**H3. Supabase key handling**
Only the anon/public key (`sb_publishable_*`) appears in frontend code. No service key, JWT secret, or management key. Verified by grep across all HTML, JS, and config files.

**H4. oEmbed SSRF protection**
The Spotify import Netlify function validates the incoming URL against an allowlist of known streaming platform hostnames before making any outbound request. No arbitrary URL fetching.

**H5. Input validation**
All Netlify function inputs are validated server-side: email format, string length limits, allowed characters. No reliance on client-side validation alone. Tested with malformed inputs.

**H6. localStorage quota handling**
When localStorage approaches the 5MB browser limit, the application handles it gracefully. Old click events are pruned. The artist's core profile and fan list are preserved. No uncaught `QuotaExceededError`.

**H7. First Contentful Paint**
FCP under 2 seconds on a 4G mobile connection. Google Fonts loaded with `font-display: swap`. No render-blocking scripts in `<head>`. Critical CSS inlined where needed.

**H8. Image optimisation**
All static images (OG cards, icons, artwork placeholders) are WebP format with JPEG fallback. Artwork loaded via Unsplash with correct `?w=` and `?q=` parameters. No unoptimised full-resolution images.

**H9. JavaScript error handling**
All async operations have try/catch. `JSON.parse()` on localStorage data is wrapped. No unhandled promise rejections. `console.error` logs all caught errors in development.

**H10. Data migration readiness**
Every localStorage key maps 1:1 to a Supabase table column. The migration is a flush-to-API call, not a transform. Schema documented in `docs/systems/data-architecture/SPEC.md` and verified against current localStorage usage.

---

### Category I — Legal, Compliance & Accessibility

**I1. GDPR consent mechanism**
Fan sign-up form includes a clear consent statement. The artist is named as the data controller. ABLE is named as the processor. The statement is in plain English. No pre-ticked boxes.

**I2. Privacy policy completeness**
`privacy.html` exists and is linked from the fan capture form. It covers: data controller identity, what data is collected, how it is used, how to unsubscribe, how to export, how to delete. GDPR Article 13 compliant.

**I3. Fan data export**
Artists can export their entire fan list as a CSV from admin.html at any time, on any tier. Export includes: email, signup timestamp, source attribution, campaign state at signup. No fan data is held hostage.

**I4. Fan unsubscribe**
Fans can unsubscribe from an artist's list. Unsubscribe link in every email. Unsubscribe removes them from `able_fans` localStorage and (when Supabase lands) from the database. Confirmed as permanent.

**I5. Cookie handling**
No non-essential cookies set without consent. localStorage is first-party and does not require a cookie banner under UK GDPR guidance. If any third-party analytics cookies are added, a consent mechanism is required first.

**I6. Keyboard navigation**
Every page is fully navigable by keyboard alone. Tab order is logical and follows visual order. No focus traps except in modals (where they are intentional and escapable via Escape key).

**I7. Screen reader compatibility**
Every page passes a VoiceOver (iOS/Mac) check. All images have `alt` text or `aria-hidden="true"`. All icons have `aria-label`. Dynamic content changes are announced via `aria-live` regions.

**I8. ARIA correctness**
All ARIA roles, states, and properties are used correctly. `aria-expanded` on accordions. `aria-selected` on tabs. `role="alert"` on error messages. No ARIA used for decoration. No incorrect role assignments.

**I9. Form accessibility**
Every form field has a visible or screen-reader-accessible label. Error messages are associated with their field via `aria-describedby`. Required fields are marked with `aria-required`. Fieldsets used for related inputs.

**I10. Terms of service**
`terms.html` exists and covers: acceptable use, content ownership, fan data ownership (artist owns it), ABLE's right to suspend, liability limitations. Reviewed against UK consumer law requirements.

---

### Category J — Launch Readiness & Cross-Page Coherence

**J1. Email deliverability**
Resend domain verification complete. SPF, DKIM, and DMARC records set for `ablemusic.co`. Fan confirmation email tested end-to-end: correct artist name, correct accent colour, correct campaign-state copy, correct CTA link. Not landing in spam.

**J2. PWA install**
The PWA manifest is complete. App icons at 192px and 512px are correct dimensions and not blurry. The install prompt fires at the right moment. Installed app opens correctly. Tested on real iOS and Android.

**J3. Service worker cache strategy**
SW cache version bumped. HTML pages use network-first. Static assets use cache-first. Offline fallback shows the correct page, not a browser error. Tested by toggling airplane mode.

**J4. Cross-page journey integrity**
Full end-to-end journey tested: landing → start.html → able-v8.html → admin.html. Data flows correctly between each step. No page expects data that the previous page doesn't write.

**J5. Netlify deployment**
`netlify.toml` correctly routes slugs to the artist profile. Redirects all work. Headers file sets correct security headers. Functions deploy correctly. No 404s on any route in production.

**J6. OG cards**
All four pages have correct OG meta tags. OG images exist as real files at the correct paths. Twitter card shows correctly. Tested via opengraph.xyz or similar tool.

**J7. SEO meta completeness**
All four pages have unique `<title>`, `<meta description>`, `<link rel="canonical">`. Title tags are 50–60 characters. Descriptions are 150–160 characters. No duplicate meta descriptions across pages.

**J8. Cross-browser testing**
All four pages tested in: Safari iOS 17, Chrome Android, Chrome desktop, Firefox desktop, Safari macOS. No layout breaks, JS errors, or missing features in any tested browser.

**J9. First-artist experience**
The complete first-artist journey has been walked end-to-end manually: arrive at landing → click CTA → complete onboarding wizard → see profile → open admin → add first CTA → share profile → sign up as a fan → see fan appear in admin. Every step works and feels intentional.

**J10. Documentation currency**
`docs/STATUS.md` and `CONTEXT.md` accurately reflect the current build state. No referenced files are missing. No scores are stale. The Supabase project URL and anon key are current. The active file list matches reality.

---

## MASTER SEQUENCE

Work the 100 dimensions in this exact order. Each builds on the last or unblocks the next.

### Phase 1 — Foundation (do now)
*Nothing else can be correct until these are right.*

| # | Dimension | Why first |
|---|---|---|
| 1 | **G7** — localStorage schema integrity | If data is wrong, everything built on top is wrong |
| 2 | **G1** — Campaign state transitions | Core product function — must work before visual polish |
| 3 | **G2** — Fan capture deduplication | Core product function |
| 4 | **G3** — CTA deduplication enforcement | Core product function |
| 5 | **G4** — Gig mode expiry | Core product function |
| 6 | **G5** — Release date edge cases | Core product function |
| 7 | **G6** — Tier gate enforcement | If gates don't work, free users get Pro features |
| 8 | **G8** — Analytics event fidelity | Can't measure improvement without this |
| 9 | **G9** — Source attribution capture | Attribution is the acquisition mechanic |
| 10 | **G10** — First-visit state | First impression for every new artist |

### Phase 2 — Visual (in progress)
*High conversion impact. Already executing in 8 waves.*

| # | Dimension | Why here |
|---|---|---|
| 11 | **A1** — Token completeness | Foundation for all visual consistency |
| 12 | **A8** — Border radius system | Quick win, high visual consistency |
| 13 | **A3** — Shadow and depth system | Separates elements correctly |
| 14 | **A2** — Two-surface separation | Prevents visual bleed between admin and profile |
| 15 | **A10** — Cross-page visual coherence | User journey feels intentional |
| 16 | **A6** — Vibe system integrity | Artist personalisation is a key differentiator |
| 17 | **A7** — Artist accent derivation | Derivation powers all theming |
| 18 | **A4** — Icon system consistency | Small detail, high professionalism signal |
| 19 | **A5** — Component inventory | Prevents divergence as build progresses |
| 20 | **A9** — Elevation consistency | Z-index chaos causes bugs |

### Phase 3 — Mobile UX
*90% of all traffic. Direct conversion impact.*

| # | Dimension | Why here |
|---|---|---|
| 21 | **E10** — Fan sign-up form friction | Single highest-leverage conversion action |
| 22 | **E1** — Tap target completeness | Blocks all mobile interaction |
| 23 | **E2** — Thumb zone mapping | Primary CTAs must be reachable |
| 24 | **E5** — iOS auto-zoom prevention | Prevents broken form experience on iOS |
| 25 | **E4** — Input type correctness | Wrong keyboard = friction |
| 26 | **E3** — iOS Safari fixed positioning | Common iOS-specific breakage |
| 27 | **E6** — Scroll behaviour | Jank destroys premium feel |
| 28 | **E8** — Slow network UX | Most artists' fans are on phones with variable signal |
| 29 | **E9** — Gesture conflict prevention | Breaks native navigation feel |
| 30 | **E7** — Portrait and landscape | Gig mode used in venues with varied phone orientation |

### Phase 4 — Copy & Voice
*Highest conversion lever after mobile. GPT confirmed: emotional trigger > strategic argument.*

| # | Dimension | Why here |
|---|---|---|
| 31 | **D9** — Landing page headline conversion | First impression for cold traffic |
| 32 | **D1** — Banned phrase compliance | Trust damage if any banned phrase survives |
| 33 | **D3** — First-person artist voice | Profile copy that reads as platform is a trust failure |
| 34 | **D2** — Campaign state copy coverage | Core product copy — all 4 states on all surfaces |
| 35 | **D4** — CTA verb directness | Every ambiguous verb loses conversions |
| 36 | **D6** — Empty state copy | Artists who see blank panels churn |
| 37 | **D7** — Error state copy | Errors in wrong voice break trust |
| 38 | **D8** — Tier gate copy | Each gate must name the specific value |
| 39 | **D5** — Onboarding copy progression | Completion rate determines activation |
| 40 | **D10** — Cross-page vocabulary consistency | "Snap cards" vs "Updates" confusion |

### Phase 5 — Typography & Spacing
*Professionalism signal. Premium feel.*

| # | Dimension | Why here |
|---|---|---|
| 41 | **B8** — Mobile type scaling | Already covered in mobile phase but verify typography |
| 42 | **B1** — Type scale completeness | Foundation for all type decisions |
| 43 | **B6** — Spacing scale completeness | All spacing from tokens |
| 44 | **B7** — Section rhythm consistency | Page breathes correctly |
| 45 | **B3** — Display font usage rules | No font cross-contamination |
| 46 | **B4** — Landing font alignment | Fraunces/Barlow gap between landing and product |
| 47 | **B2** — Font loading efficiency | Remove unused weights |
| 48 | **B5** — Line height system | Readability of bios and long copy |
| 49 | **B9** — Letter-spacing consistency | All labels consistent |
| 50 | **B10** — Paragraph measure | Long copy readable |

### Phase 6 — Colour & Contrast
*Accessibility + premium feel.*

| # | Dimension | Why here |
|---|---|---|
| 51 | **C1** — WCAG AA contrast compliance | Legal requirement and trust signal |
| 52 | **C6** — Accent colour accessibility | Artists can break their own page with a bad accent |
| 53 | **C9** — Hardcoded value elimination | All colours tokenised |
| 54 | **C7** — Focus ring visibility | Accessibility blocker |
| 55 | **C5** — Admin light-mode palette | Cream + amber can fail contrast in daylight |
| 56 | **C2** — Light theme completeness | Full theme coverage |
| 57 | **C3** — Glass theme completeness | Key differentiator feature |
| 58 | **C4** — Contrast theme completeness | WCAG AAA for users who need it |
| 59 | **C8** — Status colour system | Colour-blind accessibility |
| 60 | **C10** — Dark mode media query | System preference respected |

### Phase 7 — Interactions & Motion
*Polish that converts. Premium feel that justifies the price.*

| # | Dimension | Why here |
|---|---|---|
| 61 | **F10** — No transition: all | Performance — should be zero after Wave 0 |
| 62 | **F1** — Hover state completeness | Dead elements feel broken |
| 63 | **F2** — Active/pressed state | Mobile tap feedback |
| 64 | **F3** — Focus state completeness | Accessibility and polish |
| 65 | **F4** — Loading state completeness | Async actions need feedback |
| 66 | **F5** — Success state completeness | Ceremony at key moments |
| 67 | **F7** — Transition timing consistency | All from tokens |
| 68 | **F8** — Spring easing usage | Correct motion personality |
| 69 | **F9** — Reduced-motion compliance | Accessibility requirement |
| 70 | **F6** — Disabled state | Correct aria + visual |

### Phase 8 — Security & Data
*Before any real user data is stored.*

| # | Dimension | Why here |
|---|---|---|
| 71 | **H3** — Supabase key handling | PAT in frontend is catastrophic |
| 72 | **H1** — XSS prevention | User-generated content on artist profiles |
| 73 | **H4** — oEmbed SSRF protection | Server-side function calls arbitrary URLs |
| 74 | **H5** — Input validation | All Netlify function inputs server-validated |
| 75 | **H2** — Content Security Policy | Defence in depth |
| 76 | **H6** — localStorage quota handling | Silent failure at 5MB |
| 77 | **H9** — JavaScript error handling | No unhandled promise rejections in production |
| 78 | **H7** — First Contentful Paint | Under 2s on 4G |
| 79 | **H8** — Image optimisation | WebP, correct sizing |
| 80 | **H10** — Data migration readiness | Schema verified before Supabase migration |

### Phase 9 — Legal & Accessibility
*Must be correct before first real user touches the product.*

| # | Dimension | Why here |
|---|---|---|
| 81 | **I1** — GDPR consent mechanism | Legal requirement — cannot collect without consent |
| 82 | **I2** — Privacy policy completeness | GDPR Article 13 |
| 83 | **I3** — Fan data export | GDPR right to portability — your product promise |
| 84 | **I4** — Fan unsubscribe | GDPR right to erasure |
| 85 | **I5** — Cookie handling | No non-essential cookies without consent |
| 86 | **I6** — Keyboard navigation | WCAG AA requirement |
| 87 | **I9** — Form accessibility | WCAG AA requirement |
| 88 | **I7** — Screen reader compatibility | WCAG AA requirement |
| 89 | **I8** — ARIA correctness | WCAG AA requirement |
| 90 | **I10** — Terms of service | Legal protection for both parties |

### Phase 10 — Launch Readiness
*The final gate before the first real artist.*

| # | Dimension | Why last |
|---|---|---|
| 91 | **J4** — Cross-page journey integrity | End-to-end test |
| 92 | **J9** — First-artist experience | Full manual walkthrough |
| 93 | **J1** — Email deliverability | Resend domain verified, tested end-to-end |
| 94 | **J5** — Netlify deployment | All routes, headers, functions working |
| 95 | **J2** — PWA install | Tested on real devices |
| 96 | **J3** — Service worker cache strategy | Offline tested with airplane mode |
| 97 | **J6** — OG cards | All four pages, tested with real tool |
| 98 | **J7** — SEO meta completeness | Unique titles and descriptions |
| 99 | **J8** — Cross-browser testing | Safari iOS, Chrome Android, Chrome desktop |
| 100 | **J10** — Documentation currency | STATUS.md and CONTEXT.md accurate |

---

## Notes from GPT review (2026-03-16)

These insights from the March 16 GPT session directly inform the sequencing above:

1. **Emotional trigger > strategic argument** — Landing page should lead with felt pain, not email ownership argument. Affects D9 (dimension 31 in sequence).

2. **Music-native bio link positioning** — Best single-sentence description: "A music-native bio link that turns moments of attention into owned fan relationships, while adapting automatically to the artist's release cycle." Currently not in landing.html.

3. **Email friction is solvable** — Single field, auto-focus, 44px button, submit on return. The GPT concern about email friction is valid today but solvable — affects E10 (dimension 21 in sequence).

4. **Font consistency gap** — Landing page uses a different editorial font (Fraunces/different Barlow usage) from the rest of the product. Creates quality gap on the landing→onboarding transition. Affects B4.

5. **Copy vocabulary inconsistency** — "Snap cards" vs "Updates" vs "Moments" — multiple terms in use. Affects D10.

6. **Producer acquisition mechanic** — ABLE's first artists come through producers who already have ABLE profiles (warm introduction). Cold conversion metrics are less relevant. Attribution tracking (G9) captures this.

7. **First-fan ceremony** — Already implemented in this session (admin detects first fan). Don't regress this.

8. **Near me location** — Already fixed (fan.html captures location on first Near Me visit). Don't regress.

---

*Next: when we finish the current visual wave system, we start at #1 in the master sequence — G7, localStorage schema integrity.*
