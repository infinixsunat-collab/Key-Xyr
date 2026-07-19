// Force Edge Runtime for full header control
export const config = { runtime: 'edge' };

const VALID_KEYS = [
  'Xyron-Trial-Key',
  'XYRON-VIP-001',
  'XYRON-VIP-002',
  'Mr-X-KEY-001',
];

const CONFIG = {
  STRICT_KEY_VALIDATION: false,
};

function getHeaders() {
  const h = new Headers();
  h.set('Content-Type', 'application/json');
  h.set('X-Powered-By', 'PHP/8.3.30');
  h.set('Cache-Control', 'no-cache, private');
  h.set('Access-Control-Allow-Origin', '*');
  h.set('Platform', 'hostinger');
  h.set('Panel', 'hpanel');
  h.set('Content-Security-Policy', 'upgrade-insecure-requests');
  h.set('Server', 'cloudflare');
  h.set('X-Turbo-Charged-By', 'LiteSpeed');
  return h;
}

export default async function handler(req) {
  // Handle OPTIONS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, User-Agent',
      }
    });
  }

  try {
    // Get body
    let body = '';
    if (req.method === 'POST') {
      body = await req.text();
    }

    // Parse parameters
    const params = {};
    if (body) {
      body.split('&').forEach(p => {
        const [key, ...valueParts] = p.split('=');
        if (key) params[key.trim()] = decodeURIComponent(valueParts.join('=') || '');
      });
    }

    const userKey = params.user_key || '';

    // Validasi key
    const keyValid = userKey && userKey.trim() !== '' && 
      (CONFIG.STRICT_KEY_VALIDATION ? VALID_KEYS.includes(userKey) : true);

    if (!keyValid) {
      return new Response(JSON.stringify({
        status: false,
        reason: "LICENSE NOT FOUND"
      }), {
        status: 404,
        headers: getHeaders()
      });
    }

    // Generate dynamic token & rng per request
    const rng = Math.floor(Date.now() / 1000);
    const token = Array.from({ length: 32 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');

    const successResponse = JSON.stringify({
      status: true,
      data: {
        Datte: "14-Jul-2026 13:31",
        token: token,
        rng: rng,
        tittle: "By Mr X",
        versi: "1.2",
        instance: "Instance",
        expired: "2 Hari 11 Jam"
      }
    });

    return new Response(successResponse, {
      status: 200,
      headers: getHeaders()
    });

  } catch (error) {
    return new Response(JSON.stringify({
      status: false,
      reason: "SERVER ERROR"
    }), {
      status: 500,
      headers: getHeaders()
    });
  }
}
