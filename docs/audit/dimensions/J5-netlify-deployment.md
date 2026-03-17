# Dimension J5 — Netlify Deployment
**Category:** Launch Readiness & Cross-Page Coherence
**Phase:** 10 (Launch)
**Status:** Not started

`netlify.toml` correctly routes slugs to the artist profile. Redirects all work. Headers file sets correct security headers. Functions deploy correctly. No 404s on any route in production. Full compliance means that an artist who sets up their profile and shares the URL `ablemusic.co/maya-gold` gets a working page for every fan who taps it — not a 404, not a Netlify error page, and not the wrong artist's profile. It also means that ABLE's Netlify functions (fan sign-up, Spotify import) are deployed and callable, security headers prevent common attacks, and the production build matches the development build exactly.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Confirm the `[[redirects]]` rule `from = "/:slug" to = "/able-v7.html" status = 200` correctly serves the artist profile for any slug | NET | 5 | 1 | H | 1 |
| 2 | Test a real slug route in production: navigate to `ablemusic.co/test-artist` and confirm able-v7.html loads | NET | 5 | 1 | H | 1 |
| 3 | Confirm `index.html` at the root is a redirect stub and not the landing page — the root should serve `landing.html` | NET | 5 | 1 | H | 1 |
| 4 | Add a redirect rule for the root: `from = "/" to = "/landing.html" status = 200` if the root is not directly `landing.html` | NET | 4 | 1 | M | 1 |
| 5 | Confirm `/admin` (without `.html`) routes to `admin.html` — artists should not need to type the file extension | NET | 4 | 1 | M | 1 |
| 6 | Add a redirect rule: `from = "/admin" to = "/admin.html" status = 200` | NET | 4 | 1 | M | 1 |
| 7 | Confirm `/start` routes to `start.html` | NET | 4 | 1 | M | 1 |
| 8 | Add a redirect rule: `from = "/start" to = "/start.html" status = 200` | NET | 4 | 1 | M | 1 |
| 9 | Confirm no slug can collide with an existing file path — `/admin`, `/start`, `/landing`, `/privacy`, `/terms` must be excluded from the `/:slug` wildcard | NET | 5 | 2 | H | 1 |
| 10 | Add explicit rules for all static HTML files before the `/:slug` wildcard rule — Netlify processes redirects top-to-bottom | NET | 5 | 2 | H | 1 |
| 11 | Confirm `privacy.html` is accessible at `/privacy` or `/privacy.html` — no 404 | NET | 3 | 1 | L | 2 |
| 12 | Confirm `terms.html` is accessible at `/terms` or `/terms.html` — no 404 | NET | 3 | 1 | L | 2 |
| 13 | Confirm `manifest.json` is accessible at `/manifest.json` — no redirect intercepts it | NET | 5 | 1 | H | 1 |
| 14 | Confirm `sw.js` is accessible at `/sw.js` — no redirect intercepts it | NET | 5 | 1 | H | 1 |
| 15 | Confirm `favicon.ico` is accessible at `/favicon.ico` — no 404 (browsers request this automatically) | NET | 3 | 1 | L | 2 |
| 16 | Confirm Netlify function `fan-confirmation` is accessible at `/.netlify/functions/fan-confirmation` — returns 405 on GET | NET | 5 | 1 | H | 1 |
| 17 | Deploy a test POST to `/.netlify/functions/fan-confirmation` with a valid JSON payload and confirm 200 response | NET | 5 | 2 | H | 1 |
| 18 | Confirm all Netlify environment variables are set in the Netlify dashboard: `RESEND_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` | NET | 5 | 1 | H | 1 |
| 19 | Confirm environment variables are set per-context: production values in "Production", not accidentally exposed in "Deploy Previews" | NET | 4 | 1 | M | 2 |
| 20 | Confirm Netlify build command is not set (no build step needed for a vanilla HTML project) — set `command = ""` or omit | NET | 4 | 1 | M | 2 |
| 21 | Confirm Netlify `publish` directory is set to `"."` (root) in `netlify.toml` | NET | 4 | 1 | M | 2 |
| 22 | Confirm `functions` directory is set to `"netlify/functions"` in `netlify.toml` | NET | 4 | 1 | M | 2 |
| 23 | Confirm the Node.js version for functions is pinned in `netlify.toml`: `[functions] node_bundler = "esbuild"` | NET | 3 | 1 | L | 3 |
| 24 | Add a `_headers` file or `[[headers]]` block in `netlify.toml` with `X-Frame-Options: DENY` for all routes | NET | 4 | 1 | M | 2 |
| 25 | Add `X-Content-Type-Options: nosniff` header for all routes | NET | 4 | 1 | M | 2 |
| 26 | Add `Referrer-Policy: strict-origin-when-cross-origin` header for all routes | NET | 3 | 1 | L | 2 |
| 27 | Add `Permissions-Policy: geolocation=(), camera=(), microphone=()` header — deny unused browser permissions | NET | 3 | 1 | L | 2 |
| 28 | Add `Strict-Transport-Security: max-age=31536000; includeSubDomains` header — HSTS enforcement | NET | 4 | 1 | M | 2 |
| 29 | Add a Content-Security-Policy header for `landing.html`: restrict `script-src` to ABLE's own origin and trusted CDNs | LND | 4 | 3 | M | 3 |
| 30 | Add a Content-Security-Policy header for `admin.html`: include Supabase CDN and Resend origins in `connect-src` | ADM | 4 | 3 | M | 3 |
| 31 | Add a Content-Security-Policy header for `able-v7.html`: include oEmbed origins (YouTube, SoundCloud) in `frame-src` | V8 | 4 | 3 | M | 3 |
| 32 | Confirm `sw.js` is served with `Cache-Control: no-cache, no-store` header | NET | 5 | 1 | H | 1 |
| 33 | Confirm all HTML files are served with `Cache-Control: no-cache` header | NET | 5 | 1 | H | 1 |
| 34 | Confirm CSS and JS assets are served with `Cache-Control: public, max-age=31536000, immutable` (only if filenames are versioned) | NET | 3 | 2 | L | 3 |
| 35 | Confirm `manifest.json` is served with `Cache-Control: no-cache` | NET | 4 | 1 | M | 2 |
| 36 | Confirm HTTPS is enforced — Netlify forces HTTPS by default but confirm no mixed-content warnings appear in production | NET | 5 | 1 | H | 1 |
| 37 | Confirm the custom domain `ablemusic.co` is correctly configured in Netlify with DNS verified | NET | 5 | 1 | H | 1 |
| 38 | Confirm the `www.ablemusic.co` subdomain redirects to `ablemusic.co` (or vice versa) — no split between www and non-www | NET | 4 | 1 | M | 2 |
| 39 | Confirm the SSL certificate is valid and auto-renewing via Netlify's Let's Encrypt integration | NET | 5 | 1 | H | 1 |
| 40 | Test all production routes with a URL crawler or manual check: `/`, `/admin`, `/start`, `/privacy`, `/terms`, a slug, `/manifest.json`, `/sw.js` | NET | 5 | 2 | H | 1 |
| 41 | Confirm a 404 on an unrecognised route serves a custom `404.html` page, not the default Netlify 404 | NET | 3 | 2 | L | 3 |
| 42 | Create a branded `404.html` page with the ABLE design and a link back to the landing page | NET | 3 | 3 | L | 3 |
| 43 | Confirm Netlify Deploy Previews are enabled for PRs — allows testing changes before they go to production | NET | 3 | 1 | L | 3 |
| 44 | Confirm Netlify branch deploys are disabled for branches other than `main` — prevents accidental live deployments | NET | 3 | 1 | L | 3 |
| 45 | Confirm the Netlify build log for the most recent production deploy shows zero errors | NET | 5 | 1 | H | 1 |
| 46 | Confirm no binary files or large media files are checked into the git repo and deployed to Netlify — use a CDN instead | NET | 3 | 2 | L | 3 |
| 47 | Confirm `_archive/` directory is not publicly accessible via Netlify — add a redirect rule returning 404 for `/_archive/*` | NET | 4 | 1 | M | 2 |
| 48 | Confirm `.env` and `.env.example` are not deployed to Netlify's public serving directory | NET | 5 | 1 | H | 1 |
| 49 | Confirm `netlify.toml` does not contain any hardcoded secret values — environment variables only | NET | 5 | 1 | H | 1 |
| 50 | Confirm `docs/` directory is not publicly accessible via Netlify — audit files should not be browseable by the public | NET | 3 | 2 | M | 3 |
| 51 | Add a redirect rule: `from = "/docs/*" to = "/404.html" status = 404` | NET | 3 | 1 | L | 3 |
| 52 | Confirm Netlify function logs are accessible to the team and are being retained | NET | 3 | 1 | L | 3 |
| 53 | Confirm Netlify form submissions are not enabled — ABLE uses its own Netlify functions, not Netlify Forms | NET | 2 | 1 | L | 4 |
| 54 | Confirm Netlify Identity is not enabled — authentication is handled via Supabase, not Netlify Identity | NET | 2 | 1 | L | 4 |
| 55 | Confirm the `[[redirects]]` `force = true` option is not accidentally set on any rule — it overrides all file serving | NET | 4 | 1 | M | 2 |
| 56 | Confirm the slug redirect rule is the last rule in `netlify.toml` — rules are first-match-wins | NET | 5 | 1 | H | 1 |
| 57 | Test a slug with special characters (`ablemusic.co/dj-test`) — confirm URL encoding is handled correctly | NET | 3 | 2 | L | 3 |
| 58 | Test a slug with uppercase letters (`ablemusic.co/MayaGold`) — confirm Netlify matches case-insensitively or redirects to lowercase | NET | 3 | 2 | L | 3 |
| 59 | Confirm Netlify Analytics is enabled and tracking page views on production | NET | 2 | 1 | L | 5 |
| 60 | Confirm the Netlify site name matches `ablemusic.co` for clarity — not an auto-generated name | NET | 2 | 1 | L | 5 |
| 61 | Confirm the Netlify team is set up with the correct seat assignments — James as owner | NET | 2 | 1 | L | 5 |
| 62 | Confirm the Netlify `[build.environment]` block does not set `NODE_ENV` to anything other than `production` | NET | 3 | 1 | L | 3 |
| 63 | Confirm the Netlify function timeout is set to at least 10 seconds for the Spotify import function | NET | 3 | 2 | L | 3 |
| 64 | Confirm the Netlify function `fan-confirmation.js` does not import any npm modules that require a build step | NET | 4 | 2 | M | 2 |
| 65 | Confirm Netlify auto-deploys from the `main` branch only — not from `v2-simplified` or any feature branch | NET | 4 | 1 | M | 2 |
| 66 | Confirm the deploy webhook URL is not publicly visible in any commit or documentation file | NET | 3 | 1 | L | 3 |
| 67 | Confirm the production URL in `CONTEXT.md` and `STATUS.md` matches the actual Netlify site URL | DOC | 3 | 1 | L | 3 |
| 68 | Test all Netlify functions with the Netlify CLI locally before the next deploy: `netlify dev` | NET | 4 | 1 | L | 2 |
| 69 | Confirm `netlify dev` command runs correctly without errors — validates the toml and functions setup locally | NET | 4 | 1 | M | 2 |
| 70 | Confirm the `[[redirects]]` slug rule does not intercept `/favicon.ico` requests | NET | 3 | 1 | L | 2 |
| 71 | Confirm the `[[redirects]]` slug rule does not intercept `/robots.txt` requests | NET | 3 | 1 | L | 2 |
| 72 | Create `robots.txt` at the project root — allow crawlers for public pages, disallow `/_archive/` and `/docs/` | NET | 3 | 2 | L | 3 |
| 73 | Confirm `sitemap.xml` exists and includes `landing.html` and a sample artist profile URL | NET | 3 | 3 | L | 4 |
| 74 | Confirm Netlify's asset optimisation (CSS/JS minification) is disabled — ABLE is vanilla HTML, no build pipeline | NET | 3 | 1 | L | 3 |
| 75 | Confirm Netlify's asset fingerprinting is disabled — no build pipeline means no hash-based filenames | NET | 3 | 1 | L | 3 |
| 76 | Confirm Netlify's image optimisation is not transforming ABLE's OG images without permission | NET | 3 | 1 | L | 3 |
| 77 | Confirm the `X-Robots-Tag: noindex` header is NOT set on production artist profile pages — they should be indexable | NET | 4 | 1 | M | 2 |
| 78 | Confirm the `X-Robots-Tag: noindex` header IS set on `admin.html` and `start.html` — these should not be indexed | NET | 3 | 1 | L | 3 |
| 79 | Confirm CORS headers on Netlify functions allow only `https://ablemusic.co` in production | NET | 4 | 1 | M | 2 |
| 80 | Test the production deployment from a mobile device not on the development WiFi network | NET | 4 | 1 | L | 2 |
| 81 | Run Lighthouse on the production URL (not localhost) and confirm there are no Netlify-specific performance regressions | NET | 4 | 2 | M | 2 |
| 82 | Confirm response time for able-v7.html from a UK IP is under 500ms (Time to First Byte) | NET | 4 | 2 | M | 2 |
| 83 | Confirm Netlify CDN caching is working — second request for static assets should be served from edge, not origin | NET | 3 | 1 | L | 3 |
| 84 | Confirm `ETag` and `Last-Modified` headers are set correctly for static assets | NET | 3 | 1 | L | 3 |
| 85 | Confirm the Spotify import Netlify function is deployed (if built) and tested with a known Spotify artist URL | NET | 3 | 3 | L | 4 |
| 86 | Confirm no Netlify function has an unhandled promise rejection — add `process.on('unhandledRejection')` guard | NET | 4 | 2 | M | 2 |
| 87 | Confirm a Netlify deploy failure notification is configured — email or Slack alert for production deploy failures | NET | 3 | 1 | L | 4 |
| 88 | Confirm the Netlify "Deploy failed" rollback scenario: confirm that a failed deploy does not take down production | NET | 3 | 2 | L | 4 |
| 89 | Confirm there are no Netlify plugin configurations that could modify HTML files at deploy time | NET | 3 | 1 | L | 3 |
| 90 | Confirm the `netlify.toml` `[context.production]` block overrides any `[context.branch-deploy]` environment settings | NET | 3 | 1 | L | 3 |
| 91 | Confirm `/og-default.jpg` is accessible at the root for OG card fallback | NET | 4 | 1 | M | 2 |
| 92 | Confirm Netlify does not serve directory listings for any path (should return 404, not a file list) | NET | 3 | 1 | L | 3 |
| 93 | Confirm the Netlify function `spotify-import` has its own timeout set to 26 seconds (Netlify max for synchronous functions) | NET | 3 | 2 | L | 4 |
| 94 | Test a 405 Method Not Allowed response on the fan-confirmation function when called with DELETE | NET | 3 | 1 | L | 3 |
| 95 | Document the full `netlify.toml` redirect logic in `docs/` with comments explaining every rule and its order | DOC | 2 | 2 | L | 5 |
| 96 | Confirm the Netlify site is connected to the correct GitHub repository and the `main` branch | NET | 5 | 1 | H | 1 |
| 97 | Confirm there are no Netlify build plugins enabled that are incompatible with a no-build-pipeline project | NET | 3 | 1 | L | 3 |
| 98 | Confirm the Netlify team billing is on a plan that supports the required function invocation count for launch | NET | 3 | 1 | L | 3 |
| 99 | Run Netlify's built-in "Deploy summary" and confirm zero warnings after the most recent production deploy | NET | 4 | 1 | M | 2 |
| 100 | Confirm `STATUS.md` is updated to mark J5 complete with the date the full route audit was completed | DOC | 2 | 1 | L | 6 |
