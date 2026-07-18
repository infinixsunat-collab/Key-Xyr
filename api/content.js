/**
 * ============================================================
 *  XYRON BYPASS API - Content Endpoint
 * ============================================================
 *  
 *  Endpoint: /api/content
 *  Fungsi: Backward compatibility / Verifikasi
 *  
 *  ⚠️ Endpoint ini DIPANGGIL oleh mod menu!
 *  
 * ============================================================
 */

// Response statis
const RESPONSE_BODY = JSON.stringify({
  success: true,
  type: "vip",
  message: "Verified successfully"
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
  console.log(`[${new Date().toISOString()}] /api/content request`);

  // Hapus Vercel headers
  res.removeHeader('x-vercel-id');
  res.removeHeader('x-vercel-cache');
  res.removeHeader('x-vercel-ttl');

  // Set headers seperti original server
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
