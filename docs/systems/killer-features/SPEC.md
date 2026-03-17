# ABLE — Killer Features: Specification
**Created: 2026-03-16 | Revised: 2026-03-16 | Status: ACTIVE — implementation spec**

Priority order: P0 (immediate, V1) → P1 (next sprint, V1) → P2 (V2, backend required)

---

## P0 — Auto-gig mode from calendar

### What it does exactly

When the current time crosses a show's `doorsTime` in `able_shows`, gig mode auto-activates — without any artist action. It deactivates automatically 4 hours after doors, or at midnight if no doors time is set. A show marked as "featured" (`featured: true`) takes priority if multiple shows exist on the same date.

The manual 24-hour toggle in admin remains — it's the override for artists who want to activate early (e.g. announcing at soundcheck) or for artists without a show in the system.

### Artist journey

1. Artist adds a show in admin as normal — venue, date, doors time, ticket URL.
2. On show day, at doors time, the artist's ABLE page automatically shifts to gig mode. The artist does nothing.
3. Admin shows a passive indicator: "On tonight — [Venue Name], doors [time]. Auto from your shows list." with a manual override option to deactivate.
4. 4 hours after doors, gig mode deactivates. Page returns to previous state (live / pre-release / profile — whatever it was before).
5. In admin, the show is marked as past. No cleanup required from the artist.

### Fan journey

1. Fan visits the ABLE page during the show window.
2. They see gig mode: tickets front, "On tonight" tag, venue name, doors time.
3. Tickets CTA is primary. If sold out is flagged, "Sold out" replaces the ticket CTA.
4. Fan experience is identical to manual gig mode — this is invisible infrastructure.

### Data model changes

No new localStorage keys required. Reads from existing `able_shows` and `able_gig_expires`.

### Exact implementation

```javascript
// ─── Helper: is this date string today? ────────────────────────────────────
function isToday(dateStr) {
  const d = new Date(dateStr);
  const n = new Date();
  return d.getFullYear() === n.getFullYear()
      && d.getMonth()    === n.getMonth()
      && d.getDate()     === n.getDate();
}

// ─── Helper: parse doors time into Unix ms ─────────────────────────────────
// dateStr: "2026-05-10", doorsTime: "19:30"
function parseDoorsTime(dateStr, doorsTime) {
  if (!doorsTime) {
    // No doors time: use midnight (00:00) of the show date
    return new Date(dateStr + 'T00:00:00').getTime();
  }
  return new Date(dateStr + 'T' + doorsTime + ':00').getTime();
}

// ─── Auto-gig check ─────────────────────────────────────────────────────────
// Runs on page load and every 60 seconds in able-v7.html and admin.html.
// Returns { active, show, expiresMs, source } or { active: false }
function checkAutoGig() {
  // Do not override an unexpired manual gig
  const manualExpiry = parseInt(localStorage.getItem('able_gig_expires') || '0', 10);
  if (manualExpiry > Date.now()) {
    return { active: true, source: 'manual', expiresMs: manualExpiry };
  }

  try {
    const shows = JSON.parse(localStorage.getItem('able_shows') || '[]');
    const todayShows = shows.filter(s => isToday(s.date) && !s.cancelled);

    // Featured show takes priority; otherwise use first show today
    const priority = todayShows.find(s => s.featured) || todayShows[0];
    if (!priority) return { active: false };

    const now       = Date.now();
    const doorsMs   = parseDoorsTime(priority.date, priority.doorsTime);
    const expiresMs = doorsMs + (4 * 60 * 60 * 1000); // 4 hours after doors

    if (now >= doorsMs && now < expiresMs) {
      // Auto-activate: write gig expiry so the existing countdown bar works
      localStorage.setItem('able_gig_expires', String(expiresMs));
      return { active: true, show: priority, expiresMs, source: 'auto' };
    }

    // Show is today but pre-doors — surface "Turn on now" prompt in admin
    if (now < doorsMs) {
      return { active: false, showToday: true, show: priority, doorsMs, source: 'none' };
    }
  } catch (e) {
    console.warn('[ABLE] checkAutoGig error:', e.message);
  }

  return { active: false };
}

// ─── Poll every 60 seconds (add to able-v7.html and admin.html) ────────────
// Call checkAutoGig() on page load first, then set up the interval.
// The interval handles artists who leave the page open across the doors time.
setInterval(() => {
  const result = checkAutoGig();
  applyGigState(result); // existing function that renders the gig state in the UI
}, 60 * 1000);
```

