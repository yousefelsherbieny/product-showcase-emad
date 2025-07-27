"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebase/config";

export default function LearnPage() {
  const { id } = useParams();
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/auth/login");
        return;
      }

      try {
        const path = `videos/course-${id}.mp4`; // تأكد من تطابق اسم الملف
        const res = await fetch(
          `/api/getSignedUrl?uid=${user.uid}&path=${encodeURIComponent(path)}`
        );

        if (res.status === 403) {
          router.push(`/courses/${id}`);
          return;
        }

        const data = await res.json();
        console.log("🔥 Signed URL:", data.url); // للتأكيد والتحقق
        setVideoUrl(data.url);
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
      <main className="flex-grow container mx-auto px-6 pt-32 pb-20">
        {!loading && videoUrl ? (
          <video
            key={videoUrl}
            controls
            width="100%"
            className="rounded-xl shadow-xl"
          >
            <source src={videoUrl} type="video/mp4" />
            المتصفح لا يدعم تشغيل الفيديو.
          </video>
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
