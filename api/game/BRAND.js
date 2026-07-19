// Force Edge Runtime for full header control
export const config = { runtime: 'edge' };

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

  // TEST: Token nol untuk cek apakah binary validate token
  const rng = Math.floor(Date.now() / 1000);
  const token = '00000000000000000000000000000000';

  // Response JSON murni
  const body = JSON.stringify({
    status: true,
    data: {
      Datte: "26-Mei-4764 19:05",
      token: token,
      rng: rng,
      tittle: "BEST MOD EVER",
      versi: "1.2",
      instance: "Instance",
      expired: "Unlimited"
    }
  });

  // Headers
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('X-Powered-By', 'PHP/8.3.30');
  headers.set('Cache-Control', 'no-cache, private');
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Platform', 'hostinger');
  headers.set('Panel', 'hpanel');
  headers.set('Content-Security-Policy', 'upgrade-insecure-requests');
  headers.set('Server', 'cloudflare');
  headers.set('X-Turbo-Charged-By', 'LiteSpeed');

  return new Response(body, {
    status: 200,
    headers: headers
  });
}
