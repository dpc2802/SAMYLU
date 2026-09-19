"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const CATEGORIAS = [
  { id: "alta-costura", name: "Alta Costura", img: "/images/cat-1.jpg", link: "/shop?categoria=alta-costura" },
  { id: "ready-to-wear", name: "Ready To Wear", img: "/images/cat-3.jpg", link: "/shop?categoria=ready-to-wear" },
  { id: "vestidos-noche", name: "Vestidos Noche", img: "/images/cat-5.jpg", link: "/shop?categoria=vestidos" },
  { id: "conjuntos", name: "Conjuntos", img: "/images/feat-2.png", link: "/shop?categoria=conjuntos" },
  { id: "novias", name: "Bridal", img: "/images/cat-9.jpg", link: "/shop?categoria=novias" },
];

export default function ShopByCategory() {
  return (
    <section style={{ backgroundColor: "#ffffff", paddingTop: "120px", paddingBottom: "120px" }}>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scroll::-webkit-scrollbar { display: none; }
        
        .circle-card { 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          gap: 24px; 
          text-decoration: none; 
          cursor: pointer;
          scroll-snap-align: center;
          height: 100%;
        }
        
        .circles-container {
          display: flex;
          align-items: flex-start;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-snap-type: x mandatory;
          gap: 24px;
          padding: 0 5vw;
        }

        .circle-wrapper {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          background-color: #f0f0f0;
        }

        @media (min-width: 1024px) {
          .circles-container {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            align-items: flex-start; /* GARANTIZA ALINEACIÓN SUPERIOR */
            gap: 2vw;
            max-width: 1400px;
            margin: 0 auto;
            overflow-x: visible;
            padding: 0 2vw;
          }
          .circle-wrapper {
            width: 100%;
            height: auto;
            aspect-ratio: 1/1;
          }
        }

        .circle-img {
          object-fit: cover;
          filter: grayscale(100%) contrast(1.1);
          transition: filter 0.8s ease, transform 0.8s ease;
        }

        .circle-card:hover .circle-img {
          filter: grayscale(0%) contrast(1);
          transform: scale(1.08);
        }

        .circle-label {
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #000;
          position: relative;
          transition: color 0.4s;
          text-align: center;
          white-space: nowrap; /* EVITA QUE EL TEXTO HAGA SALTO DE LINEA */
        }

        .circle-label::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 50%;
          width: 0;
          height: 1px;
          background-color: #000;
          transition: width 0.4s ease, left 0.4s ease;
        }

        .circle-card:hover .circle-label::after {
          width: 100%;
          left: 0;
        }
      `}} />

      <div style={{ textAlign: "center", marginBottom: "80px", padding: "0 24px" }}>
        <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", marginBottom: "16px" }}>
          Descubre Samylú
        </p>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#000", fontWeight: 400, margin: 0, lineHeight: 1.1 }}>
          Líneas Exclusivas
        </h2>
      </div>

      <div className="circles-container hide-scroll">
        {CATEGORIAS.map((cat, i) => (
          <Link key={cat.id} href={cat.link} className="circle-card group">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", width: "100%" }}
            >
              <div className="circle-wrapper">
                <Image 
                  src={cat.img} 
                  alt={cat.name} 
                  fill 
                  sizes="(max-width: 1024px) 220px, 20vw"
                  className="circle-img" 
                />
              </div>
              <span className="circle-label">
                {cat.name}
              </span>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
