# Dimension B7 — Section Rhythm Consistency
**Category:** Typography & Spacing
**Phase:** 5

Vertical spacing between major sections must follow a consistent hierarchy across each page. V8 uses `--sp-10` (40px) for primary section top padding and `--sp-8` (32px) for secondary — this is well-defined. Admin has inconsistent section spacing (approximately 20–24px between sections, GPT finding suggests 32px minimum). Landing's 88px desktop / 56px mobile section padding was recently fixed but internal section rhythm (proof-to-pricing breathing room, etc.) still needs validation.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | V8 primary sections use `padding-top: var(--sp-10)` (40px) — confirm this is the top-level section rhythm token | V8 | 4 | 1 | L | 1 |
| 2 | V8 secondary sections use `padding-top: var(--sp-8)` (32px) — confirm hierarchy is consistent | V8 | 4 | 1 | L | 1 |
| 3 | V8 sub-sections use `padding-top: var(--sp-6)` (24px) — confirm third-level hierarchy | V8 | 3 | 1 | L | 1 |
| 4 | V8 hero section: what is the bottom padding of the hero before the first content section? Confirm value | V8 | 3 | 1 | L | 1 |
| 5 | V8 fan capture section: how much space between the last content section and the fan capture card? | V8 | 3 | 1 | L | 1 |
| 6 | V8 section with `.content-section--primary` class — confirm class is correctly applied to the right sections | V8 | 3 | 1 | L | 1 |
| 7 | V8 sections: confirm the class hierarchy `.content-section--primary` vs `.content-section` is used for all sections | V8 | 3 | 1 | L | 1 |
| 8 | V8 bio strip section spacing — confirm there is breathing room between hero and bio | V8 | 3 | 1 | L | 1 |
| 9 | V8 music section spacing relative to bio — confirm the gap feels deliberate, not accidental | V8 | 3 | 1 | L | 2 |
| 10 | V8 events section spacing relative to music — confirm consistent with the section hierarchy | V8 | 3 | 1 | L | 2 |
| 11 | V8 merch section spacing relative to events — confirm | V8 | 2 | 1 | L | 2 |
| 12 | V8 snap cards section spacing — confirm rhythm relative to previous section | V8 | 2 | 1 | L | 2 |
| 13 | V8 fan capture section spacing — it should feel like a moment of arrival; is the breathing room above it sufficient? | V8 | 4 | 1 | L | 2 |
| 14 | V8 at 375px mobile: confirm all section top paddings are rendered correctly at mobile widths | V8 | 4 | 2 | L | 2 |
| 15 | V8 `padding-bottom: var(--sp-3)` under section headers — confirm this is the standard section-header bottom rhythm | V8 | 2 | 1 | L | 1 |
| 16 | V8 section label `margin-bottom: var(--sp-6)` — this is 24px below the eyebrow; is that sufficient breathing room before section content? | V8 | 2 | 1 | L | 1 |
| 17 | Admin sections have inconsistent vertical gaps — some sections are 20px apart, others 24px; need a consistent 32px minimum | ADM | 5 | 2 | M | 2 |
| 18 | Admin Campaign HQ section `margin-top: 32px` in CSS — this is the correct value; confirm it is applied and not overridden | ADM | 4 | 1 | L | 1 |
| 19 | Admin stats row to Campaign HQ gap — visually measure the space between these two major sections | ADM | 4 | 2 | L | 2 |
| 20 | Admin fan list section below Campaign HQ — measure gap; should be ≥32px | ADM | 4 | 2 | L | 2 |
| 21 | Admin connections section below fan list — measure gap | ADM | 3 | 2 | L | 2 |
| 22 | Admin analytics section below connections — measure gap | ADM | 3 | 2 | L | 2 |
| 23 | Admin snap cards section below analytics — measure gap | ADM | 3 | 2 | L | 2 |
| 24 | Admin page header (title + greeting) to first content section — how much space? Should feel welcoming, not cramped | ADM | 4 | 2 | L | 2 |
| 25 | Admin milestone nudges below the greeting — what is the gap between greeting and nudge bar? | ADM | 3 | 1 | L | 2 |
| 26 | Admin section cards internal padding — currently mixed 12–20px; standardise to 16px (--sp-4) minimum | ADM | 4 | 2 | M | 2 |
| 27 | Admin `.dashboard-section` element: does it have a standard margin-bottom that creates consistent inter-section spacing? | ADM | 4 | 2 | L | 2 |
| 28 | Admin sidebar: spacing between sidebar sections `.sb-section` separators — currently raw 6px/4px padding | ADM | 2 | 1 | L | 3 |
| 29 | Admin topbar height and how it relates to the content-start offset — confirm safe-area top padding is correctly applied | ADM | 3 | 1 | L | 2 |
| 30 | Admin at 375px: confirm Campaign HQ full section renders without vertical overflow or cramping | ADM | 4 | 2 | L | 2 |
| 31 | Landing hero section bottom to quiet-line separator — what is the gap? Current value needs verification | LND | 3 | 1 | L | 1 |
| 32 | Landing quiet-line separator to proof strip — what is the gap? | LND | 3 | 1 | L | 1 |
| 33 | Landing proof strip to features section — GPT finding: breathing room needs checking | LND | 4 | 1 | L | 1 |
| 34 | Landing features section to comparison section — confirm section padding is 88px desktop | LND | 3 | 1 | L | 1 |
| 35 | Landing comparison to how-it-works steps — confirm rhythm | LND | 3 | 1 | L | 1 |
| 36 | Landing steps to pricing section — confirm breathing room | LND | 3 | 1 | L | 1 |
| 37 | Landing pricing to FAQ — confirm breathing room | LND | 3 | 1 | L | 1 |
| 38 | Landing FAQ to footer CTA — confirm final section has appropriate runway before CTA | LND | 3 | 1 | L | 1 |
| 39 | Landing `margin-bottom: 52px` on `.section__sub` — this is the gap between the sub-headline and section content; is 52px right? | LND | 3 | 1 | L | 2 |
| 40 | Landing `margin-bottom: 36px` on `.section__sub` mobile — is 36px the correct breathing room at 375px? | LND | 3 | 1 | L | 2 |
| 41 | Landing hero section internal spacing: logo → headline → sub → platform row — confirm each vertical gap is intentional | LND | 4 | 1 | L | 2 |
| 42 | Landing `margin-top: 22px` on hero sub — 22px between headline and sub-copy; evaluate if this could map to `--sp-6: 24px` | LND | 2 | 1 | L | 2 |
| 43 | Landing demo phone `margin-top` or position offset — confirm the hero visual doesn't push text below the fold at 375px | LND | 4 | 2 | L | 2 |
| 44 | Landing hero at 375px — does the headline, sub-copy, CTAs, and platform pills all fit above the fold? | LND | 5 | 2 | L | 1 |
| 45 | Landing proof strip: three stat items with `min-width: 120px` and `max-width: 200px` — confirm they have consistent vertical spacing on mobile when stacking | LND | 3 | 1 | L | 2 |
| 46 | Landing pricing cards: `gap: 16px` between cards — confirm this gap doesn't make the tier comparison feel disconnected | LND | 3 | 1 | L | 2 |
| 47 | Landing comparison grid `gap: 80px` desktop — 80px between two comparison columns is very wide; visually test | LND | 3 | 2 | M | 2 |
| 48 | Landing comparison grid `gap: 40px` mobile — confirm this feels right when single column | LND | 2 | 1 | L | 2 |
| 49 | Landing `.step` border-bottom rhythm — steps use bottom border as separator; confirm spacing between border and next step text | LND | 2 | 1 | L | 2 |
| 50 | Landing footer section: `padding-bottom` for legal links — confirm breathing room below pricing / FAQ before footer | LND | 2 | 1 | L | 2 |
| 51 | start.html: wizard steps — each step has vertical padding above and below its content; confirm this is consistent across all 7 steps | STR | 4 | 2 | L | 2 |
| 52 | start.html: hero number to label to body text spacing — confirm the three-element rhythm at each step | STR | 3 | 1 | L | 2 |
| 53 | start.html: field group spacing within a step — gap between form fields should be consistent | STR | 3 | 1 | L | 2 |
| 54 | start.html: `margin-top` on option card grid — confirm consistent spacing before option chips | STR | 2 | 1 | L | 2 |
| 55 | start.html: "how to find this" panel spacing — confirm breathing room when the hint panel expands | STR | 2 | 1 | L | 3 |
| 56 | start.html: step progress indicator position — is the step counter in the nav vertically aligned and spaced correctly? | STR | 2 | 1 | L | 2 |
| 57 | start.html: import preview card spacing — confirm internal padding after import data loads | STR | 2 | 1 | L | 3 |
| 58 | start.html: done screen — how much space between the ABLE wordmark, next steps, and share section? | STR | 3 | 1 | L | 2 |
| 59 | start.html: CTA preview section spacing — confirm the live preview panel has correct padding | STR | 2 | 1 | L | 3 |
| 60 | start.html at 375px: confirm all step content fits within the viewport without scroll on the first render | STR | 4 | 2 | L | 2 |
| 61 | V8 in pre-release state: countdown section spacing relative to hero CTAs — does the countdown feel like a natural section below the hero? | V8 | 3 | 2 | L | 3 |
| 62 | V8 in gig state: ticket card position — is there more breathing room above it than in profile state? | V8 | 3 | 2 | L | 3 |
| 63 | V8 in live state: top card media spacing relative to CTAs below — confirm visual hierarchy | V8 | 3 | 2 | L | 3 |
| 64 | Admin dashboard tab bar at bottom: confirm spacing between last section and tab bar accounts for the tab bar height plus safe-area-inset | ADM | 3 | 1 | L | 2 |
| 65 | V8 tab bar clearance: confirm `padding-bottom: calc(var(--tab-bar-height) + env(safe-area-inset-bottom) + var(--sp-4))` applied to content wrapper | V8 | 3 | 1 | L | 1 |
| 66 | V8 bottom nav tabs — confirm spacing between tab bar and above-fold content doesn't create an awkward dead zone | V8 | 3 | 2 | L | 2 |
| 67 | After fixing admin section spacing, test that Campaign HQ doesn't feel disconnected from the stats above it | ADM | 4 | 2 | M | 3 |
| 68 | Admin page: the visual weight of Campaign HQ (it has a distinct card treatment) — confirm its top spacing makes it feel like a featured section, not an afterthought | ADM | 4 | 2 | M | 2 |
| 69 | Admin sections below Campaign HQ (fan list, analytics) — confirm spacing doesn't suggest equal visual priority to Campaign HQ | ADM | 3 | 2 | M | 2 |
| 70 | Confirm that section rhythm is tested at both 375px (iPhone SE) and 390px (iPhone 14) viewports | ALL | 4 | 2 | L | 3 |
| 71 | V8 release cards: spacing between individual tracks/cards in the music section — confirm consistent 8px or 12px gap | V8 | 2 | 1 | L | 2 |
| 72 | V8 events row: spacing between individual event items — confirm consistent gap | V8 | 2 | 1 | L | 2 |
| 73 | V8 snap cards: spacing between individual snap cards in the scroll row — confirm consistent gap | V8 | 2 | 1 | L | 2 |
| 74 | V8 platform pills: spacing within the pill row and between rows if wrapping — confirm correct gap | V8 | 2 | 1 | L | 2 |
| 75 | Landing: spacing between individual feature cards in the grid — currently using CSS grid gap | LND | 2 | 1 | L | 2 |
| 76 | Landing: pricing card feature list item spacing — confirm `line-height` and list item gap | LND | 2 | 1 | L | 2 |
| 77 | Landing: FAQ item spacing — confirm gap between questions | LND | 2 | 1 | L | 2 |
| 78 | The landing page uses full-bleed sections with alternating backgrounds — confirm the perceived section breaks are clear despite the lack of whitespace separators | LND | 3 | 2 | M | 2 |
| 79 | Admin: mobile keyboard pushes content — confirm that when a form field is focused in admin, the critical Campaign HQ buttons are still accessible above the keyboard | ADM | 3 | 2 | M | 3 |
| 80 | V8: when profile is very short (minimal content), does the fan capture section still have appropriate rhythm? Test with minimal data. | V8 | 3 | 2 | L | 3 |
| 81 | V8: when profile is very long (many snap cards, many tracks), does the inter-section spacing hold up? Test with maximum data. | V8 | 3 | 2 | L | 3 |
| 82 | Define the three rhythm levels in DESIGN_SYSTEM_SPEC.md: major-section spacing (40px), sub-section spacing (32px), component spacing (24px) | ALL | 3 | 1 | L | 3 |
| 83 | Verify that no two adjacent sections have identical section-level spacing (all sections look like equal peers) — there should be a hierarchy | ALL | 4 | 2 | M | 3 |
| 84 | V8 section separator style: no visible border/divider between sections — confirm this is consistent with the dark background | V8 | 2 | 1 | L | 2 |
| 85 | Admin section separator: admin uses card borders; confirm consistent border treatment between sections | ADM | 2 | 1 | L | 2 |
| 86 | Landing section separator: alternating background tones provide separation — confirm no visible borders are also needed | LND | 2 | 1 | L | 2 |
| 87 | start.html section flow: steps are sequential, not sections — confirm the spacing between field groups reads as flow, not separation | STR | 3 | 1 | L | 2 |
| 88 | V8 section heading visual weight: confirm section headings (Music, Shows) don't look orphaned from their content | V8 | 3 | 2 | L | 3 |
| 89 | Admin section heading visual weight: confirm headings for each dashboard section aren't floating in space | ADM | 3 | 2 | L | 3 |
| 90 | After all spacing fixes, take screenshot of each page and visually score section rhythm 1–10 | ALL | 4 | 2 | L | 4 |
| 91 | V8: note where `margin-top` is used vs `padding-top` — mixing these can cause collapse/inheritance issues | V8 | 3 | 1 | L | 2 |
| 92 | Admin: same margin vs padding audit | ADM | 3 | 1 | L | 2 |
| 93 | Landing: same audit | LND | 3 | 1 | L | 2 |
| 94 | start.html: same audit | STR | 2 | 1 | L | 2 |
| 95 | V8 hero section padding-top at `var(--sp-8)` on `.content-section` — confirm the hero section itself has distinct top padding from the nav | V8 | 3 | 1 | L | 2 |
| 96 | Admin: confirm Campaign HQ has `margin-top: var(--sp-8)` (32px) rather than the inconsistent smaller values on other sections | ADM | 4 | 1 | L | 2 |
| 97 | Admin: apply `margin-bottom: var(--sp-8)` (32px) to every `.dashboard-section` block — creates consistent inter-section rhythm | ADM | 5 | 2 | M | 2 |
| 98 | Landing: confirm the `padding: 88px 48px` on sections resolves to the correct values after the recent fix | LND | 3 | 1 | L | 1 |
| 99 | After section rhythm fixes: full Playwright screenshot of each page at 375px and 390px | ALL | 4 | 2 | L | 4 |
| 100 | Add section rhythm to QA checklist: "no two adjacent major sections have ≤16px of vertical separation" | ALL | 3 | 1 | L | 5 |

## Wave Summary
- **Wave 1** — 1, 2, 3, 4, 5, 6, 7, 8, 15, 16, 18, 31, 32, 33, 34, 35, 36, 37, 38, 44, 65, 98
- **Wave 2** — 9, 10, 11, 12, 13, 14, 17, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 39, 40, 41, 42, 43, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 56, 58, 60, 64, 66, 68, 69, 71, 72, 73, 74, 75, 76, 77, 78, 84, 85, 86, 87, 91, 92, 93, 94, 95, 96, 97
- **Wave 3** — 28, 55, 57, 59, 61, 62, 63, 67, 70, 79, 80, 81, 82, 83, 88, 89
- **Wave 4** — 90, 99
- **Wave 5** — 100
- **Wave 6** — (none)
