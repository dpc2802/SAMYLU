"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { NAV_LINKS, WHATSAPP_NUMBER } from "@/lib/constants";

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
  const wishlistCount = useWishlistStore((s) => s.ids.length);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (menuOpen) return;
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 50);
      if (currentScroll > lastScroll && currentScroll > 100) {
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
          "fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out",
          hidden ? "-translate-y-full" : "translate-y-0"
        )}
        style={{
          background: transparent ? "transparent" : "rgba(255, 255, 255, 0.75)",
          backdropFilter: transparent ? "none" : "blur(24px)",
          WebkitBackdropFilter: transparent ? "none" : "blur(24px)",
          borderBottom: transparent ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)"
        }}
      >
        {/* ULTRA THIN MARQUEE */}
        <div style={{ backgroundColor: "#000", color: "#fff", height: "30px", overflow: "hidden", display: "flex", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33333%); } }
            .marquee-content { display: flex; width: fit-content; animation: marquee 30s linear infinite; }
            .marquee-content:hover { animation-play-state: paused; }
            .nav-link-hover { position: relative; opacity: 0.6; transition: opacity 0.3s ease; }
            .nav-link-hover:hover { opacity: 1; }
            .nav-link-hover::after { content: ""; position: absolute; left: 0; bottom: -4px; width: 0; height: 1px; background-color: currentColor; transition: width 0.3s ease; }
            .nav-link-hover:hover::after { width: 100%; }
          `}} />
          <div className="marquee-content">
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
                <span style={{ padding: "0 40px", fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Envíos a todo Colombia</span>
                <span style={{ fontSize: "8px", opacity: 0.4, color: "#fff" }}>✦</span>
                <span style={{ padding: "0 40px", fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Nuevas Siluetas</span>
                <span style={{ fontSize: "8px", opacity: 0.4, color: "#fff" }}>✦</span>
                <span style={{ padding: "0 40px", fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Envíos Gratis desde $500.000 COP</span>
                <span style={{ fontSize: "8px", opacity: 0.4, color: "#fff" }}>✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN NAV */}
        <div style={{ height: "72px", paddingLeft: "6vw", paddingRight: "6vw", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "1600px", margin: "0 auto" }}>
          
          {/* Logo */}
          <Link href="/" className={cn("flex-shrink-0 transition-opacity hover:opacity-70", col)} style={{ textDecoration: "none" }}>
            <span style={{ display: "block", fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 400, letterSpacing: "0.02em", margin: 0, lineHeight: 1 }}>
              SAMYLÚ
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn("nav-link-hover", col)}
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  textDecoration: "none"
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <button aria-label="Buscar" className={cn("nav-link-hover", col)} onClick={() => setSearchOpen(true)}>
              <Search size={16} strokeWidth={1.2} />
            </button>
            <button aria-label="Mi cuenta" className={cn("hidden md:block nav-link-hover", col)}>
              <User size={16} strokeWidth={1.2} />
            </button>
            <Link href="/wishlist" aria-label="Favoritos" className={cn("relative nav-link-hover", col)}>
              <Heart size={16} strokeWidth={1.2} />
              {mounted && wishlistCount > 0 && (
                <span style={{ position: "absolute", top: "-4px", right: "-6px", fontSize: "7px", background: transparent ? "#fff" : "#000", color: transparent ? "#000" : "#fff", borderRadius: "50%", width: "14px", height: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={openCart}
              aria-label="Carrito"
              className={cn("relative nav-link-hover", col)}
            >
              <ShoppingBag size={16} strokeWidth={1.2} />
              {mounted && itemCount > 0 && (
                <span style={{ position: "absolute", top: "-4px", right: "-6px", fontSize: "7px", background: transparent ? "#fff" : "#000", color: transparent ? "#000" : "#fff", borderRadius: "50%", width: "14px", height: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
                  {itemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              className={cn("lg:hidden hover:opacity-50 transition-opacity", col)}
            >
              {menuOpen ? <X size={20} strokeWidth={1} style={{ color: "#fff" }} /> : <Menu size={20} strokeWidth={1} />}
            </button>
          </div>

        </div>
      </header>

      {/* Full-Screen Mobile Menu */}
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
                <p style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", margin: "0 0 8px" }}>Contacto</p>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} style={{ display: "block", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", textDecoration: "none", marginBottom: "8px" }}>WhatsApp</a>
                <a href="#" style={{ display: "block", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", textDecoration: "none" }}>Instagram</a>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "8px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#555", margin: 0 }}>
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
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}
          >
            <motion.button
              whileHover={{ rotate: 90 }}
              onClick={() => setSearchOpen(false)}
              style={{ position: "absolute", top: "32px", right: "32px", background: "none", border: "none", cursor: "pointer", color: "#000" }}
            >
              <X size={24} strokeWidth={1} />
            </motion.button>

            <form
              onSubmit={e => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  setSearchOpen(false);
                  router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
                  setSearchQuery("");
                }
              }}
              style={{ width: "100%", maxWidth: "600px", display: "flex", flexDirection: "column", alignItems: "center", gap: "40px" }}
            >
              <p style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#888", margin: 0 }}>
                ¿Qué estás buscando?
              </p>
              <motion.input
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                type="text"
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Vestido, color, ocasión..."
                style={{ width: "100%", textAlign: "center", background: "none", border: "none", borderBottom: "1px solid #ddd", paddingBottom: "20px", fontSize: "clamp(2rem, 5vw, 4rem)", fontFamily: "var(--font-serif)", fontStyle: "italic", color: "#000", outline: "none", transition: "border-color 0.3s" }}
                onFocus={e => (e.currentTarget.style.borderColor = "#000")}
                onBlur={e => (e.currentTarget.style.borderColor = "#ddd")}
              />
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                type="submit"
                style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", background: "none", border: "1px solid #000", padding: "14px 40px", cursor: "pointer", transition: "all 0.3s", color: "#000" }}
                className="hover:bg-black hover:text-white"
              >
                Buscar
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
