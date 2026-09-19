'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';

export default function SlideOverCart() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total } = useCartStore();

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
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Panel lateral */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#0f0f0f] text-white flex flex-col"
          >
            {/* Header del carrito */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} strokeWidth={1.5} />
                <span className="text-xs tracking-[0.2em] uppercase font-light">
                  Tu Selección
                </span>
                <span className="text-xs text-white/40">({items.length})</span>
              </div>
              <button
                onClick={closeCart}
                className="hover:opacity-60 transition-opacity"
                aria-label="Cerrar carrito"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={48} strokeWidth={0.8} className="text-white/20" />
                  <p className="text-white/40 text-sm tracking-widest uppercase">
                    Tu selección está vacía
                  </p>
                  <button
                    onClick={closeCart}
                    className="text-xs tracking-[0.2em] uppercase border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-colors duration-300"
                  >
                    Explorar Colección
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.25 }}
                      className="flex gap-4"
                    >
                      {/* Imagen */}
                      <div className="relative w-24 h-32 flex-shrink-0 overflow-hidden bg-white/5">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={closeCart}
                            className="text-sm font-light tracking-wide hover:opacity-60 transition-opacity line-clamp-2"
                          >
                            {item.name}
                          </Link>
                          <p className="text-white/40 text-xs mt-1 tracking-wider uppercase">
                            {item.size} · {item.color}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Cantidad */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-white/40 hover:text-white transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-white/40 hover:text-white transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          {/* Precio */}
                          <span className="text-sm font-light">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>

                        {/* Eliminar */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-left text-[10px] tracking-widest uppercase text-white/30 hover:text-white/80 transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/10 px-6 py-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs tracking-[0.2em] uppercase text-white/50">
                    Total
                  </span>
                  <span className="font-serif text-xl">{formatCurrency(total())}</span>
                </div>
                <button className="w-full bg-white text-black text-xs tracking-[0.3em] uppercase py-4 hover:bg-white/90 transition-colors duration-300 font-medium">
                  Finalizar Pedido
                </button>
                <button
                  onClick={closeCart}
                  className="w-full text-xs tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors text-center"
                >
                  Seguir explorando
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

