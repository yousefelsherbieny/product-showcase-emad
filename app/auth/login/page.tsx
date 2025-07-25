/* app/auth/login/page.tsx */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

import Navbar from "@/components/navbar";
import ObjectParticles from "@/components/backgrounds/object-particles";
import { Button } from "@/components/ui/button";
import {
  signInWithEmail,
  signInWithGoogle,
  logLogin,
  logError,
} from "@/lib/firebase";

/* ------------------------------------------------------------------ */

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  /* ───────── helpers ───────── */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signInWithEmail(formData.email, formData.password);
      logLogin("email");
      router.push("/");
    } catch (err: any) {
      setError(err.message);
      logError(err.message, "email_login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      logLogin("google");
      router.push("/");
    } catch (err: any) {
      setError(err.message);
      logError(err.message, "google_login");
    } finally {
      setIsLoading(false);
    }
  };

  /* ------------------------------------------------------------------ */
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gray-900 text-white">
      {/* animated particles layer */}
      <div className="fixed inset-0 z-0">
        <ObjectParticles count={40} background="#111827" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70 pointer-events-none" />
      </div>

      {/* site navbar */}
      <Navbar />

      {/* back‑to‑home button */}
      <div className="fixed top-20 left-4 z-20">
        <Link href="/" passHref>
          <Button variant="outline" size="sm" className="bg-gray-800/50">
            ← Home
          </Button>
        </Link>
      </div>

      {/* page grid: form (left) / branding (right) */}
      <div className="relative z-10 flex min-h-screen pt-20">
        {/* ───────── LEFT: login form ───────── */}
        <section className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md bg-gray-800/60 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
            {/* heading */}
            <h1 className="text-3xl font-bold text-center mb-8">SWAGIFYY</h1>

            {/* error */}
            {error && (
              <p className="bg-red-500/10 text-red-400 px-4 py-2 rounded mb-4 text-sm">
                {error}
              </p>
            )}

            {/* social login */}
            <div className="space-y-3 mb-6">
              <Button
                variant="outline"
                className="w-full flex  text-blue-400 items-center justify-center gap-3"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <Image
                  src="/icons/google.svg"
                  alt="Google"
                  width={18}
                  height={18}
                />
                {isLoading ? "Signing in…" : "Continue with Google"}
              </Button>
            </div>

            {/* divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600" />
              </div>
              <p className="relative text-center text-xs uppercase px-2 bg-gray-800/60">
                or
              </p>
            </div>

            {/* email/password form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 focus:ring-primary focus:border-primary"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 pr-10 rounded bg-gray-900 border border-gray-700 focus:ring-primary focus:border-primary"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between text-sm mb-4">
                <Link
                  href="/auth/forgot-password"
                  className="text-primary hover:underline"
                >
                  Forgot password?
                </Link>
                <Link
                  href="/auth/signup"
                  className="text-primary hover:underline"
                >
                  No account? Sign up
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !formData.email || !formData.password}
              >
                {isLoading ? "Signing in…" : "Login"}
              </Button>
            </form>

            <p className="mt-8 text-center text-xs text-gray-500">
              © 2025 Swagifyy. All rights reserved.
            </p>
          </div>
        </section>

        {/* ───────── RIGHT: branding / illustration ───────── */}
        <aside className="hidden lg:flex flex-1 items-center justify-center p-8">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold mb-4">
              Swag your brand with Swagifyy
            </h2>
            <p className="text-gray-300 mb-6">
              Easily create premium custom‑branded products for your team,
              events and clients — all in bulk, all in 3D, all in one platform.
            </p>
            {/* decorative cube stack */}
            <div className="relative w-52 h-52 mx-auto">
              <div className="absolute inset-0 rotate-12 rounded-3xl bg-primary/20" />
              <div className="absolute inset-0 -rotate-6 rounded-3xl bg-primary/30" />
              <div className="relative flex items-center justify-center h-full w-full bg-primary rounded-3xl">
                <span className="text-5xl font-black">3D</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
