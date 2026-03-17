# Dimension D10 — Cross-Page Vocabulary
**Category:** Copy, Voice & Messaging
**Phase:** 4 (Copy)
**Status:** Not started

Every concept in ABLE must have exactly one name, used consistently across admin.html, able-v7.html, start.html, and landing.html. When the admin dashboard says "snap cards" and the onboarding wizard says "updates" and the landing page says "moments", the artist is silently confused and trust erodes. Full compliance means a single canonical vocabulary list is agreed, documented in docs/systems/copy/SPEC.md, and every string in every page is audited against it. The most contested terms are snap cards (vs updates vs moments), the four campaign states (pre-release vs pre-save mode vs pre-launch), gig mode (vs live mode vs show mode), and the fan sign-up CTA ("stay close" vs "join my list" vs "sign up"). One term. Everywhere.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Decide the canonical term for the short-form artist post feature: "snap cards" — and document it in docs/systems/copy/SPEC.md as the only permitted term | docs/ | 5 | 1 | L | 1 |
| 2 | Audit admin.html for every instance of "snap card", "update", "moment", "post", and "note" referring to this feature — replace all non-canonical terms with "snap card" | ADM | 5 | 2 | L | 1 |
| 3 | Audit able-v7.html for every instance of the snap card term — ensure "snap card" is used in section headings, empty states, and ARIA labels | V8 | 5 | 2 | L | 1 |
| 4 | Audit start.html for the snap card term — ensure the onboarding wizard uses "snap card" when introducing the feature | STR | 4 | 1 | L | 1 |
| 5 | Audit landing.html for the snap card term — ensure the feature section uses "snap card" not a marketing synonym | LND | 4 | 1 | L | 1 |
| 6 | Decide the canonical term for the fan sign-up action: "Sign up" (verb, fan perspective) and "fan sign-up" (noun, admin perspective) — document both in the copy spec | docs/ | 5 | 1 | L | 1 |
| 7 | Audit all fan capture CTAs on able-v7.html — the artist's CTA text is artist-set, but the form placeholder and submit button must use the canonical verb | V8 | 5 | 2 | M | 1 |
| 8 | Audit admin.html fan section for vocabulary — ensure "fan sign-up" is used in headings, not "subscriber", "lead", "contact", or "follower" | ADM | 5 | 2 | L | 1 |
| 9 | Audit landing.html for "subscriber" — replace every instance with "fan" in the context of ABLE's feature description | LND | 4 | 1 | L | 1 |
| 10 | Decide the canonical name for the pre-release campaign state: "pre-release mode" — not "pre-save mode", "pre-launch mode", or "countdown mode" | docs/ | 5 | 1 | L | 1 |
| 11 | Audit admin.html Campaign HQ for the pre-release state label — ensure it reads "Pre-release" consistently in the state toggle, the state badge, and the settings panel | ADM | 5 | 2 | L | 1 |
| 12 | Audit able-v7.html for "pre-save" used as a state name — replace with "pre-release"; "pre-save" is only a CTA verb when the artist has configured a pre-save link | V8 | 4 | 2 | L | 1 |
| 13 | Audit start.html for campaign state names — the onboarding wizard must use the same four state names: "Profile", "Pre-release", "Live", "Gig" | STR | 4 | 2 | L | 1 |
| 14 | Audit landing.html for campaign state names — the feature section must use the canonical four names | LND | 4 | 1 | L | 1 |
| 15 | Decide the canonical name for the gig campaign state: "Gig mode" — not "live mode", "show mode", "tonight mode", or "performance mode" | docs/ | 5 | 1 | L | 1 |
| 16 | Audit admin.html for "gig mode" capitalisaton — it should be "Gig mode" (capital G, lowercase m) in headings; "gig mode" in body copy | ADM | 3 | 1 | L | 2 |
| 17 | Audit able-v7.html for the gig state badge/label — it should read "On tonight" or the artist's custom copy, never "Gig mode" as a public-facing label | V8 | 4 | 2 | L | 2 |
| 18 | Audit admin.html for "live mode" — replace every instance with "Live" (the campaign state name) or "Live mode" where a full label is needed | ADM | 4 | 2 | L | 1 |
| 19 | Decide the canonical term for the analytics section: "Analytics" in admin headings — not "Stats", "Insights", "Data", or "Metrics" | docs/ | 4 | 1 | L | 2 |
| 20 | Audit admin.html for "Stats" vs "Analytics" — pick one term for the section heading and apply it consistently; individual stat cards can use specific labels ("Views", "Fans", "Taps") | ADM | 4 | 2 | L | 2 |
| 21 | Decide the canonical term for a profile page visit: "visit" — not "view", "hit", "impression", or "load"; use "visit" in admin analytics and "views" only if referring to a count metric label | docs/ | 4 | 1 | L | 2 |
| 22 | Audit admin.html analytics for "view" vs "visit" — standardise to "visit" as the base noun | ADM | 4 | 2 | L | 2 |
| 23 | Decide the canonical term for the fan-captured email: "fan" in admin and able-v7.html; never "contact", "lead", "subscriber", or "follower" | docs/ | 5 | 1 | L | 1 |
| 24 | Audit admin.html fan list for "contact" — replace every instance with "fan" | ADM | 5 | 1 | L | 1 |
| 25 | Audit admin.html for "subscriber" — replace with "fan" | ADM | 5 | 1 | L | 1 |
| 26 | Decide the canonical term for a CTA tap: "tap" in mobile/admin copy — not "click", "press", "interaction", or "conversion" | docs/ | 4 | 1 | L | 2 |
| 27 | Audit admin.html analytics for "click" vs "tap" — use "tap" in user-facing copy; "click" is acceptable in documentation only | ADM | 4 | 2 | L | 2 |
| 28 | Decide the canonical term for the primary link-in-bio page: "your page" in body copy — not "your profile", "your link", "your site", "your ABLE page"; use "profile" only in settings contexts | docs/ | 5 | 1 | L | 1 |
| 29 | Audit admin.html for "profile" vs "page" — in user-facing copy, "page" should be the default; "profile" is used only in settings and onboarding | ADM | 4 | 3 | M | 2 |
| 30 | Audit able-v7.html for internal references to itself — any JS or meta copy that refers to the page should use "page" not "profile" | V8 | 3 | 2 | L | 2 |
| 31 | Audit start.html for "profile" vs "page" — the wizard should use "page" in the completion message ("Your page is ready") | STR | 4 | 1 | L | 2 |
| 32 | Audit landing.html for "profile" vs "page" — in the hero and feature sections, "page" should be the default term | LND | 4 | 1 | L | 2 |
| 33 | Decide the canonical term for the pre-save or stream CTA: "stream" for post-release and "pre-save" as a verb for pre-release — document both | docs/ | 4 | 1 | L | 2 |
| 34 | Audit able-v7.html CTAs for "Listen" vs "Stream" vs "Play" — pick one default and ensure the admin CTA builder uses the same labels | V8 | 4 | 2 | L | 2 |
| 35 | Decide the canonical term for the email the artist sends to fans: "broadcast" — not "newsletter", "email blast", "campaign", or "message" | docs/ | 4 | 1 | L | 2 |
| 36 | Audit admin.html for "newsletter" — replace with "broadcast" | ADM | 4 | 1 | L | 2 |
| 37 | Audit admin.html for "email blast" — replace with "broadcast" | ADM | 4 | 1 | L | 2 |
| 38 | Decide the canonical term for an artist's released music: "release" — not "track", "single", "album", "drop" in system copy; "track" and "single" are acceptable in artist-authored copy | docs/ | 4 | 1 | L | 2 |
| 39 | Audit admin.html release section for "drop" used as a system term — replace with "release" | ADM | 3 | 1 | L | 2 |
| 40 | Decide the canonical term for the section where past and upcoming shows are listed: "Shows" — not "Events", "Gigs", "Dates", "Tour dates" | docs/ | 4 | 1 | L | 1 |
| 41 | Audit admin.html for "Events" used as a section heading — replace with "Shows" | ADM | 4 | 2 | L | 1 |
| 42 | Audit able-v7.html for "Events" — replace section heading with "Shows" | V8 | 4 | 1 | L | 1 |
| 43 | Audit start.html for "Events" — replace with "Shows" | STR | 3 | 1 | L | 1 |
| 44 | Audit landing.html for "Events" used as a feature name — replace with "Shows" | LND | 3 | 1 | L | 1 |
| 45 | Decide the canonical term for the merch section: "Merch" — not "Store", "Shop", "Products", "Merchandise" | docs/ | 4 | 1 | L | 2 |
| 46 | Audit admin.html merch section for "Store" or "Shop" used as a heading — replace with "Merch" | ADM | 3 | 1 | L | 2 |
| 47 | Audit able-v7.html merch section heading — ensure it reads "Merch" | V8 | 3 | 1 | L | 2 |
| 48 | Decide the canonical term for the tier gate feature: "gold lock" in internal documentation — the artist-facing label is the tier name ("Artist" or "Artist Pro") | docs/ | 4 | 1 | L | 2 |
| 49 | Decide the canonical term for the support/tip feature: "support packs" — not "tip jar", "fan support", "direct support", "donations" | docs/ | 4 | 1 | L | 3 |
| 50 | Audit admin.html support section for "tip" or "donate" — replace with "support" | ADM | 3 | 1 | L | 3 |
| 51 | Decide the canonical term for the countdown widget: "countdown" — not "timer", "clock", "days until", "release countdown" in body copy | docs/ | 3 | 1 | L | 3 |
| 52 | Audit able-v7.html for the countdown element label — ensure it reads "countdown" in any ARIA label | V8 | 3 | 1 | L | 3 |
| 53 | Decide the canonical term for the artist's profile URL: "page link" — not "profile link", "bio link", "ABLE link" | docs/ | 4 | 1 | L | 2 |
| 54 | Audit admin.html for "bio link" — replace with "page link" | ADM | 3 | 1 | L | 2 |
| 55 | Audit admin.html for "profile link" — replace with "page link" | ADM | 3 | 1 | L | 2 |
| 56 | Audit landing.html for "bio link" — replace with "page link" | LND | 4 | 1 | L | 2 |
| 57 | Decide the canonical term for the image the artist uploads as their main artwork: "artwork" — not "cover art", "thumbnail", "banner", "hero image", "photo" (unless it is literally a photo of the artist) | docs/ | 3 | 1 | L | 2 |
| 58 | Audit admin.html for "cover art" — replace with "artwork" | ADM | 3 | 1 | L | 2 |
| 59 | Decide the canonical term for the section where artists can feature other artists they rate: "Recommendations" — not "Artists I rate", "Who I listen to", "Similar artists", "Influences" | docs/ | 3 | 2 | L | 3 |
| 60 | Audit admin.html recommendations section for inconsistent headings | ADM | 3 | 1 | L | 3 |
| 61 | Decide the canonical term for the freelancer discovery section on an artist's profile: "Credits" — not "Collaborators", "Team", "Made with", "Production" | docs/ | 4 | 1 | L | 3 |
| 62 | Audit able-v7.html for the credits section label — ensure it reads "Credits" | V8 | 3 | 1 | L | 3 |
| 63 | Audit admin.html connections section for "collaborators" vs "credits" — use "credits" for confirmed links, "connections" for the admin panel name | ADM | 3 | 2 | L | 3 |
| 64 | Decide the canonical term for the admin dashboard: "dashboard" — not "control panel", "backstage", "hub", "HQ" except in branded section names (Campaign HQ is acceptable as a proper noun) | docs/ | 4 | 1 | L | 2 |
| 65 | Audit all pages for "control panel" — replace with "dashboard" | ALL | 3 | 1 | L | 2 |
| 66 | Decide whether "Campaign HQ" is a proper noun (capitalised, no substitution) — if so, document it as such in the copy spec | docs/ | 4 | 1 | L | 2 |
| 67 | Audit admin.html for "Campaign HQ" vs "campaign mode" vs "campaign settings" — "Campaign HQ" is the section name; "campaign state" is the mode the artist is in | ADM | 4 | 2 | L | 2 |
| 68 | Decide the canonical term for the artist's account settings area: "Settings" — not "Preferences", "Account", "Options", "Setup" | docs/ | 3 | 1 | L | 2 |
| 69 | Decide the canonical term for the free tier: "Free" (capitalised when used as a tier name) — not "Basic", "Starter", "Freemium" | docs/ | 4 | 1 | L | 1 |
| 70 | Audit admin.html for "basic plan" or "starter plan" — replace with "Free plan" | ADM | 4 | 1 | L | 1 |
| 71 | Audit landing.html for "freemium" — replace with "free" | LND | 3 | 1 | L | 1 |
| 72 | Decide the canonical term for the fan-facing page: "page" in admin and landing copy; internally the HTML file is able-v7.html but is never referred to by filename in user-facing copy | docs/ | 4 | 1 | L | 1 |
| 73 | Audit start.html completion message for "Your profile is live" vs "Your page is live" — use "page" | STR | 4 | 1 | L | 1 |
| 74 | Audit all email templates (fan confirmation, artist welcome) for vocabulary consistency against this spec — fan confirmation should use "page", artist welcome should use "page" | docs/ | 4 | 2 | M | 3 |
| 75 | Decide the canonical term for a fan who has given their email: "fan" — not "subscriber", "member", "supporter", "contact" | docs/ | 5 | 1 | L | 1 |
| 76 | Audit the fan confirmation email for "subscriber" — replace with "fan of [Artist name]" | docs/ | 4 | 2 | L | 3 |
| 77 | Create a master vocabulary table in docs/systems/copy/SPEC.md — columns: canonical term, definition, banned synonyms, usage context | docs/ | 5 | 3 | L | 2 |
| 78 | Add a "vocabulary check" step to the QA smoke tests — before any release, grep all active pages for banned synonyms and confirm zero results | docs/ | 4 | 3 | M | 3 |
| 79 | Decide the canonical term for the CTA type "follow on Spotify": "Follow" — not "Follow me", "Add to library", "Subscribe" | docs/ | 3 | 1 | L | 3 |
| 80 | Audit the CTA builder in admin.html for label defaults — ensure default CTA labels use canonical terms | ADM | 4 | 2 | L | 2 |
| 81 | Decide the canonical term for the profile theme selector options: "Dark", "Light", "Glass", "Contrast" — sentence case, no "mode" suffix in the selector | docs/ | 3 | 1 | L | 2 |
| 82 | Audit admin.html theme selector for "Dark mode" vs "Dark" — remove the word "mode" from theme names in the selector | ADM | 3 | 1 | L | 2 |
| 83 | Decide the canonical term for when the artist's release is out: "Live" (campaign state) — not "Out now", "Released", "Available", "Dropped" in the system state label | docs/ | 4 | 1 | L | 2 |
| 84 | Audit admin.html Campaign HQ for the live state label — ensure it reads "Live" not "Released" or "Out now" | ADM | 4 | 1 | L | 2 |
| 85 | Decide the canonical term for the campaign state default: "Profile" — not "Default", "Normal", "Standard", "Resting" | docs/ | 4 | 1 | L | 2 |
| 86 | Audit admin.html Campaign HQ for the profile/default state label — ensure it reads "Profile" | ADM | 4 | 1 | L | 2 |
| 87 | Decide the canonical term for the artist's display name: "name" — not "artist name", "stage name", "username", "handle" in user-facing form labels | docs/ | 4 | 1 | L | 2 |
| 88 | Audit start.html for "artist name" as a form label — replace with "Name" with contextual help text "This is how you'll appear on your page" | STR | 4 | 1 | L | 2 |
| 89 | Decide the canonical term for the URL path for the artist's page: "page URL" or "page address" — not "profile URL", "ABLE handle", "slug" in user-facing copy; "slug" is only used in internal docs | docs/ | 4 | 1 | L | 2 |
| 90 | Audit admin.html for "slug" appearing in user-facing copy — replace with "page address" | ADM | 4 | 1 | L | 2 |
| 91 | Audit start.html for "slug" in user-facing copy — replace with "page address" | STR | 4 | 1 | L | 2 |
| 92 | Decide the canonical capitalisation for "ABLE" — always uppercase in all contexts | docs/ | 3 | 1 | L | 1 |
| 93 | Audit all pages for "Able" (mixed case) — replace with "ABLE" | ALL | 3 | 1 | L | 1 |
| 94 | Decide the canonical spelling of "ablemusic.co" vs "ABLE Music" vs "ABLE" — "ABLE Music" as the full brand name, "ABLE" as the short form, "ablemusic.co" as the URL | docs/ | 4 | 1 | L | 1 |
| 95 | Audit landing.html for inconsistent brand name usage — standardise to "ABLE Music" on first reference and "ABLE" thereafter | LND | 4 | 1 | L | 1 |
| 96 | Audit admin.html for brand name inconsistencies | ADM | 3 | 1 | L | 2 |
| 97 | After completing all above audits, run a full grep across all active pages for each banned synonym and document zero results as the pass criterion | ALL | 5 | 2 | M | 3 |
| 98 | Document the vocabulary decision date and rationale in docs/systems/copy/SPEC.md — so future contributors know why each term was chosen | docs/ | 3 | 2 | L | 3 |
| 99 | Add the vocabulary table to the CLAUDE.md project guide so it is available at the start of every session | docs/ | 4 | 2 | L | 3 |
| 100 | Set a review date for the vocabulary spec — six months post-launch — to catch any terms that have drifted or proven confusing to real artists | docs/ | 3 | 1 | L | 5 |
