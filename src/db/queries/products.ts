import { db } from "../index";
import { products, productImages, categories, productVariants } from "../schema";
import { eq, desc } from "drizzle-orm";

export async function getLiveProducts() {
  const allProducts = await db.query.products.findMany({
    where: eq(products.isActive, true),
    orderBy: [desc(products.createdAt)],
    with: {
      images: {
        where: eq(productImages.isPrimary, true),
        limit: 1,
      },
      category: true,
      variants: true,
    }
  });

  return allProducts.map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: Number(p.basePrice),
    color: p.variants.length > 0 ? p.variants[0].color : "#000000",
    size: [...new Set(p.variants.map(v => v.size))],
    category: p.category?.name || "Sin Categoría",
    type: p.category?.slug || "vestidos",
    img: p.images.length > 0 ? p.images[0].url : "/images/placeholder.jpg",
    description: p.description,
    badge: p.isFeatured ? "DESTACADO" : undefined,
    isFeatured: p.isFeatured,
  }));
}

export async function getLiveProductBySlug(slug: string) {
  const product = await db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: {
      images: {
        orderBy: [desc(productImages.displayOrder)],
      },
      category: true,
      variants: true,
    }
  });

  if (!product) return null;

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: Number(product.basePrice),
    color: product.variants.length > 0 ? product.variants[0].color : "#000000",
    sizes: [...new Set(product.variants.map(v => v.size))],
    category: product.category?.name || "Sin Categoría",
    type: product.category?.slug || "vestidos",
    images: product.images.length > 0 ? product.images.map(img => img.url) : ["/images/placeholder.jpg"],
    description: product.description,
    badge: product.isFeatured ? "DESTACADO" : undefined,
    variants: product.variants.map(v => ({
      id: v.id,
      sku: v.sku,
      size: v.size,
      stock: v.stock,
      priceOverride: v.priceOverride ? Number(v.priceOverride) : null
    }))
  };
}
