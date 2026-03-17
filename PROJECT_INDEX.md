# ABLE — Project Index
**Machine-readable codebase map. Updated: 2026-03-17.**
*Keep under 300 lines. Use tables. Accuracy over completeness.*

---

## Active HTML files

### `able-v8.html` — Artist public profile (fan-facing)
**Lines:** 11,616 | **Status:** Active | **Spec:** `docs/pages/profile/DESIGN-SPEC.md`

| Section | ID | Notes |
|---|---|---|
| Owner edit bar | `#owner-bar` | Fan-view only. Hidden for artist. |
| Sticky artist bar | `#sticky-artist-bar` | Triggers at 70% hero scroll |
| Hero | `#hero` | Top card: artwork / video / embed |
| Bio strip | `#bio-strip` | Collapsible, hidden when empty |
| Countdown | `#countdown` | Pre-release state only |
| Hero CTAs | `#hero-ctas` | `#cta-primary` + `#cta-secondary` — max 2 |
| Close Circle entry | `#cc-hero-entry` | Gated content section |
| Platform pills | `#pills-section` | `#pills-track` — max 4/6 + overflow |
| Fan capture (primary) | `#fan-capture` | "Stay close." heading |
| World map | `#world-map-section` | Calendar + moments |
| Tab bar | `#tab-bar` | Sticky bottom nav |
| Listen / Music | `#listen-section` | Release cards |
| Videos | `#videos-section` | |
| Shows / Events | `#shows-section` | |
| Snap cards | `#snap-cards-section` | |
| Clips | `#clips-section` | YouTube/TikTok embeds |
| Merch | `#merch-section` | |
| Support | `#support-section` | Close Circle / Stripe |
| Credits | `#credits-section` | Collapsible |
| Recommendations | `#recs-section` | Artist/professional pool |
| Fan capture (secondary) | `#fan-capture-2` | Bottom of page repeat |
| Edit panel | `#edit-panel` | Owner-only side drawer |
| App shell | `#app-shell` | `data-theme`, `data-vibe`, `data-feel` attrs |

**Key JS functions** (all inside main `<script>` block, ~L6000+):

| Function | Purpose |
|---|---|
| `getProfile()` | Read `able_v3_profile` from localStorage |
| `applyIdentity(profile, shell)` | Apply vibe, feel, accent, font to DOM |
| `computeState(profile)` | Returns `profile`/`pre-release`/`live`/`gig` |
| `computeSectionOrder(profile)` | Returns ordered+visibility array |
| `applySectionOrder(profile)` | Renders section order to DOM |
| `renderPills(profile)` | Build platform pills with icons |
| `initWorldMap(profile)` | Calendar grid + moment panel |
| `initTabBar(shell)` | Bottom nav with scroll sync |
| `initStickyHero()` | A4/A11 sticky hero + name compression |
| `initCloseCircle(profile)` | Close Circle gated content |
| `safeLS(key, fallback)` | localStorage read with try/catch |
| `setLS(key, val)` | localStorage write with try/catch |

**localStorage keys read/written:**
`able_v3_profile` · `able_fans` · `able_clicks` · `able_views` · `able_shows` · `able_tier` · `able_clips` · `able_gig_expires`

---

### `admin.html` — Artist dashboard
**Lines:** 7,661 | **Status:** Active | **Spec:** `docs/pages/admin/DESIGN-SPEC.md`

| Page | ID | Notes |
|---|---|---|
| Home (overview) | `#page-home` | Default page. Greeting, Campaign HQ, stats, fans |
| Profile | `#page-profile` | Identity, music, events, snap cards, recommendations |
| Broadcasts | `#page-broadcasts` | Pro tier locked |
| Fans | `#page-fans` | Fan list, export, star, source breakdown |
| Analytics | `#page-analytics` | Top clicks, activity feed |

**Key sections on `#page-home`:**

| Element | ID | Notes |
|---|---|---|
| Greeting | `#homeGreeting` | 8-branch context-aware greeting system |
| First-run checklist | `#firstRunCard` | Auto-dismisses when complete |
| First fan card | `#firstFanCard` | One-time moment — `able_first_fan_seen` flag |
| Campaign HQ | `#campaignHQ` | Page state control arc |
| Stats row | `#statViews` etc. | Views, clicks, fans, CTR |
| Upgrade bar | `#upgradeBar` | Fan count + free plan indicator |

**Key JS functions** (main `<script>` block, ~L3434+):

| Function | Purpose |
|---|---|
| `renderProfile()` | Load and render profile from localStorage |
| `initCampaignHQ()` | Campaign HQ arc + gig mode init |
| `computeEffectiveState(data)` | Returns current campaign state |
| `computeAutoState(profile)` | Auto-computes state from release date |
| `toggleGigHQ()` | Toggle gig mode on/off |
| `checkAutoGig()` | Auto-gig from upcoming shows |
| `renderFanList(filter)` | Fan rows with stagger animation |
| `renderAdminMusic()` | Music section CRUD |
| `renderAdminEvents()` | Events/shows management |
| `showToast(message, tone, options)` | Amber/red/green toast |
| `applyGreeting()` | 8-branch dashboard greeting |
| `migrateWizardKey()` | Merges `able_profile` → `able_v3_profile` |
| `checkFirstFanMoment()` | First fan moment card |
| `safeLS(key, fallback)` / `setLS(key, val)` | localStorage wrappers |
| `getArtistId()` | Generate/read stable artist ID |

