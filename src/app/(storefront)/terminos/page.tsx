"use client";

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
