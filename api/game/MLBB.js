/**
 * ============================================================
 *  XYRON BYPASS API - MLBB Endpoint
 * ============================================================
 *  
 *  Endpoint: /api/game/MLBB
 *  Fungsi: Login Verification (buka fitur mod)
 *  
 *  Response sesuai HttpCanary capture:
 *    - Valid: status:true + data
 *    - Invalid: status:false + reason:"LICENSE NOT FOUND"
 *  
 * ============================================================
 */

// ============================================================
//  ⚠️  VALID KEYS - GANTI DENGAN KEY KAMU SENDIRI!
// ============================================================
const VALID_KEYS = [
  'Xyron-Trial-Key',
  'XYRON-VIP-001',
  'XYRON-VIP-002',
  'Mr-X-KEY-001',
];

// ============================================================
//  KONFIGURASI
// ============================================================
const CONFIG = {
  STRICT_KEY_VALIDATION: false,
};

// Response JSON murni tanpa prefix
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

// Parse form-urlencoded body
function parseBody(body) {
  const params = {};
  if (body) {
    body.split('&').forEach(p => {
      const [key, ...valueParts] = p.split('=');
      if (key) {
        params[key.trim()] = decodeURIComponent(valueParts.join('=') || '');
      }
    });
  }
  return params;
}

// Set headers seperti original server
function setOriginalHeaders(res) {
  res.removeHeader('x-vercel-id');
  res.removeHeader('x-vercel-cache');
  res.removeHeader('x-vercel-ttl');
  
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Powered-By', 'PHP/8.3.30');
  res.setHeader('Cache-Control', 'no-cache, private');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Platform', 'hostinger');
  res.setHeader('Panel', 'hpanel');
  res.setHeader('Content-Security-Policy', 'upgrade-insecure-requests');
  res.setHeader('Server', 'cloudflare');
  res.setHeader('X-Turbo-Charged-By', 'LiteSpeed');
}

export default async function handler(req, res) {
  // Handle OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, User-Agent');
    return res.status(200).end();
  }

  try {
    // Get body
    let body = '';
    if (req.method === 'POST' && req.body) {
      body = typeof req.body === 'string' 
        ? req.body 
        : new URLSearchParams(req.body).toString();
    } else if (req.url && req.url.includes('?')) {
      body = req.url.split('?')[1];
    }

    // Parse parameters
    const params = parseBody(body);
    const userKey = params.user_key || '';
    const serial = params.serial || '';

    console.log(`[${new Date().toISOString()}] MLBB request - Key: ${userKey || '(empty)'}`);

    // Validasi key
    const keyValid = userKey && userKey.trim() !== '' && 
      (CONFIG.STRICT_KEY_VALIDATION ? VALID_KEYS.includes(userKey) : true);

    if (!keyValid) {
      console.log('  → ❌ Key kosong - ditolak');
      setOriginalHeaders(res);
      return res.status(404).end(ERROR_RESPONSE);
    }

    console.log(`  → ✅ Key diterima: ${userKey}`);

    // Set headers
    setOriginalHeaders(res);

    // Send response as RAW STRING
    return res.status(200).end(SUCCESS_RESPONSE);

  } catch (error) {
    console.error('Error:', error);
    setOriginalHeaders(res);
    return res.status(500).end(ERROR_RESPONSE);
  }
}
