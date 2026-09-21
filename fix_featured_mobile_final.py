# -*- coding: utf-8 -*-
import os

CONTENT = '''"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const items = [
  { src: "/images/feat-01.png", title: "Midnight Swan", subtitle: "Alta Costura", slug: "midnight-swan" },
  { src: "/images/feat-2.png", title: "Olive Peplum", subtitle: "Ready to Wear", slug: "olive-peplum" },
  { src: "/images/feat-3.jpg", title: "Metallic Flora", subtitle: "Colección Gala", slug: "metallic-flora" },
  { src: "/images/feat-4.jpg", title: "Royal Sapphire", subtitle: "Edición Limitada", slug: "royal-sapphire" },
  { src: "/images/feat-5.jpg", title: "Ivory Rustique", subtitle: "Clásicos", slug: "ivory-rustique" },
];

export default function FeaturedCollection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const renderCard = (item: typeof items[0], delay: number) => (
    <Link href={`/product/${item.slug}`} style={{ display: "block", width: "100%", marginBottom: "24px" }} className="group">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay }}
        style={{ position: "relative", cursor: "pointer", width: "100%" }}
      >
        <div style={{ position: "relative", width: "100%", overflow: "hidden", backgroundColor: "#111" }}>
          <Image
            src={item.src}
            alt={item.title}
            width={800}
            height={1200}
            style={{ width: "100%", height: "auto", display: "block", transition: "transform 0.8s ease-out" }}
            className="group-hover:scale-[1.02]"
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 40%)", opacity: 0, transition: "opacity 0.4s", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "30px" }} className="group-hover:opacity-100">
            <p style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#ccc", margin: "0 0 8px 0" }}>{item.subtitle}</p>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", fontWeight: 400, color: "#fff", margin: 0 }}>{item.title}</h3>
          </div>
        </div>
      </motion.div>
    </Link>
  );

  return (
    <section ref={ref} style={{ backgroundColor: "#050505", color: "#fff", paddingTop: "100px", paddingBottom: "100px", overflow: "hidden" }}>

      <style dangerouslySetInnerHTML={{ __html: `
        .feat-mobile { display: block; }
        .feat-desktop { display: none; }
        .feat-mobile-cta { display: block; margin-top: 40px; text-align: center; }

        .feat-carousel {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          gap: 12px;
          padding: 20px 6vw;
          scrollbar-width: none;
        }
        .feat-carousel::-webkit-scrollbar { display: none; }

        .feat-mobile-card {
          flex: 0 0 85vw;
          height: 65vh;
          min-height: 450px;
          scroll-snap-align: center;
          position: relative;
          overflow: hidden;
          display: block;
          border-radius: 4px;
        }

        @media (min-width: 768px) {
          .feat-mobile { display: none; }
          .feat-mobile-cta { display: none; }
          .feat-desktop { display: flex; gap: 24px; align-items: flex-start; }
        }
      `}} />

      {/* HEADER */}
      <div style={{ paddingLeft: "6vw", paddingRight: "6vw", marginBottom: "60px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
          <p style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#888", marginBottom: "16px" }}>
            The Masterpieces
          </p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 400, lineHeight: 1, margin: 0, letterSpacing: "-0.02em" }}>
            Colección<br />
            <span style={{ fontStyle: "italic", color: "#aaa" }}>Exclusiva</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4, duration: 0.8 }} className="feat-desktop">
          <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "12px", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#fff", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "8px" }}>
            Explorar todas las piezas <span style={{ fontSize: "14px" }}>→</span>
          </Link>
        </motion.div>
      </div>

      {/* MÓVIL: Carrusel (Simple, sin whileInView) */}
      <div className="feat-mobile">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.8 }}>
          <div className="feat-carousel">
            {items.map((item, i) => (
              <Link href={`/product/${item.slug}`} key={i} className="feat-mobile-card">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="85vw"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)" }} />
                <div style={{ position: "absolute", bottom: "30px", left: "24px", right: "24px" }}>
                  <p style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#aaa", margin: "0 0 8px 0" }}>{item.subtitle}</p>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", fontWeight: 400, color: "#fff", margin: 0 }}>{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        <div className="feat-mobile-cta" style={{ paddingLeft: "6vw", paddingRight: "6vw" }}>
          <Link href="/shop" style={{ display: "inline-block", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#fff", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "8px" }}>
            Explorar todas las piezas
          </Link>
        </div>
      </div>

      {/* DESKTOP: Galería */}
      <div className="feat-desktop" style={{ paddingLeft: "6vw", paddingRight: "6vw" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", paddingTop: "48px" }}>
          {renderCard(items[0], 0.2)}
          {renderCard(items[3], 0.5)}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {renderCard(items[1], 0.3)}
          {renderCard(items[4], 0.6)}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", paddingTop: "96px" }}>
          {renderCard(items[2], 0.4)}
        </div>
      </div>

    </section>
  );
}
'''

with open("src/components/sections/FeaturedCollection.tsx", "w", encoding="utf-8") as f:
    f.write(CONTENT)

print("FeaturedCollection completely rewritten to fix mobile rendering!")