**localStorage keys read/written:**
`able_v3_profile` · `able_fans` · `able_clicks` · `able_views` · `able_shows` · `able_tier` · `able_clips` · `able_gig_expires` · `able_dismissed_nudges` · `able_starred_fans` · `admin_visit_dates` · `able_first_fan_seen` · `able_profile` (legacy, migrated on load)

---

### `start.html` — Onboarding wizard
**Lines:** 2,381 | **Status:** Active | **Spec:** `docs/pages/onboarding/DESIGN-SPEC.md`

Steps: Pre-0 (Spotify/Linktree import) → 1 (Name + vibe) → 2 (Moment/CTA) → 3 (Release) → Done

**Key JS functions:**

| Function | Purpose |
|---|---|
| `goToStep(id)` | Navigate wizard steps with spring progress bar |
| `doSpotifyImport()` | Netlify function call → prefill profile |
| `doLinktreeImport()` | `?import=linktree` param handler |
| `getDraft()` / `saveDraft(patch)` | Read/write wizard state |
| `initDone()` | Complete wizard, write `able_v3_profile` |
| `showDay1ShareCard(profile, url)` | Canvas share card |

**localStorage keys written:** `able_v3_profile` · `able_profile` (legacy, migrated by admin.html)

---

### `landing.html` — Marketing page
**Lines:** 1,982 | **Status:** Active | **Spec:** `docs/pages/landing/DESIGN-SPEC.md`

Sections: Hero · Interactive proof demo · Feature grid · Pricing · FAQ · Footer

**No localStorage access.** Links to `start.html`, `able-v8.html`.

---

## Design system tokens

### able-v8.html (artist profile)

| Token | Value | Notes |
|---|---|---|
| `--color-bg` | `#0d0e1a` | Midnight Navy |
| `--color-card` | `#12152a` | Card surface |
| `--color-accent` | artist-set | Default `#e05242` |
| `--font-body` | `'DM Sans'` | Body text |
| `--font-d` | `'Barlow Condensed'` | Display / artist name |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bounce entrances |
| `--ease-decel` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Standard |
| `--tap-min` | `44px` | Minimum touch target |
| `--text-hero` | `clamp(48px, 14vw, 80px)` | Artist name |

### admin.html (dashboard)

| Token | Value | Notes |
|---|---|---|
| `--bg` | `#0f1624` | Background |
| `--acc` | `#c9a84c` | Amber — admin accent |
| `--acc-rgb` | `201, 168, 76` | For rgba() use |
| `--font` | `'Plus Jakarta Sans'` | Body |
| `--font-d` | `'Barlow Condensed'` | Display headings |
| `--dash-bg` | `#e4dfd7` | Light theme floor |
| `--dash-card` | `#f8f5f0` | Light theme card |
| `--dash-t3` | `#767676` | Tertiary text (WCAG AA) |

---

## localStorage schema (canonical — never rename)

| Key | Shape | Owner |
|---|---|---|
| `able_v3_profile` | `{ name, bio, accent, theme, stateOverride, release, ctas, platformLinks, sections, snapCards, recommendations, identity }` | admin.html, v7.html |
| `able_fans` | `[{ email, ts, source, optIn, consentVersion }]` | v7.html (write), admin.html (read) |
| `able_clicks` | `[{ label, type, ts, source, sessionId }]` | v7.html (write), admin.html (read) |
| `able_views` | `[{ ts, source, sessionId, isArtist }]` | v7.html (write), admin.html (read) |
| `able_shows` | `[{ id, venue, date, city, doorsTime, ticketUrl, featured }]` | admin.html (write), v7.html (read) |
| `able_clips` | `[{ id, type, videoUrl, embedUrl, thumbnailUrl, caption, published, access, ts, sortOrder }]` | admin.html (write), v7.html (read) |
| `able_gig_expires` | Unix timestamp `number` | admin.html (write), v7.html (read) |
| `able_tier` | `"free"` / `"artist"` / `"artist-pro"` / `"label"` | admin.html |
| `able_dismissed_nudges` | `string[]` — nudge IDs | admin.html |
| `able_starred_fans` | `string[]` — emails (deprecated) | admin.html |
| `admin_visit_dates` | `string[]` — ISO dates (last 60) | admin.html |
| `fan_following` | `[{ artistSlug, followedAt }]` | fan.html |
| `fan_location` | `{ city, country, lat, lng, setAt }` | fan.html |

---

## Cross-file data flows

| From | To | Via | Data |
|---|---|---|---|
| `start.html` | `admin.html` | `able_v3_profile` | Full profile on wizard complete |
| `admin.html` | `able-v8.html` | `able_v3_profile` + `able_shows` etc. | All profile + content |
| `able-v8.html` | `admin.html` | `able_fans` · `able_clicks` · `able_views` | Fan sign-ups, CTA taps, views |
| `able-v8.html` | `fan.html` | `fan_following` (seeded by `writeFanFollow()`) | Fan follows artist on sign-up |
| `netlify/functions/` | `admin.html` / `start.html` | HTTP fetch | Spotify import, fan email, AI copy |

---

## Netlify functions

| File | Purpose |
|---|---|
| `netlify/functions/spotify-import.js` | Spotify metadata prefill for wizard |
| `netlify/functions/fan-confirmation.js` | Fan email on sign-up (requires `RESEND_API_KEY`) |
| `netlify/functions/ai-copy.js` | Claude Haiku bio + CTA suggestions |
| `netlify/functions/oembed-proxy.js` | CORS-safe oEmbed auto-fill |
| `netlify/functions/ticketmaster-import.js` | Ticketmaster events import |
