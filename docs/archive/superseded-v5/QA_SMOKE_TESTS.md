# ABLE — QA Smoke Test Checklist
**Run after every prompt / code change. Target: 5–10 minutes.**
Check each item. Mark ✅ pass or ❌ fail with a note.

---

## How to run
1. Open `able-merged.html` in Chrome (localhost via Live Server or `file://`)
2. Open DevTools Console (F12) — keep it visible throughout
3. Work through each section in order
4. Screenshot any ❌ failure before fixing
5. Use **Test Mode → Seed demo data** to populate Events/Merch before running S7/S8

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
| S7-01 | **Add Event modal resets all fields on open** | Open modal, fill fields, close, re-open — all fields blank |
| S7-02 | **Ticket URL enrich preview shows correct provider after debounce** | Paste `https://dice.fm/event/x` → wait 300ms → banner shows "Ticket link: Dice" |
| S7-03 | **Enrich preview shows Eventbrite for Eventbrite URL** | Paste `https://www.eventbrite.co.uk/e/demo` → banner shows "Eventbrite" |
| S7-04 | **Enrich preview hides when URL is cleared** | Clear the ticket URL field → preview row disappears |
| S7-05 | **Close via X releases scroll lock** | Open modal → click ✕ → page scrolls normally |
| S7-06 | **Close via backdrop releases scroll lock** | Open modal → click outside modal → page scrolls normally |
| S7-07 | **Save + reload persists event** | Add event → F5 → event still listed in admin |
| S7-08 | **Bento sorts future events first** | Seed demo data → profile preview → London show (14 days) appears before Amsterdam (60 days) |
| S7-09 | **Past events show at 50% opacity in bento** | Seed demo data → profile preview → SXSW/New York tiles visibly faded |
| S7-10 | **Bento caps at 6 tiles max** | Add 10 events → profile preview bento has at most 6 tiles |
| S7-11 | **Ticket CTA button appears on event bento tile** | Seed demo data → Dice event tile has "Dice ↗" pill button |
| S7-12 | **Events error banner shows on forced crash** | In console: `EVENTS_KEY = null; renderEventList()` → red banner visible |
| S7-13 | **Events error banner hides on successful render** | Restore key → call `renderEventList()` → banner hidden |
| S7-14 | **Empty bento shows friendly message** | Clear all events → profile preview bento shows "No upcoming shows…" |

---

## S8 — Merch Section

| # | Check | How to verify |
|---|---|---|
| S8-01 | **Add Product modal resets all fields on open** | Open modal, fill fields, close, re-open — all fields blank |
| S8-02 | **Purchase URL enrich preview shows correct provider** | Paste `https://demo.bandcamp.com/merch/x` → banner shows "Store: Bandcamp" |
| S8-03 | **Enrich preview shows Gumroad for Gumroad URL** | Paste `https://demo.gumroad.com/l/x` → banner shows "Gumroad" |
| S8-04 | **Auto-fill product name only if blank** | Leave name blank → paste Bandcamp URL → name auto-fills from URL slug |
| S8-05 | **Auto-fill never overwrites a manually typed name** | Type "My Product" → paste URL → name unchanged |
| S8-06 | **Close via X releases scroll lock** | Open modal → click ✕ → page scrolls normally |
| S8-07 | **Close via backdrop releases scroll lock** | Open modal → click outside → page scrolls normally |
| S8-08 | **Save + reload persists product** | Add product → F5 → product still listed in admin |
| S8-09 | **Product tile uses artworkUrl then image** | Seed product with `artworkUrl` → profile tile shows that image |
| S8-10 | **CTA label uses providerTitle (e.g. "Bandcamp ↗")** | Seed demo → profile merch tile for Bandcamp item shows "Bandcamp ↗" pill |
| S8-11 | **Price displays once — no double-$ or double-£** | Seed demo → inspect merch tile — price shows "£30" not "££30" |
| S8-12 | **Merch section hides when no products** | Clear all merch → profile preview → `#merch` section not visible |
| S8-13 | **Merch section returns when product added** | Add a product → profile preview → `#merch` section reappears |
| S8-14 | **Store URL persists on page reload** | Fill in Store URL field → F5 → field still populated |
| S8-15 | **Merch error banner shows on forced crash** | In console: `MERCH_KEY = null; renderMerchList()` → red banner visible |

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

## S14 — Test Mode Panel

| # | Check | How to verify |
|---|---|---|
| S14-01 | Test Mode card exists in Settings tab | Click Settings → scroll to bottom → dashed-border "🔬 Test Mode" card |
| S14-02 | Card expands and collapses on click | Click header → body shows; click again → body hides |
| S14-03 | **Seed demo data** populates Events + Merch + Music | Click "🌱 Seed demo data" → check Events and Merch tabs |
| S14-04 | Seeding twice produces same result (deterministic) | Click seed → note event IDs → click seed again → same IDs, same count |
| S14-05 | **Clear local data** removes all Able keys | Click "🗑 Clear local data" → DevTools Application → Local Storage — no `able_` keys |
| S14-06 | Clear does NOT wipe non-Able localStorage keys | Add a key `my_other_app = x` → Clear → key still present |
| S14-07 | **Print state summary** shows counts in the panel pre box | Click "📋 Print state summary" → `#smokeCheckOutput` shows releases/events/merch counts |
| S14-08 | **Run Assertions** shows PASS/FAIL lines in panel | Click "✅ Smoke checks" → output shows lines prefixed `[PASS]` or `[FAIL]` |
| S14-09 | Run Assertions: Events error banner check passes | After seed → Run Assertions → `[PASS] eventsTabErrorBanner exists` |
| S14-10 | Run Assertions: Merch error banner check passes | Same → `[PASS] merchTabErrorBanner exists` |
| S14-11 | Run Assertions: Merch price double-$ check passes | Seeded prices use "£30" not "$$30" → `[PASS] Merch prices: no double-$` |

---

## S15 — Global / Regression Guards

| # | Check | How to verify |
|---|---|---|
| S15-01 | **No console.error on page load** | Hard-refresh (Cmd+Shift+R) → Console tab → zero red entries |
| S15-02 | **All tabs/nav still work** | Click every left-nav item — each tab panel renders without blank or error |
| S15-03 | **Appearance changes propagate to preview** | Change accent colour → phone frame preview updates colour immediately |
| S15-04 | **Appearance propagates to full-page overlay** | Open full-page preview → change theme → overlay updates |
| S15-05 | **Appearance propagates to mobile preview overlay** | Open mobile preview → change theme → overlay updates |
| S15-06 | **All 3 JS script blocks parse clean (automated)** | Run `node -e "…"` parse check — all 3 blocks OK |
| S15-07 | **No horizontal scroll on profile at 375px** | DevTools Device Mode → iPhone SE → scroll profile — no horizontal overflow |

---

## Regression Tags

When a test fails, tag it with the prompt number that introduced the regression:
```
❌ S6-03 — broken by Prompt 4 (display modes refactor)
```
This makes bisecting straightforward.
