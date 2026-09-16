"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
  useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (!fullName.trim()) {
      setLoading(false);
      setErrorMessage("Full name is required.");
      return;
    }

    if (password.length < 6) {
      setLoading(false);
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: fullName,
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

    setTimeout(() => {
      router.push("/verify-email");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#050814] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">

        <h1 className="text-3xl font-bold text-center text-white">
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
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

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
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

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
    className="w-full rounded-lg border border-gray-700 bg-[#0b1220] px-4 py-3 pr-12 text-white outline-none focus:border-blue-500"
  />

  <button
    type="button"
    onClick={() =>
      setShowPassword(!showPassword)
    }
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
  >
    {showPassword ? (
      <EyeOff size={20} />
    ) : (
      <Eye size={20} />
    )}
  </button>

</div>
          </div>

          {errorMessage && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
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