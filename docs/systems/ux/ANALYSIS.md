# ABLE UX Analysis — 20-Angle Audit
**Date: 2026-03-16**
**Status: ACTIVE — baseline audit against current build**
**Primary files audited: able-v7.html, admin.html, start.html, landing.html**

This audit is honest. Scores reflect real friction in the current build — not aspirational design intent. Use this to triage what breaks before launch versus what polishes after.

---

## Scoring key

Each angle is scored /10 with a single-sentence finding. 1–3 = broken or absent. 4–5 = functional but rough. 6–7 = works, friction visible. 8–9 = close to right, minor gaps. 10 = would ship without hesitation.

---

## 1. Onboarding flow (start.html) — 7/10

**Finding:** Three-step wizard with live preview gets to a real page fast; the split-layout (form left, phone preview right) is the right approach, but Spotify import (AS-01) is still disconnected from the UI, meaning most artists enter data manually and the "live in 5 minutes" promise strains credulity for anyone who doesn't know their exact platform URLs.

**Detail:**
- Step count (3) is appropriate. The cognitive load per step is manageable.
- Live preview updates per keystroke — correct and noticeable differentiator.
- Accent colour picker with presets is a clear delight moment. First-person payoff arrives in under 2 minutes.
- The Spotify import field exists in the spec (AS-01) but is not wired to the wizard UI — the single biggest friction point at onboarding. Artists who paste a Spotify URL and get no response will question whether the product works.
- Vibe selection (7 options) is well-implemented — each shows its display font and accent, giving artists an immediate feel for what choosing it means.
- Missing: preview is not scrollable to show below-the-fold content. Artist finishes setup without seeing what fans see below the hero.
- Copy is mostly on-register but a few generic SaaS hints in field labels ("Social links" should be named something more specific to artists).

---

## 2. First impression (able-v7.html load) — 8/10

**Finding:** The hero renders immediately from localStorage with correct accent colour, display font, and campaign state — this is genuinely strong and most link-in-bio competitors cannot match it — but the default artwork placeholder fails the aesthetic bar Maya requires, and a first-time visitor arriving before any profile data exists sees a skeleton that can sit for several seconds.

**Detail:**
- Local-first render is correctly implemented. Artists with an existing profile see their page instantly.
- Four themes all render correctly with any accent colour.
- Seven vibes apply distinct typographic personalities — the visual differentiation between an Electronic and an Acoustic profile is immediately apparent.
- The ambient artwork colour extraction works: a profile with a warm-orange album cover bleeds that warmth into the background gradient. This is the strongest visual differentiator ABLE has over Linktree/Beacons.
- Artwork placeholder (before image loads) is a generic shimmer. For the fan arriving on mobile data, a 1–2s blank rectangle below the name reduces the feeling of "this is their world."
- OG meta tags are populated from profile data but `og:image` requires server-side generation to actually render correctly in social previews — currently it points to whatever image URL is in the profile, which is fine for the artist's own artwork but won't work as a deterministic preview card.

---

## 3. Fan sign-up conversion — 6/10

**Finding:** The sign-up form is correctly placed at screenful 3, requires email only, and the CTA button text is first-person — all correct — but the heading and subtext are static regardless of campaign state, which is the single largest missed conversion opportunity in the product given that pre-release mode should be converting at 6x the baseline.

**Detail:**
- Form placement (after hero, bio, pills) is correct per V6_BUILD_AUTHORITY.md §8.1.
- Email-only field: correct. `type="email"`, `inputmode="email"`, `autocomplete="email"` all set.
- Current heading is a static "Stay close." — this is correct for profile state. For pre-release and gig states it is a missed opportunity. Research shows state-contextualised copy converts at 6x baseline in pre-release.
- The CTA button label varies by state in the spec but the current implementation uses a single static string in several states.
- No second sign-up capture at page bottom — spec calls for a secondary placement as a catch-all for fans who read everything. This is absent.
- Confirmation message appears immediately after submit (optimistic) — correct.
- The GDPR consent checkbox exists and `consent: true` is stored — compliant.
- The word "newsletter" does not appear anywhere — correct.

