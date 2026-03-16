# ABLE CRM — Specification
**Created: 2026-03-16 | Status: Canonical spec**

> This is the complete specification for how ABLE manages the artist-fan relationship. It extends `docs/systems/data-architecture/SPEC.md` §Fan and should be read alongside `docs/systems/email/SPEC.md`.

---

## Section 1: Philosophy

The ABLE CRM is not a marketing tool. It is a relationship ledger.

Every fan record represents a real person who showed up for a specific reason at a specific moment. They arrived from a TikTok reel, or a friend's recommendation, or the QR code on a t-shirt at a show. They signed up the week before a release dropped, or on the night of a gig, or just because they liked what they heard. That context is the relationship. The CRM's job is to preserve it and give the artist the minimum information they need to act on it.

**The rule:** never make the artist feel like they're managing a database. They're managing relationships. The CRM should feel like a well-organised box of letters from people who care — not a spreadsheet.

**What this means in practice:**
- Language: "People on your list" not "Subscribers." "Who showed up for this" not "Segment filter results."
- Density: show what matters. The email and the when and the where-from. Everything else is an expand gesture.
- Empty states: honest, not hollow. "No one yet" not "Your fan list is empty — start growing it today."
- Deletions: respectful, no friction theatre. "Remove [email] from your list?" — one confirmation, done.

---

## Section 2: The Fan Record

The canonical fan object. This extends `Fan` in `docs/systems/data-architecture/SPEC.md` with the additional fields required for a music-native CRM.

```javascript
{
  // Core identity (always present)
  email:              string,          // required — the fan's email address
  ts:                 number,          // Unix ms — when they signed up
  source:             SourceType,      // where they came from (ig / tt / sp / qr / story / direct / email / fan-dashboard)
  consent:            true,            // always true — no consent = no record written
  consentMethod:      'explicit_checkbox',  // how consent was captured; currently always this value
  optIn:              boolean,         // explicit marketing consent — required before any broadcast

  // Optional identity (artist-added or fan-provided at signup)
  name:               string | null,   // optional — artist can add or fan can provide
  jurisdiction:       'GB' | 'EU' | 'US' | 'OTHER',  // for GDPR scope; determined by IP or artist-set
  double_opted_in:    boolean,         // true once fan clicks confirmation email link
  confirmed_at:       number | null,   // Unix ms — when double opt-in was confirmed

  // ABLE-specific music-native context (the differentiation)
  campaignState:      'profile' | 'pre-release' | 'live' | 'gig' | null,
  // What state was the artist's page in when this fan signed up?
  // This is the most important field in the CRM. Captured at sign-up time from the page's current state.
  // Never derived retrospectively — always captured in the moment.

  releaseId:          string | null,   // which release was active when they signed up?
  // Stored as: releaseTitle + releaseDate combined into a stable slug (e.g. "echoes-2026-04-12")
  // Not a UUID — releases don't have stable IDs in localStorage phase; use the slug

  momentId:           string | null,   // which specific moment (show/release) triggered the sign-up?
  // In gig mode: the show.id that was featured. In pre-release/live: the releaseId.
  // Allows "fans from this specific show" queries.

  // Artist-assigned attributes
  level:              'core' | 'supporter' | 'fan' | 'listener',
  // Default on capture: 'listener'
  // 'core' = artist's most trusted, longest-standing fans (manually set)
  // 'supporter' = has supported financially (Close Circle / support pack)
  // 'fan' = active, regular — artist's judgment
  // 'listener' = signed up, no further interaction tracked
  // Note: these are the correct labels per V6_BUILD_AUTHORITY.md — NOT 'superfan'

  starred:            boolean,         // artist has starred this fan; replaces able_starred_fans string array
  notes:              string | null,   // private artist note (max 280 chars); never shown to the fan
  tags:               string[],        // artist-created free text tags ['london', 'press', 'came-to-oslo-show']

  // Activity (Phase 2 — requires Supabase)
  lastSeen:           number | null,   // Unix ms — last profile visit attributed to this email
  clickCount:         number,          // total CTA clicks attributed to this fan's sessions
  hasSupported:       boolean,         // has ever completed a Close Circle or support pack transaction

  // Lifecycle
  unsubscribed_at:    number | null,   // Unix ms — set when fan unsubscribes; never hard-delete
  deleted_at:         number | null,   // Unix ms — GDPR erasure request; record kept for audit, all PII nulled
}
```

### Source type reference

```typescript
type SourceType =
  | 'ig'             // Instagram bio link click
  | 'tt'             // TikTok bio link click
  | 'sp'             // Spotify artist page link
  | 'qr'             // Gig mode QR code scan (physical)
  | 'story'          // Instagram or TikTok story swipe-up / link sticker
  | 'direct'         // Direct URL — no ?src= param
  | 'email'          // Click-through from a confirmation or broadcast email
  | 'fan-dashboard'; // Via fan.html following flow
```

