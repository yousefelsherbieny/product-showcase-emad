"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import AnimatedText from "./animated-text"

export default function ProductGallery() {
  const [activeCollection, setActiveCollection] = useState("blue")
  const scrollRef = useRef<HTMLDivElement>(null)
  const productRef = useRef<HTMLDivElement>(null)

  const collections = [
    {
      id: "blue",
      name: "3D Aqua Collection",
      image: "/images/product-blue.jpeg",
      description: "Explore our 3D blue collection with interactive models that showcase every detail and feature.",
      price: "$39.99",
    },
    {
      id: "peach",
      name: "3D Stationery Collection",
      image: "/images/product-peach.jpeg",
      description: "Interact with our 3D stationery models to see how they'll look and function in real life.",
      price: "$24.99",
    },
    {
      id: "purple",
      name: "3D Travel Collection",
      image: "/images/product-purple.jpeg",
      description: "Examine our 3D travel accessories from every angle before taking them on your next adventure.",
      price: "$79.99",
    },
    {
      id: "pink",
      name: "3D Tech Collection",
      image: "/images/product-pink.jpeg",
      description: "Our 3D tech models let you see every port, button, and feature before you buy.",
      price: "$49.99",
    },
    {
      id: "clothing",
      name: "3D Apparel Collection",
      image: "/images/product-clothing.jpeg",
      description: "View our clothing in 3D to better understand the fit, texture, and details of each piece.",
      price: "$34.99",
    },
  ]

  const activeCollectionData = collections.find((c) => c.id === activeCollection) || collections[0]

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef
      const scrollAmount = direction === "left" ? -current.offsetWidth / 2 : current.offsetWidth / 2
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  useEffect(() => {
    if (productRef.current) {
      // Create animation for product details
      gsap.fromTo(
        ".product-details > *",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
        },
      )
    }
  }, [activeCollection])

  return (
    <div className="space-y-8">
      <div className="relative">
        <div ref={scrollRef} className="flex overflow-x-auto pb-6 space-x-4 scrollbar-hide">
          {collections.map((collection) => (
            <motion.div
              key={collection.id}
              className={`flex-shrink-0 relative cursor-pointer overflow-hidden rounded-xl ${
                activeCollection === collection.id ? "ring-4 ring-primary" : ""
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCollection(collection.id)}
            >
              <div className="w-64 h-40 relative">
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  fill
                  className="object-cover"
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    activeCollection === collection.id ? "bg-black/0" : "bg-black/40"
                  }`}
                />
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <div className="text-white font-medium">{collection.name}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800/80 text-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-700 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800/80 text-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-700 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <motion.div
        key={activeCollection}
        ref={productRef}
        className="grid md:grid-cols-2 gap-8 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
          <div className="h-[400px] relative group">
            <Image
              src={activeCollectionData.image || "/placeholder.svg"}
              alt={activeCollectionData.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        <div className="space-y-6 product-details">
          <div>
            <AnimatedText type="words" stagger={0.05} y={20} className="text-2xl font-bold mb-2 text-white">
              {activeCollectionData.name}
            </AnimatedText>

            <AnimatedText type="lines" stagger={0.08} y={20} className="text-gray-300">
              {activeCollectionData.description}
            </AnimatedText>
          </div>

          <div className="flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-.181h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-300">(42 reviews)</span>
          </div>

          <div className="text-2xl font-bold text-white">Starting at {activeCollectionData.price}</div>

          <Link href="/cart" passHref>
            <Button className="w-full sm:w-auto">
              <ShoppingBag className="mr-2 h-5 w-5" />
              View Collection
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
