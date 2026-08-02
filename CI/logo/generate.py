# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "pillow",
# ]
# ///
"""
Panoriq - PNG export generator.

Reads the master SVGs and rasterizes them at many sizes. The lockup
(mark + wordmark) is composited using PIL with the checked-in Manrope
font. Missing brand inputs are an error so exports stay deterministic.
"""
import io
import shutil
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).parent
SVG_DIR = ROOT / "svg"
OUT = ROOT
PROJECT_ROOT = ROOT.parent.parent

# ----- config -----
MARK_SIZES = [2048, 1024, 512, 256, 192, 180, 144, 128, 96, 72, 64, 56, 48, 32, 24, 16]
FAVICON_SIZES = [48, 32, 16]       # use mark-favicon.svg for these (simpler, reads better)
LOCKUP_WIDTHS = [1600, 800, 400]   # horizontal lockup widths

INK = (7, 49, 59)
DARK = (4, 30, 38)
SIGNAL = (27, 203, 184)
WHITE = (255, 255, 255)

FONT_PATH = ROOT.parent / "fonts" / "Manrope" / "static" / "Manrope-Bold.ttf"
if not FONT_PATH.exists():
    raise FileNotFoundError(f"Required brand font is missing: {FONT_PATH}")

RSVG_CONVERT = shutil.which("rsvg-convert")
if not RSVG_CONVERT:
    raise FileNotFoundError("rsvg-convert is required to export the SVG masters")


def rasterize(svg_path: Path, size_px: int) -> Image.Image:
    """Render an SVG at the given square pixel size, transparent bg."""
    result = subprocess.run(
        [RSVG_CONVERT, "-w", str(size_px), "-h", str(size_px), str(svg_path)],
        check=True,
        capture_output=True,
    )
    return Image.open(io.BytesIO(result.stdout)).convert("RGBA")


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
        text = "panori"
        # measure for vertical centering
        bbox = draw.textbbox((0, 0), text, font=font)
        text_h = bbox[3] - bbox[1]
        text_x = pad_left + mark_size + pad_gap
        text_y = (height - text_h) // 2 - bbox[1]
        draw.text((text_x, text_y), text, font=font, fill=text_color)
        q_x = text_x + draw.textlength(text, font=font)
        draw.text((q_x, text_y), "q", font=font, fill=SIGNAL)

        canvas.save(out_dir / f"{out_name}-{width}w.png", optimize=True)
        print(f"  lockup/{out_name}-{width}w.png")


def main():
    print(f"Font: {FONT_PATH.name}")
    print("\n--- Mark (light background) ---")
    save_mark(SVG_DIR / "mark-light.svg", "mark-light", MARK_SIZES)

    print("\n--- Mark (dark background) ---")
    save_mark(SVG_DIR / "mark-dark.svg", "mark-dark", MARK_SIZES)

    print("\n--- Favicon (simplified) ---")
    save_mark(SVG_DIR / "mark-favicon.svg", "favicon", FAVICON_SIZES)

    print("\n--- Lockup light ---")
    make_lockup(SVG_DIR / "mark-light.svg", WHITE + (255,), INK, "lockup-light", LOCKUP_WIDTHS)

    print("\n--- Lockup dark ---")
    make_lockup(SVG_DIR / "mark-dark.svg", DARK + (255,), WHITE, "lockup-dark", LOCKUP_WIDTHS)

    print("\n--- Root site icons ---")
    app_icon = rasterize(SVG_DIR / "mark-light.svg", 192)
    app_icon.save(PROJECT_ROOT / "icon.png", optimize=True)
    favicon_master = rasterize(SVG_DIR / "mark-favicon.svg", 256)
    favicon_master.save(PROJECT_ROOT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("  icon.png")
    print("  favicon.ico")

    print("\nDone.")


if __name__ == "__main__":
    main()
