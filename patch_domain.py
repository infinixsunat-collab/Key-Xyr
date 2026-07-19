#!/usr/bin/env python3
"""
╔═══════════════════════════════════════════════════════════════╗
║         XYRON DOMAIN REDIRECT PATCH - Vercel Edition          ║
╚═══════════════════════════════════════════════════════════════╝

Redirect domain 'topgamemurah.xyz' ke server Vercel kamu.

Cara pakai:
  python3 patch_domain.py <NAMA_DOMAIN_KAMU>

Contoh:
  python3 patch_domain.py xyron-api.vercel.app
  python3 patch_domain.py xyr.vercel.app

CATATAN PENTING:
  - Domain Maksimum: 16 karakter
  - Contoh yang muat: xyr.vercel.app (14 chars)
  - Contoh TIDAK muat: xyron-bypass.vercel.app (24 chars)

"""

import sys
import os
import shutil

# ============================================================
#  KONFIGURASI
# ============================================================
KEY = 0x7E
DOMAIN_OFFSET = 0x4BFF10
DOMAIN_LENGTH = 16
ORIGINAL_DOMAIN = b"topgamemurah.xyz"

# Path binary (otomatis detect)
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_BINARY = os.path.join(SCRIPT_DIR, "..", "XYRON EXTERNAL V1.0", "arm64-v8a", "librudp.bytes")

# ============================================================
#  FUNGSI
# ============================================================

def xor_encrypt(data: bytes) -> bytes:
    return bytes(b ^ KEY for b in data)

def xor_decrypt(data: bytes) -> bytes:
    return bytes(b ^ KEY for b in data)

def find_binary():
    """Cari file binary di beberapa lokasi"""
    locations = [
        DEFAULT_BINARY,
        "/storage/emulated/0/Xyron/XYRON EXTERNAL V1.0/arm64-v8a/librudp.bytes",
        os.path.join(SCRIPT_DIR, "librudp.bytes"),
    ]
    
    for loc in locations:
        if os.path.exists(loc):
            return loc
    
    return None

def banner():
    print()
    print("╔═══════════════════════════════════════════════════════════════╗")
    print("║         XYRON DOMAIN REDIRECT PATCH - Vercel Edition          ║")
    print("╚═══════════════════════════════════════════════════════════════╝")
    print()

