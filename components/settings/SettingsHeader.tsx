"use client";

import { Settings2, Sparkles } from "lucide-react";

export default function SettingsHeader() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-xl sm:p-8">
      {/* Background Glow */}
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400 sm:h-16 sm:w-16">
            <Settings2 size={32} />
          </div>

          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400">
              <Sparkles size={14} />
              Account Settings
            </div>

            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Settings
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
              Manage your account, security, AI preferences, notifications,
              billing, storage, and personalize your RYNOVIX experience.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <div className="flex-1 rounded-2xl border border-white/10 bg-[#050814] px-5 py-3 text-center sm:min-w-[120px] sm:px-6 sm:py-4">
            <p className="text-2xl font-bold text-white">
              9
            </p>

            <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
              Sections
            </p>
          </div>

          <div className="flex-1 rounded-2xl border border-white/10 bg-[#050814] px-5 py-3 text-center sm:min-w-[120px] sm:px-6 sm:py-4">
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