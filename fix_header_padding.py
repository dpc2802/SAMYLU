# -*- coding: utf-8 -*-
with open("src/components/layout/Header.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old_div = '<div className="h-[72px] px-6 md:px-12 flex items-center justify-between mx-auto max-w-[1600px]">'
new_div = '<div style={{ height: "72px", paddingLeft: "6vw", paddingRight: "6vw", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "1600px", margin: "0 auto" }}>'

content = content.replace(old_div, new_div)

with open("src/components/layout/Header.tsx", "w", encoding="utf-8") as f:
    f.write(content)
