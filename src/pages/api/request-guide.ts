import type { APIRoute } from 'astro';
import { guides } from '../../data/guides';

// Server-rendered — not pre-built as a static file
export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const { DB } = locals.runtime.env;

  // Parse request body
  let body: { email?: string; guideKey?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  const { email, guideKey } = body;

  // Validate email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return json({ error: 'A valid email address is required.' }, 400);
  }

  // Validate guide key
  const guide = guides.find((g) => g.key === guideKey);
  if (!guide) {
    return json({ error: 'Guide not found.' }, 404);
  }

  const cleanEmail = email.trim().toLowerCase();

  // Persist the lead (allow duplicate emails — each download is a separate lead)
  await DB.prepare(
    'INSERT INTO email_leads (email, guide_key) VALUES (?, ?)'
  )
    .bind(cleanEmail, guideKey)
    .run();

  // Create a download token that expires in 1 hour
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

  await DB.prepare(
    'INSERT INTO download_tokens (token, guide_key, email, expires_at) VALUES (?, ?, ?, ?)'
  )
    .bind(token, guideKey, cleanEmail, expiresAt)
    .run();

  return json({ token }, 200);
};

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
