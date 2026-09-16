"use client";

import {
  ShieldCheck,
  Lock,
  Smartphone,
  Monitor,
  ChevronRight,
} from "lucide-react";

export default function SecuritySettings() {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#0B1220] p-8 shadow-xl">

      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10">
          <ShieldCheck size={28} className="text-green-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Security
          </h2>

          <p className="mt-1 text-gray-400">
            Keep your account safe and secure.
          </p>
        </div>
      </div>

      <div className="space-y-5">

        {/* Change Password */}
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#050814] p-5 transition hover:border-blue-500">

          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-500/10 p-3">
              <Lock size={22} className="text-blue-400" />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Change Password
              </h3>

              <p className="text-sm text-gray-400">
                Update your account password.
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-500/20">
            Open
            <ChevronRight size={16} />
          </button>

        </div>

        {/* Two Factor Authentication */}
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#050814] p-5">

          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-purple-500/10 p-3">
              <Smartphone
                size={22}
                className="text-purple-400"
              />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Two-Factor Authentication
              </h3>

              <p className="text-sm text-gray-400">
                Add an extra security layer.
              </p>
            </div>
          </div>

          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
            />

            <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-green-500 peer-checked:after:translate-x-5"></div>
          </label>

        </div>

        {/* Login Activity */}
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#050814] p-5">

          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-cyan-500/10 p-3">
              <Monitor size={22} className="text-cyan-400" />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Login Activity
              </h3>

              <p className="text-sm text-gray-400">
                Review recent login sessions.
              </p>
            </div>
          </div>

          <button className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 transition hover:bg-cyan-500/20">
            View
          </button>

        </div>

        {/* Connected Devices */}
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#050814] p-5">

          <div>
            <h3 className="font-semibold text-white">
              Connected Devices
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              2 active devices connected.
            </p>
          </div>

          <button className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20">
            Manage
          </button>

        </div>

      </div>

    </section>
  );
}