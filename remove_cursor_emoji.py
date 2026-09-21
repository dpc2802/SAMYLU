# -*- coding: utf-8 -*-
import re
import os

# 1. Remove cursor from layout
layout_path = "src/app/(storefront)/layout.tsx"
with open(layout_path, "r", encoding="utf-8") as f:
    layout = f.read()

layout = layout.replace('import CustomCursor from "@/components/ui/CustomCursor";\n', '')
layout = layout.replace('      <CustomCursor />\n', '')

with open(layout_path, "w", encoding="utf-8") as f:
    f.write(layout)

# 2. Remove emoji from Footer
footer_path = "src/components/layout/Footer.tsx"
with open(footer_path, "r", encoding="utf-8") as f:
    footer = f.read()

# Replace the specific span with the emoji/broken emoji
footer = re.sub(r'<span style=\{\{ fontSize: "12px", opacity: 0\.5 \}\}>[^<]+</span>', '', footer)

with open(footer_path, "w", encoding="utf-8") as f:
    f.write(footer)

print("Cursor and emoji removed successfully!")

