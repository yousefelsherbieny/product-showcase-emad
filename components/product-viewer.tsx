"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stage, PresentationControls } from "@react-three/drei"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Rotate3D, ZoomIn, ZoomOut, RefreshCw } from "lucide-react"
import type * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

// Update the Model component to handle the jacket model more robustly
function Model({ modelPath }: { modelPath: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [modelError, setModelError] = useState(false)
  const [model, setModel] = useState<THREE.Group | null>(null)

  // Use the direct blob URL for the jacket model
  const jacketModelUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jacket-5ubbNEPTyi791kYKsxyo33s45TR5Ti.glb"

  useEffect(() => {
    // Load the model
    const loader = new GLTFLoader()
    loader.load(
      jacketModelUrl,
      (gltf) => {
        // Success callback
        setModel(gltf.scene)
      },
      undefined,
      (error) => {
        // Error callback
        console.error("Error loading model:", error)
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
  }, [jacketModelUrl])

  // Create a simple rotating cube as fallback
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
    }
  })

  // If there's an error or we're still loading, render a cube
  if (modelError || !model) {
    return (
      <mesh ref={meshRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[2, 3, 0.5]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
    )
  }

  // Otherwise, render the model
  return <primitive object={model} scale={1} position={[0, 0, 0]} />
}

interface ControlsProps {
  zoomSpeed: number
  setZoomSpeed: (speed: number) => void
  resetCamera: () => void
}

function Controls({ zoomSpeed, setZoomSpeed, resetCamera }: ControlsProps) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-md z-10">
      <Button
        size="sm"
        variant="outline"
        onClick={() => setZoomSpeed(zoomSpeed + 0.5)}
        className="w-10 h-10 p-0 rounded-full"
        aria-label="Zoom in"
      >
        <ZoomIn size={18} />
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={() => setZoomSpeed(Math.max(0.5, zoomSpeed - 0.5))}
        className="w-10 h-10 p-0 rounded-full"
        aria-label="Zoom out"
      >
        <ZoomOut size={18} />
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={resetCamera}
        className="w-10 h-10 p-0 rounded-full"
        aria-label="Reset view"
      >
        <RefreshCw size={18} />
      </Button>
    </div>
  )
}

// Update the ProductViewer component to use the direct blob URL
export default function ProductViewer({ modelPath }: { modelPath: string }) {
  const [zoomSpeed, setZoomSpeed] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const controlsRef = useRef<OrbitControls>(null)

  // Hide loading indicator after a delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  return (
    <div className="w-full h-full relative group">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10 opacity-100 animate-fadeOut pointer-events-none">
          <div className="w-16 h-16 border-4 border-t-primary border-b-primary rounded-full animate-spin"></div>
        </div>
      )}

      <Suspense fallback={null}>
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
          <PresentationControls
            global
            zoom={zoomSpeed}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <Stage environment="city" intensity={0.6}>
              <Model modelPath={modelPath} />
            </Stage>
          </PresentationControls>
          <OrbitControls ref={controlsRef} enableZoom={true} enablePan={false} minDistance={2} maxDistance={8} />
        </Canvas>
      </Suspense>

      <Controls zoomSpeed={zoomSpeed} setZoomSpeed={setZoomSpeed} resetCamera={resetCamera} />

      <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-md">
        <Rotate3D className="h-5 w-5 text-gray-600" />
        <span className="text-xs text-gray-600 block mt-1">Drag to rotate</span>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  )
}
