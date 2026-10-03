# -*- coding: utf-8 -*-
import os

SMOOTH_SCROLL = '''"use client";

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Inicializar Lenis
    const lenis = new Lenis({
      duration: 1.2, // Mayor duración = más suave
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de aceleración editorial
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Sincronizar Lenis con GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Integrar el ciclo de renderizado de GSAP con Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Desactivar el suavizado de lag de GSAP para evitar conflictos
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Limpiar en desmontaje
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return <>{children}</>;
}
'''

LAYOUT = '''import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import MinimalCookieBanner from "@/components/layout/MinimalCookieBanner";
import Footer from "@/components/layout/Footer";
import SplashLoader from "@/components/ui/SplashLoader";
import PageTransition from "@/components/ui/PageTransition";
import SmoothScroll from "@/components/layout/SmoothScroll";

export default function StorefrontLayout({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <SplashLoader />
      <Header />
      <main className="min-h-screen">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
      <MinimalCookieBanner />
    </SmoothScroll>
  );
}
'''

with open("src/components/layout/SmoothScroll.tsx", "w", encoding="utf-8") as f:
    f.write(SMOOTH_SCROLL)

with open("src/app/(storefront)/layout.tsx", "w", encoding="utf-8") as f:
    f.write(LAYOUT)

print("SmoothScroll implementation created and injected into layout!")
