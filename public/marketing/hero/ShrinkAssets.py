#!/usr/bin/env python3
"""
to_webp_alpha.py
----------------
Same as before, but preserves any alpha/transparency instead of dumping it to black.

Requires:
  pip install pillow

Usage:
  python3 to_webp_alpha.py
"""

from pathlib import Path
from PIL import Image, UnidentifiedImageError
import sys

# ─── CONFIG ─────────────────────────────────────────────────────────────────
OUTPUT_DIR    = "WebP"
WEBP_QUALITY  = 90      # 0–100
WEBP_METHOD   = 6       # 0–6 (higher = slower/more compressed)

# ─── HELPERS ─────────────────────────────────────────────────────────────────
def find_images(root: Path):
    exts = {".png", ".jpg", ".jpeg"}
    for p in root.rglob("*"):
        if p.is_file() and p.suffix.lower() in exts:
            yield p

def convert_to_webp(src: Path, dst: Path):
    dst.parent.mkdir(parents=True, exist_ok=True)
    try:
        img = Image.open(src)   # keep whatever mode it has (RGBA, RGB, etc.)
    except UnidentifiedImageError:
        print(f"🚫 {src.relative_to(ROOT)}: invalid image, skipping")
        return

    out = dst.with_suffix(".webp")
    orig_kb = src.stat().st_size // 1024

    # Save—Pillow will preserve alpha if img.mode is RGBA/LA or has transparency info
    img.save(
        out,
        format="WEBP",
        quality=WEBP_QUALITY,
        method=WEBP_METHOD,
        lossless=False
    )

    new_kb = out.stat().st_size // 1024
    print(f"✅ {src.relative_to(ROOT)} → {out.relative_to(ROOT)}: {orig_kb} KB → {new_kb} KB")

# ─── MAIN ───────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    ROOT = Path(__file__).resolve().parent
    OUT_ROOT = ROOT / OUTPUT_DIR

    images = list(find_images(ROOT))
    if not images:
        sys.exit("Nothing to do: no PNG/JPEGs found.")

    print(f"Converting {len(images)} image(s) to WebP (alpha preserved)…")
    for src in images:
        rel = src.relative_to(ROOT)
        dst = OUT_ROOT / rel
        try:
            convert_to_webp(src, dst)
        except Exception as e:
            print(f"💥 {rel}: {e}")

    print("Done! Alpha stays intact, backgrounds stay transparent. 🎉")
