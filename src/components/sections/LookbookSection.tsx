"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const looks = [
  { src: "/images/look-01.jpg", alt: "Top plisado marfil", label: "Jardin", slug: "conjunto-floral-3d", subtitle: "Coleccion Primavera" },
  { src: "/images/look-02.jpg", alt: "Corset metalizado dorado", label: "Noche Dorada", slug: "vestido-bronce-metalico", subtitle: "Alta Costura" },
  { src: "/images/look-03.jpg", alt: "Mono blanco floral", label: "Flor Blanca", slug: "vestido-peplum-rosa", subtitle: "Ready To Wear" },
  { src: "/images/look-04.jpg", alt: "Top lazo falda circulos", label: "Romantica", slug: "top-lazo-blanco-falda-rosa", subtitle: "Edicion Limitada" },
  { src: "/images/look-05.jpg", alt: "Vestido largo verde oliva", label: "Verde Passion", slug: "top-olivo-falda-azul", subtitle: "Exclusivo" },
  { src: "/images/look-06.jpg", alt: "Vestido encaje gris", label: "Encaje Perla", slug: "vestido-sirena-purpura", subtitle: "Alta Costura" },
];

export default function LookbookSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const card = (look: typeof looks[0], ratio: string, delay: number, sizing: string) => (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay }}
      style={{ position: "relative", overflow: "hidden", aspectRatio: ratio, display: "block" }}
    >
      <Link
        href={`/product/${look.slug}`}
        className="lb-item"
        style={{ display: "block", width: "100%", height: "100%", position: "relative" }}
      >
        <Image
          src={look.src}
          alt={look.alt}
          fill
          sizes={sizing}
          style={{ objectFit: "cover", objectPosition: "center 15%", transition: "transform 1s cubic-bezier(0.25,0.46,0.45,0.94)" }}
          className="lb-img"
        />
        <div className="lb-overlay" />
        <div className="lb-text">
          <p className="lb-subtitle">{look.subtitle}</p>
          <h3 className="lb-title">{look.label}</h3>
          <span className="lb-cta">Comprar Look →</span>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <section ref={ref} style={{ backgroundColor: "#0a0a0a", overflow: "hidden" }}>
      <style dangerouslySetInnerHTML={{__html: `
        /* ===== HEADER ===== */
        .lb-editorial-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 80px 6vw 60px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        /* ===== ITEM BASE ===== */
        .lb-item { cursor: pointer; }
        .lb-img { transition: transform 1s cubic-bezier(0.25,0.46,0.45,0.94); }
        .lb-item:hover .lb-img { transform: scale(1.06); }

        .lb-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 55%, transparent 100%);
          transition: opacity 0.5s ease;
        }
        .lb-item:hover .lb-overlay { opacity: 0.92; }

        .lb-text {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 32px;
          transform: translateY(6px);
          transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .lb-item:hover .lb-text { transform: translateY(0); }

        .lb-subtitle {
          font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase;
          color: rgba(255,255,255,0.5); margin: 0 0 8px 0;
          opacity: 0; transition: opacity 0.4s ease 0.1s;
        }
        .lb-item:hover .lb-subtitle { opacity: 1; }

        .lb-title {
          font-family: var(--font-serif);
          font-size: clamp(1.4rem, 2vw, 1.9rem);
          font-weight: 400; font-style: italic;
          color: #fff; margin: 0 0 14px 0; line-height: 1.1;
        }

        .lb-cta {
          font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
          color: #fff; text-decoration: none; display: inline-block;
          border-bottom: 1px solid rgba(255,255,255,0.4); padding-bottom: 3px;
          opacity: 0; transform: translateY(6px);
          transition: all 0.4s ease 0.15s;
        }
        .lb-item:hover .lb-cta { opacity: 1; transform: translateY(0); }

        /* ===== DESKTOP: 3-COL MASONRY PORTRAIT ===== */
        .lb-desktop { display: none; }
        .lb-masonry {
          display: grid;
          grid-template-columns: 1.15fr 1fr 1.1fr;
          gap: 3px;
          align-items: start;
          padding: 3px;
          background: #0a0a0a;
        }
        .lb-col { display: flex; flex-direction: column; gap: 3px; }
        .lb-col-center { margin-top: 80px; }

        @media (min-width: 768px) { .lb-desktop { display: block; } }

        /* ===== MOBILE ===== */
        .lb-mobile { display: block; }
        .lb-mobile-track {
          display: flex; overflow-x: auto;
          scroll-snap-type: x mandatory; scrollbar-width: none;
          padding: 2px 6vw; gap: 8px;
        }
        .lb-mobile-track::-webkit-scrollbar { display: none; }
        .lb-mobile-card {
          flex: 0 0 82vw; height: 68vh; min-height: 460px;
          scroll-snap-align: center;
          position: relative; overflow: hidden;
          display: block;
        }
        @media (min-width: 768px) { .lb-mobile { display: none; } }
      `}} />

      {/* HEADER */}
      <div className="lb-editorial-header">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <p style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "20px" }}>
            Campana — 2026
          </p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 7vw, 7rem)", fontWeight: 400, color: "#fff", lineHeight: 0.92, margin: 0, letterSpacing: "-0.02em" }}>
            Noches<br />
            <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>de Bohemia</span>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.4 }}
          style={{ textAlign: "right", paddingBottom: "8px" }}
        >
          <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "20px", maxWidth: "180px", lineHeight: 1.9 }}>
            Seis looks, una sola vision de elegancia sin compromiso.
          </p>
          <Link href="/shop" style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#fff", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "4px" }}>
            Ver Coleccion →
          </Link>
        </motion.div>
      </div>

      {/* DESKTOP: 3 columnas tipo retrato masonry */}
      <div className="lb-desktop">
        <div className="lb-masonry">
          {/* Columna izquierda */}
          <div className="lb-col">
            {card(looks[0], "2/3", 0.1, "35vw")}
            {card(looks[3], "3/4", 0.4, "35vw")}
          </div>

          {/* Columna central — desplazada hacia abajo */}
          <div className="lb-col lb-col-center">
            {card(looks[1], "3/4", 0.2, "30vw")}
            {card(looks[4], "2/3", 0.5, "30vw")}
          </div>

          {/* Columna derecha */}
          <div className="lb-col" style={{ marginTop: "40px" }}>
            {card(looks[2], "3/5", 0.3, "33vw")}
            {card(looks[5], "3/4", 0.6, "33vw")}
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="lb-mobile" style={{ paddingBottom: "60px" }}>
        <div className="lb-mobile-track">
          {looks.map((look, i) => (
            <Link href={`/product/${look.slug}`} key={i} className="lb-mobile-card lb-item">
              <Image src={look.src} alt={look.alt} fill sizes="82vw"
                style={{ objectFit: "cover", objectPosition: "center 15%" }}
                className="lb-img"
              />
              <div className="lb-overlay" style={{ opacity: 1 }} />
              <div className="lb-text" style={{ transform: "none" }}>
                <p className="lb-subtitle" style={{ opacity: 1 }}>{look.subtitle}</p>
                <h3 className="lb-title">{look.label}</h3>
                <span className="lb-cta" style={{ opacity: 1, transform: "none" }}>Comprar Look →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </section>
  );
}