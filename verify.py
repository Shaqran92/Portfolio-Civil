import os
base = r"c:\Users\shaqr\Downloads\Portfolio-v2"
with open(os.path.join(base, "index.html"), "r", encoding="utf-8") as f:
    html = f.read()
items = [
    ("Announce bar", "announce-bar" in html),
    ("Open-to in about", "open-to-bar" in html),
    ("Pillar cards", html.count("pillar-card") >= 3),
    ("Who I Am", "Who I Am" in html),
    ("CGPA 3.58", "3.58" in html),
    ("No FE accuracy stat", "FE Model Accuracy" not in html),
    ("No bracing names in research", "X-, K-, and V-Braced" not in html),
    ("General thesis title", "Bracing Configurations" in html),
    ("Research tabs x3", html.count("rtab-btn") >= 3),
    ("Extreme Loading tab", "Extreme Loading" in html),
    ("Sustainable Concrete tab", "Sustainable Concrete" in html),
    ("Seismic tab", "Seismic" in html),
    ("NESPAK removed", "NESPAK" not in html),
    ("ResearchGate profile", "researchgate.net/profile" in html),
    ("Sitemap in footer", "sitemap.xml" in html),
    ("CSS external", "styles.css" in html),
    ("JS external", "main.js" in html),
    ("Meta keywords", "nonlinear finite element" in html),
    ("File 60KB+", len(html.encode()) > 60000),
]
all_ok = True
for name, ok in items:
    tag = "PASS" if ok else "FAIL"
    if not ok:
        all_ok = False
    print(tag + "  " + name)
print("")
print("RESULT: " + ("ALL PASS" if all_ok else "ISSUES"))
print("HTML: " + str(len(html.encode())) + " bytes, " + str(len(html.splitlines())) + " lines")
print("")
print("Files:")
for root, dirs, files in os.walk(base):
    dirs[:] = [d for d in dirs if not d.startswith(".")]
    for fname in files:
        sz = os.path.getsize(os.path.join(root, fname))
        rel = os.path.relpath(os.path.join(root, fname), base)
        print("  " + rel + " (" + str(sz) + " B)")
