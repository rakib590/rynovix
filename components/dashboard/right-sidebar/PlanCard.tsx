"use client";

import { useRouter } from "next/navigation";
import {
  Crown,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function PlanCard() {
  const router = useRouter();

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0B1220] p-5">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-xl font-bold text-white">
          Current Plan
        </h2>

        <Sparkles
          size={18}
          className="text-yellow-400"
        />

      </div>

      {/* Plan Card */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-600 p-4 text-white">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
              <Crown size={24} />
            </div>

            <div>

              <p className="text-xs opacity-80">
                Your Plan
              </p>

              <h3 className="text-xl font-bold">
                Free
              </h3>

            </div>

          </div>

          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
            Active
          </span>

        </div>

        {/* Features */}

        <div className="mt-5 space-y-3">

          <div className="flex items-center gap-3">
            <CheckCircle2 size={16} />
            <span className="text-sm">
              Version 1.0 AI Tools
            </span>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle2 size={16} />
            <span className="text-sm">
              Basic AI Features Included
            </span>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle2 size={16} />
            <span className="text-sm">
              Community Support
            </span>
          </div>

        </div>

      </div>

      {/* Upgrade Button */}

      <button
        type="button"
        onClick={() => router.push("/dashboard/billing")}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700"
      >
        Upgrade Now

        <ArrowUpRight size={18} />
      </button>

      <p className="mt-3 text-center text-xs leading-5 text-gray-500">
        Unlock Premium AI Tools, Faster Generation
        and Higher Credit Limits.
      </p>

    </div>
  );
}