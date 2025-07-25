/* app/auth/signup/page.tsx
   ------------------------------------------------------------------ */
"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Navbar from "@/components/navbar";
import ObjectParticles from "@/components/backgrounds/object-particles";
import { Button } from "@/components/ui/button";
import {
  signUpWithEmail,
  signInWithGoogle,
  createUserProfile,
  logSignUp,
  logError,
} from "@/lib/firebase";

export default function SignupPage() {
  /* ---------------------------------------------------------------- */
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  /* ---------------------------------------------------------------- */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* e‑mail / password sign‑up -------------------------------------- */
  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const user = await signUpWithEmail(
        formData.email,
        formData.password,
        formData.displayName
      );

      await createUserProfile(user.uid, {
        email: user.email ?? formData.email,
        displayName: formData.displayName || user.displayName || "",
        photoURL: user.photoURL ?? "",
      });

      logSignUp("email");
      router.push("/");
    } catch (err: any) {
      setError(err.message);
      logError(err.message, "email_sign_up");
    } finally {
      setIsLoading(false);
    }
  };

  /* Google OAuth ---------------------------------------------------- */
  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError("");

    try {
      const user = await signInWithGoogle();
      await createUserProfile(user.uid, {
        email: user.email ?? "",
        displayName: user.displayName ?? "",
        photoURL: user.photoURL ?? "",
      });
      logSignUp("google");
      router.push("/");
    } catch (err: any) {
      setError(err.message);
      logError(err.message, "google_sign_up");
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------------------------------------------------------- */
  return (
    <main className="relative min-h-screen overflow-x-hidden text-white">
      {/* 🔹 full‑screen particle background (same as homepage) */}
      <div className="fixed inset-0 -z-10">
        <ObjectParticles count={40} background="#0f172a" />
        <div
          className="absolute inset-0 bg-gradient-to-b
                        from-gray-900/80 via-transparent to-gray-900/80"
        />
      </div>

      {/* 🔹 navbar shared across the site */}
      <Navbar />

      {/* 🔹 a little “Back home” helper */}
      <Link
        href="/"
        className="fixed top-20 left-6 z-20 rounded-full bg-white/10
                   px-3 py-1 text-sm hover:bg-white/20 backdrop-blur"
      >
        ← Home
      </Link>

      {/* two‑panel layout – left branding / right form */}
      <div className="flex min-h-screen pt-20">
        {" "}
        {/* pt‑20 = height of navbar */}
        {/* LEFT – brand panel */}
        <section
          className="hidden lg:flex flex-1 bg-blue-600
                            items-center justify-center p-10 relative overflow-hidden"
        >
          {/* decorative slanted strips */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="absolute top-0  w-full h-8 bg-blue-700 -skew-y-1" />
            <div className="absolute top-4  w-full h-8 bg-blue-500  skew-y-1" />
            <div className="absolute bottom-0 w-full h-8 bg-blue-700  skew-y-1" />
            <div className="absolute bottom-4 w-full h-8 bg-blue-500 -skew-y-1" />
          </div>

          <div className="relative z-10 max-w-md text-center">
            <h2 className="text-4xl font-extrabold mb-4">
              Swag That Means Business
            </h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              Swagifyy makes it easy to design welcome kits and event giveaways.
              The real‑time 3D preview is a total game‑changer!
            </p>
          </div>
        </section>
        {/* RIGHT – signup form */}
        <section
          className="flex-1 flex items-center justify-center bg-white/90
                            backdrop-blur px-6 py-12"
        >
          <div className="w-full max-w-md text-neutral-900">
            {/* ───────────────────────── HEADER */}
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-primary mb-2">SWAGIFYY</h1>
              <p className="text-sm text-neutral-600">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-blue-600 hover:underline"
                >
                  Log in
                </Link>
              </p>
            </header>

            {/* ───────────────────────── COPY */}
            <h2 className="text-2xl font-bold mb-2">
              Create your Swagifyy account
            </h2>
            <p className="text-neutral-600 mb-6">
              Customise branded swag, manage bulk orders and track every step —
              from design to doorstep.
            </p>

            {/* ───────────────────────── ERROR */}
            {error && (
              <div
                className="bg-red-50 border border-red-300 text-red-700
                              px-4 py-3 rounded mb-6 text-sm"
              >
                {error}
              </div>
            )}

            {/* ───────────────────────── FORM */}
            <form onSubmit={handleEmailSignup} className="space-y-4">
              <input
                type="text"
                name="displayName"
                placeholder="Full name"
                value={formData.displayName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded border
                           focus:ring focus:ring-primary/40"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded border
                           focus:ring focus:ring-primary/40"
              />
              <input
                type="password"
                name="password"
                placeholder="Password (min 6 chars)"
                minLength={6}
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded border
                           focus:ring focus:ring-primary/40"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded border
                           focus:ring focus:ring-primary/40"
              />

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700
                           text-white py-3 font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Creating account…" : "Create account"}
              </Button>
            </form>

            {/* ───────────────────────── DIVIDER */}
            <div className="flex items-center my-6">
              <span className="flex-1 h-px bg-neutral-300" />
              <span className="px-3 text-neutral-500 text-sm">or</span>
              <span className="flex-1 h-px bg-neutral-300" />
            </div>

            {/* ───────────────────────── SOCIAL */}
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-3 h-12"
              onClick={handleGoogleSignup}
              disabled={isLoading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                /** … google logo paths … */
              </svg>
              {isLoading ? "Signing up…" : "Sign up with Google"}
            </Button>

            {/* ───────────────────────── FOOTER */}
            <p className="mt-8 text-xs text-neutral-500 text-center">
              By creating an account you agree to Swagifyy’s{" "}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Terms
              </Link>{" "}
              &amp;{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
