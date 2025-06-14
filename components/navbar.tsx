"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900/90 backdrop-blur-md py-2" : "bg-transparent py-3"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-10">
              <h1 className="text-2xl font-bold text-white">SWAGIFYY</h1>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/auth/login" className="text-white hover:text-primary transition-colors font-medium">
                Login
              </Link>
            </nav>

            <Link href="/cart" passHref>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-white/20 text-white hover:bg-white/10 rounded-md"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Cart
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
