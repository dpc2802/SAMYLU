"use client";

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
