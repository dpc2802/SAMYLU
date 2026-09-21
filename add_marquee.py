# -*- coding: utf-8 -*-
with open("src/components/layout/Header.tsx", "r", encoding="utf-8") as f:
    content = f.read()

ANNOUNCEMENT_BAR = '''      <div style={{ backgroundColor: "#050505", color: "#fff", height: "36px", overflow: "hidden", display: "flex", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33333%); }
          }
          .marquee-content {
            display: flex;
            width: fit-content;
            animation: marquee 25s linear infinite;
          }
          .marquee-content:hover {
            animation-play-state: paused;
          }
        `}} />
        <div className="marquee-content">
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
              <span style={{ padding: "0 40px", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase" }}>Envíos a todo Colombia</span>
              <span style={{ fontSize: "10px", opacity: 0.5, color: "#D4AF37" }}>✦</span>
              <span style={{ padding: "0 40px", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase" }}>Nuevas Siluetas</span>
              <span style={{ fontSize: "10px", opacity: 0.5, color: "#D4AF37" }}>✦</span>
              <span style={{ padding: "0 40px", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase" }}>Envíos gratis desde $500.000 COP</span>
              <span style={{ fontSize: "10px", opacity: 0.5, color: "#D4AF37" }}>✦</span>
            </div>
          ))}
        </div>
      </div>
'''

content = content.replace(
    '<header\n        className={cn(',
    '<header\n        className={cn('
)

# Insert after <header ...>
search_str = 'hidden ? "-translate-y-full" : "translate-y-0"\n        )}\n      >'
replace_str = search_str + '\n' + ANNOUNCEMENT_BAR

content = content.replace(search_str, replace_str)

with open("src/components/layout/Header.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Announcement Bar injected into Header!")
