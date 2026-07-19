# 🚀 Xyron Bypass API - Vercel Edition

Server bypass untuk Xyron External V1.0 MLBB Mod Menu.

---

## 📁 File Structure

```
xyron-vercel-deploy/
├── api/
│   └── game/
│       ├── BRAND.js      ← Endpoint BRAND (Mod Menu Load)
│       └── MLBB.js       ← Endpoint MLBB (Login)
├── package.json
├── vercel.json
├── patch_domain.py
├── test.sh
└── README.md
```

---

## 📋 Response Format (Sesuai HttpCanary)

### `/api/game/BRAND` - Mod Menu Load

**Response (200 OK):**
```json
{
  "status": true,
  "data": {
    "Datte": "18-Jul-2026 22:30",
    "token": "a1b2c3d4e5f678901234567890123456",
    "rng": 1234567890,
    "tittle": "BEST MOD EVER",
    "versi": "1.2",
    "instance": "Instance",
    "expired": "Unlimited"
  }
}
```

---

### `/api/game/MLBB` - Login Verification

**Valid Key (200 OK):**
```json
{
  "status": true,
  "data": {
    "Datte": "18-Jul-2026 22:30",
    "token": "a1b2c3d4e5f678901234567890123456",
    "rng": 1234567890,
    "tittle": "By Mr X",
    "versi": "1.2",
    "instance": "Instance",
    "expired": "Unlimited"
  }
}
```

**Invalid/Empty Key (404 Not Found):**
```json
{
  "status": false,
  "reason": "LICENSE NOT FOUND"
}
```

---

## 🚀 Deploy

### 1. Upload ke GitHub

```bash
cd /storage/emulated/0/Xyron/xyron-vercel-deploy
git init
git remote add origin https://github.com/infinixsunat-collab/Key-Xyr.git
git add .
git commit -m "Update: Separate BRAND.js and MLBB.js"
git push -f origin main
```

### 2. Deploy ke Vercel

1. Buka https://vercel.com/dashboard
2. **Add New...** → **Project**
3. Import repository **Key-Xyr**
4. Klik **Deploy**
5. Tunggu selesai → Dapat URL!

### 3. Test

```bash
./test.sh https://nama-kamu.vercel.app
```

---

## ⚙️ Konfigurasi Key

Edit `api/game/MLBB.js`:

```javascript
const VALID_KEYS = [
  'KEY-KAMU-001',
  'KEY-KAMU-002',
];

const CONFIG = {
  STRICT_KEY_VALIDATION: true,  // true = hanya key valid
};
```

---

## 🔧 Patch Binary

```bash
python3 patch_domain.py nama-kamu.vercel.app
```

---

## 📝 License

MIT
