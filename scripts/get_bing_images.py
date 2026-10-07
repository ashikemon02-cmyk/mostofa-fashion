import urllib.request, re, json, urllib.parse

queries = [
  ("panjabi", "mens panjabi design bangladesh"),
  ("panjabi_detail", "mens panjabi collar embroidery"),
  ("formal_shirt", "mens formal shirt long sleeve corporate"),
  ("formal_shirt_detail", "mens light blue formal dress shirt"),
  ("denim_jeans", "mens stretch denim jeans pant blue"),
  ("denim_jeans_detail", "mens dark blue denim jeans"),
  ("three_piece", "womens georgette salwar kameez 3 piece dress"),
  ("three_piece_detail", "women embroidered three piece with dupatta"),
  ("kurti", "womens cotton kurti readymade"),
  ("blazer", "mens executive slim fit blazer coat"),
  ("blazer_detail", "mens formal black blazer"),
  ("wholesale_jeans", "denim jeans wholesale bundle pile"),
  ("wholesale_shirts", "formal shirts on hangers wholesale clothing store"),
  ("tshirt", "mens drop shoulder oversized t shirt"),
  ("festive_dress", "chanderi silk party salwar suit women"),
  ("wholesale_panjabi", "panjabi wholesale lot collection"),
  ("polo_shirt", "mens pique polo shirt collar red or black"),
  ("polo_shirt_detail", "classic solid polo shirt collar")
]

headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

results = {}

for name, q in queries:
    url = f"https://www.bing.com/images/search?q={urllib.parse.quote(q)}&FORM=HDRSC2"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=6) as r:
            html = r.read().decode("utf-8", errors="ignore")
            # murl is the direct high resolution image URL from Google/Web!
            murls = re.findall(r"murl&quot;:&quot;(https?://[^&]+)&quot;", html)
            turls = re.findall(r"src=\"(https://tse\d+\.mm\.bing\.net/th\?[^\"]+)\"", html)
            chosen = murls[0] if murls else (turls[0] if turls else None)
            if chosen:
                results[name] = chosen
                print(f"OK: {name} => {chosen[:80]}")
            else:
                print(f"NO RESULT for {name}")
    except Exception as e:
        print(f"ERR {name}: {e}")

with open("scripts/bing_images.json", "w") as out:
    json.dump(results, out, indent=2)
print("Saved scripts/bing_images.json with", len(results), "images")
