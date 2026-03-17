# PATH-TO-10 — Free Tools and APIs
**Document:** `FREE-TOOLS-AND-APIS.md`
**Current score:** 9.5/10
**Target:** 10/10

---

## What would make this a 10/10

### Gaps to close

**1. Songkick status needs re-verification (0.1 gap)**
As of March 2026, Songkick was not accepting new API applications. Before ABLE builds any Songkick integration, check `songkick.com/developer` for current availability. If they've reopened, add a full entry alongside Bandsintown in Part 1 with a comparison table (Bandsintown vs Songkick data quality). The comparison belongs in the document — two sources for tour data is more resilient than one.

**Action:** Re-check Songkick API status in Q2 2026. If open, add entry and comparison table.

**2. Bandcamp API entry (0.1 gap)**
Bandcamp oEmbed is listed in the priority matrix but doesn't have a full entry in Part 1. For ABLE's audience of independent artists, Bandcamp is highly relevant — many sell direct via Bandcamp. A full entry covering the oEmbed, the Bandcamp API (fan purchase data, album sales stats) and integration notes would round this out.

**Note:** Bandcamp's full API access (fan data, sales) was in flux after Epic Games sold Bandcamp to Songtradr in 2023, then Songtradr went bankrupt. Current Bandcamp API status under new ownership needs verification.

**Action:** Research Bandcamp API current status, add full entry.

**3. Audiomack for streaming artists (0.1 gap)**
Audiomack is the dominant streaming platform for hip-hop, Afrobeats, and underground genres — categories ABLE should serve. It has a public API and oEmbed. Not mentioned in the document at all.

**Action:** Research Audiomack API, add entry under Part 1 or Part 2.

**4. Real-world CORS behaviour notes (0.1 gap)**
The oEmbed proxy Netlify function code is correct, but the document doesn't mention that `Sec-Fetch-Mode` headers and `User-Agent` requirements vary between providers. A note on this for developers implementing the proxy would save debugging time.

**Action:** Add a "Known CORS gotchas" subsection to Part 3.

**5. Chromaprint / AcoustID WASM exploration (0.1 gap)**
The document marks AcoustID as 🔴 Complex because of the Chromaprint client-side requirement. But there is now a Chromaprint WASM build that runs in-browser — this potentially makes it 🟡 Medium. The document should acknowledge this possibility and link to the WASM project.

**Action:** Research `chromaprint.js` / Chromaprint WASM status. Update complexity rating if viable.

---

## What the document does well (keep)

- Every entry has a real "How ABLE uses it" that's specific to pages and journeys
- Cost summary table is honest and accurate
- The "APIs to Avoid" section is unusually valuable — most docs don't have this
- The oEmbed proxy code is production-ready and directly usable
- Samplette and Music-Map are handled honestly (no API, link-only) rather than pretending an integration exists

---

## When to revisit this document

- Before any new third-party integration is started: check this list first
- Quarterly: re-verify API status for AcousticBrainz, Songkick, Bandcamp
- When ABLE adds a new page or surface: update "How ABLE uses it" for each entry to reflect new contexts
