import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Category } from '@/db/schema';

type Props = {
  categories: Category[];
  sizes: { id: string; name: string }[];
  colors: { id: string; name: string; hexCode: string }[];
  searchParams: {
    category?: string;
    size?: string;
    color?: string;
  };
};

function buildParams(
  current: Record<string, string | undefined>,
  update: Record<string, string | undefined>
) {
  const params = new URLSearchParams();
  const merged = { ...current, ...update };
  Object.entries(merged).forEach(([k, v]) => {
    if (v) params.set(k, v);
  });
  return params.toString() ? `?${params.toString()}` : '';
}

export default function Filters({ categories, sizes, colors, searchParams }: Props) {
  const { category, size, color } = searchParams;

  return (
    <aside className="space-y-8">
      {/* Categorías */}
      <div>
        <h3 className="text-[10px] tracking-[0.3em] uppercase text-black/40 mb-3">
          Categoría
        </h3>
        <ul className="space-y-2">
          <li>
            <Link
              href={`/shop${buildParams(searchParams, { category: undefined })}`}
              className={cn(
                'text-sm font-light hover:opacity-60 transition-opacity',
                !category && 'font-normal border-b border-black pb-px'
              )}
            >
              Todas
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/shop${buildParams(searchParams, { category: cat.slug })}`}
                className={cn(
                  'text-sm font-light hover:opacity-60 transition-opacity',
                  category === cat.slug && 'font-normal border-b border-black pb-px'
                )}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tallas */}
      <div>
        <h3 className="text-[10px] tracking-[0.3em] uppercase text-black/40 mb-3">
          Talla
        </h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <Link
              key={s.id}
              href={`/shop${buildParams(searchParams, { size: size === s.id ? undefined : s.id })}`}
              className={cn(
                'w-10 h-10 flex items-center justify-center text-xs border transition-all duration-300',
                size === s.id
                  ? 'bg-black text-white border-black'
                  : 'border-black/20 hover:border-black'
              )}
            >
              {s.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Colores */}
      <div>
        <h3 className="text-[10px] tracking-[0.3em] uppercase text-black/40 mb-3">
          Color
        </h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((c) => (
            <Link
              key={c.id}
              href={`/shop${buildParams(searchParams, { color: color === c.id ? undefined : c.id })}`}
              title={c.name}
              aria-label={c.name}
              className={cn(
                'w-7 h-7 rounded-full border-2 transition-all duration-300',
                color === c.id ? 'border-black scale-110' : 'border-transparent hover:border-black/30'
              )}
              style={{ backgroundColor: c.hexCode }}
            />
          ))}
        </div>
      </div>

      {/* Limpiar filtros */}
      {(category || size || color) && (
        <Link
          href="/shop"
          className="text-[10px] tracking-[0.2em] uppercase text-black/40 hover:text-black transition-colors"
        >
          Limpiar filtros ×
        </Link>
      )}
    </aside>
  );
}

