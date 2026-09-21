"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const looks = [
  { src: "/images/look-01.jpg", alt: "Top plisado marfil", label: "Jardín", slug: "conjunto-floral-3d" },
  { src: "/images/look-02.jpg", alt: "Corset metalizado dorado", label: "Noche Dorada", slug: "vestido-bronce-metalico" },
  { src: "/images/look-03.jpg", alt: "Mono blanco floral", label: "Flor Blanca", slug: "vestido-peplum-rosa" },
  { src: "/images/look-04.jpg", alt: "Top lazo falda circulos", label: "Romántica", slug: "top-lazo-blanco-falda-rosa" },
  { src: "/images/look-05.jpg", alt: "Vestido largo verde oliva", label: "Verde Passion", slug: "top-olivo-falda-azul" },
  { src: "/images/look-06.jpg", alt: "Vestido encaje gris", label: "Encaje Perla", slug: "vestido-sirena-purpura" },
];

export default function LookbookSection() {
  const ref = useRef(null);
  const carouselRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-white overflow-hidden pb-[100px] pt-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:mx-[6vw] border-y md:border md:border-b-0 border-[#e5e5e5] mb-8">
        
        <div className="w-full md:w-[80px] py-3 md:py-0 border-b md:border-b-0 md:border-r border-[#e5e5e5] flex items-center justify-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#888] md:rotate-180 md:[writing-mode:vertical-rl]">
            Campaña 2026
          </span>
        </div>
        
        <div className="w-full md:flex-1 flex flex-row items-center justify-between p-5 md:px-[6vw] md:py-8">
          <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-normal m-0 leading-[1.1]">
            Noches de<br />
            <span className="italic text-[#666]">Bohemia</span>
          </h2>
          <Link href="/shop" className="text-[10px] tracking-[0.2em] uppercase no-underline text-black border-b border-black pb-1 hover:text-gray-500 transition-colors">
            Ver Lookbook
          </Link>
        </div>
      </div>

      {/* MOBILE SCROLL */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-2 px-[6vw] scrollbar-hide" ref={carouselRef}>
        {looks.map((look, i) => (
          <Link href={`/product/${look.slug}`} key={i} className="flex-none w-[85vw] h-[60vh] min-h-[400px] snap-center relative group block">
            <Image src={look.src} alt={look.alt} fill sizes="85vw" className="object-cover object-top" />
            <div className="absolute bottom-5 left-5 bg-white px-4 py-2">
              <span className="text-[9px] tracking-[0.2em] uppercase text-black">{look.label}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* DESKTOP GRID */}
      <div className="hidden md:grid grid-cols-3 gap-4 px-[6vw]">
        {looks.map((look, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="relative bg-white group cursor-pointer overflow-hidden block aspect-[2/3]"
          >
            <Link href={`/product/${look.slug}`} className="block w-full h-full">
              <Image src={look.src} alt={look.alt} fill sizes="30vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-[30px] left-[30px] bg-white px-5 py-2.5 translate-y-5 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-[10px] tracking-[0.2em] uppercase text-black">{look.label}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
