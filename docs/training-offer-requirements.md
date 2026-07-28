# Requirements: training offer pages

Status: the page is live and indexed. This document is the spec it must satisfy, plus the
work that is still open. Read it before changing `training.html`.

Owner of all commercial decisions: Alex. Anything marked LOCKED is a business decision, not
a copy preference - do not reword or "improve" it without asking.

---

## 1. What this page is for

A paid workshop over two half-days, "Claude Code for geo data processing", sold to geo data service
firms as a cash-bridge offer.

**It is a leave-behind, not a landing page.** Every reader arrives the same way: Alex sends a
short LinkedIn message to gauge interest, they express some, and he sends the link. They read
it, and they reply on LinkedIn. Nobody discovers this page on their own and converts. That
single fact decides most of the design questions below - it is why there is no email capture,
no calendar link, no scarcity, and no CTA in the hero. The page has to inform a warm reader,
not persuade a cold one.

It is not a funnel, a lead magnet, or a content hub.

Success condition: a managing partner at a 10-100 person firm reads it in a few minutes and
knows whether to take the conversation further. Two things must land - that the boring half of
their week is now automatable, which most of them do not know, and what the workshop actually
contain. Price and terms must be answerable from the page, but they are not the point of it.

## 2. Positioning guardrails

These constrain what may be built, and they override design or conversion instincts.

- **G-1.** The main site sells agent engineering to companies that *make* spatial software.
  This workshop sells to companies that *process* spatial data. Different offer, different
  buyer. The workshop must never become the site's headline message.
- **G-2.** Cross-links from `index.html` stay quiet: one nav link, one line at the end of the
  contact section, one footer link. Do not add a hero CTA, banner, popup or interstitial.
- **G-3.** ~~Both pages are `noindex, nofollow`.~~ **Reversed 2026-07-26.** `training.html` is
  indexed: `index, follow`, canonical set, listed in `sitemap.xml`, with `Course` structured
  data. The dilution risk is handled by placement instead - the page stays out of the main
  navigation and keeps only the three quiet cross-links from G-2. Do not promote it further.
- **G-4.** Tone: flat and factual. State what the tool does and where it fails. No hype, no
  urgency theatre, no fake scarcity. The honest limitation is a selling point - keep it.
- **G-5.** The offer is time-boxed pending one paid pilot. Do not build infrastructure that
  assumes it becomes a permanent product line.

## 3. Commercial facts - single source of truth

LOCKED. These values appear in several places per page and in both languages. If one
changes, change all of them and check both pages.

| Fact | Value |
|---|---|
| Duration | 2 half-days (changed from 2 full days, 2026-07-26 - check every string) |
| Price | €4,900 net, flat per company, not per seat |
| Group size | Up to 6 people included |
| Extra participants | €500 each, hard cap 8 total |
| Travel | Included within DACH; remote same price |
| Guarantee | Free follow-up session until it delivers. **Never** a refund on the page |
| Participant cost | A Claude subscription each. **No price on the page** - tiers and prices move, and naming one dates the page |
| Support | 90 days of async questions after the workshop |
| Languages | Delivery in German or English |
| Availability | One company at a time. No dates on the page - see below |
| Booking | LinkedIn reply. No calendar link, and no email address anywhere on the page |

Three things deliberately absent from the page, and they must stay absent: the pilot rate
(~€3,900, a private negotiating lever), any refund offer, and any email address - the page is
indexed and Alex already gets enough spam. LinkedIn is the only channel on it.

**Copy is US English.** Decided 2026-07-26.

**The margin line must not exclude anyone.** It reads "those hours either come off your
margin or crowd out the work you would rather be selling", which is true whether a firm bills
fixed-price or by the hour. An earlier draft said "in fixed-price work" and would have lost
every reader who bills time and materials at the first paragraph.

