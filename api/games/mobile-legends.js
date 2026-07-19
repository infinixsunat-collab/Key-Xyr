/**
 * Vercel Serverless Function
 * Endpoint: /api/games/mobile-legends
 *
 * Menerima POST request dari mod dengan body URL-encoded:
 *   game=&appVer=&user_key=&serial=
 *
 * SELALU mengembalikan response sukses dengan token statis,
 * terlepas dari parameter yang dikirim.
 */

module.exports = async (req, res) => {
  // === Only accept POST ===
  if (req.method !== "POST") {
    return res.status(405).json({ status: false, message: "Method not allowed" });
  }

  // === Static success response ===
  const response = {
    status: true,
    data: {
      token: "STATIC_TOKEN",
      rng: 1783795624,
      expired: "Unlimited",
      title: "VIP BYPASS",
      version: "1.0",
      registrator: "Ghost",
      btData: "BattleData",
    },
  };

  // Set JSON content type
  res.setHeader("Content-Type", "application/json");

  // Return response
  return res.status(200).json(response);
};
