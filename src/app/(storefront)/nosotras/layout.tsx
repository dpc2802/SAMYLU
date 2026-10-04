import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Nuestra Historia',
  description: 'Conoce a Martha Cepeda y el atelier de alta costura Samylú.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
