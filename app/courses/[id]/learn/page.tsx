"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebase/config";
import ObjectParticles from "@/components/backgrounds/object-particles";

export default function LearnPage() {
  const { id } = useParams();
  const router = useRouter();
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState<boolean>(true); // حالة الوصول إلى الكورس

  const courseVideoMap: Record<string, string> = {
    "1": "e71e1b22-d470-45a0-871b-f0d58a63c50a",
    "2": "f345e6d3-3c32-462f-9cd2-73e283fd4803",
  };

  const LIBRARY_ID = "473301";

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/auth/login");
        return;
      }

      try {
        const res = await fetch(
          `/api/check-course-access?uid=${user.uid}&courseId=${id}`
        );
        if (!res.ok) {
          setHasAccess(false);  // لا يوجد وصول للكورس
          return;
        }

        const matchedVideoId = courseVideoMap[id as string];
        if (!matchedVideoId) {
          throw new Error("فيديو غير موجود لهذا الكورس.");
        }

        setVideoId(matchedVideoId);
      } catch (error) {
        console.error("فشل في تحميل الفيديو:", error);
        router.push(`/courses/${id}`);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [id, router]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <Navbar />

      {/* خلفية الجسيمات 3D */}
      <div className="fixed inset-0 z-0">
        <ObjectParticles count={30} background="#111827" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70 pointer-events-none"></div>
      </div>

      <main className="flex-grow container mx-auto px-4 md:px-6 pt-28 pb-20 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Course Video
        </h1>

        {/* إذا المستخدم لا يملك الوصول، أظهر هذه الرسالة */}
        {!hasAccess && !loading ? (
          <div className="text-center text-red-400 mt-10 text-lg">
            ليس لديك حق الوصول إلى هذا الكورس. يجب شراء الكورس أولاً.
          </div>
        ) : !loading && videoId ? (
          <div className="w-full max-w-6xl aspect-video mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            <iframe
              src={`https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${videoId}`}
              loading="lazy"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
              className="w-full h-full border-0"
            ></iframe>
          </div>
        ) : !loading ? (
          <div className="text-center text-red-400 mt-10 text-lg">
            فشل في تحميل الفيديو.
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-10 text-lg">
            جاري تحميل الفيديو...
          </div>
        )}
      </main>
    </div>
  );
}