---

## Section 3: Fan Views in admin.html

### View 1: Fan List (default — page-fans)

The primary view. Visible immediately on opening the Fans page.

**Layout:**
- Search input at top (full width)
- Filter pills row: All / Instagram / TikTok / Spotify / Direct / QR / Starred
- Stat strip: `[N] total · [N] this week · [N%] from social`
- List of fan rows, newest first (default sort)
- Sort control (newest first / most active / level) — Phase 2
- Source breakdown bars at bottom (always visible)
- Export CSV button (always visible, all tiers)
- Ownership note: "These emails are yours. ABLE never contacts your fans without your permission."

**Fan row (compact):**
```
[Avatar initial]  [email]                        [SOURCE]  [★]
                  [relative time] · [level badge if set]
```

Tap anywhere on the row (except the star) → opens Fan Detail sheet.
Tap the star → toggles starred state inline, no sheet.

**Avatar:** coloured circle, initial from email. If `double_opted_in = false`, ring is dashed (pending state).

**Level badge:** shown only if level is 'core' or 'supporter' (not shown for 'fan' or 'listener' — too many badges degrades signal).

**"New" badge:** shown for fans who signed up within the last 24 hours (amber, subtle).

---

### View 2: Fan Search

Integrated into View 1 — the search input filters the list in real time.

**V1 (localStorage):** Full-text search across `email` and `name` (when set). Simple `includes()` for now.

**Filter combinations:** Source filter pill + search can be combined. A fan must match both to appear.

**Planned V2 filters (Supabase):**
- Date range picker
- Campaign state at sign-up ("Signed up during pre-release")
- Level
- Tag filter
- Starred only
- Confirmed only / unconfirmed only

---

### View 3: Fan Detail Sheet

Opens from tapping a fan row. Bottom sheet on mobile, side panel intent on desktop (current build uses the shared admin sheet component).

**Header:**
```
[Avatar — larger, 44px]  [email address — primary]
                         [Joined 12 Mar 2026 · via INSTAGRAM]
```

**Campaign context block (new — most important addition):**
```
Signed up during:  [pre-release]   ·   Echoes (Apr 2026)
```
Or if gig:
```
Signed up on:  [gig night]   ·   The Jazz Café, 14 Mar
```
Or if just profile:
```
Signed up when your page was in default profile mode.
```

This block should be the most prominent piece of information after the email address. It is the entire reason ABLE's CRM is different.

**Artist notes field:**
- Plain text, max 280 characters
- Placeholder: `Something only you'd know about this person.`
- Auto-saves on blur

**Level selector:**
- Four options: listener / fan / supporter / core
- Radio-button style chips; only one active at a time
- Listener is default; no action required to keep it as listener

**Tags:**
- Freeform text input, comma-separated
- Saved tags shown as removable pills below input
- Suggestions from existing tags the artist has used

**Actions:**
- Send a message (individual email — Artist tier, Phase 2)
- Remove from list (GDPR delete — permanent, with confirmation)

**Remove from list confirmation:**
```
Remove [email] from your list?
This can't be undone. They won't be notified.
```
Two buttons: `Cancel` / `Remove`

On remove: deletes record from `able_fans` localStorage (or marks `deleted_at` in Supabase), removes from `able_starred_fans`, closes sheet, re-renders list.

---

### View 4: Segments (Phase 2 — Supabase required)

Not in V1. Described here for spec completeness.

**Auto-segments generated by ABLE:**
- "During [release title] pre-release" — fans whose `campaignState = 'pre-release'` and `releaseId = [current release]`
- "On [show name] night" — fans whose `campaignState = 'gig'` and `momentId = [show.id]`
- "From Instagram" — fans where `source = 'ig'`
- "Supporters" — fans where `level = 'supporter'` or `hasSupported = true`
- "New this week" — fans where `ts >= (now - 7d)`

**Artist-created segments:**
- Any combination of available filters, saved with a name
- Shown in a "Segments" section above the main fan list
- Can be used as broadcast audience target

---

## Section 4: Fan Actions

### Individual actions (fan detail sheet)

| Action | V1 available | Tier |
|---|---|---|
| Star / unstar | Yes | Free |
| Set level | Yes (UI needed) | Free |
| Add/remove tag | Yes (UI needed) | Free |
| Add/edit note | Yes (UI needed) | Free |
| Remove from list (GDPR) | Yes | Free |
| Send individual message | No (Phase 2) | Artist |

### Bulk actions (Phase 2)

| Action | Trigger | Tier |
|---|---|---|
| Export selection as CSV | Checkbox select + export | Free |
| Apply tag to selection | Checkbox select + tag input | Free |
| Set level on selection | Checkbox select + level picker | Free |
| Send broadcast to selection | Checkbox select + compose | Artist Pro |

