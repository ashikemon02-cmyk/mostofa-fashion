import urllib.request, re, json, urllib.parse

queries = [
  ("panjabi", "ছেলেদের নতুন ডিজাইনের পাঞ্জাবি"),
  ("panjabi_detail", "পাঞ্জাবি কলার এমব্রয়ডারি ডিজাইন"),
  ("formal_shirt", "ছেলেদের ফরমাল শার্ট ফুল হাতা"),
  ("formal_shirt_detail", "ছেলেদের নীল রঙের ফরমাল শার্ট"),
  ("denim_jeans", "ছেলেদের ডেনিম জিন্স প্যান্ট"),
  ("denim_jeans_detail", "blue denim jeans pants men"),
  ("three_piece", "ডিজাইনার জর্জেট থ্রি পিস ডিজাইন"),
  ("three_piece_detail", "সালোয়ার কামিজ থ্রি পিস ওড়না"),
  ("kurti", "কটন কুর্তি ডিজাইন মেয়েদের রেডিমেড"),
  ("blazer", "ছেলেদের স্টাইলিশ ব্লেজার কোট"),
  ("blazer_detail", "executive mens blazer suit"),
  ("wholesale_jeans", "জিন্স প্যান্ট পাইকারি মার্কেট ঢাকা"),
  ("wholesale_shirts", "পাইকারি শার্ট শোরুম ডিসপ্লে"),
  ("tshirt", "ড্রপ শোল্ডার টি শার্ট ছেলেদের"),
  ("festive_dress", "পার্টি থ্রি পিস পাকিস্তানি কালেকশন"),
  ("wholesale_panjabi", "পাঞ্জাবি পাইকারি মার্কেট কালেকশন"),
  ("polo_shirt", "ছেলেদের কলার পোলো শার্ট"),
  ("polo_shirt_detail", "mens pique polo shirt collar")
]

headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "bn,en;q=0.9"
}

results = {}

for name, q in queries:
    url = f"https://www.google.com/search?q={urllib.parse.quote(q)}&tbm=isch&gl=bd&hl=bn"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=8) as r:
            html = r.read().decode("utf-8", errors="ignore")
            # find encrypted-tbn0.gstatic.com URLs
            tbns = re.findall(r"https://encrypted-tbn0\.gstatic\.com/images\?q=[^\s\"'<>]+", html)
            if tbns:
                results[name] = tbns[0]
                print(f"OK: {name} => {tbns[0]}")
            else:
                print(f"NO THUMBNAIL for {name}")
    except Exception as e:
        print(f"ERR {name}: {e}")

with open("scripts/google_images.json", "w") as out:
    json.dump(results, out, indent=2)
print("Saved scripts/google_images.json with", len(results), "images")
