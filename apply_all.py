# -*- coding: utf-8 -*-
"""Applies all pending changes to SAMYLÚ project files safely with correct UTF-8 encoding."""

import os

# ─────────────────────────────────────────────
# 1. SLIDE-OVER CART — Premium redesign
# ─────────────────────────────────────────────
CART = r'''"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, Tag, Gift } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(price);

export default function SlideOverCart() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, total, notes, setNotes } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!mounted) return null;

  const FREE_SHIPPING = 500000;
  const currentTotal = total();
  const progress = Math.min((currentTotal / FREE_SHIPPING) * 100, 100);
  const remaining = FREE_SHIPPING - currentTotal;
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  const handleWhatsApp = () => {
    if (items.length === 0) return;
    let msg = `Hola Samylú 👗, quiero realizar el siguiente pedido:\n\n`;
    items.forEach((item, i) => {
      msg += `${i + 1}. *${item.name}*\n`;
      msg += `   • Talla: ${item.size}\n`;
      if (item.color && item.color !== "#000000") msg += `   • Color: ${item.color}\n`;
      msg += `   • Cantidad: ${item.quantity}\n`;
      msg += `   • Precio: ${formatPrice(item.price * item.quantity)}\n\n`;
    });
    if (notes?.trim()) msg += `📝 *Notas:* ${notes}\n\n`;
    msg += `💰 *TOTAL: ${formatPrice(currentTotal)}*\n\nQuedo atenta a sus instrucciones de pago y envío. ¡Gracias!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeCart}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 90 }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ position: "fixed", top: 0, right: 0, width: "100%", maxWidth: "440px", height: "100%", background: "#fff", zIndex: 100, display: "flex", flexDirection: "column", boxShadow: "-20px 0 60px rgba(0,0,0,0.15)" }}
          >

            {/* ── HEADER ── */}
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <ShoppingBag size={18} strokeWidth={1.5} />
                <div>
                  <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "15px", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>
                    Tu Bolsa
                  </h2>
                  <p style={{ fontSize: "10px", color: "#999", margin: 0, letterSpacing: "0.1em" }}>
                    {itemCount} {itemCount === 1 ? "artículo" : "artículos"}
                  </p>
                </div>
              </div>
              <button
                onClick={closeCart}
                style={{ width: "36px", height: "36px", borderRadius: "50%", border: "none", background: "#f5f5f5", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#e8e8e8")}
                onMouseLeave={e => (e.currentTarget.style.background = "#f5f5f5")}
              >
                <X size={16} />
              </button>
            </div>

            {/* ── FREE SHIPPING BAR ── */}
            <div style={{ padding: "14px 24px 12px", background: "#fafafa", borderBottom: "1px solid #f0f0f0", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <Gift size={12} style={{ color: "#999" }} />
                <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: progress >= 100 ? "#16a34a" : "#666", margin: 0 }}>
                  {remaining > 0
                    ? `Te faltan ${formatPrice(remaining)} para envío gratis`
                    : "¡Tienes envío gratis! 🎉"}
                </p>
              </div>
              <div style={{ width: "100%", height: "2px", background: "#e8e8e8", borderRadius: "999px", overflow: "hidden" }}>
                <motion.div
                  style={{ height: "100%", background: progress >= 100 ? "#16a34a" : "#000", borderRadius: "999px" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* ── ITEMS ── */}
            <div style={{ flex: 1, overflowY: "auto", padding: "0 24px" }}>
              {items.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "16px", opacity: 0.4 }}>
                  <ShoppingBag size={56} strokeWidth={0.8} />
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 8px" }}>Tu bolsa está vacía</p>
                    <p style={{ fontSize: "10px", color: "#999", margin: 0 }}>Descubre nuestra colección</p>
                  </div>
                  <button
                    onClick={closeCart}
                    style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", background: "none", border: "1px solid #000", padding: "10px 20px", cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#000"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#000"; }}
                  >
                    Ver Colección
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  {items.map((item, idx) => (
                    <div
                      key={item.id}
                      style={{ display: "flex", gap: "16px", padding: "20px 0", borderBottom: idx < items.length - 1 ? "1px solid #f5f5f5" : "none" }}
                    >
                      {/* Product Image */}
                      <Link href={`/product/${item.slug}`} onClick={closeCart} style={{ position: "relative", width: "90px", height: "120px", flexShrink: 0, background: "#f8f8f8", overflow: "hidden", display: "block" }}>
                        <Image
                          src={item.image} alt={item.name} fill
                          style={{ objectFit: "cover", objectPosition: "top center", transition: "transform 0.5s" }}
                          unoptimized
                        />
                      </Link>

                      {/* Product Info */}
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div style={{ flex: 1, paddingRight: "8px" }}>
                            <Link href={`/product/${item.slug}`} onClick={closeCart} style={{ fontSize: "13px", fontWeight: 500, textDecoration: "none", color: "#000", letterSpacing: "0.02em", lineHeight: 1.3 }}>
                              {item.name}
                            </Link>
                            <div style={{ display: "flex", gap: "8px", marginTop: "6px", flexWrap: "wrap" }}>
                              <span style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", background: "#f5f5f5", padding: "2px 8px" }}>
                                Talla {item.size}
                              </span>
                              {item.color && item.color !== "#000000" && (
                                <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "9px", color: "#888" }}>
                                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: item.color, border: "1px solid #ddd", display: "inline-block" }} />
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            style={{ padding: "4px", color: "#ccc", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s", flexShrink: 0 }}
                            onMouseEnter={e => (e.currentTarget.style.color = "#ef4444")}
                            onMouseLeave={e => (e.currentTarget.style.color = "#ccc")}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        {/* Price + Qty */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                          <div style={{ display: "flex", alignItems: "center", border: "1px solid #e8e8e8" }}>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              style={{ width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: "#666" }}
                            >
                              <Minus size={11} />
                            </button>
                            <span style={{ width: "30px", textAlign: "center", fontSize: "12px", fontWeight: 500 }}>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              style={{ width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: "#666" }}
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                          <span style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.02em" }}>
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── FOOTER ── */}
            {items.length > 0 && (
              <div style={{ borderTop: "1px solid #f0f0f0", padding: "20px 24px", background: "#fff", flexShrink: 0, display: "flex", flexDirection: "column", gap: "16px" }}>

                {/* Notes */}
                <div>
                  <label style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#999", display: "block", marginBottom: "8px" }}>
                    Notas del pedido
                  </label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Ej: Dejar en portería, regalo para alguien especial..."
                    style={{ width: "100%", border: "1px solid #e8e8e8", padding: "10px 12px", fontSize: "11px", resize: "none", height: "56px", outline: "none", fontFamily: "inherit", color: "#333", boxSizing: "border-box", transition: "border-color 0.2s" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#000")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#e8e8e8")}
                  />
                </div>

                {/* Order Summary */}
                <div style={{ background: "#fafafa", padding: "14px 16px", borderRadius: "2px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "11px", color: "#888", letterSpacing: "0.1em" }}>Subtotal ({itemCount} artículos)</span>
                    <span style={{ fontSize: "11px", color: "#666" }}>{formatPrice(currentTotal)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ fontSize: "11px", color: "#888", letterSpacing: "0.1em" }}>Envío</span>
                    <span style={{ fontSize: "11px", color: progress >= 100 ? "#16a34a" : "#666" }}>
                      {progress >= 100 ? "GRATIS" : "Se calcula al finalizar"}
                    </span>
                  </div>
                  <div style={{ borderTop: "1px solid #e8e8e8", paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Total</span>
                    <span style={{ fontSize: "18px", fontFamily: "var(--font-serif)", fontWeight: 600 }}>{formatPrice(currentTotal)}</span>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <button
                  onClick={handleWhatsApp}
                  style={{ width: "100%", background: "#25D366", color: "#fff", border: "none", padding: "16px", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", transition: "background 0.2s", fontFamily: "inherit" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#1fba58")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#25D366")}
                >
                  <MessageCircle size={16} />
                  Comprar por WhatsApp
                </button>

                <p style={{ fontSize: "9px", textAlign: "center", color: "#bbb", letterSpacing: "0.1em", margin: 0 }}>
                  Pago seguro · Confirmación inmediata · Envío a todo Colombia
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
'''

