# Dimension I2 — Privacy Policy Completeness
**Category:** Legal, Compliance & Accessibility
**Phase:** 9 (Legal)
**Status:** Not started

ABLE collects fan email addresses on artist profile pages, making the artist the data controller and ABLE the data processor under UK GDPR. Article 13 requires that, at the point of collection, fans are informed of: the data controller's identity and contact details, the purposes and legal basis for processing, any third-party recipients, retention periods, and all data subject rights (access, erasure, portability, objection, and the right to lodge a complaint). `privacy.html` must satisfy every one of these requirements before fan sign-up goes live, or ABLE faces enforcement risk from the ICO. Full compliance means a privacy policy that is written in plain English, linked prominently from every fan capture form, updated whenever processing changes, and versioned with a last-updated date.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Add a visible "Privacy policy" link immediately below every fan email capture form input, not just in the footer | V8 | 5 | 1 | H | 1 |
| 2 | Confirm `privacy.html` names ABLE Music as the data controller with a registered company address | PRV | 5 | 1 | H | 1 |
| 3 | Add a dedicated contact email address (e.g. privacy@ablemusic.co) for data subject requests in `privacy.html` | PRV | 5 | 1 | H | 1 |
| 4 | State clearly in `privacy.html` that the artist (not ABLE) is the data controller for fan sign-up data | PRV | 5 | 1 | H | 1 |
| 5 | Add the legal basis for processing fan emails (legitimate interest or consent) explicitly in `privacy.html` | PRV | 5 | 1 | H | 1 |
| 6 | List every category of data collected in the fan sign-up flow (email, timestamp, source, campaign state) in `privacy.html` | PRV | 5 | 1 | H | 1 |
| 7 | Add a retention period statement for fan email data in `privacy.html` (e.g. "retained until you unsubscribe or request deletion") | PRV | 5 | 1 | H | 1 |
| 8 | Include the fan's right to erasure (right to be forgotten) in the rights section of `privacy.html` | PRV | 5 | 1 | H | 1 |
| 9 | Include the fan's right to data portability in `privacy.html` | PRV | 5 | 1 | H | 1 |
| 10 | Include the fan's right to object to processing in `privacy.html` | PRV | 5 | 1 | H | 1 |
| 11 | Include the fan's right to lodge a complaint with the ICO (Information Commissioner's Office) in `privacy.html` | PRV | 5 | 1 | H | 1 |
| 12 | Add the ICO's contact URL (ico.org.uk) and telephone number to the complaints section of `privacy.html` | PRV | 4 | 1 | H | 1 |
| 13 | Add a "last updated" date at the top of `privacy.html` so fans know when the policy was last reviewed | PRV | 4 | 1 | L | 1 |
| 14 | Add a version number or change log section to `privacy.html` to track policy revisions | PRV | 3 | 1 | L | 2 |
| 15 | Ensure `privacy.html` is reachable via a `/privacy` URL path configured in `netlify.toml` | PRV | 4 | 1 | L | 1 |
| 16 | Add a canonical `<link rel="canonical">` tag to `privacy.html` to prevent duplicate content indexing | PRV | 2 | 1 | L | 4 |
| 17 | Link `privacy.html` from the footer of `landing.html` | LND | 4 | 1 | L | 1 |
| 18 | Link `privacy.html` from the footer of `admin.html` | ADM | 3 | 1 | L | 1 |
| 19 | Link `privacy.html` from the footer of `start.html` | STR | 4 | 1 | L | 1 |
| 20 | Add a checkbox or explicit consent acknowledgement on the fan sign-up form if consent (not legitimate interest) is the chosen legal basis | V8 | 5 | 2 | H | 1 |
| 21 | Write the purpose of data collection in plain English in `privacy.html` (e.g. "so the artist can email you about new music and shows") | PRV | 4 | 1 | L | 1 |
| 22 | Confirm `privacy.html` states that ABLE does not sell fan data to third parties | PRV | 5 | 1 | H | 1 |
| 23 | List any third-party sub-processors (e.g. Supabase, Netlify, email service) in `privacy.html` | PRV | 4 | 2 | H | 2 |
| 24 | Add Supabase's data processing agreement reference and data centre location (EU/UK) to `privacy.html` | PRV | 4 | 2 | H | 2 |
| 25 | Confirm that Supabase's UK/EU hosting means no international data transfer disclosures are required, or add those disclosures | PRV | 4 | 2 | H | 2 |
| 26 | Add a section on how ABLE secures fan data at rest (encryption, access controls) in `privacy.html` | PRV | 3 | 1 | M | 2 |
| 27 | Add a section on how ABLE secures fan data in transit (HTTPS/TLS) in `privacy.html` | PRV | 3 | 1 | L | 2 |
| 28 | Clarify in `privacy.html` that localStorage data is stored on the fan's own device until the Supabase backend is live | PRV | 4 | 1 | M | 2 |
| 29 | Add a separate section in `privacy.html` covering cookies specifically, even if only to confirm that no non-essential cookies are used | PRV | 4 | 1 | L | 1 |
| 30 | Confirm `privacy.html` addresses how fans can access the data held about them and the response timeframe (30 days under UK GDPR) | PRV | 4 | 1 | H | 1 |
| 31 | Add a process description in `privacy.html` for how fans submit a Subject Access Request (SAR) | PRV | 4 | 1 | H | 1 |
| 32 | Add a process description in `privacy.html` for how fans request deletion of their data | PRV | 5 | 1 | H | 1 |
| 33 | Clarify in `privacy.html` whether each individual artist is a separate data controller or whether ABLE is the sole controller | PRV | 5 | 2 | H | 1 |
| 34 | If artists are co-controllers, add a joint controller arrangement disclosure to `privacy.html` per UK GDPR Article 26 | PRV | 4 | 2 | H | 2 |
| 35 | Add a section to `privacy.html` describing what happens to fan data when an artist closes their ABLE account | PRV | 4 | 2 | H | 2 |
| 36 | Clarify in `privacy.html` whether fans who sign up receive marketing emails automatically or only on explicit request | PRV | 5 | 1 | H | 1 |
| 37 | Add PECR (Privacy and Electronic Communications Regulations) compliance language to `privacy.html` covering email marketing | PRV | 5 | 2 | H | 1 |
| 38 | Confirm the privacy policy is reviewed at least annually and add a review schedule note to `privacy.html` | PRV | 3 | 1 | L | 3 |
| 39 | Add a children's data section to `privacy.html` stating that ABLE is not directed at users under 13 and no data from minors is knowingly collected | PRV | 4 | 1 | H | 2 |
| 40 | Ensure `privacy.html` uses a minimum 16px font size for body text so it is readable on mobile | PRV | 3 | 1 | L | 2 |
| 41 | Ensure `privacy.html` has a visible page `<title>` tag reading "Privacy Policy — ABLE Music" | PRV | 2 | 1 | L | 3 |
| 42 | Add an `<h1>` element reading "Privacy Policy" to `privacy.html` so screen readers identify the page correctly | PRV | 3 | 1 | L | 2 |
| 43 | Add a table of contents with anchor links to each section of `privacy.html` for readability | PRV | 3 | 1 | L | 3 |
| 44 | Use `<section>` elements with descriptive `id` attributes in `privacy.html` so direct linking to specific clauses is possible | PRV | 2 | 1 | L | 3 |
| 45 | Make `privacy.html` mobile-responsive with correct viewport meta tag and fluid layout | PRV | 4 | 2 | M | 2 |
| 46 | Confirm `privacy.html` loads without JavaScript enabled (it must be a plain HTML page) | PRV | 4 | 1 | L | 1 |
| 47 | Add a print stylesheet to `privacy.html` so fans can print a clean copy of the policy | PRV | 2 | 1 | L | 5 |
| 48 | Include a "How to contact us" section in `privacy.html` with email address and expected response time | PRV | 4 | 1 | L | 1 |
| 49 | Add a statement that ABLE Music is registered with the ICO (or confirm if registration is pending) in `privacy.html` | PRV | 4 | 1 | H | 1 |
| 50 | Add the ICO registration number to `privacy.html` once obtained | PRV | 3 | 1 | H | 2 |
| 51 | Confirm that `privacy.html` is linked from every page in the `<footer>` element, not just in JavaScript-rendered components | ALL | 4 | 2 | H | 1 |
| 52 | Add a notice in `privacy.html` that the policy may be updated and that continued use of the service constitutes acceptance | PRV | 3 | 1 | M | 2 |
| 53 | Add an email notification mechanism for material policy changes so existing fans are informed | PRV | 4 | 3 | M | 3 |
| 54 | Confirm `privacy.html` is indexed by search engines (`robots` meta tag is not set to noindex) | PRV | 2 | 1 | L | 4 |
| 55 | Add Open Graph meta tags to `privacy.html` so it renders correctly if shared | PRV | 1 | 1 | L | 6 |
| 56 | Ensure the privacy policy link in the fan capture form opens in the same tab (not `target="_blank"`) to avoid confusing fans mid sign-up | V8 | 2 | 1 | L | 3 |
| 57 | State explicitly in `privacy.html` that fan email addresses are never shared with other artists on the platform | PRV | 5 | 1 | H | 1 |
| 58 | Add a "what we don't collect" section to `privacy.html` to proactively reassure fans (no payment data, no device fingerprinting) | PRV | 4 | 1 | L | 2 |
| 59 | Confirm source attribution (`able_fans[].source`) data is disclosed in `privacy.html` (which page/link the fan clicked from) | PRV | 3 | 1 | M | 2 |
| 60 | Add `campaign state at sign-up` to the data collected list in `privacy.html` | PRV | 3 | 1 | H | 2 |
| 61 | Add a note in `privacy.html` explaining what happens to data in the transition from localStorage to Supabase | PRV | 3 | 2 | M | 3 |
| 62 | Confirm `privacy.html` addresses analytics data (page views, CTA clicks) separately from fan sign-up data | PRV | 4 | 1 | H | 2 |
| 63 | Add a legal basis for analytics data collection (e.g. legitimate interest with balancing test) to `privacy.html` | PRV | 4 | 2 | H | 2 |
| 64 | State in `privacy.html` that analytics data is aggregated and not linked to individual fan identity | PRV | 4 | 1 | M | 2 |
| 65 | Add a data minimisation statement to `privacy.html` confirming ABLE only collects data necessary for the stated purpose | PRV | 3 | 1 | L | 3 |
| 66 | Add an accuracy principle statement to `privacy.html` (fans can correct inaccurate data on request) | PRV | 3 | 1 | L | 3 |
| 67 | Add an integrity and confidentiality statement to `privacy.html` referencing UK GDPR Article 5(1)(f) | PRV | 3 | 1 | L | 3 |
| 68 | Confirm `privacy.html` does not use confusing legal jargon without plain-English explanations | PRV | 4 | 1 | L | 2 |
| 69 | Have a qualified legal professional review `privacy.html` before launch | PRV | 5 | 3 | H | 2 |
| 70 | Store a signed copy of the legal review for `privacy.html` in internal records | PRV | 3 | 1 | L | 3 |
| 71 | Add a "Privacy by design" commitment statement to `privacy.html` in plain language | PRV | 2 | 1 | L | 5 |
| 72 | Include a FAQ section in `privacy.html` answering: "Does ABLE sell my email?", "Can I delete my data?", "Who can see my email?" | PRV | 4 | 2 | L | 3 |
| 73 | Confirm that `privacy.html` is consistent with the terms of service in `terms.html` (no contradictions) | PRV | 4 | 2 | H | 2 |
| 74 | Add a cross-reference link from `privacy.html` to `terms.html` and vice versa | PRV | 2 | 1 | L | 4 |
| 75 | Confirm the fan sign-up form in `able-v7.html` does not pre-tick any consent checkbox | V8 | 5 | 1 | H | 1 |
| 76 | Add audit logging to record when privacy policy was accepted by each fan (timestamp, policy version) for compliance evidence | V8 | 4 | 3 | H | 3 |
| 77 | Ensure the privacy link in the fan capture form is in a contrast-compliant colour (WCAG AA minimum 4.5:1 ratio) | V8 | 3 | 1 | M | 2 |
| 78 | Test that `privacy.html` renders correctly on iOS Safari 16+ and Chrome Android 100+ | PRV | 3 | 1 | L | 2 |
| 79 | Add a GDPR-compliant data breach notification procedure to internal documentation and reference it briefly in `privacy.html` | PRV | 4 | 2 | H | 2 |
| 80 | Add a statement in `privacy.html` that ABLE will notify affected fans within 72 hours of discovering a data breach if required | PRV | 4 | 1 | H | 2 |
| 81 | Confirm `privacy.html` addresses profiling and automated decision-making (even if only to confirm ABLE does not engage in it) | PRV | 3 | 1 | H | 2 |
| 82 | Add a "no automated decision-making" statement to `privacy.html` if that is accurate | PRV | 3 | 1 | H | 2 |
| 83 | Add a "How we use cookies" subsection to `privacy.html` even if the answer is "we do not use non-essential cookies" | PRV | 4 | 1 | L | 1 |
| 84 | Confirm `privacy.html` discloses whether Netlify server logs retain fan IP addresses and for how long | PRV | 3 | 2 | H | 2 |
| 85 | Add a reference to Netlify's own privacy policy in the sub-processor section of `privacy.html` | PRV | 3 | 1 | L | 2 |
| 86 | Confirm that `privacy.html` is served over HTTPS and never over HTTP | PRV | 5 | 1 | H | 1 |
| 87 | Set `X-Frame-Options: DENY` header for `privacy.html` in `netlify.toml` to prevent clickjacking attacks | PRV | 3 | 1 | L | 2 |
| 88 | Set `Content-Security-Policy` header for `privacy.html` in `netlify.toml` | PRV | 3 | 2 | M | 3 |
| 89 | Confirm `privacy.html` does not embed any third-party iframes (analytics pixels, social widgets) that would themselves set cookies | PRV | 4 | 1 | H | 1 |
| 90 | Ensure `privacy.html` passes the W3C HTML validator with no errors | PRV | 2 | 1 | L | 3 |
| 91 | Add a `lang="en"` attribute to the `<html>` element of `privacy.html` for screen reader language detection | PRV | 3 | 1 | L | 2 |
| 92 | Add descriptive `<meta name="description">` content to `privacy.html` | PRV | 1 | 1 | L | 5 |
| 93 | Confirm that the privacy policy link in the fan capture section has visible focus styling consistent with the rest of the page | V8 | 3 | 1 | L | 2 |
| 94 | Create an internal process checklist for keeping `privacy.html` up to date when backend changes affect data collection | PRV | 3 | 2 | L | 3 |
| 95 | Add a "previous versions" archive link to `privacy.html` once the policy has been revised at least once | PRV | 2 | 1 | L | 5 |
| 96 | Confirm that when the Supabase backend is live, the data controller / processor relationship is reflected in an updated Data Processing Agreement between ABLE and artists | PRV | 5 | 3 | H | 3 |
| 97 | Provide artists with a template Data Processing Agreement they can download from `admin.html` or the help docs | ADM | 4 | 3 | H | 3 |
| 98 | Add a "data portability" section to `privacy.html` confirming fans can request their data in a machine-readable format | PRV | 4 | 1 | H | 2 |
| 99 | Add a statement in `privacy.html` clarifying that ABLE does not use fan data for advertising targeting on any platform | PRV | 5 | 1 | H | 1 |
| 100 | Conduct a Data Protection Impact Assessment (DPIA) for the fan sign-up feature before Supabase backend launch and reference it in `privacy.html` | PRV | 5 | 4 | H | 3 |
