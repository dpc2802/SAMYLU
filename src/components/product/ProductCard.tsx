'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn, formatCurrency, getDiscountPercent } from '@/lib/utils';
import { useWishlistStore } from '@/lib/store';
import type { ProductWithImages } from '@/db/queries/products';

type Props = {
  product: ProductWithImages;
  priority?: boolean;
};

export default function ProductCard({ product, priority = false }: Props) {
  const [hovered, setHovered] = useState(false);
  const { toggle, has } = useWishlistStore();
  const inWishlist = has(product.id);
  const discount = getDiscountPercent(product.price, product.oldPrice);

  return (
    <article className="group relative">
      {/* Imagen con hover effect */}
      <Link
        href={`/product/${product.slug}`}
        className="block relative overflow-hidden bg-[#f5f5f5] aspect-[3/4]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Imagen Principal */}
        <Image
          src={product.primaryImage}
          alt={product.name}
          fill
          priority={priority}
          className={cn(
            'object-cover transition-all duration-700',
            hovered && product.hoverImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          )}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Imagen Hover (segunda pose de la modelo) */}
        {product.hoverImage && (
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={product.hoverImage}
                  alt={`${product.name} — vista alterna`}
                  fill
                  className="object-cover scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Badge descuento */}
        {discount && (
          <span className="absolute top-3 left-3 text-[10px] tracking-widest bg-black text-white px-2 py-1 uppercase">
            -{discount}%
          </span>
        )}

        {/* Botón agregar al carrito — aparece en hover */}
        <motion.div
          initial={false}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 bg-black/90 py-3 text-center"
        >
          <span className="text-white text-[10px] tracking-[0.3em] uppercase">
            Ver Prenda
          </span>
        </motion.div>
      </Link>

      {/* Info de producto */}
      <div className="pt-3 space-y-1">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            {product.categoryName && (
              <p className="text-[10px] tracking-[0.2em] uppercase text-black/40 mb-0.5">
                {product.categoryName}
              </p>
            )}
            <Link href={`/product/${product.slug}`}>
              <h3 className="text-sm font-light tracking-wide truncate hover:opacity-60 transition-opacity">
                {product.name}
              </h3>
            </Link>
          </div>

          {/* Wishlist */}
          <button
            onClick={() => toggle(product.id)}
            aria-label={inWishlist ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            className="ml-2 flex-shrink-0 hover:opacity-60 transition-opacity"
          >
            <Heart
              size={16}
              strokeWidth={1.5}
              className={cn(inWishlist && 'fill-black')}
            />
          </button>
        </div>

        {/* Precios */}
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-light">{formatCurrency(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-black/40 line-through">
              {formatCurrency(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

