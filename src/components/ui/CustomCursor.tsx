"use client";

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
