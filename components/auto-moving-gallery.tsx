/* components/AutoMovingGallery.tsx
   ——————————————————————————————————————————— */
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string; // transparent‑BG PNG / WEBP for best result
  description?: string; // (optional – not displayed in this hero layout)
}

export default function AutoMovingGallery({
  items,
  speed = 50, // ⬅︎ px per second
}: {
  items: GalleryItem[];
  speed?: number;
}) {
  /* refs for GSAP marquee */
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  /* build seamless scroll once images are in the DOM */
  useEffect(() => {
    const track = trackRef.current;
    const wrap = containerRef.current;
    if (!track || !wrap) return;

    const CARD_W = 340; // 300px image + 2rem gap
    const fullW = CARD_W * items.length * 2; // duplicated array

    const tl = gsap
      .timeline({ repeat: -1 })
      .to(track, { x: -fullW / 2, duration: fullW / speed, ease: "none" });

    const pause = () => tl.pause();
    const play = () => tl.resume();
    wrap.addEventListener("mouseenter", pause);
    wrap.addEventListener("mouseleave", play);

    return () => {
      tl.kill();
      wrap.removeEventListener("mouseenter", pause);
      wrap.removeEventListener("mouseleave", play);
    };
  }, [items, speed]);

  const row = [...items, ...items]; // duplicate for endless loop

  return (
    <div
      ref={containerRef}
      className="
        w-full overflow-hidden relative cursor-pointer
        bg-neutral-900
        before:absolute before:inset-0 before:pointer-events-none
        before:bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_0)]
        before:[background-size:18px_18px]" /* dotted grid */
    >
      <div
        ref={trackRef}
        className="flex gap-8 py-50" /* baseline padding */
        style={{ width: row.length * 340 }}
      >
        {row.map((item, i) => (
          <motion.div
            key={`${item.id}-${i}`}
            className="
              relative flex-shrink-0
              w-[300px] h-[540px]               /* taller canvas */
              flex items-end justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            {/* character PNG / WEBP */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority={i === 0}
              sizes="300px"
              className="
                object-contain object-bottom
                transition-transform duration-500
                group-hover:scale-105"
            />

            {/* neon pulse on hover */}
            <motion.div
              className="absolute inset-0 rounded-[30%] pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.6, scale: 1.1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                background:
                  "radial-gradient(rgba(255,60,60,0.45) 0%, transparent 60%)",
                filter: "blur(40px)",
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
