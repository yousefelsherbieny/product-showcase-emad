"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const labels = ["Part One", "Part Two", "Part Three", "Part Four"];

export default function HorizontalScrollSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const sections = sectionsRef.current.filter(Boolean);
    if (!wrapper || sections.length === 0) return;

    // calculate total width of all panels
    let maxWidth = 0;
    const calcWidth = () => {
      maxWidth = sections.reduce((sum, el) => sum + el.offsetWidth, 0);
    };
    calcWidth();
    ScrollTrigger.addEventListener("refreshInit", calcWidth);

    // horizontal scrub animation
    gsap.to(sections, {
      x: () => -(maxWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: true,
        end: () => `+=${maxWidth}`,
        invalidateOnRefresh: true,
      },
    });

    // toggle “active” class on each panel as it crosses center
    sections.forEach((sec) => {
      ScrollTrigger.create({
        trigger: sec,
        start: () => `top top-=${sec.offsetLeft - window.innerWidth / 2}`,
        end: () => `+=${sec.offsetWidth}`,
        toggleClass: { targets: sec, className: "active" },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div ref={wrapperRef} className="flex flex-nowrap overflow-x-hidden">
        {labels.map((label, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) sectionsRef.current[i] = el;
            }}
            className={`
              flex-shrink-0 
              h-screen 
              flex items-center justify-center 
              text-[5rem] font-black 
              transition-colors duration-300
              ${i === 1 ? "bg-black text-white w-[46rem]" : ""}
              ${i === 2 ? "w-[46rem]" : ""}
              ${i === 0 || i === 3 ? "w-screen bg-[#8d3dae] text-white" : ""}
            `}
          >
            {label}
          </div>
        ))}
      </div>

      {/* center marker */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-red-500 pointer-events-none" />

      <style jsx>{`
        /* panel highlight when “active” */
        .active {
          color: #baff00 !important;
        }
      `}</style>
    </section>
  );
}
