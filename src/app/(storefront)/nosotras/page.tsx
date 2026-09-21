"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NosotrasPage() {
  return (
    <div style={{ paddingTop: "160px", paddingBottom: "120px", minHeight: "100vh" }}>
      
      {/* Intro */}
      <div style={{ paddingLeft: "6vw", paddingRight: "6vw", maxWidth: "800px", margin: "0 auto", textAlign: "center", marginBottom: "80px" }}>
        <p style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#aaa", marginBottom: "20px" }}>
          Nuestra Historia
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, margin: "0 0 40px", color: "#000", lineHeight: 1.1 }}>
          El arte de vestir <br/><span style={{ fontStyle: "italic", color: "#666" }}>con propósito</span>
        </h1>
        <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#444", textAlign: "justify", textJustify: "inter-word" }}>
          Fundada por Martha Cepeda, SAMYLÚ nació con la visión de crear prendas que no solo adornen el cuerpo, sino que celebren la esencia de cada mujer. Somos un atelier dedicado a la alta costura y al diseño ready-to-wear exclusivo, donde cada puntada cuenta una historia de elegancia, fuerza y sofisticación.
        </p>
      </div>

      {/* Image full */}
      <div style={{ position: "relative", width: "100%", height: "60vh", backgroundColor: "#f5f5f5", marginBottom: "80px" }}>
        <Image src="/images/feat-01.png" alt="Atelier SAMYLÚ" fill style={{ objectFit: "cover", objectPosition: "center 20%" }} />
      </div>

      {/* Philosophy */}
      <div style={{ paddingLeft: "6vw", paddingRight: "6vw", maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px" }}>
        <div>
          <h2 style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, margin: "0 0 20px" }}>
            Artesanía Pura
          </h2>
          <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#555" }}>
            Rechazamos la producción en masa. Creemos en el valor de lo hecho a mano, seleccionando meticulosamente las mejores telas, bordados y pedrería. Cada vestido de SAMYLÚ pasa por un riguroso proceso de diseño y confección, asegurando que el resultado final sea una verdadera obra de arte que perdure en el tiempo.
          </p>
        </div>
        <div>
          <h2 style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, margin: "0 0 20px" }}>
            Atención al Detalle
          </h2>
          <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#555" }}>
            Desde el primer boceto hasta la última prueba de entalle, acompañamos a nuestras clientas en una experiencia de lujo personalizada. Entendemos que un vestido no es solo tela, es la armadura de la mujer contemporánea para sus momentos más importantes.
          </p>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <Link href="/shop" style={{ display: "inline-block", borderBottom: "1px solid #000", paddingBottom: "8px", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#000", textDecoration: "none" }}>
          Descubrir la Colección
        </Link>
      </div>

    </div>
  );
}
