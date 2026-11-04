"""Capture screenshots of the live projects with headless Edge and save them as WebP in public/work/.

  python scripts/capture.py            # all
  python scripts/capture.py tuby gosto

Edge's launcher returns before the headless browser has written the screenshot, so the script waits for the file.
"""
import pathlib
import shutil
import subprocess
import sys
import tempfile
import time

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "work"
BUDGET = 60000  # ms of virtual time; slow storefronts need longer than the default
EDGE = next(p for p in [pathlib.Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"),
                        pathlib.Path(r"C:\Program Files\Microsoft\Edge\Application\msedge.exe")] if p.exists())

SHOTS = {
    "konin-digits": "https://digits.koninstore.com/en",
    "konin-market": "https://market.koninstore.com/en",
    "konin-food": "https://foodstore.koninstore.com/en",
    "konin-fashion": "https://fashion.koninstore.com/en",
    "konin-glammart": "https://glammart.koninstore.com/en",
    "konin-gearup": "https://gearup.koninstore.com/en",
    "konin-pastries": "https://pastryshop.koninstore.com/en",
    "coffee-talk": "https://devmaheremad.github.io/coffeetalkdash/home",
    "mars": "https://devmaheremad.github.io/Mars-master/",
    "dahran": "https://devmaheremad.github.io/aldahran/",
    "ajad": "https://devmaheremad.github.io/ajad/",
    "laqta": "https://devmaheremad.github.io/laqtasiteloader/",
    "hilarity": "https://hilarity-hq.vercel.app/",
    "tuby": "https://devmaheremad.github.io/tuby/",
    "gosto": "https://devmaheremad.github.io/gosto-ecommerce/",
}


def wait_for(png, limit=90):
    """Wait until the file exists and its size stops changing."""
    end, last = time.time() + limit, -1
    while time.time() < end:
        if png.exists():
            size = png.stat().st_size
            if size == last and size > 0:
                return True
            last = size
        time.sleep(1.5)
    return png.exists()


def shoot(name, url, work):
    png = work / f"{name}.png"
    png.unlink(missing_ok=True)
    subprocess.run([str(EDGE), "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--mute-audio",
                    f"--user-data-dir={work / ('profile-' + name)}", "--window-size=1440,900", f"--virtual-time-budget={BUDGET}",
                    f"--screenshot={png}", url], capture_output=True, timeout=120)
    if not wait_for(png):
        return f"FAIL {name}: no screenshot"
    img = Image.open(png).convert("RGB")
    out = OUT / f"{name}.webp"
    img.save(out, "WEBP", quality=80, method=6)
    return f"ok   {name}.webp {img.size} {out.stat().st_size // 1024} KB"


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    work = pathlib.Path(tempfile.mkdtemp(prefix="capture-"))
    for n in sys.argv[1:] or list(SHOTS):
        print(shoot(n, SHOTS[n], work), flush=True)
    time.sleep(3)
    shutil.rmtree(work, ignore_errors=True)
