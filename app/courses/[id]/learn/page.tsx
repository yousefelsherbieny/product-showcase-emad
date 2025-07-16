/* app/courses/[id]/page.tsx */
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import { PlayCircle } from "lucide-react";
import clsx from "clsx";

/* ────────────────────────────────────────────────────────────── */
/* MOCK DATA – replace with real fetch                              */
const course = {
  title: "Master The Art Of Product Modelling & Animation In Blender",
  hero: "/videos/post-processing.mp4", // HLS / dash / mux etc.
  chapters: [
    {
      name: "Fundamentals",
      items: [
        { id: "intro", title: "Introduction", duration: "01:00" },
        {
          id: "what-is-r3f",
          title: "What is React Three Fiber?",
          duration: "10:09",
        },
        /* … */
      ],
    },
    {
      name: "Core",
      items: [
        { id: "hooks", title: "React Three Fiber Hooks", duration: "06:16" },
        /* … */
      ],
    },
  ],
  lessonSections: [
    "React Post‑processing",
    "Vignette",
    "Bloom",
    "Brightness / Contrast",
    "Sepia",
    "Noise",
    "Autofocus",
    "Conclusion",
  ],
};
/* ────────────────────────────────────────────────────────────── */

export default function CourseDetailPage() {
  const { id } = useParams(); // e.g. 1, 2, 3
  const [active, setActive] = useState(course.chapters[0].items[0].id);

  return (
    <div className="flex min-h-screen bg-neutral-950 text-white">
      {/* fixed nav on top – stays consistent with the rest of your site */}
      <Navbar />

      {/* main content row */}
      <div className="flex w-full pt-16">
        {" "}
        {/* pt-16 under navbar height */}
        {/* 1️⃣ Left – chapter navigator */}
        <aside className="w-64 shrink-0 border-r border-neutral-800 h-[calc(100vh-4rem)] overflow-y-auto sticky top-16 bg-neutral-900/80 backdrop-blur">
          {course.chapters.map((c, idx) => (
            <div key={c.name} className="px-4 py-3">
              <p className="uppercase text-xs tracking-widest text-neutral-400 mb-2">
                Chapter {idx + 1}
              </p>
              <h3 className="font-semibold mb-3">{c.name}</h3>

              <ul className="space-y-2">
                {c.items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActive(item.id)}
                      className={clsx(
                        "w-full text-left flex items-center justify-between rounded px-2 py-1.5 text-sm",
                        active === item.id
                          ? "bg-purple-600/20 text-white"
                          : "hover:bg-neutral-800 text-neutral-300"
                      )}
                    >
                      <span>{item.title}</span>
                      <span className="text-xs">{item.duration}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
        {/* 2️⃣ Center – video + lesson content */}
        <main className="flex-1 max-w-5xl mx-auto px-6 py-8 space-y-8">
          {/* video player stub */}
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
            <video
              key={active} // re‑load when lesson changes
              src={course.hero}
              controls
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* lesson heading & resources */}
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold flex-1">
              {active.replace(/-/g, " ")}
            </h1>
            <Link
              href="#starter"
              className="text-xs bg-neutral-800 hover:bg-neutral-700 rounded px-3 py-1"
            >
              Starter pack
            </Link>
            <Link
              href="#final"
              className="text-xs bg-purple-600 hover:bg-purple-700 rounded px-3 py-1"
            >
              Final code
            </Link>
          </div>

          {/* lesson body placeholder */}
          <article className="prose prose-invert max-w-none">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              posuere nisi sed leo tristique, sit amet tempus dui facilisis…
            </p>
            {/* … */}
          </article>
        </main>
        {/* 3️⃣ Right – Table‑of‑contents & community card */}
        <aside className="w-64 shrink-0 border-l border-neutral-800 h-[calc(100vh-4rem)] overflow-y-auto sticky top-16 px-4 py-6 space-y-8 bg-neutral-900/80 backdrop-blur">
          <section>
            <h4 className="font-semibold mb-3">Lesson Content</h4>
            <ul className="space-y-2 text-sm">
              {course.lessonSections.map((s) => (
                <li key={s}>
                  <a href="#" className="hover:text-purple-400 block truncate">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-neutral-800 p-4 rounded-lg">
            <p className="text-sm mb-3">
              Share your progress and ask questions in our{" "}
              <span className="text-purple-400 font-medium">Discord</span>{" "}
              community!
            </p>
            <Link
              href="https://discord.gg/your‑server"
              target="_blank"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded w-full justify-center"
            >
              <PlayCircle className="w-4 h-4" />
              Join
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
