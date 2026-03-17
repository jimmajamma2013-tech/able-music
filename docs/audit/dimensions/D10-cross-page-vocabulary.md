# Dimension D10 — Cross-Page Vocabulary
**Category:** Copy, Voice & Messaging
**Phase:** 4 (Copy)
**Status:** Draft — code-grounded

A product that calls the same thing three different names is a product that does not trust itself. "Snap cards" in the CSS and code comments, "Updates" in the admin nav and section heading (admin.html lines 2391, 3136, 3627, 3757), "update" in the start.html preview (line 1496) — all referring to the same feature. Campaign states are called "page states", "campaign modes", "Campaign HQ", and "modes" interchangeably. Fan engagement levels use `listener`, `fan`, `supporter`, `core` in code, but "Close Circle" on the profile. Full compliance means one canonical vocabulary governs every user-facing string across all five pages. An artist should learn a term in onboarding and find it exactly the same in admin and on their profile.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Decide the canonical user-facing name for snap cards: the code and CSS use `snap-cards`; the admin nav (line 3757), section heading (lines 2391, 3136, 3627) use `Updates` — document decision in `docs/systems/copy/SPEC.md` before any copy changes | ALL | 5 | 2 | M | 1 |
| 2 | admin.html line 3757: `snaps:'Updates'` in the nav label map — once the decision is made, update this string to canonical name | ADM | 5 | 1 | L | 1 |
| 3 | admin.html line 2391: nav item inner text `Updates` — update to canonical name | ADM | 5 | 1 | L | 1 |
| 4 | admin.html line 3136: page title `Updates` — update to canonical name | ADM | 5 | 1 | L | 1 |
| 5 | admin.html line 3627: sidebar nav item `Updates` — update to canonical name | ADM | 5 | 1 | L | 1 |
| 6 | admin.html line 7057: `GATE_COPY['snap-cards']` headline uses `Updates` — update to canonical name | ADM | 4 | 1 | L | 1 |
| 7 | admin.html line 3146: empty state `No updates yet. Add one to post a note, link, or snippet...` — update to canonical name | ADM | 4 | 1 | L | 1 |
| 8 | admin.html line 5619: snap limit toast `Add as many Updates as you want on Artist plan.` — update to canonical name | ADM | 4 | 1 | L | 1 |
| 9 | able-v8.html line 5660: `aria-label="Updates"` on the snap-cards section element — update to canonical name | V8 | 4 | 1 | L | 1 |
| 10 | able-v8.html line 8363: `title:snap.title \|\| 'Update'` in the fan feed construction — update to canonical name | V8 | 4 | 1 | L | 1 |
| 11 | start.html line 1496: `Your first update` in the profile preview — update to canonical name | STR | 3 | 1 | L | 1 |
| 12 | start.html line 1543: `Updates as you type` preview hint — `Updates` here means `refreshes` not `snap cards`; this is a vocabulary collision; change to `Preview refreshes as you type` | STR | 3 | 1 | L | 2 |
| 13 | landing.html: check whether snap cards are mentioned anywhere in the feature descriptions; if a different name is used, align to the canonical term once decided | LND | 4 | 1 | L | 2 |
| 14 | Decide the canonical admin-facing name for the campaign state system: `Campaign HQ` (the section title at admin.html line 2521), `campaign modes` (landing feature label line 1440), or `page states` (CLAUDE.md) — document and align everywhere | ALL | 4 | 2 | M | 1 |
| 15 | admin.html line 2521: `Campaign HQ` is the section title in the dashboard — this is the most specific term and should be canonical for the admin section | ADM | 3 | 1 | L | 2 |
| 16 | landing.html line 1440: `Campaign modes` as the hero feature eyebrow label — if `Campaign HQ` is canonical for admin, landing should describe the feature for new visitors; `Campaign modes` is acceptable as a product description here; document this distinction explicitly | LND | 3 | 1 | L | 2 |
| 17 | start.html: the wizard step 1 uses CSS class names `moment-card`, `moment-grid`, and `data-mode` attributes for campaign state selection — `moment` is an internal term from an earlier naming convention; confirm no `moment` string appears in any visible label during onboarding | STR | 4 | 2 | M | 2 |
| 18 | admin.html line 3696: localStorage key `moments` is used for the World Map / shows timeline data — `moments` as a data key is internal and must never appear in user-facing copy | ADM | 3 | 1 | L | 2 |
| 19 | admin.html line 2713: `No upcoming moments yet. Add your first.` — `moments` here is user-facing; replace with `No upcoming shows.` | ADM | 3 | 1 | L | 2 |
| 20 | admin.html line 6567: `No upcoming moments yet. Add shows in the Events page...` — same; replace `moments` with `shows` | ADM | 3 | 1 | L | 2 |
| 21 | admin.html lines 2503, 2513, 2666, 2675: code comments use `moment` to describe UI nudge events — `moment` in comments is acceptable as internal dev vocabulary; confirm no `moment` string surfaces in rendered UI text | ADM | 2 | 1 | L | 2 |
| 22 | able-v8.html line 5674: `a live moment` in the clips placeholder copy — `moment` here means an event in time, not the internal data structure; acceptable but flag for awareness | V8 | 1 | 1 | L | 3 |
| 23 | Decide the canonical fan-facing state names — admin uses `profile`, `pre-release`, `live`, `gig`; landing uses `Building anticipation`, `Out now`, `Always on`, `On tonight`; profile badges show `Drops 28 Mar`, `Out now`, `On tonight` — these are correctly different (admin keys vs fan-facing descriptors); document this as intentional in `docs/systems/copy/SPEC.md` | ALL | 4 | 1 | L | 2 |
| 24 | admin.html line 2531: the Campaign HQ state pill shows `Profile` for the default state — confirm whether this should be `Default` or `Always on` to match landing language, or whether `Profile` is the correct admin-only label | ADM | 3 | 1 | L | 2 |
| 25 | admin.html line 4767: arc node map uses `Pre-release` (hyphenated, capitalised) — confirm this is consistent with all other occurrences of the term | ADM | 2 | 1 | L | 3 |
| 26 | admin.html line 4903: `STATE_TOAST['pre-release']` = `Pre-release.` — hyphenated; consistent with arc node; confirm retained | ADM | 2 | 1 | L | 3 |
| 27 | admin.html: `sign-ups` (hyphenated) appears in state descriptions; `sign ups` (unhyphenated) may appear elsewhere — standardise to `sign-ups` (hyphenated noun/adjective) and `sign up` (verb) across all pages | ALL | 2 | 1 | L | 2 |
| 28 | admin.html lines 4828, 4829: `fan sign-up` (singular, line 4828) vs `sign-ups` (plural, line 4829) — standardise hyphenation and number agreement | ADM | 2 | 1 | L | 2 |
| 29 | admin.html line 4014: fan level vocabulary — `listener`, `fan`, `supporter`, `core` — confirm these are the canonical level keys and that UI labels match (line 4015: `{ listener:'Listener', fan:'Fan', supporter:'Supporter', core:'Core' }`) | ADM | 3 | 1 | L | 2 |
| 30 | able-v8.html line 6555: `supporter: { label: 'Supporters' }` on the world map — `Supporters` (plural) vs admin level label `Supporter` (singular); standardise to plural or singular consistently | V8 | 2 | 1 | L | 2 |
| 31 | able-v8.html: `Close Circle` appears at lines 5469 and 6816 — `Close Circle` is the brand name for the supporter-tier experience; confirm this term is used consistently and never mixed with `Supporters` or `supporter tier` in user-facing strings | V8 | 4 | 2 | M | 2 |
| 32 | admin.html line 5724: `clip.access === 'supporter' ? 'Close Circle'` — correctly maps the internal `supporter` key to the branded `Close Circle` label; confirm all instances of the `supporter` key that reach user-facing text use `Close Circle` | ADM | 4 | 1 | L | 2 |
| 33 | admin.html line 5759: clip access dropdown — `<option value="supporter">Supporters first</option>` — `Supporters first` vs `Close Circle`; decide canonical fan-facing label: `Close Circle first` or keep `Supporters first` and not use `Close Circle` elsewhere for this context | ADM | 3 | 2 | M | 2 |
| 34 | admin.html line 5801: second clip access dropdown — same as item 33; both dropdowns must match | ADM | 3 | 1 | L | 2 |
| 35 | Decide canonical vocabulary for the fan engagement hierarchy — the four levels (`listener`, `fan`, `supporter`, `core`) must have locked canonical labels before launch; `core` may conflict with `core fan` language in broadcasts | ALL | 4 | 2 | M | 2 |
| 36 | admin.html line 4013: `fan.level \|\| 'listener'` — `listener` is the default/unengaged state; confirm this level name is never shown to the artist as a UI label without context (calling an unengaged fan a "listener" in the CRM could be confusing) | ADM | 3 | 1 | L | 2 |
| 37 | admin.html line 3874: `reaches like ${reach} followers` — `followers` is a banned word; replace with `reaches like ${reach} fans` | ADM | 5 | 1 | L | 1 |
| 38 | admin.html: audit all instances of `followers` across the entire admin.html — line 3874 is the confirmed instance; confirm no others exist | ADM | 5 | 1 | L | 1 |
| 39 | able-v8.html: confirm `followers` does not appear anywhere in the fan-facing profile page | V8 | 5 | 1 | L | 1 |
| 40 | landing.html: confirm `followers` does not appear anywhere on the landing page | LND | 5 | 1 | L | 1 |
| 41 | start.html: confirm `followers` does not appear anywhere in the onboarding wizard | STR | 5 | 1 | L | 1 |
| 42 | All pages: `audience` is not explicitly banned but ABLE uses `fans`; audit any instance of `audience` in user-facing copy and replace with `fans` where it refers to the artist's fan base | ALL | 3 | 2 | M | 2 |
| 43 | admin.html lines 3528–3534: broadcast audience options — `All fans` and `Core fans only` — `All fans` is correct; `Core fans only` uses `Core` which may conflict with the fan level label `Core` (item 35); clarify if the two uses are distinct | ADM | 3 | 2 | M | 2 |
| 44 | admin.html: the fan level `core` and the broadcast audience `Core fans only` — if `core` is the highest engagement tier label, `Core fans only` in broadcasts is technically correct but may be confusing if `Core` is also displayed as a fan level chip in the CRM | ADM | 4 | 2 | M | 2 |
| 45 | admin.html line 3757: nav key is `snaps` (internal) but the label is `Updates` (user-facing) — confirm the internal key never surfaces in UI copy | ADM | 2 | 1 | L | 3 |
| 46 | admin.html: `Streaming links` is the nav label for the connections section (line 3757: `connect:'Streaming links'`) — but the page header says `Connections`; decide canonical term: `Connections` covers both DSP links and people credits; `Streaming links` is more narrow | ADM | 3 | 2 | M | 2 |
| 47 | admin.html line 16: meta description uses `update your releases` — `update` sounds like social media posting; replace with `manage your releases` | ADM | 2 | 1 | L | 3 |
| 48 | able-v8.html line 5632: `My music` is the canonical music section heading — confirm `My music` not `Music`, `Listen`, or `My releases` is used on the fan-facing page | V8 | 4 | 1 | L | 2 |
| 49 | able-v8.html line 5652: `Shows` is the canonical events section heading on the fan-facing page — confirm `Shows` not `Events` or `Gigs` | V8 | 4 | 1 | L | 2 |
| 50 | able-v8.html line 5684: `Stuff` is the canonical merch section heading on the fan-facing page — confirm `Stuff` not `Merch` or `Store` | V8 | 4 | 1 | L | 2 |
| 51 | able-v8.html line 5697: `Support` is the canonical support section heading — confirm `Support` not `Donate`, `Support me`, or `Tips` | V8 | 4 | 1 | L | 2 |
| 52 | able-v8.html line 5725: `Worth hearing` is the canonical recommendations heading — confirm `Worth hearing` not `Recommendations` or `You might like` | V8 | 3 | 1 | L | 2 |
| 53 | able-v8.html line 5642: `Videos` is the canonical video section heading — confirm `Videos` not `Clips` or `Reels` for the videos section | V8 | 3 | 1 | L | 2 |
| 54 | able-v8.html line 5669: `Clips` is a second section alongside `Videos` — confirm these are genuinely different features and the naming distinction is intentional and explainable to fans | V8 | 4 | 2 | M | 2 |
| 55 | admin.html: the admin section for music appears as `Music` in the nav vs `Releases` on the page — confirm whether the admin section title is `Music` or `Releases`, and document the distinction from the fan-facing `My music` | ADM | 3 | 2 | M | 2 |
| 56 | admin.html: admin uses `Events` (nav) while the fan-facing page uses `Shows` — this distinction is intentional (admin = operational term, fan-facing = conversational term); document as intentional | ADM | 2 | 1 | L | 3 |
| 57 | admin.html: admin uses `Merch` (nav) while the fan-facing page uses `Stuff` — same intentional distinction; document | ADM | 2 | 1 | L | 3 |
| 58 | admin.html: admin uses `Updates` or `Snap cards` (unresolved) while the fan-facing page uses `aria-label="Updates"` — once item 1 is resolved, confirm fan-facing and admin-facing names are consistent or document why they differ | ADM | 5 | 1 | L | 1 |
| 59 | admin.html: `Connections` as the page heading vs `Streaming links` as the nav label — separate the concepts: DSP platform links are `Streaming links`; people credits are `Credits`; if they are sub-sections of `Connections`, name each sub-section explicitly | ADM | 3 | 2 | M | 2 |
| 60 | admin.html line 3441: `Fans` is the page title; line 3442: `on your list` is the sub-heading language — both are correct canonical ABLE vocabulary; confirmed retained | ADM | 2 | 1 | L | 3 |
| 61 | admin.html line 3469: `on your list` is the canonical phrase for fan count — confirm it is used consistently throughout the fan section and not mixed with `on your database` or `subscribed` | ADM | 3 | 1 | L | 2 |
| 62 | admin.html line 3486: `These emails are yours. Not ABLE's. Not anyone else's.` — canonical ABLE ownership copy; confirmed retained | ADM | 2 | 1 | L | 3 |
| 63 | able-v8.html line 5544: `What's coming` is the fan capture heading in pre-release state — confirm the correct heading for each campaign state is rendered by `renderFanCapture()` and never shows the wrong state's heading | V8 | 4 | 1 | L | 2 |
| 64 | All pages: `your fans` (possessive) vs `fans` (neutral) — admin nudges use `your fans`; section headings use `fans`; fan-facing page uses first-person `my fans` in artist copy; confirm these uses are intentional | ALL | 2 | 1 | L | 3 |
| 65 | admin.html: `pre-save` (hyphenated lowercase) appears in state descriptions; `Pre-save` (capitalised) appears in CTA context; `presave` (no hyphen) appears in nudge IDs — standardise to `pre-save` in all user-facing copy | ALL | 3 | 2 | M | 2 |
| 66 | landing.html line 1460: `Pre-save in the build-up.` — hyphenated; consistent with the standard | LND | 1 | 1 | L | 3 |
| 67 | admin.html line 4905: `STATE_TOAST.gig = 'Gig mode on.'` — `Gig mode` is the canonical admin term; confirm it is used consistently in all admin-facing copy | ADM | 2 | 1 | L | 2 |
| 68 | landing.html: the demo phone uses `data-state="gig"` internally but displays `On tonight` as the badge — confirm admin-facing name is always `Gig mode` and fan-facing badge is always a contextual description like `On tonight` | LND | 3 | 1 | L | 2 |
| 69 | All pages: `drop` vs `release` — both are acceptable in ABLE's voice (`on drop day`, `release date`); confirm no instance uses `launch` or `publish` which are too corporate | ALL | 2 | 1 | L | 3 |
| 70 | All pages: `listener` is the internal fan level key for unengaged fans — confirm `listener` never appears as a user-facing label; all unengaged fans should simply be `fans` in the UI | ALL | 4 | 2 | M | 2 |
| 71 | admin.html line 3874: `reaches` as the verb for email list size — confirm `reaches` is the right word here after the `followers` fix (item 37) | ADM | 3 | 1 | L | 2 |
| 72 | admin.html: `Campaign HQ` is admin-only vocabulary — confirm it never appears on the fan-facing profile page | ADM | 2 | 1 | L | 3 |
| 73 | start.html: wizard step 1 uses `data-mode` attributes (`profile`, `pre-release`, `live`, `gig`) for campaign state selection — confirm the visible labels are the canonical fan-facing descriptions, not the internal mode keys | STR | 4 | 1 | L | 2 |
| 74 | admin.html line 4828: all four campaign state descriptions must exist — `profile`, `pre-release`, `live`, and `gig` — confirm the `live` and `gig` state descriptions are present alongside `profile` and `pre-release` | ADM | 4 | 1 | L | 1 |
| 75 | admin.html line 2565: arc node `arcNode0` has aria-label `Announce` — `Announce` is the tooltip label for the pre-release state; confirm this is the correct fan-context framing and not `Pre-release` | ADM | 3 | 2 | M | 3 |
| 76 | All pages: `page` vs `profile` — ABLE calls the artist's public page a `page` not a `profile`; audit every user-facing string and replace `your profile` with `your page` unless it refers specifically to the admin profile settings section | ALL | 4 | 2 | M | 2 |
| 77 | admin.html: settings page sub `Page URL, privacy, and account.` — `Page URL` is correct (not `Profile URL`); confirmed | ADM | 2 | 1 | L | 3 |
| 78 | admin.html line 7884: `showToast('Profile saved.')` — `Profile` here refers to the admin settings; consider `Settings saved.` which is more specific | ADM | 2 | 1 | L | 3 |
| 79 | All pages: `bio` vs `page` — `bio` refers to the Instagram bio link placement; `page` refers to the ABLE artist page; confirm no mixing | ALL | 3 | 1 | L | 2 |
| 80 | admin.html: the World Map section uses `moments` as a data key, `shows` as the user term, and `Events` as the admin section name — document this three-way mapping explicitly so future developers understand the naming layers | ADM | 3 | 1 | L | 2 |
| 81 | admin.html: `Snap card` as a proper noun (initial caps) vs `snap card` (lowercase) — establish whether this is treated as a product name (capitalised) or a generic noun (lowercase) and apply consistently | ADM | 2 | 1 | L | 2 |
| 82 | All pages: `plan` vs `tier` — the internal code uses `tier` (`able_tier`, `TIER_ORDER`); user-facing copy uses `plan` (`Artist plan`, `Free plan`); this distinction is correct and should be maintained | ALL | 2 | 1 | L | 3 |
| 83 | admin.html: tier badge reads `Free` (standalone, line 2441); settings page reads `Free plan` — both are correct in their context; confirmed | ADM | 2 | 1 | L | 3 |
| 84 | All pages: `email` vs `inbox` — `inboxes` is acceptable as the destination (`Send directly to your fans' inboxes`); `email` is the noun for the list item; confirm no mixing that creates ambiguity | ALL | 2 | 1 | L | 3 |
| 85 | admin.html: `Send to fans` is the broadcasts page title (line 3501); `Email broadcasts` is the gate overlay title (line 3546) — the page title is what the artist sees; `Email broadcasts` is the product name in the tier gate context; document this distinction | ADM | 3 | 1 | L | 2 |
| 86 | All pages: `tap` vs `click` — ABLE uses `tap` for fan actions on the profile (mobile-first) and `click` for analytics (`able_clicks`, CTA click rate); confirm user-facing copy uses `tap` consistently and analytics labels use `click` | ALL | 3 | 1 | L | 2 |
| 87 | admin.html line 3390: `No clicks recorded yet` — `clicks` is correct in analytics context; confirmed | ADM | 1 | 1 | L | 3 |
| 88 | able-v8.html: the fan capture CTA must be `I'm in` (spec canonical) — confirm this is not `Sign up`, `Subscribe`, or `Join` anywhere in the codebase | V8 | 5 | 1 | L | 1 |
| 89 | able-v8.html: the post-submit echo must be `You're in. I'll keep you close.` (spec canonical) — confirm this exact string is in the code and no variant exists | V8 | 4 | 1 | L | 1 |
| 90 | All pages: `sign-ups` (hyphenated noun/adjective) vs `sign up` (verb phrase) — confirm consistent hyphenation across all pages | ALL | 2 | 1 | L | 2 |
| 91 | admin.html: `Connections` section vs `Streaming links` nav label — separate the concepts: `Streaming links` = DSP platform links; `Credits` = people credits; if these are sub-sections, name each sub-section appropriately | ADM | 3 | 2 | M | 2 |
| 92 | All pages: `broadcast` is admin-facing only — confirm `broadcast` never appears in fan-facing copy | ADM | 2 | 1 | L | 3 |
| 93 | All pages: `CTA` is internal jargon and must never appear in user-facing copy; replace with `button`, `link`, or `action` depending on context | ALL | 3 | 1 | L | 2 |
| 94 | admin.html line 16: meta description uses `CTA clicks` — meta tags are not user-facing copy in the same sense; acceptable but consider `button taps` | ADM | 1 | 1 | L | 3 |
| 95 | All pages: `artist` (lowercase noun) vs `Artist` (capitalised plan tier name) — ensure these two uses never create ambiguity in a single sentence | ALL | 2 | 1 | L | 3 |
| 96 | All pages: `content` as a noun for what artists create is banned — replace with specific nouns: `music`, `clips`, `shows`, `snap cards`, `releases` | ALL | 4 | 1 | L | 1 |
| 97 | All pages: `link in bio` vs `bio link` — standardise to `bio link` across all pages | ALL | 2 | 1 | L | 3 |
| 98 | All pages: compile the canonical vocabulary list into `docs/systems/copy/SPEC.md` — this list must include: canonical term, banned synonyms, correct context, and the page where it is used | ALL | 5 | 2 | M | 2 |
| 99 | All pages: after the vocabulary decision in item 1, update all five pages in a single commit with a vocabulary changelog note in `docs/STATUS.md` | ALL | 5 | 2 | M | 1 |
| 100 | All pages: after the snap card vocabulary fix, run a full text search for `update` (lowercase) across all HTML files to confirm no residual uses of `update` as a synonym for snap card remain | ALL | 4 | 1 | L | 1 |