**No dates, no slot counts.** Removed 2026-07-26. Scarcity does nothing when every reader has
already been contacted directly, and a month named on the page is stale the moment it passes.
Dates are agreed in the conversation, not advertised. Do not reintroduce a "two slots left"
card.

## 4. Required content

The page must contain these blocks, in this order. Substance is required; exact wording is
editable except where noted.

Restructured 2026-07-26. The old order was a conversion funnel - qualify, convince, handle
objections, close. That is the wrong shape: this page is a leave-behind for a conversation
already in progress on LinkedIn, not a lead generator. The order below front-loads the two
things a warm reader wants (the surprise, then the agenda) and leaves the commercial detail
for the bottom half. **Keep it short.** Adding paragraphs is the failure mode here.

1. **Hero** - carries the whole pitch on its own, in this order: who it is for, the problem,
   the solution. The reader must think *that's us* before they learn anything is being sold.
   - The eyebrow **names the audience** - surveying, point cloud and GIS teams. Not "workshop".
   - The headline is the **problem**, not the offer. Their best people spend half the week
     wrangling data.
   - Then one line of solution: an agent does most of that now, driving their existing stack,
     and Alex will show them how over two half-days on their own data.
   - Right column: the **"what changes" card** - one real instruction typed in plain language
     and what the agent does with it. This does the work that no paragraph can, because the
     surprise is concrete. Keep it a real geo task, keep the CRS check in it.
   - Orienting facts strip: duration, group size, location, language.
   - **No price and no CTA in the hero** - the reader has not yet learned what they are
     pricing, and they already know how to reach Alex.
   - Below the two columns, still inside the hero and above the wave band: the **video band**,
     full width, no eyebrow. See T-4 for what it shows. It carries no eyebrow because it is
     part of the hero, so the numbered sections still run `01 - The agenda` to `05 - Questions`.
2. ~~**The point**~~ - **removed 2026-07-26.** Once the hero carried problem *and* solution,
   this section restated both and read as filler. The margin sentence it existed for now sits
   in the hero's first paragraph. Do not reinstate it as a section.
3. **Agenda** - the centrepiece, and the reason it sits this high. Six modules across two
   half-days, the first on prepared datasets, the second on the client's data, plus the
   compliance block.
   Module 6 (Trust: where agents get CRS, units and nodata quietly wrong) sells the workshop
   and must not be cut or softened. Roughly 60% hands-on must be stated.
   ~~The one-week-ahead dataset handover and "your data stays on your machines" line~~ -
   removed by Alex 2026-07-28, from both pages, after being restored 2026-07-27. The dataset
   handover and the data-stays-local reassurance now live only in the conversation, not on
   the page. If a prospect ever balks at sending data, this is the first thing to put back.
4. **Audience filter, compact** - one short paragraph at the end of the agenda section
   (small, stone-500, no card, no eyebrow of its own; the old two-column block is deleted).
   Who belongs in the room: the power users, the people colleagues go to when data breaks,
   no programming required. Who does not: trimmed 2026-07-28 to a single exclusion - a
   general AI strategy session. Fit is behavior, not job title.
5. **Outcomes** - what the team keeps: working automations on their own data, a project
   template, a verification routine. Materials, certificate, 90-day support.
6. **Who runs it** - named human with a portrait, the geoinformatics-plus-agents combination,
   and why that differs from a general AI trainer. This is a credibility block, so it sits
   after the value and before the price. Mirrors the About block on `index.html`. One button:
   LinkedIn. (The `/#work` demos button was removed 2026-07-27 - it dropped the training
   audience into vendor-framed messaging on the homepage at the moment they were deciding.
   The embedded video takes over the proof job; see T-4.)
7. **Price** - one card: the number, then bullets, guarantee last and most prominent. No
   dates, no availability card. Payment split and reschedule terms are **not** on the page as
   of 2026-07-26 - they are negotiation detail for the conversation, and listing them made the
   card read like a contract. The bullets carry what a buyer needs to judge the price: group
   size and the extra-seat rate, travel, and one company at a time.
