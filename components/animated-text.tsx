/* ------------------------------------------------------------------
   components/AnimatedText.tsx              ✅ fixed cleanup
   ------------------------------------------------------------------ */
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SplitMode = "chars" | "words" | "lines";

interface AnimatedTextProps {
  children: React.ReactNode;
  type?: SplitMode;
  stagger?: number;
  duration?: number;
  delay?: number;
  y?: number;
  x?: number;
  ease?: string;
  className?: string;
  onScrollTrigger?: boolean;
}

/* ––  util: split into animatable spans  –– */
function splitElement(node: HTMLElement, mode: SplitMode) {
  const raw = node.textContent ?? "";
  const spans: HTMLElement[] = [];

  node.innerHTML = "";

  if (mode === "chars") {
    raw.split("").forEach((ch) => {
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.textContent = ch;
      node.appendChild(span);
      spans.push(span);
    });
  } else if (mode === "words") {
    raw
      .trim()
      .split(/\s+/)
      .forEach((word, i, arr) => {
        const span = document.createElement("span");
        span.style.display = "inline-block";
        span.textContent = word + (i < arr.length - 1 ? "\u00A0" : "");
        node.appendChild(span);
        spans.push(span);
      });
  } else {
    const span = document.createElement("span");
    span.style.display = "block";
    span.textContent = raw;
    node.appendChild(span);
    spans.push(span);
  }

  return { spans, raw };
}

export default function AnimatedText({
  children,
  type = "chars",
  stagger = 0.03,
  duration = 0.8,
  delay = 0,
  y = 50,
  x = 0,
  ease = "power3.out",
  className = "",
  onScrollTrigger = false,
}: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!textRef.current) return;

    /* split & animate */
    const { spans, raw } = splitElement(textRef.current, type);

    gsap.set(spans, { y, x, opacity: 0 });

    const tween = gsap.to(spans, {
      y: 0,
      x: 0,
      opacity: 1,
      duration,
      stagger,
      ease,
      delay,
    });

    const trigger = onScrollTrigger
      ? ScrollTrigger.create({
          trigger: textRef.current,
          start: "top 80%",
          animation: tween,
        })
      : null;

    /* ------- cleanup ------- */
    return () => {
      tween.kill();
      trigger?.kill();
      gsap.killTweensOf(spans); // ✅ use gsap, not ScrollTrigger
      if (textRef.current) textRef.current.textContent = raw;
    };
  }, [children, type, stagger, duration, delay, y, x, ease, onScrollTrigger]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
}
