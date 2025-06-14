"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

export default function ScrollAnimationSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (sectionRef.current && imageContainerRef.current) {
      // Set initial state
      gsap.set(imageContainerRef.current, { scale: 0.8, y: 0 })

      // Create a timeline for our multi-stage animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // start when the top of the section hits the top of viewport
          end: "+=200%", // reduced from 300% to 200% for a more manageable scroll distance
          pin: true, // pin the section during the animation
          anticipatePin: 1, // helps prevent jittering
          scrub: 1.5, // increased from 1 to 1.5 for smoother scrubbing with more lag
          fastScrollEnd: true, // improves experience when scrolling quickly
          preventOverlaps: true, // helps with smoother transitions
          markers: false, // set to true for debugging
        },
      })

      // Stage 1: Hover/float effect (0-30% of scroll progress)
      tl.to(imageContainerRef.current, {
        y: -30, // float upward
        duration: 0.3, // 30% of the total timeline
        ease: "power2.out", // changed from power1.out for smoother deceleration
      })

      // Stage 2: Zoom in effect (30-90% of scroll progress)
      tl.to(
        imageContainerRef.current,
        {
          scale: 1.8, // zoom in significantly
          duration: 0.6, // 60% of the total timeline
          ease: "power3.inOut", // changed from power2.inOut for smoother acceleration/deceleration
        },
        "+=0.05",
      ) // small overlap for smoother transition between stages

      // Stage 3: Brief pause before releasing the pin (90-100% of scroll progress)
      tl.to({}, { duration: 0.1 }) // small delay before unpinning

      // Animate the title alongside the image animation
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out", // smoother fade-in
          },
          0, // start at the beginning of the timeline
        )
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-24 relative bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_60%)]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          {/* Title above the image */}
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-center text-white mb-16 opacity-0">
            Interactive 3D Experience
          </h2>

          {/* Image container with transform origin centered */}
          <div
            ref={imageContainerRef}
            className="relative w-full max-w-2xl h-[500px] rounded-xl overflow-hidden shadow-2xl shadow-primary/20 will-change-transform"
            style={{ transformOrigin: "center center" }}
          >
            <Image
              src="/images/product-blue.jpeg"
              alt="Interactive 3D Product"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="text-white text-xl font-bold">Explore in 3D</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