---

## 4. CTA hierarchy — 8/10

**Finding:** Hero CTA → Quick Action pills → Section Actions are correctly implemented with the right visual weight hierarchy; primary CTA (accent fill, full width, 56px) dominates clearly; the deduplication rule that prevents the same URL appearing in multiple zones is implemented; but the secondary CTA (ghost) visually competes with Quick Action pills in some theme/vibe combinations.

**Detail:**
- Primary CTA: correct shape (`--r-sm`, not pill), correct fill, correct height. This is the right call and visually distinct from link-in-bio competitors.
- Secondary CTA: ghost treatment is correct but on Dark theme with warm amber accents, the ghost border is faint enough that some users may miss it entirely.
- Quick Action pills: horizontal scroll with overflow indicator is correct mobile behaviour. "More" overflow toggle is implemented.
- Max 4 narrow / 6 wide cap is enforced.
- The global deduplication is implemented at the data layer.
- On screens narrower than 375px the hero CTAs stack correctly.
- One gap: there is no explicit visual cue that Quick Action pills are scrollable when they overflow. A right-side fade gradient would signal scrollability.

---

## 5. Campaign state UX — 9/10

**Finding:** The four states (profile/pre-release/live/gig) each render with distinctly different hero content, badge, and CTA copy — a fan landing in pre-release sees a countdown and pre-save CTA, in gig mode sees "On tonight" and a ticket CTA — the state machine is correctly implemented and auto-switches; only the visual transition between states is abrupt rather than crossfaded.

**Detail:**
- State machine (`computeState()`) is implemented per spec. Auto-switch at release date and 14 days post-release works.
- Gig mode: 24-hour timer, manual toggle, "On tonight" badge — all built. Auto-expiry is implemented.
- Pre-release countdown: correct. Far-future formatting (shows date not granular countdown) is partially implemented — needs audit per EC-10.
- State chip is visible in the hero across all themes.
- The 150ms crossfade between states (spec §7.2 item 9) is not confirmed implemented — state change appears to be an immediate DOM swap.
- The `--color-state-gig` deep red (`#8b1e1e`) is used exclusively for gig state — correct, earns its meaning.
- Tonight note field (free-text artist voice for gig mode) exists and is displayed prominently — this is the highest-leverage single addition to gig UX and it is built.

---

## 6. Navigation / findability — 7/10

**Finding:** The bottom tab bar gives fans 5 entry points and the spec's "3 taps to any critical action" rule is met for the fan journey; however, tabs for Home/Listen/Shows/Snap/Support are not clearly labelled in ways that tell a first-time visitor what they'll find, and on debut-visit the artist's name is not persistent in the nav, so a fan who arrived via share link has no anchor to confirm they're on the right profile.

**Detail:**
- Bottom tab bar is fixed and correctly hides on downscroll (200ms, accel) and reveals on upscroll (200ms, decel) per spec.
- Tab icons are recognisable but labels are small — on iPhone SE screen widths (320px) the label text at `--text-xs` (11px) requires good eyesight to read.
- No search within the profile (appropriate — this is a single artist page).
- The artist's name appears in the hero but scrolls off the screen. No sticky artist name in the top bar for fans who have scrolled deep.
- Fans arriving at a specific section via a deep link (e.g. `#shows`) land correctly — anchor navigation is implemented.
- The tab scroll-to-top on re-tap is in spec but not confirmed implemented in current build.

---

## 7. Empty states — 6/10

**Finding:** Empty states for Music, Shows, and Merch correctly hide the sections rather than showing a shell — the right call — but the admin-side empty state copy is partially non-compliant (some sections still show generic placeholder text rather than artist-voice copy per EC-01/AS-18), and the fan-facing empty state for a brand-new profile has not been fully audited.

