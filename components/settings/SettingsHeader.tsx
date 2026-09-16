"use client";

import { Settings2, Sparkles } from "lucide-react";

export default function SettingsHeader() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B1220] p-8 shadow-xl">

      {/* Background Glow */}
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}
        <div className="flex items-start gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400">
            <Settings2 size={34} />
          </div>

          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400">
              <Sparkles size={14} />
              Account Settings
            </div>

            <h1 className="text-3xl font-bold text-white">
              Settings
            </h1>

            <p className="mt-2 max-w-2xl text-gray-400">
              Manage your account, security, AI preferences,
              notifications, billing, storage, and personalize your
              RYNOVIX experience.
            </p>
          </div>

        </div>

        {/* Right */}
        <div className="flex flex-wrap gap-4">

          <div className="rounded-2xl border border-white/10 bg-[#050814] px-6 py-4 text-center">
            <p className="text-2xl font-bold text-white">
              8
            </p>

            <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
              Sections
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#050814] px-6 py-4 text-center">
            <p className="text-2xl font-bold text-blue-400">
              Secure
            </p>

            <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
              Protected
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}