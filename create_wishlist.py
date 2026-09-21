# -*- coding: utf-8 -*-
WISHLIST = '''"use client";

import { useWishlistStore } from "@/lib/store";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { ids } = useWishlistStore();

  return (
    <div style={{ paddingTop: "180px", paddingBottom: "120px", minHeight: "100vh", paddingLeft: "6vw", paddingRight: "6vw", textAlign: "center" }}>
      <p style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#aaa", marginBottom: "20px" }}>
        Lista de Deseos
      </p>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, marginBottom: "60px", color: "#000" }}>
        Tus Favoritos
      </h1>

      {ids.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
          <Heart size={32} color="#ddd" strokeWidth={1} />
          <p style={{ fontSize: "12px", color: "#666", letterSpacing: "0.05em" }}>Aún no has guardado ninguna pieza.</p>
          <Link href="/shop" style={{ marginTop: "16px", display: "inline-block", background: "#000", color: "#fff", padding: "14px 32px", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", textDecoration: "none" }}>
            Explorar Colección
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
          <p style={{ fontSize: "12px", color: "#666", letterSpacing: "0.05em" }}>Tienes {ids.length} piezas guardadas. Visita la tienda para agregarlas al carrito.</p>
          <Link href="/shop" style={{ marginTop: "16px", display: "inline-block", background: "#000", color: "#fff", padding: "14px 32px", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", textDecoration: "none" }}>
            Volver a la Tienda
          </Link>
        </div>
      )}
    </div>
  );
}
'''

import os
os.makedirs("src/app/(storefront)/wishlist", exist_ok=True)
with open("src/app/(storefront)/wishlist/page.tsx", "w", encoding="utf-8") as f:
    f.write(WISHLIST)
print("Wishlist page created!")

