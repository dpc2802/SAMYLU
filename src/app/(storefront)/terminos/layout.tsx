import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Términos y condiciones de compra de Samylú by Martha Cepeda.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
