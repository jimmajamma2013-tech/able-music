# ABLE — QA Smoke Test Checklist
**Run after every prompt / code change.**
Check each item. Mark ✅ pass or ❌ fail with a note.

---

## How to run
1. Open `able-merged.html` in Chrome (localhost via Live Server or `file://`)
2. Open DevTools Console (F12) — keep it visible throughout
3. Work through each section in order
4. Screenshot any ❌ failure before fixing

---

## S1 — Page Load

| # | Check | How to verify |
|---|---|---|
| S1-01 | Page loads with no `console.error` | DevTools Console — zero red entries |
| S1-02 | No raw JavaScript text visible in the page body | Scroll the full page — no `function`, `const`, `//` etc as visible text |
| S1-03 | Admin dashboard renders: left nav, centre panel, right preview | Visual check |
| S1-04 | Phone frame preview shows a profile (not blank) | Check right panel |
| S1-05 | No `<script>` tag content rendered as body text | Ctrl+F for `function ` in rendered page — 0 results |

---

## S2 — Theme Switching

| # | Check | How to verify |
|---|---|---|
| S2-01 | Light mode: white background, dark text | Click Light toggle |
| S2-02 | Dark mode: dark background, light text | Click Dark toggle |
| S2-03 | Image mode: background image visible, cards have frosted glass effect | Click Image toggle |
| S2-04 | All three switches complete with no page reload | Check URL doesn't change |
| S2-05 | In Image mode, card text is readable (no white-on-white or black-on-black) | Visual contrast check |
| S2-06 | Theme persists on page reload | Set to Dark → F5 → should still be Dark |

---

## S3 — Preview Mode Switcher

| # | Check | How to verify |
|---|---|---|
| S3-01 | "Pre-Release" button updates hero primary button text (default: "💿 Pre-save on Spotify") | Click Pre-Release, observe phone frame |
| S3-02 | "Live" button updates hero primary button (default: "▶️ Listen Now") | Click Live |
| S3-03 | "Profile" button updates hero primary button (default: "🎵 Listen on Spotify") | Click Profile |
| S3-04 | "Gig" button updates hero primary button (default: "🎫 Get Tickets") | Click Gig |
| S3-05 | Each mode also updates the secondary hero button | Check secondary button for each mode |
| S3-06 | Mode switch completes within 300ms (no lag) | Visual / DevTools Performance |

---

## S4 — Auto-State / Mode Buttons Card

| # | Check | How to verify |
|---|---|---|
| S4-01 | Auto-State tab exists in left nav | Click it |
| S4-02 | "Mode Buttons" card is present with 4 rows (pre-release, live, evergreen, gig) | Scroll to card |
| S4-03 | Each row has: Primary (icon + text + url) and Secondary (icon + text + url) inputs | Expand a row |
| S4-04 | Editing Primary text for "live" mode immediately updates the hero button in the preview | Type in the field, observe phone frame |
| S4-05 | Values persist after page reload | Edit a field → F5 → re-open card → value preserved |

---

## S5 — Action Links Tab

| # | Check | How to verify |
|---|---|---|
| S5-01 | Action Links tab renders clean list — no "P1 / P2 / Pill" position badges | Visual check |
| S5-02 | All active links appear as pills in the phone preview below the hero buttons | Enable 2+ links, check preview |
| S5-03 | Toggling a link on/off updates the pills in the preview immediately | Toggle a link |
| S5-04 | "Add Link" button opens the modal | Click it |
| S5-05 | Modal shows quick-pick preset chips | Check modal body |
| S5-06 | "Show more options" button reveals 6 category sections with additional presets | Click it |
| S5-07 | Clicking a preset fills the icon + text fields | Click a chip |
| S5-08 | Closing the modal resets "Show more" to hidden | Open → Show more → Close → Re-open → "Show more" collapsed |
| S5-09 | Dragging a link to reorder updates pill order in preview | Drag test |

---

## S6 — Music Section

