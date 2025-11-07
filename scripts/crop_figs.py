from PIL import Image, ImageChops
from pathlib import Path

def auto_crop_to_content(src: Path, dst: Path, pad: int = 16):
    img = Image.open(src).convert('RGB')
    bg = Image.new('RGB', img.size, (255, 255, 255))
    diff = ImageChops.difference(img, bg)
    bbox = diff.getbbox()
    if not bbox:
        # no content detected; save original
        dst.parent.mkdir(parents=True, exist_ok=True)
        img.save(dst)
        return
    left, top, right, bottom = bbox
    # apply padding and clamp
    left = max(0, left - pad)
    top = max(0, top - pad)
    right = min(img.width, right + pad)
    bottom = min(img.height, bottom + pad)
    cropped = img.crop((left, top, right, bottom))
    dst.parent.mkdir(parents=True, exist_ok=True)
    cropped.save(dst)

def main():
    base = Path(__file__).resolve().parents[1] / 'assets' / 'paper'
    mapping = {
        'page-05.png': 'fig-teaser.png',
        'page-10.png': 'fig-method.png',
        'page-13.png': 'fig-demo.png',
        'page-19.png': 'fig-video.png',
        'page-20.png': 'fig-experiments.png',
    }
    for src_name, out_name in mapping.items():
        src = base / src_name
        dst = base / out_name
        if not src.exists():
            print(f"warn: {src} not found; skip")
            continue
        auto_crop_to_content(src, dst, pad=24)
        print(f"cropped {src.name} -> {dst.name}")

if __name__ == '__main__':
    main()

