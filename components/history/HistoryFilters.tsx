"use client";

import { Search, SlidersHorizontal } from "lucide-react";

interface HistoryFiltersProps {
  search?: string;
  onSearchChange?: (value: string) => void;
}

export default function HistoryFilters({
  search = "",
  onSearchChange,
}: HistoryFiltersProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Search */}
        <div className="relative w-full lg:max-w-xl">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              onSearchChange?.(e.target.value)
            }
            placeholder="Search history..."
            className="w-full rounded-2xl border border-white/10 bg-[#050814] py-3 pl-12 pr-4 text-white outline-none transition focus:border-blue-500 placeholder:text-gray-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">

          {/* Tool */}
          <select className="rounded-2xl border border-white/10 bg-[#050814] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500">
            <option>All Tools</option>
            <option>Title Generator</option>
            <option>Description Generator</option>
            <option>Hashtag Generator</option>
            <option>Tags Generator</option>
            <option>Script Writer</option>
            <option>SEO Checker</option>
            <option>Keyword Generator</option>
            <option>Thumbnail Title</option>
            <option>Best Upload Time</option>
          </select>

          {/* Date */}
          <select className="rounded-2xl border border-white/10 bg-[#050814] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500">
            <option>All Time</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>

          {/* Sort */}
          <select className="rounded-2xl border border-white/10 bg-[#050814] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500">
            <option>Newest First</option>
            <option>Oldest First</option>
            <option>A-Z</option>
          </select>

          {/* Filter Button */}
          <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#050814] px-5 py-3 text-sm text-white transition hover:border-blue-500">
            <SlidersHorizontal size={18} />
            Filter
          </button>

        </div>
      </div>
    </div>
  );
}