---

## Section 5: Broadcasts (Artist Pro, Phase 2)

Not in V1. This is the full spec for when it is built.

### Philosophy

A broadcast is a direct message from an artist to the people on their list. It is not a newsletter. It is not a marketing campaign. It is a letter.

Every design decision in the compose flow should reinforce this. No template library. No drag-and-drop email builder. No subject line A/B test. No "Best time to send" AI suggestions. Just the artist, their words, and the people who signed up.

### Compose flow

**Step 1: Who receives it**
- Options: "Everyone on your list" (default) or a named segment
- Fan count shown: "This will go to [N] people."
- If sending to a segment: "48 people who signed up during your Echoes pre-release."
- Opt-in gate: "Of these, [N] have confirmed their email." — only confirmed, opted-in fans receive broadcasts.

**Step 2: Write it**
```
Subject: [artist writes — max 78 characters]
         ← character counter appears at 60 chars, amber at 70, red at 78

[plain text body]
← max 500 words (word counter visible, not intrusive)
← no rich text toolbar
← no image upload
← no formatting options
← monospace or neutral font to simulate plain text feel
```

**Field label for subject:** `Subject line`
**Placeholder:** `What's this about?`
**Field label for body:** `Your message`
**Placeholder:** `Write the way you'd speak to them.`

**Step 3: Preview**
- Renders approximate email in a phone-sized frame
- Shows how it looks from the recipient's view
- Subject line in grey above the frame: "Subject: [text]"
- From name shown as artist name
- Footer shown: "Powered by ABLE · [Unsubscribe]"

**Step 4: Send**
- Button: `Send to [N] people`
- Rate limit warning if at limit: "You've sent [N] this month. Your plan includes 2 broadcasts/month."
- Confirmation count shown: "Sent. [N] people will receive this."

### What ABLE does not build (scope boundary)

ABLE must not build:
- Visual email template editor (HTML)
- Drip campaigns or automation sequences
- Subject line open-rate prediction
- A/B testing for subject lines or body
- Email scheduling (send at a specific time)
- Per-email analytics beyond basic open/click count (Phase 3 only)

These belong to Mailchimp. ABLE owns the fan relationship and the musical moments. Broadcasts are direct messages, not campaigns. Any feature that makes the compose flow feel like an email marketing tool is out of scope.

### Rate limits

| Tier | Broadcasts/month | Notes |
|---|---|---|
| Free | 0 | Pro-gated entirely |
| Artist | 2 | Enough for a release drop + follow-up |
| Artist Pro | Unlimited | Full list management |
| Label | Unlimited | Per artist page |

---

## Section 6: Music-context CRM features (the differentiation)

These are the features that no off-the-shelf CRM can provide. They are only possible because the CRM is embedded in the page that knows what campaign state the artist is in.

### 6.1 Campaign-linked sign-ups

When a fan signs up, the system records `campaignState` from the current page state:

```javascript
// In able-v7.html fan sign-up handler:
const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
const fanRecord = {
  email: emailInput.value.trim(),
  ts: Date.now(),
  source: getSourceParam(),    // from ?src= URL param
  consent: true,
  consentMethod: 'explicit_checkbox',
  optIn: true,
  // Music-native context — captured at sign-up, never derived later
  campaignState: profile.state || 'profile',
  releaseId: profile.releaseDate
    ? `${(profile.releaseTitle || 'release').toLowerCase().replace(/\s+/g,'-')}-${profile.releaseDate}`
    : null,
  momentId: null,   // Set to show.id when state = 'gig' and featured show exists
};
```

This single addition transforms the fan record from "someone who signed up" to "someone who signed up during [specific moment in the artist's story]."

### 6.2 Show in admin.html: campaign breakdown

On the Fans page, below the source breakdown bars, a second breakdown section:

**"When they signed up"**
```
Pre-release (Echoes)   ████████████  47 fans
Profile mode           ████████      31 fans
On gig night (Oslo)    ████          14 fans
Release live window    ██            8 fans
```

This shows the artist how their fan acquisition maps to their campaigns. A large pre-release block means their TikTok during the build-up is working. A large gig-night block means their QR code at shows is the most effective acquisition channel. These are insights no off-the-shelf CRM can generate, because no off-the-shelf CRM was embedded in the page during those moments.

### 6.3 Automatic follow-up nudge (Phase 2)

When a release transitions from `live` back to `profile` (14 days post-release), ABLE shows a nudge in admin.html:

```
[Nudge card]
203 people signed up during your Echoes campaign.
You haven't written to them since. Want to?

[Compose a message →]  [Dismiss]
```

