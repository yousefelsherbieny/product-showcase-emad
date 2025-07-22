"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Trash2,
  ShoppingBag,
  CreditCard,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ObjectParticles from "@/components/backgrounds/object-particles";
import Navbar from "@/components/navbar";
import { useCart } from "@/lib/CartContext";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const getSubtotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const subtotal = getSubtotal();
  const tax = subtotal * 0.0;
  const total = subtotal + tax;

  const router = useRouter();

  const handleCheckout = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      router.push("/auth/login");
      return;
    }

    try {
      const response = await fetch("/api/paymob-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          paymentMethod: "card", // أو "mobile_wallets"
          customer: {
            email: user.email || "test@example.com",
            firstName: "Soly",
            lastName: "Swagifyy",
            phone: "01000000000", // ممكن تجيبيه من البروفايل لو حابة
          },
        }),
      });

      const data = await response.json();

      if (data?.payment_url) {
        window.location.href = data.payment_url;
      } else {
        alert("خطأ أثناء تجهيز الدفع: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error("Checkout Error:", err);
      alert("فشل الاتصال بـ Paymob.");
    }
  };

  return (
    <main className="relative min-h-screen bg-gray-900 text-white">
      <div className="fixed inset-0 z-0">
        <ObjectParticles count={40} background="#111827" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70 pointer-events-none"></div>
      </div>

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
          {/* Left Section: Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cart.length === 0 ? (
              <p className="text-gray-400">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3 aspect-square relative rounded-lg overflow-hidden bg-gray-700">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold">{item.name}</h3>
                      </div>

                      <div className="flex items-center">
                        <div className="flex items-center border border-gray-600 rounded-md overflow-hidden">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="px-3 py-1 text-gray-300 hover:text-white transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3 py-1 min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="px-3 py-1 text-gray-300 hover:text-white transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-4 text-red-400 hover:text-red-300 transition-colors flex items-center"
                        >
                          <Trash2 size={16} className="mr-1" />
                          <span>Remove</span>
                        </button>
                      </div>

                      <div className="text-xl font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Right Section: Summary */}
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
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-700 pt-3 mt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={() => router.push("/checkout")}
                className="w-full mb-3 bg-primary hover:bg-primary/90"
              >
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
