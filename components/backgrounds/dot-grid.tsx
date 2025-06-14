"use client"

import { useEffect, useRef } from "react"

interface DotGridProps {
  className?: string
  color?: string
  dotSize?: number
  spacing?: number
  opacity?: number
  animated?: boolean
}

export default function DotGrid({
  className = "",
  color = "#3b82f6",
  dotSize = 2,
  spacing = 20,
  opacity = 0.2,
  animated = false,
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const offsetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to match container
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
      drawDotGrid()
    }

    // Draw the dot grid
    const drawDotGrid = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = color
      ctx.globalAlpha = opacity

      const { x: offsetX, y: offsetY } = offsetRef.current

      for (let x = offsetX % spacing; x < canvas.width; x += spacing) {
        for (let y = offsetY % spacing; y < canvas.height; y += spacing) {
          ctx.beginPath()
          ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    // Animate the dots
    const animateDots = () => {
      if (animated) {
        offsetRef.current.x += 0.2
        offsetRef.current.y += 0.1

        if (offsetRef.current.x > spacing) offsetRef.current.x = 0
        if (offsetRef.current.y > spacing) offsetRef.current.y = 0

        drawDotGrid()
        animationRef.current = requestAnimationFrame(animateDots)
      }
    }

    // Initial setup
    resizeCanvas()

    if (animated) {
      animateDots()
    }

    // Handle window resize
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [color, dotSize, spacing, opacity, animated])

  return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} />
}
