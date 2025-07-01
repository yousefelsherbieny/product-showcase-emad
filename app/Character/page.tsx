"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ObjectParticles from "@/components/backgrounds/object-particles";
import Navbar from "@/components/navbar";
import { ShoppingCart } from "lucide-react";

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
];

const ProductsList = () => {
  return (
    <main className="relative min-h-screen bg-gray-900 text-white">
      <div className="fixed inset-0 z-0">
        <ObjectParticles count={40} background="#111827" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70 pointer-events-none"></div>
      </div>

      <Navbar />

      <div className="container mx-auto px-6 py-24 relative z-10">
        <h1 className="text-3xl font-bold mb-8 text-center">All Smartwatches</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl shadow-lg flex flex-col"
            >
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
              <p className="text-primary text-xl font-bold">${product.price}</p>

              <Link
                href={`/Character/${product.id}`}
                className="mt-auto inline-flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition"
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
};

export default ProductsList;
