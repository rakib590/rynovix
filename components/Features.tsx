
"use client";

import { useEffect, useState } from "react";
import { Activity, GitBranch, Rocket, Zap } from "lucide-react";

const ACTIVE_TOOLS = 32;

export default function Features() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="features"
      className="relative isolate w-full overflow-hidden bg-[#030712] px-4 py-16 sm:px-8 sm:py-20 lg:px-12"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-40 top-20 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[120px]" />
        <div className="absolute -right-40 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

        {/* Particle wave */}
        <svg
          viewBox="0 0 1440 340"
          preserveAspectRatio="none"
          className="absolute left-0 top-1/2 h-[300px] w-full -translate-y-1/2 opacity-70 sm:h-[360px]"
        >
          <defs>
            <linearGradient
              id="particleGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#d946ef" />
              <stop offset="48%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            <filter id="waveGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {[0, 1, 2, 3, 4].map((layer) => (
            <path
              key={layer}
              d={`M -30 ${155 + layer * 17}
                C 100 ${40 + layer * 12}, 180 ${275 - layer * 9},
                  320 ${150 + layer * 7}
                S 510 ${35 + layer * 14}, 680 ${160 + layer * 4}
                S 890 ${275 - layer * 10}, 1050 ${145 + layer * 5}
                S 1290 ${35 + layer * 12}, 1470 ${155 + layer * 15}`}
              fill="none"
              stroke="url(#particleGradient)"
              strokeWidth={layer === 2 ? 1.5 : 0.7}
              strokeOpacity={0.18 + layer * 0.1}
              strokeDasharray={layer % 2 === 0 ? "2 7" : "1 10"}
              filter="url(#waveGlow)"
              className={mounted ? "particle-wave" : ""}
              style={{ animationDelay: `${layer * -1.3}s` }}
            />
          ))}

          {/* Small glowing particles */}
          {Array.from({ length: 95 }, (_, i) => {
            const x = (i * 83 + 23) % 1440;
            const wave = Math.sin(i * 0.43) * 45;
            const y = 170 + wave + Math.sin(x / 100) * 35;

            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={i % 7 === 0 ? 1.8 : 1}
                fill={i % 3 === 0 ? "#e879f9" : "#67e8f9"}
                opacity={0.25 + (i % 5) * 0.12}
              >
                <animate
                  attributeName="opacity"
                  values="0.2;0.9;0.2"
                  dur={`${2 + (i % 5)}s`}
                  begin={`${-(i % 6)}s`}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}
        </svg>

        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/40 via-transparent to-[#030712]/60" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="relative z-10 mb-12 text-center sm:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-xs font-semibold tracking-[0.22em] text-cyan-300">
            <Zap className="h-3.5 w-3.5" />
            RYNOVIX AI ECOSYSTEM
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            THE FUTURE IS{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent">
              DYNAMIC AI
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            We're building a more powerful AI tool ecosystem.
          </p>
        </div>

        {/* Pipeline cards */}
        <div className="relative z-10 grid grid-cols-1 items-center gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
          {/* Card 1 */}
          <div className="group relative">
            <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-r from-cyan-400/50 via-sky-400/40 to-fuchsia-500/60 opacity-60 blur-md transition duration-500 group-hover:opacity-100" />

            <div className="relative flex min-h-[172px] flex-col items-center justify-center rounded-3xl border border-cyan-300/70 bg-[#080d20]/95 px-5 py-7 text-center shadow-[inset_0_0_28px_rgba(34,211,238,0.09),0_0_25px_rgba(34,211,238,0.12)]">
              <Activity className="mb-2 h-5 w-5 text-cyan-300" />

              <div className="text-5xl font-black tabular-nums text-white drop-shadow-[0_0_16px_rgba(103,232,249,0.45)]">
                {ACTIVE_TOOLS}
              </div>

              <h3 className="mt-2 text-sm font-semibold tracking-[0.16em] text-cyan-100 sm:text-base">
                ACTIVE TOOLS
              </h3>

              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-[#090d1d] px-4 py-1.5 text-[10px] font-bold tracking-[0.15em] text-fuchsia-200 shadow-[0_0_18px_rgba(217,70,239,0.15)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  LIVE NOW
                </span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative">
            <div className="absolute -inset-1 rounded-[28px] bg-cyan-400/30 opacity-60 blur-md transition duration-500 group-hover:opacity-100" />

            <div className="relative flex min-h-[172px] flex-col items-center justify-center rounded-3xl border border-cyan-400/70 bg-[#06151d]/95 px-5 py-7 text-center shadow-[inset_0_0_28px_rgba(34,211,238,0.09),0_0_25px_rgba(34,211,238,0.12)]">
              <GitBranch className="mb-3 h-6 w-6 text-cyan-300" />

              <h3 className="text-xl font-bold tracking-wide text-white sm:text-2xl">
                NEXT NODE
              </h3>

              <p className="mt-2 text-sm font-medium tracking-wider text-cyan-200/80">
                (IN DEVELOPMENT)
              </p>

              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-[#06121c] px-4 py-1.5 text-[10px] font-bold tracking-[0.15em] text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.15)]">
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  IN PROGRESS
                </span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative">
            <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-r from-cyan-400/40 to-sky-400/50 opacity-60 blur-md transition duration-500 group-hover:opacity-100" />

            <div className="relative flex min-h-[172px] flex-col items-center justify-center rounded-3xl border border-cyan-300/60 bg-[#07131d]/95 px-5 py-7 text-center shadow-[inset_0_0_28px_rgba(34,211,238,0.08),0_0_25px_rgba(34,211,238,0.1)]">
              <Rocket className="mb-3 h-6 w-6 text-cyan-300" />

              <h3 className="text-lg font-bold leading-7 tracking-wide text-white sm:text-xl">
                CONTINUOUS
                <br />
                DEPLOYMENT
              </h3>

              <p className="mt-1 text-sm font-medium tracking-wider text-cyan-200/80">
                (RELEASE PIPELINE)
              </p>

              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-[#06121c] px-4 py-1.5 text-[10px] font-bold tracking-[0.15em] text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.15)]">
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  RELEASE PIPELINE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom status line */}
        <div className="relative z-10 mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10px] font-medium tracking-[0.18em] text-slate-500 sm:mt-20">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            AI ECOSYSTEM
          </span>

          <span className="hidden h-3 w-px bg-slate-700 sm:block" />

          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            BUILT FOR CREATORS
          </span>

          <span className="hidden h-3 w-px bg-slate-700 sm:block" />

          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
            ALWAYS EVOLVING
          </span>
        </div>
      </div>

      <style jsx>{`
        .particle-wave {
          animation: waveDrift 12s ease-in-out infinite alternate;
        }

        @keyframes waveDrift {
          from {
            transform: translateX(-12px);
          }
          to {
            transform: translateX(12px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .particle-wave {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
