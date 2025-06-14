"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface Particle {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  color: string
}

interface ParticleFieldProps {
  count?: number
  className?: string
  colors?: string[]
  minSize?: number
  maxSize?: number
  minSpeed?: number
  maxSpeed?: number
  blur?: boolean
}

export default function ParticleField({
  count = 30,
  className = "",
  colors = ["#3b82f6", "#ec4899", "#8b5cf6", "#f97316"],
  minSize = 5,
  maxSize = 20,
  minSpeed = 10,
  maxSpeed = 30,
  blur = true,
}: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    // Generate random particles
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
      speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    // Create particles in the DOM
    const container = containerRef.current
    container.innerHTML = ""

    particlesRef.current.forEach((particle) => {
      const element = document.createElement("div")
      element.className = `absolute rounded-full ${blur ? "backdrop-blur-sm" : ""}`
      element.style.width = `${particle.size}px`
      element.style.height = `${particle.size}px`
      element.style.left = `${particle.x}%`
      element.style.top = `${particle.y}%`
      element.style.opacity = particle.opacity.toString()
      element.style.backgroundColor = particle.color
      container.appendChild(element)

      // Animate each particle
      gsap.to(element, {
        x: `random(-100, 100)`,
        y: `random(-100, 100)`,
        opacity: `random(${particle.opacity * 0.5}, ${particle.opacity * 1.5})`,
        duration: particle.speed,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })

    return () => {
      // Clean up animations
      gsap.killTweensOf(container.children)
    }
  }, [count, colors, minSize, maxSize, minSpeed, maxSpeed, blur])

  return <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}></div>
}
