// app/about/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Award, Star, ArrowLeft } from "lucide-react";

import Navbar from "@/components/navbar";
import ObjectParticles from "@/components/backgrounds/object-particles";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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
  { number: "5+", label: "Years Experience" },
  { number: "50+", label: "Brands Served" },
];

const values = [
  {
    icon: <Star className="w-8 h-8 text-yellow-400" />,
    title: "Passion",
    desc: "We pour our heart into every product we create, ensuring each piece reflects your brand's identity.",
  },
  {
    icon: <Award className="w-8 h-8 text-blue-500" />,
    title: "Precision",
    desc: "Attention to detail is our specialty. Every design is crafted with meticulous care.",
  },
  {
    icon: <Mail className="w-8 h-8 text-green-500" />,
    title: "Innovation",
    desc: "We stay ahead of trends & technology to bring you cutting‑edge solutions.",
  },
  {
    icon: <MapPin className="w-8 h-8 text-red-500" />,
    title: "Partnership",
    desc: "We build lasting relationships with clients, working together toward success.",
  },
];

export default function AboutPage() {
  const [imgErr, setImgErr] = useState(false);

  return (
    <main className="relative min-h-screen bg-gray-900 text-white backdrop-blur-sm">
      {/* full‑page particle background */}
      <div className="fixed inset-0 z-0">
        <ObjectParticles count={40} background="#111827" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70" />
      </div>

      <Navbar />

      {/* Back‑to‑Home + title */}
      <div className="container mx-auto px-6 pt-24 relative z-10">
        <div className="flex items-center mb-8">
          <Link
            href="/"
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold ml-auto">
            <span className="inline-block bg-gray-800/60 px-3 py-1 rounded">
              About Us
            </span>
          </h1>
        </div>
      </div>

      {/* Hero / Intro */}
      <section className="py-17 px-4 relative z-10 backdrop-blur-md">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* photo */}
          <div
            className="
    relative
    w-64         /* fixed width: feel free to adjust */
    h-40         /* ↑ change this to h-36, h-48, or even h-[650px] w-[500px] */
    mx-auto
    overflow-hidden
    rounded-full
    shadow-2xl
    bg-gradient-to-br from-blue-400 to-purple-600
  "
          >
            <Image
              src="/Mr.jpeg"
              alt="Abdallah Emad"
              fill
              className="object-cover"
              onError={() => setImgErr(true)}
            />
          </div>
          {/* text */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold">
              <span className="inline-block bg-gray-800/60 px-4 py-2 rounded">
                Hi, I'm <span className="text-primary">Abdallah Hosny</span>
              </span>
            </h2>

            <p className="text-lg text-gray-300 leading-relaxed">
              AI engineer | 3D specialist | Events manager | Trainer
              <br />
              An AI Developer and 3D Specialist with over five years of
              experience, including GITEX 2024 installations and Holobox shows
              in front of large audiences.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              <span className="inline-block bg-gray-800/60 px-3 py-1 rounded">
                SWAGIFYY
              </span>{" "}
              offers training & tech services: Unreal Engine,
              Marvelous Designer, Blender, next‑gen motion‑capture & MetaHuman,
              plus full event management and interactive 3D websites.
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
            <div className="flex flex-wrap gap-6 pt-4 text-gray-300">
              <span className="flex items-center gap-2">
                <Mail size={18} /> abdallahemad800@gmail.com
              </span>
              <span className="flex items-center gap-2">
                <Phone size={18} /> +20 111 655 5793
              </span>
              <span className="flex items-center gap-2">
                <Phone size={18} /> +971 56 143 2193
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={18} /> Saudi Arabia: Mecca
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={18} /> UAE: Dubai
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={18} /> Egypt: Cairo
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 relative z-10 text-gray-300">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="inline-block bg-gray-800/60 px-4 py-2 rounded">
              Achievements &amp; Milestones
            </span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {achievements.map((a) => (
              <div key={a.label}>
                <p className="text-4xl font-bold text-primary">{a.number}</p>
                <p>{a.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 relative z-10 text-gray-300 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="inline-block bg-gray-800/60 px-4 py-2 rounded">
              Our Core Values
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <Card key={v.title} className="bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">{v.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{v.title}</h3>
                  <p className="text-gray-300 text-sm">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* …any additional sections go here… */}
    </main>
  );
}
