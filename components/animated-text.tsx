"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface AnimatedTextProps {
  children: React.ReactNode
  type?: "chars" | "words" | "lines"
  stagger?: number
  duration?: number
  delay?: number
  y?: number
  x?: number
  ease?: string
  className?: string
  onScrollTrigger?: boolean
}

export default function AnimatedText({
  children,
  type = "chars",
  stagger = 0.03,
  duration = 0.8,
  delay = 0,
  y = 50,
  x = 0,
  ease = "power3.out",
  className = "",
  onScrollTrigger = false,
}: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null)
  const splitRef = useRef<any>(null)

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger)

    if (textRef.current) {
      // Create a simple manual text splitting function
      const splitText = (element, type) => {
        const text = element.innerText
        const result = []

        if (type === "chars") {
          // Split into characters
          element.innerHTML = ""
          text.split("").forEach((char) => {
            const span = document.createElement("span")
            span.style.display = "inline-block"
            span.textContent = char
            element.appendChild(span)
            result.push(span)
          })
        } else if (type === "words") {
          // Split into words
          element.innerHTML = ""
          text.split(" ").forEach((word, i, arr) => {
            const span = document.createElement("span")
            span.style.display = "inline-block"
            span.textContent = word + (i < arr.length - 1 ? " " : "")
            element.appendChild(span)
            result.push(span)
          })
        } else if (type === "lines") {
          // For lines, we'll just wrap the content in a span
          // A proper line split would require more complex logic
          element.innerHTML = ""
          const span = document.createElement("span")
          span.style.display = "block"
          span.textContent = text
          element.appendChild(span)
          result.push(span)
        }

        return result
      }

      // Use our custom split function
      const elements = splitText(textRef.current, type)

      if (elements.length > 0) {
        // Set initial state
        gsap.set(elements, {
          y: y,
          x: x,
          opacity: 0,
        })

        // Create animation
        const animation = gsap.to(elements, {
          y: 0,
          x: 0,
          opacity: 1,
          duration: duration,
          stagger: stagger,
          ease: ease,
          delay: delay,
        })

        // Add scroll trigger if needed
        if (onScrollTrigger && textRef.current) {
          ScrollTrigger.create({
            trigger: textRef.current,
            start: "top 80%",
            animation: animation,
          })
        }
      }
    }

    // No cleanup needed for our manual split
  }, [children, type, stagger, duration, delay, y, x, ease, onScrollTrigger])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}
