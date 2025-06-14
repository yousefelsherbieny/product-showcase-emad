"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  rating: number
  image: string
}

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (contentRef.current) {
      // Manual text splitting
      const content = contentRef.current
      const text = content.textContent || ""
      const words = text.split(" ")

      // Clear the content
      content.textContent = ""

      // Create spans for each word
      const wordElements = []
      words.forEach((word, index) => {
        const span = document.createElement("span")
        span.className = "inline-block"
        span.textContent = word + (index < words.length - 1 ? " " : "")
        content.appendChild(span)
        wordElements.push(span)
      })

      // Only create animation if we have elements and the card ref exists
      if (wordElements.length > 0 && cardRef.current) {
        gsap.from(wordElements, {
          opacity: 0,
          y: 20,
          stagger: 0.03,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        })
      }
    }
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="h-40 relative overflow-hidden">
        <motion.div animate={{ scale: isHovered ? 1.05 : 1 }} transition={{ duration: 0.5 }} className="h-full w-full">
          <Image
            src={testimonial.image || "/placeholder.svg"}
            alt={`${testimonial.name}'s testimonial`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
        </motion.div>

        <div className="absolute top-4 left-4">
          <Quote className="h-8 w-8 text-white" />
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
            />
          ))}
        </div>

        <p ref={contentRef} className="text-gray-700 mb-4">
          {testimonial.content}
        </p>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