# ─────────────────────────────────────────────
# 2. FOOTER — Fix symbols, add DPALACIOS, correct margins
# ─────────────────────────────────────────────
def fix_footer():
    with open("src/components/layout/Footer.tsx", "r", encoding="utf-8") as f:
        content = f.read()

    # Fix copyright year and padding
    content = content.replace("© 2025 SAMYLÚ", "© 2026 SAMYLÚ")
    content = content.replace('"0 5vw"', '"0 6vw"')
    content = content.replace("padding: \"0 5vw\"", "padding: \"0 6vw\"")

    # Remove the broken DPALACIOS block if exists
    import re
    content = re.sub(r'\{/\* DPALACIOS Signature \*/\}.*?</footer>', '</footer>', content, flags=re.DOTALL)
    content = content.replace('</footer>', '''
      {/* DPALACIOS Signature */}
      <div style={{ backgroundColor: "#000", borderTop: "1px solid #111", padding: "14px 6vw", textAlign: "center" }}>
        <a
          href="https://wa.me/573148883214?text=Hola,%20me%20gustar%C3%ADa%20cotizar%20el%20desarrollo%20de%20una%20tienda%20online%20como%20Samylu"
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#555", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}
        >
          <span>Diseñado por</span>
          <strong style={{ color: "#fff", fontWeight: 700, letterSpacing: "0.28em", fontSize: "10px" }}>DPALACIOS</strong>
          <span style={{ fontSize: "12px", opacity: 0.5 }}>👆</span>
        </a>
      </div>
    </footer>''')

    with open("src/components/layout/Footer.tsx", "w", encoding="utf-8") as f:
        f.write(content)
    print("Footer fixed!")

