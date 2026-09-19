import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  uuid,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ─────────────────────────────────────────────
// CATEGORÍAS
// ─────────────────────────────────────────────
export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),             // "Ready-to-Wear", "Vestidos", "Alta Costura"
  slug: text('slug').notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─────────────────────────────────────────────
// PRODUCTOS
// ─────────────────────────────────────────────
export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  categoryId: uuid('category_id').references(() => categories.id, { onDelete: 'set null' }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  oldPrice: decimal('old_price', { precision: 10, scale: 2 }),    // Descuento tachado
  stock: integer('stock').notNull().default(0),
  isFeatured: boolean('is_featured').default(false).notNull(),    // Aparece en el Hero/Home
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─────────────────────────────────────────────
// IMÁGENES DE PRODUCTO
// Tabla separada → múltiples ángulos por prenda
// displayOrder: 0 = principal, 1 = hover, 2+ = galería
// ─────────────────────────────────────────────
export const productImages = pgTable('product_images', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  altText: text('alt_text'),
  isPrimary: boolean('is_primary').default(false).notNull(),
  displayOrder: integer('display_order').default(0).notNull(),
});

// ─────────────────────────────────────────────
// TALLAS
// ─────────────────────────────────────────────
export const sizes = pgTable('sizes', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),       // 'XS', 'S', 'M', 'L', 'Custom'
  sortOrder: integer('sort_order').notNull(),  // XS=1, S=2, M=3, L=4
});

// ─────────────────────────────────────────────
// COLORES
// ─────────────────────────────────────────────
export const colors = pgTable('colors', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),       // 'Negro Tinta', 'Blanco Puro', 'Gris Ceniza'
  hexCode: text('hex_code').notNull(), // '#000000', '#FFFFFF', '#9E9E9E'
});

// ─────────────────────────────────────────────
// TABLAS PUENTE (Muchos a Muchos)
// ─────────────────────────────────────────────
export const productSizes = pgTable(
  'product_sizes',
  {
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    sizeId: uuid('size_id')
      .notNull()
      .references(() => sizes.id, { onDelete: 'cascade' }),
  },
  (t) => ({ pk: primaryKey({ columns: [t.productId, t.sizeId] }) })
);

export const productColors = pgTable(
  'product_colors',
  {
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    colorId: uuid('color_id')
      .notNull()
      .references(() => colors.id, { onDelete: 'cascade' }),
  },
  (t) => ({ pk: primaryKey({ columns: [t.productId, t.colorId] }) })
);

// ─────────────────────────────────────────────
// RELACIONES DRIZZLE
// ─────────────────────────────────────────────
export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  images: many(productImages),
  sizes: many(productSizes),
  colors: many(productColors),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export const sizesRelations = relations(sizes, ({ many }) => ({
  products: many(productSizes),
}));

export const colorsRelations = relations(colors, ({ many }) => ({
  products: many(productColors),
}));

// ─────────────────────────────────────────────
// TIPOS INFERIDOS (TypeScript)
// ─────────────────────────────────────────────
export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type ProductImage = typeof productImages.$inferSelect;
export type Size = typeof sizes.$inferSelect;
export type Color = typeof colors.$inferSelect;

