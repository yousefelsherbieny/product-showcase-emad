"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface WaveBackgroundProps {
  className?: string
  color?: string
  waveCount?: number
  height?: number
  speed?: number
  opacity?: number
  position?: "top" | "bottom"
}

export default function WaveBackground({
  className = "",
  color = "#3b82f6",
  waveCount = 3,
  height = 100,
  speed = 15,
  opacity = 0.2,
  position = "bottom",
}: WaveBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    container.innerHTML = ""

    // Create multiple waves
    for (let i = 0; i < waveCount; i++) {
      const wave = document.createElement("div")
      wave.className = "absolute w-[200%] left-0"
      wave.style.height = `${height / (i + 1)}px`
      wave.style.opacity = `${opacity - i * (opacity / (waveCount * 2))}`
      wave.style.backgroundColor = color
      wave.style.borderRadius = "50%"

      if (position === "bottom") {
        wave.style.bottom = `-${height / 2 / (i + 1)}px`
      } else {
        wave.style.top = `-${height / 2 / (i + 1)}px`
      }

      container.appendChild(wave)

      // Animate each wave
      gsap.to(wave, {
        x: "-50%",
        duration: speed + i * 2,
        repeat: -1,
        ease: "sine.inOut",
        yoyo: true,
      })
    }

    return () => {
      gsap.killTweensOf(container.children)
    }
  }, [waveCount, height, speed, opacity, color, position])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-x-0 overflow-hidden pointer-events-none ${className} ${position === "bottom" ? "bottom-0" : "top-0"}`}
    ></div>
  )
}
