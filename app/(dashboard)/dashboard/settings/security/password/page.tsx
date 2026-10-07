"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { createClient } from "@/lib/supabase/client";

export default function ChangePasswordPage() {
  const supabase = createClient();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function validatePassword() {
    if (!currentPassword) {
      return "Current password is required.";
    }

    if (!newPassword) {
      return "New password is required.";
    }

    if (newPassword.length < 8) {
      return "New password must be at least 8 characters.";
    }

    if (!/[A-Z]/.test(newPassword)) {
      return "New password must contain at least one uppercase letter.";
    }

    if (!/[a-z]/.test(newPassword)) {
      return "New password must contain at least one lowercase letter.";
    }

    if (!/[0-9]/.test(newPassword)) {
      return "New password must contain at least one number.";
    }

    if (!/[^A-Za-z0-9]/.test(newPassword)) {
      return "New password must contain at least one special character.";
    }

    if (newPassword === currentPassword) {
      return "New password must be different from your current password.";
    }

    if (!confirmPassword) {
      return "Please confirm your new password.";
    }

    if (newPassword !== confirmPassword) {
      return "Passwords do not match.";
    }

    return null;
  }

  async function handleChangePassword() {
    setErrorMessage("");
    setSuccessMessage("");

    const validationError = validatePassword();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setLoading(true);

    try {
      // Get the currently authenticated user.
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user?.email) {
        throw new Error(
          "Unable to verify your account. Please sign in again."
        );
      }

      // Verify the current password before changing it.
      const { error: signInError } =
        await supabase.auth.signInWithPassword({
          email: user.email,
          password: currentPassword,
        });

      if (signInError) {
        throw new Error("Your current password is incorrect.");
      }

      // Update password through Supabase Auth.
      const { error: updateError } =
        await supabase.auth.updateUser({
          password: newPassword,
        });

      if (updateError) {
        throw new Error(
          updateError.message || "Unable to update your password."
        );
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setSuccessMessage(
        "Your password has been changed successfully."
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  }

  const passwordChecks = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[^A-Za-z0-9]/.test(newPassword),
  };

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-3xl space-y-6">

        {/* Back */}
        <Link
          href="/dashboard/settings"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Settings
        </Link>

        {/* Main Card */}
        <section className="rounded-3xl border border-white/10 bg-[#0B1220] p-5 shadow-2xl sm:p-8">

          {/* Header */}
          <div className="flex items-start gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10">
              <KeyRound
                size={28}
                className="text-blue-400"
              />
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Change Password
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-400 sm:text-base">
                Update your RYNOVIX account password and keep
                your account secure.
              </p>
            </div>

          </div>

          {/* Security Notice */}
          <div className="mt-8 flex gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">

            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-blue-400"
            />

            <div>
              <p className="text-sm font-medium text-blue-300">
                Keep your password secure
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-400">
                Use a unique password that you do not use on
                other websites.
              </p>
            </div>

          </div>

          {/* Success */}
          {successMessage && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 p-4">

              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0 text-green-400"
              />

              <p className="text-sm leading-6 text-green-300">
                {successMessage}
              </p>

            </div>
          )}

          {/* Error */}
          {errorMessage && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">

              <XCircle
                size={20}
                className="mt-0.5 shrink-0 text-red-400"
              />

              <p className="text-sm leading-6 text-red-300">
                {errorMessage}
              </p>

            </div>
          )}

          {/* Form */}
          <div className="mt-8 space-y-6">

            {/* Current Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Current Password
              </label>

              <div className="relative">

                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    setErrorMessage("");
                  }}
                  placeholder="Enter your current password"
                  autoComplete="current-password"
                  className="h-12 w-full rounded-2xl border border-white/10 bg-[#050814] px-4 pr-12 text-sm text-white outline-none transition placeholder:text-gray-600 hover:border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowCurrent((value) => !value)
                  }
                  aria-label={
                    showCurrent
                      ? "Hide current password"
                      : "Show current password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-500 transition hover:text-white"
                >
                  {showCurrent ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                New Password
              </label>

              <div className="relative">

                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setErrorMessage("");
                  }}
                  placeholder="Enter your new password"
                  autoComplete="new-password"
                  className="h-12 w-full rounded-2xl border border-white/10 bg-[#050814] px-4 pr-12 text-sm text-white outline-none transition placeholder:text-gray-600 hover:border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNew((value) => !value)
                  }
                  aria-label={
                    showNew
                      ? "Hide new password"
                      : "Show new password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-500 transition hover:text-white"
                >
                  {showNew ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>
            </div>

            {/* Password Requirements */}
            <div className="rounded-2xl border border-white/10 bg-[#050814] p-5">

              <p className="mb-4 text-sm font-semibold text-white">
                Password Requirements
              </p>

              <div className="grid gap-2 sm:grid-cols-2">

                <PasswordRequirement
                  valid={passwordChecks.length}
                  text="At least 8 characters"
                />

                <PasswordRequirement
                  valid={passwordChecks.uppercase}
                  text="One uppercase letter"
                />

                <PasswordRequirement
                  valid={passwordChecks.lowercase}
                  text="One lowercase letter"
                />

                <PasswordRequirement
                  valid={passwordChecks.number}
                  text="One number"
                />

                <PasswordRequirement
                  valid={passwordChecks.special}
                  text="One special character"
                />

              </div>

            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Confirm New Password
              </label>

              <div className="relative">

                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrorMessage("");
                  }}
                  placeholder="Confirm your new password"
                  autoComplete="new-password"
                  className="h-12 w-full rounded-2xl border border-white/10 bg-[#050814] px-4 pr-12 text-sm text-white outline-none transition placeholder:text-gray-600 hover:border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirm((value) => !value)
                  }
                  aria-label={
                    showConfirm
                      ? "Hide confirmed password"
                      : "Show confirmed password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-500 transition hover:text-white"
                >
                  {showConfirm ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>
            </div>

          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Link
              href="/dashboard/settings"
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-[#050814] px-6 text-sm font-semibold text-gray-300 transition hover:border-white/20 hover:text-white"
            >
              Cancel
            </Link>

            <button
              type="button"
              onClick={handleChangePassword}
              disabled={loading}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Updating Password...
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  Update Password
                </>
              )}
            </button>

          </div>

        </section>
      </div>
    </DashboardLayout>
  );
}

function PasswordRequirement({
  valid,
  text,
}: {
  valid: boolean;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
          valid
            ? "bg-green-500/15 text-green-400"
            : "bg-gray-500/10 text-gray-600"
        }`}
      >
        {valid ? "✓" : "•"}
      </span>

      <span
        className={
          valid ? "text-green-400" : "text-gray-500"
        }
      >
        {text}
      </span>
    </div>
  );
}