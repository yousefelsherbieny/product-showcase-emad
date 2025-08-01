// // app/about/page.tsx
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Mail, Phone, MapPin, Award, Star, ArrowLeft } from "lucide-react";
// import { motion } from "framer-motion";
// import Navbar from "@/components/navbar";
// import ObjectParticles from "@/components/backgrounds/object-particles";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import AnimatedText from "@/components/animated-text";

// const skills = [
//   "3D Product Design",
//   "Custom Branding",
//   "E‑commerce",
//   "Digital Marketing",
//   "UI/UX Design",
//   "Business Strategy",
// ];
// const team = [
//   {
//     name: "Yousef Sherbeny",
//     role: "Web Developer",
//     image: "/yosef.jpg",
//     bio: "10+ years in Web Development.",
//   },
//   {
//     name: "Abdallah Hosny",
//     role: "Lead Art Director",
//     image: "/Mr.jpeg",
//     bio: "Specialist in architectural visualization and product rendering.",
//   },
//   {
//     name: "O2g",
//     role: "3D Artist",
//     image: "/o2g.jpg",
//     bio: "Expert in real-time rendering and interactive 3D experiences.",
//   },
// ];
// const achievements = [
//   { number: "500+", label: "Products Created" },
//   { number: "100+", label: "Happy Clients" },
//   { number: "5+", label: "Years Experience" },
//   { number: "50+", label: "Brands Served" },
// ];

// const values = [
//   {
//     icon: <Star className="w-8 h-8 text-yellow-400" />,
//     title: "Passion",
//     desc: "We pour our heart into every product we create, ensuring each piece reflects your brand's identity.",
//   },
//   {
//     icon: <Award className="w-8 h-8 text-blue-500" />,
//     title: "Precision",
//     desc: "Attention to detail is our specialty. Every design is crafted with meticulous care.",
//   },
//   {
//     icon: <Mail className="w-8 h-8 text-green-500" />,
//     title: "Innovation",
//     desc: "We stay ahead of trends & technology to bring you cutting‑edge solutions.",
//   },
//   {
//     icon: <MapPin className="w-8 h-8 text-red-500" />,
//     title: "Partnership",
//     desc: "We build lasting relationships with clients, working together toward success.",
//   },
// ];

// export default function AboutPage() {
//   const [imgErr, setImgErr] = useState(false);

//   return (
//     <main className="relative min-h-screen bg-gray-900 text-white backdrop-blur-sm">
//       {/* full‑page particle background */}
//       <div className="fixed inset-0 z-0">
//         <ObjectParticles count={40} background="#111827" />
//         <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70" />
//       </div>
//       <Navbar />
//       {/* Back‑to‑Home + title */}
//       <div className="container mx-auto px-6 pt-24 relative z-10">
//         <div className="flex items-center mb-8">
//           <Link
//             href="/"
//             className="flex items-center text-gray-300 hover:text-white transition-colors"
//           >
//             <ArrowLeft className="mr-2 h-5 w-5" />
//             <span>Back to Home</span>
//           </Link>
//           <h1 className="text-3xl font-bold ml-auto">
//             <span className="inline-block bg-gray-800/60 px-3 py-1 rounded">
//               About Us
//             </span>
//           </h1>
//         </div>
//       </div>
//       {/* Hero / Intro */}
//       <section className="py-17 px-4 relative z-10 backdrop-blur-md">
//         <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
//           {/* photo */}
//           <div
//             className="
//     relative
//     w-64         /* fixed width: feel free to adjust */
//     h-40         /* ↑ change this to h-36, h-48, or even h-[650px] w-[500px] */
//     mx-auto
//     overflow-hidden
//     rounded-full
//     shadow-2xl
//     bg-gradient-to-br from-blue-400 to-purple-600
//   "
//           >
//             <Image
//               src="/Mr.jpeg"
//               alt="Abdallah Emad"
//               fill
//               className="object-cover"
//               onError={() => setImgErr(true)}
//             />
//           </div>
//           {/* text */}
//           <div className="space-y-6">
//             <h2 className="text-4xl lg:text-5xl font-bold">
//               <span className="inline-block bg-gray-800/60 px-4 py-2 rounded">
//                 Hi, I'm <span className="text-primary">Abdallah Hosny</span>
//               </span>
//             </h2>

//             <p className="text-lg text-gray-300 leading-relaxed">
//               AI engineer | 3D specialist | Events manager | Trainer
//               <br />
//               An AI Developer and 3D Specialist with over five years of
//               experience, including GITEX 2024 installations and Holobox shows
//               in front of large audiences.
//             </p>

//             <p className="text-lg text-gray-300 leading-relaxed">
//               <span className="inline-block bg-gray-800/60 px-3 py-1 rounded">
//                 SWAGIFYY
//               </span>{" "}
//               offers training & tech services: Unreal Engine,
//               Marvelous Designer, Blender, next‑gen motion‑capture & MetaHuman,
//               plus full event management and interactive 3D websites.
//             </p>

