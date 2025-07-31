/* ------------------------------------------------------------------
   components/AutoMovingGallery.tsx
   ------------------------------------------------------------------ */
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string; // transparent PNG / WEBP looks best
  description?: string;
}

interface Props {
  items: GalleryItem[];
  /** marquee speed – pixels / second */
  speed?: number;
}

export default function AutoMovingGallery({ items, speed = 50 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null); // hold between renders

  /* -------------------------------------------------------------- */
  useEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;

    const CARD_W = 340; // 300px img + 2rem gap
    const fullW = CARD_W * items.length * 2; // duplicated array

    // master looping timeline
    const tl = gsap.timeline({ repeat: -1 }).to(track, {
      x: -fullW / 2,
      duration: fullW / speed,
      ease: "none",
    });
    tlRef.current = tl;

    /* ------ basic pointer-drag to scrub the marquee ------------- */
    let startX = 0; // pointer start
    let startPos = 0; // track’s x at pointerdown
    let isDrag = false;

    const getX = () => (gsap.getProperty(track, "x") as number) || 0;

    const pointerMove = (e: PointerEvent) => {
      if (!isDrag) return;
      const delta = e.clientX - startX;
      gsap.set(track, { x: startPos + delta });
    };

    const pointerUp = () => {
      if (!isDrag) return;
      isDrag = false;
      wrap.classList.remove("cursor-grabbing");

      // resume marquee from new offset
      const xNow = getX();
      const progress = (((-xNow % fullW) + fullW) % fullW) / (fullW / 2); // 0-1 wrap
      tl.progress(progress).play();

      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerup", pointerUp);
    };

    const pointerDown = (e: PointerEvent) => {
      isDrag = true;
      wrap.classList.add("cursor-grabbing");

      tl.pause(); // freeze marquee
      startX = e.clientX;
      startPos = getX();

      window.addEventListener("pointermove", pointerMove);
      window.addEventListener("pointerup", pointerUp);
    };

    wrap.addEventListener("pointerdown", pointerDown);

    return () => {
      tl.kill();
      wrap.removeEventListener("pointerdown", pointerDown);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerup", pointerUp);
    };
  }, [items, speed]);

  /* duplicate array so it loops seamlessly */
  const row = [...items, ...items];

  return (
    <div
      ref={wrapRef}
      className="
        w-full overflow-hidden relative
        bg-neutral-900 select-none
        cursor-grab
        before:absolute before:inset-0 before:pointer-events-none
        before:bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_0)]
        before:[background-size:18px_18px]"
    >
      <motion.div
        ref={trackRef}
        className="flex gap-8 py-12"
        style={{ width: row.length * 340 }}
      >
        {row.map((item, i) => (
          <motion.div
            key={`${item.id}-${i}`}
            className="
              relative flex-shrink-0
              w-[300px] h-[540px] flex items-end justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.6 }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="300px"
              priority={i === 0}
              className="object-contain object-bottom pointer-events-none"
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
      </motion.div>
    </div>
  );
}
