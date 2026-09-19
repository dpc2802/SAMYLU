import { db } from '@/db';
import { products, productImages, categories, sizes, colors, productSizes, productColors } from '@/db/schema';
import { eq, and, inArray } from 'drizzle-orm';

const FALLBACK_IMAGE = '/images/placeholder-fashion.webp';

// ─────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────
export type ProductWithImages = {
  id: string;
  name: string;
  slug: string;
  price: string;
  oldPrice: string | null;
  stock: number;
  isFeatured: boolean;
  categoryName: string | null;
  primaryImage: string;
  hoverImage: string | null;
  images: { url: string; altText: string | null; displayOrder: number }[];
};

// ─────────────────────────────────────────────
// GET PRODUCTS (catálogo con filtros server-side)
// Usa leftJoin → NUNCA falla si no hay imagen
// ─────────────────────────────────────────────
export async function getProducts(filters?: {
  categorySlug?: string;
  sizeId?: string;
  colorId?: string;
  featured?: boolean;
}): Promise<ProductWithImages[]> {
  // 1. Obtener productos con categoría (leftJoin para que no falle si categoryId es null)
  const rows = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      price: products.price,
      oldPrice: products.oldPrice,
      stock: products.stock,
      isFeatured: products.isFeatured,
      categoryName: categories.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(
      filters?.featured !== undefined
        ? eq(products.isFeatured, filters.featured)
        : undefined
    );

  if (rows.length === 0) return [];

  const productIds = rows.map((r) => r.id);

  // 2. Obtener TODAS las imágenes de estos productos en una sola query
  const images = await db
    .select()
    .from(productImages)
    .where(inArray(productImages.productId, productIds));

  // 3. Mapear → fallback defensivo para que JAMÁS sea undefined
  return rows.map((product) => {
    const productImgs = images
      .filter((img) => img.productId === product.id)
      .sort((a, b) => a.displayOrder - b.displayOrder);

    const primaryImg = productImgs.find((img) => img.isPrimary);
    const hoverImg = productImgs.find(
      (img) => !img.isPrimary && img.displayOrder === 1
    );

    return {
      ...product,
      // Fallback doble: primero isPrimary, luego primer elemento, luego placeholder
      primaryImage: primaryImg?.url ?? productImgs[0]?.url ?? FALLBACK_IMAGE,
      hoverImage: hoverImg?.url ?? null,
      images: productImgs.map((img) => ({
        url: img.url,
        altText: img.altText,
        displayOrder: img.displayOrder,
      })),
    };
  });
}

// ─────────────────────────────────────────────
// GET PRODUCT BY SLUG (PDP - Product Detail Page)
// ─────────────────────────────────────────────
export async function getProductBySlug(slug: string) {
  const [product] = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      description: products.description,
      price: products.price,
      oldPrice: products.oldPrice,
      stock: products.stock,
      isFeatured: products.isFeatured,
      categoryId: products.categoryId,
      categoryName: categories.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.slug, slug))
    .limit(1);

  if (!product) return null;

  // Cargar imágenes, tallas y colores en paralelo
  const [imgs, sizesData, colorsData] = await Promise.all([
    db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, product.id))
      .orderBy(productImages.displayOrder),
    db
      .select({ id: sizes.id, name: sizes.name, sortOrder: sizes.sortOrder })
      .from(sizes)
      .innerJoin(productSizes, eq(sizes.id, productSizes.sizeId))
      .where(eq(productSizes.productId, product.id))
      .orderBy(sizes.sortOrder),
    db
      .select({ id: colors.id, name: colors.name, hexCode: colors.hexCode })
      .from(colors)
      .innerJoin(productColors, eq(colors.id, productColors.colorId))
      .where(eq(productColors.productId, product.id)),
  ]);

  const primaryImg = imgs.find((i) => i.isPrimary);

  return {
    ...product,
    primaryImage: primaryImg?.url ?? imgs[0]?.url ?? FALLBACK_IMAGE,
    images: imgs,
    sizes: sizesData,
    colors: colorsData,
  };
}

// ─────────────────────────────────────────────
// GET FEATURED PRODUCTS (para la Home)
// ─────────────────────────────────────────────
export async function getFeaturedProducts() {
  return getProducts({ featured: true });
}

// ─────────────────────────────────────────────
// GET CATEGORIES
// ─────────────────────────────────────────────
export async function getCategories() {
  return db.select().from(categories).orderBy(categories.name);
}

