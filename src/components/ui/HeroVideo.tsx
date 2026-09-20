"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Forzar explícitamente el muteo para evadir bloqueos de navegadores móviles
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Silently handle autoplay prevention (e.g., Low Power Mode)
      });
    }
  }, []);

  return (
    <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-black">

      <motion.div
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1.0, opacity: 0.9 }}
        transition={{ duration: 5, ease: "easeOut" }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <video
          ref={videoRef}
          src="/videos/hero-runway.mp4"
          poster="/images/hero-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 20%",
          }}
        />
      </motion.div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 25%, transparent 60%, rgba(0,0,0,0.65) 100%)",
          pointerEvents: "none",
        }}
      />

      <div className="absolute bottom-[18%] left-0 w-full z-10 text-white" style={{ paddingLeft: "6vw", paddingRight: "6vw" }}>
        <div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-[10px] tracking-[0.45em] uppercase text-white/70 mb-3"
          >
            Colección 2025
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.05] tracking-tight"
          >
            La Femme<br />Elegante
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{ marginTop: "2rem", paddingLeft: "1.5vw" }}
        >
          <Link
            href="/shop"
            style={{
              display: "inline-block",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              backgroundColor: "white",
              color: "black",
              border: "1px solid white",
              padding: "14px 40px",
              textDecoration: "none",
              transition: "all 0.5s",
              boxShadow: "0 0 20px rgba(255,255,255,0.15)"
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "black"; e.currentTarget.style.color = "white"; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "white"; e.currentTarget.style.color = "black"; }}
          >
            Explorar
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-1.5 z-10"
      >
        <span className="text-[9px] tracking-[0.35em] uppercase">Scroll</span>
        <ChevronDown size={15} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