This nudge:
- Only shows if the artist has not sent a broadcast to this segment already
- Only shows once (dismissible, stored in `able_dismissed_nudges`)
- Links directly to the broadcast compose flow with the segment pre-selected: "Echoes campaign fans (203)"
- Is an Artist Pro feature — if the artist is on Free tier, the nudge shows but the compose button opens the upgrade sheet

### 6.4 Show-linked sign-ups (Supabase, Phase 2)

When gig mode is active, `momentId` is set to the featured show's ID. After the show, the artist can see:

"12 people signed up the night of your Oslo show."

Combined with the show's ticket URL click count from `able_clicks`, the artist can see:
- How many people scanned the QR at the door
- Whether they went on to buy tickets or browse the profile

---

## Section 7: Export and portability

The 0% lock-in promise is a technical commitment, not just copy.

### CSV export (always available, all tiers)

Fields in the export:
```
Email, Name, Level, Date joined, Source, Campaign state at sign-up, Starred, Opted in, Confirmed
```

Implementation:
```javascript
function exportFansAsCSV() {
  const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
  const starred = new Set(JSON.parse(localStorage.getItem('able_starred_fans') || '[]'));
  const confirmed = fans.filter(f => f.confirmed !== false && f.deleted_at == null);

  const header = [
    'Email', 'Name', 'Level', 'Date joined', 'Source',
    'Campaign state at sign-up', 'Release', 'Starred', 'Opted in', 'Confirmed'
  ];

  const rows = confirmed.map(f => [
    f.email,
    f.name || '',
    f.level || 'listener',
    new Date(f.ts).toISOString().split('T')[0],
    f.source || 'direct',
    f.campaignState || '',
    f.releaseId || '',
    (f.starred || (f.isStarred) || starred.has(f.email)) ? 'Yes' : 'No',
    f.optIn ? 'Yes' : 'No',
    f.double_opted_in ? 'Yes' : 'No',
  ]);

  const csv = [header, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `able-fans-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
```

### GDPR data export (subject access request)

When a fan emails the artist requesting their data, the artist can run a per-email export:

```javascript
function exportFanRecord(email) {
  const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
  const record = fans.find(f => f.email === email);
  if (!record) return null;
  return JSON.stringify(record, null, 2);
}
```

The output is JSON, formatted, and includes all stored fields for that email address.

---

## Section 8: GDPR compliance

ABLE's GDPR approach: the artist is the data controller. ABLE is the data processor.

### Consent capture (able-v7.html)

Every sign-up form must include, below the submit button in small text:
`[Artist name] will send you occasional updates. Powered by ABLE.`

This constitutes informed consent under UK GDPR for artist marketing communications. It is not opt-in to ABLE platform marketing — that is a separate consent, not requested at this point.

The fan record written to localStorage on sign-up must always include:
```javascript
{
  consent: true,
  consentMethod: 'explicit_checkbox',
  optIn: true,     // the sign-up form itself is the consent mechanism
  ts: Date.now(),  // consent timestamp
}
```

### The four GDPR rights (implemented)

**1. Right to access:** Artist can export any fan's full record as JSON. Accessible from fan detail sheet.

**2. Right to erasure:** "Remove from list" in fan detail sheet. On confirmation:
- In localStorage: removes record from `able_fans` array entirely, removes email from `able_starred_fans`
- In Supabase (when live): sets `deleted_at` timestamp; all PII fields are nulled. The row is kept for audit. Email is replaced with a hash.
- The fan is not notified of the deletion (standard practice — artist-initiated, not platform-initiated)

**3. Right to rectification:** Artist can edit `email` and `name` in fan detail sheet. The artist acts on behalf of the fan for rectification requests.

**4. Right to portability:** CSV export (Section 7). Available in all tiers.

### The unsubscribe chain

Fan clicks Unsubscribe in an email sent via Resend → Resend fires webhook → Netlify function receives event → sets `unsubscribed_at` on the fan record in Supabase → fan is excluded from all future broadcasts.

The fan remains in the artist's fan list (they are not deleted — just opted out of email). The artist can see their `unsubscribed_at` status in the fan detail sheet.

### Artist's GDPR responsibility

The artist is responsible for:
- Not sharing the fan list with third parties
- Not using the fan list for purposes beyond their own communications
- Responding to fan data requests within 30 days (UK GDPR requirement)
- Not selling the list under any circumstances

ABLE's terms of service must require these commitments from artists at sign-up. This is a legal obligation, not a design preference.

### The `able_starred_fans` GDPR gap (known issue)

The current `able_starred_fans` localStorage key is a separate array of email strings. If a fan is deleted from `able_fans`, their email may still appear in `able_starred_fans`. This is a known bug documented in `docs/systems/data-architecture/SPEC.md` as a deprecated pattern.

**Fix:** migrate starred state to `Fan.isStarred` (a field on the fan record itself). When a fan is removed, both the record and the starred state are deleted together. The migration is straightforward and is P0.
