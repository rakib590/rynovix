"use client";

import {
  ArrowRight,
  CheckCircle2,
  Crown,
  Sparkles,
} from "lucide-react";

interface UpgradeHeroProps {
  currentPlan?: string;
  usedCredits?: number;
  totalCredits?: number;
}

export default function UpgradeHero({
  currentPlan = "Free",
  usedCredits = 80,
  totalCredits = 100,
}: UpgradeHeroProps) {
  const usagePercent =
    totalCredits > 0
      ? Math.min((usedCredits / totalCredits) * 100, 100)
      : 0;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-2xl sm:p-8 lg:p-10">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl" />

      <div className="relative">
        {/* Top Badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-400">
          <Sparkles size={14} />
          RYNOVIX Premium
        </div>

        {/* Heading */}
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Upgrade your AI experience.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Get more AI credits, higher limits, faster generation,
            and access to powerful premium features as your
            RYNOVIX journey grows.
          </p>
        </div>

        {/* Current Plan + Usage */}
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {/* Current Plan */}
          <div className="rounded-2xl border border-white/10 bg-[#050814]/80 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Current Plan
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                    <Crown
                      size={20}
                      className="text-blue-400"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {currentPlan}
                    </h2>

                    <p className="text-xs text-gray-500">
                      Your active RYNOVIX plan
                    </p>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-semibold text-green-400">
                <CheckCircle2 size={14} />
                Active
              </div>
            </div>
          </div>

          {/* Usage */}
          <div className="rounded-2xl border border-white/10 bg-[#050814]/80 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  AI Credits
                </p>

                <p className="mt-2 text-xl font-bold text-white">
                  {usedCredits.toLocaleString()}
                  <span className="text-sm font-medium text-gray-500">
                    {" "}
                    / {totalCredits.toLocaleString()}
                  </span>
                </p>
              </div>

              <span className="text-sm font-semibold text-blue-400">
                {Math.round(usagePercent)}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{
                  width: `${usagePercent}%`,
                }}
              />
            </div>

            <p className="mt-3 text-xs text-gray-500">
              You have used {usedCredits.toLocaleString()} of{" "}
              {totalCredits.toLocaleString()} available AI credits.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20"
          >
            Explore Plans
            <ArrowRight size={17} />
          </a>

          <p className="text-xs text-gray-500 sm:text-sm">
            Upgrade anytime. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}