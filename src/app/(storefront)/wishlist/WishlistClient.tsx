"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/lib/store";

type Item = { id: string; name: string; slug: string; price: number; img: string };

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(price);

export default function WishlistClient({ products }: { products: Item[] }) {
  const ids = useWishlistStore((s) => s.ids);
  const toggle = useWishlistStore((s) => s.toggle);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Solo piezas guardadas que siguen activas en la tienda
  const saved = mounted ? products.filter((p) => ids.includes(p.id)) : [];
  const empty = mounted && saved.length === 0;

  return (
    <div style={{ paddingTop: "180px", paddingBottom: "120px", minHeight: "100vh", paddingLeft: "6vw", paddingRight: "6vw" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .wish-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px 16px; }
        @media (min-width: 768px) { .wish-grid { grid-template-columns: repeat(3, 1fr); gap: 56px 40px; } }
        @media (min-width: 1200px) { .wish-grid { grid-template-columns: repeat(4, 1fr); } }
      ` }} />

      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <p style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#aaa", marginBottom: "20px" }}>
          Lista de Deseos
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, margin: 0, color: "#000" }}>
          Tus Favoritos
        </h1>
        {mounted && saved.length > 0 && (
          <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", margin: "20px 0 0" }}>
            {saved.length} {saved.length === 1 ? "pieza guardada" : "piezas guardadas"}
          </p>
        )}
      </div>

      {empty && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", textAlign: "center" }}>
          <Heart size={32} color="#ddd" strokeWidth={1} />
          <p style={{ fontSize: "12px", color: "#666", letterSpacing: "0.05em", margin: 0 }}>Aún no has guardado ninguna pieza.</p>
          <Link href="/shop" style={{ marginTop: "16px", display: "inline-block", background: "#000", color: "#fff", padding: "14px 32px", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", textDecoration: "none" }}>
            Explorar Colección
          </Link>
        </div>
      )}

      {saved.length > 0 && (
        <>
          <div className="wish-grid">
            <AnimatePresence>
              {saved.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div style={{ position: "relative" }}>
                    <Link href={`/product/${p.slug}`} style={{ display: "block", position: "relative", aspectRatio: "2/3", overflow: "hidden", backgroundColor: "#fafafa" }}>
                      <Image src={p.img} alt={p.name} fill sizes="(max-width: 768px) 50vw, 25vw" style={{ objectFit: "cover", objectPosition: "top center" }} />
                    </Link>
                    <button
                      onClick={() => toggle(p.id)}
                      aria-label={`Quitar ${p.name} de favoritos`}
                      style={{ position: "absolute", top: "10px", right: "10px", background: "none", border: "none", cursor: "pointer", padding: "14px", zIndex: 5 }}
                    >
                      <Heart size={16} fill="#000" strokeWidth={1} color="#000" />
                    </button>
                  </div>
                  <div style={{ paddingTop: "20px", textAlign: "center" }}>
                    <Link href={`/product/${p.slug}`} style={{ textDecoration: "none", color: "#111" }}>
                      <h3 style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 400, margin: "0 0 10px" }}>{p.name}</h3>
                    </Link>
                    <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "14px", color: "#555", marginBottom: "14px" }}>
                      {formatPrice(p.price)}
                    </div>
                    <Link href={`/product/${p.slug}`} style={{ display: "inline-block", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#000", textDecoration: "none", borderBottom: "1px solid #000", paddingBottom: "4px" }}>
                      Elegir talla
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div style={{ textAlign: "center", marginTop: "96px" }}>
            <Link href="/shop" style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#888", textDecoration: "none" }}>
              Seguir explorando
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
