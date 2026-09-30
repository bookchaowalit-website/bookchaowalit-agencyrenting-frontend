# Upgrade plan

## Current state: 7/10 (was 5/10)

Search/filter now works for every offered location, filtering/sorting is
unit-tested, the contact form is honest, and CI runs lint/types/tests/build.

## Backlog

### P0
- `content/articles/bangkok-real-estate-guide.mdx` is a pasted generator dump:
  it starts with `<file_path>`/`<edit_description>` tags (so gray-matter finds
  no front matter and the API returns `title: undefined`) and contains two more
  articles plus source-code files. Split it into the three intended `.mdx`
  files (lines 8-219, 227-415, 423-711) and drop the code dump. Not done in
  pass 3 (content rewrite needs owner sign-off).
- The articles page reads `publishedAt`/`featured`/`id`, but `/api/articles`
  returns `date` and no `featured`/`id`; align the shape.
- Plan the Next 14 -> 16 / React 19 upgrade: `npm audit` still reports
  advisories that only Next 16 fixes (major bump, not done in this pass).

### P1
- Replace the 5 remote `<img>` tags with `next/image` + `images.remotePatterns`.
- Render `<html lang>` per locale (currently a `lang` wrapper div under the
  English root layout; needs a root layout per locale or middleware).
- Wire the contact form to a real handoff (e.g. a form service) once one is
  chosen; keep the honest demo state until then.
- Confirm canonical domain; set `NEXT_PUBLIC_SITE_URL`.

### P2
- Move translations into `messages/*.json` consistently (the pages embed
  their own dictionaries; `messages/` is only partly used).
- Split the 600–880 line page components.

## Done in this pass
- Fixed location filter: Chiang Mai, Hua Hin, and Koh Samui options
  returned zero results (slug vs display-name mismatch).
- Numeric filters ignore empty/invalid input; keyword is trimmed; date sort
  falls back to `created_at` instead of comparing NaN.
- `tests/properties.test.ts` (node:test) covering filters and sorting.
- Contact form no longer fakes a successful send (EN + TH copy).
- Removed `maximumScale: 1` (blocked pinch-zoom); Thai pages carry `lang="th"`.
- Open Graph url no longer points at an unrelated domain; robots.txt and a
  bilingual sitemap; data-driven, accessible `more-projects` page.
- CI workflow; `typecheck`/`test` scripts; untracked `tsconfig.tsbuildinfo`.

## Done in this pass (pass 2)
- Cross-repo consistency: the layout's JSON-LD now uses `SITE_URL` (from
  `NEXT_PUBLIC_SITE_URL`) instead of a hard-coded `*.vercel.app` host, and the
  bogus `SearchAction` (pointed at `/more-projects`, which has no search) is gone.
  Sitemap/robots were already generated from `lib/site.ts`.
- `PropertyCard` no longer falls back to the non-existent `/api/placeholder/…`
  route (a guaranteed broken image); listings without photos show a labelled
  "No photo yet" block.

## Done in this pass (pass 3)
- Edge-case pass on `lib/` logic:
  - Listing dates rendered with local `getDate()` on a UTC-midnight
    `created_at`, so visitors west of UTC saw the previous day. New
    `formatListingDate` formats on the Asia/Bangkok calendar.
  - Digit grouping used a regex over `toString()`, which inserted commas into
    decimals (`1234.5678` -> `1,234.5,678`) and printed `1e+21`. New
    `groupDigits` uses `Intl.NumberFormat`; NaN/Infinity render as an em dash.
  - Article read time split on whitespace, so Thai (no spaces between words)
    was counted as a handful of words; now counted with `Intl.Segmenter`.
  - Article excerpt cut by UTF-16 code units (could split emoji / Thai marks),
    always appended `...`, and left lone CR / U+2028 in place; now grapheme
    safe, ellipsis only when truncated, all line breaks flattened.
  - `tests/articles.test.ts` plus display-helper tests in
    `tests/properties.test.ts`; `tsconfig` adds `es2022.intl` types.
