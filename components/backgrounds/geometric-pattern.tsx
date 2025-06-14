"use client"

import { useEffect, useRef } from "react"

interface GeometricPatternProps {
  className?: string
  color?: string
  secondaryColor?: string
  patternType?: "circles" | "triangles" | "squares" | "hexagons"
  size?: number
  density?: number
  opacity?: number
}

export default function GeometricPattern({
  className = "",
  color = "#3b82f6",
  secondaryColor,
  patternType = "circles",
  size = 20,
  density = 0.5,
  opacity = 0.1,
}: GeometricPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
      drawPattern()
    }

    // Draw the selected pattern
    const drawPattern = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalAlpha = opacity

      // Calculate number of shapes based on density
      const cols = Math.ceil((canvas.width / (size * 2)) * density)
      const rows = Math.ceil((canvas.height / (size * 2)) * density)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = (i * canvas.width) / cols + size
          const y = (j * canvas.height) / rows + size
          const useSecondaryColor = secondaryColor && (i + j) % 2 === 0

          ctx.fillStyle = useSecondaryColor ? secondaryColor : color

          switch (patternType) {
            case "circles":
              ctx.beginPath()
              ctx.arc(x, y, size / 2, 0, Math.PI * 2)
              ctx.fill()
              break
            case "triangles":
              ctx.beginPath()
              ctx.moveTo(x, y - size / 2)
              ctx.lineTo(x + size / 2, y + size / 2)
              ctx.lineTo(x - size / 2, y + size / 2)
              ctx.closePath()
              ctx.fill()
              break
            case "squares":
              ctx.fillRect(x - size / 2, y - size / 2, size, size)
              break
            case "hexagons":
              ctx.beginPath()
              for (let k = 0; k < 6; k++) {
                const angle = (k * Math.PI) / 3
                const hx = x + (size / 2) * Math.cos(angle)
                const hy = y + (size / 2) * Math.sin(angle)
                if (k === 0) ctx.moveTo(hx, hy)
                else ctx.lineTo(hx, hy)
              }
              ctx.closePath()
              ctx.fill()
              break
          }
        }
      }
    }

    // Initial setup
    resizeCanvas()

    // Handle window resize
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [color, secondaryColor, patternType, size, density, opacity])

  return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} />
}
