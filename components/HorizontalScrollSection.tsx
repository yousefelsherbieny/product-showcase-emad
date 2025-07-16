/* components/HorizontalScrollSection.tsx */
"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined" && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

const panels = [
  { id: 1, label: "Part One", bg: "bg-violet-700 text-white", large: true },
  { id: 2, label: "Part Two", bg: "bg-black text-white" },
  { id: 3, label: "Part Three", bg: "bg-gray-200 text-gray-900" },
  { id: 4, label: "Part Four", bg: "bg-violet-700 text-white", large: true },
];

export default function HorizontalScrollSection() {
  const wrap = useRef<HTMLDivElement>(null);
  const items = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    if (!wrap.current) return;

    const total =
      items.current.reduce((sum, el) => sum + el.offsetWidth, 0) -
      window.innerWidth;

    /* master tween */
    gsap.to(items.current, {
      x: -total,
      ease: "none",
      scrollTrigger: {
        trigger: wrap.current,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        end: `+=${total}`,
        invalidateOnRefresh: true,
      },
    });

    /* active state */
    items.current.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: () =>
          `top top-=${
            (el.offsetLeft - window.innerWidth / 2) *
            (total / (total - window.innerWidth))
          }`,
        end: () =>
          `+=${el.offsetWidth * (total / (total - window.innerWidth))}`,
        onToggle: (self) =>
          el.classList[self.isActive ? "add" : "remove"](
            "ring-8",
            "ring-primary"
          ),
      });
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section ref={wrap} className="relative w-full overflow-x-hidden">
      <div className="flex flex-nowrap">
        {panels.map((p, i) => (
          <div
            key={p.id}
            ref={(el) => {
              if (el) items.current[i] = el;
            }}
            className={`${p.bg} flex-shrink-0 h-screen flex items-center
              justify-center font-extrabold text-[8vw] 
              ${p.large ? "w-screen" : "w-[46rem]"}`}
          >
            {p.label}
          </div>
        ))}
      </div>
    </section>
  );
}
