"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function ManifestoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#FFFFFF",
        color: "#000000",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "10vh 6vw",
      }}
    >
      {/* MARCA DE AGUA GIGANTE (Efecto Revista Editorial High-Fashion) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 0.03, scale: 1 } : {}}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-serif)",
          fontSize: "25vw",
          fontWeight: 400,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        SAMYLÚ
      </motion.div>

      {/* CONTENIDO CENTRAL */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", width: "100%", maxWidth: "1200px" }}>
        
        {/* Cabecera */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <p style={{
            fontSize: "10px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#888",
            marginBottom: "4vh"
          }}>
            El Manifiesto de la Marca
          </p>
        </motion.div>

        {/* Titular Tipográfico (El Arte) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.5rem, 6.5vw, 7.5rem)",
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#000",
            margin: "0 auto",
            textTransform: "uppercase",
          }}>
            Cada diseño es <br />
            <span style={{ 
              fontStyle: "italic", 
              textTransform: "none", 
              fontWeight: 300,
              display: "inline-block",
              transform: "translateX(-2vw)"
            }}>
              una declaración
            </span> <br />
            de sofisticación <br className="md:hidden"/> y autenticidad.
          </h2>
        </motion.div>

        {/* Linea Divisoria Fina */}
        <motion.div
          initial={{ height: 0 }}
          animate={inView ? { height: "60px" } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            width: "1px",
            backgroundColor: "#000",
            margin: "6vh auto",
          }}
        />

        {/* Párrafo y CTA centrados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.95rem",
            lineHeight: 1.8,
            fontWeight: 300,
            color: "#555",
            textAlign: "center",
          }}>
            Diseñada por Martha Cepeda, nuestra boutique nace para vestir a mujeres reales con prendas diferentes, elegantes y de alta calidad. Cada corte y caída están pensados para empoderar en esos eventos donde quieres sentirte <em style={{ fontFamily: "var(--font-serif)", fontSize: "1.2em", color: "#000" }}>radiante</em>.
          </p>

          <Link
            href="/nosotras"
            style={{
              display: "inline-block",
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "#000",
              borderBottom: "1px solid #000",
              paddingBottom: "8px",
              transition: "all 0.3s",
            }}
            className="hover:text-gray-400 hover:border-gray-400"
          >
            Descubre nuestra historia
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
