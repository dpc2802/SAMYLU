# -*- coding: utf-8 -*-
"""Fix type errors in StaticCatalog - use correct store method names."""

with open("src/components/shop/StaticCatalog.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Fix wishlist: toggleItem -> toggle, ids destructuring
content = content.replace(
    'const { ids: wishIds, toggleItem: toggleWish } = useWishlistStore();',
    'const { ids: wishIds, toggle: toggleWish } = useWishlistStore();'
)

# Fix addItem: remove id from object (it's Omit<CartItem, "id">), add productId
content = content.replace(
    '''    addItem({
      id: `${p.id}-${p.size[0] || "U"}`,
      name: p.name,
      slug: p.slug,
      price: p.price,
      image: p.img,
      size: p.size[0] || "U",
      color: p.color,
      quantity: 1,
    });''',
    '''    addItem({
      productId: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      image: p.img,
      size: p.size[0] || "U",
      color: p.color || "#000000",
      quantity: 1,
    });'''
)

with open("src/components/shop/StaticCatalog.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Type errors fixed!")

