"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ObjectParticles from "@/components/backgrounds/object-particles";
import Navbar from "@/components/navbar";

export default function CartPage() {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <main className="relative min-h-screen bg-gray-900 text-white">
      {/* 3D Objects Background */}
      <div className="fixed inset-0 z-0">
        <ObjectParticles count={40} background="#111827" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70 pointer-events-none"></div>
      </div>

      {/* Navbar */}
      <Navbar />

      <div className="container mx-auto px-6 py-12 relative z-10 pt-24">
        <div className="flex items-center mb-8">
          <Link
            href="/"
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span>Back to Shopping</span>
          </Link>
          <h1 className="text-3xl font-bold ml-auto">Your Cart</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 aspect-square relative rounded-lg overflow-hidden bg-gray-700">
                  <Image
                    src="/images/product-blue.jpeg"
                    alt="Premium Urban Jacket"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">Premium Urban Jacket</h3>
                    <p className="text-gray-300 text-sm">
                      Color: Blue | Size: Medium
                    </p>
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center border border-gray-600 rounded-md">
                      <button
                        onClick={decreaseQuantity}
                        className="px-3 py-1 text-gray-300 hover:text-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3 py-1 min-w-[40px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={increaseQuantity}
                        className="px-3 py-1 text-gray-300 hover:text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button className="ml-4 text-red-400 hover:text-red-300 transition-colors flex items-center">
                      <Trash2 size={16} className="mr-1" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="text-xl font-bold">
                    ${(149.99 * quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">You might also like</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <div className="aspect-square relative mb-2 rounded overflow-hidden bg-gray-600">
                      <Image
                        src={`/images/product-${
                          item === 1 ? "pink" : item === 2 ? "purple" : "peach"
                        }.jpeg`}
                        alt={`Suggested product ${item}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="font-medium text-sm">
                      Complementary Item {item}
                    </h4>
                    <p className="text-primary text-sm font-bold mt-1">
                      $29.99
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
            >
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-300">Subtotal</span>
                  <span>${(149.99 * quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Tax</span>
                  <span>${(149.99 * quantity * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-700 pt-3 mt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(149.99 * quantity * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full mb-3 bg-primary hover:bg-primary/90">
                <CreditCard className="mr-2 h-5 w-5" />
                Checkout
              </Button>

              <Link href="/" passHref>
                <Button
                  variant="outline"
                  className="w-full bg-gray-700/50 border-gray-600 hover:bg-gray-700"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-lg font-bold mb-3">Have a promo code?</h2>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button className="rounded-l-none">Apply</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
