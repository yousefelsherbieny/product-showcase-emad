"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment } from "@react-three/drei"
import * as THREE from "three"

// Simple 3D objects that resemble common items
const AirPod = ({ color = "white", ...props }) => {
  return (
    <group {...props}>
      <mesh>
        <capsuleGeometry args={[0.4, 1.2, 4, 8]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.3} />
      </mesh>
      <mesh position={[0, -0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.8, 8]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.3} />
      </mesh>
    </group>
  )
}

const Headphone = ({ color = "#333333", ...props }) => {
  return (
    <group {...props}>
      {/* Headband */}
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[1, 0.1, 8, 16, Math.PI]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Ear cups */}
      <mesh position={[-1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 16]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 16]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
      </mesh>
    </group>
  )
}

const Bag = ({ color = "#7c3aed", ...props }) => {
  return (
    <group {...props}>
      {/* Main bag body */}
      <mesh>
        <boxGeometry args={[1.5, 1.2, 0.5]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Handle */}
      <mesh position={[0, 0.8, 0]}>
        <torusGeometry args={[0.4, 0.05, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#222" roughness={0.5} metalness={0.2} />
      </mesh>
    </group>
  )
}

const GlassObject = ({ color = "#88ccff", ...props }) => {
  return (
    <mesh {...props}>
      <dodecahedronGeometry args={[0.8, 0]} />
      <meshPhysicalMaterial color={color} roughness={0} transmission={0.9} thickness={0.5} envMapIntensity={1} />
    </mesh>
  )
}

const Phone = ({ color = "#222", ...props }) => {
  return (
    <group {...props}>
      <mesh>
        <boxGeometry args={[0.8, 1.6, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.051]}>
        <boxGeometry args={[0.7, 1.5, 0.01]} />
        <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.5} />
      </mesh>
    </group>
  )
}

const Watch = ({ color = "#555", ...props }) => {
  return (
    <group {...props}>
      <mesh>
        <boxGeometry args={[0.8, 0.9, 0.2]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0, 0.11]}>
        <boxGeometry args={[0.7, 0.8, 0.01]} />
        <meshStandardMaterial color="#000" roughness={0.2} metalness={0.5} emissive="#003" />
      </mesh>
    </group>
  )
}

// Animated object with rotation
function AnimatedObject({ shape, color, position, rotation, scale }) {
  const ref = useRef()
  const [rotationSpeed] = useState(() => ({
    x: THREE.MathUtils.randFloat(0.001, 0.003) * (Math.random() > 0.5 ? 1 : -1),
    y: THREE.MathUtils.randFloat(0.001, 0.003) * (Math.random() > 0.5 ? 1 : -1),
    z: THREE.MathUtils.randFloat(0.001, 0.003) * (Math.random() > 0.5 ? 1 : -1),
  }))

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += rotationSpeed.x
      ref.current.rotation.y += rotationSpeed.y
      ref.current.rotation.z += rotationSpeed.z
    }
  })

  const props = { ref, position, rotation, scale, color }

  switch (shape) {
    case 0:
      return <AirPod {...props} />
    case 1:
      return <Headphone {...props} />
    case 2:
      return <Bag {...props} />
    case 3:
      return <GlassObject {...props} />
    case 4:
      return <Phone {...props} />
    case 5:
      return <Watch {...props} />
    default:
      return <AirPod {...props} />
  }
}

// Main component that renders all objects
function ObjectsRenderer({ count = 30, colors = ["#3b82f6", "#ec4899", "#8b5cf6", "#f97316", "#10b981", "#f59e0b"] }) {
  const [objects, setObjects] = useState([])

  useEffect(() => {
    // Generate random positions, rotations, and scales for each object
    const newObjects = Array.from({ length: count }, (_, i) => {
      const shape = Math.floor(Math.random() * 6) // 0-5 for different shapes
      const color = colors[Math.floor(Math.random() * colors.length)]
      const position = [
        THREE.MathUtils.randFloatSpread(30),
        THREE.MathUtils.randFloatSpread(30),
        THREE.MathUtils.randFloatSpread(15) - 5,
      ]
      const rotation = [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2]
      const scale = THREE.MathUtils.randFloat(0.5, 2.0)

      return { id: i, shape, color, position, rotation, scale }
    })

    setObjects(newObjects)
  }, [count, colors])

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      <group>
        {objects.map((obj) => (
          <Float key={obj.id} speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
            <AnimatedObject
              key={obj.id}
              shape={obj.shape}
              color={obj.color}
              position={obj.position}
              rotation={obj.rotation}
              scale={obj.scale}
            />
          </Float>
        ))}
      </group>

      <Environment preset="city" />
    </>
  )
}

interface ObjectParticlesProps {
  className?: string
  count?: number
  colors?: string[]
  background?: string
}

export default function ObjectParticles({
  className = "",
  count = 30,
  colors = ["#3b82f6", "#ec4899", "#8b5cf6", "#f97316", "#10b981", "#f59e0b"],
  background = "transparent",
}: ObjectParticlesProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} style={{ background }} dpr={[1, 2]}>
        <ObjectsRenderer count={count} colors={colors} />
      </Canvas>
    </div>
  )
}
