"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function DownloadPage() {
  const searchParams = useSearchParams()
  const [models, setModels] = useState<{ name: string; modelUrl: string }[]>([])

  useEffect(() => {
    const items = searchParams.get("items")
    if (items) {
      try {
        const parsed = JSON.parse(decodeURIComponent(items))
        setModels(parsed.filter((item: any) => item.modelUrl))
      } catch (err) {
        console.error("Error parsing items", err)
      }
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <h1 className="text-3xl font-bold mb-6">🎉 شكراً لشرائك! حمّل الموديلات:</h1>

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
    </div>
  )
}
