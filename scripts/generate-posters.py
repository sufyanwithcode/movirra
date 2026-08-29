#!/usr/bin/env python3
# Regenerates original MOVIRRA poster art into apps/web/public/posters.
# Requires: Pillow, numpy, and DejaVu TrueType fonts (Linux). Optional tool.
import numpy as np, math, random
from PIL import Image, ImageDraw, ImageFont

W, H = 480, 720
import os
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "apps", "web", "public", "posters")
os.makedirs(OUT, exist_ok=True)
FD = "/usr/share/fonts/truetype/dejavu"
f_title = lambda s: ImageFont.truetype(f"{FD}/DejaVuSansCondensed-Bold.ttf", s)
f_meta  = lambda s: ImageFont.truetype(f"{FD}/DejaVuSansMono.ttf", s)

def hx(c): return tuple(int(c[i:i+2],16) for i in (1,3,5))

POSTERS = [
    dict(title="NEON HOLLOW",       genre="SCIENCE FICTION", year=2087, run="1H 52M", c1="#1a160f", c2="#0a0908", ac="#F2A93B", motif="rings"),
    dict(title="THE LAST MERIDIAN", genre="DRAMA",           year=1998, run="2H 14M", c1="#122228", c2="#080e12", ac="#4E8D7C", motif="horizon"),
    dict(title="EMBER COAST",       genre="ADVENTURE",       year=2021, run="1H 47M", c1="#3c1812", c2="#120908", ac="#C9532F", motif="triangles"),
    dict(title="PAPER MOONS",       genre="ROMANCE",         year=1976, run="1H 39M", c1="#281a36", c2="#0e0a14", ac="#9B4576", motif="circle"),
    dict(title="GOLDEN VELD",       genre="WESTERN",         year=1969, run="2H 05M", c1="#463414", c2="#181208", ac="#E0B15A", motif="sun"),
    dict(title="STATIC BLOOM",      genre="THRILLER",        year=2019, run="1H 58M", c1="#181e2c", c2="#0a0c12", ac="#6E7FB0", motif="streaks"),
    dict(title="SALT & CINDER",     genre="DRAMA",           year=2016, run="2H 21M", c1="#3a2214", c2="#140c08", ac="#D2691E", motif="slashes"),
    dict(title="WILD ARBOR",        genre="FANTASY",         year=2011, run="2H 32M", c1="#12281e", c2="#08100c", ac="#5FA07C", motif="arcs"),
    dict(title="NOCTURNE NINE",     genre="NOIR",            year=1958, run="1H 44M", c1="#1e1428", c2="#08060a", ac="#9678C8", motif="orbit"),
    dict(title="THE QUIET FATHOM",  genre="MYSTERY",         year=2004, run="1H 51M", c1="#301c14", c2="#100a08", ac="#D88324", motif="stars"),
]

def base_array(c1, c2, ac):
    c1, c2, ac = map(lambda c: np.array(hx(c), float), (c1, c2, ac))
    ys = np.linspace(0, 1, H)[:, None, None]
    img = c1*(1-ys) + c2*ys
    img = np.repeat(img, W, axis=1)
    # projector glow near top-center
    yy, xx = np.mgrid[0:H, 0:W]
    r = np.sqrt(((xx-W*0.5)/(W*0.72))**2 + ((yy-H*0.26)/(H*0.5))**2)
    glow = np.clip(1-r, 0, 1)**2
    glow_col = np.clip(ac*0.7 + 90, 0, 255)
    img = img*(1-glow[..., None]*0.35) + glow_col*(glow[..., None]*0.35)
    # bottom scrim for legibility
    ys2 = np.linspace(0, 1, H)[:, None]
    scr = np.clip((ys2-0.48)/0.52, 0, 1)**1.5
    img = img*(1-scr[..., None]*0.88) + np.array([9, 8, 6])*(scr[..., None]*0.88)
    return Image.fromarray(np.clip(img, 0, 255).astype(np.uint8), "RGB").convert("RGBA")

