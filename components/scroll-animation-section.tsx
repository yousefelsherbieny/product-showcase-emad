"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function ScrollAnimationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  /* ------------------------------------------------------------------ */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !imageRef.current) return;

    gsap.set(imageRef.current, { scale: 0.8, y: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        anticipatePin: 1,
        scrub: 1.5,
        fastScrollEnd: true,
        preventOverlaps: true,
        markers: false,
      },
    });

    // Stage 1 – float
    tl.to(imageRef.current, {
      y: -30,
      duration: 0.3,
      ease: "power2.out",
    });

    // Stage 2 – zoom (now fills viewport width)
    tl.to(
      imageRef.current,
      {
        scale: 1.8,
        duration: 0.6,
        ease: "power3.inOut",
      },
      "+=0.05"
    );

    // Stage 3 – pause
    tl.to({}, { duration: 0.1 });

    // Title fade‑in
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        0
      );
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  /* ------------------------------------------------------------------ */
  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-24 relative bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden flex items-center justify-center"
    >
      {/* subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="w-full flex flex-col items-center">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-center text-white mb-16 opacity-0"
          >
            Interactive 3D Experience
          </h2>

          {/* 🔥  Stretch to full width & bigger height */}
          <div
            ref={imageRef}
            className="
              relative w-full
              md:h-[70vh] h-[60vh]          /* taller frame */
              rounded-xl overflow-hidden
              shadow-2xl shadow-primary/20
              will-change-transform
            "
            style={{ transformOrigin: "center center" }}
          >
            <Image
              src="/images/product-blue.jpeg"
              alt="Interactive 3D Product"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white text-xl font-bold">Explore in 3D</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
