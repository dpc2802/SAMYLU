# -*- coding: utf-8 -*-
"""Writes a brand new StaticCatalog.tsx with correct UTF-8 and improved design."""

NEW_CATALOG = '''"use client";

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
  { id: "todo", label: "Toda la Coleccion" },
  { id: "vestidos", label: "Vestidos" },
  { id: "conjuntos", label: "Conjuntos & Blusas" },
];

const TALLAS = ["XS", "S", "M", "L", "XL"];

const SORT_OPTIONS = [
  { id: "destacados", label: "Destacados" },
  { id: "precio-asc", label: "Precio: menor a mayor" },
  { id: "precio-desc", label: "Precio: mayor a menor" },
  { id: "nombre-asc", label: "Nombre A-Z" },
];

export default function StaticCatalog({ products: PRODUCTOS }: { products: ProductItem[] }) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("todo");
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [sortBy, setSortBy] = useState("destacados");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const { addItem, openCart } = useCartStore();
  const { ids: wishIds, toggleItem: toggleWish } = useWishlistStore();

  useEffect(() => {
    const cat = searchParams.get("categoria");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  // Filter
  let filteredProducts = PRODUCTOS.filter((p) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !p.name.toLowerCase().includes(q) &&
        !p.type.toLowerCase().includes(q) &&
        !p.description.toLowerCase().includes(q)
      )
        return false;
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
  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "precio-asc") return a.price - b.price;
    if (sortBy === "precio-desc") return b.price - a.price;
    if (sortBy === "nombre-asc") return a.name.localeCompare(b.name);
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  const handleAddToCart = (p: ProductItem) => {
    addItem({
      id: `${p.id}-${p.size[0] || "U"}`,
      name: p.name,
      slug: p.slug,
      price: p.price,
      image: p.img,
      size: p.size[0] || "U",
      color: p.color,
      quantity: 1,
    });
    openCart();
  };

  const Sidebar = () => (
    <div style={{ width: "200px", flexShrink: 0 }}>
      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 400, margin: "0 0 28px", letterSpacing: "0.02em" }}>
        Filtros
      </h2>

      {/* Search indicator */}
      {searchQuery && (
        <div style={{ marginBottom: "20px", padding: "10px 12px", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#666" }}>
            Buscando: <strong style={{ color: "#000" }}>{searchQuery}</strong>
          </span>
          <Link href="/shop" style={{ color: "#999", textDecoration: "none" }}>
            <X size={12} />
          </Link>
        </div>
      )}

      {/* Categoria */}
      <div style={{ marginBottom: "28px" }}>
        <h3 style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#aaa", marginBottom: "14px", margin: "0 0 14px" }}>
          Coleccion
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {CATEGORIAS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                background: "none", border: "none", textAlign: "left", padding: "8px 0",
                fontSize: "12px", cursor: "pointer", letterSpacing: "0.05em",
                color: activeCategory === cat.id ? "#000" : "#888",
                fontWeight: activeCategory === cat.id ? 600 : 400,
                borderBottom: activeCategory === cat.id ? "1px solid #000" : "1px solid transparent",
                transition: "all 0.2s",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Talla */}
      <div style={{ marginBottom: "28px" }}>
        <h3 style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#aaa", margin: "0 0 14px" }}>
          Talla
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {TALLAS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveSize(activeSize === t ? null : t)}
              style={{
                width: "40px", height: "40px", border: activeSize === t ? "1px solid #000" : "1px solid #e0e0e0",
                background: activeSize === t ? "#000" : "#fff",
                color: activeSize === t ? "#fff" : "#666",
                fontSize: "10px", letterSpacing: "0.1em", cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Precio */}
      <div style={{ marginBottom: "28px" }}>
        <h3 style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#aaa", margin: "0 0 14px" }}>
          Precio maximo
        </h3>
        <input
          type="range"
          min={100000}
          max={2000000}
          step={50000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          style={{ width: "100%", accentColor: "#000" }}
        />
        <p style={{ fontSize: "11px", color: "#666", margin: "8px 0 0" }}>
          Hasta {formatPrice(maxPrice)}
        </p>
      </div>

      {/* Reset */}
      <button
        onClick={() => { setActiveCategory("todo"); setActiveSize(null); setMaxPrice(2000000); }}
        style={{
          width: "100%", background: "none", border: "1px solid #e0e0e0",
          padding: "10px", fontSize: "9px", letterSpacing: "0.2em",
          textTransform: "uppercase", cursor: "pointer", color: "#888",
          transition: "all 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "#000"; e.currentTarget.style.color = "#000"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.style.color = "#888"; }}
      >
        Limpiar filtros
      </button>
    </div>
  );

  return (
    <div style={{ padding: "0 6vw 80px" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .cat-card:hover .cat-img { transform: scale(1.04); }
        .cat-card:hover .cat-overlay { opacity: 1; }
        .cat-card:hover .cat-actions { transform: translateY(0); opacity: 1; }
        .cat-card .cat-img { transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94); }
        .cat-card .cat-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.08); opacity: 0; transition: opacity 0.4s; }
        .cat-card .cat-actions { position: absolute; bottom: 0; left: 0; right: 0; transform: translateY(8px); opacity: 0; transition: all 0.35s ease; }
        @media (max-width: 768px) {
          .cat-desktop-sidebar { display: none !important; }
          .cat-mobile-filter-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .cat-mobile-filter-btn { display: none !important; }
        }
      ` }} />

      {/* ── TOOLBAR ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0 24px", borderBottom: "1px solid #f0f0f0", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Mobile filter button */}
          <button
            className="cat-mobile-filter-btn"
            onClick={() => setIsFilterOpen(true)}
            style={{ display: "none", alignItems: "center", gap: "8px", background: "none", border: "1px solid #e0e0e0", padding: "8px 14px", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}
          >
            <SlidersHorizontal size={14} />
            Filtros
          </button>

          <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", margin: 0 }}>
            <strong style={{ color: "#000" }}>{filteredProducts.length}</strong> piezas encontradas
            {searchQuery && <span style={{ color: "#888" }}> para &ldquo;{searchQuery}&rdquo;</span>}
          </p>
        </div>

        {/* Sort */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "1px solid #e0e0e0", padding: "8px 14px", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}
          >
            Ordenar: {SORT_OPTIONS.find(s => s.id === sortBy)?.label}
            <ChevronDown size={12} />
          </button>
          {showSortMenu && (
            <div style={{ position: "absolute", right: 0, top: "100%", marginTop: "4px", background: "#fff", border: "1px solid #e0e0e0", zIndex: 10, minWidth: "200px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
              {SORT_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => { setSortBy(opt.id); setShowSortMenu(false); }}
                  style={{
                    display: "block", width: "100%", textAlign: "left", padding: "12px 16px",
                    background: sortBy === opt.id ? "#f5f5f5" : "#fff",
                    border: "none", fontSize: "11px", letterSpacing: "0.05em", cursor: "pointer",
                    fontWeight: sortBy === opt.id ? 600 : 400,
                  }}
                >
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
        <div className="cat-desktop-sidebar" style={{ position: "sticky", top: "120px" }}>
          <Sidebar />
        </div>

        {/* Products Grid */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa" }}>
                No se encontraron prendas con estos filtros
              </p>
              <button
                onClick={() => { setActiveCategory("todo"); setActiveSize(null); setMaxPrice(2000000); }}
                style={{ marginTop: "20px", background: "none", border: "1px solid #000", padding: "10px 24px", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer" }}
              >
                Ver todo
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4px" }}>
              {filteredProducts.map((product, idx) => {
                const isWished = wishIds.includes(product.id);
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="cat-card"
                    style={{ position: "relative", background: "#f8f8f8", overflow: "hidden" }}
                  >
                    {/* Image */}
                    <Link href={`/product/${product.slug}`} style={{ display: "block", position: "relative", aspectRatio: "2/3", overflow: "hidden" }}>
                      <Image
                        src={product.img}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 28vw"
                        style={{ objectFit: "cover", objectPosition: "top center" }}
                        className="cat-img"
                      />
                      <div className="cat-overlay" />

                      {/* Badge */}
                      {product.badge && (
                        <span style={{ position: "absolute", top: "12px", left: "12px", background: "#000", color: "#fff", fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "4px 8px" }}>
                          {product.badge}
                        </span>
                      )}

                      {/* Wishlist btn */}
                      <button
                        onClick={(e) => { e.preventDefault(); toggleWish(product.id); }}
                        style={{
                          position: "absolute", top: "12px", right: "12px",
                          width: "32px", height: "32px", borderRadius: "50%",
                          background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          backdropFilter: "blur(4px)", transition: "transform 0.2s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                      >
                        <Heart size={14} fill={isWished ? "#000" : "none"} />
                      </button>

                      {/* Quick add (hover) */}
                      <div className="cat-actions" style={{ padding: "12px" }}>
                        <button
                          onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                          style={{
                            width: "100%", background: "rgba(0,0,0,0.85)", color: "#fff",
                            border: "none", padding: "12px", fontSize: "9px",
                            letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                            backdropFilter: "blur(4px)", transition: "background 0.2s",
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,1)")}
                          onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.85)")}
                        >
                          <ShoppingBag size={12} />
                          Agregar al carrito
                        </button>
                      </div>
                    </Link>

                    {/* Info */}
                    <div style={{ padding: "14px 16px 18px" }}>
                      <Link href={`/product/${product.slug}`} style={{ textDecoration: "none", color: "#000" }}>
                        <h3 style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px", fontWeight: 500, lineHeight: 1.3 }}>
                          {product.name}
                        </h3>
                      </Link>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "13px", fontFamily: "var(--font-serif)", fontWeight: 600 }}>
                          {formatPrice(product.price)}
                        </span>
                        <div style={{ display: "flex", gap: "3px" }}>
                          {product.size.slice(0, 4).map(s => (
                            <span key={s} style={{ fontSize: "8px", color: "#aaa", letterSpacing: "0.1em" }}>{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 90 }}
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              style={{ position: "fixed", top: 0, left: 0, width: "280px", height: "100%", background: "#fff", zIndex: 100, padding: "32px 24px", overflowY: "auto" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
                <span style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Filtros</span>
                <button onClick={() => setIsFilterOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <X size={20} />
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
    f.write(NEW_CATALOG)

print("StaticCatalog rewritten from scratch!")

