"use client";

import React, { Suspense, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import ImageGallery from "react-image-gallery";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useProgress } from "@react-three/drei";
import "react-image-gallery/styles/css/image-gallery.css";

import ObjectParticles from "@/components/backgrounds/object-particles";
import Navbar from "@/components/navbar";
import AnimatedModel from "./AnimatedModel";

import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Speech, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/CartContext";

/* ---------------------------------------------------------------------- */
/* Product catalogue — each item now has                                   
      anim       → URL of its animation-only GLB                           
      secondClip → name of the clip that is NOT “Idle” (e.g. Talk, Sing)  */
const products: Record<
  string,
  {
    name: string;
    price: number;
    model: string;
    anim: string;
    secondClip: "Talk" | "Sing";
    description: string;
    images: string[];
  }
> = {
  "1": {
    name: "Emaraty Local",
    price: 149.99,
    model:
      "https://1vfocskwu2x8m0jf.public.blob.vercel-storage.com/Lol-KgsAoE24JXM5kYYtSoMtUMbi6K3Tdk.glb",
    anim: "https://1vfocskwu2x8m0jf.public.blob.vercel-storage.com/Anims.glb",
    secondClip: "Talk",
    description:
      "Modern smartwatch with health and fitness tracking. Track your heart rate, sleep, and steps.",
    images: ["/I2.JPG", "/I3.JPG", "/I1.JPG"],
  },

  /* AMIR — Idle + Sing -------------------------------------------------- */
  "2": {
    name: "Amir Eid",
    price: 99.99,
    model: "https://1vfocskwu2x8m0jf.public.blob.vercel-storage.com/Amir.glb",
    anim: "https://1vfocskwu2x8m0jf.public.blob.vercel-storage.com/AnimSng.glb",
    secondClip: "Sing",
    description:
      "Compact fitness tracker for daily activities and health insights.",
    images: ["/A1.JPG", "/A4.JPG", "/A3.JPG"],
  },

  /* LAB — Idle + Talk --------------------------------------------------- */
  "3": {
    name: "Labubu",
    price: 129.99,
    model: "https://1vfocskwu2x8m0jf.public.blob.vercel-storage.com/Lab.glb",
    anim: "https://1vfocskwu2x8m0jf.public.blob.vercel-storage.com/AnimLb.glb",
    secondClip: "Talk",
    description:
      "Interactive virtual lab assistant with animated speech and idle poses.",
    images: ["/L4.jpg", "/L2.jpg", "/L3.jpg"],
  },
  "4": {
    name: "Bellie eilesh",
    price: 129.99,
    model:
      "https://1vfocskwu2x8m0jf.public.blob.vercel-storage.com/Bellie3.glb",
    anim: "https://1vfocskwu2x8m0jf.public.blob.vercel-storage.com/Anims.glb",
    secondClip: "Sing",
    description:
      "Interactive virtual lab assistant with animated speech and idle poses.",
    images: ["/B4.jpg", "/B3.jpg", "/B2.jpg"],
  },
  "5": {
    name: "Elsa Frozen",
    price: 129.99,
    model: "https://1vfocskwu2x8m0jf.public.blob.vercel-storage.com/Elsa.glb",
    anim: "https://1vfocskwu2x8m0jf.public.blob.vercel-storage.com/AnimSng.glb",
    secondClip: "Sing",
    description:
      "Interactive virtual lab assistant with animated speech and idle poses.",
    images: ["/E1.jpg", "/E2.jpg", "/E3.jpg"],
  },
  "6": {
    name: "Messi",
    price: 129.99,
    model: "https://1vfocskwu2x8m0jf.public.blob.vercel-storage.com/Messi.glb",
    anim: "https://1vfocskwu2x8m0jf.public.blob.vercel-storage.com/AnimSng.glb",
    secondClip: "Sing",
    description:
      "Interactive virtual lab assistant with animated speech and idle poses.",
    images: ["/ER.jpg", "/F.jpg", "/K.jpg"],
  },
};

/* ---------------------------------------------------------------------- */
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

/* ---------------------------------------------------------------------- */
const ProductDetailsPage = () => {
  const { id } = useParams();
  const product = products[id as string];
  const [active, setActive] = useState(false); // false = Idle, true = secondClip
  const { addToCart } = useCart();

  if (!product)
    return <div className="text-white p-10">Product not found.</div>;

  const images = product.images.map((src) => ({
    original: src,
    thumbnail: src,
  }));

  return (
    <main className="relative min-h-screen bg-gray-900 text-white">
      {/* background */}
      <div className="fixed inset-0 z-0">
        <ObjectParticles count={40} background="#111827" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70 pointer-events-none" />
      </div>

      <Navbar />

      <div className="container mx-auto px-6 py-12 relative z-10 pt-24 space-y-12">
        {/* 1️⃣ Back to Characters button */}
        <div className="flex items-center mb-8 max-w-6xl mx-auto">
          <Link
            href="/Character"
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span>Back to Characters</span>
          </Link>
        </div>

        {/* 2️⃣ Gallery + 3-D viewer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl shadow-lg">
            <ImageGallery items={images} showPlayButton={false} />
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg h-[400px] md:h-full">
            <Canvas camera={{ position: [-0.5, 1, 1], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} />
              <OrbitControls />
              <Suspense fallback={<LoadingModel />}>
                <AnimatedModel
                  modelPath={product.model}
                  animPath={product.anim}
                  clip={active ? product.secondClip : "Idle"}
                />
              </Suspense>
            </Canvas>
          </div>
        </div>

        {/* 3️⃣ Info + action buttons */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-400 text-sm">
              Premium 3-D animated character
            </p>
            <p className="text-primary text-2xl font-bold">${product.price}</p>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                size="lg"
                className="flex-1"
                onClick={() =>
                  addToCart({
                    id: id as string,
                    name: product.name,
                    price: product.price,
                    image: product.images[0], // أول صورة
                    quantity: 1,
                    modelUrl: product.model, // ✅ ده أهم سطر
                  })
                }
              >
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
              <Button
                variant="secondary"
                size="lg"
                className="flex-1"
                onClick={() => setActive((v) => !v)}
              >
                <Speech className="mr-2 h-5 w-5" />
                {active
                  ? `Stop ${product.secondClip}`
                  : `Play ${product.secondClip} Anim`}
              </Button>
            </div>
          </div>
        </div>

        {/* 4️⃣ Description */}
        <div className="max-w-6xl mx-auto bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Character Description</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
