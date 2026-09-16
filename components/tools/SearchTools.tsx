"use client";

import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchTools() {
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
            placeholder="Search AI tools..."
            className="w-full rounded-2xl border border-white/10 bg-[#050814] py-3 pl-12 pr-4 text-white outline-none transition focus:border-blue-500 placeholder:text-gray-500"
          />

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Category */}
          <select
            className="rounded-2xl border border-white/10 bg-[#050814] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
          >
            <option>All Categories</option>
            <option>YouTube</option>
            <option>SEO</option>
            <option>Writing</option>
          </select>

          {/* Sort */}
          <select
            className="rounded-2xl border border-white/10 bg-[#050814] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
          >
            <option>Most Popular</option>
            <option>A-Z</option>
            <option>Newest</option>
          </select>

          {/* Filter */}
          <button
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#050814] px-5 py-3 text-sm text-white transition hover:border-blue-500"
          >
            <SlidersHorizontal size={18} />
            Filter
          </button>

        </div>

      </div>
    </div>
  );
}