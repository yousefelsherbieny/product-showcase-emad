// components/ImageRippleWidget.tsx
"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

function Loader() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <span className="animate-pulse text-sm text-gray-400">Loading…</span>
    </div>
  );
}

// ✅ point to "./ui/image-ripple" (inside the same `components` folder)
const Scene = dynamic(
  () => import("./ui/image-ripple").then((m) => m.Scene), // or `m.default` if you exported default
  { ssr: false, loading: Loader }
);

export default function ImageRippleWidget() {
  return (
    <Suspense fallback={<Loader />}>
      <Scene />
    </Suspense>
  );
}
