"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const looks = [
  { src: "/images/look-01.jpg", alt: "Top plisado marfil", label: "Jardin" },
  { src: "/images/look-02.jpg", alt: "Corset metalizado dorado", label: "Noche Dorada" },
  { src: "/images/look-03.jpg", alt: "Mono blanco floral", label: "Flor Blanca" },
  { src: "/images/look-04.jpg", alt: "Top lazo falda circulos", label: "Romantica" },
  { src: "/images/look-05.jpg", alt: "Vestido largo verde oliva", label: "Verde Passion" },
  { src: "/images/look-06.jpg", alt: "Vestido encaje gris", label: "Encaje Perla" },
];

export default function LookbookSection() {
  const ref = useRef(null);
  const carouselRef = useRef(null); // Ref para animacion de scroll en movil
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} style={{ backgroundColor: "#fff", overflow: "hidden" }}>
      <style dangerouslySetInnerHTML={{__html: `
        .lb-header { display: flex; flex-direction: column; border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; }
        .lb-header-left { width: 100%; padding: 12px 0; border-bottom: 1px solid #e5e5e5; display: flex; align-items: center; justify-content: center; }
        .lb-header-left span { writing-mode: horizontal-tb; transform: none; }
        .lb-header-right { width: 100%; border-top: 1px solid #e5e5e5; display: flex; flex-direction: row; align-items: center; justify-content: space-between; padding: 20px 5vw; }
        
        /* CARRUSEL MOVIL */
        .mobile-carousel {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          border-bottom: 1px solid #e5e5e5;
          padding: 20px 5vw; /* Padding extra para que se vea el efecto de escala */
        }
        .mobile-carousel::-webkit-scrollbar { display: none; }
        .mobile-card {
          flex: 0 0 82vw; 
          height: 60vh;
          min-height: 400px;
          scroll-snap-align: center;
          /* Quitamos el borde derecho fijo porque ahora las tarjetas flotan separadas en movil */
          border-radius: 8px;
          overflow: hidden;
          margin-right: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }

        /* GRILLA DESKTOP */
        .desktop-grid { display: none; }
        .lb-grid-1, .lb-grid-2 { display: grid; }
        .lb-card-desktop { border-right: 1px solid #e5e5e5; height: 100%; }
        .lb-card-desktop:last-child { border-right: none; }

        @media (min-width: 768px) {
          .lb-header { flex-direction: row; align-items: stretch; }
          .lb-header-left { width: 56px; padding: 0; border-bottom: none; border-right: 1px solid #e5e5e5; }
          .lb-header-left span { writing-mode: vertical-rl; transform: rotate(180deg); }
          .lb-header-right { width: 180px; border-top: none; border-left: 1px solid #e5e5e5; flex-direction: column; align-items: flex-start; justify-content: flex-end; padding: 28px; }
          
          .mobile-carousel { display: none; }
          .desktop-grid { display: block; }
          
          .lb-grid-1 { grid-template-columns: 1fr 1.5fr 1fr; height: 65vh; min-height: 400px; border-bottom: 1px solid #e5e5e5; }
          .lb-grid-2 { grid-template-columns: 1.5fr 1fr 1fr; height: 60vh; min-height: 380px; border-bottom: 1px solid #e5e5e5; }
        }
      `}} />

      {/* ENCABEZADO */}
      <div className="lb-header">
        <div className="lb-header-left flex-shrink-0">
          <span style={{ fontSize: "8px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#ccc" }}>2025</span>
        </div>

        <div style={{ flex: 1, padding: "48px 5vw 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", color: "#ccc", marginBottom: "12px" }}>
            Lookbook Editorial
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1 }} style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 10vw, 7rem)", fontWeight: 400, lineHeight: 0.95, letterSpacing: "-0.02em", color: "transparent", WebkitTextStroke: "1px #000", margin: 0 }}>
            La Coleccion<br /><em style={{ fontStyle: "italic" }}>Samylu</em>
          </motion.h2>
        </div>

        <div className="lb-header-right flex-shrink-0">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5, duration: 0.6 }}>
            <p style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#ddd", marginBottom: "28px" }} className="hidden md:block">06 Looks</p>
            <Link href="/shop" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#000", textDecoration: "none", borderBottom: "1px solid #000", paddingBottom: "2px" }}>Ver coleccion</Link>
          </motion.div>
        </div>
      </div>

      {/* DISEÑO MOVIL: Carrusel Animado (Coverflow Effect) */}
      <div className="mobile-carousel md:hidden" ref={carouselRef}>
        {looks.map((look, i) => (
          <motion.div 
            key={look.src} 
            className="mobile-card"
            initial={{ scale: 0.9, opacity: 0.4 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ root: carouselRef, margin: "0px", amount: 0.5 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <LookCard look={look} delay={0} inView={true} hideScale />
          </motion.div>
        ))}
      </div>

      {/* DISEÑO DESKTOP: Grilla Editorial (Intacta) */}
      <div className="desktop-grid hidden md:block">
        <div className="lb-grid-1">
          <div className="lb-card-desktop"><LookCard look={looks[0]} delay={0.1} inView={inView} /></div>
          <div className="lb-card-desktop"><LookCard look={looks[1]} delay={0.2} inView={inView} /></div>
          <div className="lb-card-desktop"><LookCard look={looks[2]} delay={0.3} inView={inView} /></div>
        </div>
        <div className="lb-grid-2">
          <div className="lb-card-desktop"><LookCard look={looks[3]} delay={0.4} inView={inView} /></div>
          <div className="lb-card-desktop"><LookCard look={looks[4]} delay={0.5} inView={inView} /></div>
          <div className="lb-card-desktop"><LookCard look={looks[5]} delay={0.6} inView={inView} /></div>
        </div>
      </div>

      {/* CITA */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5, duration: 0.8 }} style={{ textAlign: "center", padding: "72px 6vw", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem, 5vw, 2rem)", fontWeight: 400, fontStyle: "italic", color: "#000", lineHeight: 1.55, maxWidth: "580px", margin: 0 }}>
          "Cada pieza es una declaracion.<br />Cada mujer, una obra de arte."
        </p>
        <div style={{ width: "32px", height: "1px", backgroundColor: "#ccc" }} />
        <p style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#bbb", margin: 0 }}>Martha Cepeda</p>
      </motion.div>
    </section>
  );
}

function LookCard({ look, delay, inView, hideScale }: { look: { src: string; alt: string; label: string }; delay: number; inView: boolean; hideScale?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay, duration: 0.9 }}
      className={`group ${hideScale ? '' : 'overflow-hidden'}`}
      style={{ position: "relative", cursor: "pointer", height: "100%", width: "100%" }}
    >
      <Image
        src={look.src} alt={look.alt} fill sizes="(max-width: 768px) 85vw, 33vw"
        style={{ objectFit: "cover", objectPosition: "center top", transition: "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
        className={hideScale ? "" : "group-hover:scale-[1.04]"}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 45%)", opacity: 0.7, transition: "opacity 0.5s" }} className="group-hover:opacity-100" />
      <div style={{ position: "absolute", bottom: "18px", left: "18px", right: "18px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <p style={{ fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", margin: 0 }}>{look.label}</p>
        <span style={{ fontSize: "8px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)", opacity: 0, transition: "opacity 0.4s" }} className="group-hover:opacity-100">Ver →</span>
      </div>
    </motion.div>
  );
}
