'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, formatCurrency, getDiscountPercent } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import type { getProductBySlug } from '@/db/queries/products';

type Product = NonNullable<Awaited<ReturnType<typeof getProductBySlug>>>;

export default function ProductDetails({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const discount = getDiscountPercent(product.price, product.oldPrice);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.primaryImage,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
      slug: product.slug,
    });
  };

  const currentImage = product.images[selectedImage]?.url ?? product.primaryImage;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* ── Galería izquierda ─────────────────────────────────── */}
      <div className="relative">
        {/* Imagen principal */}
        <div className="sticky top-0 h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full"
            >
              <Image
                src={currentImage}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="50vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="absolute bottom-6 left-6 flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={img.url}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    'relative w-14 h-20 overflow-hidden border-2 transition-all duration-300',
                    selectedImage === i ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                  )}
                >
                  <Image src={img.url} alt="" fill className="object-cover" sizes="56px" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Info derecha ──────────────────────────────────────── */}
      <div className="px-8 md:px-16 py-24 md:py-32 flex flex-col justify-center">
        {product.categoryName && (
          <p className="text-[10px] tracking-[0.4em] uppercase text-black/40 mb-4">
            {product.categoryName}
          </p>
        )}

        <h1 className="font-serif text-4xl md:text-5xl font-normal mb-6 leading-tight">
          {product.name}
        </h1>

        {/* Precio */}
        <div className="flex items-baseline gap-3 mb-8">
          <span className="text-2xl font-light">{formatCurrency(product.price)}</span>
          {product.oldPrice && (
            <>
              <span className="text-base text-black/40 line-through">
                {formatCurrency(product.oldPrice)}
              </span>
              {discount && (
                <span className="text-xs tracking-widest bg-black text-white px-2 py-1">
                  -{discount}%
                </span>
              )}
            </>
          )}
        </div>

        <div className="w-12 h-px bg-black/20 mb-8" />

        {/* Descripción */}
        <p className="text-sm font-light leading-relaxed text-black/60 mb-10">
          {product.description}
        </p>

        {/* Colores */}
        {product.colors.length > 0 && (
          <div className="mb-6">
            <p className="text-[10px] tracking-[0.3em] uppercase text-black/40 mb-3">
              Color{selectedColor ? `: ${product.colors.find(c => c.id === selectedColor)?.name}` : ''}
            </p>
            <div className="flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedColor(c.id)}
                  title={c.name}
                  className={cn(
                    'w-8 h-8 rounded-full border-2 transition-all duration-300',
                    selectedColor === c.id ? 'border-black scale-110' : 'border-transparent hover:border-black/30'
                  )}
                  style={{ backgroundColor: c.hexCode }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tallas */}
        {product.sizes.length > 0 && (
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.3em] uppercase text-black/40 mb-3">
              Talla
            </p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSize(s.id)}
                  className={cn(
                    'w-12 h-12 text-xs border transition-all duration-300',
                    selectedSize === s.id
                      ? 'bg-black text-white border-black'
                      : 'border-black/20 hover:border-black'
                  )}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={handleAddToCart}
          disabled={!selectedSize || !selectedColor}
          className={cn(
            'w-full py-4 text-[11px] tracking-[0.3em] uppercase transition-all duration-500',
            selectedSize && selectedColor
              ? 'bg-black text-white hover:bg-black/80'
              : 'bg-black/10 text-black/30 cursor-not-allowed'
          )}
        >
          {!selectedSize || !selectedColor
            ? 'Selecciona talla y color'
            : 'Añadir a la selección'}
        </button>

        {/* Stock */}
        {product.stock < 5 && product.stock > 0 && (
          <p className="text-center text-[10px] tracking-widest uppercase text-black/40 mt-3">
            Últimas {product.stock} unidades
          </p>
        )}
        {product.stock === 0 && (
          <p className="text-center text-[10px] tracking-widest uppercase text-red-500 mt-3">
            Agotado
          </p>
        )}
      </div>
    </div>
  );
}

