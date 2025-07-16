"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Image from "next/image";

const courses = [
  {
    id: "1",
    title: "Master The Art Of Product Modelling & Animation In Blender",
    category: "3D Courses",
    price: "EGP 7,500",
    image: "/images/grll.png",
  },
  {
    id: "2",
    title: "The Magic of VFX in Blender!",
    category: "VFX Courses",
    price: "EGP 5,000",
    image: "/images/grll.png",
  },
  {
    id: "3",
    title: "Ultimate CGI & VFX Bundle",
    category: "Bundles",
    price: "EGP 8,100",
    image: "/images/grll.png",
  },
];

export default function CoursesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-right">Our Courses</h1>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {courses.map((c) => (
            <div
              key={c.id}
              className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-2xl overflow-hidden shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300"
            >
              {/* Image + Price */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full shadow">
                  {c.price}
                </div>
              </div>

              {/* Info + CTAs */}
              <div className="p-6 space-y-4">
                <p className="text-xs text-purple-400 uppercase tracking-widest">
                  {c.category}
                </p>
                <h2 className="text-lg font-semibold leading-snug">
                  {c.title}
                </h2>

                <div className="flex gap-4 pt-4">
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium text-sm">
                    Buy Now
                  </button>

                  {/* THIS is the updated Link: */}
                  <Link
                    href={`/courses/${c.id}`}
                    className="flex-1 border border-gray-600 bg-transparent hover:bg-gray-800 text-white py-2 rounded-lg font-medium text-sm text-center"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
