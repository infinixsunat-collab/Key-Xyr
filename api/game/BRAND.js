/**
 * ============================================================
 *  XYRON BYPASS API - BRAND Endpoint
 * ============================================================
 *  
 *  Endpoint: /api/game/BRAND
 *  Fungsi: Mod Menu Load (munculkan UI)
 *  
 *  ⚠️ BRAND menerima SEMUA request tanpa validasi key!
 *  
 * ============================================================
 */

// Response JSON murni tanpa prefix
const RESPONSE_BODY = JSON.stringify({
  status: true,
  data: {
    Datte: "26-Mei-4764 19:05",
    token: "d2516b5312627306f403d691ddb17898",
    rng: 1784219806,
    tittle: "BEST MOD EVER",
    versi: "1.2",
    instance: "Instance",
    expired: "Unlimited"
  }
});

export default async function handler(req, res) {
  // Handle OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, User-Agent');
    return res.status(200).end();
  }

  // Log request
  console.log(`[${new Date().toISOString()}] BRAND request`);

  // Hapus semua Vercel headers
  res.removeHeader('x-vercel-id');
  res.removeHeader('x-vercel-cache');
  res.removeHeader('x-vercel-ttl');
  res.removeHeader('x-matched-path');
  res.removeHeader('x-rewrite');

  // Set headers SESUAI original server (cloudflare + LiteSpeed)
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Powered-By', 'PHP/8.3.30');
  res.setHeader('Cache-Control', 'no-cache, private');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Platform', 'hostinger');
  res.setHeader('Panel', 'hpanel');
  res.setHeader('Content-Security-Policy', 'upgrade-insecure-requests');
  res.setHeader('Server', 'cloudflare');
  res.setHeader('X-Turbo-Charged-By', 'LiteSpeed');

  // Send response as RAW STRING
  return res.status(200).end(RESPONSE_BODY);
}
