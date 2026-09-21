import os

def fix_cart():
    with open("src/components/layout/SlideOverCart.tsx", "r", encoding="utf-8") as f:
        content = f.read()
    
    content = content.replace(
        'import { cn } from "@/lib/utils";',
        'import { cn } from "@/lib/utils";\nimport { WHATSAPP_NUMBER } from "@/lib/constants";'
    )
    
    func_code = """
  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    
    let message = `Hola Samylú, quiero realizar el siguiente pedido:\\n\\n`;
    
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\\n`;
      message += `   - Talla: ${item.size}\\n`;
      if (item.color) message += `   - Color: ${item.color}\\n`;
      message += `   - Cantidad: ${item.quantity}\\n`;
      message += `   - Precio: ${formatPrice(item.price * item.quantity)}\\n\\n`;
    });
    
    if (notes && notes.trim() !== "") {
      message += `📝 *Notas del pedido:*\\n${notes}\\n\\n`;
    }
    
    message += `💰 *TOTAL: ${formatPrice(currentTotal)}*`;
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };
"""
    content = content.replace(
        "const remaining = FREE_SHIPPING_THRESHOLD - currentTotal;",
        "const remaining = FREE_SHIPPING_THRESHOLD - currentTotal;\n" + func_code
    )
    
    old_btn = """<button 
                  onClick={() => {
                    alert("¡Redirigiendo a la pasarela de pagos segura (Wompi/Stripe)... Próximamente!");
                  }}
                  className="w-full bg-black text-white py-4 text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-black/80 transition-colors flex items-center justify-center gap-2"
                >
                  Proceder al Pago
                </button>"""
    new_btn = """<button 
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-black text-white py-4 text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-black/80 transition-colors flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  Comprar por WhatsApp
                </button>"""
    content = content.replace(old_btn, new_btn)
    
    with open("src/components/layout/SlideOverCart.tsx", "w", encoding="utf-8") as f:
        f.write(content)


def fix_catalog():
    with open("src/components/shop/StaticCatalog.tsx", "r", encoding="utf-8") as f:
        content = f.read()
    
    content = content.replace(
      'import { motion, AnimatePresence } from "framer-motion";',
      'import { motion, AnimatePresence } from "framer-motion";\nimport { useSearchParams } from "next/navigation";'
    )
    
    content = content.replace(
      'export default function StaticCatalog({ products: PRODUCTOS }: { products: ProductItem[] }) {',
      'export default function StaticCatalog({ products: PRODUCTOS }: { products: ProductItem[] }) {\n  const searchParams = useSearchParams();\n  const searchQuery = searchParams.get("q");'
    )
    
    old_use_effect = """  useEffect(() => {
    // Read category from URL if present (e.g., ?categoria=vestidos)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("categoria");
      if (cat) {
        setActiveCategory(cat);
      }
    }
  }, []);"""
    new_use_effect = """  useEffect(() => {
    const cat = searchParams.get("categoria");
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);"""
    content = content.replace(old_use_effect, new_use_effect)
    
    old_filter = """  // Filter logic
  const filteredProducts = PRODUCTOS.filter((p) => {"""
    new_filter = """  // Filter logic
  const filteredProducts = PRODUCTOS.filter((p) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.type.toLowerCase().includes(q)) return false;
    }"""
    content = content.replace(old_filter, new_filter)
    
    with open("src/components/shop/StaticCatalog.tsx", "w", encoding="utf-8") as f:
        f.write(content)


def fix_page():
    with open("src/app/(storefront)/shop/page.tsx", "r", encoding="utf-8") as f:
        content = f.read()
    
    content = content.replace(
      'import { getLiveProducts } from "@/db/queries/products";',
      'import { getLiveProducts } from "@/db/queries/products";\nimport { Suspense } from "react";'
    )
    
    content = content.replace(
      '<StaticCatalog products={liveProducts} />',
      '<Suspense fallback={<div className="p-12 text-center text-xs tracking-widest uppercase">Cargando catálogo...</div>}>\n        <StaticCatalog products={liveProducts} />\n      </Suspense>'
    )
    
    with open("src/app/(storefront)/shop/page.tsx", "w", encoding="utf-8") as f:
        f.write(content)

fix_cart()
fix_catalog()
fix_page()
print("All files patched directly from correct source!")