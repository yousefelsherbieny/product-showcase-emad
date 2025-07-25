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

        // ✅ خزّنهم كـ downloads علشان يظهروا في صفحة المشتريات
        localStorage.setItem("downloads", JSON.stringify(downloadableModels));

        // ✅ امسح السلة بعد التخزين
        localStorage.removeItem("purchased_cart");
      } catch (err) {
        console.error("Error parsing purchased_cart", err);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">🎉 شكراً لشرائك!</h2>
      <h3 className="text-lg mb-4 text-center">قم بتحميل الموديلات التي قمت بشرائها:</h3>

      {models.length === 0 ? (
        <p className="text-gray-500 text-center">
          لا يوجد ملفات قابلة للتحميل. تأكد أنك اشتريت موديلات تحتوي على روابط تحميل.
        </p>
      ) : (
        <ul className="space-y-4 max-w-2xl mx-auto">
          {models.map((item, index) => (
            <li key={index} className="bg-gray-100 border border-gray-300 rounded p-4 flex justify-between items-center">
              <span className="font-semibold">{item.name}</span>
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
  );
}
