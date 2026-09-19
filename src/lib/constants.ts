export const SITE_NAME = 'Samylu By Martha Cepeda';
export const SITE_TAGLINE = 'Alta Costura · Ready-to-Wear';
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '573001234567';
export const WHATSAPP_MESSAGE = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ?? 'Hola, me interesa una prenda de Samylu By Martha Cepeda 💫';

export const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Tienda', href: '/shop' },
  { label: 'Colecciones', href: '/shop?featured=true' },
  { label: 'Nosotras', href: '/nosotras' },
  { label: 'Contacto', href: '/contacto' },
] as const;

export const SIZE_ORDER = ['XS', 'S', 'M', 'L', 'XL'] as const;

