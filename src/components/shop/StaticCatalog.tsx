"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Heart, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

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
const BLUR_DATA = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO88x8AAp0BzdN25vAAAAAASUVORK5CYII="; // Ultra light grey

export default function StaticCatalog({ products: PRODUCTOS }: { products: ProductItem[] }) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("todo");
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [sortBy, setSortBy] = useState("destacados");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const { addItem } = useCartStore();
  const { ids: wishIds, toggle: toggleWish } = useWishlistStore();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cat = searchParams.get("categoria");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  useEffect(() => { setVisibleCount(PAGE_SIZE); }, [activeCategory, activeSize, activeColor, maxPrice, sortBy, searchQuery]);

  // Colores disponibles (solo se muestran si hay mas de uno)
  const colorOptions = [...new Set(PRODUCTOS.map((p) => p.color).filter((c) => c && /^#[0-9a-f]{3,8}$/i.test(c)))];
  const hasFilters = activeCategory !== "todo" || !!activeSize || !!activeColor;
  const resetFilters = () => { setActiveCategory("todo"); setActiveSize(null); setActiveColor(null); setMaxPrice(2000000); };

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
    if (activeColor && p.color !== activeColor) return false;
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

  useGSAP(() => {
    if (!gridRef.current) return;
    
    // Animate items on scroll
    const items = gsap.utils.toArray<HTMLElement>('.gsap-product-card');
    
    items.forEach((item, i) => {
      gsap.fromTo(item, 
        { opacity: 0, y: 60 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, { dependencies: [visibleCount, filtered.length], scope: gridRef });

  const handleHover = (e: React.MouseEvent<HTMLDivElement>, isEnter: boolean) => {
    const img = e.currentTarget.querySelector('.gsap-product-img');
    const actions = e.currentTarget.querySelector('.gsap-product-actions');
    
    if (isEnter) {
      gsap.to(img, { scale: 1.05, duration: 1.5, ease: "power2.out" });
      gsap.to(actions, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
    } else {
      gsap.to(img, { scale: 1, duration: 1.5, ease: "power2.out" });
      gsap.to(actions, { opacity: 0, y: 10, duration: 0.4, ease: "power2.in" });
    }
  };

  const Sidebar = () => (
    <div style={{ width: "220px", flexShrink: 0 }}>
      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", fontWeight: 300, fontStyle: "italic", margin: "0 0 32px", letterSpacing: "0.02em" }}>
        Filtros
      </h2>

      {searchQuery && (
        <div style={{ marginBottom: "24px", padding: "12px", background: "#fafafa", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#666" }}>
            &ldquo;{searchQuery}&rdquo;
          </span>
          <Link href="/shop" style={{ color: "#aaa", textDecoration: "none", display: "flex", alignItems: "center" }} className="hover:text-black transition-colors">
            <X size={12} strokeWidth={1} />
          </Link>
        </div>
      )}

      <div style={{ marginBottom: "40px" }}>
        <h3 style={{ fontSize: "8px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#999", margin: "0 0 20px" }}>Colección</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {CATEGORIAS.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              style={{ 
                background: "none", border: "none", textAlign: "left", padding: 0, 
                fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer", 
                color: activeCategory === cat.id ? "#000" : "#aaa", 
                fontWeight: activeCategory === cat.id ? 500 : 300, 
                transition: "color 0.3s" 
              }}
              className="hover:text-black"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h3 style={{ fontSize: "8px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#999", margin: "0 0 20px" }}>Talla</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {TALLAS.map((t) => (
            <button key={t} onClick={() => setActiveSize(activeSize === t ? null : t)}
              style={{ 
                width: "36px", height: "36px", borderRadius: "50%",
                border: activeSize === t ? "1px solid #000" : "1px solid #eee", 
                background: activeSize === t ? "#000" : "transparent", 
                color: activeSize === t ? "#fff" : "#888", 
                fontSize: "9px", cursor: "pointer", transition: "all 0.3s ease" 
              }}
              className="hover:border-black hover:text-black"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {colorOptions.length > 1 && (
        <div style={{ marginBottom: "40px" }}>
          <h3 style={{ fontSize: "8px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#999", margin: "0 0 20px" }}>Color</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {colorOptions.map((c) => (
              <button key={c} className={`cat-swatch ${activeColor === c ? "on" : ""}`} onClick={() => setActiveColor(activeColor === c ? null : c)} aria-label={`Filtrar por color ${c}`} aria-pressed={activeColor === c}>
                <span style={{ background: c }} />
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginBottom: "40px" }}>
        <h3 style={{ fontSize: "8px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#999", margin: "0 0 20px" }}>Precio máximo</h3>
        <input type="range" min={100000} max={2000000} step={50000} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
          style={{ width: "100%", accentColor: "#000", height: "1px", background: "#eee", WebkitAppearance: "none" }} className="minimal-range" />
        <p style={{ fontSize: "10px", fontFamily: "var(--font-serif)", color: "#555", margin: "12px 0 0" }}>{formatPrice(maxPrice)}</p>
      </div>

      <button
        onClick={() => { setActiveCategory("todo"); setActiveSize(null); setActiveColor(null); setMaxPrice(2000000); }}
        style={{ background: "none", border: "none", borderBottom: "1px solid #000", padding: "0 0 4px 0", fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", color: "#000", transition: "opacity 0.3s" }}
        className="hover:opacity-50"
      >
        Limpiar Filtros
      </button>
    </div>
  );

  return (
    <div style={{ padding: "0 6vw clamp(64px, 8vw, 120px)" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── RESPONSIVE GRID ── */
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (min-width: 768px) {
          .cat-grid { grid-template-columns: repeat(3, 1fr); gap: 40px; }
        }
        @media (min-width: 1200px) {
          .cat-grid { grid-template-columns: repeat(3, 1fr); gap: 80px 40px; }
        }

        /* ── CHIPS MOVIL ── */
        .cat-chips { display: flex; gap: 8px; overflow-x: auto; margin: -24px -6vw 32px; padding: 0 6vw 4px; scrollbar-width: none; scroll-snap-type: x proximity; }
        .cat-chips::-webkit-scrollbar { display: none; }
        .cat-chip { flex: 0 0 auto; min-height: 40px; padding: 0 18px; border: 1px solid #e5e5e5; border-radius: 40px; background: #fff; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: #666; cursor: pointer; white-space: nowrap; transition: all 0.25s; scroll-snap-align: start; }
        .cat-chip.on { background: #000; border-color: #000; color: #fff; }
        .cat-chip.clear { border-style: dashed; color: #999; }
        .cat-chip-sep { flex: 0 0 1px; background: #e5e5e5; margin: 8px 4px; }
        .cat-swatch { flex: 0 0 40px; height: 40px; border: none; background: none; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .cat-swatch span { display: block; width: 20px; height: 20px; border-radius: 50%; border: 1px solid #ddd; transition: box-shadow 0.2s; }
        .cat-swatch.on span { box-shadow: 0 0 0 2px #fff, 0 0 0 3px #000; }
        @media (min-width: 768px) { .cat-chips { display: none; } }

        /* ── SIDEBAR ── */
        .cat-sidebar { display: none; }
        .cat-mobile-bar { display: flex; }
        @media (min-width: 768px) {
          .cat-sidebar { display: block; position: sticky; top: 120px; }
          .cat-mobile-bar { display: none; }
        }

        /* ── CUSTOM RANGE ── */
        .minimal-range::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 12px; height: 12px; background: #000; cursor: pointer; border-radius: 50%;
        }
      ` }} />

      {/* ── TOOLBAR ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0 32px", borderBottom: "1px solid #f0f0f0", marginBottom: "48px", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Mobile filter button */}
          <button className="cat-mobile-bar"
            onClick={() => setIsFilterOpen(true)}
            style={{ alignItems: "center", gap: "8px", background: "none", border: "1px solid #e0e0e0", padding: "8px 16px", fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", borderRadius: "40px" }}>
            <SlidersHorizontal size={10} />
            Filtros
          </button>
          <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", margin: 0 }}>
            <strong style={{ color: "#000", fontWeight: 400 }}>{filtered.length}</strong> piezas
            {searchQuery && <span> · &ldquo;{searchQuery}&rdquo;</span>}
          </p>
        </div>

        {/* Sort */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setShowSortMenu(!showSortMenu)}
            style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", color: "#555" }}>
            {SORT_OPTIONS.find(s => s.id === sortBy)?.label}
            <ChevronDown size={12} strokeWidth={1} />
          </button>
          {showSortMenu && (
            <div style={{ position: "absolute", right: 0, top: "calc(100% + 12px)", background: "#fff", zIndex: 20, minWidth: "200px", boxShadow: "0 20px 40px rgba(0,0,0,0.08)", padding: "8px 0" }}>
              {SORT_OPTIONS.map(opt => (
                <button key={opt.id} onClick={() => { setSortBy(opt.id); setShowSortMenu(false); }}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 24px", background: "none", border: "none", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", color: sortBy === opt.id ? "#000" : "#888", transition: "color 0.2s" }}
                  className="hover:text-black hover:bg-gray-50">
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── CHIPS RAPIDOS (movil) ── */}
      <div className="cat-chips" role="group" aria-label="Filtros rápidos">
        {CATEGORIAS.map((cat) => (
          <button key={cat.id} className={`cat-chip ${activeCategory === cat.id ? "on" : ""}`} onClick={() => setActiveCategory(cat.id)}>
            {cat.label}
          </button>
        ))}
        <span className="cat-chip-sep" />
        {TALLAS.map((t) => (
          <button key={t} className={`cat-chip ${activeSize === t ? "on" : ""}`} onClick={() => setActiveSize(activeSize === t ? null : t)} aria-pressed={activeSize === t}>
            {t}
          </button>
        ))}
        {colorOptions.length > 1 && (
          <>
            <span className="cat-chip-sep" />
            {colorOptions.map((c) => (
              <button key={c} className={`cat-swatch ${activeColor === c ? "on" : ""}`} onClick={() => setActiveColor(activeColor === c ? null : c)} aria-label={`Filtrar por color ${c}`} aria-pressed={activeColor === c}>
                <span style={{ background: c }} />
              </button>
            ))}
          </>
        )}
        {hasFilters && (
          <button className="cat-chip clear" onClick={resetFilters}>Limpiar</button>
        )}
      </div>

      {/* ── LAYOUT ── */}
      <div style={{ display: "flex", gap: "80px", alignItems: "flex-start" }}>

        <div className="cat-sidebar">
          <Sidebar />
        </div>

        <div style={{ flex: 1, minWidth: 0 }} ref={gridRef}>
          {visible.length === 0 ? (
            <div style={{ textAlign: "center", padding: "120px 0" }}>
              <p style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#bbb" }}>
                Sin resultados para esta selección
              </p>
              <button onClick={() => { setActiveCategory("todo"); setActiveSize(null); setActiveColor(null); setMaxPrice(2000000); }}
                style={{ marginTop: "32px", background: "none", borderBottom: "1px solid #000", padding: "0 0 4px 0", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", color: "#000" }}>
                Ver Colección Completa
              </button>
            </div>
          ) : (
            <>
              <div className="cat-grid">
                {visible.map((product) => {
                  const isWished = wishIds.includes(product.id);
                  return (
                    <div key={product.id} className="gsap-product-card" style={{ opacity: 0 }} onMouseEnter={e => handleHover(e, true)} onMouseLeave={e => handleHover(e, false)}>
                      <Link href={`/product/${product.slug}`} style={{ display: "block", position: "relative", aspectRatio: "2/3", overflow: "hidden", backgroundColor: "#fafafa" }}>
                        <Image 
                          src={product.img} 
                          alt={product.name} 
                          fill 
                          sizes="(max-width: 768px) 50vw, 33vw"
                          style={{ objectFit: "cover", objectPosition: "top center", transformOrigin: "center" }} 
                          className="gsap-product-img"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA}
                        />

                        {product.badge && (
                          <span style={{ position: "absolute", top: "16px", left: "16px", color: "#000", fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                            {product.badge}
                          </span>
                        )}

                        <button onClick={e => { 
                            e.preventDefault(); 
                            toggleWish(product.id); 
                            // Micro-interaction click
                            gsap.fromTo(e.currentTarget, { scale: 0.8 }, { scale: 1, duration: 0.8, ease: "elastic.out(1, 0.3)" });
                          }}
                          style={{ position: "absolute", top: "10px", right: "10px", background: "none", border: "none", cursor: "pointer", zIndex: 10, padding: "14px" }}>
                          <Heart size={16} fill={isWished ? "#000" : "none"} strokeWidth={1} color={isWished ? "#000" : "#555"} />
                        </button>

                        <div className="gsap-product-actions" style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px", opacity: 0, transform: "translateY(10px)" }}>
                          <button onClick={e => { 
                              e.preventDefault(); 
                              addItem({ productId: product.id, name: product.name, slug: product.slug, price: product.price, image: product.img, size: product.size[0] || "U", color: product.color || "#000000", quantity: 1 });
                            }}
                            style={{ width: "100%", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(4px)", color: "#000", border: "none", padding: "14px", fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", transition: "background 0.3s" }}
                            className="hover:bg-black hover:text-white"
                          >
                            Agregar al carrito
                          </button>
                        </div>
                      </Link>

                      <div style={{ paddingTop: "24px", textAlign: "center" }}>
                        <Link href={`/product/${product.slug}`} style={{ textDecoration: "none", color: "#000", display: "inline-block" }}>
                          <h3 style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 12px", fontWeight: 400, color: "#111" }}>
                            {product.name}
                          </h3>
                        </Link>
                        <div style={{ fontSize: "14px", fontFamily: "var(--font-serif)", color: "#555", fontStyle: "italic" }}>
                          {formatPrice(product.price)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ── LOAD MORE ── */}
              {hasMore && (
                <div style={{ textAlign: "center", marginTop: "clamp(48px, 8vw, 120px)" }}>
                  <button
                    onClick={() => setVisibleCount(v => v + PAGE_SIZE)}
                    style={{ background: "none", borderBottom: "1px solid #000", padding: "0 0 8px 0", fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", cursor: "pointer", color: "#000", transition: "opacity 0.3s" }}
                    className="hover:opacity-50"
                  >
                    Cargar más piezas
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
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.2)", backdropFilter: "blur(4px)", zIndex: 90 }} />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              style={{ position: "fixed", top: 0, left: 0, width: "85%", maxWidth: "340px", height: "100%", background: "#fff", zIndex: 100, padding: "40px 32px", overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "48px" }}>
                <span style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase" }}>Filtros</span>
                <button onClick={() => setIsFilterOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <X size={16} strokeWidth={1} />
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
