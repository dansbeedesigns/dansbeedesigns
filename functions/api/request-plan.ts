import { plans } from '../../src/data/plans';

interface Env {
  DB: D1Database;
  GUIDES_BUCKET: R2Bucket;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { DB } = context.env;

  let body: { email?: string; planKey?: string };
  try {
    body = await context.request.json();
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  const { email, planKey } = body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return json({ error: 'A valid email address is required.' }, 400);
  }

  const plan = plans.find((p) => p.key === planKey);
  if (!plan) {
    return json({ error: 'Plan not found.' }, 404);
  }

  const cleanEmail = email.trim().toLowerCase();

  await DB.prepare('INSERT INTO email_leads (email, guide_key) VALUES (?, ?)')
    .bind(cleanEmail, planKey)
    .run();

  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

  await DB.prepare(
    'INSERT INTO download_tokens (token, guide_key, email, expires_at) VALUES (?, ?, ?, ?)'
  )
    .bind(token, planKey, cleanEmail, expiresAt)
    .run();

  return json({ token }, 200);
};

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
