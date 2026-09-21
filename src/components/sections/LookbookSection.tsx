"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const looks = [
  { src: "/images/look-01.jpg", alt: "Top plisado marfil", label: "Jardín", slug: "conjunto-floral-3d" },
  { src: "/images/look-02.jpg", alt: "Corset metalizado dorado", label: "Noche Dorada", slug: "vestido-bronce-metalico" },
  { src: "/images/look-03.jpg", alt: "Mono blanco floral", label: "Flor Blanca", slug: "vestido-peplum-rosa" },
  { src: "/images/look-04.jpg", alt: "Top lazo falda circulos", label: "Romántica", slug: "top-lazo-blanco-falda-rosa" },
  { src: "/images/look-05.jpg", alt: "Vestido largo verde oliva", label: "Verde Passion", slug: "top-olivo-falda-azul" },
  { src: "/images/look-06.jpg", alt: "Vestido encaje gris", label: "Encaje Perla", slug: "vestido-sirena-purpura" },
];

export default function LookbookSection() {
  const ref = useRef(null);
  const carouselRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} style={{ backgroundColor: "#fff", overflow: "hidden" }}>
      <style dangerouslySetInnerHTML={{__html: `
        .lb-header { display: flex; flex-direction: column; border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; }
        .lb-header-left { width: 100%; padding: 12px 0; border-bottom: 1px solid #e5e5e5; display: flex; align-items: center; justify-content: center; }
        .lb-header-left span { writing-mode: horizontal-tb; transform: none; }
        .lb-header-right { width: 100%; border-top: 1px solid #e5e5e5; display: flex; flex-direction: row; align-items: center; justify-content: space-between; padding: 20px 6vw; }
        
        /* CARRUSEL MOVIL */
        .lb-carousel-mobile { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 4px; padding: 0; scrollbar-width: none; }
        .lb-carousel-mobile::-webkit-scrollbar { display: none; }
        .lb-item-mobile { flex: 0 0 85vw; height: 60vh; min-height: 400px; scroll-snap-align: center; position: relative; }
        
        @media (min-width: 768px) {
          .lb-header { flex-direction: row; }
          .lb-header-left { width: 80px; border-bottom: none; border-right: 1px solid #e5e5e5; padding: 0; }
          .lb-header-left span { writing-mode: vertical-rl; transform: rotate(180deg); }
          .lb-header-right { width: calc(100% - 80px); border-top: none; }
        }
      `}} />

      <div className="lb-header">
        <div className="lb-header-left">
          <span style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#888" }}>
            Campaña 2026
          </span>
        </div>
        <div className="lb-header-right">
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 400, margin: 0, lineHeight: 1.1 }}>
            Noches de<br />
            <span style={{ fontStyle: "italic", color: "#666" }}>Bohemia</span>
          </h2>
          <Link href="/shop" style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", color: "#000", borderBottom: "1px solid #000", paddingBottom: "4px" }}>
            Ver Lookbook
          </Link>
        </div>
      </div>

      {/* MOBILE SCROLL */}
      <div className="md:hidden lb-carousel-mobile" ref={carouselRef}>
        {looks.map((look, i) => (
          <Link href={`/product/${look.slug}`} key={i} className="lb-item-mobile group block">
            <Image src={look.src} alt={look.alt} fill sizes="85vw" style={{ objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: "20px", left: "20px", backgroundColor: "white", padding: "8px 16px" }}>
              <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#000" }}>{look.label}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* DESKTOP GRID */}
      <div className="hidden md:grid grid-cols-3 gap-[1px] bg-[#e5e5e5]">
        {looks.map((look, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="relative aspect-[3/4] bg-white group cursor-pointer overflow-hidden block"
          >
            <Link href={`/product/${look.slug}`} style={{ display: "block", width: "100%", height: "100%" }}>
              <Image src={look.src} alt={look.alt} fill sizes="33vw" style={{ objectFit: "cover", transition: "transform 0.8s ease" }} className="group-hover:scale-105" />
              <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.1)", opacity: 0, transition: "opacity 0.4s" }} className="group-hover:opacity-100" />
              <div style={{ position: "absolute", bottom: "30px", left: "30px", backgroundColor: "white", padding: "10px 20px", transform: "translateY(20px)", opacity: 0, transition: "all 0.4s ease" }} className="group-hover:translate-y-0 group-hover:opacity-100">
                <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#000" }}>{look.label}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
