import { create } from 'zustand';

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  slug: string;
};

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
  itemCount: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  addItem: (item) => {
    const id = `${item.productId}-${item.size}-${item.color}`;
    const existing = get().items.find((i) => i.id === id);
    if (existing) {
      set((state) => ({
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
        ),
      }));
    } else {
      set((state) => ({ items: [...state.items, { ...item, id }] }));
    }
    set({ isOpen: true }); // Abrir carrito al agregar
  },

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    }));
  },

  clearCart: () => set({ items: [] }),

  total: () =>
    get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),

  itemCount: () =>
    get().items.reduce((acc, item) => acc + item.quantity, 0),
}));

// ─── Wishlist ────────────────────────────────────────────────────────────────
type WishlistStore = {
  ids: Set<string>;
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
};

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  ids: new Set(),
  toggle: (productId) =>
    set((state) => {
      const next = new Set(state.ids);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return { ids: next };
    }),
  has: (productId) => get().ids.has(productId),
}));

