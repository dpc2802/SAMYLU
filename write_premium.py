# -*- coding: utf-8 -*-
"""Write SplashLoader, CustomCursor, PageTransition and update the layout."""

import os

# ── 1. SPLASH LOADER ──────────────────────────────────────────────────────────
SPLASH = '''"use client";

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
'''

# ── 2. CUSTOM CURSOR ─────────────────────────────────────────────────────────
CURSOR = '''"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const enterLink = () => setIsHovering(true);
    const leaveLink = () => setIsHovering(false);

    const animate = () => {
      // Dot follows cursor exactly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      // Ring lerps smoothly
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    raf.current = requestAnimationFrame(animate);

    // Add hover listeners to interactive elements
    const addHover = () => {
      document.querySelectorAll("a, button, [role=button], input, textarea, select, label")
        .forEach(el => {
          el.addEventListener("mouseenter", enterLink);
          el.addEventListener("mouseleave", leaveLink);
        });
    };
    addHover();
    const observer = new MutationObserver(addHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf.current);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 10000,
          width: "8px", height: "8px", borderRadius: "50%",
          background: "#000",
          pointerEvents: "none",
          transition: isHovering ? "width 0.3s, height 0.3s, background 0.3s" : "none",
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 9999,
          width: isHovering ? "52px" : "40px",
          height: isHovering ? "52px" : "40px",
          borderRadius: "50%",
          border: `1px solid ${isHovering ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.35)"}`,
          pointerEvents: "none",
          transition: "width 0.4s cubic-bezier(0.25,0.46,0.45,0.94), height 0.4s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.3s",
          willChange: "transform",
          backdropFilter: "invert(0%)",
        }}
      />
    </>
  );
}
'''

# ── 3. PAGE TRANSITION WRAPPER ───────────────────────────────────────────────
PAGE_TRANSITION = '''"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
'''

# ── 4. UPDATED LAYOUT ────────────────────────────────────────────────────────
LAYOUT = '''"use server";
import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import MinimalCookieBanner from "@/components/layout/MinimalCookieBanner";
import Footer from "@/components/layout/Footer";
import SplashLoader from "@/components/ui/SplashLoader";
import CustomCursor from "@/components/ui/CustomCursor";
import PageTransition from "@/components/ui/PageTransition";

export default function StorefrontLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SplashLoader />
      <CustomCursor />
      <Header />
      <main className="min-h-screen">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
      <MinimalCookieBanner />
    </>
  );
}
'''

# Write files
os.makedirs("src/components/ui", exist_ok=True)

with open("src/components/ui/SplashLoader.tsx", "w", encoding="utf-8") as f:
    f.write(SPLASH)
print("SplashLoader.tsx written!")

with open("src/components/ui/CustomCursor.tsx", "w", encoding="utf-8") as f:
    f.write(CURSOR)
print("CustomCursor.tsx written!")

with open("src/components/ui/PageTransition.tsx", "w", encoding="utf-8") as f:
    f.write(PAGE_TRANSITION)
print("PageTransition.tsx written!")

with open("src/app/(storefront)/layout.tsx", "w", encoding="utf-8") as f:
    f.write(LAYOUT)
print("layout.tsx updated!")

print("\nAll premium features written!")

