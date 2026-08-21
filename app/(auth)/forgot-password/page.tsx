"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleResetPassword = async () => {
    const supabase = createClient();

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const redirectUrl = `${window.location.origin}/auth/callback?next=/reset-password`;

    console.log("====================================");
    console.log("RESET PASSWORD REDIRECT URL:");
    console.log(redirectUrl);
    console.log("====================================");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    setLoading(false);

    if (error) {
      console.error("RESET PASSWORD ERROR:", error);
      setErrorMessage(error.message);
      return;
    }

    console.log("RESET PASSWORD EMAIL SENT");

    setSuccessMessage(
      "Password reset email sent successfully! Please check your inbox."
    );
  };

  return (
    <main className="min-h-screen bg-[#050814] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">

        <h1 className="text-3xl font-bold text-center text-white">
          Forgot Password
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Enter your email and we'll send you a password reset link.
        </p>

        <form
          className="mt-8 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleResetPassword();
          }}
        >
          <div>
            <label className="text-sm text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-blue-500"
            />
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
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-blue-400 hover:text-blue-300"
          >
            ← Back to Login
          </Link>
        </div>

      </div>
    </main>
  );
}