# -*- coding: utf-8 -*-
def read(p):
    with open(p, "r", encoding="utf-8") as f:
        return f.read()

def write(p, s):
    with open(p, "w", encoding="utf-8") as f:
        f.write(s)

def rep(s, old, new, label, count=1):
    if old not in s:
        print(f"!! NOT FOUND [{label}]: {old[:70]!r}")
        return s
    print(f"ok  {label}")
    return s.replace(old, new) if count == 0 else s.replace(old, new, count)

# ---------- HEADER ----------
p = "src/components/layout/Header.tsx"
s = read(p)
s = rep(s, '<div className="flex items-center gap-6 flex-shrink-0">',
        '<div className="flex items-center flex-shrink-0" style={{ marginRight: "-14px" }}>', "actions container")
s = rep(s, 'onClick={() => setSearchOpen(true)}>',
        'onClick={() => setSearchOpen(true)} style={{ padding: "14px" }}>', "search btn")
s = rep(s, '<button aria-label="Mi cuenta" className={cn("hidden md:block nav-link-hover", col)}>',
        '<button aria-label="Mi cuenta" className={cn("hidden md:block nav-link-hover", col)} style={{ padding: "14px" }}>', "account btn")
s = rep(s, 'className={cn("relative nav-link-hover", col)}',
        'className={cn("relative nav-link-hover", col)} style={{ padding: "14px" }}', "wishlist + cart", count=0)
s = rep(s, 'top: "-4px", right: "-6px"', 'top: "6px", right: "4px"', "badges", count=0)
s = rep(s, 'className={cn("lg:hidden hover:opacity-50 transition-opacity", col)}',
        'className={cn("lg:hidden hover:opacity-50 transition-opacity", col)} style={{ padding: "12px" }}', "menu btn")
write(p, s)

# ---------- CATALOG HEART ----------
p = "src/components/shop/StaticCatalog.tsx"
s = read(p)
s = rep(s, 'position: "absolute", top: "16px", right: "16px", background: "none", border: "none", cursor: "pointer", zIndex: 10, padding: "8px"',
        'position: "absolute", top: "10px", right: "10px", background: "none", border: "none", cursor: "pointer", zIndex: 10, padding: "14px"', "heart")
write(p, s)

# ---------- CART ----------
p = "src/components/layout/SlideOverCart.tsx"
s = read(p)
s = rep(s, 'color: "#000", padding: "4px" }}', 'color: "#000", padding: "12px", marginRight: "-12px" }}', "close btn")
s = rep(s, 'style={{ color: "#aaa", background: "none", border: "none", cursor: "pointer" }}',
        'style={{ color: "#aaa", background: "none", border: "none", cursor: "pointer", padding: "12px", margin: "-12px -12px 0 0" }}', "trash")
s = rep(s, 'width: "24px", height: "24px"', 'width: "36px", height: "36px"', "qty buttons", count=0)
s = rep(s, 'style={{ width: "24px", textAlign: "center", fontSize: "10px" }}',
        'style={{ width: "28px", textAlign: "center", fontSize: "11px" }}', "qty label")
write(p, s)
