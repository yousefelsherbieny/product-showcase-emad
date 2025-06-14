"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PresentationControls, Environment, ContactShadows } from "@react-three/drei"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Rotate3D, ZoomIn, ZoomOut, RefreshCw } from "lucide-react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

// Model component that handles loading and displaying the 3D model
function Model({ modelUrl, modelType, colorHex, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], ...props }) {
  const group = useRef()
  const [modelError, setModelError] = useState(false)
  const [model, setModel] = useState(null)

  useEffect(() => {
    // Load the model
    const loader = new GLTFLoader()
    loader.load(
      modelUrl,
      (gltf) => {
        // Success callback
        const loadedModel = gltf.scene.clone()

        // Apply color to the model
        loadedModel.traverse((child) => {
          if (child.isMesh && child.material) {
            // Create a new material to avoid modifying the original
            const newMaterial = child.material.clone()

            // Apply the color
            newMaterial.color = new THREE.Color(colorHex)

            // Keep some properties from the original material
            if (child.material.map) {
              newMaterial.map = child.material.map
            }

            child.material = newMaterial
          }
        })

        setModel(loadedModel)
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
  }, [modelUrl, colorHex])

  // Create a fallback geometry based on model type
  const getFallbackGeometry = () => {
    switch (modelType) {
      case "smartwatch":
        return (
          <group>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.8, 0.9, 0.2]} />
              <meshStandardMaterial color={colorHex} roughness={0.3} metalness={0.7} />
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
              <meshStandardMaterial color={colorHex} roughness={0.3} metalness={0.5} />
            </mesh>
          </group>
        )
      case "jacket":
        return (
          <group>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1.5, 2, 0.5]} />
              <meshStandardMaterial color={colorHex} roughness={0.5} metalness={0.2} />
            </mesh>
          </group>
        )
      default:
        return (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={colorHex} roughness={0.3} metalness={0.7} />
          </mesh>
        )
    }
  }

  // Animate the model
  useFrame((state) => {
    if (group.current) {
      // Subtle floating animation
      const t = state.clock.getElapsedTime()
      group.current.rotation.y = Math.sin(t / 4) * 0.3 + rotation[1]
    }
  })

  // Get model scale based on type
  const getModelScale = () => {
    const baseScale = scale
    switch (modelType) {
      case "smartwatch":
        return baseScale * 3
      case "speaker":
        return baseScale * 2.5
      case "mug":
        return baseScale * 2
      case "bottle":
        return baseScale * 2
      case "notebook":
        return baseScale * 1.5
      case "jacket":
        return baseScale * 1
      default:
        return baseScale
    }
  }

  return (
    <group ref={group} {...props} dispose={null}>
      {modelError || !model ? (
        // Render fallback if there's an error
        <group scale={getModelScale()} position={position} rotation={rotation}>
          {getFallbackGeometry()}
        </group>
      ) : (
        // Render the actual model if available
        <primitive object={model} scale={getModelScale()} position={position} rotation={rotation} />
      )}
    </group>
  )
}

export default function ProductDetailViewer({ modelUrl, modelType, colorHex }) {
  const [zoomLevel, setZoomLevel] = useState(1.2)
  const controlsRef = useRef(null)

  const increaseZoom = () => setZoomLevel((prev) => Math.min(prev + 0.2, 2.5))
  const decreaseZoom = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.8))
  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
    setZoomLevel(1.2)
  }

  return (
    <div className="w-full h-full relative">
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="w-12 h-12 border-4 border-t-primary border-b-primary rounded-full animate-spin"></div>
          </div>
        }
      >
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

          <PresentationControls
            global
            zoom={zoomLevel}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <Model
              modelUrl={modelUrl}
              modelType={modelType}
              colorHex={colorHex}
              scale={1}
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
            />
          </PresentationControls>

          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.5} />
          <Environment preset="city" />
          <OrbitControls ref={controlsRef} enableZoom={true} enablePan={false} minDistance={2} maxDistance={8} />
        </Canvas>
      </Suspense>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/10 backdrop-blur-sm p-2 rounded-lg shadow-md z-10">
        <Button
          size="sm"
          variant="outline"
          onClick={increaseZoom}
          className="w-10 h-10 p-0 rounded-full bg-gray-800/70 border-gray-700 text-white hover:bg-gray-700"
          aria-label="Zoom in"
        >
          <ZoomIn size={18} />
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={decreaseZoom}
          className="w-10 h-10 p-0 rounded-full bg-gray-800/70 border-gray-700 text-white hover:bg-gray-700"
          aria-label="Zoom out"
        >
          <ZoomOut size={18} />
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={resetView}
          className="w-10 h-10 p-0 rounded-full bg-gray-800/70 border-gray-700 text-white hover:bg-gray-700"
          aria-label="Reset view"
        >
          <RefreshCw size={18} />
        </Button>
      </div>

      <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm p-2 rounded-lg shadow-md">
        <Rotate3D className="h-5 w-5 text-white" />
        <span className="text-xs text-white block mt-1">Drag to rotate</span>
      </div>
    </div>
  )
}
