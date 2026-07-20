/**
 * Static placeholder. The real POST handler lives in:
 *   functions/api/request-guide.ts  (Cloudflare Pages Function)
 *
 * Astro needs a GET export to build this as a static file.
 * Cloudflare Pages Functions intercept POST before the static file is served.
 */
export function GET() {
  return new Response(JSON.stringify({ error: 'Method not allowed. Use POST.' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
}