New field on the returned gig state object: `source: 'auto' | 'manual' | 'none'` — so admin UI can show "Auto from calendar" vs "Manual" in the gig mode indicator.

### Copy (ABLE voice)

Admin indicator (auto-active):
> "On tonight — [Venue], doors [time]. Auto from your shows list."

Admin override:
> "Turn off early"

Admin (manual override available when show is today but pre-doors):
> "You're playing tonight. Gig mode goes on at [time] — or turn it on now."

Fan-facing (unchanged from existing gig mode copy):
> "On tonight." / "Doors [time]." / "Get tickets."

### V1 scope

Pure localStorage + `setInterval` logic. No backend required. Everything runs in the browser.

V1 includes:
- Auto-activate at doors time
- Auto-deactivate 4 hours post-doors
- Admin indicator showing source (auto vs manual)
- "Turn on now" manual override when show is today but pre-doors
- Fallback: midnight deactivation if no doors time set
- Does not override an unexpired manual gig

V2 additions:
- Server-side time authority (prevents spoofing by device clock)
- Push notification to artist when auto-gig activates
- Multiple shows on same day — priority resolution UI in admin

### Build complexity: S

One `setInterval` check, one `checkAutoGig()` function, minor admin UI indicator change. All existing gig mode infrastructure is reused. Estimated: 2–3 hours build + test.

---

## P0 — Deep link campaigns

### What it does exactly

When an artist shares `ablemusic.co/luna?campaign=vinyl-restock`, the ABLE page:
1. Parses `?campaign=` from the URL on load
2. Auto-scrolls to the relevant section based on campaign-type mapping
3. Shows a contextual chip using the campaign name (5-second auto-dismiss)
4. Tags all events (fan sign-ups, CTA clicks, page views) with `source: 'vinyl-restock'`

Artists generate campaign URLs in admin with a simple UI: type a campaign name, pick a destination section, copy the URL.

### Artist journey

1. Artist is about to post a Story about their vinyl restock.
2. In admin → Analytics → Campaign links: they tap "New campaign link."
3. They type: "vinyl-restock" (or choose from suggestions: "merch-drop", "new-single", "tour-announce").
4. They select destination: "Merch section."
5. ABLE generates: `ablemusic.co/luna?campaign=vinyl-restock`
6. They copy it and paste into their Story.
7. Later in admin → Analytics, they see: "vinyl-restock: 340 visits, 47 sign-ups, 23 merch clicks."

### Fan journey

1. Fan sees Story about vinyl restock, taps link.
2. ABLE page loads. After a brief entrance animation, page smooth-scrolls to the merch section.
3. A contextual chip appears near the merch section heading (not a modal, not a banner):
   > "You're here from the vinyl restock."
   This disappears after 5 seconds or on first scroll. Non-intrusive.
4. Fan browses, buys, signs up. All analytics tagged with campaign source.

### Data model changes

New localStorage key: `able_campaigns` — array of defined campaign links.
```javascript
// able_campaigns — array of campaign link definitions
[{
  id:      'vinyl-restock',   // URL-safe campaign identifier
  label:   'Vinyl restock',   // human label shown in admin analytics
  section: 'merch',           // destination section
  created: 1710000000000,     // Unix ms
}]
```

