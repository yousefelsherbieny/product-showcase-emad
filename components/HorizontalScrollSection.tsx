// components/HorizontalScrollSection.tsx
"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger"; //  👈 note the default import

// 🔥 Register plugin at module‐scope so it's known before any gsap calls
gsap.registerPlugin(ScrollTrigger);

const labels = ["Part One", "Part Two", "Part Three", "Part Four"];

export default function HorizontalScrollSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // make sure we're in the browser
    if (typeof window === "undefined") return;

    const wrapper = wrapperRef.current;
    const panels = panelsRef.current.filter(Boolean);
    if (!wrapper || panels.length === 0) return;

    // calculate total scroll width
    let totalW = 0;
    const calc = () => {
      totalW = panels.reduce((sum, el) => sum + el.offsetWidth, 0);
    };
    calc();
    ScrollTrigger.addEventListener("refreshInit", calc);

    // horizontal scrub animation
    gsap.to(panels, {
      x: () => `-${totalW - window.innerWidth}`,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: true,
        end: () => `+=${totalW}`,
        invalidateOnRefresh: true,
      },
    });

    // toggle active class
    panels.forEach((panel) => {
      ScrollTrigger.create({
        trigger: panel,
        start: () => `top top-=${panel.offsetLeft - window.innerWidth / 2}`,
        end: () => `+=${panel.offsetWidth}`,
        toggleClass: { targets: panel, className: "active" },
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div ref={wrapperRef} className="flex flex-nowrap overflow-x-hidden">
        {labels.map((text, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) panelsRef.current[i] = el;
            }}
            className={`
              flex-shrink-0 
              h-screen flex items-center justify-center 
              text-[5rem] font-black 
              transition-colors duration-300
              ${i === 1 ? "bg-black text-white w-[46rem]" : ""}
              ${i === 2 ? "w-[46rem]" : ""}
              ${i === 0 || i === 3 ? "w-screen bg-[#8d3dae] text-white" : ""}
            `}
          >
            {text}
          </div>
        ))}
      </div>

      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-red-500 pointer-events-none" />

      <style jsx>{`
        /* when a panel is in the center, give it a highlight */
        .active {
          color: #baff00 !important;
        }
      `}</style>
    </section>
  );
}
