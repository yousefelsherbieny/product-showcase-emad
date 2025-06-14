"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface AnimatedGradientProps {
  className?: string
  colors?: string[]
  duration?: number
  intensity?: "light" | "medium" | "strong"
}

export default function AnimatedGradient({
  className = "",
  colors = ["#3b82f6", "#ec4899", "#8b5cf6", "#f97316"],
  duration = 10,
  intensity = "medium",
}: AnimatedGradientProps) {
  const gradientRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gradientRef.current) return

    const opacityMap = {
      light: 0.1,
      medium: 0.2,
      strong: 0.3,
    }

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
    })

    tl.to(gradientRef.current, {
      backgroundPosition: "100% 100%",
      duration,
      ease: "sine.inOut",
    })

    return () => {
      tl.kill()
    }
  }, [duration])

  const opacityValue = {
    light: "bg-opacity-10",
    medium: "bg-opacity-20",
    strong: "bg-opacity-30",
  }[intensity]

  const gradientStyle = {
    backgroundSize: "200% 200%",
    backgroundPosition: "0% 0%",
    backgroundImage: `linear-gradient(45deg, ${colors.join(", ")})`,
  }

  return <div ref={gradientRef} className={`absolute inset-0 ${opacityValue} ${className}`} style={gradientStyle}></div>
}
