# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "cairosvg",
#     "pillow",
# ]
# ///
"""
Panoriq — PNG export generator.

Reads the master SVGs and rasterizes them at many sizes. The lockup
(mark + wordmark) is composited using PIL: the mark is rendered from
SVG via cairosvg, text is rendered with a system font.

NOTE: This sandbox does not have Manrope available, so the lockup PNGs
use Nimbus Sans Bold as a Helvetica-adjacent stand-in. For production
lockups, re-render locally with Manrope-Bold.ttf in the same directory
and flip USE_MANROPE = True below.
"""
import os
import io
from pathlib import Path
import cairosvg
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).parent
SVG_DIR = ROOT / "svg"
OUT = ROOT

# ----- config -----
MARK_SIZES = [2048, 1024, 512, 256, 192, 180, 144, 128, 96, 72, 64, 56, 48, 32, 24, 16]
FAVICON_SIZES = [48, 32, 16]       # use mark-favicon.svg for these (simpler, reads better)
LOCKUP_WIDTHS = [1600, 800, 400]   # horizontal lockup widths

NAVY = (14, 42, 71)
WHITE = (255, 255, 255)

# Try Manrope if user dropped it alongside this script
MANROPE_PATH = ROOT / "Manrope-Bold.ttf"
FALLBACK_FONT = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
USE_MANROPE = MANROPE_PATH.exists()
FONT_PATH = str(MANROPE_PATH) if USE_MANROPE else FALLBACK_FONT


def rasterize(svg_path: Path, size_px: int) -> Image.Image:
    """Render an SVG at the given square pixel size, transparent bg."""
    png_bytes = cairosvg.svg2png(
        url=str(svg_path),
        output_width=size_px,
        output_height=size_px,
    )
    return Image.open(io.BytesIO(png_bytes)).convert("RGBA")


def save_mark(svg_path: Path, prefix: str, sizes):
    out_dir = OUT / prefix
    out_dir.mkdir(parents=True, exist_ok=True)
    for s in sizes:
        img = rasterize(svg_path, s)
        img.save(out_dir / f"{prefix}-{s}.png", optimize=True)
        print(f"  {prefix}-{s}.png")


def make_lockup(mark_svg: Path, bg_color, text_color, out_name, widths):
    """Horizontal lockup: mark on the left, 'panoriq' wordmark on the right."""
    out_dir = OUT / "lockup"
    out_dir.mkdir(parents=True, exist_ok=True)

    for width in widths:
        # Proportions: mark ~ 22% of width, padding between ~ 5%, text fills rest
        height = int(width * 0.28)
        mark_size = int(height * 0.9)
        pad_left = int(height * 0.15)
        pad_gap = int(height * 0.15)

        canvas = Image.new("RGBA", (width, height), bg_color)

        # Mark
        mark_img = rasterize(mark_svg, mark_size)
        mark_y = (height - mark_size) // 2
        canvas.alpha_composite(mark_img, (pad_left, mark_y))

        # Text
        font_size = int(mark_size * 0.72)
        font = ImageFont.truetype(FONT_PATH, font_size)
        draw = ImageDraw.Draw(canvas)
        text = "panoriq"
        # measure for vertical centering
        bbox = draw.textbbox((0, 0), text, font=font)
        text_h = bbox[3] - bbox[1]
        text_x = pad_left + mark_size + pad_gap
        text_y = (height - text_h) // 2 - bbox[1]
        draw.text((text_x, text_y), text, font=font, fill=text_color)

        canvas.save(out_dir / f"{out_name}-{width}w.png", optimize=True)
        print(f"  lockup/{out_name}-{width}w.png")


def main():
    print(f"Font: {'Manrope (user-supplied)' if USE_MANROPE else 'Nimbus Sans Bold (fallback)'}")
    print("\n--- Mark (light background) ---")
    save_mark(SVG_DIR / "mark-light.svg", "mark-light", MARK_SIZES)

    print("\n--- Mark (dark background) ---")
    save_mark(SVG_DIR / "mark-dark.svg", "mark-dark", MARK_SIZES)

    print("\n--- Favicon (simplified) ---")
    save_mark(SVG_DIR / "mark-favicon.svg", "favicon", FAVICON_SIZES)

    print("\n--- Lockup light ---")
    make_lockup(SVG_DIR / "mark-light.svg", (255, 255, 255, 0), NAVY, "lockup-light", LOCKUP_WIDTHS)

    print("\n--- Lockup dark ---")
    make_lockup(SVG_DIR / "mark-dark.svg", NAVY + (255,), WHITE, "lockup-dark", LOCKUP_WIDTHS)

    print("\nDone.")


if __name__ == "__main__":
    main()