def patch_domain(new_domain_str):
    """Patch domain di binary"""
    
    banner()
    
    # Cari binary
    binary_path = find_binary()
    
    if not binary_path:
        print("❌ ERROR: File librudp.bytes tidak ditemukan!")
        print()
        print("Pastikan file ada di salah satu lokasi:")
        print("  - /storage/emulated/0/Xyron/XYRON EXTERNAL V1.0/arm64-v8a/")
        print("  - Folder yang sama dengan script ini")
        sys.exit(1)
    
    print(f"📁 Binary: {binary_path}")
    
    # Validasi domain
    if len(new_domain_str) > DOMAIN_LENGTH:
        print(f"\n❌ ERROR: Domain terlalu panjang!")
        print(f"   Domain kamu : '{new_domain_str}' ({len(new_domain_str)} karakter)")
        print(f"   Maksimum    : {DOMAIN_LENGTH} karakter")
        print()
        print("💡 Contoh domain yang muat:")
        print("   xyr.vercel.app         (14 chars) ✓")
        print("   xyron.vercel.app       (16 chars) ✓")
        print("   x1.vercel.app          (13 chars) ✓")
        print()
        print("❌ Contoh yang TIDAK muat:")
        print("   xyron-bypass.vercel.app (24 chars) ✗")
        print("   mlbb-mod.vercel.app     (20 chars) ✗")
        sys.exit(1)
    
    if len(new_domain_str) == 0:
        print("\n❌ ERROR: Domain tidak boleh kosong!")
        sys.exit(1)
    
    # Baca binary
    print(f"\n📖 Membaca binary...")
    with open(binary_path, "rb") as f:
        data = bytearray(f.read())
    
    print(f"   Size: {len(data):,} bytes")
    
    # Decode domain lama
    old_encoded = data[DOMAIN_OFFSET:DOMAIN_OFFSET + DOMAIN_LENGTH]
    old_decoded = xor_decrypt(old_encoded)
    
    print(f"\n📋 DOMAIN LAMA (akan diganti):")
    print(f"   Offset  : 0x{DOMAIN_OFFSET:X}")
    print(f"   Hex     : {old_encoded.hex()}")
    print(f"   Decoded : {old_decoded.decode('ascii', errors='replace')}")
    
    # Encode domain baru
    new_domain_bytes = new_domain_str.encode('ascii')
    
    # Pad dengan null bytes
    if len(new_domain_bytes) < DOMAIN_LENGTH:
        new_domain_bytes = new_domain_bytes + b'\x00' * (DOMAIN_LENGTH - len(new_domain_bytes))
    
    new_encoded = xor_encrypt(new_domain_bytes)
    
    print(f"\n📋 DOMAIN BARU (akan ditulis):")
    print(f"   Target  : {new_domain_str}")
    print(f"   Padded  : {new_domain_bytes[:DOMAIN_LENGTH]}")
    print(f"   Hex     : {new_encoded.hex()}")
    
    # Tulis ke binary
    print(f"\n✏️  Menulis patch...")
    data[DOMAIN_OFFSET:DOMAIN_OFFSET + DOMAIN_LENGTH] = new_encoded
    
    # Verifikasi
    verify = bytes(data[DOMAIN_OFFSET:DOMAIN_OFFSET + DOMAIN_LENGTH])
    verify_decoded = xor_decrypt(verify)
    
    print(f"✅ VERIFIKASI:")
    print(f"   Written : {verify_decoded.decode('ascii', errors='replace')}")
    
    match = verify_decoded[:len(new_domain_str)] == new_domain_bytes[:len(new_domain_str)]
    print(f"   Match   : {'✓ BERHASIL!' if match else '✗ GAGAL!'}")
    
    if not match:
        print("\n❌ Patch gagal! Silakan coba lagi.")
        sys.exit(1)
    
    # Simpan ke file baru
    output_path = os.path.join(SCRIPT_DIR, "librudp.bytes")
    
    print(f"\n💾 Menyimpan: {output_path}")
    with open(output_path, "wb") as f:
        f.write(data)
    
    print(f"   Size: {len(data):,} bytes")
    
    # Instruksi
    print()
    print("╔═══════════════════════════════════════════════════════════════╗")
    print("║                    ✅ PATCH BERHASIL!                         ║")
    print("╚═══════════════════════════════════════════════════════════════╝")
    print()
    print("📋 LANGKAH SELANJUTNYA:")
    print("─" * 60)
    print()
    print("1. Backup file asli:")
    print(f'   cp "{binary_path}" "{binary_path}.bak"')
    print()
    print("2. Copy hasil patch:")
    print(f'   cp "{output_path}" "{binary_path}"')
    print()
    print("3. Buka game MLBB dan test!")
    print()
    print("─" * 60)
    print()
    print(f"🌐 Domain tujuan: https://{new_domain_str}")
    print()
    print("─" * 60)

def show_help():
    """Tampilkan bantuan"""
    banner()
    print("CARA PAKAI:")
    print("─" * 60)
    print()
    print("  python3 patch_domain.py <DOMAIN_KAMU>")
    print()
    print("CONTOH:")
    print("─" * 60)
    print()
    print("  python3 patch_domain.py xyr.vercel.app")
    print("  python3 patch_domain.py xyron-api.vercel.app")
    print("  python3 patch_domain.py mlbb-mod.vercel.app")
    print()
    print("─" * 60)
    print()
    print("CATATAN:")
    print("─" * 60)
    print()
    print("  - Domain maksimal 16 karakter")
    print("  - Tanpa 'https://' (hanya domain)")
    print("  - Deploy API ke Vercel dulu sebelum patch!")
    print()
    print("─" * 60)

# ============================================================
#  MAIN
# ============================================================

if __name__ == "__main__":
    if len(sys.argv) < 2:
        show_help()
        sys.exit(0)
    
    domain = sys.argv[1].strip()
    
    # Hapus https:// jika ada
    if domain.startswith('https://'):
        domain = domain[8:]
    elif domain.startswith('http://'):
        domain = domain[7:]
    
    # Hapus trailing slash
    domain = domain.rstrip('/')
    
    patch_domain(domain)
