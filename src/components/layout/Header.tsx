"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const openCart = useCartStore((s) => s.openCart);
  const itemCount = useCartStore((s) => s.itemCount());
  // El wishlist ahora es un array de strings porque cambiamos de Set a Array en store.ts
  const wishlistCount = useWishlistStore((s) => s.ids.length);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 60);
      
      // Ocultar barra al hacer scroll hacia abajo, mostrar al subir
      if (currentScroll > 150 && currentScroll > lastScroll && !menuOpen) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScroll(currentScroll);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll, menuOpen]);

  useEffect(() => setMenuOpen(false), [pathname]);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !menuOpen;
  const col = transparent ? "text-white" : "text-black";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500",
          transparent ? "bg-transparent" : "bg-white/80 backdrop-blur-md border-b border-black/10",
          hidden ? "-translate-y-full" : "translate-y-0"
        )}
      >
      <div style={{ backgroundColor: "#050505", color: "#fff", height: "36px", overflow: "hidden", display: "flex", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33333%); }
          }
          .marquee-content {
            display: flex;
            width: fit-content;
            animation: marquee 25s linear infinite;
          }
          .marquee-content:hover {
            animation-play-state: paused;
          }
        `}} />
        <div className="marquee-content">
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
              <span style={{ padding: "0 40px", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase" }}>Envíos a todo Colombia</span>
              <span style={{ fontSize: "10px", opacity: 0.5, color: "#D4AF37" }}>✦</span>
              <span style={{ padding: "0 40px", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase" }}>Nuevas Siluetas</span>
              <span style={{ fontSize: "10px", opacity: 0.5, color: "#D4AF37" }}>✦</span>
              <span style={{ padding: "0 40px", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase" }}>Envíos gratis desde $500.000 COP</span>
              <span style={{ fontSize: "10px", opacity: 0.5, color: "#D4AF37" }}>✦</span>
            </div>
          ))}
        </div>
      </div>

        <div className="w-full flex items-center justify-between h-16 md:h-24" style={{ paddingLeft: "6vw", paddingRight: "6vw" }}>

          <Link href="/" className="flex flex-col leading-none flex-shrink-0">
            <span className={cn("font-serif text-xl md:text-2xl tracking-widest uppercase", col)}>
              SAMYLU
            </span>
            <span className={cn("text-[8px] tracking-[0.28em] uppercase font-light", transparent ? "text-white/50" : "text-black/35")}>
              by Martha Cepeda
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[10px] tracking-[0.22em] uppercase font-light hover:opacity-50 transition-opacity whitespace-nowrap",
                  col,
                  pathname === link.href && "border-b border-current pb-px"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5 flex-shrink-0">
            <button aria-label="Buscar" className={cn("hover:opacity-50 transition-opacity", col)} onClick={() => setSearchOpen(true)}>
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button aria-label="Mi cuenta" className={cn("hidden md:block hover:opacity-50 transition-opacity", col)}>
              <User size={18} strokeWidth={1.5} />
            </button>
            <Link href="/wishlist" aria-label="Favoritos" className={cn("relative hover:opacity-50 transition-opacity", col)}>
              <Heart size={18} strokeWidth={1.5} />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 text-[9px] bg-black text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={openCart}
              aria-label="Carrito"
              className={cn("relative hover:opacity-50 transition-opacity", col)}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 text-[9px] bg-black text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              className={cn("lg:hidden hover:opacity-50 transition-opacity", col)}
            >
              {menuOpen ? <X size={20} strokeWidth={1.5} style={{ color: "#fff" }} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>

        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 40,
              background: "#050505", color: "#fff",
              display: "flex", flexDirection: "column",
              padding: "120px 6vw 40px",
            }}
          >
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "32px" }}>
              {NAV_LINKS.map((link, i) => (
                <div key={link.href} style={{ overflow: "hidden" }}>
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.1 + (i * 0.08), duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(2.5rem, 10vw, 4rem)",
                        fontWeight: 300,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        color: "#fff",
                        textDecoration: "none",
                        lineHeight: 1,
                        display: "block"
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "flex-end",
                borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px"
              }}
            >
              <div>
                <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", margin: "0 0 8px" }}>Contact</p>
                <a href="https://wa.me/573148883214" style={{ display: "block", fontSize: "11px", color: "#fff", textDecoration: "none", marginBottom: "4px" }}>WhatsApp</a>
                <a href="#" style={{ display: "block", fontSize: "11px", color: "#fff", textDecoration: "none" }}>Instagram</a>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#555", margin: 0 }}>
                  SAMYLÚ<br/>by Martha Cepeda
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(8px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}
          >
            <button
              onClick={() => setSearchOpen(false)}
              style={{ position: "absolute", top: "32px", right: "32px", background: "none", border: "none", cursor: "pointer", opacity: 0.5, transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")}
            >
              <X size={28} strokeWidth={1.2} />
            </button>

            <form
              onSubmit={e => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  setSearchOpen(false);
                  router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
                  setSearchQuery("");
                }
              }}
              style={{ width: "100%", maxWidth: "600px", display: "flex", flexDirection: "column", alignItems: "center", gap: "32px" }}
            >
              <p style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#aaa", margin: 0 }}>
                ¿Qué estás buscando?
              </p>
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Vestido, color, ocasión..."
                style={{ width: "100%", textAlign: "center", background: "none", border: "none", borderBottom: "1px solid #ddd", paddingBottom: "16px", fontSize: "clamp(28px, 5vw, 52px)", fontFamily: "var(--font-serif)", fontStyle: "italic", color: "#000", outline: "none", transition: "border-color 0.3s" }}
                onFocus={e => (e.currentTarget.style.borderColor = "#000")}
                onBlur={e => (e.currentTarget.style.borderColor = "#ddd")}
              />
              <button
                type="submit"
                style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", background: "none", border: "1px solid #000", padding: "12px 32px", cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#000"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#000"; }}
              >
                Buscar
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
