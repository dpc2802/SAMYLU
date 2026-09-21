import StaticCatalog from "@/components/shop/StaticCatalog";
import { getLiveProducts } from "@/db/queries/products";
import { Suspense } from "react";

export default async function ShopPage() {
  const liveProducts = await getLiveProducts();
  
  return (
    <div style={{ paddingTop: "140px", minHeight: "100vh" }}>
      <div style={{ paddingLeft: "6vw", paddingRight: "6vw", marginBottom: "56px" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3.5rem, 7vw, 6.5rem)", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 0.92, margin: 0, color: "#000" }}>
          <span style={{ fontStyle: "italic", fontWeight: 300 }}>La </span>
          <span style={{ fontStyle: "normal", fontWeight: 700, letterSpacing: "0.08em" }}>COLECCIÓN</span>
        </h1>
        <div style={{ width: "48px", height: "1px", background: "#000", marginTop: "28px", opacity: 0.3 }} />
      </div>

      <Suspense fallback={<div style={{ padding: "60px", textAlign: "center", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa" }}>Cargando...</div>}>
        <StaticCatalog products={liveProducts} />
      </Suspense>
    </div>
  );
}
