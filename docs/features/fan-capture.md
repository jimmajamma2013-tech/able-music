# Feature: Fan Capture & Sign-up
**Status: ⚠️ Partial — form unification needed | V1**

---

## What it is

The mechanism by which a fan gives their email to an artist directly. No platform intermediary. The email goes to the artist's list, not to ABLE's database. This is the product's primary value delivery.

---

## How it works

Fan lands on artist's profile → sees email input → enters email → record written to `able_fans` → confirmation email sent → fan visible in artist's admin.

**Complete fan record schema:**
```javascript
{
  email: string,          // fan's email address
  ts: number,             // Date.now() — Unix ms
  source: string,         // 'ig' | 'tt' | 'sp' | 'qr' | 'story' | 'direct' | 'email' | 'other'
  sessionId: string,      // UUID from sessionStorage — per browser tab
  campaignState: string,  // 'profile' | 'pre-release' | 'live' | 'gig'
}
```

---

## The three forms (all must be consistent)

| Form ID | Location | Trust line | GDPR | Status |
|---|---|---|---|---|
| `#fan-form` | Main fan capture section | "Your email goes to [Name] — not to ABLE." | ✅ Privacy link | ✅ Correct |
| `#fan-form-2` | Secondary (shown after scroll) | "Your email goes directly to the artist." — generic | ✅ Privacy link | ⚠️ Missing artist name |
| `#cc-email` | Close Circle modal | None | ❌ Missing | ⚠️ Broken |

**All three must show the personalised trust line with the artist's name and a privacy policy link. No exceptions.**

---

## Trust architecture

Four layers, all must be present at point of capture:

1. **Legal trust** — privacy link visible before submit
2. **Interface trust** — clear field, obvious button, no dark patterns
3. **Emotional trust** — "Your email goes to [Name] — not to ABLE. Unsubscribe any time."
4. **Brand trust** — the page is the artist's world; ABLE is invisible infrastructure

---

## Duplicate handling

If `email` already exists in `able_fans`: show "You're already on the list." — do not add a duplicate record.

---

## Post-sign-up flow

```
Email captured
→ Written to able_fans (localStorage)
→ POST /.netlify/functions/fan-confirmation
→ Confirmation email sent via Resend (in artist's voice)
→ Fan visible in admin.html fan list immediately
→ Source badge shows where fan came from
```

---

## Files

| File | Role |
|---|---|
| `able-v7.html` | Three fan capture form instances |
| `admin.html` | Reads `able_fans`, displays fan list with source |
| `netlify/functions/fan-confirmation.js` | Sends confirmation email |

---

## Storage keys

| Key | Contents |
|---|---|
| `able_fans` | Array of fan objects `[{email, ts, source, sessionId, campaignState}]` |

---

## Known issues (fix before launch)

1. `#fan-form-2` trust line is generic — must be personalised with artist name
2. `#cc-email` modal has zero GDPR consent — must be added
3. Both issues mean fan capture is inconsistent across the page

---

## Spec reference

`docs/systems/analytics/SPEC.md` — fan event schema
`docs/systems/CROSS_PAGE_JOURNEYS.md` — fan discovery journey (§2.1)
`docs/systems/email/SPEC.md` — confirmation email spec
