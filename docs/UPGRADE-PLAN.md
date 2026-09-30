# Upgrade plan

## Current state: 7/10 (was 5/10)

Search/filter now works for every offered location, filtering/sorting is
unit-tested, the contact form is honest, and CI runs lint/types/tests/build.

## Backlog

### P0
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