**Detail:**
- Music section: hides entirely if no releases — correct.
- Shows section: hides if no events — correct.
- Fan sign-up: always visible regardless of content — correct, this section has no dependency on other data.
- Admin dashboard empty states are where the gap is. Several sections (Snap Cards, Connections, Broadcasts) show empty state copy that reads as generic SaaS ("No snap cards added yet.") rather than artist-voice ("Nothing posted yet. Add something real.").
- The "first fan sign-up" empty state in the fan list (admin) is warm and specific — one of the better empty states in the product.
- Edge case: an artist with no bio, no photo, no releases, no shows — the profile still renders with name and sign-up form. This passes the minimum bar but does not look professional enough for Maya to put in her Instagram bio.

---

## 8. Error handling — 5/10

**Finding:** Network errors from Supabase are silently suppressed in several places (localStorage write succeeds, Supabase write fails invisibly), user-facing validation errors exist for the fan sign-up form but use aggressive red-error styling rather than inline guidance, and there is no graceful handling visible for the "no localStorage access" edge case (private browsing mode in Safari).

**Detail:**
- Fan sign-up validation: correct field validation with shake animation on bad email. Suppresses error on retype (good).
- Supabase write failures: the optimistic UI (confetti fires immediately) is correct UX design, but there is no background retry or queued write for fans who sign up offline or during a Supabase outage. Data is lost silently.
- Safari private browsing: `localStorage.setItem` throws in certain Safari private browsing configurations. No `try/catch` around localStorage operations has been confirmed — this would cause silent JS errors that break the sign-up flow.
- Admin error states: form saves in admin that fail Supabase write show a generic error toast, not a specific message.
- 404 for unknown artist handles: there is no confirmed 404 page — landing on `able-v7.html` with no localStorage data and no valid handle shows an empty skeleton.

---

## 9. Loading states — 7/10

**Finding:** Skeleton shimmer is implemented in admin.html (stat cards show skeleton while data loads) and the fan sign-up submit has a spinner-to-checkmark animation; able-v7.html renders from localStorage immediately (no perceived loading for returning visitors) but the cold-visit skeleton (first load, no localStorage) holds for too long before the hero resolves.

**Detail:**
- Admin stat cards: skeleton shimmer is correct (unison, no stagger — per spec §7.2 item 5).
- Fan sign-up submit: spinner → checkmark → confetti → echo is implemented. Correct sequence.
- able-v7.html hero: renders from localStorage immediately on warm visit. This is the core performance advantage.
- Cold visit (no localStorage): hero artwork placeholder is a shimmer while CSS loads display fonts. The CLS from font load is not confirmed below 0.10 — the layout shift when Barlow Condensed or a vibe serif loads can be visible.
- Image lazy-load with blur-up placeholder (spec §7.2 item 12): partially implemented. Accent gradient placeholder is present but the real image fade-over is not consistently applied to all images.
- iframe embeds (Spotify, YouTube): use `loading="lazy"` correctly — no offscreen network cost.

---

## 10. Mobile gesture support — 7/10

**Finding:** The core mobile interactions (scale-down on press, spring-back on release, tab bar hide/show on scroll) are implemented with correct physics; swipe-to-dismiss for bottom sheets is partially implemented; `touch-action: manipulation` eliminates 300ms delay; pull-to-refresh is browser default (no override) which is correct for a single-page artist profile.

**Detail:**
- `scale(0.97)` on `pointerdown` with spring-back: implemented on interactive elements including CTAs, pills, and tab bar items.
- iOS fix (`document.addEventListener('touchstart', () => {})`) is confirmed in the codebase.
- Bottom sheet panels (admin edit mode, support packs): slide-up with spring easing (350ms) is implemented. Drag-to-dismiss (user drags the sheet down to close) is partially implemented — the drag handle exists but programmatic dismiss on drag threshold is not confirmed.
- Android back gesture → panel close via `popstate` is in spec (§6.5); implementation status is not fully confirmed.
- Horizontal scroll in Quick Action pills: correct touch scroll with `-webkit-overflow-scrolling: touch`.
- No custom pull-to-refresh override — correct, the browser default is appropriate here.

