"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ChevronDown, ShoppingBag, Heart, Star } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"

import { Button } from "@/components/ui/button"
import ProductViewer from "@/components/product-viewer"
import TestimonialCard from "@/components/testimonial-card"
import ColorPicker from "@/components/color-picker"
import ScrollAnimationSection from "@/components/scroll-animation-section"
import InteractiveModelsSection from "@/components/interactive-models-section"
import ProductGallery from "@/components/product-gallery"
import AnimatedText from "@/components/animated-text"
import FloatingText from "@/components/floating-text"
import TextScramble from "@/components/text-scramble"
import ObjectParticles from "@/components/backgrounds/object-particles"
import Navbar from "@/components/navbar"

export default function Home() {
  const [activeColor, setActiveColor] = useState("blue")
  const [isLoaded, setIsLoaded] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -100])

  const handleColorChange = (color: string) => {
    setActiveColor(color)
  }

  // Initialize GSAP
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin)

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Hero section text animations
  useEffect(() => {
    if (isLoaded && heroRef.current) {
      // Create a timeline for hero animations
      const tl = gsap.timeline()

      // Animate the eyebrow text
      const eyebrowElement = document.querySelector(".hero-eyebrow")
      if (eyebrowElement) {
        tl.from(".hero-eyebrow", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
        })
      }

      // Manual text splitting for the heading
      const headingElement = document.querySelector(".hero-heading")
      if (headingElement) {
        const text = headingElement.textContent || ""
        const chars = []

        // Clear the content
        headingElement.innerHTML = ""

        // Create spans for each character
        text.split("").forEach((char) => {
          const span = document.createElement("span")
          span.style.display = "inline-block"
          span.textContent = char === " " ? "\u00A0" : char // Use non-breaking space for spaces
          headingElement.appendChild(span)
          chars.push(span)
        })

        // Animate the characters
        tl.from(
          chars,
          {
            opacity: 0,
            y: 50,
            rotationX: -90,
            stagger: 0.02,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        )
      }

      // Animate the subheading
      const subheadingElement = document.querySelector(".hero-subheading")
      if (subheadingElement) {
        tl.from(
          ".hero-subheading",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        )
      }

      // Animate the buttons
      const buttonElements = document.querySelectorAll(".hero-buttons button")
      if (buttonElements.length > 0) {
        tl.from(
          ".hero-buttons button",
          {
            opacity: 0,
            y: 20,
            stagger: 0.2,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        )
      }

      // Create floating animation for the scroll indicator
      const scrollIndicator = document.querySelector(".scroll-indicator")
      if (scrollIndicator) {
        gsap.to(".scroll-indicator", {
          y: 15,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      }
    }
  }, [isLoaded])

  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Professional Designer",
      content:
        "These products have completely transformed my workflow. The quality and attention to detail are unmatched in the industry.",
      rating: 5,
      image: "/images/product-blue.jpeg",
    },
    {
      id: 2,
      name: "Samantha Lee",
      role: "Tech Enthusiast",
      content:
        "I've tried many similar products, but this collection stands out with its durability and elegant design. Absolutely worth every penny.",
      rating: 4,
      image: "/images/product-pink.jpeg",
    },
    {
      id: 3,
      name: "Michael Torres",
      role: "Student",
      content:
        "As someone who values both function and style, I couldn't be happier with my purchase. The colors are vibrant and the quality is exceptional.",
      rating: 5,
      image: "/images/product-purple.jpeg",
    },
  ]

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gray-900 text-white" ref={targetRef}>
      {/* Full-screen 3D objects background */}
      <div className="fixed inset-0 z-0">
        <ObjectParticles count={40} background="#111827" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70 pointer-events-none"></div>
      </div>

      {/* Loading screen with logo */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h1 className="text-5xl font-bold text-white">SWAGIFYY</h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-16 h-1 bg-primary rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-white"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.5,
                  ease: "linear",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="min-h-screen relative flex items-center justify-center overflow-hidden z-10 pt-20"
        style={{ opacity: headerOpacity, y: headerY }}
      >
        <div className="container mx-auto px-6 z-10 pt-20">
          <div className="text-center max-w-3xl mx-auto relative z-10">
            <p className="hero-eyebrow text-sm font-medium tracking-wider uppercase mb-2 inline-block px-3 py-1 rounded-full bg-gray-800/80 backdrop-blur-sm">
              Premium Collection
            </p>

            <h1 className="hero-heading text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
              <span className="block">Interactive 3D</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Product Experience
              </span>
            </h1>

            <p className="hero-subheading text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore our premium 3D products with full interactive capabilities. Rotate, zoom, and examine every detail
              before you purchase.
            </p>

            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group relative overflow-hidden">
                <span className="relative z-10">Shop Now</span>
                <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ShoppingBag className="ml-2 h-5 w-5 inline" />
              </Button>

              <Button variant="outline" size="lg" className="group hover:border-primary bg-gray-800/50 text-white">
                <span className="group-hover:text-primary transition-colors duration-300">View Catalog</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
              </Button>
            </div>
          </div>

          <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 text-white">
            <ChevronDown size={30} />
          </div>
        </div>
      </motion.section>

      {/* 3D Product Viewer Section */}


      {/* Interactive Models Section with Hover Effects */}
      <InteractiveModelsSection />

      {/* Scroll Animation Section */}

      {/* Product Collection */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <AnimatedText
              type="chars"
              stagger={0.02}
              y={20}
              className="text-sm font-medium tracking-wider uppercase text-primary inline-block px-3 py-1 rounded-full bg-primary/20 mb-2"
              onScrollTrigger={true}
            >
              Our Collections
            </AnimatedText>

            <AnimatedText
              type="words"
              stagger={0.05}
              y={30}
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              onScrollTrigger={true}
            >
              Explore Our 3D Product Collections
            </AnimatedText>

            <AnimatedText
              type="lines"
              stagger={0.08}
              y={20}
              className="text-lg text-gray-300 max-w-2xl mx-auto"
              onScrollTrigger={true}
            >
              Browse through our interactive 3D collections. Each product can be viewed and manipulated in real-time for
              a true-to-life shopping experience.
            </AnimatedText>
          </div>

          <ProductGallery />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative z-10">
        <div className="absolute inset-0 bg-gray-800/30 backdrop-blur-sm"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-12">
            <AnimatedText
              type="chars"
              stagger={0.02}
              y={20}
              className="text-sm font-medium tracking-wider uppercase text-primary inline-block px-3 py-1 rounded-full bg-primary/20 mb-2"
              onScrollTrigger={true}
            >
              Customer Reviews
            </AnimatedText>

            <TextScramble
              phrases={["What Our Customers Say", "Real People, Real Reviews", "Trusted Testimonials"]}
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              speed={0.1}
              delay={4}
            />

            <AnimatedText
              type="lines"
              stagger={0.08}
              y={20}
              className="text-lg text-gray-300 max-w-2xl mx-auto"
              onScrollTrigger={true}
            >
              Don't just take our word for it. See what our customers have to say about our products.
            </AnimatedText>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="absolute inset-0 bg-gray-800/50 backdrop-blur-sm"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedText
              type="words"
              stagger={0.05}
              y={30}
              className="text-3xl md:text-5xl font-bold mb-6 text-white"
              onScrollTrigger={true}
            >
              Experience Shopping in 3D
            </AnimatedText>

            <AnimatedText
              type="lines"
              stagger={0.08}
              y={20}
              className="text-lg md:text-xl text-gray-300 mb-8"
              onScrollTrigger={true}
            >
              Join thousands of customers who have discovered the future of online shopping with SWAGIFYY's interactive
              3D product experiences.
            </AnimatedText>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
                Shop the Collection
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg bg-gray-800/50"
              >
                View Catalog
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900/80 backdrop-blur-md text-white relative z-10 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SWAGIFYY</h3>
              <p className="text-gray-400">
                Revolutionizing online shopping with interactive 3D product experiences and cutting-edge technology.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Shop</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    All Products
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Featured
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Sale
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Warranty
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 SWAGIFYY. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
