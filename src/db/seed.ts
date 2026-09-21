import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { PRODUCTOS } from "../lib/mock-db";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  console.log("🌱 Iniciando migración de Mock DB a Neon...");

  const categoryNames = [...new Set(PRODUCTOS.map(p => p.type || "vestidos"))];
  console.log(`Creando ${categoryNames.length} categorías...`);
  
  const categoryMap = new Map();
  for (const catName of categoryNames) {
    const slug = catName.toLowerCase().replace(/\s+/g, '-');
    const [insertedCat] = await db.insert(schema.categories)
      .values({ name: catName, slug: slug })
      .returning();
    categoryMap.set(catName, insertedCat.id);
  }

  console.log(`Migrando ${PRODUCTOS.length} productos...`);
  for (const prod of PRODUCTOS) {
    const catName = prod.type || "vestidos";
    const catId = categoryMap.get(catName);
    
    const [insertedProd] = await db.insert(schema.products)
      .values({
        categoryId: catId,
        name: prod.name,
        slug: prod.slug,
        description: prod.description || "Una pieza central que define el estándar de elegancia moderna.",
        basePrice: prod.price.toString(),
        isFeatured: !!(prod.id.includes("feat")),
      })
      .returning();

    await db.insert(schema.productImages).values({
      productId: insertedProd.id,
      url: prod.img,
      isPrimary: true,
      displayOrder: 0
    });

    const sizes = prod.size || ["XS", "S", "M", "L"];
    for (const size of sizes) {
      await db.insert(schema.productVariants).values({
        productId: insertedProd.id,
        sku: `${prod.slug.toUpperCase()}-${size}`,
        size: size,
        color: prod.color,
        stock: 5,
      });
    }
  }

  console.log("✅ ¡Migración completada exitosamente!");
}

seed().catch(console.error);
