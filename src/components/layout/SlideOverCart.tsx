"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(price);
};

export default function SlideOverCart() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, total, notes, setNotes } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scroll when cart is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!mounted) return null;

  const FREE_SHIPPING_THRESHOLD = 500000;
  const currentTotal = total();
  const progress = Math.min((currentTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - currentTotal;

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    
    let message = `Hola Samylú, quiero realizar el siguiente pedido:\n\n`;
    
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   - Talla: ${item.size}\n`;
      if (item.color) message += `   - Color: ${item.color}\n`;
      message += `   - Cantidad: ${item.quantity}\n`;
      message += `   - Precio: ${formatPrice(item.price * item.quantity)}\n\n`;
    });
    
    if (notes && notes.trim() !== "") {
      message += `📝 *Notas del pedido:*\n${notes}\n\n`;
    }
    
    message += `💰 *TOTAL: ${formatPrice(currentTotal)}*`;
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "circOut" }}
            className="fixed top-0 right-0 w-full md:w-[420px] h-full bg-white z-[100] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} />
                <h2 className="font-serif text-lg tracking-widest uppercase">Tu Bolsa ({items.length})</h2>
              </div>
              <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Free Shipping Bar */}
            <div className="p-6 pb-2 bg-gray-50/50">
              <p className="text-[10px] tracking-widest uppercase text-center mb-3 text-black/70">
                {remaining > 0
                  ? `Te faltan ${formatPrice(remaining)} para ENVÍO GRATIS`
                  : "¡Felicidades! Tienes ENVÍO GRATIS 🎉"}
              </p>
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-black"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                  <ShoppingBag size={48} strokeWidth={1} className="mb-4" />
                  <p className="text-[11px] tracking-[0.2em] uppercase">Tu bolsa está vacía</p>
                  <button onClick={closeCart} className="mt-6 text-[10px] tracking-widest uppercase border-b border-black pb-1 hover:text-black/60 transition-colors">
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <Link href={`/product/${item.slug}`} onClick={closeCart} className="relative w-24 h-32 bg-gray-100 overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </Link>
                    
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link href={`/product/${item.slug}`} onClick={closeCart} className="text-sm font-medium hover:underline">
                            {item.name}
                          </Link>
                          <p className="text-[10px] tracking-wider text-black/50 mt-1 uppercase">
                            Talla: {item.size} | Color: {item.color}
                          </p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-black/30 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        {/* Quantity Control */}
                        <div className="flex items-center border border-gray-200">
                          <button 
                            className="w-8 h-8 flex items-center justify-center text-black/60 hover:bg-gray-50 transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                          <button 
                            className="w-8 h-8 flex items-center justify-center text-black/60 hover:bg-gray-50 transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-6 bg-white flex flex-col gap-4">
                
                {/* Notes */}
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-black/60 mb-2">Instrucciones Especiales</p>
                  <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ej: Dejar en portería..."
                    className="w-full border border-gray-200 p-3 text-xs resize-none h-16 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-medium uppercase tracking-wider">Subtotal</span>
                  <span className="text-lg font-medium">{formatPrice(currentTotal)}</span>
                </div>
                
                <p className="text-[10px] text-black/50 tracking-wider">
                  Los gastos de envío e impuestos se calculan al finalizar la compra.
                </p>

                <button 
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-black text-white py-4 text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-black/80 transition-colors flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  Comprar por WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
