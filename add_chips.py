# -*- coding: utf-8 -*-
p = "src/components/shop/StaticCatalog.tsx"
with open(p, "r", encoding="utf-8") as f:
    s = f.read()

def rep(old, new, label, all_=False):
    global s
    if old not in s:
        print(f"!! NOT FOUND [{label}]: {old[:70]!r}")
        return
    s = s.replace(old, new) if all_ else s.replace(old, new, 1)
    print(f"ok  {label}")

# state
rep('const [activeSize, setActiveSize] = useState<string | null>(null);',
    'const [activeSize, setActiveSize] = useState<string | null>(null);\n  const [activeColor, setActiveColor] = useState<string | null>(null);', "state")

# reset page count when filters change
rep('}, [activeCategory, activeSize, maxPrice, sortBy, searchQuery]);',
    '}, [activeCategory, activeSize, activeColor, maxPrice, sortBy, searchQuery]);', "effect deps")

# filter logic
rep('    if (activeSize && !p.size.includes(activeSize)) return false;',
    '    if (activeSize && !p.size.includes(activeSize)) return false;\n    if (activeColor && p.color !== activeColor) return false;', "color filter")

# derived values before "// Filter"
rep('  // Filter\n',
    '''  // Colores disponibles (solo se muestran si hay mas de uno)
  const colorOptions = [...new Set(PRODUCTOS.map((p) => p.color).filter((c) => c && /^#[0-9a-f]{3,8}$/i.test(c)))];
  const hasFilters = activeCategory !== "todo" || !!activeSize || !!activeColor;
  const resetFilters = () => { setActiveCategory("todo"); setActiveSize(null); setActiveColor(null); setMaxPrice(2000000); };

  // Filter
''', "derived")

# reset buttons
rep('setActiveCategory("todo"); setActiveSize(null); setMaxPrice(2000000);',
    'setActiveCategory("todo"); setActiveSize(null); setActiveColor(null); setMaxPrice(2000000);', "reset buttons", all_=True)

# CSS
rep('        /* ── SIDEBAR ── */',
    '''        /* ── CHIPS MOVIL ── */
        .cat-chips { display: flex; gap: 8px; overflow-x: auto; margin: -24px -6vw 32px; padding: 0 6vw 4px; scrollbar-width: none; scroll-snap-type: x proximity; }
        .cat-chips::-webkit-scrollbar { display: none; }
        .cat-chip { flex: 0 0 auto; min-height: 40px; padding: 0 18px; border: 1px solid #e5e5e5; border-radius: 40px; background: #fff; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: #666; cursor: pointer; white-space: nowrap; transition: all 0.25s; scroll-snap-align: start; }
        .cat-chip.on { background: #000; border-color: #000; color: #fff; }
        .cat-chip.clear { border-style: dashed; color: #999; }
        .cat-chip-sep { flex: 0 0 1px; background: #e5e5e5; margin: 8px 4px; }
        .cat-swatch { flex: 0 0 40px; height: 40px; border: none; background: none; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .cat-swatch span { display: block; width: 20px; height: 20px; border-radius: 50%; border: 1px solid #ddd; transition: box-shadow 0.2s; }
        .cat-swatch.on span { box-shadow: 0 0 0 2px #fff, 0 0 0 3px #000; }
        @media (min-width: 768px) { .cat-chips { display: none; } }

        /* ── SIDEBAR ── */''', "css")

# chips row JSX before layout
rep('      {/* ── LAYOUT ── */}',
    '''      {/* ── CHIPS RAPIDOS (movil) ── */}
      <div className="cat-chips" role="group" aria-label="Filtros rápidos">
        {CATEGORIAS.map((cat) => (
          <button key={cat.id} className={`cat-chip ${activeCategory === cat.id ? "on" : ""}`} onClick={() => setActiveCategory(cat.id)}>
            {cat.label}
          </button>
        ))}
        <span className="cat-chip-sep" />
        {TALLAS.map((t) => (
          <button key={t} className={`cat-chip ${activeSize === t ? "on" : ""}`} onClick={() => setActiveSize(activeSize === t ? null : t)} aria-pressed={activeSize === t}>
            {t}
          </button>
        ))}
        {colorOptions.length > 1 && (
          <>
            <span className="cat-chip-sep" />
            {colorOptions.map((c) => (
              <button key={c} className={`cat-swatch ${activeColor === c ? "on" : ""}`} onClick={() => setActiveColor(activeColor === c ? null : c)} aria-label={`Filtrar por color ${c}`} aria-pressed={activeColor === c}>
                <span style={{ background: c }} />
              </button>
            ))}
          </>
        )}
        {hasFilters && (
          <button className="cat-chip clear" onClick={resetFilters}>Limpiar</button>
        )}
      </div>

      {/* ── LAYOUT ── */}''', "chips jsx")

# sidebar color block (only when several colors)
marker = '''      <div style={{ marginBottom: "40px" }}>
        <h3 style={{ fontSize: "8px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#999", margin: "0 0 20px" }}>Precio máximo</h3>'''
rep(marker,
    '''      {colorOptions.length > 1 && (
        <div style={{ marginBottom: "40px" }}>
          <h3 style={{ fontSize: "8px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#999", margin: "0 0 20px" }}>Color</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {colorOptions.map((c) => (
              <button key={c} className={`cat-swatch ${activeColor === c ? "on" : ""}`} onClick={() => setActiveColor(activeColor === c ? null : c)} aria-label={`Filtrar por color ${c}`} aria-pressed={activeColor === c}>
                <span style={{ background: c }} />
              </button>
            ))}
          </div>
        </div>
      )}

''' + marker, "sidebar color")

with open(p, "w", encoding="utf-8") as f:
    f.write(s)
