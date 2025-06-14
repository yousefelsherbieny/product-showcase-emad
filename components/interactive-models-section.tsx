"use client"

import { useState, useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, PresentationControls, Float, ContactShadows, Html } from "@react-three/drei"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Info } from "lucide-react"
import Link from "next/link"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import * as THREE from "three"

// Direct URLs for the models
const MODEL_URLS = {
  smartwatch:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smartwatch%28glb%29-xlWo8178XSp1RMszLSzazCmmQNpkym.glb",
  speaker:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jbl%20speaker%28glb%291-gTNzgjjsH94jqjegL1FNvvBjjCBoti.glb",
  jacket: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jacket-5ubbNEPTyi791kYKsxyo33s45TR5Ti.glb",
}

function Model({ modelType, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], hovered, ...props }) {
  const group = useRef()
  const [modelError, setModelError] = useState(false)
  const [model, setModel] = useState(null)

  // Get the correct URL for the model type
  const modelUrl = MODEL_URLS[modelType] || MODEL_URLS.smartwatch

  useEffect(() => {
    // Load the model
    const loader = new GLTFLoader()
    loader.load(
      modelUrl,
      (gltf) => {
        // Success callback
        setModel(gltf.scene)
      },
      undefined,
      (error) => {
        // Error callback
        console.error(`Error loading model from ${modelUrl}:`, error)
        setModelError(true)
      },
    )

    // Cleanup
    return () => {
      if (model) {
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry) child.geometry.dispose()
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((material) => material.dispose())
              } else {
                child.material.dispose()
              }
            }
          }
        })
      }
    }
  }, [modelUrl])

  // Create a fallback cube model if there's an error
  const fallbackGeometry = useMemo(() => {
    switch (modelType) {
      case "smartwatch":
        return (
          <group>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.8, 0.9, 0.2]} />
              <meshStandardMaterial color={0x333333} roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[0, 0, 0.11]}>
              <boxGeometry args={[0.7, 0.8, 0.01]} />
              <meshStandardMaterial color="#000000" roughness={0.2} metalness={0.5} />
            </mesh>
          </group>
        )
      case "speaker":
        return (
          <group>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.8, 0.8, 2, 32]} />
              <meshStandardMaterial color={0x222222} roughness={0.3} metalness={0.5} />
            </mesh>
          </group>
        )
      default:
        return (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={0x3b82f6} roughness={0.3} metalness={0.7} />
          </mesh>
        )
    }
  }, [modelType])

  // Animate the model
  useFrame((state) => {
    if (group.current) {
      // Subtle floating animation
      const t = state.clock.getElapsedTime()
      group.current.rotation.y = Math.sin(t / 4) * 0.3 + rotation[1]

      // Additional rotation speed when hovered (keeping this subtle effect)
      if (hovered) {
        group.current.rotation.y += 0.01
      }
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {modelError || !model ? (
        // Render fallback if there's an error
        <group scale={scale} position={position} rotation={rotation}>
          {fallbackGeometry}
        </group>
      ) : (
        // Render the actual model if available
        <primitive object={model} scale={scale} position={position} rotation={rotation} />
      )}
    </group>
  )
}

function ProductCard({
  modelType,
  title,
  description,
  price,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  modelScale = 1,
}) {
  const [hovered, setHovered] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  // Safe event handlers that don't rely on refs
  const handleMouseEnter = () => setHovered(true)
  const handleMouseLeave = () => setHovered(false)
  const toggleInfo = (e) => {
    e.stopPropagation() // Prevent event bubbling
    setShowInfo(!showInfo)
  }

  return (
    <div
      className="relative h-[500px] bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <PresentationControls
          global
          zoom={1.2}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <Float speed={hovered ? 3 : 1} rotationIntensity={hovered ? 0.4 : 0.2} floatIntensity={hovered ? 0.6 : 0.3}>
            <Model modelType={modelType} scale={modelScale} position={position} rotation={rotation} hovered={hovered} />
          </Float>
        </PresentationControls>
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.5} />
        <Environment preset="city" />

        {/* Product info overlay */}
        {showInfo && (
          <Html position={[0, 0, 0]} center>
            <div className="bg-gray-900/80 backdrop-blur-md p-4 rounded-lg text-white w-64 shadow-xl">
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-sm text-gray-300 mb-3">{description}</p>
              <p className="text-primary font-bold">{price}</p>
            </div>
          </Html>
        )}
      </Canvas>

      {/* UI Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 to-transparent">
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-gray-300 text-sm mb-3">{price}</p>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          <Button size="sm" variant="outline" className="bg-gray-800/50 border-gray-700" onClick={toggleInfo}>
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Removed the hover effect overlay */}
    </div>
  )
}

export default function InteractiveModelsSection() {
  return (
    <section className="py-24 relative z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium tracking-wider uppercase mb-2"
          >
            Hover to Interact
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Explore Our 3D Products
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Hover over our products to see them come to life. Interact with the 3D models to examine every detail before
            you buy.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <ProductCard
              modelType="smartwatch"
              title="Premium Smartwatch"
              description="Track your fitness, receive notifications, and stay connected with our premium smartwatch."
              price="$199.99"
              modelScale={3}
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ProductCard
              modelType="speaker"
              title="JBL Wireless Speaker"
              description="Immersive sound quality with deep bass and crystal clear highs. Portable design with long battery life."
              price="$149.99"
              modelScale={2.5}
              position={[0, 0, 0]}
              rotation={[0, Math.PI / 4, 0]}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">
            Experience the future of online shopping with our interactive 3D product displays. Hover, rotate, and zoom
            to explore every detail before making your purchase.
          </p>

          <Link href="/products">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              View All 3D Products
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