# ─────────────────────────────────────────────
# 3. HEADER — Add search functionality
# ─────────────────────────────────────────────
def fix_header():
    with open("src/components/layout/Header.tsx", "r", encoding="utf-8") as f:
        content = f.read()

    content = content.replace(
        'import { usePathname } from "next/navigation";',
        'import { usePathname, useRouter } from "next/navigation";'
    )

    content = content.replace(
        '  const [menuOpen, setMenuOpen] = useState(false);',
        '  const [menuOpen, setMenuOpen] = useState(false);\n  const [searchOpen, setSearchOpen] = useState(false);\n  const [searchQuery, setSearchQuery] = useState("");'
    )

    content = content.replace(
        '  const pathname = usePathname();',
        '  const pathname = usePathname();\n  const router = useRouter();'
    )

    content = content.replace(
        '<button aria-label="Buscar" className={cn("hover:opacity-50 transition-opacity", col)}>',
        '<button aria-label="Buscar" className={cn("hover:opacity-50 transition-opacity", col)} onClick={() => setSearchOpen(true)}>'
    )

    # Add search overlay before </> closing
    search_overlay = '''
      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(8px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}
          >
            <button
              onClick={() => setSearchOpen(false)}
              style={{ position: "absolute", top: "32px", right: "32px", background: "none", border: "none", cursor: "pointer", opacity: 0.5, transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")}
            >
              <X size={28} strokeWidth={1.2} />
            </button>

            <form
              onSubmit={e => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  setSearchOpen(false);
                  router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
                  setSearchQuery("");
                }
              }}
              style={{ width: "100%", maxWidth: "600px", display: "flex", flexDirection: "column", alignItems: "center", gap: "32px" }}
            >
              <p style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#aaa", margin: 0 }}>
                ¿Qué estás buscando?
              </p>
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Vestido, color, ocasión..."
                style={{ width: "100%", textAlign: "center", background: "none", border: "none", borderBottom: "1px solid #ddd", paddingBottom: "16px", fontSize: "clamp(28px, 5vw, 52px)", fontFamily: "var(--font-serif)", fontStyle: "italic", color: "#000", outline: "none", transition: "border-color 0.3s" }}
                onFocus={e => (e.currentTarget.style.borderColor = "#000")}
                onBlur={e => (e.currentTarget.style.borderColor = "#ddd")}
              />
              <button
                type="submit"
                style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", background: "none", border: "1px solid #000", padding: "12px 32px", cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#000"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#000"; }}
              >
                Buscar
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>'''

    content = content.replace('\n    </>', search_overlay)

    with open("src/components/layout/Header.tsx", "w", encoding="utf-8") as f:
        f.write(content)
    print("Header fixed!")

