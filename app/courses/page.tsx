// app/courses/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* top nav */}
      <Navbar />

      {/* page content */}
      <main className="flex-grow container mx-auto px-6 py-12">
        {/* back link + title */}
        <div className="flex items-center mb-8">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold ml-auto">Our Courses</h1>
        </div>

        {/* courses grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {courses.map((c) => (
            <div
              key={c.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg"
            >
              <div className="relative h-48">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-purple-600/80 text-white text-sm px-3 py-1 rounded-full">
                  {c.price}
                </div>
              </div>
              <div className="p-6 space-y-3">
                <p className="text-xs uppercase text-purple-400">
                  {c.category}
                </p>
                <h2 className="text-lg font-semibold">{c.title}</h2>
                <div className="flex gap-4 mt-4">
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded">
                    Buy Now
                  </button>
                  <button className="flex-1 bg-gray-900 hover:bg-gray-800 border border-gray-600 text-white py-2 rounded">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* site footer */}
    </div>
  );
}
