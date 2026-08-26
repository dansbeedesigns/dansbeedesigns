export async function onRequestGet() {
  return new Response(JSON.stringify({ working: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
