# panoriq-website

Static marketing site for panoriq (the AI contracting practice of Kawunu GmbH). Plain HTML
plus Tailwind, no framework, deployed to GitHub Pages. Personal brand: Alex Key.

## Commands

```bash
npm run dev     # tailwind --watch + python http.server on :4173
npm run build   # tailwind --minify -> dist/output.css
```

There is no test suite. Verify changes by loading the page and looking at it. Chromium via
Playwright is a reasonable way to screenshot and check console errors.

## How the CSS works

Single source: `src/input.css` compiles to `dist/output.css`. Tailwind v4, configured
inline in that file - there is no `tailwind.config.js`.

- Brand tokens live in the `@theme` block: `navy`, `navy-deeper`, `brand-cyan`, `teal`,
  `teal-deep`, `aqua`, `aqua-surface`, `sand`, `fog`, `mist`, `stone-400..700`, plus
  `font-display` (Manrope), `font-sans` (Inter), `font-mono` (Space Grotesk),
  `font-serif` (Fraunces).
- Custom component classes are defined in the `@layer components` block: `display-hero`,
  `display-section`, `eyebrow`, `bg-grid`, `grain`, `wave-layer`/`wave-1..4`, `big-q`,
  `horizon`, `nav-glass`, `card`, `marquee`, `legal-prose`, `[data-reveal]`.
- `@source "../*.html"` at the bottom is what makes Tailwind scan pages. Root-level HTML
  is picked up automatically. A page in a new subdirectory needs its own `@source` line.
- Arbitrary variants must match the DOM exactly. Write `[&::-webkit-details-marker]:hidden`
  with a raw `&`, not `&amp;` - Tailwind scans the file as text, so an escaped entity
  generates a class the browser never sees.

## Deploying

`.github/workflows/deploy.yml` runs on push to `main`. Two things about it matter:

1. It copies an **explicit list** of HTML files into `_site`. A new page that is not added
   to that `cp` line builds fine and silently never deploys. Check it whenever you add a page.
2. It replaces `__ASSET_VERSION__` with the commit SHA across `_site/*.html`. Every local
   asset URL should carry `?v=__ASSET_VERSION__`.

## Pages and who they are for

| Page | Audience | Indexed |
|---|---|---|
| `index.html` | Spatial software vendors - the core ICP | yes |
| `training.html` | Geo data service firms, EN | yes |
| `training-de.html` | Same offer, German (Du form) | yes |
| `agent-evaluation.html` | Private funnel page, scorecard download | no |
| `impressum.html`, `datenschutz.html`, `404.html` | legal / plumbing | - |

**The two-audience rule.** The main site sells agent engineering to companies that *make*
spatial software. The training page sells a two half-day workshop to companies that *process*
spatial data. These are different offers with different buyers, and the training must never
become the site's headline message. Cross-links from `index.html` are deliberately quiet:
one nav link, one line at the end of the contact section, one footer link. Do not expand
them or move training copy into the hero without being asked.

`training.html` is indexed, but the separation is held by placement rather than by hiding it
from crawlers: those three quiet cross-links, and no presence in the main navigation. Adding
a banner, a hero CTA or a fourth link breaks the rule even though the page is public.

**`training.html` is a leave-behind, not a landing page.** Every reader gets there from a
LinkedIn message Alex sent them, and replies on LinkedIn. So: no email address anywhere on it
(it is indexed, and the spam is real), no calendar link, no scarcity, no dates, no CTA in the
hero, and price below the agenda rather than above it. It is meant to stay short - adding
paragraphs is the failure mode. `docs/training-offer-requirements.md` has the full spec.

## Design conventions to follow

- Sections carry a numbered eyebrow: `01 - What I do`, `02 - Selected work`.
- Section headlines use `display-section` with the second line in serif italic:
  `First line<br><span class="font-serif italic font-normal">second line.</span>`
  Keep each line short. Long lines wrap into a third line and look broken at 1440px -
  measure rendered line count if unsure rather than eyeballing at reduced scale.
- Cards: `rounded-3xl p-8 bg-white ring-1 ring-mist`, with `card` added for hover lift.
- Buttons are pills: `px-7 py-3.5 rounded-full text-[14px] font-semibold`. Dark on light is
  `bg-navy hover:bg-teal-deep`; on navy backgrounds use `bg-brand-cyan text-navy hover:bg-white`.
  Most carry a small arrow SVG.
- Every page ends with the same IntersectionObserver snippet driving `[data-reveal]`.
- Roman numerals (`Ⅰ Ⅱ Ⅲ`) in `font-mono text-teal-deep` mark items within a section.

## Hard constraints

- **No external requests on page load.** Fonts, `three.js` and the built CSS are all
  self-hosted. Do not add a CDN link, a Google Fonts tag, or an analytics script.
- **Third-party embeds need a click-to-load facade.** Videos use a poster image plus a
  button that only loads Vimeo on click, with consent copy naming what Vimeo receives and a
  link to `datenschutz.html`. Vimeo IDs and the facade helper live in `js/vimeo.js`, which
  loads on `index.html` and `training.html`; `js/main.js` is the three.js hero only, so a page
  with no canvas loads `js/vimeo.js` alone. Follow that pattern exactly for any new embed - it
  is a GDPR requirement, not a preference.
- **Copy voice:** first person, direct, no hype, no marketing padding. Use hyphens, never
  em dashes. State limitations plainly where they exist; that honesty is part of the pitch.
- **US English** throughout: `recognize`, `behavior`, `math`. This includes comments. The
  German legal boilerplate in `datenschutz.html` is exempt - do not edit legal text for
  spelling.

## Bilingual pages

The training page is bilingual: `training.html` (EN) and `training-de.html` (DE), live since
2026-07-28. The convention is separate files, not runtime i18n: each carries the full
`hreflang` triplet (`en`, `de`, `x-default` pointing at EN) and an EN/DE pill toggle in the
nav (current language is a non-link `<span>` with `aria-current`). German copy uses **Du
form** - decided 2026-07-28, reversing the earlier Sie decision. German number format:
`4.900 €`, symbol after the number; English `€4,900`. Do not normalize one to the other.

**Any content change to one page requires the matching change to the other in the same
commit.** Both files are in the deploy `cp` list and in `sitemap.xml`. `index.html` stays
English only.

## SEO

`index.html` and `training.html` each carry a canonical link, an explicit `index, follow`
robots meta, OG and Twitter cards, and JSON-LD. The two JSON-LD blocks share one entity:
`training.html`'s `Course.provider` uses the `@id` `https://panoriq.com/#organization`
defined in `index.html`. Keep that `@id` stable. Both pages are listed in `sitemap.xml`;
a new indexed page needs adding there as well as to the deploy `cp` line.

`agent-evaluation.html` stays `noindex` - it is a private funnel page.

## Requirements

What the training page must contain and what is still open is specified in
`docs/training-offer-requirements.md`. Read that before changing `training.html` - it holds
the commercial facts (price, terms, dates) that appear in several places on the page.
