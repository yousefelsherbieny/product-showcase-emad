"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"

interface FloatingTextProps {
  children: React.ReactNode
  className?: string
  amplitude?: number
  frequency?: number
  direction?: "horizontal" | "vertical" | "both"
}

export default function FloatingText({
  children,
  className = "",
  amplitude = 10,
  frequency = 5,
  direction = "both",
}: FloatingTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current

      // Create random starting point for the animation
      const randomStart = Math.random() * Math.PI * 2

      // Create animation based on direction
      if (direction === "horizontal" || direction === "both") {
        gsap.to(element, {
          x: `+=${amplitude}`,
          duration: frequency,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      }

      if (direction === "vertical" || direction === "both") {
        gsap.to(element, {
          y: `+=${amplitude}`,
          duration: frequency * 0.7, // Different frequency for more natural movement
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: randomStart, // Random delay for more natural movement
        })
      }

      // Add subtle rotation for more dynamic effect
      gsap.to(element, {
        rotation: direction === "both" ? 2 : 1,
        duration: frequency * 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }
  }, [amplitude, frequency, direction])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}
