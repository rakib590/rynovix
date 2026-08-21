"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleResetPassword = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setSuccessMessage(
      "Password updated successfully! Redirecting to login..."
    );

    setTimeout(async () => {
      await supabase.auth.signOut();
      router.replace("/login");
      router.refresh();
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#050814] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">

        <h1 className="text-3xl font-bold text-center text-white">
          Reset Password
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Enter your new password below.
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
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
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
            {loading ? "Updating..." : "Update Password"}
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