No new keys needed for event tracking — campaign source appends to existing `source` field in events.

### Exact implementation

```javascript
// ─── Step 1: Parse campaign param and inject into all events ───────────────
// Place at the very top of able-v7.html's init sequence, before any other reads.
const CAMPAIGN_SOURCE = new URLSearchParams(window.location.search).get('campaign') || null;

// ─── Step 2: Section destination mapping ──────────────────────────────────
// Maps campaign ID keywords to section element IDs in able-v7.html.
// Artist can override by selecting a section explicitly in the campaign creator.
const CAMPAIGN_SECTION_MAP = {
  'merch':   '#merch',          // any campaign containing 'merch', 'vinyl', 'tee', 'store'
  'show':    '#events',         // 'show', 'tour', 'tickets', 'gig'
  'tour':    '#events',
  'ep':      '#music',          // 'ep', 'album', 'single', 'drop'
  'album':   '#music',
  'single':  '#music',
  'support': '#support',        // 'support', 'patreon', 'bandcamp'
};

function getCampaignSection(campaignId) {
  if (!campaignId) return null;
  const lower = campaignId.toLowerCase();
  for (const [keyword, sectionId] of Object.entries(CAMPAIGN_SECTION_MAP)) {
    if (lower.includes(keyword)) return sectionId;
  }
  // Try looking up in able_campaigns for an explicit section override
  try {
    const campaigns = JSON.parse(localStorage.getItem('able_campaigns') || '[]');
    const match = campaigns.find(c => c.id === campaignId);
    if (match?.section) return '#' + match.section;
  } catch (e) { /* safe to ignore */ }
  return null; // no match — no scroll, land on hero
}

// ─── Step 3: Auto-scroll to target section on page load ───────────────────
// Call after all sections are rendered. Smooth scroll, reduced-motion aware.
function applyCampaignScroll() {
  if (!CAMPAIGN_SOURCE) return;
  const targetId = getCampaignSection(CAMPAIGN_SOURCE);
  if (!targetId) return;
  const el = document.querySelector(targetId);
  if (!el) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
}

// ─── Step 4: Contextual chip ───────────────────────────────────────────────
// Displays briefly near the campaign destination section. Auto-dismisses.
// Must be accessible: aria-live for screen readers, motion-safe.
function showCampaignChip(campaignId) {
  if (!campaignId) return;
  const label = (() => {
    try {
      const campaigns = JSON.parse(localStorage.getItem('able_campaigns') || '[]');
      const match = campaigns.find(c => c.id === campaignId);
      return match?.label || campaignId.replace(/-/g, ' ');
    } catch { return campaignId.replace(/-/g, ' '); }
  })();

  const chip = document.createElement('div');
  chip.className    = 'campaign-chip';
  chip.setAttribute('role', 'status');
  chip.setAttribute('aria-live', 'polite');
  chip.textContent  = `You\u2019re here from the ${label}.`;

  const targetId = getCampaignSection(campaignId);
  const anchor   = targetId ? document.querySelector(targetId) : document.body;
  if (anchor) anchor.insertAdjacentElement('afterend', chip);
  else document.body.appendChild(chip);

  // Auto-dismiss: 5s or on first scroll, whichever comes first
  const dismiss = () => {
    chip.style.opacity = '0';
    setTimeout(() => chip.remove(), 300);
    window.removeEventListener('scroll', dismiss);
  };
  setTimeout(dismiss, 5000);
  window.addEventListener('scroll', dismiss, { once: true, passive: true });
}

// ─── Step 5: Inject CAMPAIGN_SOURCE into all event writes ─────────────────
// Each of the three event write functions (writeFanSignup, writeClick, writeView)
// must use CAMPAIGN_SOURCE || 'direct' as the source value when no other source
// is already set from a ?src= param.
//
// Example — writeFanSignup in able-v7.html:
function writeFanSignup(email, name = '') {
  const fans   = JSON.parse(localStorage.getItem('able_fans') || '[]');
  const source = new URLSearchParams(window.location.search).get('src')
              || CAMPAIGN_SOURCE
              || 'direct';
  fans.push({ email, name, ts: Date.now(), source, optIn: true, isStarred: false });
  localStorage.setItem('able_fans', JSON.stringify(fans));
}
// Apply same pattern to writeClick() and writeView().
```

