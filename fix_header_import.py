# -*- coding: utf-8 -*-
with open("src/components/layout/Header.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("import { NAV_LINKS } from \"@/lib/constants\";", "import { NAV_LINKS, WHATSAPP_NUMBER } from \"@/lib/constants\";")

with open("src/components/layout/Header.tsx", "w", encoding="utf-8") as f:
    f.write(content)
