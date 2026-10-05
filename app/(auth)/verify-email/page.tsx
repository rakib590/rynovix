"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MailCheck,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function VerifyEmailForm() {
  const searchParams = useSearchParams();

  // --------------------------------
  // Preserve destination
  // --------------------------------
  const rawNext = searchParams.get("next");

  const next =
    rawNext &&
    rawNext.startsWith("/") &&
    !rawNext.startsWith("//")
      ? rawNext
      : "/dashboard";

  // --------------------------------
  // State
  // --------------------------------
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // --------------------------------
  // Resend Verification Email
  // --------------------------------
  const handleResendEmail = async () => {
    setResending(true);
    setMessage("");
    setErrorMessage("");

    const supabase = createClient();

    // Get current user/session email
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      setResending(false);
      setErrorMessage(
        "We couldn't find your email address. Please go back to signup and try again."
      );
      return;
    }

    const emailRedirectTo =
      `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: user.email,
      options: {
        emailRedirectTo,
      },
    });

    setResending(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setMessage(
      "Verification email sent successfully. Please check your inbox."
    );
  };

  // --------------------------------
  // Navigation URLs
  // --------------------------------
  const loginUrl =
    next === "/dashboard"
      ? "/login"
      : `/login?next=${encodeURIComponent(next)}`;

  const signupUrl =
    next === "/dashboard"
      ? "/signup"
      : `/signup?next=${encodeURIComponent(next)}`;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050814] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600/20">
            <MailCheck
              size={40}
              className="text-blue-400"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-center text-3xl font-bold text-white">
          Verify Your Email
        </h1>

        {/* Description */}
        <p className="mt-4 text-center leading-7 text-gray-400">
          We've sent a verification link to your email address.
          <br />
          Please open your inbox and click the verification link to activate your
          RYNOVIX account.
        </p>

        {/* Info Box */}
        <div className="mt-8 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
          <p className="text-center text-sm text-blue-300">
            📧 Didn't receive the email?
            <br />
            Check your Spam or Promotions folder.
          </p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-center text-sm text-red-400">
              {errorMessage}
            </p>
          </div>
        )}

        {/* Success Message */}
        {message && (
          <div className="mt-5 rounded-xl border border-green-500/30 bg-green-500/10 p-4">
            <p className="text-center text-sm text-green-400">
              {message}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 space-y-4">
          {/* Resend */}
          <button
            type="button"
            onClick={handleResendEmail}
            disabled={resending}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3 font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={18}
              className={resending ? "animate-spin" : ""}
            />

            {resending
              ? "Sending..."
              : "Resend Verification Email"}
          </button>

          {/* Login */}
          <Link
            href={loginUrl}
            className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Go to Login
          </Link>

          {/* Signup */}
          <Link
            href={signupUrl}
            className="flex items-center justify-center gap-2 text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Signup
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
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
      <VerifyEmailForm />
    </Suspense>
  );
}