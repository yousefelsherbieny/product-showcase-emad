/* ────────────────────────────────────────────────────────────────
   app/courses/page.tsx   –  refreshed UI + Paymob “Buy Now”
   ──────────────────────────────────────────────────────────────── */
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Users, Award, BookOpen, Video, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase/config";

import Navbar from "@/components/navbar";
import ObjectParticles from "@/components/backgrounds/object-particles";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

/* ───────── COURSE DATA (edit freely) ───────── */

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
    features: [
      "R3F scene setup & lighting",
      "GLTF + Draco optimisation",
      "Shaders with drei / react-postprocessing",
      "Scroll & gesture controls",
      "Deploy on Vercel + CDN asset strategy",
    ],
  },
];

/* ───────── HELPERS ───────── */

function levelBadge(level: string) {
  return (
    {
      Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
      Intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      Advanced: "bg-red-500/20 text-red-400 border-red-500/30",
    } as Record<string, string>
  )[level]!;
}

/* ───────── PAGE COMPONENT ───────── */

export default function CoursesPage() {
  /* ── GSAP entrance animations ── */
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      heroRef.current &&
        gsap.fromTo(
          heroRef.current.children,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
          }
        );

      cardsRef.current &&
        gsap.fromTo(
          cardsRef.current.children,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.25,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
          }
        );
    });
    return () => ctx.revert();
  }, []);

  /* ── PAYMOB BUY NOW ── */
  async function handleBuy(course: (typeof courses)[number]) {
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (!user) {
      alert("يجب تسجيل الدخول أولاً.");
      return;
    }

    const res = await fetch("/api/course-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId: course.id,
        uid: user.uid,
        price: course.priceEg,
        paymentMethod: "card",
        customer: {
          email: user.email,
          firstName: user.displayName?.split(" ")[0] || "User",
          lastName: user.displayName?.split(" ")[1] || "Name",
          phone: "",
        },
      }),
    });

    const data = await res.json();
    if (data?.payment_url) window.location.href = data.payment_url;
    else alert("فشل في إنشاء رابط الدفع");
  }

  /* ── JSX ── */
  return (
    <main className="relative min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <ObjectParticles />
      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">
        <div
          className="container mx-auto max-w-6xl backdrop-blur-md border-gray-700/50 text-center"
          ref={heroRef}
        >
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
            SWAGIFYY Academy
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Level-Up Your 3D Career
          </h1>

          <p className=" text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Hands-on courses crafted from real event & production pipelines.
            Study at your own pace, keep lifetime access – and jump straight
            into professional work.
          </p>
        </div>
      </section>

      {/* COURSES */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl ">
          <div
            ref={cardsRef}
            className="grid gap-10 md:grid-cols-2 xl:grid-cols-3 "
          >
            {courses.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm group h-full hover:bg-gray-800/70 transition">
                  {/* cover */}
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={c.image}
                      alt={c.title}
                      width={800}
                      height={480}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className={levelBadge(c.level)}>{c.level}</Badge>
                    </div>
                  </div>

                  {/* body */}
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl text-white font-bold group-hover:text-amber-500 transition-colors">
                        {c.title}
                      </CardTitle>
                      <span className="text-2xl font-bold text-cyan-300">
                        {c.priceEg.toLocaleString()} EGP
                      </span>
                    </div>
                    <CardDescription className="text-gray-300">
                      {c.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6 pb-8">
                    {/* quick stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="flex flex-col items-center">
                        <Clock className="h-5 w-5 text-primary mb-1" />
                        <span className="text-sm text-white">{c.duration}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Users className="h-5 w-5 text-primary mb-1" />
                        <span className="text-sm text-white">{c.students}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Award className="h-5 w-5 text-primary mb-1" />
                        <span className="text-sm text-white">Certificate</span>
                      </div>
                    </div>

                    {/* content stats */}
                    <div className="grid grid-cols-3 gap-4 text-center py-4 border-t border-gray-700/50">
                      <div className="flex flex-col items-center">
                        <BookOpen className="h-4 w-4 text-white mb-1" />
                        <span className="text-xs text-white">
                          {c.modules} Modules
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Video className="h-4 w-4 text-white mb-1" />
                        <span className="text-xs text-white">
                          {c.videos} Videos
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Download className="h-4 w-4 text-white mb-1" />
                        <span className="text-xs text-white">
                          {c.downloads} Files
                        </span>
                      </div>
                    </div>

                    {/* bullet list */}
                    <div>
                      <h4 className="font-semibold text-white mb-3">
                        You’ll master:
                      </h4>
                      <ul className="space-y-2">
                        {c.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start text-sm text-gray-300"
                          >
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 mt-2" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* actions */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        className="flex-1 bg-primary hover:bg-primary/90"
                        onClick={() => handleBuy(c)}
                      >
                        Buy Now
                      </Button>
                      <Link href={`/courses/${c.id}`} className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full border-gray-600 text-red-950 hover:bg-gray-700"
                        >
                          Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
