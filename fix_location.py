# -*- coding: utf-8 -*-
with open("src/app/(storefront)/contacto/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("Bogotá", "Bucaramanga")

with open("src/app/(storefront)/contacto/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Location updated to Bucaramanga!")
