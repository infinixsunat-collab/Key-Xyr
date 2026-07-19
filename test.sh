#!/bin/bash

# ============================================================
#  XYRON BYPASS API - Test Script
# ============================================================
#  Cara pakai:
#    ./test.sh https://nama-kamu.vercel.app
#    ./test.sh http://localhost:3000
# ============================================================

BASE_URL="${1:-http://localhost:3000}"

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║           XYRON BYPASS API - Testing                         ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "🌐 URL: $BASE_URL"
echo ""

# ============================================
# TEST 1: BRAND (Mod Menu Load)
# ============================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 TEST 1: /api/game/BRAND (Mod Menu Load)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Request:"
echo "  POST $BASE_URL/api/game/BRAND"
echo ""
echo "Response:"
curl -s -X POST "$BASE_URL/api/game/BRAND" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "game=BRAND&version=1.2&user_key=13d41edfe2e63dc09a2f29a73d32e9f55b6Xyron&serial=90bf2dbd-c50c-3ea3-938c-0f490324b26b&resource=3hvij79kjtp1jwerurfcfxr7fjui94ki" \
  | python3 -m json.tool 2>/dev/null || echo "(parse error)"
echo ""
echo ""

# ============================================
# TEST 2: MLBB with VALID KEY
# ============================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 TEST 2: /api/game/MLBB (Valid Key)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Request:"
echo "  POST $BASE_URL/api/game/MLBB"
echo "  user_key=Xyron-Trial-Key"
echo ""
echo "Response:"
curl -s -X POST "$BASE_URL/api/game/MLBB" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "game=MLBB&version=1.2&user_key=Xyron-Trial-Key&serial=151f1553-41bc-38e3-af2e-f65c75e498a1&resource=mubg9eeen2hra5ydmpdcwlq6ywu4dwl6" \
  | python3 -m json.tool 2>/dev/null || echo "(parse error)"
echo ""
echo ""

# ============================================
# TEST 3: MLBB with EMPTY KEY (should fail)
# ============================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 TEST 3: /api/game/MLBB (Empty Key - Should Return 404)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Request:"
echo "  POST $BASE_URL/api/game/MLBB"
echo "  user_key= (empty)"
echo ""
echo "Response (expected: 404 + LICENSE NOT FOUND):"
curl -s -X POST "$BASE_URL/api/game/MLBB" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "game=MLBB&version=1.2&user_key=&serial=3714b4b4-8812-352d-aa06-96bcfb298f5a&resource=jmrz9ijqwiub8heb5ogwg9odxbcdt2p3" \
  | python3 -m json.tool 2>/dev/null || echo "(parse error)"
echo ""
echo ""

# ============================================
# TEST 4: MLBB with INVALID KEY (should fail)
# ============================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 TEST 4: /api/game/MLBB (Invalid Key - Should Return 404)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Request:"
echo "  POST $BASE_URL/api/game/MLBB"
echo "  user_key=WRONG-KEY"
echo ""
echo "Response (expected: 404 + LICENSE NOT FOUND):"
curl -s -X POST "$BASE_URL/api/game/MLBB" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "game=MLBB&version=1.2&user_key=WRONG-KEY&serial=3714b4b4-8812-352d-aa06-96bcfb298f5a&resource=jmrz9ijqwiub8heb5ogwg9odxbcdt2p3" \
  | python3 -m json.tool 2>/dev/null || echo "(parse error)"
echo ""
echo ""

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                      ✅ TEST SELESAI                          ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