| # | Check | How to verify |
|---|---|---|
| S6-01 | Music tab exists and shows release entries (if any) | Click Music in left nav |
| S6-02 | Each release card has: title, type, platform fields | Check a card |
| S6-03 | Adding a release with a Spotify URL updates the Streaming section action button on the profile | Add release → check profile section header |
| S6-04 | Display mode switcher (Tracklist / Embeds / Both) exists per-release or globally | Locate the control |
| S6-05 | In Tracklist mode, no iframe embeds appear — just track rows | Switch to Tracklist |
| S6-06 | Track rows show: number · title · duration only (no buttons) | Visual check |
| S6-07 | In Embeds mode, Able Cards with platform iframes appear | Switch to Embeds |
| S6-08 | Iframe is contained within the card — does not overflow | Scroll card edges |

---

## S7 — Events Section

| # | Check | How to verify |
|---|---|---|
| S7-01 | Events tab renders event entries | Add a test event |
| S7-02 | Adding an event with a future date and ticketUrl populates the Tour section action button | Check profile preview |
| S7-03 | Past-dated events do NOT populate the section action button | Add past event, check button |
| S7-04 | If no upcoming events with ticket URLs exist, the section action button is hidden | Delete all events, check |

---

## S8 — Merch Section

| # | Check | How to verify |
|---|---|---|
| S8-01 | Merch tab has a "Store URL" field in the settings card | Click Merch → Settings card |
| S8-02 | Filling in the Store URL updates the Merch section action button on the profile | Type a URL, check preview |
| S8-03 | Store URL persists on page reload | F5 → check field |

---

## S9 — Credits

| # | Check | How to verify |
|---|---|---|
| S9-01 | Credits tab exists in left nav | Click it |
| S9-02 | Credits appear on individual release cards (footer, collapsed by default) | Add a credit to a release |
| S9-03 | Credits toggle shows correct count ("N credits") | Visual check |
| S9-04 | Expanding credits shows name + role rows | Click toggle |
| S9-05 | Credits section on the profile lists collaborators | Check profile preview |

---

## S10 — Profile & Hero

| # | Check | How to verify |
|---|---|---|
| S10-01 | Profile tab: editing artist name updates the phone frame preview within 500ms | Type in name field |
| S10-02 | Avatar image upload (or URL) appears in the hero | Set an avatar |
| S10-03 | Hero image appears behind the hero area | Set a hero image |
| S10-04 | Bio text renders (truncated if long, expandable) | Add bio > 3 lines |
| S10-05 | Share button is present in the hero | Check profile preview |
| S10-06 | Handle / location shows below the name | Fill in those fields |

---

## S11 — Mobile Responsiveness

| # | Check | How to verify |
|---|---|---|
| S11-01 | Profile is fully readable at 375px viewport | DevTools → Device Mode → iPhone SE |
| S11-02 | Hero buttons are full-width or appropriately sized — not clipped | Visual check at 375px |
| S11-03 | Quick Action pills wrap correctly (no horizontal scroll) | Check pill row at 375px |
| S11-04 | Able Cards do not overflow viewport | Check card edges |
| S11-05 | All tap targets are ≥ 44px tall | DevTools Accessibility → check elements |

---

## S12 — QR Code

| # | Check | How to verify |
|---|---|---|
| S12-01 | QR code renders in admin right panel | Visual check |
| S12-02 | QR code encodes the correct profile URL | Scan it |
| S12-03 | Changing the handle updates the QR code | Edit handle → check QR |

---

## S13 — Data Persistence

| # | Check | How to verify |
|---|---|---|
| S13-01 | All form data survives a hard refresh (F5) | Fill forms → F5 → check |
| S13-02 | localStorage contains expected keys after filling data | DevTools → Application → Local Storage |
| S13-03 | No `console.error` appears when localStorage is full or unavailable | N/A unless testing storage limits |

---

## Regression Tags

When a test fails, tag it with the prompt number that introduced the regression:
```
❌ S6-03 — broken by Prompt 4 (display modes refactor)
```
This makes bisecting straightforward.
