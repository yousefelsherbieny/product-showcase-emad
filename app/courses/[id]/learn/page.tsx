/* ────────────────────────────────────────────────────────────────
   app/courses/[id]/learn/page.tsx
   — gated lesson video ─ checks Firestore → /users/{uid}/courses/{id}
   ──────────────────────────────────────────────────────────────── */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { app, db } from "@/lib/firebase/config";

import Navbar from "@/components/navbar";
import ObjectParticles from "@/components/backgrounds/object-particles";

/* course-id → Vimeo video-id map.
   (Keep the keys identical to the course IDs you defined in courses/page.tsx) */
const videoMap: Record<string, string> = {
  blender: "1104918198",
  marvelous: "1104918198",
  cc4: "1104918198",
  unreal: "1104918198",
  rtf: "1104918198",
};

export default function LearnPage() {
  const { id } = useParams<{ id: string }>(); // course slug from URL
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  /* ───────── check auth + Firestore once ───────── */
  useEffect(() => {
    const auth = getAuth(app);

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/auth/login");
        return;
      }

      /* does /users/{uid}/courses/{id} exist? */
      const courseRef = doc(db, "users", user.uid, "courses", id);
      const snap = await getDoc(courseRef);

      setHasAccess(snap.exists());
      setLoading(false);
    });

    return () => unsub();
  }, [id, router]);

  /* ───────── render ───────── */
  const vimeoId = videoMap[id]; // undefined → not configured

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <Navbar />

      {/* star-field background */}
      <div className="fixed inset-0 -z-10">
        <ObjectParticles count={30} background="#111827" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70" />
      </div>

      <main className="flex-grow container mx-auto px-4 md:px-6 pt-28 pb-20 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Course Video
        </h1>

        {/* state   */}
        {loading && (
          <p className="text-center text-gray-400 text-lg">جارى التحميل…</p>
        )}

        {!loading && !hasAccess && (
          <p className="text-center text-red-400 text-lg">
            ليس لديك حق الوصول إلى هذا الكورس — يرجى الشراء أولاً.
          </p>
        )}

        {!loading && hasAccess && !vimeoId && (
          <p className="text-center text-red-400 text-lg">
            لم يتم إعداد الفيديو لهذا الكورس بعد.
          </p>
        )}

        {!loading && hasAccess && vimeoId && (
          <div className="w-full max-w-6xl aspect-video mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            <iframe
              src={`https://player.vimeo.com/video/${vimeoId}`}
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        )}
      </main>
    </div>
  );
}
