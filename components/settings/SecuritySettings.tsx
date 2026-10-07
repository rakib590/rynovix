"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Smartphone,
  Monitor,
  ChevronRight,
} from "lucide-react";

export default function SecuritySettings() {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#0B1220] p-5 shadow-xl sm:p-8">

      {/* Header */}
      <div className="mb-8 flex items-start gap-4">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-500/10 sm:h-14 sm:w-14">
          <ShieldCheck
            size={26}
            className="text-green-400 sm:h-7 sm:w-7"
          />
        </div>

        <div className="min-w-0">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Security
          </h2>

          <p className="mt-1 text-sm leading-6 text-gray-400">
            Keep your account safe and secure.
          </p>
        </div>

      </div>

      <div className="space-y-4">

        {/* Change Password */}
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#050814] p-5 transition hover:border-blue-500/40 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex min-w-0 items-center gap-4">

            <div className="shrink-0 rounded-xl bg-blue-500/10 p-3">
              <Lock
                size={22}
                className="text-blue-400"
              />
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold text-white">
                Change Password
              </h3>

              <p className="mt-1 text-sm leading-5 text-gray-400">
                Update your account password.
              </p>
            </div>

          </div>

          <Link
            href="/dashboard/settings/security/password"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2.5 text-sm font-medium text-blue-400 transition hover:border-blue-500/40 hover:bg-blue-500/20 hover:text-blue-300"
          >
            Open
            <ChevronRight size={16} />
          </Link>

        </div>

        {/* Two Factor Authentication */}
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#050814] p-5 transition hover:border-purple-500/30 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex min-w-0 items-center gap-4">

            <div className="shrink-0 rounded-xl bg-purple-500/10 p-3">
              <Smartphone
                size={22}
                className="text-purple-400"
              />
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold text-white">
                Two-Factor Authentication
              </h3>

              <p className="mt-1 text-sm leading-5 text-gray-400">
                Secure your account with an authenticator app.
              </p>
            </div>

          </div>

          <Link
            href="/dashboard/settings/security/two-factor"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-purple-500/20 bg-purple-500/10 px-4 py-2.5 text-sm font-medium text-purple-400 transition hover:border-purple-500/40 hover:bg-purple-500/20 hover:text-purple-300"
          >
            Manage
            <ChevronRight size={16} />
          </Link>

        </div>

        {/* Login Activity */}
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#050814] p-5 transition hover:border-cyan-500/30 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex min-w-0 items-center gap-4">

            <div className="shrink-0 rounded-xl bg-cyan-500/10 p-3">
              <Monitor
                size={22}
                className="text-cyan-400"
              />
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold text-white">
                Login Activity
              </h3>

              <p className="mt-1 text-sm leading-5 text-gray-400">
                Review recent login sessions.
              </p>
            </div>

          </div>

          <Link
            href="/dashboard/settings/security/login-activity"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2.5 text-sm font-medium text-cyan-400 transition hover:border-cyan-500/40 hover:bg-cyan-500/20 hover:text-cyan-300"
          >
            View
            <ChevronRight size={16} />
          </Link>

        </div>

        {/* Connected Devices */}
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#050814] p-5 transition hover:border-red-500/30 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex min-w-0 items-center gap-4">

            <div className="shrink-0 rounded-xl bg-red-500/10 p-3">
              <Monitor
                size={22}
                className="text-red-400"
              />
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold text-white">
                Connected Devices
              </h3>

              <p className="mt-1 text-sm leading-5 text-gray-400">
                Manage active sessions and devices.
              </p>
            </div>

          </div>

          <Link
            href="/dashboard/settings/security/devices"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:border-red-500/40 hover:bg-red-500/20 hover:text-red-300"
          >
            Manage
            <ChevronRight size={16} />
          </Link>

        </div>

      </div>
    </section>
  );
}