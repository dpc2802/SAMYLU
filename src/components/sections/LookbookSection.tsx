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

  return (
    <section ref={ref} style={{ backgroundColor: "#0a0a0a", overflow: "hidden" }}>
      <style dangerouslySetInnerHTML={{__html: `
        /* ===== LOOKBOOK HEADER ===== */
        .lb-editorial-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 80px 6vw 60px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        /* ===== GRID EDITORIAL - DESKTOP ===== */
        .lb-editorial-grid {
          display: none;
        }
        .lb-featured-row {
          display: grid;
          grid-template-columns: 3fr 2fr;
          height: 75vh;
          min-height: 600px;
        }
        .lb-secondary-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          height: 55vh;
          min-height: 420px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        /* ===== ITEM BASE ===== */
        .lb-item {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          display: block;
        }
        .lb-item-inner {
          position: absolute;
          inset: 0;
        }
        .lb-item-inner img {
          transition: transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .lb-item:hover .lb-item-inner img {
          transform: scale(1.06);
        }

        /* Gradient overlay */
        .lb-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
          transition: opacity 0.5s ease;
        }
        .lb-item:hover .lb-overlay {
          opacity: 0.9;
        }

        /* Text block */
        .lb-text {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 40px;
          transform: translateY(8px);
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .lb-item:hover .lb-text {
          transform: translateY(0);
        }
        .lb-subtitle {
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin: 0 0 8px 0;
          opacity: 0;
          transition: opacity 0.4s ease 0.1s;
        }
        .lb-item:hover .lb-subtitle {
          opacity: 1;
        }
        .lb-title {
          font-family: var(--font-serif);
          font-size: clamp(1.4rem, 2.5vw, 2.2rem);
          font-weight: 400;
          font-style: italic;
          color: #fff;
          margin: 0 0 16px 0;
          line-height: 1.1;
        }
        .lb-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #fff;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.4);
          padding-bottom: 3px;
          opacity: 0;
          transform: translateY(6px);
          transition: all 0.4s ease 0.15s;
        }
        .lb-item:hover .lb-cta {
          opacity: 1;
          transform: translateY(0);
        }

        /* Featured item extra large text */
        .lb-item-featured .lb-title {
          font-size: clamp(2rem, 4vw, 3.5rem);
        }
        .lb-item-featured .lb-text {
          padding: 60px;
        }

        /* Vertical dividers between secondary items */
        .lb-secondary-row .lb-item + .lb-item {
          border-left: 1px solid rgba(255,255,255,0.05);
        }

        @media (min-width: 768px) {
          .lb-editorial-grid { display: block; }
        }

        /* ===== MOBILE CAROUSEL ===== */
        .lb-mobile {
          display: block;
        }
        .lb-mobile-track {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
        }
        .lb-mobile-track::-webkit-scrollbar { display: none; }
        .lb-mobile-card {
          flex: 0 0 88vw;
          height: 70vh;
          min-height: 480px;
          scroll-snap-align: center;
          position: relative;
          overflow: hidden;
        }
        .lb-mobile-card + .lb-mobile-card {
          margin-left: 8px;
        }
        @media (min-width: 768px) {
          .lb-mobile { display: none; }
        }
      `}} />

      {/* ────── EDITORIAL HEADER ────── */}
      <div className="lb-editorial-header">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <p style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "20px" }}>
            Campaña — 2026
          </p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 7vw, 7rem)", fontWeight: 400, color: "#fff", lineHeight: 0.9, margin: 0, letterSpacing: "-0.02em" }}>
            Noches<br />
            <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.45)" }}>de Bohemia</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.4 }}
          style={{ textAlign: "right", paddingBottom: "8px" }}
        >
          <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "20px", maxWidth: "200px", lineHeight: 1.8 }}>
            Seis looks, una sola vision de elegancia sin compromiso.
          </p>
          <Link href="/shop" style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#fff", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "4px" }}>
            Ver Coleccion →
          </Link>
        </motion.div>
      </div>

      {/* ────── DESKTOP: EDITORIAL ASYMMETRIC GRID ────── */}
      <div className="lb-editorial-grid">

        {/* ROW 1: Featured (large) + stack of 2 */}
        <div className="lb-featured-row">

          {/* Left: GRANDE */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.1 }}
            style={{ height: "100%" }}
          >
            <Link href={`/product/${looks[0].slug}`} className="lb-item lb-item-featured" style={{ height: "100%", display: "block" }}>
              <div className="lb-item-inner">
                <Image src={looks[0].src} alt={looks[0].alt} fill sizes="58vw" style={{ objectFit: "cover", objectPosition: "top center" }} />
              </div>
              <div className="lb-overlay" />
              <div className="lb-text">
                <p className="lb-subtitle">{looks[0].subtitle}</p>
                <h3 className="lb-title">{looks[0].label}</h3>
                <span className="lb-cta">Comprar Look →</span>
              </div>
            </Link>
          </motion.div>

          {/* Right: stacked 2 */}
          <div style={{ display: "flex", flexDirection: "column", borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
            {[looks[1], looks[2]].map((look, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.15 }}
                style={{ flex: 1, borderBottom: i === 0 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
              >
                <Link href={`/product/${look.slug}`} className="lb-item" style={{ height: "100%", display: "block" }}>
                  <div className="lb-item-inner">
                    <Image src={look.src} alt={look.alt} fill sizes="33vw" style={{ objectFit: "cover", objectPosition: "top center" }} />
                  </div>
                  <div className="lb-overlay" />
                  <div className="lb-text">
                    <p className="lb-subtitle">{look.subtitle}</p>
                    <h3 className="lb-title" style={{ fontSize: "1.4rem" }}>{look.label}</h3>
                    <span className="lb-cta">Comprar Look →</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ROW 2: 3 equal */}
        <div className="lb-secondary-row">
          {[looks[3], looks[4], looks[5]].map((look, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.4 + i * 0.12 }}
              style={{ height: "100%" }}
            >
              <Link href={`/product/${look.slug}`} className="lb-item" style={{ height: "100%", display: "block" }}>
                <div className="lb-item-inner">
                  <Image src={look.src} alt={look.alt} fill sizes="33vw" style={{ objectFit: "cover", objectPosition: "top center" }} />
                </div>
                <div className="lb-overlay" />
                <div className="lb-text" style={{ padding: "30px" }}>
                  <p className="lb-subtitle">{look.subtitle}</p>
                  <h3 className="lb-title" style={{ fontSize: "1.3rem" }}>{look.label}</h3>
                  <span className="lb-cta">Comprar Look →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ────── MOBILE CAROUSEL ────── */}
      <div className="lb-mobile" style={{ paddingBottom: "60px" }}>
        <div className="lb-mobile-track" style={{ padding: "2px 6vw" }}>
          {looks.map((look, i) => (
            <Link href={`/product/${look.slug}`} key={i} className="lb-mobile-card lb-item">
              <div className="lb-item-inner">
                <Image src={look.src} alt={look.alt} fill sizes="88vw" style={{ objectFit: "cover", objectPosition: "top center" }} />
              </div>
              <div className="lb-overlay" style={{ opacity: 1 }} />
              <div className="lb-text" style={{ opacity: 1, transform: "none" }}>
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