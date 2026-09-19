import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Combina clsx + tailwind-merge para evitar conflictos de clases
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formatea precio en COP (pesos colombianos)
export function formatCurrency(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

// Descuento porcentual
export function getDiscountPercent(price: string, oldPrice: string | null): number | null {
  if (!oldPrice) return null;
  const p = parseFloat(price);
  const op = parseFloat(oldPrice);
  if (op <= p) return null;
  return Math.round(((op - p) / op) * 100);
}

