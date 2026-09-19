import { cn } from '@/lib/utils';
import ProductCard from './ProductCard';
import type { ProductWithImages } from '@/db/queries/products';

type Props = {
  products: ProductWithImages[];
  lookbook?: boolean; // Activa el layout asimétrico editorial
};

export default function ProductGrid({ products, lookbook = false }: Props) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <p className="text-sm tracking-[0.2em] uppercase text-black/30">
          No encontramos prendas con estos filtros
        </p>
      </div>
    );
  }

  if (lookbook && products.length >= 3) {
    // ─── Layout Lookbook Asimétrico (Editorial / Vogue)
    // Patrón: Grande | Dos pequeñas apiladas | Grande | Dos pequeñas...
    const chunks: ProductWithImages[][] = [];
    let i = 0;
    while (i < products.length) {
      if (chunks.length % 2 === 0) {
        // Bloque A: 1 grande + 2 pequeñas
        chunks.push(products.slice(i, i + 3));
        i += 3;
      } else {
        // Bloque B: 2 pequeñas + 1 grande (invertido)
        chunks.push(products.slice(i, i + 3));
        i += 3;
      }
    }

    return (
      <div className="space-y-px">
        {chunks.map((chunk, ci) => {
          if (chunk.length === 1) {
            return (
              <div key={ci} className="grid grid-cols-2 md:grid-cols-3 gap-px">
                <div className="col-span-2 md:col-span-2">
                  <ProductCard product={chunk[0]} priority={ci === 0} />
                </div>
              </div>
            );
          }

          const isEven = ci % 2 === 0;
          const [bigProduct, small1, small2] = chunk;

          return (
            <div key={ci} className={cn('grid gap-px', 'grid-cols-2 md:grid-cols-3')}>
              {/* Producto grande */}
              <div className={cn('col-span-1 md:col-span-2', !isEven && 'md:order-last')}>
                <div className="h-full">
                  <ProductCard product={bigProduct} priority={ci === 0} />
                </div>
              </div>

              {/* Dos productos pequeños apilados */}
              <div className="col-span-1 grid grid-rows-2 gap-px">
                {small1 && <ProductCard product={small1} priority={false} />}
                {small2 && <ProductCard product={small2} priority={false} />}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // ─── Grid estándar (catálogo completo)
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < 4} />
      ))}
    </div>
  );
}

