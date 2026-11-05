# Utility Warehouse phone hero: a close crop of the guided fault form, cut from the desktop hero.
# Run from the repo root: python3 tools/images/once/uw-hero-m.py   (needs Pillow)
from PIL import Image, ImageDraw, ImageFilter
P = 'public/images/utility-warehouse/'
src = Image.open(P + 'hero@2x.jpg').convert('RGB')
crop = src.crop((140, 394, 1660, 1534)).resize((1440, 1080), Image.LANCZOS)
W, H = 1600, 1200
out = Image.new('RGB', (W, H), (232, 234, 237))
mask = Image.new('L', (1440, 1080), 0); ImageDraw.Draw(mask).rounded_rectangle((0, 0, 1439, 1079), 24, fill=255)
sh = Image.new('L', (W, H), 0); sh.paste(mask, (80, 104)); sh = sh.filter(ImageFilter.GaussianBlur(36)).point(lambda v: int(v * .2))
out.paste(Image.new('RGB', (W, H), (22, 24, 29)), (0, 0), sh)
ring = Image.new('L', (1442, 1082), 0); ImageDraw.Draw(ring).rounded_rectangle((0, 0, 1441, 1081), 25, fill=255)
out.paste(Image.new('RGB', (1442, 1082), (208, 212, 217)), (79, 79), ring)
out.paste(crop, (80, 80), mask)
out.save(P + 'hero-m@2x.jpg', quality=88, optimize=True, progressive=True)
out.resize((800, 600), Image.LANCZOS).save(P + 'hero-m.jpg', quality=90, optimize=True, progressive=True)
