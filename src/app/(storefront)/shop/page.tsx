import StaticCatalog from "@/components/shop/StaticCatalog";
import { getLiveProducts } from "@/db/queries/products";

export default async function ShopPage() {
  const liveProducts = await getLiveProducts();
  
  return (
    <div style={{ paddingTop: "140px", minHeight: "100vh" }}>
      <div style={{ paddingLeft: "6vw", paddingRight: "6vw", marginBottom: "2rem" }}>
        <h1 className="font-serif text-4xl md:text-5xl uppercase tracking-widest text-black mb-4">
          Catálogo Oficial
        </h1>
        <p className="text-xs uppercase tracking-[0.25em] text-black/50">
          En vivo desde la Base de Datos Neon
        </p>
      </div>

      {/* Inject Live Data into the Catalog Component */}
      <StaticCatalog products={liveProducts} />
    </div>
  );
}
