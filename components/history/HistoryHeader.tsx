"use client";

import { History } from "lucide-react";

export default function HistoryHeader() {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B1220] p-8 shadow-xl">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        
        {/* Left */}
        <div className="flex items-start gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10">
            <History
              size={34}
              className="text-blue-400"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              History
            </h1>

            <p className="mt-2 text-gray-400">
              View all AI content you've generated with RYNOVIX.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 px-5 py-4">
          <p className="text-xs uppercase tracking-widest text-blue-400">
            Total History
          </p>

          <h2 className="mt-1 text-3xl font-bold text-white">
            0
          </h2>
        </div>

      </div>
    </div>
  );
}