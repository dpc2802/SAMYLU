"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const COOKIE_KEY = "samylu_cookie_consent";

export default function MinimalCookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            backgroundColor: "#fff",
            borderTop: "1px solid #e5e5e5",
            padding: "16px 5vw",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 -10px 40px rgba(0,0,0,0.05)",
            flexWrap: "wrap",
            gap: "16px"
          }}
        >
          <p style={{ fontSize: "11px", color: "#666", margin: 0, flex: "1 1 250px", lineHeight: 1.5 }}>
            Utilizamos cookies para ofrecerte la mejor experiencia editorial. Al continuar, aceptas nuestra{" "}
            <a href="/privacidad" style={{ color: "#000", textDecoration: "underline", textUnderlineOffset: "2px" }}>política de privacidad</a>.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={accept}
              style={{
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                backgroundColor: "#000",
                color: "#fff",
                border: "1px solid #000",
                padding: "12px 32px",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.color = "#000"; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#000"; e.currentTarget.style.color = "#fff"; }}
            >
              Aceptar
            </button>
            <button onClick={accept} style={{ background: "none", border: "none", cursor: "pointer", color: "#999", padding: "4px" }}>
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