def draw_motif(img, kind, ac):
    ov = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    a = hx(ac)
    cx, cy = W*0.5, H*0.30
    if kind == "rings":
        for i, rad in enumerate(range(40, 240, 34)):
            d.ellipse([cx-rad, cy-rad, cx+rad, cy+rad], outline=a+(max(140-i*18, 30),), width=3)
    elif kind == "horizon":
        d.line([0, cy, W, cy], fill=a+(120,), width=3)
        d.ellipse([cx-70, cy-140, cx+70, cy], outline=a+(160,), width=4)
    elif kind == "triangles":
        for i, (bx, bw, bh) in enumerate([(120, 200, 260), (300, 240, 320), (60, 160, 200)]):
            d.polygon([(bx, cy+140), (bx+bw/2, cy+140-bh), (bx+bw, cy+140)], outline=a+(120-i*20,), width=3)
    elif kind == "circle":
        d.ellipse([cx-150, cy-120, cx+90, cy+120], outline=a+(150,), width=4)
        d.ellipse([cx-40, cy-30, cx+60, cy+70], fill=a+(40,))
    elif kind == "sun":
        d.ellipse([cx-80, cy-80, cx+80, cy+80], outline=a+(170,), width=4)
        for xx in range(40, W, 40):
            d.line([xx, cy+120, xx, H*0.62], fill=a+(50,), width=2)
    elif kind == "streaks":
        for xx in range(30, W, 46):
            d.line([xx, 40, xx, H*0.55], fill=a+(70,), width=6)
    elif kind == "slashes":
        for off in range(-200, 520, 60):
            d.line([off, 40, off+260, H*0.6], fill=a+(60,), width=4)
    elif kind == "arcs":
        for i, rad in enumerate(range(60, 260, 40)):
            d.arc([cx-rad, cy-rad, cx+rad, cy+rad], 200, 340, fill=a+(150-i*22,), width=4)
    elif kind == "orbit":
        for ang in (0, 60, 120):
            bb = [cx-160, cy-70, cx+160, cy+70]
            d.ellipse(bb, outline=a+(90,), width=3)
        d.ellipse([cx-14, cy-14, cx+14, cy+14], fill=a+(200,))
    elif kind == "stars":
        rnd = random.Random(7)
        for _ in range(90):
            x, y = rnd.randint(20, W-20), rnd.randint(20, int(H*0.55))
            s = rnd.choice([1, 1, 2, 3])
            d.ellipse([x-s, y-s, x+s, y+s], fill=a+(rnd.randint(80, 200),))
    return Image.alpha_composite(img, ov)

def spaced(d, xy, text, font, fill, tracking):
    x, y = xy
    for ch in text:
        d.text((x, y), ch, font=font, fill=fill)
        x += d.textlength(ch, font=font) + tracking

def wrap(d, text, font, maxw):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur+" "+w).strip()
        if d.textlength(t, font=font) <= maxw:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines

for i, p in enumerate(POSTERS):
    img = base_array(p["c1"], p["c2"], p["ac"])
    img = draw_motif(img, p["motif"], p["ac"])
    d = ImageDraw.Draw(img)
    bone, muted, ac = (243, 236, 221), (168, 156, 134), hx(p["ac"])
    # inner border frame
    d.rectangle([10, 10, W-11, H-11], outline=ac+(90,), width=2)
    # top metadata (mono)
    spaced(d, (28, 30), f"{p['year']}", f_meta(15), muted, 2)
    rt = p["run"]; mf = f_meta(15)
    spaced(d, (W-28-sum(d.textlength(c, font=mf)+2 for c in rt), 30), rt, mf, muted, 2)
    # title + genre stacked at bottom (no overlap)
    size = 48
    while size > 28:
        ft = f_title(size)
        lines = wrap(d, p["title"], ft, W-56)
        if len(lines) <= 3:
            break
        size -= 4
    ft = f_title(size)
    lines = wrap(d, p["title"], ft, W-56)
    asc = size + 6
    margin, genre_h, gap = 40, 20, 8
    block_h = len(lines)*asc + gap + genre_h
    y = H - margin - block_h
    for ln in lines:
        d.text((28, y), ln, font=ft, fill=bone)
        y += asc
    y += gap
    spaced(d, (30, y), p["genre"], f_meta(15), ac, 3)
    img.convert("RGB").save(f"{OUT}/p{i}.png", quality=92)

print("generated", len(POSTERS), "posters")
