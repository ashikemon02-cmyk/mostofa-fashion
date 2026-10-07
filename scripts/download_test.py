import urllib.request, subprocess, os, time

urls = {
  "panjabi": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Blue_khadi_kurta.jpg",
  "jeans": "https://upload.wikimedia.org/wikipedia/commons/1/15/Skinny_jeans_02.jpg",
  "three_piece": "https://upload.wikimedia.org/wikipedia/commons/1/13/Shalwar_kameez_%281710609%29.jpg",
  "wholesale_panjabi": "https://upload.wikimedia.org/wikipedia/commons/6/62/Colorful_kurtas.jpg",
  "kurti": "https://upload.wikimedia.org/wikipedia/commons/7/78/Shalwar_kameez_Colours.jpg",
  "tshirt": "https://upload.wikimedia.org/wikipedia/commons/0/0c/Crew_neck_T-shirt.jpg",
  "polo": "https://upload.wikimedia.org/wikipedia/commons/6/6f/WP_polo_shirt_FRONT_Merchandise_shots-24_cropped.jpg",
  "formal_shirt": "https://upload.wikimedia.org/wikipedia/commons/5/58/Banana_Republic_Button-Down_Shirt_1_2019-03-21.jpg",
  "blazer": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Businessman-fashion-suit-jacket_%2824300754036%29.jpg",
  "wholesale_jeans": "https://upload.wikimedia.org/wikipedia/commons/0/01/Jeans_Jeans_Jeans.jpg",
  "wholesale_shirts": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Button_down_dress_shirts_for_men.jpg",
  "festive_three_piece": "https://upload.wikimedia.org/wikipedia/commons/7/78/Shalwar_kameez_Colours.jpg"
}

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) MostofaApp/1.0"}

for name, u in urls.items():
    dest = f"/tmp/{name}_raw.jpg"
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as r, open(dest, "wb") as f:
            f.write(r.read())
        size = os.path.getsize(dest)
        print("DOWNLOADED:", name, f"({size} bytes)")
    except Exception as e:
        print("FAILED:", name, e)
    time.sleep(0.5)
