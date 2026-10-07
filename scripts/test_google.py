import urllib.request, re, urllib.parse

query = "ছেলেদের নতুন ডিজাইনের পাঞ্জাবি ফুল"
url = "https://www.google.com/search?q=" + urllib.parse.quote(query) + "&udm=2"
req = urllib.request.Request(url, headers={
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
})
try:
    with urllib.request.urlopen(req, timeout=10) as r:
        html = r.read().decode("utf-8", errors="ignore")
        tbns = re.findall(r"https://encrypted-tbn0\.gstatic\.com/images\?q=[^\"'\s<>]+", html)
        print("Found encrypted-tbn0 URLs:", len(tbns))
        for t in tbns[:3]:
            print(t)
except Exception as e:
    print("ERR:", e)
