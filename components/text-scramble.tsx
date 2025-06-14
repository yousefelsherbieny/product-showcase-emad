"use client"

import { useRef, useEffect, useState } from "react"

interface TextScrambleProps {
  phrases: string[]
  className?: string
  speed?: number
  delay?: number
}

export default function TextScramble({ phrases, className = "", speed = 0.3, delay = 2 }: TextScrambleProps) {
  const textRef = useRef<HTMLDivElement>(null)
  const [currentPhrase, setCurrentPhrase] = useState(0)

  // Characters to use for scrambling effect
  const chars = "!<>-_\\/[]{}—=+*^?#________"

  useEffect(() => {
    if (!textRef.current) return

    const currentIndex = 0
    let iteration = 0
    let interval: NodeJS.Timeout

    const updateText = () => {
      const phrase = phrases[currentPhrase]
      const progress = iteration / phrase.length
      const durationProgress = Math.pow(progress, 0.5) // Ease out

      // Generate scrambled text
      let scrambledText = ""
      for (let i = 0; i < phrase.length; i++) {
        if (i < iteration) {
          scrambledText += phrase[i]
        } else {
          scrambledText += chars[Math.floor(Math.random() * chars.length)]
        }
      }

      // Update text
      if (textRef.current) {
        textRef.current.innerText = scrambledText
      }

      // Increment iteration or move to next phrase
      if (iteration < phrase.length) {
        iteration++
      } else {
        clearInterval(interval)

        // Move to next phrase after delay
        setTimeout(() => {
          setCurrentPhrase((prev) => (prev + 1) % phrases.length)
        }, delay * 1000)
      }
    }

    // Reset iteration when phrase changes
    iteration = 0

    // Start interval
    interval = setInterval(updateText, speed * 1000)

    return () => clearInterval(interval)
  }, [currentPhrase, phrases, speed, delay, chars])

  return (
    <div ref={textRef} className={className}>
      {phrases[0]}
    </div>
  )
}
