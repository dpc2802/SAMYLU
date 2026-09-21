"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const looks = [
  { src: "/images/look-01.jpg", alt: "Top plisado marfil", label: "Jardin", slug: "conjunto-floral-3d" },
  { src: "/images/look-02.jpg", alt: "Corset metalizado dorado", label: "Noche Dorada", slug: "vestido-bronce-metalico" },
  { src: "/images/look-03.jpg", alt: "Mono blanco floral", label: "Flor Blanca", slug: "vestido-peplum-rosa" },
  { src: "/images/look-04.jpg", alt: "Top lazo falda circulos", label: "Romantica", slug: "top-lazo-blanco-falda-rosa" },
  { src: "/images/look-05.jpg", alt: "Vestido largo verde oliva", label: "Verde Passion", slug: "top-olivo-falda-azul" },
  { src: "/images/look-06.jpg", alt: "Vestido encaje gris", label: "Encaje Perla", slug: "vestido-sirena-purpura" },
];

export default function LookbookSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} style={{ backgroundColor: "#fff", overflow: "hidden", paddingBottom: "100px" }}>
      <style dangerouslySetInnerHTML={{__html: `
        /* --- HEADER --- */
        .lb-header {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          border-top: 1px solid #e5e5e5;
          border-bottom: 1px solid #e5e5e5;
          margin-bottom: 32px;
        }
        .lb-side-label {
          width: 56px;
          flex-shrink: 0;
          border-right: 1px solid #e5e5e5;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 0;
        }
        .lb-side-label span {
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #888;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
        .lb-main-header {
          flex: 1;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 28px 6vw;
        }

        /* --- DESKTOP GRID --- */
        .lb-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding: 0 6vw;
        }
        .lb-grid-item {
          position: relative;
          aspect-ratio: 2 / 3;
          overflow: hidden;
          background: #f5f5f5;
          display: block;
          cursor: pointer;
        }
        .lb-label-tag {
          position: absolute;
          bottom: 24px;
          left: 24px;
          background: white;
          padding: 8px 18px;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #000;
          opacity: 0;
          transform: translateY(12px);
          transition: all 0.4s ease;
        }
        .lb-grid-item:hover .lb-label-tag {
          opacity: 1;
          transform: translateY(0);
        }

        /* --- MOBILE CAROUSEL --- */
        .lb-mobile-scroll {
          display: none;
        }
        @media (max-width: 767px) {
          .lb-grid { display: none; }
          .lb-mobile-scroll {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 12px;
            padding: 0 6vw;
            scrollbar-width: none;
          }
          .lb-mobile-scroll::-webkit-scrollbar { display: none; }
          .lb-mobile-card {
            flex: 0 0 82vw;
            height: 65vh;
            min-height: 420px;
            scroll-snap-align: center;
            position: relative;
            display: block;
            overflow: hidden;
          }
        }
      `}} />

      {/* HEADER */}
      <div className="lb-header">
        <div className="lb-side-label">
          <span>Campana 2026</span>
        </div>
        <div className="lb-main-header">
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 3.5vw, 3.5rem)", fontWeight: 400, margin: 0, lineHeight: 1.1 }}>
            Noches de<br />
            <span style={{ fontStyle: "italic", color: "#666" }}>Bohemia</span>
          </h2>
          <Link href="/shop" style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", color: "#000", borderBottom: "1px solid #000", paddingBottom: "4px" }}>
            Ver Lookbook
          </Link>
        </div>
      </div>

      {/* MOBILE CAROUSEL */}
      <div className="lb-mobile-scroll">
        {looks.map((look, i) => (
          <Link href={`/product/${look.slug}`} key={i} className="lb-mobile-card group">
            <Image src={look.src} alt={look.alt} fill sizes="82vw" style={{ objectFit: "cover", objectPosition: "top center" }} />
            <div style={{ position: "absolute", bottom: "20px", left: "20px", backgroundColor: "white", padding: "8px 16px" }}>
              <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#000" }}>{look.label}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* DESKTOP GRID */}
      <div className="lb-grid">
        {looks.map((look, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.08 }}
          >
            <Link href={`/product/${look.slug}`} className="lb-grid-item group">
              <Image
                src={look.src}
                alt={look.alt}
                fill
                sizes="33vw"
                style={{ objectFit: "cover", objectPosition: "top center", transition: "transform 0.8s ease" }}
                className="group-hover:scale-105"
              />
              <div className="lb-label-tag">{look.label}</div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
