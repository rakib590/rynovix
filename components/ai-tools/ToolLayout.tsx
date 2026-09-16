"use client";

import { ReactNode } from "react";
import {
  Sparkles,
  Zap,
  TrendingUp,
  Rocket,
} from "lucide-react";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function ToolLayout({
  title,
  description,
  children,
}: ToolLayoutProps) {
  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      {/* Premium Header */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0B1220] to-[#111827] p-4 shadow-xl shadow-blue-950/20 sm:rounded-3xl sm:p-6 lg:p-8">
        
        {/* Top Badge */}
        <div className="mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-blue-400 sm:gap-2 sm:px-4 sm:py-2 sm:text-xs">
            <Sparkles size={12} className="sm:h-3.5 sm:w-3.5" />
            Powered by RYNOVIX AI
          </div>
        </div>

        {/* Main Header Row */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">

          {/* LEFT — Icon + Title + Description */}
          <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-5">
            
            {/* Icon */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-1 ring-blue-500/20 sm:h-16 sm:w-16 sm:rounded-2xl">
              <Sparkles
                size={22}
                className="text-blue-400 sm:h-[30px] sm:w-[30px]"
              />
            </div>

            {/* Title + Description */}
            <div className="min-w-0">
              <h1 className="break-words text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                {title}
              </h1>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400 sm:mt-3 sm:text-base sm:leading-7">
                {description}
              </p>
            </div>
          </div>

          {/* RIGHT — Feature Pills */}
          <div className="flex w-full flex-wrap items-center justify-start gap-2 lg:w-auto lg:shrink-0 lg:justify-end lg:gap-3">

            {/* GPT AI */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1.5 text-[11px] font-medium text-emerald-400 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
              <Zap size={13} className="sm:h-4 sm:w-4" />
              Powered by GPT AI
            </div>

            {/* SEO */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1.5 text-[11px] font-medium text-blue-400 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
              <TrendingUp size={13} className="sm:h-4 sm:w-4" />
              SEO Optimized
            </div>

            {/* Instant Results */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-1.5 text-[11px] font-medium text-purple-400 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
              <Rocket size={13} className="sm:h-4 sm:w-4" />
              Instant Results
            </div>

          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="rounded-2xl border border-white/10 bg-[#0B1220] p-4 shadow-xl sm:rounded-3xl sm:p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
}