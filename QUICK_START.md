# ⚡ QUICK START - 5 Menit Langsung Jadi!

## 📱 Persiapan

- [ ] Akun GitHub (gratis)
- [ ] Akun Vercel (gratis)
- [ ] Terminal/Termux

---

## 🚀 LANGKAH 1: Upload ke GitHub (2 menit)

### 1.1 Buat Repository
```
Buka: https://github.com/new
Name: xyron-bypass-api
Create
```

### 1.2 Upload File
```
Klik "uploading an existing file"
Drag & drop semua file dari folder "xyron-vercel-deploy"
Klik "Commit changes"
```

---

## 🌐 LANGKAH 2: Deploy ke Vercel (1 menit)

### 2.1 Import
```
Buka: https://vercel.com/dashboard
Klik "Add New..." → "Project"
Pilih repository "xyron-bypass-api"
Klik "Import"
```

### 2.2 Deploy
```
Klik "Deploy"
Tunggu 1 menit...
Selesai! Kamu dapat URL
```

---

## 🧪 LANGKAH 3: Test (30 detik)

Buka browser, ketik:
```
https://NAMA-KAMU.vercel.app/?game=BRAND
```

Lihat response JSON = **BERHASIL!** ✅

---

## 🔧 LANGKAH 4: Patch Binary (1 menit)

```bash
cd /storage/emulated/0/Xyron/xyron-vercel-deploy

python3 patch_domain.py NAMA-KAMU.vercel.app
```

Copy hasil patch:
```bash
cp librudp.bytes "/storage/emulated/0/Xyron/XYRON EXTERNAL V1.0/arm64-v8a/"
```

---

## ✅ LANGKAH 5: Test Game

```
Buka MLBB → Mod menu muncul → Login → FITUR TERBUKA!
```

---

## 📝 Ganti Key

Edit `api/game/[...slug].js`:

```javascript
const VALID_KEYS = [
  'KEY-KAMU-001',
  'KEY-KAMU-002',
];
```

Lalu deploy ulang:
```bash
git add .
git commit -m "update keys"
git push
```

Vercel auto-deploy! 🎉

---

## ⚠️ Penting!

- Domain max **16 karakter**
- Contoh muat: `xyr.vercel.app`
- Contoh tidak muat: `xyron-bypass-api.vercel.app`

---

**SELESAI! 🎉**
