import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#050505", color: "#fff", paddingTop: "80px", paddingBottom: "40px", borderTop: "1px solid #222" }}>
      <div style={{ padding: "0 6vw", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "60px", marginBottom: "80px" }}>
        
        {/* Brand */}
        <div style={{ flex: "1 1 300px" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", marginBottom: "20px" }}>
            SAMYLÚ <br/><span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.3em", fontWeight: 300, color: "#888" }}>BY MARTHA CEPEDA</span>
          </h2>
          <p style={{ fontSize: "12px", lineHeight: 1.8, color: "#888", maxWidth: "300px" }}>
            Boutique de alta costura y ready-to-wear para mujeres que buscan sofisticación, elegancia y exclusividad en cada detalle.
          </p>
        </div>

        {/* Links */}
        <div style={{ flex: "1 1 150px" }}>
          <h3 style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#555", marginBottom: "24px" }}>Colecciones</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            <li><Link href="/shop" style={{ fontSize: "12px", color: "#ccc", textDecoration: "none" }} className="hover:text-white transition-colors">Ready to Wear</Link></li>
            <li><Link href="/shop" style={{ fontSize: "12px", color: "#ccc", textDecoration: "none" }} className="hover:text-white transition-colors">Alta Costura</Link></li>
            <li><Link href="/shop" style={{ fontSize: "12px", color: "#ccc", textDecoration: "none" }} className="hover:text-white transition-colors">Vestidos de Gala</Link></li>
          </ul>
        </div>

        <div style={{ flex: "1 1 150px" }}>
          <h3 style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#555", marginBottom: "24px" }}>La Marca</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            <li><Link href="/nosotras" style={{ fontSize: "12px", color: "#ccc", textDecoration: "none" }} className="hover:text-white transition-colors">Nuestra Historia</Link></li>
            <li><Link href="/contacto" style={{ fontSize: "12px", color: "#ccc", textDecoration: "none" }} className="hover:text-white transition-colors">Contacto y Citas</Link></li>
          </ul>
        </div>

        {/* Social / Contact */}
        <div style={{ flex: "1 1 200px" }}>
          <h3 style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#555", marginBottom: "20px" }}>Redes</h3>
          
          <a href="https://instagram.com/samyluboutique" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#ccc", textDecoration: "none", marginBottom: "12px" }} className="hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            @samyluboutique
          </a>
          
          <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#ccc", textDecoration: "none", marginBottom: "28px" }} className="hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            Samylu Boutique
          </a>

          <h3 style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#555", marginBottom: "12px" }}>Encuéntranos</h3>
          <p style={{ fontSize: "12px", color: "#ccc", margin: "0 0 4px 0", lineHeight: 1.6 }}>📍 Carrera 37 #42-75</p>
          <p style={{ fontSize: "12px", color: "#ccc", margin: 0, lineHeight: 1.6 }}>Cabecera, Bucaramanga</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div style={{ padding: "0 6vw", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #1a1a1a", paddingTop: "24px", gap: "16px" }}>
        <p style={{ fontSize: "10px", color: "#555", margin: 0 }}>&copy; 2025 SAMYLÚ by Martha Cepeda. Todos los derechos reservados.</p>
        <div style={{ display: "flex", gap: "24px" }}>
          <Link href="/privacidad" style={{ fontSize: "10px", color: "#555", textDecoration: "none" }} className="hover:text-white transition-colors">Privacidad</Link>
          <Link href="/terminos" style={{ fontSize: "10px", color: "#555", textDecoration: "none" }} className="hover:text-white transition-colors">Términos</Link>
        </div>
      </div>
    
      {/* DPALACIOS Signature */}
      <div style={{ backgroundColor: "#000", borderTop: "1px solid #111", padding: "14px 6vw", textAlign: "center" }}>
        <a
          href="https://wa.me/573148883214?text=Hola,%20me%20gustar%C3%ADa%20cotizar%20el%20desarrollo%20de%20una%20tienda%20online%20como%20Samylu"
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#555", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}
        >
          <span>Diseñado por</span>
          <strong style={{ color: "#fff", fontWeight: 700, letterSpacing: "0.28em", fontSize: "10px" }}>DPALACIOS</strong>
          <span style={{ fontSize: "12px", opacity: 0.5 }}>👆</span>
        </a>
      </div>
    </footer>
  );
}
