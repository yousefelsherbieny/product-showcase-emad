"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Award,
  Users,
  Star,
  Heart,
  Target,
  Zap,
  ArrowLeft,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Navbar from "@/components/navbar";
import ObjectParticles from "@/components/backgrounds/object-particles";

/* ------------------------------------------------------------------ */
/* data                                                               */
const skills = [
  "3D Product Design",
  "Custom Branding",
  "E‑commerce",
  "Digital Marketing",
  "UI/UX Design",
  "Business Strategy",
];

const achievements = [
  { number: "500+", label: "Products Created" },
  { number: "100+", label: "Happy Clients" },
  { number: "3+", label: "Years Experience" },
  { number: "50+", label: "Brands Served" },
];

const values = [
  {
    icon: <Heart className="w-8 h-8 text-red-500" />,
    title: "Passion",
    desc: "We pour our heart into every product we create, ensuring each piece reflects your brand's unique identity.",
  },
  {
    icon: <Target className="w-8 h-8 text-blue-500" />,
    title: "Precision",
    desc: "Attention to detail is our specialty. Every design is crafted with meticulous care and precision.",
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    title: "Innovation",
    desc: "We stay ahead of trends and technology to bring you cutting‑edge solutions for your brand.",
  },
  {
    icon: <Users className="w-8 h-8 text-green-500" />,
    title: "Partnership",
    desc: "We believe in building lasting relationships with our clients, working together towards success.",
  },
];

/* ------------------------------------------------------------------ */
/* page                                                               */
export default function AboutPage() {
  const [imgErr, setImgErr] = useState(false);

  return (
    <main className="relative min-h-screen bg-gray-900 text-white">
      {/* full‑page 3‑D particle background */}
      <div className="fixed inset-0 z-0">
        <ObjectParticles count={40} background="#111827" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70 pointer-events-none" />
      </div>

      {/* site navbar (same component your other pages use) */}
      <Navbar />

      {/* slim bar with Back‑to‑Home + page title — matches Cart & Contact */}
      <div className="container mx-auto px-6 pt-24 relative z-10">
        <div className="flex items-center mb-8">
          <Link
            href="/"
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold ml-auto">About Us</h1>
        </div>
      </div>

      {/* ------------- Hero ---------------------------------------- */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* photo */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-400 to-purple-600">
                {!imgErr ? (
                  <Image
                    src="/placeholder.svg?height=500&width=500"
                    alt="Your Name"
                    fill
                    className="object-cover"
                    onError={() => setImgErr(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">YN</span>
                  </div>
                )}
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                <Award className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* intro text */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Hi, I'm <span className="text-primary">Your&nbsp;Name</span>
            </h2>
            <p className="text-xl text-gray-300">
              Founder & Creative Director of SWAGIFYY
            </p>
            <p className="text-gray-300 leading-relaxed">
              I'm passionate about helping businesses create memorable brand
              experiences through custom‑designed products. With years of
              experience in 3D design and branding, I founded SWAGIFYY to make
              premium custom products accessible to everyone.
            </p>

            {/* skills */}
            <div>
              <h3 className="font-semibold mb-2">Skills &amp; Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <Badge
                    key={s}
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    {s}
                  </Badge>
                ))}
              </div>
            </div>

            {/* contact */}
            <div className="flex flex-wrap gap-4 pt-4 text-gray-300">
              <span className="flex items-center gap-2">
                <Mail size={18} /> hello@swagifyy.com
              </span>
              <span className="flex items-center gap-2">
                <Phone size={18} /> +1 (555) 123‑4567
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={18} /> New York, USA
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------- Achievements -------------------------------- */}
      <section className="py-16 bg-white text-gray-900 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Achievements &amp; Milestones
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {achievements.map((a) => (
              <div key={a.label}>
                <p className="text-4xl font-bold text-blue-600">{a.number}</p>
                <p>{a.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------- Values -------------------------------------- */}
      <section className="py-16 bg-gray-50 text-gray-900 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <Card
                key={v.title}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">{v.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{v.title}</h3>
                  <p className="text-gray-600 text-sm">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ------------- Story, CTA …  (unchanged sections) ---------- */}
      {/* … keep the rest of your original About page content here … */}
    </main>
  );
}
