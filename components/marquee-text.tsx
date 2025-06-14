"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"

interface MarqueeTextProps {
  children: React.ReactNode
  className?: string
  speed?: number
  pauseOnHover?: boolean
  reverse?: boolean
  repeat?: number
}

export default function MarqueeText({
  children,
  className = "",
  speed = 20,
  pauseOnHover = true,
  reverse = false,
  repeat = -1,
}: MarqueeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const textCloneRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !textCloneRef.current) return

    const container = containerRef.current
    const text = textRef.current
    const textClone = textCloneRef.current

    // Set initial position
    gsap.set(textClone, { position: "absolute", left: reverse ? "-100%" : "100%", top: 0 })

    // Calculate animation duration based on text width and speed
    const textWidth = text.offsetWidth
    const duration = textWidth / speed

    // Create animation
    const createAnimation = () => {
      // Kill previous animation if exists
      if (animationRef.current) {
        animationRef.current.kill()
      }

      // Create timeline
      const tl = gsap.timeline({ repeat: repeat })

      if (reverse) {
        // Animate from left to right
        tl.to([text, textClone], { x: textWidth, duration, ease: "none" }).set([text, textClone], { x: 0 })
      } else {
        // Animate from right to left
        tl.to([text, textClone], { x: -textWidth, duration, ease: "none" }).set([text, textClone], { x: 0 })
      }

      animationRef.current = tl
    }

    createAnimation()

    // Handle pause on hover
    if (pauseOnHover && container) {
      const handleMouseEnter = () => {
        if (animationRef.current) {
          animationRef.current.pause()
        }
      }

      const handleMouseLeave = () => {
        if (animationRef.current) {
          animationRef.current.play()
        }
      }

      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)

      // Clean up event listeners
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
        if (animationRef.current) {
          animationRef.current.kill()
        }
      }
    } else {
      // Return cleanup function even if we don't add event listeners
      return () => {
        if (animationRef.current) {
          animationRef.current.kill()
        }
      }
    }
  }, [speed, pauseOnHover, reverse, repeat])

  return (
    <div ref={containerRef} className={`relative overflow-hidden whitespace-nowrap ${className}`}>
      <div ref={textRef} className="inline-block">
        {children}
      </div>
      <div ref={textCloneRef} className="inline-block absolute">
        {children}
      </div>
    </div>
  )
}
