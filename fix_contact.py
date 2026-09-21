# -*- coding: utf-8 -*-
with open("src/app/(storefront)/contacto/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("import { MessageCircle, MapPin, Mail, Instagram } from \"lucide-react\";", "import { MessageCircle, MapPin, Mail } from \"lucide-react\";")

INSTA_ICON = '''<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "4px" }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>'''

content = content.replace("<Instagram size={18} strokeWidth={1} style={{ marginTop: \"4px\" }} />", INSTA_ICON)

with open("src/app/(storefront)/contacto/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
