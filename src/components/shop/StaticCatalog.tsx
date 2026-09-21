"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronDown, ShoppingBag, X, SlidersHorizontal } from "lucide-react";

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

const CATEGORIAS = [
  { id: "todo", label: "Toda la Colección" },
  { id: "vestidos", label: "Vestidos" },
  { id: "conjuntos", label: "Conjuntos & Blusas" }
];

const COLORES = [
  { hex: "#000000", name: "Negro" }, 
  { hex: "#FFFFFF", name: "Blanco" }, 
  { hex: "#E1C699", name: "Dorado/Arena" }, 
  { hex: "#8B0000", name: "Rojo/Vino" }, 
  { hex: "#2F4F4F", name: "Verde/Azul Oscuro" }, 
  { hex: "#DDA0DD", name: "Rosa/Lila" }
];

const TALLAS = ["XS", "S", "M", "L"];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(price);
};

export default function StaticCatalog({ products: PRODUCTOS }: { products: ProductItem[] }) {
  // Mobile drawer state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("todo");
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [activeSize, setActiveSize] = useState<string | null>(null);

  useEffect(() => {
    // Read category from URL if present (e.g., ?categoria=vestidos)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("categoria");
      if (cat) {
        setActiveCategory(cat);
      }
    }
  }, []);
  const [maxPrice, setMaxPrice] = useState(800000);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [sortBy, setSortBy] = useState("destacados");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);
  
  // Estado para el menú de filtros en móvil
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (isMobileFiltersOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileFiltersOpen]);

  const filteredProducts = PRODUCTOS.filter(p => {
    const matchCategory = activeCategory === "todo" || p.type === activeCategory;
    const matchColor = activeColor === null || p.color === activeColor;
    const matchSize = activeSize === null || p.size?.includes(activeSize);
    const matchPrice = p.price <= maxPrice;
    return matchCategory && matchColor && matchSize && matchPrice;
  });

  let finalProducts = [...filteredProducts];
  if (sortBy === "precio-asc") finalProducts.sort((a, b) => a.price - b.price);
  else if (sortBy === "precio-desc") finalProducts.sort((a, b) => b.price - a.price);

  const visibleProducts = finalProducts.slice(0, visibleCount);
  const hasMore = visibleCount < finalProducts.length;

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); e.stopPropagation();
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (e: React.MouseEvent, name: string) => {
    e.preventDefault(); e.stopPropagation();
    alert(`¡${name} agregado al carrito!`);
  };

  const clearFilters = () => {
    setActiveCategory("todo"); setActiveColor(null); setActiveSize(null); setMaxPrice(800000); setSortBy("destacados");
  };

  const hasActiveFilters = activeCategory !== "todo" || activeColor !== null || activeSize !== null || maxPrice < 800000;

  // Renderizador de filtros para reutilizarlo en PC y Móvil
  const renderFilters = () => (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "40px", borderBottom: "1px solid #000", paddingBottom: "16px" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", margin: 0 }}>Filtros</h2>
        {hasActiveFilters && (
          <button onClick={clearFilters} style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
            Limpiar
          </button>
        )}
      </div>

      <div style={{ marginBottom: "48px" }}>
        <h3 style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "20px" }}>Colección</h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
          {CATEGORIAS.map(cat => (
            <li key={cat.id}>
              <button
                onClick={() => { setActiveCategory(cat.id); setIsMobileFiltersOpen(false); }}
                style={{ fontSize: "12px", color: activeCategory === cat.id ? "#000" : "#888", fontWeight: activeCategory === cat.id ? 500 : 300, transition: "color 0.3s", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}
              >
                <span>{cat.label}</span>
                {activeCategory === cat.id && <span style={{ fontSize: "10px" }}>—</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: "48px" }}>
        <h3 style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "20px" }}>Talla</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
          {TALLAS.map(size => (
            <button
              key={size}
              onClick={() => setActiveSize(activeSize === size ? null : size)}
              style={{ padding: "8px 0", fontSize: "11px", border: activeSize === size ? "1px solid #000" : "1px solid #eee", backgroundColor: activeSize === size ? "#000" : "#fff", color: activeSize === size ? "#fff" : "#666", cursor: "pointer" }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "48px" }}>
        <h3 style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "20px" }}>Precio Máximo</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <span style={{ fontSize: "12px", color: "#666" }}>{formatPrice(maxPrice)}</span>
        </div>
        <input type="range" min="200000" max="800000" step="50000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} style={{ width: "100%", cursor: "pointer", accentColor: "#000" }} />
      </div>

      <div style={{ marginBottom: "48px" }}>
        <h3 style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "20px" }}>Color</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          {COLORES.map((c, i) => (
            <button 
              key={i} 
              onClick={() => setActiveColor(activeColor === c.hex ? null : c.hex)}
              style={{ backgroundColor: c.hex, width: "24px", height: "24px", borderRadius: "50%", border: activeColor === c.hex ? "1px solid #000" : "1px solid #ddd", outline: activeColor === c.hex ? "1px solid #000" : "none", outlineOffset: "2px", cursor: "pointer", padding: 0 }}
              title={c.name}
            />
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div>
      <style dangerouslySetInnerHTML={{__html: `
        .catalog-container { display: flex; flex-direction: column; width: 100%; }
        .catalog-sidebar { display: none; }
        .mobile-filter-btn { display: flex; justify-content: center; align-items: center; gap: 8px; width: 100%; padding: 16px; margin-bottom: 32px; border: 1px solid #000; background: #fff; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; }
        .catalog-grid-wrapper { flex: 1; min-width: 0; }
        .catalog-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; row-gap: 40px; }
        
        .mobile-drawer { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: #fff; z-index: 9999; padding: 24px; padding-top: 80px; overflow-y: auto; transform: translateX(100%); transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1); }
        .mobile-drawer.open { transform: translateX(0); }
        .drawer-close-btn { position: absolute; top: 24px; right: 24px; background: none; border: none; cursor: pointer; }

        @media (min-width: 1024px) {
          .catalog-container { flex-direction: row; gap: 8vw; }
          .catalog-sidebar { display: block; width: 220px; flex-shrink: 0; }
          .mobile-filter-btn { display: none; }
          .catalog-sidebar-inner { position: sticky; top: 120px; max-height: calc(100vh - 140px); overflow-y: auto; padding-right: 16px; }
          .catalog-sidebar-inner::-webkit-scrollbar { width: 4px; }
          .catalog-sidebar-inner::-webkit-scrollbar-thumb { background: #eee; border-radius: 10px; }
          .catalog-grid { grid-template-columns: repeat(3, 1fr); gap: 32px; row-gap: 64px; }
        }
      `}} />

      {/* Cajón de Filtros Móvil */}
      <div className={`mobile-drawer ${isMobileFiltersOpen ? 'open' : ''}`}>
        <button className="drawer-close-btn" onClick={() => setIsMobileFiltersOpen(false)}>
          <X size={24} color="#000" />
        </button>
        {renderFilters()}
        <button onClick={() => setIsMobileFiltersOpen(false)} style={{ width: "100%", padding: "16px", backgroundColor: "#000", color: "#fff", border: "none", textTransform: "uppercase", fontSize: "10px", letterSpacing: "0.2em", marginTop: "24px" }}>
          Ver {finalProducts.length} Piezas
        </button>
      </div>

      <div className="catalog-container">
        
        {/* BOTÓN FILTROS MÓVIL */}
        <button className="mobile-filter-btn" onClick={() => setIsMobileFiltersOpen(true)}>
          <SlidersHorizontal size={14} /> Filtros {hasActiveFilters && "(Activos)"}
        </button>

        {/* SIDEBAR PC */}
        <aside className="catalog-sidebar">
          <div className="catalog-sidebar-inner">
            {renderFilters()}
          </div>
        </aside>

        {/* GRILLA */}
        <div className="catalog-grid-wrapper">
          
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px", paddingBottom: "16px", borderBottom: "1px solid #eee" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#666" }}>
                {finalProducts.length} Piezas Encontradas
              </span>
              
              <div style={{ position: "relative" }}>
                <button onClick={() => setIsSortOpen(!isSortOpen)} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", background: "none", border: "none", padding: 0 }}>
                  <span style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#000" }}>
                    <span className="hidden md:inline">Ordenar por: </span><span style={{ color: "#888" }}>{sortBy === 'precio-asc' ? 'Menor Precio' : sortBy === 'precio-desc' ? 'Mayor Precio' : 'Destacados'}</span>
                  </span>
                  <ChevronDown size={14} color="#888" />
                </button>
                
                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ position: "absolute", top: "100%", right: 0, marginTop: "16px", background: "#fff", border: "1px solid #eee", padding: "8px 0", zIndex: 50, minWidth: "160px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
                      <button onClick={() => {setSortBy('destacados'); setIsSortOpen(false);}} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 16px", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", background: sortBy === 'destacados' ? '#f5f5f5' : 'none', border: "none", cursor: "pointer" }}>Destacados</button>
                      <button onClick={() => {setSortBy('precio-asc'); setIsSortOpen(false);}} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 16px", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", background: sortBy === 'precio-asc' ? '#f5f5f5' : 'none', border: "none", cursor: "pointer" }}>Menor Precio</button>
                      <button onClick={() => {setSortBy('precio-desc'); setIsSortOpen(false);}} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 16px", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", background: sortBy === 'precio-desc' ? '#f5f5f5' : 'none', border: "none", cursor: "pointer" }}>Mayor Precio</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {hasActiveFilters && (
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                {activeCategory !== "todo" && (
                  <span style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em", padding: "6px 12px", border: "1px solid #ddd", borderRadius: "100px", display: "flex", alignItems: "center", gap: "6px" }}>
                    {CATEGORIAS.find(c => c.id === activeCategory)?.label}
                    <X size={10} style={{ cursor: "pointer" }} onClick={() => setActiveCategory("todo")} />
                  </span>
                )}
                {activeSize && (
                  <span style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em", padding: "6px 12px", border: "1px solid #ddd", borderRadius: "100px", display: "flex", alignItems: "center", gap: "6px" }}>
                    Talla: {activeSize}
                    <X size={10} style={{ cursor: "pointer" }} onClick={() => setActiveSize(null)} />
                  </span>
                )}
                {activeColor && (
                  <span style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em", padding: "6px 12px", border: "1px solid #ddd", borderRadius: "100px", display: "flex", alignItems: "center", gap: "6px" }}>
                    Color: {COLORES.find(c => c.hex === activeColor)?.name}
                    <X size={10} style={{ cursor: "pointer" }} onClick={() => setActiveColor(null)} />
                  </span>
                )}
              </div>
            )}
          </div>

          <motion.div layout className="catalog-grid">
            <AnimatePresence mode="popLayout">
              {visibleProducts.map((product) => (
                <motion.div key={product.id} layout initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.4 }} className="group">
                  <Link href={`/product/${product.slug}`} style={{ textDecoration: "none", display: "block" }}>
                    <div style={{ position: "relative", width: "100%", aspectRatio: "2/3", marginBottom: "12px", backgroundColor: "#F9F9F9", overflow: "hidden" }}>
                      <Image src={product.img} alt={product.name} fill sizes="(max-width: 768px) 50vw, 33vw" style={{ objectFit: "cover", objectPosition: "center top" }} className="transition-transform duration-1000 group-hover:scale-[1.03]" />
                      
                      {product.badge && (
                        <div style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: "#fff", padding: "4px 8px", fontSize: "7px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500, zIndex: 10 }}>
                          {product.badge}
                        </div>
                      )}

                      <button onClick={(e) => toggleLike(e, product.id)} className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300" style={{ position: "absolute", top: "12px", right: "12px", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", zIndex: 10 }}>
                        <Heart size={12} fill={liked[product.id] ? "#000" : "transparent"} color={liked[product.id] ? "#000" : "#333"} />
                      </button>

                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full lg:group-hover:translate-y-0 transition-transform duration-300 z-10 hidden lg:block">
                        <button onClick={(e) => handleAddToCart(e, product.name)} style={{ width: "100%", backgroundColor: "#000", color: "#fff", border: "none", padding: "12px", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                          <ShoppingBag size={14} /> Vista Rápida
                        </button>
                      </div>
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", textAlign: "left", padding: "0" }}>
                      <h3 style={{ fontSize: "10px", letterSpacing: "0.05em", textTransform: "uppercase", color: "#000", marginBottom: "4px", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.name}</h3>
                      <p style={{ fontFamily: "var(--font-serif)", fontSize: "12px", color: "#555", fontStyle: "italic", margin: 0 }}>{formatPrice(product.price)}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {hasMore && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}>
              <button onClick={() => setVisibleCount(prev => prev + 9)} style={{ padding: "14px 40px", backgroundColor: "transparent", border: "1px solid #000", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
                Cargar Más Piezas
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
