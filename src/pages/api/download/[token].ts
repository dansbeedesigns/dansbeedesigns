import type { APIRoute } from 'astro';

// Server-rendered — not pre-built as a static file
export const prerender = false;

interface TokenRow {
  guide_key: string;
  expires_at: string;
}

export const GET: APIRoute = async ({ params, locals }) => {
  const { DB, GUIDES_BUCKET } = locals.runtime.env;
  const { token } = params;

  if (!token) {
    return text('Missing download token.', 400);
  }

  // Look up the token
  const row = await DB.prepare(
    'SELECT guide_key, expires_at FROM download_tokens WHERE token = ?'
  )
    .bind(token)
    .first<TokenRow>();

  if (!row) {
    return text('Download link not found. Please re-enter your email to get a new one.', 404);
  }

  if (new Date(row.expires_at) < new Date()) {
    return text('This download link has expired. Please re-enter your email to get a new one.', 410);
  }

  // Fetch the PDF from R2
  const object = await GUIDES_BUCKET.get(row.guide_key);
  if (!object) {
    return text('File not found. Please contact support.', 404);
  }

  // Use just the filename portion as the download name
  const filename = row.guide_key.split('/').pop() ?? row.guide_key;

  return new Response(object.body, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store, no-cache',
    },
  });
};

function text(message: string, status: number) {
  return new Response(message, {
    status,
    headers: { 'Content-Type': 'text/plain' },
  });
}
