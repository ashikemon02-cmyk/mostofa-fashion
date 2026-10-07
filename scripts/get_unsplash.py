import urllib.request, re, json

queries = [
  ("panjabi", "https://unsplash.com/s/photos/kurta"),
  ("formal_shirt", "https://unsplash.com/s/photos/formal-shirt"),
  ("denim_jeans", "https://unsplash.com/s/photos/jeans"),
  ("three_piece", "https://unsplash.com/s/photos/salwar-kameez"),
  ("kurti", "https://unsplash.com/s/photos/kurti"),
  ("blazer", "https://unsplash.com/s/photos/blazer"),
  ("wholesale_jeans", "https://unsplash.com/s/photos/denim"),
  ("wholesale_shirts", "https://unsplash.com/s/photos/shirts"),
  ("tshirt", "https://unsplash.com/s/photos/t-shirt"),
  ("festive_dress", "https://unsplash.com/s/photos/indian-dress"),
  ("wholesale_panjabi", "https://unsplash.com/s/photos/ethnic-wear"),
  ("polo_shirt", "https://unsplash.com/s/photos/polo-shirt")
]

headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

results = {}

for name, url in queries:
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=6) as r:
            html = r.read().decode("utf-8", errors="ignore")
            # find images.unsplash.com/photo-
            imgs = re.findall(r"https://images\.unsplash\.com/photo-[a-zA-Z0-9_-]+", html)
            # filter unique
            valid = []
            for img in imgs:
                if img not in valid and "profile" not in img and "avatar" not in img:
                    valid.append(img)
            if valid:
                results[name] = valid[:3]
                print(f"OK {name}: found {len(valid)} images: {valid[0]}")
            else:
                print(f"NO IMAGES for {name}")
    except Exception as e:
        print(f"ERR {name}: {e}")

with open("scripts/unsplash_scraped.json", "w") as f:
    json.dump(results, f, indent=2)
