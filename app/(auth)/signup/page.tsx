"use client";

import { Suspense, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // --------------------------------
  // Preserve the destination
  // --------------------------------
  const rawNext = searchParams.get("next");

  const next =
    rawNext &&
    rawNext.startsWith("/") &&
    !rawNext.startsWith("//")
      ? rawNext
      : "/dashboard";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // ------------------------
  // Signup
  // ------------------------
  const handleSignup = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    // Full name validation
    if (!fullName.trim()) {
      setLoading(false);
      setErrorMessage("Full name is required.");
      return;
    }

    // Password validation
    if (password.length < 6) {
      setLoading(false);
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    const supabase = createClient();

    // Email verification will return to auth callback
    // and preserve the original destination.
    const emailRedirectTo =
      `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo,
        data: {
          full_name: fullName.trim(),
        },
      },
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setSuccessMessage(
      "Account created successfully! Please check your email to verify your account."
    );

    // Preserve next when going to verification page
    setTimeout(() => {
      router.push(
        `/verify-email?next=${encodeURIComponent(next)}`
      );
    }, 2000);
  };

  // ------------------------
  // Login URL
  // ------------------------
  const loginUrl =
    next === "/dashboard"
      ? "/login"
      : `/login?next=${encodeURIComponent(next)}`;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050814] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
        <h1 className="text-center text-3xl font-bold text-white">
          Create Account
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Join RYNOVIX and start creating AI content.
        </p>

        <form
          className="mt-8 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
        >
          {/* Full Name */}
          <div>
            <label className="text-sm text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={loading}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0b1220] px-4 py-3 text-white outline-none transition focus:border-blue-500 disabled:opacity-50"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0b1220] px-4 py-3 text-white outline-none transition focus:border-blue-500 disabled:opacity-50"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300">
              Password
            </label>

            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full rounded-lg border border-gray-700 bg-[#0b1220] px-4 py-3 pr-12 text-white outline-none transition focus:border-blue-500 disabled:opacity-50"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                disabled={loading}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-white disabled:opacity-50"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {errorMessage}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
              {successMessage}
            </div>
          )}

          {/* Create Account Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        {/* Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link
              href={loginUrl}
              className="font-medium text-blue-400 transition hover:text-blue-300"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#050814] px-4">
          <div className="text-center text-gray-400">
            Loading...
          </div>
        </main>
      }
    >
      <SignupForm />
    </Suspense>
  );
}