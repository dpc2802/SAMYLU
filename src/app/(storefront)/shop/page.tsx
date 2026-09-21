import StaticCatalog from "@/components/shop/StaticCatalog";
import { getLiveProducts } from "@/db/queries/products";
import { Suspense } from "react";

export default async function ShopPage() {
  const liveProducts = await getLiveProducts();
  
  return (
    <div style={{ paddingTop: "140px", minHeight: "100vh" }}>
      <div style={{ paddingLeft: "6vw", paddingRight: "6vw", marginBottom: "48px" }}>
        <p style={{ fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase", color: "#aaa", marginBottom: "16px" }}>
          Colección 2026
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 0.95, margin: 0, color: "#000" }}>
          La Tienda
        </h1>
      </div>

      <Suspense fallback={<div style={{ padding: "60px", textAlign: "center", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa" }}>Cargando...</div>}>
        <StaticCatalog products={liveProducts} />
      </Suspense>
    </div>
  );
}
