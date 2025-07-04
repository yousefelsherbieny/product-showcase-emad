"use client";

import React, { Suspense } from "react";
import { useParams } from "next/navigation";
import ImageGallery from "react-image-gallery";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Html,
  useProgress,
} from "@react-three/drei";
import "react-image-gallery/styles/css/image-gallery.css";
import ObjectParticles from "@/components/backgrounds/object-particles";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, ShoppingBag } from "lucide-react";

// بيانات المنتجات
const products: Record<string, any> = {
  "1": {
    name: "Smart Watch Pro X",
    price: 149.99,
    model:
      "https://1vfocskwu2x8m0jf.public.blob.vercel-storage.com/Lol-KgsAoE24JXM5kYYtSoMtUMbi6K3Tdk.glb",
    description:
      "Modern smartwatch with health and fitness tracking. Track your heart rate, sleep, and steps.",
    images: [
      "/images/product-blue.jpeg",
      "/images/product-clothing.jpeg",
      "/images/product-peach.jpeg",
    ],
  },
  "2": {
    name: "Fitness Tracker Mini",
    price: 99.99,
      model: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mug-BivPFFfCD2ohHqrX8QLYUs7IfC9NJr.glb",
    description:
      "Compact fitness tracker for daily activities and health insights.",
    images: ["/images/product-pink.jpeg", "/images/product-purple.jpeg"],
  },
};

// تحميل الموديل
function ModelViewer({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={1} />;
}

// Progress bar + نص
function LoadingModel() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center text-sm text-white bg-black/70 px-6 py-4 rounded-xl shadow-lg min-w-[200px]">
        <span className="mb-2">Loading 3D model</span>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="bg-cyan-400 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Html>
  );
}

// صفحة التفاصيل
const ProductDetailsPage = () => {
  const { id } = useParams();
  const product = products[id as string];

  if (!product) {
    return <div className="text-white p-10">Product not found.</div>;
  }

  const images = product.images.map((src: string) => ({
    original: src,
    thumbnail: src,
  }));

  return (
    <main className="relative min-h-screen bg-gray-900 text-white">
      <div className="fixed inset-0 z-0">
        <ObjectParticles count={40} background="#111827" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70 pointer-events-none"></div>
      </div>

      <Navbar />

      <div className="container mx-auto px-6 py-12 relative z-10 pt-24 space-y-12">
        {/* صور + موديل 3D */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl shadow-lg">
            <ImageGallery items={images} showPlayButton={false} />
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg h-[400px] md:h-full">
            <Canvas camera={{ position: [2, 2, 2], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} />
              <OrbitControls />
              <Suspense fallback={<LoadingModel />}>
                <ModelViewer modelPath={product.model} />
              </Suspense>
            </Canvas>
          </div>
        </div>

        {/* معلومات المنتج */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-400 text-sm">
              Premium smartwatch with advanced features
            </p>
            <p className="text-primary text-2xl font-bold">${product.price}</p>

            <div className="flex gap-2">
              <Button size="lg" className="flex-1">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1 bg-gray-800/50 border-gray-700 hover:bg-gray-700/50"
              >
                <Heart className="mr-2 h-5 w-5" />
                Wishlist
              </Button>
            </div>
          </div>
        </div>

        {/* وصف المنتج */}
        <div className="max-w-6xl mx-auto bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Product Description</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
