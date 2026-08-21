"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ------------------------
  // Email Login
  // ------------------------
  const handleLogin = async () => {
    const supabase = createClient();

    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    router.replace("/dashboard");
    router.refresh();
  };

  // ------------------------
  // Google Login
  // ------------------------
  const handleGoogleLogin = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });

    console.log("OAuth Data:", data);
    console.log("OAuth Error:", error);

    if (error) {
      alert(error.message);
      return;
    }

    if (data?.url) {
      window.location.href = data.url;
    }
  };

  return (
    <main className="min-h-screen bg-[#050814] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
        <h1 className="text-3xl font-bold text-center text-white">
          Welcome Back
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Sign in to your RYNOVIX account
        </p>

        {/* Google Login */}
        <div className="mt-8">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-white py-3 font-semibold text-gray-900 transition hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-5 w-5"
            >
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303C33.651 32.657 29.207 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C34.046 6.053 29.277 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
              />
              <path
                fill="#FF3D00"
                d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C34.046 6.053 29.277 4 24 4c-7.682 0-14.347 4.337-17.694 10.691z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.176 0 9.861-1.977 13.409-5.192l-6.19-5.238C29.158 35.091 26.679 36 24 36c-5.186 0-9.623-3.329-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303a12.05 12.05 0 01-4.084 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
              />
            </svg>

            Continue with Google
          </button>
        </div>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-white/10" />
          <span className="px-4 text-sm text-gray-500">OR</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div>
            <label className="text-sm text-gray-300">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Forgot Password?
            </Link>
          </div>

          {errorMessage && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}