---

## 11. Admin dashboard usability — 7/10

**Finding:** The sidebar navigation with clear section groupings (Campaign HQ, Fans, Analytics, Shows, etc.) gives artists an immediate mental map of the dashboard, and common tasks (gig mode toggle, fan list view) are accessible in 2–3 taps from any section; the Campaign HQ is well-conceived as the artist's daily home; but the volume of settings available at the top level is overwhelming for a day-1 artist who just wants to check if anyone signed up.

**Detail:**
- Campaign HQ (page state control, release date, gig mode) is correctly positioned as the primary panel. An artist who opens admin to "do something about their release" arrives in the right place.
- Fan list: accessible in 1 tap from the sidebar. Shows email, date, source, star toggle. Correct data. Count in header ("42 people on your list") is warm and specific.
- Analytics: CTA tap events from localStorage, breakdown by type and date. Works for early-stage data. The "7 people tapped your Spotify link today" in-context message (spec §9.1 item 4) is not confirmed implemented in the current build — this is a missed upgrade trigger.
- First-run checklist (EC-03): built. Shows "Share your page," "Add a release," "Activate gig mode" — correct structure.
- The dashboard greeting "Good to see you, [Name]." — present. On-register.
- Broadcast section: exists with tier gate, Supabase send not wired. The blurred preview + specific value proposition is implemented for free/Artist tier gate.
- Admin is a separate page (admin.html) rather than the slide-up panel on the profile described in V6_BUILD_AUTHORITY.md §6.4 — this is the current build reality and the separate page works functionally, but the split means an artist can't directly see how admin changes affect the live profile without switching tabs.

---

## 12. Fan capture email flow — 5/10

**Finding:** The sign-up → optimistic confirmation works end-to-end in the browser (localStorage write, confetti, echo copy); but the email confirmation step (confirmation email to the fan, double opt-in workflow) requires a Netlify function that is partially implemented and not confirmed wired to Supabase, meaning the product's GDPR-compliance path is incomplete and the fan who signed up receives no email.

**Detail:**
- Sign-up localStorage write: works correctly. Fan data stored with `consent: true`, `consentMethod: 'explicit_checkbox'`, timestamp, source.
- Optimistic UI: confetti + echo ("We've got you — [email] is on [Artist]'s list.") fires immediately. Correct.
- Confirmation email: `netlify/functions/fan-confirmation.js` exists and reads `profile.release.title` but the Supabase trigger to send on sign-up is not wired.
- Double opt-in status display in fan list: `○` marker for unconfirmed fans — spec calls for this, implementation status unclear.
- "What's next" for the fan: in V1, the fan closes the page and returns via email. The email is the V1 "next". Without the email sending, the fan journey dead-ends at confetti.
- The V1 limitation is acknowledged and honest: `fan.html` is Phase 2. But the confirmation email is P1 and should be live before public launch.

---

## 13. Gig mode UX — 8/10

**Finding:** Gig mode toggle in admin is clear and accessible, the visual change on the profile is dramatic and correct (deep red badge, ticket CTA becomes primary, "On tonight" language, tonight note displayed), 24-hour auto-expiry works; the gap is that there is no post-show state and the page does not shift its CTA from "Get tickets" to "Stay close" after the show ends.

