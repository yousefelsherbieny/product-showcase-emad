"use client";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Image from "next/image";

export default function SettingsPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading user information...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Account Settings</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt="User Avatar"
              width={64}
              height={64}
              className="rounded-full"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              {user.displayName?.[0] || user.email?.[0] || "U"}
            </div>
          )}

          <div>
            <p className="text-xl font-semibold text-gray-800">{user.displayName || "No Name Set"}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500">UID: {user.uid}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-700 text-sm">Email</label>
            <input
              type="text"
              value={user.email}
              readOnly
              className="w-full mt-1 px-4 py-2 border rounded-md bg-gray-100 text-gray-600"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm">User ID (UID)</label>
            <input
              type="text"
              value={user.uid}
              readOnly
              className="w-full mt-1 px-4 py-2 border rounded-md bg-gray-100 text-gray-600"
            />
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-500">
            If you need to update your profile picture, name, or email, please use your authentication provider settings (e.g. Google).
          </p>
        </div>
      </div>
    </div>
  );
}
