// components/TestimonialCard.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  const [isHovered, setIsHovered] = useState(false);

  /** card element – used by ScrollTrigger */
  const cardRef = useRef<HTMLDivElement>(null);
  /** paragraph that holds the testimonial copy */
  const contentRef = useRef<HTMLParagraphElement>(null);

  /* ------------------------------------------------------------------ */
  /* GSAP text reveal on scroll                                          */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!contentRef.current || !cardRef.current) return;

    // split paragraph into span‑wrapped words
    const text = contentRef.current.textContent || "";
    const wordSpans: HTMLSpanElement[] = [];

    contentRef.current.textContent = ""; // clear original
    text.split(" ").forEach((word, i) => {
      const span = document.createElement("span");
      span.textContent = word + (i < text.split(" ").length - 1 ? " " : "");
      span.className = "inline-block";
      contentRef.current!.appendChild(span);
      wordSpans.push(span);
    });

    gsap.from(wordSpans, {
      opacity: 0,
      y: 20,
      stagger: 0.03,
      duration: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 80%", // fire when card is 80% into viewport
        toggleActions: "play none none none",
      },
    });
  }, []);

  /* ------------------------------------------------------------------ */
  /* Mark‑up                                                             */
  /* ------------------------------------------------------------------ */
  return (
    <motion.div /* ← add relative */
      ref={cardRef}
      className="relative bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* --- image banner -------------------------------------------- */}
      {/* parent must be relative when using <Image fill />             */}
      <div className="relative h-40 overflow-hidden">
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full"
        >
          <Image
            src={testimonial.image || "/placeholder.svg"}
            alt={`${testimonial.name}'s testimonial`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 640px"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        <Quote className="absolute top-4 left-4 h-8 w-8 text-white" />
      </div>

      {/* --- content -------------------------------------------------- */}
      <div className="p-6">
        {/* rating ----------------------------------------------------- */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>

        {/* animated paragraph ---------------------------------------- */}
        <p ref={contentRef} className="text-gray-700 leading-relaxed mb-4">
          {testimonial.content}
        </p>

        {/* author ----------------------------------------------------- */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
