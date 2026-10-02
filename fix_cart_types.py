# -*- coding: utf-8 -*-
with open("src/components/layout/SlideOverCart.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Fix the variants types by asserting them as any or importing Variants
content = content.replace("import { motion, AnimatePresence } from \"framer-motion\";", "import { motion, AnimatePresence, Variants } from \"framer-motion\";")
content = content.replace("const containerVariants = {", "const containerVariants: Variants = {")
content = content.replace("const itemVariants = {", "const itemVariants: Variants = {")

with open("src/components/layout/SlideOverCart.tsx", "w", encoding="utf-8") as f:
    f.write(content)
