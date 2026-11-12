/*
Cloudflare Worker — server-side code validation and minimal event logging.

Required Worker environment variables:
  ACCESS_CODE  = a separate 10-digit access credential (NOT a real national ID)
  GAME_URL     = the Narcissu public URL

Required binding:
  EVENTS       = Cloudflare KV namespace (for timestamp-only event records)

Deploy this Worker, then set WORKER_URL in script.js.
*/
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Restrict to your exact Pages origin before production.
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json; charset=utf-8"
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
    const url = new URL(request.url);
    if (request.method !== "POST" || url.pathname !== "/access") return json({ ok: false }, 404);

    let body;
    try { body = await request.json(); } catch { return json({ ok: false }, 400); }

    const now = new Date().toISOString();

    if (body.type === "visit") {
      if (env.EVENTS) {
        const id = `visit:${Date.now()}:${crypto.randomUUID()}`;
        await env.EVENTS.put(id, JSON.stringify({ type: "visit", at: now }), { expirationTtl: 60 * 60 * 24 * 90 });
      }
      return json({ ok: true });
    }

    if (body.type === "unlock") {
      const submitted = String(body.code || "");
      const expected = String(env.ACCESS_CODE || "");
      if (!/^\d{10}$/.test(submitted) || !/^\d{10}$/.test(expected) || submitted !== expected) {
        return json({ ok: false }, 401);
      }
      if (env.EVENTS) {
        const id = `unlock:${Date.now()}:${crypto.randomUUID()}`;
        await env.EVENTS.put(id, JSON.stringify({ type: "unlock", at: now }), { expirationTtl: 60 * 60 * 24 * 90 });
      }
      const gameUrl = String(env.GAME_URL || "");
      if (!gameUrl.startsWith("https://")) return json({ ok: false }, 500);
      return json({ ok: true, url: gameUrl });
    }

    return json({ ok: false }, 400);
  }
};
