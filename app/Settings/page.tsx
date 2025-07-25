/* app/settings/page.tsx */
"use client";

import { useEffect, useState } from "react";
import { getAuth, type User } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/navbar";
import ObjectParticles from "@/components/backgrounds/object-particles";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);

  /* grab the current Firebase user once the component mounts */
  useEffect(() => {
    const auth = getAuth();
    setUser(auth.currentUser);
  }, []);

  /* ───────────────────────────────────────── loading state ───── */
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <p className="text-gray-400">Loading user information…</p>
      </div>
    );
  }

  /* ───────────────────────────────────────── actual page ─────── */
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gray-900 text-white">
      {/* full‑screen animated particles just like Home */}
      <div className="fixed inset-0 z-0">
        <ObjectParticles count={40} background="#111827" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70 pointer-events-none" />
      </div>

      {/* site navigation */}
      <Navbar />

      {/* page content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 max-w-3xl">
        {/* back‑to‑home */}
        <div className="mb-8">
          <Link href="/" passHref>
            <Button variant="outline" size="sm" className="bg-gray-800/50">
              ← Back to Home
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

        <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          {/* avatar + basic info */}
          <div className="flex items-center gap-4 mb-8">
            {user.photoURL ? (
              <Image
                src={user.photoURL}
                alt="User avatar"
                width={72}
                height={72}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-18 h-18 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-semibold">
                {user.displayName?.[0] ?? user.email?.[0] ?? "U"}
              </div>
            )}

            <div>
              <p className="text-xl font-semibold">
                {user.displayName ?? "No Name Set"}
              </p>
              <p className="text-sm text-gray-300">{user.email}</p>
              <p className="text-xs text-gray-500">UID: {user.uid}</p>
            </div>
          </div>

          {/* read‑only details */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-1 text-gray-400">Email</label>
              <input
                value={user.email ?? ""}
                readOnly
                className="w-full px-4 py-2 bg-gray-900/40 border border-gray-700 rounded-md text-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-400">
                User ID (UID)
              </label>
              <input
                value={user.uid}
                readOnly
                className="w-full px-4 py-2 bg-gray-900/40 border border-gray-700 rounded-md text-gray-300"
              />
            </div>
          </div>

          <p className="mt-8 text-sm text-gray-400 leading-relaxed">
            To change your profile picture, display name, or email, please use
            the settings of your authentication provider (e.g. Google).
          </p>
        </div>
      </div>
    </main>
  );
}
