/**
 * Static placeholder. The real GET handler lives in:
 *   functions/api/download/[token].ts  (Cloudflare Pages Function)
 *
 * getStaticPaths returns [] so Astro generates no static files for this route.
 * All /api/download/* requests are handled by the Pages Function.
 */
export function getStaticPaths() {
  return [];
}

export function GET() {
  return new Response('Not found', { status: 404 });
}
