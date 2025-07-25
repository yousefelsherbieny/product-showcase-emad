/* components/navbar.tsx
   ------------------------------------------------------------------ */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, UserCircle, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

/* small helper for an animated backdrop ----------------------------------- */
const Backdrop = ({ onClick }: { onClick: () => void }) => (
  <motion.div
    onClick={onClick}
    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  />
);

export default function Navbar() {
  /* ───────────────────────────────────────────────────────────────────── */
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<null | any>(null);
  const [isOpen, setOpen] = useState(false); // mobile drawer

  /* auth listener */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u || null));
    return () => unsub();
  }, []);

  /* change navbar style on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setOpen(false);
  };

  /* ───────────────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ─────────  NAVBAR BAR  ───────── */}
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-all ${
          scrolled
            ? "bg-gray-900/90 backdrop-blur-md py-2"
            : "bg-transparent py-3"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold text-white">
            SWAGIFYY
          </Link>

          {/* desktop nav */}
          <nav className="hidden md:flex space-x-5 text-white font-medium">
            <Link href="/courses" className="hover:text-primary">
              Courses
            </Link>
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
            <Link href="/Character" className="hover:text-primary">
              Character
            </Link>
            <Link href="/about" className="hover:text-primary">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-primary">
              Contact
            </Link>
            <Link href="/download" className="hover:text-primary">
              Downloads
            </Link>
          </nav>

          {/* right‑side icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="text-white hover:text-primary">
              <ShoppingCart className="w-6 h-6" />
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center">
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <UserCircle className="w-8 h-8 text-white" />
                  )}
                </button>

                <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                  <Link
                    href="/Settings/profile"
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
                className="text-white hover:text-primary"
              >
                Login
              </Link>
            )}
          </div>

          {/* mobile hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </motion.header>

      {/* ─────────  MOBILE DRAWER  ───────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* dark backdrop */}
            <Backdrop onClick={() => setOpen(false)} />

            {/* sliding panel */}
            <motion.aside
              className="fixed right-0 top-0 bottom-0 w-72 bg-gray-900
                         flex flex-col text-white z-50"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              {/* header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* nav links */}
              <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-4 font-medium">
                <Link
                  href="/courses"
                  onClick={() => setOpen(false)}
                  className="block"
                >
                  Courses
                </Link>
                <Link
                  href="/products"
                  onClick={() => setOpen(false)}
                  className="block"
                >
                  Products
                </Link>
                <Link
                  href="/Character"
                  onClick={() => setOpen(false)}
                  className="block"
                >
                  Character
                </Link>
                <Link
                  href="/about"
                  onClick={() => setOpen(false)}
                  className="block"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="block"
                >
                  Contact
                </Link>

                <hr className="border-gray-800 my-4" />

                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Cart
                </Link>

                {user ? (
                  <>
                    <Link
                      href="/Settings/profile"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2"
                    >
                      <UserCircle className="w-5 h-5" />
                      Settings
                    </Link>
                    <Button
                      onClick={handleLogout}
                      variant="secondary"
                      className="w-full mt-4"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    asChild
                    className="w-full mt-4"
                    onClick={() => setOpen(false)}
                  >
                    <Link href="/auth/login">Login</Link>
                  </Button>
                )}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
