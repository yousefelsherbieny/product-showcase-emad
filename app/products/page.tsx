"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import ObjectParticles from "@/components/backgrounds/object-particles"
import ProductModelCard from "@/components/product-model-card"

export default function ProductsPage() {
  const products = [
    {
      id: "1",
      name: "Premium Smartwatch",
      price: "$199.99",
      description: "Track your fitness, receive notifications, and stay connected with our premium smartwatch.",
      modelUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smartwatch%28glb%29-xlWo8178XSp1RMszLSzazCmmQNpkym.glb",
      modelType: "smartwatch",
    },
    {
      id: "2",
      name: "JBL Wireless Speaker",
      price: "$149.99",
      description:
        "Immersive sound quality with deep bass and crystal clear highs. Portable design with long battery life.",
      modelUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jbl%20speaker%28glb%291-gTNzgjjsH94jqjegL1FNvvBjjCBoti.glb",
      modelType: "speaker",
    },
    {
      id: "3",
      name: "Urban Jacket",
      price: "$249.99",
      description: "Stay stylish and comfortable with our premium urban jacket, perfect for any weather condition.",
      modelUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jacket-5ubbNEPTyi791kYKsxyo33s45TR5Ti.glb",
      modelType: "jacket",
    },
    {
      id: "4",
      name: "Ceramic Mug",
      price: "$24.99",
      description: "Premium ceramic mug with elegant design, perfect for your morning coffee or tea.",
      modelUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mug-BivPFFfCD2ohHqrX8QLYUs7IfC9NJr.glb",
      modelType: "mug",
    },
    {
      id: "5",
      name: "Water Bottle",
      price: "$29.99",
      description:
        "Eco-friendly water bottle that keeps your drinks cold for hours. Perfect for gym or outdoor activities.",
      modelUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/plastic%20water%20bottle%20-Uoj1aA8VEzLSwKeeruBEzNE2Aabm2H.glb",
      modelType: "bottle",
    },
    {
      id: "6",
      name: "Notebook",
      price: "$19.99",
      description: "Premium quality notebook with smooth paper, perfect for sketching, journaling, or taking notes.",
      modelUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/notebook-Hl6smPi3eG0MqLOgVzbp3bOnAnGLq6.glb",
      modelType: "notebook",
    },
  ]

  return (
    <main className="relative min-h-screen bg-gray-900 text-white">
      {/* 3D Objects Background */}
      <div className="fixed inset-0 z-0">
        <ObjectParticles count={30} background="#111827" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70 pointer-events-none"></div>
      </div>

      {/* Navbar */}
      <Navbar />

      <div className="container mx-auto px-6 py-12 relative z-10 pt-24">
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold ml-auto">All 3D Products</h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Number.parseInt(product.id) * 0.1 }}
            >
              <Link href={`/products/${product.id}`} className="block h-full">
                <ProductModelCard
                  title={product.name}
                  description={product.description}
                  price={product.price}
                  modelUrl={product.modelUrl}
                  modelType={product.modelType}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
