# -*- coding: utf-8 -*-
import os

PAGE = '''import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";
import { getLiveProductBySlug, getLiveProducts } from "@/db/queries/products";

const getProduct = cache(getLiveProductBySlug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Pieza no encontrada" };

  const description = (product.description || "").slice(0, 155) || `${product.name} - Samylú by Martha Cepeda`;
  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      images: product.images[0] ? [product.images[0]] : undefined,
    },
  };
}

export default async function ProductPageServer({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // "Completa el look": otras piezas activas, priorizando la misma categoria
  const all = await getLiveProducts();
  const related = all
    .filter((p) => p.slug !== slug)
    .sort((a, b) => Number(b.type === product.type) - Number(a.type === product.type))
    .slice(0, 4)
    .map((p) => ({ id: p.id, name: p.name, slug: p.slug, price: p.price, img: p.img }));

  return <ProductClient initialProduct={product} related={related} />;
}
'''

CLIENT = '''"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ShoppingBag, Heart, Ruler, Plus, Minus, Truck, X } from "lucide-react";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(price);
};

// Medidas de referencia en cm (confirmar con el atelier)
const SIZE_GUIDE = [
  { size: "XS", bust: "82", waist: "62", hip: "88" },
  { size: "S", bust: "86", waist: "66", hip: "92" },
  { size: "M", bust: "90", waist: "70", hip: "96" },
  { size: "L", bust: "94", waist: "74", hip: "100" },
  { size: "XL", bust: "98", waist: "78", hip: "104" },
];

type Related = { id: string; name: string; slug: string; price: number; img: string };

export default function ProductClient({ initialProduct: product, related = [] }: { initialProduct: any; related?: Related[] }) {
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>("detalles");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const wishIds = useWishlistStore((s) => s.ids);
  const toggleWish = useWishlistStore((s) => s.toggle);

  useEffect(() => { setMounted(true); }, []);

  const isWished = mounted && wishIds.includes(product.id);

  // Solo las fotos reales de la prenda
  const gallery: string[] = product.images && product.images.length > 0 ? product.images : ["/images/placeholder.jpg"];
  const hasMultiple = gallery.length > 1;

  const toggleAccordion = (id: string) => setOpenAccordion(openAccordion === id ? "" : id);

  const handleBuy = () => {
    if (!activeSize) {
      setSizeError(true);
      document.getElementById("tallas-section")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: gallery[0],
      size: activeSize,
      color: product.color,
      quantity: 1,
      slug: product.slug,
    });
    useCartStore.getState().openCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const buyLabel = added ? "Añadido a la bolsa" : "Añadir a la Bolsa";

  const nextImg = () => setCurrentIdx((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  const prevImg = () => setCurrentIdx((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  const WishButton = ({ size, style }: { size: number; style?: React.CSSProperties }) => (
    <button
      className="pdp-btn-white"
      style={style}
      onClick={() => toggleWish(product.id)}
      aria-label={isWished ? "Quitar de favoritos" : "Guardar en favoritos"}
      aria-pressed={isWished}
    >
      <Heart size={size} color="#000" fill={isWished ? "#000" : "none"} strokeWidth={1.2} />
    </button>
  );

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <style dangerouslySetInnerHTML={{__html: `
        .pdp-btn-black { background-color: #000; color: #fff; transition: background-color 0.4s; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 500; }
        .pdp-btn-black:hover { background-color: #333; }
        .pdp-btn-white { background-color: #fff; border: 1px solid #ddd; transition: border-color 0.4s; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .pdp-btn-white:hover { border-color: #000; }
        .pdp-size-btn { flex: 1; padding: 14px 0; font-size: 12px; cursor: pointer; transition: all 0.3s; border: 1px solid #eee; background: #fff; color: #666; }
        .pdp-size-btn:hover { border-color: #000; }
        .pdp-size-btn.active { border-color: #000; background: #000; color: #fff; }
        .pdp-sizes.error .pdp-size-btn { border-color: #c0392b; animation: pdp-shake 0.4s; }
        @keyframes pdp-shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }

        .pdp-accordion-content { overflow: hidden; transition: max-height 0.4s ease, opacity 0.4s ease; max-height: 0; opacity: 0; }
        .pdp-accordion-content.open { max-height: 250px; opacity: 1; }

        .pdp-wrapper {
          padding-top: 140px;
          padding-bottom: 80px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .slider-window { overflow: hidden; width: 100%; aspect-ratio: 3/4; position: relative; background: #f9f9f9; }
        .slider-track { display: flex; height: 100%; transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1); }
        .slider-slide { flex: 0 0 100%; width: 100%; height: 100%; position: relative; overflow: hidden; }

        .slider-nav-btn { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 44px; height: 44px; display: flex; justify-content: center; align-items: center; cursor: pointer; z-index: 10; opacity: 0; transition: opacity 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .slider-window:hover .slider-nav-btn { opacity: 1; }
        @media (max-width: 1023px) { .slider-nav-btn { opacity: 1; } }
        .slider-nav-left { left: 16px; }
        .slider-nav-right { right: 16px; }

        .pdp-dot { padding: 18px 6px; background: none; border: none; cursor: pointer; display: flex; }
        .pdp-dot span { display: block; width: 8px; height: 8px; border-radius: 50%; transition: all 0.3s; }

        .pdp-info-section { padding: 0 24px; }
        .pdp-mobile-bar { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); padding: 16px 24px; border-top: 1px solid #eee; display: flex; gap: 12px; z-index: 100; padding-bottom: calc(16px + env(safe-area-inset-bottom)); }
        .pdp-desktop-buy { display: none; }

        .pdp-look { padding: 0 6vw 140px; max-width: 1600px; margin: 0 auto; }
        .pdp-look-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }

        @media (min-width: 1024px) {
          .pdp-wrapper { padding-top: 160px; padding-left: 6vw; padding-right: 6vw; flex-direction: row; gap: 6vw; max-width: 1600px; margin: 0 auto; }
          .slider-container { flex: 1 1 500px; position: sticky; top: 120px; align-self: flex-start; }
          .slider-window { aspect-ratio: 4/5; cursor: zoom-in; }
          .pdp-info-section { flex: 1 1 400px; padding: 0; }
          .pdp-mobile-bar { display: none; }
          .pdp-desktop-buy { display: flex; gap: 16px; margin-bottom: 48px; }
          .pdp-look { padding-bottom: 120px; }
          .pdp-look-grid { grid-template-columns: repeat(4, 1fr); gap: 32px; }
        }
      `}} />

      <div className="pdp-wrapper">

        {/* Galeria */}
        <div className="slider-container">

          <div style={{ marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", padding: "0 24px" }}>
            <Link href="/" style={{ color: "#888", textDecoration: "none" }}>Inicio</Link>
            <ChevronRight size={10} />
            <Link href="/shop" style={{ color: "#888", textDecoration: "none" }}>Tienda</Link>
            <ChevronRight size={10} />
            <span style={{ color: "#000" }}>{product.name}</span>
          </div>

          <div className="slider-window" onPointerMove={onPointerMove} onPointerLeave={() => setZoom(null)}>
            <div className="slider-track" style={{ transform: `translateX(-${currentIdx * 100}%)` }}>
              {gallery.map((img, idx) => (
                <div key={idx} className="slider-slide">
                  <Image
                    src={img}
                    alt={hasMultiple ? `${product.name} - Foto ${idx + 1}` : product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center top",
                      transform: zoom && idx === currentIdx ? "scale(1.9)" : "scale(1)",
                      transformOrigin: zoom ? `${zoom.x}% ${zoom.y}%` : "center",
                      transition: zoom ? "transform 0.25s ease-out" : "transform 0.6s ease",
                    }}
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>

            {hasMultiple && (
              <>
                <button className="slider-nav-btn slider-nav-left" onClick={prevImg} aria-label="Foto anterior">
                  <ChevronLeft size={20} color="#000" />
                </button>
                <button className="slider-nav-btn slider-nav-right" onClick={nextImg} aria-label="Foto siguiente">
                  <ChevronRight size={20} color="#000" />
                </button>

                <div style={{ position: "absolute", bottom: "6px", left: "50%", transform: "translateX(-50%)", display: "flex", zIndex: 10 }}>
                  {gallery.map((_, idx) => (
                    <button key={idx} className="pdp-dot" onClick={() => setCurrentIdx(idx)} aria-label={`Ver foto ${idx + 1}`}>
                      <span style={{ backgroundColor: idx === currentIdx ? "#000" : "rgba(0,0,0,0.25)" }} />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Informacion */}
        <div className="pdp-info-section">

          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 400, color: "#000", margin: "0 0 12px 0", lineHeight: 1.1 }}>
            {product.name}
          </h1>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.2rem, 4vw, 1.5rem)", color: "#444", margin: "0 0 32px 0", fontStyle: "italic" }}>
            {formatPrice(product.price)}
          </p>

          <div style={{ height: "1px", backgroundColor: "#E5E5E5", marginBottom: "32px", width: "100%" }} />

          {/* Tallas */}
          <div id="tallas-section" style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888" }}>Talla</span>
              <button onClick={() => setGuideOpen(true)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer", fontSize: "10px", color: "#000", letterSpacing: "0.1em", textDecoration: "underline", textTransform: "uppercase", padding: "10px 0" }}>
                <Ruler size={12} /> Guía de tallas
              </button>
            </div>
            <div className={`pdp-sizes ${sizeError ? "error" : ""}`} style={{ display: "flex", gap: "8px" }}>
              {(product.sizes && product.sizes.length > 0 ? product.sizes : ["XS", "S", "M", "L"]).map((size: string) => (
                <button
                  key={size}
                  className={`pdp-size-btn ${activeSize === size ? "active" : ""}`}
                  onClick={() => { setActiveSize(size); setSizeError(false); }}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && (
              <p role="alert" style={{ fontSize: "11px", color: "#c0392b", letterSpacing: "0.05em", margin: "12px 0 0" }}>
                Selecciona una talla para continuar.
              </p>
            )}
          </div>

          {/* Compra desktop */}
          <div className="pdp-desktop-buy">
            <button className="pdp-btn-black" onClick={handleBuy} style={{ flex: 1, padding: "20px" }}>
              <ShoppingBag size={16} /> {buyLabel}
            </button>
            <WishButton size={20} style={{ width: "64px" }} />
          </div>

          {/* Acordeones */}
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

      {/* Completa el look */}
      {related.length > 0 && (
        <section className="pdp-look">
          <p style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#aaa", margin: "0 0 12px", textAlign: "center" }}>
            También te puede gustar
          </p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 300, fontStyle: "italic", textAlign: "center", margin: "0 0 56px", color: "#000" }}>
            Completa el look
          </h2>
          <div className="pdp-look-grid">
            {related.map((r) => (
              <Link key={r.id} href={`/product/${r.slug}`} style={{ textDecoration: "none", color: "#000", display: "block" }}>
                <div style={{ position: "relative", aspectRatio: "2/3", overflow: "hidden", backgroundColor: "#fafafa" }}>
                  <Image src={r.img} alt={r.name} fill sizes="(max-width: 1024px) 50vw, 25vw" style={{ objectFit: "cover", objectPosition: "top center" }} />
                </div>
                <div style={{ paddingTop: "20px", textAlign: "center" }}>
                  <h3 style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 400, margin: "0 0 10px", color: "#111" }}>{r.name}</h3>
                  <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "14px", color: "#555" }}>{formatPrice(r.price)}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Barra inferior fija movil */}
      <div className="pdp-mobile-bar">
        <button className="pdp-btn-black" onClick={handleBuy} style={{ flex: 1, padding: "16px", borderRadius: "0" }}>
          {buyLabel}
        </button>
        <WishButton size={18} style={{ width: "50px", borderRadius: "0" }} />
      </div>

      {/* Guia de tallas */}
      <AnimatePresence>
        {guideOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setGuideOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Guía de tallas"
              style={{ background: "#fff", width: "100%", maxWidth: "520px", padding: "40px 32px", position: "relative", maxHeight: "90vh", overflowY: "auto" }}
            >
              <button onClick={() => setGuideOpen(false)} aria-label="Cerrar" style={{ position: "absolute", top: "8px", right: "8px", background: "none", border: "none", cursor: "pointer", padding: "12px" }}>
                <X size={20} strokeWidth={1} />
              </button>
              <p style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#aaa", margin: "0 0 12px" }}>Medidas en cm</p>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", fontWeight: 300, fontStyle: "italic", margin: "0 0 28px" }}>Guía de tallas</h2>

              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "center" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #000", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888" }}>
                    <th style={{ padding: "10px 0", fontWeight: 400 }}>Talla</th>
                    <th style={{ padding: "10px 0", fontWeight: 400 }}>Busto</th>
                    <th style={{ padding: "10px 0", fontWeight: 400 }}>Cintura</th>
                    <th style={{ padding: "10px 0", fontWeight: 400 }}>Cadera</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_GUIDE.map((row) => (
                    <tr key={row.size} style={{ borderBottom: "1px solid #eee", background: activeSize === row.size ? "#fafafa" : "transparent" }}>
                      <td style={{ padding: "14px 0", fontWeight: 500 }}>{row.size}</td>
                      <td style={{ color: "#555" }}>{row.bust}</td>
                      <td style={{ color: "#555" }}>{row.waist}</td>
                      <td style={{ color: "#555" }}>{row.hip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p style={{ fontSize: "12px", lineHeight: 1.7, color: "#777", margin: "24px 0 0" }}>
                Las medidas son de referencia. Si estás entre dos tallas o tu evento es especial, te asesoramos personalmente.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, necesito ayuda con la talla de ${product.name}`)}`}
                target="_blank"
                rel="noreferrer"
                style={{ display: "inline-block", marginTop: "16px", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#000", textDecoration: "none", borderBottom: "1px solid #000", paddingBottom: "4px" }}
              >
                Asesoría por WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
'''

base = "src/app/(storefront)/product/[slug]/"
with open(base + "page.tsx", "w", encoding="utf-8") as f:
    f.write(PAGE)
with open(base + "ProductClient.tsx", "w", encoding="utf-8") as f:
    f.write(CLIENT)
print("PDP rewritten")
