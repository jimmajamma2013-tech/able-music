# Feature: Confirmation Email
**Status: ✅ Built — RESEND_API_KEY env var must be set on Netlify | V1**

---

## What it is

When a fan signs up on an artist's ABLE page, they receive an email that sounds like the artist wrote it — not a platform onboarding email. The email uses the artist's accent colour, names the artist directly, and adapts its copy based on which campaign state the artist is currently in.

This is one of ABLE's strongest premium details. Most platforms send generic confirmation emails. This one is designed.

---

## How it works

`able-v7.html` fires a POST to `/.netlify/functions/fan-confirmation` immediately after writing the fan to localStorage. The function calls the Resend API. The email is in the fan's inbox within 60 seconds.

**POST body:**
```javascript
{
  fanEmail:      string,   // fan's email
  artistName:    string,   // displayed in subject + body
  artistSlug:    string,   // for profile URL in CTA
  campaignState: string,   // determines email copy
  accentHex:     string,   // artist's accent colour (#rrggbb)
  releaseTitle:  string,   // optional, used in pre-release/live states
}
```

---

## Email copy per campaign state

| State | Subject | Heading | Body |
|---|---|---|---|
| `pre-release` | "[Name] — you're on the list" | "[Name] is working on [title]." | "You asked to be the first to know. You will be." |
| `live` | "[Name] just added you to their list" | "[Name] dropped [title]." | "You're on their list now. You'll hear directly about what's next." |
| `gig` | "[Name] — you're on the list for tonight" | "[Name] is playing tonight." | "You're on their list. More shows will come directly to you." |
| `profile` | "[Name] — you're on their list" | "You're on [Name]'s list." | "No noise. Just the things that matter — direct from them, when they happen." |

---

## Email design

- Background: `#0d0e1a` (Midnight Navy — same as artist profile)
- Card: `#12152a` with `border-radius: 0 0 16px 16px`
- **3px accent bar** at top of card in artist's exact colour — first thing fan sees
- Artist name in uppercase in accent colour above heading
- CTA button: `See [Name]'s page →` in accent colour
- Footer: "You signed up on ABLE. This is not a marketing list. You'll only hear from [Name] directly."
- From name: `[Artist Name] via ABLE <noreply@ablemusic.co>`

---

## Environment variables required

| Var | Value | Required |
|---|---|---|
| `RESEND_API_KEY` | Resend API key | **Yes — email silently skipped if missing** |
| `ABLE_FROM_EMAIL` | Verified Resend sender | Default: `noreply@ablemusic.co` |
| `ABLE_BASE_URL` | Production URL | Default: `https://ablemusic.co` |

If `RESEND_API_KEY` is not set, the function returns 200 with `{sent: false}` — it does not throw. This means emails silently fail without an error in the UI. **Verify the env var is set on Netlify before launch.**

---

## Files

| File | Role |
|---|---|
| `netlify/functions/fan-confirmation.js` | Complete function — template, Resend call, error handling |
| `able-v7.html` | Fires POST after fan localStorage write |

---

## Security

- `esc()` function sanitises all user input before HTML injection (XSS prevention)
- Luminance check determines text colour on accent button (ensures contrast)
- CORS headers allow POST from any origin (Netlify function pattern)

---

## Spec reference

`docs/systems/email/SPEC.md` — full email system spec
