"use client";

import { Sparkles } from "lucide-react";

export default function ToolboxHeader() {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B1220] p-8 shadow-xl">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/15">
              <Sparkles className="h-6 w-6 text-blue-400" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">
                AI Toolbox
              </h1>

              <p className="mt-1 text-sm text-gray-400">
                Powerful AI tools to help creators grow faster.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 px-5 py-4">
          <p className="text-xs uppercase tracking-wider text-blue-300">
            Version 1.0
          </p>

          <h3 className="mt-1 text-2xl font-bold text-white">
            10 AI Tools
          </h3>

          <p className="mt-1 text-xs text-blue-200">
            More premium AI tools coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}