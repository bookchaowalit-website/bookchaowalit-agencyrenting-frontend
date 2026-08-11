# Agency Renting

A bilingual (English/Thai) real-estate agency site: property listings with
real client-side search and filtering (location, type, price range,
bedrooms), an articles section, agent profiles, and a contact form.
Properties come from a static in-memory sample dataset
(`lib/sampleData.ts`); articles are real filesystem content — `.mdx` files
under `content/articles/` parsed with `gray-matter` (frontmatter + raw
markdown, not compiled/rendered MDX — see below). Both are served through
small API routes rather than a real backend/CMS.

Mobile companion: [bookchaowalit-agencyrenting-mobile](https://github.com/bookchaowalit-mobile/bookchaowalit-agencyrenting-mobile)
Portfolio: [bookchaowalit.com](https://bookchaowalit.com)

## Routes

| Route | What it is |
|---|---|
| `/` | Redirects to `/en` |
| `/[locale]` | Homepage (`en` or `th`; anything else 404s) |
| `/[locale]/listings` | Property grid with live search/filter/sort, loaded from `/api/properties` |
| `/[locale]/about`, `/[locale]/articles`, `/[locale]/contact` | Static content + agent profiles + contact form |
| `/api/properties`, `/api/articles` | Serve the sample dataset as JSON |
| `/more-projects` | Cross-links to sibling projects |

## What this pass found

- **ESLint had never been configured at all.** `npm run lint` (`next
  lint`) dropped into its first-run interactive setup wizard instead of
  running — meaning lint had presumably never actually been run against
  this codebase. Added a `.eslintrc.json` (`next/core-web-vitals`), which
  surfaced 2 real errors (unescaped quote characters in a JSX search-filter
  badge) and 5 `<img>`-vs-`next/image` performance warnings, left as-is
  since fixing them would mean touching third-party remote image URLs.
- `app/layout.tsx` had `viewport` nested inside the `metadata` export —
  deprecated by Next.js's App Router metadata API — and no `metadataBase`,
  which made every relative Open Graph/Twitter image resolve against
  `localhost` in production. Both were build-time warnings on every single
  build; fixed by splitting out a proper `viewport` export and setting
  `metadataBase`. Also removed a stale `// SEO TODO: Add Open Graph tags`
  comment sitting directly below Open Graph tags that were already fully
  implemented above it.
- The same dead `categories` object in `more-projects/page.tsx` found in
  several sibling repos this pass — defined, never referenced.
- `@next/mdx` was pinned to `^16.0.1` while `next` itself was `14.0.0` — a
  version mismatch that happened to not break anything only because no
  `.mdx` page route exists under `app/` to invoke it (article content is
  read via `gray-matter`/`fs` directly, entirely independent of
  `@next/mdx`). Attempting to align it to `^14.2.35` instead surfaced the
  real state of things: even version-matched, it needs a peer
  (`@mdx-js/loader`) that was never installed and isn't a transitive
  dependency of anything else in the project — so the wrapper had never
  actually been exercised. Since nothing uses it, removed `@next/mdx` and
  the unused `next-mdx-remote` dependency entirely rather than chase a
  peer install for machinery with no caller.
- `next` bumped `14.0.0` → `^14.2.35` (in step with `eslint-config-next`),
  clearing a critical-severity Next.js vulnerability list and most others
  (13 → 5 `npm audit` findings) without any breaking change. The remaining
  5 all require Next 14→16, not attempted here.

Verified live end-to-end after every fix: the `/` → `/en` redirect, all
five locale routes, an invalid locale (`/xx`) correctly 404ing, and both
API routes returning real sample data (8 properties, 1 article) — on the
actual Next.js 14.2.35 production build, not just the dev server.

## Known limitation

The contact form's submit handler is a UI simulation — it `await`s a fixed
2-second timeout and shows a success state, but doesn't call an API route
or send anything anywhere. Worth being upfront about if this comes up: the
search/filter and listings are real client-side logic against real (if
static) data; the contact flow is not wired to a backend.

## Stack

Next.js 14 (App Router, path-based `[locale]` i18n, no i18n library) ·
React 18 · TypeScript · Tailwind CSS · Radix UI primitives · `gray-matter`
for article frontmatter.

## Local development

```bash
npm install
npm run dev
npm run lint
npm run build
```
