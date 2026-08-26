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

    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Server misconfiguration: missing API key.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let resendResponse;
    try {
      resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'noreply@dansbeedesigns.com',
          to: ['cale@dansbeedesigns.com'],
          reply_to: [email],
          subject: 'New message from ' + name + ' — Dansbee Designs',
          html: '<div style="font-family:sans-serif;max-width:560px;color:#0a2020"><h2 style="border-bottom:2px solid #e8913a;padding-bottom:8px">New Contact — Dansbee Designs</h2><p><strong>Name:</strong> ' + name + '</p><p><strong>Email:</strong> ' + email + '</p><p><strong>Message:</strong></p><blockquote style="border-left:3px solid #2d6a6a;margin:0;padding:12px 16px;background:#f0f6f6">' + message.replace(/\n/g, '<br>') + '</blockquote></div>'
        })
      });
    } catch (fetchErr) {
      return new Response(JSON.stringify({ error: 'Could not reach email service: ' + fetchErr.message }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const resendText = await resendResponse.text();

    if (!resendResponse.ok) {
      return new Response(JSON.stringify({ error: 'Email service error (' + resendResponse.status + '): ' + resendText }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error: ' + e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
