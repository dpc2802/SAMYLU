# -*- coding: utf-8 -*-
with open("src/app/(storefront)/layout.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('"use server";\n', '')

with open("src/app/(storefront)/layout.tsx", "w", encoding="utf-8") as f:
    f.write(content)
