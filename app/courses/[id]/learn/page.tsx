"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebase/config";

export default function LearnPage() {
  const { id } = useParams();
  const router = useRouter();
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 📝 خريطة ID الكورس → Bunny Video ID
  const courseVideoMap: Record<string, string> = {
    "1": "e71e1b22-d470-45a0-871b-f0d58a63c50a",
    "2": "f345e6d3-3c32-462f-9cd2-73e283fd4803",
    // ضيف الباقي حسب الحاجة
  };

  const LIBRARY_ID = "473301"; // ← استبدله بـ ID مكتبة Bunny الخاصة بيك

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
          router.push(`/courses/${id}`);
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

  const finalVideoUrl = videoId
    ? `https://vz-${videoId}-${LIBRARY_ID}.b-cdn.net/`
    : null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 pt-32 pb-20">
        {!loading && finalVideoUrl ? (
          <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
            <iframe
              src={`https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${videoId}`}
              loading="lazy"
              style={{ border: "none", width: "100%", height: "100%" }}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          !loading && (
            <div className="text-center text-red-400">
              فشل في تحميل الفيديو.
            </div>
          )
        )}
      </main>
    </div>
  );
}
