"use client"

import { useEffect, useRef } from "react"

interface NoiseTextureProps {
  className?: string
  color?: string
  opacity?: number
  scale?: number
  animated?: boolean
}

export default function NoiseTexture({
  className = "",
  color = "#000000",
  opacity = 0.1,
  scale = 100,
  animated = false,
}: NoiseTextureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

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
      generateNoise()
    }

    // Generate noise texture
    const generateNoise = () => {
      if (!ctx || !canvas) return

      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      // Parse the color to RGB
      let r = 0,
        g = 0,
        b = 0
      if (color.startsWith("#")) {
        r = Number.parseInt(color.slice(1, 3), 16)
        g = Number.parseInt(color.slice(3, 5), 16)
        b = Number.parseInt(color.slice(5, 7), 16)
      }

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255

        data[i] = r // R
        data[i + 1] = g // G
        data[i + 2] = b // B
        data[i + 3] = noise * opacity // A
      }

      ctx.putImageData(imageData, 0, 0)
    }

    // Animate the noise
    const animateNoise = () => {
      generateNoise()
      if (animated) {
        animationRef.current = requestAnimationFrame(animateNoise)
      }
    }

    // Initial setup
    resizeCanvas()

    if (animated) {
      animateNoise()
    }

    // Handle window resize
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [color, opacity, scale, animated])

  return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} />
}
