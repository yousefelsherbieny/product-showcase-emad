"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Image from "next/image";
import ObjectParticles from "@/components/backgrounds/object-particles";

const courses = [
  {
    id: "1",
    title: "Master The Art Of Product Modelling & Animation In Blender",
    category: "3D Courses",
    price: "EGP 7,500",
    image: "/images/grll.png",
    description: `Dive deep into Blender’s modeling and animation toolset. By the end of this course you’ll be able to model, texture, rig and bring your product designs to life with photorealistic renders and smooth animations.`,
    syllabus: [
      "Introduction to Blender UI & Navigation",
      "Modeling Techniques: Boxes, Curves & Sculpt",
      "UV Unwrapping & Texturing",
      "Lighting & Photorealistic Rendering",
      "Basic Rigging & Animation",
      "Final Project: Animated Product Showcase",
    ],
  },
  {
    id: "2",
    title: "The Magic of VFX in Blender!",
    category: "VFX Courses",
    price: "EGP 5,000",
    image: "/images/grll.png",
    description: `Unlock the secrets of visual effects: particle sims, dynamics, green‑screen compositing and camera tracking—all inside Blender for blockbuster‑style shots.`,
    syllabus: [
      "Particle Systems & Smoke",
      "Rigid Body & Cloth Simulation",
      "Camera Tracking & Matchmoving",
      "Compositing & Color Grading",
      "Creating Explosions & Fire",
      "Project: Integrate a 3D Object into Live Footage",
    ],
  },
  {
    id: "3",
    title: "Ultimate CGI & VFX Bundle",
    category: "Bundles",
    price: "EGP 8,100",
    image: "/images/grll.png",
    description: `All‑in‑one package covering both product modeling and VFX workflows. A complete career‑ready toolkit.`,
    syllabus: [
      "Module 1: Product Modeling in Blender",
      "Module 2: Texturing & Shading",
      "Module 3: Animation Basics",
      "Module 4: Particle & Fluid Sims",
      "Module 5: Compositing & FX",
      "Capstone: Short CGI & VFX Reel",
    ],
  },
];

export default function CourseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const course = courses.find((c) => c.id === String(id));

  if (!course) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-950 text-white">
        <Navbar />
        <main className="flex-grow container mx-auto px-6 pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold mb-6">Course Not Found</h1>
          <button
            onClick={() => router.back()}
            className="text-purple-400 hover:text-purple-200"
          >
            ← Go Back
          </button>
        </main>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-gray-950 text-white">
      {/* 👇 خلفية الجسيمات */}
      <div className="fixed inset-0 z-0">
        <ObjectParticles count={30} background="#111827" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70 pointer-events-none"></div>
      </div>

      {/* 👇 المحتوى الفعلي */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow container mx-auto px-6 pt-32 pb-20 space-y-12">
          {/* Breadcrumb */}
          <div className="flex items-center justify-between">
            <Link
              href="/courses"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              ← Back to Courses
            </Link>
            <span className="text-sm text-gray-500">{course.category}</span>
          </div>

          {/* Course Image */}
          <div className="relative w-full h-[400px] overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 right-4 bg-purple-600 text-white text-sm px-3 py-1 rounded-full shadow-lg">
              {course.price}
            </div>
          </div>

          {/* Course Info */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{course.title}</h1>
            <p className="text-gray-300 max-w-3xl">{course.description}</p>
          </div>

          {/* Course Syllabus */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">What You’ll Learn</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {course.syllabus.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/courses/${course.id}/learn`}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium text-center transition"
            >
              Start Learning
            </Link>
            <button
              onClick={() => router.back()}
              className="flex-1 border border-gray-600 hover:bg-gray-800 text-white py-3 rounded-lg font-medium transition"
            >
              ← Back to Courses
            </button>
          </div>
        </main>
      </div>
    </main>
  );
}
