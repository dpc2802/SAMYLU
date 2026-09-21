"use client";

import { motion } from "framer-motion";
import { MessageCircle, MapPin, Mail } from "lucide-react";
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
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "4px" }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
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