8. **FAQ** - at minimum: prerequisites, programming requirement, on-site vs remote, what
   happens afterwards, and whether it will be out of date in six months.
9. **Closing CTA** - one line, one button: reply on LinkedIn.

## 5. Functional requirements

- **FR-1.** Static HTML only. No framework, no build step beyond Tailwind.
- **FR-2.** No external network requests on page load. Fonts and CSS are self-hosted.
  Adding a CDN link, web font service or analytics script violates this.
- **FR-3.** Any third-party embed uses the click-to-load facade pattern from `index.html`:
  poster image, button, consent text naming what the provider receives, link to
  `datenschutz.html`. This is a GDPR requirement. The facade helper and the Vimeo IDs live in
  `js/vimeo.js` (split out of `js/main.js` 2026-07-27, so this page loads the facade without
  the three.js hero bundle). `training.html` loads that one module and nothing else.
- **FR-4.** Every local asset URL carries `?v=__ASSET_VERSION__`.
- **FR-5.** `training.html` appears in the `cp` list in `.github/workflows/deploy.yml`. A page
  missing from that list builds successfully and silently never deploys.
- **FR-6.** `training.html` is indexable (see G-3): `index, follow`, a `canonical` link, an
  entry in `sitemap.xml`, and `Course` JSON-LD whose `provider` uses the `#organization`
  `@id` from `index.html` so both pages describe one entity.
- **FR-7.** Scroll reveal via `[data-reveal]` and the standard IntersectionObserver snippet.
  Content must be readable with JavaScript disabled - reveal is decoration, not gating.
- **FR-8.** Responsive from 390px to 1440px+. No horizontal scroll at any width.

## 6. Bilingual requirements

**Live again as of 2026-07-28.** `training-de.html` sits at the repo root, in the deploy `cp`
line and in `sitemap.xml`; the old parked draft under `drafts/` is deleted. It was rewritten
from the current English page rather than revived, so the Calendly link, the old toggle and
`noindex` from the 2026-07 draft never came back. The reversal of the English-only decision
(2026-07-26) was Alex's call on 2026-07-28.

- **FR-9.** One file per language: `training.html` (en), `training-de.html` (de). No runtime
  i18n, no JSON dictionaries, no client-side language detection.
- **FR-10.** Each page carries all three `hreflang` links: `en`, `de`, and `x-default`
  pointing at the English page.
- **FR-11.** EN/DE pill toggle in the nav on both pages. The current language is a non-link
  `<span>` with `aria-current`; the other is an anchor to its counterpart.
- **FR-12.** German uses **Du** throughout. ~~Sie~~ reversed 2026-07-28 by Alex - the page
  speaks in the same direct first-person voice as the English one, and the buyers it goes to
  arrive from a LinkedIn conversation that is already on Du terms.
- **FR-13.** German number format: `4.900 €` with the symbol after the number. English:
  `€4,900`. Do not normalize one to the other.
- **FR-14.** The two pages carry the same offer and the same commercial facts (section 3).
  A change to those requires the matching change to the other page in the same commit.
  Wording, headlines and section framing may diverge - decided 2026-07-28, German is written
  to sound right in German rather than to mirror the English.
- **FR-15.** The video stays English on both pages - one recording serves everywhere. The
  German page says so in its caption and translates the facade's consent copy.

## 7. Acceptance criteria

A change to either page is done when all of these pass:

1. `npm run build` succeeds and every new utility class appears in `dist/output.css`.
   Arbitrary variants must be written with a raw `&` - Tailwind scans file text, so `&amp;`
   generates a class the browser never sees.
2. Both pages load with zero console errors and zero failed requests (favicons and
   `js/main.js` aside when testing outside the full repo).
3. No `h1` or `h2.display-section` wraps beyond its intended line count at 1440px. Measure
   it - count the visual line boxes in the rendered heading rather than judging by eye at
   reduced scale. Headlines that wrap into an extra line look broken at full size.
