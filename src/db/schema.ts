import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  uuid,
  primaryKey,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// -----------------------------------------------------------------------------
// ENUMS (Tipos estrictos)
// -----------------------------------------------------------------------------
export const userRoleEnum = pgEnum('user_role', ['customer', 'admin']);
export const orderStatusEnum = pgEnum('order_status', ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled']);

// -----------------------------------------------------------------------------
// USUARIOS Y DIRECCIONES
// -----------------------------------------------------------------------------
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  role: userRoleEnum('role').default('customer').notNull(),
  passwordHash: text('password_hash'), // Nullable if using OAuth (Google/Apple)
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const addresses = pgTable('addresses', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  documentId: text('document_id'), // CC o NIT en Colombia
  street: text('street').notNull(),
  apartment: text('apartment'),
  city: text('city').notNull(),
  state: text('state').notNull(), // Departamento
  postalCode: text('postal_code'),
  phone: text('phone').notNull(),
  isDefaultShipping: boolean('is_default_shipping').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// -----------------------------------------------------------------------------
// CATÁLOGO: CATEGORÍAS Y PRODUCTOS
// -----------------------------------------------------------------------------
export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(), // "Alta Costura", "Ready-to-Wear"
  slug: text('slug').notNull().unique(),
  description: text('description'),
  image: text('image'), // Foto principal de la categoría
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  categoryId: uuid('category_id').references(() => categories.id, { onDelete: 'set null' }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  basePrice: decimal('base_price', { precision: 12, scale: 2 }).notNull(),
  compareAtPrice: decimal('compare_at_price', { precision: 12, scale: 2 }), // Precio anterior tachado
  isFeatured: boolean('is_featured').default(false).notNull(),
  isActive: boolean('is_active').default(true).notNull(), // Para ocultar sin borrar
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// -----------------------------------------------------------------------------
// IMÁGENES Y VARIANTES (INVENTARIO REAL)
// -----------------------------------------------------------------------------
export const productImages = pgTable('product_images', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  altText: text('alt_text'),
  isPrimary: boolean('is_primary').default(false).notNull(),
  displayOrder: integer('display_order').default(0).notNull(),
});

// En E-Commerce top, el stock no está en el "Vestido", está en la "Talla S, Color Rojo" del Vestido.
export const productVariants = pgTable('product_variants', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  sku: text('sku').notNull().unique(), // Código de barras / Ref única
  size: text('size').notNull(), // 'XS', 'S', 'M', 'L', 'Unique'
  color: text('color'), // Opcional, ej: 'Negro Zafiro'
  priceOverride: decimal('price_override', { precision: 12, scale: 2 }), // Si XL cuesta más
  stock: integer('stock').notNull().default(0),
  isActive: boolean('is_active').default(true).notNull(),
});

// -----------------------------------------------------------------------------
// PEDIDOS (CARRITO CONVERTIDO EN VENTA)
// -----------------------------------------------------------------------------
export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }), // Puede ser null si compra como invitado
  status: orderStatusEnum('status').default('pending').notNull(),
  totalAmount: decimal('total_amount', { precision: 12, scale: 2 }).notNull(),
  shippingAmount: decimal('shipping_amount', { precision: 12, scale: 2 }).default('0').notNull(),
  shippingAddressId: uuid('shipping_address_id').references(() => addresses.id),
  paymentIntentId: text('payment_intent_id'), // Stripe / Wompi ID
  trackingNumber: text('tracking_number'), // Guía de Coordinadora / Servientrega
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  variantId: uuid('variant_id').references(() => productVariants.id, { onDelete: 'set null' }),
  productNameSnapshot: text('product_name_snapshot').notNull(), // En caso de que el producto se borre
  sizeSnapshot: text('size_snapshot').notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: decimal('unit_price', { precision: 12, scale: 2 }).notNull(),
});

// -----------------------------------------------------------------------------
// RELACIONES DRIZZLE (Para consultas anidadas fáciles)
// -----------------------------------------------------------------------------
export const usersRelations = relations(users, ({ many }) => ({
  addresses: many(addresses),
  orders: many(orders),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
  images: many(productImages),
  variants: many(productVariants),
}));

export const productVariantsRelations = relations(productVariants, ({ one, many }) => ({
  product: one(products, { fields: [productVariants.productId], references: [products.id] }),
  orderItems: many(orderItems),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  address: one(addresses, { fields: [orders.shippingAddressId], references: [addresses.id] }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  variant: one(productVariants, { fields: [orderItems.variantId], references: [productVariants.id] }),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, { fields: [productImages.productId], references: [products.id] }),
}));
