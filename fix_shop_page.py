# -*- coding: utf-8 -*-
import os

CONTENT = '''import StaticCatalog from "@/components/shop/StaticCatalog";
import { getLiveProducts } from "@/db/queries/products";
import { Suspense } from "react";

export default async function ShopPage() {
  const liveProducts = await getLiveProducts();
  
  return (
    <div style={{ paddingTop: "130px", minHeight: "100vh" }}>

      {/* ── HEADER EDITORIAL ── */}
      <div style={{ paddingLeft: "6vw", paddingRight: "6vw", marginBottom: "40px", borderBottom: "1px solid #f0f0f0", paddingBottom: "32px" }}>
        <p style={{ fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", color: "#bbb", margin: "0 0 14px" }}>
          Alta Costura &amp; Ready to Wear
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 300, fontStyle: "italic", letterSpacing: "0.02em", margin: 0, color: "#000", lineHeight: 1 }}>
          Colección
        </h1>
      </div>

      <Suspense fallback={<div style={{ padding: "60px", textAlign: "center", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa" }}>Cargando...</div>}>
        <StaticCatalog products={liveProducts} />
      </Suspense>
    </div>
  );
}
'''

with open("src/app/(storefront)/shop/page.tsx", "w", encoding="utf-8") as f:
    f.write(CONTENT)
