"use client";

import { useEffect, useState } from "react";

export default function DownloadPage() {
  const [models, setModels] = useState<{ name: string; modelUrl: string }[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("purchased_cart");
    if (raw) {
      try {
        const parsedCart = JSON.parse(raw);
        const downloadableModels = parsedCart
          .filter((item: any) => item.modelUrl)
          .map((item: any) => ({
            name: item.name,
            modelUrl: item.modelUrl,
          }));

        setModels(downloadableModels);

        // ✅ امسح cart بعد ما نعرضه
        localStorage.removeItem("purchased_cart");
      } catch (err) {
        console.error("Error parsing purchased_cart", err);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <h1 className="text-3xl font-bold mb-6">🎉 شكراً لشرائك! قم بتحميل الموديلات:</h1>
 
 
      {models.length === 0 ? (
        <p className="text-gray-500">لا يوجد ملفات قابلة للتحميل. تأكد إنك اشتريت موديلات تحتوي على روابط تحميل.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((item, index) => (
            <div key={index} className="p-4 border rounded shadow">
              <h2 className="font-semibold mb-2">{item.name}</h2>
              <a
                href={item.modelUrl}
                download
                className="text-blue-600 hover:underline"
                target="_blank"
              >
                ⬇️ تحميل الموديل
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
