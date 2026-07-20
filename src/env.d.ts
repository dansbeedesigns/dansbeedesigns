/// <reference path="../.astro/types.d.ts" />

// Cloudflare binding types used by Pages Functions in /functions
// (not needed by Astro itself since the site is fully static)
interface Env {
  DB: D1Database;
  GUIDES_BUCKET: R2Bucket;
}
