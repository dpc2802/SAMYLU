import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Contacto y Citas',
  description: 'Agenda tu cita en el atelier de Samylú en Bucaramanga o escríbenos por WhatsApp.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
