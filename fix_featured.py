# -*- coding: utf-8 -*-
"""Fix FeaturedCollection mobile by replacing Tailwind md: classes with CSS media queries."""

with open("src/components/sections/FeaturedCollection.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add CSS media query styles at the start of the JSX return
# Replace the two md: classes with our own class names driven by CSS media queries

# 1. Replace the mobile carousel wrapper class
content = content.replace(
    'className="md:hidden">',
    'className="feat-mobile">'
)

# 2. Replace the desktop gallery class  
content = content.replace(
    'className="hidden md:flex gap-6 items-start"',
    'className="feat-desktop"'
)

# 3. Replace the mobile CTA class
content = content.replace(
    'className="md:hidden mt-10"',
    'className="feat-mobile-cta"'
)

# 4. Replace the desktop link (hidden on mobile)
content = content.replace(
    'className="hidden md:block"',
    'className="feat-desktop-link"'
)

# 5. Inject the <style> block right after the <section> opening tag
style_block = '''
      <style dangerouslySetInnerHTML={{ __html: `
        .feat-mobile { display: block; }
        .feat-desktop { display: none; }
        .feat-mobile-cta { display: block; margin-top: 40px; }
        .feat-desktop-link { display: none; }
        .feat-carousel {
          display: flex; overflow-x: auto; scroll-snap-type: x mandatory;
          gap: 12px; padding: 20px 6vw; scrollbar-width: none;
        }
        .feat-carousel::-webkit-scrollbar { display: none; }
        .feat-mobile-card {
          flex: 0 0 85vw; height: 65vh; min-height: 450px;
          scroll-snap-align: center; position: relative;
          overflow: hidden; display: block; border-radius: 4px;
        }
        @media (min-width: 768px) {
          .feat-mobile { display: none; }
          .feat-desktop { display: flex; gap: 6px; align-items: flex-start; }
          .feat-mobile-cta { display: none; }
          .feat-desktop-link { display: block; }
        }
      ` }} />'''

content = content.replace(
    '\n      {/* HEADER */}',
    style_block + '\n      {/* HEADER */}'
)

with open("src/components/sections/FeaturedCollection.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("FeaturedCollection mobile fixed!")

