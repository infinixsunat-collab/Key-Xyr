/**
 * Vercel Serverless Function
 * Endpoint: /api/games/mobile-legends
 *
 * MIRROR SERVER — Menerima POST request dari libPutri.so
 * Format body: game=%s&appVer=%s&user_key=%s&serial=%s
 *
 * SELALU mengembalikan response sukses dengan token valid,
 * terlepas dari parameter yang dikirim.
 *
 * Tujuan: Server cermin untuk riset defensif (Operasi Jaring Tiga Lapis)
 */

module.exports = async (req, res) => {
    // === Hanya terima POST ===
    if (req.method !== 'POST') {
        return res.status(405).json({
            status: false,
            message: "Method not allowed"
        });
    }

    // === Baca body request untuk logging ===
    let body = req.body || {};
    console.log('[MIRROR] Menerima request:', JSON.stringify(body));

    // === Response "Cermin" — Selalu sukses ===
    res.status(200).json({
        status: true,
        data: {
            token: "21ff301c0e142b9c0ba6270300401150",
            rng: 1783795624,
            tittle: "VIP BYPASS",
            versi: "1.2",
            instance: "Instance",
            expired: "Unlimited"
        }
    });
};
