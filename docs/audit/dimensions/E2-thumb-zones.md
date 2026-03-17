# Dimension E2 — Thumb Zone Mapping
**Category:** Mobile UX & Touch
**Phase:** 3

Primary CTAs must sit in the bottom two-thirds of the screen. On a 390px iPhone 14, the natural thumb reach zone covers roughly the bottom 60% of the viewport in portrait — above that, users must shift their grip or use their other hand. Every primary action (fan sign-up, campaign state toggle, save, ticket tap) must be reachable without a grip change.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Map thumb zones at 390px: dead zone (top 20%), stretch zone (20–40%), natural zone (40–100%) — document for all four pages | ALL | 4 | 2 | L | 1 |
| 2 | Fan capture section position on V8 at 390px: measure how many pixels from the top of the viewport the form appears on first load — should be in natural thumb zone or reachable by minimal scroll | V8 | 5 | 2 | L | 1 |
| 3 | Hero section primary CTA button: on a 390px screen, the first hero CTA should appear within 70% of viewport height — measure current position | V8 | 5 | 2 | L | 1 |
| 4 | If hero CTA is above 40% viewport height, add enough padding to push it into the reachable zone without excessive dead space | V8 | 5 | 2 | M | 1 |
| 5 | Admin bottom tab bar is already at the bottom — confirm it is genuinely pinned to the viewport bottom and does not scroll away | ADM | 5 | 1 | L | 1 |
| 6 | Admin campaign state buttons (profile/pre-release/live/gig): these are primary artist actions — verify they appear in the natural thumb zone on 390px | ADM | 5 | 2 | L | 1 |
| 7 | Admin "Save changes" button position: if this button is at the top of a form section, move it to the bottom below the last field — follows natural read + tap flow | ADM | 4 | 2 | M | 1 |
| 8 | Admin gig mode toggle: placed in the Campaign HQ section — verify this sits in the lower two-thirds of the viewport when the section is visible | ADM | 4 | 2 | L | 1 |
| 9 | Landing page primary CTA button: measure its viewport position on 390px at initial load — hero CTAs should appear in the natural thumb zone | LND | 5 | 2 | L | 1 |
| 10 | Start.html wizard next button: must be anchored at the bottom of the screen, not the bottom of the content — fixed or sticky footer navigation | STR | 5 | 2 | L | 1 |
| 11 | Start.html wizard back button: pair it with the next button in the same sticky footer row for symmetric, natural thumb use | STR | 4 | 2 | L | 1 |
| 12 | Modal confirm button: position at the bottom of the modal, not centred or at top — confirm sits in thumb zone within the modal | ALL | 4 | 1 | L | 1 |
| 13 | Bottom sheet primary CTA: the action button at the bottom of bottom sheets is naturally in the thumb zone — confirm it is always the last element before the safe area | ALL | 5 | 1 | L | 1 |
| 14 | Fan sign-up submit button: should be directly below the input, full width, no intermediate content between input and submit | V8 | 5 | 1 | L | 1 |
| 15 | When the iOS keyboard appears for the fan sign-up field, the submit button must remain visible above the keyboard — test at 390px with keyboard open | V8 | 5 | 3 | M | 1 |
| 16 | Thumb zone test: load V8 at 390×844px (standard iPhone 14 viewport), take a screenshot, overlay the 44% line — identify any primary CTA above it | V8 | 5 | 3 | L | 1 |
| 17 | Thumb zone test: same test for admin.html at 390×844px — is the campaign state toggle above the 44% line? | ADM | 5 | 3 | L | 1 |
| 18 | Thumb zone test: same test for landing.html — is the above-fold CTA button below the 44% line? | LND | 5 | 3 | L | 1 |
| 19 | Thumb zone test: same test for start.html — is the next button in the sticky footer zone? | STR | 5 | 3 | L | 1 |
| 20 | Profile: the countdown timer in pre-release state is prominent but purely informational — it can be at the top; the pre-save CTA below it must be in the natural zone | V8 | 4 | 2 | L | 1 |
| 21 | Profile: the hero section should not be so tall that the first CTA is pushed below the fold at 390px — hero height should be ≤75vh | V8 | 4 | 3 | M | 2 |
| 22 | Admin: the page state label (e.g., "Live") in Campaign HQ is informational; the action (switch state) should follow immediately below it in thumb zone | ADM | 4 | 2 | L | 1 |
| 23 | Consider sticky fan capture form: when user scrolls past it, a compact sticky strip at the bottom persists — maximises thumb-zone capture | V8 | 4 | 4 | M | 3 |
| 24 | Profile shows section: the "get tickets" per-show button should be right-aligned in each row — natural position for right-thumb users | V8 | 4 | 2 | L | 2 |
| 25 | Profile music section: the "stream" or "listen" CTA on release cards should be in the lower half of each card | V8 | 4 | 2 | L | 2 |
| 26 | Admin fan list: "export" and "add fan" actions — consider anchoring these to a floating action button or bottom bar rather than the top of the section | ADM | 3 | 3 | M | 3 |
| 27 | Landing: if a secondary CTA is placed above the fold, ensure it is visually lighter (ghost button) — primary weight = more taps; ghost = considered tap | LND | 3 | 2 | L | 2 |
| 28 | Admin snap card reorder: drag handles should be on the left side of each card (left thumb reaches left side; right thumb reaches right side) — or centre-bottom | ADM | 2 | 3 | L | 3 |
| 29 | Profile: the first above-the-fold action should require no scroll — if the hero is > 100vh, the first CTA is invisible on load | V8 | 5 | 2 | M | 1 |
| 30 | Admin: the "copy profile link" action is likely in the header — consider a floating share button anchored to the bottom right for one-thumb sharing | ADM | 3 | 3 | M | 3 |
| 31 | Profile: back gesture is the natural iOS back — do not add a back button at the top; it is in the dead zone | V8 | 3 | 1 | L | 2 |
| 32 | Start.html: every form input should be vertically positioned so the user types top-to-bottom and the next button is always the last focus before submit — no backtracking | STR | 4 | 2 | L | 2 |
| 33 | Landing: pricing section CTAs — as user scrolls into pricing, each tier's CTA button should be at the bottom of its card, not the top | LND | 4 | 1 | L | 2 |
| 34 | Profile: in gig mode, the "get tickets" CTA should be the very first tappable element after the hero section — front-and-centre, in natural thumb zone | V8 | 5 | 2 | L | 1 |
| 35 | Admin: the gig mode countdown timer appears in Campaign HQ — ensure the "end gig mode early" action is accessible without scrolling far from where the timer is visible | ADM | 3 | 2 | L | 2 |
| 36 | Profile: fan capture section heading should be brief — if the heading is long, it pushes the form input and submit button further down, away from the thumb zone | V8 | 4 | 2 | L | 2 |
| 37 | Landing: the social proof section (testimonials, artist counts) is informational — place it between primary CTAs so it supports the decision without burying the CTA | LND | 3 | 2 | L | 2 |
| 38 | For every page, document the "zero-scroll primary action" — what can a user tap without scrolling at all on a 390×844px device? | ALL | 4 | 2 | L | 2 |
| 39 | Profile: in the default profile state, the most important action (fan sign-up) should be reachable with a maximum one screen scroll | V8 | 5 | 2 | L | 1 |
| 40 | Profile: platform pills (Spotify, Apple Music) appear in the hero area — these are secondary to fan capture; ensure they don't push the primary CTA into the stretch zone | V8 | 4 | 2 | M | 2 |
| 41 | Admin: the "add your first CTA" nudge card should appear at thumb-zone height so new artists can act immediately | ADM | 4 | 2 | L | 2 |
| 42 | Start.html: the colour swatch selector should be reachable without needing to scroll up — keep it in the lower half of the step | STR | 3 | 2 | L | 2 |
| 43 | Profile: in live state, the stream CTA prominence depends on its vertical position — it must appear in the top 75vh without scrolling | V8 | 5 | 2 | L | 1 |
| 44 | Admin: campaign section "set release date" date picker — this is a key action; ensure it is in the natural thumb zone and not buried above complex UI | ADM | 4 | 2 | L | 2 |
| 45 | Landing: the "how it works" section steps can be long — ensure each step's CTA or transition to next step is at the bottom, not the top of the step | LND | 3 | 2 | L | 3 |
| 46 | Profile: the trust text below the fan capture submit ("your email stays private") must be immediately below the submit button — not above it displacing the button upward | V8 | 4 | 1 | L | 1 |
| 47 | Admin: if a tooltip or info panel opens above the triggering element, it may cover content in the natural thumb zone — prefer tooltips that open below their trigger | ADM | 3 | 2 | L | 2 |
| 48 | Create a thumb-zone diagram in `docs/audit/` showing the three zones overlaid on a 390×844 wireframe — use for all future layout reviews | ALL | 3 | 2 | L | 3 |
| 49 | Profile: in landscape mode (667×375), the natural thumb zone shifts — the fan capture form must still be accessible; test this scenario | V8 | 4 | 3 | L | 2 |
| 50 | Admin: in landscape mode, the bottom tab bar consumes more proportional height — ensure Campaign HQ buttons are still in the reachable zone | ADM | 4 | 3 | L | 2 |
| 51 | Profile: the merch section CTAs should each be at the bottom of the merch card they belong to — not at the top above the product image | V8 | 3 | 2 | L | 2 |
| 52 | Profile: if a floating "sign up" sticky button is implemented, pin it above the bottom safe area inset, not at the very bottom edge | V8 | 4 | 2 | L | 2 |
| 53 | Landing: test with a real device at 390px — scroll through the page and mark every CTA. Any CTA that appears in the top 40% of the viewport on first appearance should be reconsidered | LND | 4 | 2 | L | 2 |
| 54 | Admin: if a new-feature onboarding tooltip is added, show it emerging from the bottom of the screen (like a bottom sheet), not from the element in the dead zone | ADM | 3 | 3 | L | 3 |
| 55 | Profile: the GDPR consent text is below the submit button — this is correct for thumb zone; if it is above the submit button, it pushes the CTA down | V8 | 4 | 1 | L | 1 |
| 56 | Profile: snap cards — if they contain inline CTAs, place the CTA at the bottom of the snap card so it falls naturally after reading | V8 | 3 | 2 | L | 2 |
| 57 | Admin: the upgrade CTA within gold lock overlays should be at the bottom of the overlay, not the top — user reads about the value, then taps upgrade | ADM | 4 | 2 | L | 2 |
| 58 | Landing: the mobile menu (if a hamburger menu is used) should slide in from the bottom, not the top right — bottom sheet navigation is far more thumb-friendly | LND | 4 | 3 | M | 3 |
| 59 | Profile: release artwork should fill width but not exceed 60vh in height — keeping the CTA visible below it without scrolling | V8 | 4 | 2 | M | 2 |
| 60 | Admin: "preview profile" link is a secondary action — if it is in the header (dead zone), that is acceptable for secondary actions; document this intentional exception | ADM | 2 | 1 | L | 3 |
| 61 | All pages: any action taken after a long scroll (e.g., "save" at the bottom of a long admin form) should have a persistent sticky save bar rather than requiring further scroll back up | ALL | 4 | 3 | M | 3 |
| 62 | Profile: video collage section — if play controls are present, position them in the lower half of each video thumbnail | V8 | 3 | 2 | L | 3 |
| 63 | Start.html: the final step's "launch my page" button must be the dominant visual element in the bottom half of the screen — no competing actions | STR | 5 | 1 | L | 1 |
| 64 | Landing: the logo and navigation in the header are in the dead zone by definition — ensure no primary action (sign up, log in) is exclusively in the header | LND | 4 | 2 | L | 1 |
| 65 | Profile: the artist bio is informational and can be in the upper section — ensure the first tappable element the user encounters after the bio is in the natural zone | V8 | 4 | 2 | L | 2 |
| 66 | Admin: error messages and form validation feedback should appear below the relevant input (where the thumb just was), not above it | ADM | 3 | 2 | L | 2 |
| 67 | Profile: GDPR consent text must not be so long that it pushes the submit button below the natural thumb zone — max two lines of consent copy | V8 | 4 | 1 | L | 1 |
| 68 | All pages: success state confirmations (toast, inline message) should appear at the bottom of the screen near the thumb, not at the top as a banner | ALL | 4 | 2 | L | 2 |
| 69 | Admin: the "add connection" or "link streaming profile" actions should be in a bottom sheet triggered from a thumb-zone button, not in a header row | ADM | 3 | 3 | L | 3 |
| 70 | Profile: in pre-release state, the countdown is informational — the pre-save CTA should be immediately below the countdown, not separated by the artist bio | V8 | 4 | 2 | L | 2 |
| 71 | Landing: if an email capture field exists on the landing page itself (early access), it should be in the lower half of the hero section | LND | 4 | 2 | L | 2 |
| 72 | Start.html: on step 1, the "continue" button should be visible without scrolling even when the keyboard is open — test on 390px with keyboard | STR | 5 | 3 | M | 1 |
| 73 | Profile: the "support me" section (support packs) — each tier button should be in the lower half of its support pack card | V8 | 3 | 2 | L | 2 |
| 74 | Admin: any destructive action (delete show, remove CTA) should use a confirmation bottom sheet, with confirm/cancel in the thumb zone, never in a modal at the top | ADM | 4 | 3 | L | 3 |
| 75 | Profile: if the hero artwork has a gradient overlay with text, the CTA should overlay the bottom 30% of the artwork, not the top | V8 | 4 | 2 | L | 2 |
| 76 | Admin: the tier badge/indicator (showing current plan) is informational — it can be at the top; the "upgrade" action it links to must be in the thumb zone | ADM | 3 | 2 | L | 2 |
| 77 | Landing: feature comparison table — each row's "included"/"not included" is informational; if there are inline upgrade links per row, they must be in a thumb-accessible position | LND | 2 | 2 | L | 3 |
| 78 | Profile: the share-this-page native share trigger — if a floating share button is used, pin it bottom-right above the safe area | V8 | 3 | 2 | L | 3 |
| 79 | Conduct a one-handed usability test on a real 390px device for each primary flow: fan sign-up, campaign state change, add show — identify any grip changes required | ALL | 5 | 3 | L | 2 |
| 80 | After usability test, prioritise any actions that required grip change and redesign their placement into the natural thumb zone | ALL | 5 | 3 | M | 2 |
| 81 | Profile: the artist name in the profile header is decorative — acceptable in the stretch zone; the first interactive element should be further down | V8 | 3 | 1 | L | 3 |
| 82 | Profile: page load should scroll to top, not to an anchor — initial scroll position = top, ensuring the above-fold layout is consistent | V8 | 3 | 1 | L | 2 |
| 83 | Admin: the "what is this?" info link for new admin sections — if placed in the header of the section, it is in the stretch zone; acceptable for secondary info | ADM | 2 | 1 | L | 3 |
| 84 | Landing: footer CTAs are in the dead zone for mobile — supplement them with mid-page contextual CTAs in the natural zone | LND | 3 | 2 | L | 2 |
| 85 | Profile: ensure that on 375px (iPhone SE), the same thumb zone analysis holds — SE users have shorter screens and a slightly lower reach threshold | V8 | 4 | 2 | L | 2 |
| 86 | Admin: ensure that on 375px, all Campaign HQ buttons remain in the natural thumb zone | ADM | 4 | 2 | L | 2 |
| 87 | Profile: test with simulated arthritic grip (thumb reach limited to bottom 50%) — what actions can this user complete? Document any that cannot be reached | V8 | 3 | 2 | L | 3 |
| 88 | Audit: identify all actions that exist only as text links (no button affordance) — these are the hardest to hit and must all be in the natural zone or converted to buttons | ALL | 3 | 2 | L | 2 |
| 89 | Admin: the section heading "Campaign HQ" itself should not be a tappable element — section labels are decorative; the state buttons below are the actions | ADM | 2 | 1 | L | 3 |
| 90 | Profile: the snap card strip (if horizontally scrollable) should have a clear "swipe to see more" affordance at the right edge, in the natural thumb zone | V8 | 3 | 2 | L | 2 |
| 91 | Landing: on 390px, the hero sub-copy should not be so long that it pushes the CTA below 70% of the viewport height | LND | 4 | 2 | L | 1 |
| 92 | Landing: if a mobile menu is a full-screen overlay, the close button must be at the bottom (thumb zone) not the top right | LND | 4 | 2 | L | 2 |
| 93 | Admin: the "gig mode" section in Campaign HQ — if gig mode is off, the toggle to turn it on should be visible without scrolling past Campaign HQ | ADM | 4 | 2 | L | 1 |
| 94 | Profile: ensure the fan capture section does not get lost between the music and events sections — consider an anchor link strip that jumps straight to sign-up | V8 | 4 | 3 | M | 3 |
| 95 | Start.html: multi-step form — never require the user to scroll up to find a previously entered field. Each step should show only current-step fields | STR | 4 | 2 | L | 2 |
| 96 | All pages: after a keyboard opens and closes, the viewport should return to its pre-keyboard scroll position — prevent jarring scroll jumps | ALL | 4 | 2 | M | 2 |
| 97 | Profile: the "your list. your relationship." trust copy near the fan sign-up should appear above the input — it contextualises the action before the user taps | V8 | 3 | 1 | L | 2 |
| 98 | Admin: when a nudge card appears (first-fan ceremony, add show suggestion), it should animate in from the bottom of the screen, drawing the thumb naturally | ADM | 3 | 3 | L | 3 |
| 99 | Document the final thumb zone layout for each page in a diagram stored at `docs/audit/thumb-zones/` — one image per page | ALL | 3 | 3 | L | 4 |
| 100 | Run Playwright viewport tests at 390×844, 375×667, and 390×664 (landscape) — capture screenshots and overlay the three thumb zone bands for each page | ALL | 4 | 3 | L | 4 |

## Wave Summary

| Wave | Items | Focus |
|---|---|---|
| 1 | 1–19, 22, 29, 34, 39, 43, 46, 55, 63, 64, 67, 72, 91, 93 | Critical thumb zone positions for fan capture, hero CTAs, admin primary actions |
| 2 | 20–21, 23–28, 30–33, 35–45, 47–53, 56–57, 59, 65–66, 68, 70–71, 73, 75–76, 82, 84–86, 88, 90, 92, 95–97 | Secondary placements, landscape testing, scroll behaviour |
| 3 | 22, 36, 45, 48, 54, 58, 60–62, 69, 74, 77–78, 81, 83, 87, 89, 94, 98 | UX improvements, conceptual changes, edge cases |
| 4 | 99, 100 | Documentation and visual regression |
