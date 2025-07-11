"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ObjectParticles from "@/components/backgrounds/object-particles";
import Navbar from "@/components/navbar";
import { ArrowLeft, ShoppingCart } from "lucide-react";

/* UPDATED list */
const products = [
  {
    id: "1",
    name: "Smart Watch Pro X",
    image: "/images/product-blue.jpeg",
    price: 149.99,
  },
  {
    id: "2",
    name: "Fitness Tracker Mini",
    image: "/images/product-purple.jpeg",
    price: 99.99,
  },
  {
    id: "3",
    name: "Lab Assistant L-3",
    image: "/images/product-purple.jpeg", // your new thumbnail
    price: 129.99,
  },
];

const ProductsList = () => (
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
              <Image src={p.image} alt={p.name} fill className="object-cover" />
            </div>

            <div className="mt-6 space-y-2">
              <h2 className="text-xl font-bold">{p.name}</h2>
              <p className="text-primary text-2xl font-bold">${p.price}</p>
            </div>

            <Link
              href={`/Character/${p.id}`}
              className="mt-auto inline-flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition mt-6"
            >
              <ShoppingCart className="h-5 w-5" />
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  </main>
);

export default ProductsList;