//             {/* skills */}
//             <div>
//               <h3 className="font-semibold mb-2">Skills &amp; Expertise</h3>
//               <div className="flex flex-wrap gap-2">
//                 {skills.map((s) => (
//                   <Badge
//                     key={s}
//                     variant="secondary"
//                     className="bg-blue-100 text-blue-800"
//                   >
//                     {s}
//                   </Badge>
//                 ))}
//               </div>
//             </div>

//             {/* contact */}
//             <div className="flex flex-wrap gap-6 pt-4 text-gray-300">
//               <span className="flex items-center gap-2">
//                 <Mail size={18} /> abdallahemad800@gmail.com
//               </span>
//               <span className="flex items-center gap-2">
//                 <Phone size={18} /> +20 111 655 5793
//               </span>
//               <span className="flex items-center gap-2">
//                 <Phone size={18} /> +971 56 143 2193
//               </span>
//               <span className="flex items-center gap-2">
//                 <MapPin size={18} /> Saudi Arabia: Mecca
//               </span>
//               <span className="flex items-center gap-2">
//                 <MapPin size={18} /> UAE: Dubai
//               </span>
//               <span className="flex items-center gap-2">
//                 <MapPin size={18} /> Egypt: Cairo
//               </span>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* Achievements */}
//       <section className="py-16 relative z-10 text-gray-300">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">
//             <span className="inline-block bg-gray-800/60 px-4 py-2 rounded">
//               Achievements &amp; Milestones
//             </span>
//           </h2>
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
//             {achievements.map((a) => (
//               <div key={a.label}>
//                 <p className="text-4xl font-bold text-primary">{a.number}</p>
//                 <p>{a.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       {/* Values */}
//       <section className="py-16 relative z-10 text-gray-300 backdrop-blur-sm">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">
//             <span className="inline-block bg-gray-800/60 px-4 py-2 rounded">
//               Our Core Values
//             </span>
//           </h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {values.map((v) => (
//               <Card key={v.title} className="bg-gray-800/50 backdrop-blur-sm">
//                 <CardContent className="p-6 text-center">
//                   <div className="flex justify-center mb-4">{v.icon}</div>
//                   <h3 className="text-xl font-semibold mb-2">{v.title}</h3>
//                   <p className="text-gray-300 text-sm">{v.desc}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>
//       {/* …any additional sections go here… */}
//       {/* ───────────── TEAM ───────────── */}
//       /* --- TEAM --------------------------------------------------------- */
//       <section className="py-20">
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-16">
//             <AnimatedText
//               type="words"
//               stagger={0.05}
//               y={30}
//               className="text-3xl md:text-4xl font-bold mb-6"
//               onScrollTrigger
//             >
//               Meet Our Team
//             </AnimatedText>
//           </div>

//           {/* 🚫  NO MOTION – simple grid */}
//           <div className="grid md:grid-cols-3 gap-8">
//             {team.map((m) => (
//               <Card
//                 /* You can keep your hover styles etc. */
//                 key={m.name}
//                 className="bg-gray-800/50 border-gray-700"
//               >
//                 <div className="aspect-square bg-primary/20 p-4">
//                   {/* eslint-disable-next-line @next/next/no-img-element */}
//                   <img
//                     src={m.image}
//                     alt={m.name}
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                 </div>

//                 <CardContent className="p-6">
//                   <h3 className="text-xl text-cyan-500 font-semibold mb-1">
//                     {m.name}
//                   </h3>
//                   <p className="text-primary mb-3">{m.role}</p>
//                   <p className="text-gray-400 text-sm leading-relaxed">
//                     {m.bio}
//                   </p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

/*  app/about/page.tsx  – v2  */
/*  ------------------------------------------------------------------ */
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Award,
  Users,
  Target,
  Lightbulb,
  Star,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import Navbar from "@/components/navbar";
import ObjectParticles from "@/components/backgrounds/object-particles";
import AnimatedText from "@/components/animated-text";
import TextScramble from "@/components/text-scramble";
import FloatingText from "@/components/floating-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/* ------------------------------------------------------------------ */
/*  DATA – (merged old + new)                                          */
/* ------------------------------------------------------------------ */
const hero = {
  name: "Abdallah Hosny",
  tagline: "AI engineer | 3D specialist | Events manager | Trainer",
  about:
    "SWAGIFYY offers training & tech services: Unreal Engine, Marvelous Designer, Blender, next-gen motion-capture & MetaHuman – plus full event management and interactive 3D websites.",
  photo: "/Mr.jpeg",
};

const skills = [
  "3D Product Design",
  "Custom Branding",
  "E-commerce",
  "Digital Marketing",
  "UI/UX Design",
  "Business Strategy",
];

const stats = [
  { number: "500+", label: "Products Created" },
  { number: "100+", label: "Happy Clients" },
  { number: "5+", label: "Years Experience" },
  { number: "50+", label: "Brands Served" },
];

