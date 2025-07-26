"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";

export default function PurchasesPage() {
  const [downloads, setDownloads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/"); // ✅ لو مفيش يوزر نوجهه لتسجيل الدخول
        return;
      }

      try {
        const purchasesRef = collection(db, "users", user.uid, "purchases");
        const snapshot = await getDocs(purchasesRef);
        const models = snapshot.docs.map((doc) => doc.data());
        setDownloads(models);
      } catch (error) {
        console.error("Failed to load purchases:", error);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📦 Your Purchases</h2>
      {downloads.length === 0 ? (
        <p className="text-gray-400">No downloadable models found.</p>
      ) : (
        <ul className="space-y-4">
          {downloads.map((item, index) => (
            <li key={index} className="bg-gray-700 rounded p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{item.name}</p>
                </div>
                <a
                  href={item.modelUrl}
                  download
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition"
                >
                  Download
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
