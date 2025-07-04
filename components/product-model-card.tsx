"use client";

import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  PresentationControls,
  Float,
  ContactShadows,
  Html,
  useProgress,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

function ModelLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center text-white bg-black/70 px-4 py-2 rounded-md shadow-md min-w-[150px]">
        <span className="text-xs mb-2">Loading 3D model...</span>
        <div className="w-full h-1 bg-gray-600 rounded-full overflow-hidden">
          <div
            className="bg-cyan-400 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Html>
  );
}

function Model({
  modelUrl,
  modelType,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  hovered,
  ...props
}) {
  const group = useRef();
  const [modelError, setModelError] = useState(false);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        setModel(gltf.scene);
      },
      undefined,
      (error) => {
        console.error(`Error loading model from ${modelUrl}:`, error);
        setModelError(true);
      }
    );

    return () => {
      if (model) {
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((material) => material.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
      }
    };
  }, [modelUrl]);

  const getFallbackGeometry = () => {
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
        );
      case "speaker":
        return (
          <group>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.8, 0.8, 2, 32]} />
              <meshStandardMaterial color={0x222222} roughness={0.3} metalness={0.5} />
            </mesh>
          </group>
        );
      case "jacket":
        return (
          <group>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1.5, 2, 0.5]} />
              <meshStandardMaterial color={0x3b82f6} roughness={0.5} metalness={0.2} />
            </mesh>
          </group>
        );
      default:
        return (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={0x3b82f6} roughness={0.3} metalness={0.7} />
          </mesh>
        );
    }
  };

  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      group.current.rotation.y = Math.sin(t / 4) * 0.3 + rotation[1];
      if (hovered) {
        group.current.rotation.y += 0.01;
      }
    }
  });

  const getModelScale = () => {
    const baseScale = scale;
    switch (modelType) {
      case "smartwatch":
      case "mug":
      case "bottle":
      case "notebook":
        return baseScale * 5;
      case "speaker":
      case "jacket":
        return baseScale * 2.5;
      default:
        return baseScale;
    }
  };

  return (
    <group ref={group} {...props} dispose={null}>
      {modelError ? (
        <group scale={getModelScale()} position={position} rotation={rotation}>
          {getFallbackGeometry()}
        </group>
      ) : model ? (
        <primitive object={model} scale={getModelScale()} position={position} rotation={rotation} />
      ) : (
        <ModelLoader />
      )}
    </group>
  );
}

export default function ProductModelCard({ title, description, price, modelUrl, modelType }) {
  const [hovered, setHovered] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  const toggleInfo = (e) => {
    e.stopPropagation();
    setShowInfo(!showInfo);
  };

  return (
    <div
      className="relative h-[400px] bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-[1.02]"
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
          <Float
            speed={hovered ? 3 : 1}
            rotationIntensity={hovered ? 0.4 : 0.2}
            floatIntensity={hovered ? 0.6 : 0.3}
          >
            <Model
              modelUrl={modelUrl}
              modelType={modelType}
              scale={1}
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              hovered={hovered}
            />
          </Float>
        </PresentationControls>
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.5} />
        <Environment preset="city" />
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

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 to-transparent">
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-gray-300 text-sm mb-3">{price}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-primary font-medium">View Details</span>
          <Button
            size="sm"
            variant="outline"
            className="bg-gray-800/50 border-gray-700"
            onClick={toggleInfo}
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
