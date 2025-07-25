"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import ObjectParticles from "@/components/backgrounds/object-particles";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const tabs = [
  { name: "Profile", href: "/Settings/profile" },
  { name: "Purchases", href: "/Settings/purchases" },
];

export default function SettingsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gray-900 text-white">
      {/* خلفية متحركة */}
      <div className="fixed inset-0 z-0">
        <ObjectParticles count={40} background="#111827" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70 pointer-events-none" />
      </div>

      {/* الناف بار */}
      <Navbar />

      {/* المحتوى */}  
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 max-w-6xl">
        {/* زر الرجوع للصفحة الرئيسية */}
        <div className="flex items-center mb-8">
          <Link
            href="/"
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold ml-auto">My Settings</h1>
        </div>

        {/* التبويبات */}
        <div className="flex gap-2 border-b border-gray-700 mb-8">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "px-4 py-2 rounded-t-md text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>

        {/* محتوى كل تبويب */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md">{children}</div>
      </div>
    </main>
  );
}
