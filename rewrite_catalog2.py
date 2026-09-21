# -*- coding: utf-8 -*-
"""Rewrite StaticCatalog with load-more pagination and 2-column mobile grid."""

CATALOG = '''"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Heart, ShoppingBag, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { useCartStore, useWishlistStore } from "@/lib/store";

export type ProductItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  color: string;
  size: string[];
  type: string;
  img: string;
  description: string;
  badge?: string;
  isFeatured?: boolean;
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(price);

const CATEGORIAS = [
  { id: "todo", label: "Todo" },
  { id: "vestidos", label: "Vestidos" },
  { id: "conjuntos", label: "Conjuntos & Blusas" },
];

const TALLAS = ["XS", "S", "M", "L", "XL"];

const SORT_OPTIONS = [
  { id: "destacados", label: "Destacados" },
  { id: "precio-asc", label: "Menor precio" },
  { id: "precio-desc", label: "Mayor precio" },
  { id: "nombre-asc", label: "Nombre A-Z" },
];

const PAGE_SIZE = 8;

export default function StaticCatalog({ products: PRODUCTOS }: { products: ProductItem[] }) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("todo");
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [sortBy, setSortBy] = useState("destacados");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const { addItem } = useCartStore();
  const { ids: wishIds, toggle: toggleWish } = useWishlistStore();

  useEffect(() => {
    const cat = searchParams.get("categoria");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  // Reset pagination when filters change
  useEffect(() => { setVisibleCount(PAGE_SIZE); }, [activeCategory, activeSize, maxPrice, sortBy, searchQuery]);

  // Filter
  let filtered = PRODUCTOS.filter((p) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.type.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) return false;
    }
    if (activeCategory !== "todo") {
      if (activeCategory === "vestidos" && !p.type.toLowerCase().includes("vestido")) return false;
      if (activeCategory === "conjuntos" && !["conjunto", "blusa", "top", "falda"].some(k => p.type.toLowerCase().includes(k))) return false;
    }
    if (activeSize && !p.size.includes(activeSize)) return false;
    if (p.price > maxPrice) return false;
    return true;
  });

  // Sort
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "precio-asc") return a.price - b.price;
    if (sortBy === "precio-desc") return b.price - a.price;
    if (sortBy === "nombre-asc") return a.name.localeCompare(b.name);
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleAddToCart = (p: ProductItem) => {
    addItem({
      productId: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      image: p.img,
      size: p.size[0] || "U",
      color: p.color || "#000000",
      quantity: 1,
    });
  };

  const Sidebar = () => (
    <div style={{ width: "200px", flexShrink: 0 }}>
      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, fontStyle: "italic", margin: "0 0 28px", letterSpacing: "0.02em" }}>
        Filtros
      </h2>

      {searchQuery && (
        <div style={{ marginBottom: "20px", padding: "10px 12px", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666" }}>
            &ldquo;{searchQuery}&rdquo;
          </span>
          <Link href="/shop" style={{ color: "#999", textDecoration: "none", display: "flex", alignItems: "center" }}>
            <X size={12} />
          </Link>
        </div>
      )}

      <div style={{ marginBottom: "28px" }}>
        <h3 style={{ fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#bbb", margin: "0 0 14px" }}>Coleccion</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {CATEGORIAS.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              style={{ background: "none", border: "none", textAlign: "left", padding: "8px 0", fontSize: "12px", cursor: "pointer", color: activeCategory === cat.id ? "#000" : "#999", fontWeight: activeCategory === cat.id ? 600 : 400, borderBottom: activeCategory === cat.id ? "1px solid #000" : "1px solid transparent", transition: "all 0.2s" }}>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "28px" }}>
        <h3 style={{ fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#bbb", margin: "0 0 14px" }}>Talla</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {TALLAS.map((t) => (
            <button key={t} onClick={() => setActiveSize(activeSize === t ? null : t)}
              style={{ width: "38px", height: "38px", border: activeSize === t ? "1px solid #000" : "1px solid #e0e0e0", background: activeSize === t ? "#000" : "#fff", color: activeSize === t ? "#fff" : "#888", fontSize: "10px", cursor: "pointer", transition: "all 0.2s" }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "28px" }}>
        <h3 style={{ fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#bbb", margin: "0 0 14px" }}>Precio maximo</h3>
        <input type="range" min={100000} max={2000000} step={50000} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
          style={{ width: "100%", accentColor: "#000" }} />
        <p style={{ fontSize: "11px", color: "#888", margin: "8px 0 0" }}>{formatPrice(maxPrice)}</p>
      </div>

      <button
        onClick={() => { setActiveCategory("todo"); setActiveSize(null); setMaxPrice(2000000); }}
        style={{ width: "100%", background: "none", border: "1px solid #e8e8e8", padding: "10px", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", color: "#aaa", transition: "all 0.2s" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "#000"; e.currentTarget.style.color = "#000"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "#e8e8e8"; e.currentTarget.style.color = "#aaa"; }}>
        Limpiar filtros
      </button>
    </div>
  );

  return (
    <div style={{ padding: "0 6vw 80px" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── RESPONSIVE GRID ── */
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3px;
        }
        @media (min-width: 768px) {
          .cat-grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* ── SIDEBAR ── */
        .cat-sidebar { display: none; }
        .cat-mobile-bar { display: flex; }
        @media (min-width: 768px) {
          .cat-sidebar { display: block; position: sticky; top: 120px; }
          .cat-mobile-bar { display: none; }
        }

        /* ── CARD HOVER ── */
        .cat-card .cat-img { transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94); }
        .cat-card:hover .cat-img { transform: scale(1.05); }
        .cat-card .cat-actions { position: absolute; bottom: 0; left: 0; right: 0; transform: translateY(6px); opacity: 0; transition: all 0.3s ease; }
        .cat-card:hover .cat-actions { transform: translateY(0); opacity: 1; }
      ` }} />

      {/* ── TOOLBAR ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0 20px", borderBottom: "1px solid #f0f0f0", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Mobile filter button */}
          <button className="cat-mobile-bar"
            onClick={() => setIsFilterOpen(true)}
            style={{ alignItems: "center", gap: "6px", background: "none", border: "1px solid #e0e0e0", padding: "7px 12px", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
            <SlidersHorizontal size={12} style={{ marginRight: "4px" }} />
            Filtros
          </button>
          <p style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#bbb", margin: 0 }}>
            <strong style={{ color: "#000" }}>{filtered.length}</strong> piezas
            {searchQuery && <span> · &ldquo;{searchQuery}&rdquo;</span>}
          </p>
        </div>

        {/* Sort */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setShowSortMenu(!showSortMenu)}
            style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "1px solid #e0e0e0", padding: "7px 12px", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>
            {SORT_OPTIONS.find(s => s.id === sortBy)?.label}
            <ChevronDown size={11} />
          </button>
          {showSortMenu && (
            <div style={{ position: "absolute", right: 0, top: "calc(100% + 4px)", background: "#fff", border: "1px solid #e8e8e8", zIndex: 20, minWidth: "180px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
              {SORT_OPTIONS.map(opt => (
                <button key={opt.id} onClick={() => { setSortBy(opt.id); setShowSortMenu(false); }}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 14px", background: sortBy === opt.id ? "#f8f8f8" : "#fff", border: "none", fontSize: "11px", cursor: "pointer", fontWeight: sortBy === opt.id ? 600 : 400 }}>
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── LAYOUT ── */}
      <div style={{ display: "flex", gap: "48px", alignItems: "flex-start" }}>

        {/* Desktop Sidebar */}
        <div className="cat-sidebar">
          <Sidebar />
        </div>

        {/* Products */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {visible.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#bbb" }}>
                Sin resultados para estos filtros
              </p>
              <button onClick={() => { setActiveCategory("todo"); setActiveSize(null); setMaxPrice(2000000); }}
                style={{ marginTop: "20px", background: "none", border: "1px solid #000", padding: "10px 24px", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer" }}>
                Ver todo
              </button>
            </div>
          ) : (
            <>
              <div className="cat-grid">
                {visible.map((product, idx) => {
                  const isWished = wishIds.includes(product.id);
                  return (
                    <motion.div key={product.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: Math.min(idx * 0.04, 0.3) }}
                      className="cat-card"
                      style={{ position: "relative", background: "#f8f8f8", overflow: "hidden" }}>

                      <Link href={`/product/${product.slug}`} style={{ display: "block", position: "relative", aspectRatio: "2/3", overflow: "hidden" }}>
                        <Image src={product.img} alt={product.name} fill sizes="(max-width: 768px) 50vw, 28vw"
                          style={{ objectFit: "cover", objectPosition: "top center" }} className="cat-img" />

                        {product.badge && (
                          <span style={{ position: "absolute", top: "10px", left: "10px", background: "#000", color: "#fff", fontSize: "7px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "3px 7px" }}>
                            {product.badge}
                          </span>
                        )}

                        <button onClick={e => { e.preventDefault(); toggleWish(product.id); }}
                          style={{ position: "absolute", top: "10px", right: "10px", width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Heart size={13} fill={isWished ? "#000" : "none"} strokeWidth={1.5} />
                        </button>

                        <div className="cat-actions" style={{ padding: "10px" }}>
                          <button onClick={e => { e.preventDefault(); handleAddToCart(product); }}
                            style={{ width: "100%", background: "rgba(0,0,0,0.88)", color: "#fff", border: "none", padding: "11px", fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontFamily: "inherit" }}>
                            <ShoppingBag size={11} />
                            Agregar
                          </button>
                        </div>
                      </Link>

                      <div style={{ padding: "12px 14px 16px" }}>
                        <Link href={`/product/${product.slug}`} style={{ textDecoration: "none", color: "#000" }}>
                          <h3 style={{ fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 5px", fontWeight: 500, lineHeight: 1.35 }}>
                            {product.name}
                          </h3>
                        </Link>
                        <span style={{ fontSize: "12px", fontFamily: "var(--font-serif)", fontWeight: 600 }}>
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* ── LOAD MORE ── */}
              {hasMore && (
                <div style={{ textAlign: "center", marginTop: "48px" }}>
                  <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#bbb", marginBottom: "16px" }}>
                    Mostrando {visible.length} de {filtered.length} piezas
                  </p>
                  <button
                    onClick={() => setVisibleCount(v => v + PAGE_SIZE)}
                    style={{ background: "none", border: "1px solid #000", padding: "14px 40px", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit", transition: "all 0.25s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#000"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#000"; }}>
                    Cargar mas piezas
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 90 }} />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              style={{ position: "fixed", top: 0, left: 0, width: "280px", height: "100%", background: "#fff", zIndex: 100, padding: "28px 24px", overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
                <span style={{ fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase" }}>Filtros</span>
                <button onClick={() => setIsFilterOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <X size={18} />
                </button>
              </div>
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
'''

with open("src/components/shop/StaticCatalog.tsx", "w", encoding="utf-8") as f:
    f.write(CATALOG)
print("Catalog rewritten with pagination + 2-col mobile!")

