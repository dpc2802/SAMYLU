"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, Gift } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(price);

export default function SlideOverCart() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, total, notes, setNotes } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!mounted) return null;

  const currentTotal = total();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 500000;
  const progress = Math.min((currentTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const handleWhatsApp = () => {
    let msg = `Hola, me gustaría concretar mi pedido de SAMYLÚ:

`;
    items.forEach((item, i) => {
      msg += `${i + 1}. *${item.name}*
`;
      msg += `   • Talla: ${item.size} ${item.color !== "#000000" ? `| Color: ${item.color}` : ""}
`;
      msg += `   • Cantidad: ${item.quantity}
`;
      msg += `   • Subtotal: ${formatPrice(item.price * item.quantity)}

`;
    });
    msg += `*TOTAL ESTIMADO: ${formatPrice(currentTotal)}*
`;
    if (progress >= 100) msg += `🎁 Aplica Envío Gratis
`;
    if (notes) msg += `
*NOTAS:* ${notes}
`;
    msg += `
Quedo atenta para el pago y los datos de envío.`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* OVERLAY - Ultra Blur Dark Mode Focus */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={closeCart}
            style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
          />

          {/* SLIDEOVER PANEL */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 200, mass: 0.8 }}
            style={{ position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 101, width: "100%", maxWidth: "440px", background: "#fff", display: "flex", flexDirection: "column", boxShadow: "-20px 0 60px rgba(0,0,0,0.15)" }}
          >
            {/* ── HEADER ── */}
            <div style={{ padding: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #f0f0f0" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 400, fontStyle: "italic", margin: 0, color: "#000" }}>Mi Cesta</h2>
                <span style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888" }}>{itemCount} piezas</span>
              </div>
              <motion.button whileHover={{ rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={closeCart} style={{ background: "none", border: "none", cursor: "pointer", color: "#000", padding: "12px", marginRight: "-12px" }}>
                <X size={20} strokeWidth={1} />
              </motion.button>
            </div>

            {/* ── PROGRESS BAR ── */}
            {items.length > 0 && (
              <div style={{ padding: "16px 24px", background: progress >= 100 ? "#f8fff9" : "#fafafa", borderBottom: "1px solid #f0f0f0" }}>
                <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: progress >= 100 ? "#16a34a" : "#666", display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
                  {progress >= 100 ? <Gift size={12} /> : <ShoppingBag size={12} />}
                  {progress >= 100 ? "¡Felicidades! Tienes envío gratis." : `Te faltan ${formatPrice(FREE_SHIPPING_THRESHOLD - currentTotal)} para envío gratis.`}
                </p>
                <div style={{ width: "100%", height: "2px", background: "#eaeaea", borderRadius: "2px", overflow: "hidden" }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8, ease: "easeOut" }} style={{ height: "100%", background: progress >= 100 ? "#16a34a" : "#000" }} />
                </div>
              </div>
            )}

            {/* ── ITEMS ── */}
            <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
              {items.length === 0 ? (
                <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px", textAlign: "center" }}>
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
                    <ShoppingBag size={48} strokeWidth={0.5} color="#ccc" />
                  </motion.div>
                  <p style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#888" }}>Tu cesta está vacía</p>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={closeCart} style={{ background: "none", borderBottom: "1px solid #000", padding: "0 0 4px", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", color: "#000" }}>
                    Explorar la Colección
                  </motion.button>
                </div>
              ) : (
                <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div key={item.id} layout variants={itemVariants} initial="hidden" animate="show" exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }} style={{ display: "flex", gap: "20px" }}>
                        <Link href={`/product/${item.slug}`} onClick={closeCart} style={{ width: "90px", aspectRatio: "2/3", position: "relative", backgroundColor: "#f5f5f5", overflow: "hidden" }}>
                          <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover", objectPosition: "top center" }} unoptimized />
                        </Link>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <Link href={`/product/${item.slug}`} onClick={closeCart} style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", color: "#111", fontWeight: 500, lineHeight: 1.4 }}>
                              {item.name}
                            </Link>
                            <motion.button whileHover={{ scale: 1.2, color: "#ff4444" }} whileTap={{ scale: 0.9 }} onClick={() => removeItem(item.id)} style={{ color: "#aaa", background: "none", border: "none", cursor: "pointer", padding: "12px", margin: "-12px -12px 0 0" }}>
                              <Trash2 size={12} strokeWidth={1.5} />
                            </motion.button>
                          </div>
                          <div style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginTop: "8px", display: "flex", gap: "12px", alignItems: "center" }}>
                            <span>Talla {item.size}</span>
                            {item.color && item.color !== "#000000" && (
                              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: item.color, border: "1px solid #eee" }} />
                              </span>
                            )}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                            <div style={{ display: "flex", alignItems: "center", border: "1px solid #eee" }}>
                              <motion.button whileTap={{ scale: 0.8 }} onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: "#666" }}>
                                <Minus size={9} />
                              </motion.button>
                              <span style={{ width: "28px", textAlign: "center", fontSize: "11px" }}>{item.quantity}</span>
                              <motion.button whileTap={{ scale: 0.8 }} onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: "#666" }}>
                                <Plus size={9} />
                              </motion.button>
                            </div>
                            <span style={{ fontSize: "12px", fontFamily: "var(--font-serif)", color: "#000" }}>{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {/* ── FOOTER ── */}
            {items.length > 0 && (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} style={{ borderTop: "1px solid #f0f0f0", padding: "24px", background: "#fff", display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Añadir nota al pedido (Ej. Regalo, Portería...)"
                    style={{ width: "100%", border: "none", borderBottom: "1px solid #eee", padding: "8px 0", fontSize: "10px", letterSpacing: "0.05em", resize: "none", height: "36px", outline: "none", color: "#333", transition: "border-color 0.3s" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#000")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#eee")}
                  />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888" }}>Subtotal</span>
                    <span style={{ fontSize: "10px", color: "#666" }}>{formatPrice(currentTotal)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                    <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888" }}>Envío</span>
                    <span style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: progress >= 100 ? "#16a34a" : "#666" }}>{progress >= 100 ? "Gratis" : "Por calcular"}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#000", fontWeight: 500 }}>Total</span>
                    <span style={{ fontSize: "18px", fontFamily: "var(--font-serif)", color: "#000", lineHeight: 1 }}>{formatPrice(currentTotal)}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsApp}
                  style={{ width: "100%", background: "#050505", color: "#fff", border: "none", padding: "18px", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", borderRadius: "2px" }}
                >
                  <MessageCircle size={14} color="#25D366" />
                  Pagar por WhatsApp
                </motion.button>
                <p style={{ fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "center", color: "#aaa", margin: 0 }}>Atención personalizada inmediata</p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
