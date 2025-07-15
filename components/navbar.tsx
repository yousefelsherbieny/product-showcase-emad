"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase"; // ✅ التعديل هنا
import { onAuthStateChanged, signOut } from "firebase/auth";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const handleLogout = async () => {
    await signOut(auth); // ✅ التعديل هنا
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/90 backdrop-blur-md py-2"
          : "bg-transparent py-3"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-10">
              <h1 className="text-2xl font-bold text-white">SWAGIFYY</h1>
            </Link>
          </div>

          <div className="flex items-center space-x-4 ml-auto">
            <Link href="/Courses" passHref>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-white/20 text-white hover:bg-white/10 rounded-md"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Courses
              </Button>
            </Link>
            <Link href="/cart" passHref>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-white/20 text-white hover:bg-white/10 rounded-md"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Cart
              </Button>
            </Link>
            <Link href="/Character" passHref>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-white/20 text-white hover:bg-white/10 rounded-md"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Character
              </Button>
            </Link>
            <Link href="/About us" passHref>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-white/20 text-white hover:bg-white/10 rounded-md"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                About Us
              </Button>
            </Link>
            <Link href="/Contact Us" passHref>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-white/20 text-white hover:bg-white/10 rounded-md"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Contact Us
              </Button>
            </Link>

            {user ? (
              <div className="relative group ml-4">
                <button className="flex items-center space-x-2 text-white">
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <UserCircle className="w-8 h-8" />
                  )}
                  <span className="hidden md:block">
                    {user.displayName || user.email}
                  </span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                  <Link
                    href="/Settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="text-white hover:text-primary transition-colors font-medium ml-4"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
