import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Cómo Samylú protege y utiliza tus datos personales.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
