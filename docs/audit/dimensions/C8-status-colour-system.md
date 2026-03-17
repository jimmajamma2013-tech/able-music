# Dimension C8 — Status Colour System
**Category:** Colour, Contrast & Themes
**Phase:** 6 (Colour)
**Status:** Not started

The four campaign states (profile, pre-release, live, gig) and the range of admin status indicators (release status, connection status, fan activity source badges, stat deltas) use colour as the primary signal. This is a critical accessibility failure point for colour-blind users: the live state uses red (#ef4444) and the gig state uses orange-red (#f46442), which are near-identical for protanopia and deuteranopia users who cannot distinguish red from orange. The pre-release amber (#fbbf24) and gig orange are also close for protanopes. Full compliance requires that every state be distinguishable through at least two independent channels — colour is one, and the second must be shape, icon, text label weight, or positional difference. This applies to state pills, the campaign arc nodes, the gig strip, release status badges, and all source badges in the fan list.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Verify live state pill (`.chq-state-pill.live`) uses both red colour AND a non-colour indicator (icon or distinct label style) | ADM | 5 | 1 | M | 1 |
| 2 | Verify gig state pill (`.chq-state-pill.gig`) uses both orange colour AND a distinct non-colour indicator | ADM | 5 | 1 | M | 1 |
| 3 | Confirm live and gig state pills are distinguishable to a protanopia user — colour alone is insufficient | ADM | 5 | 2 | H | 1 |
| 4 | Add a shape or icon difference between live state (filled circle) and gig state (diamond or square icon) | ADM | 4 | 2 | M | 1 |
| 5 | Verify the campaign arc node for live state uses an icon different from the gig state arc node | ADM | 4 | 2 | M | 1 |
| 6 | Confirm pre-release state pill (`.chq-state-pill.pre`) amber is distinguishable from gig orange for protanopia | ADM | 4 | 2 | H | 1 |
| 7 | Add a typographic weight or label suffix difference to pre-release vs gig state pills | ADM | 3 | 2 | M | 1 |
| 8 | Verify profile state pill (`.chq-state-pill.profile`) uses a visually distinct neutral colour (not a saturated hue) | ADM | 3 | 1 | M | 1 |
| 9 | Verify that all four state labels (Profile, Pre-release, Live, Gig) are always visible as text — never hidden behind icons alone | ADM | 5 | 1 | M | 1 |
| 10 | Verify the profile page state badge (if shown to fans) uses text label + colour, not colour alone | V8 | 5 | 1 | M | 1 |
| 11 | Verify the gig mode strip (`.gig-strip`) on the profile page uses text ("on tonight") not colour alone | V8 | 5 | 1 | M | 1 |
| 12 | Verify the pre-release countdown on the profile page is labelled in text — the countdown timer, not just coloured | V8 | 4 | 1 | M | 1 |
| 13 | Verify `--color-state-pre: #fbbf24` (amber) contrast on dark card — calculate; expected ~1.7:1 on #12152a (fails) | V8 | 4 | 1 | H | 1 |
| 14 | Fix `--color-state-pre` if it fails on dark card — raise to a lighter amber (e.g. #fcd34d or #fde68a) | V8 | 4 | 2 | H | 1 |
| 15 | Verify `--color-state-live: #ef4444` (red) contrast on dark card #12152a — calculate | V8 | 4 | 1 | H | 1 |
| 16 | Verify `--color-state-gig` contrast on dark card — calculate | V8 | 4 | 1 | H | 1 |
| 17 | Verify `--color-state-prof: #06b6d4` (cyan) contrast on dark card — calculate; cyan should pass | V8 | 3 | 1 | M | 1 |
| 18 | Verify all four state colours on the admin cream card (`--dash-card: #f8f5f0`) — different background, recalculate | ADM | 4 | 2 | M | 1 |
| 19 | Verify `.rel-status-upcoming` contrast (amber text on amber tint on cream) independently from the state pill check | ADM | 4 | 2 | H | 1 |
| 20 | Verify `.rel-status-current` contrast (green text on green tint) as covered in C5, but also check non-colour indicator | ADM | 4 | 1 | M | 1 |
| 21 | Confirm `.rel-status-upcoming` and `.rel-status-current` use different shapes or icons in addition to colour | ADM | 3 | 2 | M | 1 |
| 22 | Verify the source badges in the fan list — `--source-ig` (pink), `--source-sp` (green), `--source-tt` (grey), `--source-direct` — distinguishable without hue | ADM | 4 | 2 | H | 1 |
| 23 | Add a short text label suffix to each source badge (IG / SP / TT / Direct) so hue is not the only differentiator | ADM | 4 | 2 | M | 1 |
| 24 | Verify source badge icons are included — icon + colour + text label is the safest three-channel approach | ADM | 4 | 2 | M | 1 |
| 25 | Verify the stat delta indicators (`--dash-t3` up/down arrows) use up-arrow and down-arrow icons, not colour alone | ADM | 4 | 1 | M | 1 |
| 26 | Confirm that positive delta is marked with both green colour AND an upward-pointing symbol | ADM | 4 | 1 | M | 1 |
| 27 | Confirm that negative delta is marked with both red colour AND a downward-pointing symbol | ADM | 4 | 1 | M | 1 |
| 28 | Verify `.ai-dot.view` (#7ec88a) and `.ai-dot.share` (#9b7cf4) activity dots are distinguishable without hue | ADM | 3 | 2 | M | 1 |
| 29 | Add icon or letter inside each activity dot (V for view, S for share) so colour-blind users can distinguish them | ADM | 3 | 3 | M | 2 |
| 30 | Verify the connection status indicator (`.ci-status`) uses text not colour — "Connected" / "Pending" labels | ADM | 4 | 1 | M | 1 |
| 31 | Verify `.ci-btn-connected` uses both colour and a visual checkmark or tick icon | ADM | 3 | 2 | M | 1 |
| 32 | Confirm the gig mode 24hr expiry countdown uses a clock icon plus text, not just amber colour | ADM | 3 | 1 | M | 1 |
| 33 | Verify the snap card published/unpublished state uses both colour and a label or icon | ADM | 3 | 1 | M | 1 |
| 34 | Verify the snap card `.snap-btn.published` uses a filled icon (published) vs empty icon (draft) in addition to colour | ADM | 3 | 2 | M | 1 |
| 35 | Confirm the upgrade tier indicator uses both a lock icon and the tier name text, not colour alone | ADM | 4 | 1 | L | 1 |
| 36 | Simulate protanopia on the admin page — use browser devtools colour vision deficiency emulator | ADM | 5 | 2 | H | 2 |
| 37 | Simulate deuteranopia on the admin page — check live (red) vs gig (orange) state pills | ADM | 5 | 2 | H | 2 |
| 38 | Simulate tritanopia on the admin page — check amber pre-release vs all other states | ADM | 4 | 2 | H | 2 |
| 39 | Simulate achromatopsia (greyscale) on the admin page — all states must be distinguishable when fully desaturated | ADM | 5 | 2 | H | 2 |
| 40 | Simulate protanopia on the profile page — check gig strip, state badge, countdown | V8 | 5 | 2 | H | 2 |
| 41 | Simulate achromatopsia on the profile page — confirm hero CTAs, pills, state badge are all distinguishable | V8 | 5 | 2 | H | 2 |
| 42 | Verify the gig strip (`.gig-strip.active`) on the profile uses a bold text label not relying on orange colour alone | V8 | 4 | 1 | M | 1 |
| 43 | Verify that the pre-release countdown timer text is visually distinct from the profile state text (different weight/size, not just colour) | V8 | 3 | 1 | M | 1 |
| 44 | Verify the "live" release badge (`.rel-status-current`) in admin uses both green and a live/active icon | ADM | 3 | 2 | M | 1 |
| 45 | Verify all form validation states (error/success) in admin use icon + colour, not colour alone | ADM | 4 | 1 | M | 1 |
| 46 | Verify the admin onboarding nudge uses a distinct icon per nudge type, not just colour coding | ADM | 3 | 1 | M | 1 |
| 47 | Verify start.html vibe selector uses distinct names and patterns on vibe tiles, not just accent colour swatches | STR | 4 | 1 | M | 1 |
| 48 | Verify the start.html progress indicator uses step numbers or labels in addition to fill colour | STR | 3 | 1 | M | 1 |
| 49 | Verify the landing page tier comparison table uses row labels not just cell shading to indicate tiers | LND | 3 | 1 | M | 1 |
| 50 | Verify the analytics trend charts in admin use pattern/shape fills not colour alone for different data series | ADM | 4 | 2 | M | 2 |
| 51 | Add distinct line styles (solid, dashed, dotted) to any admin analytics chart lines alongside colour differences | ADM | 4 | 3 | M | 2 |
| 52 | Verify that chart tooltips provide text values, not just coloured indicators | ADM | 3 | 2 | M | 2 |
| 53 | Verify the campaign arc (`.arc-node`) uses numbered steps in addition to colour | ADM | 4 | 1 | M | 1 |
| 54 | Confirm campaign arc done/active/upcoming nodes use shape differences (filled circle / outline circle / dot) | ADM | 4 | 2 | M | 1 |
| 55 | Verify the admin milestone strip uses a distinct milestone icon and text, not just a colour bar | ADM | 2 | 1 | L | 1 |
| 56 | Verify the Spotify import status in admin uses both a progress text label and a spinner/check icon | ADM | 3 | 1 | M | 1 |
| 57 | Check if error states use red (#c04030) with an error icon — confirm error icon is always present | ADM | 4 | 1 | M | 1 |
| 58 | Check if success states use green (#1e9650) with a check icon — confirm icon is always present | ADM | 4 | 1 | M | 1 |
| 59 | Verify the fan starred state (`.starred-fan`) uses a star icon, not just colour highlighting | ADM | 3 | 1 | M | 1 |
| 60 | Verify the admin QR code section uses a label ("Share link" / "QR code") not just visual icon alone | ADM | 2 | 1 | L | 1 |
| 61 | Check that the live stream embed status uses both a red dot AND "LIVE" text | V8 | 4 | 1 | M | 1 |
| 62 | Verify the merch availability status uses text labels ("Available" / "Sold out") not colour alone | V8 | 3 | 1 | M | 1 |
| 63 | Verify the events "sold out" vs "available" status uses text labels alongside any colour badge | V8 | 4 | 1 | M | 1 |
| 64 | Check the `.gig-badge` "on tonight" text — confirm it renders as text, not colour-only dot | V8 | 4 | 1 | M | 1 |
| 65 | Confirm that the pre-save vs stream CTA button difference is communicated through label text, not button colour alone | V8 | 4 | 1 | M | 1 |
| 66 | Verify that required form fields in admin and start.html use an asterisk or "Required" text, not just red border | ADM | 4 | 1 | M | 1 |
| 67 | Verify that invalid form fields use "Error: [reason]" helper text not just a red border | ADM | 4 | 1 | M | 1 |
| 68 | Verify that the fan email validation error in the fan capture form uses error text below the input | V8 | 5 | 1 | M | 1 |
| 69 | Verify the admin disabled state for buttons uses reduced opacity AND a label change, not colour alone | ADM | 3 | 1 | M | 1 |
| 70 | Verify the admin loading state uses a spinner icon + "Loading…" text, not a colour change alone | ADM | 3 | 1 | M | 1 |
| 71 | Verify the connection platform icons (Spotify, Instagram, TikTok) in admin use brand icons not just brand colours | ADM | 3 | 1 | L | 1 |
| 72 | Verify that the snap card type indicator (music / event / merch / custom) uses icon + type label, not colour alone | ADM | 3 | 2 | M | 1 |
| 73 | Simulate protanopia on start.html — confirm vibe selection is understandable without colour | STR | 3 | 2 | M | 2 |
| 74 | Simulate deuteranopia on landing.html — confirm tier feature table is clear | LND | 3 | 2 | M | 2 |
| 75 | Verify the admin amber upgrade bars are not the only indicator of tier limit — text percentage should also show | ADM | 4 | 1 | M | 1 |
| 76 | Verify admin progress bar shows a numeric value (e.g. "45/100 fans") alongside the coloured bar | ADM | 4 | 1 | M | 1 |
| 77 | Verify that the "Artist Pro" tier lock blur overlay includes text explaining what is locked | ADM | 4 | 1 | L | 1 |
| 78 | Verify the release countdown has a text label ("Days until release") not just a numeric countdown | V8 | 3 | 1 | L | 1 |
| 79 | Verify the "gig ends in" countdown uses text and a clock icon, not just colour | ADM | 3 | 1 | L | 1 |
| 80 | Check admin fan activity timeline — each entry type must be distinguishable by icon or label in addition to colour dot | ADM | 3 | 2 | M | 2 |
| 81 | Add a pattern or texture to the live state campaign arc background so it differs from gig by more than colour | ADM | 3 | 3 | M | 3 |
| 82 | Verify start.html CTA text clearly labels the action — "Save my page" not an ambiguous button shape | STR | 3 | 1 | L | 1 |
| 83 | Document the colour-blind safe pairings used in ABLE status system in DESIGN_SYSTEM_SPEC.md | ALL | 3 | 2 | L | 4 |
| 84 | Add a non-colour differentiation column to the status colour table in DESIGN_SYSTEM_SPEC.md | ALL | 3 | 2 | L | 4 |
| 85 | Create a screen-reader accessible `aria-label` for every coloured state pill | ADM | 4 | 2 | L | 3 |
| 86 | Add `role="status"` to campaign state live-region so screen reader announces state changes | ADM | 4 | 2 | M | 3 |
| 87 | Add `aria-label="Release status: upcoming"` to `.rel-status-upcoming` badge | ADM | 3 | 2 | L | 3 |
| 88 | Add `aria-label="Release status: current"` to `.rel-status-current` badge | ADM | 3 | 2 | L | 3 |
| 89 | Add `aria-label="Source: Instagram"` to `--source-ig` fan badge | ADM | 3 | 2 | L | 3 |
| 90 | Add `aria-label="Source: Spotify"` to `--source-sp` fan badge | ADM | 3 | 2 | L | 3 |
| 91 | Add `aria-label="Source: TikTok"` to `--source-tt` fan badge | ADM | 3 | 2 | L | 3 |
| 92 | Add `aria-label="Source: direct"` to `--source-direct` fan badge | ADM | 3 | 2 | L | 3 |
| 93 | Verify that the campaign state `aria-label` is updated dynamically when state changes via JS | ADM | 4 | 2 | M | 3 |
| 94 | Verify the gig strip on the profile has `aria-label` describing the active gig state | V8 | 4 | 2 | L | 3 |
| 95 | Verify the pre-release countdown is announced to screen readers via `aria-live` or `aria-label` | V8 | 4 | 2 | M | 3 |
| 96 | Write Playwright test that simulates protanopia (CSS filter) and screenshots the admin state pills | ADM | 4 | 3 | L | 5 |
| 97 | Write Playwright test that applies greyscale filter and confirms state pills are distinguishable by shape/label | ADM | 4 | 3 | L | 5 |
| 98 | Write Playwright test that queries `aria-label` of each campaign state pill and verifies it contains the state name | ADM | 4 | 3 | L | 5 |
| 99 | Write Playwright test that reads the computed `color` of `.rel-status-current` text and verifies it is not #34c759 | ADM | 4 | 3 | L | 5 |
| 100 | Write Playwright test that loads the live campaign state and verifies the gig strip text includes "tonight" | V8 | 3 | 3 | L | 5 |

## Wave Summary

| Wave | Points | Theme |
|---|---|---|
| 1 | 1–35, 42–50, 53–79, 82 | State pill checks, non-colour indicators, all status badges, form states, arc nodes |
| 2 | 36–41, 50–52, 73–74, 80 | Colour vision deficiency simulation, charts, fan activity timeline |
| 3 | 81, 85–95 | aria-labels, screen reader announcements, live regions |
| 4 | 83–84 | Documentation |
| 5 | 96–100 | Automated Playwright tests |