4. Every value in section 3 matches between the English and German page.
5. `hreflang` links resolve; the language toggle round-trips EN → DE → EN.
6. Both training pages are present in the deploy `cp` line, and the JSON-LD parses.
7. Screenshots at 390px and 1440px reviewed before calling it done.

## 8. Open work, in priority order

**T-1. Register the page for deployment.** DONE 2026-07-26. `training.html` is in the `cp`
line. Confirm the URL resolves after the next deploy.

**T-2. Fix the booking link.** DONE 2026-07-26, by removing it. No calendar link and no email
address. The two contact points are both LinkedIn: one in the "who runs it" block, one in the
closing block. Outreach runs as LinkedIn DMs, so the page only has to accept a reply.

**T-3. German copy review.** ACTIVE again as of 2026-07-28 - `training-de.html` is live, in
Du form, translated fresh from the current English page. Alex reads it once for tone and
Fachvokabular (DGM/DOM vs DEM/DSM, "Liefergegenstand", the Du register) before sending it to
anyone.

**T-4. Embed the video.** DONE 2026-07-28. A full-width band inside the hero, below the
headline and the "what changes" card, above the wave band - the outreach message describes the
page as "video at the top, format and price below", so a DM reader hits it before the agenda.
Click-to-load Vimeo facade per FR-3, ID `1213557993` in `js/vimeo.js`, poster self-hosted at
`img/vimeo-training.jpg`.

What shipped is **not** the recording described below. It is "Three things you can try with
Claude Code today", 1:40, which opens as a vertical talking-head clip and then goes to the
desktop. It works as proof, but two things follow from it:

- The poster is Vimeo's own thumbnail, taken from the vertical opening, so it sits pillarboxed
  in the 16:9 band. Picking a desktop frame as the thumbnail in Vimeo and re-saving it to
  `img/vimeo-training.jpg` is the fix; Vimeo blocks headless frame capture, so it has to be done
  in their UI.
- The screen recording originally specced for this slot is still worth making: an agent cleans
  up a messy folder of point clouds - conversion, reprojection, broken CRS metadata - ending on
  a QA table of which files were wrong, including one real failure the human catches
  (staged-looking perfection is the failure mode). If it gets made, it replaces the ID here.

This page is the single destination sent in outreach message 2. The LinkedIn feed version stays
a separate native upload, not a link to this page.

**T-5. Testimonials.** Placeholder comment sits in the "who runs it" block, under the portrait. After the first
delivered workshop, add name, role, company and one specific sentence. Two good ones beat
six vague ones. Anonymous quotes are worse than none.

**T-6. Keep dates current.** DROPPED 2026-07-26 - there are no dates on the page any more.
See the note under section 3.

**T-7. Restore the audience filter as a compact strip.** DONE 2026-07-27. One quiet paragraph
at the end of the agenda section, under the restored logistics line; the commented-out
two-column block is deleted.

## 9. Out of scope

Do not build these without an explicit request:

- Forms, email capture, newsletter signup, or any lead-gen mechanism. The CTA is a LinkedIn
  link, and that is the whole of it.
- Analytics, tracking pixels, cookie banners, A/B testing.
- A German version of `index.html`.
- Pricing tables, tier comparisons, or per-seat calculators. One price, deliberately.
- A booking or payment flow. Invoices are handled outside the site.
- Blog, resources section, or downloadable PDF version of the offer.

## 10. Decisions that need Alex, not a default

- ~~Whether the pages go public in search.~~ Decided 2026-07-26: yes for `training.html`, see G-3.
- Whether a one-day variant at a lower price is offered. Currently not, to avoid two SKUs on
  one page.
- Whether dates ever go back on the page. Currently no - see section 3.
- Whether the offer continues at all after the first paid pilot. It is deliberately
  time-boxed (G-5).
