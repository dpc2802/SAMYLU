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
            <button aria-label="Favoritos" className={cn("relative hover:opacity-50 transition-opacity", col)}>
              <Heart size={18} strokeWidth={1.5} />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 text-[9px] bg-black text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
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
              {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link href={link.href} className="font-serif text-3xl tracking-widest uppercase hover:opacity-50 transition-opacity" onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
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
