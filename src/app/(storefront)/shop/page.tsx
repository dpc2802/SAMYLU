import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import StaticCatalog from "@/components/shop/StaticCatalog";

export const metadata: Metadata = {
  title: `Catálogo Oficial | ${SITE_NAME}`,
  description: "Explora nuestra colección completa de moda femenina de alta costura.",
};

export default function ShopPage() {
  return (
    <div style={{ paddingTop: "140px", backgroundColor: "#ffffff", minHeight: "100vh" }}>
      {/* Encabezado del Catálogo */}
      <div style={{ paddingLeft: "6vw", paddingRight: "6vw", paddingBottom: "4rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, color: "#000", margin: 0, lineHeight: 1.1 }}>
          La Colección
        </h1>
        <p style={{ marginTop: "16px", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#666" }}>
          Alta Costura & Ready-to-Wear
        </p>
      </div>

      {/* Contenedor del Catálogo Dividido */}
      <div style={{ paddingLeft: "6vw", paddingRight: "6vw", paddingBottom: "6rem", maxWidth: "1600px", margin: "0 auto" }}>
        <StaticCatalog />
      </div>
    </div>
  );
}