**Detail:**
- Toggle in Campaign HQ: one tap, instant feedback, shows expiry time ("Gig mode active — expires 11:47pm"). Correct.
- Live pulsing dot on "On tonight" badge: implemented. Scale + opacity animation, gig-only colour. Correct.
- Tonight note field: free-text, artist voice, displayed prominently in hero. This is the highest-leverage single addition in gig mode and it is built.
- Ticket CTA becomes primary: correct. Fan capture shifts to gig-specific copy ("Leave your email and I'll let you know next time I'm coming to you.") — this is the correct state-variant copy per the research.
- Post-show state: does not exist. After 24 hours, page reverts to previous state. The peak conversion window (fans walking out of the venue) is unserved — the page should shift its primary CTA to fan sign-up for the final hours of gig mode.
- Auto-activation from show door time (AS-07): not built. Artists must remember to manually toggle.

---

## 14. Copy/microcopy quality — 8/10

**Finding:** The product's copy is largely on-register — warm, first-person on the profile, direct on the dashboard, no banned phrases in the main flows — but there are scattered non-compliant labels in the admin (particularly in field labels and section headers that read as generic SaaS), and the onboarding wizard has a few placeholder texts that sound like they were written by someone thinking of a business tool rather than an artist.

**Detail:**
- Profile page: first-person, present tense, artist voice throughout. "Stay close." is correct. "Listen" (not "Discography") correct. "Shows" (not "Events") correct.
- Admin dashboard greeting: "Good to see you, [Name]." — warm, one beat, done. Correct.
- Admin stat labels: "People who came to your page this week" rather than "Page views" — present throughout. Correct.
- Non-compliant instances found:
  - "Social links" in onboarding should be "Where to find you" or "Your music lives here."
  - "Snap card" creation toast: "Snap card published." — correct but flat. "Posted." would be warmer.
  - Analytics section header: "Analytics" — should be "How it's going" or "What's happening."
  - Tier gate copy in Broadcasts is correct: specific value ("Email your list directly") not generic ("Unlock broadcasts").
- The system prompt for AI features (§11) is correctly built into the product — bio writer and CTA variants use the correct ABLE voice constraints.

---

## 15. Progress/feedback — 7/10

**Finding:** Critical actions (fan sign-up, gig mode toggle, save in admin) all have visible feedback; the sign-up has the most complete feedback loop (spinner → checkmark → confetti → echo); admin saves show a toast that is positioned and timed correctly; but the gig mode activation confirmation is a status chip change without audio/visual emphasis that confirms the consequential nature of the action.

