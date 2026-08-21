"use client";

import Link from "next/link";
import { MailCheck, ArrowLeft, RefreshCw } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <main className="min-h-screen bg-[#050814] flex items-center justify-center px-4">
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
        <p className="mt-4 text-center text-gray-400 leading-7">
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

        {/* Buttons */}
        <div className="mt-8 space-y-4">

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            <RefreshCw size={18} />
            Resend Verification Email
          </button>

          <Link
            href="/login"
            className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Go to Login
          </Link>

          <Link
            href="/signup"
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