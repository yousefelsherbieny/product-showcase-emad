"use client";

import { useEffect, useState } from "react";

export default function PurchasesPage() {
  const [downloads, setDownloads] = useState<any[]>([]);

  useEffect(() => {
    const saved = sessionStorage.getItem("downloads");
    if (saved) {
      setDownloads(JSON.parse(saved));
    }
  }, []);

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