### Admin — campaign link generator

In admin.html analytics tab, add a "Campaign links" section:

```javascript
// Generates a campaign URL from the artist's profile slug + campaign ID
function generateCampaignUrl(campaignId, section) {
  const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
  const slug    = profile.artistSlug
               || (profile.name || 'artist').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const url     = `https://ablemusic.co/${slug}?campaign=${encodeURIComponent(campaignId)}`;
  // Save campaign to local list for analytics display
  const campaigns = JSON.parse(localStorage.getItem('able_campaigns') || '[]');
  if (!campaigns.find(c => c.id === campaignId)) {
    campaigns.push({ id: campaignId, label: campaignId.replace(/-/g, ' '), section, created: Date.now() });
    localStorage.setItem('able_campaigns', JSON.stringify(campaigns));
  }
  return url;
}
```

### Copy (ABLE voice)

Admin — campaign creator:
> "Where should this link take people?"
> "Name this campaign" (placeholder: "vinyl-restock, summer-tour, ep-drop...")

Admin — generated URL display:
> "Your link: ablemusic.co/[slug]?campaign=vinyl-restock"
> "Anyone who arrives through this link will show up separately in your analytics."

Fan-facing contextual chip (5-second auto-dismiss):
> "You came from the vinyl restock."

### V1 scope

V1 includes:
- URL parameter parsing on page load in `able-v7.html`
- Section auto-scroll on load (smooth, instant if reduced-motion)
- Source tagging on all existing event writes
- Campaign link generator in admin (generate URL, copy to clipboard)
- Basic campaign breakdown in analytics view (visits/sign-ups/clicks per source)
- Contextual fan chip (auto-dismiss, non-modal, accessible)

V2 additions:
- Campaign performance comparison charts
- UTM parameter passthrough (for Google Analytics / PostHog)
- Campaign-specific hero copy override (artist writes custom message per campaign)

### Build complexity: M

URL parsing is trivial. Auto-scroll exists (tabs use it). Event tagging requires touching 3–4 write functions. Analytics breakdown UI is new. Admin campaign creator is new UI. Estimated: 6–8 hours build + test.

---

## P0 — Day 1 share card (the most important missing feature)

### What it is and why it matters

After the wizard completes, the artist has a live ABLE page. This is the highest-possible-motivation moment. They just set up. They're proud. They want to share it.

Currently: the wizard fades to black, or redirects to admin. The artist is left to figure out for themselves how to share their page. Most do not. The page sits dormant. ABLE gets no organic growth. The first fans never arrive.

The Day 1 share card is the bridge between "I completed setup" and "I have my first fans." It appears immediately after the wizard finishes, full-screen, with everything the artist needs to share in one place. Without it, ABLE is a tool artists set up and forget.

### What it shows

A full-screen interstitial in `start.html` shown immediately after `completeWizard()` runs and before any redirect to admin.html. It contains:

1. **"Your page is live."** — the headline. Not "You're all set." Not "Welcome to ABLE." Just that.
2. **The actual URL** — `ablemusic.co/[slug]` — large, copyable, with a one-tap copy button.
3. **A Copy link button** — copies the URL to clipboard with a brief "Copied" confirmation.
4. **Pre-written Instagram caption** — pre-filled text the artist can copy and paste directly into Instagram. Editable.
5. **Pre-written tweet** — for Twitter/X. Pre-filled, editable.
6. **"Open my page" link** — opens the artist's live page in a new tab so they can see it first.
7. **"Go to your dashboard"** — the exit path to admin.html.

### Exact implementation

```javascript
// ─── Day 1 share card ─────────────────────────────────────────────────────
// Called immediately after completeWizard() in start.html.
// Replaces the wizard screen with a full-screen share moment.
function showDay1ShareCard(profile) {
  const slug = profile.artistSlug
            || (profile.name || 'artist').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const url  = `https://ablemusic.co/${slug}`;

  // Pre-written captions — ABLE voice, first person, no exclamation marks
  const name     = profile.name || 'My page';
  const igCaption = `My page is live.\n\nMusic, shows, and updates — all in one place.\n\n${url}`;
  const tweet     = `My page is live. ${url}`;

  // Render the share card screen
  const wizard = document.getElementById('wizard-root') || document.body;
  wizard.innerHTML = `
    <div class="share-card" role="main">
      <div class="share-card__body">
        <p class="share-card__headline">Your page is live.</p>

        <div class="share-card__url-row">
          <span class="share-card__url" id="sc-url">${url}</span>
          <button class="share-card__copy-btn" id="sc-copy-url"
                  aria-label="Copy link to clipboard">Copy link</button>
        </div>

        <div class="share-card__captions">
          <div class="share-card__caption-block">
            <label class="share-card__caption-label">Instagram caption</label>
            <textarea class="share-card__caption-text" id="sc-ig"
                      rows="4" aria-label="Instagram caption">${igCaption}</textarea>
            <button class="share-card__copy-btn" data-copy="sc-ig"
                    aria-label="Copy Instagram caption">Copy</button>
          </div>

          <div class="share-card__caption-block">
            <label class="share-card__caption-label">Tweet</label>
            <textarea class="share-card__caption-text" id="sc-tweet"
                      rows="2" aria-label="Tweet text">${tweet}</textarea>
            <button class="share-card__copy-btn" data-copy="sc-tweet"
                    aria-label="Copy tweet">Copy</button>
          </div>
        </div>

        <div class="share-card__actions">
          <a href="${url}" target="_blank" rel="noopener noreferrer"
             class="share-card__preview-link">See my page</a>
          <a href="/admin.html" class="share-card__dashboard-link">Go to your dashboard</a>
        </div>
      </div>
    </div>
  `;

  // Wire copy buttons
  document.querySelectorAll('.share-card__copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.copy;
      const text     = targetId
        ? document.getElementById(targetId)?.value || ''
        : url;
      navigator.clipboard.writeText(text).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(() => { btn.textContent = orig; }, 1500);
      }).catch(() => {
        // Fallback for browsers without clipboard API
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      });
    });
  });
}
```

**Call site in start.html — the exact place to call it:**
```javascript
// In completeWizard() or its equivalent, after localStorage.setItem('able_v3_profile', ...):
function completeWizard() {
  const profile = buildProfileFromWizardState();
  localStorage.setItem('able_v3_profile', JSON.stringify(profile));
  sessionStorage.removeItem('able_wizard_draft');
  // Show Day 1 share card instead of redirecting immediately
  showDay1ShareCard(profile);
  // The artist exits to admin.html via the "Go to your dashboard" link — not an auto-redirect
}
```

### Copy (ABLE voice)

The share card follows the copy philosophy exactly:

| Element | Copy |
|---|---|
| Headline | "Your page is live." |
| URL row label | (none — the URL speaks for itself) |
| Copy link button | "Copy link" → "Copied" (after tap) |
| Instagram section label | "Instagram caption" |
| Tweet section label | "Tweet" |
| Pre-written IG caption | "My page is live.\n\nMusic, shows, and updates — all in one place.\n\n[url]" |
| Pre-written tweet | "My page is live. [url]" |
| Preview link | "See my page" |
| Dashboard link | "Go to your dashboard" |

Do NOT write:
- "You're all set." — generic SaaS micro-copy
- "Share your page with the world!" — exclamation mark and hyperbole
- "Get your first fans" — selling language
- "Start growing your audience" — wrong register entirely

### Why this is the most important missing feature

1. **Activation rate is the single most important metric at launch.** An artist who completes setup but does not share is a dormant user. The share card converts "completed setup" into "first link shared."

2. **ABLE's growth is organic, artist-driven.** Every artist who shares their ABLE link from the Day 1 card is a free acquisition channel for new artists. When fans see the link and ask "what's ABLE?" — that's a new artist signup. There is no paid alternative.

3. **The pre-written captions remove friction at the highest-motivation moment.** Writing an Instagram caption takes 5 minutes of cognitive effort. At the moment the wizard completes, the artist is motivated but has done a lot already. A pre-written caption that they can copy with one tap removes the friction between "I want to share this" and "I shared this."

4. **Every day an artist doesn't share is a fan who didn't sign up.** The decay curve is steep — most artists who don't share within 24 hours of setup don't share at all.

### V1 scope

V1 includes:
- Full-screen share card shown after wizard completion
- Live URL, copy button
- Pre-written Instagram caption (editable, copyable)
- Pre-written tweet (editable, copyable)
- "See my page" link (new tab)
- "Go to your dashboard" exit

V2 additions:
- Web Share API (mobile native share sheet: `navigator.share({ title, text, url })`)
- Direct Instagram Story pre-fill (limited by API — copy-to-clipboard is the V1 approach)
- Analytics: track how many artists share on Day 1 (a key activation metric)

### Build complexity: S

All HTML/CSS. No new data dependencies. The wizard already has the profile data. The share card is a rendering step, not a data step. Estimated: 3–4 hours build + test.

---

## P1 — One-tap release announcement

### What it does exactly

When an artist marks a release as live in admin (or when the release date is reached and auto-switches to `live` state), ABLE surfaces an announcement panel: "Your release is live. Tell your fans?"

One tap generates three things simultaneously:
1. A snap card draft: artist-name-and-release-specific, using existing snap card copy patterns.
2. An Instagram/TikTok caption draft: copyable text, first person, with the streaming link.
3. An email draft to fan list: subject line + short body, ready to send via Broadcasts (or for copy-paste if Broadcasts is locked).

The artist reviews, edits if needed, and publishes/copies. Three tasks become one moment.

### Artist journey

1. Artist's release date arrives. Page auto-switches to `live` state.
2. Admin shows: "Your release is live. Let your fans know?" — full-width card above Campaign HQ.
3. Artist taps "Show me the drafts."
4. Bottom sheet opens with three tabs: Snap card / Caption / Email.
5. Each tab shows the generated draft. Artist can edit inline.
6. Snap card: "Publish" button (one tap, live immediately).
7. Caption: "Copy" button (copies to clipboard, artist pastes into their social app).
8. Email: "Send" button (Pro tier — triggers Resend broadcast) or "Copy" (free/Artist tier).
9. Panel dismisses. "Done." (no exclamation mark.)

### Data model changes

No new localStorage keys required.

New logic: `able_v3_profile.release.announced: boolean` — set to `true` after announcement is dismissed, so the panel doesn't resurface on every admin load. Reset when a new release is saved.

### Generated draft templates (ABLE voice)

**Snap card draft:**
> "[Title] is out now. [Short line from release description, if available.] Link in bio if you want to listen."

**Instagram caption draft:**
> "[Title] is out now.
>
> [Short line — artist writes this in release setup, or ABLE generates from genre/feel.]
>
> Link in my bio to stream, buy, or sign up to hear what's coming next."

**Email draft:**
> Subject: "[Title] is out."
>
> Body: "It's live.
>
> [Title] — [short description].
>
> [Stream CTA button — links to primary platform]
>
> I'll be in touch when there's more to share."

All drafts are fully editable before publish/send. These are starting points, not final copy.

### V1 scope

V1 includes:
- Release-live detection (on admin load, check if release date passed and `announced` is false)
- Draft generation for snap card + caption (pure JS, no API)
- Snap card publish (existing snap card write function)
- Caption copy to clipboard
- Email draft display (Pro-locked send, free copy)
- `announced` flag set on dismiss

V2 additions:
- AI-generated draft body using Claude Haiku (netlify function `ai-copy.js` already exists)
- Email send via Resend integration
- Scheduling: "Send tonight at 7pm" option

### Build complexity: M

Draft generation is templated JS. The bottom sheet component exists in admin. Snap card write function exists. Email send is tier-locked and deferred to V2. Estimated: 5–7 hours build + test.

---

## P2 — True Spotify pre-save

### What it does exactly

In pre-release mode, the fan-facing CTA changes from "Sign up for updates" to "Pre-save on Spotify." Tapping it initiates Spotify OAuth in a popup or redirect. After auth, ABLE calls the Spotify API to add the upcoming release to the fan's library (when it becomes available on release day). The fan's email is collected as part of the OAuth exchange — one step, two outcomes.

### V1 scope

V1: email collection with honest "Be first to know when it drops" framing. No fake pre-save button. Audit all "pre-save" copy — if there is no Spotify OAuth, the label must not say "Pre-save."

V2 scope (requires Supabase + Netlify functions):
- Spotify OAuth via PKCE (no client secret in browser)
- Netlify function handles token exchange
- Pre-save fulfilment cron on release day
- Fan email fallback if Spotify email is unavailable

### Build complexity: XL (V2 only)

Spotify OAuth, token storage, cron job scheduling, release-day fulfilment, error handling for expired tokens. Not a small project. V2, after Supabase is live. Estimated: 3–5 days.

---

## P2 — Fan location heatmap (summary spec)

Full spec deferred to V2 systems docs. Requires:
- Opt-in geolocation on fan sign-up form (`navigator.geolocation`, city-level only)
- Supabase geolocation column on `fans` table
- Server-side aggregation query (count fans by city, radius-based grouping)
- Admin map component (lightweight — consider Mapbox GL or a canvas-based solution)
- Tier gate: Artist Pro only

Copy in admin:
> "[X] of your fans are in [City]. [Y] in [City]."
> "Use this when you're routing a tour."

---

## P2 — Snap card read receipts (summary spec)

Full spec deferred to V2 systems docs. Requires:
- New event type: `able_card_views: [{ cardId, ts, source }]`
- Card view write on snap card visibility in viewport (IntersectionObserver)
- "Seen by [X]" display in admin snap card list
- Framing note: display as "X people read this" not "X impressions" — human, not metric

---

## P1 — "Tonight" draft automation (summary spec)

Bundled with one-tap release announcement as the same drafting infrastructure. Trigger is different (show date instead of release date) but the draft generation and bottom sheet pattern are identical.

Generates:
- Snap card draft: "Heading to [Venue] tonight. Doors at [time]. [City] — last few tickets." (editable)
- Instagram caption draft (editable)

Does not generate email (show-night emails should be sent earlier in the day — a separate automation).

Build complexity: S (shares all infrastructure with one-tap announcement).

---

## P1 — QR code for gig-mode URL (summary spec)

Build complexity: S.

- In admin, gig mode panel: "Download QR code" button appears when gig mode is active or a show is today.
- Uses `qrcode.js` (CDN, 15kB) to generate a canvas QR code in the browser.
- URL encoded: `ablemusic.co/[slug]?mode=gig` — triggers gig mode display regardless of current state.
- Canvas exported as PNG download. Artist sends to printer or shares digitally.
- On mobile: share sheet instead of download.

Copy:
> "Put this on your flyers. It takes people straight to tonight's show."

---

*All P0 features can be built with zero backend changes.*
*All P1 features require minor new UI only.*
*All P2 features require Supabase + Netlify functions.*
