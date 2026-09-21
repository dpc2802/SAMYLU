"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show only once per session
    if (!sessionStorage.getItem("samylu_splash_shown")) {
      setVisible(true);
      sessionStorage.setItem("samylu_splash_shown", "1");
      const timer = setTimeout(() => setVisible(false), 2800);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#000",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: "20px",
          }}
        >
          {/* Logo letters animate in one by one */}
          <div style={{ overflow: "hidden" }}>
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.8rem, 8vw, 6rem)",
                fontWeight: 400,
                letterSpacing: "0.35em",
                color: "#fff",
                margin: 0,
                lineHeight: 1,
              }}
            >
              SAMYLÚ
            </motion.p>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
            style={{ width: "120px", height: "1px", background: "rgba(255,255,255,0.3)", transformOrigin: "left" }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            style={{
              fontSize: "8px", letterSpacing: "0.55em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
              margin: 0,
            }}
          >
            by Martha Cepeda
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
