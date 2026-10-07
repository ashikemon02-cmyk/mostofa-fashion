import urllib.request, re

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
url = "https://yellowclothing.net/men/ethnic/panjabi"
req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=8) as r:
        html = r.read().decode("utf-8", errors="ignore")
        imgs = re.findall(r"https://[^\s\"'>]+\.(?:jpg|jpeg|webp)", html)
        product_imgs = [i for i in set(imgs) if "media/catalog/product" in i]
        print("Found:", len(product_imgs))
        for p in product_imgs[:8]:
            print(p)
except Exception as e:
    print("ERR", e)
