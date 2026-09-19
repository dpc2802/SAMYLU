import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as dotenv from 'dotenv';
import * as schema from './schema';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  console.log('🌱 Iniciando seed...');

  // 1. Limpiar base de datos (por si acaso)
  console.log('🧹 Limpiando tablas...');
  await db.delete(schema.productColors);
  await db.delete(schema.productSizes);
  await db.delete(schema.productImages);
  await db.delete(schema.colors);
  await db.delete(schema.sizes);
  await db.delete(schema.products);
  await db.delete(schema.categories);

  // 2. Insertar Categorías
  console.log('📁 Creando categorías...');
  const [catReadyToWear, catVestidos, catAltaCostura] = await db.insert(schema.categories).values([
    { name: 'Ready-to-Wear', slug: 'ready-to-wear', description: 'Moda casual y elegante para el día a día.' },
    { name: 'Vestidos', slug: 'vestidos', description: 'Vestidos para cualquier ocasión.' },
    { name: 'Alta Costura', slug: 'alta-costura', description: 'Piezas exclusivas y de diseño avanzado.' },
  ]).returning();

  // 3. Insertar Tallas
  console.log('📏 Creando tallas...');
  const sizesData = await db.insert(schema.sizes).values([
    { name: 'XS', sortOrder: 1 },
    { name: 'S', sortOrder: 2 },
    { name: 'M', sortOrder: 3 },
    { name: 'L', sortOrder: 4 },
  ]).returning();

  // 4. Insertar Colores
  console.log('🎨 Creando colores...');
  const colorsData = await db.insert(schema.colors).values([
    { name: 'Negro Tinta', hexCode: '#000000' },
    { name: 'Blanco Puro', hexCode: '#FFFFFF' },
    { name: 'Rojo Pasión', hexCode: '#8B0000' },
    { name: 'Beige', hexCode: '#F5F5DC' },
  ]).returning();

  // 5. Insertar Productos
  console.log('👗 Creando productos...');
  const placeholderPrimary = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop';
  const placeholderSecondary = 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000&auto=format&fit=crop';

  const [p1, p2, p3] = await db.insert(schema.products).values([
    {
      categoryId: catAltaCostura.id,
      name: 'Chaqueta Corta Bomber',
      slug: 'chaqueta-corta-bomber',
      description: 'Bomber jacket en gamuza sintética con detalles de alta costura.',
      price: '185000',
      stock: 12,
      isFeatured: true,
    },
    {
      categoryId: catReadyToWear.id,
      name: 'Chaqueta Bolsillo Peluda',
      slug: 'chaqueta-bolsillo-peluda',
      description: 'Chaqueta suave con bolsillos texturizados, ideal para clima frío.',
      price: '189000',
      oldPrice: '250000',
      stock: 5,
      isFeatured: true,
    },
    {
      categoryId: catVestidos.id,
      name: 'Vestido Noir Elegance',
      slug: 'vestido-noir-elegance',
      description: 'Vestido negro clásico con un corte asimétrico moderno.',
      price: '320000',
      stock: 3,
      isFeatured: true,
    },
  ]).returning();

  // 6. Insertar Imágenes
  console.log('📸 Asignando imágenes...');
  await db.insert(schema.productImages).values([
    { productId: p1.id, url: placeholderPrimary, isPrimary: true, displayOrder: 0 },
    { productId: p1.id, url: placeholderSecondary, isPrimary: false, displayOrder: 1 },
    { productId: p2.id, url: placeholderPrimary, isPrimary: true, displayOrder: 0 },
    { productId: p2.id, url: placeholderSecondary, isPrimary: false, displayOrder: 1 },
    { productId: p3.id, url: placeholderPrimary, isPrimary: true, displayOrder: 0 },
    { productId: p3.id, url: placeholderSecondary, isPrimary: false, displayOrder: 1 },
  ]);

  // 7. Relacionar Tallas y Colores
  console.log('🔗 Relacionando variantes...');
  await db.insert(schema.productSizes).values([
    { productId: p1.id, sizeId: sizesData[0].id },
    { productId: p1.id, sizeId: sizesData[1].id },
    { productId: p2.id, sizeId: sizesData[2].id },
    { productId: p3.id, sizeId: sizesData[1].id },
    { productId: p3.id, sizeId: sizesData[2].id },
  ]);

  await db.insert(schema.productColors).values([
    { productId: p1.id, colorId: colorsData[0].id }, // Negro
    { productId: p2.id, colorId: colorsData[3].id }, // Beige
    { productId: p3.id, colorId: colorsData[0].id }, // Negro
    { productId: p3.id, colorId: colorsData[2].id }, // Rojo
  ]);

  console.log('✅ Seed completado con éxito!');
}

seed().catch((err) => {
  console.error('❌ Error en seed:', err);
  process.exit(1);
});

