"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ObjectParticles from "@/components/backgrounds/object-particles";
import Navbar from "@/components/navbar";
import { ArrowLeft, ShoppingCart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/CartContext"; // ✅ import

/* ✅ UPDATED list WITH model */
const products = [
  {
    id: "1",
    name: "IMARATY Local",
    image: "/images/IMARATY/I4.JPG",
    price: 149.99,
    model: "https://1vfocskwu2x8m0jf.public.blob.vercel-storage.com/Lol-KgsAoE24JXM5kYYtSoMtUMbi6K3Tdk.glb"
  },
  {
    id: "2",
    name: "Amir Eid",
    image: "/images/EID/A2.JPG",
    price: 99.99,
    model: "https://1vfocskwu2x8m0jf.public.blob.vercel-storage.com/Amir.glb"
  },
  {
    id: "3",
    name: "Labubu",
    image: "/images/LABUBU/L1.jpg",
    price: 129.99,
    model: "https://1vfocskwu2x8m0jf.public.blob.vercel-storage.com/Lab.glb"
  },
  {
    id: "4",
    name: "Bellie eilesh",
    image: "/images/BELLIE/B1.jpg",
    price: 129.99,
    model: "https://1vfocskwu2x8m0jf.public.blob.vercel-storage.com/Bellie3.glb"
  },
  {
    id: "5",
    name: "Elsa Frozen",
    image: "/images/ELSA/E4.jpg",
    price: 129.99,
    model: "https://1vfocskwu2x8m0jf.public.blob.vercel-storage.com/Elsa.glb"
  },
  {
    id: "6",
    name: "Messi",
    image: "/images/Messi/E.jpg",
    price: 129.99,
    model: "https://1vfocskwu2x8m0jf.public.blob.vercel-storage.com/Messi.glb"
  },
];

const ProductsList = () => {
  const { addToCart } = useCart(); // ✅ استخدم دالة إضافة للسلة

  return (
    <main className="relative min-h-screen bg-gray-900 text-white">
      <div className="fixed inset-0 z-0">
        <ObjectParticles count={40} background="#111827" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70 pointer-events-none"></div>
      </div>

      <Navbar />

      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="flex items-center mb-8">
          <Link
            href="/"
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold ml-auto">All 3D Characters</h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-2xl flex flex-col transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="relative w-full h-[350px] rounded-xl overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mt-6 space-y-2">
                <h2 className="text-xl font-bold">{p.name}</h2>
                <p className="text-primary text-2xl font-bold">${p.price}</p>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-2 mt-6">
                <Link
                  href={`/Character/${p.id}`}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition w-full"
                >
                  <ShoppingCart className="h-5 w-5" />
                  View Details
                </Link>

                <button
                  onClick={() =>
                    addToCart({
                      id: p.id,
                      name: p.name,
                      price: p.price,
                      image: p.image,
                      quantity: 1,
                      modelUrl: p.model, // ✅ أضفها هنا
                    })
                  }
                  className="inline-flex items-center justify-center gap-2 border border-gray-500 text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-md transition w-full"
                >
                  <Plus className="h-5 w-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProductsList;