# ─────────────────────────────────────────────
# 4. STATIC CATALOG — Fix symbols, add search filter
# ─────────────────────────────────────────────
def fix_catalog():
    with open("src/components/shop/StaticCatalog.tsx", "r", encoding="utf-8") as f:
        content = f.read()

    # Add useSearchParams import
    content = content.replace(
        'import { motion, AnimatePresence } from "framer-motion";',
        'import { motion, AnimatePresence } from "framer-motion";\nimport { useSearchParams } from "next/navigation";'
    )

    # Add state
    content = content.replace(
        'export default function StaticCatalog({ products: PRODUCTOS }: { products: ProductItem[] }) {',
        'export default function StaticCatalog({ products: PRODUCTOS }: { products: ProductItem[] }) {\n  const searchParams = useSearchParams();\n  const searchQuery = searchParams.get("q");'
    )

    # Remove window-based useEffect, use searchParams
    content = content.replace(
        '  useEffect(() => {\n    // Read category from URL if present (e.g., ?categoria=vestidos)\n    if (typeof window !== "undefined") {\n      const params = new URLSearchParams(window.location.search);\n      const cat = params.get("categoria");\n      if (cat) {\n        setActiveCategory(cat);\n      }\n    }\n  }, []);',
        '  useEffect(() => {\n    const cat = searchParams.get("categoria");\n    if (cat) setActiveCategory(cat);\n  }, [searchParams]);'
    )

    # Add search filter to filteredProducts
    content = content.replace(
        '  // Filter logic\n  const filteredProducts = PRODUCTOS.filter((p) => {',
        '  // Filter logic\n  const filteredProducts = PRODUCTOS.filter((p) => {\n    if (searchQuery) {\n      const q = searchQuery.toLowerCase();\n      if (!p.name.toLowerCase().includes(q) && !p.type.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) return false;\n    }'
    )

    # Fix COLECCIÓN label (broken encoding)
    content = content.replace('Colecci\u0093n', 'Colección')
    content = content.replace('Colecci?n', 'Colección')
    content = content.replace('ColecciÃ³n', 'Colección')
    content = content.replace('Toda la Colecci', 'Toda la Colección')

    with open("src/components/shop/StaticCatalog.tsx", "w", encoding="utf-8") as f:
        f.write(content)
    print("StaticCatalog fixed!")

# ─────────────────────────────────────────────
# 5. SHOP PAGE — Add Suspense for useSearchParams
# ─────────────────────────────────────────────
def fix_shop_page():
    path = "src/app/(storefront)/shop/page.tsx"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    if "Suspense" not in content:
        content = content.replace(
            'import { getLiveProducts } from "@/db/queries/products";',
            'import { getLiveProducts } from "@/db/queries/products";\nimport { Suspense } from "react";'
        )
        content = content.replace(
            '<StaticCatalog products={liveProducts} />',
            '<Suspense fallback={<div style={{padding:"60px", textAlign:"center", fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase"}}>Cargando catálogo...</div>}>\n        <StaticCatalog products={liveProducts} />\n      </Suspense>'
        )

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Shop page fixed!")


# ── WRITE CART ──
with open("src/components/layout/SlideOverCart.tsx", "w", encoding="utf-8") as f:
    f.write(CART)
print("SlideOverCart written!")

# ── RUN ALL PATCHES ──
fix_footer()
fix_header()
fix_catalog()
fix_shop_page()

print("\n✅ All files patched successfully!")
