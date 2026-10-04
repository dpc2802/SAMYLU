import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Favoritos',
  description: 'Tus piezas favoritas de Samylú guardadas en un solo lugar.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
