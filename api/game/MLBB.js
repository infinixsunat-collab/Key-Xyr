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

const SUCCESS_RESPONSE = JSON.stringify({
  status: true,
  data: {
    Datte: "14-Jul-2026 13:31",
    token: "21ff301c0e142b9c0ba6270300401150",
    rng: 1783795624,
    tittle: "By Mr X",
    versi: "1.2",
    instance: "Instance",
    expired: "2 Hari 11 Jam"
  }
});

const ERROR_RESPONSE = JSON.stringify({
  status: false,
  reason: "LICENSE NOT FOUND"
});

// Headers untuk semua response
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
      return new Response(ERROR_RESPONSE, {
        status: 404,
        headers: getHeaders()
      });
    }

    return new Response(SUCCESS_RESPONSE, {
      status: 200,
      headers: getHeaders()
    });

  } catch (error) {
    return new Response(ERROR_RESPONSE, {
      status: 500,
      headers: getHeaders()
    });
  }
}
