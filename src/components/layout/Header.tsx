"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const openCart = useCartStore((s) => s.openCart);
  const itemCount = useCartStore((s) => s.itemCount());
  const wishlistCount = useWishlistStore((s) => s.ids.size);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !menuOpen;
  const col = transparent ? "text-white" : "text-black";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500",
          transparent ? "bg-transparent" : "bg-white/96 backdrop-blur-sm border-b border-black/8"
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
            <button aria-label="Buscar" className={cn("hover:opacity-50 transition-opacity", col)}>
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button aria-label="Mi cuenta" className={cn("hidden md:block hover:opacity-50 transition-opacity", col)}>
              <User size={18} strokeWidth={1.5} />
            </button>
            <button aria-label="Favoritos" className={cn("relative hover:opacity-50 transition-opacity", col)}>
              <Heart size={18} strokeWidth={1.5} />
              {wishlistCount > 0 && (
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
              {itemCount > 0 && (
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
    </>
  );
}
