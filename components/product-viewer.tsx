"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, PresentationControls, Stage } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import type * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Rotate3D, ZoomIn, ZoomOut, RefreshCw } from "lucide-react";

/* ------------------------------------------------------------------ */
/* 1.  Default GLB URL lives here                                     */
const DEFAULT_JACKET_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jacket-5ubbNEPTyi791kYKsxyo33s45TR5Ti.glb";

/* ------------------------------------------------------------------ */
/* 2.  Fallback cube (same as before)                                 */
function FallbackCube() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.elapsedTime * 0.5;
      mesh.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.2;
    }
  });
  return (
    <mesh ref={mesh}>
      <boxGeometry args={[2, 3, 0.5]} />
      <meshStandardMaterial color="#3b82f6" />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* 3.  Model loader                                                   */
function GLBModel({ url }: { url: string }) {
  const [group, setGroup] = useState<THREE.Group>();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const loader = new GLTFLoader();
    let active = true;
    loader.load(
      url,
      (gltf) => active && setGroup(gltf.scene),
      undefined,
      () => active && setFailed(true)
    );
    return () => (active = false);
  }, [url]);

  if (failed || !group) return <FallbackCube />;
  return <primitive object={group} scale={1} />;
}

/* ------------------------------------------------------------------ */
/* 4.  Zoom / reset bar                                               */
function ControlsBar({
  zoom,
  setZoom,
  reset,
}: {
  zoom: number;
  setZoom: (n: number) => void;
  reset: () => void;
}) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow z-10">
      <Button
        size="sm"
        variant="outline"
        className="w-9 h-9 p-0 rounded-full"
        onClick={() => setZoom(zoom + 0.5)}
      >
        <ZoomIn size={18} />
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="w-9 h-9 p-0 rounded-full"
        onClick={() => setZoom(Math.max(0.5, zoom - 0.5))}
      >
        <ZoomOut size={18} />
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="w-9 h-9 p-0 rounded-full"
        onClick={reset}
      >
        <RefreshCw size={18} />
      </Button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5.  ProductViewer component                                        */
export default function ProductViewer({
  modelPath = DEFAULT_JACKET_URL /* 👈 default value */,
}: {
  modelPath?: string;
}) {
  const [zoom, setZoom] = useState(1);
  const controlsRef = useRef<OrbitControls>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* disable wheel when pointer outside viewer */
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const inside = wrapperRef.current?.contains(e.target as Node);
      if (controlsRef.current) controlsRef.current.enabled = !!inside;
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  const resetCam = () => controlsRef.current?.reset();

  return (
    <div ref={wrapperRef} className="w-full h-full relative">
      {/* drag tooltip */}
      <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded shadow text-gray-600 z-10">
        <Rotate3D className="h-5 w-5 inline mr-1" />
        <span className="text-xs">Drag to rotate</span>
      </div>

      <Suspense fallback={null}>
        <Canvas
          frameloop="demand"
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 50 }}
          className="absolute inset-0"
          style={{ transform: "translateZ(0)" }} /* gpu layer */
        >
          <PresentationControls
            global
            zoom={zoom}
            config={{ mass: 1, tension: 120, friction: 14 }}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <Stage environment="city" intensity={0.6} shadows={false}>
              <GLBModel url={modelPath} />
            </Stage>
          </PresentationControls>

          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom
            minDistance={2}
            maxDistance={8}
          />

          <InvalidateOnControls controlsRef={controlsRef} />
        </Canvas>
      </Suspense>

      <ControlsBar zoom={zoom} setZoom={setZoom} reset={resetCam} />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}

/* helper */
function InvalidateOnControls({
  controlsRef,
}: {
  controlsRef: React.RefObject<OrbitControls>;
}) {
  const invalidate = useThree((s) => s.invalidate);
  useFrame(() => {
    if (controlsRef.current && controlsRef.current.update()) invalidate();
  });
  return null;
}
