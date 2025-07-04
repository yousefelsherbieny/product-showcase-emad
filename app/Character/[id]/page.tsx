"use client";

import React from "react";
import { useParams } from "next/navigation";
import ImageGallery from "react-image-gallery";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "react-image-gallery/styles/css/image-gallery.css";
import ObjectParticles from "@/components/backgrounds/object-particles";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, ShoppingBag } from "lucide-react";

// Dummy data (تقدر تخليها من API أو JSON خارجي بعدين)
const products: Record<string, any> = {
  "1": {
    name: "Smart Watch Pro X",
    price: 149.99,
    model: "/models/Lol.glb",
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
    model: "/models/mug.glb",
    description:
      "Compact fitness tracker for daily activities and health insights.",
    images: ["/images/product-pink.jpeg", "/images/product-purple.jpeg"],
  },
};

function ModelViewer({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={1} />;
}

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
              <ModelViewer modelPath={product.model} />
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
