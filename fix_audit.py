# -*- coding: utf-8 -*-
import os, re

def read(p):
    with open(p, "r", encoding="utf-8") as f:
        return f.read()

def write(p, s):
    with open(p, "w", encoding="utf-8") as f:
        f.write(s)

def sub(p, old, new, count=1):
    s = read(p)
    if old not in s:
        print(f"!! NOT FOUND in {p}: {old[:60]!r}")
        return
    write(p, s.replace(old, new, count))
    print(f"ok  {p}")

# 1. Root layout: remove duplicated Header / <main> / CookieBanner (storefront layout already renders them)
p = "src/app/layout.tsx"
s = read(p)
s = s.replace("import Header from '@/components/layout/Header';\n", "")
s = s.replace("import MinimalCookieBanner from '@/components/layout/MinimalCookieBanner';\n", "")
s = s.replace("        <Header />\n", "")
s = s.replace("        <main>{children}</main>\n", "        {children}\n")
s = s.replace("        <MinimalCookieBanner />\n", "")
write(p, s)
print("ok  root layout deduplicated")

# 2. Hero poster: use an existing image instead of the missing file
sub("src/components/ui/HeroVideo.tsx", 'poster="/images/hero-poster.jpg"', 'poster="/images/look-01.jpg"')

# 3. Header logo: not an h1 (page title owns the single h1)
p = "src/components/layout/Header.tsx"
s = read(p)
s = s.replace('<h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem"', '<span style={{ display: "block", fontFamily: "var(--font-serif)", fontSize: "1.75rem"', 1)
i = s.index("SAMYLÚ\n            </h1>") if "SAMYLÚ\n            </h1>" in s else -1
if i >= 0:
    s = s.replace("SAMYLÚ\n            </h1>", "SAMYLÚ\n            </span>", 1)
    print("ok  header logo -> span")
else:
    s = re.sub(r"(SAMYL\u00da\s*)</h1>", r"\1</span>", s, count=1)
    print("ok  header logo -> span (regex)")
write(p, s)

# 4. Footer: remove emoji, dynamic year
p = "src/components/layout/Footer.tsx"
s = read(p)
s = re.sub(r"[\U0001F300-\U0001FAFF\u2600-\u27BF\uFE0F]+\s*Carrera 37", "Carrera 37", s)
s = s.replace("&copy; 2025", "&copy; {new Date().getFullYear()}")
write(p, s)
print("ok  footer emoji + year")

# 5. Metadata per page
META = {
    "contacto": ("Contacto y Citas", "Agenda tu cita en el atelier de Samylú en Bucaramanga o escríbenos por WhatsApp."),
    "nosotras": ("Nuestra Historia", "Conoce a Martha Cepeda y el atelier de alta costura Samylú."),
    "wishlist": ("Favoritos", "Tus piezas favoritas de Samylú guardadas en un solo lugar."),
    "terminos": ("Términos y Condiciones", "Términos y condiciones de compra de Samylú by Martha Cepeda."),
    "privacidad": ("Política de Privacidad", "Cómo Samylú protege y utiliza tus datos personales."),
}
for slug, (title, desc) in META.items():
    code = (
        "import type { Metadata } from 'next';\n"
        "import { ReactNode } from 'react';\n\n"
        "export const metadata: Metadata = {\n"
        f"  title: '{title}',\n"
        f"  description: '{desc}',\n"
        "};\n\n"
        "export default function Layout({ children }: { children: ReactNode }) {\n"
        "  return <>{children}</>;\n"
        "}\n"
    )
    write(f"src/app/(storefront)/{slug}/layout.tsx", code)
    print(f"ok  metadata {slug}")

p = "src/app/(storefront)/shop/page.tsx"
s = read(p)
if "export const metadata" not in s:
    s = s.replace('import { Suspense } from "react";\n',
        'import { Suspense } from "react";\nimport type { Metadata } from "next";\n\nexport const metadata: Metadata = {\n  title: "Colección",\n  description: "Alta costura y ready-to-wear de Samylú. Vestidos de gala, conjuntos y blusas.",\n};\n', 1)
    write(p, s)
    print("ok  metadata shop")

# 6. Nosotras image priority
sub("src/app/(storefront)/nosotras/page.tsx", 'alt="Atelier SAMYLÚ" fill', 'alt="Atelier SAMYLÚ" fill priority sizes="100vw"')

# 7. Shop: tighter spacing before "Cargar más" on mobile
p = "src/components/shop/StaticCatalog.tsx"
s = read(p)
s = s.replace('marginTop: "120px" }}>\n                  <button\n                    onClick={() => setVisibleCount', 'marginTop: "clamp(48px, 8vw, 120px)" }}>\n                  <button\n                    onClick={() => setVisibleCount', 1)
s = s.replace('<div style={{ padding: "0 6vw 120px" }}>', '<div style={{ padding: "0 6vw clamp(64px, 8vw, 120px)" }}>', 1)
write(p, s)
print("ok  catalog spacing")
