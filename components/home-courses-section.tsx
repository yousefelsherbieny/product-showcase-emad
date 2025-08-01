/* ------------------------------------------------------------------
   HomeCoursesSection.tsx
   ------------------------------------------------------------------ */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Users, Award } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedText from "@/components/animated-text";

/*  ⚠️  tiny subset of your full courses list  */
const COURSES = [
  {
    id: 1,
    title: "Master Product Modelling in Blender",
    level: "Advanced",
    price: "EGP 7,500",
    duration: "12 wk",
    students: "2 600+",
    image: "/grll.png",
  },
  {
    id: 2,
    title: "Marvelous Designer for Fashion & Cloth Sim",
    level: "Intermediate",
    price: "EGP 5,000",
    duration: "8 wk",
    students: "1 100+",
    image: "/E4.jpg",
  },
  {
    id: 3,
    title: "Crash-course: React Three Fiber + Three.js",
    level: "Beginner",
    price: "EGP 4,200",
    duration: "6 wk",
    students: "900+",
    image: "/B1.jpg",
  },
];

const levelColor = (lvl: string) =>
  ({
    Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
    Intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Advanced: "bg-red-500/20 text-red-400 border-red-500/30",
  }[lvl] ?? "bg-gray-500/20 text-gray-400 border-gray-500/30");

export default function HomeCoursesSection() {
  return (
    <section className="py-24 relative z-10 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
      <div className="container mx-auto px-6">
        {/* ---------- heading ---------- */}
        <div className="text-center mb-16 text-3xl md:text-5xl font-extrabold text-white">
          <Badge className="bg-primary/20 text-primary text-5xl border-primary/30 mb-4">
            Our Courses
          </Badge>

          <AnimatedText
            type="words"
            stagger={0.05}
            y={30}
            className="text-3xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent"
            onScrollTrigger
          >
            Learn the Skills that Power Tomorrow
          </AnimatedText>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Bite-sized, project-based training in cutting-edge 3D, tech and
            creative workflows—from Blender sculpting to React Three Fiber.
          </p>
        </div>

        {/* ---------- course grid ---------- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {COURSES.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm h-full overflow-hidden group hover:bg-gray-800/70 transition">
                {/* cover */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={levelColor(c.level)}>{c.level}</Badge>
                  </div>
                </div>

                {/* body */}
                <CardHeader className="space-y-2">
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {c.title}
                  </CardTitle>
                  <div className="text-primary font-bold tracking-wide">
                    {c.price}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* quick stats */}
                  <div className="flex justify-between text-sm text-gray-400 border-y border-gray-700/50 py-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-primary" />
                      {c.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-primary" />
                      {c.students}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-primary" />
                      Cert
                    </span>
                  </div>

                  {/* calls-to-action */}
                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90"
                      asChild
                    >
                      <Link href={`/courses/${c.id}/learn`}>Enroll</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-600 text-red-900 hover:bg-gray-700"
                      asChild
                    >
                      <Link href={`/courses/${c.id}`}>Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ---------- CTA ---------- */}
        <div className="text-center mt-24">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 px-10 py-6 text-lg"
            asChild
          >
            <Link href="/courses">Browse the full catalogue</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
