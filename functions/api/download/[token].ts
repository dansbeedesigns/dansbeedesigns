interface Env {
  DB: D1Database;
  GUIDES_BUCKET: R2Bucket;
}

interface TokenRow {
  guide_key: string;
  expires_at: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { DB, GUIDES_BUCKET } = context.env;
  const token = context.params.token as string;

  if (!token) {
    return new Response('Missing download token.', { status: 400 });
  }

  const row = await DB.prepare(
    'SELECT guide_key, expires_at FROM download_tokens WHERE token = ?'
  )
    .bind(token)
    .first<TokenRow>();

  if (!row) {
    return new Response('Download link not found. Please re-enter your email to get a new one.', {
      status: 404,
    });
  }

  if (new Date(row.expires_at) < new Date()) {
    return new Response(
      'This download link has expired. Please re-enter your email to get a new one.',
      { status: 410 }
    );
  }

  const object = await GUIDES_BUCKET.get(row.guide_key);
  if (!object) {
    return new Response('File not found. Please contact support.', { status: 404 });
  }

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
