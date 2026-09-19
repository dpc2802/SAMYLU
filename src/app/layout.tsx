import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/constants';
import Header from '@/components/layout/Header';
import SlideOverCart from '@/components/layout/SlideOverCart';
import WhatsAppBtn from '@/components/layout/WhatsAppBtn';
import MinimalCookieBanner from '@/components/layout/MinimalCookieBanner';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME + ' — ' + SITE_TAGLINE,
    template: '%s | ' + SITE_NAME,
  },
  description: 'Moda femenina de alta costura y ready-to-wear. Exclusivo.',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: SITE_NAME,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='es' translate='no' className={playfair.variable + ' ' + inter.variable}>
      <body className='bg-white text-black antialiased font-sans'>
        <Header />
        <SlideOverCart />
        <main>{children}</main>
        <WhatsAppBtn />
        <MinimalCookieBanner />
      </body>
    </html>
  );
}
