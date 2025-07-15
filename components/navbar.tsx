"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900/90 backdrop-blur-md py-2" : "bg-transparent py-3"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          SWAGIFYY
        </Link>

        {/* Center: Nav Links */}
        <nav className="hidden md:flex space-x-4 text-white font-medium">
          <Link href="/courses" className="hover:text-primary">Courses</Link>
          <Link href="/products" className="hover:text-primary">Products</Link>
          <Link href="/Character" className="hover:text-primary">Character</Link>
          <Link href="/about" className="hover:text-primary">About Us</Link>
          <Link href="/contact" className="hover:text-primary">Contact Us</Link>
        </nav>

        {/* Right: Cart & Profile */}
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="text-white hover:text-primary">
            <ShoppingCart className="w-6 h-6" />
          </Link>

          {user ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 text-white">
                {user.photoURL ? (
                  <Image src={user.photoURL} alt="Profile" width={32} height={32} className="rounded-full" />
                ) : (
                  <UserCircle className="w-8 h-8" />
                )}
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                <Link href="/Settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link href="/auth/login" className="text-white hover:text-primary font-medium">
              Login
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
}
