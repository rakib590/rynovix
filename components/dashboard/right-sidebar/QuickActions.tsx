"use client";

import {
  Sparkles,
  Wand2,
  User,
  Settings,
  History,
  ArrowRight,
  Heart,
  CreditCard,
} from "lucide-react";

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0B1220] p-5 min-h-[800px] flex flex-col">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-xl font-bold text-white">
          Quick Actions
        </h2>

        <Sparkles
          size={18}
          className="text-blue-400"
        />

      </div>
<div className="space-y-3">

  <button
    onClick={() => (window.location.href = "/dashboard/tools")}
    className="group flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#050814] p-4 transition hover:border-blue-500 hover:bg-[#111827]"
  >
    <div className="flex items-center gap-3">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
        <Wand2 size={20} className="text-blue-400" />
      </div>

      <div className="text-left">
        <h3 className="text-sm font-semibold text-white">
          AI Toolbox
        </h3>

        <p className="text-xs text-gray-400">
          Open AI tools
        </p>
      </div>

    </div>

    <ArrowRight
      size={18}
      className="text-gray-500 transition group-hover:text-blue-400"
    />
  </button>

  <button
    onClick={() => (window.location.href = "/dashboard/profile")}
    className="group flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#050814] p-4 transition hover:border-blue-500 hover:bg-[#111827]"
  >
    <div className="flex items-center gap-3">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10">
        <User size={20} className="text-green-400" />
      </div>

      <div className="text-left">
        <h3 className="text-sm font-semibold text-white">
          My Profile
        </h3>

        <p className="text-xs text-gray-400">
          View profile
        </p>
      </div>

    </div>

    <ArrowRight
      size={18}
      className="text-gray-500 transition group-hover:text-green-400"
    />
  </button>

</div>
<div className="mt-3 space-y-3">

  <button
    onClick={() => (window.location.href = "/dashboard/settings")}
    className="group flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#050814] p-4 transition hover:border-blue-500 hover:bg-[#111827]"
  >
    <div className="flex items-center gap-3">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10">
        <Settings size={20} className="text-orange-400" />
      </div>

      <div className="text-left">
        <h3 className="text-sm font-semibold text-white">
          Settings
        </h3>

        <p className="text-xs text-gray-400">
          Manage account
        </p>
      </div>

    </div>

    <ArrowRight
      size={18}
      className="text-gray-500 transition group-hover:text-orange-400"
    />
  </button>

  <button
    onClick={() => (window.location.href = "/dashboard/history")}
    className="group flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#050814] p-4 transition hover:border-blue-500 hover:bg-[#111827]"
  >
    <div className="flex items-center gap-3">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10">
        <History size={20} className="text-purple-400" />
      </div>

      <div className="text-left">
        <h3 className="text-sm font-semibold text-white">
          History
        </h3>

        <p className="text-xs text-gray-400">
          View recent activity
        </p>
      </div>

    </div>

    <ArrowRight
      size={18}
      className="text-gray-500 transition group-hover:text-purple-400"
    />
  </button>
  
{/* Favorites */}
<button
  onClick={() => (window.location.href = "/dashboard/favorites")}
  className="group flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#050814] p-4 transition hover:border-pink-500 hover:bg-[#111827]"
>
  <div className="flex items-center gap-3">

    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-500/10">
      <Heart size={20} className="text-pink-400" />
    </div>

    <div className="text-left">
      <h3 className="text-sm font-semibold text-white">
        Favorites
      </h3>

      <p className="text-xs text-gray-400">
        Saved AI tools
      </p>
    </div>

  </div>

  <ArrowRight
    size={18}
    className="text-gray-500 transition group-hover:text-pink-400"
  />
</button>

{/* Upgrade Plan / Billing */}
<button
  onClick={() => (window.location.href = "/dashboard/billing")}
  className="group flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#050814] p-4 transition hover:border-yellow-500 hover:bg-[#111827]"
>
  <div className="flex items-center gap-3">

    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10">
      <CreditCard size={20} className="text-yellow-400" />
    </div>

    <div className="text-left">
      <h3 className="text-sm font-semibold text-white">
        Upgrade Plan
      </h3>

      <p className="text-xs text-gray-400">
        Billing & Subscription
      </p>
    </div>

  </div>

  <ArrowRight
    size={18}
    className="text-gray-500 transition group-hover:text-yellow-400"
  />
</button>

</div>

<div className="flex-1"></div>

{/* Footer */}
<div className="mt-auto rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">

  <p className="text-sm font-semibold text-white">
    🚀 Need more AI power?
  </p>

  <p className="mt-1 text-xs leading-5 text-gray-400">
    Upgrade your plan to unlock premium AI tools,
    faster generations and unlimited access.
  </p>

</div>

    </div>
  );
}