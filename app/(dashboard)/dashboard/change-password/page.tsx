"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function ChangePasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChangePassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!currentPassword) {
      setErrorMessage("Current password is required.");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage(
        "New password must be at least 8 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setSuccessMessage(
      "Password updated successfully. Redirecting..."
    );

    setTimeout(() => {
      router.push("/dashboard");
      router.refresh();
    }, 1500);
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-10">
      <div className="w-full max-w-2xl">

        <div className="mb-8 text-center">

          <h1 className="text-4xl font-bold text-white">
            Change Password
          </h1>

          <p className="mt-3 text-gray-400">
            Keep your RYNOVIX account secure by updating your
            password regularly.
          </p>

        </div>

        <form
          onSubmit={handleChangePassword}
          className="w-full rounded-3xl border border-white/10 bg-[#0B1220] p-10 shadow-2xl backdrop-blur"
        >

          <div className="space-y-6">
            {/* Current Password */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Current Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type={showCurrent ? "text" : "password"}
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(e.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#050814] py-3 pl-11 pr-12 text-white outline-none transition focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowCurrent(!showCurrent)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
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

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type={showNew ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#050814] py-3 pl-11 pr-12 text-white outline-none transition focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNew(!showNew)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showNew ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>
            </div>

            {/* Confirm Password */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Confirm Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#050814] py-3 pl-11 pr-12 text-white outline-none transition focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirm(!showConfirm)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showConfirm ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>
            </div>

            {/* Password Rules */}

            <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">

              <p className="mb-2 font-medium text-blue-300">
                Password Requirements
              </p>

              <ul className="space-y-1 text-sm text-gray-300">
                <li>• At least 8 characters</li>
                <li>• One uppercase letter</li>
                <li>• One lowercase letter</li>
                <li>• One number</li>
                <li>• One special character</li>
              </ul>

            </div>

            {/* Error */}

            {errorMessage && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                {errorMessage}
              </div>
            )}

            {/* Success */}

            {successMessage && (
              <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Updating Password..."
                : "Update Password"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}