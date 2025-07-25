"use client";

import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase/config";

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();
  const auth = getAuth(app);

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    paymentMethod: "card",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to checkout.");
      return;
    }

    const res = await fetch("/api/paymob-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cart,
        paymentMethod: form.paymentMethod,
        uid: user.uid,
        customer: {
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
        },
      }),
    });

    const data = await res.json();

    if (data.payment_url) {
      localStorage.setItem("purchased_cart", JSON.stringify(cart));
      window.location.href = data.payment_url;
    } else {
      alert("فشل في تجهيز الدفع");
    }
  };

  return (
    <main className="min-h-screen bg-white text-black grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side */}
      <div className="p-6 lg:p-12 space-y-6 max-w-xl mx-auto">
        <div className="text-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="mx-auto mb-4"
          />
        </div>

        <div>
          <h2 className="font-bold text-lg mb-2">Contact Information</h2>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-3 rounded mb-4"
          />
        </div>

        <div>
          <h2 className="font-bold text-lg mb-2">Shipping Address</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-1/2 border p-3 rounded"
            />
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-1/2 border p-3 rounded"
            />
          </div>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border p-3 rounded"
          />
        </div>

        <div>
          <h2 className="font-bold text-lg mb-2">Payment Information</h2>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={form.paymentMethod === "card"}
                onChange={handleChange}
              />
              Debit/Credit Card
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="mobile_wallets"
                checked={form.paymentMethod === "mobile_wallets"}
                onChange={handleChange}
              />
              Mobile Wallets
            </label>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded text-lg font-semibold"
        >
          🔐 Place Order Now {subtotal.toLocaleString()} EGP
        </button>
      </div>

      {/* Right Side */}
      <div className="bg-gray-100 p-6 lg:p-12">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-3">
              <span>{item.name}</span>
              <span>{(item.price * item.quantity).toLocaleString()} EGP</span>
            </div>
          ))}

          <input
            type="text"
            placeholder="Coupon code"
            className="w-full p-3 border rounded mb-4"
          />
          <button className="w-full bg-gray-400 text-white py-2 rounded mb-6">
            Apply
          </button>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>{subtotal.toLocaleString()} EGP</span>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{subtotal.toLocaleString()} EGP</span>
          </div>

          <p className="text-sm text-gray-600 mt-6 font-medium">
            Why Over 150K+ Customers Seif Hussam
          </p>
        </div>
      </div>
    </main>
  );
}
