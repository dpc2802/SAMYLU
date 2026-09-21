# -*- coding: utf-8 -*-
import os

PAGES = {
    "src/app/(storefront)/privacidad/page.tsx": '''"use client";

export default function PrivacidadPage() {
  return (
    <div style={{ paddingTop: "180px", paddingBottom: "120px", minHeight: "100vh", paddingLeft: "6vw", paddingRight: "6vw", maxWidth: "800px", margin: "0 auto" }}>
      <p style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#aaa", marginBottom: "20px" }}>
        Políticas
      </p>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, marginBottom: "40px", color: "#000" }}>
        Política de Privacidad
      </h1>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "32px", fontSize: "13px", lineHeight: 1.8, color: "#444" }}>
        <section>
          <h2 style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#000", marginBottom: "16px", fontWeight: 600 }}>1. Recolección de Datos</h2>
          <p>En SAMYLÚ valoramos y respetamos su privacidad. Recopilamos información personal básica (como nombre, correo electrónico y número de teléfono) exclusivamente cuando usted decide proporcionarla de manera voluntaria, por ejemplo, al suscribirse a nuestro boletín, contactarnos para una cita o realizar una compra.</p>
        </section>

        <section>
          <h2 style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#000", marginBottom: "16px", fontWeight: 600 }}>2. Uso de la Información</h2>
          <p>Los datos proporcionados se utilizan estrictamente para procesar sus pedidos, agendar citas en nuestro atelier, mejorar su experiencia de navegación y, si usted lo autoriza, enviarle información exclusiva sobre nuevas colecciones y eventos privados de SAMYLÚ.</p>
        </section>

        <section>
          <h2 style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#000", marginBottom: "16px", fontWeight: 600 }}>3. Protección y Seguridad</h2>
          <p>Implementamos estrictas medidas de seguridad para proteger su información personal contra accesos no autorizados, alteraciones o divulgación. No vendemos, alquilamos ni compartimos sus datos con terceros bajo ninguna circunstancia, salvo cuando sea requerido por ley.</p>
        </section>

        <section>
          <h2 style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#000", marginBottom: "16px", fontWeight: 600 }}>4. Sus Derechos</h2>
          <p>Usted tiene derecho a solicitar el acceso, rectificación o eliminación de sus datos personales en cualquier momento. Para ejercer estos derechos, puede comunicarse directamente con nuestro equipo a través de nuestros canales oficiales de contacto.</p>
        </section>
      </div>
    </div>
  );
}
''',

    "src/app/(storefront)/terminos/page.tsx": '''"use client";

export default function TerminosPage() {
  return (
    <div style={{ paddingTop: "180px", paddingBottom: "120px", minHeight: "100vh", paddingLeft: "6vw", paddingRight: "6vw", maxWidth: "800px", margin: "0 auto" }}>
      <p style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#aaa", marginBottom: "20px" }}>
        Políticas
      </p>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, marginBottom: "40px", color: "#000" }}>
        Términos y Condiciones
      </h1>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "32px", fontSize: "13px", lineHeight: 1.8, color: "#444" }}>
        <section>
          <h2 style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#000", marginBottom: "16px", fontWeight: 600 }}>1. Aceptación de los Términos</h2>
          <p>Al acceder y utilizar el sitio web de SAMYLÚ, usted acepta estar sujeto a los siguientes términos y condiciones. Estos términos rigen la venta de prendas de alta costura, ready-to-wear y el uso general de nuestra plataforma.</p>
        </section>

        <section>
          <h2 style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#000", marginBottom: "16px", fontWeight: 600 }}>2. Pedidos y Confección</h2>
          <p>Cada pieza de SAMYLÚ está elaborada con la más alta atención al detalle. Los vestidos de alta costura y las piezas por encargo requieren un tiempo de confección específico que será comunicado durante el proceso de compra. Los tiempos de entrega son estimaciones y pueden variar según la complejidad del diseño.</p>
        </section>

        <section>
          <h2 style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#000", marginBottom: "16px", fontWeight: 600 }}>3. Cambios y Devoluciones</h2>
          <p>Por la naturaleza exclusiva y delicada de nuestras prendas, aceptamos cambios de talla o estilo únicamente dentro de los primeros 5 días hábiles posteriores a la entrega, siempre que la prenda no haya sido usada, alterada y conserve sus etiquetas originales. No se realizan reembolsos en piezas hechas a la medida.</p>
        </section>

        <section>
          <h2 style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#000", marginBottom: "16px", fontWeight: 600 }}>4. Propiedad Intelectual</h2>
          <p>Todo el contenido de este sitio web, incluyendo diseños, fotografías, logotipos y textos, es propiedad exclusiva de SAMYLÚ by Martha Cepeda. Queda estrictamente prohibida su reproducción o uso sin autorización previa por escrito.</p>
        </section>
      </div>
    </div>
  );
}
''',

    "src/app/(storefront)/contacto/page.tsx": '''"use client";

import { motion } from "framer-motion";
import { MessageCircle, MapPin, Mail, Instagram } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export default function ContactoPage() {
  return (
    <div style={{ paddingTop: "160px", paddingBottom: "120px", minHeight: "100vh", paddingLeft: "6vw", paddingRight: "6vw" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "80px" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#aaa", marginBottom: "20px" }}>
            Atención Personalizada
          </p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, margin: 0, color: "#000" }}>
            Contacto <span style={{ fontStyle: "italic", color: "#666" }}>&</span> Citas
          </h1>
        </div>

        {/* Content */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px" }}>
          
          {/* Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#555" }}>
              Estamos aquí para asesorarte. Ya sea que busques una pieza de nuestra colección o desees agendar una cita para un diseño a la medida, nuestro equipo está a tu disposición.
            </p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <MapPin size={18} strokeWidth={1} style={{ marginTop: "4px" }} />
                <div>
                  <h3 style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, margin: "0 0 8px" }}>El Atelier</h3>
                  <p style={{ fontSize: "13px", color: "#666", margin: 0, lineHeight: 1.6 }}>Bogotá, Colombia<br />Atención únicamente con cita previa.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <Mail size={18} strokeWidth={1} style={{ marginTop: "4px" }} />
                <div>
                  <h3 style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, margin: "0 0 8px" }}>Email</h3>
                  <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>contacto@samylu.com</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <Instagram size={18} strokeWidth={1} style={{ marginTop: "4px" }} />
                <div>
                  <h3 style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, margin: "0 0 8px" }}>Instagram</h3>
                  <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>@samyluboutique</p>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA box */}
          <div style={{ background: "#fafafa", padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", border: "1px solid #eee" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 400, margin: "0 0 16px" }}>Atención Inmediata</h3>
            <p style={{ fontSize: "12px", color: "#666", lineHeight: 1.6, margin: "0 0 32px" }}>
              La forma más rápida de comunicarte con nuestras asesoras es a través de WhatsApp. Estamos disponibles de Lunes a Sábado de 9AM a 6PM.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20gustaría%20recibir%20asesoría`}
              target="_blank"
              rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "12px", background: "#000", color: "#fff", padding: "16px 32px", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", transition: "background 0.3s" }}
            >
              <MessageCircle size={16} />
              Contactar por WhatsApp
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
''',

    "src/app/(storefront)/nosotras/page.tsx": '''"use client";

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
'''
}

for path, code in PAGES.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(code)
    print(f"Created {path}")

# Fix Header Link for Wishlist
with open("src/components/layout/Header.tsx", "r", encoding="utf-8") as f:
    header = f.read()

# Replace button with Link for Favoritos
old_wishlist_btn = '''<button aria-label="Favoritos" className={cn("relative hover:opacity-50 transition-opacity", col)}>'''
new_wishlist_link = '''<Link href="/wishlist" aria-label="Favoritos" className={cn("relative hover:opacity-50 transition-opacity", col)}>'''

header = header.replace(old_wishlist_btn, new_wishlist_link)
header = header.replace('</button>\n            <button\n              onClick={openCart}', '</Link>\n            <button\n              onClick={openCart}')

with open("src/components/layout/Header.tsx", "w", encoding="utf-8") as f:
    f.write(header)

print("Header wishlist link updated!")
