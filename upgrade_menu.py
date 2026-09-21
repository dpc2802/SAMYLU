# -*- coding: utf-8 -*-
with open("src/components/layout/Header.tsx", "r", encoding="utf-8") as f:
    content = f.read()

OLD_MENU = '''      <AnimatePresence>
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
      </AnimatePresence>'''

NEW_MENU = '''      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 40,
              background: "#050505", color: "#fff",
              display: "flex", flexDirection: "column",
              padding: "120px 6vw 40px",
            }}
          >
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "32px" }}>
              {NAV_LINKS.map((link, i) => (
                <div key={link.href} style={{ overflow: "hidden" }}>
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.1 + (i * 0.08), duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(2.5rem, 10vw, 4rem)",
                        fontWeight: 300,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        color: "#fff",
                        textDecoration: "none",
                        lineHeight: 1,
                        display: "block"
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "flex-end",
                borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px"
              }}
            >
              <div>
                <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", margin: "0 0 8px" }}>Contact</p>
                <a href="https://wa.me/573148883214" style={{ display: "block", fontSize: "11px", color: "#fff", textDecoration: "none", marginBottom: "4px" }}>WhatsApp</a>
                <a href="#" style={{ display: "block", fontSize: "11px", color: "#fff", textDecoration: "none" }}>Instagram</a>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#555", margin: 0 }}>
                  SAMYLÚ<br/>by Martha Cepeda
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>'''

content = content.replace(OLD_MENU, NEW_MENU)

# To ensure the cross icon is white when menu is open
content = content.replace(
    '''{menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}''',
    '''{menuOpen ? <X size={20} strokeWidth={1.5} style={{ color: "#fff" }} /> : <Menu size={20} strokeWidth={1.5} />}'''
)

# And fix broken characters just in case
content = content.replace("QuǸ estǭs buscando?", "¿Qué estás buscando?")
content = content.replace("ocasin", "ocasión")

with open("src/components/layout/Header.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Menu updated successfully")