**Detail:**
- Fan sign-up: spinner (optimistic) → checkmark → confetti burst (40 particles, accent + white) → echo message. Best feedback loop in the product.
- Admin saves: toast appears bottom-centre, 3s duration, auto-dismisses. Correct position and timing.
- Gig mode toggle: chip changes from inactive to "On — expires [time]". Correct but the toggle should have a more emphatic confirmation — this is a high-stakes change (the artist's page is now in gig mode for 24 hours for every fan who visits).
- Accent colour picker: live preview updates in <100ms. Correct — artist sees the effect before committing.
- Release date set: page state auto-changes to pre-release. The admin correctly shows the computed state ("Currently: pre-release mode") so the artist understands what happened.
- Progress bar in onboarding: 2px top bar, spring easing. Correct and unobtrusive.
- The copy-link action (Done screen in start.html): shows "Copied" briefly — correct but could persist 2s per spec §7.2 item 17.

---

## 16. Accessibility UX — 6/10

**Finding:** Focus indicators are present (`outline: 2px solid var(--acc)`) and confirmed on all interactive elements; WCAG 2.2 AA contrast ratios are largely correct in Dark and Contrast themes but need audit in Light theme with low-contrast accents (e.g. ochre `#d4a96a` on cream `#f0ede8` fails 4.5:1 ratio); screen reader journey for the fan sign-up is incomplete (form field lacks visible label text visible to VoiceOver); `prefers-reduced-motion` CSS rule is present but Web Animations API calls are not confirmed to check the media query.

**Detail:**
- Focus indicators: `outline: 2px solid var(--acc)` with `outline-offset: 2px/3px`. Present on buttons, links, inputs. Correct.
- Tap targets: `--tap-min: 44px` is set and applied to interactive elements. Some admin action buttons may be below 44px — needs measurement.
- ARIA: fan sign-up form has `aria-label` on the email input. Campaign state changes expose updated content via... the DOM change but not via a polite ARIA live region as spec requires (§5).
- Screen reader journey: form submission success (confetti) is visual-only. The echo message is rendered to the DOM but is not wrapped in an `aria-live="polite"` region, so VoiceOver users do not hear confirmation.
- `prefers-reduced-motion` CSS rule at end of styles correctly freezes all transitions/animations. The `window.matchMedia(...)` check for canvas-based animations is in spec but not confirmed present.
- Light theme contrast: Acoustic vibe with ochre accent `#d4a96a` on cream bg `#f0ede8` — the accent-coloured CTA button text likely fails WCAG AA. Needs measurement.
- No skip-to-content link for keyboard users (minor for a mobile-primary product, but present in spec intent).

---

## 17. Cross-device journey — 6/10

**Finding:** The artist-on-desktop → fan-on-iPhone scenario has a friction point: admin.html is a desktop-optimised dashboard with a 220px sidebar that does not render well on mobile, meaning an artist who opens their dashboard on their phone (e.g. to check fan sign-ups after a show) gets a sub-par experience; the fan journey on iPhone is correctly optimised; the admin desktop experience is strong; the seam between them is rough.

**Detail:**
- Fan journey on iPhone: able-v7.html renders correctly at 375px and above. No horizontal scroll. Tab bar is correctly sized and positioned with safe area insets.
- Admin on desktop: sidebar navigation works well. Split-screen intent for admin is correct. The stats grid (4 columns) is appropriate at 1280px+.
- Admin on mobile: the 220px fixed sidebar consumes over 60% of a 375px viewport. No mobile nav fallback (hamburger, bottom nav) exists in admin.html. An artist checking sign-ups from their phone after a gig gets a broken layout.
- start.html (onboarding): desktop split-layout (form + preview) collapses to single-column on mobile — this is correct but the live preview is hidden at mobile widths, removing the main delight moment of the onboarding wizard for mobile users.
- localStorage is per-browser, per-device. An artist who sets up on desktop and checks on mobile will see an empty profile until Supabase sync is implemented. This is a known V1 limitation but it will cause confusion.

---

## 18. Tier gate UX — 7/10

**Finding:** The gold lock pattern (blurred preview + specific value overlay) is correctly implemented for the Broadcasts tier gate and the analytics fan-city breakdown; upgrade language is specific and on-register ("Email your list directly" not "Unlock broadcasts"); but the fan list progress bar toward the 100-fan cap (spec §9.1 item 1) is not confirmed implemented, meaning the highest-intent upgrade moment is being missed.

**Detail:**
- Broadcasts tier gate: blurred preview + "Email your list directly. £9/mo Artist plan." Correct. Specific value proposition, no generic "upgrade to continue."
- Analytics tier gate (fan city data): "You have [N] fans in Manchester — upgrade to see who they are before your show there." — this is the right framing. Implementation status: partially confirmed.
- Fan list cap (100 fans → upgrade trigger): the spec calls for a progress bar from fan 1 and a specific message at 95 fans. Current implementation shows the fan count but the visual progress bar toward the cap is not confirmed. This is the highest-intent upgrade trigger and it should ship before launch.
- 14-day trial auto-trigger on release date set (spec §9.1 item 2): not confirmed implemented.
- Monthly billing default: correct. Annual at "Want to save 2 months?" is in landing.html copy.
- The "Made with ABLE" footer on free-tier profiles is present and subtle — one quiet line, correct. Removed on paid tier.

---

## 19. Trust signals — 7/10

**Finding:** The product communicates trust primarily through visual quality (which is genuinely high) and through copy that does not use marketing language; specific trust signals for a new artist handing over their fan relationship — data ownership, export capability, "0% platform cut" statement — are present in the right places but the export data signal (fan CSV download) is buried in the fan list section rather than visible during the first fan sign-up moment when the artist most needs reassurance.

**Detail:**
- "Made with ABLE" footer: subtle, one line, correct. Fans are not confronted with heavy ABLE branding.
- "Your list. Export any time." is in the footer of the fan section — correct placement but small text.
- Fan CSV export button in the fan list: built. This is a meaningful trust signal for artists like Sarah (persona) who want data ownership before committing.
- "0% platform cut on support packs" — present in admin setup and mentioned on landing page. Critical trust signal for artists who find ABLE via competitor comparison.
- The onboarding does not explicitly state that the artist owns their fan list and can take it with them — this is the #1 trust concern for artists coming from Mailchimp or Bandcamp and should appear in the start.html done screen.
- No social proof yet (real artist count, real fan sign-up count) — the landing page proof strip currently uses placeholder numbers, not real data.
- GDPR consent is explicit and the checkbox is visible. ABLE is positioned as privacy-correct without making it feel like a legal burden.

---

## 20. Delight moments — 8/10

**Finding:** The product has genuine delight in the right places — the accent colour live preview in onboarding (whole phone updates in <100ms), the ambient artwork colour that bleeds into the page background, the confetti burst on first fan sign-up, the spring physics on buttons and tab indicator — these are not decoration, they are moments that make an artist feel ABLE was made specifically for them; the gap is the post-setup moment (the Done screen in start.html) which is functional but not emotionally memorable.

**Detail:**
- Accent colour live preview: the whole phone repaints in <100ms as the artist drags through presets. This is the single best onboarding moment in the product. Artists who do not stay will have still had this moment.
- Ambient artwork colour extraction: subtle, not showy. The page feels like the artwork without announcing that it does.
- Confetti on sign-up: correct implementation. 40 particles, accent + white. This is the artist's first signal that the product is working — it should feel good.
- Spring physics: buttons bounce back on release, tab indicator slides with spring overshoot. These details make the product feel alive rather than static.
- The artist name reveal animation (opacity 0 + translateY 12px → in, 400ms decel): clean, editorial, correct.
- Campaign state badge animations (live pulsing dot for gig mode): effective. Immediately communicates urgency without screaming.
- Missing delight: the Done screen in start.html is a copy-link screen. The right version of this moment is something like "Your page is live. Here's what it looks like:" with a real rendered preview of their profile. The payoff of completing setup should feel more ceremonial.

---

## Total score: 6.9/10

**Summary:**

ABLE's UX is genuinely distinguished in the moments that matter most to artists and fans. The design system is visually superior to every link-in-bio competitor, the copy is consistently on-register, and the campaign state machine is a real product differentiator. For a fan arriving on an artist's page, the experience is already close to what it needs to be.

The gaps fall into three clusters:

**1. Incomplete infrastructure (not UX design failures, but real user-facing gaps):** The email confirmation flow is disconnected. Spotify import is unconnected to the onboarding UI. Admin on mobile is broken. These are ships-before-launch items.

**2. State-specific copy is static where it should be dynamic:** The fan sign-up heading/CTA should change by campaign state. This is the largest single conversion optimisation available and it is spec'd but not fully implemented. In pre-release mode, a contextualised sign-up section converts at 6x baseline. The current static "Stay close." misses that entirely.

**3. The artist's second visit is underserved:** The Done screen after onboarding is flat. The post-gig moment when an artist checks their phone is unserved (mobile admin is broken). The 100-fan progress bar that should build toward the upgrade trigger is not confirmed. The first session is better than the second session — this needs to be addressed before launch.

The product is not 5/10 rough. It is 7/10 close. The gap to a great first release is specific and achievable.

---

*Last updated: 2026-03-16*
*Cross-reference: `docs/systems/ux/PATH-TO-10.md` for fixes, `docs/systems/ux/SPEC.md` for requirements, `docs/systems/ux/FINAL-REVIEW.md` for projected scores.*
