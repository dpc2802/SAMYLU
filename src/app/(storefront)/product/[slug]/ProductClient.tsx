"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft, ShoppingBag, Heart, Ruler, Plus, Minus, Truck } from "lucide-react";
import { useCartStore } from "@/lib/store";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(price);
};

export default function ProductClient({ initialProduct: product }: { initialProduct: any }) {
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string>("detalles");
  const addItem = useCartStore((state) => state.addItem);
  
  // Slider State
  const [currentIdx, setCurrentIdx] = useState(0);

  // Simulamos 3 ángulos de foto (actualmente repite la misma porque en BD solo hay 1)
  const gallery = product.images && product.images.length > 0 
    ? [product.images[0], product.images[0], product.images[0]] // Duplicamos para probar el slider
    : ["/images/placeholder.jpg"];

  const toggleAccordion = (id: string) => setOpenAccordion(openAccordion === id ? "" : id);

  const handleBuy = () => {
    if (!activeSize) {
      alert("Por favor, selecciona una talla antes de añadir al carrito.");
      document.getElementById('tallas-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images && product.images.length > 0 ? product.images[0] : "/images/placeholder.jpg",
        size: activeSize,
        color: product.color,
        quantity: 1,
        slug: product.slug
      });
    }
  };

  const nextImg = () => setCurrentIdx((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  const prevImg = () => setCurrentIdx((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <style dangerouslySetInnerHTML={{__html: `
        .pdp-btn-black { background-color: #000; color: #fff; transition: background-color 0.4s; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 500; }
        .pdp-btn-black:hover { background-color: #333; }
        .pdp-btn-white { background-color: #fff; border: 1px solid #ddd; transition: border-color 0.4s; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .pdp-btn-white:hover { border-color: #000; }
        .pdp-size-btn { flex: 1; padding: 14px 0; font-size: 12px; cursor: pointer; transition: all 0.3s; border: 1px solid #eee; background: #fff; color: #666; }
        .pdp-size-btn.active { border-color: #000; background: #000; color: #fff; }
        
        .pdp-accordion-content { overflow: hidden; transition: max-height 0.4s ease, opacity 0.4s ease; max-height: 0; opacity: 0; }
        .pdp-accordion-content.open { max-height: 250px; opacity: 1; }

        /* Contenedores Principales */
        .pdp-wrapper { 
          padding-top: 140px; /* Despeja el header principal */
          padding-bottom: 120px; 
          display: flex; 
          flex-direction: column; 
          gap: 40px; 
        }
        
        /* Slider nativo a prueba de fallos */
        .slider-window { overflow: hidden; width: 100%; aspect-ratio: 3/4; position: relative; background: #f9f9f9; }
        .slider-track { display: flex; height: 100%; transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1); }
        .slider-slide { flex: 0 0 100%; width: 100%; height: 100%; position: relative; }
        
        /* Controles de Slider */
        .slider-nav-btn { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 44px; height: 44px; display: flex; justify-content: center; align-items: center; cursor: pointer; z-index: 10; opacity: 0; transition: opacity 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .slider-window:hover .slider-nav-btn { opacity: 1; }
        /* Mostrar botones siempre en móvil para facilitar uso */
        @media (max-width: 1023px) { .slider-nav-btn { opacity: 1; width: 36px; height: 36px; } }
        
        .slider-nav-left { left: 16px; }
        .slider-nav-right { right: 16px; }

        .pdp-info-section { padding: 0 24px; }
        .pdp-mobile-bar { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); padding: 16px 24px; border-top: 1px solid #eee; display: flex; gap: 12px; z-index: 100; padding-bottom: calc(16px + env(safe-area-inset-bottom)); }
        .pdp-desktop-buy { display: none; }

        /* DESKTOP (Pantallas grandes) */
        @media (min-width: 1024px) {
          .pdp-wrapper { padding-top: 160px; padding-left: 6vw; padding-right: 6vw; flex-direction: row; gap: 6vw; max-width: 1600px; margin: 0 auto; }
          .slider-container { flex: 1 1 500px; position: sticky; top: 120px; }
          .slider-window { aspect-ratio: 4/5; }
          .pdp-info-section { flex: 1 1 400px; padding: 0; }
          .pdp-mobile-bar { display: none; }
          .pdp-desktop-buy { display: flex; gap: 16px; margin-bottom: 48px; }
        }
      `}} />

      <div className="pdp-wrapper">
        
        {/* Lado Izquierdo: Slider Fotográfico */}
        <div className="slider-container">
          
          {/* Migajas de Pan Integradas (No estorban) */}
          <div style={{ marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", padding: "0 24px" }} className="lg:px-0">
            <Link href="/" style={{ color: "#888", textDecoration: "none" }}>Inicio</Link>
            <ChevronRight size={10} />
            <Link href="/shop" style={{ color: "#888", textDecoration: "none" }}>Tienda</Link>
            <ChevronRight size={10} />
            <span style={{ color: "#000" }}>{product.name}</span>
          </div>

          <div className="slider-window group">
            <div className="slider-track" style={{ transform: `translateX(-${currentIdx * 100}%)` }}>
              {gallery.map((img, idx) => (
                <div key={idx} className="slider-slide">
                  <Image 
                    src={img} 
                    alt={`${product.name} - Ángulo ${idx + 1}`} 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    style={{ objectFit: "cover", objectPosition: "center top" }} 
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>

            {/* Controles Reales del Slider */}
            <button className="slider-nav-btn slider-nav-left" onClick={prevImg}>
              <ChevronLeft size={20} color="#000" />
            </button>
            <button className="slider-nav-btn slider-nav-right" onClick={nextImg}>
              <ChevronRight size={20} color="#000" />
            </button>

            {/* Dots */}
            <div style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px", zIndex: 10 }}>
              {gallery.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setCurrentIdx(idx)}
                  style={{ width: "8px", height: "8px", borderRadius: "50%", padding: 0, border: "none", cursor: "pointer", backgroundColor: idx === currentIdx ? "#000" : "rgba(0,0,0,0.2)", transition: "all 0.3s" }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Lado Derecho: Información */}
        <div className="pdp-info-section">
            
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 400, color: "#000", margin: "0 0 12px 0", lineHeight: 1.1 }}>
            {product.name}
          </h1>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.2rem, 4vw, 1.5rem)", color: "#444", margin: "0 0 32px 0", fontStyle: "italic" }}>
            {formatPrice(product.price)}
          </p>

          <div style={{ height: "1px", backgroundColor: "#E5E5E5", marginBottom: "32px", width: "100%" }} />

          {/* Selector de Tallas */}
          <div id="tallas-section" style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888" }}>Talla</span>
              <button style={{ display: "flex", alignItems: "center", gap: "4px", background: "none", border: "none", cursor: "pointer", fontSize: "10px", color: "#000", letterSpacing: "0.1em", textDecoration: "underline", textTransform: "uppercase" }}>
                <Ruler size={12} /> Guía
              </button>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {(product.sizes || ["XS", "S", "M", "L"]).map(size => (
                <button 
                  key={size} 
                  className={`pdp-size-btn ${activeSize === size ? 'active' : ''}`}
                  onClick={() => setActiveSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Botones de Compra Desktop */}
          <div className="pdp-desktop-buy">
            <button className="pdp-btn-black" onClick={handleBuy} style={{ flex: 1, padding: "20px" }}>
              <ShoppingBag size={16} /> Añadir a la Bolsa
            </button>
            <button className="pdp-btn-white" style={{ width: "64px" }}>
              <Heart size={20} color="#000" />
            </button>
          </div>

          {/* Acordeones de Detalles */}
          <div style={{ borderTop: "1px solid #eee" }}>
            
            <div style={{ borderBottom: "1px solid #eee" }}>
              <button onClick={() => toggleAccordion("detalles")} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0", background: "none", border: "none", cursor: "pointer", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#000" }}>
                Detalles del Diseño
                {openAccordion === "detalles" ? <Minus size={14} /> : <Plus size={14} />}
              </button>
              <div className={`pdp-accordion-content ${openAccordion === "detalles" ? "open" : ""}`}>
                <p style={{ fontSize: "13px", lineHeight: 1.8, color: "#666", paddingBottom: "24px", margin: 0 }}>
                  {product.description} Una pieza central que define el estándar de elegancia moderna.
                </p>
              </div>
            </div>

            <div style={{ borderBottom: "1px solid #eee" }}>
              <button onClick={() => toggleAccordion("composicion")} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0", background: "none", border: "none", cursor: "pointer", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#000" }}>
                Composición y Cuidados
                {openAccordion === "composicion" ? <Minus size={14} /> : <Plus size={14} />}
              </button>
              <div className={`pdp-accordion-content ${openAccordion === "composicion" ? "open" : ""}`}>
                <ul style={{ fontSize: "12px", lineHeight: 2, color: "#666", paddingBottom: "24px", margin: 0, paddingLeft: "16px" }}>
                  <li>Tela principal de alta gama importada.</li>
                  <li>Lavar en seco únicamente (Dry clean only).</li>
                  <li>No utilizar blanqueadores ni plancha directa.</li>
                </ul>
              </div>
            </div>

            <div style={{ borderBottom: "1px solid #eee" }}>
              <button onClick={() => toggleAccordion("envios")} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0", background: "none", border: "none", cursor: "pointer", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#000" }}>
                Envíos y Devoluciones
                {openAccordion === "envios" ? <Minus size={14} /> : <Plus size={14} />}
              </button>
              <div className={`pdp-accordion-content ${openAccordion === "envios" ? "open" : ""}`}>
                <div style={{ paddingBottom: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <Truck size={16} color="#666" style={{ marginTop: "2px" }} />
                    <p style={{ fontSize: "12px", lineHeight: 1.6, color: "#666", margin: 0 }}>
                      <strong style={{ color: "#000" }}>Envío Nacional:</strong> Gratis en pedidos superiores a $500k COP. Entrega 3-5 días.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Barra de Compra Inferior Fija MÓVIL */}
      <div className="pdp-mobile-bar">
        <button className="pdp-btn-black" onClick={handleBuy} style={{ flex: 1, padding: "16px", borderRadius: "0" }}>
          Añadir a la Bolsa
        </button>
        <button className="pdp-btn-white" style={{ width: "50px", borderRadius: "0" }}>
          <Heart size={18} color="#000" />
        </button>
      </div>
    </div>
  );
}