const values = [
  {
    icon: <Star className="w-8 h-8 text-yellow-400" />,
    title: "Passion",
    description:
      "We pour our heart into every product we create, ensuring each piece reflects your brand's identity.",
  },
  {
    icon: <Award className="w-8 h-8 text-blue-500" />,
    title: "Precision",
    description:
      "Attention to detail is our specialty. Every design is crafted with meticulous care.",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-green-500" />,
    title: "Innovation",
    description:
      "We stay ahead of trends & technology to bring you cutting-edge solutions.",
  },
  {
    icon: <Users className="w-8 h-8 text-red-500" />,
    title: "Partnership",
    description:
      "We build lasting relationships with clients, working together toward success.",
  },
];

const contact = [
  { icon: Mail, text: "abdallahemad800@gmail.com" },
  { icon: Phone, text: "+20 111 655 5793" },
  { icon: Phone, text: "+971 56 143 2193" },
  { icon: MapPin, text: "Saudi Arabia – Mecca" },
  { icon: MapPin, text: "UAE – Dubai" },
  { icon: MapPin, text: "Egypt – Cairo" },
];

const team = [
  {
    name: "Yousef Sherbeny",
    role: "Web Developer",
    image: "/yosef.jpg",
    bio: "10+ years in Web Development.",
  },
  {
    name: "Abdallah Hosny",
    role: "Lead Art Director",
    image: "/Mr.jpeg",
    bio: "Specialist in architectural visualization and product rendering.",
  },
  {
    name: "O2g",
    role: "3D Artist",
    image: "/o2g.jpg",
    bio: "Expert in real-time rendering and interactive 3D experiences.",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gray-900 text-white">
      {/* Particle background */}
      <div className="fixed inset-0 -z-5">
        <ObjectParticles count={40} background="#111827" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70" />
      </div>

      <Navbar />

      {/* ───────────── HERO ───────────── */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center pt-24 pb-16"
      >
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div
            className="relative w-72 h-128 sm:w-80 lg:w-96
           mx-auto rounded-full overflow-hidden shadow-2xl bg-gradient-to-br from-primary/40 to-purple-600/40"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero.photo}
              alt={hero.name}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Intro text */}
          <div className="text-center lg:text-left space-y-6">
            <TextScramble
              phrases={[`Hi, I'm ${hero.name}`]}
              className="text-4xl lg:text-5xl font-bold"
            />

            <AnimatedText
              type="lines"
              stagger={0.05}
              y={20}
              className="text-gray-300 text-lg leading-relaxed"
            >
              {hero.tagline}
            </AnimatedText>

            <AnimatedText
              type="lines"
              stagger={0.05}
              y={20}
              className="text-gray-300 text-lg leading-relaxed"
            >
              {hero.about}
            </AnimatedText>

            {/* Skills badges */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2">
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

            {/* Contact lines */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center lg:justify-start text-sm pt-6">
              {contact.map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="flex items-center gap-2 text-gray-400"
                >
                  <Icon size={16} /> {text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* floating tag */}
        <FloatingText
          amplitude={4}
          frequency={2}
          direction="vertical"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary font-semibold"
        >
          Crafting digital excellence since 2021
        </FloatingText>
      </section>

      {/* ───────────── STATS ───────────── */}
      <section className="py-20 backdrop-blur-md">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-4xl font-bold text-primary mb-2">
                {s.number}
              </div>
              <div className="text-gray-400">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────────── VALUES ───────────── */}
      <section className="py-20 bg-gray-800/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <AnimatedText
              type="words"
              stagger={0.05}
              y={30}
              className="text-3xl md:text-4xl font-bold mb-6"
              onScrollTrigger
            >
              Our Core Values
            </AnimatedText>
            <AnimatedText
              type="lines"
              stagger={0.08}
              y={20}
              className="max-w-2xl mx-auto text-gray-300"
              onScrollTrigger
            >
              Principles that guide every project, partnership and pixel.
            </AnimatedText>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-gray-800/50 h-full border-gray-700">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4 text-primary">
                      {v.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{v.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {v.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── TEAM ───────────── */}
      <section className="py-20 backdrop-blur-3xl ">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <AnimatedText
              type="words"
              stagger={0.05}
              y={30}
              className="text-3xl md:text-4xl font-bold mb-6"
              onScrollTrigger
            >
              Meet Our Team
            </AnimatedText>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-gray-800/50 border-gray-700 overflow-hidden">
                  <div className="aspect-square bg-primary/20 p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl text-cyan-500 font-semibold mb-1">
                      {m.name}
                    </h3>
                    <p className="text-primary mb-3">{m.role}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {m.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section className="py-20 bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <AnimatedText
            type="words"
            stagger={0.05}
            y={30}
            className="text-3xl md:text-5xl font-bold mb-6"
            onScrollTrigger
          >
            Ready to work with us?
          </AnimatedText>

          <AnimatedText
            type="lines"
            stagger={0.08}
            y={20}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto"
            onScrollTrigger
          >
            Let’s bring your creative vision to life with our expertise in 3D
            design, AI and immersive tech.
          </AnimatedText>
        </div>
      </section>
    </main>
  );
}
