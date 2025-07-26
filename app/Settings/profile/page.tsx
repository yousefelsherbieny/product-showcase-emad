"use client";

import { useEffect, useState } from "react";
import { getAuth, type User, onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProfileSettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // ✅ مهم للتحويل

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/"); // ✅ لو مفيش يوزر نوجهه لتسجيل الدخول
        return;
      }
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading || !user) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <p className="text-gray-400">Loading user information…</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Account Settings</h2>

      <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
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
              {user.displayName ?? "No Name Set"}
            </p>
            <p className="text-sm text-gray-300">{user.email}</p>
            <p className="text-xs text-gray-500">UID: {user.uid}</p>
          </div>
        </div>

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
              User ID (UID)
            </label>
            <input
              value={user.uid ?? ""}
              readOnly
              className="w-full px-4 py-2 bg-gray-900/40 border border-gray-700 rounded-md text-gray-300"
            />
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-400 leading-relaxed">
          To change your profile picture, display name, or email, please use
          the settings of your authentication provider (e.g. Google).
        </p>
      </div>
    </div>
  );
}
