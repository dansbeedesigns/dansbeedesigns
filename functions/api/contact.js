export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'noreply@dansbeedesigns.com',
        to: 'cale@dansbeedesigns.com',
        reply_to: email,
        subject: `New message from ${name} — Dansbee Designs`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#0a2020">
            <h2 style="border-bottom:2px solid #e8913a;padding-bottom:8px">New Contact — Dansbee Designs</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message:</strong></p>
            <blockquote style="border-left:3px solid #2d6a6a;margin:0;padding:12px 16px;background:#f0f6f6">
              ${message.replace(/\n/g, '<br>')}
            </blockquote>
          </div>`
      })
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Failed to send message. Please try again.' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
