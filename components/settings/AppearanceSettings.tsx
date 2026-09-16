"use client";

import { Monitor, Moon, Sun, Palette, LayoutDashboard } from "lucide-react";

export default function AppearanceSettings() {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#0B1220] p-8 shadow-xl">

      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10">
          <Palette size={28} className="text-purple-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Appearance
          </h2>

          <p className="mt-1 text-gray-400">
            Personalize your dashboard experience.
          </p>
        </div>
      </div>

      <div className="space-y-8">

        {/* Theme */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">
            Theme
          </h3>

          <div className="grid gap-5 md:grid-cols-3">

            {/* Dark */}
            <button className="group rounded-2xl border border-blue-500 bg-[#050814] p-5 text-left transition hover:border-blue-400">
              <Moon className="mb-4 text-blue-400" size={28} />

              <h4 className="font-semibold text-white">
                Dark Mode
              </h4>

              <p className="mt-2 text-sm text-gray-400">
                Best for night usage and creators.
              </p>
            </button>

            {/* Light */}
            <button className="group rounded-2xl border border-white/10 bg-[#050814] p-5 text-left transition hover:border-yellow-400">
              <Sun className="mb-4 text-yellow-400" size={28} />

              <h4 className="font-semibold text-white">
                Light Mode
              </h4>

              <p className="mt-2 text-sm text-gray-400">
                Bright clean interface.
              </p>
            </button>

            {/* System */}
            <button className="group rounded-2xl border border-white/10 bg-[#050814] p-5 text-left transition hover:border-green-400">
              <Monitor className="mb-4 text-green-400" size={28} />

              <h4 className="font-semibold text-white">
                System Default
              </h4>

              <p className="mt-2 text-sm text-gray-400">
                Match your device theme.
              </p>
            </button>

          </div>
        </div>

        {/* Dashboard Layout */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">
            Dashboard Layout
          </h3>

          <div className="grid gap-5 md:grid-cols-2">

            <button className="rounded-2xl border border-blue-500 bg-[#050814] p-5 text-left transition hover:border-blue-400">
              <LayoutDashboard
                className="mb-4 text-blue-400"
                size={26}
              />

              <h4 className="font-semibold text-white">
                Comfortable
              </h4>

              <p className="mt-2 text-sm text-gray-400">
                Larger cards with more spacing.
              </p>
            </button>

            <button className="rounded-2xl border border-white/10 bg-[#050814] p-5 text-left transition hover:border-blue-400">
              <LayoutDashboard
                className="mb-4 text-cyan-400"
                size={26}
              />

              <h4 className="font-semibold text-white">
                Compact
              </h4>

              <p className="mt-2 text-sm text-gray-400">
                Fit more tools on screen.
              </p>
            </button>

          </div>
        </div>

        {/* Accent Theme */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">
            Accent Theme
          </h3>

          <div className="flex flex-wrap gap-4">

            <button className="h-12 w-12 rounded-full bg-blue-500 ring-4 ring-blue-500/30 transition hover:scale-110" />

            <button className="h-12 w-12 rounded-full bg-purple-500 transition hover:scale-110" />

            <button className="h-12 w-12 rounded-full bg-green-500 transition hover:scale-110" />

            <button className="h-12 w-12 rounded-full bg-pink-500 transition hover:scale-110" />

            <button className="h-12 w-12 rounded-full bg-orange-500 transition hover:scale-110" />

            <button className="h-12 w-12 rounded-full bg-cyan-500 transition hover:scale-110" />

          </div>

          <p className="mt-4 text-sm text-gray-500">
            Choose your preferred accent color for buttons and highlights.
          </p>
        </div>

      </div>
    </section>
  );
}