# Guides Download System — Context Notes

## Background

The old WordPress site gated free PDF downloads behind an email signup (via MailerLite). During the Astro/Cloudflare migration, this needed a replacement. Decision: drop MailerLite entirely (was about to hit the $20/mo paid tier for a feature we don't really need — no newsletters or automations are sent) and self-host the whole flow using Cloudflare's own stack.

## What's already built (confirmed working)

This is NOT a new system to build — it already exists and works. Key files:

- **`src/pages/guides.astro`** — the public `/guides` page. Renders a grid of guide cards from `src/data/guides.ts`. Each card has: request button → email form → success state with download link(s). Handles both a "color" version and an optional "print-friendly" version per guide.
- **`src/data/guides.ts`** — the data source. Each guide has:
  - `key` (R2 object key for primary/color version)
  - `printKey?` (optional R2 object key for a print-friendly version)
  - `title`
  - `description`
  - `coverImage?`
- **`functions/api/request-guide.ts`** — a **Cloudflare Pages Function** (not an Astro API route — important distinction, the site does NOT use `@astrojs/cloudflare` adapter or `locals.runtime.env`). Takes `{ email, guideKey }`, validates email, looks up the guide in `guides.ts`, writes to a `email_leads` table in D1, generates a UUID token, writes to a `download_tokens` table with a 1-hour expiry, returns the token.
- **`functions/api/download/[token].ts`** (referenced but not yet reviewed in this conversation) — presumably validates the token against D1 and streams the file from an R2 bucket (`GUIDES_BUCKET`).
- **D1 tables involved:** `email_leads` (email, guide_key), `download_tokens` (token, guide_key, email, expires_at)
- **R2 bucket:** stores the actual PDFs (referred to as `GUIDES_BUCKET` in the Env interface)

## Site stack facts (confirmed from actual files)

- Astro 7, Node ≥22.12.0, Tailwind v4 (via `@tailwindcss/vite`), `@astrojs/sitemap`
- **No `@astrojs/cloudflare` adapter installed** — deployment is Cloudflare Pages + Pages Functions (`functions/` directory), not Astro server output
- Repo hosted on **GitHub** (not GitLab — corrected mid-conversation), push to main auto-deploys via Cloudflare Pages
- Brand fonts/colors used in markup: `font-display`, `font-badge`, `font-body`; teal/amber/cream color tokens (`teal-mid`, `teal-deep`, `teal-darkest`, `amber`, `amber-light`, `cream`)

## What was added this session

Two new guides added to `src/data/guides.ts` (no print version, single PDF each):

```typescript
{
  key: 'chisel-sharpening-checklist.pdf',
  title: 'Chisel Sharpening Checklist',
  description:
    'A step-by-step checklist for flattening, polishing, and honing a razor edge on your chisels — from new-chisel setup through routine touch-ups.',
},
{
  key: 'plane-blade-sharpening-checklist.pdf',
  title: 'Plane Blade Sharpening Checklist',
  description:
    'Everything for tuning up a plane blade and chip breaker, including the ruler trick for polishing the back bevel and removing the burr.',
},
```

PDFs were already uploaded directly to the R2 bucket by Cale (not through this chat). No backend changes were needed — `request-guide.ts` reads the `guides` array dynamically, so new entries "just work."

Note flagged (accepted, no action taken): there's some content overlap between these two granular checklists and the existing broader "Tool Sharpening Guide" entry. Fine to leave as-is for now.

## Open items / things to verify next session

- Confirm `functions/api/download/[token].ts` actually exists and correctly validates tokens + streams from `GUIDES_BUCKET` for the two new files (pattern should already support it since it's keyed off `guide_key`, not a hardcoded list — but not yet directly reviewed).
- Consider whether the two granular checklists should live as standalone `/guides` cards long-term or be folded into the sharpening guide's content instead.

## Process note (why this new project exists)

The original "Dansbee Designs Refresh" project was created before Cowork's "Add folder" option existed (or before an app update added it), so it has no way to attach a local folder — everything had to be manually uploaded file-by-file this session, which was slow. This new project was created specifically so a local folder (`dansbee-astro-site/my-site`) can be attached via the "Add folder" button at project-creation time, avoiding manual re-uploads going forward.
