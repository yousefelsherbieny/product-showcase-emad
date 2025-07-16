/* components/TestimonialCard.tsx */

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"; // ✅ SSR‑friendly build

// 🔑 make sure the plugin is available EACH TIME the component runs
if (typeof window !== "undefined" && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!contentRef.current || !cardRef.current) return;

    /* --- split text into <span>s --- */
    const contentEl = contentRef.current;
    const words = (contentEl.textContent || "").split(" ");
    contentEl.textContent = "";
    words.forEach((w, i) => {
      const span = document.createElement("span");
      span.textContent = w + (i < words.length - 1 ? " " : "");
      span.className = "inline-block";
      contentEl.appendChild(span);
    });

    /* --- fade words in on scroll --- */
    gsap.from(contentEl.children, {
      opacity: 0,
      y: 20,
      stagger: 0.03,
      duration: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <motion.div
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
      {/* top image */}
      <div className="h-40 relative">
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full"
        >
          <Image
            src={testimonial.image || "/placeholder.svg"}
            alt={testimonial.name}
            fill
            className="object-cover"
            sizes="400px"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        <Quote className="absolute top-4 left-4 h-8 w-8 text-white" />
      </div>

      {/* body */}
      <div className="p-6">
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

        <p ref={contentRef} className="text-gray-700 mb-4">
          {testimonial.content}
        </p>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
