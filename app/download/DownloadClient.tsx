"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ObjectParticles from "@/components/backgrounds/object-particles";
import Navbar from "@/components/navbar";

import { auth } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { getUserPurchases } from "@/lib/firebase/firestore"; // ✅ استدعاء الدالة الموحدة

export default function DownloadPage() {
  const [models, setModels] = useState<{ name: string; modelUrl: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userModels = await getUserPurchases(user.uid); // ✅ استخدام الدالة الموحدة
          setModels(userModels);
        } catch (err) {
          console.error("Error loading purchases from Firestore:", err);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="relative min-h-screen bg-gray-900 text-white">
      {/* الخلفية */}
      <div className="fixed inset-0 z-0">
        <ObjectParticles count={40} background="#111827" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70 pointer-events-none" />
      </div>

      <Navbar />

      <div className="container mx-auto px-6 py-12 relative z-10 pt-24 space-y-12 text-center">
        {/* زر الرجوع */}
        <div className="flex items-center justify-start max-w-6xl mx-auto">
          <Link
            href="/Settings/purchases"
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span>Back to Profile</span>
          </Link>
        </div>

        {/* المحتوى */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-green-400">
            🎉 شكراً لشرائك
          </h2>
          <h3 className="text-lg mb-4">
            قم بتحميل الموديلات التي قمت بشرائها:
          </h3>

          {loading ? (
            <p className="text-gray-300">...جارٍ التحميل</p>
          ) : models.length === 0 ? (
            <p className="text-gray-300">
              لا يوجد ملفات قابلة للتحميل، تأكد أنك اشتريت موديلات تحتوي على روابط تحميل
            </p>
          ) : (
            <ul className="space-y-4 max-w-2xl mx-auto">
              {models.map((item, index) => (
                <li
                  key={index}
                  className="bg-white/10 border border-white/20 rounded p-4 flex justify-between items-center"
                >
                  <span className="font-semibold text-white">{item.name}</span>
                  <a
                    href={item.modelUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    ⬇️ تحميل
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
