/// <reference path="../.astro/types.d.ts" />

// Cloudflare bindings available in Astro.locals.runtime.env
interface Env {
  DB: D1Database;
  GUIDES_BUCKET: R2Bucket;
}

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}
