"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Image from "next/image";
import ObjectParticles from "@/components/backgrounds/object-particles";

const courses = [
  /* 1 — Blender */
  {
    id: "blender",
    title: "Blender Product Modelling & VFX",
    description:
      "Model, texture, light and animate world-class product visuals – then add VFX & CGI magic.",
    priceEg: 7500,
    level: "Beginner",
    duration: "12 weeks",
    students: "1 200+",
    image: "/perf.png",
    modules: 28,
    videos: 190,
    downloads: 65,
    category: "3D Design",
    features: [
      "Asset import & kitbashing",
      "Hard-surface & organic sculpting",
      "Lighting setups & photoreal rendering",
      "Intro to Geometry Nodes VFX",
      "Rigging with Mixamo ⇄ CC4",
    ],
  },

  /* 2 — Marvelous Designer */
  {
    id: "marvelous",
    title: "Marvelous Designer Simulation",
    description:
      "Design garments, drape in real-time physics & export to Unreal, Blender, Z-Brush & CC4.",
    priceEg: 6200,
    level: "Beginner",
    duration: "8 weeks",
    students: "930+",
    image: "/clth.webp",
    modules: 18,
    videos: 124,
    downloads: 42,
    category: "Fashion Simulation",
    features: [
      "Pattern drafting fundamentals",
      "Cloth optimisation vs CLO3D",
      "Retopology for real-time engines",
      "Export presets for UE + MetaHuman",
      "Live link to iClone/CC4 pipeline",
    ],
  },

  /* 3 — CC4 & iClone */
  {
    id: "cc4",
    title: "Character Creator 4 & iClone Pipeline",
    description:
      "Build, animate & motion-capture AAA-ready characters – then push to UE, Unity or Web.",
    priceEg: 8200,
    level: "Advanced",
    duration: "10 weeks",
    students: "640+",
    image: "/B1.jpg",
    modules: 22,
    videos: 150,
    downloads: 55,
    category: "Character Animation",
    features: [
      "Headshot & skin-gen mastery",
      "AccuRig + live MoCap (Rokoko, Perception Neuron)",
      "Phys-X cloth & hair",
      "Auto-LOD & optimisation for mobile",
      "One-click export to Blender / UE / Unity",
    ],
  },

  /* 4 — Unreal Engine */
  {
    id: "unreal",
    title: "Unreal Engine for Realtime Experiences",
    description:
      "Your go-to course for photoreal arch-viz, virtual production & interactive events.",
    priceEg: 9600,
    level: "Intermediate",
    duration: "14 weeks",
    students: "780+",
    image: "/grll.png",
    modules: 30,
    videos: 210,
    downloads: 73,
    category: "Game & Virtual Production",
    features: [
      "Nanite, Lumen & path-tracing",
      "Blueprints for non-coders",
      "MetaHuman animation & Live Link",
      "DMX & events integration (your speciality!)",
      "Packaging for desktop + mobile",
    ],
  },

  /* 5 — React-Three-Fiber */
  {
    id: "rtf",
    title: "React-Three-Fiber / Three.js Crash Course",
    description:
      "From zero to interactive 3D websites. Build the same tech powering SWAGIFYY.",
    priceEg: 5400,
    level: "Beginner",
    duration: "6 weeks",
    students: "1 050+",
    image: "/download.png",
    modules: 15,
    videos: 95,
    downloads: 34,
    category: "Web 3D Development",
    features: [
      "R3F scene setup & lighting",
      "GLTF + Draco optimisation",
      "Shaders with drei / react-postprocessing",
      "Scroll & gesture controls",
      "Deploy on Vercel + CDN asset strategy",
    ],
  },
]


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
              {course.priceEg}
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
              {course.features.map((item, idx) => (
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
